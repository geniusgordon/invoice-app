import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Touchable } from '../../components';
import { RED, GREEN, GREY, LIGHT_GREY, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 72,
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  mid: {
    flex: 1,
  },
  status: {
    width: 48,
    height: 48,
    borderRadius: 32,
    marginRight: 16,
    color: 'white',
    backgroundColor: GREY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  serial: {
    fontSize: 16,
    color: BLACK,
  },
});

const prizeColor = {
  super: RED,
  special: RED,
  first: RED,
  second: RED,
  third: GREEN,
  fourth: GREEN,
  fifth: GREEN,
  sixth: GREEN,
};

const prizeName = {
  super: '特別獎',
  special: '特獎',
  first: '頭獎',
  second: '二獎',
  third: '三獎',
  fourth: '四獎',
  fifth: '五獎',
  sixth: '六獎',
};

const getPrizeColor = prize => {
  if (!prize || !prize.prize) {
    return GREY;
  }
  return prizeColor[prize.prize];
};

const getPrizeStatus = prize => {
  if (!prize) {
    return '尚未\n開獎';
  }
  if (!prize.prize) {
    return '沒有\n中獎';
  }
  return prizeName[prize.prize];
};

const getAmountStr = amount => {
  if (amount >= 10000000) {
    return `${amount / 10000000} 千萬台幣`;
  }
  if (amount >= 10000) {
    return `${amount / 10000} 萬台幣`;
  }
  return `${amount} 台幣`;
};

const ListItem = ({
  invoice,
  selected,
  selectedCount,
  onPress,
  onLongPress,
}) => {
  const { firstSerial, secondSerial, year, month, prize } = invoice;
  const status = getPrizeStatus(prize);
  const color = getPrizeColor(prize);
  const Container = selectedCount > 0 ? TouchableWithoutFeedback : Touchable;
  return (
    <Container onPress={onPress} onLongPress={onLongPress}>
      <View
        style={[
          styles.container,
          selected ? { backgroundColor: LIGHT_GREY } : null,
        ]}
      >
        <View>
          <Text style={[styles.status, { backgroundColor: color }]}>
            {status}
          </Text>
        </View>
        <View style={styles.mid}>
          <Text style={styles.serial}>{firstSerial} - {secondSerial}</Text>
          <Text>{year}/{month.substr(0, 2)}-{month.substr(2)} 月</Text>
        </View>
        {prize && prize.prize
          ? <View>
              <Text>{getAmountStr(prize.amount)}</Text>
            </View>
          : null}
      </View>
    </Container>
  );
};

export default ListItem;
