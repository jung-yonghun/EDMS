//********** 팀 리스트 **********//
function getTeamSet(params, callback){
    var url = "../apis/edms/getTeamXUserListWithAuth",
        type = "POST";

    sendAjax(url, params, type, function(d){
    	if (d.content[0].teamCode == "012") {
            $("#frmTab1 #_defaultDB").val("ncustoms_sel_040");
        } else if (d.content[0].teamCode == "039") {
            $("#frmTab1 #_defaultDB").val("ncustoms_bs");
        } else if (d.content[0].teamCode == "044") {
            $("#frmTab1 #_defaultDB").val("ncustoms_us");
        } else if (d.content[0].teamCode == "021") {
            $("#frmTab1 #_defaultDB").val("ncustoms_ic");
        } else if (d.content[0].teamCode == "020") {
            $("#frmTab1 #_defaultDB").val("ncustoms_yj");
        } else if (d.content[0].teamCode == "030") {
            $("#frmTab1 #_defaultDB").val("ncustoms_cw");
        } else if (d.content[0].teamCode == "028") {
            $("#frmTab1 #_defaultDB").val("ncustoms_ca");
        } else if (d.content[0].teamCode == "027") {
            $("#frmTab1 #_defaultDB").val("ncustoms_cj");
        } else if (d.content[0].teamCode == "022") {
            $("#frmTab1 #_defaultDB").val("ncustoms_pj");
        } else if (d.content[0].teamCode == "026") {
            $("#frmTab1 #_defaultDB").val("ncustoms_pt");
        } else if (d.content[0].teamCode == "029") {
            $("#frmTab1 #_defaultDB").val("ncustoms_gm");
        } else if (d.content[0].teamCode == "024") {
            $("#frmTab1 #_defaultDB").val("ncustoms_ay");
        } else if (d.content[0].teamCode == "050") {
            $("#frmTab1 #_defaultDB").val("ncustoms_ys");
        } else if (d.content[0].teamCode == "075") {
            $("#frmTab1 #_defaultDB").val("ncustoms_jj");
        } else if (d.content[0].teamCode == "076") {
            $("#frmTab1 #_defaultDB").val("ncustoms_dj");
        } else if (d.content[0].teamCode == "008") {
            $("#frmTab1 #_defaultDB").val("ncustoms_sel4");
        } else if (d.content[0].teamCode == "023" || d.content[0].teamCode == "025") {
            $("#frmTab1 #_defaultDB").val("ncustoms_sn");
        } else {
            $("#frmTab1 #_defaultDB").val("ncustoms");
        }
        callback(d.content);
    });
}

function selectImpoExpoMasterList(callback){
    progress.show();
    var url 	= "../apis/edms/saveNcomCustomer",
        params 	= {
            "_defaultDB" : $('#frmTab1 #_defaultDB').val(),
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
    	var url 	= "../apis/edms/getCustomsClearanceByUnregisteredEdmsMasterList",
		    params 	= {
		        "size"				: "100000",
		        "page"				: "0",
		        "_pageRow"			: "100000",
		        "_pageNumber"		: "0",
		        "_dateType"			: $('#frmTab1 #_dateType').val(),
		        "startDay"			: $('#frmTab1 #startDay').val(),
		        "endDay"			: $('#frmTab1 #endDay').val(),
		        "teamCode"			: $('#frmTab1 #teamCode').val(),
		        "_defaultDB"		: $('#frmTab1 #_defaultDB').val(),
		        "_customsUserId"	: $('#frmTab1 #_customsUserId').val(),
		        "impoNapseSangho"	: $('#frmTab1 #impoNapseSangho').val(),
		        "impoBlNo"			: $('#frmTab1 #impoBlNo').val(),
		        "impoSingoNo"		: $('#frmTab1 #impoSingoNo').val(),
		        "useYn"				: "Y"
		    },
		    type 	= "POST";
    	console.log(params);
		sendAjax(url, params, type, function(d){
			console.log(d.content);
		    progress.hide();
		    callback(d.content);
		});
    });
}

