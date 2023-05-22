var console = window.console || {log:function(){}};
var sIds;

//********** 팀 리스트 **********//
function getTeamSet(params, callback){
	var url 	= "../apis/userInfo/getTeamXUserListWithAuth",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d.content);
	});
}

$(document).ready(function() {
	getTeamSet({}, drawTeamList);
	drawStatusListImportForm();

	var url 	= "../apis/edms/getEdmsMasterList",
		params 	= {"edmsKey":$('#edmsKey').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		progress.hide();
		console.log(d.content);
		if(!d.content) return;
//		if(d.content[0]['edmsStatus']=="4"){
//			$("#saveBtn").css("display",'none');
//			$("#saveTxt").css("display",'block');
//		}

		d.content[0]['teamCode'].substring(0,3) == "" ? $("#teamCode option:eq(0)").attr("selected", "selected") : $("#teamCode").val(d.content[0]['teamCode'].substring(0,3));
		$("#utTeamCode").val($("#teamCode option:selected").attr("hid_value"));
		$("#utTeamSeq").val($("#teamCode option:selected").attr("hid_value1"));
		$("#utTeamName").val($("#teamCode option:selected").attr("hid_value2"));
		$("#edmsComNum").val(d.content[0]['edmsComNum']);
		$("#edmsComKey").val(d.content[0]['edmsComKey']);
		$("#jisaCode").val(d.content[0]['jisaCode']);
		$("#edmsComCode").val(d.content[0]['edmsComCode']);
		$("#edmsComName").val(d.content[0]['edmsComName']);
		$("#edmsNum").val(d.content[0]['edmsNum']);
		$("#divisionSingoYn").val(d.content[0]['divisionSingoYn']);
		$("#singoNum").val(d.content[0]['singoNum']);
		$("#iphangDay").val(d.content[0]['iphangDay']);
		$("#banipDay").val(d.content[0]['banipDay']);
		$("#singoDay").val(d.content[0]['singoDay']);
		$("#suriDay").val(d.content[0]['suriDay']);
		$("#banchulDay").val(d.content[0]['banchulDay']);
		$("#edmsGubun").val(d.content[0]['edmsGubun']);
		$("#edmsManagementNum").val(d.content[0]['edmsManagementNum']);
		$("#edmsStatus").val(d.content[0]['edmsStatus']);
		$("#addDay").val(d.content[0]['addDay']);
		$("#editDay").val(d.content[0]['editDay']);
		$("#addUserName").val(d.content[0]['addUserName']);
	});
});

//********** 팀리스트 draw **********//
var drawTeamList = function(data){
	var optList = new Array();
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\" hid_value=\"" + data[i]["teamCode"] + "\" hid_value1=\"" + data[i]["teamSeq"] + "\" hid_value2=\"" + data[i]["teamName"] + "\">" + data[i]["teamName"] + "</option>";
		$("#utTeamCode").val(data[0]["teamCode"]);
		$("#utTeamSeq").val(data[0]["teamSeq"]);
		$("#utTeamName").val(data[0]["teamName"]);
	}
	$("#teamCode").html(optList.join("\n"));
};

//********** 미분류 팀 셀렉트 액션 **********//
var ChangeTeam = function(obj){
	$("#edmsComNum").val('');
	$("#edmsComKey").val('');
	$("#jisaCode").val('');
	$("#edmsComCode").val('');
	$("#edmsComName").val('');
	$("#utTeamCode").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
	$("#utTeamSeq").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
	$("#utTeamName").val(obj.options[obj.selectedIndex].getAttribute("hid_value2"));
};

//********** 업체 찾기  **********//
function fn_searchTaxpayer(){
	openWindowWithPost("./searchTaxpayer.sein","width=300, height=320, scrollbars=no, menubar=no, resizable=1", "searchTaxpayer" ,{
		"utTeamCode" 	: $("#utTeamCode").val(),
		"utTeamSeq" 	: $("#utTeamSeq").val(),
		"utTeamName" 	: $("#utTeamName").val()
	});
}

//********** 메인 처리현황 리스트 draw (수입)**********//
var drawStatusListImportForm = function(){
	var optList = new Array();
	optList[0] = "<option value=\"0\">미처리</option>";
	optList[1] = "<option value=\"1\">반입</option>";
	optList[2] = "<option value=\"2\">신고</option>";
	optList[3] = "<option value=\"3\">수리</option>";
	optList[4] = "<option value=\"4\">반출</option>";
	$("#notForm #edmsStatus").html(optList.join("\n"));
};

//********** 숫자만 입력 **********//
function showKeyCode(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || keyID == 8 || keyID == 46 || keyID == 9 ){
		return;
	}else{
		return false;
	}
}

function fn_insertAction(){
	frm = document.notForm;
	if(frm.edmsComCode.value == ""){
		alert("업체를 선택하세요");
		return;
	}else if(frm.edmsNum.value == ""){
		alert("H B/L No를 입력하세요");
		frm.edmsNum.focus();
		return;
	}else{
		if(confirm("[저장] 하시겠습니까 ?")){
			insert();
		}
	}
}

function insert(){
	var url 	= "../apis/edms/saveEdmsMasterInfo",
		params  = $("#notForm").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		opener.fn_searchActionTotal();
		window.close();
	});
}