import { StackNavigator } from 'react-navigation';
import Home from './containers/Home';

const App = StackNavigator({
  Home: { screen: Home },
});

export default App;
