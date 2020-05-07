enchant();

$(document).ready(function(){
  $('#gamestart').click(function(){
   // alert(" 게임을 시작합니다 ! ");
    $('#info').dialog("close");
    $('#test2').remove();
    $(".maina").remove();
/*
    $("#chattext").animate({
    scrollTop:$("#chattext")[0].scrollHeight - $("#chattext").height()
    },1000,function(){
    })
    */
    $('#chat').show();

    $('#chatsend').click(function(){
      var data =$('#chattext').val() + "\r\n";
      $('#chattext').val("");
      $('#chattext').scrollTop($('#chattext')[0].scrollHeight - $("#chattext").height());
      socket.emit('chat',data);
    });
    setInterval(function(){
      socket.emit('request_update',map_name);
    },33);


    // 게임
    var game = new Core(960, 640);
    game.fps = 30;

    game.preload('img/dg.png','img/dgg.png','img/dggg.png','img/dgggg.png','img/dggggg.png','img/dddd.png','img/ddd.png','img/d.png','img/dd.png');
    game.preload('img/heal_003.png','img/heal3.png','img/heal2.png','img/Special1.png');
    game.preload('img/map6.png','img/cave1.png','img/hospital.png');
    game.preload('img/first1.png','img/first.png','img/3.png','img/4.png','img/5.png');
    game.preload('img/map3.png','img/map10.png');
    game.preload('img/chara0.png');
    game.preload('img/ui_icon.png');
    game.preload('img/job_psa.png','img/job_psa1.png','img/job_psa1_dead.png');
    game.preload('img/item0.png','img/border.png');
    game.preload('img/npc.png');
    game.preload('img/yesnobox1.png','img/textbox1.png','img/box_shop.png','img/shop_border.png');
    game.preload('img/equip_box.png');
    game.preload('img/mon0.png','img/mon0_psa.png','img/mon0_psa_dead.png');
    game.preload('img/battle0.png');
    game.preload('img/battle2.png','img/battle4.png');
    game.preload('img/battle_box0.png','img/battle_box1.png','img/battle_box2.png');
    game.preload('img/battle_box3.png','img/battle_page_seleted.png');
    game.preload('img/box_result.png',"img/box_skill_select.png");
    game.preload('img/box_map_name.png');
    game.preload('img/skill0_on.png','img/skill0_off.png','img/skill0_icon.png');
    game.preload('img/skill1_on.png','img/skill1_off.png');
    game.preload('img/skill2_on.png','img/skill2_off.png');
    game.preload('img/skill3_on.png','img/skill3_off.png');
    game.preload('img/skill4_on.png','img/skill4_off.png');
    game.preload('img/skill5_on.png','img/skill5_off.png');
    game.preload('img/e_Attack.png','img/e_fire0.png','img/e_fire.png','img/e_ice0.png','img/e_ice.png','img/e_light0.png','img/e_light.png','img/e_firefild.png','img/e_lightingchain.png','img/e_smash.png','img/e_plateswing.png','img/e_la_smash.png','img/e_pearce.png','img/e_lastattack.png','img/e_lastattack0.png','img/e_thow_weapon.png',
                 'img/e_dragon_attack.png','img/e_dragon_attack0.png','img/e_air_wave.png','img/e_power_strike.png');
    //클래스 정의
    var map = new Map(32, 32);
    var formap = new Map(32, 32);
    formap.opacity = 0.5;
    var Player = enchant.Class.create(enchant.Sprite,{
      initialize: function(){
        enchant.Sprite.call(this,32,32);
        this.Set = function(name,x,y,frame){
          this.image = game.assets['img/chara0.png'];
          this.name = name;
          this.frame = frame;
          this.x = x;
          this.y = y-16;
          this.NameLabel.text = name;
          this.NameLabel.moveTo (this.x-5, this.y-20);
          this.NameLabel.color = 'black';
        }
        this.delete = function(){
          stage.removeChild(this);
          stage.removeChild(this.NameLabel);
          for(var i=0;i<player_list.length;i++)
          {
            if(player_list[i] == this)
            {
              player_list_delete(i);
              return;
            }
          }
        }
        //this.NameLabel.font = '15px';
        this.NameLabel = new Label('이름');
        this.Set('asd',0,0,1);

        stage.addChild(this);
        stage.addChild(this.NameLabel);
        player_list.push(this);
      }
    });

    var Damage = enchant.Class.create(enchant.Label,{
      initialize: function(x,y,dmg,role){
        enchant.Label.call(this,'데미지');
        this.x = x;
        this.y = y;
        this.font = 'bold 30px 굴림';

        console.log(role);
        if(role == 0 || role == -1)
        this.color = 'orange';
        else this.color = 'rgb(50,255,50)';
        this.text = dmg;
        //this.textAlign = 'center';
        this.delete = function(){
          battle_stage.removeChild(this);
        }
        battle_stage.addChild(this);
        this.on('enterframe',function(){
          this.opacity -= 0.03;
          this.y -=1;
          if(this.opacity<0) this.delete();
        });
      }
    });

    var effect = enchant.Class.create(enchant.Sprite,{
      initialize: function(attacker,target,target_info,damage,role,code){
        var hit = 'img/hit'+code+'.wav';
        var sound = new Audio(hit);
        sound.play();

        switch(code)
        {
          case 0:

            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/e_Attack.png'];
            this.frame = [0, 0, 1, 1, 2, 2];

            this.x = target.x-30;
            this.y = target.y-30; //스타트 지점

            battle_stage.addChild(this);
            
            this.life = 5;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
            });
          break;
           case 1:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/e_Attack.png'];
            this.frame = [0, 0, 1, 1, 2, 2];

            this.x = target.x-30;
            this.y = target.y-30; //스타트 지점

            battle_stage.addChild(this);
            
            this.life = 5;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
            });
          break;
          // 파워 스트라이크
          case 2:
            enchant.Sprite.call(this,100,100);
            this.image = game.assets['img/e_power_strike.png'];
            this.frame = [0,0,0,1,1,1,2,2,2,3,3,3,3,3,3];
            this.x = attacker.x-30;
            this.y = attacker.y-30; //스타트 지점

            battle_stage.addChild(this);

            this.life = 15;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,100,100);
                this.image = game.assets['img/e_power_strike.png'];
                this.frame = [5,5,5,4,4,4,4,7,7,7,7,6,6,6,6,6];
                this.x = target.x;
                this.y = target.y; //스타트 지점

                battle_stage.addChild(this);

                this.life = 10;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
          break;
          // 용의 일격
            case 3:
            enchant.Sprite.call(this,150,150);
            this.image = game.assets['img/e_dragon_attack.png'];
            this.frame = [0,0,1,1,2,2,3,3,4,4,3,3,2,2,1,1,0,0];
            this.x = attacker.x-50;
            this.y = attacker.y-70; //스타트 지점

            battle_stage.addChild(this);

            this.life = 10;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,100,100);
                this.image = game.assets['img/e_dragon_attack0.png'];
                this.frame = [0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16,16];
                this.x = target.x-5;
                this.y = target.y-5; //스타트 지점

                battle_stage.addChild(this);

                this.life = 15;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
            break;
            //무기투척
            case 4:
            enchant.Sprite.call(this,100,100);
            this.image = game.assets['img/e_thow_weapon.png'];
            this.frame = [0,0,1,1,2,2,3,3];
            this.x = attacker.x-50;
            this.y = attacker.y-50; //스타트 지점

            battle_stage.addChild(this);

            this.tl.moveTo(target.x+20,target.y,25);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;

            // 파동
            case 5:
            enchant.Sprite.call(this,192,192);
            this.image = game.assets['img/e_air_wave.png'];
            this.frame = [0];
            this.x = attacker.x-100;
            this.y = attacker.y-100; //스타트 지점

            battle_stage.addChild(this);

            this.tl.moveTo(target.x-80,target.y-60,30);

            this.life = 5;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,192,192);
                this.image = game.assets['img/e_air_wave.png'];
                this.frame = [0,0,1,2,3,4,5,6,7,8,9,10,
                              11,12,13,14,15,16,17,18,19,19];
                this.x = target.x-70;
                this.y = target.y-60; //스타트 지점

                battle_stage.addChild(this);
                this.life = 20;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
            break;
           //힐 이펙
          case 6:
            enchant.Sprite.call(this,32,32);
            this.image = game.assets['img/heal_003.png'];
            this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

          //  this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                if(target_info.mp) new_target_info += '       '+target_info.left_mp+'/'+target_info.mp;//mp가있으면
                  target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          case 7: //홀리라이트
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/heal2.png'];

            this.frame = 1;
            this.x = attacker.x;
            this.y = attacker.y; //스타트 지점

            battle_stage.addChild(this);

           this.tl.moveTo(target.x,target.y,15);
            this.life = 15;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/heal2.png'];

                this.frame = [2,2,3,3,4,4,5,5,6,6,7,7];
                this.x = target.x;
                this.y = target.y; //스타트 지점

                battle_stage.addChild(this);

              //  this.tl.moveTo(target.x,target.y,30);
                this.life = 10;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
          break;

          case 8: //심판
          enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/Special1.png'];

            this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9];
            this.x = target.x;
            this.y = target.y-10; //스타트 지점

            battle_stage.addChild(this);

          //  this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          case 9: //생츄어리
          enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/heal3.png'];

            this.frame = [0,0,1,1,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9];
            this.x = target.x+10;
            this.y = target.y-40; //스타트 지점

            battle_stage.addChild(this);

          //  this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                if(target_info.mp) new_target_info += '       '+target_info.left_mp+'/'+target_info.mp;//mp가있으면
                  target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;
          // 파이어 볼트
          case 10:
            enchant.Sprite.call(this,40,36);
            this.image = game.assets['img/e_fire0.png'];
            this.frame = 0;
            this.x = attacker.x;
            this.y = attacker.y; //스타트 지점

            battle_stage.addChild(this);
            this.tl.moveTo(target.x+20,target.y+20,12);

            this.life = 12;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/e_fire.png'];
                this.frame = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
                this.x = target.x-20;
                this.y = target.y-10; //스타트 지점

                battle_stage.addChild(this);

                this.life = 15;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
              });
              }
            });
            break;

            // 콜드 볼트
            case 11:
            enchant.Sprite.call(this,40,36);
            this.image = game.assets['img/e_ice0.png'];
            this.frame = 0;
            this.x = attacker.x;
            this.y = attacker.y; //스타트 지점

            battle_stage.addChild(this);
            this.tl.moveTo(target.x+20,target.y+20,12);
            this.tl.and();
            this.tl.rotateTo(1080,28);

            this.life = 12;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/e_ice.png'];
                this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,8,8];
                this.x = target.x-20;
                this.y = target.y-10; //스타트 지점

                battle_stage.addChild(this);

                this.life = 15;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
              });
              }
            });
            break;

            // 썬더 볼트
            case 12:
            enchant.Sprite.call(this,40,36);
            this.image = game.assets['img/e_light0.png'];
            this.frame = 0;
            this.x = attacker.x;
            this.y = attacker.y; //스타트 지점

            battle_stage.addChild(this);
            this.tl.moveTo(target.x+20,target.y+20,12);
            this.tl.and();
            this.tl.rotateTo(1080,28);

            this.life = 12;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/e_light.png'];
                this.frame = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
                this.x = target.x-20;
                this.y = target.y-10; //스타트 지점

                battle_stage.addChild(this);

                this.life = 15;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
              });
              }
            });
            break;

            // 파이어 필드
            case 13:
            enchant.Sprite.call(this,110,110);
            this.image = game.assets['img/e_firefild.png'];
            this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,8,8,7,7,8,8,9,9];
            this.x = target.x-10;
            this.y = target.y-10;

            battle_stage.addChild(this);

            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;

            // 체인 라이트링
            case 14:
            enchant.Sprite.call(this,192,192);
            this.image = game.assets['img/e_lightingchain.png'];
            this.frame = [0,1,2,3,4,5,6,7,8,7,8,7,8,7,8,7,8,7,6,5,2,1,1];
            this.x = target.x-55;
            this.y = target.y-50; //스타트 지점

            battle_stage.addChild(this);

            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;

            // 스메쉬
            case 15:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/e_smash.png'];
            this.frame = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,14,14];
            this.x = attacker.x-30;
            this.y = attacker.y-30; //스타트 지점

            battle_stage.addChild(this);

            this.life = 13;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/e_smash.png'];
                this.frame = 14;
                this.x = target.x;
                this.y = target.y-80; //스타트 지점

                battle_stage.addChild(this);

                this.tl.moveTo(target.x,target.y,5);
                this.life = 14;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
               });
              }
            });
            break;

            // 플라이트 스윙
            case 16:
            enchant.Sprite.call(this,150,150);
            this.image = game.assets['img/e_plateswing.png'];
            this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9,10,10,10,10];
            this.x = target.x-23;
            this.y = target.y-23; //스타트 지점

            battle_stage.addChild(this);

            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;
            //라 스매쉬
            case 17:
            enchant.Sprite.call(this,110,110);
            this.image = game.assets['img/e_la_smash.png'];
            this.frame = [0,1,2,3,4,5,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13,14,14,14];
            this.x = target.x-20;
            this.y = target.y-20; //스타트 지점

            battle_stage.addChild(this);

            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;

           
            // 피어스
            case 18:
            enchant.Sprite.call(this,120,120);
            this.image = game.assets['img/e_pearce.png'];
            this.frame = [9,9,9,8,8,,7,7,6,6,6,0,0,0,1,1,1,2,2,3,3,4,4,5,5,5,5];
            this.x = target.x-20;
            this.y = target.y-20; //스타트 지점

            battle_stage.addChild(this);

            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;
             // 라스트 어택
            case 19:
            enchant.Sprite.call(this,150,150);
            this.image = game.assets['img/e_lastattack.png'];
            this.frame = [0,0,1,1,2,2,3,3,4,5,6,7,7,8,8,9,9];
            this.x = attacker.x-50;
            this.y = attacker.y-50; //스타트 지점

            battle_stage.addChild(this);

            this.life = 12;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,192,192);
                this.image = game.assets['img/e_lastattack0.png'];
                this.frame = [0,0,1,1,2,2,3,3,4,4,5,5,6,6];
                this.x = target.x-40;
                this.y = target.y-40; //스타트 지점

                battle_stage.addChild(this);

                this.life = 14;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {
                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
            break;

          // 딜  샤우트 쳐 적 모두를 공격한다
          case 20:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dg.png'];
            this.frame = [0,0,1,2,3,3,4,5,5,6,6,7,8,9,10,11,12,13,14,15,17,18,19,20,20,20];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;
          //3연참
          case 21:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dgg.png'];
            this.frame = [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          // 사신 월광참!
          case 22:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dggg.png'];
            this.frame = [0,0,1,1,2,3,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 26;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          // 사신 압도
          case 23:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dgggg.png'];
            this.frame = [0,0,1,1,2,3,4,5,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          // 사신  데스바운드
          case 24:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dggggg.png'];
            this.frame = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          // 도적  치명적인 일격!
          case 25:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/ddd.png'];
            this.frame = [0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,9,9,9];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;
          
          // 도적 표창던지기
          case 26:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dd.png'];
            this.frame = 0;
            this.x = attacker.x;
            this.y = attacker.y; //스타트 지점

            battle_stage.addChild(this);

            this.tl.moveTo(target.x,target.y,15);
            this.tl.and();
            this.tl.rotateTo(680,30);


            this.life = 15;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                battle_stage.removeChild(this);

                enchant.Sprite.call(this,96,96);
                this.image = game.assets['img/dd.png'];
                this.frame = [1,1,2,2,3,3,4,4,5,5,6,6,6,6,6];
                this.x = target.x;
                this.y = target.y; //스타트 지점

                battle_stage.addChild(this);

                this.life = 10;
                this.on('enterframe',function(){
                  this.life--;
                  if(this.life == 0)
                  {

                    target_info.gb_value = 0;
                    new Damage(target.x+48,target.y+20,damage,role);
                    var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                    target_info.label.text = new_target_info;
                    battle_stage.removeChild(this);
                  }
                });
              }
            });
            break;

            //   도적 쉐도우 어택!
          case 27:
            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/dddd.png'];
            this.frame = [0,0,1,2,3,4,5,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
            this.x = target.x;
            this.y = target.y; //스타트 지점

            battle_stage.addChild(this);

            //this.tl.moveTo(target.x,target.y,30);
            this.life = 25;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
          break;

          // 도적 소닉블로우 적 1인에게 8연속 공격을 한다
          case 28:
          enchant.Sprite.call(this,96,96);
          this.image = game.assets['img/d.png'];
          this.frame = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
          this.x = target.x;
          this.y = target.y; //스타트 지점

          battle_stage.addChild(this);

          //this.tl.moveTo(target.x,target.y,30);
          this.life = 25;
          this.on('enterframe',function(){
            this.life--;
            if(this.life == 0)
            {
              target_info.gb_value = 0;
              new Damage(target.x+48,target.y+20,damage,role);
              var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                target_info.label.text = new_target_info;
              battle_stage.removeChild(this);
            }
          });
        break;
    // 기본 공격 & 몬스터 공격 
        default:

            enchant.Sprite.call(this,96,96);
            this.image = game.assets['img/e_Attack.png'];
            this.frame = [0, 0, 1, 1, 2, 2];

            this.x = target.x-30;
            this.y = target.y-30; //스타트 지점

            battle_stage.addChild(this);
            
            this.life = 5;
            this.on('enterframe',function(){
              this.life--;
              if(this.life == 0)
              {
                target_info.gb_value = 0;
                new Damage(target.x+48,target.y+20,damage,role);
                var new_target_info = target_info.name + '    '+target_info.left_hp+'/'+target_info.hp;
                if(target_info.mp) new_target_info += '       '+target_info.left_mp+'/'+target_info.mp;//mp가있으면
                  target_info.label.text = new_target_info;
                battle_stage.removeChild(this);
              }
            });
            break;
          }
       }
    });


    var Party_Info = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,player_info){
        var token = player_info.split('#');
        enchant.Sprite.call(this,32,32);
        this.x = 10;
        this.y = (i*48)+36;
        this.frame = parseInt(token[0]-1);

        this.name = token[1];
        this.hp = parseInt(token[3]);
        this.left_hp = parseInt(token[2]);
        this.hp_text = token[2]+'/'+token[3];
        this.mp = parseInt(token[5]);
        this.left_mp = parseInt(token[4]);
        this.mp_text = token[4]+'/'+token[5];
        this.image = game.assets['img/job_psa1.png'];
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = this.x;
        this.border.y = this.y;

        this.label = new Label('플레이어 정보');
        this.label.text = this.name + '    '+this.hp_text+'    '+this.mp_text;
        this.label.font = 'bold 18px 굴림';
        this.label.color = 'white';
        this.label.x = this.x+40;
        this.label.y = this.y+4;

        ui_party_info.addChild(this);
        ui_party_info.addChild(this.border);
        ui_party_info.addChild(this.label);
        party_info_list.push(this);
      }
    });

    var Battle_Player = enchant.Class.create(enchant.Sprite,{
      initialize: function(code,i){
        enchant.Sprite.call(this,32,32);
        this.image = game.assets['img/chara0.png'];
        this.frame = 37+(3*(code-1));
        this.x = 50+32;
        this.y = 50+(i*70)+32;

        battle_stage.addChild(this);

        battle_player_list.push(this);
      }
    });

    var Battle_Player_Info = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,slot_data){
        var token = slot_data.split('#');
        enchant.Sprite.call(this,32,32);
        this.x = 80;
        this.y = (i*48)+36;
        this.frame = parseInt(token[2]-1);

        this.gb_value = 255;

        this.name = token[3];
        this.hp = parseInt(token[5]);
        this.left_hp = parseInt(token[4]);
        this.hp_text = token[4]+'/'+token[5];

        this.mp = parseInt(token[7]);
        this.left_mp = parseInt(token[6]);
        this.mp_text = this.left_mp+'/'+this.mp;
        this.image = game.assets['img/job_psa1.png'];
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = this.x;
        this.border.y = this.y;

        this.label = new Label('플레이어 정보');
        this.label.text = this.name + '    '+this.hp_text+'        '+this.mp_text;
        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.x = this.x+40;
        this.label.y = this.y+4;

        //this.label.opacity = 0.5;
        this.on('enterframe',function()
        {
          if(this.gb_value<255)
          {
            this.label.color = 'rgb(255,'+this.gb_value+','+this.gb_value+')';
            this.gb_value +=10;
          }
          else this.gb_value = 255;
        });

        battle_ui_page2.addChild(this);
        battle_ui_page2.addChild(this.border);
        battle_ui_page2.addChild(this.label);
        battle_player_info_list.push(this);
      }
    });
    var Battle_Monster = enchant.Class.create(enchant.Sprite,{
      initialize: function(frame,i){
        enchant.Sprite.call(this,96,96);
        this.image = game.assets['img/mon0.png'];
        this.frame = frame;
        this.x = 800;
        this.y = 50+(i*70);


        battle_stage.addChild(this);

        battle_mon_list.push(this);
      }
    });
    var Battle_Monster_Info = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,code,left_hp){
        enchant.Sprite.call(this,32,32);
        this.x = 550;
        this.y = (i*48)+36;
        this.frame = code;

        this.gb_value = 255;
        if(code != -1)
        {
          this.name = monster_data[code].name;
          this.hp = parseInt(monster_data[code].ability.hp);
          this.left_hp = parseInt(left_hp);
        }
        this.image = game.assets['img/mon0_psa.png'];
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = this.x;
        this.border.y = this.y;

        this.label = new Label('몬스터 정보');
        this.label.text = this.name + '    '+this.left_hp+'/'+this.hp;
        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.x = this.x+40;
        this.label.y = this.y+4;

        //this.label.opacity = 0.5;
        this.on('enterframe',function()
        {
          if(this.gb_value<255)
          {
            this.label.color = 'rgb(255,'+this.gb_value+','+this.gb_value+')';
            this.gb_value +=10;
          }
          else this.gb_value = 255;
        });

        battle_ui_page2.addChild(this);
        battle_ui_page2.addChild(this.border);
        battle_ui_page2.addChild(this.label);
        battle_mon_info_list.push(this);
      }
    });

    var Battle_Result_Player = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,slot_data,gold,exp){
        enchant.Sprite.call(this,32,32);

        var token = slot_data.split('#');
        var code = parseInt(token[2]-1);

        this.image = game.assets['img/chara0.png'];
        this.frame = 1+(3*code);
        this.x = 30+(i*200)-4;
        this.y = 32;
        this.name = token[3];

        this.label = new Label('이름');
        this.label.x = this.x + 40;
        this.label.y = this.y+8;
        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.text = this.name;

        this.label2 = new Label('이름');
        this.label2.x = this.x;
        this.label2.y = this.y+36;
        this.label2.font = 'bold 18px 굴림';
        this.label2.color = 'rgb(255,0,255)';
        this.label2.text = '골드 : '+gold+'  exp : '+exp;

        this.tl.moveBy(0,-10,4).moveBy(0,10,8).moveBy(0,-10,4).moveBy(0,10,8).scaleTo(-1,1,15);
        this.tl.moveBy(0,-10,4).moveBy(0,10,8).scaleTo(1,1,15).loop();

        battle_ui_result.addChild(this);
        battle_ui_result.addChild(this.label);
        battle_ui_result.addChild(this.label2);

        battle_result_player_list.push(this);
      }
    });

    var Drop_Goods = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,j,code,count){
        enchant.Sprite.call(this,24,24);
        this.x = 30+(i*200)-4;
        this.y = (j+1)*48+60;
        this.frame = code;
        this.count = count;

        if(code != -1)
        {
          this.name = item_data[code].name;
          this.desc = item_data[code].desc;
        }



        this.image = game.assets['img/item0.png'];
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = this.x-4;
        this.border.y = this.y-4;

        this.label = new Label('갯수');
        if(item_data[code].role == 1)
          this.label.text = this.name + '  x '+this.count;
        else if(item_data[code].role == 0)
          this.label.text = this.name;
        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.x = this.x+40;
        this.label.y = this.y;

        battle_ui_result.addChild(this.border);
        battle_ui_result.addChild(this);
        battle_ui_result.addChild(this.label);
        battle_result_drop_list.push(this);
      }
    });



    var Npc = enchant.Class.create(enchant.Sprite,{
      initialize: function(name,x,y,frame){
        enchant.Sprite.call(this,32,32);
        this.image = game.assets['img/npc.png'];
        this.name = name;
        this.frame = frame;
        this.x = x;
        this.y = y-16;

        stage.addChild(this);

        npc_list.push(this);
      }
    });
    var Shop_Goods = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,code,price){
        enchant.Sprite.call(this,24,24);
        this.x = 30;
        this.y = (i+2)*48;
        this.frame = code;
        this.price = price;

        if(code != -1)
        {
          this.name = item_data[code].name;
          this.desc = item_data[code].desc;
        }



        this.image = game.assets['img/item0.png'];
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = this.x-4;
        this.border.y = this.y-4;

        this.label = new Label('아이템설명');
        this.label.text = this.name + '    '+this.price+'G';
        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.x = this.x+40;
        this.label.y = this.y;
        shop_ui.addChild(this.border);
        shop_ui.addChild(this);
        shop_ui.addChild(this.label);
        shop_list.push(this);
      }
    });
    var Skill_Select = enchant.Class.create(enchant.Sprite,{
      initialize: function(i,code){
        enchant.Sprite.call(this,32,32);
        var skill = skill_data[code];

        this.image = game.assets['img/skill0_icon.png'];
        this.frame = code;
        this.name = skill.name;
        this.need_mp = skill.need_mp;

        this.x = 60;
        this.y = i*48+40;

        this.label = new Label('스킬 이름 소모MP');
        this.label.x = this.x+60;
        this.label.y = this.y+4;


        this.label.font = 'bold 20px 굴림';
        this.label.color = 'white';
        this.label.text = this.name + '       소모MP '+this.need_mp;
        battle_ui_page1_skill_list.addChild(this);
        battle_ui_page1_skill_list.addChild(this.label);
        skill_select_list.push(this);

      }
    });



    var event_create = function(object){
      object.on('touchstart',function(evt){
        if(this.frame == -1)
        {
          this.pressX = -1;
          this.pressY = -1;
          ui_equip_board.opacity = 0.0;
          ui_equip_text.opacity = 0.0;
          return;
        }
        var x = Math.floor((Math.floor(evt.x)-640-(6*32+10))/37);
        var y = Math.floor((Math.floor(evt.y)-70)/37);

        //어디 파트세요
        switch(x)
        {
          case 0:
            switch(y)
            {
              case 1: this.part = 0; break;
              case 3: this.part = 6; break;
            }
          break;
          case 1:
            switch(y)
            {
              case 0: this.part = 1; break;
              case 1: this.part = 2; break;
              case 2: this.part = 3; break;
              case 3: this.part = 5; break;
            }
          break;
          case 2:
            switch(y)
            {
              case 1: this.part = 4; break;
            }
          break;
        }

        ui_equip_board.opacity = 0.5;
        ui_equip_text.opacity = 1.0;

        dragAndDrop.opacity = 0.7;
        dragAndDrop.image = this.image;
        dragAndDrop.frame = this.frame;
        dragAndDrop.x = 0;
        dragAndDrop.y = -32;

        this.name = item_data[this.frame].name;
        this.desc = item_data[this.frame].desc;
        if(item_data[this.frame].role == 0)
        this.ability = item_data[this.frame].ability;

        var text = ui_status_item_abil_text(item_data[this.frame]);

        //console.log(this.ability);

        ui_equip_text.text = text;
      });

      object.on('touchmove',function(evt){
        dragAndDrop.x = evt.x-640-12;
        dragAndDrop.y = evt.y-12;
      });

      object.on('touchend',function(evt){
        dragAndDrop.opacity = 0;
        if(this.pressX == -1 || this.pressY == -1) return;

        var x = Math.floor((Math.floor(evt.x)-640)/32);
        var y = Math.floor((Math.floor(evt.y)-70)/32);
          if(x <= 5 && x >= 0 && y >= 0 && y <= 4)
          {
            var i = y*6+x;
            var data = [];
            data[0] = i;
            data[1] = this.part;
            socket.emit('player','dequip',data);
            return;
          }
      });
    };

    var Skill_Tree = enchant.Class.create(enchant.Sprite,{
      initialize: function(loc,job,status){
        enchant.Sprite.call(this,32,32);
        var off_img_src;
        var on_img_src;
        switch(job){
          case 1: off_img_src = 'img/skill0_off.png'; on_img_src = 'img/skill0_on.png'; break;
          case 2: off_img_src = 'img/skill1_off.png'; on_img_src = 'img/skill1_on.png'; break;
          case 3: off_img_src = 'img/skill2_off.png'; on_img_src = 'img/skill2_on.png'; break;
          case 4: off_img_src = 'img/skill3_off.png'; on_img_src = 'img/skill3_on.png'; break;
          case 5: off_img_src = 'img/skill4_off.png'; on_img_src = 'img/skill4_on.png'; break;
          case 6: off_img_src = 'img/skill5_off.png'; on_img_src = 'img/skill5_on.png'; break;
        }
        var token;
        if(isNaN(status))
        {
          token = status.split('#');
          if(parseInt(token[1]) == 2) this.image = game.assets[off_img_src];
          else if(parseInt(token[1]) == 3) this.image = game.assets[on_img_src];
        }else{
          if(status == 0) this.image = game.assets[off_img_src];
          else if(status == 1) this.image = game.assets[on_img_src];
        }
        var x = loc%10;
        var y = parseInt(loc/10);

        this.x = x*32;
        this.y = y*32+64;

        this.frame = loc;
        this.name = '이름';

        if(status != 0 && status != 1)
        {
          this.on('touchend',function(evt){
            if(ui_now_skill == this.frame)
            {
              socket.emit('echo',this.frame);
              socket.emit('player','skill_take',this.frame);
            }
            ui_now_skill = this.frame;
            var skill = skill_data[parseInt(token[0])];
            var text = ui_status_skill_info_text(skill);

            ui_skill_info_text.text = text;

            ui_skill_info_box.opacity = 1;
            ui_skill_info_text.opacity = 1;
          });
        }else{
          this.on('touchend',function(evt){
            ui_now_skill = -1;
            ui_skill_info_box.opacity = 0;
            ui_skill_info_text.opacity = 0;
          });
        }




        ui_skill.addChild(this);

        skill_tree_list.push(this);
      }
    });

    var Item = enchant.Class.create(enchant.Sprite,{
      initialize: function(y,x,code){
        enchant.Sprite.call(this,24,24);
        this.image = game.assets['img/item0.png'];
        this.x = x*32+4;
        this.y = y*32+4;
        
        this.frame = -1;
        if(code != -1)
        {

          var token = code.split('#');
          var code = parseInt(token[0]);
          this.frame = code;
          this.name = item_data[code].name;
          this.desc = item_data[code].desc;

          switch(item_data[code].role)
          {
            case 0:
              this.ability = item_data[code].ability;
            break;

            case 1:
              this.num = parseInt(token[1]);
            break;
          }
        }
        this.border = new Sprite(32,32);
        this.border.image = game.assets['img/border.png'];
        this.border.x = x*32;
        this.border.y = y*32;

        this.num_text = new Label();
        if(this.num) //this.num이 존재하면
        {
          this.num_text.text = this.num;
          this.num_text.font = 'bold 16px 굴림';
          this.num_text.color = 'white';
          this.num_text.x = x*32+20;
          this.num_text.y = y*32+16;
        }

        ui_equip.addChild(this.num_text);
        ui_equip.addChild(this.border);
        ui_equip.addChild(this);
        inventory_list.push(this);

        this.pressX = -1;
        this.pressY = -1;


        this.on('touchstart',function(evt){
          //alert(this.frame);
          if(this.frame == -1)
          {
            this.pressX = -1;
            this.pressY = -1;
            ui_equip_board.opacity = 0.0;
            ui_equip_text.opacity = 0.0;
            return;
          }
          this.pressX = Math.floor((Math.floor(evt.x)-640)/32);
          this.pressY = Math.floor((Math.floor(evt.y)-70)/32);

          ui_equip_board.opacity = 0.5;
          ui_equip_text.opacity = 1.0;

          dragAndDrop.opacity = 0.7;
          dragAndDrop.image = this.image;
          dragAndDrop.frame = this.frame;
          dragAndDrop.x = 0;
          dragAndDrop.y = -32;

          var text = ui_status_item_abil_text(item_data[code]);

          ui_equip_text.text = text;
        });
        this.on('touchmove',function(evt){
          dragAndDrop.x = evt.x-640-12;
          dragAndDrop.y = evt.y-12;
        });
        this.on('touchend',function(evt){
          dragAndDrop.opacity = 0;

          if(this.pressX == -1 || this.pressY == -1) return;

          var x = Math.floor((Math.floor(evt.x)-640)/32);
          var y = Math.floor((Math.floor(evt.y)-70)/32);
          if(x <= 5 && x >= 0 && y >= 0 && y <= 4)
          {
            var num1 = this.pressY*6+this.pressX;
            var num2 = y*6+x;
            if(num1 == num2) return;
            var data = [];
            data[0] = num1;
            data[1] = num2;
            socket.emit('player','inventory_change',data);
            return;
          }else if(x < 0){ //버림
            var num1 = this.pressY*6+this.pressX;
            socket.emit('player','inventory_delete',num1);
          }
          var x = Math.floor((Math.floor(evt.x)-640-(6*32+10))/37);
          var y = Math.floor((Math.floor(evt.y)-70)/37);
          //alert(x+','+y);
          var data = [];
          data[0] = this.pressY*6+this.pressX;
          data[1] = this.frame;

          switch(x)
          {
            case 0:
              switch(y)
              {
                case 1: socket.emit('player','equip#weapon',data); break;
                case 3: socket.emit('player','equip#ring',data); break;
              }
            break;
            case 1:
              switch(y)
              {
                case 0: socket.emit('player','equip#head',data); break;
                case 1: socket.emit('player','equip#top',data); break;
                case 2: socket.emit('player','equip#bottom',data); break;
                case 3: socket.emit('player','equip#shoes',data); break;
              }
            break;
            case 2:
              switch(y)
              {
                case 1: socket.emit('player','equip#glove',data); break;
              }
            break;
          }
        });
      }
    });

    //////////////////////////////////////////////////////////////////////////
