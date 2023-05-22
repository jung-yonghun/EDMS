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

//********** 메인 나의 리스트**********//
function selectEdmsMasterMyList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsFileDownList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsJisaCode"		: $('#frm2 #_defaultDB').val(),
            "teamCode"			: $('#frm2 #teamCode').val(),
            "edmsParentGubun"	: $('#frm2 #edmsGubun').val(),
            "edmsComCode"		: $('#frm2 #edmsComCode').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileCategory"	: $('#frm2 #edmsFileCategory').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
    	console.log(d);
        callback(d.content);
    });
}

//********** 메인 팀 리스트**********//
function selectEdmsMasterTeamList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsFileDownList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsJisaCode"		: $('#frm2 #_defaultDB').val(),
            "teamCode"			: $('#frm2 #teamCode').val(),
            "edmsParentGubun"	: $('#frm2 #edmsGubun').val(),
            "edmsComCode"		: $('#frm2 #edmsComCode').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileCategory"	: $('#frm2 #edmsFileCategory').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
    	console.log(d);
        callback(d.content);
    });
}

//********** 메인 지사 리스트**********//
function selectEdmsMasterJisaList(callback){
    progress.show();
    var url 	= "../apis/edms/getEdmsFileDownList",
        params 	= {
            "size"				: $('#frm2 #size').val(),
            "page"				: $('#frm2 #page').val(),
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "edmsJisaCode"		: $('#frm2 #jisaCode').val(),
            "jisaCode"			: $('#frm2 #jisaCode').val(),
            "edmsParentGubun"	: $('#frm2 #edmsGubun').val(),
            "edmsComCode"		: $('#frm2 #edmsComCode').val(),
            "useYn"				: $('#frm2 #useYn').val(),
            "_DateType"			: $('#frm2 #_DateType').val(),
            "strFromDate"		: $('#frm2 #strFromDate').val(),
            "strToDate"			: $('#frm2 #strToDate').val(),
            "edmsComName"		: $('#frm2 #edmsComName').val(),
            "edmsNum"			: $('#frm2 #edmsNum').val(),
            "singoNum"			: $('#frm2 #singoNum').val(),
            "edmsFileCategory"	: $('#frm2 #edmsFileCategory').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
    	console.log(d);
        callback(d.content);
    });
}

//********** 일괄다운로드 ZIP **********//
function saveZipAction(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingEdmsFiles",
        params = {
            "batchDownloadEdmsFileList": code,
            "downloadFileName": "allDownload1.zip"
        },
        type = "POST";
console.log(params);
    $.ajax({
        type: type,
        url: url,
        data: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        },
        success: function (response, status, xhr) {
            progress.hide();
            location.href = "../apis/edms/batchDownloadEdmsFiles?fileName=" + response + "";
        },
        error: function (e) {
            console.error("에러내용", e);
//            alert("일괄다운 권한이 없습니다.\n관리자에게 문의하세요!!!");
            progress.hide();
//            return -1;
            return false;
        }
    });
}

