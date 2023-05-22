function getSystemList(callback){
	var url 	= "../apis/system/getNoticeList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		callback(d.content);
	});
}

function getNewsList(callback){
	var url 	= "../apis/system/getNoticeList",
	    params 	= $("#frm4").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		callback(d.content);
	});
}

$(document).ready(function(){
	drawSite();
	if($("#USERID").val()=="geodis"){
		$("#wrapper").hide();
		window.parent.topmenu.leftView('n');
	}else{
		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
			var dates = $("#nowdate").datepicker({
				dateFormat : 'yymmdd'
			});
		});
		$('#nowdate').val($.datepicker.formatDate('yymmdd', new Date()));

		fn_searchAction();

		if($("#GRADE").val()=="A" || $("#GRADE").val()=="B"){
			$("#SYSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"SYS\")'><span>신규등록</span></a>");
			$("#NEWSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"NEWS\")'><span>신규등록</span></a>");
			$("#DeadType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
			$("#PendType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
			$("#DoType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
		}
	}
});

var fn_searchAction = function(){
	getSystemList(drawSystemList);

	getNewsList(drawNewsList);

	dateCheck();
};

var drawSystemList = function(data){
	var optList = new Array();
	for(var i = 0; i < 7; i++){
		if(data[i]){
			optList[optList.length] = "<tr><td><dl class='dl-horizontal'><dt><a onclick='javascript:fn_popAction(" + data[i].noticesKey + ")' data-toggle='tooltip' data-placement='bottom' title='" + data[i].subject + "'>" + data[i].subject + "</a></dt></dl></td><td class='text-right'>[" + convertUnixDate(data[i].addDate).substring(0,10) + "]</td></tr>";
		}
	}
	$("#SNotice").html(optList.join("\n"));
};

var drawNewsList = function(data){
	var optList = new Array();
	for(var i = 0; i < 7; i++){
		if(data[i]){
			optList[optList.length] = "<tr><td><dl class='dl-horizontal'><dt><a onclick='javascript:fn_popAction(" + data[i].noticesKey + ")' data-toggle='tooltip' data-placement='bottom' title='" + data[i].subject + "'>" + data[i].subject + "</a></dt></dl></td><td class='text-right'>[" + convertUnixDate(data[i].addDate).substring(0,10) + "]</td></tr>";
		}
	}
	$("#NNotice").html(optList.join("\n"));
};

function dateCheck(){
	var params = {"date":$("#nowdate").val()};
	$.ajax({
		type 		: "POST",
		contentType : "application/json",
		dataType 	: 'json',
		url 		: "../apis/common/getStandardExchangeRateList",
		processData : false,
		data 		: JSON.stringify(params),
		beforeSend	: function(xhr){
			xhr.setRequestHeader(csrfHeader, csrfToken);
		},
		success 	: function(returnValue, textStatus, jqXHR){
			$("#date_from").html(returnValue.content[0].fromStandardExchangeRateDate.substr(0,4)+"-"+returnValue.content[0].fromStandardExchangeRateDate.substr(4,2)+"-"+returnValue.content[0].fromStandardExchangeRateDate.substr(6,2));
			$("#date_to").html(returnValue.content[0].toStandardExchangeRateDate.substr(0,4)+"-"+returnValue.content[0].toStandardExchangeRateDate.substr(4,2)+"-"+returnValue.content[0].toStandardExchangeRateDate.substr(6,2));
			$("#usd_e").html(returnValue.content[1].USD);
			$("#usd_i").html(returnValue.content[0].USD);
			$("#jpy_e").html(returnValue.content[1].JPY);
			$("#jpy_i").html(returnValue.content[0].JPY);
			$("#eur_e").html(returnValue.content[1].EUR);
			$("#eur_i").html(returnValue.content[0].EUR);
			$("#cny_e").html(returnValue.content[1].CNY);
			$("#cny_i").html(returnValue.content[0].CNY);
		},
		error 		: function(e){
			alert(e.responseText);
			return -1;
		}
	});
}

var fn_popAction = function(noticesKey){
	openWindowWithPost("./boardView.sein","width=800, height=800, scrollbars=yes, location=no, menubar=no", "board" ,{
		"noticesKey" : noticesKey
	});
}

var fn_newAction = function(category){
	openWindowWithPost("./boardInsert.sein","width=800, height=600, scrollbars=no, location=no, menubar=no", "board" ,{
		"category" : category
	});
}

var fn_exchangeAction = function(){
	openWindowWithPost("./viewExchange.sein","width=600, height=500, scrollbars=yes, location=no, menubar=no", "exchange" ,{
		"qryYymmDd" : $("#nowdate").val()
	});
}

function linkBlNo(){
    var url = '../customs/viewTracking.sein?'
    	+ 'cargMtNo='
        + '&mblNo=' + $('#mbl').val()
        + '&hblNo=' + $('#hbl').val()
        + '&blYy=' + $('#year').val();

    window.open(url, 'winpop', 'width=1000,height=700,resizable=1,scrollbars=yes');
}

function viewSite(){
	if($("#site").val() != ""){
		window.open($("#site").val(),"_new");
	}
}

//********** 메인 팀 리스트 draw**********//
var drawSite = function(){
	var optList = new Array();
	optList[0] = "<option value=''>== Family Site ==</option>" +
			     "<option value='http://ims.customspass.com/schneider/'>Schneider Electric</option>" +
			     "<option value='http://ims.customspass.com/groupsebkorea/'>Groupe SEB</option>" +
			     "<option value='http://ims.customspass.com/michaelkors/'>MICHAEL KORS</option>" +
			     "<option value='http://ims.seincustoms.com/ims/'>Gucci</option>";
	$("#site").html(optList.join("\n"));
};

//var agent = navigator.userAgent.toLowerCase();
//if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
//    /*alert("Internet Explorer"); */
//    function aa()
//    {
//    var objWSH = new ActiveXObject("Shell.Application");
//    //var retval = objWSH.Run("C:/Windows/SysWOW64/notepad.exe C:/Windows/SAII_LOG.TXT",1,true);
//    //var retval = objWSH.ShellExecute("C:/Windows/SysWOW64/notepad.exe", "C:/Windows/SAII_LOG.TXT", "", "open", "1");
//    var retval = objWSH.ShellExecute("C:/Program Files (x86)/Microsoft Office/Office14/EXCEL.EXE", '//211.37.212.136/upload/seincustoms/edms_file/20161220/그룹세브코리아_청구리스트_자재별_1481785988869.xlsx', "", "open", "1");
//    }
//}
//
//else if (agent.indexOf("chrome") != -1) {
//  function aa()
//  {
//    /*alert("HAVE TO INSTALL."); */
//    var objWSH = new ActiveXObject("Shell.Application");
//    var retval = objWSH.ShellExecute("C:/Program Files (x86)/Microsoft Office/Office14/EXCEL.EXE", 'C:/seincustoms/edms_file/20161214/1.xls', "", "open", "1");
//  }
//}