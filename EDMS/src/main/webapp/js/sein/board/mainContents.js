function getSystemList(callback) {
    var url = "../apis/system/getSysNoticeList",
        params = {
    		"noticeCategory": "Edu",
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y",
    		"sort"			: [{"property":"noticeKey", "direction":"desc"}]
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d[0].content) return;
        callback(d[0].content);
    });
}

function getNewsList(callback) {
    var url = "../apis/system/getSysNoticeList",
        params = {
    		"noticeCategory": "Notice",
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y",
    		"sort"			: [{"property":"noticeKey", "direction":"desc"}]
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d[0].content) return;
        callback(d[0].content);
    });
}

function selectOrderList() {
    var url = "../apis/order/getPoMasterList",
        params = {
    		"_dateType"			: "orderDay",
    		"startDay"			: "20000101",
    		"endDay"			: $("#endDay").val(),
    		"likeMasterStatus"	: "15",
    		"size"				: "100000",
    		"page"				: 0,
    		"_pageNumber"		: 0,
    		"_pageRow"			: "100000",
    		"useYn"				: "Y"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        if (!d[0].content) return;
        var url = "../apis/order/getPoMasterList",
	        params = {
	    		"_dateType"			: "orderDay",
	    		"startDay"			: "20000101",
	    		"endDay"			: $("#endDay").val(),
	    		"likeMasterStatus"	: "17",
	    		"size"				: "100000",
	    		"page"				: 0,
	    		"_pageNumber"		: 0,
	    		"_pageRow"			: "100000",
	    		"useYn"				: "Y"
	    	},
	        type = "POST";

	    sendAjax(url, params, type, function (dd) {
	    	console.log(d[0].content.length); console.log(dd[0].content.length);
	    	var kkk = d[0].content.length + dd[0].content.length;
	        if (!dd[0].content) return;
	        $("#order").html(kkk);
	    });

    });
}

function selectInputList() {
    var url = "../apis/order/getInventoryMasterListByMapper",
        params = {
    		"_dateType"		: "imsStockedDate",
    		"startDay"		: $("#startDay").val(),
    		"endDay"		: $("#endDay").val(),
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        // var dd=[];
        // for (var i = 0; i < d[0].content.length; i++){
        // 	for (var j = 0; j < d[0].content[i].inventoryDetailList.length; j++){
        // 		dd.push({
        // 		});
        // 	}
        // }
        $("#inventory").html(d.length);
    });
}

function selectOutputList() {
    var url = "../apis/inventory/getExInventoryList",
        params = {
    		"_dateType"		: "invenUsedListAddDtm",
    		"startDay"		: "20000101",
    		"endDay"		: $("#endDay").val(),
    		"imsuStatus"	: "60",
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        $("#output").html(d.length);
    });
}

function selectImpoMasterList() {
    var url = "../apis/customs/getImportStatusList",
        params = {
    		"_dateType"		: "Impo_singo_date_Day",
    		"startDay"		: $("#endDay").val(),
    		"endDay"		: $("#endDay").val(),
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        $("#import").html(d.length);
    });
}

function selectExpoMasterList() {
    var url = "../apis/customs/getExportStatusList",
        params = {
    		"_dateType"		: "expoOkDate_Day",
    		"startDay"		: $("#endDay").val(),
    		"endDay"		: $("#endDay").val(),
    		"size"			: "100000",
    		"page"			: 0,
    		"_pageNumber"	: 0,
    		"_pageRow"		: "100000",
    		"useYn"			: "Y"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        $("#export").html(d.length);
    });
}

function selectReToolList(){
    var url = "../apis/inventory/getFindReToolList",
        params = {
    		"_dateType"			: "imsImClearanceDate",
    		"startDay"			: "20170101",
    		"endDay"			: $("#endDay").val(),
    		"size"				: "100000",
    		"page"				: 0,
    		"_pageNumber"		: 0,
    		"_pageRow"			: "100000",
    		"imsdWorkOrderNo" 	: "678910",
    		"imsdStatus" 		: "30"
    	},
        type = "POST";

    sendAjax(url, params, type, function (d) {
        $("#reTool").html(d.length);
    });
}

$(document).ready(function () {
    $(function setDatePicker() {
        $.datepicker.setDefaults($.datepicker.regional['ko']);

        var dates = $("#startDay, #endDay").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            currentText: "오늘",
            dateFormat: 'yymmdd',
            onSelect: function (selectedDate) {
                var option = this.id == "startDay" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
                    .parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        });
    });
    var currentTime = new Date();
    var startDateFrom = new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));	// 일주일전
    $('#startDay').val($.datepicker.formatDate('yymmdd', startDateFrom));
    $('#endDay').val($.datepicker.formatDate('yymmdd', new Date()));

    if ($('#USERGRADE').val() == "B") {
    	$('#mView1').click(function(){});
    }else{
    	$('#mView1').click(function(){
    		parent.addTab("발주처리","../order/orderCheckList.geows");
        });
    }

    fn_searchAction();
//
//	if($("#GRADE").val()=="A" || $("#GRADE").val()=="B"){
//		$("#SYSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"SYS\")'><span>신규등록</span></a>");
//		$("#NEWSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"NEWS\")'><span>신규등록</span></a>");
//		$("#DeadType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
//		$("#PendType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
//		$("#DoType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
//	}
    selectOrderList();
    selectInputList();
    selectOutputList();
    selectImpoMasterList();
    selectExpoMasterList();
    selectReToolList();
});

var fn_searchAction = function () {
    getSystemList(drawSystemList);
    getNewsList(drawNewsList);
};

var drawSystemList = function (data) {
    var optList = new Array();
    for (var i = 0; i < 10; i++) {
        if (data[i]) {
            optList[optList.length] = "<tr><td style='height:30px;padding-top:5px;'><dl class='dl-horizontal'><dt><a onclick='javascript:fn_popAction(" + data[i].noticeKey + ",\"" + data[i].noticeCategory + "\")' data-toggle='tooltip' data-placement='bottom' title='" + data[i].subject + "'>" + data[i].subject + "</a></dt></dl></td><td class='text-right' style='height:30px;padding-top:5px;'>[" + data[i].addDtm.substr(0, 4) + "-" + data[i].addDtm.substr(4, 2) + "-" + data[i].addDtm.substr(6, 2) + "]</td></tr>";
        }
    }
    $("#SNotice").html(optList.join("\n"));
};

var drawNewsList = function (data) {
    var optList = new Array();
    for (var i = 0; i < 10; i++) {
        if (data[i]) {
            optList[optList.length] = "<tr><td style='height:30px;padding-top:5px;'><dl class='dl-horizontal'><dt><a onclick='javascript:fn_popAction(" + data[i].noticeKey + ",\"" + data[i].noticeCategory + "\")' data-toggle='tooltip' data-placement='bottom' title='" + data[i].subject + "'>" + data[i].subject + "</a></dt></dl></td><td class='text-right' style='height:30px;padding-top:5px;'>[" + data[i].addDtm.substr(0, 4) + "-" + data[i].addDtm.substr(4, 2) + "-" + data[i].addDtm.substr(6, 2) + "]</td></tr>";
        }
    }
    $("#NNotice").html(optList.join("\n"));
};

var fn_popAction = function (noticeKey, noticeCategory) {
    var url = './boardView.geows?noticeKey=' + noticeKey + '&noticeCategory=' + noticeCategory;

    window.open(url, "board", 'width=600,height=575,scrollbars=yes, location=no, menubar=no');
}