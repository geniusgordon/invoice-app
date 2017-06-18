import flatten from 'lodash/fp/flatten';

const padZero = n => (n < 10 ? '0' + n : '' + n);

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

export const parseInvoiceBarCode = qrcodes => {
  const data = qrcodes[0].data + qrcodes[1].data.substr(2);
  const detail = data.substr(89).split(':');
  const count = parseInt(detail[0], 10);
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      name: detail[(i + 1) * 3],
      quantity: parseInt(detail[(i + 1) * 3 + 1], 10),
      unitPrice: parseInt(detail[(i + 1) * 3 + 2], 10),
    });
  }

  const month = parseInt(data.substr(13, 2), 10);
  return {
    firstSerial: data.substr(0, 2),
    secondSerial: data.substr(2, 8),
    year: data.substr(10, 3),
    month: month % 2 === 0
      ? `${padZero(month - 1)}${padZero(month)}`
      : `${padZero(month)}${padZero(month + 1)}`,
    day: data.substr(15, 2),
    random: data.substr(17, 4),
    amount: parseInt(data.substr(21, 8), 16),
    amountWithTax: parseInt(data.substr(29, 8), 16),
    buyer: data.substr(37, 8),
    seller: data.substr(45, 8),
    items,
  };
};
