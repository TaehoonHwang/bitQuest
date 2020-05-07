
global.npc_list = [];

global.Npc = function() {
  this.name = 'unnamed';
  this.x = 0;
  this.y = 0;
  this.jumpCheckDir = -1;
  this.map_name = '';
  this.frame = 0;
  this.role = -1;
  this.event = -1;
  this.data = {};
  this.SetX = function(dx){
    this.x = dx;
    //console.log('this.x = '+this.x);
  };
  this.SetY = function(dy){
    this.y = dy;
    //console.log('this.y = '+this.y);
  };
  this.event = function(player){
    switch(this.role){
        case 0:
          player.isTalk = true;
          var size = this.data.split('@').length;
          player.leftTalk = size;
        return '0#'+this.data;  //그냥 대화
        case 1:         //상점
          var token = this.data.split('!');
          player.shop_data = token;
          player.shop_choice = 0;
          player.shop_max_choice = token.length-1;
          player.isShop = true;
        return '1#'+this.data;
        break;
        case 2:     //간호사
          player.SetHp(player.ability.hp);
          player.SetMp(player.ability.mp);
          player.isTalk = true;
          var size = this.data.split('@').length;
          player.leftTalk = size;
        return '2#'+this.data;
        case 3:     //전직교관
          //player.leftTalk = size;
        return '3#'+this.data;
    }
  }
  this.initialize = function(name,x,y,dir,map,role,frame){
    this.name = name;
    this.x = x;
    this.y = y;
    this.jumpCheckDir = dir;
    this.map_name = map;
    this.role = role;
    this.frame = frame;


    var map = eval(this.map_name);
    map.objects.push(this);
    npc_list.push(this);
  };

}


var npc = new Npc(); npc.initialize('꽃',9*32,10*32,-1,'map1',0,4); npc.data = '파란색 풀이군..@아니 그건그렇고 요긴어디지..@으..머리야';
var npc = new Npc(); npc.initialize('꽃',10*32,12*32,-1,'map1',0,4); npc.data = '빨간색 풀때기군..@아니 그건그렇고 요긴어디지..@으..머리야';
var npc = new Npc(); npc.initialize('꽃',6*32,8*32,-1,'map1',0,4); npc.data = '빨간색 풀때기군..@ 요긴어디지..@으..머리야';
var npc = new Npc(); npc.initialize('기둥',7*32,15*32,-1,'map1',0,4); npc.data = '우람한 기둥이군..@아니 그건그렇고 요긴어디지..@오래된곳인거같아..';
var npc = new Npc(); npc.initialize('기둥',13*32,16*32,-1,'map1',0,4); npc.data = '우람한 기둥이군..@요긴 오래된신전같아..';
var npc = new Npc(); npc.initialize('조각상',5*32,20*32,-1,'map1',0,4); npc.data = '신전에쓰이는..조각상@꽤나 아름다워..@빨리 이곳을 벗어나야겠어';
var npc = new Npc(); npc.initialize('조각상',16*32,17*32,-1,'map1',0,4); npc.data = '신전에쓰이는..조각상@그만보고..빨리 이곳을 벗어나야겠어';
var npc = new Npc(); npc.initialize('드래곤',15*32,20*32,-1,'map1',0,4); npc.data = '금방이라도 움직일꺼같은 용이군@아무튼 이곳을 벗어나야겠어';
var npc = new Npc(); npc.initialize('드래곤',16*32,20*32,-1,'map1',0,4); npc.data = '금방이라도 움직일꺼같은 용이군@아무튼 이곳을 벗어나야겠어';
var npc = new Npc(); npc.initialize('조각상',3*32,31*32,-1,'map1',0,4); npc.data = '이제 그만좀보고 밖으로 나가자..';
var npc = new Npc(); npc.initialize('조각상',8*32,36*32,-1,'map1',0,4); npc.data = '이제 그만좀보고 밖으로 나가자..';
var npc = new Npc(); npc.initialize('조각상',22*32,36*32,-1,'map1',0,4); npc.data = '한번만 더 물어보면 죽인다 씨발새끼야';
var npc = new Npc(); npc.initialize('돌무더기',17*32,35*32,-1,'map1',0,4); npc.data = '돌 파편들이다.. 예전에는 광산이였나보군';
var npc = new Npc(); npc.initialize('돌무더기',18*32,38*32,-1,'map1',0,4); npc.data = '돌 파편들이다.. 예전에는 광산이였나보군';
var npc = new Npc(); npc.initialize('돌무더기',19*32,38*32,-1,'map1',0,4); npc.data = '돌 파편들이다.. 예전에는 광산이였나보군';
var npc = new Npc(); npc.initialize('돌무더기',19*32,40*32,-1,'map1',0,4); npc.data = '돌 파편임';
var npc = new Npc(); npc.initialize('돌무더기',18*32,42*32,-1,'map1',0,4); npc.data = '돌파편이라고..;;';

