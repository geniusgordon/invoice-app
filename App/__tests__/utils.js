import { checkPrize } from '../utils';

const allPrizeList = {
  '10604': {
    code: '200',
    fifthPrizeAmt: 1000,
    firstPrizeAmt: 200000,
    firstPrizeNo1: '07836485',
    firstPrizeNo10: '',
    firstPrizeNo2: '13410946',
    firstPrizeNo3: '96152286',
    firstPrizeNo4: '',
    firstPrizeNo5: '',
    firstPrizeNo6: '',
    firstPrizeNo7: '',
    firstPrizeNo8: '',
    firstPrizeNo9: '',
    fourthPrizeAmt: 4000,
    invoYm: '10604',
    msg: 'Prize List',
    secondPrizeAmt: 40000,
    sixthPrizeAmt: 200,
    sixthPrizeNo1: '996',
    sixthPrizeNo2: '',
    sixthPrizeNo3: '',
    sixthPrizeNo4: '',
    sixthPrizeNo5: '',
    sixthPrizeNo6: '',
    spcPrizeAmt: 2000000,
    spcPrizeNo: '82528918',
    spcPrizeNo2: '',
    spcPrizeNo3: '',
    superPrizeAmt: 10000000,
    superPrizeNo: '74748874',
    thirdPrizeAmt: 10000,
    v: '1.0',
  },
};

it('should win super prize', () => {
  const invoice = {
    secondSerial: '74748874',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'super', amount: 10000000 });
});

it('should win special prize', () => {
  const invoice = {
    secondSerial: '82528918',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'special', amount: 2000000 });
});

it('should win first prize', () => {
  const invoice = {
    secondSerial: '07836485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'first', amount: 200000 });
});

it('should win second prize', () => {
  const invoice = {
    secondSerial: '17836485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'second', amount: 40000 });
});

it('should win third prize', () => {
  const invoice = {
    secondSerial: '11836485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'third', amount: 10000 });
});

it('should win fourth prize', () => {
  const invoice = {
    secondSerial: '11136485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'fourth', amount: 4000 });
});

it('should win fifth prize', () => {
  const invoice = {
    secondSerial: '11116485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'fifth', amount: 1000 });
});

it('should win sixth prize', () => {
  const invoice = {
    secondSerial: '11111485',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'sixth', amount: 200 });
});

it('should win sixth prize', () => {
  const invoice = {
    secondSerial: '11111996',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: 'sixth', amount: 200 });
});

it('should not win any prize', () => {
  const invoice = {
    secondSerial: '11111111',
    year: '106',
    month: '0304',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual({ prize: null, amount: 0 });
});

it('should have no prize', () => {
  const invoice = {
    secondSerial: '11111111',
    year: '106',
    month: '0506',
  };
  const prize = checkPrize(allPrizeList, invoice);
  expect(prize).toEqual(null);
});
