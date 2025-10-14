// // app/screens/Dashboard.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Platform,
//   Dimensions,
// } from "react-native";
// import {
//   Search,
//   Bell,
//   BookOpen,
//   Clock,
//   TrendingUp,
//   Star,
//   Filter,
//   ChevronRight,
//   Sparkle,
//   Phone,
//   MapPin,
//   ArrowRight,
//   Play,
// } from "lucide-react-native";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");

// /* -------------------- Brand Palette -------------------- */
// const BRAND = {
//   blue: "#005BAC",
//   orange: "#FF5800",
//   ink: "#0F172A",
//   inkMuted: "#334155",
//   pageBg: "#F8F9FE",
// };

// /* -------------------- Data -------------------- */
// const stats = [
//   { label: "Courses Completed", value: "12", grad: ["#6AA9FF", "#005BAC"], icon: BookOpen },
//   { label: "Hours Learned", value: "156", grad: ["#34D399", "#059669"], icon: Clock },
//   { label: "Skills Mastered", value: "8", grad: ["#FCA5A5", "#EF4444"], icon: TrendingUp },
//   { label: "Avg. Rating", value: "4.8", grad: ["#FBBF24", "#F59E0B"], icon: Star },
// ];

// const quickActions = [
//   { label: "Courses", tint: "bg-[#E6F4FE]", text: "text-[#005BAC]", Icon: BookOpen },
//   { label: "Placements", tint: "bg-[#FFEDE5]", text: "text-[#FF5800]", Icon: TrendingUp },
//   { label: "Continue", tint: "bg-[#EEF2FF]", text: "text-[#374151]", Icon: Clock },
//   { label: "Contact Us", tint: "bg-[#FFF7ED]", text: "text-[#9A3412]", Icon: Phone },
//   { label: "Locations", tint: "bg-[#F1F5F9]", text: "text-[#0F172A]", Icon: MapPin },
// ];

// const categories = [
//   { label: "React", active: true },
//   { label: "Java", active: false },
//   { label: "DevOps", active: false },
//   { label: "Data", active: false },
//   { label: "Cloud", active: false },
// ];

// const featuredCourses = [
//   {
//     title: "React Native Essentials",
//     lessons: 48,
//     time: "12h",
//     image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800",
//   },
//   {
//     title: "Full-Stack with Java",
//     lessons: 72,
//     time: "20h",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
//   },
//   {
//     title: "DevOps Fundamentals",
//     lessons: 36,
//     time: "9h",
//     image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800",
//   },
// ];

// const recent = [
//   { color: "bg-[#005BAC]", title: 'Completed "React Fundamentals"', time: "2h ago" },
//   { color: "bg-emerald-500", title: 'Started "Advanced JavaScript"', time: "5h ago" },
//   { color: "bg-[#FF5800]", title: 'Earned "Quick Learner" badge', time: "1d ago" },
// ];

// const coursesInProgress = [
//   { title: "React Native Essentials", progress: 0.62, lessonsLeft: 5 },
//   { title: "Data Structures in JS", progress: 0.35, lessonsLeft: 11 },
// ];

// /* -------------------- UI Bits -------------------- */
// const SectionTitle = ({ children, action }: any) => (
//   <View className="flex-row items-end justify-between mb-3">
//     <Text className="text-lg font-semibold text-gray-900">{children}</Text>
//     {action ? (
//       <TouchableOpacity>
//         <Text style={{ color: BRAND.blue }} className="text-xs font-medium">
//           {action}
//         </Text>
//       </TouchableOpacity>
//     ) : null}
//   </View>
// );

// const ProgressBar = ({ value }: { value: number }) => (
//   <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//     <LinearGradient
//       colors={[BRAND.blue, BRAND.orange]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={{
//         width: `${Math.min(Math.max(value, 0), 1) * 100}%`,
//         height: 8,
//         borderRadius: 999,
//       }}
//     />
//   </View>
// );

// const StatCard = ({ label, value, grad, icon: Icon }: any) => (
//   <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 24 }}>
//     <View
//       className="flex-1 rounded-3xl p-4"
//       style={{
//         backgroundColor: "transparent",
//       }}
//     >
//       <View className="flex-row items-center justify-between">
//         <View className="p-2 rounded-2xl bg-white/20">
//           <Icon size={22} color="#fff" />
//         </View>
//         <Sparkle size={16} color="#ffffffcc" />
//       </View>
//       <Text className="text-3xl font-extrabold text-white mt-3">{value}</Text>
//       <Text className="text-white/90 text-xs mt-1">{label}</Text>
//     </View>
//   </LinearGradient>
// );

// const ImageCourseCard = ({ title, lessons, time, image }: any) => (
//   <TouchableOpacity
//     activeOpacity={0.9}
//     style={{ width: width * 0.7 }}
//     className="mr-4 rounded-3xl overflow-hidden bg-white border border-gray-100"
//   >
//     <View className="h-32 w-full overflow-hidden">
//       <Image source={{ uri: image }} className="w-full h-full" />
//       <LinearGradient
//         colors={["#00000000", "#00000066"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" }}
//       />
//       <View style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
//         <Text className="text-white font-semibold" numberOfLines={1}>
//           {title}
//         </Text>
//         <Text className="text-white/80 text-[11px]">
//           {lessons} lessons · {time}
//         </Text>
//       </View>
//     </View>

