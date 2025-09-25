import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function calculadora() {
 
  const [resultado, setResultado] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
 
  function somar(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    return n1Convertido + n2Convertido;
  }

  function subtrair(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    return n1Convertido - n2Convertido;
  }

  function multiplicar(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    return n1Convertido * n2Convertido;
  }

  function dividir(n1, n2){
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    if (n2Convertido === 0) {
      return "Erro: Divisão por 0";
    }
    return n1Convertido / n2Convertido;
  }

  function resetar() {
    setNum1(0);
    setNum2(0);
    setResultado(0);
  }

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <Text>Número 1</Text>
      <TextInput
        style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />
      <Text>Número 2</Text>
      <TextInput
        style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum2}
        value={num2}
      />
      <View style={estilos.botoes}>
        <Button title=" + " onPress={() => setResultado(somar(num1, num2))}/>
        <Button title=" - " onPress={() => setResultado(subtrair(num1, num2))}/>
        <Button title=" * " onPress={() => setResultado(multiplicar(num1, num2))}/>
        <Button title=" / " onPress={() => setResultado(dividir(num1, num2))}/>
        <Button title="Resetar" onPress={resetar} color="#FF6347"/>
      </View>
      <Text style={{fontSize: 40}}>Resultado: {resultado}</Text>
      
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
 areaSegura: {
  flex: 1
 },
 campo: {
  borderWidth: 1,
  borderRadius: 10
 },
 botoes: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 20
 }
});