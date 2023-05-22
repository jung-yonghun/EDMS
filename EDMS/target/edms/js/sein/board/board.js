var console = window.console || {log:function(){}};
var sIds;

function getSystemList(callback) {
	var url = "../apis/system/getNoticeList"
		,params = $("#frm2").serializeObject()
		,type = "POST";

	sendAjax(url, params, type, function(d) {
		if(!d.content) return;
		callback(d.content);
	});
}

function getNewsList(callback) {
	var url = "../apis/system/getNoticeList"
		,params = $("#frm4").serializeObject()
		,type = "POST";

	sendAjax(url, params, type, function(d) {
		if(!d.content) return;
		callback(d.content);
	});
}

function getDeadList(callback) {
	var url = ""
		,params = $("#frm1").serializeObject()
		,type = "POST";

	sendAjax(url, params, type, function(d) {
		if(!d.content) return;
		callback(d.content);
	});
}

function getPendList(callback) {
	var url = ""
		,params = $("#frm3").serializeObject()
		,type = "POST";

	sendAjax(url, params, type, function(d) {
		if(!d.content) return;
		callback(d.content);
	});
}

function getDoList(callback) {
	var url = ""
		,params = $("#frm5").serializeObject()
		,type = "POST";

	sendAjax(url, params, type, function(d) {
		if(!d.content) return;
		callback(d.content);
	});
}

