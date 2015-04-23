/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var Main = require('./app/components/main');

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class ghnotetaker extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Github NoteTaker',
          component: Main
        }} />
    );
  }
};

AppRegistry.registerComponent('ghnotetaker', () => ghnotetaker);
