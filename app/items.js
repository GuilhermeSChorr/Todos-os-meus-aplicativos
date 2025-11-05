import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, FlatList, View, Alert } from "react-native";
import { useState, useEffect } from "react";

async function getItems(){
  const resposta = await fetch(`http://177.44.248.50:8080/items`);
  if (resposta.ok) {
    return await resposta.json();
  }
}

async function cadastra(name, description, price){
  const resposta = await fetch(`http://177.44.248.50:8080/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price }),
  });
  return resposta.ok;
}

async function editar(id, name, description, price){
  const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, description, price }),
  });
  return resposta.ok; 
}

async function excluir(id){
  const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
    method: "DELETE",
  });
  return resposta.ok;
}

export default function Items() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  async function carregarItems(){
    const lista = await getItems();
    setItems(lista);
  }

  async function salvar(){
    if (editingId) {
      const ok = await editar(editingId, name, description, Number(price));
      if (ok) {
        setEditingId(null);
        setName("");
        setDescription("");
        setPrice("");
        await carregarItems();
      }
    } else {
      const ok = await cadastra(name, description, Number(price));
      if (ok) {
        setName("");
        setDescription("");
        setPrice("");
        await carregarItems();
      }
    }
  }

  async function remover(id){
    Alert.alert(
      "Excluir item",
      "Tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const ok = await excluir(id);
            if (ok) await carregarItems();
          },
        },
      ]
    );
  }

  function iniciarEdicao(item){
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(String(item.price));
  }

  useEffect(() => {
    carregarItems();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={estilos.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={estilos.input}
      />
      <TextInput
        placeholder="Preço"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={estilos.input}
      />

      <Button title={editingId ? "Salvar Alterações" : "Salvar Novo"} onPress={salvar} />
      <View style={{ height: 8 }} />
      <Button title="Recarregar lista" onPress={carregarItems} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.itemTitulo}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Preço: {String(item.price)}</Text>

            <View style={estilos.botoesLinha}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Button
                  title="Editar"
                  color="#007AFF"
                  onPress={() => iniciarEdicao(item)}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Button
                  title="Excluir"
                  color="#FF3B30"
                  onPress={() => remover(item.id)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8
  },
  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9"
  },
  itemTitulo: {
    fontWeight: "bold",
    marginBottom: 4
  },
  botoesLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
