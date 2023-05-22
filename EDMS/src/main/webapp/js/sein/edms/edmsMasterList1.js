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
            "edmsParentGubun"	: "NOTCLASS",
            "edmsFileUserId"	: $('#sessionId').val(),
            "useYn"				: "Y"
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
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
            "edmsParentGubun"	: "PAPER",
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
            "edmsParentGubun"	: "TPAPER",
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
            "edmsParentGubun"	: "BLINV",
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
    var url = "../apis/edms/getEdmsFileInfoList",
        params = {
            "edmsNum"	: code,
            "useYn"		: "Y"
        },
        type = "POST";
    sendAjax(url, params, type, function (d) {
        if (!d.content) return;
        $('#tab3FileGrid').datagrid('loadData', d.content);
    });
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
            "edmsParentGubun"		: $('#notForm #edmsGubun').val(),
            "edmsJisaCode"			: jisaCode,
            "edmsNum"				: $('#notForm #edmsNum').val(),
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
			$('#notForm #edmsNum').val("");
			selectNotFileList();
            fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
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
            "edmsParentGubun"		: "NOTCLASS",
            "edmsJisaCode"			: "ncustoms",
            "edmsNum"				: "",
            "commonYn"				: "N",
            "edmsFileCategory"		: "Z0001"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	selectNotFileList();
        fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
        refreshGridPage();
    });
}

//********** 파일리스트 구분저장 액션**********//
function saveFileDetailSaveAction(code) {
    var url 	= "../apis/edms/saveEdmsFileAdditionalInfo",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function (d) {
    	fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
    });
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
        $('#masterGrid').datagrid('loadData', d.content);
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
        console.log(d.content);
        progress.hide();
        $('#tab3Grid').datagrid('loadData', d.content);
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
    drawCategoryListaddForm();

    $("#arrowRight").html('<img src="../images/common/next_arrow.png" onclick="javascript:fn_changeAction();">');
    $("#arrowLeft").html('<img src="../images/common/prev_arrow.png" onclick="javascript:fn_returnAction();">');

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
            if ($("#addForm #edmsParentGubun").val() == "") {
                alert("분류 리스트를 선택하세요.");
                return false;
            } else {
                if ($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSingoNum").val() == "") {
                    alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
                    return false;
                } else if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSingoNum").val() != "") {
                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNum").val() == "") {
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
        	fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
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
		height			: 350,
		singleSelect	: false,
		fitColumns		: true,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		autoRowHeight	: false,
		remoteSort		: false,
		columns			: [[
			{field:'ck',title:'',checkbox:true},
			{field:'edmsFileKey',title:'Key',hidden:true},
			{field:'edmsOrgFileName',title:'파일명',width:150,sortable:true},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelNotFormatter}
        ]]
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
			{field:'edmsFileKey',title:'Key',hidden:true},
			{field:'edmsOrgFileName',title:'파일명',width:270},
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
			{field:'edmsFileKey',title:'Key',hidden:true},
			{field:'edmsOrgFileName',title:'파일명',width:150},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelPaperFormatter}
        ]]
	});

	$('#tab1FileGrid').datagrid('enableFilter',[]);

	$('#tab4FileGrid').datagrid({
		title			: '병합 미등록 리스트',
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
			{field:'edmsFileKey',title:'Key',hidden:true},
			{field:'edmsOrgFileName',title:'파일명',width:150},
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
			{field:'edmsFileKey',title:'Key',hidden:true},
			{field:'edmsOrgFileName',title:'파일명',width:150},
			{field:'addDtm',title:'등록일', width:70, align:'center', formatter:dateFormatter},
			{field:'a',title:'열기',width:30,align:'center',formatter:linkDownloadNotFormatter},
			{field:'b',title:'삭제',width:30,align:'center',formatter:linkDelPaperFormatter1}
        ]]
	});

	$('#tab5FileGrid').datagrid('enableFilter',[]);

	setImportGrid();

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

    $('#frmTab1 #startDay').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frmTab1 #endDay').val($.datepicker.formatDate('yymmdd', new Date()));

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
        if ($("#frm2 #_defaultDB").val() == "ncustoms_sel_040") {
            $("select[name='edmsGubun'] option[value='EXPORT']").attr("selected", "selected");
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
		height			: 364,
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
			{field:'Impo_bl_no',title:'H B/L No.',width:100, formatter:linkBlNoFormatter},
			{field:'Impo_singo_no',title:'신고번호',width:110, align:'center', formatter:linkImportSingoFormatter, key:true},
			{field:'Impo_napse_sangho',title:'업체명',width:110},
			{field:'UserNM',title:'등록자', width:40, align:'center'},
			{field:'filePaperCount',title:'필증', width:30, align:'center'},
			{field:'fileCount',title:'파일', width:30, align:'center'},
			{field:'Impo_receive_result',title:'통관', width:30, align:'center'},
			{field:'Impo_ok_date',title:'수리일', width:70, align:'center', formatter:dateFormatter},
			{field:'deliveryStatus',title:'운송',width:60, align:'center', formatter:linkDeliveryLinkFormatter},
			{field:'Impo_key',title:'Impo_key',hidden:true}
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            {field:'edmsFileKey',title:'Key',hidden:true},
            {field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'edmsOrgFileName',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter},
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
};

