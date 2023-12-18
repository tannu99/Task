// YourScreen.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NoteList} from '../components/organisms';
import {RoundIconButton, SearchBar} from '../components/molecules';
import {Add, Trash} from 'iconsax-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {navigate} from '../navigation/RouterServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {SmallImage} from '../components/atoms';
interface Note {
  title: string;
  content: string;
  date: string;
}

export const NoteScreen: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadNotes = useCallback(async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const allNotes = JSON.parse(storedNotes);
        setNotes(allNotes);
        handleSearch(searchQuery, allNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }, [searchQuery]);

  useFocusEffect(loadNotes);

  useEffect(() => {
    const intervalId = setInterval(loadNotes, 2000);

    return () => clearInterval(intervalId);
  }, [loadNotes]);

  const handleNoteDelete = async (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  const handleSearch = (query: string, allNotes: Note[]) => {
    const filtered = allNotes.filter(
      (note: Note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredNotes(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onSearch={query => {
          setSearchQuery(query);
          handleSearch(query, notes);
        }}
      />
      <NoteList
        notes={searchQuery.length > 0 ? filteredNotes : notes}
        onNoteDelete={handleNoteDelete}
      />
      <RoundIconButton
        style={{position: 'absolute', bottom: 45, right: 30}}
        button_style={{
          borderRadius: 30,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigate('CreateNote')}
        children={
          <SmallImage
            source={require('../assets/Images/plus.png')}
            style={{width: 50, height: 50}}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: hp('1%'),
    alignItems: 'center',
  },
});
