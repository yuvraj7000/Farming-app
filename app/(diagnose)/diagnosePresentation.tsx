import Diagnose_presentation from "@/components/diagnose_presentation";
import { useLocalSearchParams } from "expo-router";

const DiagnosePresentation = () => {
  const { imageUri, response } = useLocalSearchParams(); // Retrieve the query parameters
  const parsedResponse = JSON.parse(response); // Parse the response back to an object
   
  
  return <Diagnose_presentation imageUri={imageUri} data={parsedResponse} />;
};

export default DiagnosePresentation;