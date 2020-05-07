
module.exports.Success = function(log,what){
    console.log('\u001b[42m','Sucess','\u001b[0m',what+' - '+log);
};

module.exports.Request = function(log){
    console.log('\u001b[43m','Request','\u001b[0m',log);
};

module.exports.Red = function(log){
    console.log('\u001b[1m','\u001b[31m',log,'\u001b[0m');
};

module.exports.SockOn = function(who,what){
    console.log('\u001b[1m','\u001b[35m',who,'\u001b[0m',' - '+what);
};

module.exports.SockLog = function(socket,what){
    socket.get('name',function(err,name){
      console.log('\u001b[1m','\u001b[35m',name,'\u001b[0m',' - '+what);
    });

};
/*
console.log('\u001b[31m','색깔테스트','\u001b[0m');
console.log('\u001b[32m','색깔테스트','\u001b[0m');
console.log('\u001b[33m','색깔테스트','\u001b[0m');
console.log('\u001b[34m','색깔테스트','\u001b[0m');
console.log('\u001b[35m','색깔테스트','\u001b[0m');
console.log('\u001b[36m','색깔테스트','\u001b[0m');
console.log('\u001b[37m','색깔테스트','\u001b[0m');
console.log('\u001b[1m');
console.log('\u001b[31m','색깔테스트','\u001b[0m');
console.log('\u001b[32m','색깔테스트','\u001b[0m');
console.log('\u001b[33m','색깔테스트','\u001b[0m');
console.log('\u001b[34m','색깔테스트','\u001b[0m');
console.log('\u001b[35m','색깔테스트','\u001b[0m');
console.log('\u001b[36m','색깔테스트','\u001b[0m');
console.log('\u001b[37m','색깔테스트','\u001b[0m');
//console.log('\u001b[0m');
console.log('\u001b[40m','색깔테스트','\u001b[0m');
console.log('\u001b[41m','색깔테스트','\u001b[0m');
console.log('\u001b[42m','색깔테스트','\u001b[0m');
console.log('\u001b[43m','색깔테스트','\u001b[0m');
console.log('\u001b[44m','색깔테스트','\u001b[0m');
console.log('\u001b[45m','색깔테스트','\u001b[0m');
console.log('\u001b[46m','색깔테스트','\u001b[0m');
console.log('\u001b[47m','색깔테스트','\u001b[0m');
*/
