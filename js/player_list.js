
global.player_list = [];


global.player_list_insert = function(player){
  for(var i=0;i<player_list.length;i++)
  {
    if(player_list[i] == -1)
    {
      player_list[i] = player;
      return i;
    }
  }
  player_list.push(player);
  return player_list.length-1;
}



global.Player = function() {
  this.class = 'player';
  this.index = -1;
  
  this.cid = 0;
  this.name = 'unnamed';
  this.x = 0;
  this.y = 0;
  this.direction = 0;  //0부터 DLRU
  this.walk = 1;
  this.role = 0;
  this.role_name = '직업';

  this.frameOffset = 0;
  //console.log('this.frameOffset : '+this.frameOffset);
  this.frame = 1+this.frameOffset;

  //이미지관련
  this.img_src ='';
  this.img_psa ='';

  this.isMoving = false;
   this.isTalk = false;
  this.isShop = false;
  this.isParty = false;
 this.isBattle = false;
 this.isLeader = false;
  //능력치관련
  this.level = 1;

  this.ability = {};
  this.ability.str = 0;
  this.ability.dex = 0;
  this.ability.int = 0;
  this.ability.vtl = 0;
  this.ability.agi = 0;
  this.ability.ad = 0;
  this.ability.dad = 0;
  this.ability.ap = 0;
  this.ability.dap = 0;
  this.ability.avoid = 0;
  this.ability.hp = 0;
  this.ability.mp = 0;

  this.ability.extra = {};
  this.ability.extra.str = 0;
  this.ability.extra.str = 0;
  this.ability.extra.dex = 0;
  this.ability.extra.int = 0;
  this.ability.extra.vtl = 0;
  this.ability.extra.agi = 0;
  this.ability.extra.ad = 0;
  this.ability.extra.dad = 0;
  this.ability.extra.ap = 0;
  this.ability.extra.dap = 0;
  this.ability.extra.avoid = 0;
  this.ability.extra.hp = 0;
  this.ability.extra.mp = 0;

  this.hp = 0;
  this.mp = 0;
  this.exp = 0;
  this.speed = 0;

    //인벤토리
  this.inventory = {};
  this.inventory.storage = [];
  this.inventory.gold = 0;
  //this.inventory.gold = Math.floor(Math.random()*1000);
  this.start_SetGold = function(gold){
    this.inventory.gold = gold;

  }
  this.SetInventory =function(inven){
    this.inventory.storage = inven;
  }

  //장비창
   this.equipment = {};

   this.skill_list = [];
  this.max_skill_select = 0;
  this.skill_tree = [];
  this.skill_test = [];
  this.skill_choice = -1;
   this.skill_point = 0;

  for(var i=0;i<50;i++)
  {
    this.skill_tree.push(-1);
  }


for(var i=0;i<30;i++)
  {
      this.inventory.storage.push(-1); //-1~4  //Math.floor(Math.random()*6)-1
  }

  //상점
  this.shop_data = [];
  this.shop_choice = 0;
  this.shop_max_choice = 0;



  //배틀룸
  this.br = -1;
  this.br_pointer = '';
  //파티
  this.select_player = {};
  this.party = -1;


 //console.log(this);
  //맵관련
  this.map = {};
  this.map_name = '';
  this.SetX = function(dx){
    this.x = dx;
    //console.log('this.x = '+this.x);
  };
  this.SetY = function(dy){
    this.y = dy;
    //console.log('this.y = '+this.y);
  };
  this.SetMap = function(map_name){
    this.map = eval(map_name);
    this.map_name = map_name;
    //console.log('dFrame : '+dFrame);
  };
  this.SetFrame = function(dFrame){
    this.frame = dFrame + this.frameOffset;
    //console.log('dFrame : '+dFrame);
  };
  this.SetNum = function(cid){
    this.cid = cid;
  }
  this.SetRole = function(role,skill_test){
    this.role = role;
    var token = skill_test.split('/');
    switch(role){
      case 1://노비스
          this.skill_tree[11] = parseInt(token[11]);
          this.skill_tree[12] = parseInt(token[12]);
          this.skill_tree[13] = token[13];
          this.skill_tree[14] = parseInt(token[14]);
          this.skill_tree[15] = token[15];

          this.skill_tree[21] = token[21];
          this.skill_tree[22] = parseInt(token[22]);
          this.skill_tree[23] = parseInt(token[23]);
          this.skill_tree[33] = token[33];
      break;
      case 2://ㅁ무녀 
          this.skill_tree[11] = parseInt(token[11]);
          this.skill_tree[12] = token[12];
          this.skill_tree[13] = parseInt(token[13]);
          this.skill_tree[14] = parseInt(token[14]);
          this.skill_tree[15] = token[15];
          this.skill_tree[21] = parseInt(token[21]);
          this.skill_tree[31] = token[31];
          this.skill_tree[32] = parseInt(token[32]);
          this.skill_tree[33] = parseInt(token[33]);
          this.skill_tree[34] = token[34];
      break;
      case 3://법사
      
          this.skill_tree[3] = parseInt(token[3]);
          this.skill_tree[4] = token[4];
          this.skill_tree[13] = parseInt(token[13]);
          this.skill_tree[21] = token[21];
          this.skill_tree[22] = parseInt(token[22]);
          this.skill_tree[23] = parseInt(token[23]);
          this.skill_tree[24] = token[24];
          this.skill_tree[25] = parseInt(token[25]);
          this.skill_tree[26] = parseInt(token[26]);
          this.skill_tree[27] = token[27];
          this.skill_tree[33] = parseInt(token[33]);
          this.skill_tree[43] = parseInt(token[43]);
          this.skill_tree[44] = parseInt(token[44]);
          this.skill_tree[45] = parseInt(token[45]);
          this.skill_tree[46] = token[46];
      break;
      case 4://탱전사
          this.skill_tree[11] = token[11];
          this.skill_tree[12] = parseInt(token[12]);
          this.skill_tree[13] = parseInt(token[13]);
          this.skill_tree[14] = token[14];
          this.skill_tree[15] = parseInt(token[15]);
          this.skill_tree[16] = parseInt(token[16]);
          this.skill_tree[17] = parseInt(token[17]);
          this.skill_tree[18] = parseInt(token[18]);
          this.skill_tree[19] = token[19];
          this.skill_tree[22] = parseInt(token[22]);
          this.skill_tree[32] = parseInt(token[32]);
          this.skill_tree[33] = token[33];
          this.skill_tree[34] = parseInt(token[34]);
          this.skill_tree[35] = parseInt(token[35]);
          this.skill_tree[36] = token[36];
          this.skill_tree[37] = parseInt(token[37]);
          this.skill_tree[27] = parseInt(token[27]);
      break;
      case 5://딜전사
      console.log("ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ");
      console.log(this.skill_tree);
          this.skill_tree[11] = parseInt(token[11]);
          this.skill_tree[12] = token[12];
          this.skill_tree[13] = parseInt(token[13]);
          this.skill_tree[14] = parseInt(token[14]);
          this.skill_tree[15] = token[15];
          this.skill_tree[20] = token[20];
          this.skill_tree[21] = parseInt(token[21]);
          this.skill_tree[31] = parseInt(token[31]);
          this.skill_tree[32] = parseInt(token[32]);
          this.skill_tree[33] = token[33];
          this.skill_tree[34] = parseInt(token[34]);
          this.skill_tree[35] = parseInt(token[35]);
          this.skill_tree[36] = parseInt(token[36]);
          this.skill_tree[37] = token[37];
      break;
      case 6://도적
          this.skill_tree[11] = token[11];
          this.skill_tree[12] = parseInt(token[12]);
          this.skill_tree[13] = token[13];
          this.skill_tree[14] = parseInt(token[14]);
          this.skill_tree[15] = parseInt(token[15]);
          this.skill_tree[25] = parseInt(token[25]);
          this.skill_tree[35] = token[35];
          this.skill_tree[36] = parseInt(token[36]);
          this.skill_tree[37] = parseInt(token[37]);
          this.skill_tree[38] = token[38];
      break;
    }
    console.log("asdasdasdasdasdasdasd");
        console.log(this.skill_tree);
    this.UpdateSkill();
    //this.UpdateAbility();
    

    //this.img_psa = 'img/job'+this.role+'.png';
    this.frameOffset = 3*(this.role-1);
    this.SetFrame((18*this.direction)+this.walk);

  }
  this.UpGrade = function(role){
    this.role = role;
    this.skill_point = 1;

    for(var i=0;i<50;i++)
    {
      this.skill_tree[i] = -1;
    }
    switch(role){
      case 1:
      console.log("노비승");
        this.job = '노비스';
        this.skill_tree[11] = 0;
        this.skill_tree[12] = 0;
        this.skill_tree[13] = '3#2';
        this.skill_tree[14] = 0;
        this.skill_tree[15] = '4#2';
        this.skill_tree[21] = '2#2';
        this.skill_tree[22] = 0;
        this.skill_tree[23] = 0;
        this.skill_tree[33] = '5#2';
      break;
      case 2:
      console.log("무녀");
      this.job = '무녀';
        this.skill_tree[11] = 0;
        this.skill_tree[12] = '6#2';
        this.skill_tree[13] = 0;
        this.skill_tree[14] = 0;
        this.skill_tree[15] = '9#2';
        this.skill_tree[21] = 0;
        this.skill_tree[31] = '7#2';
        this.skill_tree[32] = 0;
        this.skill_tree[33] = 0;
        this.skill_tree[34] = '8#2';
      break;
      case 3:
      console.log("법삿ㅅㅅ");
      this.job = '법사';
        this.skill_tree[3] = 0;
        this.skill_tree[4] = '11#2';
        this.skill_tree[13] = 0;
        this.skill_tree[21] = '10#2';
        this.skill_tree[22] = 0;
        this.skill_tree[23] = 0;
        this.skill_tree[24] = '12#2';
        this.skill_tree[25] = 0;
        this.skill_tree[26] = 0;
        this.skill_tree[27] = '14#2';
        this.skill_tree[33] = 0;
        this.skill_tree[43] = 0;
        this.skill_tree[44] = 0;
        this.skill_tree[45] = 0;
        this.skill_tree[46] = '13#2';
      break;
      case 4:
      console.log("탱전사  ");
      this.job = '탱전사';
        this.skill_tree[11] = '15#2';
        this.skill_tree[12] = 0;
        this.skill_tree[13] = 0;
        this.skill_tree[14] = '16#2';
        this.skill_tree[15] = 0;
        this.skill_tree[16] = 0;
        this.skill_tree[17] = 0;
        this.skill_tree[18] = 0;
        this.skill_tree[19] = '19#2';
        this.skill_tree[22] = 0;
        this.skill_tree[32] = 0;
        this.skill_tree[33] = '17#2';
        this.skill_tree[34] = 0;
        this.skill_tree[35] = 0;
        this.skill_tree[36] = '18#2';
        this.skill_tree[37] = 0;
        this.skill_tree[27] = 0;

      break;
      case 5:
      console.log("딜전상ㅇ");
      this.job='딜전사';
        this.skill_tree[11] = 0;
        this.skill_tree[12] = '22#2';
        this.skill_tree[13] = 0;
        this.skill_tree[14] = 0;
        this.skill_tree[15] = '23#2';
        this.skill_tree[20] = '20#2';
        this.skill_tree[21] = 0;
        this.skill_tree[31] = 0;
        this.skill_tree[32] = 0;
        this.skill_tree[33] = '21#2';
        this.skill_tree[34] = 0;
        this.skill_tree[35] = 0;
        this.skill_tree[36] = 0;
        this.skill_tree[37] = '24#2';

      break;
      case 6:
      console.log("도적 ㅁㄴㅇㅁㄴㅇ");
      this.job ='도적';
        this.skill_tree[11] = '25#2';
        this.skill_tree[12] = 0;
        this.skill_tree[13] = '26#2';
        this.skill_tree[14] = 0;
        this.skill_tree[15] = 0;
        this.skill_tree[25] = 0;
        this.skill_tree[35] = '27#2';
        this.skill_tree[36] = 0;
        this.skill_tree[37] = 0;
        this.skill_tree[38] = '28#2';

      break;
    }
    console.log(this.skill_tree);

    this.UpdateAbility();
    this.UpdateSkill();

    //this.img_psa = 'img/job'+this.role+'.png';
    this.frameOffset = 3*(this.role-1);
    this.SetFrame((18*this.direction)+this.walk);
  }
  this.SetJob = function(job){
    this.job = job;
  }
  this.SetLevel = function(lv){
    this.level = lv;
  }
 
  this.start_SetExp = function(exp){
     this.exp = exp;
  }
  this.SetExp = function(exp){
    //최대경험치를 넘었다면
    var max = max_exp[this.level-1];
    if(exp >= max)
    {
      exp = exp-max;
      this.level++;
      this.skill_point++;
      this.UpdateAbility();
      this.UpdateSkill();
      this.SetHp(this.ability.hp);
      this.SetMp(this.ability.mp);
      this.SetExp(exp);
    }
    this.exp = exp;
  }
  this.SetGold = function(gold){
    console.log('gold : '+this.inventory.gold+'->'+gold);
    this.inventory.gold = gold;
  }
  this.SetStr = function(str){
    this.ability.str = str;
  }
  this.SetDex = function(dex){
    this.ability.dex = dex;
  }
  this.SetInt = function(int){
    this.ability.int = int;
  }
  this.SetVtl = function(vlt){
    this.ability.vtl = vlt;
  }
  this.SetAgi = function(agi){
    this.ability.agi = agi;
  }
  this.Start_SetSpoint = function(spoint){
    this.skill_point = spoint;
  }
  this.SetHp = function(hp){
     this.hp = hp;
  }
  this.SetMp = function(mp){
     this.mp = mp;
  }

  this.ExtraSetStr = function(e_str){
    this.ability.extra.str = e_str;
  }
  this.ExtraSetDex = function(e_dex){
    this.ability.extra.dex = e_dex;
  }
  this.ExtraSetInt = function(e_int){
    this.ability.extra.int = e_int;
  }
  this.ExtraSetVtl = function(e_vtl){
    this.ability.extra.vtl = e_vtl;
  }
  this.ExtraSetAgi = function(e_agi){
    this.ability.extra.agi = e_agi;
  }
  this.ExtraSetAd = function(e_ad){
    this.ability.extra.ad = e_ad;
  }
  this.ExtraSetDad = function(e_dad){
    this.ability.extra.dad = e_dad;
  }
  this.ExtraSetAp = function(e_ap){
    this.ability.extra.ap = e_ap;
  }
  this.ExtraSetDap = function(e_dap){
    this.ability.extra.dap = e_dap;
  }
  this.ExtraSetAvoid = function(e_avoid){
    this.ability.extra.avoid = e_avoid;
  }
  this.ExtraSetHp = function(e_hp){
     this.ability.extra.hp = e_hp;
  }
  this.ExtraSetMp = function(e_mp){
     this.ability.extra.mp = e_mp;
  }

  this.SetEquip = function(equip){
   // this.SetEquip = function(w,h,t,b,g,s,r){
    this.equipment = {};
    
    this.equipment.weapon = equip.weapon;
    this.equipment.head = equip.head;
    this.equipment.top = equip.armor;
    this.equipment.bottom = equip.bottom;
    this.equipment.glove = equip.glove;
    this.equipment.shoes = equip.shose;
    this.equipment.ring = equip.ring;
     /*
    this.equipment.weapon = w;
    this.equipment.head = h;
    this.equipment.top = t;
    this.equipment.bottom = b;
    this.equipment.glove = g;
    this.equipment.shoes = s;
    this.equipment.ring = r;
    */
   }
  
  //this.SetEquip(-1,-1,-1,-1,-1,-1,-1);

  this.status =function(gstr,gdex,gint,gvtl,gagi){

    var abil = this.ability;

     abil.str = this.level*gstr;
        abil.dex = this.level*gdex;
        abil.int = this.level*gint;
        abil.vtl = this.level*gvtl;
        abil.agi = this.level*gagi;

        abil.ad = 5+(abil.str*0.4)+(abil.vtl*0.2);
        abil.dad = abil.vtl+(this.level/2);
        abil.ap = 1+(abil.int+abil.dex)/6;
        abil.dap = (abil.int*0.7)+(abil.vtl*0.2) + 5;
        abil.avoid = (abil.dex+abil.agi)/40+10;
        abil.hp = this.level+(abil.vtl*2)+abil.str+96;
        abil.mp = this.level+(abil.int*2)+47;
        this.speed = abil.dex*0.8 + abil.agi*0.6;

        abil.extra.str = 0;
        abil.extra.dex = 0;
        abil.extra.int = 0;
        abil.extra.vtl = 0;
        abil.extra.agi = 0;

        abil.extra.ad = 0;
        abil.extra.dad = 0;
        abil.extra.ap = 0;
        abil.extra.dap = 0;
        abil.extra.avoid = 0;
        abil.extra.hp = 0;
        abil.extra.mp = 0;

        if(this.equipment.weapon != -1){
          var item = item_data[this.equipment.weapon];
          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.head != -1){
          var item = item_data[this.equipment.head];
          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.top != -1){
          var item = item_data[this.equipment.top];
          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.bottom != -1){
          var item = item_data[this.equipment.bottom];

          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.glove != -1){
          var item = item_data[this.equipment.glove];

          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.shoes != -1){
          var item = item_data[this.equipment.shoes];

          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }
        if(this.equipment.ring != -1){
          var item = item_data[this.equipment.ring];

          abil.extra.str += item.ability.str;
          abil.extra.dex += item.ability.dex;
          abil.extra.int += item.ability.int;
          abil.extra.vtl += item.ability.vtl;
          abil.extra.agi += item.ability.agi;

          abil.extra.ad += item.ability.ad;
          abil.extra.dad += item.ability.dad;
          abil.extra.ap += item.ability.ap;
          abil.extra.dap += item.ability.dap;
          abil.extra.avoid += item.ability.avoid;
          abil.extra.hp  += item.ability.hp;
          abil.extra.mp  += item.ability.mp;
        }

        abil.extra.ad += (abil.extra.str*0.4)+(abil.extra.vtl*0.2);
        abil.extra.dad += abil.extra.vtl
        abil.extra.ap += (abil.extra.int+abil.extra.dex)/6;
        abil.extra.dap += (abil.extra.int*0.7)+(abil.extra.vtl*0.2);
        abil.extra.avoid += (abil.extra.dex+abil.extra.agi)/40;
        abil.extra.hp += (abil.extra.vtl*2)+abil.extra.str;
        abil.extra.mp += (abil.extra.int*2);

        this.speed += abil.extra.dex*0.8 + abil.extra.agi*0.6;

        abil.str += abil.extra.str;
        abil.dex += abil.extra.dex;
        abil.int += abil.extra.int;
        abil.vtl += abil.extra.vtl;
        abil.agi += abil.extra.agi;

        abil.ad += abil.extra.ad;
        abil.dad += abil.extra.dad;
        abil.ap += abil.extra.ap;
        abil.dap += abil.extra.dap;
        abil.avoid += abil.extra.avoid;
        abil.hp += abil.extra.hp;
        abil.mp += abil.extra.mp;

        abil.ad = Math.floor(abil.ad);
        abil.dad = Math.floor(abil.dad);
        abil.ap = Math.floor(abil.ap);
        abil.dap = Math.floor(abil.dap);
        abil.avoid = Math.floor(abil.avoid);
        abil.hp = Math.floor(abil.hp);
        abil.mp = Math.floor(abil.mp);

        abil.extra.ad = Math.floor(abil.extra.ad);
        abil.extra.dad = Math.floor(abil.extra.dad);
        abil.extra.ap = Math.floor(abil.extra.ap);
        abil.extra.dap = Math.floor(abil.extra.dap);
        abil.extra.avoid = Math.floor(abil.extra.avoid);
        abil.extra.hp = Math.floor(abil.extra.hp);
        abil.extra.mp = Math.floor(abil.extra.mp);

        console.log(abil);

  };
  this.UpdateAbility = function(){
    switch(this.role)
    {
      case 1: this.status(1,1,1,1,1);break;
      case 2: this.status(1.6,1.6,2.4,1.7,1.7);break;
      case 3: this.status(1.5,1.6,2.6,1.7,1.6);break;
      case 4: this.status(2.3,1.7,1.5,2,1.6);break;
      case 5: this.status(2.4,1.5,1.6,1.8,1.7);break;
      case 6: this.status(1.8,2.1,1.5,1.7,1.9);break;
    }
  }
  //this.UpdateAbility();
  this.UpdateSkill = function(){
    //스킬 업데이트
    this.skill_list = [];
    //

    switch(this.role){
      case 1: //노비스
        this.skill_list.push(0);
        if(this.skill_tree[21] == '2#3') this.skill_list.push(2);
        if(this.skill_tree[13] == '3#3') this.skill_list.push(3);
        if(this.skill_tree[15] == '4#3') this.skill_list.push(4);
        if(this.skill_tree[33] == '5#3') this.skill_list.push(5);
      break;

      case 2: //무녀
        this.skill_list.push(1);
        if(this.skill_tree[31] == '7#3') this.skill_list.push(7);
        if(this.skill_tree[12] == '6#3') this.skill_list.push(6);
        if(this.skill_tree[15] == '9#3') this.skill_list.push(9);
        if(this.skill_tree[34] == '8#3') this.skill_list.push(8);
      break;

      case 3: //법사
        this.skill_list.push(1);
        if(this.skill_tree[21] == '10#3') this.skill_list.push(10);
        if(this.skill_tree[4] == '11#3')  this.skill_list.push(11);
        if(this.skill_tree[24] == '12#3') this.skill_list.push(12);
        if(this.skill_tree[27] == '14#3') this.skill_list.push(14);
        if(this.skill_tree[46] == '13#3') this.skill_list.push(13);
      break;

      case 4: //탱전사
        this.skill_list.push(0);
        if(this.skill_tree[11] == '15#3') this.skill_list.push(15);
        if(this.skill_tree[14] == '16#3') this.skill_list.push(16);
        if(this.skill_tree[33] == '17#3') this.skill_list.push(17);
        if(this.skill_tree[36] == '18#3') this.skill_list.push(18);
        if(this.skill_tree[19] == '19#3') this.skill_list.push(19);
      break;

      case 5: //딜전사
        this.skill_list.push(0);
        if(this.skill_tree[20] == '20#3') this.skill_list.push(20);
        if(this.skill_tree[12] == '22#3') this.skill_list.push(22);
        if(this.skill_tree[15] == '23#3') this.skill_list.push(23);
        if(this.skill_tree[33] == '21#3') this.skill_list.push(21);
        if(this.skill_tree[37] == '24#3') this.skill_list.push(24);
      break;

      case 6: //도적
        this.skill_list.push(0);
        if(this.skill_tree[11] == '25#3') this.skill_list.push(25);
        if(this.skill_tree[13] == '26#3') this.skill_list.push(26);
        if(this.skill_tree[35] == '27#3') this.skill_list.push(27);
        if(this.skill_tree[38] == '28#3') this.skill_list.push(28);
      break;
    }
    this.max_skill_select = this.skill_list.length-1;
  }


  this.dequip = function(data){
    var i = data[0]; //i번쨰랑 바꾼다
    var part = data[1];
    var code = this.inventory.storage[i];
    if(code == -1 || part == item_data[code].role)
    {
      switch(part)
      {
        case 0:
          temp = this.equipment.weapon;
          this.equipment.weapon = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 1:
          temp = this.equipment.head;
          this.equipment.head = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 2:
          temp = this.equipment.top;
          this.equipment.top = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 3:
          temp = this.equipment.bottom;
          this.equipment.bottom = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 4:
          temp = this.equipment.glove;
          this.equipment.glove = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 5:
          temp = this.equipment.shoes;
          this.equipment.shoes = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 6:
          temp = this.equipment.ring;
          this.equipment.ring = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
      }
      this.UpdateAbility();
    }
    else console.log('낄 수 없는 장비입니다.');
  }
  this.equip = function(part,data){
    //console.log(data);
    var i = data[0];
    var code = parseInt(data[1]);
    var temp;
    if(item_data[code].role != 0) return; //장비가 아니면

    console.log(item_data[code].level);
    console.log(item_data[code].name);
    if(item_data[code].level > this.level)
    {
      console.log('렙제');
      return; //내 레벨보다 크면
    }

    if(part == item_data[code].part)
    {

      switch(part)
      {
        case 0:
          temp = this.equipment.weapon;
          this.equipment.weapon = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 1:
          temp = this.equipment.head;
          this.equipment.head = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 2:
          temp = this.equipment.top;
          this.equipment.top = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 3:
          temp = this.equipment.bottom;
          this.equipment.bottom = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 4:
          temp = this.equipment.glove; 
          this.equipment.glove = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 5:
          temp = this.equipment.shoes;
          this.equipment.shoes = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;
        case 6:
          temp = this.equipment.ring;
          this.equipment.ring = this.inventory.storage[i];
          this.inventory.storage[i] = temp;
        break;

      }
      console.log('맞는부위');
      this.UpdateAbility();
    }else {
      console.log('낄 수 없는 장비입니다.');
    }

  }
  this.perchase = function(){
     var token = this.shop_data[this.shop_choice].split('@');
    //console.log('가격 : '+token[1]);
    if(this.inventory.gold < token[1]){
      console.log('거지라 못사염 ㅠㅠ');
    }else {
      var result;
      if(item_data[token[0]].role == 0)
        result = this.inventory_add(token[0]);
      else if(item_data[token[0]].role == 1)
        result = this.inventory_add(token[0]+'#1');
      if(result)
      this.inventory.gold -= token[1];
      //console.log(item_data[token[0]].role);
    }
  }
  this.inventory_add = function(data){
    for(var i=0;i<this.inventory.storage.length;i++)
    {
      //토큰
      //장비템 코드#
      //기타템일때 코드#갯수
      var token = data.split('#');
      var code = parseInt(token[0]);
      if(this.inventory.storage[i] == -1) //비어있으면
      {
        if(item_data[code].role == 1) //기타템 이라면
        {
          this.inventory.storage[i] = code+'#'+token[1];

          return true;
        }
        this.inventory.storage[i] = code+'';

        return true;
      }
      else  //아니면 기타템인지확인
      {

        var token1 = this.inventory.storage[i].split('#');

        if(parseInt(token1[0]) == code && item_data[code].role == 1) //같은 기타템이면
        {
          var num = parseInt(token1[1])+parseInt(token[1]); //갯수 +1
          this.inventory.storage[i] = code+'#'+num;

          return true;
        }
      }
    }
    return false;
    console.log('인벤이꽉참');
  }

  this.inventory_change = function(num1,num2){
    console.log(num1+' <==> '+num2);
    var temp = this.inventory.storage[num1];
    this.inventory.storage[num1] = this.inventory.storage[num2];
    this.inventory.storage[num2] = temp;
  }

  this.inventory_delete = function(num1){
    var item = item_data[this.inventory.storage[num1]];
    console.log(item+' 버림');
    console.log('num1 : '+num1);
    this.inventory.storage[num1] = -1;
  }

  this.skill_take = function(loc){

    //스킬코드#상태 2,3
    var token = this.skill_tree[loc].split('#');
    token[0] = parseInt(token[0]); //스킬번호
    token[1] = parseInt(token[1]); //찍엇니 안찍엇니 2,3

    switch(this.role){
      case 1:
        switch(loc)
        {
          case 21:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[2].need_point)
              {
                this.skill_tree[21] = token[0]+'#'+3;
                this.skill_point-=skill_data[2].need_point;
              }
            }
          break;

          case 13:
            if(this.skill_tree[21]=='2#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[3].need_point)
              {
                this.skill_tree[11] = 1;
                this.skill_tree[12] = 1;
                this.skill_tree[13] = token[0]+'#'+3;
                this.skill_point-=skill_data[3].need_point;
              }
            }
          break;

          case 15:
            if(this.skill_tree[13]=='3#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[4].need_point)
              {
                this.skill_tree[14] = 1;
                this.skill_tree[15] = token[0]+'#'+3;
                this.skill_point-=skill_data[4].need_point;
              }
            }
          break;

          case 33:
            if(this.skill_tree[21]=='2#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[5].need_point)
              {
                this.skill_tree[22] = 1;
                this.skill_tree[23] = 1;
                this.skill_tree[33] = token[0]+'#'+3;
                this.skill_point-=skill_data[5].need_point;
              }
            }
          break;
        }
      break;

      ////////////////////////////////////////////////////////////////////
      case 2:
        switch(loc)
        {
          case 31:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[31] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 34:
            if(this.skill_tree[31]=='7#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[32] = 1;
                this.skill_tree[33] = 1;
                this.skill_tree[34] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 12:
            if(this.skill_tree[31]=='7#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[11] = 1;
                this.skill_tree[21] = 1;
                this.skill_tree[12] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 15:
            if(this.skill_tree[12]=='6#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[13] = 1;
                this.skill_tree[14] = 1;
                this.skill_tree[15] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;
        }
      break;


      //////////////////////////////////////////////////////////
      case 3:
        switch(loc)
        {
          case 21:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[21] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 4:
            if(this.skill_tree[21]=='10#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[22] = 1;
                this.skill_tree[23] = 1;
                this.skill_tree[13] = 1;
                this.skill_tree[3] = 1;
                this.skill_tree[4] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 24:
            if(this.skill_tree[21]=='10#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[22] = 1;
                this.skill_tree[23] = 1;
                this.skill_tree[24] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 27:
            if(this.skill_tree[24]=='12#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[25] = 1;
                this.skill_tree[26] = 1;
                this.skill_tree[27] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;

          case 46:
            if(this.skill_tree[21]=='10#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[22] = 1;
                this.skill_tree[23] = 1;
                this.skill_tree[33] = 1;
                this.skill_tree[43] = 1;
                this.skill_tree[44] = 1;
                this.skill_tree[45] = 1;
                this.skill_tree[46] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;
        }
      break;

      //////////////////////////////////////////////////////////
      case 4:
        switch(loc)
        {
          case 11:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[11] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 14:
            if(this.skill_tree[11]=='15#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[12] = 1;
                this.skill_tree[13] = 1;
                this.skill_tree[14] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 33:
            if(this.skill_tree[11]=='15#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[12] = 1;
                this.skill_tree[22] = 1;
                this.skill_tree[32] = 1;
                this.skill_tree[33] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 36:
            if(this.skill_tree[33]=='17#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[34] = 1;
                this.skill_tree[35] = 1;
                this.skill_tree[36] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;

          case 19:
            if(this.skill_tree[14]=='16#3' && this.skill_tree[36]=='18#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[15] = 1;
                this.skill_tree[16] = 1;
                this.skill_tree[17] = 1;
                this.skill_tree[18] = 1;
                this.skill_tree[37] = 1;
                this.skill_tree[27] = 1;
                this.skill_tree[19] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;
        }
      break;


      //////////////////////////////////////////////////////////
      case 5:
        switch(loc)
        {
          case 20:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[20] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 12:
            if(this.skill_tree[20]=='20#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[11] = 1;
                this.skill_tree[21] = 1;
                this.skill_tree[12] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 15:
            if(this.skill_tree[12]=='22#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[13] = 1;
                this.skill_tree[14] = 1;
                this.skill_tree[15] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 33:
            if(this.skill_tree[20]=='20#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[21] = 1;
                this.skill_tree[31] = 1;
                this.skill_tree[32] = 1;
                this.skill_tree[33] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;

          case 37:
            if(this.skill_tree[33]=='21#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[34] = 1;
                this.skill_tree[35] = 1;
                this.skill_tree[36] = 1;
                this.skill_tree[37] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;
        }
      break;

      //////////////////////////////////////////////////////////
      case 6:
        switch(loc)
        {
          case 11:
            if(token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[11] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 13:
            if(this.skill_tree[11]=='25#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[12] = 1;
                this.skill_tree[13] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 35:
            if(this.skill_tree[13]=='26#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[14] = 1;
                this.skill_tree[15] = 1;
                this.skill_tree[25] = 1;
                this.skill_tree[35] = token[0]+'#'+3;
                this.skill_point-=skill_data[token[0]].need_point;
              }
            }
          break;

          case 38:
            if(this.skill_tree[35]=='27#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[36] = 1;
                this.skill_tree[37] = 1;
                this.skill_tree[38] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;

          case 37:
            if(this.skill_tree[33]=='21#3' && token[1] != 3)
            {
              if(this.skill_point >= skill_data[token[0]].need_point)
              {
                this.skill_tree[34] = 1;
                this.skill_tree[35] = 1;
                this.skill_tree[36] = 1;
                this.skill_tree[37] = token[0]+'#'+3;
                this.skill_point-= skill_data[token[0]].need_point;
              }
            }
          break;
        }
      break;
    }//switch(role)

    this.UpdateSkill();

  }

    this.battleOper = function(key){
    var token = this.br_pointer.split('#');
    var isUi = false;
    switch(token[0])
    {

      case 'page0':
      var num = parseInt(token[1]);
        switch(key)
        {
          case 'DOWN':
            if(num < 2) {this.br_pointer = token[0]+'#'+(num+2); isUi = true; }
            else return false;
          break;
          case 'LEFT': if(num == 1 || num == 3) this.br_pointer = token[0]+'#'+(num-1); isUi = true; break;
          case 'RIGHT': if(num == 0 || num == 2) this.br_pointer = token[0]+'#'+(num+1); isUi = true; break;
          case 'UP': if(num > 1) this.br_pointer = token[0]+'#'+(num-2); isUi = true; break;
          case 'z': if(num == 0) this.br_pointer = 'page1#0'; isUi = true; break;
          case 'x': isUi = true; break;
        }
      break;

      case 'page1':
      var num = parseInt(token[1]);
      switch(key)
      {
        case 'DOWN':
          if(this.max_skill_select > num) {this.br_pointer = token[0]+'#'+(num+1); isUi = true;}
          else return false;
        break;
        case 'UP':
          if(num > 0) {this.br_pointer = token[0]+'#'+(num-1); isUi = true;}
          else return false;
        break;
        case 'z':
          var skill_num = this.skill_list[num];
          var skill = skill_data[skill_num];
          if(this.mp < skill.need_mp) {
            console.log('MP가 부조카당');
            return false; //요구MP가 더크면
          }
          this.skill_choice = skill_num;
          this.br_pointer = 'page2#0'; isUi = true;
        break;
        case 'x': this.br_pointer = 'page0#0'; isUi = true; break;
        default: return false;
      }
      break;

      case 'page2':
      var num = parseInt(token[1]);
      switch(key)
      {
        case 'DOWN':
          if(num < 6)
          {
            if(num%2 == 0) if(this.br.Lslot[parseInt(num/2)+1]== -1) return false;
            if(num%2 == 1) if(this.br.Rslot[parseInt(num/2)+1]== -1) return false;

            this.br_pointer = token[0]+'#'+(num+2);
            isUi = true;
          }else return false;
        break;
        case 'LEFT':
          if(num%2 == 1)
          {
            if(this.br.Lslot[parseInt(num/2)]== -1) return false;

            this.br_pointer = token[0]+'#'+(num-1);
            isUi = true;
          }else return false;
        break;
        case 'RIGHT':
          if(num%2 == 0)
          {
            if(this.br.Rslot[parseInt(num/2)]== -1) return false;

            this.br_pointer = token[0]+'#'+(num+1);
            isUi = true;
          }else return false;
        break;
        case 'UP':
          if(num > 1)
          {
            if(num%2 == 0) if(this.br.Lslot[parseInt(num/2)-1]== -1) return false;
            if(num%2 == 1) if(this.br.Rslot[parseInt(num/2)-1]== -1) return false;

            this.br_pointer = token[0]+'#'+(num-2);
            isUi = true;
          }else return false;
        break;

        case 'z':   //page2     대상선택
          var attacker = '';
          var target = '';
          for(var i=0;i<4;i++)
          {
            var token = this.br.Lslot[i].split('#');
            if(parseInt(token[1]) == this.index)
            {
              attacker = 'L!'+i;
              break;
            }
          }
          //L슬롯 설정
          var skill = skill_data[this.skill_choice];

          if(skill.role == 0) // 단일공격
          {
            if(num%2 == 0) return false; //오른쪽 공격이면 취소

          }else if(skill.role == 1){    //힐
            if(num%2 == 1) return false; //적(R) 공격이면 취소

          }

          console.log('skill.role');
          console.log(skill.name);
          console.log(skill.role);

          var token = this.br.Rslot[parseInt(num/2)].split('#');

          if(token[0] == 'player')
          {
            if(token[3] == 'dead')
            {
              console.log('시체매너');
              return false;
            }
          }
          if(token[0] == 'monster')
          {
            if(token[3] == 'dead')
            {
              console.log('시체매너');
              return false;
            }
          }
          var skill = skill_data[this.skill_choice];
          console.log('내가고른 스킬 : '+skill.name);

          if(num%2 == 0) target = 'L!'+parseInt(num/2); //왼쪽타겟
          if(num%2 == 1) target = 'R!'+parseInt(num/2); //오른쪽타겟

          //R슬롯 설정
          var order = this.speed+'#'+this.skill_choice+'#'+attacker+'->'+target;

          this.br.order_list.push(order);
          this.br.Lslot_ready.push(1);
          if(this.br.isReady())
          {
            this.br.monster_order();
            this.br.set_order_turn();
            console.log(this.br.order_list);
            this.br.battle();
            this.br.isEnd();
            return 'log';
          } else {
            console.log('아직 전투아님');
            this.br_pointer = 'page3#'+num; isUi = true;
          }

        break;

        case 'x': this.br_pointer = 'page1#0'; isUi = true; break;
      }
      break;

      case 'page3':
        var num = parseInt(token[1]);
        // switch(key)
        // {
        //   case 'x':
        //     this.br_pointer = 'page2#'+num; isUi = true;
        //   break;
        // }
        isUi = true;
      break;
    }

    // console.log('this.br_pointer : '+this.br_pointer);
    // console.log('isUi : '+isUi);
    if(isUi) return 'ui';
    else return true;
  }
  this.party_apply = function(pIdx){
    if(this.party == -1){
        var party = party_create(this.index);
        this.party = party;
        this.isParty = true;
        this.isLeader = true; //파티장
    }
    this.party.apply(pIdx);

    console.log(party_list);
  }
  this.party_talte = function(){
    if(this.party != -1){
        this.party.exit(this.index); //파티탈퇴
    }
  }
  this.playerCheck = function(){
    if(this.party != -1) return;

    for(var i=0;i<player_list.length;i++){
      var p = player_list[i];
      // console.log(p.name);
      // console.log('player_list.length : '+player_list.length);
      if(p == -1) continue;
      this.select_player = p.index; //플레이어 저장
      switch(this.direction)
      {
        //DLRU
        case 0: //DOWN
        if(p.x == this.x && p.y == this.y+32)
        {
          // console.log(p.name);
          return p.name;
        }
        break;

        case 1: //LEFT
        if(p.x == this.x-32 && p.y == this.y)
        {
          // console.log(p.name);
          return p.name;
        }
        break;

        case 2: //RIGHT
        if(p.x == this.x+32 && p.y == this.y)
        {
          // console.log(p.name);
          return p.name;
        }
        break;

        case 3: //UP
        if(p.x == this.x && p.y == this.y-32)
        {
          // console.log(p.name);
          return p.name;
        }
        break;
      }
    }
    return false;
  }
  this.objectCheck = function(){
    var map = eval(this.map_name);
    for(var i=0;i<map.objects.length;i++)
    {
      var dx = 0;
      var dy = 0;
      var obj = map.objects[i]; //여기에 다들어있음
      switch(obj.jumpCheckDir)
      {
        case 0: dy = 32; break;
        case 1: dx = -32; break;
        case 2: dx = 32; break;
        case 3: dy = -32; break;
      }

      switch(this.direction)
      {
        //DLRU
        case 0: //DOWN
        if(obj.x+dx == this.x && obj.y+dy == this.y+32)
        {
          //console.log(obj);
          return obj.event(this);
        }
        break;

        case 1: //LEFT
        if(obj.x+dx == this.x-32 && obj.y+dy == this.y)
        {
          //console.log(obj);
          return obj.event(this);
        }
        break;

        case 2: //RIGHT
        if(obj.x+dx == this.x+32 && obj.y+dy == this.y)
        {
          //console.log(obj);
          return obj.event(this);
        }
        break;

        case 3: //UP
        if(obj.x+dx == this.x && obj.y+dy == this.y-32)
        {
          //console.log(obj);
          return obj.event(this);
        }
        break;
      }
    }
    return false;
  };
  this.battleCheck = function(){
    if(this.isParty && !this.isLeader) return false; //리더아니면 못움직임
    var px = this.x/32;
    var py = this.y/32;
    //console.log(px+','+py);
   // console.log(this.map.battleData[py][px]);
    if(this.map.battleData[py][px]) //배틀존이면
    {
      var rand = Math.floor(Math.random()*10);
      //console.log('rand : '+rand);

      if(rand != 0) return false;

      //console.log(this.map.battleData[py][px]);
      this.br = battleRoom_create(this.index,this.map.battleData[py][px]);
      this.br_pointer = 'page0#0';
      this.isBattle = true;
      console.log(this.br);
      return true;
    }
  }
  this.portalCheck = function(key){
    if(this.isParty && !this.isLeader) return false; //리더아니면 못움직임
    var px = this.x/32;
    var py = this.y/32;
    //console.log(px+','+py);

    switch(key)
    {
      case 'DOWN':
        if(this.map.portalData[py+1][px])
        {
          var data = this.map.portalData[py+1][px].split('#');
          this.SetMap(data[0]);
          this.x = eval(parseInt(data[1])*32);
          this.y = eval(parseInt(data[2])*32);
          if(this.isLeader) //파티장일 경우
          {
            this.party.map_change();
          }
          return true;
        }
      break;
      case 'LEFT':
        if(this.map.portalData[py][px-1])
        {
          var data = this.map.portalData[py][px-1].split('#');
          this.SetMap(data[0]);
          this.x = eval(parseInt(data[1])*32);
          this.y = eval(parseInt(data[2])*32);
          if(this.isLeader) //파티장일 경우
          {
            this.party.map_change();
          }
          return true;
        }
      break;
      case 'RIGHT':
        if(this.map.portalData[py][px+1])
        {
          var data = this.map.portalData[py][px+1].split('#');
          this.SetMap(data[0]);
          this.x = eval(parseInt(data[1])*32);
          this.y = eval(parseInt(data[2])*32);
          if(this.isLeader) //파티장일 경우
          {
            this.party.map_change();
          }
          return true;
        }
      break;
      case 'UP':
        if(this.map.portalData[py-1][px])
        {
          var data = this.map.portalData[py-1][px].split('#');
          this.SetMap(data[0]);
          this.x = eval(parseInt(data[1])*32);
          this.y = eval(parseInt(data[2])*32);
          if(this.isLeader) //파티장일 경우
          {
            this.party.map_change();
          }
          return true;
        }
      break;
    }



  }
  this.moveOk = function(key){
    if(this.isParty && !this.isLeader) return false; //리더아니면 못움직임
    var px = this.x/32;
    var py = this.y/32;
    //console.log(px+','+py);
    var map = eval(this.map);
    for(var i=0;i<map.objects.length;i++)
    {
      var obj = map.objects[i]; //여기에 다들어있음
      switch(key)
      {
        case 'DOWN': if(obj.x == this.x && obj.y == this.y+32 || !map.collisionData[py+1][px]) {return false;} break;
        case 'LEFT': if(obj.x == this.x-32 && obj.y == this.y || !map.collisionData[py][px-1]) {return false;} break;
        case 'RIGHT': if(obj.x == this.x+32 && obj.y == this.y || !map.collisionData[py][px+1]) {return false;} break;
        case 'UP': if(obj.x == this.x && obj.y == this.y-32 || !map.collisionData[py-1][px]) {return false;} break;
      }
    }
    
    //console.log('안겹침');
    return true;
  }
  this.move = function(key){
    var px = this.x/32;
    var py = this.y/32;
    //console.log(px+','+py);
    var map = eval(this.map);
    switch(key)
    {
      case 'DOWN':
        if(this.moveOk(key)) {this.direction = 0;}
        else {
          this.direction = 0;
          //this.frame = (12*this.direction)+this.walk;
          this.SetFrame((18*this.direction)+this.walk);
          //console.log(this.frame);
          return;
        }
        break;
      case 'LEFT':
        if(this.moveOk(key)) {this.direction = 1;}
        else {
          this.direction = 1;
          //this.frame = (12*this.direction)+this.walk;
          this.SetFrame((18*this.direction)+this.walk);
          //console.log((12*this.direction)+this.walk);
          return;
        }
        break;
      case 'RIGHT':
        if(this.moveOk(key)) {this.direction = 2;}
        else {
          this.direction = 2;
          //this.frame = (12*this.direction)+this.walk;
          this.SetFrame((18*this.direction)+this.walk);
          //console.log(this.frame);
          return;
        }
        break;
      case 'UP':
        if(this.moveOk(key)) {this.direction = 3;}
        else {
          this.direction = 3;
          //this.frame = (12*this.direction)+this.walk;
          this.SetFrame((18*this.direction)+this.walk);
          //console.log(this.frame);
          return;
        }
        break;
    }
    this.isMoving = true;
    var p2 = -1; var p2_moveDir;
    var p3 = -1; var p3_moveDir;
    var p4 = -1; var p4_moveDir;
    //파티원 설정
    if(this.isLeader)
    {
      switch(this.party.player_list.length)
      {
        case 4: p4 = player_list[this.party.player_list[3]];
        case 3: p3 = player_list[this.party.player_list[2]];
        case 2: p2 = player_list[this.party.player_list[1]];
        p1 = player_list[this.party.player_list[0]];
        break;
      }

      if(p2 != -1){
        if(p1.x == p2.x) {
          if(p1.y > p2.y) p2_moveDir = 0; //내 밑
          else if(p1.y < p2.y) p2_moveDir = 3; //내 위
        }
        else if(p1.y == p2.y) {
          if(p1.x < p2.x) p2_moveDir = 1; //내 오른쪽
          else if(p1.x > p2.x) p2_moveDir = 2; //내 왼쪽
        }
      }

      if(p3 != -1){
        if(p2.x == p3.x) {
          if(p2.y > p3.y) p3_moveDir = 0; //내 밑
          else if(p2.y < p3.y) p3_moveDir = 3; //내 위
        }
        else if(p2.y == p3.y) {
          if(p2.x < p3.x) p3_moveDir = 1; //내 오른쪽
          else if(p2.x > p3.x) p3_moveDir = 2; //내 왼쪽
        }
      }

      if(p4 != -1){
        if(p3.x == p4.x) {
          if(p3.y > p4.y) p4_moveDir = 0; //내 밑
          else if(p3.y < p4.y) p4_moveDir = 3; //내 위
        }
        else if(p3.y == p4.y) {
          if(p3.x < p4.x) p4_moveDir = 1; //내 오른쪽
          else if(p3.x > p4.x) p4_moveDir = 2; //내 왼쪽
        }
      }

    }
    var moveInterval = function(player,num){
      if(num == 4)
      {
        player.isMoving = false;
        return;
      }
      // console.log('p2');
      // console.log(p2);
      switch(player.direction){
        case 0:
          player.SetY(player.y+8);

        break;
        case 1: player.SetX(player.x-8); break;
        case 2: player.SetX(player.x+8); break;
        case 3: player.SetY(player.y-8); break;
      }
      //console.log('이동');
      player.walk = (num+1)%3;
      //player.frame = (12*player.direction)+player.walk;
      player.SetFrame((18*player.direction)+player.walk);

      if(p2 != -1)
      {
        switch(p2_moveDir)
        {
          case 0:  p2.SetY(p2.y+8); p2.direction = 0; break;
          case 1:  p2.SetX(p2.x-8); p2.direction = 1; break;
          case 2:  p2.SetX(p2.x+8); p2.direction = 2; break;
          case 3:  p2.SetY(p2.y-8); p2.direction = 3; break;
        }
        p2.walk = (num+1)%3;
        p2.SetFrame((18*p2.direction)+p2.walk);
      }

      if(p3 != -1)
      {
        switch(p3_moveDir)
        {
          case 0:  p3.SetY(p3.y+8); p3.direction = 0; break;
          case 1:  p3.SetX(p3.x-8); p3.direction = 1; break;
          case 2:  p3.SetX(p3.x+8); p3.direction = 2; break;
          case 3:  p3.SetY(p3.y-8); p3.direction = 3; break;
        }
        p3.walk = (num+1)%3;
        p3.SetFrame((18*p3.direction)+p3.walk);
      }

      if(p4 != -1)
      {
        switch(p4_moveDir)
        {
          case 0:  p4.SetY(p4.y+8); p4.direction = 0; break;
          case 1:  p4.SetX(p4.x-8); p4.direction = 1; break;
          case 2:  p4.SetX(p4.x+8); p4.direction = 2; break;
          case 3:  p4.SetY(p4.y-8); p4.direction = 3; break;
        }
        p4.walk = (num+1)%3;
        p4.SetFrame((18*p4.direction)+p4.walk);
      }
      //console.log('player.walk : '+ player.walk);
      //console.log('player.walk : '+player.walk);
      setTimeout(moveInterval,33,player,++num);
    };
    //this.frame = (12*this.direction);
    setTimeout(moveInterval,0,this,num = 0);
  };
};


global.player_list_printAll = function(){
  console.log('접속유저('+socket_list.length+')');
  for(var i=0;i<socket_list.length;i++)
  {
    socket_list[i].get('name',function(err,data){
      console.log(data);
    });
  }
};
