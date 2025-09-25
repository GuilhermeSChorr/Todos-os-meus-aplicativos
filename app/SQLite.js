import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("despesas.db");

db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS despesas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    categoria TEXT
  );
`);

function getDespesas() {
  return db.getAllSync("SELECT * FROM despesas ORDER BY id DESC");
}

function insertDespesa(descricao, valor, categoria) {
  db.runSync("INSERT INTO despesas (descricao, valor, categoria) VALUES (?, ?, ?)", [
    descricao,
    valor,
    categoria,
  ]);
}

function deleteDespesa(id) {
  db.runSync("DELETE FROM despesas WHERE id = ?", [id]);
}

function deleteAllDespesas() {
  db.runSync("DELETE FROM despesas");
}

export default function App() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    carregarDespesas();
  }, []);

  function salvarDespesa() {
    const desc = descricao.trim();
    const val = parseFloat(valor);
    if (!desc || isNaN(val) || val <= 0) return;
    insertDespesa(desc, val, categoria.trim() || "Outros");
    setDescricao("");
    setValor("");
    setCategoria("");
    carregarDespesas();
  }

  function carregarDespesas() {
    const dados = getDespesas();
    setDespesas(dados);
    const soma = dados.reduce((acc, item) => acc + item.valor, 0);
    setTotal(soma);
  }

  function excluirDespesa(id) {
    deleteDespesa(id);
    carregarDespesas();
  }

  function apagarTodas() {
    deleteAllDespesas();
    carregarDespesas();
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Despesas Diárias</Text>

      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição..."
        style={estilos.campoTexto}
      />
      <TextInput
        value={valor}
        onChangeText={setValor}
        placeholder="Valor (ex: 12.50)"
        keyboardType="numeric"
        style={estilos.campoTexto}
      />
      <TextInput
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Categoria (ex: Alimentação)"
        style={estilos.campoTexto}
      />

      <Button title="Salvar" onPress={salvarDespesa} />

      <FlatList
        data={despesas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.textoItem}>
              {item.descricao} - R$ {item.valor.toFixed(2)} [{item.categoria}]
            </Text>
            <Button title="X" color="red" onPress={() => excluirDespesa(item.id)} />
          </View>
        )}
      />

      <Text style={estilos.total}>Total: R$ {total.toFixed(2)}</Text>

      <View style={estilos.rodape}>
        <Button title="Recarregar" onPress={carregarDespesas} />
        <Button title="Apagar todas" onPress={apagarTodas} color="red" />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textoItem: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
  },
  rodape: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
});
