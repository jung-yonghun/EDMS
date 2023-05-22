$(document).ready(function(){
	var SDAB120Key;
	if($("#SDAB120Key").val()==""){
		SDAB120Key = "0";
	}else{
		SDAB120Key = $("#SDAB120Key").val();
		var url 	= "../apis/edms/getImportDeliveryCarryingInList",
		    params 	= {
				"sDAB120Key" : SDAB120Key
			},
		    type 	= "POST";

		sendAjax(url, params, type, function (d){
		    progress.hide();
		    $("#deliveryCarryingInNm").val(d[0].deliveryCarryingInNm);
		    $("#deliveryCarryingInTaxNum").val(d[0].deliveryCarryingInTaxNum);
		    $("#deliveryCarryingInMan").val(d[0].deliveryCarryingInMan);
		    $("#deliveryCarryingInPhone").val(d[0].deliveryCarryingInPhone);
		    $("#deliveryCarryingInEmail").val(d[0].deliveryCarryingInEmail);
		    $("#deliveryCarryingInMobile").val(d[0].deliveryCarryingInMobile);
		    $("#deliveryCarryingInAddr").val(d[0].deliveryCarryingInAddr);
		});
	}

	document.frm1.deliveryCarryingInNm.focus();
});

var fn_saveAction = function(status) {
	switch(status) {
		case 'insert':
			if(document.frm1.deliveryCarryingInNm.value==""){
				document.frm1.deliveryCarryingInNm.focus();
				alert("착지명을 넣으세요.");
				return;
			}else if(document.frm1.deliveryCarryingInTaxNum.value==""){
				document.frm1.deliveryCarryingInTaxNum.focus();
				alert("사업자번호를 넣으세요.");
				return;
			}else if(document.frm1.deliveryCarryingInMan.value==""){
				document.frm1.deliveryCarryingInMan.focus();
				alert("담당자를 넣으세요.");
				return;
			}else if(document.frm1.deliveryCarryingInAddr.value==""){
				document.frm1.deliveryCarryingInAddr.focus();
				alert("착지주소를 넣으세요.");
				return;
			}else{
				if(!confirm("[저장] 하시겠습니까?")) return;
			}
			break;
		case 'delete':
			if(!confirm("[삭제] 하시겠습니까?")) return;
			break;
		default :
			alert("구현중입니다.");
			return;
	}

	try {
		if (status=='insert'){
			var params 	= {"importDeliveryCarryingInList" : [$("#frm1").serializeObject()]},
				url 	= "../apis/edms/saveImportDeliveryCarryingInList",
				type 	= "POST";

			sendAjax(url, params, type, function(d) {
				fn_backAction();
			});
		}

		if (status=='delete'){
			$("#frm1 #useYn").val("N");
			var params 	= {"importDeliveryCarryingInList" : [$("#frm1").serializeObject()]},
				url 	= "../apis/edms/saveImportDeliveryCarryingInList",
				type 	= "POST";

			sendAjax(url, params, type, function(d) {
				fn_backAction();
			});
		}
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};

/* Email 유효성 체크 */
function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("올바른 Email 형식이 아닙니다.\n\n다시 입력해 주세요.");
		return false;
	}else{
		return true;
	}
}

var fn_backAction = function () {
    document.location.href = "./deliveryCarryingInList.sein?Ctype="+ $('#Ctype').val();
}