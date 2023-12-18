import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationRef} from './RouterServices';
import {CreateNote, EditNote, NoteScreen} from '../screens';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
