import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, View, SafeAreaView } from "react-native";

export default function Splash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        isInteraction: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ]).start(() => {
      setTimeout(() => router.replace("/onboarding"), 900); // total ~1.5s
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <Image
            source={require("../assets/images/LL.png")}
            style={{ width: 140, height: 140 }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
