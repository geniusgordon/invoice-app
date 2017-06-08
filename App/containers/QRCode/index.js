import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Camera from 'react-native-camera';
import { GREEN, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BLACK,
  },
  camera: {
    height: 250,
  },
  qrcode: {
    position: 'absolute',
    borderWidth: 5,
    borderColor: GREEN,
  },
});

class QRCodeScanner extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    showCamera: false,
    qrcodes: {},
  };
  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ showCamera: true });
    });
  }
  handleBarCodeRead = e => {
    if (this.state.qrcodes[e.data]) {
      return;
    }
    this.setState({
      qrcodes: {
        ...this.state.qrcodes,
        [e.data]: e,
      },
    });
  };
  renderQRCodeBounds = () => {
    const { height, width } = Dimensions.get('window');
    const qrcodes = Object.values(this.state.qrcodes);
    return qrcodes.map(qrcode => {
      const bounds = JSON.parse(qrcode.bounds);
      const qrcodePositionStyle = {
        top: height * bounds[1][1],
        left: width * bounds[0][0],
        height: height * (bounds[0][1] - bounds[1][1]),
        width: width * (bounds[2][0] - bounds[0][0]),
      };
      return (
        <View key={qrcode.data} style={[styles.qrcode, qrcodePositionStyle]} />
      );
    });
  };
  render() {
    const { showCamera } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container} />
        {showCamera
          ? <Camera
              barCodeTypes={['qr']}
              onBarCodeRead={this.handleBarCodeRead}
              style={styles.camera}
            />
          : <View style={styles.camera} />}
        {this.renderQRCodeBounds()}
        <View style={styles.container}>
          <Button title="手動輸入" />
        </View>
      </View>
    );
  }
}

export default QRCodeScanner;
