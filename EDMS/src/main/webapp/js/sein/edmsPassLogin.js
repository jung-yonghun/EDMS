$(document).ready(function(){
	actionLogin();
});

function getContextPath(){
	var offset	= location.href.indexOf(location.host)+location.host.length;
	var ctxPath	= location.href.substring(offset,location.href.indexOf('/',offset+1));

	return ctxPath;
}

function actionLogin(){
	document.loginForm.action = getContextPath()+"/loginPassAction";
	document.loginForm.submit();
};