function matchString(str) {
  if(str[0] !== '@') return null;
  
  const pattern = /@(?<command>\w*):?(?<arg>\w*)\s?(?<text>.*)?/;
  const match = pattern.exec(str);
  
  if(!match || !match.groups) return null;
  
  return (match.groups);

}


module.exports = { matchString };

