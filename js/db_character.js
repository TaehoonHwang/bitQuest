
var mysql = require('mysql');


var client = mysql.createConnection({
  user: 'bit',
  password: '1234',
  database: 'bit_db'
});

module.exports.save_player = function(player,id){
	var d = new Date();
	var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() +" " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	if(id != null){
		console.log('나('+id+') 를찾았다 접속종료하겠다.');
	client.query('insert into log_list (msg,date) values (?,?)',[id +'님 접속해제',strDate]);}


	if(player !=null){
		client.query('update chara set level=?,job_id = ?,gold=?,hp=?,mp=?,exp=?,x=?,y=?,map =?,spoint = ? where name = ?',
		[
			player.level,
			player.role,
			player.inventory.gold,
			player.hp,
			player.mp,
			player.exp,
			player.x,
			player.y,
			player.map_name,
			player.skill_point,
			player.name
		]);

		client.query('update chara_equip set weapon=?,armor=?,shose=?,ring=?,head=?,glove=?,bottom=? where cid = ?',
		[
			player.equipment.weapon,
			player.equipment.top,
			player.equipment.shoes,
			player.equipment.ring,
			player.equipment.head,
			player.equipment.glove,
			player.equipment.bottom,
			player.cid
		]);

		client.query('delete from inven where cid = ?',[player.cid]);


		for(var i=0;i<30;i++){
			if(player.inventory.storage[i] != -1){
				//console.log(player.inventory.storage[i]);
				client.query('insert into inven (cid,code) values (?,?)',
				[
				 	player.cid,player.inventory.storage[i]
				]);
			}
		}

		var aaa='';
		for(var i=0;i<player.skill_tree.length;i++){
			aaa += player.skill_tree[i] + '/';
		}	
		console.log("asdnasd,bns,mzxcbnv.mnzxc./v");
		console.log(player.cid);
		console.log(player.skill_tree);

		client.query('update chara_skill set code =? where cid = ?',
		[
			aaa,player.cid
		]);
		
	}

};
module.exports.nickname_check_id = function(socket,nickname){
	 client.query('select name from chara where name = ?',
	[
		nickname
	],function(error,results){
		if(results[0]) //있니
        {
            console.log(nickname+'중복입니당');
            socket.emit('pack_nickname_check_id',false);
        }else{    //없음 ㅋ
            console.log(nickname+'중복아닙니당');
            socket.emit('pack_nickname_check_id',true);
        }
	});

};
module.exports.delete_check_id = function(socket,id,nickname,charNumber){

	client.query('select chara1,chara2,chara3 from account where userid = ?',
	[
		id
	],function(error,result){
		 if(charNumber==1){
			 client.query('select name from chara where cid = ?',
		 	[
		 		result[0].chara1
		 	],function(error,result1){
		 		if(result1[0]){
			 		if(result1[0].name ==nickname){
			 			console.log('삭제가능 합니다');
			 			socket.emit('pack_delete_check_id',true);
			 		}
			 		else{
			 			console.log('삭제 가능하지 않습니다');
			 			socket.emit('pack_delete_check_id',false);
			 		}
		 		}
		 	});
		}
		else if(charNumber==2){
			client.query('select name from chara where cid = ?',
		 	[
		 		result[0].chara2
		 	],function(error,result1){
		 		if(result1[0]){
			 		if(result1[0].name ==nickname){
			 			console.log('삭제가능 합니다');
			 			socket.emit('pack_delete_check_id',true);
			 		}
			 		else{
			 			console.log('삭제 가능하지 않습니다');
			 			socket.emit('pack_delete_check_id',false);
			 		}
		 		}
		 	});
		}
		else{
			client.query('select name from chara where cid = ?',
		 	[
		 		result[0].chara3
		 	],function(error,result1){
		 		if(result1[0]){
			 		if(result1[0].name ==nickname){
			 			console.log('삭제가능 합니다');
			 			socket.emit('pack_delete_check_id',true);
			 		}
			 		else{
			 			console.log('삭제 가능하지 않습니다');
			 			socket.emit('pack_delete_check_id',false);
			 		}
		 		}
		 	});
		}
	});
};

