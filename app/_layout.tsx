import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import AppProvider from '@/context/AppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="process/createProcess" options={{ headerShown: true, title: 'Crear Proceso' }} />
            <Stack.Screen name="process/finishProcessPage" options={{ headerShown: true, title: 'Finalizar Proceso' }} />
            <Stack.Screen name="managment/registerRollMaterial" options={{ headerShown: true, title: 'Registrar Rollo' }} />
            <Stack.Screen name="managment/registerRawMaterial" options={{ headerShown: false, title: 'Registrar Rollo' }} />
            <Stack.Screen name="managment/inventory" options={{ headerShown: true, title: 'Inventario' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AppProvider>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
