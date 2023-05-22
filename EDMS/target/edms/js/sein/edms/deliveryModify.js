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
		if(!confirm("[운송의뢰 수정] 하시겠습니까?")) return;

		var _isSuccessArr = [];
		var dd = [];

	    dd.push({
	    	"deliveryRequestKey" 		: $("#insertForm #deliveryRequestKey").val(),
			"customerKey" 				: $("#insertForm #customerKey").val(),
			"customerDb" 				: $("#insertForm #customerDb").val(),
			"customerCode" 				: $("#insertForm #customerCode").val(),
			"customerName" 				: $("#insertForm #customerName").val(),
			"customerTaxNum" 			: $("#insertForm #customerTaxNum").val(),
			"mblNo" 					: $("#insertForm #mblNo").val(),
			"hblNo" 					: $("#insertForm #hblNo").val(),
			"cargoNo" 					: $("#insertForm #cargoNo").val(),
			"singoNo" 					: $("#insertForm #singoNo").val(),
			"singoDate" 				: $("#insertForm #singoDate").val(),
			"suirDate" 					: $("#insertForm #suirDate").val(),
			"cargoStatus" 				: $("#insertForm #cargoStatus").val(),
			"pojangSu" 					: $("#insertForm #pojangSu").val(),
			"pojangDanwi" 				: $("#insertForm #pojangDanwi").val(),
			"totalJung" 				: $("#insertForm #totalJung").val(),
			"jungDanwi" 				: $("#insertForm #jungDanwi").val(),
			"impoSegwan" 				: $("#insertForm #impoSegwan").val(),
			"impoJangchBuho" 			: $("#insertForm #impoJangchBuho").val(),
			"impoJangchName" 			: $("#insertForm #impoJangchName").val(),
			"impoJangchJangso" 			: $("#insertForm #impoJangchJangso").val(),
			"impoBanipDate" 			: $("#insertForm #impoBanipDate").val(),
			"deliveryStatus" 			: "20",
			"banipPlace" 				: $("#insertForm #banipPlace").val(),
			"cargoSize" 				: $("#insertForm #cargoSize").val(),
			"deliveryPojangSu" 			: $("#insertForm #deliveryPojangSu").val(),
			"deliveryPojangDanwi"		: $("#insertForm #deliveryPojangDanwi").val(),
			"deliveryJung" 				: $("#insertForm #deliveryJung").val(),
			"deliveryJungDanwi" 		: $("#insertForm #deliveryJungDanwi").val(),
			"requestCoName" 			: $("#insertForm #requestCoName").val(),
			"requestMan" 				: $("#insertForm #requestMan").val(),
			"requestPhone" 				: $("#insertForm #requestPhone").val(),
			"requestDate" 				: $("#insertForm #requestDate").val(),
			"requestNote" 				: $("#insertForm #requestNote").val(),
			"requestInvisibleNote" 		: $("#insertForm #requestInvisibleNote").val(),
			"deliveryDate" 				: $("#insertForm #deliveryDate").val(),
			"assignId" 					: $("#insertForm #assignId").val(),
			"assignMan" 				: $("#insertForm #assignMan").val(),
			"assignPhone" 				: $("#insertForm #assignPhone").val(),
			"allocateRequestDate" 		: $("#insertForm #allocateRequestDate").val(),
			"deliveryCoKey" 			: $("#insertForm #deliveryCoKey").val(),
			"deliveryCoName" 			: $("#insertForm #deliveryCoName").val(),
			"deliveryCoPhone" 			: $("#insertForm #deliveryCoPhone").val(),
			"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
			"deliveryCarryingInName" 	: $("#insertForm #deliveryCarryingInName").val(),
			"deliveryCarryingInPhone" 	: $("#insertForm #deliveryCarryingInPhone").val(),
			"deliveryCarryingInTaxNum" 	: "",
			"deliveryCarryingInFax" 	: "",
			"deliveryCarryingInEmail" 	: $("#insertForm #deliveryCarryingInEmail").val(),
			"deliveryCarryingInMan" 	: $("#insertForm #deliveryCarryingInMan").val(),
			"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
			"deliveryCarryingInAddr" 	: $("#insertForm #deliveryCarryingInAddr").val(),
			"allocateDate" 				: $("#insertForm #allocateDate").val(),
			"deliveryCarKey" 			: $("#insertForm #deliveryCarKey").val(),
			"deliveryCarName" 			: $("#insertForm #deliveryCarName").val(),
			"deliveryCarPhone" 			: $("#insertForm #deliveryCarPhone").val(),
			"deliveryCarNum" 			: $("#insertForm #deliveryCarNum").val(),
			"deliveryStartDate" 		: $("#insertForm #deliveryStartDate").val(),
			"deliveryEndDate" 			: $("#insertForm #deliveryEndDate").val(),
			"damage" 					: $("#insertForm #damage").val(),
			"damageDetail" 				: $("#insertForm #damageDetail").val(),
			"useYn" 					: "Y"
	    });

	    var params = {"importDeliveryRequestList": dd};

	    $.ajax({
	        type: "POST",
	        contentType: "application/json",
	        dataType: 'json',
	        async : false,
	        url: "../apis/edms/saveImportDeliveryModifyList",
	        processData: false,
	        data: JSON.stringify(params),
	        success: function (returnValue, textStatus, jqXHR) {
	            _isSuccessArr.push(true);
	        },
	        error: function (e) {
	            console.log(e);
	            _isSuccessArr.push(false);
	            alert(e.responseText);
	            return -1;
	        }
	    });

	    if (_isSuccessArr.indexOf(false) == -1) {
	        setTimeout(function () {
	            alert("의뢰 내용 수정되었습니다.");
	            window.close();
	        }, 500);
	    }
	}
}

