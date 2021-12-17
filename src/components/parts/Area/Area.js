import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import Toggle from '../../../ui/Toggle/Toggle';
import { useStore } from  '../../../models/Store';
import PlayersTypes from '../../../utils/playersTypes';
import colors from '../../../ui/colors';


const Area = observer(props => {
    const store = useStore();
    const {fields, currentPlayer, isFinished, winnerObj} = store;
    
    const onToggle = (player, index) => {
      if (player === PlayersTypes.ZERO) {
        store.setCurrentPlayer(PlayersTypes.CROSS)
      } else {
        store.setCurrentPlayer(PlayersTypes.ZERO)
      }

      store.setFields(
        fields.map((field, fieldIndex) => {
          return fieldIndex === index ?
            {
                player: player,
                value: true
            }
          :
            field

        })
      )
    }
    const isDisabled = (fields, index, winnerObj) => {
      const isTaken = fields.find((takenField, takenFieldIndex) => takenField.value && takenFieldIndex === index);
      const isOver = winnerObj;
      return isOver || isTaken
    }

    const isWinerField = (winnerObj, index) => {
      return winnerObj ? 
        winnerObj.fields.includes(index)
      :
        false
    }

    return (
        <View style={styles.area}>
          {fields.map((field, index) =>
              <View
                key={index}
                style={
                  [
                    styles.field,
                    index > 2 && index < 6 && styles.centerField,
                    (index + 1) % 3 === 0 && styles.thierdField
                  ]
                }
              >
                <Toggle
                  style={isWinerField(winnerObj, index) && styles.winerField}
                  key={index}
                  onToggle={() => onToggle(currentPlayer, index)}
                  disabled={isFinished || fields[index].value}
                  value={field.value}
                  type={field.player}
                  disabled={isDisabled(fields, index, winnerObj)}
                />
              </View>
          )}
        </View>
    );
});
export default Area;

const styles = StyleSheet.create({
  area: {
    alignSelf: 'center',
    width: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 100
  },
  field: {
    height: 60,
    width: '32%',
    borderWidth: 2,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: colors.darkGreen, 
  },
  thierdField: {
    borderRightColor: 'transparent',
  },
  centerField: {
    borderTopColor: colors.darkGreen,
    borderBottomColor: colors.darkGreen,
  },
  winerField: {
    opacity: 0.5
  }
});
