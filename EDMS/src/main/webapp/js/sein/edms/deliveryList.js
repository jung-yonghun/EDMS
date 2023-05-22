function selectDeliveryList(callback){
	progress.show();
	var url 	= "../apis/userInfo/getUserTeamInfoList",
		params 	= {
			"size" 			: $("#frm1 #size").val(),
			"page" 			: $("#frm1 #page").val(),
			"_pageRow" 		: $("#frm1 #_pageRow").val(),
			"_pageNumber" 	: $("#frm1 #_pageNumber").val(),
			"urUserId" 		: $("#frm1 #USERID").val(),
			"utUseYn"		: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		var aaa = "";
		for(var i=0; i<d.content.length; i++){
			aaa += d.content[i].teamCode+",";
		}
		aaa = aaa.slice(0, -1);

		var url 	= "../apis/userInfo/getUserTeamInfoList",
			params 	= {
				"size" 			: $("#frm1 #size").val(),
				"page" 			: $("#frm1 #page").val(),
				"_pageRow" 		: $("#frm1 #_pageRow").val(),
				"_pageNumber" 	: $("#frm1 #_pageNumber").val(),
				"teamCode" 		: aaa,
				"utUseYn"		: "Y"
			},
			type 	= "POST";

		sendAjax(url, params, type, function(dd){
			var bbb = "";
			for(var i=0; i<dd.content.length; i++){
				bbb += dd.content[i].urUserId+",";
			}
			bbb = bbb.slice(0, -1);

			var url 	= "../apis/edms/getImportDeliveryRequestList",
				params 	= {
					"size" 						: $("#frm1 #size").val(),
					"page" 						: $("#frm1 #page").val(),
					"_pageRow" 					: $("#frm1 #_pageRow").val(),
					"_pageNumber" 				: $("#frm1 #_pageNumber").val(),
					"workNm" 					: $("#frm1 #workNm").val(),
					"mappGubun" 				: $("#frm1 #mappGubun").val(),
					"useYn" 					: $("#frm1 #useYn").val(),
					"yymmddhhmmss" 				: $("#frm1 #yymmddhhmmss").val(),
					"USERID" 					: bbb,
					"USERGRADE" 				: $("#frm1 #USERGRADE").val(),
					"customerTaxNo" 			: $("#frm1 #customerTaxNo").val(),
					"customerCode" 				: $("#frm1 #customerCode").val(),
					"_userGrade" 				: $("#frm1 #_userGrade").val(),
					"_DateType" 				: $("#frm1 #_dateType").val(),
					"strFromDate" 				: $("#frm1 #strFromDate").val(),
					"strToDate" 				: $("#frm1 #strToDate").val()+"235959",
					"customerNm" 				: $("#frm1 #customerNm").val(),
					"hblNo" 					: $("#frm1 #hblNo").val(),
					"deliveryCoNm" 				: $("#frm1 #deliveryCoNm").val(),
					"deliveryCarryingInNm" 		: $("#frm1 #deliveryCarryingInNm").val(),
					"deliveryStatus" 			: $("#frm1 #deliveryStatus").val(),
					"sort"	: [{"property":"sDAB100Key", "direction":"desc"}]
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				progress.hide();
				if(!d) return;
				callback(d);
			});
		});
	});
}

function selectDeliveryAdminList(callback){
	progress.show();
	var url 	= "../apis/edms/getImportDeliveryRequestList",
		params 	= {
			"size" 						: $("#frm1 #size").val(),
			"page" 						: $("#frm1 #page").val(),
			"_pageRow" 					: $("#frm1 #_pageRow").val(),
			"_pageNumber" 				: $("#frm1 #_pageNumber").val(),
			"workNm" 					: $("#frm1 #workNm").val(),
			"mappGubun" 				: $("#frm1 #mappGubun").val(),
			"useYn" 					: $("#frm1 #useYn").val(),
			"yymmddhhmmss" 				: $("#frm1 #yymmddhhmmss").val(),
			"USERGRADE" 				: $("#frm1 #USERGRADE").val(),
			"customerTaxNo" 			: $("#frm1 #customerTaxNo").val(),
			"customerCode" 				: $("#frm1 #customerCode").val(),
			"_userGrade" 				: $("#frm1 #_userGrade").val(),
			"_DateType" 				: $("#frm1 #_dateType").val(),
			"strFromDate" 				: $("#frm1 #strFromDate").val(),
			"strToDate" 				: $("#frm1 #strToDate").val()+"235959",
			"customerNm" 				: $("#frm1 #customerNm").val(),
			"hblNo" 					: $("#frm1 #hblNo").val(),
			"deliveryCoNm" 				: $("#frm1 #deliveryCoNm").val(),
			"deliveryCarryingInNm" 		: $("#frm1 #deliveryCarryingInNm").val(),
			"deliveryStatus" 			: $("#frm1 #deliveryStatus").val(),
			"sort"	: [{"property":"sDAB100Key", "direction":"desc"}]
		},
		type 	= "POST";
console.log(params);
	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		if(!d) return;
		callback(d);
	});
}

