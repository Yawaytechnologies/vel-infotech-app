// app/(trainer)/layout.tsx
import { Stack } from "expo-router";

export default function TrainerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B1220" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#0B1220" },
      }}
    >
      <Stack.Screen
        name="students/index"
        options={{ title: "Students" }}
      />
      <Stack.Screen
        name="students/new"
        options={{ title: "Add Student" }}
      />
      <Stack.Screen
        name="students/[id]"
        options={{ title: "Student" }}
      />
      <Stack.Screen
        name="students/edit"
        options={{ title: "Edit Student" }}
      />
    </Stack>
  );
}
