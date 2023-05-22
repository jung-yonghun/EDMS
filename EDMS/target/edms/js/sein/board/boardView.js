var console = window.console || {log:function(){}};
var sIds;

function getBoardList(data,callback){
	var url 	= "../apis/system/getSysNoticeList",
		params 	= {
			"noticeCategory": data,
			"size"			: "300",
    		"sort"			: [{"property":"noticeKey", "direction":"desc"}]
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d[0].content) return;
		callback(d[0].content);
	});
}

$(document).ready(function(){
	$(function setDataGrid() {
		$('#masterGrid').jqGrid({
			datatype 	: "local",
			cellsubmit 	: 'clientArray',
			editurl 	: 'clientArray',
			colModel 	: [
			            {label:'카테고리', name:'noticeCategory', index:'noticeCategory', width:80, align:'center', formatter:categoryFomatter},
			            {label:'제목', name:'subject', index:'subject', width:150, key: true},
			            {label:'등록자', name:'addUserNm', index:'addUserNm', width:80, align:'center'},
			            {label:'등록일', name:'addDtm', index:'addDtm', width:100, align:'center', formatter:dateFormatter},
			            {name:'noticeKey', index:'noticeKey', hidden:true},
			            {name:'contents', index:'contents', hidden:true},
			            {name:'fixNoticeYn', index:'fixNoticeYn', hidden:true},
			            {name:'startDay', index:'startDay', hidden:true},
			            {name:'endDay', index:'endDay', hidden:true},
			            {name:'searchKeyword', index:'searchKeyword', hidden:true},
			            {name:'addUserId', index:'addUserId', hidden:true},
			            {name:'useYn', index:'useYn', hidden:true},
			            {name:'hitCount', index:'hitCount', hidden:true}
			            ],
			emptyrecords 	: "조회내역 없음",
			loadtext 		: 'Loading...',
			rowNum 			: 10,
			height 			: 221,
			shrinkToFit 	: false,
			cellEdit 		: true,
            autowidth 		: true,
			rownumbers 		: true,
			viewrecords 	: true,
			loadonce 		: true,
			sortable 		: true,
			multiSort 		: true,
			gridview 		: true,
			pager 			: '#masterPager',
			recordtext 		: "전체: {2} 건",
			onSelectCell 	: function(rowId) {
				rowData = jQuery("#masterGrid").getRowData(rowId);
				fn_bindData(rowData.noticeKey);
			},
			beforeSelectRow	: function(rowid, e) {
		   	}
		});
		jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter:false, enableClear:false});
		resizeJqGridWidth('masterGrid', 'parentDiv', 0, true);
	});

	fn_searchAction(); // 리스트
	if (isEmpty($('#noticeKey').val())) return;
	fn_detailAction(); // 단건 상세
});

var fn_searchAction = function(){
	getBoardList($('#noticeCategory').val(),function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
	});
};

var fn_detailAction = function(){
	var url 	= "../apis/system/getSysNoticeOne",
		params 	= {"noticeKey":$('#noticeKey').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#subject").html("<span>" + d.subject + "</span>");
		$("#addUserNm").html("<span>" + d.addUserNm + "</span>");
		$("#addDtm").html("<span>" + d.addDtm.substr(0,4)+"-"+d.addDtm.substr(4,2)+"-"+d.addDtm.substr(6,2) + "</span>");
		$("#hitCount").html("<span>" + d.hitCount + "</span>");
		$("#contents").html(d.contents);
	});
};

function fn_bindData(noticeKey){
	var url 	= "../apis/system/getSysNoticeOne",
		params 	= {"noticeKey":noticeKey},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#subject").html("<span>" + d.subject + "</span>");
		$("#addUserNm").html("<span>" + d.addUserNm + "</span>");
		$("#addDtm").html("<span>" + d.addDtm.substr(0,4)+"-"+d.addDtm.substr(4,2)+"-"+d.addDtm.substr(6,2) + "</span>");
		$("#hitCount").html("<span>" + d.hitCount + "</span>");
		$("#contents").html(d.contents);
	});
}

function dateFormatter(cellValue, options, rowObject) {
	if (isEmpty(cellValue)) return "";
	cellValue = cellValue.substr(0,4)+"-"+cellValue.substr(4,2)+"-"+cellValue.substr(6,2);
	return cellValue;
}

function categoryFomatter(cellValue, options, rowdata, action) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        if (cellValue=="Edu") {
        	return "직원교육";
        }else{
            return "공지";
        }
    }
}