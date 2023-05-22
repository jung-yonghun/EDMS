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
        callback(d.content);
    });
}

//********** 미분류파일 리스트 **********//
function selectNotFileList() {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "100000",
            "page"				: "0",
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsParentGbn"     : "NOTCLASS",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        console.log(d);
        $('#notfileGrid').datagrid('loadData', d.content);
    });
}

//********** 필증파일 리스트 **********//
function selectPaperFileList() {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "150",
            "page"				: "0",
            "_pageRow"			: "150",
            "_pageNumber"		: "0",
            "edmsParentGbn"		: "PAPER",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        $('#tab1FileGrid').datagrid('loadData', d.content);
    });
}

//********** 서류파일 리스트 **********//
function selectPaperFile2List() {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "150",
            "page"				: "0",
            "_pageRow"			: "150",
            "_pageNumber"		: "0",
            "edmsParentGbn"		: "TPAPER",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        $('#tab4FileGrid').datagrid('loadData', d.content);
    });
}

//********** BL파일 미등록리스트 **********//
function selectPaperFile3List() {
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
    		"size"				: "150",
            "page"				: "0",
            "_pageRow"			: "150",
            "_pageNumber"		: "0",
            "edmsParentGbn"		: "BLINV",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        $('#tab5FileGrid').datagrid('loadData', d.content);
    });
}

//********** 파일 리스트 **********//
function selectFileList(code) {
	if($("#frm2 #sessionId").val()=="test"){
		var url = "../apis/edms/getEdmsFileInfoList",
	        params = {
	            "edmsNo"		: code,
	            "edmsJisaCode"	: "demoNcustomsPt",
	            "useYn"			: "Y"
	        },
	        type = "POST";
	    sendAjax(url, params, type, function (d) {
	        if (!d.content) return;
	        $('#tab3FileGrid').datagrid('loadData', d.content);
	    });
	}else{
		var url = "../apis/edms/getEdmsFileInfoList",
	        params = {
	            "edmsNo"		: code,
	            "edmsJisaCode"	: $("#frm2 #_defaultDB").val(),
	            "useYn"			: "Y"
	        },
	        type = "POST";
	    sendAjax(url, params, type, function (d) {
	        if (!d.content) return;
	        $('#tab3FileGrid').datagrid('loadData', d.content);
	    });
	}
}

//********** 미분류->분류 액션 **********//
function saveChangeAction(code){
	var jisaCode = "";
	if ($("#notForm #teamCode").val() == "012") {
		jisaCode = "ncustoms_sel_040";
    } else if ($("#notForm #teamCode").val() == "039") {
    	jisaCode = "ncustoms_bs";
    } else if ($("#notForm #teamCode").val() == "044") {
    	jisaCode = "ncustoms_us";
    } else if ($("#notForm #teamCode").val() == "021") {
    	jisaCode = "ncustoms_ic";
    } else if ($("#notForm #teamCode").val() == "020") {
    	jisaCode = "ncustoms_yj";
    } else if ($("#notForm #teamCode").val() == "030") {
    	jisaCode = "ncustoms_cw";
    } else if ($("#notForm #teamCode").val() == "028") {
    	jisaCode = "ncustoms_ca";
    } else if ($("#notForm #teamCode").val() == "027") {
    	jisaCode = "ncustoms_cj";
    } else if ($("#notForm #teamCode").val() == "022") {
    	jisaCode = "ncustoms_pj";
    } else if ($("#notForm #teamCode").val() == "026") {
    	jisaCode = "ncustoms_pt";
    } else if ($("#notForm #teamCode").val() == "029") {
    	jisaCode = "ncustoms_gm";
    } else if ($("#notForm #teamCode").val() == "024") {
    	jisaCode = "ncustoms_ay";
    } else if ($("#notForm #teamCode").val() == "050") {
    	jisaCode = "ncustoms_ys";
    } else if ($("#notForm #teamCode").val() == "075") {
    	jisaCode = "ncustoms_jj";
    } else if ($("#notForm #teamCode").val() == "076") {
    	jisaCode = "ncustoms_dj";
    } else if ($("#notForm #teamCode").val() == "008") {
    	jisaCode = "ncustoms_sel4";
    } else if ($("#notForm #teamCode").val() == "023" || $("#notForm #teamCode").val() == "025") {
    	jisaCode = "ncustoms_sn";
    } else {
    	jisaCode = "ncustoms";
    }

    var url 	= "../apis/edms/saveEdmsFile",
        params 	= {
            "edmsAttachFileVOList"	: code,
            "edmsParentGbn"			: $('#notForm #edmsGubun').val(),
            "edmsJisaCode"			: jisaCode,
            "edmsNo"				: $('#notForm #edmsNo').val(),
            "edmsSaup"				: $('#notForm #comNum').val(),
            "commonYn"				: "Y",
            "edmsFileCategory"		: "Z0001"
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
			$('#notForm #edmsNo').val("");
			selectNotFileList();
            //fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
            refreshGridPage();
		},
		error 		: function(e){
			console.error("에러내용", e);
			alert(e.responseText);
			progress.hide();
			return -1;
		}
	});
}

//********** 분류->미분류 파일액션 **********//
function saveReturnFileAction(code) {
    var url 	= "../apis/edms/saveEdmsFile",
    	params 	= {
            "edmsAttachFileVOList"	: code,
            "edmsParentGbn"			: "NOTCLASS",
            "edmsJisaCode"			: "ncustoms",
            "edmsNo"				: "",
            "commonYn"				: "N",
            "edmsFileCategory"		: "Z0001"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	selectNotFileList();
        fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
        refreshGridPage();
    });
}

//********** 미분류 파일리스트 구분저장 액션**********//
function saveFileNoneDetailSaveAction(code) {
    var url 	= "../apis/edms/saveEdmsFileAdditionalInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    	progress.hide();
    	selectNotFileList();
    });
}

//********** 파일리스트 구분저장 액션**********//
function saveFileDetailSaveAction(code) {
    var url 	= "../apis/edms/saveEdmsFileAdditionalInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    	fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
    });

    refreshGridPage();
}

//********** 미분류 -> 기타 Master액션 **********//
function saveChangeEtcAction(code){
	var url 	= "../apis/edms/saveEdmsMasterInfo",
		params  = code,
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		fn_searchActionTotal();
	});
}

//********** 메인 나의 리스트**********//
function selectEdmsMasterMyList(){
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
            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNo"			: $('#frm2 #edmsNo').val(),
            "singoNo"			: $('#frm2 #singoNo').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val(),
            "edmsJungJung"		: $('#frm2 #edmsJungJung').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        $('#masterGrid').datagrid('loadData', d.content);
    });
}

//********** 메인 팀 리스트**********//
function selectEdmsMasterTeamList(){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
            "teamCode"			: $('#frm2 #teamCode').val(),
            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNo"			: $('#frm2 #edmsNo').val(),
            "singoNo"			: $('#frm2 #singoNo').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val(),
            "edmsJungJung"		: $('#frm2 #edmsJungJung').val()
        },
        type 	= "POST";
console.log(params);
    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        $('#masterGrid').datagrid('loadData', d.content);
    });
}

//********** 메인 지사 리스트**********//
function selectEdmsMasterJisaList(){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm2 #jisaCode').val(),
            "jisaCode"			: $('#frm2 #jisaCode').val(),
            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNo"			: $('#frm2 #edmsNo').val(),
            "singoNo"			: $('#frm2 #singoNo').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val(),
            "edmsJungJung"		: $('#frm2 #edmsJungJung').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        $('#masterGrid').datagrid('loadData', d.content);
    });
}

//********** 메인 전체 리스트**********//
function selectEdmsMasterAllList(){
    progress.show();
    var url 	= "../apis/edms/getEdmsMasterWithNotClassificationFileList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
            "edmsNo"			: $('#frm2 #edmsNo').val(),
            "singoNo"			: $('#frm2 #singoNo').val(),
            "edmsFileNo"		: $('#frm2 #edmsFileNo').val(),
            "edmsJungJung"		: $('#frm2 #edmsJungJung').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        $('#masterGrid').datagrid('loadData', d.content);
    });
}

//********** 메인 사전등록 리스트**********//
function selectEdmsMasterPreList(){
    progress.show();
    var url 	= "../apis/edms/getEdmsPreFileList",
        params 	= {
            "size"				: $('#frm5 #size').val(),
            "page"				: $('#frm5 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_defaultDB"		: $('#frm5 #_defaultDB').val(),
            "edmsMasterUserId"	: $('#frm5 #edmsMasterUserId').val(),
            "teamCode"			: $('#frm5 #teamCode').val(),
            "edmsGubun"			: $('#frm5 #edmsGubun').val(),
            "_DateType"			: $('#frm5 #_DateType').val(),
            "strFromDate"		: $('#frm5 #strFromDate1').val(),
            "strToDate"			: $('#frm5 #strToDate1').val(),
            "edmsNo"			: $('#frm5 #edmsNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d.content) return;
        $('#masterGrid1').datagrid('loadData', d.content);
    });
}

//********** 메인 레디이케아 리스트**********//
function selectEdmsMasterReadyList(){
    progress.show();
    var url 	= "../apis/ready/selectImportList",
        params 	= {
            "size"				: $('#frm10 #size').val(),
            "page"				: $('#frm10 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsMasterUserId"	: $('#frm10 #edmsMasterUserId').val(),
            "teamCode"			: $('#frm10 #teamCode').val(),
            "_DateType"			: $('#frm10 #_DateType').val(),
            "strFromDate"		: $('#frm10 #strFromDate2').val(),
            "strToDate"			: $('#frm10 #strToDate2').val(),
            "edmsNo"			: $('#frm10 #edmsNo').val(),
            "singoNo"			: $('#frm10 #singoNo').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        if (!d) return;
        $('#masterGrid2').datagrid('loadData', d);
    });
}

function selectNapseMasterList(){
    progress.show();

    var jisaCode = "";
	if($("#frmTab3 #teamCode").val() == "012"){
		jisaCode = "ncustoms_sel_040";
    }else if($("#frmTab3 #teamCode").val() == "039"){
    	jisaCode = "ncustoms_bs";
    }else if($("#frmTab3 #teamCode").val() == "044"){
    	jisaCode = "ncustoms_us";
    }else if($("#frmTab3 #teamCode").val() == "021"){
    	jisaCode = "ncustoms_ic";
    }else if($("#frmTab3 #teamCode").val() == "020"){
    	jisaCode = "ncustoms_yj";
    }else if($("#frmTab3 #teamCode").val() == "030"){
    	jisaCode = "ncustoms_cw";
    }else if($("#frmTab3 #teamCode").val() == "028"){
    	jisaCode = "ncustoms_ca";
    }else if($("#frmTab3 #teamCode").val() == "027"){
    	jisaCode = "ncustoms_cj";
    }else if($("#frmTab3 #teamCode").val() == "022"){
    	jisaCode = "ncustoms_pj";
    }else if($("#frmTab3 #teamCode").val() == "026"){
    	jisaCode = "ncustoms_pt";
    }else if($("#frmTab3 #teamCode").val() == "029"){
    	jisaCode = "ncustoms_gm";
    }else if($("#frmTab3 #teamCode").val() == "050"){
    	jisaCode = "ncustoms_ys";
    }else if($("#frmTab3 #teamCode").val() == "075"){
    	jisaCode = "ncustoms_jj";
    }else if($("#frmTab3 #teamCode").val() == "076"){
    	jisaCode = "ncustoms_dj";
    }else if($("#frmTab3 #teamCode").val() == "008"){
    	jisaCode = "ncustoms_sel4";
    }else if($("#frmTab3 #teamCode").val() == "040"){
    	jisaCode = "demoNcustomsPt";
    }else if($("#frmTab3 #teamCode").val() == "023" || $("#frmTab3 #teamCode").val() == "025"){
    	jisaCode = "ncustoms_sn";
    }else{
    	jisaCode = "ncustoms";
    }

    var url = "../apis/edms/getfindEdmsMasterList",
        params = {
            "size"						: "100000",
            "page"						: "0",
            "_pageRow"					: "100000",
            "_pageNumber"				: "0",
            "useYn"						: "Y",
            "startJisaCode"				: jisaCode,
            "teamCode"					: $('#frmTab3 #teamCode').val(),
            "startTaxpayerTradeName"	: $('#frmTab3 #imsTaxpayerTradeName').val(),
            "startNum"					: $('#frmTab3 #imsHouseBl').val(),
            "startGubun" 				: $('#frmTab3 #edmsGubun').val()
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        progress.hide();
        $('#tab3Grid').datagrid('loadData', d.content);
    });
}

