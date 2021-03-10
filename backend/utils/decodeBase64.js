function decodeBase64(dataString) {    
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if(!matches){
    throw new Error("invalid data");
  }
  let response = {};
  console.log(matches.length)
  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");

  return response;
}

export default decodeBase64
