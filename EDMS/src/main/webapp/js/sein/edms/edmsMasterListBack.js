//********** 팀 리스트 **********//
function getTeamSet(params, callback) {
    var url = "../apis/edms/getTeamXUserListWithAuth",
        type = "POST";

    sendAjax(url, params, type, function (d) {
        callback(d.content);
    });
}

//********** 사업자 리스트 **********//
function getTaxPayerSet(callback) {
    var url = "../apis/edms/getUserTeamCustomerInfoList",
        params = $("#notForm").serializeObject(),
        type = "POST";

    sendAjax(url, params, type, function (d) {
        callback(d.content);
    });
}

//********** 공통코드 리스트 **********//
function getCmmnCodeList(params, callback) {
    var url = "../apis/edms/getCmmnCodeList",
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 미분류파일 리스트 **********//
function selectNotFileList(callback) {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "100000",
            "page"				: "0",
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsParentGubun"	: "NOTCLASS",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        if (d.content.length == 0) {
            $("#totalNotcnt").val("0");
        } else {
            $("#totalNotcnt").val(d.totalElements);
        }
        callback(d.content);
    });
}

//********** 필증파일 리스트 **********//
function selectPaperFileList(callback) {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "150",
            "page"				: "0",
            "_pageRow"			: "150",
            "_pageNumber"		: "0",
            "edmsParentGubun"	: "PAPER",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 파일 리스트 **********//
function selectFileList(code, callback) {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
            "edmsParentKey": code,
            "useYn": "Y"
        },
        type = "POST";
    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 미분류->분류 액션 **********//
function saveChangeAction(code, callback) {
    var url 	= "../apis/edms/fixEdmsNotClassification",
        params 	= {
            "edmsMaster"			: $("#notForm").serializeObject(),
            "edmsAttachFileVOList"	: code,
            "newEdmsGubun"			: $('#notForm #edmsGubun').val(),
            "_allFileTransfer"		: "N",
            "yyyymmdd"				: $('#notForm #yyyymmdd').val()
        },
        type 	= "POST";
    sendAjax(url, params, type, function (d) {
    	console.log(d);
        $('#notForm #edmsStatus').val("0");
        $('#notForm #edmsNum').val("");
        $('#notForm #iphangDay').val("10000101");
        $('#notForm #banipDay').val("10000101");
        $('#notForm #singoDay').val("10000101");
        $('#notForm #suriDay').val("10000101");
        $('#notForm #banchulDay').val("10000101");
        fn_NotFileAction();
        fn_searchActionTotal();
    });
}

//********** 분류->미분류 Master액션 **********//
function saveReturnMasterAction(code, callback) {
    var url 	= "../apis/edms/saveEdmsMasterInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    	fn_searchActionTotal();
    	$('#fileGrid').clearGridData();
        fn_NotFileAction();
    });
}

//********** 분류->미분류 파일액션 **********//
function saveReturnFileAction(code, callback) {
    var url 	= "../apis/edms/saveEdmsFileInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    });
}

//********** 파일리스트 구분저장 액션**********//
function saveFileDetailSaveAction(code, callback) {
    var url 	= "../apis/edms/saveEdmsFileAdditionalInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    	fn_fileAction1($("#addForm #edmsKey").val(), $("#addForm #edmsSearchKeyword").val(), $("#addForm #edmsGubun").val());
        //fn_fileAction2($("#addForm #edmsKey").val());
    });
}

//********** 비엘번호 수정 저장 액션**********//
//function saveChangeNumAction(code, callback){
//	var url 	= "../apis/edms/saveEdmsMasterInfo",
//		params  = code,
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		fn_searchActionTotal();
//	});
//}

//********** 수입 화물정보 저장 액션**********//
function saveStatusAction(callback) {
    var url = "../apis/edms/saveEdmsMasterInfo",
        params = $("#changeForm").serializeObject(),
        type = "POST";
    sendAjax(url, params, type, function (d) {
    });
}

//********** 미분류 -> 기타 Master액션 **********//
function saveChangeEtcAction(code, callback){
	var url 	= "../apis/edms/saveEdmsMasterInfo",
		params  = code,
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		fn_searchActionTotal();
	});
}

//********** 미분류 -> 기타 파일액션 **********//
//function saveChangeEtcFileAction(code, callback){
//	var url 	= "../apis/edms/saveEdmsFileInfo",
//		params  = code,
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		fn_NotFileAction();
//	});
//}

//********** 메인 나의 리스트**********//
function selectEdmsMasterMyList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
            "edmsMasterUserId"	: $('#frm2 #edmsMasterUserId').val(),
            "teamCode"			: $('#frm2 #teamCode').val(),
            "edmsGubun"			: $('#frm2 #edmsGubun').val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        console.log(d.content);
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 메인 팀 리스트**********//
function selectEdmsMasterTeamList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
            "teamCode"			: $('#frm2 #teamCode').val(),
            "edmsGubun"			: $('#frm2 #edmsGubun').val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        console.log(d.content);
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 메인 지사 리스트**********//
function selectEdmsMasterJisaList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm2 #jisaCode').val(),
            "jisaCode"			: $('#frm2 #jisaCode').val(),
            "edmsGubun"			: $('#frm2 #edmsGubun').val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        console.log(d.content);
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 메인 전체 리스트**********//
function selectEdmsMasterAllList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsGubun"			: $('#frm2 #edmsGubun').val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        callback(d.content);
    });
}

//********** 일괄다운로드 ZIP **********//
function saveZipAction(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingEdmsFiles",
        params = {
            "batchDownloadEdmsFileList": code,
            "downloadFileName": "allDownload.zip"
        },
        type = "POST";

    $.ajax({
        type: type,
        url: url,
        data: type.toLowerCase() == "get" ? params : JSON.stringify(params),
        beforeSend: function (xhr) {
            xhr.setRequestHeader(csrfHeader, csrfToken);
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        },
        success: function (response, status, xhr) {
            progress.hide();
            location.href = "../apis/edms/batchDownloadEdmsFiles?fileName=" + response + "";
        },
        error: function (e) {
            console.error("에러내용", e);
            alert("일괄다운 권한이 없습니다.\n관리자에게 문의하세요!!!");
            progress.hide();
            return -1;
        }
    });
}

//function selectImpoExpoMasterList(callback) {
//    progress.show();
//    var url = "../apis/edms/getCustomsClearanceByUnregisteredEdmsMasterList",
//        params = {
//            "size": "100000",
//            "page": "0",
//            "_pageRow": "100000",
//            "_pageNumber": "0",
//            "_dateType": $('#frmTab1 #_dateType').val(),
//            "startDay": $('#frmTab1 #startDay').val(),
//            "endDay": $('#frmTab1 #endDay').val(),
//            "napseSangho": $('#frmTab1 #napseSangho').val(),
//            "blNo": $('#frmTab1 #blNo').val(),
//            "singoNo": $('#frmTab1 #singoNo').val(),
//            "_impoDefaultDB": $('#frmTab1 #_impoDefaultDB').val(),
//            "_expoDefaultDB": $('#frmTab1 #_expoDefaultDB').val(),
//            "_customsUserId": $('#frmTab1 #_customsUserId').val(),
//            "useYn": "Y"
//        },
//        type = "POST";
//
//    sendAjax(url, params, type, function (d) {
//        progress.hide();
//        callback(d.content);
//    });
//}

function selectNapseMasterList(callback){
    progress.show();
    var url = "../apis/edms/getfindEdmsMasterList",
        params = {
            "size"			: "100000",
            "page"			: "0",
            "_pageRow"		: "100000",
            "_pageNumber"	: "0",
            "useYn"			: "Y",
            "teamCode"		: "000",
            "edmsComName"	: $('#frmTab3 #imsTaxpayerTradeName').val(),
            "edmsNum"		: $('#frmTab3 #imsHouseBl').val(),
            "edmsGubun" 	: $('#frmTab3 #edmsGubun').val()
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        console.log(d.content);
        progress.hide();
        callback(d.content);
    });
}

