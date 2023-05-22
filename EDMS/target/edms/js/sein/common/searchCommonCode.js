var console = window.console || {log:function(){}};
var sIds;

function getCommonCodeList(callback){
	var url 	= "../apis/common/getCmmnCodeList",
		params 	= {"mCode":$("#commonCode").val(),"size":"200"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		callback(d.content);
	});
}

$(document).ready(function(){
	var pageWidth = parseInt($('#commonCode').width());
	$(function setDataGrid(){
		var caption = "";
		if($("#commonCode").val()=="X00002"){
			caption ="자재마스터 이력관리"
		}
		$('#masterGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl 		: 'clientArray',
			colModel 		: [
					            {label:'코드', name:'CODE', index:'CODE', width:(pageWidth*(25/100)), align:'center', key:true},
					            {label:'코드명', name:'NAME', index:'NAME', width:(pageWidth*(65/100))},
					          ],
			caption 		: caption,
			emptyrecords 	: "조회내역 없음",
			loadtext 		: 'Loading...',
			height 			: 225,
			rowNum 			: 10,
			shrinkToFit 	: false,
			scroll 			: false,
			autowidth 		: true,
			cellEdit 		: true,
			rownumbers 		: true,
			viewrecords 	: true,
			loadonce 		: true,
			sortable 		: true,
			multiSort 		: true,
			gridview 		: true,
			pager 			: '#masterPager',
			recordtext 		: "",
			ondblClickRow 	: function(rowid, e) {
		   		rowData = jQuery("#masterGrid").getRowData(rowid);
		   		fn_Action(rowData);
		   		sIds = rowid;
		   	},
		});
		jQuery("#masterGrid").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
	});

	fn_searchAction();
});

var fn_searchAction = function(){
	getCommonCodeList(function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
	});
};

var fn_Action = function(d){
	if($("#commonCode").val()=="X00002"){
		opener.document.frm3.notYogSayuCd.value = d.CODE;
	}
	window.close();
};