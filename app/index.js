import { Link } from "expo-router";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return(
        <SafeAreaView style={estilos.areaSegura}>
    
    <Link href="/Avaliacao2" asChild>
        <Button title="Clique para a Avaliação 2"  />   
    </Link>
</SafeAreaView>
    )
}

const estilos = StyleSheet.create({ 
  areaSegura: {
    flex: 1, },
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
});