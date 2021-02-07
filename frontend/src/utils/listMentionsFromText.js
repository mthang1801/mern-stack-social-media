function regexIndexOf(string, regex, startpos) {
  var indexOf = string.substring(startpos || 0).search(regex);
  return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

const listMentionsFromText = text => {
  if (!text) return null;
  const mentions = new Set();
  for (let i = 0; i < text.length; i++) {
    let prefixIdx = text.indexOf("@", i);
    if (prefixIdx >= 0) {      
      let lastIndexOfSubString = regexIndexOf(text, /[^0-9A-Za-z]/gi, prefixIdx + 1)
      let subString = text.slice(prefixIdx + 1, lastIndexOfSubString)
      mentions.add(subString)
      if (i < prefixIdx) {
        i = prefixIdx;
      }
    }
  }
  return mentions
}

const preventDuplicateMentions = mentions => {
  let newMentions = {};
  let mentionsArrayUnique = [];
  mentions.forEach(({userId, value}) => {
    if(!newMentions[userId]){
      newMentions[userId] = true ;
      mentionsArrayUnique = [...mentionsArrayUnique, {userId, value}]
    }
  })
  return mentionsArrayUnique
}

const compareAndUpdateMentions = (text, mentions) => {
  const mentionsUnique = preventDuplicateMentions(mentions);
  const mentionsFromText = listMentionsFromText(text); 
  const updatedMentions = [];
  mentionsUnique.forEach(({userId, value}) => {
    if(mentionsFromText.has(value)){
      updatedMentions.push(userId)
    }
  })
  
  return updatedMentions
}

export default compareAndUpdateMentions