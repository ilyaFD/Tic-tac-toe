// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './src/ui/colors';
import Store, { StoreProvider } from './src/models/Store';
import Game from './src/components/scenes/Game';

const store = new Store();

const App = () => {
  return (
    <StoreProvider store={store}>
      <View style={styles.body}>
        <View style={styles.container}>
          <Game />
        </View>
      </View>
    </StoreProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.green,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    width: 320,
  },
});
