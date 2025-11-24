import React, { useMemo, useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useStudentsStore } from "../../../src/store/useStudents";
import { Ionicons } from "@expo/vector-icons";

export default function StudentsList() {
  const router = useRouter();
  const { students, removeStudent, hydrate, hydrated } = useStudentsStore();
  const [q, setQ] = useState("");

  useEffect(() => { if (!hydrated) hydrate(); }, [hydrated, hydrate]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return students;
    return students.filter(
      (it) =>
        it.name.toLowerCase().includes(s) ||
        it.email.toLowerCase().includes(s) ||
        it.course.toLowerCase().includes(s)
    );
  }, [students, q]);

  const confirmDelete = (id: string) => {
    Alert.alert("Delete", "Delete this student?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeStudent(id) },
    ]);
  };

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-900">Loading…</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-4 bg-white">
      {/* Search + Add */}
      <View className="flex-row items-center gap-3 mb-4">
        <View className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-3 py-2">
          <TextInput
            placeholder="Search by name, email, course"
            placeholderTextColor="#6B7280"
            value={q}
            onChangeText={setQ}
            className="text-slate-900"
          />
        </View>
        <Link href="/(trainer)/students/new" asChild>
          <TouchableOpacity className="bg-blue-600 rounded-2xl px-3 py-2">
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Stats */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3">
          <Text className="text-slate-600">Total</Text>
          <Text className="text-slate-900 text-2xl font-bold">{students.length}</Text>
        </View>
        <View className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3">
          <Text className="text-slate-600">Filtered</Text>
          <Text className="text-slate-900 text-2xl font-bold">{filtered.length}</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-slate-600">No students yet. Tap “Add”.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(trainer)/students/${item.id}`)}
            className="bg-white border border-slate-200 shadow-sm rounded-2xl p-3 mb-3"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-slate-900 text-lg font-semibold">{item.name}</Text>
                <Text className="text-slate-600">{item.email}</Text>
                <Text className="text-slate-500 mt-1">
                  {item.course} • {item.batch}
                </Text>
              </View>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity
                  onPress={() => router.push(`/(trainer)/students/${item.id}/edit`)}
                  className="bg-blue-600 rounded-xl p-2"
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmDelete(item.id)}
                  className="bg-red-600 rounded-xl p-2"
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
