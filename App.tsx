import React, { useEffect, useRef, useState } from 'react';
import { Box, NativeBaseProvider, Progress, Spinner, Text, VStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './components/TabNavigation/TabNavigation';
import { Image, Animated } from 'react-native';

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

  const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setShowSplashScreen(false);
    }, 2490);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prevProgress) => {
        const newProgress = (prevProgress * 1.1);
        if (newProgress > 90)
          return 100;
        return newProgress;
      });
    }, 15);
  }, [progress]);

  return (
    <NativeBaseProvider>
      {showSplashScreen ? (
        <VStack
          flex={1}
          bgColor='#BDC5A3'
        >
          <VStack
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <Image
              source={require('./assets/bbf.png')}
              borderRadius={5}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          </VStack>
          <Progress
            bg="coolGray.100"
            _filledTrack={{
              bg: "#909E64"
            }} value={progress}
            mx="4"
            mb={60}
          />
        </VStack>
      ) : (
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}