//********** 파일 리스트 **********//
function selectFileList(code, callback){
	var url 	= "../apis/edms/getEdmsFileInfoList",
		params 	= {
			"edmsParentKey"	: code,
			"useYn"			: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
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

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates = $("#strFromDate, #strToDate").datepicker({
			changeMonth : true,
			changeYear : true,
			showButtonPanel : true,
			currentText: "오늘",
			dateFormat : 'yymmdd',
			onSelect : function(selectedDate) {
				var option = this.id == "strFromDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates.not(this).datepicker("option", option, date);
			}
		});
	});

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
	var yymmddhhmmss = $.datepicker.formatDate('yymmdd', new Date())+""+curr_hour+""+curr_min+""+curr_sec;
	$('#yymmddhhmmss').val(yymmddhhmmss);

	$(function setDataGrid() {
		$('#masterGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
		    cellEdit 		: true,
			colModel 		: [
	            {name:'sdab100Key', index:'sdab100Key', hidden:true, key: true},
	            {
                    label: '배송정보', name: 'deliveryStatus', index: 'deliveryStatus', width: 60, align: 'center',
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {value: "20:운송의뢰;30:배차요청;40:배차완료;50:배송중;60:배송완료;", defaultValue: "0"},
                    stype: 'select',
                    searchoptions: {sopt: ['eq'], value: ':전체;20:운송의뢰;30:배차요청;40:배차완료;50:배송중;60:배송완료'}
                },
                {label:'수입자', name:'customerNm', index:'customerNm', width:200},
	            {label:'B/L No.', name:'hblNo', index:'hblNo', width:120, formatter:linkBlNoFormatter},
	            {label:'신고번호', name:'singoNo', index:'singoNo', width:120, align:'center', formatter:linkSingoFormatter},
	            {label:'수리일', name:'suriDtm', index:'suriDtm', width:120, align:'center', formatter:linkDateFormatter},
	            {label:'온도조건', name:'banipPlace', index:'banipPlace', width:60, align:'center'},
	            {label:'사이즈', name:'cargoSize', index:'cargoSize', width:50, align:'center'},
	            {label:'의뢰포장수량', name:'deliveryPojangSu', index:'deliveryPojangSu', width:70, align:'right', formatter:'number', formatoptions:{decimalPlaces:0, thousandsSeparator:","}},
	            {label:'의뢰중량', name:'deliveryJung', index:'deliveryJung', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces:3, thousandsSeparator:","}},
	            {label:'접수자', name:'assignMan', index:'assignMan', width:60, align:'center'},
	            {label:'연락처', name:'assignPhone', index:'assignPhone', width:80, align:'center'},
	            {label:'운송업체', name:'deliveryCoNm', index:'deliveryCoNm', width:150, align:'center'},
	            {label:'연락처', name:'deliveryCoPhone', index:'deliveryCoPhone', width:90, align:'center'},
	            {label:'기사명', name:'deliveryCarNm', index:'deliveryCarNm', width:70, align:'center'},
	            {label:'기사연락처', name:'deliveryCarPhone', index:'deliveryCarPhone', width:90, align:'center'},
	            {label:'차량번호', name:'deliveryCarNo', index:'deliveryCarNo', width:90, align:'center'},
	            {label:'도착예정시간', name:'arrivalTime', index:'arrivalTime', width:90, align:'center'},
	            {label:'착지명', name:'deliveryCarryingInNm', index:'deliveryCarryingInNm', width:150, align:'center'},
	            {label:'담당자', name:'deliveryCarryingInMan', index:'deliveryCarryingInMan', width:60, align:'center'},
	            {label:'연락처', name:'deliveryCarryingInPhone', index:'deliveryCarryingInPhone', width:100, align:'center'},
	            {label:'Damage', name:'damage', index:'damage', width:40, align:'center'},
	            {name:'requestMan', index:'requestMan', hidden:true},
	            {name:'requestDtm', index:'requestDtm', hidden:true},
	            {name:'landingArea', index:'landingArea', hidden:true},
	            {name:'deliveryPojangDanwi', index:'deliveryPojangDanwi', hidden:true},
	            {name:'deliveryJungDanwi', index:'deliveryJungDanwi', hidden:true},
	            {name:'deliveryStDtm', index:'deliveryStDtm', hidden:true},
	            {name:'sdabmngNo', index:'sdabmngNo', hidden:true},
	            {name:'customerDB', index:'customerDB', hidden:true},
	            {name:'customerCode', index:'customerCode', hidden:true},
	            {name:'customerTaxNo', index:'customerTaxNo', hidden:true},
	            {name:'mblNo', index:'mblNo', hidden:true},
	            {name:'cargoNo', index:'cargoNo', hidden:true},
	            {name:'singoDtm', index:'singoDtm', hidden:true},
	            {name:'cargoStatus', index:'cargoStatus', hidden:true},
	            {name:'pojangSu', index:'pojangSu', hidden:true},
	            {name:'pojangDanwi', index:'pojangDanwi', hidden:true},
	            {name:'totalJung', index:'totalJung', hidden:true},
	            {name:'jungDanwi', index:'jungDanwi', hidden:true},
	            {name:'impoSegwan', index:'impoSegwan', hidden:true},
	            {name:'impoJangchBuho', index:'impoJangchBuho', hidden:true},
	            {name:'impoJangchNm', index:'impoJangchNm', hidden:true},
	            {name:'impoJangchJangso', index:'impoJangchJangso', hidden:true},
	            {name:'impoBanipDtm', index:'impoBanipDtm', hidden:true},
	            {name:'requestCoNm', index:'requestCoNm', hidden:true},
	            {name:'requestPhone', index:'requestPhone', hidden:true},
	            {name:'requestNote', index:'requestNote', hidden:true},
	            {name:'requestInvisibleNote', index:'requestInvisibleNote', hidden:true},
	            {name:'deliveryDtm', index:'deliveryDtm', hidden:true},
	            {name:'assignId', index:'assignId', hidden:true},
	            {name:'allocateRequestDtm', index:'allocateRequestDtm', hidden:true},
	            {name:'deliveryCoMngNo', index:'deliveryCoMngNo', hidden:true},
	            {name:'deliveryCoEmail', index:'deliveryCoEmail', hidden:true},
	            {name:'deliveryCarryingInKey', index:'deliveryCarryingInKey', hidden:true},
	            {name:'deliveryCarryingInTaxNo', index:'deliveryCarryingInTaxNo', hidden:true},
	            {name:'deliveryCarryingInEmail', index:'deliveryCarryingInEmail', hidden:true},
	            {name:'deliveryCarryingInFax', index:'deliveryCarryingInFax', hidden:true},
	            {name:'deliveryCarryingInMobile', index:'deliveryCarryingInMobile', hidden:true},
	            {name:'deliveryCarryingInAddr', index:'deliveryCarryingInAddr', hidden:true},
	            {name:'allocateDtm', index:'allocateDtm', hidden:true},
	            {name:'deliveryCarMngNo', index:'deliveryCarMngNo', hidden:true},
	            {name:'deliveryEdDtm', index:'deliveryEdDtm', hidden:true},
	            {name:'damageDetail', index:'damageDetail', hidden:true},
	            {name:'arrivalTime', index:'arrivalTime', hidden:true}
			],
			height 			: 408,
			rowNum 			: 20,
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
            autowidth 		: true,
			shrinkToFit 	: false,
			rownumbers 		: true,
			viewrecords 	: true,
			loadonce 		: true,
			sortable 		: true,
			multiSort 		: true,
			gridview 		: true,
			multiselect		: true,
			pager 			: '#masterPager',
			recordtext 		: "전체: {2} 건",
			onSelectCell 	: function(rowid, e) {
		   		rowData = jQuery("#masterGrid").getRowData(rowid);
		   		fn_bindData(rowData);
		   		fn_fileListImportAction(rowData);
		   	},
		   	beforeSelectRow: function (rowid, e) {
            	rowData = jQuery("#masterGrid").getRowData(rowid);
                sIds = rowid;

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
                    $('#masterGrid').saveCell(iRow, iCol);
                });
            }
		});

		jQuery("#masterGrid").jqGrid('setGroupHeaders',{
			  useColSpanStyle	: true,
			  groupHeaders		:[
				{startColumnName: 'assignMan', numberOfColumns: 2, titleText: '<center>접수정보</center>'},
				{startColumnName: 'deliveryCoNm', numberOfColumns: 6, titleText: '<center>운송사정보</center>'},
				{startColumnName: 'deliveryCarryingInNm', numberOfColumns: 3, titleText: '<center>착지정보</center>'}
			  ]
		});

		jQuery("#masterGrid").jqGrid('filterToolbar',{ searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid', 'parentDiv', 0, false); // 그리드 리사이즈

		$('#fileGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {name:'SDAAKey', index:'SDAAKey', hidden:true, key: true},
	            {label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:60, align:'center',
	            	edittype:'select',
	            	formatter: 'select',
	            	editable:true,
	            	editoptions:{value: "Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타", defaultValue: "Z0001"},
	            	stype: 'select',
                    searchoptions: {sopt: ['eq'], value: ':전체;Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타'}
	            },
	            {label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:200},
	            {label:'열기', name:'', index:'', width:30, align:'center', formatter:linkDownloadNotFormatter},
	            {label:'삭제', name:'', index:'', width:30, align:'center', formatter:linkDelNotFormatter},
	            {name:'AddUserId', index:'AddUserId', hidden:true},
	            {name:'EdmsParentGbn', index:'EdmsParentGbn', hidden:true},
	            {name:'EdmsParentKey', index:'EdmsParentKey', hidden:true},
	            {name:'AddDay', index:'AddDay', hidden:true},
	            {name:'EdmsFileStatus', index:'EdmsFileStatus', hidden:true},
	            {name:'UseYn', index:'UseYn', hidden:true},
	            {name:'EdmsFileNote', index:'EdmsFileNote', hidden:true},
	            {name:'EdmsSaveFileNm', index:'EdmsSaveFileNm', hidden:true},
	            {name:'EdmsFileSize', index:'EdmsFileSize', hidden:true},
	            {name:'EdmsFilePath', index:'EdmsFilePath', hidden:true},
	            {name:'EdmsFileAddUserId', index:'EdmsFileAddUserId', hidden:true},
	            {name:'EdmsFileExt', index:'EdmsFileExt', hidden:true},
	            {name:'EdmsSearchKeyword', index:'EdmsSearchKeyword', hidden:true}
			],
	        height 			: 363,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false, //상단메뉴 이동
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid").getRowData(rowid);
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
		   		rowData = jQuery("#fileGrid").getRowData(rowid);
		   		sIds 	= rowid;
			}
		});
		jQuery("#fileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid', 'parentDiv2', 0, false);
	});

	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

	getCmmnCodeList({"mCode": 'D00002', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawConList);
	getCmmnCodeList({"mCode": 'D00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawTempList);

	initTabs();
	fn_searchAction();
});

var initTabs = function(){
	$(function(){
		$("#tabs").tabs().on("tabsactivate", function(event, ui){
			var active = $('#tabs').tabs('option', 'active');
			switch (active){
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				default:
					fn_searchAction();
					break;
			}
		});
	});
};

function refreshGridPage(selrow, pageNum){
	selectDeliveryList(function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
		jQuery("#masterGrid").trigger("reloadGrid", [{page:pageNum}]);
		jQuery("#masterGrid").jqGrid('setSelection', selrow, true);
	});
}

