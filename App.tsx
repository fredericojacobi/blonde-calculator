import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./components/TabNavigation/TabNavigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}