//********** 초기 시작설정 **********//
$(document).ready(function () {
	if ($("#frm2 #USERGRADE").val() == "A" || $("#frm2 #USERGRADE").val() == "B") {
    	$("#ready").css("display","block");
    }

    if ($("#UserdefaultDB").val() == "ncustoms_ic" || $("#UserdefaultDB").val() == "ncustoms_yj") {
    	$("#ready").css("display","block");
    }

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

        var dates = $("#frm5 #strFromDate1, #frm5 #strToDate1").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            currentText: "오늘",
            dateFormat: 'yymmdd',
            onSelect: function (selectedDate) {
                var option = this.id == "strFromDate1" ? "minDate" : "maxDate",
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

        var dates10 = $("#frm10 #strFromDate2, #frm10 #strToDate2").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            currentText: "오늘",
            dateFormat: 'yymmdd',
            onSelect: function (selectedDate) {
                var option = this.id == "strFromDate2" ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates10.not(this).datepicker("option", option, date);
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
	var yymmddhhmmss = $('#frm3 #yyyymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#frm3 #yymmddhhmmss').val(yymmddhhmmss);

    getTeamSet({"size": "100"}, drawTeamList);
    getTeamSet({"size": "100"}, drawTeamListfrmTab3);
    getTeamSet({"size": "100"}, drawTeamListfrmTab5);

    drawStatusListImportForm();
    drawDateImportForm();
//    drawCategoryListaddForm();

    $("#arrowRight").html('<img src="../images/common/next_arrow.png" onclick="javascript:fn_changeAction();">');
    $("#arrowLeft").html('<img src="../images/common/prev_arrow.png" onclick="javascript:fn_returnAction();">');

    if ($("#frm2 #USERGRADE").val() != "A" && $("#frm2 #USERGRADE").val() != "B") {
        $("select[name='gubunTypeA'] option[value='jisa']").remove();
        $("select[name='gubunTypeA'] option[value='all']").remove();
    }

    $("input[name='gubunTypeA']:radio").change(function (){
        ChangeTypefrm2(this);
    });

    $("input[name='edmsGubunA']:radio").change(function (){
    	ChangeGubunfrm2();
    });

    if ($("#frm2 #USERGRADE").val() != "A" && $("#frm2 #USERGRADE").val() != "B" && $("#frm2 #USERGRADE").val() != "C") {
        $("#downBtn").css("display", 'none');
        $("#downBtn1").css("display", 'none');
    }
    getTeamSet({"size": "100"}, drawTeamListfrm2);
    getTeamSet({"size": "100"}, drawTeamListfrm5);
    getCmmnCodeList({"mCode": 'Y00008', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawJisaListfrm2);

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
        dragdropWidth: 300,
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
        	selectNotFileList();
        }
    });

    var extraObj = $("#fileuploader1").uploadFile({
        url: "../apis/edms/uploadEdmsFile",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: 300,
        statusBarWidth: 250,
        maxFileSize: 100000 * 1024,
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
            if ($("#addForm #edmsParentGbn").val() == "") {
                alert("분류 리스트를 선택하세요.");
                return false;
            } else {
                if ($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSingoNo").val() == "") {
                    alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
                    return false;
                } else if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSingoNo").val() != "") {
                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNo").val() == "") {
                		alert("B/L(Inv) NO가 부여되지 않았습니다. 신고번호별 개별문서로 분류해주세요.");
                        return false;
                	}
            		progress.show();
            		var data = $("#addForm").serializeObject();
            		data["commonYn"] = "Y";
                    return data;
                } else {
                	progress.show();
                	var data = $("#addForm").serializeObject();
                	data["commonYn"] = "N";
                    return data;
                }
            }
        },
        onSuccess: function (files, data, xhr, pd) {
        	progress.hide();
        	fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
        	refreshGridPage();
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
        dragdropWidth: 300,
        statusBarWidth: 250,
        maxFileSize: 100000 * 1024,
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

    var fileCount1 	 = 0;
    var submitCount1 = 0;
    var extraObj = $("#fileuploader3").uploadFile({
        url: "../apis/edms/uploadEdmsPaper2File",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: 300,
        statusBarWidth: 250,
        maxFileSize: 100000 * 1024,
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
            var data = $("#insertPaper2Form").serializeObject();
            return data;
        },
        onSuccess:function(files,data,xhr,pd){
        	move1();
        	submitCount1 += files.length;
        	$("#fff").val(submitCount1);
        },
        onError: function(files, status, errMsg){
            alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
        },
        afterUploadAll: function(obj){
        	document.getElementById("myBar1").style.width = '100%';
            document.getElementById("label1").innerHTML = '100%';
            fn_tab4Action();
            alert("서류가 분류되었습니다.");
        	setTimeout(function(){
        		document.getElementById("myBar1").style.width 	= '0%';
                document.getElementById("label1").innerHTML 	= '';
            }, 1000);
        }
    });

    var fileCount2 	 = 0;
    var submitCount2 = 0;
    var extraObj = $("#fileuploader4").uploadFile({
        url: "../apis/edms/uploadEdmsPaper3File",
        fileName: "myfile",
        autoSubmit: true,
        multiple: true,
        dragDrop: true,
        dragdropWidth: 300,
        statusBarWidth: 250,
        maxFileSize: 100000 * 1024,
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
            var data = $("#insertPaper3Form").serializeObject();
            return data;
        },
        onSuccess:function(files,data,xhr,pd){
        	move2();
        	submitCount2 += files.length;
        	$("#hhh").val(submitCount2);
        },
        onError: function(files, status, errMsg){
            alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
        },
        afterUploadAll: function(obj){
        	document.getElementById("myBar2").style.width = '100%';
            document.getElementById("label2").innerHTML = '100%';
            fn_tab5Action();
        	setTimeout(function(){
        		document.getElementById("myBar2").style.width 	= '0%';
                document.getElementById("label2").innerHTML 	= '';
            }, 1000);
        }
    });

    setTimeout(function(){
	$('#notfileGrid').datagrid({
		title			: '미분류 파일리스트',
		width			: '100%',
		height			: 320,
		singleSelect	: false,
		fitColumns		: true,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		autoRowHeight	: false,
		remoteSort		: false,
		columns			: [[
			{field:'ck',title:'',checkbox:true},
			{field:'sdaakey',title:'Key',hidden:true},
			{field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
			{field:'edmsOrgFileNm',title:'파일명',width:230,sortable:true},
			{field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:40,align:'center',formatter:linkDelNotFormatter},
            {field:'commonYn',title:'commonYn',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
	    },
	    onEndEdit : function(index,row){
	        var ed = $(this).datagrid('getEditor', {
	            index: index,
	            field: 'edmsFileCategory'
	        });
	    },
	    onBeforeEdit:function(index,row){
	        row.editing = true;
	        $(this).datagrid('refreshRow', index);
	    },
	    onAfterEdit:function(index,row){
	        row.editing = false;
	        $(this).datagrid('refreshRow', index);
	    },
	    onCancelEdit:function(index,row){
	        row.editing = false;
	        $(this).datagrid('refreshRow', index);
	    }
	});

	$('#notfileGrid').datagrid('enableFilter',[]);

	$('#tab3Grid').datagrid({
		title			: '미분류 화주등록 리스트',
		width			: '100%',
		height			: 210,
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: true,
		autoRowHeight	: false,
		pageSize		: 50,
		view			: bufferview,
		columns			: [[
			{field:'startKey',title:'Key',hidden:true},
			{field:'startNum',title:'B/L(Inv)',width:100},
			{field:'startTaxpayerTradeName',title:'업체명',width:200}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListTab3ImportAction(rowData);
        }
	});

	$('#tab3Grid').datagrid('enableFilter',[]);

	$('#tab3FileGrid').datagrid({
		title			: '파일 리스트',
		width			: '100%',
		height			: 205,
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: true,
		autoRowHeight	: false,
		view			: bufferview,
		columns			: [[
			{field:'sdaakey',title:'Key',hidden:true},
			{field:'edmsOrgFileNm',title:'파일명',width:270},
			{field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter}
        ]]
	});

	$('#tab3FileGrid').datagrid('enableFilter',[]);

	$('#tab1FileGrid').datagrid({
		title			: '필증 미등록 리스트',
		width			: '100%',
		height			: 362,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		autoRowHeight	: false,
		view			: bufferview,
		columns			: [[
			{field:'ck',title:'',checkbox:true},
			{field:'sdaakey',title:'Key',hidden:true},
			{field:'edmsOrgFileNm',title:'파일명',width:150},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelPaperFormatter}
        ]]
	});

	$('#tab1FileGrid').datagrid('enableFilter',[]);

	$('#tab4FileGrid').datagrid({
		title			: '병합 미등록 리스트',
		width			: '100%',
		height			: 342,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		autoRowHeight	: false,
		view			: bufferview,
		columns			: [[
			{field:'ck',title:'',checkbox:true},
			{field:'sdaakey',title:'Key',hidden:true},
			{field:'edmsOrgFileNm',title:'파일명',width:150},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelPaperFormatter1}
        ]]
	});

	$('#tab4FileGrid').datagrid('enableFilter',[]);

	$('#tab5FileGrid').datagrid({
		title			: 'BL 미등록 리스트',
		width			: '100%',
		height			: 296,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		autoRowHeight	: false,
		view			: bufferview,
		columns			: [[
			{field:'ck',title:'',checkbox:true},
			{field:'sdaakey',title:'Key',hidden:true},
			{field:'edmsOrgFileNm',title:'파일명',width:150},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelPaperFormatter1}
        ]]
	});

	$('#tab5FileGrid').datagrid('enableFilter',[]);

	setImportGrid();
	setPreGrid();
	setReadyGrid();

	$('#excelImportGrid').datagrid({
		width	: '100%',
		height	: 500,
		columns	: [[
			{field:'Impo_bl_no',title:'H B/L No.'},
			{field:'Impo_singo_no',title:'신고번호'},
			{field:'Impo_napse_sangho',title:'업체명'},
			{field:'UserNM',title:'등록자'},
			{field:'filePaperCount',title:'필증'},
			{field:'fileCount',title:'파일'}
        ]]
	});

	$('#excelExportGrid').datagrid({
		width	: '100%',
		height	: 500,
		columns	: [[
			{field:'Expo_iv_no',title:'Invoice No.'},
			{field:'Expo_singo_no',title:'신고번호'},
			{field:'Expo_suchulja_sangho',title:'업체명'},
			{field:'UserNM',title:'등록자'},
			{field:'filePaperCount',title:'필증'},
			{field:'fileCount',title:'파일'},
        ]]
	});

	$('#excelBanipGrid').datagrid({
		width	: '100%',
		height	: 500,
		columns	: [[
			{field:'Ban1_Invoice',title:'Invoice No.'},
			{field:'BAN1_SINGO_NO',title:'신고번호'},
			{field:'Ban1_gong_sangho',title:'업체명'},
			{field:'UserNM',title:'등록자', width:40},
			{field:'filePaperCount',title:'필증'},
			{field:'fileCount',title:'파일'}
        ]]
	});

	$('#excelNoGrid').datagrid({
		width	: '100%',
		height	: 500,
		columns	: [[
		    {field:'SANGHO',title:'업체명'},
			{field:'SINGO_NO',title:'신고번호'},
			{field:'UserNM',title:'등록자'}
        ]]
	});

	$('#tabs').tabs({
	    onSelect : function(title, index){
			var tab = $('#tabs').tabs('getSelected');
			var hest = $('#tabs').tabs('getTabIndex',tab);
			if(hest == 0){
				selectNotFileList();
				$("#arrowRight").html('<img src="../images/common/next_arrow.png" onclick="javascript:fn_changeAction();">');
				$("#arrowLeft").html('<img src="../images/common/prev_arrow.png" onclick="javascript:fn_returnAction();">');
			}else if(hest == 1){
				fn_tab3Action();
				$("#arrowRight").html('');
				$("#arrowLeft").html('');
			}else if(hest == 2){
				fn_tab1Action();
				$("#arrowRight").html('');
				$("#arrowLeft").html('');
			}else if(hest == 3){
				fn_tab4Action();
				$("#arrowRight").html('');
				$("#arrowLeft").html('');
			}else if(hest == 4){
				fn_tab5Action();
				$("#arrowRight").html('');
				$("#arrowLeft").html('');
			}
	    }
	});
	},10);



    $('#frm2 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm2 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

    $('#frm5 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm5 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));

    $('#frm10 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm10 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));

    $('#frmTab1 #startDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frmTab1 #endDay').val($.datepicker.formatDate('yymmdd', new Date()));

    $("#notForm #edmsNo").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#notForm #edmsNo").val(($("#notForm #edmsNo").val()).toUpperCase());
    });

    $("#frm2 #edmsNo").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm2 #edmsNo").val(($("#frm2 #edmsNo").val()).toUpperCase());
    });

    $("#frmTab3 #imsHouseBl").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frmTab3 #imsHouseBl").val(($("#frmTab3 #imsHouseBl").val()).toUpperCase());
    });

    $("#frm2 #singoNo").bind("paste", function(e){
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
        if ($("#frm2 #_defaultDB").val() == "ncustoms_sel_040") {
//            $("select[name='edmsGubun'] option[value='EXPORT']").attr("selected", "selected");
        	$('input:checkbox[name="edmsGubunA"]').each(function() {
        	     if(this.value == "EXPORT"){ //값 비교
        	         this.checked = true; //checked 처리
        	     }
        	});
//            $("input[name=='edmsGubunA'][value='EXPORT']").attr('checked', true);
            ChangeGubun();
            ChangeGubunTab3();
            ChangeGubunfrm2();
            $("#changeAllBtn").css("display", 'none');
            $("#changeBtn").css("display", 'none');
        }
    }, 1000);

    selectNotFileList();
});

var fn_tab3Action = function(){
	$('#tab3FileGrid').datagrid('loadData', []);
	selectNapseMasterList();
};


//********** 수입 분류리스트, 파일리스트**********//
var setImportGrid = function(){
	$('#masterGrid').datagrid({
		title			: '분류 리스트',
		width			: '100%',
		height			: 314,
		rownumbers		: true,
		singleSelect	: false,
		autoRowHeight	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		onClickCell		: onClickCell,
		onSelectPage	: onSelectPage,
		onLoadSuccess	: onLoadSuccess,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		rowStyler		: function(index,row){
			if(row.notCount == "O"){
                return 'background-color:#ea7474;';
            }else if(row.fileCount == "X"){
                return 'background-color:#52c478;';
            }
        },
		columns			: [[
		    {field:'ck',title:'',checkbox:true},
			{field:'rownum',title:'rownum',hidden:true},
			{field:'Impo_bl_no',title:'H B/L No.',width:100, formatter:linkBlNoFormatter},
			{field:'Impo_singo_no',title:'신고번호',width:110, align:'center', formatter:linkImportSingoFormatter, key:true},
			{field:'Impo_napse_sangho',title:'업체명',width:110},
			{field:'UserNM',title:'등록자', width:40, align:'center'},
			{field:'filePaperCount',title:'필증', width:30, align:'center'},
			{field:'fileCount',title:'파일', width:30, align:'center'},
			{field:'Impo_receive_result',title:'통관', width:30, align:'center'},
			{field:'Impo_ok_date',title:'수리일', width:70, align:'center', formatter:dateFormatter},
			{field:'deliveryStatus',title:'운송',width:60, align:'center', formatter:linkDeliveryLinkFormatter},
			{field:'rpaStatus',title:'서류전송', width:60, align:'center'},
			{field:'Impo_key',title:'Impo_key',hidden:true},
			{field:'Impo_napse_saup',title:'Impo_napse_saup',hidden:true},
			{field:'invoiceCount',title:'invoiceCount',hidden:true}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListImportAction(rowData);
        }
	});

	$('#masterGrid').datagrid('enableFilter',[{
        field:'filePaperCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'filePaperCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'filePaperCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }},{
        field:'fileCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'fileCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'fileCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }},{
        field:'deliveryStatus',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'20',text:'운송의뢰'},{value:'30',text:'배차요청'},{value:'40',text:'배차완료'},{value:'50',text:'배송중'},{value:'60',text:'배송완료'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'deliveryStatus');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'deliveryStatus',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }},{
        field:'rpaStatus',
        type:'combobox',
        options:{
        	panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'rpaStatus');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'rpaStatus',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }}]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid').datagrid({
		title			: '분류 파일리스트',
		width			: '100%',
		height			: 364,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		remoteSort		: false,
		columns			: [[
            {field:'ck',title:'',checkbox:true},
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter1},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
            {field:'CommonYn',title:'CommonYn',hidden:true},
            {field:'AddUserId',title:'AddUserId',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
        },
        onEndEdit : function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'EdmsFileCategory'
            });
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
};

