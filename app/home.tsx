// // App.tsx
// import React, { useState } from "react";
// import { SafeAreaView, View, StatusBar } from "react-native";
// import Header from "./components/layout/Header";
// import Dashboard from "./components/dashboard/Dashboard";

// import { Course } from "../types";

// const App: React.FC = () => {
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

//   const studentName = "John Doe";

//   const courses: Course[] = [
//     { id: 1, title: "React Native Fundamentals", description: "Master the basics of React Native development", modules: 12, duration: "8 hours", progress: 45, color: "from-blue-500 to-blue-600" },
//     { id: 2, title: "Advanced JavaScript", description: "Deep dive into modern JavaScript concepts", modules: 15, duration: "10 hours", progress: 100, color: "from-yellow-500 to-orange-600" },
//     { id: 3, title: "UI/UX Design Principles", description: "Learn to create beautiful user interfaces", modules: 10, duration: "6 hours", progress: 0, color: "from-purple-500 to-pink-600" },
//     { id: 4, title: "Database Management", description: "Master MySQL and database design", modules: 14, duration: "12 hours", progress: 30, color: "from-green-500 to-teal-600" },
//     { id: 5, title: "API Development", description: "Build robust RESTful APIs", modules: 11, duration: "9 hours", progress: 75, color: "from-indigo-500 to-blue-600" },
//     { id: 6, title: "Mobile App Security", description: "Secure your mobile applications", modules: 8, duration: "5 hours", progress: 0, color: "from-red-500 to-pink-600" },
//   ];

//   const onBack = () => setSelectedCourse(null);

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
//       {/* Keep header outside the switch so it’s always visible */}
//       <Header
//         studentName={studentName}
//         // Show back button only when inside a course
//         showBack={!!selectedCourse}
//         onBack={onBack}
//         onLogout={onBack}
//       />

//       <View className="flex-1">
//         {selectedCourse ? (
//           <CourseLearningPage course={selectedCourse} onBack={onBack} />
//         ) : (
//           <Dashboard
//             studentName={studentName}
//             courses={courses}
//             onSelectCourse={setSelectedCourse}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;



// app/screens/Dashboard.tsx
import React from "react";
import { ScrollView, View } from "react-native";
import HeaderArea from "../app/components/dashboard/HeaderArea";
import StatsGrid from "../app/components/dashboard/StatsGrid";
import ActionsRow from "../app/components/dashboard/ActionsRow";
import MainFeed from "../app/components/dashboard/MainFeed";
import { BookOpen, Clock, TrendingUp, Star, Phone, MapPin } from "lucide-react-native";

const BRAND_PAGE_BG = "#F8F9FE";

const stats = [
  { label: "Courses Completed", value: "12", grad: ["#6AA9FF", "#005BAC"] as [string, string], icon: BookOpen },
  { label: "Hours Learned", value: "156", grad: ["#34D399", "#059669"] as [string, string], icon: Clock },
  { label: "Skills Mastered", value: "8", grad: ["#FCA5A5", "#EF4444"] as [string, string], icon: TrendingUp },
  { label: "Avg. Rating", value: "4.8", grad: ["#FBBF24", "#F59E0B"] as [string, string], icon: Star },
];

const quickActions = [
  { label: "Courses", tint: "bg-[#E6F4FE]", text: "text-[#005BAC]", Icon: BookOpen },
  { label: "Placements", tint: "bg-[#FFEDE5]", text: "text-[#FF5800]", Icon: TrendingUp },
  { label: "Continue", tint: "bg-[#EEF2FF]", text: "text-[#374151]", Icon: Clock },
  { label: "Contact Us", tint: "bg-[#FFF7ED]", text: "text-[#9A3412]", Icon: Phone },
  { label: "Locations", tint: "bg-[#F1F5F9]", text: "text-[#0F172A]", Icon: MapPin },
];

const categories = [
  { label: "React", active: true },
  { label: "Java", active: false },
  { label: "DevOps", active: false },
  { label: "Data", active: false },
  { label: "Cloud", active: false },
];

const featuredCourses = [
  { title: "React Native Essentials", lessons: 48, time: "12h", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800" },
  { title: "Full-Stack with Java",    lessons: 72, time: "20h", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" },
  { title: "DevOps Fundamentals",     lessons: 36, time: "9h",  image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800" },
];

const recent = [
  { color: "bg-[#005BAC]", title: 'Completed "React Fundamentals"', time: "2h ago" },
  { color: "bg-emerald-500", title: 'Started "Advanced JavaScript"', time: "5h ago" },
  { color: "bg-[#FF5800]", title: 'Earned "Quick Learner" badge', time: "1d ago" },
];

export default function Dashboard() {
  return (
    <ScrollView className="bg-[#F8F9FE]" contentContainerStyle={{ paddingBottom: 48 }} style={{ backgroundColor: BRAND_PAGE_BG }}>
      <HeaderArea />
      <StatsGrid stats={stats as any} />
      <ActionsRow actions={quickActions} />
      <MainFeed
        featuredCourses={featuredCourses}
        categories={categories}
        coursesInProgress={[
          { title: "React Native Essentials", progress: 0.62, lessonsLeft: 5 },
          { title: "Data Structures in JS",   progress: 0.35, lessonsLeft: 11 },
        ]}
        recent={recent}
      />
      <View className="h-6" />
    </ScrollView>
  );
}
