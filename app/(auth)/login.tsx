// app/(auth)/login.tsx
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const onSubmit = () => {
    if (!email || !pwd) return alert("Enter email & password");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 800);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with safe top padding to avoid camera/notch */}
      <View style={{ paddingTop: insets.top + 8 }} className="items-center">
        <View className="w-full h-44 bg-blue-600 rounded-b-[28px] items-center justify-center px-6">
          {/* ↓ reduce logo size & keep away from status bar */}
          <Image source={require("../../assets/images/LL.png")} style={{ width: 60, height: 60 }} resizeMode="contain" />
          <Text className="text-white text-2xl font-extrabold mt-2">Welcome back</Text>
          <Text className="text-blue-100">Sign in to continue learning</Text>
        </View>
      </View>

      {/* Centered form card */}
      <View className="flex-1 justify-center px-6 -mt-16">
        <View className="bg-white rounded-3xl shadow-lg p-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-2xl px-4 py-3 mb-4"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-2xl px-4 py-3 mb-5"
            placeholder="••••••••"
            secureTextEntry
            value={pwd}
            onChangeText={setPwd}
          />

          <Pressable className="bg-blue-600 rounded-2xl py-4 active:opacity-90" onPress={onSubmit} disabled={loading}>
            {loading ? <ActivityIndicator /> : <Text className="text-white text-center font-semibold">Sign in</Text>}
          </Pressable>

          <Pressable className="mt-4" onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-center text-gray-600">
              New here? <Text className="text-blue-700 font-semibold">Create an account</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
