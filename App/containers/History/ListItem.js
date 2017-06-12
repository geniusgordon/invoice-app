import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RED, PURPLE, BROWN, GREY, BLACK } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 64,
    flexDirection: 'row',
  },
  mid: {
    flex: 1,
  },
  status: {
    width: 48,
    height: 48,
    borderRadius: 32,
    marginRight: 8,
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
  super: PURPLE,
  special: RED,
  first: RED,
  second: RED,
  third: RED,
  fourth: BROWN,
  fifth: BROWN,
  sixth: BROWN,
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

const ListItem = ({ firstSerial, secondSerial, year, month, prize }) => {
  const status = getPrizeStatus(prize);
  const color = getPrizeColor(prize);
  return (
    <View style={styles.container}>
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
  );
};

export default ListItem;