var fn_searchAction = function(){
	if($('#USERGRADE').val() == "A" || $('#USERGRADE').val() == "B"){
		selectDeliveryAdminList(function(d) {
			$('#masterGrid').clearGridData().setGridParam({
				data	: d
			}).trigger('reloadGrid');
		});

		$("#insertForm").each(function(){
			this.reset();
		});

		$('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
	}else{
		selectDeliveryList(function(d) {
			$('#masterGrid').clearGridData().setGridParam({
				data	: d
			}).trigger('reloadGrid');
		});

		$("#insertForm").each(function(){
			this.reset();
		});

		$('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
	}

	$("#viewForm #requestMan").html("");
	$("#viewForm #requestDtm").html("");
	$("#viewForm #assignMan").html("");
	$("#viewForm #allocateRequestDtm").html("");
	$("#viewForm #deliveryCoNm").html("");
	$("#viewForm #allocateDtm").html("");
	$("#viewForm #deliveryCarNm").html("");
	$("#viewForm #deliveryStDtm").html("");
	$("#viewForm #deliveryCarEndNm").html("");
	$("#viewForm #deliveryEdDtm").html("");
};

function fn_bindData(d){
	console.log(d);
	$("#viewForm #requestMan").html("");
	$("#viewForm #requestDtm").html("");
	$("#viewForm #assignMan").html("");
	$("#viewForm #allocateRequestDtm").html("");
	$("#viewForm #deliveryCoNm").html("");
	$("#viewForm #allocateDtm").html("");
	$("#viewForm #deliveryCarNm").html("");
	$("#viewForm #deliveryStDtm").html("");
	$("#viewForm #deliveryCarEndNm").html("");
	$("#viewForm #deliveryEdDtm").html("");

	$("#insertForm #hblNo").val(d.hblNo.substring(39).replace("</a></u></b>", ""));
    $("#insertForm #singoNo").val(d.singoNo.replace(/-/gi,""));
    $("#insertForm #pojangSu").val(d.pojangSu);
    $("#insertForm #pojangDanwi").val(d.pojangDanwi);
    $("#insertForm #totalJung").val(d.totalJung);
    $("#insertForm #jungDanwi").val(d.jungDanwi);
    $("#insertForm #impoSegwan").val(d.impoSegwan);
    $("#insertForm #impoJangchBuho").val(d.impoJangchBuho);
    $("#insertForm #impoJangchNm").val(d.impoJangchNm);
    $("#insertForm #impoJangchJangso").val(d.impoJangchJangso);
    $("#insertForm #impoBanipDtm").val(d.impoBanipDtm);
    $("#insertForm #requestCoNm").val(d.requestCoNm);
    $("#insertForm #requestDtm").val(d.requestDtm);
    $("#insertForm #requestMan").val(d.requestMan);
    $("#insertForm #requestPhone").val(d.requestPhone);
    $("#insertForm #assignId").val(d.assignId);
    $("#insertForm #assignMan").val(d.assignMan);
    $("#insertForm #assignPhone").val(d.assignPhone);
    $("#insertForm #deliveryCarryingInKey").val(d.deliveryCarryingInKey);
    $("#insertForm #deliveryCarryingInNm").val(d.deliveryCarryingInNm);
    $("#insertForm #deliveryCarryingInTaxNo").val(d.deliveryCarryingInTaxNo);
    $("#insertForm #deliveryCarryingInMan").val(d.deliveryCarryingInMan);
    $("#insertForm #deliveryCarryingInMobile").val(d.deliveryCarryingInMobile);
    $("#insertForm #deliveryCarryingInPhone").val(d.deliveryCarryingInPhone);
    $("#insertForm #deliveryCarryingInFax").val(d.deliveryCarryingInFax);
    $("#insertForm #deliveryCarryingInEmail").val(d.deliveryCarryingInEmail);
    $("#insertForm #deliveryCarryingInAddr").val(d.deliveryCarryingInAddr);
    $("#insertForm #deliveryPojangSu").val(d.deliveryPojangSu);
    $("#insertForm #deliveryPojangDanwi").val(d.deliveryPojangDanwi);
    $("#insertForm #deliveryJung").val(d.deliveryJung);
    $("#insertForm #deliveryJungDanwi").val(d.deliveryJungDanwi);
    $("#insertForm #cargoSize").val(d.cargoSize);
    $("#insertForm #banipPlace").val(d.banipPlace);
    $("#insertForm #requestNote").val(d.requestNote);
    $("#insertForm #requestInvisibleNote").val(d.requestInvisibleNote);
    $("#insertForm #landingArea").val(d.landingArea);

    if(!isEmpty(d.requestDtm)){
		$("#viewForm #requestMan").html(d.requestMan);
		$("#viewForm #requestDtm").html(d.requestDtm.substr(0,4)+"-"+d.requestDtm.substr(4,2)+"-"+d.requestDtm.substr(6,2)+" "+d.requestDtm.substr(8,2)+":"+d.requestDtm.substr(10,2)+":"+d.requestDtm.substr(12,2));
	}
	if(!isEmpty(d.allocateRequestDtm)){
		$("#viewForm #assignMan").html(d.assignMan);
		$("#viewForm #allocateRequestDtm").html(d.allocateRequestDtm.substr(0,4)+"-"+d.allocateRequestDtm.substr(4,2)+"-"+d.allocateRequestDtm.substr(6,2)+" "+d.allocateRequestDtm.substr(8,2)+":"+d.allocateRequestDtm.substr(10,2)+":"+d.allocateRequestDtm.substr(12,2));
	}
	if(!isEmpty(d.allocateDtm)){
		$("#viewForm #deliveryCoNm").html(d.deliveryCoNm);
		$("#viewForm #allocateDtm").html(d.allocateDtm.substr(0,4)+"-"+d.allocateDtm.substr(4,2)+"-"+d.allocateDtm.substr(6,2)+" "+d.allocateDtm.substr(8,2)+":"+d.allocateDtm.substr(10,2)+":"+d.allocateDtm.substr(12,2));
	}
	if(!isEmpty(d.deliveryStDtm)){
		$("#viewForm #deliveryCarNm").html(d.deliveryCarNm);
		$("#viewForm #deliveryStDtm").html(d.deliveryStDtm.substr(0,4)+"-"+d.deliveryStDtm.substr(4,2)+"-"+d.deliveryStDtm.substr(6,2)+" "+d.deliveryStDtm.substr(8,2)+":"+d.deliveryStDtm.substr(10,2)+":"+d.deliveryStDtm.substr(12,2));
	}
	if(!isEmpty(d.deliveryEdDtm)){
		$("#viewForm #deliveryCarEndNm").html(d.deliveryCarNm);
		$("#viewForm #deliveryEdDtm").html(d.deliveryEdDtm.substr(0,4)+"-"+d.deliveryEdDtm.substr(4,2)+"-"+d.deliveryEdDtm.substr(6,2)+" "+d.deliveryEdDtm.substr(8,2)+":"+d.deliveryEdDtm.substr(10,2)+":"+d.deliveryEdDtm.substr(12,2));
	}
}

function fn_carryInModifyAction(){
    var $t = $("#masterGrid");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 체크해 주세요.');
        return;
    }

    if (!confirm("착지 수정하시겠습니까?")) return;

    try {
    	openWindowWithPost("./deliveryCarryingInList.sein","width=800, height=440, scrollbars=no, location=no, menubar=no", "carryInList" ,{
    		"Ctype" : "A"
    	});
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
}

function checkCarryingInModify(){
    var $t = $("#masterGrid");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
                if ($("#masterGrid").getRowData(ids[i]).deliveryStatus == '20') {
                	var aaa = $("#masterGrid").getRowData(ids[i]);

                	var url 	= "../apis/edms/updateImportDeliveryRequestList",
    	    			params 	= {
                			"sDAB100Key" 				: aaa.sdab100Key,
                			"deliveryCarryingInKey"		: $("#insertForm #deliveryCarryingInKey").val(),
                			"deliveryCarryingInNm"		: $("#insertForm #deliveryCarryingInNm").val(),
                			"deliveryCarryingInTaxNo"	: $("#insertForm #deliveryCarryingInTaxNo").val(),
                			"deliveryCarryingInPhone"	: $("#insertForm #deliveryCarryingInPhone").val(),
                			"deliveryCarryingInEmail"	: $("#insertForm #deliveryCarryingInEmail").val(),
                			"deliveryCarryingInFax"		: $("#insertForm #deliveryCarryingInFax").val(),
                			"deliveryCarryingInMan"		: $("#insertForm #deliveryCarryingInMan").val(),
                			"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
                			"deliveryCarryingInAddr"	: $("#insertForm #deliveryCarryingInAddr").val(),
                			"landingArea"				: $("#insertForm #landingArea").val(),
                			"deliveryCarryingChange"	: "Change"
    	    			},
    	    			type 	= "POST";

    	    		sendAjax(url, params, type, function(d){
    	    		});
                } else {
                    alert("운송의뢰 상태만 착지수정 가능합니다.");
                    return;
                }
            }
        }
        alert("일괄 착지수정되었습니다.");
	    fn_searchAction();
//        var params = {"importDeliveryRequestList": dd};
//
//        $.ajax({
//            type: "POST",
//            contentType: "application/json",
//            dataType: 'json',
//            async : false,
//            url: "../apis/edms/saveImportDeliveryModifyList",
//            processData: false,
//            data: JSON.stringify(params),
//            success: function (returnValue, textStatus, jqXHR) {
//                _isSuccessArr.push(true);
//            },
//            error: function (e) {
//                console.log(e);
//                _isSuccessArr.push(false);
//                alert(e.responseText);
//                return -1;
//            }
//        });
//
//        if (_isSuccessArr.indexOf(false) == -1) {
//            setTimeout(function () {
//                alert("착지 수정되었습니다.");
//                fn_searchAction();
//            }, 500);
//        }

    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
}