$(document).ready(function() {
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	var dates = $("#date").datepicker({
		dateFormat : 'yymmdd'
	});

	$(function setDataGrid() {
		$('#deadlineGrid').jqGrid({
			datatype : "local",
			cellsubmit: 'clientArray',
			editurl: 'clientArray',
		    cellEdit: true,
			colModel : [
			            ],
			height : 150,
            autowidth: true,
			shrinkToFit: false,
			loadtext : 'Loading...',
			emptyrecords : "조회내역 없음",
			rownumbers: true,
			viewrecords : true,
			loadonce: true,
			sortable: true,
			multiSort: true,
			gridview : true,
			rowNum: _defaultRowNum,
			pager : '#deadlinePager',
			recordtext: "전체: {2} 건",
			ondblClickRow: function(rowid, e) {
		   		rowData = jQuery("#deadlineGrid").getRowData(rowid);
		   		sIds = rowid;
		   	},
			beforeSelectRow: function(rowid, e) {
		   		rowData = jQuery("#deadlineGrid").getRowData(rowid);
		   		sIds = rowid;
		   	}
		});
		resizeJqGridWidth('deadlineGrid', 'parentDiv', 0, false); // 그리드 리사이즈

		$('#masterGrid').jqGrid({
			datatype : "local",
			cellsubmit: 'clientArray',
			editurl: 'clientArray',
		    cellEdit: true,
			colModel : [
			            {label: '제목',name:'subject', index:'subject', width:400, formatter:customBoldFontFormatter},
						{label: '조회수', name:'inquiryCount', index:'inquiryCount', width:80, align: "right", formatter:customBoldFontFormatter},
			            {name:'addUserId', index:'addUserId', hidden: true},
			            {name:'addDate', index:'addDate', hidden: true},
			            {name:'inquiryCount', index:'inquiryCount', hidden: true},
			            {name:'fileAttachedYn', index:'fileAttachedYn', hidden: true},
			            {name:'noticesKey', index:'noticesKey', hidden: true},
						{name:'noticesYn', index:'noticesYn', hidden: true}
			            ],
			height : 150,
            autowidth: true,
			shrinkToFit: false,
			loadtext : 'Loading...',
			emptyrecords : "조회내역 없음",
			rownumbers: true,
			viewrecords : true,
			loadonce: true,
			sortable: true,
			multiSort: true,
			gridview : true,
			rowNum: _defaultRowNum,
			pager : '#masterPager',
			recordtext: "전체: {2} 건",
			ondblClickRow: function(rowid, e) {
		   		rowData = jQuery("#masterGrid").getRowData(rowid);
		   		fn_popAction(rowData.noticesKey);
		   		sIds = rowid;
		   	},
			beforeSelectRow: function(rowid, e) {
				jQuery("#masterGrid").jqGrid('resetSelection');
		   		rowData = jQuery("#masterGrid").getRowData(rowid);
		   		sIds = rowid;
		   	}
		});
		//jQuery("#masterGrid").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});

		resizeJqGridWidth('masterGrid', 'parentDiv1', 0, false); // 그리드 리사이즈

		$('#newsGrid').jqGrid({
			datatype : "local",
			cellsubmit: 'clientArray',
			editurl: 'clientArray',
		    cellEdit: true,
			colModel : [
			            {name:'noticesKey', index:'noticesKey', hidden: true},
			            {label: '제목',name:'subject', index:'subject', width:400, formatter:customBoldFontFormatter},
						{label: '조회수',name:'inquiryCount', index:'inquiryCount', width:80, align:'right', formatter:customBoldFontFormatter},
			            {label: '작성자',name:'addUserId', index:'addUserId', width:70, align:'center', hidden: true},
			            {label: '등록일',name:'addDate', index:'addDate', width:100, align:'center', formatter: dateFormatter, hidden: true},
			            {label: '첨부',name:'fileAttachedYn', index:'fileAttachedYn', width:40, align:'center', hidden: true},
						{name:'noticesYn', index:'noticesYn', hidden: true}
			            ],
			height : 150,
            autowidth: true,
			shrinkToFit: false,
			loadtext : 'Loading...',
			emptyrecords : "조회내역 없음",
			rownumbers: true,
			viewrecords : true,
			loadonce: true,
			sortable: true,
			multiSort: true,
			gridview : true,
			rowNum: _defaultRowNum,
			pager : '#newsPager',
			recordtext: "전체: {2} 건",
			ondblClickRow: function(rowid, e) {
		   		rowData = jQuery("#newsGrid").getRowData(rowid);
		   		fn_popNewsAction(rowData.noticesKey);
		   		sIds = rowid;
		   	},
			beforeSelectRow: function(rowid, e) {
				jQuery("#newsGrid").jqGrid('resetSelection');
		   		rowData = jQuery("#newsGrid").getRowData(rowid);
		   		sIds = rowid;
		   	}
		});
		//jQuery("#newsGrid").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});

		resizeJqGridWidth('newsGrid', 'parentDiv3', 0, false); // 그리드 리사이즈

		$('#PendGrid').jqGrid({
			datatype : "local",
			cellsubmit: 'clientArray',
			editurl: 'clientArray',
		    cellEdit: true,
			colModel : [
			            ],
			height : 170,
            autowidth: true,
			shrinkToFit: false,
			loadtext : 'Loading...',
			emptyrecords : "조회내역 없음",
			rownumbers: true,
			viewrecords : true,
			loadonce: true,
			sortable: true,
			multiSort: true,
			gridview : true,
			rowNum: _defaultRowNum,
			pager : '#PendPager',
			recordtext: "전체: {2} 건",
			ondblClickRow: function(rowid, e) {
		   		rowData = jQuery("#PendGrid").getRowData(rowid);
		   		sIds = rowid;
		   	},
			beforeSelectRow: function(rowid, e) {
		   		rowData = jQuery("#PendGrid").getRowData(rowid);
		   		sIds = rowid;
		   	}
		});
		resizeJqGridWidth('PendGrid', 'parentDiv2', 0, false); // 그리드 리사이즈

		$('#DoGrid').jqGrid({
			datatype : "local",
			cellsubmit: 'clientArray',
			editurl: 'clientArray',
		    cellEdit: true,
			colModel : [
			            ],
			height : 170,
            autowidth: true,
			shrinkToFit: false,
			loadtext : 'Loading...',
			emptyrecords : "조회내역 없음",
			rownumbers: true,
			viewrecords : true,
			loadonce: true,
			sortable: true,
			multiSort: true,
			gridview : true,
			rowNum: _defaultRowNum,
			pager : '#DoPager',
			recordtext: "전체: {2} 건",
			ondblClickRow: function(rowid, e) {
		   		rowData = jQuery("#DoGrid").getRowData(rowid);
		   		sIds = rowid;
		   	},
			beforeSelectRow: function(rowid, e) {
		   		rowData = jQuery("#DoGrid").getRowData(rowid);
		   		sIds = rowid;
		   	}
		});
		resizeJqGridWidth('DoGrid', 'parentDiv4', 0, false); // 그리드 리사이즈

	});

	fn_searchAction();

	if($("#GRADE").val()=="A"){
		$("#SYSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"SYS\")'><span>신규등록</span></a>");
		$("#NEWSType").html("<a class='rbtn save' href='javascript:fn_newAction(\"NEWS\")'><span>신규등록</span></a>");
		$("#DeadType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
		$("#PendType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
		$("#DoType").html("<a class='rbtn save' href='javascript:#'><span>Excel Down</span></a>");
	}
});

var fn_searchAction = function () {
	getSystemList(function(d) {
		$('#masterGrid').clearGridData()
			.setGridParam({
				data: d
		}).trigger('reloadGrid');
	});

	getNewsList(function(d) {
		$('#newsGrid').clearGridData()
			.setGridParam({
				data: d
		}).trigger('reloadGrid');
	});

//	getDeadList(function(d) {
//		$('#deadlineGrid').clearGridData()
//			.setGridParam({
//				data: d
//		}).trigger('reloadGrid');
//	});
//
//	getPendList(function(d) {
//		$('#PendGrid').clearGridData()
//			.setGridParam({
//				data: d
//		}).trigger('reloadGrid');
//	});
//
//	getDoList(function(d) {
//		$('#DoGrid').clearGridData()
//			.setGridParam({
//				data: d
//		}).trigger('reloadGrid');
//	});

	dateCheck();
};

function dateCheck() {
	var params = {"date":$("#date").val()};
	$.ajax({
		type : "POST",
		contentType : "application/json",
		dataType : 'json',
		url : "../apis/common/getStandardExchangeRateList",
		processData : false,
		data : JSON.stringify(params),
		beforeSend: function(xhr){
			xhr.setRequestHeader(csrfHeader, csrfToken);
		},
		success : function(returnValue, textStatus, jqXHR) {
			$("#date_from").html(returnValue.content[0].fromStandardExchangeRateDate.substr(0,4)+"-"+returnValue.content[0].fromStandardExchangeRateDate.substr(4,2)+"-"+returnValue.content[0].fromStandardExchangeRateDate.substr(6,2));
			$("#date_to").html(returnValue.content[0].toStandardExchangeRateDate.substr(0,4)+"-"+returnValue.content[0].toStandardExchangeRateDate.substr(4,2)+"-"+returnValue.content[0].toStandardExchangeRateDate.substr(6,2));
			$("#usd_e").html(returnValue.content[1].USD);
			$("#usd_i").html(returnValue.content[0].USD);
			$("#jpy_e").html(returnValue.content[1].JPY);
			$("#jpy_i").html(returnValue.content[0].JPY);
			$("#eur_e").html(returnValue.content[1].EUR);
			$("#eur_i").html(returnValue.content[0].EUR);
			$("#cny_e").html(returnValue.content[1].CNY);
			$("#cny_i").html(returnValue.content[0].CNY);
		},
		error : function(e) {
			alert(e.responseText);
			return -1;
		}
	});
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

var fn_popAction = function (noticesKey) {
	openWindowWithPost("./boardView.sein","width=800, height=800, scrollbars=yes, location=no, menubar=no", "board" ,{
		"noticesKey" : noticesKey,
		"selrow" : jQuery("#masterGrid").jqGrid('getGridParam','selrow'),
		"pageNum" : jQuery("#masterGrid").getGridParam('page')
	});
}

var fn_popNewsAction = function (noticesKey) {
	openWindowWithPost("./boardView.sein","width=800, height=800, scrollbars=yes, location=no, menubar=no", "board" ,{
		"noticesKey" : noticesKey,
		"selrow" : jQuery("#newsGrid").jqGrid('getGridParam','selrow'),
		"pageNum" : jQuery("#newsGrid").getGridParam('page')
	});
}

var fn_newAction = function (category) {
	openWindowWithPost("./boardInsert.sein","width=800, height=800, scrollbars=no, location=no, menubar=no", "board" ,{
		"category" : category
	});
}

function dateFormatter(cellValue, options, rowObject) {
	if (isEmpty(cellValue)) return "";
	return convertUnixDate(cellValue).substring(0,10);
}

function refreshGrid(selrow, pageNum) {
	getSystemList(function(d) {
		$('#masterGrid').clearGridData()
			.setGridParam({
				data: d
		}).trigger('reloadGrid');
		jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
	});
}

function refreshGrid1(selrow, pageNum) {
	getNewsList(function(d) {
		$('#newsGrid').clearGridData()
			.setGridParam({
				data: d
		}).trigger('reloadGrid');
		jQuery("#newsGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#newsGrid").jqGrid('setSelection', selrow, true);
	});
}

function customBoldFontFormatter(cellValue, options, rowObject) {
	if (rowObject.noticesYn == "Y") {
		return "<span style='font-weight: bold;'>" + cellValue + "</span>";
	} else {
		return cellValue;
	}
}