//********** 초기 시작설정 **********//
$(document).ready(function () {
    $(function setDatePicker() {
        $.datepicker.setDefaults($.datepicker.regional['ko']);

        var dates = $("#frm2 #strFromDate, #frm2 #strToDate").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            currentText: "오늘",
            dateFormat: 'yymmdd',
            onSelect: function (selectedDate) {
                var option = this.id == "strFromDate" ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        });

        var dates = $("#frmTab1 #startDay, #frmTab1 #endDay").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            currentText: "오늘",
            dateFormat: 'yymmdd',
            onSelect: function (selectedDate) {
                var option = this.id == "startDay" ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        });
    });
    $('#insertForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#insertForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#insertForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#notForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#notForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#notForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#insertPaperForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#insertPaperForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#insertPaperForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm3 #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm3 #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm3 #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#addForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#addForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#addForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#returnForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#returnForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#returnForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#changeForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

    var d 			= new Date();
	var curr_hour 	= d.getHours();
	var curr_min 	= d.getMinutes();
	var curr_sec 	= d.getSeconds();
	if(curr_hour < 10){
		curr_hour = "0"+curr_hour;
	}
	if(curr_min < 10){
		curr_min = "0"+curr_min;
	}
	if(curr_sec < 10){
		curr_sec = "0"+curr_sec;
	}
	var yymmddhhmmss = $('#notForm #yyyymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#notForm #yymmddhhmmss').val(yymmddhhmmss);

    getTeamSet({"size": "100"}, drawTeamList);
    getTeamSet({"size": "100"}, drawTeamListfrmTab3);

    drawStatusListImportForm();
    drawCategoryListaddForm();

    $("#arrowRight").html('<img src="../images/common/arrowRight.gif" onclick="javascript:fn_changeAction();">');
    $("#arrowLeft").html('<img src="../images/common/arrowLeft.gif" onclick="javascript:fn_returnAction();">');

    if ($("#frm2 #USERGRADE").val() != "A" && $("#frm2 #USERGRADE").val() != "B") {
        $("select[name='gubunType'] option[value='jisa']").remove();
        $("select[name='gubunType'] option[value='all']").remove();
    }

    if ($("#frm2 #USERGRADE").val() != "A" && $("#frm2 #USERGRADE").val() != "B" && $("#frm2 #USERGRADE").val() != "C") {
        $("#downBtn").css("display", 'none');
        $("#downBtn1").css("display", 'none');
    }
    getTeamSet({"size": "100"}, drawTeamListfrm2);
    getCmmnCodeList({"mCode": 'Y00008', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawJisaListfrm2);

    //$("#frm2 #teamCode").css("display", 'none');
    $("#frm2 #teamCode").css("display", 'inline');
    $("#frm2 #jisaCode").css("display", 'none');
    $("#saveExpoBtn").css("display", 'none');

    getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);

    var count = 0;
    var errArr = [];
    var extraObj = $("#fileuploader").uploadFile({
        url: "../apis/edms/uploadEdmsFile",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: "100%",
        statusBarWidth: 250,
        maxFileSize: 30000 * 1024,
        showAbort: false,
        showDone: false,
        showDelete: false,
        showError: false,
        showStatusAfterSuccess: false,
        showStatusAfterError: false,
        allowedTypes: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps,oft,msg",
        returnType: "json",
        customProgressBar: function (obj, s) {
            this.statusbar = $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename = $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
            this.progressDiv = $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar = $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
            this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if (count++ % 2 == 0)
                this.statusbar.addClass("even");
            else
                this.statusbar.addClass("odd");
            return this;
        },
        dynamicFormData: function () {
        	progress.show();
            var data = $("#insertForm").serializeObject();
            return data;
        },
        onError: function (files, status, errMsg) {
            alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
        },
        afterUploadAll: function (obj) {
        	progress.hide();
            fn_NotFileAction();
        }
    });

    var extraObj = $("#fileuploader1").uploadFile({
        url: "../apis/edms/uploadEdmsFile",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: "100%",
        statusBarWidth: 250,
        maxFileSize: 30000 * 1024,
        showAbort: false,
        showDone: false,
        showDelete: false,
        showError: false,
        showStatusAfterSuccess: false,
        showStatusAfterError: false,
        allowedTypes: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps,oft,msg",
        returnType: "json",
        customProgressBar: function (obj, s) {
            this.statusbar = $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename = $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
            this.progressDiv = $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar = $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
            this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if (count++ % 2 == 0)
                this.statusbar.addClass("even");
            else
                this.statusbar.addClass("odd");
            return this;
        },
        dynamicFormData: function () {
            if ($("#addForm #edmsKey").val() == "") {
                alert("분류 리스트를 선택하세요.");
                return false;
            } else {
                if ($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSearchKeyword").val() == "") {
                    alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
                    return false;
                } else if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSearchKeyword").val() != "") {
                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNum").val() == "") {
                		alert("B/L(Inv) NO가 부여되지 않았습니다. 신고번호별 개별문서로 분류해주세요.");
                        return false;
                	}
                	if ($("#addForm #edmsFileCategory").val() == "B0001") {
                		progress.show();
	                    var data = {
	                        "edmsKey"			: $('#addForm #edmsKey').val(),
	                        "edmsGubun"			: $('#addForm #edmsGubun').val(),
	                        "edmsNum"			: $('#addForm #edmsNum').val(),
	                        "edmsManagementNum"	: $('#addForm #edmsManagementNum').val(),
	                        "edmsStatus"		: $('#addForm #edmsStatus').val(),
	                        "addDay"			: $('#addForm #addDay').val(),
	                        "editDay"			: $('#addForm #editDay').val(),
	                        "useYn"				: $('#addForm #useYn').val(),
	                        "addUserName"		: $('#addForm #addUserName').val(),
	                        "yyyymmdd"			: $('#addForm #yyyymmdd').val(),
	                        "edmsFileStatus"	: $('#addForm #edmsFileStatus').val(),
	                        "edmsSearchKeyword"	: $('#addForm #edmsSearchKeyword').val(),
	                        "teamCode"			: $('#addForm #teamCode').val(),
	                        "edmsComNum"		: $('#addForm #edmsComNum').val(),
	                        "edmsComKey"		: $('#addForm #edmsComKey').val(),
	                        "jisaCode"			: $('#addForm #jisaCode').val(),
	                        "edmsComCode"		: $('#addForm #edmsComCode').val(),
	                        "edmsComName"		: $('#addForm #edmsComName').val(),
	                        "edmsFileCategory"	: $('#addForm #edmsFileCategory').val(),
	                        "edmsFileNote"		: $('#addForm #edmsFileNote').val(),
	                        "iphangDay"			: $('#addForm #iphangDay').val(),
	                        "banipDay"			: $('#addForm #banipDay').val(),
	                        "singoDay"			: $('#addForm #singoDay').val(),
	                        "suriDay"			: $('#addForm #suriDay').val(),
	                        "banchulDay"		: $('#addForm #banchulDay').val(),
	                        "singoNum"			: $('#addForm #singoNum').val(),
	                        "divisionSingoYn"	: $('#addForm #divisionSingoYn').val()
	                    }
                	}else{
                		progress.show();
                		var data = {
    	                        "edmsKey"			: $('#addForm #edmsKey').val(),
    	                        "edmsGubun"			: $('#addForm #edmsGubun').val(),
    	                        "edmsNum"			: $('#addForm #edmsNum').val(),
    	                        "edmsManagementNum"	: $('#addForm #edmsManagementNum').val(),
    	                        "edmsStatus"		: $('#addForm #edmsStatus').val(),
    	                        "addDay"			: $('#addForm #addDay').val(),
    	                        "editDay"			: $('#addForm #editDay').val(),
    	                        "useYn"				: $('#addForm #useYn').val(),
    	                        "addUserName"		: $('#addForm #addUserName').val(),
    	                        "yyyymmdd"			: $('#addForm #yyyymmdd').val(),
    	                        "edmsFileStatus"	: $('#addForm #edmsFileStatus').val(),
    	                        "edmsSearchKeyword"	: "",
    	                        "teamCode"			: $('#addForm #teamCode').val(),
    	                        "edmsComNum"		: $('#addForm #edmsComNum').val(),
    	                        "edmsComKey"		: $('#addForm #edmsComKey').val(),
    	                        "jisaCode"			: $('#addForm #jisaCode').val(),
    	                        "edmsComCode"		: $('#addForm #edmsComCode').val(),
    	                        "edmsComName"		: $('#addForm #edmsComName').val(),
    	                        "edmsFileCategory"	: $('#addForm #edmsFileCategory').val(),
    	                        "edmsFileNote"		: $('#addForm #edmsFileNote').val(),
    	                        "iphangDay"			: $('#addForm #iphangDay').val(),
    	                        "banipDay"			: $('#addForm #banipDay').val(),
    	                        "singoDay"			: $('#addForm #singoDay').val(),
    	                        "suriDay"			: $('#addForm #suriDay').val(),
    	                        "banchulDay"		: $('#addForm #banchulDay').val(),
    	                        "singoNum"			: $('#addForm #singoNum').val(),
    	                        "divisionSingoYn"	: $('#addForm #divisionSingoYn').val()
    	                    }
                	}
                    return data;
                } else {
                	progress.show();
                    var data = {
                        "edmsKey"			: $('#addForm #edmsKey').val(),
                        "edmsGubun"			: $('#addForm #edmsGubun').val(),
                        "edmsNum"			: $('#addForm #edmsNum').val(),
                        "edmsManagementNum"	: $('#addForm #edmsManagementNum').val(),
                        "edmsStatus"		: $('#addForm #edmsStatus').val(),
                        "addDay"			: $('#addForm #addDay').val(),
                        "editDay"			: $('#addForm #editDay').val(),
                        "useYn"				: $('#addForm #useYn').val(),
                        "addUserName"		: $('#addForm #addUserName').val(),
                        "yyyymmdd"			: $('#addForm #yyyymmdd').val(),
                        "edmsFileStatus"	: $('#addForm #edmsFileStatus').val(),
                        "edmsSearchKeyword"	: $('#addForm #edmsSearchKeyword').val(),
                        "teamCode"			: $('#addForm #teamCode').val(),
                        "edmsComNum"		: $('#addForm #edmsComNum').val(),
                        "edmsComKey"		: $('#addForm #edmsComKey').val(),
                        "jisaCode"			: $('#addForm #jisaCode').val(),
                        "edmsComCode"		: $('#addForm #edmsComCode').val(),
                        "edmsComName"		: $('#addForm #edmsComName').val(),
                        "edmsFileCategory"	: $('#addForm #edmsFileCategory').val(),
                        "edmsFileNote"		: $('#addForm #edmsFileNote').val(),
                        "iphangDay"			: $('#addForm #iphangDay').val(),
                        "banipDay"			: $('#addForm #banipDay').val(),
                        "singoDay"			: $('#addForm #singoDay').val(),
                        "suriDay"			: $('#addForm #suriDay').val(),
                        "banchulDay"		: $('#addForm #banchulDay').val(),
                        "singoNum"			: $('#addForm #singoNum').val(),
                        "divisionSingoYn"	: $('#addForm #divisionSingoYn').val()
                    }
                    console.log(data);
                    return data;
                }
            }
        },
        onSuccess: function (files, data, xhr, pd) {
        	progress.hide();
        	refreshGridPage($('#addForm #selrow').val(),$('#addForm #pageNum').val());
        	fn_fileAction1($("#addForm #edmsKey").val(), $("#addForm #edmsSearchKeyword").val(), $("#addForm #edmsGubun").val());
        },
        onError: function(files, status, errMsg){
            alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
        }
    });

    var fileCount 	= 0;
    var submitCount = 0;
    var extraObj = $("#fileuploader2").uploadFile({
        url: "../apis/edms/uploadEdmsPaperFile",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: "100%",
        statusBarWidth: 250,
        maxFileSize: 30000 * 1024,
        showAbort: false,
        showDone: false,
        showDelete: false,
        showError: false,
        showStatusAfterSuccess: false,
        showStatusAfterError: false,
        allowedTypes: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps,oft,msg",
        returnType: "json",
        customProgressBar: function (obj, s) {
            this.statusbar = $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename = $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
            this.progressDiv = $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar = $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
            this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if (count++ % 2 == 0)
                this.statusbar.addClass("even");
            else
                this.statusbar.addClass("odd");
            return this;
        },
        dynamicFormData: function(){
            var data = $("#insertPaperForm").serializeObject();
            return data;
        },
        onSuccess:function(files,data,xhr,pd){
        	move();
        	submitCount += files.length;
        	$("#ddd").val(submitCount);
        },
        onError: function(files, status, errMsg){
            alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
        },
        afterUploadAll: function(obj){
        	document.getElementById("myBar").style.width = '100%';
            document.getElementById("label").innerHTML = '100%';
            fn_tab1Action();
            alert("필증이 분류되었습니다.");
        	setTimeout(function(){
        		document.getElementById("myBar").style.width = '0%';
                document.getElementById("label").innerHTML 	 = '';
            }, 1000);
        }
    });

    $('#notfileGrid').jqGrid({
        datatype		: "local",
        cellsubmit		: 'clientArray',
        editurl			: 'clientArray',
        loadtext		: 'Loading...',
        emptyrecords	: "조회내역 없음",
        pager			: '#notfilePager',
        recordtext		: "전체: {2} 건",
        colModel		: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 150},
            {label: '등록일', name: 'addDay', index: 'addDay', width: 70, align: 'center', formatter: dateFormatter},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadNotFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelNotFormatter},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'editUserId', index: 'editUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'edmsFileCategory', index: 'edmsFileCategory', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true}
        ],
        height			: 215,
        shrinkToFit		: false,
        sortable		: false,
        autowidth		: true,
        cellEdit		: true,
        viewrecords		: true,
        loadonce		: true,
        multiSort		: true,
        gridview		: true,
        multiselect		: true,
        pgbuttons		: false,
       	pgtext			: false,
       	pginput			: false,
        onSelectCell	: function (rowid, e) {
            rowData = jQuery("#notfileGrid").getRowData(rowid);
            sIds = rowid;
        },
        beforeSelectRow	: function (rowid, e) {
            var $self = $(this), iCol, cm,
                $td = $(e.target).closest("tr.jqgrow>td"),
                $tr = $td.closest("tr.jqgrow"),
                p = $self.jqGrid("getGridParam");

            if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                iCol = $.jgrid.getCellIndex($td[0]);
                cm = p.colModel[iCol];
                if (cm != null && cm.name === "cb") {
                    // multiselect checkbox is clicked
                    $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                }
            }
            return false;
        },
        afterEditCell	: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#notfileGrid').saveCell(iRow, iCol);
            });
        }
    });
    jQuery("#notfileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('notfileGrid', 'parentDiv0', 0, false);

//    $('#tab1Grid').jqGrid({
//        datatype: "local",
//        cellsubmit: 'clientArray',
//        editurl: 'clientArray',
//        cellEdit: true,
//        colModel: [
//            {label: 'H B/L No.', name: 'impo_bl_no', index: 'impo_bl_no', width: 100},
//            {label: '신고번호', name: 'impo_singo_no', index: 'impo_singo_no', width: 110, align: 'center', formatter: linkImportSingoFormatter},
//            {label: '업체명', name: 'Impo_napse_sangho', index: 'Impo_napse_sangho', width: 140},
//            {name: 'jisa', index: 'jisa', hidden: true},
//            {name: 'Impo_napse_code', index: 'Impo_napse_code', hidden: true},
//            {name: 'impo_napse_saup', index: 'impo_napse_saup', hidden: true},
//            {name: 'customerKey', index: 'customerKey', hidden: true},
//        ],
//        height: 291,
//        rowNum: 13,
//        autowidth: true,
//        shrinkToFit: false,
//        loadtext: 'Loading...',
//        emptyrecords: "조회내역 없음",
//        rownumbers: true,
//        viewrecords: true,
//        loadonce: true,
//        sortable: true,
//        multiSort: true,
//        gridview: true,
//        pager: '#tab1Pager',
//        recordtext: "전체: {2} 건",
//        onSelectCell: function (rowid, e) {
//            rowData = jQuery("#tab1Grid").getRowData(rowid);
//            sIds = rowid;
//        },
//        beforeSelectRow: function (rowid, e) {
//            jQuery("#tab1Grid").jqGrid('resetSelection');
//            rowData = jQuery("#tab1Grid").getRowData(rowid);
//            sIds = rowid;
//        }
//    });
//    jQuery("#tab1Grid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
//    resizeJqGridWidth('tab1Grid', 'parentDiv11', 0, true);

    $('#tab3Grid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        cellEdit: true,
        colModel: [
            {name: 'edmsKey', index: 'edmsKey', hidden: true},
            {label: 'B/L(Inv)', name: 'edmsNum', index: 'edmsNum', align:'center', width: 90, formatter: linkBlNoFormatter},
            //{label: '신고번호', name: 'singoNum', index: 'singoNum', width: 110, align: 'center', formatter: linkImportSingoFormatter},
            {label: '업체명', name: 'edmsComName', index: 'edmsComName', width: 200},
            {name: 'addUserName', index: 'addUserName', hidden: true},
            {name: 'edmsStatus', index: 'edmsStatus', hidden: true},
            {name: 'divisionSingoYn', index: 'divisionSingoYn', hidden: true},
            {name: '미구분여부', index: '미구분여부', hidden: true},
            {name: 'edmsGubun', index: 'edmsGubun', hidden: true},
            {name: 'iphangDay', index: 'iphangDay', hidden: true},
            {name: 'banipDay', index: 'banipDay', hidden: true},
            {name: 'singoDay', index: 'singoDay', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsComKey', index: 'edmsComKey', hidden: true},
            {name: 'edmsComCode', index: 'edmsComCode', hidden: true},
            {name: 'edmsComNum', index: 'edmsComNum', hidden: true},
            {name: 'jisaCode', index: 'jisaCode', hidden: true},
            {name: 'teamCode', index: 'teamCode', hidden: true},
            {name: 'editDay', index: 'editDay', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsManagementNum', index: 'edmsManagementNum', hidden: true},
            {name: 'suriDay', index: 'suriDay', hidden: true},
            {name: 'banchulDay', index: 'banchulDay', hidden: true}
        ],
        height: 111,
        rowNum: 5,
        autowidth: true,
        shrinkToFit: false,
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        sortable: true,
        multiSort: true,
        gridview: true,
        pager: '#tab3Pager',
        recordtext: "전체: {2} 건",
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#tab3Grid").getRowData(rowid);
            fn_fileListTab3ImportAction(rowData);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
            jQuery("#tab3Grid").jqGrid('resetSelection');
            rowData = jQuery("#tab3Grid").getRowData(rowid);
            sIds = rowid;
        }
    });
    jQuery("#tab3Grid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
    resizeJqGridWidth('tab3Grid', 'parentDiv33', 0, false);

    $('#tab3FileGrid').jqGrid({
        datatype		: "local",
        cellsubmit		: 'clientArray',
        editurl			: 'clientArray',
        cellEdit		: true,
        colModel		: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 240},
            //{label: '파일설명', name: 'edmsFileNote', index: 'edmsFileNote', width: 70, editable: true, editrules: {required: true}},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center'},
            {name: 'edmsFileCategory', index: 'edmsFileCategory', hidden: true},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true},
            {name: 'edmsSearchKeyword', index: 'edmsSearchKeyword', hidden: true}
        ],
        height			: 81,
        rowNum			: 5,
        autowidth		: true,
        shrinkToFit		: false,
        loadtext		: 'Loading...',
        emptyrecords	: "조회내역 없음",
        viewrecords		: true,
        loadonce		: true,
        sortable		: true,
        multiSort		: true,
        gridview		: true,
        pgbuttons		: false,
       	pgtext			: false,
       	pginput			: false,
        pager			: '#tab3FilePager',
        recordtext		: "전체: {2} 건",
        onSelectCell	: function (rowid, e) {
            rowData = jQuery("#tab3Grid").getRowData(rowid);
            sIds = rowid;
        },
        beforeSelectRow	: function (rowid, e) {
            jQuery("#tab3FileGrid").jqGrid('resetSelection');
            rowData = jQuery("#tab3FileGrid").getRowData(rowid);
            sIds = rowid;
        }
    });
    jQuery("#tab3FileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
    resizeJqGridWidth('tab3FileGrid', 'parentDiv34', 0, false);

    $('#tab1FileGrid').jqGrid({
        datatype		: "local",
        cellsubmit		: 'clientArray',
        editurl			: 'clientArray',
        loadtext		: 'Loading...',
        emptyrecords	: "조회내역 없음",
        pager			: '#tab1FilePager',
        recordtext		: "전체: {2} 건",
        colModel		: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 145},
            {label: '등록일', name: 'addDay', index: 'addDay', width: 70, align: 'center', formatter: dateFormatter},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadNotFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelPaperFormatter},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'edmsFileCategory', index: 'edmsFileCategory', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true}
        ],
        height			: 218,
        shrinkToFit		: false,
        sortable		: false,
        autowidth		: true,
        cellEdit		: true,
        viewrecords		: true,
        loadonce		: true,
        multiSort		: true,
        multiselect		: true,
        gridview		: true,
        pgbuttons		: false,
       	pgtext			: false,
       	pginput			: false,
        onSelectCell	: function (rowid, e) {
            rowData = jQuery("#tab1FileGrid").getRowData(rowid);
            sIds = rowid;
        },
        beforeSelectRow	: function (rowid, e) {
            var $self = $(this), iCol, cm,
                $td = $(e.target).closest("tr.jqgrow>td"),
                $tr = $td.closest("tr.jqgrow"),
                p = $self.jqGrid("getGridParam");

            if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                iCol = $.jgrid.getCellIndex($td[0]);
                cm = p.colModel[iCol];
                if (cm != null && cm.name === "cb") {
                    // multiselect checkbox is clicked
                    $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                }
            }
            return false;
        },
        afterEditCell	: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#tab1FileGrid').saveCell(iRow, iCol);
            });
        }
    });
    jQuery("#tab1FileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('tab1FileGrid', 'parentDiv14', 0, false);

    setImportGrid();

    $('#frm2 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm2 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

    $('#frmTab1 #startDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frmTab1 #endDay').val($.datepicker.formatDate('yymmdd', new Date()));

//    fn_tab1Action();

    $("#notForm #edmsNum").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#notForm #edmsNum").val(($("#notForm #edmsNum").val()).toUpperCase());
    });

    $("#frm2 #edmsNum").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm2 #edmsNum").val(($("#frm2 #edmsNum").val()).toUpperCase());
    });

    $("#frmTab3 #imsHouseBl").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frmTab3 #imsHouseBl").val(($("#frmTab3 #imsHouseBl").val()).toUpperCase());
    });

    $("#frm2 #singoNum").bind("paste", function(e){
        var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi, ''));
        }, 100);
    });

    $("#singoNo").bind("paste", function (e) {
        var el = $(this);
        setTimeout(function () {
            var text = $(el).val();
            $(el).val(text.replace(/-/gi, ''));
        }, 100);
    });

    setTimeout(function () {
        //getTaxPayerSet(drawTaxPayerList);
        if ($("#notForm #utTeamCode").val() == "012") {
            $("select[name='edmsGubun'] option[value='EXPORT']").attr("selected", "selected");
            ChangeGubun();
            ChangeGubunTab3();
            ChangeGubunfrm2();
            $("#changeAllBtn").css("display", 'none');
            $("#changeBtn").css("display", 'none');
        }
    }, 1000);

    fn_NotFileAction();
    resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

    initTabs();
});

