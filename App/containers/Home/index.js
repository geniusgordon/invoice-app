import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
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
    this.getPrizeList();
    this.getHistory();
  }
  getPrizeList = async () => {
    let prizeList = JSON.parse(await AsyncStorage.getItem('prizeList'));
    if (!prizeList) {
      const database = firebase.app().database();
      const snapshot = await database.ref('/prizeList').once('value');
      prizeList = snapshot.val();
      await AsyncStorage.setItem('prizeList', JSON.stringify(prizeList));
    }
    if (prizeList) {
      this.setState({ prizeList });
    }
  };
  getHistory = async () => {
    let history = JSON.parse(await AsyncStorage.getItem('history'));
    if (history) {
      this.setState({ history });
    }
  };
  addInvoice = invoice => {
    const { year, month, firstSerial, secondSerial } = invoice;
    const id = year + month + firstSerial + secondSerial;
    const prize = checkPrize(this.state.prizeList, invoice);
    this.setState(state => {
      const nextState = {
        history: {
          ...state.history,
          [id]: { id, ...invoice, prize },
        },
      };
      AsyncStorage.setItem('history', JSON.stringify(nextState.history));
      return nextState;
    });
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
