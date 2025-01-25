import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useRouter } from 'expo-router';
import Button from './button';
const data = [
    { lan: "English", code: "en" },
    { lan: "Hindi", code: "hi" },
    { lan: "Marathi", code: "mr" },
    { lan: "Tamil", code: "ta" },
    { lan: "Telugu", code: "te" },
    { lan: "Bengali", code: "bn" },
];

const Language_button = ({ lan, code, language, setLanguage }) => {
    const isSelected = code === language;

    return (
        <TouchableOpacity onPress={() => setLanguage(code)}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: isSelected ? 'lightgray' : 'white',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'gray',
                marginVertical: 5,
                marginHorizontal: 20,
            }}>
                <Text style={{ flex: 1 }}>{lan}</Text>
                {isSelected && <Text>✔️</Text>}
            </View>
        </TouchableOpacity>
    );
};

const Language_component = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [lan, setLan] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getLanguage = async () => {
            try {
                const value = await AsyncStorage.getItem('language');
                if (value !== null) {
                    setLan(value);
                }
            } catch (e) {
                console.error(e);
            }
        };
        getLanguage();
    }, []);

    const updateLanguage = async (val) => {
        try {
            await AsyncStorage.setItem('language', val)
        } catch (e) {
            console.error(e);
        }
    };


    const changeLanguage = (code) => {
        
        setLanguage(code);
    };

    const handleDone = () => {
        i18n.changeLanguage(language);
        // updateLanguage(language)
        // if (lan === null) {
        //     router.push("/feature");
        // }
        router.push("/feature");
    };

    return (
        <View>
            <View>
                <Text>{t("language")}</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <Language_button
                            lan={item.lan}
                            code={item.code}
                            language={language}
                            setLanguage={changeLanguage}
                        />
                    )}
                />
                {/* <TouchableOpacity onPress={handleDone} style={{
                    backgroundColor: '#007BFF',
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Done</Text>
                </TouchableOpacity> */}
                <Button handleDone={handleDone} buttonName="Done" />
            </View>
        </View>
    );
};

export default Language_component;