var npc = new Npc(); npc.initialize('조각상',2*32,17*32,-1,'map2',0,4); npc.data = '밖에도 조각상이있군..@이곳은..책에서본 천공의섬@엘리시움?..';
var npc = new Npc(); npc.initialize('조각상',22*32,17*32,-1,'map2',0,4); npc.data = '조각상이다..@그보다도..나는 누구..이곳은 어디지..';
var npc = new Npc(); npc.initialize('부셔진기둥',4*32,18*32,-1,'map2',0,4); npc.data = '오래되어 부셔졌군..@이곳은..책에서본 천공의섬@엘리시움?..';
var npc = new Npc(); npc.initialize('부셔진기둥',1*32,21*32,-1,'map2',0,4); npc.data = '오래되어 부셔졌군..@이곳은..책에서본 천공의섬@엘리시움?..';
var npc = new Npc(); npc.initialize('나무',2*32,23*32,-1,'map2',0,4); npc.data = '이곳은 사람이 오랫동안 살지않은 곳 같군@왜 폐허가 된것이지..';
var npc = new Npc(); npc.initialize('나무',6*32,25*32,-1,'map2',0,4); npc.data = '죽은나무군..@왜 폐허가 된것이지..';
var npc = new Npc(); npc.initialize('나무',20*32,23*32,-1,'map2',0,4); npc.data = '죽은나무군..@왜 폐허가 된것이지..';
var npc = new Npc(); npc.initialize('나무',23*32,21*32,-1,'map2',0,4); npc.data = '이땅엔 생기가 없어..@왜 폐허가 된것이지..';

var npc = new Npc(); npc.initialize('돌맹이',2*32,13*32,-1,'map3',0,4); npc.data = '흔한 돌맹이군..@그나저나 벌서 아침이라니..';
var npc = new Npc(); npc.initialize('돌맹이',22*32,15*32,-1,'map3',0,4); npc.data = '흔한 돌맹이군..@요긴 너무 삭막해..';
var npc = new Npc(); npc.initialize('독버섯',36*32,17*32,-1,'map3',0,4); npc.data = '사람이 먹을 수 없는 독버섯같군..@배고프군....';
var npc = new Npc(); npc.initialize('독버섯',37*32,18*32,-1,'map3',0,4); npc.data = '사람이 먹을 수 없는 독버섯같군..@배고프군....';
var npc = new Npc(); npc.initialize('독버섯',40*32,17*32,-1,'map3',0,4); npc.data = '아름다운 동상이군..@밑에는 왠마법진이?..@들어가보자';
var npc = new Npc(); npc.initialize('존나큰나무',40*32,17*32,-1,'map3',0,4); npc.data = '아름다운 동상이군..@밑에는 왠마법진이?..@들어가보자';

var npc = new Npc(); npc.initialize('필립',50*32,4*32,-1,'map4',0,4); npc.data = '독버섯은 아닌거같은데..이곳은 생기가 돋아..';
var npc = new Npc(); npc.initialize('풀때기',56*32,4*32,-1,'map4',0,4); npc.data = '신기하게 생긴 돌이군..바람이 불어와..@ 이곳은 책에서본 아이테르너스의 언덕..';
var npc = new Npc(); npc.initialize('풀때기',8*32,17*32,-1,'map4',0,4); npc.data = '독초는 아닌거같은데..먹을수는 없는거 같다...';
var npc = new Npc(); npc.initialize('풀때기',3*32,16*32,-1,'map4',0,4); npc.data = '독초는 아닌거같은데..먹을수는 없는거 같다...';
var npc = new Npc(); npc.initialize('풀때기',1*32,19*32,-1,'map4',0,4); npc.data = '독초는 아닌거같은데..먹을수는 없는거 같다...';
var npc = new Npc(); npc.initialize('자몽',25*32,11*32,-1,'map4',0,4); npc.data = 'ㅈ..자몽인가?..왠지모르게 ㅅ..순할꺼같군';
var npc = new Npc(); npc.initialize('버섯',42*32,12*32,-1,'map4',0,4); npc.data = '독버섯은 아닌거같은데..';
var npc = new Npc(); npc.initialize('버섯',34*32,12*32,-1,'map4',0,4); npc.data = '독버섯은 아닌거같은데..송이버섯인가?..';
var npc = new Npc(); npc.initialize('버섯',34*32,17*32,-1,'map4',0,4); npc.data = '독버섯은 아닌거같은데..송이버섯인가?..';
var npc = new Npc(); npc.initialize('버섯',25*32,15*32,-1,'map4',0,4); npc.data = '독버섯은 아닌거같은데..송이버섯인가?..';
var npc = new Npc(); npc.initialize('복분자',40*32,13*32,-1,'map4',0,4); npc.data = 'ㅂ..복분자인가?..왠지모르게 오래갈수 있을꺼같군';
var npc = new Npc(); npc.initialize('복분자',20*32,12*32,-1,'map4',0,4); npc.data = '복분자';
var npc = new Npc(); npc.initialize('자몽',32*32,16*32,-1,'map4',0,4); npc.data = 'ㅈ..자몽인가?..왠지모르게 ㅅ..순할꺼같군';
var npc = new Npc(); npc.initialize('자몽',22*32,16*32,-1,'map4',0,4); npc.data = 'ㅈ..자몽인가?..왠지모르게 ㅅ..순할꺼같군';
var npc = new Npc(); npc.initialize('자몽',25*32,11*32,-1,'map4',0,4); npc.data = 'ㅈ..자몽인가?..왠지모르게 ㅅ..순할꺼같군';

