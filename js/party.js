global.party_list = [];

for(var i=0;i<10;i++)
{
  party_list.push(-1);
}

global.party_create = function(pIdx){

  for(var i=0;i<party_list.length;i++){
    if(party_list[i] == -1){
      var party = {};
      party.index = i;

      party.player_info = [];

      party.player_list = [];
      party.player_list[0] = pIdx;


      party.map_change= function(){
        var leader = player_list[party.player_list[0]];
        for(var i=1;i<party.player_list.length;i++){
          var p = player_list[party.player_list[i]];
          p.SetMap(leader.map_name);
          p.x = leader.x;
          p.y = leader.y;


          //p의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
                if(p.name == name) {
                  sock.emit('party_info_data',party.player_info);
                  sock.emit('pack_map_update',p.map_name,p.map);
                  //
                  var npc_list_adj = [];
                  for(var i=0;i<npc_list.length;i++)
                  {
                    if(npc_list[i].map_name == p.map_name)
                    {
                      npc_list_adj.push(npc_list[i]);
                    }
                  }
                  sock.emit('pack_npc_update',npc_list_adj);
                }
              });
            }
          }
      }


      party.apply = function(pIdx){
        if(party.player_list.length == 4) return false; //꽉참

        party.player_list.push(pIdx);
        var p = player_list[pIdx];
        p.party = party;
        p.isParty = true;
        party.player_info_update();
        return true; //성공
      }
      party.exit = function(pIdx){

        var p = player_list[pIdx];
        if(p.isLeader || party.player_list.length==2){ //파티장이면
          party.leader_exit();
          return true;
        }
        p.party = -1; //파티 인덱스도 없음
        p.isParty = false; //탈퇴했으니

        for(var i=0;i<party.player_list.length;i++)
        {
          if(pIdx == party.player_list[i])
          {
            party.player_list.splice(i,1);
            break;
          }
        }
        party.player_info_update();

        for(var j=0;j<socket_list.length;j++){
          var sock = socket_list[j];
          sock.get('pname',function(err,name){
            if(p.name == name) {
              sock.emit('party_info_data',new Array());
            }
          });
        }
        return true; //성공
      }

      party.leader_exit = function(){
        console.log('됫니');
        //파티원 전부 초기화
        for(var i=0;i<party.player_list.length;i++){
          var p = player_list[party.player_list[i]];

          //p의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
              if(p.name == name) {
                sock.emit('party_info_data',new Array());
              }
            });
          }
        }


        for(var i=0;i<party.player_list.length;i++)
        {
          var p = player_list[party.player_list[i]];
          p.isParty = false;
          p.isLeader = false;
          p.party = -1;
        }

        party.player_list = []; //초기화

        party.delete();

        return true; //성공
      }

      party.player_info_update = function(){
        party.player_info = [];
        for(var i=0;i<party.player_list.length;i++)
        {
          var p = player_list[party.player_list[i]];
          party.player_info.push(p.role+'#'+p.name+'#'+p.hp+'#'+p.ability.hp+'#'+p.mp+'#'+p.ability.mp);
        }
        party.player_info_send_All();
        console.log(party.player_info);
      }

      party.player_info_send_All = function(){
        for(var i=0;i<party.player_list.length;i++){
          var p = player_list[party.player_list[i]];

          //p의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
              if(p.name == name) {
                sock.emit('party_info_data',party.player_info);
              }
            });
          }
        }
      }

      party.socket_emit = function(what,data){
        for(var i=0;i<party.player_list.length;i++){
          var p = player_list[party.player_list[i]];
          // console.log('socket_emit');
          //p의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
              if(p.name == name) {
                sock.emit(what,data);
              }
            });
          }
        }
      }

      party.socket_emit2 = function(what,data,data2){
        for(var i=0;i<party.player_list.length;i++){
          var p = player_list[party.player_list[i]];
          // console.log('socket_emit2');
          //p의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
              if(p.name == name) {
                sock.emit(what,data,data2);
              }
            });
          }
        }
      }


      party.delete = function(){
        party_list[party.index] = -1;
      }


      //생성성공
      party_list[party.index] = party;
      return party; //인덱스 반환


    }
  }
}
