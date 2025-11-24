import React from "react";
import { View } from "react-native";
import StudentForm from "../../../components/StudentForm";
import { useStudentsStore } from "../../../src/store/useStudents";
import { useRouter } from "expo-router";

export default function NewStudent() {
  const router = useRouter();
  const { addStudent } = useStudentsStore();

  return (
    <View className="flex-1 px-4 py-4">
      <StudentForm
        onSubmit={async (data) => {
          await addStudent(data);
          router.replace("/(trainer)/students");
        }}
      />
    </View>
  );
}