var initTabs = function () {
    $(function () {
        $("#tabs").tabs().on("tabsactivate", function (event, ui) {
            var active = $('#tabs').tabs('option', 'active');
            switch (active) {
                case 0:
                    resizeJqGridWidth('notfileGrid', 'parentDiv0', 0, false);
                    fn_NotFileAction();
                    $("#arrowRight").html('<img src="../images/common/arrowRight.gif" onclick="javascript:fn_changeAction();">');
                    $("#arrowLeft").html('<img src="../images/common/arrowLeft.gif" onclick="javascript:fn_returnAction();">');
                    break;
                case 1:
                    resizeJqGridWidth('tab3Grid', 'parentDiv33', 0, false);
                    resizeJqGridWidth('tab3FileGrid', 'parentDiv34', 0, false);
                    $('#tab3FileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
                    fn_tab3Action();
                    $("#arrowRight").html('<img src="../images/common/arrowRight.gif" onclick="javascript:fn_changeAction1();">');
                    $("#arrowLeft").html('<img src="../images/common/arrowLeft.gif" onclick="javascript:fn_returnAction1();">');
                    break;
                case 2:
                    resizeJqGridWidth('tab1FileGrid', 'parentDiv14', 0, false);
                    $('#tab1FileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
                    fn_tab1Action();
                    $("#arrowRight").html('<img src="../images/common/arrowRight.gif" onclick="javascript:fn_changeAction2();">');
                    $("#arrowLeft").html('');
                    break;
                default:
                	resizeJqGridWidth('notfileGrid', 'parentDiv0', 0, false);
                    fn_NotFileAction();
                    $("#arrowRight").html('<img src="../images/common/arrowRight.gif" onclick="javascript:fn_changeAction();">');
                    $("#arrowLeft").html('<img src="../images/common/arrowLeft.gif" onclick="javascript:fn_returnAction();">');
                    break;
            }
        });
    });
};

//var fn_tab1Action = function () {
//    selectImpoExpoMasterList(function (d) {
//        $('#tab1Grid').clearGridData().setGridParam({
//            data: d
//        }).trigger('reloadGrid');
//    });
//};

var fn_tab3Action = function(){
	selectNapseMasterList(function (d){
        $('#tab3Grid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });

	$('#tab3FileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
};


//********** 수입 분류리스트, 파일리스트**********//
var setImportGrid = function () {
    $('#masterGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        cellEdit: true,
        colModel: [
            {name: 'rownum', index: 'rownum', hidden: true},
            {label: 'H B/L No.', name: 'edmsNum', index: 'edmsNum', width: 100, formatter: linkBlNoFormatter},
            {label: '신고번호', name: 'Impo_singo_no', index: 'Impo_singo_no', width: 110, align: 'center', formatter: linkImportSingoFormatter, key:true},
            {label: '업체명', name: 'edmsComName', index: 'edmsComName', width: 100},
            {label: '필증', name: 'filePaperCount', index: 'filePaperCount', width: 35, align: 'center', formatter: linkFileLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;0:X;1:O'}},
            {label: '파일', name: 'fileCount', index: 'fileCount', width: 35, align: 'center', formatter: linkFileLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;0:X'}},
            {label: '통관', name: 'Impo_receive_result', index: 'Impo_receive_result', width: 35, align: 'center'},
            {label: '운송', name: 'deliveryStatus', index: 'deliveryStatus', width: 50, align: 'center', formatter: linkDeliveryLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;20:운송의뢰;30:배차요청;40:배차완료;50:배송중;60:배송완료'}},
            {label: '등록자', name: 'addUserName', index: 'addUserName', width: 50, align: 'center'},
//            {
//                label: '통관현황', name: 'edmsStatus', index: 'edmsStatus', width: 60, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "0:미처리;1:반입;2:신고;3:수리;4:반출", defaultValue: "0"}
//            },
//            {
//                label: '분할여부', name: 'divisionSingoYn', index: 'divisionSingoYn', width: 60, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "Y:Y;N:N", defaultValue: "N"}
//            },
//            {
//                label: '구분', name: '미구분여부', index: '미구분여부', width: 40, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "미구분:미구분;완료:완료", defaultValue: "Y"}
//            },
            {name: 'edmsKey', index: 'edmsKey', hidden: true},
            {name: 'edmsGubun', index: 'edmsGubun', hidden: true},
            {name: 'Impo_iphang_date', index: 'Impo_iphang_date', hidden: true},
            {name: 'Impo_banip_date', index: 'Impo_banip_date', hidden: true},
            {name: 'Impo_singo_date', index: 'Impo_singo_date', hidden: true},
            {name: 'Impo_mrn_no', index: 'Impo_mrn_no', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsComKey', index: 'edmsComKey', hidden: true},
            {name: 'edmsComCode', index: 'edmsComCode', hidden: true},
            {name: 'edmsComNum', index: 'edmsComNum', hidden: true},
            {name: 'jisaCode', index: 'jisaCode', hidden: true},
            {name: 'teamCode', index: 'teamCode', hidden: true},
            {name: 'editDay', index: 'editDay', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsManagementNum', index: 'edmsManagementNum', hidden: true},
            {name: 'Impo_ok_date', index: 'Impo_ok_date', hidden: true},
            {name: 'edmsUploadType', index: 'edmsUploadType', hidden: true},
            {name: 'Impo_key', index: 'Impo_key', hidden: true},
            {name: 'deliveryRequestKey', index: 'deliveryRequestKey', hidden: true},
            {name: 'deliveryStatus', index: 'deliveryStatus', hidden: true}
        ],
        height: 269,
        rowNum: 20,
        rowList: [10, 20, 30, 40, 50, 100],
        autowidth: true,
        shrinkToFit: false,
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        sortable: true,
        multiSort: true,
        gridview: true,
        pager: '#masterPager',
        recordtext: "전체: {2} 건",
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#masterGrid").getRowData(rowid);
            fn_fileListImportAction(rowData);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
        	rowData = jQuery("#masterGrid").getRowData(rowid);
            sIds = rowid;
        },
        loadComplete : function(data) {
	   		var ids = $("#masterGrid").getDataIDs();
	   		$.each(
	   			ids,function(idx, rowId){
	   				rowData = $("#masterGrid").getRowData(rowId);
	   				if(rowData.fileCount == 'X'){
	   					$("#masterGrid").setRowData(rowId, false, {background:"#52c478"})
	   				}
	   			}
	   		);
	   	}
    });
    jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

    $('#fileGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        pager: '#filePager',
        recordtext: "전체: {2} 건",
        colModel: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {
                label: '구분', name: 'edmsFileCategory', index: 'edmsFileCategory', width: 60, align: 'center',
                edittype: 'select',
                formatter: 'select',
                editable: true,
                editoptions: {
                    value: "Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타",
                    defaultValue: "Z0001"
                }
            },
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 180},
            //{label: '파일설명', name: 'edmsFileNote', index: 'edmsFileNote', width: 70, editable: true, editrules: {required: true}},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelFormatter},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true},
            {name: 'edmsSearchKeyword', index: 'edmsSearchKeyword', hidden: true},
            {name: 'edmsFileAddDay', index: 'edmsFileAddDay', hidden: true},
        ],
        height: 308,
        rowNum: 20,
        shrinkToFit: false,
        sortable: false,
        autowidth: true,
        cellEdit: true,
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        multiSort: true,
        gridview: true,
        multiselect: true,
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#fileGrid").getRowData(rowid);
            sIds = rowid;
            //$(this).setSelection(rowid, true);
        },
        beforeSelectRow: function (rowid, e) {
            var $self = $(this), iCol, cm,
                $td = $(e.target).closest("tr.jqgrow>td"),
                $tr = $td.closest("tr.jqgrow"),
                p = $self.jqGrid("getGridParam");

            if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                iCol = $.jgrid.getCellIndex($td[0]);
                cm = p.colModel[iCol];
                if (cm != null && cm.name === "cb") {
                    $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                }
            }
            return false;
        },
        afterEditCell: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#fileGrid').saveCell(iRow, iCol);
            });
        }
    });
    jQuery("#fileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('fileGrid', 'parentDiv1', 0, false);
};

//********** 수출 분류리스트, 파일리스트**********//
var setExportGrid = function () {
    $('#masterGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        cellEdit: true,
        colModel: [
            {name: 'rownum', index: 'rownum', hidden: true, key: true},
            {label: 'Invoice No.', name: 'edmsNum', index: 'edmsNum', width: 100},
            {label: '신고번호', name: 'Expo_singo_no', index: 'Expo_singo_no', width: 110, align: 'center', formatter: linkExportSingoFormatter, key: true},
            {label: '업체명', name: 'edmsComName', index: 'edmsComName', width: 140},
            {label: '필증', name: 'filePaperCount', index: 'filePaperCount', width: 35, align: 'center', formatter: linkFileLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;0:X;1:O'}},
            {label: '파일', name: 'fileCount', index: 'fileCount', width: 35, align: 'center', formatter: linkFileLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;0:X'}},
            {label: '통관', name: 'Expo_res_result', index: 'Expo_res_result', width: 40, align: 'center'},
            {label: '등록자', name: 'addUserName', index: 'addUserName', width: 50, align: 'center'},
//            {
//                label: '통관현황', name: 'Expo_res_result', index: 'Expo_res_result', width: 60, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "0:미처리;검사:검사;면허:면허;서류:서류;수리:수리;오류:오류;취하:취하", defaultValue: "0"}
//            },
//			{label:'분할여부', name:'divisionSingoYn', index:'divisionSingoYn', width:60, align:'center',
//            	edittype:'select',
//            	formatter: 'select',
//            	editoptions:{value: "Y:Y;N:N", defaultValue: "N"}
//            },
//            {
//                label: '구분', name: '미구분여부', index: '미구분여부', width: 40, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "미구분:미구분;완료:완료", defaultValue: "Y"}
//            },
            {name: 'edmsKey', index: 'edmsKey', hidden: true},
            {name: 'edmsGubun', index: 'edmsGubun', hidden: true},
            {name: 'Expo_singo_date', index: 'Expo_singo_date', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsComKey', index: 'edmsComKey', hidden: true},
            {name: 'edmsComCode', index: 'edmsComCode', hidden: true},
            {name: 'edmsComNum', index: 'edmsComNum', hidden: true},
            {name: 'jisaCode', index: 'jisaCode', hidden: true},
            {name: 'teamCode', index: 'teamCode', hidden: true},
            {name: 'editDay', index: 'editDay', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsManagementNum', index: 'edmsManagementNum', hidden: true},
            {name: 'Expo_ok_date', index: 'Expo_ok_date', hidden: true},
            {name: 'edmsUploadType', index: 'edmsUploadType', hidden: true}
        ],
        height: 269,
        rowNum: 20,
        rowList: [10, 20, 30, 40, 50, 100],
        autowidth: true,
        shrinkToFit: false,
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        sortable: true,
        multiSort: true,
        gridview: true,
        pager: '#masterPager',
        recordtext: "전체: {2} 건",
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#masterGrid").getRowData(rowid);
            fn_fileListExportAction(rowData);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
            jQuery("#masterGrid").jqGrid('resetSelection');
            rowData = jQuery("#masterGrid").getRowData(rowid);
            sIds = rowid;
        },
        afterEditCell: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#masterGrid').saveCell(iRow, iCol);
            });
        },
        loadComplete : function(data) {
	   		var ids = $("#masterGrid").getDataIDs();
	   		$.each(
	   			ids,function(idx, rowId){
	   				rowData = $("#masterGrid").getRowData(rowId);
	   				if(rowData.fileCount == 'X'){
	   					$("#masterGrid").setRowData(rowId, false, {background:"#52c478"})
	   				}
	   			}
	   		);
	   	}
    });
    jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

    $('#fileGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        pager: '#filePager',
        recordtext: "전체: {2} 건",
        colModel: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {
                label: '구분', name: 'edmsFileCategory', index: 'edmsFileCategory', width: 60, align: 'center',
                edittype: 'select',
                formatter: 'select',
                editable: true,
                // TODO 20170821
                // editoptions:{value: "미구분:미구분;B/L:B/L;Invoice:Invoice;Packing:Packing;C/O:C/O;신고필증:신고필증;요건서류:요건서류;운임Inv:운임Inv;Email:Email;병합:병합;정산서:정산서;인수증:인수증;기타:기타", defaultValue: "미구분"}
                editoptions: {
                    value: "Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타",
                    defaultValue: "Z0001"
                }
            },
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 180},
            //{label: '파일설명', name: 'edmsFileNote', index: 'edmsFileNote', width: 70, editable: true, editrules: {required: true}},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelFormatter},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true},
            {name: 'edmsSearchKeyword', index: 'edmsSearchKeyword', hidden: true}
        ],
        height: 308,
        rowNum: 20,
        shrinkToFit: false,
        sortable: false, //상단메뉴 이동
        autowidth: true,
        cellEdit: true,
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        multiSort: true,
        gridview: true,
        multiselect: true,
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#fileGrid").getRowData(rowid);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
            var $self = $(this), iCol, cm,
                $td = $(e.target).closest("tr.jqgrow>td"),
                $tr = $td.closest("tr.jqgrow"),
                p = $self.jqGrid("getGridParam");

            if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                iCol = $.jgrid.getCellIndex($td[0]);
                cm = p.colModel[iCol];
                if (cm != null && cm.name === "cb") {
                    $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                }
            }
            return false;
        },
        afterEditCell: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#fileGrid').saveCell(iRow, iCol);
            });
        }
    });
    jQuery("#fileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('fileGrid', 'parentDiv1', 0, false);
};

//********** 기타 분류리스트, 파일리스트**********//
var setEtcGrid = function () {
    $('#masterGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        cellEdit: true,
        colModel: [
            {label: '관리번호', name: 'edmsNum', index: 'edmsNum', width: 100},
            {label: '업체명', name: 'edmsComName', index: 'edmsComName', width: 230},
            {label: '파일', name: 'fileCount', index: 'fileCount', width: 40, align: 'center', formatter: linkFileLinkFormatter, stype: 'select', searchoptions: {sopt: ['eq'], value: ':전체;0:X'}},
            {label: '등록자', name: 'addUserName', index: 'addUserName', width: 100, align: 'center'},
//            {
//                label: '구분', name: '미구분여부', index: '미구분여부', width: 40, align: 'center',
//                edittype: 'select',
//                formatter: 'select',
//                editoptions: {value: "미구분:미구분;완료:완료", defaultValue: "Y"}
//            },
            {name: 'edmsKey', index: 'edmsKey', hidden: true},
            {name: 'edmsGubun', index: 'edmsGubun', hidden: true},
            {name: 'edmsNum', index: 'edmsNum', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsComKey', index: 'edmsComKey', hidden: true},
            {name: 'edmsComCode', index: 'edmsComCode', hidden: true},
            {name: 'edmsComNum', index: 'edmsComNum', hidden: true},
            {name: 'jisaCode', index: 'jisaCode', hidden: true},
            {name: 'teamCode', index: 'teamCode', hidden: true},
            {name: 'editDay', index: 'editDay', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsManagementNum', index: 'edmsManagementNum', hidden: true},
            {name: 'edmsUploadType', index: 'edmsUploadType', hidden: true}
        ],
        height: 269,
        rowNum: 20,
        rowList: [10, 20, 30, 40, 50, 100],
        autowidth: true,
        shrinkToFit: false,
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        sortable: true,
        multiSort: true,
        gridview: true,
        pager: '#masterPager',
        recordtext: "전체: {2} 건",
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#masterGrid").getRowData(rowid);
            fn_fileListEtcAction(rowData);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
            jQuery("#masterGrid").jqGrid('resetSelection');
            rowData = jQuery("#masterGrid").getRowData(rowid);
            sIds = rowid;
        },
        loadComplete : function(data) {
	   		var ids = $("#masterGrid").getDataIDs();
	   		$.each(
	   			ids,function(idx, rowId){
	   				rowData = $("#masterGrid").getRowData(rowId);
	   				if(rowData.fileCount == 'X'){
	   					$("#masterGrid").setRowData(rowId, false, {background:"#52c478"})
	   				}
	   			}
	   		);
	   	}
    });
    jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

    $('#fileGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        pager: '#filePager',
        recordtext: "전체: {2} 건",
        colModel: [
            {name: 'edmsFileKey', index: 'edmsFileKey', hidden: true, key: true},
            {
                label: '구분', name: 'edmsFileCategory', index: 'edmsFileCategory', width: 60, align: 'center',
                edittype: 'select',
                formatter: 'select',
                // TODO 20170821
                // editoptions:{value: "미구분:미구분", defaultValue: "미구분"}
                editoptions: {value: "Z0001:미구분", defaultValue: "Z0001"}
            },
            {label: '파일명', name: 'edmsOrgFileName', index: 'edmsOrgFileName', width: 180},
            //{label: '파일설명', name: 'edmsFileNote', index: 'edmsFileNote', width: 70, editable: true, editrules: {required: true}},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadFormatter},
            {label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelFormatter},
            {name: 'addUserId', index: 'addUserId', hidden: true},
            {name: 'edmsParentGubun', index: 'edmsParentGubun', hidden: true},
            {name: 'edmsParentKey', index: 'edmsParentKey', hidden: true},
            {name: 'addDay', index: 'addDay', hidden: true},
            {name: 'edmsFileStatus', index: 'edmsFileStatus', hidden: true},
            {name: 'useYn', index: 'useYn', hidden: true},
            {name: 'edmsSaveFileName', index: 'edmsSaveFileName', hidden: true},
            {name: 'edmsFileSize', index: 'edmsFileSize', hidden: true},
            {name: 'edmsServerIp', index: 'edmsServerIp', hidden: true},
            {name: 'edmsFilePath', index: 'edmsFilePath', hidden: true},
            {name: 'edmsServerGubun', index: 'edmsServerGubun', hidden: true},
            {name: 'edmsFileExt', index: 'edmsFileExt', hidden: true},
            {name: 'edmsSearchKeyword', index: 'edmsSearchKeyword', hidden: true}
        ],
        height: 308,
        rowNum: 20,
        shrinkToFit: false,
        sortable: false, //상단메뉴 이동
        autowidth: true,
        cellEdit: true,
        rownumbers: true,
        viewrecords: true,
        loadonce: true,
        multiSort: true,
        gridview: true,
        multiselect: true,
        onSelectCell: function (rowid, e) {
            rowData = jQuery("#fileGrid").getRowData(rowid);
            sIds = rowid;
        },
        beforeSelectRow: function (rowid, e) {
            var $self = $(this), iCol, cm,
                $td = $(e.target).closest("tr.jqgrow>td"),
                $tr = $td.closest("tr.jqgrow"),
                p = $self.jqGrid("getGridParam");

            if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                iCol = $.jgrid.getCellIndex($td[0]);
                cm = p.colModel[iCol];
                if (cm != null && cm.name === "cb") {
                    $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                }
            }
            return false;
        },
        afterEditCell: function (rowid, cellname, value, iRow, iCol) {
            $("#" + iRow + "_" + cellname).bind('blur', function () {
                $('#fileGrid').saveCell(iRow, iCol);
            });
        }
    });
    jQuery("#fileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
    resizeJqGridWidth('fileGrid', 'parentDiv1', 0, false);
};

//********** 미분류 파일리스트 조회액션**********//
var fn_NotFileAction = function () {
    selectNotFileList(function (d) {
        $('#notfileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 면장등록 파일리스트 조회액션**********//
var fn_tab1Action = function () {
    selectPaperFileList(function (d) {
        $('#tab1FileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 미분류 팀리스트 draw **********//
var drawTeamList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\" hid_value=\"" + data[i]["teamCode"] + "\" hid_value1=\"" + data[i]["teamSeq"] + "\" hid_value2=\"" + data[i]["teamName"] + "\">" + data[i]["teamName"] + "</option>";
        $("#notForm #utTeamCode").val(data[0]["teamCode"]);
        $("#notForm #utTeamSeq").val(data[0]["teamSeq"]);
        $("#notForm #utTeamName").val(data[0]["teamName"]);
    }
    $("#notForm #teamCode").html(optList.join("\n"));
};

//********** 미분류 팀 셀렉트 액션 **********//
var ChangeTeam = function (obj) {
    $("#notForm #edmsComNum").val('');
    $("#notForm #edmsComKey").val('');
    $("#notForm #jisaCode").val('');
    $("#notForm #edmsComCode").val('');
    $("#notForm #edmsComName").val('');
    $("#notForm #utTeamCode").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
    $("#notForm #utTeamSeq").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
    $("#notForm #utTeamName").val(obj.options[obj.selectedIndex].getAttribute("hid_value2"));

    if ($("#notForm #edmsGubun option:selected").val() == "SEINETC" || $("#notForm #edmsGubun option:selected").val() == "HWANGUP") {
        drawTaxPayerEtcList();
    }
//	}else{
//		getTaxPayerSet(drawTaxPayerList);
//	}
};

//********** 미분류 업체리스트 draw (수입/수출)**********//
//var drawTaxPayerList = function(data){
//	var optList = new Array();
//	for(var i = 0; i < data.length; i++){
//		optList[optList.length] = "<option value=\"" + data[i]["utcEntrepreneurNo"] + "\" hid_value=\"" + data[i]["utcTradeKey"] + "\" hid_value1=\"" + data[i]["utcTradeDb"] + "\" hid_value2=\"" + data[i]["utcTradeCode"] + "\" hid_value3=\"" + data[i]["utcTradeName"] + "\">[" + data[i]["utcTradeCode"] + "] " + data[i]["utcTradeName"] + "</option>";
//		$("#notForm #edmsComKey").val(data[0]["utcTradeKey"]);
//		$("#notForm #jisaCode").val(data[0]["utcTradeDb"]);
//		$("#notForm #edmsComCode").val(data[0]["utcTradeCode"]);
//		$("#notForm #edmsComName").val(data[0]["utcTradeName"]);
//	}
//	$("#notForm #edmsComNum").html(optList.join("\n"));
//};

//********** 미분류 업체리스트 draw (기타)**********//
var drawTaxPayerEtcList = function () {
    $("#notForm #edmsComKey").val("31090");
    $("#notForm #edmsComCode").val("00S8");
    $("#notForm #edmsComName").val("세인관세법인");
    $("#notForm #edmsComNum").val("2118745699");

    if ($("#notForm #utTeamCode").val() == "012") {
        $("#notForm #jisaCode").val("ncustoms_sel_040");
    } else if ($("#notForm #utTeamCode").val() == "039") {
        $("#notForm #jisaCode").val("ncustoms_bs");
    } else if ($("#notForm #utTeamCode").val() == "044") {
        $("#notForm #jisaCode").val("ncustoms_us");
    } else if ($("#notForm #utTeamCode").val() == "021") {
        $("#notForm #jisaCode").val("ncustoms_ic");
    } else if ($("#notForm #utTeamCode").val() == "020") {
        $("#notForm #jisaCode").val("ncustoms_yj");
    } else if ($("#notForm #utTeamCode").val() == "030") {
        $("#notForm #jisaCode").val("ncustoms_cw");
    } else if ($("#notForm #utTeamCode").val() == "028") {
        $("#notForm #jisaCode").val("ncustoms_ca");
    } else if ($("#notForm #utTeamCode").val() == "027") {
        $("#notForm #jisaCode").val("ncustoms_cj");
    } else if ($("#notForm #utTeamCode").val() == "022") {
        $("#notForm #jisaCode").val("ncustoms_pj");
    } else if ($("#notForm #utTeamCode").val() == "026") {
        $("#notForm #jisaCode").val("ncustoms_pt");
    } else if ($("#notForm #utTeamCode").val() == "029") {
        $("#notForm #jisaCode").val("ncustoms_gm");
    } else if ($("#notForm #utTeamCode").val() == "024") {
        $("#notForm #jisaCode").val("ncustoms_ay");
    } else if ($("#notForm #utTeamCode").val() == "050") {
        $("#notForm #jisaCode").val("ncustoms_ys");
    } else if ($("#notForm #utTeamCode").val() == "075") {
        $("#notForm #jisaCode").val("ncustoms_jj");
    } else if ($("#notForm #utTeamCode").val() == "076") {
        $("#notForm #jisaCode").val("ncustoms_dj");
    } else if ($("#notForm #utTeamCode").val() == "008") {
        $("#notForm #jisaCode").val("ncustoms_sel4");
    } else if ($("#notForm #utTeamCode").val() == "023" || $("#notForm #utTeamCode").val() == "025") {
        $("#notForm #jisaCode").val("ncustoms_sn");
    } else {
        $("#notForm #jisaCode").val("ncustoms");
    }
};

//********** 미분류 업체 셀렉트 액션 **********//
//var ChangeName = function(obj){
//	$("#notForm #edmsComKey").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
//	$("#notForm #jisaCode").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
//	$("#notForm #edmsComCode").val(obj.options[obj.selectedIndex].getAttribute("hid_value2"));
//	$("#notForm #edmsComName").val(obj.options[obj.selectedIndex].getAttribute("hid_value3"));
//};

//********** 미분류 업무선택 액션 **********//
var ChangeGubun = function () {
    if ($("#notForm #edmsGubun option:selected").val() == "IMPORT") {
        $("#notForm #gubunName").html('H B/L');
        $("#notForm #edmsNum").val('');
        $("#notForm #edmsComNum").val('');
        $("#notForm #edmsComKey").val('');
        $("#notForm #jisaCode").val('');
        $("#notForm #edmsComCode").val('');
        $("#notForm #edmsComName").val('');
        $("#notForm #edmsNum").removeAttr("readonly");
        //getTaxPayerSet(drawTaxPayerList);
    } else if ($("#notForm #edmsGubun option:selected").val() == "EXPORT") {
        $("#notForm #gubunName").html('Inv');
        $("#notForm #edmsNum").val('');
        $("#notForm #edmsComNum").val('');
        $("#notForm #edmsComKey").val('');
        $("#notForm #jisaCode").val('');
        $("#notForm #edmsComCode").val('');
        $("#notForm #edmsComName").val('');
        $("#notForm #edmsNum").removeAttr("readonly");
        //getTaxPayerSet(drawTaxPayerList);
    } else {
        $("#notForm #gubunName").html('<a onclick="randNum()"><font color="blue">Random</font></a>');
        $("#notForm #edmsNum").attr("readonly", true);
        drawTaxPayerEtcList();
    }
};

//********** 화주등록 업무선택 액션 **********//
var ChangeGubunTab3 = function () {
    if ($("#frmTab3 #edmsGubun option:selected").val() == "IMPORT") {
        $("#frmTab3 #gubunName").html('H B/L');
    } else if ($("#frmTab3 #edmsGubun option:selected").val() == "EXPORT") {
        $("#frmTab3 #gubunName").html('Inv');
    }
    fn_tab3Action();
};

//********** 화주등록 팀 리스트 draw**********//
var drawTeamListfrmTab3 = function (data) {
    var optList = new Array();
    //optList[0] = "<option value=''></option>";
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#frmTab3 #teamCode").html(optList.join("\n"));
};

//********** 기타에 랜덤한 값 넣기  **********//
function randNum() {
    var ALPHA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var rN = $('#notForm #yyyymmdd').val().substr(0, 4);

    for (var i = 0; i < 10; i++) {
        var randTnum = Math.floor(Math.random() * ALPHA.length);
        rN += ALPHA[randTnum];
    }
    $("#notForm #edmsNum").val(rN);
}

//********** 업체 찾기  **********//
function fn_searchTaxpayer() {
    openWindowWithPost("./searchTaxpayer.sein", "width=290, height=370, scrollbars=no, menubar=no, resizable=1", "searchTaxpayer", {
        "utTeamCode": $("#notForm #utTeamCode").val(),
        "utTeamSeq": $("#notForm #utTeamSeq").val(),
        "utTeamName": $("#notForm #utTeamName").val()
    });
}

//********** 엔컴미등록 동기화 찾기  **********//
function fn_searchNcomList() {
    openWindowWithPost("./searchNcomList.sein", "width=390, height=480, scrollbars=no, menubar=no, resizable=1", "searchNcomList", {
    });
}

//********** 메인 리스트 조회액션(조회시 파일리스트 초기화)**********//
var fn_searchActionTotal = function(){
    $("#masterGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");
    $("#frm3").each(function(){
        this.reset();
    });

    $("#changeForm").each(function(){
        this.reset();
    });
    if($("#frm2 #gubunType").val() == "my"){
        fn_searchAction();
    }else if($("#frm2 #gubunType").val() == "team"){
        fn_searchTeamAction();
    }else if($("#frm2 #gubunType").val() == "jisa"){
        fn_searchJisaAction();
    }else if($("#frm2 #gubunType").val() == "all"){
        fn_searchAllAction();
    }
    $("#addForm #edmsKey").val("");
    $("#addForm #edmsGubun").val("");
    $("#addForm #edmsNum").val("");
    $("#addForm #teamCode").val("");
    $("#addForm #edmsComNum").val("");
    $("#addForm #edmsComKey").val("");
    $("#addForm #jisaCode").val("");
    $("#addForm #edmsComCode").val("");
    $("#addForm #edmsComName").val("");
    $("#addForm #iphangDay").val("");
    $("#addForm #banipDay").val("");
    $("#addForm #singoDay").val("");
    $("#addForm #suriDay").val("");
    $("#addForm #banchulDay").val("");
    $("#addForm #singoNum").val("");
    $("#addForm #divisionSingoYn").val("N");
    $('#fileGrid').clearGridData();
};

//********** 메인 리스트 나의 조회액션**********//
var fn_searchAction = function(){
    selectEdmsMasterMyList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

//********** 메인 리스트 팀 조회액션**********//
var fn_searchTeamAction = function(){
    selectEdmsMasterTeamList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

//********** 메인 리스트 지사 조회액션**********//
var fn_searchJisaAction = function(){
    selectEdmsMasterJisaList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

//********** 메인 리스트 전체 조회액션**********//
var fn_searchAllAction = function(){
    selectEdmsMasterAllList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d,
            rowNum: d.length
        }).trigger('reloadGrid');
    });
};

//********** 메인 파일 등록후 분류 리스트 조회 (선택된 로우와 페이징)**********//
function refreshGridPage(selrow, pageNum){
    $("#frm3").each(function(){
        this.reset();
    });

    $("#changeForm").each(function(){
        this.reset();
    });
    if($("#frm2 #gubunType").val() == "my"){
        fn_searchAction1(selrow, pageNum);
    }else if($("#frm2 #gubunType").val() == "team"){
        fn_searchTeamAction1(selrow, pageNum);
    }else if($("#frm2 #gubunType").val() == "jisa"){
        fn_searchJisaAction1(selrow, pageNum);
    }else if($("#frm2 #gubunType").val() == "all"){
        fn_searchAllAction1(selrow, pageNum);
    }
};

//********** 메인 리스트 나의 조회액션**********//
var fn_searchAction1 = function(selrow, pageNum){
    selectEdmsMasterMyList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
        jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
    });
};

//********** 메인 리스트 팀 조회액션**********//
var fn_searchTeamAction1 = function(selrow, pageNum){
    selectEdmsMasterTeamList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
        jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
    });
};

//********** 메인 리스트 지사 조회액션**********//
var fn_searchJisaAction1 = function(selrow, pageNum){
    selectEdmsMasterJisaList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
        jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
    });
};