var npc = new Npc(); npc.initialize('필립',6*32,16*32,-1,'map4',0,0); npc.data = '당신이 오길 기다렸다네 @아참! 인사가 늦었군 난 엘리시움왕국기사단에서 @기사단장을 하고있는 필립이라고 하네@얼른 이곳을 나가시게나';

var npc = new Npc(); npc.initialize('알란',12*32,20*32,-1,'map5',0,1); npc.data = '나는 엘리시움기사 알란이다.@포탈을 오랫동안 열어놔서 30초안에 닫힌다@당장 포탈을 타고 나가야한다.@이야기는 나중에 하지';
var npc = new Npc(); npc.initialize('ㅋ',10*32,19*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',6*32,20*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',4*32,19*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',10*32,17*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',10*32,15*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',12*32,15*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',12*32,17*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',12*32,19*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('ㅋ',8*32,13*32,-1,'map5',0,4); npc.data = '포탈이 곧 닫힌다는데;; @ 이런걸 볼 시간이 없어';
var npc = new Npc(); npc.initialize('간호사',4*32,2*32,0,'map4',2,1); npc.data = '회복되었습니다!';
var npc = new Npc(); npc.initialize('물약상점',5*32,2*32,0,'map5',1,1);
npc.data = '0@30!'
npc.data += '1@40!';
npc.data += '2@70!';
npc.data += '4@1!';
npc.data += '13@30';
var npc = new Npc(); npc.initialize('간호사',23*32,6*32,-1,'map6',2,1);npc.data = '회복되었습니다!';
/*
npc.data = '6@30!'
npc.data += '8@40!';
npc.data += '10@70!';
npc.data += '15@1!';
npc.data += '16@1!';
npc.data += '17@5!';
npc.data += '13@0';
*/
var npc = new Npc(); npc.initialize('떠돌이상인',23*32,6*32,-1,'map7',1,1);
npc.data = '0@30!'
npc.data += '1@40!';
npc.data += '2@70!';
npc.data += '4@1!';
npc.data += '13@30';
var npc = new Npc(); npc.initialize('떠돌이상인',24*32,6*32,0,'map8',1,1);
npc.data = '6@30!'
npc.data += '8@40!';
npc.data += '10@70!';
npc.data += '15@1!';
npc.data += '16@1!';
npc.data += '17@5!';
npc.data += '13@0';
var npc = new Npc(); npc.initialize('간호사',4*32,2*32,0,'map11',2,1); npc.data = '회복되었습니다!';
var npc = new Npc(); npc.initialize('변경환',5*32,2*32,-1,'map10',0,1); npc.data = '비트프로젝트가 얼마 안남아서@바캉스를 왔어!@경치가 좋네 !!@ Master.Byun                           SubMaster.The others';
var npc = new Npc(); npc.initialize('사신',4*32,2*32,-1,'map12',0,0); npc.data = '여긴 위험한 곳일세@빨리 나가시게';
var npc = new Npc(); npc.initialize('무녀전직교관',9*32,9*32,-1,'map8',3,2); npc.data = 1;
var npc = new Npc(); npc.initialize('법사전직교관',10*32,9*32,-1,'map8',3,2); npc.data = 2;
var npc = new Npc(); npc.initialize('탱전사전직교관',11*32,9*32,-1,'map8',3,2); npc.data = 3;
var npc = new Npc(); npc.initialize('딜전사전직교관',12*32,9*32,-1,'map8',3,2); npc.data = 4;
var npc = new Npc(); npc.initialize('도적전직교관',13*32,9*32,-1,'map8',3,2); npc.data = 5;
