// app/_layout.tsx
import { Stack } from "expo-router";

export default function Root() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* route groups */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(trainer)" options={{ headerShown: false }} />

      {/* top-level screens */}
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