//********** 메인 리스트 전체 조회액션**********//
var fn_searchAllAction1 = function(selrow, pageNum){
    selectEdmsMasterAllList(function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d,
            rowNum: d.length
        }).trigger('reloadGrid');
        jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
    });
};

//********** 키 타운 액션**********//
var keyDown = function () {
    if (event.keyCode == 13) fn_searchActionTotal();
};

//********** 키 타운 액션**********//
var keyDown1 = function () {
    if (event.keyCode == 13) fn_tab3Action();
};

//********** 메인 범위선택 액션**********//
var ChangeTypefrm2 = function (obj) {
    if (obj.options[obj.selectedIndex].getAttribute("value") == "my") {
        $("#frm2 #edmsMasterUserId").val($("#frm2 #sessionId").val());
        //$("#frm2 #teamCode").css("display", 'none');
        //$("#frm2 #teamCode").append("<option value='' selected></option>");
        $("#frm2 #teamCode").css("display", 'inline');
        $("#frm2 #teamCode option[value='']").remove();
        if ($("#frm2 #teamCode").val() == "012") {
            $("#frm2 #_defaultDB").val("ncustoms_sel_040");
        } else if ($("#frm2 #teamCode").val() == "039") {
            $("#frm2 #_defaultDB").val("ncustoms_bs");
        } else if ($("#frm2 #teamCode").val() == "044") {
            $("#frm2 #_defaultDB").val("ncustoms_us");
        } else if ($("#frm2 #teamCode").val() == "021") {
            $("#frm2 #_defaultDB").val("ncustoms_ic");
        } else if ($("#frm2 #teamCode").val() == "020") {
            $("#frm2 #_defaultDB").val("ncustoms_yj");
        } else if ($("#frm2 #teamCode").val() == "030") {
            $("#frm2 #_defaultDB").val("ncustoms_cw");
        } else if ($("#frm2 #teamCode").val() == "028") {
            $("#frm2 #_defaultDB").val("ncustoms_ca");
        } else if ($("#frm2 #teamCode").val() == "027") {
            $("#frm2 #_defaultDB").val("ncustoms_cj");
        } else if ($("#frm2 #teamCode").val() == "022") {
            $("#frm2 #_defaultDB").val("ncustoms_pj");
        } else if ($("#frm2 #teamCode").val() == "026") {
            $("#frm2 #_defaultDB").val("ncustoms_pt");
        } else if ($("#frm2 #teamCode").val() == "029") {
            $("#frm2 #_defaultDB").val("ncustoms_gm");
        } else if ($("#frm2 #teamCode").val() == "024") {
            $("#frm2 #_defaultDB").val("ncustoms_ay");
        } else if ($("#frm2 #teamCode").val() == "050") {
            $("#frm2 #_defaultDB").val("ncustoms_ys");
        } else if ($("#frm2 #teamCode").val() == "075") {
            $("#frm2 #_defaultDB").val("ncustoms_jj");
        } else if ($("#frm2 #teamCode").val() == "076") {
            $("#frm2 #_defaultDB").val("ncustoms_dj");
        } else if ($("#frm2 #teamCode").val() == "008") {
            $("#frm2 #_defaultDB").val("ncustoms_sel4");
        } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
            $("#frm2 #_defaultDB").val("ncustoms_sn");
        } else {
            $("#frm2 #_defaultDB").val("ncustoms");
        }
        $("#frm2 #jisaCode").css("display", 'none');
        $("#frm2 #jisaCode").append("<option value='' selected></option>");
    } else if (obj.options[obj.selectedIndex].getAttribute("value") == "team") {
        $("#frm2 #edmsMasterUserId").val('');
        $("#frm2 #teamCode").css("display", 'inline');
        $("#frm2 #teamCode option[value='']").remove();
        if ($("#frm2 #teamCode").val() == "012") {
            $("#frm2 #_defaultDB").val("ncustoms_sel_040");
        } else if ($("#frm2 #teamCode").val() == "039") {
            $("#frm2 #_defaultDB").val("ncustoms_bs");
        } else if ($("#frm2 #teamCode").val() == "044") {
            $("#frm2 #_defaultDB").val("ncustoms_us");
        } else if ($("#frm2 #teamCode").val() == "021") {
            $("#frm2 #_defaultDB").val("ncustoms_ic");
        } else if ($("#frm2 #teamCode").val() == "020") {
            $("#frm2 #_defaultDB").val("ncustoms_yj");
        } else if ($("#frm2 #teamCode").val() == "030") {
            $("#frm2 #_defaultDB").val("ncustoms_cw");
        } else if ($("#frm2 #teamCode").val() == "028") {
            $("#frm2 #_defaultDB").val("ncustoms_ca");
        } else if ($("#frm2 #teamCode").val() == "027") {
            $("#frm2 #_defaultDB").val("ncustoms_cj");
        } else if ($("#frm2 #teamCode").val() == "022") {
            $("#frm2 #_defaultDB").val("ncustoms_pj");
        } else if ($("#frm2 #teamCode").val() == "026") {
            $("#frm2 #_defaultDB").val("ncustoms_pt");
        } else if ($("#frm2 #teamCode").val() == "029") {
            $("#frm2 #_defaultDB").val("ncustoms_gm");
        } else if ($("#frm2 #teamCode").val() == "024") {
            $("#frm2 #_defaultDB").val("ncustoms_ay");
        } else if ($("#frm2 #teamCode").val() == "050") {
            $("#frm2 #_defaultDB").val("ncustoms_ys");
        } else if ($("#frm2 #teamCode").val() == "075") {
            $("#frm2 #_defaultDB").val("ncustoms_jj");
        } else if ($("#frm2 #teamCode").val() == "076") {
            $("#frm2 #_defaultDB").val("ncustoms_dj");
        } else if ($("#frm2 #teamCode").val() == "008") {
            $("#frm2 #_defaultDB").val("ncustoms_sel4");
        } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
            $("#frm2 #_defaultDB").val("ncustoms_sn");
        } else {
            $("#frm2 #_defaultDB").val("ncustoms");
        }
        $("#frm2 #jisaCode").css("display", 'none');
        $("#frm2 #jisaCode").append("<option value='' selected></option>");
    } else if (obj.options[obj.selectedIndex].getAttribute("value") == "jisa") {
        $("#frm2 #edmsMasterUserId").val('');
        $("#frm2 #teamCode").css("display", 'none');
        $("#frm2 #teamCode").append("<option value='' selected></option>");
        $("#frm2 #jisaCode").css("display", 'inline');
        $("#frm2 #jisaCode option[value='']").remove();
    } else {
        $("#frm2 #edmsMasterUserId").val('');
        $("#frm2 #teamCode").css("display", 'none');
        $("#frm2 #teamCode").append("<option value='' selected></option>");
        $("#frm2 #jisaCode").css("display", 'none');
        $("#frm2 #jisaCode").append("<option value='' selected></option>");
    }
};

//********** 메인 팀에 따른 defaultDB선택 액션**********//
var ChangeType2frm2 = function (obj) {
    if ($("#frm2 #teamCode").val() == "012") {
        $("#frm2 #_defaultDB").val("ncustoms_sel_040");
    } else if ($("#frm2 #teamCode").val() == "039") {
        $("#frm2 #_defaultDB").val("ncustoms_bs");
    } else if ($("#frm2 #teamCode").val() == "044") {
        $("#frm2 #_defaultDB").val("ncustoms_us");
    } else if ($("#frm2 #teamCode").val() == "021") {
        $("#frm2 #_defaultDB").val("ncustoms_ic");
    } else if ($("#frm2 #teamCode").val() == "020") {
        $("#frm2 #_defaultDB").val("ncustoms_yj");
    } else if ($("#frm2 #teamCode").val() == "030") {
        $("#frm2 #_defaultDB").val("ncustoms_cw");
    } else if ($("#frm2 #teamCode").val() == "028") {
        $("#frm2 #_defaultDB").val("ncustoms_ca");
    } else if ($("#frm2 #teamCode").val() == "027") {
        $("#frm2 #_defaultDB").val("ncustoms_cj");
    } else if ($("#frm2 #teamCode").val() == "022") {
        $("#frm2 #_defaultDB").val("ncustoms_pj");
    } else if ($("#frm2 #teamCode").val() == "026") {
        $("#frm2 #_defaultDB").val("ncustoms_pt");
    } else if ($("#frm2 #teamCode").val() == "029") {
        $("#frm2 #_defaultDB").val("ncustoms_gm");
    } else if ($("#frm2 #teamCode").val() == "024") {
        $("#frm2 #_defaultDB").val("ncustoms_ay");
    } else if ($("#frm2 #teamCode").val() == "050") {
        $("#frm2 #_defaultDB").val("ncustoms_ys");
    } else if ($("#frm2 #teamCode").val() == "075") {
        $("#frm2 #_defaultDB").val("ncustoms_jj");
    } else if ($("#frm2 #teamCode").val() == "076") {
        $("#frm2 #_defaultDB").val("ncustoms_dj");
    } else if ($("#frm2 #teamCode").val() == "008") {
        $("#frm2 #_defaultDB").val("ncustoms_sel4");
    } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
        $("#frm2 #_defaultDB").val("ncustoms_sn");
    } else {
        $("#frm2 #_defaultDB").val("ncustoms");
    }
};

//********** 메인 팀 리스트 draw**********//
var drawTeamListfrm2 = function (data) {
    var optList = new Array();
    //optList[0] = "<option value=''></option>";
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#frm2 #teamCode").html(optList.join("\n"));
};

//********** 메인 지사 리스트 draw**********//
var drawJisaListfrm2 = function (data) {
    var optList = new Array();
    optList[0] = "<option value=''></option>";
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].CODE + "\">" + data[i].NAME + "</option>";
    }
    $("#frm2 #jisaCode").html(optList.join("\n"));
};

//********** 메인 분류 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListImportAction = function (rowdata) {
	$("#notForm #teamCode").val(rowdata.teamCode);
    $("#notForm #edmsComNum").val(rowdata.edmsComNum);
    $("#notForm #edmsComKey").val(rowdata.edmsComKey);
    $("#notForm #jisaCode").val(rowdata.jisaCode);
    $("#notForm #edmsComCode").val(rowdata.edmsComCode);
    $("#notForm #edmsComName").val(rowdata.edmsComName);
    $("#notForm #edmsGubun").val(rowdata.edmsGubun);
    $("#notForm #utTeamCode").val($("#notForm #teamCode option:selected").attr("hid_value"));
    $("#notForm #utTeamSeq").val($("#notForm #teamCode option:selected").attr("hid_value1"));
    $("#notForm #utTeamName").val($("#notForm #teamCode option:selected").attr("hid_value2"));

    $("#addForm #edmsKey").val(rowdata.edmsKey);
    $("#addForm #edmsGubun").val(rowdata.edmsGubun);
    if(rowdata.edmsNum.substr(0,3)=="<u>"){
    	$("#notForm #edmsNum").val(rowdata.edmsNum.substring(35).replace("</a></u>", ""));
    	$("#addForm #edmsNum").val(rowdata.edmsNum.substring(35).replace("</a></u>", ""));
    }else{
    	$("#notForm #edmsNum").val(rowdata.edmsNum);
    	$("#addForm #edmsNum").val(rowdata.edmsNum);
    }
    $("#addForm #teamCode").val(rowdata.teamCode);
    $("#addForm #edmsComNum").val(rowdata.edmsComNum);
    $("#addForm #edmsComKey").val(rowdata.edmsComKey);
    $("#addForm #jisaCode").val(rowdata.jisaCode);
    $("#addForm #edmsComCode").val(rowdata.edmsComCode);
    $("#addForm #edmsComName").val(rowdata.edmsComName);
    $("#addForm #edmsManagementNum").val(rowdata.edmsManagementNum);
    $("#addForm #edmsSearchKeyword").val(rowdata.Impo_singo_no.replace(/-/gi, ""));
    $("#addForm #iphangDay").val(rowdata.Impo_iphang_date);
    $("#addForm #banipDay").val(rowdata.Impo_banip_date);
    $("#addForm #singoDay").val(rowdata.Impo_singo_date);
    $("#addForm #suriDay").val(rowdata.Impo_ok_date);
    $("#addForm #banchulDay").val("");
    $("#addForm #edmsUploadType").val(rowdata.edmsUploadType);
    $("#addForm #selrow").val(jQuery("#masterGrid").jqGrid('getGridParam','selrow'));
	$("#addForm #pageNum").val(jQuery("#masterGrid").getGridParam('page'));
	$("#returnForm #edmsKey").val(rowdata.edmsKey);

    $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

    fn_fileAction1(rowdata.edmsKey, rowdata.Impo_singo_no.replace(/-/gi, ""), rowdata.edmsGubun);
};