module.exports.chara_create = function(socket,nickname,charNumber,id,date){
    console.log('\u001b[32m','- chara_create -','\u001b[0m');


   	client.query('INSERT INTO chara (job_id,name,level,gold,hp,mp,exp,x,y,map,spoint) values (?,?,?,?,?,?,?,?,?,?,?)',
   	[
   		1,nickname,1,1,100,10,0,256,160,'map1',1
   	]);

   	client.query('select cid from chara where name = ?',
	[
		nickname
	],function(error,result){

		if(charNumber==1){
			client.query('update account set chara1 = ? where userid = ?',
			[
				result[0].cid,id
			]);
		}
		else if(charNumber==2){
			client.query('update account set chara2 = ? where userid = ?',
			[
				result[0].cid,id
			]);
		}
		else{
			client.query('update account set chara3 = ? where userid = ?',
			[
				result[0].cid,id
			]);
		}

		client.query('insert into chara_equip (cid,weapon,armor,shose,ring,head,glove,bottom) values (?,?,?,?,?,?,?,?)',
		[
			result[0].cid,-1,-1,-1,-1,-1,-1,-1
		]);

		client.query('insert into inven (cid,code,role) values (?,?,?)',
		[
			result[0].cid,1,1
		]);

		client.query('insert into chara_skill (cid,code) values (?,?)',
		[
			result[0].cid,'-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/0/0/3#2/0/4#2/-1/-1/-1/-1/-1/2#2/0/0/-1/-1/-1/-1/-1/-1/-1/-1/-1/5#2/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/'
		]);

	});
};