$(document).ready(function(){
	$(function setDatePicker(){
        $.datepicker.setDefaults($.datepicker.regional['ko']);
        var dates = $("#frmTab1 #startDay, #frmTab1 #endDay").datepicker({
            changeMonth		: true,
            changeYear		: true,
            showButtonPanel	: true,
            currentText		: "오늘",
            dateFormat		: 'yymmdd',
            onSelect		: function (selectedDate) {
                var option = this.id == "startDay" ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        });
    });
	$('#frmTab1 #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	getTeamSet({"size": "100"}, drawTeamList);

	$(function setDataGrid(){
		$('#tab1Grid').jqGrid({
	        datatype: "local",
	        cellsubmit: 'clientArray',
	        editurl: 'clientArray',
	        cellEdit: true,
	        colModel: [
	            {label:'B/L (Inv)', name:'BLNO', index:'BLNO', width:100},
	            {label:'신고번호', name:'SINGO', index:'SINGO', width:80},
	            {label:'업체명', name:'SANGHO', index:'SANGHO', width:100},
	            {name:'JISA', index:'JISA', hidden:true},
	            {name:'BIZTYPE', index:'BIZTYPE', hidden:true},
	            {name:'TEAM', index:'TEAM', hidden:true},
	            {name:'CODE', index:'CODE', hidden:true},
	            {name:'SAUPNO', index:'SAUPNO', hidden:true},
	            {name:'CKEY', index:'CKEY', hidden:true}
	        ],
	        height: 150,
	        rowNum: 7,
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
	        pager: '#tab1Pager',
	        recordtext: "전체: {2} 건",
	        onSelectCell: function (rowid, e) {
	            rowData = jQuery("#tab1Grid").getRowData(rowid);
	            sIds = rowid;
	        },
	        beforeSelectRow: function (rowid, e) {
	            jQuery("#tab1Grid").jqGrid('resetSelection');
	            rowData = jQuery("#tab1Grid").getRowData(rowid);
	            sIds = rowid;
	        }
	    });
	    jQuery("#tab1Grid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
	    resizeJqGridWidth('tab1Grid', 'parentDiv11', 0, true);

	});

	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

	$('#frmTab1 #startDay').val($.datepicker.formatDate('yymmdd', startDateFrom));
    $('#frmTab1 #endDay').val($.datepicker.formatDate('yymmdd', new Date()));

    setTimeout(function(){
    	fn_searchAction();
    }, 500);
});

var fn_searchAction = function(){
//	if($('#frmTab1 #_customsUserId').val()=="" && ($('#frmTab1 #impoBlNo').val()=="" && $('#frmTab1 #impoSingoNo').val()=="" && $('#frmTab1 #impoNapseSangho').val()=="")){
//		alert("항목 중 하나를 입력하세요.");
//		return;
//	}

	selectImpoExpoMasterList(function(d){
        $('#tab1Grid').clearGridData().setGridParam({
            data : d
        }).trigger('reloadGrid');
    });
};

//********** 팀리스트 draw **********//
var drawTeamList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i]["teamCode"] + "\">" + data[i]["teamName"] + "</option>";
    }
    $("#frmTab1 #teamCode").html(optList.join("\n"));
};

var ChangeTeam = function(){
	if ($("#frmTab1 #teamCode").val() == "012") {
        $("#frmTab1 #_defaultDB").val("ncustoms_sel_040");
    } else if ($("#frmTab1 #teamCode").val() == "039") {
        $("#frmTab1 #_defaultDB").val("ncustoms_bs");
    } else if ($("#frmTab1 #teamCode").val() == "044") {
        $("#frmTab1 #_defaultDB").val("ncustoms_us");
    } else if ($("#frmTab1 #teamCode").val() == "021") {
        $("#frmTab1 #_defaultDB").val("ncustoms_ic");
    } else if ($("#frmTab1 #teamCode").val() == "020") {
        $("#frmTab1 #_defaultDB").val("ncustoms_yj");
    } else if ($("#frmTab1 #teamCode").val() == "030") {
        $("#frmTab1 #_defaultDB").val("ncustoms_cw");
    } else if ($("#frmTab1 #teamCode").val() == "028") {
        $("#frmTab1 #_defaultDB").val("ncustoms_ca");
    } else if ($("#frmTab1 #teamCode").val() == "027") {
        $("#frmTab1 #_defaultDB").val("ncustoms_cj");
    } else if ($("#frmTab1 #teamCode").val() == "022") {
        $("#frmTab1 #_defaultDB").val("ncustoms_pj");
    } else if ($("#frmTab1 #teamCode").val() == "026") {
        $("#frmTab1 #_defaultDB").val("ncustoms_pt");
    } else if ($("#frmTab1 #teamCode").val() == "029") {
        $("#frmTab1 #_defaultDB").val("ncustoms_gm");
    } else if ($("#frmTab1 #teamCode").val() == "024") {
        $("#frmTab1 #_defaultDB").val("ncustoms_ay");
    } else if ($("#frmTab1 #teamCode").val() == "050") {
        $("#frmTab1 #_defaultDB").val("ncustoms_ys");
    } else if ($("#frmTab1 #teamCode").val() == "075") {
        $("#frmTab1 #_defaultDB").val("ncustoms_jj");
    } else if ($("#frmTab1 #teamCode").val() == "076") {
        $("#frmTab1 #_defaultDB").val("ncustoms_dj");
    } else if ($("#frmTab1 #teamCode").val() == "008") {
        $("#frmTab1 #_defaultDB").val("ncustoms_sel4");
    } else if ($("#frmTab1 #teamCode").val() == "023" || $("#frmTab1 #teamCode").val() == "025") {
        $("#frmTab1 #_defaultDB").val("ncustoms_sn");
    } else {
        $("#frmTab1 #_defaultDB").val("ncustoms");
    }
};

