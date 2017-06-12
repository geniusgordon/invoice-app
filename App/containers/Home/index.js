import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import sortBy from 'lodash/fp/sortBy';
import Home from './Home';
import { checkPrize } from '../../utils';

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
    const { year, month, firstSerial, secondSerial } = invoice;
    const id = year + month + firstSerial + secondSerial;
    const prize = checkPrize(this.state.prize, invoice);
    this.setState(state => ({
      history: {
        ...state.history,
        [id]: { id, ...invoice, prize },
      },
    }));
  };
  render() {
    const history = Object.values(this.state.history).sort((a, b) => {
      if (a.year !== b.year) {
        return a.year > b.year ? -1 : 1;
      }
      if (a.month !== b.month) {
        return a.month > b.month ? -1 : 1;
      }
      if (a.firstSerial + a.secondSerial < b.firstSerial + b.secondSerial) {
        return -1;
      }
      return 1;
    });
    return <Home history={history} addInvoice={this.addInvoice} />;
  }
}

export default HomeContainer;
