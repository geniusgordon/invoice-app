import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RED, GREY, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: GREY,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
  },
  label: { color: GREY },
  input: {
    color: BLACK,
    fontSize: 16,
    fontFamily: 'monospace',
  },
  time: { flexDirection: 'row' },
  year: { flex: 1, marginRight: 8 },
  month: { flex: 3 },
  serial: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hyphen: {
    borderWidth: 0.5,
    borderColor: BLACK,
    width: 8,
    height: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  firstSerial: {
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  secondSerial: {
    flex: 1,
    fontFamily: 'monospace',
  },
  submitButton: {
    marginTop: 8,
    marginLeft: 0,
    marginRight: 0,
  },
});

const today = new Date();
const padZero = n => (n < 10 ? '0' + n : '' + n);

class Invoice extends Component {
  static defaultProps = {
    edit: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      firstSerial: '',
      secondSerial: '',
      year: props.year || `${today.getFullYear() - 1911}`,
      month: props.month || today.getMonth() % 2 === 0
        ? `${padZero(today.getMonth() - 1)}${padZero(today.getMonth())}`
        : `${padZero(today.getMonth())}${padZero(today.getMonth() + 1)}`,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.barCodeInvoice) {
      const {
        firstSerial,
        secondSerial,
        year,
        month,
      } = nextProps.barCodeInvoice;
      this.setState({ firstSerial, secondSerial, year, month });
    }
    if (!this.props.edit && nextProps.edit) {
      this.clear();
    }
  }
  handleFirstSerialChange = text => {
    this.setState({ firstSerial: text });
    if (text.length === 2 && this.secondSerial) {
      this.secondSerial.focus();
    }
  };
  handleSecondSerialChange = text => {
    this.setState({ secondSerial: text });
    if (text.length === 8 && this.secondSerial) {
      this.secondSerial.blur();
    }
  };
  handleYearChange = year => {
    this.setState({ year });
  };
  handleMonthChange = month => {
    this.setState({ month });
  };
  handleSubmit = () => {
    const { firstSerial, secondSerial, year, month } = this.state;
    this.props.addInvoice({ firstSerial, secondSerial, year, month });
    this.clear();
  };
  clear = () => {
    this.setState({ firstSerial: '', secondSerial: '' });
  };
  render() {
    const { edit } = this.props;
    const { firstSerial, secondSerial, year, month } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.time}>
          <View style={styles.year}>
            <Text style={styles.label}>年</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={year}
                editable={edit}
                maxLength={3}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                onChangeText={this.handleYearChange}
              />
            </View>
          </View>
          <View style={styles.month}>
            <Text style={styles.label}>月</Text>
            <View style={styles.inputContainer}>
              {edit
                ? <Picker
                    selectedValue={month}
                    onValueChange={this.handleMonthChange}
                  >
                    {[...new Array(6)].map((_, i) => {
                      const first = padZero(i * 2 + 1);
                      const second = padZero(i * 2 + 2);
                      return (
                        <Picker.Item
                          key={`${first}${second}`}
                          label={`${first} - ${second} 月`}
                          value={`${first}${second}`}
                        />
                      );
                    })}
                  </Picker>
                : <TextInput
                    style={styles.input}
                    value={`${month.substr(0, 2)} - ${month.substr(2)} 月`}
                    editable={false}
                    underlineColorAndroid="transparent"
                  />}
            </View>
          </View>
        </View>
        <Text style={styles.label}>發票號碼</Text>
        <View style={[styles.inputContainer, styles.serial]}>
          <TextInput
            style={[styles.firstSerial, styles.input]}
            value={firstSerial}
            editable={edit}
            maxLength={2}
            autoCapitalize="characters"
            underlineColorAndroid="transparent"
            onChangeText={this.handleFirstSerialChange}
            ref={ref => {
              this.firstSerial = ref;
            }}
          />
          <View style={styles.hyphen} />
          <TextInput
            style={[styles.secondSerial, styles.input]}
            value={secondSerial}
            editable={edit}
            keyboardType="numeric"
            maxLength={8}
            underlineColorAndroid="transparent"
            onChangeText={this.handleSecondSerialChange}
            ref={ref => {
              this.secondSerial = ref;
            }}
          />
        </View>
        {edit
          ? <Button
              title="新增發票"
              disabled={firstSerial.length < 2 || secondSerial.length < 8}
              backgroundColor={RED}
              onPress={this.handleSubmit}
              containerViewStyle={styles.submitButton}
            />
          : null}
      </View>
    );
  }
}

export default Invoice;
