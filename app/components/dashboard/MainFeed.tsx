import React, { useEffect, useRef } from "react";
import { Dimensions, Image, ScrollView, Text, View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, ChevronRight, Play } from "lucide-react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");
const BRAND = { blue: "#005BAC", orange: "#FF5800" };

function SectionTitle({ children, action }: any) {
  return (
    <View className="flex-row items-end justify-between mb-3">
      <Text className="text-lg font-semibold text-gray-900">{children}</Text>
      {action ? <Text style={{ color: BRAND.blue }} className="text-xs font-medium">{action}</Text> : null}
    </View>
  );
}

function ProgressBar({ value }: { value: number }) {
  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(w, {
      toValue: Math.max(0, Math.min(1, value)),
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value]);
  const widthInterpolate = w.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <Animated.View style={{ width: widthInterpolate, height: 8, borderRadius: 999 }}>
        <LinearGradient colors={[BRAND.blue, BRAND.orange]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
      </Animated.View>
    </View>
  );
}

export default function MainFeed({
  featuredCourses,
  categories,
  coursesInProgress,
  recent,
}: {
  featuredCourses: any[];
  categories: { label: string; active: boolean }[];
  coursesInProgress: { title: string; progress: number; lessonsLeft: number }[];
  recent: { color: string; title: string; time: string }[];
}) {
  return (
    <>
      {/* Featured */}
      <Animatable.View animation="fadeInUp" delay={60} duration={400} useNativeDriver className="bg-white rounded-3xl p-4 mx-4 mt-5 border border-gray-100">
        <SectionTitle action="See all">Featured Courses</SectionTitle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourses.map((c, i) => (
            <Animatable.View
              key={i}
              animation="slideInRight"
              delay={i * 100}
              duration={360}
              useNativeDriver
              style={{ width: width * 0.7, marginRight: 16, borderRadius: 24, overflow: "hidden" }}
              className="bg-white border border-gray-100"
            >
              <View className="h-32 w-full overflow-hidden">
                <Image source={{ uri: c.image }} className="w-full h-full" />
                <LinearGradient colors={["#0000", "#0006"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" }} />
                <View style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                  <Text className="text-white font-semibold" numberOfLines={1}>{c.title}</Text>
                  <Text className="text-white/80 text-[11px]">{c.lessons} lessons · {c.time}</Text>
                </View>
              </View>
              <View className="p-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2">
                    <Play size={16} color={BRAND.blue} />
                  </View>
                  <Text className="text-[12px] text-gray-700">Resume</Text>
                </View>
                <View className="flex-row items-center">
                  <Text style={{ color: BRAND.blue }} className="text-[12px] font-semibold mr-1">Continue</Text>
                  <ArrowRight size={14} color={BRAND.blue} />
                </View>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>
      </Animatable.View>

      {/* Continue Learning */}
      <Animatable.View animation="fadeInUp" delay={140} duration={400} useNativeDriver className="bg-white rounded-3xl p-4 mx-4 mt-5 border border-gray-100">
        <SectionTitle action="See all">Continue Learning</SectionTitle>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          {categories.map((c, i) => (
            <Animatable.View
              key={i}
              animation="slideInRight"
              delay={i * 80}
              duration={260}
              useNativeDriver
              className={`mr-2 px-3 py-1.5 rounded-xl border ${c.active ? "bg-[#E6F4FE] border-[#BBD8F7]" : "bg-white border-gray-200"}`}
            >
              <Text style={{ color: c.active ? BRAND.blue : "#475569" }} className="text-[12px] font-medium">{c.label}</Text>
            </Animatable.View>
          ))}
        </ScrollView>

        {coursesInProgress.map((c, i) => (
          <Animatable.View key={i} animation="fadeInUp" delay={i * 100} duration={320} useNativeDriver className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-900 font-semibold">{c.title}</Text>
              <ChevronRight size={18} color="#94a3b8" />
            </View>
            <ProgressBar value={c.progress} />
            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-500 text-xs">{Math.round(c.progress * 100)}% complete</Text>
              <Text className="text-gray-500 text-xs">{c.lessonsLeft} lessons left</Text>
            </View>
          </Animatable.View>
        ))}
      </Animatable.View>

      {/* Announcement */}
      <Animatable.View animation="fadeInUp" delay={200} duration={400} useNativeDriver className="rounded-3xl p-4 mx-4 mt-5 border border-gray-100 overflow-hidden">
        <LinearGradient colors={["#F0F7FF", "#FFF3EC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: "absolute", inset: 0 }} />
        <View className="relative bg-white/70 backdrop-blur rounded-2xl p-3 border border-white">
          <Text className="text-gray-900 font-semibold">Admissions 2025 are open</Text>
          <Text className="text-gray-600 text-[12px] mt-1">Early-bird offers for React & Java tracks.</Text>
          <View className="self-start mt-2 px-3 py-1.5 rounded-xl" style={{ backgroundColor: BRAND.orange }}>
            <Text className="text-white text-[12px] font-semibold">Apply Now</Text>
          </View>
        </View>
      </Animatable.View>

      {/* Recent + Footer */}
      <Animatable.View animation="fadeInUp" delay={240} duration={400} useNativeDriver className="bg-white rounded-3xl p-4 mx-4 mt-5 border border-gray-100">
        <SectionTitle>Recent Activity</SectionTitle>
        {recent.map((r, i) => (
          <Animatable.View key={i} animation="fadeInUp" delay={i * 70} duration={240} useNativeDriver className="flex-row items-center bg-gray-50 p-3 rounded-2xl mb-2">
            <View className={`w-2 h-2 ${r.color} rounded-full mr-3`} />
            <Text className="text-gray-700 flex-1">{r.title}</Text>
            <Text className="text-gray-400 text-xs">{r.time}</Text>
          </Animatable.View>
        ))}
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={300} duration={380} useNativeDriver className="mx-4 mt-6 rounded-2xl overflow-hidden">
        <LinearGradient colors={[BRAND.blue, BRAND.orange]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 14 }}>
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-semibold">Need help choosing a course?</Text>
            <View className="px-3 py-1.5 rounded-xl bg-white/15 border border-white/30">
              <Text className="text-white text-[12px] font-semibold">Talk to Us</Text>
            </View>
          </View>
        </LinearGradient>
      </Animatable.View>
    </>
  );
}
