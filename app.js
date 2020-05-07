
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var express = require('express');
var bodyParser= require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
require('./js/global_func.js');
require('./js/battleRoom.js');
require('./js/etc_data.js');
require('./js/party.js');
var JS_map_data = require('./js/map_data.js');
var JS_item_data = require('./js/item.js');
var JS_monster_data = require('./js/monster.js');
var JS_skill_data = require('./js/skill.js');
var JS_npc_data = require('./js/npc.js');
var JS_socket_list = require('./js/socket_list.js');
var JS_player_list = require('./js/player_list.js');
var JS_chat_list = require('./js/chat_list.js');
var JS_event = require('./js/io.event.js');

global.log = require('./js/logHelper');
//서버 생성
var app = express();

var server = http.createServer(app).listen(52273,function(){
  console.log('서버가 열렸습니다 52273');
});

global.io = socketio.listen(server);
io.set('log level',2);
JS_event.init();

///////////////////////////////////////
/*
var player1 = new player();

player1.SetX(3);
player1.SetY(4);

player_list.push(player1);

var player2 = new player();

player2.SetX(7);
player2.SetY(7);
player_list.push(player2);
console.log(player_list);
*/
/*
setInterval(function(){
  console.log('셋 인터벌');
}, 1000);
*/







/////////////////////////////////////////


//미들웨어 설정
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:'secret key',
  resave: false,
  saveUninitialized: true,
  cookie:{secure: false}

}));

//라우터 설정
app.get('/',function(request,response)
{
  log.Request('public/html/index.html');
  var ip = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
     console.log('접속'+ip);

  //파일을 읽습니다.
  fs.readFile('public/html/index.html','utf8',function(error,data){
    //응답
    response.send(data);
  });
  log.Success('public/html/index.html','Load');
});

app.get('/html/:name',function(request,response)
{
  var src = "public/html/"+request.params.name;
  log.Request(src);
  fs.readFile(src,'utf8',function(error,data){
    //응답
    response.send(data);
  });
  log.Success(src,'Load');
});

app.get('/js/:name',function(request,response)
{

  var src = "public/js/"+request.params.name;
  log.Request(src);

  var script = fs.readFileSync(src, "utf8");
  response.write(script);
  response.end();
  log.Success(src,'Load');

});

app.get('/css/:name',function(request,response)
{
  var src = "public/css/"+request.params.name;
  log.Request(src);
  fs.readFile(src,function(error,data){
    response.writeHead(200,{'Content-Type': 'text/css'});
    response.end(data);
    log.Success(src,'Load');
 });
});


app.get('/img/:name',function(request,response)
{
  var src = "public/img/"+request.params.name;
  log.Request(src);
  //console.log('%s Load 시작!',request.params.name);
  var script = fs.readFile(src, function(error,data){
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end(data);
  });
  log.Success(src,'Load');
});

app.get('/img/job/:name',function(request,response)
{
  var src = "public/img/job/"+request.params.name;
  log.Request(src);
  //console.log('%s Load 시작!',request.params.name);
  var script = fs.readFile(src, function(error,data){
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end(data);
  });
  log.Success(src,'Load');
});

app.post('/login',function(request,response){
  //파일을 읽습니다.
  console.log(request.body.id);
  console.log(request.body.pass);
  var db_account = require('./js/db_account.js');
  db_account.login(request,response,request.body.id,request.body.pass);
});

app.get('/game',function(request,response){
  log.Request('/game');
  fs.readFile('public/html/game.html','utf8',function(error,data){
    //응답
    response.send(data);
  });
});



//
