
var mysql = require('mysql');


var client = mysql.createConnection({
  user: 'bit',
  password: '1234',
  database: 'bit_db'
});

module.exports.insert = function(id,pass,email,date){
    console.log('\u001b[32m','- account-insert -','\u001b[0m');
    client.query('INSERT INTO account (userid,password,email,date) values (?,?,?,?)',
    [
      id,pass,email,date
    ],function(){
      //실행
      console.log('\u001b[32m','- account-insert end -','\u001b[0m');
    });

    return true;
};
//중복체크
module.exports.check_id = function(socket,id)
{
    console.log('\u001b[32m','- check_id -','\u001b[0m')
    client.query('SELECT userid FROM account where userid = ?',[id //맞는 userid정보가져옴
    ],function(error,results){
      //응답
        if(results[0]) //있니
        {
            console.log(id+'중복입니당');
            socket.emit('pack_check_id',false);
        }else{    //없음 ㅋ
            console.log(id+'중복아닙니당');
            socket.emit('pack_check_id',true);
        }
    });
};

//로그인
module.exports.login = function(socket,id,pass){
  var d = new Date();
  var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() +" " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  console.log('\u001b[33m','- login -','\u001b[0m')
  client.query('SELECT * FROM account where userid = ?',
  [
    id //맞는 userid정보가져옴
  ],function(error,result){
    //응답
      if(result[0])  //검색결과있음
      {
        if(result[0].userid == id) //아이디 비교
        {
          console.log(result[0].userid + ' = 아이디 확인 성공');

          if(result[0].password == pass) //비번 비교
          {
            console.log(result[0].password + ' = 비번 확인 성공');
            var temp = require('./socket_list');
            if(temp.find(socket,id)) //찾았으면
            {
              socket.emit('pack_login',false);
              log.Red(id+' 로그인 중복');
              return;
            }

            socket.set('name',id);
            socket_list.push(socket);
            console.log('접속유저('+socket_list.length+')');
            for(var i=0;i<socket_list.length;i++)
            {
              socket_list[i].get('name',function(err,data){
                console.log(data);
              });
            }
            client.query('insert into log_list (msg,date) values (?,?)',
            [
              id + '님이 로그인 하셨습니다',strDate
            ]);

            socket.emit('pack_login',true);
            return true;
          }
          console.log(pass + ' = 비번 확인 실패');
          socket.emit('pack_login',false); //검색결과없으니 false
        }
      }else{
        console.log(id + ' = 아이디 확인 실패');
        socket.emit('pack_login',false); //검색결과없으니 false
        return false;
      }
  });
};