function fn_masterAction(){
	if(!confirm("동기화 하시겠습니까?")) return;
	var sss = [];
    var url 	= "../apis/edms/getCustomsClearanceByUnregisteredEdmsMasterList",
        params 	= {
            "size"				: "100000",
            "page"				: "0",
            "_pageRow"			: "100000",
            "_pageNumber"		: "0",
            "_dateType"			: $('#frmTab1 #_dateType').val(),
            "startDay"			: $('#frmTab1 #startDay').val(),
            "endDay"			: $('#frmTab1 #endDay').val(),
            "teamCode"			: $('#frmTab1 #teamCode').val(),
            "_defaultDB"		: $('#frmTab1 #_defaultDB').val(),
            "_customsUserId"	: $('#frmTab1 #_customsUserId').val(),
            "impoNapseSangho"	: $('#frmTab1 #impoNapseSangho').val(),
            "impoBlNo"			: $('#frmTab1 #impoBlNo').val(),
	        "impoSingoNo"		: $('#frmTab1 #impoSingoNo').val(),
            "useYn"				: "Y"
        },
        type 	= "POST";
    progress.show();
    sendAjax(url, params, type, function(d){
    	console.log(d);
    	if(d.content.length == 0){
    		progress.hide();
	        alert("동기화 할 대상이 없습니다.");
	        opener.fn_searchActionTotal();
    	}else{
	    	for (var i = 0; i < d.content.length; i++) {
	            sss.push({
	            	"addDay"			: $('#frmTab1 #yyyymmdd').val(),
	                "addUserName"		: "",
	                "banchulDay"		: "10010101",
	                "banipDay"			: "10000101",
	                "divisionSingoYn"	: "N",
	                "editDay"			: $('#frmTab1 #yyyymmdd').val(),
	                "edmsComCode"		: d.content[i].CODE,
	                "edmsComKey"		: d.content[i].CKEY,
	                "edmsComName"		: d.content[i].SANGHO,
	                "edmsComNum"		: d.content[i].SAUPNO,
	                "edmsGubun"			: d.content[i].BIZTYPE,
	                "edmsKey"			: "",
	                "edmsMrn"			: "",
	                "edmsMsn"			: "",
	                "edmsNum"			: d.content[i].BLNO,
	                "edmsStatus"		: "0",
	                "edmsUploadType"	: "EDMS",
	                "iphangDay"			: "10000101",
	                "jisaCode"			: d.content[i].JISA,
	                "singoDay"			: "10000101",
	                "singoNum"			: d.content[i].SINGO,
	                "suriDay"			: "10000101",
	                "teamCode"			: d.content[i].TEAM,
	                "useYn"				: "Y",
	                "edmsManagementNum"	: "",
	                "addUserId"			: d.content[i].UserID,
	                "addUserName"		: d.content[i].UserNM
	            });
	        }

	    	var url = "../apis/edms/saveEdmsMasterList",
		        params = {
		            "edmsMasterList": sss
		        },
		        type = "POST";

		    sendAjax(url, params, type, function (k) {
		    	progress.hide();
		        alert("동기화 되었습니다.");
		        opener.fn_searchActionTotal();
		        window.close();
		    });
    	}
    });
}

//********** 키 타운 액션**********//
var keyDown = function () {
    if (event.keyCode == 13) fn_searchAction();
};