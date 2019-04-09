const shortId = require('shortid');

module.exports = class ChatRoom {
  constructor() {
    this.clients = new Map();
  }
  add(client) {
    client.username = shortId.generate();
    this.clients.set(client.username, client);
    return client;
  }

  getClient(username) {
    return this.clients.get(username);
  }

  rename(oldUserName, newUserName) {
    if(this.clients.has(newUserName)) return false;
    
    const client = this.clients.get(oldUserName);
    client.username = newUserName;
    this.clients.set(client.username, client);
    return this.clients.delete(oldUserName);
  }

  all() {
    return [...this.clients.values()];
  }
};


