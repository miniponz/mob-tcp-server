const shortId = require('shortid');
const ChatRoom = require('../lib/ChatRoom.js');

describe('ChatRoom class', () => {
  let chatRoom = null;
  beforeEach(done => {
    chatRoom = new ChatRoom();
    done();
  });

  it('generates a random username', () => {
    const result = shortId.generate();
    expect(result).toEqual(expect.any(String));
  });

  it('assigns random username to client obj.', () => {
    const client = {};
    const result = chatRoom.add(client);
    expect(client.username).toEqual(expect.any(String));
    expect(result).toEqual(client);
  });

  it('returns the client object based on username', () => {
    const client = {};
    chatRoom.add(client);
    const result = chatRoom.getClient(client.username);
    expect(result).toEqual(client);
  });

});
