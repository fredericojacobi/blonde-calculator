import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, value: any) {
  const json = JSON.stringify(value);
  return await AsyncStorage.setItem(key, json);
};

export async function retrieveData<T>(key: string): Promise<T> {
  const result = await AsyncStorage.getItem(key);
  if(result){
    return JSON.parse(result ?? '');
  }
  return Object.assign([]);
};

export async function removeData(key: string) {
  return await AsyncStorage.removeItem(key);
};