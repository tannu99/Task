// App.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';


const App: React.FC = () => {
  return (
    <AppNavigator/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
