import React, { useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import StudentForm from "../../../../components/StudentForm";
import { useStudentsStore } from "../../../../src/store/useStudents";

export default function EditStudent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateStudent, hydrate, hydrated, students } = useStudentsStore();

  useEffect(() => { if (!hydrated) hydrate(); }, [hydrated, hydrate]);
  if (!hydrated) return null;

  const student = students.find((it) => it.id === id);
  if (!student) return null;

  return (
    <View className="flex-1 px-4 py-4">
      <StudentForm
        initial={student}
        onSubmit={async (data) => {
          await updateStudent(student.id, data);
          router.replace(`/(trainer)/students/${student.id}`);
        }}
      />
    </View>
  );
}