//********** 메인 분류 선택시 수출액션 (파일 리스트 조회)**********//
var fn_fileListExportAction = function (rowdata) {
	$("#notForm #teamCode").val(rowdata.teamCode);
    $("#notForm #edmsComNum").val(rowdata.edmsComNum);
    $("#notForm #edmsComKey").val(rowdata.edmsComKey);
    $("#notForm #jisaCode").val(rowdata.jisaCode);
    $("#notForm #edmsComCode").val(rowdata.edmsComCode);
    $("#notForm #edmsComName").val(rowdata.edmsComName);
    $("#notForm #edmsGubun").val(rowdata.edmsGubun);
    $("#notForm #utTeamCode").val($("#notForm #teamCode option:selected").attr("hid_value"));
    $("#notForm #utTeamSeq").val($("#notForm #teamCode option:selected").attr("hid_value1"));
    $("#notForm #utTeamName").val($("#notForm #teamCode option:selected").attr("hid_value2"));
    $("#notForm #edmsNum").val(rowdata.edmsNum);

    $("#addForm #edmsKey").val(rowdata.edmsKey);
    $("#addForm #edmsGubun").val(rowdata.edmsGubun);
    $("#addForm #edmsNum").val(rowdata.edmsNum);
    $("#addForm #teamCode").val(rowdata.teamCode);
    $("#addForm #edmsComNum").val(rowdata.edmsComNum);
    $("#addForm #edmsComKey").val(rowdata.edmsComKey);
    $("#addForm #jisaCode").val(rowdata.jisaCode);
    $("#addForm #edmsComCode").val(rowdata.edmsComCode);
    $("#addForm #edmsComName").val(rowdata.edmsComName);
    $("#addForm #edmsManagementNum").val(rowdata.edmsManagementNum);
    $("#addForm #edmsSearchKeyword").val(rowdata.Expo_singo_no.substring(54).replace("</a></u>", "").replace(/-/gi, ""));
    $("#addForm #iphangDay").val("");
    $("#addForm #banipDay").val("");
    $("#addForm #singoDay").val(rowdata.Expo_singo_date);
    $("#addForm #suriDay").val(rowdata.Expo_ok_date);
    $("#addForm #banchulDay").val("");
    $("#addForm #edmsUploadType").val(rowdata.edmsUploadType);
    $("#addForm #selrow").val(jQuery("#masterGrid").jqGrid('getGridParam','selrow'));
	$("#addForm #pageNum").val(jQuery("#masterGrid").getGridParam('page'));
    $("#returnForm #edmsKey").val(rowdata.edmsKey);

    $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");
console.log(rowdata.Expo_singo_no.substring(54).replace("</a></u>", "").replace(/-/gi, ""));
console.log(rowdata.edmsKey);
console.log(rowdata.edmsGubun);
    fn_fileAction1(rowdata.edmsKey, rowdata.Expo_singo_no.substring(54).replace("</a></u>", "").replace(/-/gi, ""), rowdata.edmsGubun);
};

//********** 메인 분류 선택시 기타액션 (파일 리스트 조회)**********//
var fn_fileListEtcAction = function (rowdata) {
	$("#notForm #teamCode").val(rowdata.teamCode);
    $("#notForm #edmsComNum").val(rowdata.edmsComNum);
    $("#notForm #edmsComKey").val(rowdata.edmsComKey);
    $("#notForm #jisaCode").val(rowdata.jisaCode);
    $("#notForm #edmsComCode").val(rowdata.edmsComCode);
    $("#notForm #edmsComName").val(rowdata.edmsComName);
    $("#notForm #edmsGubun").val(rowdata.edmsGubun);
    $("#notForm #utTeamCode").val($("#notForm #teamCode option:selected").attr("hid_value"));
    $("#notForm #utTeamSeq").val($("#notForm #teamCode option:selected").attr("hid_value1"));
    $("#notForm #utTeamName").val($("#notForm #teamCode option:selected").attr("hid_value2"));
    $("#notForm #edmsNum").val(rowdata.edmsNum);

    $("#addForm #edmsKey").val(rowdata.edmsKey);
    $("#addForm #edmsGubun").val(rowdata.edmsGubun);
    $("#addForm #edmsNum").val(rowdata.edmsNum);
    $("#addForm #teamCode").val(rowdata.teamCode);
    $("#addForm #edmsComNum").val(rowdata.edmsComNum);
    $("#addForm #edmsComKey").val(rowdata.edmsComKey);
    $("#addForm #jisaCode").val(rowdata.jisaCode);
    $("#addForm #edmsComCode").val(rowdata.edmsComCode);
    $("#addForm #edmsComName").val(rowdata.edmsComName);
    $("#addForm #edmsManagementNum").val(rowdata.edmsManagementNum);
    $("#addForm #edmsSearchKeyword").val("");
    $("#addForm #iphangDay").val("");
    $("#addForm #banipDay").val("");
    $("#addForm #singoDay").val("");
    $("#addForm #suriDay").val("");
    $("#addForm #banchulDay").val("");
    $("#addForm #edmsUploadType").val(rowdata.edmsUploadType);
    $("#addForm #selrow").val(jQuery("#masterGrid").jqGrid('getGridParam','selrow'));
	$("#addForm #pageNum").val(jQuery("#masterGrid").getGridParam('page'));
    $("#returnForm #edmsKey").val(rowdata.edmsKey);

    $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

    fn_fileAction1(rowdata.edmsKey, '', rowdata.edmsGubun);
};

//********** 화주등록 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListTab3ImportAction = function (rowdata) {
    $("#tab3FileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

    fn_fileTab3Action(rowdata.edmsKey);
};

//********** 분류 파일리스트 조회액션**********//
var fn_fileAction = function (edmsKey){
    $("#frm3").each(function(){
        this.reset();
    });

    $("#changeForm").each(function(){
        this.reset();
    });

    selectFileList(edmsKey, function(d){
        $('#fileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 분류 파일리스트 조회액션**********//
var fn_fileAction2 = function (edmsKey, singoNo, edmsGubun) {
    $("#frm3").each(function () {
        this.reset();
    });

    $("#changeForm").each(function () {
        this.reset();
    });

    var url1 = "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
    		"edmsParentKey"		: edmsKey,
            "edmsSearchKeyword"	: singoNo,
            "edmsGubun"			: edmsGubun,
            "_pageRow"			: 2000,
            "_pageNumber"		: 0,
            "size"				: 2000,
            "page"				: 0
        },
        type1 = "POST";

    sendAjax(url1, params1, type1, function (d) {
        if (d.content.length == 0) {
            $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
        } else {
            $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

            if (d.content.length == 1) {
                if (d.content[0].edmsFileKey == undefined) {
                    $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
                } else {
                    $('#fileGrid').clearGridData().setGridParam({
                        data: d.content,
                        rowNum: d.content.length
                    }).trigger('reloadGrid');
                }
            } else {
                $('#fileGrid').clearGridData().setGridParam({
                    data: d.content,
                    rowNum: d.content.length
                }).trigger('reloadGrid');
            }
        }
    });
};

var fn_fileAction1 = function(edmsKey, singoNo, edmsGubun){
    $("#frm3").each(function(){
        this.reset();
    });

    $("#changeForm").each(function(){
        this.reset();
    });

    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsParentKey"		: edmsKey,
            "edmsSearchKeyword"	: singoNo,
            "edmsGubun"			: edmsGubun,
            "_pageRow"			: 2000,
            "_pageNumber"		: 0,
            "size"				: 2000,
            "page"				: 0
        },
        type1 = "POST";

    progress.show();
    sendAjax(url1, params1, type1, function(d){
    	console.log(d.content);
    	progress.hide();
        if(d.content.length == 0){
            $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
        }else{
            $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

            if(d.content.length == 1){
                if(d.content[0].edmsFileKey == undefined){
                    $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
                }else{
                    $('#fileGrid').clearGridData().setGridParam({
                        data	: d.content,
                        rowNum	: d.content.length
                    }).trigger('reloadGrid');
                }
            }else{
                $('#fileGrid').clearGridData().setGridParam({
                    data	: d.content,
                    rowNum	: d.content.length
                }).trigger('reloadGrid');
            }
        }
    });
};

//********** 화주등록 파일리스트 조회액션**********//
var fn_fileTab3Action = function (edmsKey) {
    selectFileList(edmsKey, function (d) {
        $('#tab3FileGrid').clearGridData().setGridParam({
            data: d,
            rowNum: d.length
        }).trigger('reloadGrid');
    });
};

//********** 분류 업무선택 액션 (파일 추가 문서구분 변경)**********//
var ChangeGubunfrm2 = function () {
    if ($("#frm2 #edmsGubun option:selected").val() == "IMPORT") {
        $("#frm2 #gubunName").html('H B/L');
        //$("#frm2 #edmsNum").removeAttr("disabled");
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNum").removeAttr("disabled");
        drawStatusListImportForm();
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
        $("#masterGrid").jqGrid('GridUnload');
        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", '');
        $("#deliveryBtn1").css("display", '');
        $("#deliveryBtn2").css("display", '');
//        $("#changeAllBtn").css("display", '');
//        $("#changeBtn").css("display", '');
//        $("#saveImpoBtn").css("display", '');
//        $("#saveImpoCopyBtn").css("display", '');
//        $("#saveExpoBtn").css("display", 'none');
        setImportGrid();
        fn_searchActionTotal();
    } else if ($("#frm2 #edmsGubun option:selected").val() == "EXPORT") {
        $("#frm2 #gubunName").html('Inv');
        //$("#frm2 #edmsNum").removeAttr("disabled");
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNum").removeAttr("disabled");
        drawStatusListExportForm();
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
        $("#masterGrid").jqGrid('GridUnload');
        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", 'none');
        $("#deliveryBtn1").css("display", 'none');
        $("#deliveryBtn2").css("display", 'none');
//        $("#changeAllBtn").css("display", 'none');
//        $("#changeBtn").css("display", 'none');
//        $("#saveImpoBtn").css("display", 'none');
//        $("#saveImpoCopyBtn").css("display", 'none');
//        $("#saveExpoBtn").css("display", '');
        setExportGrid();
        fn_searchActionTotal();
    } else if ($("#frm2 #edmsGubun option:selected").val() == "SEINETC" || $("#frm2 #edmsGubun option:selected").val() == "HWANGUP") {
        $("#frm2 #gubunName").html('관리번호');
        //$("#frm2 #edmsNum").attr("disabled",true);
        $("#frm2 #gubunSingoName").html('');
        $("#frm2 #singoNum").val('');
        $("#frm2 #singoNum").attr("disabled", true);
        drawStatusListEtcForm();
        drawCategoryListaddForm();
        $("#masterGrid").jqGrid('GridUnload');
        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", 'none');
        $("#deliveryBtn1").css("display", 'none');
        $("#deliveryBtn2").css("display", 'none');
//        $("#changeAllBtn").css("display", 'none');
//        $("#changeBtn").css("display", 'none');
//        $("#saveImpoBtn").css("display", 'none');
//        $("#saveImpoCopyBtn").css("display", 'none');
//        $("#saveExpoBtn").css("display", 'none');
        setEtcGrid();
        fn_searchActionTotal();
    }
};

//********** 분류 처리현황 액션 (변환버튼 생성)**********//
var ChangeStatusfrm2 = function () {
	fn_searchActionTotal();
//    if ((($("#frm2 #edmsStatus option:selected").val() == "4") && $("#frm2 #edmsGubun option:selected").val() == "IMPORT")) {
//        $("#changeAllBtn").css("display", 'none');
//        $("#changeBtn").css("display", 'none');
//        $("#saveImpoBtn").css("display", 'none');
//        $("#saveExpoBtn").css("display", 'none');
//        fn_searchActionTotal();
//    } else if ($("#frm2 #edmsGubun option:selected").val() == "EXPORT") {
//        $("#changeAllBtn").css("display", 'none');
//        $("#changeBtn").css("display", 'none');
//        $("#saveImpoBtn").css("display", 'none');
//        $("#saveExpoBtn").css("display", '');
//        fn_searchActionTotal();
//    } else {
//        $("#changeAllBtn").css("display", '');
//        $("#changeBtn").css("display", '');
//        $("#saveImpoBtn").css("display", '');
//        $("#saveExpoBtn").css("display", 'none');
//        fn_searchActionTotal();
//    }
};

//********** 메인 처리현황 리스트 draw (수입)**********//
var drawStatusListImportForm = function () {
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    optList[1] = "<option value=\"결재\">결재</option>";
    optList[2] = "<option value=\"대기\">대기</option>";
    optList[3] = "<option value=\"선별\">선별</option>";
    optList[4] = "<option value=\"수리\">수리</option>";
    optList[5] = "<option value=\"오류\">오류</option>";
    optList[6] = "<option value=\"자수\">자수</option>";
    optList[7] = "<option value=\"접수\">접수</option>";
    optList[8] = "<option value=\"제출\">제출</option>";
    optList[9] = "<option value=\"취하\">취하</option>";
    $("#frm2 #edmsStatus").html(optList.join("\n"));
};

//********** 메인 처리현황 리스트 draw (수출)**********//
var drawStatusListExportForm = function () {
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    optList[1] = "<option value=\"검사\">검사</option>";
    optList[2] = "<option value=\"면허\">면허</option>";
    optList[3] = "<option value=\"서류\">서류</option>";
    optList[4] = "<option value=\"선별\">선별</option>";
    optList[5] = "<option value=\"수리\">수리</option>";
    optList[6] = "<option value=\"오류\">오류</option>";
    optList[7] = "<option value=\"취하\">취하</option>";
    $("#frm2 #edmsStatus").html(optList.join("\n"));
};

//********** 메인 처리현황 리스트 draw (기타)**********//
var drawStatusListEtcForm = function () {
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    $("#frm2 #edmsStatus").html(optList.join("\n"));
};

//********** 메인 추가파일 카테고리 리스트 draw (수입/수출)**********//
var drawCategoryListfrm3 = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].CODE + "\">" + data[i].NAME + "</option>";
    }
    $("#addForm #edmsFileCategory").html(optList.join("\n"));
};

//********** 메인 추가파일 카테고리 리스트 draw (기타)**********//
var drawCategoryListaddForm = function () {
    var optList1 = new Array();
    // TODO 20170821
    // optList1[optList1.length] = "<option value=\"미구분\">미구분</option>";
    optList1[optList1.length] = "<option value=\"Z0001\">미구분</option>";
    $("#addForm #edmsFileCategory").html(optList1.join("\n"));
};

