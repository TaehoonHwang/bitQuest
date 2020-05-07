
var socket = io.connect();

/*
socket.on('pack_myplayer_update',function(player){

  myplayer_data = player;
  myplayer.x = player.x;
  myplayer.y = player.y;
  console.log(myplayer_data);
  //console.log(player);
});
*/
socket.on('pack_skill',function(data){
  skill_test = data;
});
socket.on('yesno',function(data){
  yesno_choice = true;
  yesno_isNew = true;
  yesno_type = data[0];
  yesno_data = data[1];
});
socket.on('party_info_data',function(data){
  party_info_data = data;
  party_info_isNew = true;
});

socket.on('pack_echo',function(data){
  console.log('echo : '+data);
});

socket.on('pack_battle_finish',function(){
  //battle_data = data;
  battle_finish = true;
  map_data.isNew = true;
  key_input_ok = false;
  //socket.emit('ui_chan',ui.now_name);
});


socket.on('pack_battle_ui_update',function(data){
  console.log('pack_battle_ui_update');
  battle_ui_data.data = data;
  battle_ui_data.isNew = true;

});

socket.on('battle_log',function(data){
  //battle_data = data;
  battle_animation_data = data.battle_log;
  battle_animation_isNew = true;
  battle_animation_isPlaying = true;
  key_input_ok = false;
});

socket.on('battle_result',function(result,data){
  battle_result = result;
  if(result == 'L_WIN')
  {
    battle_result_data = data;
    console.log(battle_result_data);
  }
  battle_result_isNew = true;
});

socket.on('shop_open',function(data){
  shop.data = [];
  shop.choice = 0;
  var token = data.split('!');
  for(var i=0;i<token.length;i++)
  {
    var token2 = token[i].split('@');
    var item = {};
    item.code = token2[0];
    item.price = token2[1];
    shop.data.push(item);
  }
  shop.isNew = true;
});

socket.on('shop_choice_chan',function(data){
  if(data =='up') shop.choice--;
  else shop.choice++;
  shop.isNew = true;

  //console.log(data);
});


socket.on('shop_close',function(){
  shop.closeOk = true;
});

socket.on('say_open',function(data){
  say.text = data.split('@');
  say.isNew = true;
});

socket.on('say',function(data){
  say.isNew = true;
});

socket.on('say_close',function(){
  say.page = 0;
  say.closeOk = true;
});
socket.on('scene_chan',function(data){
  scene.num = data;
  scene.isNew = true;
});

socket.on('pack_player_list_update',function(data){
  player_data = data;
  player_data.isNew = true;
});

socket.on('pack_battle_update',function(data){

  console.log('pack_battle_update');
  battle_data = data;
  battle_data.isNew = true;

});

socket.on('pack_battle_ui_update',function(data){
  console.log('pack_battle_ui_update');
  battle_ui_data.data = data;
  battle_ui_data.isNew = true;

});

socket.on('pack_chat_update',function(data){
  //user_num++;
  //alert('player_list.length : '+player_list.length);
  if(chat_list.length >= 8)
    chat_list.splice(0,1); //맨 윗줄 삭제
  chat_list.push(data); //채팅 추가
  chat_list.isNew = true;

  gameStart = true;
  game_isNew = true;
  //alert(msg);
});

socket.on('pack_map_update',function(name,data){
  //console.log(data);
  //console.log(name);
  map_data.img_src = data.img_src;
  map_data.map_name = data.map_name;
  map_data.song_src = data.song_src;
  map_name = name;
  map_data.data =[];  data.data;
  for(var i=0;i<data.data.length;i++)
  {
      map_data.data[i] = data.data[i];
  }
  map_data.isNew = true;

});
socket.on('pack_npc_update',function(data){
  //console.log('pack_npc_update');
  //console.log(data);
  npc_data = data;
  npc_list.isNew = true;
});

socket.on('pack_view_update',function(x,y){
  view.x = x;
  view.y = y;
  //view.x = (x < 320) ? 0 : x-320;
  //view.y = (y < 320) ? 0 : y-320;
  //view.x = ((x+320) > 960) ? 640-960 : view.x;
  //view.x = (view.x + 640 > 960) ? 960-640 : view.x;
  //view.y = (view.y + 640> 640) ? 640-320 : view.y;
  view.isNew = true;
});

socket.on('pack_ui_chan',function(data){
      ui.prev_name = ui.now_name;
      ui.now_name = data;
      ui.isNew = true;
      //console.log('pack_ui_chan');
      //console.log(ui);
});




socket.on('pack_check_id',function(data){
                      if(data){
                        alert("가입이 가능합니다");
                      }
                      else
                      {
                        alert("중복된 아이디가 있습니다");
                     }
                  });
             //로그인 성공여부
             socket.on('pack_login',function(data){
                  if(data){
                    alert("로그인 성공");

                    $('#test').hide();
                    $('#test2').show();
                    $('#loginform').dialog("close");

                    socket.emit('label_Input_nik');

                    $('#test').remove();
                  }
                  else{
                    alert("로그인 실패");
                    //alert("이미 로그인 중입니다 ");

                  }
             });
