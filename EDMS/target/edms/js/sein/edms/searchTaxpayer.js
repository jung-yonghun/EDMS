function getTaxPayerSet(callback){
	var url 	= "../apis/edms/getUserTeamCustomerInfoList",
		params 	= {
					"utTeamCode"	: $("#utTeamCode").val(),
					"utTeamSeq"		: $("#utTeamSeq").val(),
					"utTeamName"	: $("#utTeamName").val(),
					"utcUseYn"		: $("#utcUseYn").val(),
					"size"			: "20000"
				  },
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		if(d.content.length==0){
			$("#totalcnt").val("0");
		}else{
			$("#totalcnt").val(d.totalElements);
		}
		callback(d.content);
	});
}

function getTaxPayerSet1(callback){
	var url 	= "../apis/edms/getUserTeamCustomerInfoList",
		params 	= {
					"utTeamCode"	: $("#utTeamCode").val(),
					"utTeamSeq"		: $("#utTeamSeq").val(),
					"utTeamName"	: $("#utTeamName").val(),
					"utcUseYn"		: $("#utcUseYn").val(),
					"utcTradeCode"	: $("#utcTradeCode").val(),
					"utcTradeName"	: $("#utcTradeName").val(),
					"size"			: "20000"
				  },
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		if(d.content.length==0){
			$("#totalcnt").val("0");
		}else{
			$("#totalcnt").val(d.totalElements);
		}
		callback(d.content);
	});
}

$(document).ready(function(){
	$(function setDataGrid(){
		$('#masterGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl 		: 'clientArray',
			colModel 		: [
	            {name:'utcTradeKey', index:'utcTradeKey', hidden:true, key:true},
	            {name:'utcTradeDb', index:'utcTradeDb', hidden:true,},
	            {name:'utcEntrepreneurNo', index:'utcEntrepreneurNo', hidden:true,},
	            {label:'코드', name:'utcTradeCode', index:'utcTradeCode', align:'center', width:40},
	            {label:'업체명', name:'utcTradeName', index:'utcTradeName', width:170}
				              ],
			emptyrecords 	: "조회내역 없음",
			loadtext 		: 'Loading...',
			height 			: 226,
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

	});

	$("#utcTradeCode").bind("keyup", function (e){
	    if (e.which >= 97 && e.which <= 122) {
	        var newKey = e.which - 32;
	        e.keyCode = newKey;
	        e.charCode = newKey;
	    }

	    $("#utcTradeCode").val(($("#utcTradeCode").val()).toUpperCase());
	});

	fn_searchAction();
});

var fn_searchAction = function(){
	getTaxPayerSet(function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
	});
};

var fn_searchAction1 = function(){
	getTaxPayerSet1(function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
	});
};

var keyDown = function(){
    if (event.keyCode == 13) fn_searchAction1();
};

var fn_Action = function(d){
	if($('#searchGubun').val()=="Delivery"){
		opener.document.frm.imsTaxpayerNum.value 		= d.utcEntrepreneurNo;
		opener.document.frm.imsTaxpayerKey.value 		= d.utcTradeKey;
		opener.document.frm.imsTaxpayerDb.value 		= d.utcTradeDb;
		opener.document.frm.imsTaxpayerCode.value 		= d.utcTradeCode;
		opener.document.frm.imsTaxpayerTradeName.value 	= d.utcTradeName;
	}else{
		opener.document.notForm.edmsComNum.value 	= d.utcEntrepreneurNo;
		opener.document.notForm.edmsComKey.value 	= d.utcTradeKey;
		opener.document.notForm.jisaCode.value 		= d.utcTradeDb;
		opener.document.notForm.edmsComCode.value 	= d.utcTradeCode;
		opener.document.notForm.edmsComName.value 	= d.utcTradeName;
	}
	window.close();
};