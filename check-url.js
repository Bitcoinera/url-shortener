module.exports = function (url) {
  // Check if url is correct
  let match = url.match(/http(s:|:)\/\/www.{1,}\.[a-zA-z]{1,}/);
  if(match){
    if(match[0].length === url.length){
      return true;
    }
  }else{
    return false;
  }
}