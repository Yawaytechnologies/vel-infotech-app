// app/onboarding.tsx
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    LayoutAnimation,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    ScrollView,
    Text,
    UIManager,
    View
} from "react-native";

const { width } = Dimensions.get("window");
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* ---------- Animated background blobs ---------- */
function AnimatedBackground() {
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(t, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(t, { toValue: 0, duration: 6000, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, [t]);

  const blob1 = {
    transform: [
      { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [-30, 20] }) },
      { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) },
      { scale: t.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) },
    ],
    opacity: t.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.35] }),
  };
  const blob2 = {
    transform: [
      { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [30, -25] }) },
      { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [-10, 15] }) },
      { scale: t.interpolate({ inputRange: [0, 1], outputRange: [1.02, 0.96] }) },
    ],
    opacity: t.interpolate({ inputRange: [0, 1], outputRange: [0.18, 0.28] }),
  };

  return (
    <View className="absolute inset-0 overflow-hidden">
      <Animated.View style={blob1} className="absolute -top-16 -right-12 w-[260px] h-[260px] bg-blue-600 rounded-full" />
      <Animated.View style={blob2} className="absolute -bottom-20 -left-16 w-[320px] h-[320px] bg-indigo-500 rounded-full" />
      <View className="absolute inset-0 bg-white/70" />
    </View>
  );
}

/* ---------- Slide content ---------- */
type Slide = {
  key: string;
  title: string;
  subtitle: string;
  points: string[];     // benefit chips
  more: string;         // expandable paragraph
};

const slides: Slide[] = [
  {
    key: "personalized",
    title: "Personalized Learning",
    subtitle: "Adaptive paths and bite-sized lessons crafted for how you learn best.",
    points: ["AI Paths", "Daily Goals", "Smart Reminders"],
    more: "Our engine builds a learning plan around your pace, weak areas, and exam date—then adjusts weekly.",
  },
  {
    key: "live",
    title: "Live Doubt Solving",
    subtitle: "Get instant help from mentors. Ask, discuss, and learn—without friction.",
    points: ["1-click Doubts", "Threaded Chat", "Class Replays"],
    more: "Raise a doubt from any lesson, attach code or screenshots, and get mentor answers with citations.",
  },
  {
    key: "progress",
    title: "Progress You Can Feel",
    subtitle: "Streaks, quizzes, analytics—see your growth turn into confidence.",
    points: ["Skill Graphs", "Quiz Streaks", "Goal Tracker"],
    more: "Weekly insights show accuracy by topic, time-on-task, and suggested revisions to maximise retention.",
  },
  {
    key: "career",
    title: "From Skills to Careers",
    subtitle: "Projects and certificates that recruiters actually value.",
    points: ["Industry Projects", "Verified Certs", "Placement Prep"],
    more: "Build a portfolio from real briefs, get feedback, and export a shareable profile link for recruiters.",
  },
];

/* ---------- Small interactive chip ---------- */
function Chip({ label }: { label: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [selected, setSelected] = useState(false);

  const pressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="mr-2 mb-2">
      <Pressable
        onPress={() => setSelected(v => !v)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        className={`px-3 py-2 rounded-full border ${selected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}
      >
        <Text className={`text-xs font-semibold ${selected ? "text-white" : "text-gray-700"}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function Onboarding() {
  const ref = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  const [openMore, setOpenMore] = useState<Record<string, boolean>>({});

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const p = Math.round(e.nativeEvent.contentOffset.x / width);
    if (p !== page) setPage(p);
  };

  const next = () => {
    if (page < slides.length - 1) {
      ref.current?.scrollTo({ x: (page + 1) * width, animated: true });
      setPage(page + 1);
    } else {
      router.replace("/(auth)/login");
    }
  };

  const toggleMore = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenMore(s => ({ ...s, [key]: !s[key] }));
  };

  return (
    <View className="flex-1 bg-white">
      <AnimatedBackground />

      {/* Brand */}
      <View className="h-40 justify-center px-6">
        <Text className="text-blue-900 text-2xl font-extrabold">Vel Infotech</Text>
        <Text className="text-gray-600 mt-1">Learn • Practice • Get Placed</Text>
      </View>

      {/* Slides */}
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="-mt-4"
      >
        {slides.map((s) => (
          <View key={s.key} style={{ width }} className="px-6">
            <View className="bg-white/90 rounded-3xl shadow-lg p-6 border border-gray-100">
              <Text className="text-2xl font-extrabold text-blue-900">{s.title}</Text>
              <Text className="text-gray-600 mt-3 leading-6">{s.subtitle}</Text>

              {/* Benefit chips */}
              <View className="flex-row flex-wrap mt-4">
                {s.points.map(p => <Chip key={p} label={p} />)}
              </View>

              {/* Decorative lines */}
              <View className="mt-4">
                <View className="h-[3px] w-24 bg-blue-600 rounded-full" />
                <View className="h-[3px] w-12 bg-indigo-400 rounded-full mt-2" />
              </View>

              {/* Learn more (expand/collapse) */}
              <Pressable onPress={() => toggleMore(s.key)} className="mt-4">
                <Text className="text-blue-700 font-semibold">
                  {openMore[s.key] ? "Hide details" : "Learn more"}
                </Text>
              </Pressable>
              {openMore[s.key] && (
                <Text className="text-gray-600 mt-2 leading-6">{s.more}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View className="flex-row justify-center mt-5">
        {slides.map((_, i) => (
          <View key={i} className={`h-2 rounded-full mx-1 ${i === page ? "bg-blue-600 w-6" : "bg-gray-300 w-2"}`} />
        ))}
      </View>

      {/* Actions */}
      <View className="px-6 mt-6 mb-8">
        <Pressable className="bg-blue-600 rounded-2xl py-4 active:opacity-90" onPress={next}>
          <Text className="text-white text-center font-semibold">
            {page === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>

        <Pressable className="mt-3" onPress={() => router.replace("/(auth)/login")}>
          <Text className="text-center text-gray-500">Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}
