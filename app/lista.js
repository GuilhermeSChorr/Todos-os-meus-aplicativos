import React, { useState } from "react";
import {View, Text, TextInput,Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function lista() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (input.trim() !== "") {
      setItems([...items, { key: Math.random().toString(), value: input }]);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomSection}>
        <TextInput
          style={styles.input}
          placeholder="Digite um item"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Adicionar" onPress={addItem} />
        <FlatList
          style={styles.list}
          data={items}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.value}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
 <View>
           
            <Button title="Voltar" onPress={() => router.back()} />
                <Button title="Ir para Home" onPress={() => router.push('/')} />
        </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    width: "80%",
    alignSelf: "center",
  },
  list: {
    marginTop: 16,
    maxHeight: 250,
    width: "80%",
    alignSelf: "center",
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 4,
    backgroundColor: "#fafafa",
    marginBottom: 8,
    alignItems: "center",
  },
});