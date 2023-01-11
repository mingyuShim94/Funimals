import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodayStack from './Stacks';

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{headerShown: false }}>
    <Nav.Screen name="Stacks" component={TodayStack} />
  </Nav.Navigator>
);

export default Root;