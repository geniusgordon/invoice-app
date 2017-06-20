import { StackNavigator } from 'react-navigation';
import Home from './containers/Home';
import { firebase } from './lib';

firebase.init();

const App = StackNavigator({
  Home: { screen: Home },
});

export default App;
