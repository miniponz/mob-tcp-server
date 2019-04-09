const parseMsg = require('../lib/parseMsg.js');

describe('parseMsg function', () => {
  it('ignores strings that do not start with @', () => {
    const expected = null;
    const input = 'This is a string';
    const result = parseMsg(input);

    expect(result).toEqual(expected);
  });

  it('takes a string that starts with @ and returns an object', () => {
    const expected = {
      command: 'dm',
      arg: 'username',
      text: 'This is a string',
    };
    const input = '@dm:username This is a string';
    const result = parseMsg(input);
    expect(result).toEqual(expected);
  });

  it('takes a string that starts with @ but no argument', () => {
    const expected = {
      command: 'all',
      arg: undefined,
      text: 'This is a string',
    };
    const input = '@all This is a string';
    const result = parseMsg(input);
    expect(result).toEqual(expected);
  });
});

