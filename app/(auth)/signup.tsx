import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!name || !email || !pwd) return alert("Fill all fields");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 800);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-extrabold text-blue-900 mb-6">Create your account</Text>

      <TextInput className="border border-gray-300 rounded-2xl px-4 py-3 mb-4" placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput className="border border-gray-300 rounded-2xl px-4 py-3 mb-4" placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput className="border border-gray-300 rounded-2xl px-4 py-3 mb-5" placeholder="Password" secureTextEntry value={pwd} onChangeText={setPwd} />

      <Pressable className="bg-blue-600 rounded-2xl py-4 active:opacity-90" onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text className="text-white text-center font-semibold">Sign up</Text>}
      </Pressable>

      <Pressable className="mt-4" onPress={() => router.back()}>
        <Text className="text-center text-gray-600">Already have an account? <Text className="text-blue-700 font-semibold">Sign in</Text></Text>
      </Pressable>
    </View>
  );
}
