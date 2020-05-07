			var goodboy = 0;
			var d = new Date();
			var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() +" " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
			var tog =0;
			function open_chatbox()
			 {
			 	$(".ui-dialog-titlebar").show();
			 	if(tog==0){
			 		$('#chatBox').dialog('open');tog=1;}

			 	else{
			 		$('#chatBox').dialog('close');tog=0;}

			 }
	 		//영어 아스키 코드를 이용한 영어체크 
			function isAlphabet(ch){
				   	var numUnicode = ch.charCodeAt(0);
				   	if(65 <= numUnicode && numUnicode <= 90) return true; //대문자
				   	if(97<=  numUnicode && numUnicode <= 122) return true; //소문자
				   	
				   	return false
				   }
			//한글 체크 함수 
			function isKorean(ch){
					for(var i=0;i<ch.length;i++){
						var numUnicode = ch.charCodeAt(i);
					}	
					if(44032 <= numUnicode && numUnicode <=55203 || 12593 <= numUnicode && numUnicode <= 12643){
						alert("한글은 입력이 불가능합니다");
						return false;
					}
					return true;
			}
			//*********************************************************************
			function isIdAndPass(id , pw){
          if( id === "" && pw === ""){
             alert(" 아이디와 비밀번호를 입력해주세요 !"); 
             return false;
          }
          else if( id === "" ){
             alert("아이디를 입력해주세요 !");
             return false;
          }
          else if( pw === "" ){
              alert("비밀번호를 입력해주세요 !");
              return false;
          }
          else{
             return true;
          }
			}
			function IsNew( id , pw, pwre,email ){
	        var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	        if( id === "" && pw === ""){ 
	           alert(" 아이디와 비밀번호를 입력해주세요 !");      
	           return false;
	        }
	        else if( id === "" ){
	           alert("아이디를 입력해주세요 !");
	           return false;
	        }
	//---------------------- 비밀번호 ----------------------
	        else if( pw === "" ){
	            alert("비밀번호를 입력해주세요 !");
	            return false;
	        }
	        if(pwre ===""){
	            alert("중복비번을 확인해주세요 !");
	            return false;
	        }
	        else if( pw != pwre )
	        {
	            alert("비밀번호와 중복비번이 다릅니다.");
	            return false;
	        }
	//---------------------- 이메일 ----------------------
	        else if(email ===""){
	            alert("이메일주소를 입력 해 주세요 !");
	            return false;
	        }
	        else if(!regEmail.test(email)) {
	            alert("이메일 주소가 유효하지 않습니다 !");
	            return false;
	        }
	        else{
	            return true;
	        }
			}
			///이미지 이동 / 좌표값,속도에 따라 
			function animateDivers() {
    			$('#test').animate({'margin-left':'0px','margin-top':'0px'},6000)
    			          .animate({'margin-left':'100px','margin-top':'90px'},6000, animateDivers); 
  			}
  			///background image add 함수 
  			function addBgImage(id,imgName){
  				$(id).css("background-image","url(/img/"+imgName+")");
  			}
			///board 다이얼로그 left 위치값에 따른 show
  			function Show(id,left) {
  				var cur_left = left - 50;
			    $("#dialog:ui-dialog").dialog("destroy");
			    $(id).dialog({
			        	autoOpen : false,
			        	width: 240,
						position:{my:'left top',at: 'left+'+cur_left+' top+170'}
					});
			    $(".ui-dialog-titlebar").hide();
			    $(id).stop().dialog("open");
			}
			///다이얼로그 close
			function Close(){
				$("#info").stop().dialog("close");
			}
			///keydonw enter
			function enterKey(id,target_id){
        $(id).keydown(function(key){
          if(key.keyCode==13){
            $(target_id).click();
          }
        });
      }

			function getRandomInt(min, max) {
			  return Math.floor(Math.random() * (max - min + 1) + min);
			}


			///게임시작 버튼 hover 및 이미지
			function GameStart(){
            	addBgImage('#gamestart','StartBt.gif');
				$('#gamestart').hover(
        		function(){
       				addBgImage('#gamestart','StartBt1.jpg');
        		},
        		function(){
         			addBgImage('#gamestart','StartBt.gif');
        	});
        }

      ///삭제버튼
      function Delete(){
      	addBgImage('#CDelete','DeleteBt.jpg');
      	$('#CDelete').hover(
      		function(){
     				addBgImage('#CDelete','DeleteBt1.jpg');
      		},
      		function(){
       			addBgImage('#CDelete','DeleteBt.jpg');
     		});
      }

			///생성버튼 
			function Create(){
				addBgImage('#CCreate','CreateBt.jpg');
				$('#CCreate').hover(
            		function(){
           				addBgImage('#CCreate','CreateBt1.jpg');
            		},
            		function(){
            			addBgImage('#CCreate','CreateBt.jpg');
        		});
			}

			function btnShow(check){
				if(check=='create')
				{	
           Create();
            $('#info').dialog("open");
            $("#CCreate").attr("disabled",false).show();
            $('#CDelete').attr("disabled",true).hide();
            $('#gamestart').attr("disabled",true).hide();
				}
				else if(check=='StartAndDelete')
				{
					 Delete();
					 GameStart();
					 $('#info').dialog("open");
					  $("#CCreate").attr("disabled",true).hide();
            $('#CDelete').attr("disabled",false).show();
            $('#gamestart').attr("disabled",false).show();
				}

			}

			function info_init(){
			    $('#nickname').val("");
          $('#level').val("");
          $('#job').val("");
          $('#str').val("");
          $('#dex').val("");
          $('#int').val("");
          $('#vlt').val("");
          $('#agi').val("");
      }

      function add_sta(){
      	$('#s_nickname').val(player_ability.nickname);
      $('#s_job').val(player_ability.job);                   //1
        $('#s_level').val(player_ability.level);                         //2
        $('#s_str').val(player_ability.str);                 //3
        $('#s_dex').val(player_ability.dex);                 //4
        $('#s_int').val(player_ability.intell);                 //5
        $('#s_vlt').val(player_ability.vlt);                 //6
        $('#s_agi').val(player_ability.agi);
        $('#s_gold').val(player_ability.gold);
        $('#s_exp').val(player_ability.exp);


      	  $('#nickname').val(player_ability.nickname);                    //0
	      $('#job').val(player_ability.job);                   //1
	      $('#level').val(player_ability.level);                         //2
	      $('#str').val(player_ability.str.toFixed(1));                 //3
	      $('#dex').val(player_ability.dex.toFixed(1));                 //4
	      $('#int').val(player_ability.intell.toFixed(1));                 //5
	      $('#vlt').val(player_ability.vlt.toFixed(1));                 //6
	      $('#agi').val(player_ability.agi.toFixed(1)); 
      }

