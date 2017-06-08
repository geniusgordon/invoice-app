import { StackNavigator } from 'react-navigation';
import Home from './containers/Home';
import QRCode from './containers/QRCode';

const App = StackNavigator({
  Home: { screen: Home },
  QRCode: { screen: QRCode },
});

export default App;
