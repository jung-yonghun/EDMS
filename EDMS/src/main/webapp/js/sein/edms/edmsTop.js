$(document).ready(function(){
    fncClearTime();
    initTimer();
});

var iSecond;
var timerchecker = null;

function fncClearTime(){
    iSecond = 3600;
}

Lpad = function(str, len){
    str = str + "";
    while(str.length < len){
        str = "0" + str;
    }
    return str;
}

initTimer = function(){
    var timer = document.getElementById("timer");

    rMinute = parseInt(iSecond / 60);
    rMinute = rMinute % 60;
    rSecond = iSecond % 60;

    if(iSecond > 0){
    	if(iSecond == 60){
    		if(confirm("1분 남았습니다.\n연장 하시겠습니까?")){
    			refreshTimer();
    		}
    	}
        timer.innerHTML = "&nbsp;" + Lpad(rMinute, 2) + "분 " + Lpad(rSecond, 2) + "초 ";
        iSecond--;
        timerchecker = setTimeout("initTimer()", 1000);
    }else{
    	parent.document.location.href="./edmsLogout.sein";
    }
}

function refreshTimer(){
    fncClearTime();
    parent.bottom.document.location.href="../board/blank.sein";
}

function View4(){
	parent.main.document.location.href="http://www.customspass.com/importNew/importFieldDocument.cps";
}

var View3 = function(){
	try{
		var url 	= "../apis/userInfo/getUserInfoList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			parent.window.open("http://sas.customspass.com/sop/sopMainList.sas?userKey="+d[0].userKey+"&authKey="+d[0].apiKey+"");
		});
	}catch(e){
	};
};

var View4 = function(){
	try{
		var url 	= "../apis/userInfo/getUserInfoList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			parent.window.open("http://www.customspass.com/fieldJoin.cps?userKey="+d[0].userKey+"");
		});
	}catch(e){
	};
};

var View5 = function(){
	try{
		var url 	= "../apis/userInfo/getUserInfoList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			parent.window.open("http://sas.customspass.com/statistics/importDivisionStatistics.sas?userKey="+d[0].userKey+"&authKey="+d[0].apiKey+"");
		});
	}catch(e){
	};
};

var View6 = function(){
	try{
		var url 	= "../apis/userInfo/getUserInfoList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			parent.window.open("http://sas.customspass.com/statistics/exportDivisionStatistics.sas?userKey="+d[0].userKey+"&authKey="+d[0].apiKey+"");
		});
	}catch(e){
	};
};