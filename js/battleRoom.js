global.battleRoom = [];

for(var i=0;i<10;i++)
{
  battleRoom.push(-1);
}

//플레이어 토큰  player#인덱스#직업코드#이름#hp#최대hp#생존여부
//Rslot 토큰    monster#코드#현재hp#생존여부
//order_list    스피드#L!0->R!0 설명이 필요한지?
//맨앞 0 플레이어 1 몬스터

global.battleRoom_create = function(pIdx,battleData){
  var room_num = 0;
  for(var i=0;i<battleRoom.length;i++)
  {
    room_num = i;
    if(battleRoom[i] == -1)
    {
      var br = {};

      br.index = i;
      //변수선언
      br.Lslot = new Array(-1,-1,-1,-1);
      br.Rslot = new Array(-1,-1,-1,-1);
      br.Lslot_ready = [];
      br.Rslot_ready = [];
      br.order_list = [];
      br.player_num = 1;
      br.drop_table = new Array(-1,-1,-1,-1);

      br.battle_log = [];
      br.battle_end = false;
      br.end_ready = [];

      var mon_num = Math.floor(Math.random()*4)+1; // 1~4
      var compo = battleData.split('#');

      var p = player_list[pIdx];
      br.Lslot[0] = 'player'+'#'+p.index+'#'+p.role+'#'+p.name+'#'+p.hp+'#'+p.ability.hp+'#'+p.mp+'#'+p.ability.mp+'#alive';

      for(var i=0;i<mon_num;i++)
      {
          var rand = Math.floor(Math.random()*(compo.length)); //0~(compo.length-1)
          var code = compo[rand];
          br.Rslot[i] = 'monster'+'#'+code+'#'+monster_data[code].ability.hp+'#'+'alive';
      }

      //배틀 세팅 끗 이제 데이터 전송

      if(p.isLeader){ //파티장이세여?
        br.player_num = p.party.player_list.length;
        for(var i=1;i<p.party.player_list.length;i++){
          var p2 = player_list[p.party.player_list[i]];

          br.Lslot[i] = 'player'+'#'+p2.index+'#'+p2.role+'#'+p2.name+'#'+p2.hp+'#'+p2.ability.hp+'#'+p2.mp+'#'+p2.ability.mp+'#alive';

        }

        for(var i=1;i<p.party.player_list.length;i++){
          var p2 = player_list[p.party.player_list[i]];

          //파티장 br공유
          p2.br = br;
          p2.br_pointer = 'page0#0';
          p2.isBattle = true;

          //p2의 소켓을 찾아라
          for(var j=0;j<socket_list.length;j++){
            var sock = socket_list[j];
            sock.get('pname',function(err,name){
                if(p2.name == name) {

                  sock.emit('scene_chan',1);
                  sock.emit('pack_battle_update',p2.br);
                  sock.emit('pack_battle_ui_update',p2.br_pointer);
                }
            });
          }
        }

        console.log(br.Lslot);
      }


      br.delete= function(){
        battleRoom[br.index] = -1;
      }

      br.battle_result_data_apply = function(){
        for(var i=0;i<br.player_num;i++){
          var token = br.Lslot[i].split('#');
          var pIdx = parseInt(token[1]);
          if(token[8]=='dead') {//죽었으면
            var player = player_list[pIdx];
            player.SetHp(10);
          }else if(token[8] == 'alive'){
            var player = player_list[pIdx];

            var exp = br.drop_table[i].exp;
            var gold = br.drop_table[i].gold;
            var item_list = br.drop_table[i].item_list;


            console.log(br.Lslot);
            player.SetHp(parseInt(token[4]));
            player.SetExp(player.exp+exp);
            player.SetGold(player.inventory.gold+gold);

            for(var j=0;j<item_list.length;j++)
            {
              player.inventory_add(item_list[j]);
            }
          }
          //파티 정보 갱신

        }
        var token = br.Lslot[0].split('#');
        var pIdx = parseInt(token[1]);
        var p = player_list[pIdx];
        if(p.party != -1) {
          p.party.player_info_update();
          console.log('정보전송');
        }

      }
      //dddddddddddddddddddddddddddddddddddd
      br.isReady = function(){
        var p_num = 0;
        for(var i=0;i<4;i++){
          if(br.Lslot[i] == -1) break;
          var token = br.Lslot[i].split('#');
          if(token[8] == 'alive'){
            p_num++;
          }
        }
        console.log('isReady');
        console.log(br.Lslot_ready.length)
        console.log(p_num)
        if(br.Lslot_ready.length == p_num) return true;
        else return false;
      }

      br.monster_order = function(){
        for(var i=0;i<4;i++)
        {
          if(br.Rslot[i] == -1) break;

          var token = br.Rslot[i].split('#');
          if(token[3]=='dead') {  continue; }

          var attacker = 'R!'+i;
          var target = 'L!'+Math.floor(Math.random()*br.player_num);

          var order = monster_data[parseFloat(token[1])].speed+'#-1#'+attacker+'->'+target;
          br.order_list.push(order);
        }
      }
      br.monster_drop = function(monster){
        //드랍테이블 토큰 코드@확률@최소드랍수@최대드랍수
        console.log('--------------흭득리스트----------------')
        var exp = Random(monster.minExp,monster.maxExp);
        var gold = Random(monster.minGold,monster.maxGold);
        var item_list = [];
        console.log('흭득경험치 : '+exp); console.log('흭득골드 : '+gold);
        for(var i=0;i<br.player_num;i++){
          console.log('br.player_num : '+br.player_num);
          console.log('i = '+i);
          item_list = [];
          var drop_table = monster.drop_table;

          //아이템 건짐
          for(var j=0;j<drop_table.length;j++)
          {
            var token = drop_table[j].split('@');
            var prob = parseInt(token[1]);
            var rand = Math.floor(Math.random()*101); // 0~100
            if(prob > rand)
            {
              var code = parseInt(token[0]);
              var item = item_data[code];
              var count = Random(parseInt(token[2]),parseInt(token[3]));
              //console.log('prob = '+prob+' '+'rand : '+rand);
              console.log(item.name+' '+count+'개 드랍');

              if(item.role == 0)
                item_list.push(code+'');
              else if(item.role == 1)
                item_list.push(code+'#'+count);
            }
          }

          //드랍테이블에 저장
          //place = 유저 위치
          if(br.drop_table[i]== -1)
          {
            br.drop_table[i] = {};
            br.drop_table[i].exp = 0;
            br.drop_table[i].gold = 0;
            br.drop_table[i].item_list = [];
          }

          br.drop_table[i].exp += exp;
          br.drop_table[i].gold += gold;
          console.log('br.drop_table');
          console.log('i = '+i);
          console.log(br.drop_table);

          for(var j=0;j<item_list.length;j++)
          {
            br.drop_table[i].item_list.push(item_list[j]);
          }
          console.log('---------------------------------------')
        }
         console.log('총 흭득');
         console.log(br.drop_table);console.log('---------------------------------------')
      }

      br.set_order_turn = function(){
        //console.log(br.order_list);
        for(var i=0;i<br.order_list.length;i++)
        {
          for(var j=i+1;j<br.order_list.length;j++)
          {
            //if(i==j) continue;  //자기자신과 비교하지 않는다.
            // console.log('i = '+i+'j = '+j);
            // console.log('변경전');
            // console.log('br.order_list[i] + '+br.order_list[i]);
            // console.log('br.order_list[j] + '+br.order_list[j]);
            var a;
            var b;
            var token = br.order_list[i].split('#');
            a = parseFloat(token[0]);
            token = br.order_list[j].split('#');
            b = parseFloat(token[0]);
            // console.log('a = '+a+'b = '+b);
            if(a < b) //b가 더빠르면
            {
              var temp = br.order_list[i];
              br.order_list[i] = br.order_list[j];
              br.order_list[j] = temp;
            }

            // console.log('변경후');
            // console.log('br.order_list[i] + '+br.order_list[i]);
            // console.log('br.order_list[j] + '+br.order_list[j]);
          }
        }
      }
      br.battle = function(){
        console.log('br.battle();');
        for(var i=0;i<br.order_list.length;i++){
          var token = br.order_list[i].split('#');
          var token1 = token[2].split('->');
          var attack_data = token1[0].split('!');
          var target_data = token1[1].split('!');
          var skill_num = token[1];


          var attacker = {};
          var attacker_mp = 0;
          var target = {};
          var target_hp = 0;
          var token = [];

          //공격자 셋팅
          if(attack_data[0]=='L') token = br.Lslot[parseInt(attack_data[1])].split('#');
          else if(attack_data[0]=='R') token = br.Rslot[parseInt(attack_data[1])].split('#');

          if(token[0]=='player')
          {
            var idx = parseInt(token[1]);
            attacker = player_list[idx];
          }
          else if(token[0]=='monster')
          {
            var idx = parseInt(token[1]);
            attacker = monster_data[idx];
          }

          //타겟 셋팅
          if(target_data[0]=='L') token = br.Lslot[parseInt(target_data[1])].split('#');
          else if(target_data[0]=='R') token = br.Rslot[parseInt(target_data[1])].split('#');

          if(token[0]=='player')
          {
            var idx = parseInt(token[1]);
            target = player_list[idx];
            target_hp = parseInt(token[4]);
          }
          else if(token[0]=='monster')
          {
            var idx = parseInt(token[1]);
            target = monster_data[idx];
            target_hp = parseInt(token[2]);
          }

          //이제 전투를 시작해볼까? 으아...

          var ran_value = ((Math.floor(Math.random()*101))+50)/100;
          var skill = skill_data[attacker.skill_choice];
          var damage;


          if(skill !== undefined) //코드가 언디파인이면 안됨
          {
            if(skill.role == 0) {
              console.log('단일공격');
              var ad = skill.ad_factor.split('#');
              ad[0] = parseFloat(ad[0]);
              ad[1] = parseInt(ad[1]);
              var ad_dmg = Math.floor((attacker.ability.ad*ad[0]*ran_value))+ad[1] ;
              var ap = skill.ap_factor.split('#');
              ap[0] = parseFloat(ap[0]);
              ap[1] = parseInt(ap[1]);
              var ap_dmg = Math.floor((attacker.ability.ap*ap[0]*ran_value))+ap[1];
              var defend;
              if(skill.ad_or_ap == 0) defend = (target.ability.dad/3); //물뎀
              else defend = (target.ability.dap/3); //마뎀
              damage = Math.floor(ad_dmg+ap_dmg-defend);
            }

            if(skill.role == 1) {
              console.log('힐');
              var ad = skill.ad_factor.split('#');
              ad[0] = parseFloat(ad[0]);
              ad[1] = parseInt(ad[1]);
              var ad_dmg = Math.floor((attacker.ability.ad*ad[0]*ran_value))+ad[1] ;
              var ap = skill.ap_factor.split('#');
              ap[0] = parseFloat(ap[0]);
              ap[1] = parseInt(ap[1]);
              var ap_dmg = Math.floor((attacker.ability.ap*ap[0]*ran_value))+ap[1];
              damage = ad_dmg+ap_dmg;
            }
            //mp소모
            attacker_mp = attacker.mp-skill.need_mp;
            attacker.mp = attacker_mp;

            // console.log('ad뎀 : '+ad);
            // console.log('ap뎀 : '+ap);
            // console.log('적의 방어력 : '+defend);
            // console.log('데미지 : '+damage);
          }
          else damage = Math.floor((attacker.ability.ad*ran_value)-(target.ability.dad/3));

          var damage = damage > 0 ? damage : 0;
          // console.log('진짜 데미지 : ' +damage);
          var left_hp;

          if(skill !== undefined) //코드가 언디파인이면 안됨
          {
            if(skill.role == 0) {
              left_hp = target_hp-damage;
              left_hp = (left_hp>0) ? left_hp : 0;
            }
            if(skill.role == 1) {
              left_hp = target_hp+damage;
              left_hp = (left_hp>attacker.ability.hp) ? attacker.ability.hp : left_hp;
            }
          }else{
            left_hp = target_hp-damage;
            left_hp = (left_hp > 0) ? left_hp : 0;
          }

          // console.log('남은 hp : '+left_hp);

          // console.log('남은 hp : '+left_hp);
          var target_dead = false;
          target_dead = (left_hp > 0) ? false : true;

          // if(target_dead) console.log('적은 쥬금');
          // else console.log('안쥬금');

          ///////////////////////////////////////////////////////////////hphphphphpphphphphphphp
          var slot_data = [];
          if(attack_data[0]=='L')
          {
            slot_data = br.Lslot[parseInt(attack_data[1])].split('#');
            var new_slot_data = '';

            new_slot_data = slot_data[0]+'#'+slot_data[1]+'#'+slot_data[2]+'#';
            new_slot_data += slot_data[3]+'#'+slot_data[4]+'#'+slot_data[5]+'#';
            new_slot_data += attacker_mp+'#'+slot_data[7]+'#alive';

            br.Lslot[parseInt(attack_data[1])] = new_slot_data;
            // console.log('attack_data');
            // console.log(attack_data);
            //
            // console.log('slot_data');
            // console.log(slot_data);
          }



          ///////////////////////////////////////////////////////////////hphphphphpphphphphphphp
          var slot_data = [];
          if(target_data[0]=='L') slot_data = br.Lslot[parseInt(target_data[1])].split('#');
          else if(target_data[0]=='R') slot_data = br.Rslot[parseInt(target_data[1])].split('#');
          //hp갱신
          var new_slot_data = '';

          if(slot_data[0] == 'player')
          {
            new_slot_data = slot_data[0]+'#'+slot_data[1]+'#'+slot_data[2]+'#';
            new_slot_data += slot_data[3]+'#'+left_hp+'#'+slot_data[5]+'#';
            new_slot_data += slot_data[6]+'#'+slot_data[7]+'#';
            if(target_dead) new_slot_data += 'dead';
            else new_slot_data += slot_data[8];
            // console.log(new_slot_data);
            // console.log(slot_data[8]);
            // console.log(target_dead);
          }
          else if(slot_data[0] == 'monster')
          {
            new_slot_data = slot_data[0]+'#'+slot_data[1]+'#'+left_hp+'#';
            if(target_dead) new_slot_data += 'dead';
            else new_slot_data += slot_data[3];
          }

          if(target_data[0]=='L') br.Lslot[parseInt(target_data[1])] = new_slot_data;
          else if(target_data[0]=='R') br.Rslot[parseInt(target_data[1])] = new_slot_data;

          token = br.order_list[i].split('#');

          //쥬금?
          if(target_dead)
          {
            br.order_cancel(target_data,i+1); //명령취소
            if(slot_data[0] == 'monster')
            {
                // br.monster_drop(parseInt(attack_data[1]),monster_data[parseInt(slot_data[1])]);
                br.monster_drop(monster_data[parseInt(slot_data[1])]);
            }
          }

          var battle_log = token[2]+'#'+token[1]+'#'+damage;
          br.battle_log.push(battle_log);

          //공격정보#스킬#데미지
        }
        // console.log(br.battle_log);
        console.log(br.Lslot);
        // console.log(br.Rslot);
      }
      br.order_cancel = function(target_data,num){
        var target = target_data[0]+'!'+target_data[1];



        for(var i = num;i<br.order_list.length;i++)
        {
          var token = br.order_list[i].split('#');
          var token1 = token[2].split('->');
          // console.log(token1);
          if(token1[0] == target)
          {
            br.order_list[i] = -1;
            // console.log('공격 삭제완료');
          }
          else if(token1[1] == target)
          {
            br.order_list[i] = -1;
            // console.log('피격 삭제완료');
          }
        }
        for(var i=num;i<br.order_list.length;i++)
        {
          if(br.order_list[i] == -1)
          {
            br.order_list.splice(i,1);
            i--;
            // console.log('명령삭제');
            continue;
          }
        }
      }
      br.battle_turn_end = function(){
        //배틀종료
        br.order_list = [];
        br.Lslot_ready = [];
        br.battle_log = [];

        if(br.battle_end)
        {
          console.log('게임끝났네');
          if(br.battle_end == 'L_WIN'){
            console.log('니가이김');
            //console.log('드랍');
            //console.log(br.drop_table[0]);
            return 'L_WIN';
          }
          else {
            console.log('몬스터가이김');
            return 'R_WIN';
          }
        }
        return false;
      }
      br.isEnd = function(){
        var l_num = 0;
        var r_num = 0;
        var l_dead_num = 0;
        var r_dead_num = 0;
        //Lslot 카운트
        for(var i=0;i<4;i++)
        {
          if(br.Lslot[i] == -1) break;
          l_num++;
        }
        //Rslot 카운트
        for(var i=0;i<4;i++)
        {
          if(br.Rslot[i] == -1) break;
          r_num++;
        }

        //Lslot 죽음체크
        for(var i=0;i<4;i++)
        {
          if(br.Lslot[i] == -1) break;
          var token = br.Lslot[i].split('#');
          if(token[8] == 'dead') l_dead_num++;
        }

        //Rslot 죽음체크
        for(var i=0;i<4;i++)
        {
          if(br.Rslot[i] == -1) break;
          var token = br.Rslot[i].split('#');
          if(token[3] == 'dead') r_dead_num++;
        }

        // console.log('l_num : '+l_num);
        // console.log('r_num : '+r_num);
        // console.log('l_dead_num : '+l_dead_num);
        // console.log('r_dead_num : '+r_dead_num);

        if(l_num == l_dead_num)
        {
          br.battle_end = 'R_WIN';
        }
        else if(r_num == r_dead_num)
        {
          br.battle_end = 'L_WIN';
        }

        return false;
      }

      battleRoom[room_num] = br;
      return battleRoom[room_num];
    }
  }
}
