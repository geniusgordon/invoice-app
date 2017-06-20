import React, { Component } from 'react';
import {
  Animated,
  BackHandler,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'react-native-elevated-view';
import Panel from './Panel';
import Invoice from './Invoice';
import History from '../History';
import Account from '../Account';
import Scanner from '../Scanner';
import { Screen, Toolbar } from '../../components';
import { RED, GREEN, BLUE, ORANGE, GREY, BLACK } from '../../constants/colors';
import { utils } from '../../lib';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalPanelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: Screen.width * 3,
    flexDirection: 'row',
  },
  verticalPanelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: Screen.height * 2,
  },
  mask: {
    position: 'absolute',
    top: Toolbar.height,
    bottom: 0,
    width: Screen.width,
  },
  options: {
    position: 'absolute',
    width: Screen.width,
    bottom: 0,
    padding: 16,
  },
  selectedOptions: {
    height: 64,
    width: Screen.width - 32,
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCount: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    color: BLACK,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    height: 96,
    width: Screen.width,
  },
});

const selectedCount = selected => Object.values(selected).filter(s => s).length;

const getScreenTitle = ({ screen, manualInput }) => {
  if (screen < 3) {
    return ['我的發票', '掃描發票', '帳號資訊'][screen];
  }
  return manualInput ? '手動輸入' : '掃描結果';
};

const getScreenColor = ({ screen, selected }) =>
  screen === 0 && selectedCount(selected) > 0
    ? ORANGE
    : [BLUE, 'transparent', BLUE, GREEN][screen];

const getToolbarColor = ({ screen, selected }) =>
  screen === 0 && selectedCount(selected) > 0
    ? ORANGE
    : [BLUE, GREEN, BLUE, GREEN][screen];