/*
    var debugLabel = new Label('디버그');
    debugLabel.moveTo (-300, 500);
    debugLabel.color = 'black';
    debugLabel.font = 'bold 15px 굴림';

    var chatLabel = new Label('채팅');
    chatLabel.moveTo (-300, 370+10);
    chatLabel.color = 'rgb(0,0,0)';
    chatLabel.font = 'bold 20px 굴림';
*/
    //텍스트박스
    var textbox = new Group();
    textbox.moveTo(-600,50);
      var textbox_text = new Label('텍스트');
      textbox_text.moveTo(20,20);
      textbox_text.opacity = 0;
      textbox_text.color = 'white';
      textbox_text.font = 'bold 20px 굴림';
      var textbox_box = new Sprite(640-80,32*4);
      textbox_box.opacity = 0;
    textbox.addChild(textbox_box);
    textbox.addChild(textbox_text);

    //상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점상점
    var yesno = new Group();
    yesno.moveTo(-600,50);
      var yesno_box = new Sprite(560,128);
      yesno_box.opacity = 0;
      var yesno_text = new Label('예스노');
      yesno_text.moveTo(20,20);
      yesno_text.font = 'bold 20px 굴림';
      yesno_text.color = 'white';
      yesno_text.opacity = 0;
      var yesno_cursor = new Sprite(64,64);
      yesno_cursor.opacity = 0;
      yesno_cursor.scaleX = 0.5;
      yesno_cursor.scaleY = 0.5;
    yesno.addChild(yesno_box);
    yesno.addChild(yesno_text);
    yesno.addChild(yesno_cursor);

    var shop_ui = new Group();
    shop_ui.moveTo(-600,50);
      var shop_box = new Sprite(640-80,500);
      shop_box.opacity = 0;
      var shop_choice = new Sprite(260,48);
      shop_choice.opacity = 0;

      var shop_info = new Group();
      shop_info.moveTo(300,48-8-4+60);
      //
        var shop_board = new Sprite(230,330);
        var shop_text = new Label('아이템설명');
        shop_text.moveTo(5,5);
        shop_text.font = 'bold 15px 굴림';
        shop_text.color = 'white';
        shop_text.opacity = 0.0;
        shop_board.moveTo(0,0);
        shop_board.backgroundColor = 'black';
        shop_board.opacity = 0.0;
      //
      shop_info.addChild(shop_board);
      shop_info.addChild(shop_text);

      var ui_status_icon = new Sprite(64,64);
      ui_status_icon.moveTo (0, 0);
      ui_status_icon.frame = 0;
      var ui_equip_icon = new Sprite(64,64);
      ui_equip_icon.moveTo (64, 0);
      ui_equip_icon.frame = 1;
      var ui_skill_icon = new Sprite(64,64);
      ui_skill_icon.moveTo (128, 0);
      ui_skill_icon.frame = 3;

    shop_ui.addChild(shop_box);
    shop_ui.addChild(shop_choice);
    shop_ui.addChild(shop_info);



    //스테이터스
    var ui_status = new Group();
    ui_status.moveTo (5,64+5);
    var ui_status_psa = new Sprite(128,128);
    ui_status_psa.moveTo(0,0);
    ui_status_psa.frame = -1;
    var ui_status_abil = new Label('스텟');
    var ui_status_abil2 = new Label('스텟2');
    ui_status_abil.moveTo(0,128+5);
    ui_status_abil.color = 'white';
    ui_status_abil.font = '18px 굴림';
    ui_status_abil2.moveTo(150,128+5);
    ui_status_abil2.color = 'white';
    ui_status_abil2.font = 'bold 18px 굴림';
    var ui_status_HME = new Group();
    ui_status_HME.moveTo(128+5,0);
    //
      var ui_status_hp = new Sprite(128,24);
      var ui_status_hp_text = new Label('HP');
      ui_status_hp.backgroundColor = 'red';
      ui_status_hp.moveTo(0,0);
      ui_status_hp_text.color = 'white';
      ui_status_hp_text.moveTo(0,0);

      var ui_status_mp = new Sprite(128,24);
      var ui_status_mp_text =new Label('MP');
      ui_status_mp.backgroundColor = 'blue';
      ui_status_mp.moveTo(0,24+5);
      ui_status_mp_text.color = 'white';
      ui_status_mp_text.moveTo(0,24+5);

      var ui_status_exp = new Sprite(128,24);
      var ui_status_exp_text = new Label('EXP');
      ui_status_exp.backgroundColor = 'yellow';
      ui_status_exp.moveTo(0,48+10);
      ui_status_exp_text.color = 'white';
      ui_status_exp_text.moveTo(0,48+10);

      ui_status_HME.addChild(ui_status_hp);
      ui_status_HME.addChild(ui_status_hp_text);
      ui_status_HME.addChild(ui_status_mp);
      ui_status_HME.addChild(ui_status_mp_text);
      ui_status_HME.addChild(ui_status_exp);
      ui_status_HME.addChild(ui_status_exp_text);

      //파티ui
      var ui_party_info = new Group();
      ui_party_info.moveTo(5,270);
        var ui_party_info_label = new Label('파티정보');
        ui_party_info_label.moveTo(5,5);
        ui_party_info_label.font = 'bold 22px 굴림';
        ui_party_info_label.color = 'white';
        var ui_party_talte_label = new Label('파티탈퇴');
        ui_party_talte_label.moveTo(150,5);
        ui_party_talte_label.font = 'bold 22px 굴림';
        ui_party_talte_label.color = 'orange';

        ui_party_talte_label.on('touchstart',function(){
          socket.emit('player','party_exit');
        });
      ui_party_info.addChild(ui_party_info_label);
      ui_party_info.addChild(ui_party_talte_label);

    ui_status.addChild(ui_status_psa);
    ui_status.addChild(ui_status_HME);
    ui_status.addChild(ui_status_abil);
    ui_status.addChild(ui_status_abil2);
    // ui_status.addChild(ui_party_info);
    var ui_equip = new Group();
    ui_equip.moveTo (5,64+5);
    //
      var ui_equip_gold = new Group();
      //
        var ui_equip_gold_text = new Label('골드');
        ui_equip_gold_text.moveTo(0,160+5);
        ui_equip_gold_text.color = 'white';
      //
      ui_equip_gold.addChild(ui_equip_gold_text);

      var ui_equip_info = new Group();
      ui_equip_info.moveTo(0,190+5);
      //
        var ui_equip_board = new Sprite(300,330);
        var ui_equip_text = new Label('라벨');
        ui_equip_text.moveTo(5,5);
        ui_equip_text.font = 'bold 18px 굴림';
        ui_equip_text.color = 'white';
        ui_equip_board.moveTo(0,0);
        ui_equip_board.backgroundColor = 'blue';
        ui_equip_board.opacity = 0.0;
      //
      ui_equip_info.addChild(ui_equip_board);
      ui_equip_info.addChild(ui_equip_text);
      var ui_equip_equip = new Group();
      ui_equip_equip.moveTo(6*32+10,0);
      //
        var ui_equip_equip_weapon = new Group();
          var ui_equip_equip_weapon_box = new Sprite(32,32);
          var ui_equip_equip_weapon_sprite = new Sprite(24,24);
          ui_equip_equip_weapon_box.frame = 0;
          ui_equip_equip_weapon_sprite.frame = -1;
          ui_equip_equip_weapon_sprite.moveTo(4,4);
          ui_equip_equip_weapon.addChild(ui_equip_equip_weapon_box);
          ui_equip_equip_weapon.addChild(ui_equip_equip_weapon_sprite);
        var ui_equip_equip_head = new Group();
          var ui_equip_equip_head_box = new Sprite(32,32);
          var ui_equip_equip_head_sprite = new Sprite(24,24);
          ui_equip_equip_head_box.frame = 1;
          ui_equip_equip_head_sprite.frame = -1;
          ui_equip_equip_head_sprite.moveTo(4,4);
          ui_equip_equip_head.addChild(ui_equip_equip_head_box);
          ui_equip_equip_head.addChild(ui_equip_equip_head_sprite);
        var ui_equip_equip_top = new Group();
          var ui_equip_equip_top_box = new Sprite(32,32);
          var ui_equip_equip_top_sprite = new Sprite(24,24);
          ui_equip_equip_top_box.frame = 2;
          ui_equip_equip_top_sprite.frame = -1;
          ui_equip_equip_top_sprite.moveTo(4,4);
          ui_equip_equip_top.addChild(ui_equip_equip_top_box);
          ui_equip_equip_top.addChild(ui_equip_equip_top_sprite);
        var ui_equip_equip_bottom = new Group();
          var ui_equip_equip_bottom_box = new Sprite(32,32);
          var ui_equip_equip_bottom_sprite = new Sprite(24,24);
          ui_equip_equip_bottom_box.frame = 3;
          ui_equip_equip_bottom_sprite.frame = -1;
          ui_equip_equip_bottom_sprite.moveTo(4,4);
          ui_equip_equip_bottom.addChild(ui_equip_equip_bottom_box);
          ui_equip_equip_bottom.addChild(ui_equip_equip_bottom_sprite);
        var ui_equip_equip_glove = new Group();
          var ui_equip_equip_glove_box = new Sprite(32,32);
          var ui_equip_equip_glove_sprite = new Sprite(24,24);
          ui_equip_equip_glove_box.frame = 5;
          ui_equip_equip_glove_sprite.frame = -1;
          ui_equip_equip_glove_sprite.moveTo(4,4);
          ui_equip_equip_glove.addChild(ui_equip_equip_glove_box);
          ui_equip_equip_glove.addChild(ui_equip_equip_glove_sprite);
        var ui_equip_equip_shoes = new Group(32,32);
          var ui_equip_equip_shoes_box = new Sprite(32,32);
          var ui_equip_equip_shoes_sprite = new Sprite(24,24);
          ui_equip_equip_shoes_box.frame = 4;
          ui_equip_equip_shoes_sprite.frame = -1;
          ui_equip_equip_shoes_sprite.moveTo(4,4);
          ui_equip_equip_shoes.addChild(ui_equip_equip_shoes_box);
          ui_equip_equip_shoes.addChild(ui_equip_equip_shoes_sprite);
        var ui_equip_equip_ring = new Group();
          var ui_equip_equip_ring_box = new Sprite(32,32);
          var ui_equip_equip_ring_sprite = new Sprite(24,24);
          ui_equip_equip_ring_box.frame = 6;
          ui_equip_equip_ring_sprite.frame = -1;
          ui_equip_equip_ring_sprite.moveTo(4,4);
          ui_equip_equip_ring.addChild(ui_equip_equip_ring_box);
          ui_equip_equip_ring.addChild(ui_equip_equip_ring_sprite);


        ui_equip_equip_weapon.moveTo(0*37,1*37);
        ui_equip_equip_head.moveTo(1*37,0*37);
        ui_equip_equip_top.moveTo(1*37,1*37);
        ui_equip_equip_bottom.moveTo(1*37,2*37);
        ui_equip_equip_glove.moveTo(2*37,1*37);
        ui_equip_equip_shoes.moveTo(1*37,3*37);
        ui_equip_equip_ring.moveTo(0*37,3*37);
      //

      event_create(ui_equip_equip_weapon_sprite);
      event_create(ui_equip_equip_head_sprite);
      event_create(ui_equip_equip_top_sprite);
      event_create(ui_equip_equip_bottom_sprite);
      event_create(ui_equip_equip_glove_sprite);
      event_create(ui_equip_equip_shoes_sprite);
      event_create(ui_equip_equip_ring_sprite);

      ui_equip_equip.addChild(ui_equip_equip_weapon);
      ui_equip_equip.addChild(ui_equip_equip_head);
      ui_equip_equip.addChild(ui_equip_equip_top);
      ui_equip_equip.addChild(ui_equip_equip_bottom);
      ui_equip_equip.addChild(ui_equip_equip_glove);
      ui_equip_equip.addChild(ui_equip_equip_shoes);
      ui_equip_equip.addChild(ui_equip_equip_ring);

    //
    ui_equip.addChild(ui_equip_gold);
    ui_equip.addChild(ui_equip_info);
    ui_equip.addChild(ui_equip_equip);

    var ui_skill = new Group();
    ui_skill.moveTo(0,64);
      var ui_skill_sp = new Label('스킬포인트');
      ui_skill_sp.font = 'bold 18px 굴림';
      ui_skill_sp.color = 'white';

      var ui_skill_info = new Group();
      ui_skill_info.moveTo(10,230);
        ui_skill_info_box = new Sprite(300,300);
        ui_skill_info_box.backgroundColor = 'blue';
        ui_skill_info_box.opacity = 0;
        ui_skill_info_text = new Label('스킬 설명');
        ui_skill_info_text.moveTo(10,10);
        ui_skill_info_text.font = 'bold 18px 굴림';
        ui_skill_info_text.color = 'white';
        ui_skill_info_text.opacity = 0;
      ui_skill_info.addChild(ui_skill_info_box);
      ui_skill_info.addChild(ui_skill_info_text);
    ui_skill.addChild(ui_skill_sp);
    ui_skill.addChild(ui_skill_info);

    var ui_map_name = new Group();
    //
    ui_map_name.moveTo(-640+20,20);
      var ui_map_name_box = new Sprite(150,40);
      var ui_map_name_label = new Label('맵 이름');
      ui_map_name_label.moveTo(10,10);
      ui_map_name_label.font = 'bold 18px 굴림';
      ui_map_name_label.color = 'white';
    //
    ui_map_name.addChild(ui_map_name_box);
    ui_map_name.addChild(ui_map_name_label);

    var dragAndDrop = new Sprite(24,24);
    dragAndDrop.opacity = 0;


    var test = new Sprite(320, 640);
    test.backgroundColor = 'black';
    test.moveTo (0, 0);
    test.opacity = 1;

    var stage = new Group();
    stage.addChild(map);

    var ui_grp = new Group();
    ui_grp.moveTo (640,0);
    ui_grp.addChild(test);
    ui_grp.addChild(ui_status_icon);
    ui_grp.addChild(ui_equip_icon);
    ui_grp.addChild(ui_skill_icon);
    //ui_grp.addChild(chatLabel);
    //ui_grp.addChild(debugLabel);
    ui_grp.addChild(eval(ui.now_name));
    ui_grp.addChild(shop_ui);
    ui_grp.addChild(ui_map_name);
    ui_grp.addChild(textbox);
    ui_grp.addChild(yesno);
    ui_grp.addChild(dragAndDrop);

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //배틀씬
    var battle_background = new Sprite(960,400);
    var battle_stage = new Group();
    var battle_ui_page = new Group();
    battle_ui_page.moveTo(0,400);
    //
      var battle_ui_pointer = new Sprite(64,64);


      var battle_ui_page0 = new Group();
      var battle_ui_page1 = new Group();
      var battle_ui_page2 = new Group();
      var battle_ui_page3 = new Group();
        var battle_ui_page0_bg = new Sprite(960,240);
        var battle_ui_page1_bg = new Sprite(960,240);
        var battle_ui_page2_bg = new Sprite(960,240);
        var battle_ui_page3_bg = new Sprite(960,240);

        var battle_ui_page1_skill_list = new Group();
        battle_ui_page1_skill_list.moveTo(80,-300);
          var battle_ui_page1_skill_list_box = new Sprite(820,500);
          battle_ui_page1_skill_list_box.opacity = 1;
          var battle_ui_page1_skill_list_info = new Group();
          battle_ui_page1_skill_list_info.moveTo(470,40);
            var battle_ui_skill_list_info_box = new Sprite(300,400);
            battle_ui_skill_list_info_box.backgroundColor = 'rgb(0,170,0)';
            battle_ui_skill_list_info_text = new Label('스킬 설명');
            battle_ui_skill_list_info_text.moveTo(10,10);
            battle_ui_skill_list_info_text.font = 'bold 20px 굴림';
            battle_ui_skill_list_info_text.color = 'black';
          battle_ui_page1_skill_list_info.addChild(battle_ui_skill_list_info_box);
          battle_ui_page1_skill_list_info.addChild(battle_ui_skill_list_info_text);
        battle_ui_page1_skill_list.addChild(battle_ui_page1_skill_list_box);
        battle_ui_page1_skill_list.addChild(battle_ui_page1_skill_list_info);


    battle_ui_page0.addChild(battle_ui_page0_bg);
    battle_ui_page1.addChild(battle_ui_page1_bg);
    battle_ui_page1.addChild(battle_ui_page1_skill_list);
    battle_ui_page2.addChild(battle_ui_page2_bg);
    battle_ui_page3.addChild(battle_ui_page3_bg);

    var battle_ui_result = new Group();
    battle_ui_result.moveTo(55,50);
    //
      var battle_ui_result_bg = new Sprite(850,400);
    //
    battle_ui_result.addChild(battle_ui_result_bg);

    var NormalScene = new Group();
    var BattleScene = new Group();

    NormalScene.addChild(stage);
    NormalScene.addChild(formap);
    NormalScene.addChild(ui_grp);

    BattleScene.addChild(battle_background);
    BattleScene.addChild(battle_stage);
    BattleScene.addChild(battle_ui_page);
    BattleScene.addChild(battle_ui_pointer);
    //BattleScene.addChild(battle_ui_result);



    //함수 정의

    var battle_animation = function(){

      if(battle_animation_isNew)
      {
        battle_ui_pointer.opacity = 0;
        // for(var i=0;i<battle_animation_data.length;i++)
        // {
          var i = battle_animation_turn;
          // console.log(battle_animation_data[i]);
          var token = battle_animation_data[i].split('#');
          var token1 = token[0].split('->');
          var damage = parseInt(token[2]);
          var attack_data = token1[0].split('!');
          var target_data = token1[1].split('!');
          
          var role = -1;
          var scode = -1;
          if(parseInt(token[1]) != -1) {
            var skill = skill_data[parseInt(token[1])];
            role = skill.role;
            scode = skill.code;
          }
          var attacker = {};
          var attacker_info = {};
          var target = {};
          var target_info = {};
          var target_hp = 0;

          //공격자 셋팅
          if(attack_data[0]=='L') {
            attacker = battle_player_list[parseInt(attack_data[1])];
            attacker_info = battle_player_info_list[parseInt(attack_data[1])];
          }
          else if(attack_data[0]=='R') {
            attacker = battle_mon_list[parseInt(attack_data[1])];
            attacker_info = battle_mon_info_list[parseInt(target_data[1])];
          }
          //타겟 셋팅
          if(target_data[0]=='L')
          {
            target = battle_player_list[parseInt(target_data[1])];
            target_info = battle_player_info_list[parseInt(target_data[1])];
          }
          else if(target_data[0]=='R')
          {
            target = battle_mon_list[parseInt(target_data[1])];
            target_info = battle_mon_info_list[parseInt(target_data[1])];
          }

          //이제 시작이네 후...
          if(attack_data[0]=='L') attacker.tl.moveBy(30,0,8).moveBy(-30,0,8);
          else if(attack_data[0]=='R') attacker.tl.moveBy(-30,0,8).moveBy(30,0,8);

          //일단 MP가 소모되야죵?
          if(attack_data[0]=='L') {

            var skill = skill_data[scode];
            attacker_info.left_mp = attacker_info.left_mp-skill.need_mp;
            attacker_info.hp_text = attacker_info.left_hp+'/'+attacker_info.hp;
            attacker_info.mp_text = attacker_info.left_mp+'/'+attacker_info.mp;
            attacker_info.label.text = attacker_info.name + '    '+attacker_info.hp_text+'       '+attacker_info.mp_text;
            //console.log(attacker_info.left_hp);
          }

          //데미지뜨고 글씨 빨개짐

          //var left_hp = target_info.left_hp-damage;
          if(role == 0 || role == -1)
          {
            var left_hp = target_info.left_hp-damage;
            left_hp = (left_hp>0) ? left_hp : 0;
            target_info.left_hp = left_hp; //hp갱신
          }else{
            var left_hp = target_info.left_hp+damage;
            left_hp = (left_hp>target_info.hp) ? target_info.hp : left_hp;
            target_info.left_hp = left_hp; //hp갱신
            //console.log(target);
          }

          if(left_hp == 0)
          {
            if(target_data[0]=='L')
            {
              target_info.label.opacity = 0.3;
              target_info.image = game.assets['img/job_psa1_dead.png'];
              target.tl.rotateBy(-60,30).rotateBy(150,10);
            }
            else if(target_data[0]=='R')
            {
              target_info.label.opacity = 0.3;
              target_info.image = game.assets['img/mon0_psa_dead.png'];
              target.tl.rotateBy(60,30).rotateBy(-150,10);
            }

          }
          //choice
          //xxxxxxxxxxx
          new effect(attacker,target,target_info,damage,role,scode);
          //target_info.gb_value = 0; //빨강 빨강~
          //new Damage(target.x+48,target.y+20,damage);
          //턴종료
          battle_animation_turn++;
          var battle_anim_time;

          battle_animation_isNew = false;
          if(battle_animation_data.length > battle_animation_turn)
          {
            setTimeout(function(isNew){
              battle_animation_isNew = true;
            },800);
            /*
            setInterval(function(){
              socket.emit('request_update',map_name);
            },33);
*/
          }else{
            setTimeout(function(isNew){
              battle_animation_turn = 0;
              battle_ui_pointer.opacity = 1;
              battle_animation_isPlaying = false;
              key_input_ok = true;
              socket.emit('battle_anim_end');
            },500);
          }

        //}
      }
    }

    var show_battle_result = function(){
      // if(!battle_animation_isPlaying && battle_result_isNew)
      // {
      //   alert(battle_result);
      //   battle_result_isNew = false;
      // }
    }

    var game_update = function(){
      if(game_isNew)
      {
          game.rootScene.addChild(NormalScene);

          game_isNew = false;
          //console.log('game_update');
          //console.log('game_update');
      }
    }

    var scene_update = function(){
      if(scene.isNew)
      {
        //console.log('scene_update');
        switch(scene.num){
          case 0:
          game.rootScene.removeChild(BattleScene);
          game.rootScene.addChild(NormalScene);
          break;

          case 1:
          game.rootScene.removeChild(NormalScene);
          game.rootScene.addChild(BattleScene);
          if(myplayer_data.map_name == 'map10') battle_background.image = game.assets['img/battle4.png'];
          else if(myplayer_data.map_name == 'map6') battle_background.image = game.assets['img/battle4.png'];
          else if(myplayer_data.map_name == 'map12') battle_background.image = game.assets['img/battle2.png'];
          break;
        }
      }
    }
    var yesno_update = function(){
      if(yesno_isNew)
      {
        //console.log('yesno_update');
        if(yesno_close)
        {
          yesno_box.opacity = 0;
          yesno_text.opacity = 0;
          yesno_cursor.opacity = 0;
          isYesno = false;
          key_input_ok = true;
          yesno_close = false;
          yesno_isNew = false;
        }else{
          yesno_box.opacity = 1;
          yesno_text.opacity = 1;
          yesno_cursor.opacity = 1;
          isYesno = true;
          if(yesno_choice)
          {
            yesno_cursor.moveTo(80,55);
          }
          else
          {
            yesno_cursor.moveTo(310,55);
          }

          switch(yesno_type){
            case 'party_apply':
              yesno_text.text = yesno_data+'님이랑 합류하시겠습니까?';
            break;
            case 'role_change':
              switch(yesno_data){
                case '1': yesno_text.text = '무녀로 전직하시겠습니까?<br> (레벨 10이상)'; break;
                case '2': yesno_text.text = '법사로 전직하시겠습니까?<br> (레벨 10이상)'; break;
                case '3': yesno_text.text = '탱전사로 전직하시겠습니까?<br> (레벨 10이상)'; break;
                case '4': yesno_text.text = '딜전사로 전직하시겠습니까?<br> (레벨 10이상)'; break;
                case '5': yesno_text.text = '도적으로 전직하시겠습니까?<br> (레벨 10이상)'; break;
              }

            break;
          }


          yesno_isNew = false;
          key_input_ok = false;
        }

      }
    }
    //전투 결과

    //전투 결과
    var battle_finish_update = function(){
      if(battle_finish)
      {
        //console.log('battle_finish');
        if(bgm2 != undefined){
          bgm2.pause();
        }

        console.log(battle_finish_update);
        //청소
        BattleScene.removeChild(battle_ui_result);

        for(var i=0;i<battle_player_info_list.length;i++)
        {
          battle_stage.removeChild(battle_player_list[i]);
          battle_ui_page2.removeChild(battle_player_info_list[i]);
          battle_ui_page2.removeChild(battle_player_info_list[i].border);
          battle_ui_page2.removeChild(battle_player_info_list[i].label);
        }
        battle_player_list = []; //청소
        battle_player_info_list = []; //청소
        for(var i=0;i<battle_mon_list.length;i++)
        {
          battle_stage.removeChild(battle_mon_list[i]);
          battle_ui_page2.removeChild(battle_mon_info_list[i]);
          battle_ui_page2.removeChild(battle_mon_info_list[i].border);
          battle_ui_page2.removeChild(battle_mon_info_list[i].label);
        }
        battle_mon_list = []; //청소
        battle_mon_info_list = []; //청소

        battle_ui_page.removeChild(battle_ui_page0);
        battle_ui_page.removeChild(battle_ui_page1);
        battle_ui_page.removeChild(battle_ui_page2);

        for(var i=0;i<battle_result_player_list.length;i++)
        {
          battle_ui_result.removeChild(battle_result_player_list[i]);
          battle_ui_result.removeChild(battle_result_player_list[i].label);
          battle_ui_result.removeChild(battle_result_player_list[i].label2);
        }
        battle_result_player_list = []; //청소

        for(var i=0;i<4;i++)
        {
          if(battle_data.Lslot[i] == -1) break;
          var brd = battle_result_data;
            new Battle_Result_Player(i,battle_data.Lslot[i],brd.gold,brd.exp);
        }

        for(var i=0;i<battle_result_drop_list.length;i++)
        {
          battle_ui_result.removeChild(battle_result_drop_list[i].border);
          battle_ui_result.removeChild(battle_result_drop_list[i]);
          battle_ui_result.removeChild(battle_result_drop_list[i].label);
        }
        battle_result_drop_list = [];



        //청소끗


        battle_result_isOpen = false;
        battle_finish = false;

        scene.num = 0;
        scene.isNew = true;
        key_input_ok = true;

        socket.emit('ui_chan',ui.now_name);
      }
    }

    var battle_result_update = function(){
      if(!battle_animation_isPlaying && battle_result_isNew)
      {
        //console.log('battle_result_update');
        if(battle_result == 'L_WIN')
        {
          for(var i=0;i<battle_result_player_list.length;i++)
          {
            battle_ui_result.removeChild(battle_result_player_list[i]);
            battle_ui_result.removeChild(battle_result_player_list[i].label);
            battle_ui_result.removeChild(battle_result_player_list[i].label2);
          }
          battle_result_player_list = []; //청소

          for(var i=0;i<4;i++)
          {
            if(battle_data.Lslot[i] == -1) break;
            var brd = battle_result_data[i];
              new Battle_Result_Player(i,battle_data.Lslot[i],brd.gold,brd.exp);
          }

          for(var i=0;i<battle_result_drop_list.length;i++)
          {
            battle_ui_result.removeChild(battle_result_drop_list[i].border);
            battle_ui_result.removeChild(battle_result_drop_list[i]);
            battle_ui_result.removeChild(battle_result_drop_list[i].label);
          }
          battle_result_drop_list = [];
          // console.log('battle_result_data.length');
          // console.log('battle_result_data.item_list.length');
          // console.log(battle_result_data.length);
          // console.log(battle_result_data.item_list.length);
          for(var i=0;i<battle_result_data.length;i++)
          {
            if(battle_result_data[i] == -1) break;
            console.log('i = '+i);
            console.log(battle_result_data[i].item_list);
            for(var j=0;j<battle_result_data[i].item_list.length;j++)
            {
              var token = battle_result_data[i].item_list[j].split('#');
              var code = parseInt(token[0]);
              var count = parseInt(token[1]);
              new Drop_Goods(i,j,code,count);
            }
          }
          battle_ui_result_bg.frame = 0;
        }else if(battle_result == 'R_WIN'){
          for(var i=0;i<battle_result_player_list.length;i++)
          {
            battle_ui_result.removeChild(battle_result_player_list[i]);
            battle_ui_result.removeChild(battle_result_player_list[i].label);
            battle_ui_result.removeChild(battle_result_player_list[i].label2);
          }
          battle_result_player_list = []; //청소
          battle_ui_result_bg.frame = 1;
        }
        BattleScene.addChild(battle_ui_result);

        //alert(battle_result);
        battle_result_isOpen = true;
        battle_result_isNew = false;
      }
    }

    //파티인포
    var party_info_update = function(){
      //삭제
      if(!party_info_isNew) return;
      //console.log('party_info_update');
      for(var i=0;i<party_info_list.length;i++)
      {
        ui_party_info.removeChild(party_info_list[i]);
        ui_party_info.removeChild(party_info_list[i].border);
        ui_party_info.removeChild(party_info_list[i].label);
      }
      party_info_list = []; //청소


      //LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
      if(party_info_data.length == 0) ui_status.removeChild(ui_party_info);
      else ui_status.addChild(ui_party_info);
      for(var i=0;i<party_info_data.length;i++)
      {
        new Party_Info(i,party_info_data[i]);
      }
      party_info_isNew = false;
    }


    //전투 몬스터 업데이트
    var battle_update = function(){
      //삭제
      if(!battle_data.isNew) return;
      //console.log('battle_update');
      if(bgm != undefined){
        bgm.pause();
      }
      //alert("여기서 테스트한다;");
      bgm2 = new Audio('img/bat.mp3');
      bgm2.loop = true;
      bgm2.volume = 0.4;
      bgm2.play();
      console.log(bgm2);
      //console.log('battle_data');
      for(var i=0;i<battle_player_info_list.length;i++)
      {
        battle_stage.removeChild(battle_player_list[i]);
        battle_ui_page2.removeChild(battle_player_info_list[i]);
        battle_ui_page2.removeChild(battle_player_info_list[i].border);
        battle_ui_page2.removeChild(battle_player_info_list[i].label);
      }
      battle_player_list = []; //청소
      battle_player_info_list = []; //청소
      for(var i=0;i<battle_mon_list.length;i++)
      {
        battle_stage.removeChild(battle_mon_list[i]);
        battle_ui_page2.removeChild(battle_mon_info_list[i]);
        battle_ui_page2.removeChild(battle_mon_info_list[i].border);
        battle_ui_page2.removeChild(battle_mon_info_list[i].label);
      }
      battle_mon_list = []; //청소
      battle_mon_info_list = []; //청소
      for(var i=0;i<skill_select_list.length;i++)
      {
        battle_ui_page1_skill_list.removeChild(skill_select_list[i]);
        battle_ui_page1_skill_list.removeChild(skill_select_list[i].label);
      }
      skill_select_list = [];
      // console.log('battle_player_info_list.length + '+battle_player_info_list.length);
      // console.log('battle_mon_info_list.length + '+battle_mon_info_list.length);

      //LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
      for(var i=0;i<4;i++)
      {
        if(battle_data.Lslot[i] == -1) break;

        var token = battle_data.Lslot[i].split('#');
        if(token[0] == 'player')
        {
          new Battle_Player(parseInt(token[2]),i);
          new Battle_Player_Info(i,battle_data.Lslot[i]);
        }
        else if(token[0] == 'monster')
        {
          var mon = monster_data[parseInt(token[1])];

          var a = new Battle_Monster(mon.code,i);
          var b = new Battle_Monster_Info(i,mon.code,token[2]);
        }
      }
      //RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
      for(var i=0;i<4;i++)
      {
        if(battle_data.Rslot[i] == -1) { battle_data.isNew = false; break; }

        var token = battle_data.Rslot[i].split('#');
        if(token[0] == 'player')
        {
          new Battle_Player(parseInt(token[2]),i);
          new Battle_Player_Info(i,battle_data.Rslot[i]);
        }
        else if(token[0] == 'monster')
        {
          var mon = monster_data[parseInt(token[1])];
          var a = new Battle_Monster(mon.code,i);
          var b = new Battle_Monster_Info(i,mon.code,token[2]);
          // if(token[3] == 'dead') a.frame = -1;
        }
      }

      //스킬 셀렉트 갱신
      var my = myplayer_data;
      // console.log('my.skill_list');
      // console.log(my.skill_list);
      // console.log('my.skill_list.length');
      // console.log(my.skill_list.length);
      for(var i=0;i<my.skill_list.length;i++)
      {
          new Skill_Select(i,my.skill_list[i]);
      }

      battle_data.isNew = false;
    }
    //전투 ui 업데이트
    var battle_ui_update = function(){
      // console.log('battle_ui_data.isNew : '+ battle_ui_data);
      if(!battle_ui_data.isNew) return;
      //console.log('battle_ui_update');
      var token = battle_ui_data.data.split('#');

      switch(token[0])
      {
        case 'page0':
          battle_ui_page.addChild(battle_ui_page0);
          battle_ui_page.removeChild(battle_ui_page1);
          battle_ui_page.removeChild(battle_ui_page2);
          battle_ui_page.removeChild(battle_ui_page3);
          var num = parseInt(token[1]);
          var x; var y;

          if(num < 2) y = 26; else y = 26+120;
          if(num % 2 == 0) x = 30; else x = 30+480;

          battle_ui_pointer.opacity = 1;
          battle_ui_pointer.scaleX = 1;
          battle_ui_pointer.scaleY = 1;
          battle_ui_pointer.moveTo(x,400+y);
        break;

        case 'page1':
          battle_ui_page.removeChild(battle_ui_page0);
          battle_ui_page.addChild(battle_ui_page1);
          battle_ui_page.removeChild(battle_ui_page2);
          battle_ui_page.removeChild(battle_ui_page3);
          var num = parseInt(token[1]);
          var y = num*48;

          battle_ui_pointer.opacity = 1;
          battle_ui_pointer.scaleX = 0.5;
          battle_ui_pointer.scaleY = 0.5;
          battle_ui_pointer.moveTo(80,120+y);

          var skill = skill_data[myplayer_data.skill_list[num]];
          var text = ui_status_skill_info_text(skill);
          battle_ui_skill_list_info_text.text=  text;
        break;

        case 'page2':
          battle_ui_page.removeChild(battle_ui_page0);
          battle_ui_page.removeChild(battle_ui_page1);
          battle_ui_page.addChild(battle_ui_page2);
          battle_ui_page.removeChild(battle_ui_page3);
          var num = parseInt(token[1]);

          y =  (parseInt(num / 2)*48)+36-16;
          if(num % 2 == 0) x = 80-56; else x = 550-56;

          battle_ui_pointer.opacity = 1;
          battle_ui_pointer.scaleX = 0.5;
          battle_ui_pointer.scaleY = 0.5;
          battle_ui_pointer.moveTo(x,400+y);
        break;
        case 'page3':
          battle_ui_page.removeChild(battle_ui_page0);
          battle_ui_page.removeChild(battle_ui_page1);
          battle_ui_page.removeChild(battle_ui_page2);
          battle_ui_page.addChild(battle_ui_page3);

          battle_ui_pointer.opacity = 0;
        break;

      }

      battle_ui_data.isNew = false;
    }


    //업데이트 함수
    var player_update = function(){
      //삭제
      if(!player_data.isNew) return;
      //console.log('player_update');
      var diff =  player_data.length - player_list.length;
     

      while(diff != 0){
          if(diff > 0) //data가 더 크면
          {
            new Player();
            diff--;
          }else {
            var player = player_list[player_list.length-1];
            player.delete();
            diff++;
          }
      }
      //업데이트
      for(var i=0;i<player_list.length;i++)
      {
        if(player_data[i].name == myname)
        {
          myplayer_data = player_data[i];
        }
        var pData = player_data[i];
        var px = pData.x - view.x;
        var py = pData.y - view.y;
        player_list[i].Set(pData.name,px,py,pData.frame);
      }
      //console.log('player_list 갱신');
      //debugLabel.text = 'player_data.length : '+player_data.length;
      //debugLabel.text += '<br>player_list.length : '+player_list.length;
      player_data.isNew = false;
    }

    var npc_update = function(){
      //삭제
      if(!npc_list.isNew) return;
      //console.log('npc_update');
      
      for(var i=0;i<npc_list.length;i++)
      {
        stage.removeChild(npc_list[i]);
      }
      npc_list_clear();

      //업데이트
      for(var i=0;i<npc_data.length;i++)
      {
        var nData = npc_data[i];
        var nx = nData.x - view.x;
        var ny = nData.y - view.y;
        var npc = new Npc(nData.name,nx,ny,nData.frame);
      }
      //console.log('player_list 갱신');
      //debugLabel.text = 'player_data.length : '+player_data.length;
      //debugLabel.text += '<br>player_list.length : '+player_list.length;
    }
    var chat_update = function(){
      //chat_data_clear();
      if(chat_list.isNew)
      {
        //console.log('chat_update');
        $('#chatarea').append(chat_list[chat_list.length-1]);
        chat_list.isNew = false;
      }
    }
    var map_update = function(){
      if(map_data.isNew)
      {
        console.log(map);
        //console.log('map_update');
        map.image = game.assets[map_data.img_src];
        formap.image = game.assets[map_data.img_src];
        //console.log('map_data.img_src = '+map_data.img_src);
        //alert(map_data.data);
       // game.assets['img/m4.mp3'].stop();
        map.loadData(map_data.data[0],map_data.data[1]);
        formap.loadData(map_data.data[2]);

        ui_map_name_label.text = map_data.map_name;
        map_data.isNew = false;
        //console.log('map_data 갱신');
      }
    }

    var mapsong_update = function(){
      
      if(map_data.isNew){
        //console.log('mapsong_update');
        var song = map_data.song_src;
      if(bgm!= undefined && song == 'img/m3.mp3' && ccc==1)return;
      if(bgm != undefined)
       {
          bgm.pause();
       }
       bgm = new Audio(song); bgm.loop = true; bgm.volume = 0.3;
       bgm.play();
       if(song=='img/m3.mp3') {ccc=1;}else{ccc=0;}
       console.log(bgm); 
      }
    }
    var view_update = function(){
      if(view.isNew)
      {
        map.x = formap.x = -view.x;
        map.y = formap.y = -view.y;
        //console.log('view_update');
        view.isNew = false;
      }
    }
    var ui_update = function(){
      if(ui.isNew)
      {
        //console.log('ui_update');
        console.log(inventory_list);
        ui_grp.removeChild(eval(ui.prev_name));
        var my = myplayer_data;

        switch(ui.now_name)
        {
          case 'ui_status':
            ui_status_psa.frame = my.role-1;
            var abil = ui_status_abil_text();
            var abil2 = ui_status_abil2_text();
            ui_status_abil.text = abil;
            ui_status_abil2.text = abil2;
            ui_status_hp.width = (my.hp/my.ability.hp)*128;
            ui_status_mp.width = (my.mp/my.ability.mp)*128;
            ui_status_exp.width = (my.exp/max_exp[my.level-1])*128;
            ui_status_hp_text.text = my.hp+'/'+my.ability.hp;
            ui_status_mp_text.text = my.mp+'/'+my.ability.mp;
            ui_status_exp_text.text = my.exp+'/'+max_exp[my.level-1];
            //console.log(myplayer_data);
          break;

          case 'ui_equip':
            //장비 갱신
            ui_equip_equip_weapon_sprite.frame = my.equipment.weapon;
            ui_equip_equip_head_sprite.frame = my.equipment.head;
            ui_equip_equip_top_sprite.frame = my.equipment.top;
            ui_equip_equip_bottom_sprite.frame = my.equipment.bottom;
            ui_equip_equip_glove_sprite.frame = my.equipment.glove;
            ui_equip_equip_shoes_sprite.frame = my.equipment.shoes;
            ui_equip_equip_ring_sprite.frame = my.equipment.ring;

            for(var i=0;i<inventory_list.length;i++)
            {
              ui_equip.removeChild(inventory_list[i].num_text);
              ui_equip.removeChild(inventory_list[i].border);
              ui_equip.removeChild(inventory_list[i]);
            }
            inventory_list_clear();
            //다밀고

            //다시생성
            for(var i=0;i<my.inventory.storage.length;i++)
            {
              var item = my.inventory.storage[i];
              new Item(Math.floor(i/6),i%6,item+'','임시','item.desc');
            }
            ui_equip_gold_text.text = '골드 : '+my.inventory.gold+'G';

          break;
          case 'ui_skill':
            for(var i=0;i<skill_tree_list.length;i++)
            {
              ui_skill.removeChild(skill_tree_list[i]);
            }
            skill_tree_list = [];

            for(var i=0;i<my.skill_tree.length;i++)
            {
              if(my.skill_tree[i] != -1) new Skill_Tree(i,my.role,my.skill_tree[i]);
            }

            ui_skill_sp.text = '스킬포인트 : '+my.skill_point;
          break;
        }
        ui_grp.addChild(eval(ui.now_name));
        ui.isNew = false;
      }
    };
    var say_update = function(){
      if(say.closeOk)
      {
        textbox_text.text = '';
        textbox_text.opacity = 0;
        textbox_box.opacity = 0;
        say.closeOk = false;
        return;
      }
      if(say.isNew)
      {
        //console.log('say_update');
        textbox_text.text = say.text[say.page++];
        textbox_text.opacity = 1;
        textbox_box.opacity = 1;
        say.isNew = false;
      }
    };
    var shop_update = function(){
      if(shop.closeOk)
      {
        for(var i=0;i<shop_list.length;i++)
        {
          shop_ui.removeChild(shop_list[i].label);
          shop_ui.removeChild(shop_list[i].border);
          shop_ui.removeChild(shop_list[i]);
        }
        shop_list = [];
        shop_choice.opacity = 0;
        shop_box.opacity = 0;
        shop_board.opacity = 0;
        shop_text.opacity = 0;
        shop.closeOk = false;
        return;
      }
      if(shop.isNew)
      {
        //console.log('shop_update');
        for(var i=0;i<shop_list.length;i++)
        {
          shop_ui.removeChild(shop_list[i].label);
          shop_ui.removeChild(shop_list[i].border);
          shop_ui.removeChild(shop_list[i]);
        }
        shop_list = [];

        //업데이트
        for(var i=0;i<shop.data.length;i++)
        {
          var item = shop.data[i];
          new Shop_Goods(i,item.code,item.price);
        }
        shop_choice.moveTo(20,(shop.choice+2)*48-8-4);
        shop_choice.opacity = 1;
        shop_box.opacity = 0.9;
        shop_board.opacity = 0.3;
        shop_text.opacity = 1;


        var data = shop.data[shop.choice];
        var item = item_data[data.code];
        //console.log(item);
        var text = ui_status_item_abil_text(item);
        shop_text.text = text;

        shop.isNew = false;

      }
    };

    ui_status_icon.on('touchstart',function(){
      socket.emit('ui_chan','ui_status');
    });
    ui_equip_icon.on('touchstart',function(){
      socket.emit('ui_chan','ui_equip');
    });
    ui_skill_icon.on('touchstart',function(){
      socket.emit('ui_chan','ui_skill');
    });

    game.on('enterframe',function(){
      //if(!gameStart){return;}
      game_update();
      //이동부분


      if(isYesno)
      {
        if(game.input.right)
        {
          yesno_choice = false;
          yesno_isNew = true;
        }
        else if(game.input.left)
        {
          yesno_choice = true;
          yesno_isNew = true;
        }
      }

      if(key_input_ok)
      {
        if(battle_result_isOpen)
        {
          return;
        }

        if(game.input.down)
        {
          socket.emit('key','DOWN');
        }
        else if(game.input.right)
        {
          socket.emit('key','RIGHT');
        }
        else if(game.input.left)
        {
          socket.emit('key','LEFT');
        }
        else if(game.input.up)
        {
          socket.emit('key','UP');
        }
      }
      //myplayer_update();
      scene_update();
      mapsong_update();
      map_update();
      npc_update();
      view_update();
      player_update();
      chat_update();
      shop_update();
      say_update();
      ui_update();
      yesno_update();
      party_info_update();
      

      battle_update();
      battle_ui_update(); 
      battle_animation();
      show_battle_result();
      battle_result_update();
      battle_finish_update();

      //var x = Math.min((game.width  - 16) / 2 - player.x, 0);
      //var y = Math.min((game.height - 16) / 2 - player.y, 0);
      //x = Math.max(game.width,  x + map.width)  - map.width;
      //y = Math.max(game.height, y + map.height) - map.height;

      stage.x = 0;
      stage.y = 0;
    });

    game.onload = function() {
   //   myname = prompt('이름?????');
    myname = player_ability.nickname;
    
    //alert(player_ability);
    //game.assets['img/m4.mp3'].play();
    socket.emit('temp_game_connection',myname,p_abil,extra_abil,player_inven,player_equip,skill_test);

    socket.emit('request_update',map_name);
    setTimeout(function(){
        socket.emit('ui_chan','ui_status');
    },100);


    ui_status_icon.image = game.assets['img/ui_icon.png'];
    ui_equip_icon.image = game.assets['img/ui_icon.png'];
    ui_skill_icon.image = game.assets['img/ui_icon.png'];

    ui_status_psa.image = game.assets['img/job_psa.png'];

    textbox_box.image = game.assets['img/textbox1.png'];
    yesno_box.image = game.assets['img/yesnobox1.png'];
    shop_box.image = game.assets['img/box_shop.png'];
    shop_choice.image = game.assets['img/shop_border.png'];

    yesno_cursor.image = game.assets['img/battle_page_seleted.png'];


    ui_equip_equip_weapon_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_weapon_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_head_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_head_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_top_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_top_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_bottom_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_bottom_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_glove_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_glove_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_shoes_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_shoes_sprite.image = game.assets['img/item0.png'];
    ui_equip_equip_ring_box.image = game.assets['img/equip_box.png'];
    ui_equip_equip_ring_sprite.image = game.assets['img/item0.png'];

    
ui_map_name_box.image = game.assets['img/box_map_name.png'];


    //battle_background.image = game.assets['img/battle0.png'];
    battle_ui_page0_bg.image = game.assets['img/battle_box0.png'];
    battle_ui_page1_bg.image = game.assets['img/battle_box1.png'];
    battle_ui_page2_bg.image = game.assets['img/battle_box2.png'];
    battle_ui_page3_bg.image = game.assets['img/battle_box3.png'];
    battle_ui_pointer.image = game.assets['img/battle_page_seleted.png'];

    battle_ui_result_bg.image = game.assets['img/box_result.png'];

    battle_ui_page1_skill_list_box.image = game.assets['img/box_skill_select.png'];
    };
      //씬 추가
    game.start();
  });
});
