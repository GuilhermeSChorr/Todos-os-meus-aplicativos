import React from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,StatusBar,Image, 
} from "react-native";

export default function estudantes() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        
        <Image
  source={require('./assets/noob.png')}
  style={styles.avatar}
/>

        

        <View>
          <Text style={styles.hello}>Olá, Estudante</Text>
          <Text style={styles.subtitle}>Bem-vindo ao seu painel</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: "#3b82f6" }]}
        >
          <Text style={styles.menuButtonText}>NOTAS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: "#10b981" }]}
        >
          <Text style={styles.menuButtonText}>AULAS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: "#8b5cf6" }]}
        >
          <Text style={styles.menuButtonText}>AVISOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Próximas atividades</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trabalho de Matemática</Text>
          <Text style={styles.cardSubtitle}>Entrega: 20/08</Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: "#e0f2fe", borderColor: "#60a5fa" },
          ]}
        >
          <Text style={[styles.cardTitle, { fontWeight: "bold" }]}>
            Prova de Física (Importante)
          </Text>
          <Text style={styles.cardSubtitle}>Data: 22/08</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leitura de História</Text>
          <Text style={styles.cardSubtitle}>Cap. 3 e 4</Text>
        </View>

        <Text style={styles.sectionTitle}>Chamada para ação</Text>
        <View style={styles.ctaBox}>
          <Text style={{ marginBottom: 12 }}>
            Adquira um novo curso e continue aprendendo!
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>COMPRAR CURSO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hello: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#6b7280",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  menuButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: "center",
  },
  menuButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#475569",
    marginTop: 4,
  },
  ctaBox: {
    backgroundColor: "#fafafa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: "#a21caf",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  ctaButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
