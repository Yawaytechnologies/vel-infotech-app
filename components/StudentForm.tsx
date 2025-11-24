import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StudentInput, Student } from "../src/types/student";

type Props = {
  initial?: Student;
  onSubmit: (data: StudentInput) => Promise<void> | void;
};

export default function StudentForm({ initial, onSubmit }: Props) {
  const [form, setForm] = useState<StudentInput>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    phone: initial?.phone ?? "",
    course: initial?.course ?? "",
    batch: initial?.batch ?? "",
    notes: initial?.notes ?? "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof StudentInput, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    try { await onSubmit(form); } finally { setLoading(false); }
  };

  const Field = ({
    label,
    value,
    onChangeText,
    keyboardType = "default",
    multiline = false,
  }: {
    label: string;
    value: string;
    onChangeText: (t: string) => void;
    keyboardType?: "default" | "email-address" | "phone-pad";
    multiline?: boolean;
  }) => (
    <View className="mb-3">
      <Text className="text-slate-700 mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor="#6B7280"
        className="bg-white border border-slate-300 rounded-2xl px-3 py-2 text-slate-900"
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-white px-1">
        <Field label="Full Name *" value={form.name} onChangeText={(t) => update("name", t)} />
        <Field label="Email *" value={form.email} onChangeText={(t) => update("email", t)} keyboardType="email-address" />
        <Field label="Phone" value={form.phone ?? ""} onChangeText={(t) => update("phone", t)} keyboardType="phone-pad" />
        <Field label="Course" value={form.course} onChangeText={(t) => update("course", t)} />
        <Field label="Batch" value={form.batch} onChangeText={(t) => update("batch", t)} />
        <Field label="Notes" value={form.notes ?? ""} onChangeText={(t) => update("notes", t)} multiline />
      </ScrollView>

      <TouchableOpacity onPress={handleSave} disabled={loading} className="mt-2 bg-blue-600 rounded-2xl px-4 py-3">
        <Text className="text-white text-center font-semibold">{loading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
