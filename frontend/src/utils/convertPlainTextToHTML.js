import regexIndexOf from "./regexIndexOf"
const convertPlainTextToHTML = (text, mentions) => {
  let HTMLtext = document.createElement("div");
  const splitText = text.split("\n");
  const mentionsToObject = {};
  mentions.forEach(mention => {
    mentionsToObject[mention.value] = mention.userId
  })
  
  splitText.forEach(subText => {
    const p = document.createElement("p");
    p.innerHTML = subText.trim();    
    let anchorCurrentIndex = -1 ;    
    let counterAnchor = 1 ;       
    while(counterAnchor){
      anchorCurrentIndex = subText.indexOf("@",anchorCurrentIndex) ;             
      if(anchorCurrentIndex > -1){        
        anchorCurrentIndex++; 
        let anchorString = subText.substring(anchorCurrentIndex, regexIndexOf(subText, /[\s@]/, anchorCurrentIndex));                        
        if(mentionsToObject.hasOwnProperty(anchorString)){     
          p.innerHTML = p.innerHTML.replace(`@${anchorString}`, `<a href="/user/${mentionsToObject[anchorString]}">@${anchorString}</a>`)          
        }
        counterAnchor++;        
      }     
      counterAnchor--; 
    }      
    let tagsCurrentIndex = -1 ;
    let tagsCounter = 1 ; 
    while(tagsCounter){      
      tagsCurrentIndex = subText.indexOf("#", tagsCurrentIndex);
      if(tagsCurrentIndex>-1){
        tagsCurrentIndex++;        
        let endSubStringIndex = regexIndexOf(subText, /[\s#]/, tagsCurrentIndex) === -1 ? subText.length : regexIndexOf(subText, /[\s#]/, tagsCurrentIndex) 
        
        let tagsString = subText.substring(tagsCurrentIndex, endSubStringIndex);
        if(tagsString){
          p.innerHTML = p.innerHTML.replace(`#${tagsString}`, `<a href="/tags/${tagsString}">#${tagsString}</a>`)
          
        }
        tagsCounter++;
        
      }
      tagsCounter--;
    }
    HTMLtext.appendChild(p)    
  }) 
  console.log(HTMLtext) 
  return HTMLtext.outerHTML;
}

export {convertPlainTextToHTML}