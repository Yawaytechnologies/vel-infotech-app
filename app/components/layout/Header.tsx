import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const AnimatedBottomHeader = () => {
  const [activeTab, setActiveTab] = useState(2); // Start with 3rd tab active (index 2)
  const scaleAnimations = useRef([
    new Animated.Value(0.8),
    new Animated.Value(0.8),
    new Animated.Value(1.2), // Start with 3rd tab scaled up
    new Animated.Value(0.8),
  ]).current;

  const opacityAnimations = useRef([
    new Animated.Value(0.7),
    new Animated.Value(0.7),
    new Animated.Value(1), // Start with 3rd tab fully opaque
    new Animated.Value(0.7),
  ]).current;

  const tabs = [
    { icon: 'home-outline', name: 'Home' },
    { icon: 'target', name: 'Target' },
    { icon: 'account-group-outline', name: 'People' },
    { icon: 'binoculars', name: 'Search' },
  ];

  const handleTabPress = (index) => {
    if (index === activeTab) return;

    // Animate previous active tab back to normal
    Animated.parallel([
      Animated.spring(scaleAnimations[activeTab], {
        toValue: 0.8,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(opacityAnimations[activeTab], {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate new active tab
    Animated.parallel([
      Animated.spring(scaleAnimations[index], {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(opacityAnimations[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setActiveTab(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;
            
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleTabPress(index)}
                activeOpacity={0.8}
                style={styles.tabButton}
              >
                <Animated.View
                  style={[
                    styles.tabCircle,
                    {
                      backgroundColor: isActive ? '#FF6B35' : '#404040',
                      transform: [{ scale: scaleAnimations[index] }],
                      opacity: opacityAnimations[index],
                    },
                  ]}
                >
                  <Icon
                    name={tab.icon}
                    size={24}
                    color={isActive ? '#FFFFFF' : '#B0B0B0'}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 34,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
    gap: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AnimatedBottomHeader;