function checkCarryingInAdd(){
	var $grid = $('#masterGrid'),
    rowid = $grid.getGridParam("selrow"),
    rowData = $grid.jqGrid('getRowData', rowid);

	var url 	= "../apis/edms/insertImportDeliveryAddList",
		params 	= {
			"sDAB100Key" 				: "",
			"customerDB" 				: rowData.customerDB,
			"customerCode" 				: rowData.customerCode,
			"customerNm" 				: rowData.customerNm,
			"customerTaxNo" 			: rowData.customerTaxNo,
			"mblNo" 					: rowData.mblNo,
			"hblNo" 					: rowData.hblNo.substring(39).replace("</a></u></b>", ""),
			"cargoNo" 					: rowData.cargoNo,
			"singoNo" 					: rowData.singoNo.replace(/-/gi,""),
			"singoDtm" 					: rowData.singoDtm,
			"suriDtm" 					: rowData.suriDtm.replace(/-/gi,"").replace(/ /gi,"").replace(/:/gi,""),
			"cargoStatus" 				: rowData.cargoStatus,
			"pojangSu" 					: rowData.pojangSu,
			"pojangDanwi" 				: rowData.pojangDanwi,
			"totalJung" 				: rowData.totalJung,
			"jungDanwi" 				: rowData.jungDanwi,
			"impoSegwan" 				: rowData.impoSegwan,
			"impoJangchBuho" 			: rowData.impoJangchBuho,
			"impoJangchNm" 				: rowData.impoJangchNm,
			"impoJangchJangso" 			: rowData.impoJangchJangso,
			"deliveryStatus" 			: "20",
			"impoBanipDtm" 				: rowData.impoBanipDtm,
			"banipPlace" 				: rowData.banipPlace,
			"cargoSize" 				: rowData.cargoSize,
			"deliveryPojangSu" 			: rowData.deliveryPojangSu,
			"deliveryPojangDanwi"		: rowData.deliveryPojangDanwi,
			"deliveryJung" 				: rowData.deliveryJung,
			"deliveryJungDanwi" 		: rowData.deliveryJungDanwi,
			"requestCoNm" 				: rowData.requestCoNm,
			"requestMan" 				: rowData.requestMan,
			"requestPhone" 				: rowData.requestPhone,
			"requestDtm" 				: $("#insertForm #requestDtm").val().replace(/-/gi,"").replace(/ /gi,"").replace(/:/gi,""),
			"requestNote" 				: rowData.requestNote,
			"requestInvisibleNote" 		: rowData.requestInvisibleNote,
			"deliveryDtm" 				: rowData.deliveryDtm,
			"assignId" 					: rowData.assignId,
			"assignMan" 				: rowData.assignMan,
			"assignPhone" 				: rowData.assignPhone,
			"allocateRequestDtm" 		: rowData.allocateRequestDtm,
			"deliveryCoMngNo" 			: rowData.deliveryCoMngNo,
			"deliveryCoNm" 				: rowData.deliveryCoNm,
			"deliveryCoPhone" 			: rowData.deliveryCoPhone,
			"deliveryCoEmail" 			: rowData.deliveryCoEmail,
			"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
			"deliveryCarryingInNm" 		: $("#insertForm #deliveryCarryingInNm").val(),
			"deliveryCarryingInPhone" 	: $("#insertForm #deliveryCarryingInPhone").val(),
			"deliveryCarryingInTaxNo" 	: $("#insertForm #deliveryCarryingInTaxNo").val(),
			"deliveryCarryingInFax" 	: $("#insertForm #deliveryCarryingInFax").val(),
			"deliveryCarryingInEmail" 	: $("#insertForm #deliveryCarryingInEmail").val(),
			"deliveryCarryingInMan" 	: $("#insertForm #deliveryCarryingInMan").val(),
			"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
			"deliveryCarryingInAddr" 	: $("#insertForm #deliveryCarryingInAddr").val(),
			"allocateDtm" 				: rowData.allocateDtm,
			"deliveryCarMngNo" 			: rowData.deliveryCarMngNo,
			"deliveryCarNm" 			: rowData.deliveryCarNm,
			"deliveryCarPhone" 			: rowData.deliveryCarPhone,
			"deliveryCarNo" 			: rowData.deliveryCarNo,
			"deliveryStDtm" 			: rowData.deliveryStDtm,
			"deliveryEdDtm" 			: rowData.deliveryEdDtm,
			"damage" 					: rowData.damage,
			"damageDetail" 				: rowData.damageDetail,
			"useYn" 					: "Y",
			"landingArea" 				: rowData.landingArea,
			"arrivalTime" 				: ""
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		alert("착지 추가되었습니다.");
		refreshGridPage(selrow,pageNum);
	});

