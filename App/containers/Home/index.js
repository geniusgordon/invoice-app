import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import Home from './Home';

class HomeContainer extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    history: {},
    prize: {},
  };
  componentDidMount() {
    firebase.app().database().ref('/prize').once('value').then(snapshot => {
      const prize = snapshot.val();
      this.setState({ prize });
    });
  }
  addInvoice = invoice => {
    this.setState(state => ({
      history: {
        ...state.history,
        [invoice.secondSerial]: invoice,
      },
    }));
  };
  render() {
    const { history } = this.state;
    return (
      <Home history={Object.values(history)} addInvoice={this.addInvoice} />
    );
  }
}

export default HomeContainer;
