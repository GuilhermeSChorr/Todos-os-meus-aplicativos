import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";

async function getCEP(cep){
    const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    if (resposta.ok) {
        const payload = await resposta.json();
        return payload;
    }
    return null;
}

getCEP();

export default function CEP() {
    const [cep, setCEP] = useState('');
    const [cepPesquisar, setCEPPesquisar] = useState('');
    const [cepEstado, setCEPEstado] = useState('');
    
    
    async function carregarCEP(){
        const CEP = await getCEP(cepPesquisar);
        setCEP(CEP.city || 'CEP não encontrado')
        setCEPEstado(CEP.state || '')
      
    }

    
    return (
        <SafeAreaView style={estilos.container}>
            <TextInput style={estilos.input}
                placeholder="Digite o CEP"
                value={cepPesquisar}
                onChangeText={setCEPPesquisar}
            />
            <Button title="Pesquisar" onPress={carregarCEP}/>
            <Text style={estilos.textresposta}>{cep}-{cepEstado}</Text>
          
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
 
    input: {
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        padding: 5,
    },

    textresposta: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        
    }

});

