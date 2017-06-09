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
    flex: 1,
  },
  qrcode: {
    position: 'absolute',
    borderWidth: 5,
    borderColor: GREEN,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nonScanArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  scanArea: {
    flex: 1,
  },
});

class Scanner extends Component {
  static defaultProps = {
    onInvoiceRead: () => {},
  };
  state = {
    qrcodes: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const qrcodes = Object.values(this.state.qrcodes);
    if (qrcodes.length === 2) {
      this.props.onInvoiceRead(qrcodes);
    }
  }
  handleBarCodeRead = qrcodes => {
    if (this.state.qrcodes.length !== 0) {
      return;
    }
    this.setState({ qrcodes });
  };
  renderQRCodeBounds = () => {
    const { height, width } = Dimensions.get('window');
    const { qrcodes } = this.state;
    return qrcodes.map(({ data, bounds }, i) => {
      const qrcodePositionStyle = {
        top: height * bounds[1][1],
        left: width * bounds[0][0] + width / 2 * i,
        height: height * (bounds[0][1] - bounds[1][1]),
        width: width * (bounds[2][0] - bounds[0][0]),
      };
      return <View key={data} style={[styles.qrcode, qrcodePositionStyle]} />;
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Camera
          barCodeTypes={['qr']}
          onBarCodeRead={this.handleBarCodeRead}
          style={styles.camera}
        />
        <View style={styles.mask}>
          <View style={styles.nonScanArea} />
          <View style={styles.scanArea}>
            {this.renderQRCodeBounds()}
          </View>
          <View style={styles.nonScanArea} />
        </View>
      </View>
    );
  }
}

export default Scanner;
