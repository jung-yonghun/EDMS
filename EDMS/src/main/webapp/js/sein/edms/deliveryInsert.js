//********** 공통코드 리스트 **********//
function getCmmnCodeList(params, callback) {
    var url = "../apis/edms/getCmmnCodeList",
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        callback(d.content);
    });
}

function fn_insertAction(){
	if(document.insertForm.deliveryCarryingInKey.value==""){
		alert("착지를 선택해서 넣으세요.");
		return;
	}else if(document.insertForm.deliveryPojangSu.value==""){
		document.insertForm.deliveryPojangSu.focus();
		alert("의뢰수량을 넣으세요.");
		return;
	}else if(document.insertForm.deliveryJung.value==""){
		document.insertForm.deliveryJung.focus();
		alert("의뢰중량을 넣으세요.");
		return;
	}else{
		if(!confirm("[운송의뢰] 하시겠습니까?")) return;

		opener.deliveryForm.deliveryPojangDanwi.value 		= document.insertForm.deliveryPojangDanwi.value;
		opener.deliveryForm.deliveryJungDanwi.value 		= document.insertForm.deliveryJungDanwi.value;
		opener.deliveryForm.assignCom.value 				= document.insertForm.assignCom.value;
		opener.deliveryForm.assignMan.value 				= document.insertForm.assignMan.value;
		opener.deliveryForm.assignPhone.value 				= document.insertForm.assignPhone.value;
		opener.deliveryForm.deliveryCarryingInKey.value 	= document.insertForm.deliveryCarryingInKey.value;
		opener.deliveryForm.deliveryCarryingInNm.value 		= document.insertForm.deliveryCarryingInNm.value;
		opener.deliveryForm.deliveryCarryingInMan.value 	= document.insertForm.deliveryCarryingInMan.value;
		opener.deliveryForm.deliveryCarryingInMobile.value 	= document.insertForm.deliveryCarryingInMobile.value;
		opener.deliveryForm.deliveryCarryingInPhone.value 	= document.insertForm.deliveryCarryingInPhone.value;
		opener.deliveryForm.deliveryCarryingInEmail.value 	= document.insertForm.deliveryCarryingInEmail.value;
		opener.deliveryForm.deliveryCarryingInAddr.value 	= document.insertForm.deliveryCarryingInAddr.value;
		opener.deliveryForm.deliveryPojangSu.value 			= document.insertForm.deliveryPojangSu.value;
		opener.deliveryForm.deliveryJung.value 				= document.insertForm.deliveryJung.value;
		opener.deliveryForm.cargoSize.value 				= document.insertForm.cargoSize.value;
		opener.deliveryForm.banipPlace.value 				= document.insertForm.banipPlace.value;
		opener.deliveryForm.requestInvisibleNote.value 		= document.insertForm.requestInvisibleNote.value;
		opener.deliveryAction();
	    window.close();
	}
}

$(document).ready(function(){
	var url 	= "../apis/edms/getImportMasterInfoByKcba",
		params 	= {
			"size"			: "100000",
	        "page"			: "0",
	        "_pageRow"		: "100000",
	        "_pageNumber"	: "0",
	        "_defaultDB"	: $("#insertForm #_defaultDB").val(),
	        "impoSingoNo"	: $("#insertForm #impoSingoNo").val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function (d){
		console.log(d);
	    progress.hide();
	    $("#insertForm #deliveryCarryingInKey").val("0");
	    $("#insertForm #deliveryCarryingInNm").val(d.content[0].Impo_napse_sangho);
	    $("#insertForm #deliveryCarryingInMan").val(d.content[0].Impo_napse_name);
	    $("#insertForm #deliveryCarryingInMobile").val("");
	    $("#insertForm #deliveryCarryingInPhone").val(d.content[0].Impo_napse_tel);
	    $("#insertForm #deliveryCarryingInEmail").val(d.content[0].Impo_napse_email);
	    $("#insertForm #deliveryCarryingInAddr").val(d.content[0].Impo_napse_juso);
	    $("#insertForm #deliveryPojangSu").val(d.content[0].Impo_pojang_su);
	    $("#insertForm #deliveryJung").val(d.content[0].Impo_total_jung);
	    $("#insertForm #impoSegwan").val(d.content[0].Impo_segwan);
	    $("#insertForm #impoJangchBuho").val(d.content[0].Impo_jangch_buho);
	    $("#insertForm #impoJangchNm").val(d.content[0].Impo_jangch_name);
	    $("#insertForm #impoJangchJangso").val(d.content[0].Impo_jangch_jangso);
	    $("#insertForm #impoBanipDtm").val(d.content[0].Impo_banip_date);
	});

	getCmmnCodeList({"mCode": 'D00002', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawConList);
	getCmmnCodeList({"mCode": 'D00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawTempList);
});

var fn_carryingIn = function(){
	openWindowWithPost("./deliveryCarryingInList.sein","width=800, height=440, scrollbars=no, location=no, menubar=no", "carryInList" ,{
		"Ctype" : "B"
	});
};

//********** 컨테이너 리스트 draw**********//
var drawConList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].NAME + "\">" + data[i].NAME + "</option>";
    }
    $("#insertForm #cargoSize").html(optList.join("\n"));
};

//********** 온도조건 리스트 draw**********//
var drawTempList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].NAME + "\">" + data[i].NAME + "</option>";
    }
    $("#insertForm #banipPlace").html(optList.join("\n"));
};

var fn_changeMan = function(obj){
	if(obj.value=="박지현"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1534");
	}else if(obj.value=="윤정언"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1534");
	}else{
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1506");
	}
};

function fn_onlyNumber(event) {
	var key = window.event ? event.keyCode : event.which;

	if ((event.shiftKey == false) && ((key > 47 && key < 58) || (key > 95 && key < 106) || key == 35 || key == 36 || key == 37 || key == 39 // 방향키 좌우,home,end
			|| key == 8 || key == 46 || key == 9) // del, back space
	) {
		return true;
	} else {
		return false;
	}
}