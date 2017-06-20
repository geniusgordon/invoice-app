import React, { Component } from 'react';
import { Text, View } from 'react-native';
import merge from 'lodash/fp/merge';
import sortBy from 'lodash/fp/sortBy';
import Rx from 'rxjs/Rx';
import Home from './Home';
import { firebase, utils, storage } from '../../lib';

class HomeContainer extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    history: {},
    selected: {},
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
    Rx.Observable
      .from(storage.getItem('history'))
      .do(history =>
        this.setState(state => ({ history: merge(state.history, history) })),
      )
      .map(history => history || {})
      .combineLatest(firebase.auth.stream.filter(user => user))
      .mergeMap(([history, user]) => {
        const synced = Object.values(history).filter(invoice => invoice.synced);
        const unSynced = Object.values(history).filter(
          invoice => !invoice.synced,
        );
        const fetchHistory = synced.length === 0
          ? firebase.database.createObservable({
              path: `/history/${user.uid}`,
            })
          : Rx.Observable.empty();
        const syncHistory = Rx.Observable
          .from(
            Promise.all(
              unSynced.map(invoice => {
                const syncedInvoice = { ...invoice, synced: true };
                return firebase.database
                  .update(`/history/${user.uid}/${invoice.id}`, syncedInvoice)
                  .then(() => syncedInvoice);
              }),
            ),
          )
          .map(history =>
            history.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}),
          );
        return fetchHistory.merge(syncHistory);
      })
      .subscribe(history =>
        this.setState(state => ({ history: merge(state.history, history) })),
      );
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
    const invoicePrize = utils.checkPrize(this.state.prizeList, invoice);
    const newInvoice = { id, ...invoice, prize: invoicePrize, synced: false };
    this.setState(state => {
      const nextState = {
        history: {
          ...state.history,
          [id]: newInvoice,
        },
      };
      storage.setItem('history', nextState.history);
      return nextState;
    });
    const syncedInvoice = { ...newInvoice, synced: true };
    firebase.auth.stream
      .filter(user => user)
      .mergeMap(user =>
        firebase.database
          .update(`/history/${user.uid}/${id}`, syncedInvoice)
          .then(() => {
            this.setState(state => ({
              history: {
                ...state.history,
                [id]: syncedInvoice,
              },
            }));
          }),
      )
      .subscribe();
  };
  handleHistorySelect = invoice => {
    this.setState(state => ({
      selected: {
        ...state.selected,
        [invoice.id]: !state.selected[invoice.id],
      },
    }));
  };
  clearSelected = () => {
    this.setState({
      selected: {},
    });
  };
  deleteSelected = () => {
  };
  render() {
    const { selected, user, loggingIn } = this.state;
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
        selected={selected}
        user={user}
        loggingIn={loggingIn}
        login={this.login}
        logout={firebase.auth.logout}
        addInvoice={this.addInvoice}
        onHistorySelect={this.handleHistorySelect}
        clearSelected={this.clearSelected}
        deleteSelected={this.deleteSelected}
      />
    );
  }
}

export default HomeContainer;