//     <View className="p-3 flex-row items-center justify-between">
//       <View className="flex-row items-center">
//         <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2">
//           <Play size={16} color={BRAND.blue} />
//         </View>
//         <Text className="text-[12px] text-gray-700">Resume</Text>
//       </View>
//       <View className="flex-row items-center">
//         <Text style={{ color: BRAND.blue }} className="text-[12px] font-semibold mr-1">
//           Continue
//         </Text>
//         <ArrowRight size={14} color={BRAND.blue} />
//       </View>
//     </View>
//   </TouchableOpacity>
// );

// /* -------------------- Screen -------------------- */
// const Dashboard = () => {
//   return (
//     <ScrollView
//       className="bg-[#F8F9FE]"
//       contentContainerStyle={{ paddingBottom: 48 }}
//       style={{ backgroundColor: BRAND.pageBg }}
//     >
//       {/* ===== HERO ===== */}
//       <View className="bg-white">
//         {/* brand top gradient strip */}
//         <LinearGradient
//           colors={[BRAND.blue, BRAND.orange]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={{ height: 3, width: "100%" }}
//         />
//         <View className="px-4 pt-10 pb-6">
//           {/* greeting + bell */}
//           <View className="flex-row items-center justify-between">
//             <View className="flex-row items-center gap-3">
//               <Image source={{ uri: "https://i.pravatar.cc/100?img=12" }} className="w-10 h-10 rounded-full" />
//               <View>
//                 <Text className="text-[11px] text-gray-500">Good Afternoon</Text>
//                 <View className="flex-row items-center">
//                   <Text className="text-xl font-bold" style={{ color: BRAND.ink }}>
//                     Alex
//                   </Text>
//                   <Text className="text-xl ml-1">👋</Text>
//                 </View>
//               </View>
//             </View>

//             <TouchableOpacity className="relative p-2 rounded-full border border-gray-200 bg-white">
//               <Bell size={22} color={BRAND.inkMuted} />
//               <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
//                 <Text className="text-[10px] font-bold text-white">3</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           {/* hero promo */}
//           <LinearGradient
//             colors={["#F0F7FF", "#FFF3EC"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={{
//               borderRadius: 24,
//               padding: 16,
//               marginTop: 14,
//             }}
//           >
//             <View className="flex-row items-center">
//               <View style={{ flex: 1 }}>
//                 <Text className="text-[12px]" style={{ color: BRAND.blue }}>
//                   Vel Infotech
//                 </Text>
//                 <Text className="text-lg font-extrabold text-gray-900 mt-1" numberOfLines={2}>
//                   Powering Careers in Tech
//                 </Text>
//                 <Text className="text-gray-600 text-[12px] mt-1" numberOfLines={2}>
//                   Learn React, Java, DevOps & more with real projects and placement guidance.
//                 </Text>
//                 <TouchableOpacity
//                   activeOpacity={0.9}
//                   className="self-start mt-3 px-3 py-2 rounded-xl"
//                   style={{ backgroundColor: BRAND.blue }}
//                 >
//                   <Text className="text-white text-[12px] font-semibold">Explore Courses</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* hero image */}
//               <View className="ml-3">
//                 <Image
//                   source={{ uri: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600" }}
//                   className="w-20 h-20 rounded-2xl"
//                 />
//               </View>
//             </View>
//           </LinearGradient>

//           {/* search */}
//           <View className="flex-row items-center mt-4">
//             <View
//               className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-3 py-2 border border-gray-200"
//               style={{
//                 ...(Platform.OS === "ios"
//                   ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } }
//                   : { elevation: 1 }),
//               }}
//             >
//               <Search size={18} color="#64748b" />
//               <TextInput
//                 placeholder="Search courses, topics, mentors…"
//                 placeholderTextColor="#94a3b8"
//                 className="ml-2 flex-1 text-gray-900"
//               />
//               <TouchableOpacity className="ml-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200">
//                 <Filter size={16} color="#64748b" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* ===== STATS ===== */}
//       <View className="px-4 mt-4">
//         <View className="flex-row gap-3">
//           <StatCard label={stats[0].label} value={stats[0].value} grad={stats[0].grad} icon={stats[0].icon} />
//           <StatCard label={stats[1].label} value={stats[1].value} grad={stats[1].grad} icon={stats[1].icon} />
//         </View>
//         <View className="flex-row gap-3 mt-3">
//           <StatCard label={stats[2].label} value={stats[2].value} grad={stats[2].grad} icon={stats[2].icon} />
//           <StatCard label={stats[3].label} value={stats[3].value} grad={stats[3].grad} icon={stats[3].icon} />
//         </View>
//       </View>

