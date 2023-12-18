// src/components/organisms/NoteListOrganism.tsx
import React from 'react';
import {Alert, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NoteCard} from '../molecules';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {navigate} from '../../navigation/RouterServices';
import MasonryFlatlist from 'react-native-masonry-grid';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  note_colour: string;
}

interface NoteListProps {
  notes: Note[];

  onNoteDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,

  onNoteDelete,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MasonryFlatlist
        data={notes}
         style={{alignSelf: 'center'}}
        // keyExtractor={item => item.id}
        numColumns={2}
         inverted
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <NoteCard
            key={item.id}
            title={item.title}
            content={item.content}
            clr={item.note_colour}
            timestamp={item.timestamp}
            onPress={() => navigate('EditNote', {note: item})}
            onDelete={() =>
              Alert.alert('', 'Do you want to delete this note?', [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => onNoteDelete(index)},
              ])
            }
          />
        )}
      />
      {/* <FlatList
         data={notes}
         style={{alignSelf: 'center'}}
        
         keyExtractor={item => item.id}
         inverted
         showsVerticalScrollIndicator={false}
         renderItem={({item, index}) => (
           <NoteCard
             key={item.id}
             title={item.title}
             content={item.content}
             clr={item.note_colour}
             timestamp={item.timestamp}
             onPress={() => navigate('EditNote', {note: item})}
             onDelete={() =>
               Alert.alert('', 'Do you want to delete this note?', [
                 {
                   text: 'No',
                   onPress: () => console.log('Cancel Pressed'),
                   style: 'cancel',
                 },
                 {text: 'Yes', onPress: () => onNoteDelete(index)},
               ])
             }
           />
         )}
       /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: wp('95%'),
  },
});
