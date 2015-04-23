var React = require('react-native');

var api = require('./../util/api');

var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  StyleSheet
} = React;

var Dashboard = require('./dashboard');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    };
  }

  onChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  submit() {
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username)
      .then((response) => {
        if(response.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          });
        } else {
          this.props.navigator.push({
            title: response.name || response.login || 'Select an Option',
            component: Dashboard,
            passProps: { userInfo: response }
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
      });
  }

  render() {
    var showError = (
      this.state.error ? <Text>{ this.state.error }</Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github user</Text>

        <TextInput
          style={styles.searchInput} 
          value={this.state.username} 
          onChange={this.onChange.bind(this)} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.submit.bind(this)}
          underlayColor="white">

            <Text style={styles.buttonText}>SEARCH</Text>

        </TouchableHighlight>

        <ActivityIndicatorIOS
          animating={ this.state.isLoading }
          color="#111"
          size="large" />

        { showError }
      </View>
    );
  }
};

module.exports = Main;