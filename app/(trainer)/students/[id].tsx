import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStudentsStore } from "../../../src/store/useStudents";

export default function StudentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { hydrate, hydrated, students } = useStudentsStore();

  useEffect(() => { if (!hydrated) hydrate(); }, [hydrated, hydrate]);

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Loading…</Text>
      </View>
    );
  }

  const student = students.find((it) => it.id === id);
  if (!student) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Student not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-4">
      <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <Text className="text-white text-2xl font-bold mb-2">{student.name}</Text>
        <Text className="text-gray-300">{student.email}</Text>
        <Text className="text-gray-300">{student.phone}</Text>
        <Text className="text-gray-300 mt-2">
          Course: <Text className="text-white">{student.course}</Text>
        </Text>
        <Text className="text-gray-300">
          Batch: <Text className="text-white">{student.batch}</Text>
        </Text>
        {student.notes ? (
          <Text className="text-gray-300 mt-2">
            Notes: <Text className="text-white">{student.notes}</Text>
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/(trainer)/students/${student.id}/edit`)}
        className="mt-4 bg-blue-600 rounded-2xl px-4 py-3"
      >
        <Text className="text-white text-center font-semibold">Edit</Text>
      </TouchableOpacity>
    </View>
  );
}
