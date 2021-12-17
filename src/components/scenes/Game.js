import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Area from '../parts/Area/Area';
import { useStore } from "../../models/Store";
import { observer } from "mobx-react";
import colors from '../../ui/colors';

const Game = observer(props => {
    const store = useStore();

    return (
        <View >
            <Area />
            <TouchableOpacity onPress={() => store.reset()}>
                <Text style={styles.btn}>RESET</Text>
            </TouchableOpacity>
        </View>
    );
});
export default Game;

const styles = StyleSheet.create({
    btn: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center'
    },
});