//********** 수출 분류리스트, 파일리스트**********//
var setExportGrid = function(){
	$('#masterGrid').datagrid({
		title			: '분류 리스트',
		width			: '100%',
		height			: 314,
		rownumbers		: true,
		singleSelect	: true,
		autoRowHeight	: false,
		onClickCell		: onClickCell,
		onSelectPage	: onSelectPage,
		onLoadSuccess	: onLoadSuccess,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		rowStyler		: function(index,row){
			if(row.notCount == "O"){
                return 'background-color:#ea7474;';
            }else if(row.fileCount == "X"){
                return 'background-color:#52c478;';
            }
        },
		columns			: [[
			{field:'rownum',title:'rownum',hidden:true},
			{field:'Expo_iv_no',title:'Invoice No.',width:120, formatter:linkBlNoFormatter},
			{field:'Expo_singo_no',title:'신고번호',width:110, align:'center', formatter:linkExportSingoFormatter, key:true},
			{field:'Expo_suchulja_sangho',title:'업체명',width:110},
			{field:'UserNM',title:'등록자', width:40, align:'center'},
			{field:'filePaperCount',title:'필증', width:30, align:'center'},
			{field:'fileCount',title:'파일', width:30, align:'center'},
			{field:'Expo_res_result',title:'통관', width:30, align:'center'},
			{field:'Expo_ok_date',title:'수리일', width:70, align:'center', formatter:dateFormatter},
			{field:'Expo_key',title:'Expo_key',hidden:true},
			{field:'expoSaup',title:'expoSaup',hidden:true}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListExportAction(rowData);
        }
	});

	$('#masterGrid').datagrid('enableFilter',[{
        field:'filePaperCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'filePaperCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'filePaperCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }},{
        field:'fileCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'fileCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'fileCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }}]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid').datagrid({
		title			: '분류 파일리스트',
		width			: '100%',
		height			: 364,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		remoteSort		: false,
		columns			: [[
            {field:'ck',title:'',checkbox:true},
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter1},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
            {field:'CommonYn',title:'CommonYn',hidden:true},
            {field:'AddUserId',title:'AddUserId',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
        },
        onEndEdit : function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'EdmsFileCategory'
            });
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
};

//********** 수출 갈음분류리스트, 파일리스트**********//
var setBanipGrid = function(){
	$('#masterGrid').datagrid({
		title			: '분류 리스트',
		width			: '100%',
		height			: 314,
		rownumbers		: true,
		singleSelect	: true,
		autoRowHeight	: false,
		onClickCell		: onClickCell,
		onSelectPage	: onSelectPage,
		onLoadSuccess	: onLoadSuccess,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		rowStyler		: function(index,row){
			if(row.notCount == "O"){
                return 'background-color:#ea7474;';
            }else if(row.fileCount == "X"){
                return 'background-color:#52c478;';
            }
        },
		columns			: [[
			{field:'rownum',title:'rownum',hidden:true},
			{field:'Ban1_Invoice',title:'Invoice No.',width:120, formatter:linkBlNoFormatter},
			{field:'BAN1_SINGO_NO',title:'신고번호',width:110, align:'center', formatter:linkBanipSingoFormatter, key:true},
			{field:'Ban1_gong_sangho',title:'업체명',width:110},
			{field:'UserNM',title:'등록자', width:40, align:'center'},
			{field:'filePaperCount',title:'필증', width:30, align:'center'},
			{field:'fileCount',title:'파일', width:30, align:'center'},
			{field:'Ban1_snd_chk',title:'통관', width:30, align:'center'},
			{field:'Ban1_verify_date',title:'수리일', width:70, align:'center', formatter:dateFormatter},
			{field:'Ban1_key',title:'Ban1_key',hidden:true},
			{field:'Ban1_gong_saup',title:'Ban1_gong_saup',hidden:true}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListBanipAction(rowData);
        }
	});

	$('#masterGrid').datagrid('enableFilter',[{
        field:'filePaperCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'filePaperCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'filePaperCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }},{
        field:'fileCount',
        type:'combobox',
        options:{
            panelHeight:'auto',
            data:[{value:'',text:'전체'},{value:'X',text:'X'},{value:'O',text:'O'}],
            onChange:function(value){
                if (value == ''){
                	$('#masterGrid').datagrid('removeFilterRule', 'fileCount');
                } else {
                	$('#masterGrid').datagrid('addFilterRule', {
                        field	: 'fileCount',
                        op		: 'equal',
                        value	: value
                    });
                }
                $('#masterGrid').datagrid('doFilter');
            }
        }}]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid').datagrid({
		title			: '분류 파일리스트',
		width			: '100%',
		height			: 364,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		remoteSort		: false,
		columns			: [[
            {field:'ck',title:'',checkbox:true},
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter1},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
            {field:'CommonYn',title:'CommonYn',hidden:true},
            {field:'AddUserId',title:'AddUserId',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
        },
        onEndEdit : function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'EdmsFileCategory'
            });
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
};

var setPreGrid = function(){
	$('#masterGrid1').datagrid({
		title			: '사전등록 리스트',
		width			: '100%',
		height			: 424,
		rownumbers		: true,
		singleSelect	: true,
		autoRowHeight	: false,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		columns			: [[
			{field:'EdmsNo',title:'B/L No.',width:200, formatter:linkBlNoFormatter}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListPreAction(rowData);
        }
	});

	$('#masterGrid1').datagrid('enableFilter',[]);
	$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid').datagrid({
		title			: '분류 파일리스트',
		width			: '100%',
		height			: 364,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		remoteSort		: false,
		columns			: [[
            {field:'ck',title:'',checkbox:true},
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter1},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
            {field:'CommonYn',title:'CommonYn',hidden:true},
            {field:'AddUserId',title:'AddUserId',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
        },
        onEndEdit : function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'EdmsFileCategory'
            });
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
};

var setReadyGrid = function(){
	$('#masterGrid2').datagrid({
		title			: '수입 리스트',
		width			: '100%',
		height			: 424,
		rownumbers		: true,
		singleSelect	: true,
		autoRowHeight	: false,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		columns			: [[
			{field:'rownum',title:'rownum',hidden:true},
			{field:'BlNo',title:'H B/L No.',width:120, formatter:linkBlNoFormatter},
			{field:'Rpt_No',title:'신고번호',width:120, align:'center', formatter:linkImportSingoFormatter, key:true},
			{field:'Nab_Firm',title:'업체명',width:130},
			{field:'REG_ID',title:'등록자', width:60, align:'center'},
			{field:'Rece_Result',title:'통관', width:40, align:'center'},
			{field:'Lis_Day',title:'수리일', width:70, align:'center', formatter:dateFormatter},
			{field:'SN',title:'Impo_key',hidden:true},
			{field:'Nab_SdNo',title:'Impo_napse_saup',hidden:true}
        ]],
		onSelect	: function(rowIndex, rowData){
			fn_fileListReadyAction(rowData);
        }
	});

	$('#masterGrid2').datagrid('enableFilter',[]);
	$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid').datagrid({
		title			: '분류 파일리스트',
		width			: '100%',
		height			: 364,
		fitColumns		: true,
		singleSelect	: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		remoteSort		: false,
		columns			: [[
            {field:'ck',title:'',checkbox:true},
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter1},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
            {field:'CommonYn',title:'CommonYn',hidden:true},
            {field:'AddUserId',title:'AddUserId',hidden:true}
        ]],
		onSelect : function(rowIndex, rowData){
			$(this).datagrid('beginEdit', rowIndex);
        },
        onEndEdit : function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'EdmsFileCategory'
            });
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
};


//********** 면장등록 파일리스트 조회액션**********//
var fn_tab1Action = function () {
    selectPaperFileList();
};

//********** 서류등록 파일리스트 조회액션**********//
var fn_tab4Action = function () {
    selectPaperFile2List();
};

//********** BL등록 파일리스트 조회액션**********//
var fn_tab5Action = function () {
    selectPaperFile3List();
};

//********** 미분류 팀리스트 draw **********//
var drawTeamList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#notForm #teamCode").html(optList.join("\n"));
};

//********** 미분류 업무선택 액션 **********//
var ChangeGubun = function () {
    if ($("#notForm #edmsGubun option:selected").val() == "IMPORT") {
        $("#notForm #gubunName").html('H B/L');
    } else if ($("#notForm #edmsGubun option:selected").val() == "EXPORT" || $("#notForm #edmsGubun option:selected").val() == "BANIP") {
        $("#notForm #gubunName").html('Inv');
    }
};

//********** 화주등록 업무선택 액션 **********//
var ChangeGubunTab3 = function () {
    if ($("#frmTab3 #edmsGubun option:selected").val() == "IMPORT") {
        $("#frmTab3 #gubunName").html('H B/L');
    } else if ($("#frmTab3 #edmsGubun option:selected").val() == "EXPORT" || $("#frmTab3 #edmsGubun option:selected").val() == "BANIP") {
        $("#frmTab3 #gubunName").html('Inv');
    }
    fn_tab3Action();
};

//********** 화주등록 팀 리스트 draw**********//
var drawTeamListfrmTab3 = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#frmTab3 #teamCode").html(optList.join("\n"));
};

//********** BL등록 팀 리스트 draw**********//
var drawTeamListfrmTab5 = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#insertPaper3Form #teamCode").html(optList.join("\n"));
};

//********** 기타에 랜덤한 값 넣기  **********//
function randNum() {
    var ALPHA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var rN = $('#notForm #yyyymmdd').val().substr(0, 4);

    for (var i = 0; i < 10; i++) {
        var randTnum = Math.floor(Math.random() * ALPHA.length);
        rN += ALPHA[randTnum];
    }
    $("#notForm #edmsNo").val(rN);
}

//********** 메인 리스트 조회액션(조회시 파일리스트 초기화)**********//
var fn_searchActionTotal = function(){
	$('#masterGrid').datagrid('loadData',[]);
	$('#fileGrid').datagrid('loadData',[]);
	$("#pageNum").val("");
	$("#selrow").val("");

    $("#frm3").each(function(){
        this.reset();
    });

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

    if($("input[name='gubunTypeA']:checked").val() == "my"){
        fn_searchAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "team"){
        fn_searchTeamAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "jisa"){
        fn_searchJisaAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "all"){
        fn_searchAllAction();
    }
    $("#addForm #edmsParentGbn").val("");
    $("#addForm #edmsNo").val("");
    $("#addForm #edmsSingoNo").val("");
};

var fn_searchActionTotal1 = function(){
	$('#masterGrid1').datagrid('loadData',[]);
	$('#fileGrid').datagrid('loadData',[]);
	$("#pageNum").val("");
	$("#selrow").val("");

    $("#frm3").each(function(){
        this.reset();
    });

    if ($("#frm5 #teamCode").val() == "012") {
        $("#frm5 #_defaultDB").val("ncustoms_sel_040");
    } else if ($("#frm5 #teamCode").val() == "039") {
        $("#frm5 #_defaultDB").val("ncustoms_bs");
    } else if ($("#frm5 #teamCode").val() == "044") {
        $("#frm5 #_defaultDB").val("ncustoms_us");
    } else if ($("#frm5 #teamCode").val() == "021") {
        $("#frm5 #_defaultDB").val("ncustoms_ic");
    } else if ($("#frm5 #teamCode").val() == "020") {
        $("#frm5 #_defaultDB").val("ncustoms_yj");
    } else if ($("#frm5 #teamCode").val() == "030") {
        $("#frm5 #_defaultDB").val("ncustoms_cw");
    } else if ($("#frm5 #teamCode").val() == "028") {
        $("#frm5 #_defaultDB").val("ncustoms_ca");
    } else if ($("#frm5 #teamCode").val() == "027") {
        $("#frm5 #_defaultDB").val("ncustoms_cj");
    } else if ($("#frm5 #teamCode").val() == "022") {
        $("#frm5 #_defaultDB").val("ncustoms_pj");
    } else if ($("#frm5 #teamCode").val() == "026") {
        $("#frm5 #_defaultDB").val("ncustoms_pt");
    } else if ($("#frm5 #teamCode").val() == "029") {
        $("#frm5 #_defaultDB").val("ncustoms_gm");
    } else if ($("#frm5 #teamCode").val() == "024") {
        $("#frm5 #_defaultDB").val("ncustoms_ay");
    } else if ($("#frm5 #teamCode").val() == "050") {
        $("#frm5 #_defaultDB").val("ncustoms_ys");
    } else if ($("#frm5 #teamCode").val() == "075") {
        $("#frm5 #_defaultDB").val("ncustoms_jj");
    } else if ($("#frm5 #teamCode").val() == "076") {
        $("#frm5 #_defaultDB").val("ncustoms_dj");
    } else if ($("#frm5 #teamCode").val() == "008") {
        $("#frm5 #_defaultDB").val("ncustoms_sel4");
    } else if ($("#frm5 #teamCode").val() == "023" || $("#frm5 #teamCode").val() == "025") {
        $("#frm5 #_defaultDB").val("ncustoms_sn");
    } else {
        $("#frm5 #_defaultDB").val("ncustoms");
    }

    fn_searchPreAction();

    $("#addForm #edmsParentGbn").val("");
    $("#addForm #edmsNo").val("");
    $("#addForm #edmsSingoNo").val("");
};

var fn_searchActionTotal2 = function(){
	$('#masterGrid2').datagrid('loadData',[]);
	$('#fileGrid').datagrid('loadData',[]);
	$("#pageNum").val("");
	$("#selrow").val("");

    $("#frm3").each(function(){
        this.reset();
    });

    $("#frm10 #_defaultDB").val("ncustoms_yj");

    fn_searchReadyAction();

    $("#addForm #edmsParentGbn").val("");
    $("#addForm #edmsNo").val("");
    $("#addForm #edmsSingoNo").val("");
};

//********** 메인 리스트 나의 조회액션**********//
var fn_searchAction = function(){
    selectEdmsMasterMyList();
};