//	var _isSuccessArr = [];
//	var dd = [];
//
//    dd.push({
//    	"sDAB100Key" 				: rowData.sdab100Key,
//    	"customerDB" 				: rowData.customerDB,
//    	"customerCode" 				: rowData.customerCode,
//    	"customerNm" 				: rowData.customerNm,
//    	"customerTaxNo" 			: rowData.customerTaxNo,
//    	"mblNo" 					: rowData.mblNo,
//    	"hblNo" 					: rowData.hblNo.substring(39).replace("</a></u></b>", ""),
//    	"cargoNo" 					: rowData.cargoNo,
//    	"singoNo" 					: rowData.singoNo.replace(/-/gi,""),
//    	"singoDtm" 					: rowData.singoDtm,
//    	"suriDtm" 					: rowData.suriDtm.replace(/-/gi,"")+"235959",
//    	"cargoStatus" 				: rowData.cargoStatus,
//    	"pojangSu" 					: rowData.pojangSu,
//    	"pojangDanwi" 				: rowData.pojangDanwi,
//    	"totalJung" 				: rowData.totalJung,
//    	"jungDanwi" 				: rowData.jungDanwi,
//    	"impoSegwan" 				: rowData.impoSegwan,
//    	"impoJangchBuho" 			: rowData.impoJangchBuho,
//    	"impoJangchNm" 				: rowData.impoJangchNm,
//    	"impoJangchJangso" 			: rowData.impoJangchJangso,
//    	"deliveryStatus" 			: "20",
//    	"impoBanipDtm" 				: rowData.impoBanipDtm,
//    	"banipPlace" 				: rowData.banipPlace,
//    	"cargoSize" 				: rowData.cargoSize,
//    	"deliveryPojangSu" 			: rowData.deliveryPojangSu,
//    	"deliveryPojangDanwi"		: rowData.deliveryPojangDanwi,
//    	"deliveryJung" 				: rowData.deliveryJung,
//    	"deliveryJungDanwi" 		: rowData.deliveryJungDanwi,
//    	"requestCoNm" 				: rowData.requestCoName,
//    	"requestMan" 				: rowData.requestMan,
//    	"requestPhone" 				: rowData.requestPhone,
//    	"requestDtm" 				: rowData.requestDtm,
//    	"requestNote" 				: rowData.requestNote,
//    	"requestInvisibleNote" 		: rowData.requestInvisibleNote,
//    	"deliveryDtm" 				: rowData.deliveryDtm,
//    	"assignId" 					: rowData.assignId,
//    	"assignMan" 				: rowData.assignMan,
//    	"assignPhone" 				: rowData.assignPhone,
//    	"allocateRequestDtm" 		: rowData.allocateRequestDtm,
//    	"deliveryCoMngNo" 			: rowData.deliveryCoMngNo,
//    	"deliveryCoNm" 				: rowData.deliveryCoNm,
//    	"deliveryCoPhone" 			: rowData.deliveryCoPhone,
//    	"deliveryCoEmail" 			: "",
//    	"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
//    	"deliveryCarryingInNm" 		: $('#insertForm #deliveryCarryingInNm').val(),
//    	"deliveryCarryingInPhone" 	: $('#insertForm #deliveryCarryingInPhone').val(),
//    	"deliveryCarryingInTaxNo" 	: "",
//    	"deliveryCarryingInFax" 	: "",
//    	"deliveryCarryingInEmail" 	: $('#insertForm #deliveryCarryingInEmail').val(),
//    	"deliveryCarryingInMan" 	: $('#insertForm #deliveryCarryingInMan').val(),
//    	"deliveryCarryingInMobile"	: $('#insertForm #deliveryCarryingInMobile').val(),
//    	"deliveryCarryingInAddr" 	: $('#insertForm #deliveryCarryingInAddr').val(),
//    	"allocateDtm" 				: rowData.allocateDtm,
//    	"deliveryCarMngNo" 			: rowData.deliveryCarMngNo,
//    	"deliveryCarNm" 			: rowData.deliveryCarNm,
//    	"deliveryCarPhone" 			: rowData.deliveryCarPhone,
//    	"deliveryCarNo" 			: rowData.deliveryCarNo,
//    	"deliveryStDtm" 			: rowData.deliveryStDtm,
//    	"deliveryEdDtm" 			: rowData.deliveryEdDtm,
//    	"damage" 					: rowData.damage,
//    	"damageDetail" 				: rowData.damageDetail,
//    	"useYn" 					: "Y",
//    	"landingArea" 				: rowData.landingArea,
//    	"arrivalTime" 				: ""
//    });
//
//    var params = {
//		"importDeliveryRequestList"	: dd,
//    	"_defaultDB"				: rowData.customerDB,
//    	"code"						: rowData.customerCode,
//    	"blNo"						: rowData.hblNo.substring(39).replace("</a></u></b>", ""),
//    	"singoNo"					: rowData.singoNo.replace(/-/gi,"")
//    };
//
//    $.ajax({
//        type: "POST",
//        contentType: "application/json",
//        dataType: 'json',
//        async : false,
//        url: "../apis/edms/saveImportDeliveryAddList",
//        processData: false,
//        data: JSON.stringify(params),
//        success: function (returnValue, textStatus, jqXHR) {
//            _isSuccessArr.push(true);
//        },
//        error: function (e) {
//            console.log(e);
//            _isSuccessArr.push(false);
//            alert(e.responseText);
//            return -1;
//        }
//    });
//
//    if (_isSuccessArr.indexOf(false) == -1) {
//        setTimeout(function () {
//            alert("착지 추가되었습니다.");
//            fn_searchAction();
//        }, 500);
//    }
}

//********** 컨테이너 리스트 draw**********//
var drawConList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].NAME + "\">" + data[i].NAME + "</option>";
    }
    $("#insertForm #cargoSize").html(optList.join("\n"));
};

//********** 온도조건 리스트 draw**********//
var drawTempList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].NAME + "\">" + data[i].NAME + "</option>";
    }
    $("#insertForm #banipPlace").html(optList.join("\n"));
};

function fn_carryingSave(){
	var $grid = $('#masterGrid'),
	    rowid = $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid),
	    selrow	= $grid.jqGrid('getGridParam','selrow'),
	    pageNum	= $grid.getGridParam('page');

	if (rowid == null) {
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if (rowData.deliveryStatus != '20') {
		alert("운송의뢰시에만 내용 수정 가능합니다.");
	    return;
	}

	if (!confirm("의뢰 내용 수정하시겠습니까?")) return;

	if($.number($("#insertForm #deliveryPojangSu").val(),0) > $.number($("#insertForm #pojangSu").val(),0)){
		alert("의뢰수량이 실제 수량보다 클 수는 없습니다.");
		return;
	}

	if($.number($("#insertForm #deliveryJung").val(),3) > $.number($("#insertForm #totalJung").val(),3)){
		alert("의뢰중량이 실제 중량보다 클 수는 없습니다.");
		return;
	}

	var url 	= "../apis/edms/updateImportDeliveryRequestList",
	    params 	= {
	    	"sDAB100Key"				: rowData.sdab100Key,
			"cargoSize"					: $("#insertForm #cargoSize").val(),
			"deliveryPojangSu"			: $("#insertForm #deliveryPojangSu").val(),
			"deliveryPojangDanwi"		: $("#insertForm #deliveryPojangDanwi").val(),
			"deliveryJung"				: $("#insertForm #deliveryJung").val(),
			"deliveryJungDanwi"			: $("#insertForm #deliveryJungDanwi").val(),
			"banipPlace"				: $("#insertForm #banipPlace").val(),
			"requestCoNm"				: $("#insertForm #requestCoNm").val(),
			"requestMan"				: $("#insertForm #requestMan").val(),
			"requestPhone"				: $("#insertForm #requestPhone").val(),
			"requestNote"				: $("#insertForm #requestNote").val(),
			"requestInvisibleNote"		: $("#insertForm #requestInvisibleNote").val(),
			"assignMan"					: $("#insertForm #assignMan").val(),
			"assignPhone"				: $("#insertForm #assignPhone").val(),
			"deliveryCarryingInKey"		: $("#insertForm #deliveryCarryingInKey").val(),
			"deliveryCarryingInNm"		: $("#insertForm #deliveryCarryingInNm").val(),
			"deliveryCarryingInTaxNo"	: $("#insertForm #deliveryCarryingInTaxNo").val(),
			"deliveryCarryingInPhone"	: $("#insertForm #deliveryCarryingInPhone").val(),
			"deliveryCarryingInEmail"	: $("#insertForm #deliveryCarryingInEmail").val(),
			"deliveryCarryingInFax"		: $("#insertForm #deliveryCarryingInFax").val(),
			"deliveryCarryingInMan"		: $("#insertForm #deliveryCarryingInMan").val(),
			"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
			"deliveryCarryingInAddr"	: $("#insertForm #deliveryCarryingInAddr").val(),
			"landingArea"				: $("#insertForm #landingArea").val(),
			"requestChange"				: "Change"
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		alert("운송의뢰 수정 되었습니다.");
		refreshGridPage(selrow,pageNum);
	});

