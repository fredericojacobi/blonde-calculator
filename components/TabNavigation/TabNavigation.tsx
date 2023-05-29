import * as React from 'react';
import { Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Liquidos from '../../screens/liquidos/liquidos';
import Solidos from '../../screens/solidos/solidos';
import Inicio from '../../screens/inicio/inicio';
import Historico from '../../screens/historico/historico';
import { removeData } from '../../utils/funcoes/localStorage';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Início"
        component={Inicio}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sólidos"
        component={Solidos}
        options={{
          tabBarLabel: 'Sólidos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wall" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Líquidos"
        component={Liquidos}
        options={{
          tabBarLabel: 'Líquidos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="liquid-spot" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Histórico de Resultados"
        component={Historico}
        options={{
          tabBarLabel: 'Histórico',
          headerRight: () => (
            <MaterialCommunityIcons name='trash-can-outline' size={22} style={{ marginRight: 18 }} onPress={limparHistorico} />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  function limparHistorico(): void {
    Alert.alert('Excluir', 'Deseja excluir o histórico de conversões?', [{ text: 'Ok', onPress: () => handleLimparHistorico() }, { text: 'Cancel' }]);
  }

  function handleLimparHistorico(): void {
    removeData('historico');
  }
}