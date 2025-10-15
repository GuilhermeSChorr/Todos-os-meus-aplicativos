import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";

initDb();

function getFilmes() {
  return db.getAllSync("SELECT * FROM filmes");
}

function insertFilme(titulo, ano, genero) {
  db.runSync("INSERT INTO filmes (titulo, ano, genero) VALUES (?, ?, ?)", [titulo, ano, genero]);
}

function deleteFilme(id) {
  db.runSync("DELETE FROM filmes WHERE id = ?", [id]);
}

function getFilmeById(id) {
  const [filme] = db.getAllSync("SELECT * FROM filmes WHERE id = ?", [id]);
  return filme;
}

function updateFilme(id, titulo, ano, genero) {
  db.runSync("UPDATE filmes SET titulo = ?, ano = ?, genero = ? WHERE id = ?", [
    titulo,
    ano,
    genero,
    id,
  ]);
}

export default function Sqlite() {
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  function carregarFilmes() {
    setFilmes(getFilmes());
  }

  function limparCampos() {
    setTitulo("");
    setAno("");
    setGenero("");
    setEditandoId(null);
  }

  function salvarFilme() {
    if (!titulo.trim() || !ano.trim() || !genero.trim()) return;

    if (editandoId) {
     
      updateFilme(editandoId, titulo.trim(), Number(ano), genero.trim());
    } else {
 
      insertFilme(titulo.trim(), Number(ano), genero.trim());
    }

    limparCampos();
    carregarFilmes();
  }

  function excluirFilme(id) {
    deleteFilme(id);
    carregarFilmes();
  }

  function editarFilme(id) {
    const filme = getFilmeById(id);
    if (!filme) return;
    setTitulo(filme.titulo);
    setAno(String(filme.ano));
    setGenero(filme.genero);
    setEditandoId(id);
  }

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <Text style={estilos.titulo}>
        {editandoId ? "Editar Filme" : "Cadastrar Filme"}
      </Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Título (ex: O Poderoso Chefão)"
          style={estilos.campoTexto}
        />
      </View>
      <View style={estilos.linhaEntrada}>
        <TextInput
          value={ano}
          onChangeText={setAno}
          placeholder="Ano (ex: 1972)"
          keyboardType="numeric"
          style={estilos.campoTexto}
        />
      </View>
      <View style={estilos.linhaEntrada}>
        <TextInput
          value={genero}
          onChangeText={setGenero}
          placeholder="Gênero (ex: Drama)"
          style={estilos.campoTexto}
        />
      </View>

      <View style={estilos.botoesAcoes}>
        <Button
          title={editandoId ? "Atualizar Filme" : "Salvar Filme"}
          onPress={salvarFilme}
        />
        {editandoId && (
          <Button title="Cancelar" color="#6b7280" onPress={limparCampos} />
        )}
      </View>

      <Button title="Carregar filmes" onPress={carregarFilmes} />

      <FlatList
        data={filmes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text style={estilos.textoItem}>
              {item.titulo} | {item.ano} | {item.genero}
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button title="E" onPress={() => editarFilme(item.id)} />
              <Button title="❌" color="#b91c1c" onPress={() => excluirFilme(item.id)} />
            </View>
          </View>
        )}
      />

      <View style={estilos.rodape}>
        <Button title="Voltar" onPress={() => router.back()} />
        <Button title="Início" onPress={() => router.replace("/")} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: { flex: 1, padding: 16 },
  titulo: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  linhaEntrada: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  campoTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  botoesAcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 8,
  },
  textoItem: { fontSize: 16, paddingVertical: 6 },
  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rodape: { flexDirection: "row", gap: 8, marginTop: 8 },
});
