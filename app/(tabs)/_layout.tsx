import { router, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ViewProps } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/ui/TabBarIcon';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as SecureStore from 'expo-secure-store';

export type TabLayoutProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function TabLayout({ lightColor, darkColor }: TabLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'background');

  const checkAuthToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthToken()
  }, [])

  useEffect(() => {
    if(isAuthenticated === false) {
      router.replace("/auth/login")
    }
  }, [isAuthenticated])

  if (isAuthenticated === null) {
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={backgroundColor} />
          ), 
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Administración',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={backgroundColor} />
          ), 
        }}
      />
    </Tabs>
  );
}