class Home extends Component {
  horizontalAnimated = new Animated.Value(1);
  state = {
    screen: 1,
    manualInput: false,
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.horizontalAnimated.addListener(e => {
      if (e.value < -Screen.width * 1.5) {
        this.setState({ screen: 2 });
      } else if (
        e.value > -Screen.width * 1.5 &&
        e.value < -Screen.width * 0.5
      ) {
        this.setState({ screen: 1 });
      } else if (e.value > -Screen.width * 0.5) {
        this.setState({ screen: 0 });
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.horizontalAnimated.removeAllListeners();
  }
  handleBackPress = () => {
    if (this.state.screen === 3 && this.verticalPanel) {
      this.verticalPanel.snapTo({ index: 1 });
      return true;
    } else if (this.state.screen !== 1 && this.horizontalPanel) {
      this.horizontalPanel.snapTo({ index: 1 });
      return true;
    }
    return false;
  };
  handleCameraIconPress = () => {
    if (this.horizontalPanel) {
      this.horizontalPanel.snapTo({ index: 1 });
    }
  };
  handleKeyboardIconPress = () => {
    if (this.verticalPanel) {
      this.verticalPanel.snapTo({ index: 0 });
      this.setState({ manualInput: true });
    }
  };
  handleVerticalSnap = e => {
    if (e.nativeEvent.index === 0) {
      this.setState({ screen: 3 });
    } else {
      this.setState({
        screen: 1,
        manualInput: false,
      });
      if (this.scanner) {
        this.scanner.clear();
        this.setState({
          barCodeInvoice: null,
          manualInput: false,
        });
      }
    }
  };
  handleBarCodeRead = qrcodes => {
    const invoice = utils.parseInvoiceBarCode(qrcodes);
    this.props.addInvoice(invoice);
    this.setState({
      barCodeInvoice: invoice,
      manualInput: false,
    });
    if (this.verticalPanel) {
      this.verticalPanel.snapTo({ index: 0 });
    }
  };
  manualAddInvoice = invoice => {
    if (this.verticalPanel) {
      this.verticalPanel.snapTo({ index: 1 });
    }
    this.props.addInvoice(invoice);
  };
  renderOptions = () => {
    const { selected, clearSelected, deleteSelected } = this.props;
    const { screen, manualInput } = this.state;
    const count = selectedCount(selected);
    if (screen === 0) {
      if (count === 0) {
        return (
          <Icon
            reverse
            name="camera"
            color={RED}
            onPress={this.handleCameraIconPress}
          />
        );
      }
      return [
        <LinearGradient
          key="shadow"
          colors={['transparent', GREY]}
          style={styles.shadow}
        />,
        <ElevatedView
          key="options"
          elevation={1}
          style={styles.selectedOptions}
        >
          <Icon name="close" onPress={clearSelected} />
          <Text style={styles.selectedCount}>{count} items</Text>
          <Icon name="delete" onPress={deleteSelected} />
        </ElevatedView>,
      ];
    }
    if (screen === 1) {
      return (
        <Icon
          name="keyboard"
          color="white"
          size={48}
          underlayColor="transparent"
          onPress={this.handleKeyboardIconPress}
        />
      );
    }
  };
  render() {
    const {
      history,
      selected,
      user,
      loggingIn,
      login,
      logout,
      onHistorySelect,
    } = this.props;
    const { screen, barCodeInvoice, manualInput } = this.state;
    const title = getScreenTitle({ screen, manualInput });
    const screenColor = getScreenColor({ screen, selected });
    const toolbarColor = getToolbarColor({ screen, selected });
    const count = selectedCount(selected);
    const opacity = this.horizontalAnimated.interpolate({
      inputRange: [
        -Screen.width * 2,
        -Screen.width * 1.5 - 5,
        -Screen.width * 1.5 + 5,
        -Screen.width,
        -Screen.width * 0.5 - 5,
        -Screen.width * 0.5 + 5,
        0,
      ],
      outputRange: [1, 0, 0, 1, 0, 0, 1],
    });
    const toolbarStyle = {
      position: 'absolute',
      top: 0,
      width: Screen.width,
      backgroundColor: toolbarColor,
      opacity,
    };
    const optionsStyle = {
      alignItems: 'center',
      bottom: this.horizontalAnimated.interpolate({
        inputRange: [
          -Screen.width * 2,
          -Screen.width * 2 + Screen.width / 5,
          -Screen.width - Screen.width / 5,
          -Screen.width,
          -Screen.width + Screen.width / 5,
          -Screen.width / 5,
          0,
        ],
        outputRange: [
          0,
          -Screen.width / 3,
          -Screen.width / 3,
          0,
          -Screen.width / 3,
          -Screen.width / 3,
          0,
        ],
      }),
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={toolbarColor} />
        <Scanner
          onBarCodeRead={this.handleBarCodeRead}
          ref={ref => {
            this.scanner = ref;
          }}
        />
        <Toolbar title={title} toolbarStyle={toolbarStyle} />
        <Animated.View
          style={[styles.mask, { backgroundColor: screenColor, opacity }]}
        />
        <Interactable.View
          horizontalOnly
          snapPoints={[
            { x: 0 },
            { x: -Screen.width, tension: 500, damping: 0.5 },
            { x: -Screen.width * 2 },
          ]}
          initialPosition={{ x: -Screen.width }}
          boundaries={{ left: -Screen.width * 2, right: 0 }}
          animatedValueX={this.horizontalAnimated}
          style={styles.horizontalPanelContainer}
          ref={ref => {
            this.horizontalPanel = ref;
          }}
        >
          <Panel>
            <History
              history={history}
              selected={selected}
              onHistorySelect={onHistorySelect}
            />
          </Panel>
          <View style={{ flex: 1 }} />
          <Panel>
            <Account
              user={user}
              loggingIn={loggingIn}
              login={login}
              logout={logout}
            />
          </Panel>
        </Interactable.View>
        <Animated.View style={[styles.options, optionsStyle]}>
          {this.renderOptions()}
        </Animated.View>
        <Interactable.View
          verticalOnly
          snapPoints={[{ y: 0 }, { y: Screen.height }]}
          initialPosition={{ y: Screen.height }}
          boundaries={{ top: 0, bottom: Screen.height }}
          onSnap={this.handleVerticalSnap}
          style={styles.verticalPanelContainer}
          ref={ref => {
            this.verticalPanel = ref;
          }}
        >
          <Panel>
            <Invoice
              edit={manualInput}
              barCodeInvoice={barCodeInvoice}
              addInvoice={this.manualAddInvoice}
            />
          </Panel>
        </Interactable.View>
      </View>
    );
  }
}

export default Home;