//********** 미분류 -> 분류 버튼 액션**********//
var fn_changeAction = function(){
    var $t 		= $("#notfileGrid");
    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');

    if($('#notForm #edmsGubun').val() == "IMPORT"){
        if($('#notForm #edmsComCode').val() == ""){
            fn_searchTaxpayer();
            return;
        }

        if($('#notForm #edmsNum').val().replace(/(\s*)/g,'') == ""){
            alert('H B/L No를 입력해주세요.');
            return;
        }
    }

    if($('#notForm #edmsGubun').val() == "EXPORT"){
        if($('#notForm #edmsComCode').val() == ""){
            fn_searchTaxpayer();
            return;
        }

        if($('#notForm #edmsNum').val().replace(/(\s*)/g,'') == ""){
            alert('Invoice No를 입력해주세요.');
            return;
        }
    }

    if($('#notForm #edmsGubun').val() == "SEINETC" || $('#notForm #edmsGubun').val() == "HWANGUP"){
        if($('#notForm #edmsNum').val() == ""){
            alert('Random을 클릭해 주세요.');
            return;
        }
    }

    if(rowId.length == 0){
        alert('미분류 파일을 선택해 주세요.');
        return;
    }

    var d = [];

    for(var i = 0; i < ids.length; i++){
        var check = false;
        $.each(rowId, function (index, value){
            if (value == ids[i])
                check = true;
        });
        if(check){
            d.push({
                "edmsFileKey" : $("#notfileGrid").getRowData(ids[i]).edmsFileKey,
                "edmsParentGubun": $("#notfileGrid").getRowData(ids[i]).edmsParentGubun,
                "edmsParentKey": $("#notfileGrid").getRowData(ids[i]).edmsParentKey,
                "edmsFileCategory": $("#notfileGrid").getRowData(ids[i]).edmsFileCategory,
                "edmsOrgFileName": $("#notfileGrid").getRowData(ids[i]).edmsOrgFileName,
                "edmsFileStatus": $("#notfileGrid").getRowData(ids[i]).edmsFileStatus,
                "addDay": $("#notfileGrid").getRowData(ids[i]).addDay,
                "useYn": $("#notfileGrid").getRowData(ids[i]).useYn,
                "edmsSaveFileName": $("#notfileGrid").getRowData(ids[i]).edmsSaveFileName,
                "edmsFileSize": $("#notfileGrid").getRowData(ids[i]).edmsFileSize,
                "edmsServerIp": $("#notfileGrid").getRowData(ids[i]).edmsServerIp,
                "edmsFilePath": $("#notfileGrid").getRowData(ids[i]).edmsFilePath,
                "edmsServerGubun": $("#notfileGrid").getRowData(ids[i]).edmsServerGubun,
                "edmsFileExt": $("#notfileGrid").getRowData(ids[i]).edmsFileExt
            });
        }
    }

    if(!confirm("분류 하시겠습니까?")) return;

    try{
        saveChangeAction(d, function(r){
        });
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

//********** 분류 -> 미분류 버튼 액션**********//
var fn_returnAction = function(){
    if($("#addForm #edmsKey").val() == ""){
        alert("분류 리스트를 선택하세요.");
        return;
    }

    if($("#addForm #edmsUploadType").val() == "IMPORT_SIMPLE_REQUEST" || $("#addForm #edmsUploadType").val() == "EXPORT_SIMPLE_REQUEST"){
    	fn_returnAction1();
        return;
    }

    var $t = $("#fileGrid");

    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');

    for(var i = 0, il = ids.length; i < il; i++){
        $t.jqGrid('setSelection', ids[i], true);
    }

    if(rowId.length == 0){
        alert('파일리스트를 선택해 주세요.');
        return;
    }

    if(!confirm("미분류로 전환 하시겠습니까?")) return;

    for(var i = 0; i < ids.length; i++){
        var check = false;
        $.each(rowId, function(index, value){
            if(value == ids[i])
                check = true;
        });
        if(check){
        	var dd = {
                "edmsFileKey"		: $("#fileGrid").getRowData(ids[i]).edmsFileKey,
                "edmsParentGubun"	: "NOTCLASS",
                "edmsParentKey"		: "1",
                "edmsFileCategory"	: "Z0001",
                "edmsSearchKeyword"	: "",
                "edmsFileNote"		: ""
            };

        	saveReturnFileAction(dd, function(r){
            });
        }
    }

    var $grid = $('#masterGrid');

    var rowidm 		= $grid.getGridParam("selrow"),
        rowData 	= $grid.jqGrid('getRowData', rowidm),
        rowCount 	= $grid.getGridParam("reccount"),
        getInd 		= $grid.jqGrid('getInd', rowidm);

    var d = {};
    d = rowData;
    var kk = {
        "edmsKey"	: d["edmsKey"],
        "useYn"		: "N"
    };

    saveReturnMasterAction(kk, function(r){
    });
};

//********** 처리현황 일괄처리 버튼 액션**********//
var fn_statusSave = function () {
    if (!confirm("리스트가 정리될때까지 잠시 기다려주세요.")) return;
    var $t = $("#masterGrid");
    var ids = $t.jqGrid('getDataIDs');
    var timer = 0;
    var i = ids.length - 1;
    if ($('#frm2 #edmsGubun').val() == "IMPORT") {
        (function (i) {
            timer = setInterval(function () {
                if (i == -1) {
                    clearInterval(timer);
                    fn_searchActionTotal();
                } else {
                    $("#changeForm #edmsKey").val($("#masterGrid").getRowData(ids[i]).edmsKey);
                    $("#changeForm #edmsGubun").val($("#masterGrid").getRowData(ids[i]).edmsGubun);
                    $("#changeForm #edmsNum").val($("#masterGrid").getRowData(ids[i]).edmsNum.substring(35).replace("</a></u>", ""));
                    $("#changeForm #edmsStatus").val($("#masterGrid").getRowData(ids[i]).edmsStatus);
                    $("#changeForm #addDay").val($("#masterGrid").getRowData(ids[i]).addDay);
                    $("#changeForm #editDay").val($("#masterGrid").getRowData(ids[i]).editDay);
                    $("#changeForm #teamCode").val($("#masterGrid").getRowData(ids[i]).teamCode);
                    $("#changeForm #edmsComNum").val($("#masterGrid").getRowData(ids[i]).edmsComNum);
                    $("#changeForm #edmsComKey").val($("#masterGrid").getRowData(ids[i]).edmsComKey);
                    $("#changeForm #jisaCode").val($("#masterGrid").getRowData(ids[i]).jisaCode);
                    $("#changeForm #edmsComCode").val($("#masterGrid").getRowData(ids[i]).edmsComCode);
                    $("#changeForm #edmsComName").val($("#masterGrid").getRowData(ids[i]).edmsComName);
                    $("#changeForm #edmsManagementNum").val($("#masterGrid").getRowData(ids[i]).edmsManagementNum);
                    $("#changeForm #singoNum").val($("#masterGrid").getRowData(ids[i]).singoNum);
                    $("#changeForm #divisionSingoYn").val($("#masterGrid").getRowData(ids[i]).divisionSingoYn);
                    $("#changeForm #iphangDay").val($("#masterGrid").getRowData(ids[i]).iphangDay);
                    $("#changeForm #banipDay").val($("#masterGrid").getRowData(ids[i]).banipDay);
                    $("#changeForm #singoDay").val($("#masterGrid").getRowData(ids[i]).singoDay);
                    $("#changeForm #suriDay").val($("#masterGrid").getRowData(ids[i]).suriDay);
                    $("#changeForm #banchulDay").val($("#masterGrid").getRowData(ids[i]).banchulDay);

                    unipass.document.location.href = "./edmsTracking.sein?cargMtNo=&hblNo=" + $("#masterGrid").getRowData(ids[i]).edmsNum.substring(35).replace("</a></u>", "") + "&mblNo=&blYy=" + $('#changeForm #yyyymmdd').val().substr(0, 4) + "&check=2";
                }
                i--;
            }, 1000);
        })(i);
    }
}

//********** 전체 만능 동기화 버튼 액션**********//
var fn_allStatusSave = function () {
    var $grid = $('#masterGrid'),
        rowid = $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("아래 라인을 선택한 후 클릭하세요");
        return;
    }
    try {
        if (!confirm("리스트가 정리될때까지 잠시 기다려주세요.")) return;
        var timer = 0;
        var i = 3;
        var lastyear = $('#returnForm #yyyymmdd').val().substr(0, 4) - 1;
        if ($('#frm2 #edmsGubun').val() == "IMPORT") {
            $("#changeForm #edmsKey").val(rowData.edmsKey);
            $("#changeForm #edmsGubun").val(rowData.edmsGubun);
            $("#changeForm #edmsNum").val(rowData.edmsNum.substring(35).replace("</a></u>", ""));
            $("#changeForm #edmsStatus").val(rowData.edmsStatus);
            $("#changeForm #addDay").val(rowData.addDay);
            $("#changeForm #editDay").val(rowData.editDay);
            $("#changeForm #teamCode").val(rowData.teamCode);
            $("#changeForm #edmsComNum").val(rowData.edmsComNum);
            $("#changeForm #edmsComKey").val(rowData.edmsComKey);
            $("#changeForm #jisaCode").val(rowData.jisaCode);
            $("#changeForm #edmsComCode").val(rowData.edmsComCode);
            $("#changeForm #edmsComName").val(rowData.edmsComName);
            $("#changeForm #edmsManagementNum").val(rowData.edmsManagementNum);
            $("#changeForm #singoNum").val(rowData.singoNum);
            $("#changeForm #divisionSingoYn").val(rowData.divisionSingoYn);
            $("#changeForm #iphangDay").val(rowData.iphangDay);
            $("#changeForm #banipDay").val(rowData.banipDay);
            $("#changeForm #singoDay").val(rowData.singoDay);
            $("#changeForm #suriDay").val(rowData.suriDay);
            $("#changeForm #banchulDay").val(rowData.banchulDay);

            (function (i) {
                timer = setInterval(function () {
                    if (i == -1) {
                        clearInterval(timer);
                        fn_searchActionTotal();
                    } else if (i == 3) {
                        unipass.document.location.href = "./edmsTracking.sein?cargMtNo=&hblNo=" + rowData.edmsNum.substring(35).replace("</a></u>", "") + "&mblNo=&blYy=" + $('#changeForm #yyyymmdd').val().substr(0, 4) + "&check=2";
                    } else if (i == 2) {
                        unipass.document.location.href = "./edmsTracking.sein?cargMtNo=&hblNo=" + rowData.edmsNum.substring(35).replace("</a></u>", "") + "&mblNo=&blYy=" + lastyear + "&check=2";
                    } else if (i == 1) {
                        unipass.document.location.href = "./edmsTracking.sein?cargMtNo=&hblNo=&mblNo=" + rowData.edmsNum.substring(35).replace("</a></u>", "") + "&blYy=" + lastyear + "&check=2";
                    } else if (i == 0) {
                        unipass.document.location.href = "./edmsTracking.sein?cargMtNo=&hblNo=&mblNo=" + rowData.edmsNum.substring(35).replace("</a></u>", "") + "&blYy=" + $('#returnForm #yyyymmdd').val().substr(0, 4) + "&check=2";
                    }
                    i--;
                }, 1000);
            })(i);
        }
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
    ;
}

//********** 구분저장 버튼 액션**********//
var fn_detailSave = function () {
    var $t 		= $("#fileGrid"),
    	rowId 	= $t.getGridParam("selarrrow"),
    	ids 	= $t.jqGrid('getDataIDs');

    for(var i = 0, il = ids.length; i < il; i++){
        if ($("input:checkbox[id='jqg_fileGrid_" + ids[i] + "']").is(":checked")){
        }else{
            $t.jqGrid('setSelection', ids[i], true);
        }
    }

    if(rowId.length == 0){
        alert('파일리스트를 선택해 주세요.');
        return;
    }

    if(!confirm("저장 하시겠습니까?")) return;

    for(var i = 0; i < ids.length; i++){
        var check = false;
        $.each(rowId, function(index, value){
            if (value == ids[i])
                check = true;
        });
        if(check){
            var dd = {
                "edmsFileKey"		: $("#fileGrid").getRowData(ids[i]).edmsFileKey,
                "edmsFileCategory"	: $("#fileGrid").getRowData(ids[i]).edmsFileCategory,
                "edmsSearchKeyword"	: $("#addForm #edmsSearchKeyword").val(),
                "edmsFileNote"		: $("#fileGrid").getRowData(ids[i]).edmsFileNote
            };

            saveFileDetailSaveAction(dd, function (r){
            });
        }
    }
};

//********** 신고번호별 개별저장 액션**********//
var fn_detailSingoSave = function () {
	var $grid 	= $('#masterGrid');
	var rowid 	= $grid.getGridParam("selrow");
	if(rowid.length == 0){
	    alert('왼쪽 분류리스트를 선택해 주세요.');
	    return;
	}

	if($("#addForm #edmsSearchKeyword").val()==""){
		alert('신고번호가 없으면 개별 분류가 안됩니다.');
	    return;
	}

    var $t 		= $("#fileGrid"),
    	rowId 	= $t.getGridParam("selarrrow"),
    	ids 	= $t.jqGrid('getDataIDs');

    if(rowId.length == 0){
        alert('파일리스트를 선택해 주세요.');
        return;
    }

    if(!confirm("저장 하시겠습니까?")) return;

    for(var i = 0; i < ids.length; i++){
        var check = false;
        $.each(rowId, function(index, value){
            if (value == ids[i])
                check = true;
        });
        if(check){
            var dd = {
                "edmsFileKey"		: $("#fileGrid").getRowData(ids[i]).edmsFileKey,
                "edmsFileCategory"	: $("#fileGrid").getRowData(ids[i]).edmsFileCategory,
                "edmsSearchKeyword"	: $("#addForm #edmsSearchKeyword").val(),
                "edmsFileNote"		: $("#fileGrid").getRowData(ids[i]).edmsFileNote
            };

            saveFileDetailSaveAction(dd, function (r){
            });
        }
    }
};

//********** 일괄열기 버튼 액션 **********//
var fn_allView = function () {
    // TODO 임시(20170821)
    alert('일괄열기를 금지합니다<br>복구중(20170821)');
    return;
    var $t = $("#fileGrid");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    for (var i = 0, il = ids.length; i < il; i++) {
        if ($("input:checkbox[id='jqg_fileGrid_" + ids[i] + "']").is(":checked")) {
        } else {
            $t.jqGrid('setSelection', ids[i], true);
        }
    }

    if (rowId.length == 0) {
        alert('파일리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("일괄열기 하시겠습니까?")) return;

    var i = 0;
    var k = setInterval(function () {
        var category = "";
        var edmsNewFileName = "";

        if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "Z0001") {
            category = "NO";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A0001") {
            category = "BL";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A0002") {
            category = "IN";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A0003") {
            category = "PA";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A0004") {
            category = "CO";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "B0001") {
            category = "PL";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "B0002") {
            category = "YO";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "C0001") {
            category = "DI";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "Z0002") {
            category = "EM";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A0005") {
            category = "TO";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "D0001") {
            category = "CM";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "C0002") {
            category = "DL";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "Z0003") {
            category = "ET";
        }

        edmsNewFileName = $('#addForm #singoDay').val() + "_" + $('#addForm #edmsNum').val() + "_" + category + "_" + $("#fileGrid").getRowData(ids[i]).edmsOrgFileName;

        location.href = "../apis/edms/downloadEdmsFile?edmsFileKey=" + $("#fileGrid").getRowData(ids[i]).edmsFileKey + "&edmsParentGubun=" + $("#fileGrid").getRowData(ids[i]).edmsParentGubun + "&edmsParentKey=" + $("#fileGrid").getRowData(ids[i]).edmsParentKey + "&edmsOrgFileName=" + encodeURIComponent($("#fileGrid").getRowData(ids[i]).edmsOrgFileName) + "&edmsNewFileName=" + encodeURIComponent(edmsNewFileName);

        i++;
        if (i == ids.length) {
            clearInterval(k);
        }
    }, 500);
};

//********** 일괄저장 버튼 액션 (ZIP 다운)**********//
//var fn_allDown = function () {
//    // TODO 임시(20170821)
//    alert('일괄다운로드를 금지합니다<br>복구중(20170821)');
//    return;
//    var $t = $("#fileGrid");
//
//    var rowId = $t.getGridParam("selarrrow");
//    var ids = $t.jqGrid('getDataIDs');
//
//    for (var i = 0, il = ids.length; i < il; i++) {
//        if ($("input:checkbox[id='jqg_fileGrid_" + ids[i] + "']").is(":checked")) {
//        } else {
//            $t.jqGrid('setSelection', ids[i], true);
//        }
//    }
//
//    if (rowId.length == 0) {
//        alert('파일리스트를 선택해 주세요.');
//        return;
//    }
//
//    if (!confirm("일괄다운 하시겠습니까?")) return;
//
//    var d = [];
//
//    for (var i = 0; i < ids.length; i++) {
//        var check = false;
//        $.each(rowId, function (index, value) {
//            if (value == ids[i])
//                check = true;
//        });
//        if (check) {
//            d.push({
//                "edmsFileKey": $("#fileGrid").getRowData(ids[i]).edmsFileKey,
//                "edmsParentGubun": $("#fileGrid").getRowData(ids[i]).edmsParentGubun,
//                "edmsParentKey": $("#fileGrid").getRowData(ids[i]).edmsParentKey,
//                "edmsFileCategory": $("#fileGrid").getRowData(ids[i]).edmsFileCategory,
//                "edmsOrgFileName": $("#fileGrid").getRowData(ids[i]).edmsOrgFileName,
//                "edmsFileStatus": $("#fileGrid").getRowData(ids[i]).edmsFileStatus,
//                "addDay": $("#fileGrid").getRowData(ids[i]).addDay,
//                "useYn": $("#fileGrid").getRowData(ids[i]).useYn,
//                "edmsSaveFileName": $("#fileGrid").getRowData(ids[i]).edmsSaveFileName,
//                "edmsFileSize": $("#fileGrid").getRowData(ids[i]).edmsFileSize,
//                "edmsServerIp": $("#fileGrid").getRowData(ids[i]).edmsServerIp,
//                "edmsFilePath": $("#fileGrid").getRowData(ids[i]).edmsFilePath,
//                "edmsServerGubun": $("#fileGrid").getRowData(ids[i]).edmsServerGubun,
//                "edmsFileExt": $("#fileGrid").getRowData(ids[i]).edmsFileExt
//            });
//        }
//    }
//    saveZipAction(d, function (r) {
//    });
//};

//********** 비엘번호 저장 버튼 액션**********//
//var fn_changeNum = function(){
//	if ($('#frm2 #edmsGubun').val() == "SEINETC"){
//		alert('저장할 내용이 없습니다.');
//		return;
//	}
//
//	var $grid = $('#masterGrid');
//
//	var rowid 		= $grid.getGridParam("selrow"),
//		rowData 	= $grid.jqGrid('getRowData', rowid),
//		rowCount 	= $grid.getGridParam("reccount"),
//		getInd 		= $grid.jqGrid('getInd', rowid);
//
//	if (rowid==null) {alert("분류리스트를 선택한 후 클릭하세요"); return;}
//	//if (rowData.edmsNum == "") {alert("No는 필수사항입니다."); return;}
//
//	var d = {};
//	d = rowData;
//	//d["edmsNum"]  = ($("#"+getInd+"_edmsNum").val() == undefined || $("#"+getInd+"_edmsNum").val() == "")  ? d["edmsNum"] : $("#"+getInd+"_edmsNum").val();
//	d["singoNum"] = ($("#"+getInd+"_singoNum").val() == undefined || $("#"+getInd+"_singoNum").val() == "")  ? d["singoNum"] : $("#"+getInd+"_singoNum").val();
//
//	var kk = {
//				"edmsKey"			: d["edmsKey"],
//				"edmsGubun"			: d["edmsGubun"],
//				"edmsComKey"		: d["edmsComKey"],
//				"edmsComName"		: d["edmsComName"],
//				"edmsComCode"		: d["edmsComCode"],
//				"edmsComNum"		: d["edmsComNum"],
//				"edmsNum"			: d["edmsNum"],
//				"edmsManagementNum"	: d["edmsManagementNum"],
//				"edmsStatus"		: d["edmsStatus"],
//				"addDay"			: d["addDay"],
//				"editDay"			: d["editDay"],
//				"jisaCode"			: d["jisaCode"],
//				"teamCode"			: d["teamCode"],
//				"singoNum"			: d["singoNum"],
//				"divisionSingoYn"	: d["divisionSingoYn"],
//				"useYn"				: d["useYn"],
//				"addUserName"		: d["addUserName"],
//				"editUserName"		: d["addUserName"],
//				"yyyymmdd"			: $('#notForm #yyyymmdd').val(),
//				"iphangDay"			: d["iphangDay"],
//				"banipDay"			: d["banipDay"],
//				"singoDay"			: d["singoDay"],
//				"suriDay"			: d["suriDay"],
//				"banchulDay"		: d["banchulDay"]
//			 };
//	if(!confirm("수정 하시겠습니까?")) return;
//
//	try {
//		saveChangeNumAction(kk, function(r){
//		});
//	} catch (e) {
//		alert("에러가 발생했습니다\n" + e.message);
//	};
//};

//********** 화주등록 분류 저장 버튼(오른쪽화살표) 액션**********//
var fn_changeAction1 = function(){
    var $grid 	= $('#tab3Grid'),
        rowid 	= $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("왼쪽 미분류 라인을 선택한 후 클릭하세요");
        return;
    }
    try {
        if (confirm("[분류] 하시겠습니까 ?")) {
        	var d = {};
            d = rowData;

            var url = "../apis/edms/saveEdmsMasterInfo",
            	params = {
                    "edmsKey"	: d["edmsKey"],
                    "editDay"	: $('#notForm #yyyymmdd').val(),
                    "teamCode"	: $('#frmTab3 #teamCode').val()
                },
                type = "POST";

            sendAjax(url, params, type, function (d) {
                fn_searchActionTotal();
                fn_tab3Action();
                $('#tab3FileGrid').clearGridData();
            });
        }
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    };
}

//********** 화주등록 미분류 저장 버튼(왼쪽화살표) 액션**********//
var fn_returnAction1 = function(){
    var $grid 	= $('#masterGrid'),
        rowid 	= $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("분류 리스트를 선택한 후 클릭하세요");
        return;
    }

    if($("#addForm #edmsUploadType").val() != "IMPORT_SIMPLE_REQUEST" && $("#addForm #edmsUploadType").val() != "EXPORT_SIMPLE_REQUEST"){
    	fn_returnAction();
        return;
    }

    try {
        if (confirm("[미분류] 하시겠습니까 ?")) {
        	var d = {};
            d = rowData;

            var url = "../apis/edms/saveEdmsMasterInfo",
            	params = {
                    "edmsKey"		: d["edmsKey"],
                    "editDay"		: $('#notForm #yyyymmdd').val(),
                    "teamCode"		: "000",
                    "editUserId"	: "pfaejafes",
                    "editUserName"	: "등록자"
                },
                type = "POST";

            sendAjax(url, params, type, function (d) {
                fn_searchActionTotal();
                fn_tab3Action();
                $('#tab3FileGrid').clearGridData();
            });
        }
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    };
}

//********** 면장등록 분류 저장 버튼(오른쪽화살표) 액션**********//
var fn_changeAction2 = function(){
    try {
    	document.getElementById("myBar").style.width = '0%';
        document.getElementById("label").innerHTML 	 = '';
        $("#myBar").css("display", 'inline');

        if(confirm("필증을 분류하시겠습니까 ?")){
        	var url 	= "../apis/edms/getEdmsFileInfoList",
	            params 	= {
        			"size"				: "1000",
                    "page"				: "0",
                    "_pageRow"			: "1000",
                    "_pageNumber"		: "0",
	                "edmsParentGubun"	: "PAPER",
	                "edmsFileUserId"	: $('#sessionId').val(),
	                "useYn"				: "Y"
	            },
	            type 	= "POST";

	        sendAjax(url, params, type, function(d){
	        	var defaultDB = "";
	        	var i=0;
	        	var idd = setInterval(frame1, 700);
	    	    function frame1() {
	    	    	if(i==d.content.length){
	    	    		clearInterval(idd);
	    	        	fn_tab1Action();
	    	        	alert("필증이 분류되었습니다.");
	    	        	setTimeout(function(){
	    	        		document.getElementById("myBar").style.width = '0%';
	    	                document.getElementById("label").innerHTML 	 = '';
	    	            }, 500);
	    	    	}else{
		        		if(d.content[i].edmsSaveFileName.substr(0,4)!="IMP_" && d.content[i].edmsSaveFileName.substr(0,4)!="EXP_"){
		        		}else{
			        		var jisa  	= d.content[i].edmsSaveFileName.substr(4,5);
			        		var singo 	= d.content[i].edmsSaveFileName.substr(4,14);
			        		var code 	= d.content[i].edmsSaveFileName.substr(17,1);
			        		if(d.content[i].edmsSaveFileName.substr(0,4)=="EXP_"){
			        			if(jisa=="43518"){
			        				defaultDB = "ncustoms_ic";
			        			}else if(jisa=="42530"){
			        				defaultDB = "ncustoms_pj";
			        			}else if(jisa=="43494"){
			        				defaultDB = "ncustoms_sel4";
			        			}else if(jisa=="40629"){
			        				defaultDB = "ncustoms_pt";
			        			}else if(jisa=="42773"){
			        				defaultDB = "ncustoms_sn";
			        			}else if(jisa=="42119"){
			        				defaultDB = "ncustoms_yj";
			        			}else if(jisa=="43862"){
			        				defaultDB = "ncustoms_ca";
			        			}else if(jisa=="43618"){
			        				defaultDB = "ncustoms_cj";
			        			}else if(jisa=="42064"){
			        				defaultDB = "ncustoms_bs";
			        			}else if(jisa=="43466"){
			        				defaultDB = "ncustoms_us";
			        			}else if(jisa=="42095"){
			        				defaultDB = "ncustoms_gm";
			        			}else if(jisa=="43522"){
			        				defaultDB = "ncustoms_cw";
			        			}else if(jisa=="42526"){
			        				defaultDB = "ncustoms_jj";
			        			}else if(jisa=="43617"){
			        				defaultDB = "ncustoms_ys";
			        			}else if(jisa=="43518"){
			        				defaultDB = "ncustoms_ic";
			        			}else{
			        				defaultDB = "ncustoms_sel_040";
			        			}

			        			var url = "../apis/edms/getExportPaperList",
				                    params = {
			        					"size"			: "100000",
			        		            "page"			: "0",
			        		            "_pageRow"		: "100000",
			        		            "_pageNumber"	: "0",
			        					"_defaultDB"	: defaultDB,
			        					"singoNo"		: singo
			        				},
				                    type = "POST";

			        			$.ajax({
									type 		: type,
									contentType : "application/json",
									dataType 	: 'json',
									url 		: url,
									processData : true,
									cache 		: false,
									async		: false,
									data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
									success 	: function(returnValue1){
										var down 	= d.content.length;
								    	var up 	 	= i+1;
								    	var width 	= Math.round(up / down * 100);
								        document.getElementById("myBar").style.width = width + '%';
								        document.getElementById("label").innerHTML = width * 1 + '%';

										if(returnValue1.content.length > 0) {
											var url = "../apis/edms/paperEdmsFile",
							                    params = {
						        					"edmsFileKey"		: d.content[i].edmsFileKey,
						        					"edmsParentGubun"	: "EXPORT",
						        					"edmsParentKey"		: returnValue1.content[0].edmsKey,
						        					"edmsSearchKeyword"	: singo
						        				},
							                    type = "POST";

							                sendAjax(url, params, type, function (d) {
							                });
										}else{
											return;
										}
									},
									error 		: function(e){
										return;
									}
								});
			        		}else{
			        			if(jisa=="43518"){
			        				defaultDB = "ncustoms_ic";
			        			}else if(jisa=="42530"){
			        				defaultDB = "ncustoms_pj";
			        			}else if(jisa=="43494"){
			        				defaultDB = "ncustoms_sel4";
			        			}else if(jisa=="40629"){
			        				defaultDB = "ncustoms_pt";
			        			}else if(jisa=="42773"){
			        				defaultDB = "ncustoms_sn";
			        			}else if(jisa=="42119"){
			        				defaultDB = "ncustoms_yj";
			        			}else if(jisa=="43862"){
			        				defaultDB = "ncustoms_ca";
			        			}else if(jisa=="43618"){
			        				defaultDB = "ncustoms_cj";
			        			}else if(jisa=="42064"){
			        				defaultDB = "ncustoms_bs";
			        			}else if(jisa=="43466"){
			        				defaultDB = "ncustoms_us";
			        			}else if(jisa=="42095"){
			        				defaultDB = "ncustoms_gm";
			        			}else if(jisa=="43522"){
			        				defaultDB = "ncustoms_cw";
			        			}else if(jisa=="42526"){
			        				defaultDB = "ncustoms_jj";
			        			}else if(jisa=="43617"){
			        				defaultDB = "ncustoms_ys";
			        			}else if(jisa=="43518"){
			        				defaultDB = "ncustoms_ic";
			        			}else{
			        				defaultDB = "ncustoms";
			        			}

			        			var url = "../apis/edms/getImportPaperList",
				                    params = {
			        					"size"			: "100000",
			        		            "page"			: "0",
			        		            "_pageRow"		: "100000",
			        		            "_pageNumber"	: "0",
			        					"_defaultDB"	: defaultDB,
			        					"singoNo"		: singo
			        				},
				                    type = "POST";

			        			$.ajax({
									type 		: type,
									contentType : "application/json",
									dataType 	: 'json',
									url 		: url,
									processData : true,
									cache 		: false,
									async		: false,
									data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
									success 	: function(returnValue1){
										var down 	= d.content.length;
								    	var up 		= i+1;
								    	var width 	= Math.round(up / down * 100);
								    	console.log(width);
								        document.getElementById("myBar").style.width = width + '%';
								        document.getElementById("label").innerHTML = width * 1 + '%';

										if(returnValue1.content.length > 0) {
											var url = "../apis/edms/paperEdmsFile",
							                    params = {
						        					"edmsFileKey"		: d.content[i].edmsFileKey,
						        					"edmsParentGubun"	: "IMPORT",
						        					"edmsParentKey"		: returnValue1.content[0].edmsKey,
						        					"edmsSearchKeyword"	: singo
						        				},
							                    type = "POST";

							                sendAjax(url, params, type, function (d) {
							                });
										}else{
											return;
										}
									},
									error 		: function(e){
										return;
									}
								});
			        		}
		        		}
		        		i++;
		        	}
	    	    }
	        });
        }else{
        	fn_tab1Action();
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    };
}

//********** 수입 수동 저장 버튼 액션**********//
var fn_changeNum = function () {
    var $grid = $('#masterGrid'),
        rowid = $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("아래 라인을 선택한 후 클릭하세요");
        return;
    }
    try {
        openWindowWithPost("./detailMaster.sein", "width=400, height=340, scrollbars=no, location=no, menubar=no", "changeNum", {
            "edmsKey": rowData.edmsKey,
            "useYn": "Y"
        });
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
    ;
}

//********** 수출 수동 저장 버튼 액션**********//
var fn_changeNum1 = function () {
    var $grid = $('#masterGrid'),
        rowid = $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("아래 라인을 선택한 후 클릭하세요");
        return;
    }
    try {
        openWindowWithPost("./detailMasterEx.sein", "width=400, height=230, scrollbars=no, location=no, menubar=no", "changeNum", {
            "edmsKey": rowData.edmsKey,
            "useYn": "Y"
        });
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
    ;
}

//********** 비엘 년도 체크**********//
//function checkBlNoYear() {
//    var rowData = jQuery("#masterGrid").getRowData(sIds),
//        banip, iphang, singo, addDay;
//
//    banip = rowData.Impo_banip_date;
//    iphang = rowData.Impo_iphang_date;
//    singo = rowData.Impo_singo_date;
//    addDay = rowData.addDay;
//
//    if (banip != "" && banip != "10000101") {
//        return banip;
//    } else if (iphang != "" && iphang != "10000101") {
//        return iphang;
//    } else if (singo != "" && singo != "10000101") {
//        return singo;
//    } else {
//        return addDay;
//    }
//    return;
//}

//********** 비엘 링크**********//
function linkBlNo() {
    var rowData = jQuery("#masterGrid").getRowData(sIds);
    var mrnNo = rowData.Impo_mrn_no;

    var url = './viewTracking.sein?'
        + 'cargMtNo=' + mrnNo
        + '&mblNo='
        + '&hblNo='
        + '&blYy=';

    window.open(url, mrnNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

//********** 비엘 formatter**********//
function linkBlNoFormatter(cellValue, options, rowdata, action){
	if(isEmpty(rowdata.Impo_singo_no)){
		return cellValue;
	}else{
		return "<u><a href='javascript:linkBlNo()'>" + cellValue + "</a></u>";
	}
}

//********** 날짜 formatter**********//
function dateFormatter(cellValue, options, rowObject) {
    if (isEmpty(cellValue)) return "";
    var DateChange = cellValue.substr(0, 4) + "-" + cellValue.substr(4, 2) + "-" + cellValue.substr(6, 2);
    return DateChange;
}

//********** 미분류 다운로드 formatter**********//
function linkDownloadNotFormatter(cellValue, options, rowdata, action) {
    return "<a onclick='javascript:fn_downNotAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 분류 다운로드 formatter**********//
function linkDownloadFormatter(cellValue, options, rowdata, action) {
    var category = "";
    var edmsNewFileName = "";

    if (rowdata.edmsFileCategory == "Z0001") {
        category = "NO";
    } else if (rowdata.edmsFileCategory == "A0001") {
        category = "BL";
    } else if (rowdata.edmsFileCategory == "A0002") {
        category = "IN";
    } else if (rowdata.edmsFileCategory == "A0003") {
        category = "PA";
    } else if (rowdata.edmsFileCategory == "A0004") {
        category = "CO";
    } else if (rowdata.edmsFileCategory == "B0001") {
        category = "PL";
    } else if (rowdata.edmsFileCategory == "B0002") {
        category = "YO";
    } else if (rowdata.edmsFileCategory == "C0001") {
        category = "DI";
    } else if (rowdata.edmsFileCategory == "Z0002") {
        category = "EM";
    } else if (rowdata.edmsFileCategory == "A0005") {
        category = "TO";
    } else if (rowdata.edmsFileCategory == "D0001") {
        category = "CM";
    } else if (rowdata.edmsFileCategory == "C0002") {
        category = "DL";
    } else if (rowdata.edmsFileCategory == "Z0003") {
        category = "ET";
    }

    if ($('#addForm #edmsGubun').val() == "SEINETC" || $('#addForm #edmsGubun').val() == "HWANGUP") {
        edmsNewFileName = rowdata.edmsOrgFileName;
    } else {
        edmsNewFileName = $('#addForm #singoDay').val() + "_" + $('#addForm #edmsNum').val() + "_" + category + "_" + rowdata.edmsOrgFileName;
    }

    // TODO 임시(20170821)
    return "<a onclick='javascript:fn_downAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\", \"" + edmsNewFileName + "\")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 미분류 삭제 formatter**********//
function linkDelNotFormatter(cellValue, options, rowdata, action) {
    if (rowdata.addUserId == $("#sessionId").val() || rowdata.editUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
        return "<a onclick='javascript:fn_delNotAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 면장등록 삭제 formatter**********//
function linkDelPaperFormatter(cellValue, options, rowdata, action) {
    if (rowdata.addUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
        return "<a onclick='javascript:fn_delPaperAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(cellValue, options, rowdata, action) {
	if (rowdata.edmsFileAddUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
		return "<a onclick='javascript:fn_delAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 수입신고번호 formatter**********//
function linkImportSingoFormatter(cellValue, options, rowObject) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var Singo = cellValue.substr(0, 5) + "-" + cellValue.substr(5, 2) + "-" + cellValue.substr(7, 7);
        return Singo;
    }
}

//********** 수출신고번호 formatter**********//
function linkExportSingoFormatter(cellValue, options, rowObject) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var Singo = cellValue.substr(0, 5) + "-" + cellValue.substr(5, 2) + "-" + cellValue.substr(7, 7);
        return "<u><a href='javascript:linkSingoNo(\"" + cellValue + "\")'>" + Singo + "</a></u>";
    }
}

//********** 수출신고번호 팝업**********//
var linkSingoNo = function (singoNo) {
    var url = './viewExportTracking.sein?expDclrNo=' + singoNo;

    window.open(url, "ExportSingo", 'width=600,height=300,resizable=1,scrollbars=yes');
}

//********** 미분류 다운로드 액션**********//
var fn_downNotAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName) {
    edmsOrgFileName = encodeURIComponent(edmsOrgFileName);
    location.href = "../apis/edms/downloadEdmsFile?edmsFileKey=" + edmsFileKey + "&edmsParentGubun=" + edmsParentGubun + "&edmsParentKey=" + edmsParentKey + "&edmsOrgFileName=" + edmsOrgFileName;
};

//********** 분류 다운로드 액션**********//
var fn_downAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName, edmsNewFileName) {
    edmsOrgFileName = encodeURIComponent(edmsOrgFileName);
    edmsNewFileName = encodeURIComponent(edmsNewFileName);
    location.href = "../apis/edms/downloadEdmsFile?edmsFileKey=" + edmsFileKey + "&edmsParentGubun=" + edmsParentGubun + "&edmsParentKey=" + edmsParentKey + "&edmsOrgFileName=" + edmsOrgFileName + "&edmsNewFileName=" + edmsNewFileName;
};

//********** 미분류 삭제 액션**********//
var fn_delNotAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey, "edmsParentGubun": edmsParentGubun, "edmsParentKey": edmsParentKey, "edmsOrgFileName": edmsOrgFileName},
            type = "POST";

        sendAjax(url, params, type, function (d) {
            fn_NotFileAction();
        });
    }
};

//********** 면장등록 삭제 액션**********//
var fn_delPaperAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey, "edmsParentGubun": edmsParentGubun, "edmsParentKey": edmsParentKey, "edmsOrgFileName": edmsOrgFileName},
            type = "POST";

        sendAjax(url, params, type, function (d) {
        	fn_tab1Action();
        });
    }
};

