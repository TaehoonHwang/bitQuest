

module.exports.test = function(data){
   console.log("Asdasdasd");
};


module.exports.test2 = function(){
    console.log('분리2');
};

module.exports.init = function(){
  io.sockets.on('connection',function(socket){
    console.log('누군가 접속했습니다');

    //echo
    socket.on('echo',function(data){
      console.log('echo : ' +data);
      socket.emit('pack_echo',data);
    });

    socket.on('disconnect', function() {
        
      socket.get('player',function(err,player){
      
          if(!player) return;
          console.log(player.name);
          player.party_talte();
        });

        socket.get('name',function(err,name){
          var size = socket_list.length;
          for(var i=0;i<size;i++)
          { 
            if(socket_list[i]==socket)
            {
              socket.get('name',function(err,name){
                var db_account = require('./db_character.js');
                    db_account.save_player(null,name);             
                socket_list.splice(i,1); //i번쨰부터 1개삭제
                //return;
              });
              socket.get('player',function(err,player){
                for(var i=0;i<player_list.length;i++)
                {
                  if(player_list[i]==player)
                  {
                    var db_account = require('./db_character.js');
                    db_account.save_player(player,null);

                    //player_list.splice(i,1); //i번쨰부터 1개삭제
                    player_list[i]= -1;
                    return;
                  }
                }
              });
            }
          }

          console.log(name +' 접속 종료');
          io.sockets.emit('now_num',player_list);
          player_list_printAll();
        });
    });
    socket.on('acc_add',function(data){
      console.log('\u001b[32m','- acc_add -','\u001b[0m');
      var db_account = require('./db_account.js');
      console.log(data[0]); //아이디
      console.log(data[1]); //비번
      console.log(data[2]); //이메일
      console.log(data[3]);
      db_account.insert(data[0],data[1],data[2],data[3]);
    });
    socket.on('check_id',function(id){
      var db_account = require('./db_account.js');
      db_account.check_id(socket,id);
    });
    socket.on('login',function(data){
      var db_account = require('./db_account.js');
      db_account.login(socket,data[0],data[1]);
    });
    socket.on('game_connection',function(id){
      console.log('game_접속');
    });
    socket.on('temp_game_connection',function(name,player_ability,extra_ability,player_inven,chara_equip,skill_test){

      socket.set('pname',name);
      //socket_list.push(socket);

      //item_data = item;

      var player = new Player();
  socket.emit('pack_max_exp',max_exp);
      player.name = name;
      //player.SetX(1*32);
      //player.SetY(1*32);
      player.SetNum(player_ability.cid);
      player.SetX(player_ability.x);
      player.SetY(player_ability.y);
      player.SetMap(player_ability.map);
      player.SetRole(player_ability.role,skill_test);
      player.SetLevel(player_ability.level);
      player.SetJob(player_ability.job);
      player.SetHp(player_ability.hp);
      player.SetMp(player_ability.mp);
      player.start_SetExp(player_ability.exp);
      player.SetStr(player_ability.str);
      player.SetDex(player_ability.dex);
      player.SetInt(player_ability.intell);
      player.SetVtl(player_ability.vlt);
      player.SetAgi(player_ability.agi);
      player.Start_SetSpoint(player_ability.spoint);
      //player.Start_SetSpoint(15);

      player.ExtraSetStr(extra_ability.str);
      player.ExtraSetDex(extra_ability.dex);
      player.ExtraSetInt(extra_ability.intell);
      player.ExtraSetVtl(extra_ability.vlt);
      player.ExtraSetAgi(extra_ability.agi);
      player.ExtraSetAd(extra_ability.ad);
      player.ExtraSetDad(extra_ability.dad);
      player.ExtraSetAp(extra_ability.ap);  
      player.ExtraSetDap(extra_ability.dap);
      player.ExtraSetAvoid(extra_ability.avoid);
      player.ExtraSetHp(extra_ability.hp);
      player.ExtraSetMp(extra_ability.mp);

      player.start_SetGold(player_ability.gold);
      player.SetInventory(player_inven);
      //console.log(player.inventory.storage);

      player.SetEquip(chara_equip);

      player.UpdateAbility();
      player.UpdateSkill();

      var index = player_list_insert(player);
      player.index = index;
      //player_list.push(player);
      socket.set('player',player); //소켓에 저장
      socket.emit('pack_map_update',player.map_name,player.map);

      var npc_list_adj = [];
      for(var i=0;i<npc_list.length;i++)
      {
        if(npc_list[i].map_name == player.map_name)
        {
          npc_list_adj.push(npc_list[i]);
        }
      }
      socket.emit('pack_npc_update',npc_list_adj);


      console.log(name+'님_접속');

     // player_list_printAll();
    });

    socket.on('request_update',function(map_name){

        socket.get('player',function(err,player){

            if(!player) return;
            //console.time('시간');
            var viewX = (player.x < 320) ? 0 : player.x-320;
            var viewY = (player.y < 320) ? 0 : player.y-320;
            viewX = (viewX > player.map.width-640) ? player.map.width-640 : viewX;
            viewY = (viewY > player.map.height-640) ? player.map.height-640 : viewY;
            //socket.emit('pack_myplayer_update',player);
            socket.emit('pack_view_update',viewX,viewY);
            var player_list_adj = [];
            for(var i=0;i<player_list.length;i++)
            {
              if(player_list[i].map_name == map_name)
              {
                player_list_adj.push(player_list[i]);
              }
            }

            socket.emit('pack_player_list_update',player_list_adj);
            //console.timeEnd('시간');
        });
    });
    //플레이어io
    socket.on('player',function(what,data){
      var token = what.split('#');
      socket.get('player',function(err,player){
        switch(token[0]){
          case 'inventory_change':
            player.inventory_change(data[0],data[1]);
            setTimeout(function(){
              socket.emit('pack_ui_chan','ui_equip');
            },100);
          break;

          case 'inventory_delete':
            player.inventory_delete(data);
            //ㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊ
            console.log('왓ㄴ;ㅣ');
            setTimeout(function(){
              socket.emit('pack_ui_chan','ui_equip');
            },100);
          break;

          case 'equip':
            switch(token[1])
            {
              case 'weapon': player.equip(0,data); break;
              case 'head': player.equip(1,data); break;
              case 'top': player.equip(2,data); break;
              case 'bottom': player.equip(3,data); break;
              case 'glove': player.equip(4,data); break;
              case 'shoes': player.equip(5,data); break;
              case 'ring': player.equip(6,data); break;
            }
            setTimeout(function(){
              socket.emit('pack_ui_chan','ui_equip');
            },100);
          break;

          case 'dequip':
            player.dequip(data);
            setTimeout(function(){
              socket.emit('pack_ui_chan','ui_equip');
            },100);
          break;

          case 'skill_take':
            player.skill_take(data);
            console.log('된겨');
            setTimeout(function(){
              socket.emit('pack_ui_chan','ui_skill');
            },100);
          break;

          case 'yesno':
            switch(data[0]){
              case 'party_apply':
                if(data[1]){
                  var p = player_list[player.select_player]; //파티장
                  p.party_apply(player.index);
                }
              break;
              case 'role_change':
                if(data[1]){ //전직 하겠습니다!
                  if(player.level >= 10 && player.role == 1) //플레이어 랩이 10이상이면
                  {
                    console.log((data[2]+1)+'로 전직!');
                    player.UpGrade(parseInt(data[2])+1);
                    setTimeout(function(){
                      socket.emit('pack_ui_chan','ui_status');
                    },150);
                  }
                }
              break;
            }


          break;

          case 'party_exit':
            player.party_talte();
          break;
        }
      });
    });

//dddddddddddddddddddddddd
    socket.on('battle_anim_end',function(){
          socket.get('player',function(err,player){
            for(var i=0;i<4;i++)
            {
              if(player.br.Lslot[i] == -1) break;
              var token = player.br.Lslot[i].split('#');
              if(player.index == parseInt(token[1]) && token[8] == 'dead' ){
                console.log('넌쥬겄으니 ');
                player.br_pointer = 'page3#0';
                socket.emit('pack_battle_ui_update',player.br_pointer);
                return;
              }
            }
            player.br_pointer = 'page0#0';
            socket.emit('pack_battle_ui_update',player.br_pointer);
          });
    });

  socket.on('battle_finish',function(){
          console.log('게임이 끝낫대요');
          socket.get('player',function(err,player){
            //console.log(player);
            if(!player) return;
            if(player.party != -1)
            {
              console.log(player.br.end_ready);
              if(!player.br.end_ready) return;
              player.br.end_ready.push(1);
              if(player.br.end_ready.length == player.br.player_num) {
                console.log('end_ready 종료');

                for(var i=0;i<player.party.player_list.length;i++){
                  var p = player_list[player.party.player_list[i]];
                  //데이터 정리
                  p.br.delete();
                  p.br = -1;
                  p.isBattle = false;
                  //p의 소켓을 찾아라
                  for(var j=0;j<socket_list.length;j++){
                    var sock = socket_list[j];
                    sock.get('pname',function(err,name){
                        if(p.name == name) {
                          sock.emit('pack_battle_finish');
                          console.log(p.name);
                        }
                    });
                  }
                }

              }
            }else{
              player.isBattle = false;
              socket.emit('pack_battle_finish');
              player.br.delete();
              player.br = -1;
            }

          });
    });

    socket.on('ui_chan',function(data){
          console.log(data+' 클릭');
          socket.emit('pack_ui_chan',data);
    });
    socket.on('chat',function(msg){
      if(msg=='좌표')
      {
        socket.get('player',function(err,player){
          var msg2 = '좌표 : '+(player.x/32)+','+(player.y/32);
          console.log(msg2);
          socket.emit('pack_chat_update',msg2);
        })
      }
      socket.get('pname',function(err,name){
        //chat_list.push(name+' : '+msg);
        io.sockets.emit('pack_chat_update',name+' : '+msg);
        //console.log(map1.data);
        //io.sockets.emit('pack_map_update',map1);
      });
      chat_list_printAll();
    });
    socket.on('key',function(key){
      socket.get('player',function(err,player){
        if(!player) return;

        if(player.isBattle){
          //console.log('배틀중');
          if(player.br == -1) return;
          var result = player.battleOper(key);

          console.log('result : '+result);
          //배틀io
          switch(result)
          {
            case 'ui': socket.emit('pack_battle_ui_update',player.br_pointer); break;
            case true: socket.emit('pack_battle_update',player.br); break;
            case 'log':
              if(player.party == -1) {
                socket.emit('battle_log',player.br);
                console.log('파티없음 battle_log');
              }
              else {
                player.party.socket_emit('battle_log',player.br);
                for(var i=0;i<player.party.player_list.length;i++)
                {
                  var p = player_list[player.party.player_list[i]];
                  p.br_pointer = 'page2#0';
                }

                player.party.socket_emit('pack_battle_ui_update',player.br_pointer);
                console.log('파티있어용 battle_log');
              }
              var result = player.br.battle_turn_end();
              if(result) //게임 종료?
              {
                if(result == 'L_WIN'){
                  if(player.party == -1) socket.emit('battle_result',result,player.br.drop_table);
                  else player.party.socket_emit2('battle_result',result,player.br.drop_table);
                  player.br.battle_result_data_apply();
                }else if(result == 'R_WIN'){
                  if(player.party == -1) socket.emit('battle_result',result);
                  else player.party.socket_emit('battle_result',result);
                  player.SetHp(10);
                }
                //데이터 정리
                // player.br.delete();
                // player.br = -1;
              }
            break;
          }
          return;
        }
        if(player.isMoving) return;

        switch(key){
          case 'DOWN':
            if(player.isShop)
            {
              if(player.shop_max_choice > player.shop_choice)
              {
                player.shop_choice++;
                socket.emit('shop_choice_chan','down');
              }
              return;
            }
          case 'LEFT':
          case 'RIGHT':
          case 'UP':
            if(player.isShop)
            {
              if(player.shop_choice > 0)
              {
                player.shop_choice--;
                socket.emit('shop_choice_chan','up');
              }
              return;
            }

            if(player.isTalk) return;
            if(player.portalCheck(key))
            {
              socket.emit('pack_map_update',player.map_name,player.map);
              //
              var npc_list_adj = [];
              for(var i=0;i<npc_list.length;i++)
              {
                if(npc_list[i].map_name == player.map_name)
                {
                  npc_list_adj.push(npc_list[i]);
                }
              }
              socket.emit('pack_npc_update',npc_list_adj);
              //
            }
            else
            {
              if(player.battleCheck())
              {
                  console.log('배틀 발생!');

                  socket.emit('scene_chan',1);
                  socket.emit('pack_battle_update',player.br);
                  socket.emit('pack_battle_ui_update',player.br_pointer);
                  return;
              }
              else player.move(key);
            }
          break;
          case 'z':
            if(player.isShop){
              player.perchase();
              setTimeout(function(){
                socket.emit('pack_ui_chan','ui_equip');
              },300);
              return;
            }
            if(player.isTalk){
              player.leftTalk--;
              if(player.leftTalk == 0)
              {
                player.isTalk = false;
                socket.emit('say_close');
                return;
              }
              socket.emit('say');
              return;
            }
            var data = player.playerCheck();
            console.log(data);
            if(data) //이름이있음
            {
              //이미 파티인지 찾기
              //ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ
              for(var i=0;i<player_list.length;i++)
              {
                var p = player_list[i];
                if(p == -1) continue;
                if(p.name == data){
                  if(p.isBattle){
                    return; //싸우고있으면
                  }
                }
              }
              console.log(data+'찾음');
              var ddata = [];
              ddata[0] = 'party_apply';
              ddata[1] = data;
              socket.emit('yesno',ddata);
              return;
            }
            var data = player.objectCheck();
           // console.log(data);

            if(data)
            {
              var token = data.split('#');
              switch(parseInt(token[0]))
              {
                case 0:
                  socket.emit('say_open',token[1]);
                break;
                case 1:
                  socket.emit('shop_open',token[1]);
                break;
                case 2:
                  socket.emit('say_open',token[1]);
                  setTimeout(function(){
                    socket.emit('pack_ui_chan','ui_status');
                  },300);
                break;
                case 3:
                  var ddata = [];
                  ddata[0] = 'role_change';
                  ddata[1] = token[1];
                  //console.log(ddata);
                  socket.emit('yesno',ddata);
                break;
              }
              //console.log('switch : '+token[0]);
            }
            else console.log('z키 누름');
          break;
          case 'x':
            player.isShop = false;
            socket.emit('shop_close');
          break;
        }
      });

    });
    socket.on('view_update',function(key){

    });

    socket.on('ctest',function(data){
      chat_list.push(data);
      socket.emit('pack_ctest',chat_list);
    });
    

  socket.on('nickname_check_id',function(nickname){
      var db_character = require('./db_character.js');
      db_character.nickname_check_id(socket,nickname);
    });

    socket.on('chara_create',function(create_data){
      var db_character = require('./db_character.js');
      socket.get('name',function(err,data){
            db_character.chara_create(socket,create_data[0],create_data[1],data);
      });

    });

    socket.on('chara_data_check',function(charNumber){
      var db_character = require('./db_character.js');
      socket.get('name',function(err,data){
        ///data는 id 유저아이디
            db_character.chara_data_check(socket,data,charNumber);
      });

    });

    socket.on('chara_ability_check',function(charNumber){
      var db_character = require('./db_character.js');
       socket.get('name',function(err,data){
        ///data는 id 유저아이디
            db_character.chara_ability_check(socket,data,charNumber);
      });
    });

    socket.on('delete_check_id',function(client_data){
      var db_character = require('./db_character.js');
       socket.get('name',function(err,data){
        ///data는 id 유저아이디
            db_character.delete_check_id(socket,data,client_data[0],client_data[1]);
      });

    });

    socket.on('chara_delete',function(client_data){
      //client_data[0]= nickname , client_data[1] = 캐릭터 인덱스
      var db_character = require('./db_character.js');
       socket.get('name',function(err,data){
        ///data는 id 유저아이디
            db_character.chara_delete(socket,data,client_data[0],client_data[1]);
      });

    });

    socket.on('label_Input_nik',function(){
      var db_character = require('./db_character.js');
      socket.get('name',function(err,data){
        // data는 id 유저아이디
          db_character.label_Input_nik(socket,data);
      });
    });



  });
};
