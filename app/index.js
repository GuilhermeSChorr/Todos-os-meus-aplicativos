import { Link } from "expo-router";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return(
        <SafeAreaView style={estilos.areaSegura}>
    <Link href="/appestudantes" asChild>
        <Button title="Clique para ver o app para estudantes"  />   
    </Link>
    <Link href="/Kanban" asChild>
        <Button title="Clique para o Kanban"  />
    </Link>
    <Link href="/calculadora" asChild>
        <Button title="Clique para a calculadora"  />
    </Link>
    <Link href="/lista" asChild>
        <Button title="Clique para a lista"  />   
    </Link>
    <Link href="/Avaliacao1" asChild>
        <Button title="Clique para a Avaliação 1"  />   
    </Link>
    <Link href="/SQLite" asChild>
        <Button title="Clique para a SQLite"  />   
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