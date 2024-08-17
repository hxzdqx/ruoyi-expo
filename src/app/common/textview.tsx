import { StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { View, Card, Text } from "@ant-design/react-native";

export default function TextViewScreen() {
  const { content, title } = useLocalSearchParams<{
    content: string;
    title: string;
  }>();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title, headerTitleAlign: "center" }} />
      <View style={styles.container}>
        <Card style={{ width: "100%" }}>
          <Card.Header title={title} />
          <Card.Body>
            <Text style={styles.content}>{content}</Text>
          </Card.Body>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  content: {
    marginHorizontal: 16,
    fontSize: 16,
  },
});