//********** 메인 리스트 팀 조회액션**********//
var fn_searchTeamAction = function(){
    selectEdmsMasterTeamList();
};

//********** 메인 리스트 지사 조회액션**********//
var fn_searchJisaAction = function(){
    selectEdmsMasterJisaList();
};

//********** 메인 리스트 전체 조회액션**********//
var fn_searchAllAction = function(){
    selectEdmsMasterAllList();
};

var fn_searchPreAction = function(){
    selectEdmsMasterPreList();
};

var fn_searchReadyAction = function(){
    selectEdmsMasterReadyList();
};

function onSelectPage(){
	if($("#pageNum").val() != ''){
		var pager = $('#masterGrid').datagrid('getPager');
		pager.pagination('select', $("#pageNum").val());
	}
}

function onLoadSuccess(){
	$('#masterGrid').datagrid('selectRow', $("#selrow").val());
}

//********** 메인 파일 등록후 분류 리스트 조회 (선택된 로우와 페이징)**********//
function refreshGridPage(){
    $("#frm3").each(function(){
        this.reset();
    });

    if($("input[name='gubunTypeA']:checked").val() == "my"){
        fn_searchAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "team"){
        fn_searchTeamAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "jisa"){
        fn_searchJisaAction();
    }else if($("input[name='gubunTypeA']:checked").val() == "all"){
        fn_searchAllAction();
    }
    fn_searchPreAction();
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
    if ($("input[name='gubunTypeA']:checked").val() == "my") {
        $("#frm2 #edmsMasterUserId").val($("#frm2 #sessionId").val());
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
    } else if ($("input[name='gubunTypeA']:checked").val() == "team") {
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
    } else if ($("input[name='gubunTypeA']:checked").val() == "jisa") {
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

//var ChangeTypefrm2 = function (obj) {
//    if (obj.options[obj.selectedIndex].getAttribute("value") == "my") {
//        $("#frm2 #edmsMasterUserId").val($("#frm2 #sessionId").val());
//        $("#frm2 #teamCode").css("display", 'inline');
//        $("#frm2 #teamCode option[value='']").remove();
//        if ($("#frm2 #teamCode").val() == "012") {
//            $("#frm2 #_defaultDB").val("ncustoms_sel_040");
//        } else if ($("#frm2 #teamCode").val() == "039") {
//            $("#frm2 #_defaultDB").val("ncustoms_bs");
//        } else if ($("#frm2 #teamCode").val() == "044") {
//            $("#frm2 #_defaultDB").val("ncustoms_us");
//        } else if ($("#frm2 #teamCode").val() == "021") {
//            $("#frm2 #_defaultDB").val("ncustoms_ic");
//        } else if ($("#frm2 #teamCode").val() == "020") {
//            $("#frm2 #_defaultDB").val("ncustoms_yj");
//        } else if ($("#frm2 #teamCode").val() == "030") {
//            $("#frm2 #_defaultDB").val("ncustoms_cw");
//        } else if ($("#frm2 #teamCode").val() == "028") {
//            $("#frm2 #_defaultDB").val("ncustoms_ca");
//        } else if ($("#frm2 #teamCode").val() == "027") {
//            $("#frm2 #_defaultDB").val("ncustoms_cj");
//        } else if ($("#frm2 #teamCode").val() == "022") {
//            $("#frm2 #_defaultDB").val("ncustoms_pj");
//        } else if ($("#frm2 #teamCode").val() == "026") {
//            $("#frm2 #_defaultDB").val("ncustoms_pt");
//        } else if ($("#frm2 #teamCode").val() == "029") {
//            $("#frm2 #_defaultDB").val("ncustoms_gm");
//        } else if ($("#frm2 #teamCode").val() == "024") {
//            $("#frm2 #_defaultDB").val("ncustoms_ay");
//        } else if ($("#frm2 #teamCode").val() == "050") {
//            $("#frm2 #_defaultDB").val("ncustoms_ys");
//        } else if ($("#frm2 #teamCode").val() == "075") {
//            $("#frm2 #_defaultDB").val("ncustoms_jj");
//        } else if ($("#frm2 #teamCode").val() == "076") {
//            $("#frm2 #_defaultDB").val("ncustoms_dj");
//        } else if ($("#frm2 #teamCode").val() == "008") {
//            $("#frm2 #_defaultDB").val("ncustoms_sel4");
//        } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
//            $("#frm2 #_defaultDB").val("ncustoms_sn");
//        } else {
//            $("#frm2 #_defaultDB").val("ncustoms");
//        }
//        $("#frm2 #jisaCode").css("display", 'none');
//        $("#frm2 #jisaCode").append("<option value='' selected></option>");
//    } else if (obj.options[obj.selectedIndex].getAttribute("value") == "team") {
//        $("#frm2 #edmsMasterUserId").val('');
//        $("#frm2 #teamCode").css("display", 'inline');
//        $("#frm2 #teamCode option[value='']").remove();
//        if ($("#frm2 #teamCode").val() == "012") {
//            $("#frm2 #_defaultDB").val("ncustoms_sel_040");
//        } else if ($("#frm2 #teamCode").val() == "039") {
//            $("#frm2 #_defaultDB").val("ncustoms_bs");
//        } else if ($("#frm2 #teamCode").val() == "044") {
//            $("#frm2 #_defaultDB").val("ncustoms_us");
//        } else if ($("#frm2 #teamCode").val() == "021") {
//            $("#frm2 #_defaultDB").val("ncustoms_ic");
//        } else if ($("#frm2 #teamCode").val() == "020") {
//            $("#frm2 #_defaultDB").val("ncustoms_yj");
//        } else if ($("#frm2 #teamCode").val() == "030") {
//            $("#frm2 #_defaultDB").val("ncustoms_cw");
//        } else if ($("#frm2 #teamCode").val() == "028") {
//            $("#frm2 #_defaultDB").val("ncustoms_ca");
//        } else if ($("#frm2 #teamCode").val() == "027") {
//            $("#frm2 #_defaultDB").val("ncustoms_cj");
//        } else if ($("#frm2 #teamCode").val() == "022") {
//            $("#frm2 #_defaultDB").val("ncustoms_pj");
//        } else if ($("#frm2 #teamCode").val() == "026") {
//            $("#frm2 #_defaultDB").val("ncustoms_pt");
//        } else if ($("#frm2 #teamCode").val() == "029") {
//            $("#frm2 #_defaultDB").val("ncustoms_gm");
//        } else if ($("#frm2 #teamCode").val() == "024") {
//            $("#frm2 #_defaultDB").val("ncustoms_ay");
//        } else if ($("#frm2 #teamCode").val() == "050") {
//            $("#frm2 #_defaultDB").val("ncustoms_ys");
//        } else if ($("#frm2 #teamCode").val() == "075") {
//            $("#frm2 #_defaultDB").val("ncustoms_jj");
//        } else if ($("#frm2 #teamCode").val() == "076") {
//            $("#frm2 #_defaultDB").val("ncustoms_dj");
//        } else if ($("#frm2 #teamCode").val() == "008") {
//            $("#frm2 #_defaultDB").val("ncustoms_sel4");
//        } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
//            $("#frm2 #_defaultDB").val("ncustoms_sn");
//        } else {
//            $("#frm2 #_defaultDB").val("ncustoms");
//        }
//        $("#frm2 #jisaCode").css("display", 'none');
//        $("#frm2 #jisaCode").append("<option value='' selected></option>");
//    } else if (obj.options[obj.selectedIndex].getAttribute("value") == "jisa") {
//        $("#frm2 #edmsMasterUserId").val('');
//        $("#frm2 #teamCode").css("display", 'none');
//        $("#frm2 #teamCode").append("<option value='' selected></option>");
//        $("#frm2 #jisaCode").css("display", 'inline');
//        $("#frm2 #jisaCode option[value='']").remove();
//    } else {
//        $("#frm2 #edmsMasterUserId").val('');
//        $("#frm2 #teamCode").css("display", 'none');
//        $("#frm2 #teamCode").append("<option value='' selected></option>");
//        $("#frm2 #jisaCode").css("display", 'none');
//        $("#frm2 #jisaCode").append("<option value='' selected></option>");
//    }
//};

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

var ChangeType2frm5 = function (obj) {
    if ($("#frm5 #teamCode").val() == "012") {
        $("#frm5 #_defaultDB").val("ncustoms_sel_040");
    } else if ($("#frm5 #teamCode").val() == "039") {
        $("#frm5 #_defaultDB").val("ncustoms_bs");
    } else if ($("#frm5 #teamCode").val() == "044") {
        $("#frm5 #_defaultDB").val("ncustoms_us");
    } else if ($("#frm5 #teamCode").val() == "021") {
        $("#frm5 #_defaultDB").val("ncustoms_ic");
    } else if ($("#frm5 #teamCode").val() == "020") {
        $("#frm5 #_defaultDB").val("ncustoms_yj");
    } else if ($("#frm5 #teamCode").val() == "030") {
        $("#frm5 #_defaultDB").val("ncustoms_cw");
    } else if ($("#frm5 #teamCode").val() == "028") {
        $("#frm5 #_defaultDB").val("ncustoms_ca");
    } else if ($("#frm5 #teamCode").val() == "027") {
        $("#frm5 #_defaultDB").val("ncustoms_cj");
    } else if ($("#frm5 #teamCode").val() == "022") {
        $("#frm5 #_defaultDB").val("ncustoms_pj");
    } else if ($("#frm5 #teamCode").val() == "026") {
        $("#frm5 #_defaultDB").val("ncustoms_pt");
    } else if ($("#frm5 #teamCode").val() == "029") {
        $("#frm5 #_defaultDB").val("ncustoms_gm");
    } else if ($("#frm5 #teamCode").val() == "024") {
        $("#frm5 #_defaultDB").val("ncustoms_ay");
    } else if ($("#frm5 #teamCode").val() == "050") {
        $("#frm5 #_defaultDB").val("ncustoms_ys");
    } else if ($("#frm5 #teamCode").val() == "075") {
        $("#frm5 #_defaultDB").val("ncustoms_jj");
    } else if ($("#frm5 #teamCode").val() == "076") {
        $("#frm5 #_defaultDB").val("ncustoms_dj");
    } else if ($("#frm5 #teamCode").val() == "008") {
        $("#frm5 #_defaultDB").val("ncustoms_sel4");
    } else if ($("#frm5 #teamCode").val() == "023" || $("#frm5 #teamCode").val() == "025") {
        $("#frm5 #_defaultDB").val("ncustoms_sn");
    } else {
        $("#frm5 #_defaultDB").val("ncustoms");
    }
};

//********** 지사 팀선택**********//
var ChangeType3frm2 = function (obj) {
    if ($("#frm2 #jisaCode").val() == "ncustoms_sel_040") {
        $("#frm2 #_defaultDB").val("ncustoms_sel_040");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_bs") {
        $("#frm2 #_defaultDB").val("ncustoms_bs");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_us") {
        $("#frm2 #_defaultDB").val("ncustoms_us");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_ic") {
        $("#frm2 #_defaultDB").val("ncustoms_ic");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_yj") {
        $("#frm2 #_defaultDB").val("ncustoms_yj");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_cw") {
        $("#frm2 #_defaultDB").val("ncustoms_cw");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_ca") {
        $("#frm2 #_defaultDB").val("ncustoms_ca");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_cj") {
        $("#frm2 #_defaultDB").val("ncustoms_cj");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_pj") {
        $("#frm2 #_defaultDB").val("ncustoms_pj");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_pt") {
        $("#frm2 #_defaultDB").val("ncustoms_pt");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_gm") {
        $("#frm2 #_defaultDB").val("ncustoms_gm");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_ay") {
        $("#frm2 #_defaultDB").val("ncustoms_ay");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_ys") {
        $("#frm2 #_defaultDB").val("ncustoms_ys");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_jj") {
        $("#frm2 #_defaultDB").val("ncustoms_jj");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_dj") {
        $("#frm2 #_defaultDB").val("ncustoms_dj");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_sel4") {
        $("#frm2 #_defaultDB").val("ncustoms_sel4");
    } else if ($("#frm2 #jisaCode").val() == "ncustoms_sn") {
        $("#frm2 #_defaultDB").val("ncustoms_sn");
    } else {
        $("#frm2 #_defaultDB").val("ncustoms");
    }
};

//********** 메인 팀 리스트 draw**********//
var drawTeamListfrm2 = function (data) {
    var optList = new Array();
    if($("#frm2 #sessionId").val()=="shyoon" || $("#frm2 #sessionId").val()=="hsjang" || $("#frm2 #sessionId").val()=="hjlee2" || $("#frm2 #sessionId").val()=="ejkim1" || $("#frm2 #sessionId").val()=="jwchoi1"  || $("#frm2 #sessionId").val()=="yhso"){
    	optList[0] = "<option value=\"015\">본사수입1</option>";
    	optList[1] = "<option value=\"016\">본사수입2</option>";
    	optList[2] = "<option value=\"017\">본사수입3</option>";
    	optList[3] = "<option value=\"018\">본사수입4</option>";
    	optList[4] = "<option value=\"019\">본사수입5</option>";
    	optList[5] = "<option value=\"055\">본사수입6</option>";
    	optList[6] = "<option value=\"056\">본사수입7</option>";
    }else{
    	for (var i = 0; i < data.length; i++) {
            optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
        }
    }
    $("#frm2 #teamCode").html(optList.join("\n"));
};

var drawTeamListfrm5 = function (data) {
    var optList = new Array();
    if($("#frm5 #sessionId").val()=="shyoon" || $("#frm5 #sessionId").val()=="hsjang" || $("#frm5 #sessionId").val()=="hjlee2" || $("#frm5 #sessionId").val()=="ejkim1" || $("#frm5 #sessionId").val()=="jwchoi1" || $("#frm5 #sessionId").val()=="yhso"){
    	optList[0] = "<option value=\"015\">본사수입1</option>";
    	optList[1] = "<option value=\"016\">본사수입2</option>";
    	optList[2] = "<option value=\"017\">본사수입3</option>";
    	optList[3] = "<option value=\"018\">본사수입4</option>";
    	optList[4] = "<option value=\"019\">본사수입5</option>";
    	optList[5] = "<option value=\"055\">본사수입6</option>";
    	optList[6] = "<option value=\"056\">본사수입7</option>";
    }else{
    	for (var i = 0; i < data.length; i++) {
            optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
        }
    }
    $("#frm5 #teamCode").html(optList.join("\n"));
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
var fn_fileListImportAction = function(rowdata){
	progress.show();
	$("#addForm #edmsParentGbn").val($("input[name='edmsGubunA']:checked").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val(rowdata.Impo_key);
    $("#notForm #edmsNo").val(rowdata.Impo_bl_no);
    $("#addForm #edmsNo").val(rowdata.Impo_bl_no);
    $("#addForm #edmsSingoNo").val(rowdata.Impo_singo_no);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
	fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
    progress.hide();
};

//********** 메인 분류 선택시 수출액션 (파일 리스트 조회)**********//
var fn_fileListExportAction = function(rowdata){
	progress.show();
	$("#notForm #edmsNo").val(rowdata.Expo_iv_no);
    $("#addForm #edmsParentGbn").val($("input[name='edmsGubunA']:checked").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMKey").val(rowdata.Expo_key);
    $("#addForm #edmsNo").val(rowdata.Expo_iv_no);
    $("#addForm #edmsSingoNo").val(rowdata.Expo_singo_no);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
    progress.hide();
};

//********** 메인 분류 선택시 갈음액션 (파일 리스트 조회)**********//
var fn_fileListBanipAction = function(rowdata){
	progress.show();
	$("#notForm #edmsNo").val(rowdata.Ban1_Invoice);
    $("#addForm #edmsParentGbn").val($("input[name='edmsGubunA']:checked").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMKey").val(rowdata.Ban1_key);
    $("#addForm #edmsNo").val(rowdata.Ban1_Invoice);
    $("#addForm #edmsSingoNo").val(rowdata.BAN1_SINGO_NO);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
    progress.hide();
};

var fn_fileListPreAction = function(rowdata){
	progress.show();
	$("#notForm #edmsNo").val(rowdata.EdmsNo);
    $("#addForm #edmsParentGbn").val($("#frm5 #edmsGubun").val());
    $("#addForm #edmsJisaCode").val($("#frm5 #_defaultDB").val());
    $("#addForm #edmsMKey").val("");
    $("#addForm #edmsNo").val(rowdata.EdmsNo);
    $("#addForm #edmsSingoNo").val("");
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid1").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction1($("#addForm #edmsNo").val(), "", $("#addForm #edmsParentGbn").val());
    progress.hide();
};

var fn_fileListReadyAction = function(rowdata){
	$("#addForm #edmsParentGbn").val("IMPORT");
    $("#addForm #edmsJisaCode").val($("#frm10 #_defaultDB").val());
    $("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val(rowdata.SN);
    $("#addForm #edmsNo").val(rowdata.BlNo);
    $("#addForm #edmsSingoNo").val(rowdata.Rpt_No);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
	fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
    progress.hide();
};

//********** 화주등록 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListTab3ImportAction = function (rowdata) {
    fn_fileTab3Action(rowdata.startNum);
};

var fn_fileAction1 = function(edmsNo, singoNo, edmsGubun){
    $("#frm3").each(function(){
        this.reset();
    });

    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsNo"		: edmsNo,
            "edmsSingoNo"	: singoNo,
            "edmsGubun"		: edmsGubun,
            "edmsJisaCode"	: $("#addForm #edmsJisaCode").val(),
            "_pageRow"		: 2000,
            "_pageNumber"	: 0,
            "size"			: 2000,
            "page"			: 0
        },
        type1 = "POST";

    progress.show();
    sendAjax(url1, params1, type1, function(d){
    	progress.hide();
    	console.log(d);
    	if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

			if(d.content.length == 1){
				if(d.content[0].SDAAKey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', d.content);
				}
			}else{
				$('#fileGrid').datagrid('loadData', d.content);
			}
		}
    });
};

//********** 화주등록 파일리스트 조회액션**********//
var fn_fileTab3Action = function (edmsNum) {
    selectFileList(edmsNum);
};

//********** 분류 업무선택 액션 (파일 추가 문서구분 변경)**********//
var ChangeGubunfrm2 = function () {
    if ($("input[name='edmsGubunA']:checked").val() == "IMPORT") {
        $("#frm2 #gubunName").html('H B/L');
        //$("#frm2 #edmsNum").removeAttr("disabled");
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNo").removeAttr("disabled");
        $("select[name='edmsGubun'] option[value='IMPORT']").attr("selected", "selected");
        $("#notForm #gubunName").html('H B/L');
        drawStatusListImportForm();
        drawDateImportForm();
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
//        $("#masterGrid").jqGrid('GridUnload');
//        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", '');
        $("#deliveryBtn1").css("display", '');
        $("#deliveryBtn2").css("display", '');
        $('#masterGrid').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
        setImportGrid();
    } else if ($("input[name='edmsGubunA']:checked").val() == "EXPORT") {
        $("#frm2 #gubunName").html('Inv');
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNo").removeAttr("disabled");
        $("select[name='edmsGubun'] option[value='EXPORT']").attr("selected", "selected");
        $("#notForm #gubunName").html('Inv');
        drawStatusListExportForm();
        drawDateExportForm();
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
//        $("#masterGrid").jqGrid('GridUnload');
//        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", 'none');
        $("#deliveryBtn1").css("display", 'none');
        $("#deliveryBtn2").css("display", 'none');
        $('#masterGrid').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
        setExportGrid();
    } else if ($("input[name='edmsGubunA']:checked").val() == "BANIP") {
        $("#frm2 #gubunName").html('Inv');
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNo").removeAttr("disabled");
        $("select[name='edmsGubun'] option[value='BANIP']").attr("selected", "selected");
        $("#notForm #gubunName").html('Inv');
        drawStatusListExportForm();
        drawDateExportForm();
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
//        $("#masterGrid").jqGrid('GridUnload');
//        $("#fileGrid").jqGrid('GridUnload');
        $("#deliveryBtn").css("display", 'none');
        $("#deliveryBtn1").css("display", 'none');
        $("#deliveryBtn2").css("display", 'none');
        $('#masterGrid').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
        setBanipGrid();
    }
//    else if ($("#frm2 #edmsGubun option:selected").val() == "SEINETC" || $("#frm2 #edmsGubun option:selected").val() == "HWANGUP") {
//        $("#frm2 #gubunName").html('관리번호');
//        $("#frm2 #gubunSingoName").html('');
//        $("#frm2 #singoNum").val('');
//        $("#frm2 #singoNum").attr("disabled", true);
//        drawStatusListEtcForm();
//        drawCategoryListaddForm();
////        $("#masterGrid").jqGrid('GridUnload');
////        $("#fileGrid").jqGrid('GridUnload');
//        $("#deliveryBtn").css("display", 'none');
//        $("#deliveryBtn1").css("display", 'none');
//        $("#deliveryBtn2").css("display", 'none');
//        setEtcGrid();
//    }
};

//var ChangeGubunfrm2 = function () {
//    if ($("#frm2 #edmsGubun option:selected").val() == "IMPORT") {
//        $("#frm2 #gubunName").html('H B/L');
//        //$("#frm2 #edmsNum").removeAttr("disabled");
//        $("#frm2 #gubunSingoName").html('신고번호');
//        $("#frm2 #singoNum").removeAttr("disabled");
//        $("select[name='edmsGubun'] option[value='IMPORT']").attr("selected", "selected");
//        $("#notForm #gubunName").html('H B/L');
//        drawStatusListImportForm();
//        drawDateImportForm();
//        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
////        $("#masterGrid").jqGrid('GridUnload');
////        $("#fileGrid").jqGrid('GridUnload');
//        $("#deliveryBtn").css("display", '');
//        $("#deliveryBtn1").css("display", '');
//        $("#deliveryBtn2").css("display", '');
//        $('#masterGrid').datagrid('loadData', []);
//    	$('#fileGrid').datagrid('loadData', []);
//        setImportGrid();
//    } else if ($("#frm2 #edmsGubun option:selected").val() == "EXPORT") {
//        $("#frm2 #gubunName").html('Inv');
//        $("#frm2 #gubunSingoName").html('신고번호');
//        $("#frm2 #singoNum").removeAttr("disabled");
//        $("select[name='edmsGubun'] option[value='EXPORT']").attr("selected", "selected");
//        $("#notForm #gubunName").html('Inv');
//        drawStatusListExportForm();
//        drawDateExportForm();
//        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
////        $("#masterGrid").jqGrid('GridUnload');
////        $("#fileGrid").jqGrid('GridUnload');
//        $("#deliveryBtn").css("display", 'none');
//        $("#deliveryBtn1").css("display", 'none');
//        $("#deliveryBtn2").css("display", 'none');
//        $('#masterGrid').datagrid('loadData', []);
//    	$('#fileGrid').datagrid('loadData', []);
//        setExportGrid();
//    } else if ($("#frm2 #edmsGubun option:selected").val() == "BANIP") {
//        $("#frm2 #gubunName").html('Inv');
//        $("#frm2 #gubunSingoName").html('신고번호');
//        $("#frm2 #singoNum").removeAttr("disabled");
//        $("select[name='edmsGubun'] option[value='BANIP']").attr("selected", "selected");
//        $("#notForm #gubunName").html('Inv');
//        drawStatusListExportForm();
//        drawDateExportForm();
//        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
////        $("#masterGrid").jqGrid('GridUnload');
////        $("#fileGrid").jqGrid('GridUnload');
//        $("#deliveryBtn").css("display", 'none');
//        $("#deliveryBtn1").css("display", 'none');
//        $("#deliveryBtn2").css("display", 'none');
//        $('#masterGrid').datagrid('loadData', []);
//    	$('#fileGrid').datagrid('loadData', []);
//        setBanipGrid();
//    }
////    else if ($("#frm2 #edmsGubun option:selected").val() == "SEINETC" || $("#frm2 #edmsGubun option:selected").val() == "HWANGUP") {
////        $("#frm2 #gubunName").html('관리번호');
////        $("#frm2 #gubunSingoName").html('');
////        $("#frm2 #singoNum").val('');
////        $("#frm2 #singoNum").attr("disabled", true);
////        drawStatusListEtcForm();
////        drawCategoryListaddForm();
//////        $("#masterGrid").jqGrid('GridUnload');
//////        $("#fileGrid").jqGrid('GridUnload');
////        $("#deliveryBtn").css("display", 'none');
////        $("#deliveryBtn1").css("display", 'none');
////        $("#deliveryBtn2").css("display", 'none');
////        setEtcGrid();
////    }
//};

var ChangeGubunfrm5 = function(){
    if ($("#frm5 #edmsGubun option:selected").val() == "IMPORT") {
        $("#frm5 #gubunName").html('H B/L');
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
        $('#masterGrid1').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
        setPreGrid();
    } else if ($("#frm5 #edmsGubun option:selected").val() == "EXPORT") {
        $("#frm5 #gubunName").html('Inv');
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
        $('#masterGrid1').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
        setPreGrid();
    } else if ($("#frm5 #edmsGubun option:selected").val() == "BANIP") {
        $("#frm5 #gubunName").html('Inv');
        getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);
        $('#masterGrid1').datagrid('loadData', []);
    	$('#fileGrid').datagrid('loadData', []);
    	setPreGrid();
    }
};

//********** 분류 처리현황 액션 (변환버튼 생성)**********//
var ChangeStatusfrm2 = function () {
	fn_searchActionTotal();
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
    optList[7] = "<option value=\"전제\">전제</option>";
    optList[8] = "<option value=\"접수\">접수</option>";
    optList[9] = "<option value=\"제출\">제출</option>";
    optList[10] = "<option value=\"취하\">취하</option>";
    $("#frm2 #edmsStatus").html(optList.join("\n"));
};

//********** 메인 수리일 리스트 draw (수입)**********//
var drawDateImportForm = function () {
    var optList = new Array();
    optList[0] = "<option value=\"suriDay\">수리일</option>";
    optList[1] = "<option value=\"singoDay\">신고일</option>";
    optList[2] = "<option value=\"banipDay\">반입일</option>";
    optList[3] = "<option value=\"iphangDay\">입항일</option>";
    $("#frm2 #_DateType").html(optList.join("\n"));
};

//********** 메인 처리현황 리스트 draw (수출/갈음)**********//
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

//********** 메인 수리일 리스트 draw (수출/갈음)**********//
var drawDateExportForm = function () {
    var optList = new Array();
    optList[0] = "<option value=\"suriDay\">수리일</option>";
    optList[1] = "<option value=\"singoDay\">신고일</option>";
    $("#frm2 #_DateType").html(optList.join("\n"));
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
//var drawCategoryListaddForm = function () {
//    var optList1 = new Array();
//    optList1[optList1.length] = "<option value=\"Z0001\">미구분</option>";
//    $("#addForm #EdmsFileCategory").html(optList1.join("\n"));
//};

//********** 미분류 -> 분류 버튼 액션**********//
var fn_changeAction = function(){
	var rows = $('#notfileGrid').datagrid('getSelections');

    if($('#notForm #edmsGubun').val() == "IMPORT"){
        if($('#notForm #edmsNo').val().replace(/(\s*)/g,'') == ""){
            alert('H B/L No를 입력해주세요.');
            return;
        }
    }

    if($('#notForm #edmsGubun').val() == "EXPORT" || $('#notForm #edmsGubun').val() == "BANIP"){
        if($('#notForm #edmsNo').val().replace(/(\s*)/g,'') == ""){
            alert('Invoice No를 입력해주세요.');
            return;
        }
    }

    if(rows.length < 1){
		alert("미분류 파일을 선택해 주세요.");
		return;
	}

    var d = [];

    for(var i = 0; i <rows.length; i ++){
    	d.push({
            "SDAAKey" : rows[i].sdaakey
        });
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
    if($("#addForm #edmsParentGbn").val() == ""){
        alert("분류 리스트를 선택하세요.");
        return;
    }

    var rows = $('#fileGrid').datagrid('getSelections');

    if(rows.length < 1){
		alert("파일을 선택해 주세요.");
		return;
	}

    if(!confirm("미분류로 전환 하시겠습니까?")) return;

    var d = [];

    for(var i = 0; i <rows.length; i ++){
    	d.push({
    		"SDAAKey" 	  		: rows[i].SDAAKey,
            "edmsParentGbn"		: "NOTCLASS",
            "edmsParentKey"		: "1",
            "edmsFileCategory"	: "Z0001",
            "edmsSearchKeyword"	: "",
            "edmsFileNote"		: ""
        });
	}

    try{
    	saveReturnFileAction(d, function(r){
        });
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

//********** 미분류 구분저장 버튼 액션**********//
var fn_detailNoneSave = function(){
    var rows = $('#notfileGrid').datagrid('getRows');
    for(i=0;i<rows.length;i++){
        $('#notfileGrid').datagrid('checkRow',i);
        $('#notfileGrid').datagrid('endEdit', i);
    }

    if(!confirm("저장 하시겠습니까?")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
        var dd = {
            "SDAAKey"			: rows[i].sdaakey,
            "edmsFileCategory"	: rows[i].edmsFileCategory,
            "commonYn"			: rows[i].commonYn
        };
        saveFileNoneDetailSaveAction(dd, function (r) {
        });
    }
};

//********** 구분저장 버튼 액션**********//
var fn_detailSave = function(){
	if($("#addForm #edmsParentGbn").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

    var rows = $('#fileGrid').datagrid('getRows');
    for(i=0;i<rows.length;i++){
        $('#fileGrid').datagrid('checkRow',i);
        $('#fileGrid').datagrid('endEdit', i);
    }

    if(!confirm("저장 하시겠습니까?")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
        var dd = {
            "SDAAKey"			: rows[i].SDAAKey,
            "edmsFileCategory"	: rows[i].EdmsFileCategory,
            "commonYn"			: rows[i].CommonYn
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
    }
};

//********** 신고번호별 개별저장 액션**********//
var fn_detailSingoSave = function(){
	if($("#addForm #edmsParentGbn").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if($("#addForm #edmsSingoNo").val()==""){
		alert('신고번호가 없으면 개별 분류가 안됩니다.');
	    return;
	}

	var rows = $('#fileGrid').datagrid('getSelections');

	if(rows.length < 1){
		alert("파일을 선택해 주세요.");
		return;
	}

	if(!confirm("저장 하시겠습니까?")) return;

    for(var i = 0; i <rows.length; i ++){
    	var dd = {
            "SDAAKey" 	  		: rows[i].SDAAKey,
            "edmsFileCategory" 	: rows[i].EdmsFileCategory,
            "commonYn"			: "N"
        };

    	saveFileDetailSaveAction(dd, function (r){
        });
	}
};

//********** 일괄열기 버튼 액션 **********//
var fn_allView = function () {
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
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "C0003") {
            category = "DD";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "Z0003") {
            category = "ET";
        } else if ($("#fileGrid").getRowData(ids[i]).edmsFileCategory == "A1012") {
            category = "IP";
        }

        edmsNewFileName = $('#addForm #singoDay').val() + "_" + $('#addForm #edmsNo').val() + "_" + category + "_" + $("#fileGrid").getRowData(ids[i]).edmsOrgFileNm;

        location.href = "../apis/edms/downloadEdmsFile?SDAAKey=" + $("#fileGrid").getRowData(ids[i]).sdaakey + "&edmsParentGubun=" + $("#fileGrid").getRowData(ids[i]).edmsParentGbn + "&edmsParentKey=" + $("#fileGrid").getRowData(ids[i]).edmsParentKey + "&edmsOrgFileName=" + encodeURIComponent($("#fileGrid").getRowData(ids[i]).edmsOrgFileNm) + "&edmsNewFileName=" + encodeURIComponent(edmsNewFileName);

        i++;
        if (i == ids.length) {
            clearInterval(k);
        }
    }, 500);
};

//********** 화주등록 분류 저장 버튼(오른쪽화살표) 액션**********//
//var fn_changeAction1 = function(){
//    var $grid 	= $('#tab3Grid'),
//        rowid 	= $grid.getGridParam("selrow"),
//        rowData = $grid.jqGrid('getRowData', rowid);
//
//    if (rowid == null) {
//        alert("왼쪽 미분류 라인을 선택한 후 클릭하세요");
//        return;
//    }
//    try {
//        if (confirm("[분류] 하시겠습니까 ?")) {
//        	var d = {};
//            d = rowData;
//
//            var url = "../apis/edms/saveEdmsMasterInfo",
//            	params = {
//                    "edmsKey"	: d["edmsKey"],
//                    "editDay"	: $('#notForm #yyyymmdd').val(),
//                    "teamCode"	: $('#frmTab3 #teamCode').val()
//                },
//                type = "POST";
//
//            sendAjax(url, params, type, function (d) {
//                fn_searchActionTotal();
//                fn_tab3Action();
//                $('#tab3FileGrid').clearGridData();
//            });
//        }
//    } catch (e) {
//        alert("에러가 발생했습니다\n" + e.message);
//    };
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
function linkDownloadNotFormatter(value, row){
    return "<a onclick='javascript:fn_downNotAction("+ row.sdaakey +")'><img src='../images/button/btn_search.gif'></a>";
}

function linkDownloadNotFormatter1(value, row){
    return "<a onclick='javascript:fn_downNotAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 미분류 다운로드 액션**********//
var fn_downNotAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

//********** 미분류 삭제 formatter**********//
function linkDelNotFormatter(value, row){
    return "<a onclick='javascript:fn_delNotAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

function linkDelNotFormatter1(value, row){
    return "<a onclick='javascript:fn_delNotAction("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 미분류 삭제 액션**********//
var fn_delNotAction = function(SDAAKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url 	= "../apis/edms/deleteEdmsFile",
            params 	= {"SDAAKey": SDAAKey},
            type 	= "POST";

        sendAjax(url, params, type, function(d){
        	selectNotFileList();
        });
    }
};

//********** 면장등록 삭제 formatter**********//
function linkDelPaperFormatter(value, row){
    return "<a onclick='javascript:fn_delPaperAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 면장등록 삭제 액션**********//
var fn_delPaperAction = function(SDAAKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url = "../apis/edms/deleteEdmsFile",
            params = {"SDAAKey": SDAAKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
        	fn_tab1Action();
        });
    }
};

//********** 병합등록 삭제 formatter**********//
function linkDelPaperFormatter1(value, row){
    return "<a onclick='javascript:fn_delPaperAction1("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 병합등록 삭제 액션**********//
var fn_delPaperAction1 = function(SDAAKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url = "../apis/edms/deleteEdmsFile",
            params = {"SDAAKey": SDAAKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
        	fn_tab4Action();
        });
    }
};

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
    } else if (rowdata.edmsFileCategory == "C0003") {
        category = "DD";
    } else if (rowdata.edmsFileCategory == "Z0003") {
        category = "ET";
    } else if (rowdata.edmsFileCategory == "A1012") {
        category = "IP";
    }

    if ($('#addForm #edmsGubun').val() == "SEINETC" || $('#addForm #edmsGubun').val() == "HWANGUP") {
        edmsNewFileName = rowdata.edmsOrgFileNm;
    } else {
        edmsNewFileName = $('#addForm #singoDay').val() + "_" + $('#addForm #edmsNo').val() + "_" + category + "_" + rowdata.edmsOrgFileNm;
    }

    // TODO 임시(20170821)
    return "<a onclick='javascript:fn_downAction(" + rowdata.sdaakey + ", \"" + rowdata.edmsParentGbn + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileNm + "\", \"" + edmsNewFileName + "\")'><img src='../images/button/btn_search.gif'></a>";
}





//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(value, row){
	if (row.addUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
		return "<a onclick='javascript:fn_delAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

function linkDelFormatter1(value, row){
	if (row.AddUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
		return "<a onclick='javascript:fn_delAction("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 분류 파일삭제 액션**********//
var fn_delAction = function (SDAAKey) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsFile",
            params = {"SDAAKey": SDAAKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
            fn_fileAction1($("#addForm #edmsNo").val(), $("#addForm #edmsSingoNo").val(), $("#addForm #edmsParentGbn").val());
            refreshGridPage();
        });
    }
};

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

//********** 갈음신고번호 formatter**********//
function linkBanipSingoFormatter(cellValue, options, rowObject) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var Singo = cellValue.substr(0, 5) + "-" + cellValue.substr(5, 2) + "-" + cellValue.substr(7, 6);
        return Singo;
    }
}



//********** 분류 다운로드 액션**********//
var fn_downAction = function (SDAAKey, edmsParentGubun, edmsParentKey, edmsOrgFileName, edmsNewFileName) {
    edmsOrgFileName = encodeURIComponent(edmsOrgFileName);
    edmsNewFileName = encodeURIComponent(edmsNewFileName);
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey=" + SDAAKey + "&edmsParentGbn=" + edmsParentGubun + "&edmsParentKey=" + edmsParentKey + "&edmsOrgFileNm=" + edmsOrgFileName + "&edmsNewFileNm=" + edmsNewFileName;
};

//********** 분류 파일 추가 폼 리셋**********//
var formReset = function () {
    $("#frm3").each(function () {
        this.reset();
    });

    $("#notForm").each(function () {
        this.reset();
    });
}

//********** 운송의뢰 액션**********//
var fn_deliveryInsert = function(){
	var rows = $('#masterGrid').datagrid('getSelections');

	if(rows.length==1){
		if(rows[0].Impo_singo_no == ""){
	          alert("신고번호가 없어 운송의뢰하실 수 없습니다.");
	          return;
	    }

	  	if(rows[0].deliveryStatus){
	          alert("이미 의뢰되었습니다.");
	          return;
	    }
		openWindowWithPost("./deliveryInsert.sein", "width=390, height=405, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
			"impoSingoNo"	: rows[0].Impo_singo_no.replace(/-/gi, ""),
			"_defaultDB" 	: $('#frm2 #_defaultDB').val()
		});
	}else if(rows.length < 1){
		alert("분류리스트를 선택한 후 클릭하세요.");
	}else{
		alert("라인 하나만 선택하세요.");
	}
};

//********** 운송의뢰수정 액션**********//
//var fn_deliveryModify = function(){
//	var $grid 	= $('#masterGrid'),
//	    rowid 	= $grid.getGridParam("selrow"),
//	    rowData = $grid.jqGrid('getRowData', rowid);
//	var checkCount = 0;
//
//	if (rowid == null) {
//	    alert("분류리스트를 선택한 후 클릭하세요");
//	    return;
//	}
//	try {
//		if(rowData.deliveryStatus == ""){
//	          alert("운송의뢰가 되지 않았습니다.");
//	          return;
//	    }
//
//	  	if(rowData.deliveryStatus.substring(45).replace("</a></u>", "") != "운송의뢰"){
//	          alert("운송의뢰시만 수정가능합니다.");
//	          return;
//	    }
//
//		openWindowWithPost("./deliveryModify.sein", "width=390, height=405, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
//			"singoNo" : rowData.Impo_singo_no.replace(/-/gi, '')
//		});
//	}catch(e){
//        alert("에러가 발생했습니다\n" + e.message);
//    }
//};

//********** 운송의뢰 액션**********//
var deliveryAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	var checkCount = 0;
	var dd = [];
	var okdate = "";

	if (row){
		var url 	= "../apis/edms/getImportMasterInfoByKcba",
			params 	= {
				"size"			: "100000",
	            "page"			: "0",
	            "_pageRow"		: "100000",
	            "_pageNumber"	: "0",
	            "impoSingoNo"	: row.Impo_singo_no.replace(/-/gi, ""),
				"_defaultDB" 	: $('#frm2 #_defaultDB').val()
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
								"sDAB100Key" 				: "",
								"customerDB" 				: $("#frm2 #_defaultDB").val(),
								"customerCode" 				: returnValue.content[0].Impo_napse_code,
								"customerNm" 				: returnValue.content[0].Impo_napse_sangho,
								"customerTaxNo" 			: returnValue.content[0].Impo_napse_saup,
								"mblNo" 					: returnValue.content[0].Impo_mbl_no,
								"hblNo" 					: returnValue.content[0].Impo_bl_no,
								"cargoNo" 					: "",
								"singoNo" 					: returnValue.content[0].Impo_singo_no,
								"singoDtm" 					: returnValue.content[0].Impo_singo_date,
								"suriDtm" 					: okdate,
								"cargoStatus" 				: "D",
								"pojangSu" 					: returnValue.content[0].Impo_pojang_su,
								"pojangDanwi" 				: returnValue.content[0].Impo_pojang_danwi,
								"totalJung" 				: returnValue.content[0].Impo_total_jung,
								"jungDanwi" 				: returnValue.content[0].Impo_jung_danwi,
								"impoSegwan" 				: returnValue.content[0].Impo_segwan,
								"impoJangchBuho" 			: returnValue.content[0].Impo_jangch_buho,
								"impoJangchNm" 				: returnValue.content[0].Impo_jangch_name,
								"impoJangchJangso" 			: returnValue.content[0].Impo_jangch_jangso,
								"deliveryStatus" 			: "20",
								"impoBanipDtm" 				: returnValue.content[0].Impo_banip_date,
								"banipPlace" 				: $('#deliveryForm #banipPlace').val(),
								"cargoSize" 				: $('#deliveryForm #cargoSize').val(),
								"deliveryPojangSu" 			: $('#deliveryForm #deliveryPojangSu').val(),
								"deliveryPojangDanwi"		: returnValue.content[0].Impo_pojang_danwi,
								"deliveryJung" 				: $('#deliveryForm #deliveryJung').val(),
								"deliveryJungDanwi" 		: returnValue.content[0].Impo_jung_danwi,
								"requestCoNm" 				: returnValue.content[0].Impo_napse_sangho,
								"requestMan" 				: $("#frm3 #addUserName").val(),
								"requestPhone" 				: "",
								"requestDtm" 				: $('#frm3 #yymmddhhmmss').val(),
								"requestNote" 				: "",
								"requestInvisibleNote" 		: $('#deliveryForm #requestInvisibleNote').val(),
								"deliveryDtm" 				: "",
								"assignId" 					: "",
								"assignMan" 				: $('#deliveryForm #assignMan').val(),
								"assignPhone" 				: $('#deliveryForm #assignPhone').val(),
								"allocateRequestDtm" 		: "",
								"deliveryCoMngNo" 			: "",
								"deliveryCoNm" 				: "",
								"deliveryCoPhone" 			: "",
								"deliveryCoEmail" 			: "",
								"deliveryCarryingInKey" 	: $('#deliveryForm #deliveryCarryingInKey').val(),
								"deliveryCarryingInNm" 		: $('#deliveryForm #deliveryCarryingInNm').val(),
								"deliveryCarryingInPhone" 	: $('#deliveryForm #deliveryCarryingInPhone').val(),
								"deliveryCarryingInTaxNo" 	: "",
								"deliveryCarryingInFax" 	: "",
								"deliveryCarryingInEmail" 	: $('#deliveryForm #deliveryCarryingInEmail').val(),
								"deliveryCarryingInMan" 	: $('#deliveryForm #deliveryCarryingInMan').val(),
								"deliveryCarryingInMobile"	: $('#deliveryForm #deliveryCarryingInMobile').val(),
								"deliveryCarryingInAddr" 	: $('#deliveryForm #deliveryCarryingInAddr').val(),
								"allocateDtm" 				: "",
								"deliveryCarMngNo" 			: "",
								"deliveryCarNm" 			: "",
								"deliveryCarPhone" 			: "",
								"deliveryCarNo" 			: "",
								"deliveryStDtm" 			: "",
								"deliveryEdDtm" 			: "",
								"damage" 					: "N",
								"damageDetail" 				: "",
								"useYn" 					: "Y",
								"landingArea" 				: returnValue.content[0].Impo_hanggu_name,
								"arrivalTime" 				: ""
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

		var url 	= "../apis/edms/saveImportDeliveryRequestList",
			params 	= {"importDeliveryRequestList":dd, "impoKey":row.Impo_key, "_defaultDB":row.jisaCode},
			type 	= "POST";

		sendAjax(url, params, type, function(ee){
			refreshGridPage();
		});
	}else{
		alert("분류리스트를 선택한 후 클릭하세요.");
	}
};

function fn_deliveryView(){
	document.location.href="./deliveryList.sein";
}

//********** 운송 Status 링크**********//
function linkDeliveryStatus() {
	var row = $('#masterGrid').datagrid('getSelected');
    var deliveryRequestKey = row.deliveryRequestKey;

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
	var rows = $('#tab1FileGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edms/deleteEdmsFile",
				params 	= {
					"SDAAKey" 	: rows[i].SDAAKey
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("삭제 되었습니다.");
		fn_tab1Action();
	}
};

var fn_tab4DelAction = function(){
	var rows = $('#tab4FileGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edms/deleteEdmsFile",
				params 	= {
					"SDAAKey" 	: rows[i].SDAAKey
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("삭제 되었습니다.");
		fn_tab4Action();
	}
};

var fn_tab5DelAction = function(){
	var rows = $('#tab5FileGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edms/deleteEdmsFile",
				params 	= {
					"SDAAKey" 	: rows[i].SDAAKey
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("삭제 되었습니다.");
		fn_tab5Action();
	}
};

var fn_NotFileAction = function(){
    selectNotFileList();
};

var fn_NotFileDelAction = function(){
	var rows = $('#notfileGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edms/deleteEdmsFile",
				params 	= {
					"SDAAKey" 	: rows[i].sdaakey
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("삭제 되었습니다.");
		selectNotFileList();
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
	        if (width >= 100) {
	            clearInterval(id);
	        } else {
	        	document.getElementById("myBar").style.width = width + '%';
	            document.getElementById("label").innerHTML = width * 1 + '%';
	        }
	    }
	}, 100);
}

function move1(){
	setTimeout(function(){
		$("#myBar1").css("display", 'inline');
	    var width = 0;
	    var id = setInterval(frame1, 10);
	    function frame1() {
	    	var down = parseInt($("#eee").val());
	    	var up = parseInt($("#fff").val());
	    	width = Math.round(up / down * 100);
	        if (width >= 100) {
	            clearInterval(id);
	        } else {
	        	document.getElementById("myBar1").style.width = width + '%';
	            document.getElementById("label1").innerHTML = width * 1 + '%';
	        }
	    }
	}, 100);
}

function move2(){
	setTimeout(function(){
		$("#myBar2").css("display", 'inline');
	    var width = 0;
	    var id = setInterval(frame2, 10);
	    function frame2() {
	    	var down = parseInt($("#ggg").val());
	    	var up = parseInt($("#hhh").val());
	    	width = Math.round(up / down * 100);
	        if (width >= 100) {
	            clearInterval(id);
	        } else {
	        	document.getElementById("myBar2").style.width = width + '%';
	            document.getElementById("label2").innerHTML = width * 1 + '%';
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

//********** 자재서류 일괄다운 액션**********//
var fn_allDown1 = function(){
	openWindowWithPost("./edmsDownList1.sein", "width=400, height=630, scrollbars=no, menubar=no, resizable=1", "edmsDownList", {
	});
};

//********** 메일전송 액션**********//
var fn_mailAction = function(){
	openWindowWithPost("./edmsSendMail.sein", "width=700, height=520, scrollbars=no, menubar=no, resizable=1", "edmsSendMail", {
	});
};

function linkDocuFormatter(value, row){
	if(row.edmsFileCategory == "Z0001"){
		return  "미구분";
    }else if(row.edmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.edmsFileCategory == "A0002"){
    	return  "Invoice";
    }else if(row.edmsFileCategory == "A0003"){
    	return  "Packing";
    }else if(row.edmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.edmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.edmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.edmsFileCategory == "C0001"){
    	return  "운임Inv";
    }else if(row.edmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.edmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.edmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.edmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.edmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.edmsFileCategory == "Z0003"){
    	return  "기타";
    }else if(row.edmsFileCategory == "A1012"){
    	return  "IV&PL";
    }else if(row.edmsFileCategory == "Y0001"){
    	return  "내부증빙";
    }
}

function linkDocuFormatter1(value, row){
	if(row.EdmsFileCategory == "Z0001"){
		return  "미구분";
    }else if(row.EdmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.EdmsFileCategory == "A0002"){
    	return  "Invoice";
    }else if(row.EdmsFileCategory == "A0003"){
    	return  "Packing";
    }else if(row.EdmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.EdmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.EdmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.EdmsFileCategory == "C0001"){
    	return  "운임Inv";
    }else if(row.EdmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.EdmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.EdmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.EdmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.EdmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.EdmsFileCategory == "Z0003"){
    	return  "기타";
    }else if(row.EdmsFileCategory == "A1012"){
    	return  "IV&PL";
    }else if(row.EdmsFileCategory == "Y0001"){
    	return  "내부증빙";
    }
}

var DocuType = [
	{id: 'Z0001', name: '미구분'},
	{id: 'A0001', name: 'B/L'},
	{id: 'A0002', name: 'Invoice'},
	{id: 'A0003', name: 'Packing'},
	{id: 'A0004', name: 'C/O'},
	{id: 'B0001', name: '신고필증'},
	{id: 'B0002', name: '요건서류'},
	{id: 'C0001', name: '운임Inv'},
	{id: 'Z0002', name: 'Email'},
	{id: 'A0005', name: '병합'},
	{id: 'D0001', name: '정산서'},
	{id: 'C0002', name: '인수증'},
	{id: 'C0003', name: '운송서류'},
	{id: 'Z0003', name: '기타'},
	{id: 'A1012', name: 'IV&PL'},
	{id: 'Y0001', name: '내부증빙'}
];

var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

//********** 현장의뢰 액션**********//
var fn_FieldInsert = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if($("input[name='edmsGubunA']:checked").val()=="IMPORT"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Impo_key,
				"singoNo"		: row.Impo_singo_no,
				"blInvNo"		: row.Impo_bl_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "IMPORT",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}else if($("input[name='edmsGubunA']:checked").val()=="EXPORT"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Expo_key,
				"singoNo"		: row.Expo_singo_no,
				"blInvNo"		: row.Expo_iv_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXPORT",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}else if($("input[name='edmsGubunA']:checked").val()=="BANIP"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Ban1_key,
				"singoNo"		: row.BAN1_SINGO_NO,
				"blInvNo"		: row.Ban1_Invoice,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXPORT",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}
	}else{
		alert("분류리스트를 선택한 후 클릭하세요.");
	}
};

//********** 현장정정의뢰 액션**********//
var fn_FieldInsert1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if($("input[name='edmsGubunA']:checked").val()=="IMPORT"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.Impo_singo_no,
				"blInvNo"		: row.Impo_bl_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "IMJUNG",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}else if($("input[name='edmsGubunA']:checked").val()=="EXPORT"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.Expo_singo_no,
				"blInvNo"		: row.Expo_iv_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXJUNG",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}else if($("input[name='edmsGubunA']:checked").val()=="BANIP"){
			openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.BAN1_SINGO_NO,
				"blInvNo"		: row.Ban1_Invoice,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXJUNG",
				"USERID"		: $('#frm2 #sessionId').val(),
				"ready"			: "N"
			});
		}
	}else{
		alert("분류리스트를 선택한 후 클릭하세요.");
	}
};

//********** 이케아 현장의뢰 액션**********//
var fn_FieldInsert2 = function(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
			"key"			: row.SN,
			"singoNo"		: row.Rpt_No,
			"blInvNo"		: row.BlNo,
			"_defaultDB" 	: $('#frm10 #_defaultDB').val(),
			"gubun"			: "IMPORT",
			"USERID"		: $('#frm10 #sessionId').val(),
			"ready"			: "Y"
		});
	}else{
		alert("수입리스트를 선택한 후 클릭하세요.");
	}
};

//********** 이케아 현장정정의뢰 액션**********//
var fn_FieldInsert3 = function(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		openWindowWithPost("http://biz.customspass.com/fieldInsert.msg", "width=390, height=250, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
			"key"			: "",
			"singoNo"		: row.Rpt_No,
			"blInvNo"		: row.BlNo,
			"_defaultDB" 	: $('#frm10 #_defaultDB').val(),
			"gubun"			: "IMJUNG",
			"USERID"		: $('#frm10 #sessionId').val(),
			"ready"			: "Y"
		});
	}else{
		alert("수입리스트를 선택한 후 클릭하세요.");
	}
};

