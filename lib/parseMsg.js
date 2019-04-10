function parseMsg(string) {
  if(string[0] !== '@') return null;

  let firstSpace = string.indexOf(' ');
  if(firstSpace === -1) {
    firstSpace = string.length;
  }
  const firstHalf = string.slice(1, firstSpace).split(':');
  const command = firstHalf[0];
  const arg = firstHalf[1];
  const text = string.slice(firstSpace + 1);
  
  return {
    command,
    arg,
    text
  };
}

module.exports = parseMsg;
