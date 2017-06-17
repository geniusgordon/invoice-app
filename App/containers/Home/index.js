import React, { Component } from 'react';
import { Text, View } from 'react-native';
import merge from 'lodash/fp/merge';
import sortBy from 'lodash/fp/sortBy';
import Rx from 'rxjs/Rx';
import Home from './Home';
import { firebase, prize, storage } from '../../lib';

class HomeContainer extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    history: {},
    prize: {},
    user: null,
    loggingIn: false,
  };
  componentDidMount() {
    this.getPrizeList();
    this.getHistory();
    firebase.auth.stream.subscribe(user => {
      this.setState({ user, loggingIn: false });
    });
  }
  getPrizeList = () => {
    const hasPrizeList = Rx.Observable
      .from(storage.getItem('prizeList'))
      .partition(prizeList => prizeList);
    const fetchAndSavePrizeList = firebase.database
      .createObservable({ path: '/prizeList' })
      .mergeMap(prizeList =>
        storage.setItem('prizeList', prizeList).then(() => prizeList),
      );
    hasPrizeList[0]
      .merge(hasPrizeList[1].mergeMapTo(fetchAndSavePrizeList))
      .subscribe(prizeList => {
        this.setState({ prizeList });
      });
  };
  getHistory = () => {
    const localHistory = Rx.Observable.from(storage.getItem('history'));
    const fetchHistory = firebase.auth.stream
      .filter(user => user)
      .distinctUntilChanged()
      .mergeMap(user =>
        firebase.database.createObservable({ path: `/history/${user.uid}` }),
      );
    localHistory.merge(fetchHistory).subscribe(history => {
      if (history) {
        this.setState(state => ({
          history: merge(state.history, history),
        }));
      }
    });
  };
  login = () => {
    this.setState({ loggingIn: true });
    return firebase.auth
      .login()
      .catch(error => console.error(error))
      .then(() => this.setState({ loggingIn: false }));
  };
  addInvoice = invoice => {
    const { year, month, firstSerial, secondSerial } = invoice;
    const id = year + month + firstSerial + secondSerial;
    const prize = prize.checkPrize(this.state.prizeList, invoice);
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
    const { user, loggingIn } = this.state;
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
    return (
      <Home
        history={history}
        user={user}
        loggingIn={loggingIn}
        login={this.login}
        logout={firebase.auth.logout}
        addInvoice={this.addInvoice}
      />
    );
  }
}

export default HomeContainer;
