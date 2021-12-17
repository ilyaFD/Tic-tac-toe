import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { observer } from "mobx-react";
import PlayersTypes from '../../utils/playersTypes';
import colors from '../colors';

const Toggle = observer(props => {
    const {style, onToggle, disabled, value, type, index} = props;

    return (
        <TouchableOpacity
            style={[style, styles.toggle]}
            onPress={onToggle}
            disabled={disabled}
        >
            {value ? 
                type === PlayersTypes.CROSS ?
                    <Text style={styles.crossIcon}>X</Text>
                :
                    <Text style={styles.zeroIcon}>○</Text>
            :
                null
            }
        </TouchableOpacity>
    );
});
export default Toggle;

const styles = StyleSheet.create({
    toggle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    crossIcon: {
        color: colors.black,
        fontWeight: '900',
        fontSize: 20,
        textAlign: 'center'

    },
    zeroIcon: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center'
    }
});
