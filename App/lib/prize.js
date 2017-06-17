import flatten from 'lodash/fp/flatten';

const prizes = (() => {
  const superPrize = [
    {
      name: 'super',
      prize: 'superPrizeNo',
      amount: 'superPrizeAmt',
      length: 8,
    },
  ];
  const specialPrize = ['', '2', '3'].map(num => ({
    name: 'special',
    prize: `spcPrizeNo${num}`,
    amount: 'spcPrizeAmt',
    length: 8,
  }));
  const otherPrize = flatten(
    [
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
    ].map((name, level) =>
      [...new Array(9)].map((_, i) => i + 1).map(num => ({
        name,
        prize: `firstPrizeNo${num}`,
        amount: `${name}PrizeAmt`,
        length: 8 - level,
      })),
    ),
  );
  const sixthPrize = [...new Array(6)].map((_, i) => i + 1).map(num => ({
    name: 'sixth',
    prize: `sixthPrizeNo${num}`,
    amount: 'sixthPrizeAmt',
    length: 3,
  }));
  return [...superPrize, ...specialPrize, ...otherPrize, ...sixthPrize];
})();

const compareSerial = (length, prize, serial) =>
  serial.endsWith(prize.substr(prize.length - length));

export const checkPrize = (allPrizeList, invoice) => {
  const prizeList = allPrizeList[`${invoice.year}${invoice.month.substr(2)}`];
  if (!prizeList) {
    return null;
  }
  for (let i = 0; i < prizes.length; i++) {
    if (prizeList[prizes[i].prize] === '') {
      continue;
    }
    if (
      compareSerial(
        prizes[i].length,
        prizeList[prizes[i].prize],
        invoice.secondSerial,
      )
    ) {
      return { prize: prizes[i].name, amount: prizeList[prizes[i].amount] };
    }
  }
  return { prize: null, amount: 0 };
};
