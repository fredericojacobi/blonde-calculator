import { Text, Center, Button, Input, Select, VStack, useToast } from 'native-base';
import { Image } from 'react-native';

export default function Inicio() {

  return (
    <VStack
      flex={1}
      mx={12}
      my={5}
      justifyContent='center'
    >
      <Image
        source={require('../../assets/nazare.jpeg')}
        borderRadius={5}
        style={{ width: '100%' }}
      />
    </VStack>
  );
}