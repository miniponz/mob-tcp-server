/* eslint-disable no-console */
const ChatRoom = require('./ChatRoom.js');
const net = require('net');
const { matchString } = require('./regex.js');

const chatroom = new ChatRoom();

const server = net.createServer(connectedClient => { 
  console.log('A client has connected');
  connectedClient.setEncoding('utf8');
  chatroom.add(connectedClient);

  connectedClient.on('data', message => {
    if(message.toLowerCase().includes('i love you')) {
      connectedClient.write(`Seen at ${new Date().toLocaleTimeString()}`);
      return;
    }
    const commands = matchString(message);
    if(!commands) connectedClient.write('From Server: Please use a valid command: @all, @dm, or @nick');
    else {
      const oldUserName = connectedClient.username; 
      switch(commands.command) {
        case 'all':
          chatroom.all().forEach(client => {
            client.write(`${connectedClient.username}: ${commands.text}`);
          });
          break;
        case 'dm':
          chatroom.getClient(commands.arg).write(`${connectedClient.username} (DM): ${commands.text}`);
          break;
        case 'nick':
          chatroom.rename(oldUserName, commands.arg);
          chatroom.all().forEach(client => {
            client.write(`${oldUserName} has changed their username to ${commands.arg}.`);
          });
          break;
        default:
          connectedClient.write('From Server: Not a valid command. Please use @all, @dm, or @nick');
      }
    }
  });
});

module.exports = server;
