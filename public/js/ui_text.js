
var ui_status_abil_text = function(){
  var my = myplayer_data;
  var abil = '이름 : '+my.name+'<br>';
     abil += '직업 : '+my.job+'<br>';
     abil += '힘     : '+my.ability.str.toFixed(1)+' (+'+my.ability.extra.str+')<br>';
     abil += '재주  : '+my.ability.dex.toFixed(1)+' (+'+my.ability.extra.dex+')<br>';
     abil += '지능  : '+my.ability.int.toFixed(1)+' (+'+my.ability.extra.int+')<br>';
     abil += '생명  : '+my.ability.vtl.toFixed(1)+' (+'+my.ability.extra.vtl+')<br>';
     abil += '민첩  : '+my.ability.agi.toFixed(1)+' (+'+my.ability.extra.agi+')<br>';
  return abil;
};

var ui_status_abil2_text = function(){
  var my = myplayer_data;
  var abil2 = '레벨 : '+my.level+'<br>';
     abil2 += ' <br>';
     abil2 += '공격력  : '+my.ability.ad+' (+'+my.ability.extra.ad+')<br>';
     abil2 += '마력     : '+my.ability.ap+' (+'+my.ability.extra.ap+')<br>';
     abil2 += '방어력  : '+my.ability.dad+' (+'+my.ability.extra.dad+')<br>';
     abil2 += '저항력  : '+my.ability.dap+' (+'+my.ability.extra.dap+')<br>';
     abil2 += '회피     : '+my.ability.avoid+' (+'+my.ability.extra.avoid+')<br>';
  return abil2;
};

var ui_status_item_abil_text = function(item){
  var my = myplayer_data;
  var text = item.name + '<br> <br>';
  text += item.desc+'<br> <br>';

if(item.role != 0) return text; //장비아니면

var text = item.name +'    레벨 제한 : '+item.level+'<br> <br>';
  text += item.desc+'<br> <br>';
  
  if(item.ability.str != 0) text += '힘 + '+item.ability.str+'<br>';
  if(item.ability.dex != 0) text += '재주 + '+item.ability.dex+'<br>';
  if(item.ability.int != 0) text += '지능 + '+item.ability.int+'<br>';
  if(item.ability.vtl != 0) text += '생명 + '+item.ability.vtl+'<br>';
  if(item.ability.agi != 0) text += '민첩 + '+item.ability.agi+'<br>';

  if(item.ability.ad != 0) text += '공격력 + '+item.ability.ad+'<br>';
  if(item.ability.ap != 0) text += '마력 + '+item.ability.ap+'<br>';
  if(item.ability.dad != 0) text += '방어력 + '+item.ability.dad+'<br>';
  if(item.ability.dap != 0) text += '저항력 + '+item.ability.dap+'<br>';
  if(item.ability.avoid != 0) text += '회피 + '+item.ability.avoid+'<br>';

  if(item.ability.hp < 0)       text += 'hp - '+(-item.ability.hp)+'<br>';
  else if(item.ability.hp != 0) text += 'hp + '+item.ability.hp+'<br>';
  if(item.ability.mp < 0)       text += 'mp - '+(-item.ability.mp)+'<br>';
  else if(item.ability.mp != 0) text += 'mp + '+item.ability.mp+'<br>';

  return text;
};


var ui_status_skill_info_text = function(skill){

  var text = skill.name +'<br> <br>';
  text += skill.desc+'<br> <br>';

  if(skill.ad_or_ap == -1) text += '회복<br>';
  else if(skill.ad_or_ap == 0) text += '물리공격 <br>';
  else text += '마법공격 <br>';

  var ad = skill.ad_factor.split('#');
  var ap = skill.ap_factor.split('#');
  ad[0] = parseFloat(ad[0]);
  ad[1] = parseInt(ad[1]);
  ap[0] = parseFloat(ap[0]);
  ap[1] = parseInt(ap[1]);
  if(ad[0] != 0) {
    text += '물리공격력 '+(ad[0]*100)+'%';
    if(ad[1] != 0) text += '+'+ad[1]+'<br>';
    else if(ad[1] == 0) text+= '<br>';
  }


  if(ap[0] != 0) {
    text += '마법공격력 '+(ap[0]*100)+'%';
    if(ap[1] != 0) text += '+'+ap[1]+'<br>';
    else if(ap[1] == 0) text+= '<br>';
  }


  if(skill.need_mp != 0) text += '소모마나 : '+(skill.need_mp)+'<br>';
  if(skill.need_point != 0) text += '필요 스킬포인트 : '+(skill.need_point)+'<br>';

  return text;
};
