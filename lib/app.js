const ChatRoom = require('./ChatRoom.js');
const net = require('net');
const parseMsg = require('./parseMsg');

const chatroom = new ChatRoom();

const server = net.createServer(connectedClient => { 
  console.log('our client is connected');
  connectedClient.setEncoding('utf8');
  chatroom.add(connectedClient);

  connectedClient.on('data', message => {
    const commands = parseMsg(message);
    if(!commands) connectedClient.write('From Server: ', 'Please use a valid command: @all, @dm, or @nick');
    else {
      const oldUserName = connectedClient.username; 
      switch(commands.command) {
        case 'all':
          chatroom.all().forEach(client => {
            client.write(commands.text);
          });
          break;
        case 'dm':
          chatroom.getClient(commands.arg).write(commands.text);
          break;
        case 'nick':
          chatroom.rename(oldUserName, commands.arg);
          chatroom.all().forEach(client => {
            client.write(`${oldUserName} has changed their username to ${commands.arg}.`);
          });
          break;
        default:
          connectedClient.write('From Server: ', 'Not a valid command. Please use @all, @dm, or @nick');
      }
    }
  });
});

module.exports = server;