//********** 분류 파일삭제 액션**********//
var fn_delAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey, "edmsParentGubun": edmsParentGubun, "edmsParentKey": edmsParentKey, "edmsOrgFileName": edmsOrgFileName},
            type = "POST";

        sendAjax(url, params, type, function (d) {
            fn_fileAction2(edmsParentKey,$("#addForm #edmsSearchKeyword").val() ,edmsParentGubun);
        });
    }
};

//********** 분류 파일 추가 폼 리셋**********//
var formReset = function () {
    $("#frm3").each(function () {
        this.reset();
    });

    $("#notForm").each(function () {
        this.reset();
    });

    $("#changeForm").each(function () {
        this.reset();
    });
}

////********** 운송의뢰 액션**********//
//var fn_deliveryInsert = function () {
//    var $t 		= $("#masterGrid"),
//    	rowId 	= $t.getGridParam("selarrrow"),
//    	ids 	= $t.jqGrid('getDataIDs');
//
//    if(rowId.length == 0){
//        alert('운송의뢰할 리스트를 체크해 주세요.');
//        return;
//    }
//    var dd = [];
//    var checkCount = 0;
//
//    for(var i = 0; i < ids.length; i++){
//        var check = false;
//        $.each(rowId, function(index, value){
//            if (value == ids[i])
//                check = true;
//        });
//        if(check){
//        	if($("#masterGrid").getRowData(ids[i]).Impo_singo_no == ""){
//	            alert("신고번호가 없어 운송의뢰하실 수 없습니다.");
//	            return;
//	        }
//
//        	var url 	= "../apis/edms/getImportDeliveryRequestList",
//				params 	= {
//					"size"			: "100000",
//					"page"			: "0",
//					"_pageRow"		: "100000",
//					"_pageNumber"	: "0",
//					"useYn"			: "Y",
//					"hblNo"			: $("#masterGrid").getRowData(ids[i]).edmsNum,
//					"singoNo"		: $("#masterGrid").getRowData(ids[i]).Impo_singo_no
//				},
//				type 	= "POST";
//			$.ajax({
//				type 		: type,
//				contentType : "application/json",
//				dataType 	: 'json',
//				url 		: url,
//				processData : true,
//				cache 		: false,
//				async		: false,
//				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//				success 	: function(returnValue1){
//					if(returnValue1.content.length==0){
//					}else{
//						checkCount += 1;
//					}
//				},
//				error 		: function(e){
//					console.error("에러내용", e);
//					alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
//					progress.hide();
//					return -1;
//				}
//			});
//        }
//    }
//
//    if(checkCount > 0){
//		alert("이미 의뢰된 해당 B/L의 신고번호가 있습니다.");
//		progress.hide();
//		return -1;
//	}
//
//    openWindowWithPost("./deliveryInsert.sein", "width=390, height=320, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
//    });
//};

//********** 운송의뢰 액션**********//
var fn_deliveryInsert = function(){
	var $grid 	= $('#masterGrid'),
	    rowid 	= $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);
	var checkCount = 0;

	if (rowid == null) {
	    alert("분류리스트를 선택한 후 클릭하세요");
	    return;
	}
	try {
	  	if(rowData.Impo_singo_no == ""){
	          alert("신고번호가 없어 운송의뢰하실 수 없습니다.");
	          return;
	    }

	  	if(rowData.deliveryStatus != ""){
	          alert("이미 의뢰되었습니다.");
	          return;
	    }

//	  	var url 	= "../apis/edms/getImportDeliveryRequestList",
//			params 	= {
//				"size"			: "100000",
//				"page"			: "0",
//				"_pageRow"		: "100000",
//				"_pageNumber"	: "0",
//				"useYn"			: "Y",
//				"hblNo"			: rowData.edmsNum.substring(35).replace("</a></u>", ""),
//				"singoNo"		: rowData.Impo_singo_no.replace(/-/gi,'')
//			},
//			type 	= "POST";
//	  	console.log(params);
//		$.ajax({
//			type 		: type,
//			contentType : "application/json",
//			dataType 	: 'json',
//			url 		: url,
//			processData : true,
//			cache 		: false,
//			async		: false,
//			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//			success 	: function(returnValue1){
//				if(returnValue1.content.length==0){
//				}else{
//					checkCount += 1;
//				}
//			},
//			error 		: function(e){
//				alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
//				progress.hide();
//				return -1;
//			}
//		});
//
//		if(checkCount > 0){
//			alert("이미 의뢰된 해당 B/L의 신고번호가 있습니다.");
//			progress.hide();
//			return -1;
//		}else{
			openWindowWithPost("./deliveryInsert.sein", "width=390, height=405, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"impoKey" 		: rowData.Impo_key,
				"_defaultDB" 	: rowData.jisaCode
			});
//		}
	}catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

//********** 운송의뢰수정 액션**********//
var fn_deliveryModify = function(){
	var $grid 	= $('#masterGrid'),
	    rowid 	= $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);
	var checkCount = 0;

	if (rowid == null) {
	    alert("분류리스트를 선택한 후 클릭하세요");
	    return;
	}
	try {
		if(rowData.deliveryStatus == ""){
	          alert("운송의뢰가 되지 않았습니다.");
	          return;
	    }

	  	if(rowData.deliveryStatus != "20"){
	          alert("운송의뢰시만 수정가능합니다.");
	          return;
	    }

		openWindowWithPost("./deliveryModify.sein", "width=390, height=405, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
			"singoNo" : rowData.Impo_singo_no.replace(/-/gi, '')
		});
	}catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

