const parseMsg = require('../lib/parseMsg.js');

describe('parseMsg function', () => {
  it('ignores strings that do not start with @', () => {
    const expected = null;
    const input = 'This is a string';
    const result = parseMsg(input);

    expect(result).toEqual(expected);
  });
});
