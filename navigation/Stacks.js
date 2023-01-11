import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ListView from '../ListView';
import SlideView from '../SlideView';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';

const NativeStack = createNativeStackNavigator();
const ListHeaderView = styled.View`
  backgroundColor: skyblue;
  align-items: center;
  padding-vertical:10;
`;

const ListHeaderText = styled.Text`
  font-family:fon;
  font-size:17;
`;

const SlideHeaderView = styled.TouchableOpacity`
  paddingLeft:5;
  paddingTop:5;
`;

const TodayStack = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    fon: require('../assets/fonts/BinggraeSamanco-Bold.ttf'),
  });
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="동물빵빵"
        component={ListView}
        options={{
          header: () => (
            <ListHeaderView>
              <ListHeaderText>{'동물빵빵'}</ListHeaderText>
            </ListHeaderView>
          ),
        }}
      />
      <NativeStack.Screen
        name="SlideView"
        component={SlideView}
        options={{
          headerTransparent: true,
          title: null,
        }}
      />
    </NativeStack.Navigator>
  );
};
export default TodayStack;
