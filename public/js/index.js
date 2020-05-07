


$(document).ready(function(){


  $(".maina").hide();


/*
function logout(){
  return "bye?";
}
window.onbeforeunload = logout;
*/
  $('#chat').hide();
            $('#test2').hide();
            addBgImage('#test','fan5.gif');
            addBgImage('#BitLog','bitmain.jpg');
            addBgImage('#anyclick','anyclick.gif');
            //enter 기능 여부 및 위치
            enterKey('#log_id','#dlg_login');
            enterKey('#log_pw','#dlg_login');
            enterKey('#joinpw','#dlg2_join');
            enterKey('#joinpwre','#dlg2_join');
            enterKey('#joinem','#dlg2_join');
            enterKey('#joinid','#id_check_btn');
            enterKey('#CC_nik','#chara_create_btn');
            enterKey('#CD_nik','#chara_delete_btn');
            enterKey('#chattext','#chatsend');

            //로그인 다이얼로그 show
            
            $("#test").click(function()
            {
              Show("#loginform",450);
              $("#anyclick").hide();
             });

            $("#chatBox").dialog({
              autoOpen:false,
              width:400,
              height:400,
              resizable: false,
              modal:false
            });
            //로그인 다이얼로그 기능
            $('#loginform').dialog({

              autoOpen: false,
              width: 400,
              modal : true,
              buttons: [{
                      id:"dlg_login",
                      text:"login",
                      click:function(){
                        var id = $("#log_id").val();
                        var pw = $("#log_pw").val();
                        isKorean(id);
                        var check = isIdAndPass(id,pw);

                        if(check){
                        var idpw = new Array();
                        idpw.push(id,pw);

                          socket.emit('login',idpw);}
                     }
                   },{
                    text:"join",
                    click:function(){
                      $("#log_id").val("");
                      $("#log_pw").val("");
                      $("#joinform").dialog("open");
                    }
                   },{
                    id:"nimi",
                    text:"cancel",
                    click:function(){
                       $('#anyclick').show();
                        $("#log_id").val("");
                        $("#log_pw").val("");
                        $("#loginform").dialog("close");
                    }
                }]
              });

            ///아이디 중복 체크 버튼 클릭 기능
            $("#id_check_btn").click(function(){
                var id = $("#joinid").val();
                if(id==''){
                  alert("아이디를 입력하세요~")
                }
                if(isKorean(id)){
                  socket.emit('check_id',id);
                }
            });

            //회원가입 다이얼로그 기능 및 구성
            $("#joinform").dialog({
            autoOpen : false,
            width: 350,
            height: 400,
            modal:true,
            buttons:[{
                id:"dlg2_join",
                text:"join",
                click:function(){
                    var id1 = $("#joinid").val();
                    var pw = $("#joinpw").val();
                    var pwre = $("#joinpwre").val();
                    var email = $("#joinem").val();

                    var check = IsNew(id1,pw,pwre,email);

                    if(check){

                    var info = [];

                    info.push(id1,pw,email,strDate);
                    socket.emit('acc_add',info);
                    alert("가입되었습니다");

                    $("#joinid").val("");
                    $("#joinpw").val("");
                    $("#joinpwre").val("");
                    $("#joinem").val("");
                    $("#joinform").dialog("close");
                    //location.reload();
                    }
                }
            },{
              text:"cancel",
              click:function(){

                $("#joinid").val("");
                $("#joinpw").val("");
                $("#joinpwre").val("");
                $("#joinem").val("");
                   $("#joinform").dialog("close");
              }
             }]
           });
//------------------------------------------------------------------------------------------------------

      //이미지 변경을 위한 hide
      $('#CDelete').hide();
      $('#CCreate').hide();
      $('#gamestart').hide();
      $('#info').hide();
      //backgroun image 추가 함수
      addBgImage('#Cselectbak','캐릭터선택창.jpg');
      addBgImage('#SelectLog','select1.jpg');
      addBgImage('#C1','캐릭1.png');
      addBgImage('#C2','캐릭1.png');
      addBgImage('#C3','캐릭1.png');
      addBgImage('#info','stone.png');
      addBgImage('#nikbak1','chara_label.png');
      addBgImage('#nikbak2','chara_label.png');
      addBgImage('#nikbak3','chara_label.png');



      //캐릭터 생성 다이얼로그
      $('#CCDialog').dialog({
        autoOpen:false,
        modal:true,
        buttons:[{
            id:"chara_create_btn",
            text:"생성",
            click:function(){
              var max = $('#CC_nik').val().length;
              if( max < 15 ){
                socket.emit('nickname_check_id',$('#CC_nik').val());
              }
              else{
                alert(" 글자 최대치 초과 ! ( 15자 이내 ) ");
                return false;
              }
            }
          },{
          text:"취소",
          click:function(){
            $('#CC_nik').val("");
            $('#CCDialog').dialog("close");}
        }]
      });
      //캐릭터 삭제 다이얼 로그
      $('#CDDialog').dialog({
        autoOpen:false,
        modal:true,
        buttons:[{
            id:"chara_delete_btn",
            text:"삭제",
            click:function(){
                var data = [];
                data.push($('#CD_nik').val(),goodboy);
                socket.emit('delete_check_id',data);
            }
          },{
            text:"취소",
            click:function(){
              $('#CD_nik').val("");
              $(this).dialog("close");
            }
        }]
      });
      //캐릭터 삭제 버튼 클릭 이벤트
      $('#CDelete').click(
                function(){
                  Show("#CDDialog",450);
              });

      //캐릭터 생성 버튼 클릭 이벤트
      $('#CCreate').click(
                function(){
                  Show("#CCDialog",450);

              });

      //스텟 다이얼로그 텍스트 css 변경
      $('input[name="pink"]').css("background-color","rgb(0, 100, 150)").css("width","80");

         ///캐릭터 이미지 클릭시 이벤트
        $('#C1').click(function(){
          goodboy = 1;
            socket.emit('chara_ability_check',goodboy);
            var posi = $('#C1').position().left;
            Show('#info',posi);
            socket.emit('chara_data_check',goodboy);});

        $('#C2').click(function(){
            goodboy = 2;
            socket.emit('chara_ability_check',goodboy);
            var posi = $('#C2').position().left;
            Show('#info',posi);socket.emit('chara_data_check',goodboy);});

        $('#C3').click(function(){
            goodboy = 3;
            socket.emit('chara_ability_check',goodboy);
            var posi = $('#C3').position().left;
            Show('#info',posi);socket.emit('chara_data_check',goodboy);});


          $('#test2').click(function(){
            $('#CDelete').hide();
            $('#CCreate').hide();
            $('#gamestart').hide();
            if(goodboy>0){
               $('#info').dialog("close");
            }
          });


    });