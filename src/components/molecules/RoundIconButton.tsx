import React, { ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface RoundIconButtonProps {
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  button_style?: StyleProp<ViewStyle>; // New prop for the button style
}

export const RoundIconButton: React.FC<RoundIconButtonProps> = ({
  onPress,
  children,
  style,
  button_style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
      <View style={[styles.button, button_style]}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    // Customize the default styles or leave it empty
  },
});