var fn_customerSet = function(){
	var jisaCode = "";
	if ($("#notForm #teamCode").val() == "012") {
		jisaCode = "ncustoms_sel_040";
    } else if ($("#notForm #teamCode").val() == "039") {
    	jisaCode = "ncustoms_bs";
    } else if ($("#notForm #teamCode").val() == "044") {
    	jisaCode = "ncustoms_us";
    } else if ($("#notForm #teamCode").val() == "021") {
    	jisaCode = "ncustoms_ic";
    } else if ($("#notForm #teamCode").val() == "020") {
    	jisaCode = "ncustoms_yj";
    } else if ($("#notForm #teamCode").val() == "030") {
    	jisaCode = "ncustoms_cw";
    } else if ($("#notForm #teamCode").val() == "028") {
    	jisaCode = "ncustoms_ca";
    } else if ($("#notForm #teamCode").val() == "027") {
    	jisaCode = "ncustoms_cj";
    } else if ($("#notForm #teamCode").val() == "022") {
    	jisaCode = "ncustoms_pj";
    } else if ($("#notForm #teamCode").val() == "026") {
    	jisaCode = "ncustoms_pt";
    } else if ($("#notForm #teamCode").val() == "029") {
    	jisaCode = "ncustoms_gm";
    } else if ($("#notForm #teamCode").val() == "024") {
    	jisaCode = "ncustoms_ay";
    } else if ($("#notForm #teamCode").val() == "050") {
    	jisaCode = "ncustoms_ys";
    } else if ($("#notForm #teamCode").val() == "075") {
    	jisaCode = "ncustoms_jj";
    } else if ($("#notForm #teamCode").val() == "076") {
    	jisaCode = "ncustoms_dj";
    } else if ($("#notForm #teamCode").val() == "008") {
    	jisaCode = "ncustoms_sel4";
    } else if ($("#notForm #teamCode").val() == "023" || $("#notForm #teamCode").val() == "025") {
    	jisaCode = "ncustoms_sn";
    } else {
    	jisaCode = "ncustoms";
    }
    openWindowWithPost("./customerSearch1.sein", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {
    	"_defaultDB" :  jisaCode
    });
};

