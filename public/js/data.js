var myname = '';
var skill_test = [];

var myplayer_data = {};
myplayer_data.isNew = false;

var item_data = [];
var monster_data = [];
var max_exp = [];

var scene = {};
scene.num = 0;
scene.isNew = false;
console.log(scene);

var key_input_ok = true;

var isYesno = false;
var yesno_choice = true;
var yesno_isNew = false;
var yesno_question= '';
var yesno_close = false;

var party_info_data = [];
var party_info_isNew = false;
var party_info_list = [];

var shop = {};
var shop_list = [];
shop.data = [];
shop.isNew = false;
shop.closeOk = false;
shop.choice = 0;

var player_data = [];
var player_list = [];
var player_list_clear = function(){
  player_list.splice(0,player_list.length);
};
var player_list_delete = function(i){
  player_list.splice(i,1);
};
player_data.isNew = false;

var ui_now_skill = -1;

var skill_data = [];

var skill_tree_list = [];
var skill_select_list = [];

var battle_data = {};
var battle_ui_data = {};
var battle_player_list = [];
var battle_player_info_list = [];
var battle_mon_list = [];
var battle_mon_info_list = [];
battle_data.isNew = false;
battle_ui_data.isNew = false;

var battle_animation_data = [];
var battle_animation_isNew = false;
var battle_animation_turn = 0;
var battle_animation_isPlaying = false;

var battle_result = 0;
var battle_result_data = 0;
var battle_result_isNew = false;
var battle_result_drop_list = new Array();
var battle_result_player_list = new Array();
var battle_result_isOpen = false;

var battle_finish = false;

var npc_data = [];
var npc_list = [];
var npc_list_clear = function(){
  npc_list.splice(0,npc_list.length);
};
npc_list.isNew = false;

var chat_list = [];
chat_list.isNew = false;
var chat_list_clear = function(){
  chat_list = [];
};

var map_data = {};
map_data.isNew = false;
var map_data_clear = function(){
  map_data = {};
};
var map_name = '';

var game_isNew = true;
var gameStart = true;

var view = {};
view.isNew = false;

var ui = {};
ui.prev_name = 'ui_status';
ui.now_name = 'ui_status';
ui.isNew = false;
console.log(ui);
//var now_name = 'ui_status';

var say = {};
say.text = '';
say.page = 0;
say.isNew = false;
say.closeOk = false;

var inventory_list = [];
var inventory_list_clear = function(){
  inventory_list.splice(0,inventory_list.length);
};
inventory_list.isNew = false;



var player_ability = {};
var p_abil = {};
var extra_abil = {};
var player_inven = [];
var player_equip = {};
var bgm;
var bgm2;
var ccc= 0;
