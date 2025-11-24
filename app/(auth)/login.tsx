import { AntDesign, FontAwesome } from "@expo/vector-icons"; // ✅ icons
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  // === BUBBLE ANIMATIONS ===
  const bubble1 = useRef(new Animated.Value(0)).current;
  const bubble2 = useRef(new Animated.Value(0)).current;
  const bubble3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createLoop = (val: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );

    const loop1 = createLoop(bubble1, 2200);
    const loop2 = createLoop(bubble2, 2600);
    const loop3 = createLoop(bubble3, 2000);

    loop1.start();
    loop2.start();
    loop3.start();

    return () => {
      loop1.stop();
      loop2.stop();
      loop3.stop();
    };
  }, [bubble1, bubble2, bubble3]);

  const translate1 = bubble1.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 20],
  });

  const translate2 = bubble2.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -15],
  });

  const translate3 = bubble3.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, 25],
  });

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
      <View className="flex-1">
        {/* ===== LIGHTER, RANDOM BUBBLE BACKGROUND ===== */}
        <View style={{ position: "absolute", inset: 0 }} pointerEvents="none">
          {/* animated big central bubble (lighter) */}
          <Animated.View
            style={{
              position: "absolute",
              top: "30%",
              left: "-25%",
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: "#dbeafe", // blue-100
              opacity: 0.55,
              transform: [{ translateY: translate1 }],
            }}
          />
          {/* animated right bubble (lighter) */}
          <Animated.View
            style={{
              position: "absolute",
              top: "42%",
              right: "-30%",
              width: 230,
              height: 230,
              borderRadius: 115,
              backgroundColor: "#e0f2fe", // blue-50
              opacity: 0.5,
              transform: [{ translateY: translate2 }],
            }}
          />
          {/* animated small top bubble */}
          <Animated.View
            style={{
              position: "absolute",
              top: "18%",
              left: "55%",
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#eff6ff", // extra light
              opacity: 0.8,
              transform: [{ translateY: translate3 }],
            }}
          />

          {/* extra static random bubbles */}
          <View
            style={{
              position: "absolute",
              top: "8%",
              left: "8%",
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#e5edff",
              opacity: 0.7,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: "12%",
              right: "15%",
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: "#eef2ff",
              opacity: 0.9,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: "18%",
              left: "20%",
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#e0f2fe",
              opacity: 0.6,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: "10%",
              right: "10%",
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#dbeafe",
              opacity: 0.45,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: "55%",
              left: "45%",
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#f1f5ff",
              opacity: 0.9,
            }}
          />
        </View>

        {/* ===== FOREGROUND CONTENT (centered) ===== */}
        <View
          className="flex-1 px-8 pb-0 justify-center"
          style={{ zIndex: 2 }}
        >
          {/* Title */}
          <Text className="text-center text-2xl font-bold text-gray-900 mb-10">
            Login
          </Text>

          {/* Username / Email */}
          <View className="mb-6">
            <Text className="text-[11px] tracking-[1px] text-gray-500 mb-2">
              USERNAME OR EMAIL
            </Text>
            <TextInput
              className="border-b border-gray-300 pb-2 text-[13px] bg-transparent"
              placeholder="alishachenoy@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View className="mb-8">
            <Text className="text-[11px] tracking-[1px] text-gray-500 mb-2">
              ENTER PASSWORD
            </Text>
            <TextInput
              className="border-b border-gray-300 pb-2 text-[13px] bg-transparent"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              value={pwd}
              onChangeText={setPwd}
            />
          </View>

          {/* Primary button – BLUE */}
          <Pressable
            className="bg-blue-600 rounded-full py-3.5 mb-6"
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-center text-white font-semibold text-sm">
                LOGIN
              </Text>
            )}
          </Pressable>

          {/* Divider */}
          <Text className="text-center text-gray-400 text-[11px] mb-4">
            or Login With
          </Text>

          {/* Social buttons with icons */}
          <View className="flex-row justify-center space-x-3 mb-8">
            <Pressable className="flex-row items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 bg-[#f8fafc]">
              <AntDesign
                name="google"
                size={16}
                color="#4285F4"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs text-gray-700">Google</Text>
            </Pressable>

            <Pressable className="flex-row items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 bg-[#f8fafc]">
              <FontAwesome
                name="facebook"
                size={16}
                color="#4285F4"
                style={{ marginRight: 6 }}
              />
              <Text className="text-xs text-gray-700">Facebook</Text>
            </Pressable>
          </View>

          {/* Bottom link */}
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-center text-xs text-gray-500">
              New User?{" "}
              <Text className="text-blue-600 font-semibold">Sign Up Now</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