//********** RPA의뢰 액션**********//
var fn_rpaAction = function(){
	var rows = $('#notfileGrid').datagrid('getSelections');

    if($('#notForm #edmsGubun').val() == "IMPORT"){
        if($('#notForm #comNum').val().replace(/(\s*)/g,'') == ""){
            alert('업체를 검색해 선택해주세요.');
            return;
        }

        if($('#notForm #edmsNum').val().replace(/(\s*)/g,'') == ""){
            alert('H B/L No를 입력해주세요.');
            return;
        }
    }

    if($('#notForm #edmsGubun').val() == "EXPORT" || $('#notForm #edmsGubun').val() == "BANIP"){
    	alert('수입만 RPA등록이 가능합니다.');
        return;
    }

    if(rows.length < 1){
		alert("미분류 파일을 선택해 주세요.");
		return;
	}

    var d = [];

    for(var i = 0; i <rows.length; i ++){
    	d.push({
            "SDAAKey" 	  	: rows[i].SDAAKey,
            "EdmsParentGbn" : rows[i].EdmsParentGbn,
            "EdmsOrgFileNm" : rows[i].EdmsOrgFileNm
        });
	}

    if(!confirm("RPA의뢰 하시겠습니까?")) return;

    try{
    	saveRpaAction(d, function(r){
        });
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

//********** RPA의뢰 액션 **********//
function saveRpaAction(code){
	var jisaCode = "";
	if ($("#notForm #teamCode").val() == "012") {
		jisaCode = "ncustoms_sel_040";
    } else if ($("#notForm #teamCode").val() == "039") {
    	jisaCode = "ncustoms_bs";
    } else if ($("#notForm #teamCode").val() == "044") {
    	jisaCode = "ncustoms_us";
    } else if ($("#notForm #teamCode").val() == "021") {
    	jisaCode = "ncustoms_ic";
    } else if ($("#notForm #teamCode").val() == "020") {
    	jisaCode = "ncustoms_yj";
    } else if ($("#notForm #teamCode").val() == "030") {
    	jisaCode = "ncustoms_cw";
    } else if ($("#notForm #teamCode").val() == "028") {
    	jisaCode = "ncustoms_ca";
    } else if ($("#notForm #teamCode").val() == "027") {
    	jisaCode = "ncustoms_cj";
    } else if ($("#notForm #teamCode").val() == "022") {
    	jisaCode = "ncustoms_pj";
    } else if ($("#notForm #teamCode").val() == "026") {
    	jisaCode = "ncustoms_pt";
    } else if ($("#notForm #teamCode").val() == "029") {
    	jisaCode = "ncustoms_gm";
    } else if ($("#notForm #teamCode").val() == "024") {
    	jisaCode = "ncustoms_ay";
    } else if ($("#notForm #teamCode").val() == "050") {
    	jisaCode = "ncustoms_ys";
    } else if ($("#notForm #teamCode").val() == "075") {
    	jisaCode = "ncustoms_jj";
    } else if ($("#notForm #teamCode").val() == "076") {
    	jisaCode = "ncustoms_dj";
    } else if ($("#notForm #teamCode").val() == "008") {
    	jisaCode = "ncustoms_sel4";
    } else if ($("#notForm #teamCode").val() == "023" || $("#notForm #teamCode").val() == "025") {
    	jisaCode = "ncustoms_sn";
    } else {
    	jisaCode = "ncustoms";
    }

	var url 	= "../apis/edms/rpaMailer",
	    params 	= {
	        "edmsAttachFileVOList"	: code,
	        "comNum"				: $('#notForm #comNum').val(),
	        "edmsNo"				: $('#notForm #edmsNo').val()
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
		},
		error 		: function(e){
		}
	});

	var url 	= "../apis/edms/rpaMailer1",
	    params 	= {
	        "edmsAttachFileVOList"	: code,
	        "comNum"				: $('#notForm #comNum').val(),
	        "edmsNo"				: $('#notForm #edmsNo').val()
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
		},
		error 		: function(e){
		}
	});

	var url 	= "../apis/edms/saveRpaFile",
	    params 	= {
	        "edmsAttachFileVOList"	: code,
	        "edmsParentGbn"			: $('#notForm #edmsGubun').val(),
	        "edmsJisaCode"			: jisaCode,
	        "comName"				: $('#notForm #comName').val(),
	        "comCode"				: $('#notForm #comCode').val(),
	        "comNum"				: $('#notForm #comNum').val(),
	        "edmsNo"				: $('#notForm #edmsNo').val(),
	        "commonYn"				: "Y",
	        "edmsGubun"				: ""
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
			progress.hide();
			alert("의뢰되었습니다.");
			$('#notForm #comName').val("");
			$('#notForm #comCode').val("");
			$('#notForm #comNum').val("");
			$('#notForm #edmsNo').val("");
			selectNotFileList();
		},
		error 		: function(e){
			console.error("에러내용", e);
			alert(e.responseText);
			progress.hide();
			return -1;
		}
	});
}

