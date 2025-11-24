// app/home.tsx
import { router } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function Home() {
  const goStudents = () => router.push("/(trainer)/students");
  const goNewStudent = () => router.push("/(trainer)/students/new");

  return (
    <View className="flex-1 bg-yellow-100 items-center justify-center px-6">
      <Text className="text-2xl font-bold text-green-800 mb-6">🏠 Home</Text>

      {/* View students */}
      <Pressable
        onPress={goStudents}
        className="w-full max-w-xs bg-green-700 rounded-2xl py-3 px-4 mb-3 active:opacity-90"
      >
        <Text className="text-white text-center font-semibold">
          View Students
        </Text>
      </Pressable>

      {/* Add student */}
      <Pressable
        onPress={goNewStudent}
        className="w-full max-w-xs bg-blue-600 rounded-2xl py-3 px-4 active:opacity-90"
      >
        <Text className="text-white text-center font-semibold">
          Add New Student
        </Text>
      </Pressable>
    </View>
  );
}