//---------------------------------------------------------------------------------------------------
              ///아이디 중복 있는지 없는 체크
              
            socket.on('pack_nickname_check_id',function(data){

                  if(data){
                    var create_data = [];
                    create_data.push($('#CC_nik').val(),goodboy);

                    socket.emit('chara_create',create_data);
                     $("#CC_nik").val("");
                    $('#CCDialog').dialog("close");
                    alert("캐릭이 생성 되었습니다");

                    socket.emit('label_Input_nik');
                  }
                  else{
                    //socket.emit('chara_create',$('#CC_nik').val());
                    alert("중복 나와라이 ");
                  }
            });
            ///삭제체크
            socket.on('pack_delete_check_id',function(data){
                if(data){
                  var delete_data = [];
                  delete_data.push($('#CD_nik').val(),goodboy);

                  socket.emit('chara_delete',delete_data);
                  $('#CD_nik').val("");
                  $('#CDDialog').dialog("close");
                  alert("캐릭이 삭제 되었습니다");
                  socket.emit('label_Input_nik');
                }
                else{
                  alert("삭제 불가능 합니다");
                }
            });
            //캐릭터 유무 여부 체크
            socket.on('pack_chara_data_check',function(data){
                if(data){
                  btnShow('create');
                }
                else{
                   btnShow('StartAndDelete');
                }
            });
            //캐릭터 능력치 체크
            socket.on('pack_chara_ability_check',function(data,abil){

                player_ability.role = data[0];
                player_ability.nickname = data[1];
                player_ability.job = data[3];
                player_ability.level = data[2];
                player_ability.str = data[4] * data[2] +abil[0];
                player_ability.dex = data[5] * data[2] +abil[1];
                player_ability.intell = data[6] * data[2] +abil[2];
                player_ability.vlt = data[7] * data[2] +abil[3];
                player_ability.agi = data[8] * data[2] +abil[4];
                player_ability.gold = data[9];
                player_ability.exp = data[10];  
                player_ability.hp = data[11];
                player_ability.mp = data[12];

                p_abil.role = data[0];
                p_abil.nickname = data[1];
                p_abil.job = data[3];
                p_abil.level = data[2];
                p_abil.str = data[4];
                p_abil.dex = data[5];
                p_abil.intell = data[6];
                p_abil.vlt = data[7];
                p_abil.agi = data[8];
                p_abil.gold = data[9];
                p_abil.exp = data[10];  
                p_abil.hp = data[11];
                p_abil.mp = data[12];

                p_abil.x = data[13];
                p_abil.y = data[14];
                p_abil.cid = data[15];
                p_abil.map = data[16];
                p_abil.spoint = data[17];

                extra_abil.str = abil[0];
                extra_abil.dex = abil[1];
                extra_abil.intell = abil[2];
                extra_abil.vlt = abil[3];
                extra_abil.agi = abil[4];
                extra_abil.ad = abil[5];
                extra_abil.dad = abil[6];
                extra_abil.ap = abil[7];
                extra_abil.dap = abil[8];
                extra_abil.avoid = abil[9];
                extra_abil.hp = abil[10];
                extra_abil.mp = abil[11];


                add_sta();

                if(data == false){
                    info_init();
                  }
            });

            socket.on('pack_chara_inven_check',function(inven){
              player_inven = inven;
            });
            socket.on('pack_all_item_check',function(all_item_list){
              item_data = all_item_list;
            });
            socket.on('pack_monster_check',function(all_monster){
              monster_data = all_monster;
            });
            socket.on('pack_all_skill',function(all_skill){
              skill_data = all_skill;
              

            });
            socket.on('pack_max_exp',function(data){
              max_exp = data;
            });
            socket.on('pack_chara_equip',function(chara_equip){
              player_equip = chara_equip;
            });


            //Label에 닉네임 적기 비동기로 인해 각가 다 쏨
            socket.on('pack_label_input1',function(data1){
                 $('#C1L').text(data1);
            });
            socket.on('pack_label_input2',function(data2){
                 $('#C2L').text(data2);
            });
            socket.on('pack_label_input3',function(data3){
                 $('#C3L').text(data3);
            });

            //이미지 해보기
            socket.on('pack_img_load1',function(data){
             if(data==""){addBgImage('#C1','캐릭1.png');}
             else{$('#C1').css("background-image","url("+data+")");
            $('#s_img').css("background-image","url("+data+")")}
            });
            socket.on('pack_img_load2',function(data){
              if(data==""){addBgImage('#C2','캐릭1.png');}
             else{$('#C2').css("background-image","url("+data+")");
            $('#s_img').css("background-image","url("+data+")")}
             
            });
            socket.on('pack_img_load3',function(data){
              if(data==""){addBgImage('#C3','캐릭1.png');}
             else{$('#C3').css("background-image","url("+data+")");
            $('#s_img').css("background-image","url("+data+")")}
              
            });