//********** 서류제출의뢰 액션**********//
var fn_docuInsert = function(){
	var jisaCode = "";
	if ($("#frm2 #teamCode").val() == "012") {
		jisaCode = "ncustoms_sel_040";
    } else if ($("#frm2 #teamCode").val() == "039") {
    	jisaCode = "ncustoms_bs";
    } else if ($("#frm2 #teamCode").val() == "044") {
    	jisaCode = "ncustoms_us";
    } else if ($("#frm2 #teamCode").val() == "021") {
    	jisaCode = "ncustoms_ic";
    } else if ($("#frm2 #teamCode").val() == "020") {
    	jisaCode = "ncustoms_yj";
    } else if ($("#frm2 #teamCode").val() == "030") {
    	jisaCode = "ncustoms_cw";
    } else if ($("#frm2 #teamCode").val() == "028") {
    	jisaCode = "ncustoms_ca";
    } else if ($("#frm2 #teamCode").val() == "027") {
    	jisaCode = "ncustoms_cj";
    } else if ($("#frm2 #teamCode").val() == "022") {
    	jisaCode = "ncustoms_pj";
    } else if ($("#frm2 #teamCode").val() == "026") {
    	jisaCode = "ncustoms_pt";
    } else if ($("#frm2 #teamCode").val() == "029") {
    	jisaCode = "ncustoms_gm";
    } else if ($("#frm2 #teamCode").val() == "024") {
    	jisaCode = "ncustoms_ay";
    } else if ($("#frm2 #teamCode").val() == "050") {
    	jisaCode = "ncustoms_ys";
    } else if ($("#frm2 #teamCode").val() == "075") {
    	jisaCode = "ncustoms_jj";
    } else if ($("#frm2 #teamCode").val() == "076") {
    	jisaCode = "ncustoms_dj";
    } else if ($("#frm2 #teamCode").val() == "008") {
    	jisaCode = "ncustoms_sel4";
    } else if ($("#frm2 #teamCode").val() == "023" || $("#frm2 #teamCode").val() == "025") {
    	jisaCode = "ncustoms_sn";
    } else {
    	jisaCode = "ncustoms";
    }

	var rows = $('#masterGrid').datagrid('getSelections');

	if($("input[name='edmsGubunA']:checked").val() != "IMPORT"){
        alert('수입만 서류제출이 가능합니다.');
        return;
    }

    if($('#frm2 #edmsJungJung').val() == ""){
        alert('업무구분을 선택후 조회해 주세요.');
        return;
    }

    if(rows.length < 1){
		alert("리스트를 선택해 주세요.");
		return;
	}

    for(var i = 0; i <rows.length; i ++){
    	if(rows[i].fileCount=="X"){
			alert("첨부파일이 존재하지 않습니다.");
			return;
		}

    	if($('#frm2 #edmsJungJung').val() == "수입사후"){
	    	if(rows[i].invoiceCount=="X"){
				alert("Invoice 또는 IV&PL 또는 병합파일이 반드시 존재해야 하며\n확장자가 pdf인 파일이어야 합니다.");
				return;
			}
    	}
	}

    for(var i = 0; i <rows.length; i ++){
    	var params = {
    		"edmsJisaCode"	: jisaCode,
            "edmsNo"		: rows[i].Impo_bl_no,
            "edmsSingoNo"	: rows[i].Impo_singo_no,
            "comName"		: rows[i].Impo_napse_sangho,
            "comNum"		: rows[i].Impo_napse_saup,
            "edmsGubun"		: $("#frm2 #edmsJungJung").val()
        };

    	var url 	= "../apis/edms/saveRpaDocFile",
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
				progress.hide();
			},
			error 		: function(e){
				console.error("에러내용", e);
				alert(e.responseText);
				progress.hide();
				return -1;
			}
		});
	}
