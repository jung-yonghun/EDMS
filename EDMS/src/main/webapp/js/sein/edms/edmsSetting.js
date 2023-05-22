var fn_searchAction = function(){
	var url = "../apis/edms/getEdmsNotCustomerList",
	    params = {
			"size"				: "100000",
	        "page"				: "0",
	        "_pageRow"			: "100000",
	        "_pageNumber"		: "0",
	        "useYn"				: "Y"
	    },
	    type = "POST";

	sendAjax(url, params, type, function (d) {
		console.log(d[0]);
	    $('#masterGrid').datagrid('loadData', d[0].content);
	});
}

$(document).ready(function(){
	getUserInfoData();

	fn_searchAction();

	if ($("#userGradeA").val() == "A" || $("#userGradeA").val() == "B" || $("#userGradeA").val() == "C") {
		$("#idCheck").css("display", "");
	}

	$('#masterGrid').datagrid({
		width			: '100%',
		height			: 364,
		singleSelect	: true,
		columns			: [[
            {field:'notKey',title:'Key',hidden:true},
            {field:'sangho',title:'상호',width:200,},
            {field:'saup',title:'사업자번호',width:100,align:'center'},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter}
        ]]
	});
});

var getUserInfoData = function(){
	var userId = $("#userId").val();
	if(userId == "") return;

	model.selectUserInfo(userId, function(d){
		if(!d[0]){
			alert("데이터를 찾을 수 없습니다\n관리자에게 문의하세요!!!");
			return;
		}

		if(d[0]) $("#updateForm").deserialize(d[0]);
		$("#userPw").val("");
	});
};

var model = model || (function(){
	var postAjax = function(url, params, callback){
		$.ajax({
			type 		: "POST",
			contentType : "application/json",
			dataType 	: 'json',
			url 		: url,
			processData : false,
			data 		: JSON.stringify(params),
			success : function(returnValue, textStatus, jqXHR){
				callback(returnValue);
			},
			error : function(e){
				alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
				return -1;
			}
		});
		return 0;
	};

	return{
		"selectUserInfo" : function(userId, callback){
			var url 	= "../apis/userInfo/getUserInfoList",
				params 	= {"userId":userId};

			postAjax(url, params, function(d){
				console.log(d);
				callback(d);
			});
		}
	};
})();

function fn_updateAction(){
	frm = document.updateForm;
	if(frm.userPw.value == ""){
		alert("PW를 입력하세요");
		frm.userPw.focus();
		return;
	}else if(frm.userPw.value.indexOf("'")>=0 || frm.userPw.value.indexOf("<")>=0 || frm.userPw.value.indexOf('"')>=0 || frm.userPw.value.indexOf(">")>=0){
		alert("해당 특수문자는 PW로 설정 하실 수 없습니다.\n ※ ', \", <, > ")
		return;
	}else if(frm.userPw1.value == ""){
		alert("PW 확인을 입력하세요");
		frm.userPw1.focus();
		return;
	}else if(frm.userPw.value != frm.userPw1.value){
		alert("PW가 확인란과 일치하지 않습니다. 다시 입력하세요");
		frm.userPw1.value = "";
		frm.userPw1.focus();
		return;
	}else if(frm.userNm.value == ""){
		alert("이름을 입력하세요");
		frm.userNm.focus();
		return;
	}else if(frm.email.value == ""){
		alert("이메일을 입력하세요");
		frm.email.focus();
		return;
	}else if(!isEmail(frm.email.value)){
		frm.email.value = "";
		frm.email.focus();
		return;
	}else{
		if(confirm("사용자정보 수정하시겠습니까 ?")){
			update();
		}
	}
}

function update(){
	var params = {"userInfo" : $("#updateForm").serializeObject()};
	console.log(params);
	$.ajax({
		type 		: "POST",
		contentType : "application/json",
		dataType 	: 'json',
		url 		: "../apis/userInfo/saveUserInfo",
		processData : false,
		data 		: JSON.stringify(params),
		success : function(returnValue, textStatus, jqXHR){
			alert("수정 되었습니다.");
		},
		error : function(e){
			console.log(e);
			alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
			return -1;
		}
	});
}

function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("올바른 Email 형식이 아닙니다.\n\n다시 입력해 주세요.");
		return false;
	}else{
		return true;
	}
}

//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(value, row){
	if (row.addUserId == $("#sessionId").val() || $("#userGradeA").val() == "A" || $("#userGradeA").val() == "B" || $("#userGradeA").val() == "C") {
		return "<a onclick='javascript:fn_delAction("+ row.notKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 분류 파일삭제 액션**********//
var fn_delAction = function (notKey) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsNotCustomerList",
            params = {"notKey": notKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
        	fn_searchAction();
        });
    }
};

var fn_searchSet = function(){
    openWindowWithPost("./customerSearch.sein", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {});
};

function fn_saveAdminComSet(){
	if($("#setSangho1").val()==""){
		alert("사업자를 검색하세요.");
		return;
	}else{
		var url = "../apis/edms/getEdmsNotCustomerList",
		    params = {
				"size"				: "100000",
		        "page"				: "0",
		        "_pageRow"			: "100000",
		        "_pageNumber"		: "0",
		        "saup" 				: $("#setSaup1").val(),
		        "useYn"				: "Y"
		    },
		    type = "POST";

		sendAjax(url, params, type, function(d){
			console.log(d[0].content);
			if(d[0].content.length > 0){
				alert("같은 사업자번호가 존재합니다.");
				return;
			}else{
				var url 	= "../apis/edms/saveEdmsNotCustomerList",
					params = {"edmsNotCustomerList":[{
				    	"notKey" 	: "",
				    	"sangho" : $("#setSangho1").val(),
						"saup" 	: $("#setSaup1").val(),
						"useYn"		: "Y"
				    }]};
				    type 	= "POST";

				sendAjax(url, params, type, function(d){
					fn_searchAction();
					$("#setSangho1").val("");
					$("#setSaup1").val("");
				});
			}
		});
	}
}