module.exports.chara_data_check = function(socket,id,charNumber){
	 console.log('\u001b[32m','- chara_data_check -','\u001b[0m');
	 if(charNumber==1){
	 client.query('select chara1 from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){
	 		console.log(result[0].chara1);
	 		if(result[0].chara1 != null){
	 			//false >> 삭제랑 게임시작 기준 생성 ,null
	 			console.log("생성할수 없습니다");
	 			socket.emit('pack_chara_data_check',false);
	 		}
	 		else{
	 			console.log("생성가능");
	 			socket.emit('pack_chara_data_check',true);
	 		}
	 	});

	}
	else if(charNumber==2){
	 client.query('select chara2 from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){
	 		console.log(result[0].chara2);
	 		if(result[0].chara2 != null){
	 			//false >> 삭제랑 게임시작 기준 생성 ,null
	 			console.log("생성할수 없습니다");
	 			socket.emit('pack_chara_data_check',false);
	 		}
	 		else{
	 			console.log("생성가능");
	 			socket.emit('pack_chara_data_check',true);
	 		}
	 	});

	}
	else{
	 client.query('select chara3 from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){
	 		console.log(result[0].chara3);
	 		if(result[0].chara3 != null){
	 			//false >> 삭제랑 게임시작 기준 생성 ,null
	 			console.log("생성할수 없습니다");
	 			socket.emit('pack_chara_data_check',false);
	 		}
	 		else{
	 			console.log("생성가능");
	 			socket.emit('pack_chara_data_check',true);
	 		}
	 	});

	}

};
//캐릭터 능력치 보여주는 소켓
module.exports.chara_ability_check = function(socket,id,charNumber){
	 console.log('\u001b[32m','- chara_ability_check -','\u001b[0m');

	 var data = [];
	var abil = [0,0,0,0,0,0,0,0,0,0,0,0];
	var inven = [];

	if(charNumber==1){
		

		 client.query('select * from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){
	 		client.query('select * from chara where cid = ?',
			[
				result[0].chara1
			],function(error,result1){
				if(result1[0]){
					data.push(result1[0].job_id,result1[0].name,result1[0].level);
					client.query('select * from job where jid = ?',
					[
						result1[0].job_id
					],function(error,result2){
						//db에서 모든정보를 가지고온다
						if(result2[0]){
							data.push(result2[0].jname,result2[0].str,result2[0].dex,
									  result2[0].intell,result2[0].vlt,result2[0].agi,
									  result1[0].gold,			
									  result1[0].exp,result1[0].hp,result1[0].mp,result1[0].x,result1[0].y,result[0].chara1,result1[0].map,result1[0].spoint
									  );
							//캐릭터 장비착용의 여부 확인
							client.query('select * from chara_equip where cid = ?',
							[
								result[0].chara1
							],function(error,result3){
								//장비부위에 따른 능력치
								if(result3[0].weapon != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].weapon
										],function(error,result4){
											if(result4 != null){
												abil = [result4[0].str,result4[0].dex,result4[0].intell,
														result4[0].vlt,result4[0].agi,result4[0].dam,result4[0].def,result4[0].mag
														,result4[0].mdef,result4[0].avoid,result4[0].hp,result4[0].mp];
														socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].armor != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].armor
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].shose != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].shose
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].ring != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].ring
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].head != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].head
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].glove != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].glove
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}

									if(result3[0].bottom != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].bottom
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
				 								socket.emit('pack_chara_ability_check',data,abil);
				 							}
										});	
									}
									else{
										socket.emit('pack_chara_ability_check',data,abil);
									}
								
							});	
						}

						client.query('select * from inven where cid = ?',
						[
							result[0].chara1
						],function(error,result4){
							for(var i=0;i<30;i++){
								//onsole.log(result4[i]);
								if(result4[i] != null){

									inven.push(result4[i].code);
								}
								else{
									
									inven.push('-1');
								}
							}
							socket.emit('pack_chara_inven_check',inven);
						});

						client.query('select * from equip_list',
							[

							],function(error,result5){
								
								for(var i=0;i<result5.length;i++){
									var item = {};
									item.code = result5[i].code;
								item.role = result5[i].role;
							    item.part = result5[i].part;
							    item.name = result5[i].ename;
							    item.desc = result5[i].description;
							    item.level = result5[i].level;
							    //능력치
							    item.ability = {};
							    item.ability.str = result5[i].str;
							    item.ability.dex = result5[i].dex;
							    item.ability.int = result5[i].intell;
							    item.ability.vtl = result5[i].vlt;
							    item.ability.agi = result5[i].agi;
							    item.ability.ad = result5[i].dam;
							    item.ability.dad = result5[i].def;
							    item.ability.ap = result5[i].mag;
							    item.ability.dap = result5[i].mdef;
							    item.ability.avoid = result5[i].avoid;
							    item.ability.hp = result5[i].hp;
							    item.ability.mp = result5[i].mp;

							    item_data.push(item);
							  }
							  socket.emit('pack_all_item_check',item_data);
						});
						
						client.query('select * from monster_list',
						[
						],function(error,result6){
							for(var i=0;i<result6.length;i++){
								var monster = {};
								monster.class = 'monster';
								monster.code = result6[i].code;
								monster.role = result6[i].role;
								monster.name = result6[i].mname;

								monster.ability = {};
								monster.ability.ad = result6[i].ad;
								monster.ability.dad = result6[i].dad;
								monster.ability.ap = result6[i].ap;
								monster.ability.dap = result6[i].dap;
								monster.ability.avoid = result6[i].avoid;
								monster.ability.hp = result6[i].hp;
								monster.ability.mp = result6[i].mp;
								monster.speed = result6[i].speed;

								monster.minExp = result6[i].minexp;
							    monster.maxExp = result6[i].maxexp;
							    monster.minGold = result6[i].mingold;
							    monster.maxGold = result6[i].maxgold;

							    monster.drop_table = [];
							    switch(result6[i].code)
							    {
							    	//드랍테이블 토큰 코드#확률#최소드랍수#최대드랍수
							    	case 2: monster.drop_table.push('12@1@1@1'); break;
							    	case 3: monster.drop_table.push('3@1@1@1');
							    			monster.drop_table.push('5@1@1@1');
							    			monster.drop_table.push('4@1@1@1'); break;
							    	case 5: monster.drop_table.push('18@30@1@3'); break;
							    	case 6: monster.drop_table.push('19@30@1@3'); break;
							    	case 7: monster.drop_table.push('11@1@1@1'); break;
							    	case 8: monster.drop_table.push('17@30@1@3'); break;
									
							    }
								monster_data.push(monster);
								
							}			
							socket.emit('pack_monster_check',monster_data);
						});
					
						client.query('select * from chara_equip where cid = ?',
						[
							result[0].chara1
						],function(error,result6){
							 socket.emit('pack_chara_equip',result6[0]);
						});

						client.query('select * from skill_list',
						[
						],function(error,result7){
							for(var i=0;i<result7.length;i++){
								var skill = {};
								skill.code = result7[i].code;
								skill.role = result7[i].role;
								skill.name = result7[i].name;
								skill.desc = result7[i].description;

								skill.ad_or_ap = result7[i].ad_or_ap;
								skill.ad_factor = result7[i].adf;
								skill.ap_factor = result7[i].apf;

								skill.need_mp = result7[i].need_mp;
								skill.need_point = result7[i].need_point;

								skill_data.push(skill);
							}
							socket.emit('pack_all_skill',skill_data);
						});

						client.query('select * from exp_list',
						[
						],function(error,result8){
							
							for(var i=0;i<result8.length;i++){
								max_exp.push(result8[i].max_exp);
							}
							socket.emit('pack_max_exp',max_exp);
						});

						client.query('select code from chara_skill where cid = ?',
						[
							result[0].chara1
						],function(error,result9){
							var skill_test = [];
							skill_test = result9[0].code;
							socket.emit('pack_skill',skill_test);
							//console.log(skill_test);

						});

					});
				}
				else{
					socket.emit('pack_chara_ability_check',false,false);
				}
			});

	 	});
	}
	else if(charNumber==2){
		  client.query('select * from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){

	 		client.query('select * from chara where cid = ?',
			[
				result[0].chara2
			],function(error,result1){
				if(result1[0]){

					

					data.push(result1[0].job_id,result1[0].name,result1[0].level);

					client.query('select * from job where jid = ?',
					[
						result1[0].job_id
					],function(error,result2){
						if(result2[0]){
							data.push(result2[0].jname,result2[0].str,result2[0].dex,
									  result2[0].intell,result2[0].vlt,result2[0].agi,
									  result1[0].gold,			
									  result1[0].exp,result1[0].hp,result1[0].mp,result1[0].x,result1[0].y,result[0].chara2,result1[0].map,result1[0].spoint
									  );
							client.query('select * from chara_equip where cid = ?',
							[
								result[0].chara2
							],function(error,result3){

				
								if(result3[0].weapon != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].weapon
										],function(error,result4){
											if(result4 != null){
												abil = [result4[0].str,result4[0].dex,result4[0].intell,
														result4[0].vlt,result4[0].agi,result4[0].dam,result4[0].def,result4[0].mag
														,result4[0].mdef,result4[0].avoid,result4[0].hp,result4[0].mp];
														socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].armor != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].armor
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].shose != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].shose
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].ring != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].ring
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].head != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].head
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].glove != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].glove
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}

									if(result3[0].bottom != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].bottom
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
				 								socket.emit('pack_chara_ability_check',data,abil);
				 							}
										});	
									}
									else{
										socket.emit('pack_chara_ability_check',data,abil);
									}
								
							});	
						}

						client.query('select * from inven where cid = ?',
						[
							result[0].chara2
						],function(error,result4){
							for(var i=0;i<30;i++){
								//onsole.log(result4[i]);
								if(result4[i] != null){

									inven.push(result4[i].code);
								}
								else{
									
									inven.push('-1');
								}
							}
							socket.emit('pack_chara_inven_check',inven);
						});

						client.query('select * from equip_list',
							[

							],function(error,result5){
								
								for(var i=0;i<result5.length;i++){
									var item = {};
									item.code = result5[i].code;
								item.role = result5[i].role;
							    item.part = result5[i].part;
							    item.name = result5[i].ename;
							    item.desc = result5[i].description;
							    item.level = result5[i].level;
							    //능력치
							    item.ability = {};
							    item.ability.str = result5[i].str;
							    item.ability.dex = result5[i].dex;
							    item.ability.int = result5[i].intell;
							    item.ability.vtl = result5[i].vlt;
							    item.ability.agi = result5[i].agi;
							    item.ability.ad = result5[i].dam;
							    item.ability.dad = result5[i].def;
							    item.ability.ap = result5[i].mag;
							    item.ability.dap = result5[i].mdef;
							    item.ability.avoid = result5[i].avoid;
							    item.ability.hp = result5[i].hp;
							    item.ability.mp = result5[i].mp;

							    item_data.push(item);
							  }
							  socket.emit('pack_all_item_check',item_data);
						});
						
						client.query('select * from monster_list',
						[
						],function(error,result6){
							for(var i=0;i<result6.length;i++){
								var monster = {};
								monster.class = 'monster';
								monster.code = result6[i].code;
								monster.role = result6[i].role;
								monster.name = result6[i].mname;

								monster.ability = {};
								monster.ability.ad = result6[i].ad;
								monster.ability.dad = result6[i].dad;
								monster.ability.ap = result6[i].ap;
								monster.ability.dap = result6[i].dap;
								monster.ability.avoid = result6[i].avoid;
								monster.ability.hp = result6[i].hp;
								monster.ability.mp = result6[i].mp;
								monster.speed = result6[i].speed;

								monster.minExp = result6[i].minexp;
							    monster.maxExp = result6[i].maxexp;
							    monster.minGold = result6[i].mingold;
							    monster.maxGold = result6[i].maxgold;

							    monster.drop_table = [];
							    switch(result6[i].code)
							    {
							    	//드랍테이블 토큰 코드#확률#최소드랍수#최대드랍수
							    	case 2: monster.drop_table.push('12@1@1@1'); break;
							    	case 3: monster.drop_table.push('3@1@1@1');
							    			monster.drop_table.push('5@1@1@1');
							    			monster.drop_table.push('4@1@1@1'); break;
							    	case 5: monster.drop_table.push('18@30@1@3'); break;
							    	case 6: monster.drop_table.push('19@30@1@3'); break;
							    	case 7: monster.drop_table.push('11@1@1@1'); break;
							    	case 8: monster.drop_table.push('17@30@1@3'); break;
							    }
								monster_data.push(monster);
								
							}			
							socket.emit('pack_monster_check',monster_data);
						});
					
						client.query('select * from chara_equip where cid = ?',
						[
							result[0].chara2
						],function(error,result6){
							 socket.emit('pack_chara_equip',result6[0]);
						});

						client.query('select * from skill_list',
						[
						],function(error,result7){
							for(var i=0;i<result7.length;i++){
								var skill = {};
								skill.code = result7[i].code;
								skill.role = result7[i].role;
								skill.name = result7[i].name;
								skill.desc = result7[i].description;

								skill.ad_or_ap = result7[i].ad_or_ap;
								skill.ad_factor = result7[i].adf;
								skill.ap_factor = result7[i].apf;

								skill.need_mp = result7[i].need_mp;
								skill.need_point = result7[i].need_point;

								skill_data.push(skill);
							}
							socket.emit('pack_all_skill',skill_data);
						});

						client.query('select * from exp_list',
						[
						],function(error,result8){
							for(var i=0;i<result8.length;i++){
								max_exp.push(result8[i].max_exp);
							}
							socket.emit('pack_max_exp',max_exp);
						});

						client.query('select code from chara_skill where cid = ?',
						[
							result[0].chara2
						],function(error,result9){
							var skill_test = [];
							skill_test = result9[0].code;
							socket.emit('pack_skill',skill_test);
							//console.log(skill_test);

						});

					});
				}
				else{
					socket.emit('pack_chara_ability_check',false,false);
				}
			});

	 	});
	}
	else{
		 client.query('select * from account where userid = ?',
	 	[
	 		id
	 	],function(error,result){
	 		client.query('select * from chara where cid = ?',
			[
				result[0].chara3
			],function(error,result1){
				if(result1[0]){

					

					data.push(result1[0].job_id,result1[0].name,result1[0].level);

					client.query('select * from job where jid = ?',
					[
						result1[0].job_id
					],function(error,result2){
						if(result2[0]){
							data.push(result2[0].jname,result2[0].str,result2[0].dex,
									  result2[0].intell,result2[0].vlt,result2[0].agi,
									  result1[0].gold,			
									  result1[0].exp,result1[0].hp,result1[0].mp,result1[0].x,result1[0].y,result[0].chara3,result1[0].map,result1[0].spoint
									  );
							client.query('select * from chara_equip where cid = ?',
							[
								result[0].chara3
							],function(error,result3){

				
								if(result3[0].weapon != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].weapon
										],function(error,result4){
											if(result4 != null){
												abil = [result4[0].str,result4[0].dex,result4[0].intell,
														result4[0].vlt,result4[0].agi,result4[0].dam,result4[0].def,result4[0].mag
														,result4[0].mdef,result4[0].avoid,result4[0].hp,result4[0].mp];
														socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].armor != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].armor
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].shose != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].shose
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].ring != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].ring
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].head != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].head
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}
									if(result3[0].glove != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].glove
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
												socket.emit('pack_chara_ability_check',data,abil);
											}
										});
									}

									if(result3[0].bottom != -1){
										client.query('select * from equip_list where code = ?',
										[
											result3[0].bottom
										],function(error,result4){
											if(result4 != null){
												abil[0] += result4[0].str;
												abil[1] += result4[0].dex;
												abil[2] += result4[0].intell;
												abil[3] += result4[0].vlt;
												abil[4] += result4[0].agi;
												abil[5] += result4[0].dam;
												abil[6] += result4[0].def;
												abil[7] += result4[0].mag;
												abil[8] += result4[0].mdef;
												abil[9] += result4[0].avoid;
												abil[10] += result4[0].hp;
												abil[11] += result4[0].mp;
				 								socket.emit('pack_chara_ability_check',data,abil);
				 							}
										});	
									}
									else{
										socket.emit('pack_chara_ability_check',data,abil);
									}
								
							});	
						}

						client.query('select * from inven where cid = ?',
						[
							result[0].chara3
						],function(error,result4){
							for(var i=0;i<30;i++){
								//onsole.log(result4[i]);
								if(result4[i] != null){

									inven.push(result4[i].code);
								}
								else{
									
									inven.push('-1');
								}
							}
							socket.emit('pack_chara_inven_check',inven);
						});

						client.query('select * from equip_list',
							[

							],function(error,result5){
								
								for(var i=0;i<result5.length;i++){
									var item = {};
									item.code = result5[i].code;
								item.role = result5[i].role;
							    item.part = result5[i].part;
							    item.name = result5[i].ename;
							    item.desc = result5[i].description;
							    item.level = result5[i].level;
							    //능력치
							    item.ability = {};
							    item.ability.str = result5[i].str;
							    item.ability.dex = result5[i].dex;
							    item.ability.int = result5[i].intell;
							    item.ability.vtl = result5[i].vlt;
							    item.ability.agi = result5[i].agi;
							    item.ability.ad = result5[i].dam;
							    item.ability.dad = result5[i].def;
							    item.ability.ap = result5[i].mag;
							    item.ability.dap = result5[i].mdef;
							    item.ability.avoid = result5[i].avoid;
							    item.ability.hp = result5[i].hp;
							    item.ability.mp = result5[i].mp;

							    item_data.push(item);
							  }
							  socket.emit('pack_all_item_check',item_data);
						});
						
						client.query('select * from monster_list',
						[
						],function(error,result6){
							for(var i=0;i<result6.length;i++){
								var monster = {};
								monster.class = 'monster';
								monster.code = result6[i].code;
								monster.role = result6[i].role;
								monster.name = result6[i].mname;

								monster.ability = {};
								monster.ability.ad = result6[i].ad;
								monster.ability.dad = result6[i].dad;
								monster.ability.ap = result6[i].ap;
								monster.ability.dap = result6[i].dap;
								monster.ability.avoid = result6[i].avoid;
								monster.ability.hp = result6[i].hp;
								monster.ability.mp = result6[i].mp;
								monster.speed = result6[i].speed;

								monster.minExp = result6[i].minexp;
							    monster.maxExp = result6[i].maxexp;
							    monster.minGold = result6[i].mingold;
							    monster.maxGold = result6[i].maxgold;

							    monster.drop_table = [];
							    switch(result6[i].code)
							    {
							    	//드랍테이블 토큰 코드#확률#최소드랍수#최대드랍수
							    	case 2: monster.drop_table.push('12@1@1@1'); break;
							    	case 3: monster.drop_table.push('3@1@1@1');
							    			monster.drop_table.push('5@1@1@1');
							    			monster.drop_table.push('4@1@1@1'); break;
							    	case 5: monster.drop_table.push('18@30@1@3'); break;
							    	case 6: monster.drop_table.push('19@30@1@3'); break;
							    	case 7: monster.drop_table.push('11@1@1@1'); break;
							    	case 8: monster.drop_table.push('17@30@1@3'); break;
							    }
								monster_data.push(monster);
								
							}			
							socket.emit('pack_monster_check',monster_data);
						});
					
						client.query('select * from chara_equip where cid = ?',
						[
							result[0].chara3
						],function(error,result6){
							 socket.emit('pack_chara_equip',result6[0]);
						});

						client.query('select * from skill_list',
						[
						],function(error,result7){
							for(var i=0;i<result7.length;i++){
								var skill = {};
								skill.code = result7[i].code;
								skill.role = result7[i].role;
								skill.name = result7[i].name;
								skill.desc = result7[i].description;

								skill.ad_or_ap = result7[i].ad_or_ap;
								skill.ad_factor = result7[i].adf;
								skill.ap_factor = result7[i].apf;

								skill.need_mp = result7[i].need_mp;
								skill.need_point = result7[i].need_point;

								skill_data.push(skill);
							}
							socket.emit('pack_all_skill',skill_data);
						});

						client.query('select * from exp_list',
						[
						],function(error,result8){
							for(var i=0;i<result8.length;i++){
								max_exp.push(result8[i].max_exp);
							}
							socket.emit('pack_max_exp',max_exp);
						});

						client.query('select code from chara_skill where cid = ?',
						[
							result[0].chara3
						],function(error,result9){
							var skill_test = [];
							skill_test = result9[0].code;
							socket.emit('pack_skill',skill_test);
							//console.log(skill_test);

						});

					});
				}
				else{
					socket.emit('pack_chara_ability_check',false,false);
				}
			});

	 	});
	}

};


