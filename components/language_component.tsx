import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useRouter } from 'expo-router';
import Button from './button';

const data = [
    { lan: "English", code: "en" },
    { lan: "हिन्दी", code: "hi" },
    { lan: "मराठी", code: "mr" },
    { lan: "ગુજરાતી", code: "gu" },
    { lan: "தமிழ்", code: "ta" },
    { lan: "తెలుగు", code: "te" },
    { lan: "ਪੰਜਾਬੀ", code: "pa" },
    { lan: "മലയാളം", code: "ml" },
    { lan: "বাংলা", code: "bn" }, 
    { lan: "ଓଡ଼ିଆ", code: "or" }, 
    { lan: "ಕನ್ನಡ", code: "kn" }
    
    
];

const Language_button = ({ lan, code, language, setLanguage }) => {
    const isSelected = code === language;

    return (
        <TouchableOpacity onPress={() => setLanguage(code)}>
            <View style={[
                styles.languageButton,
                isSelected && styles.selectedLanguage
            ]}>
                <Text style={styles.languageText}>{lan}</Text>
                {isSelected && <Text style={styles.checkmark}>✔️</Text>}
            </View>
        </TouchableOpacity>
    );
};

const Language_component = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const router = useRouter();

    const changeLanguage = (code) => {
        setLanguage(code);
    };

    const handleDone = async() => {
        await AsyncStorage.setItem('language', language)
        i18n.changeLanguage(language);
        router.push("/feature");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("language")}</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.code}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <Language_button
                        lan={item.lan}
                        code={item.code}
                        language={language}
                        setLanguage={changeLanguage}
                    />
                )}
            />
            <View style={styles.buttonContainer}>
                <Button handleDone={handleDone} buttonName="Done" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginVertical: 5,
    },
    selectedLanguage: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3',
    },
    languageText: {
        flex: 1,
        fontSize: 16,
    },
    checkmark: {
        color: '#2196f3',
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
    }
});

export default Language_component;