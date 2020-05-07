
global.Random = function(min,max){
  var val = Math.floor(Math.random()*(max-min+1))+min;
  return val;
}
