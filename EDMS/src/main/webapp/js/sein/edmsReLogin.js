$(document).ready(function(){
    var userInputId = getCookie("userInputId");
    $("input[name='userId']").val(userInputId);

    if($("input[name='userId']").val() != ""){
        $("#idSaveCheck").attr("checked", true);
    }

    $("#idSaveCheck").change(function(){
        if($("#idSaveCheck").is(":checked")){
            var userInputId = $("input[name='userId']").val();
            setCookie("userInputId", userInputId, 7);
        }else{
            deleteCookie("userInputId");
        }
    });

    $("input[name='userId']").keyup(function(){
        if($("#idSaveCheck").is(":checked")){
            var userInputId = $("input[name='userId']").val();
            setCookie("userInputId", userInputId, 7);
        }
    });

    var agent = navigator.userAgent.toLowerCase();

    if(agent.indexOf('edge/') > -1){
    	if(confirm("크롬 브라우저를 설치해주세요.\n확인을 누르시면 설치 페이지로 이동합니다.")){
    		window.open("https://www.google.com/chrome/browser/desktop/index.html");
    		window.close();
    	}
    }
});

function getContextPath(){
	var offset	= location.href.indexOf(location.host)+location.host.length;
	var ctxPath	= location.href.substring(offset,location.href.indexOf('/',offset+1));

	return ctxPath;
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName){
    cookieName = cookieName + '=';
    var cookieData 	= document.cookie;
    var start 		= cookieData.indexOf(cookieName);
    var cookieValue = '';

    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}


function actionLogin(){
	if(document.loginForm.userId.value == ""){
		$('#dlg').empty();
		$('#dlg').append("아이디를 입력하세요");
		$('#dlg').window('open');
		return;
	}else if(document.loginForm.userPw.value == ""){
		$('#dlg').empty();
		$('#dlg').append("비밀번호를 입력하세요");
		$('#dlg').window('open');
		return;
	}else{
		document.loginForm.action = getContextPath()+"/loginAction";
		document.loginForm.submit();
	}
};

function idpassCheck(){
	alert("CPS-NEW에서 변경 가능합니다.");
//	document.loginForm.action = getContextPath()+"/edmsIdpass.sein";
//	document.loginForm.submit();
};

function chromeInstall(){
	window.open("https://www.google.com/chrome/browser/desktop/index.html");
	window.close();
};

function memberJoin(){
	alert("CPS-NEW 사용자는 회원가입이 필요없습니다.\n로그인 안될시 정용훈 부장에게 쪽지 주세요.");
//	window.open("http://www.customspass.com/joinSein.cps");
	window.close();
};