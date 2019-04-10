/* eslint-disable no-console */
const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$'
});

const client = net.createConnection(7890, 'localhost', () => {
  console.log('I am connected TO the server');

  rl.prompt();
  rl.on('line', line => {
    client.write(line);
    rl.prompt();
  });
});

client.on('data', data => {
  console.log(data.toString());
  rl.prompt();
});
