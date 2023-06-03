import { Center, Text, VStack } from 'native-base';
// import { useEffect, useRef } from 'react';
import { Image } from 'react-native';

export default function Inicio() {

  return (
    <VStack
      flex={1}
      bgColor='#BDC5A3'
      safeArea
    >
      <VStack>
        <Text
          fontSize='5xl'
          color='white'
        >
          Blonde Calculator
        </Text>
      </VStack>
      <VStack
        justifyContent='center'
        alignItems='center'
        bg='amber.100'
        flex={1}
      >
        <Center>
          <Image
            source={require('../../assets/bbf.png')}
            borderRadius={5}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        </Center>
      </VStack>
    </VStack>
  );
}