//********** 수출 분류리스트, 파일리스트**********//
var setExportGrid = function(){
	$('#masterGrid').datagrid({
		title			: '분류 리스트',
		width			: '100%',
		height			: 364,
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
			{field:'Expo_key',title:'Expo_key',hidden:true}
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            {field:'edmsFileKey',title:'Key',hidden:true},
            {field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'edmsOrgFileName',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter},
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
};

//********** 수출 갈음분류리스트, 파일리스트**********//
var setBanipGrid = function(){
	$('#masterGrid').datagrid({
		title			: '분류 리스트',
		width			: '100%',
		height			: 364,
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
			{field:'Ban1_key',title:'Ban1_key',hidden:true}
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            data:[{value:'',text:'All'},{value:'X',text:'X'},{value:'O',text:'O'}],
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
            {field:'edmsFileKey',title:'Key',hidden:true},
            {field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'edmsOrgFileName',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
            {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter},
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
    $("#notForm #edmsNum").val(rN);
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

    if($("#frm2 #gubunType").val() == "my"){
        fn_searchAction();
    }else if($("#frm2 #gubunType").val() == "team"){
        fn_searchTeamAction();
    }else if($("#frm2 #gubunType").val() == "jisa"){
        fn_searchJisaAction();
    }else if($("#frm2 #gubunType").val() == "all"){
        fn_searchAllAction();
    }
    $("#addForm #edmsParentGubun").val("");
    $("#addForm #edmsNum").val("");
    $("#addForm #edmsSingoNum").val("");
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
function refreshGridPage(selrow, pageNum){
    $("#frm3").each(function(){
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
    if($("#frm2 #sessionId").val()=="shyoon" || $("#frm2 #sessionId").val()=="hsjang" || $("#frm2 #sessionId").val()=="hjlee2" || $("#frm2 #sessionId").val()=="yhso" || $("#frm2 #sessionId").val()=="jwchoi1"){
    	optList[0] = "<option value=\"015\">본사수입1</option>";
    	optList[1] = "<option value=\"016\">본사수입2</option>";
    	optList[2] = "<option value=\"017\">본사수입3</option>";
    	optList[3] = "<option value=\"018\">본사수입4</option>";
    	optList[4] = "<option value=\"019\">본사수입5</option>";
    	optList[5] = "<option value=\"055\">본사수입6</option>";
    }else{
    	for (var i = 0; i < data.length; i++) {
            optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
        }
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
var fn_fileListImportAction = function(rowdata){
	progress.show();
	$("#addForm #edmsParentGubun").val($("#frm2 #edmsGubun").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val(rowdata.Impo_key);
    $("#notForm #edmsNum").val(rowdata.Impo_bl_no);
    $("#addForm #edmsNum").val(rowdata.Impo_bl_no);
    $("#addForm #edmsSingoNum").val(rowdata.Impo_singo_no);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
	fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
    progress.hide();
};

//********** 메인 분류 선택시 수출액션 (파일 리스트 조회)**********//
var fn_fileListExportAction = function(rowdata){
	progress.show();
	$("#notForm #edmsNum").val(rowdata.Expo_iv_no);
    $("#addForm #edmsParentGubun").val($("#frm2 #edmsGubun").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMKey").val(rowdata.Expo_key);
    $("#addForm #edmsNum").val(rowdata.Expo_iv_no);
    $("#addForm #edmsSingoNum").val(rowdata.Expo_singo_no);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
    progress.hide();
};

//********** 메인 분류 선택시 갈음액션 (파일 리스트 조회)**********//
var fn_fileListBanipAction = function(rowdata){
	progress.show();
	$("#notForm #edmsNum").val(rowdata.Ban1_Invoice);
    $("#addForm #edmsParentGubun").val($("#frm2 #edmsGubun").val());
    $("#addForm #edmsJisaCode").val($("#frm2 #_defaultDB").val());
    $("#addForm #edmsMKey").val(rowdata.Ban1_key);
    $("#addForm #edmsNum").val(rowdata.Ban1_Invoice);
    $("#addForm #edmsSingoNum").val(rowdata.BAN1_SINGO_NO);
    $("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
    progress.hide();
};

//********** 화주등록 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListTab3ImportAction = function (rowdata) {
    fn_fileTab3Action(rowdata.startNum);
};

var fn_fileAction1 = function(edmsNum, singoNo, edmsGubun){
    $("#frm3").each(function(){
        this.reset();
    });

    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsNum"		: edmsNum,
            "edmsSingoNum"	: singoNo,
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
    	console.log(d.content);
    	progress.hide();
    	if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGubun").val(d.content[0].edmsParentGubun);
			$("#addForm #edmsNum").val(d.content[0].edmsNum);

			if(d.content.length == 1){
				if(d.content[0].edmsFileKey == undefined){
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
    if ($("#frm2 #edmsGubun option:selected").val() == "IMPORT") {
        $("#frm2 #gubunName").html('H B/L');
        //$("#frm2 #edmsNum").removeAttr("disabled");
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNum").removeAttr("disabled");
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
    } else if ($("#frm2 #edmsGubun option:selected").val() == "EXPORT") {
        $("#frm2 #gubunName").html('Inv');
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNum").removeAttr("disabled");
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
    } else if ($("#frm2 #edmsGubun option:selected").val() == "BANIP") {
        $("#frm2 #gubunName").html('Inv');
        $("#frm2 #gubunSingoName").html('신고번호');
        $("#frm2 #singoNum").removeAttr("disabled");
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
    optList[7] = "<option value=\"접수\">접수</option>";
    optList[8] = "<option value=\"제출\">제출</option>";
    optList[9] = "<option value=\"취하\">취하</option>";
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
var drawCategoryListaddForm = function () {
    var optList1 = new Array();
    optList1[optList1.length] = "<option value=\"Z0001\">미구분</option>";
    $("#addForm #edmsFileCategory").html(optList1.join("\n"));
};

//********** 미분류 -> 분류 버튼 액션**********//
var fn_changeAction = function(){
	var rows = $('#notfileGrid').datagrid('getSelections');

    if($('#notForm #edmsGubun').val() == "IMPORT"){
        if($('#notForm #edmsNum').val().replace(/(\s*)/g,'') == ""){
            alert('H B/L No를 입력해주세요.');
            return;
        }
    }

    if($('#notForm #edmsGubun').val() == "EXPORT" || $('#notForm #edmsGubun').val() == "BANIP"){
        if($('#notForm #edmsNum').val().replace(/(\s*)/g,'') == ""){
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
            "edmsFileKey" 	  : rows[i].edmsFileKey,
            "edmsParentGubun" : rows[i].edmsParentGubun
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
    if($("#addForm #edmsParentGubun").val() == ""){
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
    		"edmsFileKey" 	  	: rows[i].edmsFileKey,
            "edmsParentGubun"	: "NOTCLASS",
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

//********** 구분저장 버튼 액션**********//
var fn_detailSave = function(){
	if($("#addForm #edmsParentGubun").val() == ""){
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
            "edmsFileKey"		: rows[i].edmsFileKey,
            "edmsFileCategory"	: rows[i].edmsFileCategory,
            "commonYn"			: rows[i].commonYn
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
    }
};

//********** 신고번호별 개별저장 액션**********//
var fn_detailSingoSave = function(){
	if($("#addForm #edmsParentGubun").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if($("#addForm #edmsSingoNum").val()==""){
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
            "edmsFileKey" 	  	: rows[i].edmsFileKey,
            "edmsFileCategory" 	: rows[i].edmsFileCategory,
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
    return "<a onclick='javascript:fn_downNotAction("+ row.edmsFileKey +")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 미분류 다운로드 액션**********//
var fn_downNotAction = function(edmsFileKey){
    location.href = "../apis/edms/downloadEdmsFile?edmsFileKey="+ edmsFileKey;
};

//********** 미분류 삭제 formatter**********//
function linkDelNotFormatter(value, row){
    return "<a onclick='javascript:fn_delNotAction("+ row.edmsFileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 미분류 삭제 액션**********//
var fn_delNotAction = function(edmsFileKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url 	= "../apis/edms/deleteEdmsFile",
            params 	= {"edmsFileKey": edmsFileKey},
            type 	= "POST";

        sendAjax(url, params, type, function(d){
        	selectNotFileList();
        });
    }
};

//********** 면장등록 삭제 formatter**********//
function linkDelPaperFormatter(value, row){
    return "<a onclick='javascript:fn_delPaperAction("+ row.edmsFileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 면장등록 삭제 액션**********//
var fn_delPaperAction = function(edmsFileKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
        	fn_tab1Action();
        });
    }
};

//********** 병합등록 삭제 formatter**********//
function linkDelPaperFormatter1(value, row){
    return "<a onclick='javascript:fn_delPaperAction1("+ row.edmsFileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
}

//********** 병합등록 삭제 액션**********//
var fn_delPaperAction1 = function(edmsFileKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey},
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





//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(value, row){
	if (row.addUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
		return "<a onclick='javascript:fn_delAction("+ row.edmsFileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 분류 파일삭제 액션**********//
var fn_delAction = function (edmsFileKey) {
    if (confirm("[삭제] 하시겠습니까?")) {
        var url = "../apis/edms/deleteEdmsFile",
            params = {"edmsFileKey": edmsFileKey},
            type = "POST";

        sendAjax(url, params, type, function(d){
            fn_fileAction1($("#addForm #edmsNum").val(), $("#addForm #edmsSingoNum").val(), $("#addForm #edmsParentGubun").val());
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
var fn_downAction = function (edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName, edmsNewFileName) {
    edmsOrgFileName = encodeURIComponent(edmsOrgFileName);
    edmsNewFileName = encodeURIComponent(edmsNewFileName);
    location.href = "../apis/edms/downloadEdmsFile?edmsFileKey=" + edmsFileKey + "&edmsParentGubun=" + edmsParentGubun + "&edmsParentKey=" + edmsParentKey + "&edmsOrgFileName=" + edmsOrgFileName + "&edmsNewFileName=" + edmsNewFileName;
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
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(row.Impo_singo_no == ""){
	          alert("신고번호가 없어 운송의뢰하실 수 없습니다.");
	          return;
	    }

	  	if(row.deliveryStatus){
	          alert("이미 의뢰되었습니다.");
	          return;
	    }
		openWindowWithPost("./deliveryInsert.sein", "width=390, height=405, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
			"impoSingoNo"	: row.Impo_singo_no.replace(/-/gi, ""),
			"_defaultDB" 	: $('#frm2 #_defaultDB').val()
		});
	}else{
		alert("분류리스트를 선택한 후 클릭하세요.");
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
console.log(rowData.deliveryStatus.substring(45).replace("</a></u>", ""));
	  	if(rowData.deliveryStatus.substring(45).replace("</a></u>", "") != "운송의뢰"){
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
								"deliveryRequestKey" 		: null,
								"customerKey" 				: "0",
								"customerDb" 				: $("#frm2 #_defaultDB").val(),
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
								"requestMan" 				: $("#frm3 #addUserName").val(),
								"requestPhone" 				: "",
								"requestDate" 				: $('#frm3 #yymmddhhmmss').val(),
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
					"edmsFileKey" 	: rows[i].edmsFileKey
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
					"edmsFileKey" 	: rows[i].edmsFileKey
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
					"edmsFileKey" 	: rows[i].edmsFileKey
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
					"edmsFileKey" 	: rows[i].edmsFileKey
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
	    	console.log(down);
	    	console.log(width);
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
	    	console.log(down);
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
	{id: 'Z0003', name: '기타'}
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
		if($('#frm2 #edmsGubun').val()=="IMPORT"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Impo_key,
				"singoNo"		: row.Impo_singo_no,
				"blInvNo"		: row.Impo_bl_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: $('#frm2 #edmsGubun').val()
			});
		}else if($('#frm2 #edmsGubun').val()=="EXPORT"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Expo_key,
				"singoNo"		: row.Expo_singo_no,
				"blInvNo"		: row.Expo_iv_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: $('#frm2 #edmsGubun').val()
			});
		}else if($('#frm2 #edmsGubun').val()=="BANIP"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: row.Ban1_key,
				"singoNo"		: row.BAN1_SINGO_NO,
				"blInvNo"		: row.Ban1_Invoice,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXPORT"
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
		if($('#frm2 #edmsGubun').val()=="IMPORT"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.Impo_singo_no,
				"blInvNo"		: row.Impo_bl_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "IMJUNG"
			});
		}else if($('#frm2 #edmsGubun').val()=="EXPORT"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.Expo_singo_no,
				"blInvNo"		: row.Expo_iv_no,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXJUNG"
			});
		}else if($('#frm2 #edmsGubun').val()=="BANIP"){
			openWindowWithPost("./fieldInsert.sein", "width=390, height=300, scrollbars=no, menubar=no, resizable=1", "deliveryInsert", {
				"key"			: "",
				"singoNo"		: row.BAN1_SINGO_NO,
				"blInvNo"		: row.Ban1_Invoice,
				"_defaultDB" 	: $('#frm2 #_defaultDB').val(),
				"gubun"			: "EXJUNG"
			});
		}
	}else{
		alert("분류리스트를 선택한 후 클릭하세요.");
	}
};