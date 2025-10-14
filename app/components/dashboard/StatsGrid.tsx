// app/components/dashboard/StatsGrid.tsx
import React, { useRef } from "react";
import { View, Text, Platform, Animated, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkle } from "lucide-react-native";
import * as Animatable from "react-native-animatable";

type Stat = {
  label: string;
  value: string;
  grad: [string, string];
  icon: any;
  subtitle?: string;        // optional small caption
  delta?: string;           // e.g. "+12%" or "-3%"
  deltaType?: "up" | "down" // trend color
};

const Glass = ({ children, ring }: { children: React.ReactNode; ring: [string, string] }) => (
  <LinearGradient
    colors={ring}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      flex: 1,
      borderRadius: 24,
      padding: 1.5,
    }}
  >
    <View
      style={{
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* subtle background gradient */}
      <LinearGradient
        colors={["rgba(255,255,255,0.75)", "rgba(255,255,255,0.55)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 14 }}
      >
        {children}
      </LinearGradient>
    </View>
  </LinearGradient>
);

function StatCard({
  label,
  value,
  grad,
  Icon,
  delay = 0,
  subtitle,
  delta,
  deltaType = "up",
}: {
  label: string;
  value: string;
  grad: [string, string];
  Icon: any;
  delay?: number;
  subtitle?: string;
  delta?: string;
  deltaType?: "up" | "down";
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();

  // sheen animation (Animatable)
  const Sheen = () => (
    <Animatable.View
      animation={{
        from: { translateX: -120, opacity: 0 },
        0.1: { opacity: 0.4 },
        to: { translateX: 220, opacity: 0 },
      }}
      iterationCount="infinite"
      duration={2200}
      delay={400 + delay}
      easing="ease-in-out"
      useNativeDriver
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 60,
        transform: [{ rotate: "15deg" }],
        backgroundColor: "rgba(255,255,255,0.18)",
        filter: Platform.OS === "web" ? "blur(10px)" : undefined,
      }}
    />
  );

  const trendColor =
    delta && delta.startsWith("-")
      ? "rgba(239,68,68,1)" // red-500
      : "rgba(34,197,94,1)"; // green-500

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={delay}
      duration={360}
      useNativeDriver
      style={{
        flex: 1,
        borderRadius: 24,
        overflow: "hidden",
        ...(Platform.OS === "android" ? { elevation: 1 } : {}),
      }}
    >
      {/* outer glow to mimic depth */}
      <LinearGradient
        colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0)"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 0, borderRadius: 24 }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable onPressIn={pressIn} onPressOut={pressOut} style={{ padding: 0, borderRadius: 24 }}>
            <Glass ring={grad}>
              {/* floating coin icon */}
              <View style={{ position: "absolute", right: 12, top: 10 }}>
                <LinearGradient
                  colors={[grad[0], grad[1]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0.9,
                  }}
                >
                  <Icon size={18} color="#fff" />
                </LinearGradient>
              </View>

              {/* sheen */}
              <Sheen />

              {/* content */}
              <View className="rounded-3xl">
                <View className="flex-row items-center justify-between">
                  {/* tiny sparkle accent */}
                  <Sparkle size={14} color="rgba(0,0,0,0.35)" />
                </View>

                <Text className="text-3xl font-extrabold text-gray-900 mt-2">{value}</Text>
                <Text className="text-gray-600 text-[12px] mt-1">{label}</Text>
                {!!subtitle && <Text className="text-gray-400 text-[11px] mt-1">{subtitle}</Text>}

                {/* trend pill */}
                {!!delta && (
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 999,
                      backgroundColor:
                        deltaType === "down"
                          ? "rgba(254,226,226,0.85)" // red-100/opaque
                          : "rgba(220,252,231,0.85)", // green-100/opaque
                    }}
                  >
                    <Text style={{ color: trendColor, fontWeight: "700", fontSize: 12 }}>{delta}</Text>
                  </View>
                )}
              </View>
            </Glass>
          </Pressable>
        </Animated.View>
      </LinearGradient>
    </Animatable.View>
  );
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <View className="px-4 mt-4">
      <View className="flex-row gap-3">
        <StatCard
          label={stats[0].label}
          value={stats[0].value}
          grad={stats[0].grad}
          Icon={stats[0].icon}
          subtitle="this month"
          delta="+12%"
          delay={60}
        />
        <StatCard
          label={stats[1].label}
          value={stats[1].value}
          grad={stats[1].grad}
          Icon={stats[1].icon}
          subtitle="this week"
          delta="+4%"
          delay={120}
        />
      </View>
      <View className="flex-row gap-3 mt-3">
        <StatCard
          label={stats[2].label}
          value={stats[2].value}
          grad={stats[2].grad}
          Icon={stats[2].icon}
          subtitle="since last login"
          delta="-3%"
          deltaType="down"
          delay={180}
        />
        <StatCard
          label={stats[3].label}
          value={stats[3].value}
          grad={stats[3].grad}
          Icon={stats[3].icon}
          subtitle="lifetime"
          delta="+0.8%"
          delay={240}
        />
      </View>
    </View>
  );
}