//********** BL 일괄다운로드 ZIP **********//
function saveZipAction1(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingEdmsBlFiles1",
        params = {
            "batchDownloadEdmsFileList": code,
            "downloadFileName": "allDownload.zip"
        },
        type = "POST";
console.log(params);
    $.ajax({
        type: type,
        url: url,
        data: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        },
        success: function (response, status, xhr) {
            progress.hide();
            location.href = "../apis/edms/batchDownloadEdmsFiles?fileName=" + response + "";
        },
        error: function (e) {
        	progress.hide();
            console.error("에러내용", e);
            alert("일괄다운 권한이 없습니다.\n관리자에게 문의하세요!!!");
            progress.hide();
            return -1;
        }
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
    });

    if ($("#frm2 #USERGRADE").val() != "A" && $("#frm2 #USERGRADE").val() != "B") {
        $("select[name='gubunType'] option[value='jisa']").remove();
        $("select[name='gubunType'] option[value='all']").remove();
    }
    getTeamSet({"size": "100"}, drawTeamListfrm2);
    getCmmnCodeList({"mCode": 'Y00008', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawJisaListfrm2);
    getCmmnCodeList({"mCode": 'B00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawCategoryListfrm3);

    $("#frm2 #teamCode").css("display", 'inline');
    $("#frm2 #jisaCode").css("display", 'none');

    $('#frm2 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
    $('#frm2 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

    $("#frm2 #edmsNum").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm2 #edmsNum").val(($("#frm2 #edmsNum").val()).toUpperCase());
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

    $('#fileGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        pager: '#filePager',
        recordtext: "전체: {2} 건",
        colModel: [
            {name: 'SDAAKey', index: 'SDAAKey', hidden: true, key: true},
            {
                label: '구분', name: 'EdmsFileCategory', index: 'EdmsFileCategory', width: 60, align: 'center',
                edittype: 'select',
                formatter: 'select',
                editable: true,
                editoptions: {
                    value: "Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타",
                    defaultValue: "Z0001"
                }
            },
            {label: '파일명', name: 'EdmsOrgFileNm', index: 'EdmsOrgFileNm', width: 180},
            //{label: '파일설명', name: 'edmsFileNote', index: 'edmsFileNote', width: 70, editable: true, editrules: {required: true}},
            {label: '열기', name: '', index: '', width: 30, align: 'center', formatter: linkDownloadFormatter},
            //{label: '삭제', name: '', index: '', width: 30, align: 'center', formatter: linkDelFormatter},
            {name: 'AddUserId', index: 'AddUserId', hidden: true},
            {name: 'EdmsParentGbn', index: 'EdmsParentGbn', hidden: true},
            {name: 'EdmsNo', index: 'EdmsNo', hidden: true},
            {name: 'EdmsSingoNo', index: 'EdmsSingoNo', hidden: true},
            {name: 'EdmsFileStatus', index: 'EdmsFileStatus', hidden: true},
            {name: 'UseYn', index: 'UseYn', hidden: true},
            {name: 'EdmsSaveFileNm', index: 'EdmsSaveFileNm', hidden: true},
            {name: 'EdmsFileSize', index: 'EdmsFileSize', hidden: true},
            {name: 'EdmsFilePath', index: 'EdmsFilePath', hidden: true},
            {name: 'EdmsFileExt', index: 'EdmsFileExt', hidden: true}
        ],
        height: 250,
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
});


//********** 메인 리스트 조회액션(조회시 파일리스트 초기화)**********//
var fn_searchActionTotal = function(){
    $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");

    if($("#frm2 #gubunType").val() == "my"){
        fn_searchAction();
    }else if($("#frm2 #gubunType").val() == "team"){
        fn_searchTeamAction();
    }else if($("#frm2 #gubunType").val() == "jisa"){
        fn_searchJisaAction();
    }
};

//********** 메인 리스트 나의 조회액션**********//
var fn_searchAction = function(){
	var startDateFrom 	= new Date($("#strFromDate").val().substr(0,4),$("#strFromDate").val().substr(4,2),$("#strFromDate").val().substr(6,2));
	var startDateTo 	= new Date($("#strToDate").val().substr(0,4),$("#strToDate").val().substr(4,2),$("#strToDate").val().substr(6,2));
	var diff 			= startDateTo - startDateFrom;
	var currDay 		= 24 * 60 * 60 * 1000;
	var dateCheck 		= parseInt(diff/currDay);
	if(dateCheck > 93) {
		alert("날짜는 최대 3개월까지 조회가능합니다.");
		return;
	}

	if($('#frm2 #edmsComName').val()==""){
		alert("업체명은 필수 입력항목입니다.");
		return;
	}

    selectEdmsMasterMyList(function(d){
        $('#fileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 메인 리스트 팀 조회액션**********//
var fn_searchTeamAction = function(){
	var startDateFrom 	= new Date($("#strFromDate").val().substr(0,4),$("#strFromDate").val().substr(4,2),$("#strFromDate").val().substr(6,2));
	var startDateTo 	= new Date($("#strToDate").val().substr(0,4),$("#strToDate").val().substr(4,2),$("#strToDate").val().substr(6,2));
	var diff 			= startDateTo - startDateFrom;
	var currDay 		= 24 * 60 * 60 * 1000;
	var dateCheck 		= parseInt(diff/currDay);
	if(dateCheck > 93) {
		alert("날짜는 최대 3개월까지 조회가능합니다.");
		return;
	}

	if($('#frm2 #edmsComName').val()==""){
		alert("업체명은 필수 입력항목입니다.");
		return;
	}

    selectEdmsMasterTeamList(function(d){
        $('#fileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 메인 리스트 지사 조회액션**********//
var fn_searchJisaAction = function(){
	var startDateFrom 	= new Date($("#strFromDate").val().substr(0,4),$("#strFromDate").val().substr(4,2),$("#strFromDate").val().substr(6,2));
	var startDateTo 	= new Date($("#strToDate").val().substr(0,4),$("#strToDate").val().substr(4,2),$("#strToDate").val().substr(6,2));
	var diff 			= startDateTo - startDateFrom;
	var currDay 		= 24 * 60 * 60 * 1000;
	var dateCheck 		= parseInt(diff/currDay);
	if(dateCheck > 60) {
		alert("날짜는 최대 2개월까지 조회가능합니다.");
		return;
	}

	if($('#frm2 #edmsComName').val()==""){
		alert("업체명은 필수 입력항목입니다.");
		return;
	}

    selectEdmsMasterJisaList(function(d){
        $('#fileGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

//********** 키 타운 액션**********//
var keyDown = function () {
    if (event.keyCode == 13) fn_searchActionTotal();
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

//********** 분류 업무선택 액션 (파일 추가 문서구분 변경)**********//
var ChangeGubunfrm2 = function () {
    if ($("#frm2 #edmsGubun option:selected").val() == "IMPORT") {
        //$("#fileGrid").jqGrid('GridUnload');
        fn_searchActionTotal();
    } else if ($("#frm2 #edmsGubun option:selected").val() == "EXPORT") {
        //$("#fileGrid").jqGrid('GridUnload');
        fn_searchActionTotal();
    }
};

//********** 신고번호 일괄저장 버튼 액션 (ZIP 다운)**********//
var fn_allDown = function () {
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

    if (!confirm("일괄다운 하시겠습니까?")) return;

    var d = [];

    for (var i = 0; i < ids.length; i++) {
        var check = false;
        $.each(rowId, function (index, value) {
            if (value == ids[i])
                check = true;
        });
        if (check) {
            d.push({
                "edmsFileKey": $("#fileGrid").getRowData(ids[i]).edmsFileKey,
                "edmsParentGubun": $("#fileGrid").getRowData(ids[i]).edmsParentGubun,
                "edmsNum": $("#fileGrid").getRowData(ids[i]).edmsNum,
                "edmsSingoNum": $("#fileGrid").getRowData(ids[i]).edmsSingoNum,
                "edmsFileCategory": $("#fileGrid").getRowData(ids[i]).edmsFileCategory,
                "edmsOrgFileName": $("#fileGrid").getRowData(ids[i]).edmsOrgFileName,
                "edmsFileStatus": $("#fileGrid").getRowData(ids[i]).edmsFileStatus,
                "useYn": $("#fileGrid").getRowData(ids[i]).useYn,
                "edmsSaveFileName": $("#fileGrid").getRowData(ids[i]).edmsSaveFileName,
                "edmsFileSize": $("#fileGrid").getRowData(ids[i]).edmsFileSize,
                "edmsServerIp": $("#fileGrid").getRowData(ids[i]).edmsServerIp,
                "edmsFilePath": $("#fileGrid").getRowData(ids[i]).edmsFilePath,
                "edmsServerGubun": $("#fileGrid").getRowData(ids[i]).edmsServerGubun,
                "edmsFileExt": $("#fileGrid").getRowData(ids[i]).edmsFileExt
            });
        }
    }
    saveZipAction(d, function (r) {
    });
};

//********** BL 일괄저장 버튼 액션 (ZIP 다운)**********//
var fn_allDown1 = function () {
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

    if (!confirm("일괄다운 하시겠습니까?")) return;

    var d = [];

    for (var i = 0; i < ids.length; i++) {
        var check = false;
        $.each(rowId, function (index, value) {
            if (value == ids[i])
                check = true;
        });
        if (check) {
            d.push({
                "sDAAKey": $("#fileGrid").getRowData(ids[i]).SDAAKey,
                "edmsParentGbn": $("#fileGrid").getRowData(ids[i]).EdmsParentGbn,
                "edmsNo": $("#fileGrid").getRowData(ids[i]).EdmsNo,
                "edmsSingoNo": $("#fileGrid").getRowData(ids[i]).EdmsSingoNo,
                "edmsFileCategory": $("#fileGrid").getRowData(ids[i]).EdmsFileCategory,
                "edmsOrgFileNm": $("#fileGrid").getRowData(ids[i]).EdmsOrgFileNm,
                "edmsFileStatus": $("#fileGrid").getRowData(ids[i]).EdmsFileStatus,
                "useYn": $("#fileGrid").getRowData(ids[i]).UseYn,
                "edmsSaveFileNm": $("#fileGrid").getRowData(ids[i]).EdmsSaveFileNm,
                "edmsFileSize": $("#fileGrid").getRowData(ids[i]).EdmsFileSize,
                "edmsFilePath": $("#fileGrid").getRowData(ids[i]).EdmsFilePath,
                "edmsFileExt": $("#fileGrid").getRowData(ids[i]).EdmsFileExt
            });
        }
    }
    saveZipAction1(d, function (r) {
    });
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

    edmsNewFileName = category + "_" + rowdata.edmsOrgFileName;

    // TODO 임시(20170821)
    return "<a onclick='javascript:fn_downAction(" + rowdata.edmsFileKey + ")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(cellValue, options, rowdata, action) {
	if (rowdata.addUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B") {
		return "<a onclick='javascript:fn_delAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
    } else {
        return "";
    }
}

//********** 분류 다운로드 액션**********//
var fn_downAction = function (edmsFileKey){
    location.href = "../apis/edms/downloadEdmsFile?edmsFileKey="+ edmsFileKey;
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

var drawCategoryListfrm3 = function (data) {
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].CODE + "\">" + data[i].NAME + "</option>";
    }
    $("#frm2 #edmsFileCategory").html(optList.join("\n"));
};