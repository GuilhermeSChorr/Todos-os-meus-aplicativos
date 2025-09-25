import { Button } from "react-native";
import { View, Text } from "react-native";
import { router, Link } from "expo-router";

export default function Batata() {
    return(
        <View>
            <Text>Batata</Text>
            <Button title="Voltar" onPress={() => router.back()} />
                <Button title="Ir para Home" onPress={() => router.push('/')} />
        </View>
    )
}