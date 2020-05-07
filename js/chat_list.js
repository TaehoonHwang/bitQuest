
global.chat_list = [];

global.chat_list_printAll = function(){
  console.log(' - 채팅로그 -');
  for(var i=0;i<chat_list.length;i++)
  {
      console.log(chat_list[i]);
  }
};