//	var _isSuccessArr = [];
//	var dd = [];
//
//    dd.push({
//    	"sDAB100Key" 				: rowData.sdab100Key,
//    	"customerDB" 				: rowData.customerDB,
//    	"customerCode" 				: rowData.customerCode,
//    	"customerNm" 				: rowData.customerNm,
//    	"customerTaxNo" 			: rowData.customerTaxNo,
//    	"mblNo" 					: rowData.mblNo,
//    	"hblNo" 					: $("#insertForm #hblNo").val(),
//    	"cargoNo" 					: rowData.cargoNo,
//    	"singoNo" 					: $("#insertForm #singoNo").val(),
//    	"singoDtm" 					: rowData.singoDtm,
//    	"suriDtm" 					: rowData.suriDtm.replace(/-/gi,"")+"235959",
//    	"cargoStatus" 				: rowData.cargoStatus,
//    	"pojangSu" 					: $("#insertForm #pojangSu").val(),
//    	"pojangDanwi" 				: $("#insertForm #pojangDanwi").val(),
//    	"totalJung" 				: $("#insertForm #totalJung").val(),
//    	"jungDanwi" 				: $("#insertForm #jungDanwi").val(),
//    	"impoSegwan" 				: $("#insertForm #impoSegwan").val(),
//    	"impoJangchBuho" 			: $("#insertForm #impoJangchBuho").val(),
//    	"impoJangchNm" 				: $("#insertForm #impoJangchNm").val(),
//    	"impoJangchJangso" 			: $("#insertForm #impoJangchJangso").val(),
//    	"deliveryStatus" 			: "20",
//    	"impoBanipDtm" 				: $("#insertForm #impoBanipDtm").val(),
//    	"banipPlace" 				: $("#insertForm #banipPlace").val(),
//    	"cargoSize" 				: $("#insertForm #cargoSize").val(),
//    	"deliveryPojangSu" 			: $("#insertForm #deliveryPojangSu").val(),
//    	"deliveryPojangDanwi"		: $("#insertForm #deliveryPojangDanwi").val(),
//    	"deliveryJung" 				: $("#insertForm #deliveryJung").val(),
//    	"deliveryJungDanwi" 		: $("#insertForm #deliveryJungDanwi").val(),
//    	"requestCoNm" 				: $("#insertForm #requestCoNm").val(),
//    	"requestMan" 				: $("#insertForm #requestMan").val(),
//    	"requestPhone" 				: $("#insertForm #requestPhone").val(),
//    	"requestDtm" 				: rowData.requestDtm,
//    	"requestNote" 				: $("#insertForm #requestNote").val(),
//    	"requestInvisibleNote" 		: $("#insertForm #requestInvisibleNote").val(),
//    	"deliveryDtm" 				: rowData.deliveryDtm,
//    	"assignId" 					: rowData.assignId,
//    	"assignMan" 				: $("#insertForm #assignMan").val(),
//    	"assignPhone" 				: $("#insertForm #assignPhone").val(),
//    	"allocateRequestDtm" 		: rowData.allocateRequestDtm,
//    	"deliveryCoMngNo" 			: rowData.deliveryCoMngNo,
//    	"deliveryCoNm" 				: rowData.deliveryCoNm,
//    	"deliveryCoPhone" 			: rowData.deliveryCoPhone,
//    	"deliveryCoEmail" 			: "",
//    	"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
//    	"deliveryCarryingInNm" 		: $('#insertForm #deliveryCarryingInNm').val(),
//    	"deliveryCarryingInPhone" 	: $('#insertForm #deliveryCarryingInPhone').val(),
//    	"deliveryCarryingInTaxNo" 	: "",
//    	"deliveryCarryingInFax" 	: "",
//    	"deliveryCarryingInEmail" 	: $('#insertForm #deliveryCarryingInEmail').val(),
//    	"deliveryCarryingInMan" 	: $('#insertForm #deliveryCarryingInMan').val(),
//    	"deliveryCarryingInMobile"	: $('#insertForm #deliveryCarryingInMobile').val(),
//    	"deliveryCarryingInAddr" 	: $('#insertForm #deliveryCarryingInAddr').val(),
//    	"allocateDtm" 				: rowData.allocateDtm,
//    	"deliveryCarMngNo" 			: rowData.deliveryCarMngNo,
//    	"deliveryCarNm" 			: rowData.deliveryCarNm,
//    	"deliveryCarPhone" 			: rowData.deliveryCarPhone,
//    	"deliveryCarNo" 			: rowData.deliveryCarNo,
//    	"deliveryStDtm" 			: rowData.deliveryStDtm,
//    	"deliveryEdDtm" 			: rowData.deliveryEdDtm,
//    	"damage" 					: rowData.damage,
//    	"damageDetail" 				: rowData.damageDetail,
//    	"useYn" 					: "Y",
//    	"landingArea" 				: $('#insertForm #landingArea').val(),
//    	"arrivalTime" 				: ""
//    });
//
//    var params = {"importDeliveryRequestList": dd};
//
//    $.ajax({
//        type: "POST",
//        contentType: "application/json",
//        dataType: 'json',
//        async : false,
//        url: "../apis/edms/saveImportDeliveryModifyList",
//        processData: false,
//        data: JSON.stringify(params),
//        success: function (returnValue, textStatus, jqXHR) {
//            _isSuccessArr.push(true);
//        },
//        error: function (e) {
//            console.log(e);
//            _isSuccessArr.push(false);
//            alert(e.responseText);
//            return -1;
//        }
//    });
//
//    if (_isSuccessArr.indexOf(false) == -1) {
//        setTimeout(function () {
//            alert("의뢰 내용 수정되었습니다.");
//            refreshGridPage(selrow,pageNum);
//        }, 500);
//    }
}