$(document).ready(function(){
	var url 	= "../apis/edms/getImportDeliveryRequestList",
		params 	= {
			"size"			: "100000",
	        "page"			: "0",
	        "_pageRow"		: "100000",
	        "_pageNumber"	: "0",
	        "singoNo"		: $("#insertForm #singoNo").val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function (d){
		console.log(d.content);
	    progress.hide();
	    $("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignMan").val(d.content[0].assignMan);
		$("#insertForm #assignPhone").val(d.content[0].assignPhone);
		$("#insertForm #impoBanipDate").val(d.content[0].impoBanipDate);
		$("#insertForm #impoSegwan").val(d.content[0].impoSegwan);
		$("#insertForm #impoJangchBuho").val(d.content[0].impoJangchBuho);
		$("#insertForm #impoJangchJangso").val(d.content[0].impoJangchJangso);
		$("#insertForm #impoJangchName").val(d.content[0].impoJangchName);
		$("#insertForm #deliveryCarryingInKey").val(d.content[0].deliveryCarryingInKey);
		$("#insertForm #deliveryCarryingInName").val(d.content[0].deliveryCarryingInName);
		$("#insertForm #deliveryCarryingInMan").val(d.content[0].deliveryCarryingInMan);
		$("#insertForm #deliveryCarryingInMobile").val(d.content[0].deliveryCarryingInMobile);
		$("#insertForm #deliveryCarryingInPhone").val(d.content[0].deliveryCarryingInPhone);
		$("#insertForm #deliveryCarryingInEmail").val(d.content[0].deliveryCarryingInEmail);
		$("#insertForm #deliveryCarryingInAddr").val(d.content[0].deliveryCarryingInAddr);
		$("#insertForm #deliveryPojangSu").val(d.content[0].deliveryPojangSu);
		$("#insertForm #deliveryPojangDanwi").val(d.content[0].deliveryPojangDanwi);
		$("#insertForm #deliveryJung").val(d.content[0].deliveryJung);
		$("#insertForm #deliveryJungDanwi").val(d.content[0].deliveryJungDanwi);
		$("#insertForm #cargoSize").val(d.content[0].cargoSize);
		$("#insertForm #banipPlace").val(d.content[0].banipPlace);
		$("#insertForm #requestInvisibleNote").val(d.content[0].requestInvisibleNote);

		$("#insertForm #deliveryRequestKey").val(d.content[0].deliveryRequestKey);
		$("#insertForm #customerKey").val(d.content[0].customerKey);
		$("#insertForm #customerDb").val(d.content[0].customerDb);
		$("#insertForm #customerCode").val(d.content[0].customerCode);
		$("#insertForm #customerName").val(d.content[0].customerName);
		$("#insertForm #customerTaxNum").val(d.content[0].customerTaxNum);
		$("#insertForm #mblNo").val(d.content[0].mblNo);
		$("#insertForm #hblNo").val(d.content[0].hblNo);
		$("#insertForm #cargoNo").val(d.content[0].cargoNo);
		$("#insertForm #singoDate").val(d.content[0].singoDate);
		$("#insertForm #suirDate").val(d.content[0].suirDate);
		$("#insertForm #cargoStatus").val(d.content[0].cargoStatus);
		$("#insertForm #pojangSu").val(d.content[0].pojangSu);
		$("#insertForm #pojangDanwi").val(d.content[0].pojangDanwi);
		$("#insertForm #totalJung").val(d.content[0].totalJung);
		$("#insertForm #jungDanwi").val(d.content[0].jungDanwi);
		$("#insertForm #deliveryStatus").val(d.content[0].deliveryStatus);
		$("#insertForm #requestCoName").val(d.content[0].requestCoName);
		$("#insertForm #requestMan").val(d.content[0].requestMan);
		$("#insertForm #requestPhone").val(d.content[0].requestPhone);
		$("#insertForm #requestDate").val(d.content[0].requestDate);
		$("#insertForm #requestNote").val(d.content[0].requestNote);
		$("#insertForm #deliveryDate").val(d.content[0].deliveryDate);
		$("#insertForm #assignId").val(d.content[0].assignId);
		$("#insertForm #allocateRequestDate").val(d.content[0].allocateRequestDate);
		$("#insertForm #deliveryCoKey").val(d.content[0].deliveryCoKey);
		$("#insertForm #deliveryCoName").val(d.content[0].deliveryCoName);
		$("#insertForm #deliveryCoPhone").val(d.content[0].deliveryCoPhone);
		$("#insertForm #deliveryCarryingInTaxNum").val(d.content[0].deliveryCarryingInTaxNum);
		$("#insertForm #deliveryCarryingInFax").val(d.content[0].deliveryCarryingInFax);
		$("#insertForm #allocateDate").val(d.content[0].allocateDate);
		$("#insertForm #deliveryCarKey").val(d.content[0].deliveryCarKey);
		$("#insertForm #deliveryCarName").val(d.content[0].deliveryCarName);
		$("#insertForm #deliveryCarPhone").val(d.content[0].deliveryCarPhone);
		$("#insertForm #deliveryCarNum").val(d.content[0].deliveryCarNum);
		$("#insertForm #deliveryStartDate").val(d.content[0].deliveryStartDate);
		$("#insertForm #deliveryEndDate").val(d.content[0].deliveryEndDate);
		$("#insertForm #damage").val(d.content[0].damage);
		$("#insertForm #damageDetail").val(d.content[0].damageDetail);
		$("#insertForm #useYn").val(d.content[0].useYn);
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
	if(obj.value=="김현정"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1764");
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