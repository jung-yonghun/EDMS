function fn_insertAction(){
	frm = document.insertForm;
    if(isEmpty(frm.sRecvLogonCDs.value)){
        alert("받는사람을 입력해 주세요.");
        return;
    }
    if(isEmpty(frm.sMsgContent.value)){
        alert("내용을 입력해 주세요.");
        frm.sMsgContent.focus();
        return;
        
    }

    if($("#singoNo").val() != ''){
    	var url 	 = "./apis/edms/saveFieldMaster",
			params3  = {
				"defaultDB"		: $("#defaultDB").val(),
				"gubun"			: $("#gubun").val(),
				"imexKey"		: $("#key").val(),
				"singoNo"		: $("#singoNo").val(),
				"fieldRequest"	: $("#sMsgContent").val(),
				"userId"		: $("#sSndrLogonCD").val(),
				"status"		: "의뢰",
				"useYn"			: "Y"
			},
			type 	= "POST";

		sendAjax(url, params3, type, function(d){
		});
    }

	var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
		params 	= $("#insertForm").serializeObject(),
		type 	= "POST";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		async		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			alert("전송 되었습니다.");
			$("#sRecvLogonCDs").val("");
			$("#sMsgContent").val("");
		},
		error 		: function(e){
			alert("전송 되었습니다.");
			$("#sRecvLogonCDs").val("");
			$("#sMsgContent").val("");
		}
	});
}

function fn_insertAction1(){
	frm = document.insertForm;
    if(isEmpty(frm.sRecvLogonCDs.value)){
        alert("받는사람을 입력해 주세요.");
        return;
    }
    if(isEmpty(frm.sMsgContent.value)){
        alert("내용을 입력해 주세요.");
        frm.sMsgContent.focus();
        return;
    }

    if($("#singoNo").val() != ''){
    	var url 	 = "./apis/edms/saveFieldMaster",
			params3  = {
				"SingoCode"		: $("#defaultDB").val(),
				"Gbn"			: $("#gubun").val(),
				"ImexKey"		: $("#key").val(),
				"SingoNo"		: $("#singoNo").val(),
				"FieldRequest"	: $("#sMsgContent").val(),
				"AddUserId"		: $("#sSndrLogonCD").val(),
				"FieldGbn"		: "의뢰",
				"UseYn"			: "Y",
				"SDACMngNo"		: "0"
			},
			type 	= "POST";

		sendAjax(url, params3, type, function(d){
		});
    }

	var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
		params 	= $("#insertForm").serializeObject(),
		type 	= "POST";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		async		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			CloseWindow();
		},
		error 		: function(e){
			CloseWindow();
		}
	});
}

$(document).ready(function(){
	var url 	= "./apis/userInfo/getUserInfoList",
		params 	= {
			"userId" : $("#sSndrLogonCD").val(),
			"useYn"	 : "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function (d){
		$("#_id").val(d[0].userKey);
		$("#_apiKey").val(d[0].apiKey);
		if($("#option").val()=="true"){
			fn_insertAction1();
		}else{
			$("#msgView").css("display","");
		}
	});
});

function fn_searchAction(){
	openWindowWithPost("./userSearch.sein", "width=600, height=400, scrollbars=no, menubar=no, resizable=1", "userSearch", {
		"setUser" : $("#sRecvLogonCDs").val()
	});
}

function CloseWindow(){
	self.opener = self;
	window.close();
}