module.exports.chara_delete= function(socket,id,nickname,charNumber){
	console.log('\u001b[32m','- chara_delete -','\u001b[0m');
	client.query('delete from chara where name = ?',
	[
		nickname
	]);

	if(charNumber==1){
		client.query('select chara1 from account where userid = ?',
		[
			id
		],function(error,result){
			client.query('delete from chara_equip where cid = ?',[result[0].chara1]);
			client.query('delete from inven where cid = ?',[result[0].chara1]);
		});
		client.query('update account set chara1 = ? where userid = ? ',
		[
			null,id
		]);
	}
	else if(charNumber==2){
		client.query('select chara2 from account where userid = ?',
		[
			id
		],function(error,result){
			client.query('delete from chara_equip where cid = ?',[result[0].chara1]);
			client.query('delete from inven where cid = ?',[result[0].chara1]);
		});
		client.query('update account set chara2 = ? where userid = ? ',
		[
			null,id
		]);
	}
	else{
		client.query('select chara3 from account where userid = ?',
		[
			id
		],function(error,result){
			client.query('delete from chara_equip where cid = ?',[result[0].chara1]);
			client.query('delete from inven where cid = ?',[result[0].chara1]);
		});
		client.query('update account set chara3 = ? where userid = ? ',
		[
			null,id
		]);
	}
};

