// src/components/molecules/SearchBarMolecule.tsx
import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Input} from '../atoms';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    setTimeout(() => {
      onSearch(text);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"grey"}
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: hp('6%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    width: wp('90%'),
    paddingLeft:wp("5%")
  },
});
