import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RoundIconButton} from './RoundIconButton';
import {Trash} from 'iconsax-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface NoteCardProps {
  title: string;
  content: string;
  timestamp: string;
  clr: string;
  onPress: () => void;
  onDelete: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  timestamp,
  onPress,
  onDelete,
  clr,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.cardContainer, backgroundColor: clr}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>{title}</Text>
        <RoundIconButton
          onPress={onDelete}
          children={<Trash color="black" variant="Linear" size={25} />}
        />
      </View>

      <Text style={styles.content}>{content}</Text>

      <Text style={styles.timestamp}>{timestamp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 16,
    margin: 10,
    elevation: 3,
    // width: wp('90%'),

    position: 'relative',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
     width: wp('25%'),
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#888888',
    position: 'absolute',
    bottom: 8,
    left: 16,
  },
});
