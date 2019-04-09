function parseMsg(string) {
  if(string[0] !== '@') return null;

  const firstSpace = string.indexOf(' ');
  const firstHalf = string.slice(0, firstSpace).slice(1).split(':');
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
// @dm:person Message here
// @all Message here
//find first space
//slice on the space
//if the first chunk includes a colon, slice again
