// CreateNotePage.tsx
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, SmallImage} from '../components/atoms';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {HalfModal, RoundIconButton} from '../components/molecules';
import {ArrowLeft, Trash} from 'iconsax-react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {goBack} from '../navigation/RouterServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  title: string;
  content: string;
  date: string;
  note_colour: string;
}

export const EditNote: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const [clr, setClr] = useState<string>('');
  const [currentNote, setCurrentNote] = useState<Note>({
    title: '',
    content: '',
    date: new Date().toISOString(),
    note_colour: clr,
  });
  const [open, setOpen] = useState<boolean>(false);

  const currentNoteRef = useRef(currentNote);
  currentNoteRef.current = currentNote;

  useEffect(() => {
    const noteToEdit = route.params?.note;
    setCurrentNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
      date: noteToEdit.date,
      note_colour: noteToEdit.note_colour,
    });

    const unsubscribe = navigation.addListener('beforeRemove', () => {
      saveNote();
    });

    return unsubscribe;
  }, [navigation]);
  const saveNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const existingNotes = storedNotes ? JSON.parse(storedNotes) : [];

      const noteIndex = existingNotes.findIndex(
        (note: Note) => note.date === currentNoteRef.current.date,
      );

      if (noteIndex !== -1) {
        existingNotes[noteIndex] = currentNoteRef.current;
      }

      await AsyncStorage.setItem('notes', JSON.stringify(existingNotes));
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <View
      style={{...styles.container, backgroundColor: currentNote.note_colour}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RoundIconButton
          style={{alignSelf: 'flex-start', marginBottom: hp('2%')}}
          onPress={() => goBack()}
          children={<ArrowLeft size="32" color="black" variant="Outline" />}
        />
        <RoundIconButton
          onPress={() => setOpen(true)}
          children={
            <SmallImage
              source={require('../assets/Images/pallete.png')}
              style={{width: 35, height: 35}}
            />
          }
        />
      </View>
      <Input
        label="Title"
        value={currentNote.title}
        onChangeText={text => setCurrentNote({...currentNote, title: text})}
        style={styles.input_title}
        multiline
        placeholder="Title"
        placeholderTextColor="grey"
      />
      <Input
        label="Content"
        value={currentNote.content}
        onChangeText={text => setCurrentNote({...currentNote, content: text})}
        multiline
        // numberOfLines={4}
        style={styles.input_note}
        placeholder="Note"
        placeholderTextColor="grey"
      />
      <HalfModal
        isVisible={open}
        onClose={() => setOpen(false)}
        onColorChange={(color: any) => {
          setCurrentNote({...currentNote, note_colour: fromHsv(color)}),
            setClr(fromHsv(color));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input_title: {
    width: wp('95%'),

    fontSize: 30,
  },
  input_note: {
    width: wp('95%'),

    fontSize: 20,
  },
  button: {
    marginTop: 16,
  },
});