//       {/* ===== QUICK ACTIONS ===== */}
//       <View className="bg-white rounded-3xl p-4 mx-4 mt-5 shadow-sm border border-gray-100">
//         <View className="flex-row items-center justify-between mb-3">
//           <Text className="text-lg font-semibold text-gray-900">Quick Actions</Text>
//           <Text className="text-xs text-gray-500">{quickActions.length} shortcuts</Text>
//         </View>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
//           {quickActions.map((a, i) => {
//             const IconComp = a.Icon;
//             return (
//               <TouchableOpacity key={i} activeOpacity={0.9} className="mr-3 rounded-2xl border border-gray-100 overflow-hidden">
//                 {/* brand ring */}
//                 <LinearGradient
//                   colors={[BRAND.blue, BRAND.orange]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{ padding: 1, borderRadius: 16 }}
//                 >
//                   <LinearGradient
//                     colors={["#ffffff", "#f8fafc"]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       borderRadius: 16,
//                       paddingHorizontal: 16,
//                       paddingVertical: 12,
//                       minWidth: 140,
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <View className={`w-8 h-8 rounded-full ${a.tint} items-center justify-center mr-2 border border-white/70`}>
//                       <IconComp size={18} color="#111827" />
//                     </View>
//                     <Text className={`font-medium ${a.text}`}>{a.label}</Text>
//                   </LinearGradient>
//                 </LinearGradient>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//       </View>

//       {/* ===== FEATURED COURSES (CAROUSEL) ===== */}
//       <View className="bg-white rounded-3xl p-4 mx-4 mt-5 shadow-sm border border-gray-100">
//         <SectionTitle action="See all">Featured Courses</SectionTitle>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {featuredCourses.map((c, i) => (
//             <ImageCourseCard key={i} {...c} />
//           ))}
//         </ScrollView>
//       </View>

//       {/* ===== CONTINUE LEARNING ===== */}
//       <View className="bg-white rounded-3xl p-4 mx-4 mt-5 shadow-sm border border-gray-100">
//         <SectionTitle action="See all">Continue Learning</SectionTitle>

//         {/* category chips */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
//           {categories.map((c, i) => (
//             <TouchableOpacity key={i} activeOpacity={0.9} className={`mr-2 px-3 py-1.5 rounded-xl border ${c.active ? "bg-[#E6F4FE] border-[#BBD8F7]" : "bg-white border-gray-200"}`}>
//               <Text style={{ color: c.active ? BRAND.blue : "#475569" }} className="text-[12px] font-medium">
//                 {c.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {coursesInProgress.map((c, i) => (
//           <TouchableOpacity key={i} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm mb-3">
//             <View className="flex-row items-center justify-between mb-2">
//               <Text className="text-gray-900 font-semibold">{c.title}</Text>
//               <ChevronRight size={18} color="#94a3b8" />
//             </View>
//             <ProgressBar value={c.progress} />
//             <View className="flex-row justify-between mt-2">
//               <Text className="text-gray-500 text-xs">{Math.round(c.progress * 100)}% complete</Text>
//               <Text className="text-gray-500 text-xs">{c.lessonsLeft} lessons left</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* ===== ANNOUNCEMENTS ===== */}
//       <View className="rounded-3xl p-4 mx-4 mt-5 shadow-sm border border-gray-100 overflow-hidden">
//         <LinearGradient colors={["#F0F7FF", "#FFF3EC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: "absolute", inset: 0 }} />
//         <View className="relative">
//           <SectionTitle>Announcements</SectionTitle>
//           <View className="bg-white/70 backdrop-blur rounded-2xl p-3 border border-white">
//             <Text className="text-gray-900 font-semibold">Admissions 2025 are open</Text>
//             <Text className="text-gray-600 text-[12px] mt-1">Early-bird offers available for React & Java tracks.</Text>
//             <TouchableOpacity activeOpacity={0.9} className="self-start mt-2 px-3 py-1.5 rounded-xl" style={{ backgroundColor: BRAND.orange }}>
//               <Text className="text-white text-[12px] font-semibold">Apply Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* ===== RECENT ACTIVITY ===== */}
//       <View className="bg-white rounded-3xl p-4 mx-4 mt-5 shadow-sm border border-gray-100">
//         <SectionTitle>Recent Activity</SectionTitle>
//         {recent.map((r, i) => (
//           <View key={i} className="flex-row items-center bg-gray-50 p-3 rounded-2xl mb-2">
//             <View className={`w-2 h-2 ${r.color} rounded-full mr-3`} />
//             <Text className="text-gray-700 flex-1">{r.title}</Text>
//             <Text className="text-gray-400 text-xs">{r.time}</Text>
//           </View>
//         ))}
//       </View>

//       {/* ===== FOOTER STRIP ===== */}
//       <View className="mx-4 mt-6 rounded-2xl overflow-hidden">
//         <LinearGradient colors={[BRAND.blue, BRAND.orange]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 14 }}>
//           <View className="flex-row items-center justify-between">
//             <Text className="text-white font-semibold">Need help choosing a course?</Text>
//             <TouchableOpacity activeOpacity={0.9} className="px-3 py-1.5 rounded-xl bg-white/15 border border-white/30">
//               <Text className="text-white text-[12px] font-semibold">Talk to Us</Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>
//       </View>

//       <View className="h-6" />
//     </ScrollView>
//   );
// };

// export default Dashboard;
    