module.exports.label_Input_nik = function(socket,id){
	console.log('\u001b[32m','- label_Input_nik -','\u001b[0m');
	var data1 = "";
	var data2 = "";
	var data3 = "";

	client.query('select * from account where userid = ?',
	[
	 	id
	],function(err,result){

	 	if(result[0].chara1 != null){
		 	client.query('select job_id,name from chara where cid = ?',
		 		[
		 			result[0].chara1
		 		],function(err,result1){
			 			data1 = result1[0].name;
			 			socket.emit('pack_label_input1',data1);

			 			client.query('select img_src from job where jid = ?',
			 			[
			 				result1[0].job_id
			 			],function(error,result2){
				 				socket.emit('pack_img_load1',result2[0].img_src);
			 			});
		 		});
		 }
		 else{
		 	socket.emit('pack_label_input1',data1);
		 	console.log("캐릭없다..");
		 	socket.emit('pack_img_load1',data1);
		 }


		if(result[0].chara2 != null){
		 	client.query('select job_id,name from chara where cid = ?',
		 		[
		 			result[0].chara2
		 		],function(err,result1){

			 			data2 = result1[0].name;
			 			socket.emit('pack_label_input2',data2);

			 			client.query('select img_src from job where jid = ?',
			 			[
			 				result1[0].job_id
			 			],function(error,result2){
			 				socket.emit('pack_img_load2',result2[0].img_src);
			 			});
		 		});
		 }
		  else{
		 	socket.emit('pack_label_input2',data2);
		 	console.log("캐릭없다..");
		 	socket.emit('pack_img_load2',data2);
		 }
		if(result[0].chara3 != null){
		 	client.query('select job_id,name from chara where cid = ?',
		 		[
		 			result[0].chara3
		 		],function(err,result1){
			 			data3 = result1[0].name;
			 			socket.emit('pack_label_input3',data3);

			 			client.query('select img_src from job where jid = ?',
			 			[
			 				result1[0].job_id
			 			],function(error,result2){
			 				socket.emit('pack_img_load3',result2[0].img_src);
			 			});
		 		});
		 }
		 else{
		 	socket.emit('pack_label_input3',data3);
		 	console.log("캐릭없다..");
		 	socket.emit('pack_img_load3',data3);
		 }
		});
};