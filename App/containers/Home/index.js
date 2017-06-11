import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from './Home';

class HomeContainer extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    history: {},
  };
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
    return <Home history={Object.values(history)} addInvoice={this.addInvoice} />;
  }
}

export default HomeContainer;
