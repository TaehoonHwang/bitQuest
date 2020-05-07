/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'ㅡㅡ'
  });
};


exports.LoginYes = function(req,res){
	console.log(req.body.LoginId);
	console.log(req.body.LoginPass);
  console.log('로그인');
	res.json({});
}

exports.SignUpYes = function(req,res){
	console.log(req.body.SignUpId);
	console.log(req.body.SignUpPass);
	console.log(req.body.SignUpPassOk);
	console.log(req.body.SignUpEamil);
	res.json({});
}

exports.NewIdCheck = function(req,res)
{
	console.dir(req.body.NewId);
	res.json({});
}
