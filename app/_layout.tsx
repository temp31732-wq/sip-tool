import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '../src/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'SIP Calculator',
            headerStyle: {
              backgroundColor: '#1e40af',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerShadowVisible: false,
          }} 
        />
      </Stack>
    </>
  );
}