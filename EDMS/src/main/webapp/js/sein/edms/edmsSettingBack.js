$(document).ready(function(){
//	$(function setDataGrid(){
//        $('#teamGrid').jqGrid({
//            datatype: "local",
//            cellsubmit: 'clientArray',
//            editurl: 'clientArray',
//            colModel: [
//                {name: 'groupCode', index: 'groupCode', hidden: true},
//                {name: 'teamSeq', index: 'teamSeq', hidden: true},
//                {name: 'teamCode', index: 'teamCode', hidden: true},
//                {label: '팀명', name: 'teamName', index: 'teamName', width: 160, align: 'center'}
//            ],
//            emptyrecords: "조회내역 없음",
//            loadtext: 'Loading...',
//            height: 89,
//            shrinkToFit: false,
//            cellEdit: true,
//            autowidth: true,
//            rownumbers: true,
//            viewrecords: true,
//            loadonce: true,
//            sortable: true,
//            multiSort: true,
//            gridview: true,
//            pager: '#teamPager',
//            recordtext: "전체: {2} 건",
//            onSelectCell: function (rowId) {
//                rowData = jQuery("#teamGrid").getRowData(rowId);
//                fn_customerAction(rowData);
//            },
//            beforeSelectRow: function (rowid, e) {
//            }
//        });
//        resizeJqGridWidth('teamGrid', 'parentDiv', 0, true); // 그리드 리사이즈
//
//        $('#customerGrid').jqGrid({
//            datatype: "local",
//            cellsubmit: 'clientArray',
//            editurl: 'clientArray',
//            colModel: [
//                {label: '업체코드', name: 'utcTradeCode', index: 'utcTradeCode', align: 'center', width: 65},
//                {label: '회사명', name: 'utcTradeName', index: 'utcTradeName', width: 240},
//                {label: '사업자번호', name: 'utcEntrepreneurNo', index: 'utcEntrepreneurNo', width: 100, align: 'center'},
//                {label: '사용여부', name: 'utcUseYn', index: 'utcUseYn', width: 65, align: 'center'},
//                {label: '등록일자', name: 'addDate', index: 'addDate', width: 150, align: 'center', formatter: dateFormatter},
//                {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelFormatter},
//                {name: 'utcSeq', index: 'utcSeq', hidden: true},
//                {name: 'utSeq', index: 'utSeq', hidden: true},
//                {name: 'utcTradeDb', index: 'utcTradeDb', hidden: true},
//                {name: 'utTeamSeq', index: 'utTeamSeq', hidden: true},
//                {name: 'utTeamCode', index: 'utTeamCode', hidden: true},
//                {name: 'utTeamName', index: 'utTeamName', hidden: true},
//                {name: 'addUserId', index: 'addUserId', hidden: true},
//                {name: 'utcTradeKey', index: 'utcTradeKey', hidden: true},
//            ],
//            height: 226,
//            rowNum: 10,
//            autowidth: true,
//            shrinkToFit: false,
//            loadtext: 'Loading...',
//            emptyrecords: "조회내역 없음",
//            rownumbers: true,
//            viewrecords: true,
//            loadonce: true,
//            sortable: true,
//            multiSort: true,
//            gridview: true,
//            pager: '#customerPager',
//            recordtext: "전체: {2} 건",
//            onSelectCell: function (rowId) {
//                rowData = jQuery("#customerGrid").getRowData(rowId);
//            },
//            beforeSelectRow: function (rowid, e) {
//            }
//        });
//        jQuery("#customerGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
//        resizeJqGridWidth('customerGrid', 'parentDiv1', 0, true); // 그리드 리사이즈
//    });

//    fn_searchAction();

	getUserInfoData();
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

//var fn_searchAction = function () {
//	model.getTeamList(function (d) {
//        $('#teamGrid').clearGridData().setGridParam({
//            data: d,
//            rowNum: d.length
//        }).trigger('reloadGrid');
//    });
//};

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
//		"getTeamList": function (callback) {
//            var params = {"size": "200"},
//                url = "../apis/edms/getTeamXUserListWithAuth";
//
//            postAjax(url, params, function (d) {
//                callback(d.content);
//            });
//        },
//        "getcustomerList": function (callback) {
//            var params = $("#customForm").serializeObject(),
//                url = "../apis/edms/getUserTeamCustomerInfoList";
//
//            postAjax(url, params, function (d) {
//                callback(d.content);
//            });
//        }
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


/* Email 유효성 체크 */
function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("올바른 Email 형식이 아닙니다.\n\n다시 입력해 주세요.");
		return false;
	}else{
		return true;
	}
}



