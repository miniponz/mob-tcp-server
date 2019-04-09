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

  it('renames a client', () => {
    const client = {};
    chatRoom.add(client);
    const oldUsername = client.username;
    const result = chatRoom.rename(oldUsername, 'Lavender');
    
    expect(result).toBe(true);
    expect(client.username).toEqual('Lavender');
    expect(chatRoom.getClient(oldUsername)).toBeFalsy();

  });

  it('returns false if new username is already in map', () => {
    const client1 = {};
    const client2 = {};
    chatRoom.add(client1);
    chatRoom.add(client2);
    const result = chatRoom.rename(client1.username, client2.username);
  
    expect(result).toBeFalsy();
    expect(chatRoom.getClient(client1.username)).toEqual(client1);
    expect(chatRoom.getClient(client2.username)).toEqual(client2);
  });

  it('returns all clients', () => {
    const client1 = {};
    const client2 = {};
    chatRoom.add(client1);
    chatRoom.add(client2);  
    const expected = [client1, client2];
    expect(chatRoom.all()).toEqual(expected);
  });
});