function fn_delStatusAction(){
    var $t = $("#masterGrid");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 체크해 주세요.');
        return;
    }

    if (!confirm("운송의뢰 삭제하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid").getRowData(ids[i]);

            	var url 	= "../apis/edms/updateImportDeliveryRequestList",
	    			params 	= {
            			"sDAB100Key" 	: aaa.sdab100Key,
	    				"useYn"			: "N",
	    				"isMailYn"		: "D"
	    			},
	    			type 	= "POST";

	    		sendAjax(url, params, type, function(d){
	    		});

//                if ($("#masterGrid").getRowData(ids[i]).deliveryStatus == '20') {
//                    dd.push({
//                    	"sDAB100Key" 				: $("#masterGrid").getRowData(ids[i]).sdab100Key,
//                    	"customerDB" 				: $("#masterGrid").getRowData(ids[i]).customerDB,
//                    	"customerCode" 				: $("#masterGrid").getRowData(ids[i]).customerCode,
//                    	"customerNm" 				: $("#masterGrid").getRowData(ids[i]).customerNm,
//                    	"customerTaxNo" 			: $("#masterGrid").getRowData(ids[i]).customerTaxNo,
//                    	"mblNo" 					: $("#masterGrid").getRowData(ids[i]).mblNo,
//                    	"hblNo" 					: $("#masterGrid").getRowData(ids[i]).hblNo.substring(39).replace("</a></u></b>", ""),
//                    	"cargoNo" 					: $("#masterGrid").getRowData(ids[i]).cargoNo,
//                    	"singoNo" 					: $("#masterGrid").getRowData(ids[i]).singoNo.replace(/-/gi,""),
//                    	"singoDtm" 					: $("#masterGrid").getRowData(ids[i]).singoDtm,
//                    	"suriDtm" 					: $("#masterGrid").getRowData(ids[i]).suriDtm.replace(/-/gi,"")+"235959",
//                    	"cargoStatus" 				: "D",
//                    	"pojangSu" 					: $("#masterGrid").getRowData(ids[i]).pojangSu,
//                    	"pojangDanwi" 				: $("#masterGrid").getRowData(ids[i]).pojangDanwi,
//                    	"totalJung" 				: $("#masterGrid").getRowData(ids[i]).totalJung,
//                    	"jungDanwi" 				: $("#masterGrid").getRowData(ids[i]).jungDanwi,
//                    	"impoSegwan" 				: $("#masterGrid").getRowData(ids[i]).impoSegwan,
//                    	"impoJangchBuho" 			: $("#masterGrid").getRowData(ids[i]).impoJangchBuho,
//                    	"impoJangchNm" 				: $("#masterGrid").getRowData(ids[i]).impoJangchNm,
//                    	"impoJangchJangso" 			: $("#masterGrid").getRowData(ids[i]).impoJangchJangso,
//                    	"deliveryStatus" 			: "20",
//                    	"impoBanipDtm" 				: $("#masterGrid").getRowData(ids[i]).impoBanipDtm,
//                    	"banipPlace" 				: $("#masterGrid").getRowData(ids[i]).banipPlace,
//                    	"cargoSize" 				: $("#masterGrid").getRowData(ids[i]).cargoSize,
//                    	"deliveryPojangSu" 			: $("#masterGrid").getRowData(ids[i]).deliveryPojangSu,
//                    	"deliveryPojangDanwi"		: $("#masterGrid").getRowData(ids[i]).deliveryPojangDanwi,
//                    	"deliveryJung" 				: $("#masterGrid").getRowData(ids[i]).deliveryJung,
//                    	"deliveryJungDanwi" 		: $("#masterGrid").getRowData(ids[i]).deliveryJungDanwi,
//                    	"requestCoNm" 				: $("#masterGrid").getRowData(ids[i]).requestCoNm,
//                    	"requestMan" 				: $("#masterGrid").getRowData(ids[i]).requestMan,
//                    	"requestPhone" 				: $("#masterGrid").getRowData(ids[i]).requestPhone,
//                    	"requestDtm" 				: $("#masterGrid").getRowData(ids[i]).requestDtm,
//                    	"requestNote" 				: $("#masterGrid").getRowData(ids[i]).requestNote,
//                    	"requestInvisibleNote" 		: $("#masterGrid").getRowData(ids[i]).requestInvisibleNote,
//                    	"deliveryDtm" 				: "",
//                    	"assignId" 					: "",
//                    	"assignMan" 				: $("#masterGrid").getRowData(ids[i]).assignMan,
//                    	"assignPhone" 				: $("#masterGrid").getRowData(ids[i]).assignPhone,
//                    	"allocateRequestDtm" 		: "",
//                    	"deliveryCoMngNo" 			: "",
//                    	"deliveryCoNm" 				: "",
//                    	"deliveryCoPhone" 			: "",
//                    	"deliveryCoEmail" 			: "",
//                    	"deliveryCarryingInKey" 	: null,
//                    	"deliveryCarryingInNm" 		: "",
//                    	"deliveryCarryingInPhone" 	: "",
//                    	"deliveryCarryingInTaxNo" 	: "",
//                    	"deliveryCarryingInFax" 	: "",
//                    	"deliveryCarryingInEmail" 	: "",
//                    	"deliveryCarryingInMan" 	: "",
//                    	"deliveryCarryingInMobile"	: "",
//                    	"deliveryCarryingInAddr" 	: "",
//                    	"allocateDtm" 				: "",
//                    	"deliveryCarMngNo" 			: "",
//                    	"deliveryCarNm" 			: "",
//                    	"deliveryCarPhone" 			: "",
//                    	"deliveryCarNo" 			: "",
//                    	"deliveryStDtm" 			: "",
//                    	"deliveryEdDtm" 			: "",
//                    	"damage" 					: "",
//                    	"damageDetail" 				: "",
//                    	"useYn" 					: "N",
//                    	"landingArea" 				: $("#masterGrid").getRowData(ids[i]).landingArea,
//                    	"arrivalTime" 				: ""
//                    });
//
//                    var params = {
//                    	"importDeliveryRequestList"	: dd,
//                    	"_defaultDB"				: $("#masterGrid").getRowData(ids[i]).customerDb,
//                    	"code"						: $("#masterGrid").getRowData(ids[i]).customerCode,
//                    	"blNo"						: $("#masterGrid").getRowData(ids[i]).hblNo.substring(39).replace("</a></u></b>", ""),
//                    	"singoNo"					: $("#masterGrid").getRowData(ids[i]).singoNo.replace(/-/gi,"")
//                    };
//
//                    $.ajax({
//                        type: "POST",
//                        contentType: "application/json",
//                        dataType: 'json',
//                        async : false,
//                        url: "../apis/edms/deleteImportDeliveryRequestList",
//                        processData: false,
//                        data: JSON.stringify(params),
//                        success: function (returnValue, textStatus, jqXHR) {
//                            _isSuccessArr.push(true);
//                        },
//                        error: function (e) {
//                            console.log(e);
//                            _isSuccessArr.push(false);
//                            alert(e.responseText);
//                            return -1;
//                        }
//                    });
//                }else{
//                	alert('운송의뢰 상태에서만 삭제 가능합니다.');
//                	_isSuccessArr.push(false);
//                }
            }
        }
        alert("운송의뢰 삭제 되었습니다.");
        fn_searchAction();

//        if (_isSuccessArr.indexOf(false) == -1) {
//            setTimeout(function () {
//                alert("삭제되었습니다.");
//                fn_searchAction();
//            }, 500);
//        }

    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
}