//var fn_customerAction = function (p) {
//    $("#parentDiv1 #utTeamSeq").val(p.teamSeq);
//    $("#parentDiv1 #utTeamCode").val(p.teamCode);
//    $("#parentDiv1 #utTeamName").val(p.teamName);
//
//    if ($("#customForm #utTeamCode").val() == "012") {
//        $("#customForm #utcTradeDb").val("ncustoms_sel_040");
//    } else if ($("#customForm #utTeamCode").val() == "039") {
//        $("#customForm #utcTradeDb").val("ncustoms_bs");
//    } else if ($("#customForm #utTeamCode").val() == "044") {
//        $("#customForm #utcTradeDb").val("ncustoms_us");
//    } else if ($("#customForm #utTeamCode").val() == "021") {
//        $("#customForm #utcTradeDb").val("ncustoms_ic");
//    } else if ($("#customForm #utTeamCode").val() == "020") {
//        $("#customForm #utcTradeDb").val("ncustoms_yj");
//    } else if ($("#customForm #utTeamCode").val() == "030") {
//        $("#customForm #utcTradeDb").val("ncustoms_cw");
//    } else if ($("#customForm #utTeamCode").val() == "028") {
//        $("#customForm #utcTradeDb").val("ncustoms_ca");
//    } else if ($("#customForm #utTeamCode").val() == "027") {
//        $("#customForm #utcTradeDb").val("ncustoms_cj");
//    } else if ($("#customForm #utTeamCode").val() == "022") {
//        $("#customForm #utcTradeDb").val("ncustoms_pj");
//    } else if ($("#customForm #utTeamCode").val() == "026") {
//        $("#customForm #utcTradeDb").val("ncustoms_pt");
//    } else if ($("#customForm #utTeamCode").val() == "029") {
//        $("#customForm #utcTradeDb").val("ncustoms_gm");
//    } else if ($("#customForm #utTeamCode").val() == "024") {
//        $("#customForm #utcTradeDb").val("ncustoms_ay");
//    } else if ($("#customForm #utTeamCode").val() == "031") {
//        $("#customForm #utcTradeDb").val("ncustoms_ys");
//    } else if ($("#customForm #utTeamCode").val() == "075") {
//        $("#customForm #utcTradeDb").val("ncustoms_jj");
//    } else if ($("#customForm #utTeamCode").val() == "076") {
//        $("#customForm #utcTradeDb").val("ncustoms_dj");
//    } else if ($("#customForm #utTeamCode").val() == "008") {
//        $("#customForm #utcTradeDb").val("ncustoms_sel4");
//    } else if ($("#customForm #utTeamCode").val() == "023" || $("#customForm #utTeamCode").val() == "025") {
//        $("#customForm #utcTradeDb").val("ncustoms_sn");
//    } else {
//        $("#customForm #utcTradeDb").val("ncustoms");
//    }
//
//    model.getcustomerList(function (d) {
//        $('#customerGrid').clearGridData().setGridParam({
//            data: d
//        }).trigger('reloadGrid');
//    });
//};

//function reAction() {
//	model.getcustomerList(function (d) {
//        $('#customerGrid').clearGridData().setGridParam({
//            data: d
//        }).trigger('reloadGrid');
//    });
//};

//function fn_cusInsertAction() {
//    if (document.customForm.utTeamCode.value == "" || document.customForm.utTeamCode.value == null) {
//        alert("상단 소속팀을 선택하세요.");
//    } else {
//        openWindowWithPost("./teamCustomSet.sein", "width=360, height=420, scrollbars=no, location=no, menubar=no", "List", {
//            "utcTradeDb": $("#customForm #utcTradeDb").val(),
//            "utTeamSeq": $("#customForm #utTeamSeq").val(),
//            "utTeamCode": $("#customForm #utTeamCode").val(),
//            "utTeamName": $("#customForm #utTeamName").val()
//        });
//    }
//}

//function dateFormatter(cellValue, options, rowObject) {
//    if (cellValue == undefined) return "";
//    return convertUnixDate(cellValue);
//}

//********** 업체 삭제 formatter**********//
//function linkDelFormatter(cellValue, options, rowData, action) {
//    if ($("#userGradeA").val() == "A" || $("#userGradeA").val() == "B" || $("#userGradeA").val() == "C") {
//        return "<a onclick='javascript:fn_delAction(" + rowData.utcSeq + ", " + rowData.utcTradeKey + ", \"" + rowData.utcTradeDb + "\", \"" + rowData.utcTradeName + "\", " + rowData.utTeamSeq + ", \"" + rowData.utTeamCode + "\", \"" + rowData.utTeamName + "\", \"" + rowData.utcTradeCode + "\", \"" + rowData.utcEntrepreneurNo + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
//    } else {
//        return "";
//    }
//}

//********** 업체 삭제 액션**********//
//var fn_delAction = function (utcSeq, utcTradeKey, utcTradeDb, utcTradeName, utTeamSeq, utTeamCode, utTeamName, utcTradeCode, utcEntrepreneurNo) {
//    if (confirm("[삭제] 하시겠습니까?")) {
//        var url = "../apis/edms/saveUserTeamCustomerInfo",
//            params = {
//                "utcSeq": utcSeq,
//                "utcName": "",
//                "utcTradeKey": utcTradeKey,
//                "utcTradeDb": utcTradeDb,
//                "utcTradeName": utcTradeName,
//                "utTeamSeq": utTeamSeq,
//                "utTeamCode": utTeamCode,
//                "utTeamName": utTeamName,
//                "utcTradeCode": utcTradeCode,
//                "utcEntrepreneurNo": utcEntrepreneurNo,
//                "utcUseYn": "N"
//            },
//            type = "POST";
//
//        sendAjax(url, params, type, function (d) {
//            reAction();
//        });
//    }
//};