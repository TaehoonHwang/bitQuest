
global.socket_list = [];

module.exports.find = function(socket,id){
  console.log('접속유저('+socket_list.length+')');

  for(var i=0;i<socket_list.length;i++)
  {
    if(socket_list[i]==socket)
    return true; //찾음
  }

  for(var i=0;i<socket_list.length;i++)
  {
    var isFind = false;
    socket_list[i].get('name',function(err,data){
      if(data == id)
      {
        isFind = true;
      }
    });
    if(isFind)
    {
      return true;
    }
  }
  return false; //못찾음
}