//
////********** 운송의뢰 액션**********//
//var deliveryAction = function () {
//    var $t 		= $("#masterGrid"),
//    	rowId 	= $t.getGridParam("selarrrow"),
//    	ids 	= $t.jqGrid('getDataIDs');
//    var dd = [];
//    var checkCount = 0;
//
//    for(var i = 0; i < ids.length; i++){
//        var check = false;
//        $.each(rowId, function(index, value){
//            if (value == ids[i])
//                check = true;
//        });
//        if(check){
//        	var url 	= "../apis/edms/getImportMasterInfoByKcba",
//				params 	= {
//					"size"			: "100000",
//		            "page"			: "0",
//		            "_pageRow"		: "100000",
//		            "_pageNumber"	: "0",
//		            "_defaultDB"	: $("#masterGrid").getRowData(ids[i]).jisaCode,
//		            "impoKey"		: $("#masterGrid").getRowData(ids[i]).Impo_key
//				},
//				type 	= "POST";
//
//			$.ajax({
//				type 		: type,
//				contentType : "application/json",
//				dataType 	: 'json',
//				url 		: url,
//				processData : true,
//				cache 		: false,
//				async		: false,
//				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//				success 	: function(returnValue){
//					console.log(returnValue.content);
//					var url 	= "../apis/edms/getImportDeliveryRequestList",
//						params 	= {
//							"size"			: "100000",
//							"page"			: "0",
//							"_pageRow"		: "100000",
//							"_pageNumber"	: "0",
//							"useYn"			: "Y",
//							"hblNo"			: returnValue.content[0].Impo_bl_no,
//							"singoNo"		: returnValue.content[0].Impo_singo_no
//						},
//						type 	= "POST";
//					console.log(params);
//					$.ajax({
//						type 		: type,
//						contentType : "application/json",
//						dataType 	: 'json',
//						url 		: url,
//						processData : true,
//						cache 		: false,
//						async		: false,
//						data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//						success 	: function(returnValue1){
//							if(returnValue1.content.length==0){
//								dd.push({
//									"deliveryRequestKey" 		: null,
//									"customerKey" 				: $("#masterGrid").getRowData(ids[i]).edmsComKey,
//									"customerDb" 				: $("#masterGrid").getRowData(ids[i]).jisaCode,
//									"customerCode" 				: returnValue.content[0].Impo_napse_code,
//									"customerName" 				: returnValue.content[0].Impo_napse_sangho,
//									"customerTaxNum" 			: returnValue.content[0].Impo_napse_saup,
//									"mblNo" 					: returnValue.content[0].Impo_mbl_no,
//									"hblNo" 					: returnValue.content[0].Impo_bl_no,
//									"cargoNo" 					: "",
//									"singoNo" 					: returnValue.content[0].Impo_singo_no,
//									"singoDate" 				: returnValue.content[0].Impo_singo_date+"235959",
//									"suirDate" 					: returnValue.content[0].Impo_Ok_date+"235959",
//									"cargoStatus" 				: "D",
//									"pojangSu" 					: returnValue.content[0].Impo_pojang_su,
//									"pojangDanwi" 				: returnValue.content[0].Impo_pojang_danwi,
//									"totalJung" 				: returnValue.content[0].Impo_total_jung,
//									"jungDanwi" 				: returnValue.content[0].Impo_jung_danwi,
//									"deliveryStatus" 			: "20",
//									"banipPlace" 				: $('#deliveryForm #banipPlace').val(),
//									"cargoSize" 				: $('#deliveryForm #cargoSize').val(),
//									"deliveryPojangSu" 			: $('#deliveryForm #deliveryPojangSu').val(),
//									"deliveryPojangDanwi"		: returnValue.content[0].Impo_pojang_danwi,
//									"deliveryJung" 				: $('#deliveryForm #deliveryJung').val(),
//									"deliveryJungDanwi" 		: returnValue.content[0].Impo_jung_danwi,
//									"requestCoName" 			: returnValue.content[0].Impo_napse_sangho,
//									"requestMan" 				: $("#addForm #addUserName").val(),
//									"requestPhone" 				: "",
//									"requestDate" 				: $('#notForm #yymmddhhmmss').val(),
//									"requestNote" 				: $('#deliveryForm #requestNote').val(),
//									"deliveryDate" 				: "",
//									"assignId" 					: "",
//									"assignMan" 				: $('#deliveryForm #assignMan').val(),
//									"assignPhone" 				: $('#deliveryForm #assignPhone').val(),
//									"allocateRequestDate" 		: "",
//									"deliveryCoKey" 			: "",
//									"deliveryCoName" 			: "",
//									"deliveryCoPhone" 			: "",
//									"deliveryCarryingInKey" 	: $('#deliveryForm #deliveryCarryingInKey').val(),
//									"deliveryCarryingInName" 	: $('#deliveryForm #deliveryCarryingInName').val(),
//									"deliveryCarryingInPhone" 	: $('#deliveryForm #deliveryCarryingInPhone').val(),
//									"deliveryCarryingInFax" 	: "",
//									"deliveryCarryingInEmail" 	: $('#deliveryForm #deliveryCarryingInEmail').val(),
//									"deliveryCarryingInMan" 	: $('#deliveryForm #deliveryCarryingInMan').val(),
//									"deliveryCarryingInMobile"	: $('#deliveryForm #deliveryCarryingInMobile').val(),
//									"deliveryCarryingInAddr" 	: $('#deliveryForm #deliveryCarryingInAddr').val(),
//									"allocateDate" 				: "",
//									"deliveryCarKey" 			: null,
//									"deliveryCarName" 			: "",
//									"deliveryCarPhone" 			: "",
//									"deliveryCarNum" 			: "",
//									"deliveryStartDate" 		: "",
//									"deliveryEndDate" 			: "",
//									"damage" 					: "",
//									"damageDetail" 				: "",
//									"useYn" 					: "Y"
//								});
//							}else{
//								checkCount += 1;
//							}
//						},
//						error 		: function(e){
//							console.error("에러내용", e);
//							alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
//							progress.hide();
//							return -1;
//						}
//					});
//
//					if(checkCount > 0){
//						alert("이미 해당 B/L의 신고번호는 의뢰되어 있습니다.");
//						progress.hide();
//						return -1;
//					}
//				},
//				error 		: function(e){
//					console.error("에러내용", e);
//					alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
//					progress.hide();
//					return -1;
//				}
//			});
//        }
//    }
//
//	var url 	= "../apis/edms/saveImportDeliveryRequestList",
//		params 	= {"importDeliveryRequestList":dd},
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(ee){
//		//alert("운송의뢰 되었습니다.");
//		fn_searchActionTotal();
//	});
//};

//********** 운송의뢰 액션**********//
var deliveryAction = function () {
	var $grid 	= $('#masterGrid'),
	    rowid 	= $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);
	var checkCount = 0;
	var dd = [];
	var okdate = "";

	if (rowid == null) {
	    alert("분류리스트를 선택한 후 클릭하세요");
	    return;
	}
	try {
      	var url 	= "../apis/edms/getImportMasterInfoByKcba",
			params 	= {
				"size"			: "100000",
	            "page"			: "0",
	            "_pageRow"		: "100000",
	            "_pageNumber"	: "0",
	            "_defaultDB"	: rowData.jisaCode,
	            "impoKey"		: rowData.Impo_key
			},
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
				if(isEmpty(returnValue.content[0].IMPO_OK_DTTM)){
					if(isEmpty(returnValue.content[0].Impo_Ok_date)){
						okdate = "";
					}else{
						okdate = returnValue.content[0].Impo_Ok_date;
					}
				}else{
					okdate = returnValue.content[0].IMPO_OK_DTTM;
				}

				var url 	= "../apis/edms/getImportDeliveryRequestList",
					params 	= {
						"size"			: "100000",
						"page"			: "0",
						"_pageRow"		: "100000",
						"_pageNumber"	: "0",
						"useYn"			: "Y",
						"hblNo"			: returnValue.content[0].Impo_bl_no,
						"singoNo"		: returnValue.content[0].Impo_singo_no
					},
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
					success 	: function(returnValue1){
						if(returnValue1.content.length==0){
							dd.push({
								"deliveryRequestKey" 		: null,
								"customerKey" 				: rowData.edmsComKey,
								"customerDb" 				: rowData.jisaCode,
								"customerCode" 				: returnValue.content[0].Impo_napse_code,
								"customerName" 				: returnValue.content[0].Impo_napse_sangho,
								"customerTaxNum" 			: returnValue.content[0].Impo_napse_saup,
								"mblNo" 					: returnValue.content[0].Impo_mbl_no,
								"hblNo" 					: returnValue.content[0].Impo_bl_no,
								"cargoNo" 					: "",
								"singoNo" 					: returnValue.content[0].Impo_singo_no,
								"singoDate" 				: returnValue.content[0].Impo_singo_date,
								"suirDate" 					: okdate,
								"cargoStatus" 				: "D",
								"pojangSu" 					: returnValue.content[0].Impo_pojang_su,
								"pojangDanwi" 				: returnValue.content[0].Impo_pojang_danwi,
								"totalJung" 				: returnValue.content[0].Impo_total_jung,
								"jungDanwi" 				: returnValue.content[0].Impo_jung_danwi,
								"impoSegwan" 				: returnValue.content[0].Impo_segwan,
								"impoJangchBuho" 			: returnValue.content[0].Impo_jangch_buho,
								"impoJangchName" 			: returnValue.content[0].Impo_jangch_name,
								"impoJangchJangso" 			: returnValue.content[0].Impo_jangch_jangso,
								"impoBanipDate" 			: returnValue.content[0].Impo_banip_date,
								"deliveryStatus" 			: "20",
								"banipPlace" 				: $('#deliveryForm #banipPlace').val(),
								"cargoSize" 				: $('#deliveryForm #cargoSize').val(),
								"deliveryPojangSu" 			: $('#deliveryForm #deliveryPojangSu').val(),
								"deliveryPojangDanwi"		: returnValue.content[0].Impo_pojang_danwi,
								"deliveryJung" 				: $('#deliveryForm #deliveryJung').val(),
								"deliveryJungDanwi" 		: returnValue.content[0].Impo_jung_danwi,
								"requestCoName" 			: returnValue.content[0].Impo_napse_sangho,
								"requestMan" 				: $("#addForm #addUserName").val(),
								"requestPhone" 				: "",
								"requestDate" 				: $('#notForm #yymmddhhmmss').val(),
								"requestNote" 				: "",
								"requestInvisibleNote" 		: $('#deliveryForm #requestInvisibleNote').val(),
								"deliveryDate" 				: "",
								"assignId" 					: "",
								"assignMan" 				: $('#deliveryForm #assignMan').val(),
								"assignPhone" 				: $('#deliveryForm #assignPhone').val(),
								"allocateRequestDate" 		: "",
								"deliveryCoKey" 			: null,
								"deliveryCoName" 			: "",
								"deliveryCoPhone" 			: "",
								"deliveryCarryingInKey" 	: $('#deliveryForm #deliveryCarryingInKey').val(),
								"deliveryCarryingInName" 	: $('#deliveryForm #deliveryCarryingInName').val(),
								"deliveryCarryingInTaxNum" 	: "",
								"deliveryCarryingInPhone" 	: $('#deliveryForm #deliveryCarryingInPhone').val(),
								"deliveryCarryingInEmail" 	: $('#deliveryForm #deliveryCarryingInEmail').val(),
								"deliveryCarryingInFax" 	: "",
								"deliveryCarryingInMan" 	: $('#deliveryForm #deliveryCarryingInMan').val(),
								"deliveryCarryingInMobile"	: $('#deliveryForm #deliveryCarryingInMobile').val(),
								"deliveryCarryingInAddr" 	: $('#deliveryForm #deliveryCarryingInAddr').val(),
								"allocateDate" 				: "",
								"deliveryCarKey" 			: null,
								"deliveryCarName" 			: "",
								"deliveryCarPhone" 			: "",
								"deliveryCarNum" 			: "",
								"deliveryStartDate" 		: "",
								"deliveryEndDate" 			: "",
								"damage" 					: "N",
								"damageDetail" 				: "",
								"useYn" 					: "Y"
							});
						}else{
							checkCount += 1;
						}
					},
					error 		: function(e){
						console.error("에러내용", e);
						alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
						progress.hide();
						return -1;
					}
				});

				if(checkCount > 0){
					alert("이미 해당 B/L의 신고번호는 의뢰되어 있습니다.");
					progress.hide();
					return -1;
				}
			},
			error 		: function(e){
				console.error("에러내용", e);
				alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
				progress.hide();
				return -1;
			}
		});
   }catch(e){
       alert("에러가 발생했습니다\n" + e.message);
   }
console.log(dd);
	var url 	= "../apis/edms/saveImportDeliveryRequestList",
		params 	= {"importDeliveryRequestList":dd, "impoKey":rowData.Impo_key, "_defaultDB":rowData.jisaCode},
		type 	= "POST";

	sendAjax(url, params, type, function(ee){
		//alert("운송의뢰 되었습니다.");
		refreshGridPage($('#addForm #selrow').val(),$('#addForm #pageNum').val());
		//fn_searchActionTotal();
	});
};

function fn_deliveryView(){
	parent.document.all('sframe').cols="0,0,*,0";
}

//********** 운송 Status 링크**********//
function linkDeliveryStatus() {
    var rowData = jQuery("#masterGrid").getRowData(sIds);
    var deliveryRequestKey = rowData.deliveryRequestKey;

    var url = './viewDeliveryStatus.sein?'
        + 'deliveryRequestKey=' + deliveryRequestKey;

    window.open(url, deliveryRequestKey, 'width=400,height=135,resizable=1,scrollbars=no');
}

//########## 운송의뢰여부 Formatter ##########//
function linkDeliveryLinkFormatter(cellValue, options, rowdata, action){
	if(isEmpty(cellValue)){
		return "";
	}else if(cellValue==20){
		return "<u><a href='javascript:linkDeliveryStatus()'>운송의뢰</a></u>";
	}else if(cellValue==30){
		return "<u><a href='javascript:linkDeliveryStatus()'>배차요청</a></u>";
	}else if(cellValue==40){
		return "<u><a href='javascript:linkDeliveryStatus()'>배차완료</a></u>";
	}else if(cellValue==50){
		return "<u><a href='javascript:linkDeliveryStatus()'>배송중</a></u>";
	}else if(cellValue==60){
		return "<u><a href='javascript:linkDeliveryStatus()'>배송완료</a></u>";
	}
}

var fn_tab1DelAction = function(){
    var $t 		= $("#tab1FileGrid");
    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');

    if(rowId.length == 0){
        alert('아래 파일을 선택해 주세요.');
        return;
    }

    if (confirm("[삭제] 하시겠습니까?")) {
    	progress.show();
    	var _isSuccessArr = [];

	    for(var i = 0; i < ids.length; i++){
	        var check = false;
	        $.each(rowId, function (index, value){
	            if (value == ids[i])
	                check = true;
	        });
	        if(check){
	        	var url = "../apis/edms/deleteEdmsFile",
		            params = {
	        			"edmsFileKey" 		: $("#tab1FileGrid").getRowData(ids[i]).edmsFileKey,
	        			"edmsParentGubun"	: $("#tab1FileGrid").getRowData(ids[i]).edmsParentGubun,
	        			"edmsParentKey"		: $("#tab1FileGrid").getRowData(ids[i]).edmsParentKey,
	        			"edmsOrgFileName"	: $("#tab1FileGrid").getRowData(ids[i]).edmsOrgFileName
	        		},
		            type = "POST";

		        sendAjax(url, params, type, function (d){
		        	_isSuccessArr.push(true);
		        });
	        }
	    }

	    if (_isSuccessArr.indexOf(false) == -1) {
	    	progress.hide();
	    	alert('삭제되었습니다.');
            setTimeout(function(){
            	fn_tab1Action();
            }, 500);
        }
    }
};

var fn_NotFileDelAction = function(){
    var $t 		= $("#notfileGrid");
    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');

    if(rowId.length == 0){
        alert('아래 파일을 선택해 주세요.');
        return;
    }

    if (confirm("[삭제] 하시겠습니까?")) {
    	progress.show();
    	var _isSuccessArr = [];

	    for(var i = 0; i < ids.length; i++){
	        var check = false;
	        $.each(rowId, function (index, value){
	            if (value == ids[i])
	                check = true;
	        });
	        if(check){
	        	var url = "../apis/edms/deleteEdmsFile",
		            params = {
	        			"edmsFileKey" 		: $("#notfileGrid").getRowData(ids[i]).edmsFileKey,
	        			"edmsParentGubun"	: $("#notfileGrid").getRowData(ids[i]).edmsParentGubun,
	        			"edmsParentKey"		: $("#notfileGrid").getRowData(ids[i]).edmsParentKey,
	        			"edmsOrgFileName"	: $("#notfileGrid").getRowData(ids[i]).edmsOrgFileName
	        		},
		            type = "POST";

		        sendAjax(url, params, type, function (d){
		        	_isSuccessArr.push(true);
		        });
	        }
	    }

	    if (_isSuccessArr.indexOf(false) == -1) {
	    	progress.hide();
	    	alert('삭제되었습니다.');
            setTimeout(function(){
            	fn_NotFileAction();
            }, 500);
        }
    }
};

function move(){
	setTimeout(function(){
		$("#myBar").css("display", 'inline');
	    var width = 0;
	    var id = setInterval(frame, 10);
	    function frame() {
	    	var down = parseInt($("#ccc").val());
	    	var up = parseInt($("#ddd").val());
	    	width = Math.round(up / down * 100);
	    	console.log(width);
	        if (width >= 100) {
	            clearInterval(id);
	            //$("#cccc").val("");
	            //$("#dddd").val("");
	            //$("#myBar").css("display", 'none');
	        } else {
	        	document.getElementById("myBar").style.width = width + '%';
	            document.getElementById("label").innerHTML = width * 1 + '%';
	        }
	    }
	}, 100);
}

function fn_autoAction() {
    var url 	= "../apis/edms/autoFileSave",
    	params 	= {},
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
			alert("필증 분류 되었습니다.");
		},
		error 		: function(e){
		}
	});
}

function fn_getSnsTest() {
    var url 	= "../apis/edms/getSnsTest",
    	params 	= {},
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
			alert("메신저쪽지 테스트 되었습니다.");
		},
		error 		: function(e){
		}
	});
}

//********** 일괄다운 액션**********//
var fn_allDown = function(){
	openWindowWithPost("./edmsDownList.sein", "width=400, height=630, scrollbars=no, menubar=no, resizable=1", "edmsDownList", {
	});
};

//********** 메일전송 액션**********//
var fn_mailAction = function(){
	openWindowWithPost("./edmsSendMail.sein", "width=700, height=520, scrollbars=no, menubar=no, resizable=1", "edmsSendMail", {
	});
};