//********** 메인 분류 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListImportAction = function(ddd){
	var url1 	= "../apis/edms/getEdmsMasterWithFileList",
		params1 = {
			"edmsNo"		: ddd.hblNo.substring(39).replace("</a></u></b>", ""),
			"edmsSingoNo"	: ddd.singoNo.replace(/-/gi, ""),
			"edmsGubun"		: "IMPORT",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type1 	= "POST";
		progress.show();
		console.log(params1);
	sendAjax(url1, params1, type1, function(d){
		progress.hide();
		console.log(d.content);
		if(d.content.length == 0){
			$('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		}else{
			$("#fileGrid").jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
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

var fn_fileAction = function(edmsNum, singoNo, edmsGubun){
    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsNum"		: edmsNum,
            "edmsSingoNum"	: singoNo,
            "edmsGubun"		: edmsGubun,
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

//var fn_fileAction = function (edmsKey) {
//    var url1 = "../apis/edms/getEdmsFileInfoList",
//        params1 = {
//            "edmsParentKey": edmsKey,
//            "_pageRow": 1000,
//            "_pageNumber": 0,
//            "size": 1000,
//            "page": 0,
//            "useYn" : "Y"
//        },
//        type1 = "POST";
//
//    sendAjax(url1, params1, type1, function (d) {
//        if (d.content.length == 0) {
//            $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
//        } else {
//            $("#fileGrid").jqGrid('setGridParam', {search: false, postData: {"filters": ""}}).trigger("reloadGrid");
//
//            if (d.content.length == 1) {
//                if (d.content[0].edmsFileKey == undefined) {
//                    $('#fileGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
//                } else {
//                    $('#fileGrid').clearGridData().setGridParam({
//                        data: d.content,
//                        rowNum: d.content.length
//                    }).trigger('reloadGrid');
//                }
//            } else {
//                $('#fileGrid').clearGridData().setGridParam({
//                    data: d.content,
//                    rowNum: d.content.length
//                }).trigger('reloadGrid');
//            }
//        }
//    });
//};

//********** 분류 다운로드 formatter**********//
//function linkDownloadFormatter(cellValue, options, rowdata, action){
//	var category 		= "";
//	var edmsNewFileName = "";
//
//	if(rowdata.edmsFileCategory == "Z0001"){
//		category = "NO";
//	}else if(rowdata.edmsFileCategory == "A0001"){
//		category = "BL";
//	}else if(rowdata.edmsFileCategory == "A0002"){
//		category = "IN";
//	}else if(rowdata.edmsFileCategory == "A0003"){
//		category = "PA";
//	}else if(rowdata.edmsFileCategory == "A0004"){
//		category = "CO";
//	}else if(rowdata.edmsFileCategory == "B0001"){
//		category = "PL";
//	}else if(rowdata.edmsFileCategory == "B0002"){
//		category = "YO";
//	}else if(rowdata.edmsFileCategory == "C0001"){
//		category = "DI";
//	}else if(rowdata.edmsFileCategory == "Z0002"){
//		category = "EM";
//	}else if(rowdata.edmsFileCategory == "A0005"){
//		category = "TO";
//	}else if(rowdata.edmsFileCategory == "D0001"){
//		category = "CM";
//	}else if(rowdata.edmsFileCategory == "C0002"){
//		category = "DL";
//	}else if(rowdata.edmsFileCategory == "Z0003"){
//		category = "ET";
//	}
//
//	edmsNewFileName = rowdata.edmsOrgFileName;
//
//	return "<a onclick='javascript:fn_downAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\", \"" + edmsNewFileName + "\")'><img src='../images/button/btn_search.gif'></a>";
//}


function linkDownloadNotFormatter(cellValue, options, rowdata, action){
    return "<a onclick='javascript:fn_downNotAction("+ rowdata.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}


var fn_downNotAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

//********** 분류 다운로드 액션**********//
//var fn_downAction = function(edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName, edmsNewFileName){
//	edmsOrgFileName = encodeURIComponent(edmsOrgFileName);
//	edmsNewFileName = encodeURIComponent(edmsNewFileName);
//	location.href = "../apis/edms/downloadEdmsFile?edmsFileKey=" + edmsFileKey + "&edmsParentGubun=" + edmsParentGubun + "&edmsParentKey=" + edmsParentKey +"&edmsOrgFileName=" + edmsOrgFileName +"&edmsNewFileName=" + edmsNewFileName;
//};

function linkDelNotFormatter(cellValue, options, rowdata, action){
    if(rowdata.EdmsFileAddUserId == $("#sessionId").val() || $("#USERGRADE").val() == "A" || $("#USERGRADE").val() == "B"){
        return "<a onclick='javascript:fn_delNotAction("+ rowdata.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_delNotAction = function(SDAAKey){
    if(confirm("[삭제] 하시겠습니까?")){
        var url 	= "../apis/edms/deleteEdmsFile",
            params 	= {"SDAAKey": SDAAKey},
            type 	= "POST";

        sendAjax(url, params, type, function(d){
        	fn_fileAction($("#insertForm #hblNo").val(),$("#insertForm #singoNo").val(),"IMPORT");
        });
    }
};

//********** 분류 파일 삭제 formatter**********//
//function linkDelFormatter(cellValue, options, rowdata, action){
//	if(rowdata.edmsFileAddUserId == $("#sessionId").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
//		return "<a onclick='javascript:fn_delAction(" + rowdata.edmsFileKey + ", \"" + rowdata.edmsParentGubun + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileName + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
//	}else{
//		return "";
//	}
//}

//********** 분류 파일삭제 액션**********//
//var fn_delAction = function(edmsFileKey, edmsParentGubun, edmsParentKey, edmsOrgFileName){
//	if(confirm("[삭제] 하시겠습니까?")){
//		var url 	= "../apis/edms/deleteEdmsFile",
//			params	= {"edmsFileKey":edmsFileKey, "edmsParentGubun":edmsParentGubun, "edmsParentKey":edmsParentKey, "edmsOrgFileName":edmsOrgFileName},
//			type 	= "POST";
//
//		sendAjax(url, params, type, function(d){
//			fn_fileAction(edmsParentKey);
//		});
//	}
//}

var keyDown = function() {
    if (event.keyCode == 13) fn_searchAction();
};

function checkBlNoYear() {
	var rowData =  jQuery("#masterGrid").getRowData(sIds),
		singo;

    singo 	= rowData.singoDate;

    if (singo != ""){
		return singo;
	}
	return;

}

//MBL정보 링크
function linkMBlNo() {
	var rowData = jQuery("#masterGrid").getRowData(sIds);
	var mBlNo   = rowData.mblNo;
    var year	= checkBlNoYear();

    var url = './viewTracking.sein?'
    	+ 'cargMtNo='
        + '&mblNo=' + mBlNo
        + '&hblNo='
        + '&blYy=' + year.substring(0,4);

    window.open(url, mBlNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

// BL정보 링크
function linkHBlNo() {
	var rowData =  jQuery("#masterGrid").getRowData(sIds);
	var blNo   	= rowData.hblNo.substring(39).replace("</a></u></b>", "");
    var year 	= checkBlNoYear();

    var url = './viewTracking.sein?'
    	+ 'cargMtNo='
        + '&mblNo='
        + '&hblNo=' + blNo
        + '&blYy=' + year.substring(0,4);

    window.open(url, blNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

function linkBlNoFormatter(cellValue, options, rowdata, action) {
	var blno  = rowdata.hblNo;
	var mblno = rowdata.mblNo;

	if (blno==mblno) {
		return "<b><u><a href='javascript:linkMBlNo()'>" + mblno + "</a></u></b>";
	} else {
		return "<b><u><a href='javascript:linkHBlNo()'>" + blno + "</a></u></b>";
	}
}

function comFormatter(cellValue, options, rowObject) {
	return "세인TNL";
}

var fn_carryingIn = function(){
	var $grid = $('#masterGrid'),
	    rowid = $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);

	if (rowid == null) {
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if (rowData.deliveryStatus != '20') {
		alert("운송의뢰시에만 착지 변경이 가능합니다.");
	    return;
	}

	openWindowWithPost("./deliveryCarryingInList.sein","width=800, height=440, scrollbars=no, location=no, menubar=no", "carryInList" ,{
		"Ctype" : "B"
	});
};

var fn_carryingAdd = function(){
	var $grid = $('#masterGrid'),
	    rowid = $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);

	if (rowid == null) {
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if (rowData.deliveryStatus != '20') {
		alert("운송의뢰시에만 추가 도착지 등록이 가능합니다.");
	    return;
	}

	if(!confirm("추가 도착지 등록하시겠습니까?")) return;
	openWindowWithPost("./deliveryCarryingInList.sein","width=800, height=440, scrollbars=no, location=no, menubar=no", "carryInList" ,{
		"Ctype" : "C"
	});
};

var fn_changeMan = function(obj){
	if(obj.value=="박지현"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1534");
	}else if(obj.value=="윤정언"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1534");
	}else{
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1506");
	}
};

function fn_homeView(){
	document.location.href="./edmsMasterList.sein";
}