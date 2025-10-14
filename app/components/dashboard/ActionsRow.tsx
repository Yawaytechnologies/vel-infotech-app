// app/components/dashboard/ActionsRow.tsx
import React, { useRef } from "react";
import {
  View,
  Text,
  Platform,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const BRAND = { blue: "#005BAC", orange: "#FF5800" };
type QA = { label: string; tint: string; text: string; Icon: any; onPress?: () => void };

function ActionPill({
  a,
  index,
}: {
  a: QA;
  index: number;
}) {
  const IconComp = a.Icon;
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();

  return (
    <Animatable.View
      animation="slideInRight"
      delay={index * 90}
      duration={360}
      useNativeDriver
      style={{ marginRight: 12, borderRadius: 18, overflow: "visible" }}
    >
      {/* Gradient halo behind card */}
      <LinearGradient
        colors={["#532929ff", "#f8fafc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 1,
          borderRadius: 18,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          ...(Platform.OS === "android" ? { elevation: 3 } : {}),
        }}
      >
        <LinearGradient
          colors={["#ffffff", "#fbfbfe"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 16 }}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
              android_ripple={{ color: "#edf2ff", borderless: false }}
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={a.onPress}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icon bubble with subtle inner gradient ring */}
              <LinearGradient
                colors={[BRAND.blue, BRAND.orange]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  padding: 1,
                  marginRight: 10,
                }}
              >
                <View
                  className={`flex-1 rounded-full ${a.tint} items-center justify-center`}
                  style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.7)" }}
                >
                  <IconComp size={18} color="#111827" />
                </View>
              </LinearGradient>

              {/* Label */}
              <View style={{ minWidth: 80 }}>
                <Text className={`text-[13px] font-semibold ${a.text}`} numberOfLines={1}>
                  {a.label}
                </Text>
                <Text className="text-[10px] text-gray-400 mt-[2px]">Tap to open</Text>
              </View>
            </Pressable>
          </Animated.View>
        </LinearGradient>
      </LinearGradient>
    </Animatable.View>
  );
}

export default function ActionsRow({ actions }: { actions: QA[] }) {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={380}
      delay={60}
      useNativeDriver
      className="bg-white rounded-3xl p-4 mx-4 mt-5 border border-gray-100"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        ...(Platform.OS === "android" ? { elevation: 2 } : {}),
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900">Quick Actions</Text>
        <View className="px-2 py-1 rounded-full bg-gray-100">
          <Text className="text-[11px] text-gray-600">{actions.length} shortcuts</Text>
        </View>
      </View>

      {/* Horizontal scroll so items never clip on small screens */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 12 }}
      >
        {actions.map((a, i) => (
          <ActionPill key={`${a.label}-${i}`} a={a} index={i} />
        ))}
      </ScrollView>
    </Animatable.View>
  );
}
