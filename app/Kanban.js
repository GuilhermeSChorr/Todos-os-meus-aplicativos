import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function QuadroTarefas() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.title}>Quadro de Tarefas</Text>
        <Text style={styles.subtitulo}>Kanban estático</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.board}>
        
        <View style={styles.coluna}>
          <Text style={styles.titulocoluna}>A Fazer</Text>
          <View style={styles.cartao}><Text>Configurar ambiente</Text></View>
          <View style={[styles.cartao, styles.cartaoimportante]}>
            <Text>Entregar layout (Importante)</Text>
          </View>
          <View style={styles.cartao}><Text>Revisar textos</Text></View>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.titulocoluna}>Em Progresso</Text>
          <View style={styles.cartao}><Text>Tela inicial</Text></View>
          <View style={styles.cartao}><Text>API de login</Text></View>
          <View style={styles.cartao}><Text>Documento</Text></View>
        </View>

        <View style={styles.coluna}>
          <Text style={styles.titulocoluna}>Concluído</Text>
          <View style={styles.cartao}><Text>Setup projeto</Text></View>
          <View style={styles.cartao}><Text>Componentes base</Text></View>
          <View style={styles.cartao}><Text>README</Text></View>
        </View>

      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity style={[styles.botao, styles.addbotap]}>
          <Text style={styles.textobotao}>ADICIONAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.filtrabotao]}>
          <Text style={styles.textobotao}>FILTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },

  cabecalho: { paddingHorizontal: 16, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#000" },
  subtitulo: { fontSize: 14, color: "#666" },

  board: { flexGrow: 0 },
  coluna: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    width: 200,
  },
  titulocoluna: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },

  cartao: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartaoimportante: { backgroundColor: "#e8f0ff", borderLeftWidth: 4, borderLeftColor: "#4285f4" },

  
  rodape: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  botao: {
    flex: 1,
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  addbotap: { backgroundColor: "#2962ff" },
  filtrabotao: { backgroundColor: "#607d8b" },
  textobotao: { color: "#fff", fontWeight: "bold" },
});
