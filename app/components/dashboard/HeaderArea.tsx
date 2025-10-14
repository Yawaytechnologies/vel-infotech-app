// app/components/dashboard/HeaderArea.tsx
import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Platform, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Bell, Search, Filter } from "lucide-react-native";
import * as Animatable from "react-native-animatable";

const { width: SCREEN_W } = Dimensions.get("window");
const BRAND = { blue: "#005BAC", orange: "#FF5800", ink: "#0F172A", inkMuted: "#334155" };

export default function HeaderArea() {
  const bellRef = useRef<Animatable.View & View>(null);

  return (
    <Animatable.View animation="fadeInDown" duration={450} useNativeDriver className="bg-white">
      {/* Top brand stripe with a native-driver-safe shimmer */}
      <View style={{ position: "relative", overflow: "hidden" }}>
        <LinearGradient
          colors={[BRAND.blue, BRAND.orange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 3, width: "100%" }}
        />
        <Animatable.View
          animation={{
            from: { opacity: 0, transform: [{ translateX: -120 }] },
            0.15: { opacity: 0.35 },
            to: { opacity: 0, transform: [{ translateX: SCREEN_W + 120 }] },
          }}
          iterationCount="infinite"
          duration={2200}
          easing="ease-in-out"
          useNativeDriver
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 80,
            backgroundColor: "#fff",
          }}
        />
      </View>

      <View className="px-4 pt-10 pb-6">
        {/* Greeting row */}
        <Animatable.View animation="fadeInDown" delay={80} duration={400} useNativeDriver className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image source={{ uri: "https://i.pravatar.cc/100?img=12" }} className="w-10 h-10 rounded-full" />
            <View>
              <Text className="text-[11px] text-gray-500">Good Afternoon</Text>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold" style={{ color: BRAND.ink }}>Alex</Text>
                <Text className="text-xl ml-1">👋</Text>
              </View>
            </View>
          </View>

          <Animatable.View ref={bellRef as any}>
            <TouchableOpacity
              onPress={() => bellRef.current?.pulse?.(800)}
              className="relative p-2 rounded-full border border-gray-200 bg-white"
            >
              <Bell size={22} color={BRAND.inkMuted} />
              <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                <Text className="text-[10px] font-bold text-white">3</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>

        {/* Hero card */}
        <Animatable.View animation="slideInUp" delay={140} duration={450} useNativeDriver>
          <LinearGradient
            colors={["#F0F7FF", "#FFF3EC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, padding: 16, marginTop: 14 }}
          >
            <View className="flex-row items-center">
              <View style={{ flex: 1 }}>
                <Text className="text-[12px]" style={{ color: BRAND.blue }}>Vel Infotech</Text>
                <Text className="text-lg font-extrabold text-gray-900 mt-1">Powering Careers in Tech</Text>
                <Text className="text-gray-600 text-[12px] mt-1">
                  Learn React, Java, DevOps & more with real projects and placement guidance.
                </Text>
                <TouchableOpacity className="self-start mt-3 px-3 py-2 rounded-xl" style={{ backgroundColor: BRAND.blue }}>
                  <Text className="text-white text-[12px] font-semibold">Explore Courses</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600" }}
                className="w-20 h-20 rounded-2xl ml-3"
              />
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Search */}
        <Animatable.View animation="zoomIn" delay={220} duration={280} useNativeDriver className="flex-row items-center mt-4">
          <View
            className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-3 py-2 border border-gray-200"
            style={{
              ...(Platform.OS === "ios"
                ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } }
                : { elevation: 1 }),
            }}
          >
            <Search size={18} color="#64748b" />
            <TextInput
              placeholder="Search courses, topics, mentors…"
              placeholderTextColor="#94a3b8"
              className="ml-2 flex-1 text-gray-900"
            />
            <TouchableOpacity className="ml-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200">
              <Filter size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </Animatable.View>
  );
}