//    $("#frm2 #edmsJungJung").val("");

    alert("의뢰되었습니다.");
    refreshGridPage();
};

function fn_rpaListAction(){
	document.location.href="./rpaList.sein";
}

var fn_searchExcel = function(){
	if($("input[name='gubunTypeA']:checked").val() == "my"){
		if($("input[name='edmsGubunA']:checked").val() == "IMPORT"){
			exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
			    "size"				: $('#frm2 #size').val(),
			    "page"				: $('#frm2 #page').val(),
			    "_pageRow"			: "100000",
			    "_pageNumber"		: "0",
			    "_defaultDB"		: $('#frm2 #_defaultDB').val(),
			    "edmsMasterUserId"	: $('#frm2 #edmsMasterUserId').val(),
			    "teamCode"			: $('#frm2 #teamCode').val(),
			    "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
			    "edmsStatus"		: $('#frm2 #edmsStatus').val(),
			    "useYn"				: $('#frm2 #useYn').val(),
			    "_DateType"			: $('#frm2 #_DateType').val(),
			    "strFromDate"		: $('#frm2 #strFromDate').val(),
			    "strToDate"			: $('#frm2 #strToDate').val(),
			    "edmsComName"		: $('#frm2 #edmsComName').val(),
			    "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
			    "edmsNo"			: $('#frm2 #edmsNo').val(),
			    "singoNo"			: $('#frm2 #singoNo').val(),
			    "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
			}, $('#excelImportGrid'), "FileList");
		}else if($("input[name='edmsGubunA']:checked").val() == "EXPORT"){
			exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
			    "size"				: $('#frm2 #size').val(),
			    "page"				: $('#frm2 #page').val(),
			    "_pageRow"			: "100000",
			    "_pageNumber"		: "0",
			    "_defaultDB"		: $('#frm2 #_defaultDB').val(),
			    "edmsMasterUserId"	: $('#frm2 #edmsMasterUserId').val(),
			    "teamCode"			: $('#frm2 #teamCode').val(),
			    "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
			    "edmsStatus"		: $('#frm2 #edmsStatus').val(),
			    "useYn"				: $('#frm2 #useYn').val(),
			    "_DateType"			: $('#frm2 #_DateType').val(),
			    "strFromDate"		: $('#frm2 #strFromDate').val(),
			    "strToDate"			: $('#frm2 #strToDate').val(),
			    "edmsComName"		: $('#frm2 #edmsComName').val(),
			    "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
			    "edmsNo"			: $('#frm2 #edmsNo').val(),
			    "singoNo"			: $('#frm2 #singoNo').val(),
			    "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
			}, $('#excelExportGrid'), "FileList");
		}else{
			exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
			    "size"				: $('#frm2 #size').val(),
			    "page"				: $('#frm2 #page').val(),
			    "_pageRow"			: "100000",
			    "_pageNumber"		: "0",
			    "_defaultDB"		: $('#frm2 #_defaultDB').val(),
			    "edmsMasterUserId"	: $('#frm2 #edmsMasterUserId').val(),
			    "teamCode"			: $('#frm2 #teamCode').val(),
			    "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
			    "edmsStatus"		: $('#frm2 #edmsStatus').val(),
			    "useYn"				: $('#frm2 #useYn').val(),
			    "_DateType"			: $('#frm2 #_DateType').val(),
			    "strFromDate"		: $('#frm2 #strFromDate').val(),
			    "strToDate"			: $('#frm2 #strToDate').val(),
			    "edmsComName"		: $('#frm2 #edmsComName').val(),
			    "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
			    "edmsNo"			: $('#frm2 #edmsNo').val(),
			    "singoNo"			: $('#frm2 #singoNo').val(),
			    "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
			}, $('#excelBanipGrid'), "FileList");
		}
    }else if($("input[name='gubunTypeA']:checked").val() == "team"){
    	if($("input[name='edmsGubunA']:checked").val() == "IMPORT"){
    		exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
	            "size"				: $('#frm2 #size').val(),
	            "page"				: $('#frm2 #page').val(),
	            "_pageRow"			: "100000",
	            "_pageNumber"		: "0",
	            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
	            "teamCode"			: $('#frm2 #teamCode').val(),
	            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
	            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
	            "useYn"				: $('#frm2 #useYn').val(),
	            "_DateType"			: $('#frm2 #_DateType').val(),
	            "strFromDate"		: $('#frm2 #strFromDate').val(),
	            "strToDate"			: $('#frm2 #strToDate').val(),
	            "edmsComName"		: $('#frm2 #edmsComName').val(),
	            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
	            "edmsNo"			: $('#frm2 #edmsNo').val(),
	            "singoNo"			: $('#frm2 #singoNo').val(),
	            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
	        }, $('#excelImportGrid'), "FileList");
    	}else if($("input[name='edmsGubunA']:checked").val() == "EXPORT"){
    		exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
	            "size"				: $('#frm2 #size').val(),
	            "page"				: $('#frm2 #page').val(),
	            "_pageRow"			: "100000",
	            "_pageNumber"		: "0",
	            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
	            "teamCode"			: $('#frm2 #teamCode').val(),
	            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
	            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
	            "useYn"				: $('#frm2 #useYn').val(),
	            "_DateType"			: $('#frm2 #_DateType').val(),
	            "strFromDate"		: $('#frm2 #strFromDate').val(),
	            "strToDate"			: $('#frm2 #strToDate').val(),
	            "edmsComName"		: $('#frm2 #edmsComName').val(),
	            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
	            "edmsNo"			: $('#frm2 #edmsNo').val(),
	            "singoNo"			: $('#frm2 #singoNo').val(),
	            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
	        }, $('#excelExportGrid'), "FileList");
    	}else{
    		exportContentCsv("../apis/edms/getEdmsMasterWithNotClassificationFileList", {
	            "size"				: $('#frm2 #size').val(),
	            "page"				: $('#frm2 #page').val(),
	            "_pageRow"			: "100000",
	            "_pageNumber"		: "0",
	            "_defaultDB"		: $('#frm2 #_defaultDB').val(),
	            "teamCode"			: $('#frm2 #teamCode').val(),
	            "edmsGubun"			: $("input[name='edmsGubunA']:checked").val(),
	            "edmsStatus"		: $('#frm2 #edmsStatus').val(),
	            "useYn"				: $('#frm2 #useYn').val(),
	            "_DateType"			: $('#frm2 #_DateType').val(),
	            "strFromDate"		: $('#frm2 #strFromDate').val(),
	            "strToDate"			: $('#frm2 #strToDate').val(),
	            "edmsComName"		: $('#frm2 #edmsComName').val(),
	            "edmsMasterUserName": $('#frm2 #edmsMasterUserName').val(),
	            "edmsNo"			: $('#frm2 #edmsNo').val(),
	            "singoNo"			: $('#frm2 #singoNo').val(),
	            "edmsFileNo"		: $('#frm2 #edmsFileNo').val()
	        }, $('#excelBanipGrid'), "FileList");
    	}
    }
};

var fn_searchExcel1 = function(){
	if($("input[name='gubunTypeA']:checked").val() == "my"){
		location.href = "../apis/edms/downNoFile?edmsMasterUserId=" + $('#frm2 #edmsMasterUserId').val() + "&_defaultDB=" + $('#frm2 #_defaultDB').val() + "&teamCode=" + $('#frm2 #teamCode').val() + "&edmsGubun=" + $("input[name='edmsGubunA']:checked").val() + "&edmsStatus=" + $('#frm2 #edmsStatus').val() + "&useYn=" + $('#frm2 #useYn').val() + "&_DateType=" + $('#frm2 #_DateType').val() + "&strFromDate=" + $('#frm2 #strFromDate').val() + "&strToDate=" + $('#frm2 #strToDate').val();
    }else if($("input[name='gubunTypeA']:checked").val() == "team"){
    	location.href = "../apis/edms/downNoFile1?teamCode=" + $('#frm2 #teamCode').val() + "&_defaultDB=" + $('#frm2 #_defaultDB').val() + "&edmsGubun=" + $("input[name='edmsGubunA']:checked").val() + "&edmsStatus=" + $('#frm2 #edmsStatus').val() + "&useYn=" + $('#frm2 #useYn').val() + "&_DateType=" + $('#frm2 #_DateType').val() + "&strFromDate=" + $('#frm2 #strFromDate').val() + "&strToDate=" + $('#frm2 #strToDate').val();
    }
};

//********** 수출인보이스 맞추기 **********//
var fn_invoice = function(){
	var url = "../apis/edms/getInvoiceCheck",
	    params = {
			"year" : "2021"
		},
	    type = "POST";

	sendAjax(url, params, type, function (d) {
	});
};