function selectDeliveryList(){
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
					"customerTaxNum" 			: $("#frm1 #customerTaxNum").val(),
					"customerCode" 				: $("#frm1 #customerCode").val(),
					"_userGrade" 				: $("#frm1 #_userGrade").val(),
					"_dateType" 				: $("#frm1 #_dateType").val(),
					"startDay" 					: $("#frm1 #strFromDate").val(),
					"endDay" 					: $("#frm1 #strToDate").val()+"235959",
					"customerName" 				: $("#frm1 #customerName").val(),
					"hblNo" 					: $("#frm1 #hblNo").val(),
					"deliveryCoName" 			: $("#frm1 #deliveryCoName").val(),
					"deliveryCarryingInName" 	: $("#frm1 #deliveryCarryingInName").val(),
					"deliveryStatus" 			: $("#frm1 #deliveryStatus").val(),
					"sort"	: [{"property":"deliveryRequestKey", "direction":"desc"}]
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				progress.hide();
				if(!d.content) return;
				$('#masterGrid').datagrid('loadData', d.content);
		    	$('#fileGrid').datagrid('loadData',[]);
		    	$("#insertForm").each(function(){
		            this.reset();
		        });
		    	$("#viewForm #requestMan").html("");
		    	$("#viewForm #requestDate").html("");
		    	$("#viewForm #assignMan").html("");
		    	$("#viewForm #allocateRequestDate").html("");
		    	$("#viewForm #deliveryCoName").html("");
		    	$("#viewForm #allocateDate").html("");
		    	$("#viewForm #deliveryCarName").html("");
		    	$("#viewForm #deliveryStartDate").html("");
		    	$("#viewForm #deliveryCarEndName").html("");
		    	$("#viewForm #deliveryEndDate").html("");
			});
		});
	});
}

function selectDeliveryAdminList(){
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
			"customerTaxNum" 			: $("#frm1 #customerTaxNum").val(),
			"customerCode" 				: $("#frm1 #customerCode").val(),
			"_userGrade" 				: $("#frm1 #_userGrade").val(),
			"_dateType" 				: $("#frm1 #_dateType").val(),
			"startDay" 					: $("#frm1 #strFromDate").val(),
			"endDay" 					: $("#frm1 #strToDate").val()+"235959",
			"customerName" 				: $("#frm1 #customerName").val(),
			"hblNo" 					: $("#frm1 #hblNo").val(),
			"deliveryCoName" 			: $("#frm1 #deliveryCoName").val(),
			"deliveryCarryingInName" 	: $("#frm1 #deliveryCarryingInName").val(),
			"deliveryStatus" 			: $("#frm1 #deliveryStatus").val(),
			"sort"	: [{"property":"deliveryRequestKey", "direction":"desc"}]
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if(!d.content) return;
		$('#masterGrid').datagrid('loadData', d.content);
    	$('#fileGrid').datagrid('loadData',[]);
    	$("#insertForm").each(function(){
            this.reset();
        });
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
	var yymmddhhmmss = $('#addForm #yyyymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#yymmddhhmmss').val(yymmddhhmmss);
	$('#addForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#addForm #editDay').val($.datepicker.formatDate('yymmdd', new Date()));

	$(function(){
		$('#masterGrid').datagrid({
			title			: 'Delivery Status',
			width			: '100%',
			height			: _setHeight,
			rownumbers		: true,
			singleSelect	: false,
			autoRowHeight	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			pagination		: true,
			pageSize		: 30,
			rowStyler		: function(index,row){
                if(row.deliveryStatus == 20){
                    return 'background-color:#ffdee1;';
                }else if(row.deliveryStatus == 30){
                    return 'background-color:#fff3ac;';
                }else if(row.deliveryStatus == 40){
                    return 'background-color:#cbf6df;';
                }else if(row.deliveryStatus == 50){
                    return 'background-color:#b7d5ff;';
                }else{
                    return 'background-color:#ffd29b;';
                }
            },
			onSelect	: function(rowIndex, rowData){
				fn_fileListImportAction(rowData);
				fn_bindData(rowData);
	        }
		});

		$('#masterGrid').datagrid('enableFilter',[{
            field:'deliveryStatus',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'운송의뢰',text:'운송의뢰'},{value:'배차요청',text:'배차요청'},{value:'배차완료',text:'배차완료'},{value:'배송중',text:'배송중'},{value:'배송완료',text:'배송완료'}],
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
			width			: '100%',
			height			: '300px',
			fitColumns		: true,
			singleSelect	: false,
			selectOnCheck 	: false,
			CheckOnSelect 	: false,
			columns			: [[
                {field:'ck',title:'',checkbox:true},
                {field:'edmsFileKey',title:'Key',hidden:true},
                {field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
                {field:'edmsOrgFileName',title:'파일명',width:230},
                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter},
                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDeliveryDelFormatter}
	        ]]
		});

		$('#fileGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
            index: 0,
            field: 'edmsFileCategory'
        });
    });

	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

	getCmmnCodeList({"mCode": 'D00002', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawConList);
	getCmmnCodeList({"mCode": 'D00003', "page": "0", "size": "100000", "_pageNumber": "0", "_pageRow": "100000"}, drawTempList);

	fn_searchAction();
});

var fn_searchAction = function(){
	if($('#USERGRADE').val() == "A" || $('#USERGRADE').val() == "B"){
		selectDeliveryAdminList();
	}else{
		selectDeliveryList();
	}
};

function fn_bindData(d){
	$("#viewForm #requestMan").html("");
	$("#viewForm #requestDate").html("");
	$("#viewForm #assignMan").html("");
	$("#viewForm #allocateRequestDate").html("");
	$("#viewForm #deliveryCoName").html("");
	$("#viewForm #allocateDate").html("");
	$("#viewForm #deliveryCarName").html("");
	$("#viewForm #deliveryStartDate").html("");
	$("#viewForm #deliveryCarEndName").html("");
	$("#viewForm #deliveryEndDate").html("");

	$("#insertForm #hblNo").val(d.hblNo.substring(39).replace("</a></u></b>", ""));
	$("#insertForm #singoNo").val(d.singoNo.replace("-", "").replace("-", ""));
	$("#insertForm #pojangSu").val(d.pojangSu);
	$("#insertForm #pojangDanwi").val(d.pojangDanwi);
	$("#insertForm #totalJung").val(d.totalJung);
	$("#insertForm #jungDanwi").val(d.jungDanwi);
	$("#insertForm #requestCoName").val(d.requestCoName);
	$("#insertForm #requestDate").val(d.requestDate);
	$("#insertForm #requestMan").val(d.requestMan);
	$("#insertForm #requestPhone").val(d.requestPhone);
	$("#insertForm #assignCom").val(d.assignCom);
	$("#insertForm #assignMan").val(d.assignMan);
	$("#insertForm #assignPhone").val(d.assignPhone);
	$("#insertForm #deliveryCarryingInKey").val(d.deliveryCarryingInKey);
	$("#insertForm #deliveryCarryingInName").val(d.deliveryCarryingInName);
	$("#insertForm #deliveryCarryingInMan").val(d.deliveryCarryingInMan);
	$("#insertForm #deliveryCarryingInMobile").val(d.deliveryCarryingInMobile);
	$("#insertForm #deliveryCarryingInPhone").val(d.deliveryCarryingInPhone);
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
	$("#insertForm #impoSegwan").val(d.impoSegwan);
	$("#insertForm #impoJangchBuho").val(d.impoJangchBuho);
	$("#insertForm #impoJangchName").val(d.impoJangchName);
	$("#insertForm #impoJangchJangso").val(d.impoJangchJangso);
	$("#insertForm #impoBanipDate").val(d.impoBanipDate);

	if(!isEmpty(d.requestDate)){
		$("#viewForm #requestMan").html(d.requestMan);
		$("#viewForm #requestDate").html(d.requestDate.substr(0,4)+"-"+d.requestDate.substr(4,2)+"-"+d.requestDate.substr(6,2)+" "+d.requestDate.substr(8,2)+":"+d.requestDate.substr(10,2)+":"+d.requestDate.substr(12,2));
	}
	if(!isEmpty(d.allocateRequestDate)){
		$("#viewForm #assignMan").html(d.assignMan);
		$("#viewForm #allocateRequestDate").html(d.allocateRequestDate.substr(0,4)+"-"+d.allocateRequestDate.substr(4,2)+"-"+d.allocateRequestDate.substr(6,2)+" "+d.allocateRequestDate.substr(8,2)+":"+d.allocateRequestDate.substr(10,2)+":"+d.allocateRequestDate.substr(12,2));
	}
	if(!isEmpty(d.allocateDate)){
		$("#viewForm #deliveryCoName").html(d.deliveryCoName);
		$("#viewForm #allocateDate").html(d.allocateDate.substr(0,4)+"-"+d.allocateDate.substr(4,2)+"-"+d.allocateDate.substr(6,2)+" "+d.allocateDate.substr(8,2)+":"+d.allocateDate.substr(10,2)+":"+d.allocateDate.substr(12,2));
	}
	if(!isEmpty(d.deliveryStartDate)){
		$("#viewForm #deliveryCarName").html(d.deliveryCarName);
		$("#viewForm #deliveryStartDate").html(d.deliveryStartDate.substr(0,4)+"-"+d.deliveryStartDate.substr(4,2)+"-"+d.deliveryStartDate.substr(6,2)+" "+d.deliveryStartDate.substr(8,2)+":"+d.deliveryStartDate.substr(10,2)+":"+d.deliveryStartDate.substr(12,2));
	}
	if(!isEmpty(d.deliveryEndDate)){
		$("#viewForm #deliveryCarEndName").html(d.deliveryCarName);
		$("#viewForm #deliveryEndDate").html(d.deliveryEndDate.substr(0,4)+"-"+d.deliveryEndDate.substr(4,2)+"-"+d.deliveryEndDate.substr(6,2)+" "+d.deliveryEndDate.substr(8,2)+":"+d.deliveryEndDate.substr(10,2)+":"+d.deliveryEndDate.substr(12,2));
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
                    dd.push({
                    	"deliveryRequestKey" 		: $("#masterGrid").getRowData(ids[i]).deliveryRequestKey,
						"customerKey" 				: $("#masterGrid").getRowData(ids[i]).customerKey,
						"customerDb" 				: $("#masterGrid").getRowData(ids[i]).customerDb,
						"customerCode" 				: $("#masterGrid").getRowData(ids[i]).customerCode,
						"customerName" 				: $("#masterGrid").getRowData(ids[i]).customerName,
						"customerTaxNum" 			: $("#masterGrid").getRowData(ids[i]).customerTaxNum,
						"mblNo" 					: $("#masterGrid").getRowData(ids[i]).mblNo,
						"hblNo" 					: $("#masterGrid").getRowData(ids[i]).hblNo.substring(39).replace("</a></u></b>", ""),
						"cargoNo" 					: $("#masterGrid").getRowData(ids[i]).cargoNo,
						"singoNo" 					: $("#masterGrid").getRowData(ids[i]).singoNo.replace(/-/gi,""),
						"singoDate" 				: $("#masterGrid").getRowData(ids[i]).singoDate,
						"suirDate" 					: $("#masterGrid").getRowData(ids[i]).suirDate.replace(/-/gi,"")+"235959",
						"cargoStatus" 				: "D",
						"pojangSu" 					: $("#masterGrid").getRowData(ids[i]).pojangSu,
						"pojangDanwi" 				: $("#masterGrid").getRowData(ids[i]).pojangDanwi,
						"totalJung" 				: $("#masterGrid").getRowData(ids[i]).totalJung,
						"jungDanwi" 				: $("#masterGrid").getRowData(ids[i]).jungDanwi,
						"impoSegwan" 				: $("#masterGrid").getRowData(ids[i]).impoSegwan,
						"impoJangchBuho" 			: $("#masterGrid").getRowData(ids[i]).impoJangchBuho,
						"impoJangchName" 			: $("#masterGrid").getRowData(ids[i]).impoJangchName,
						"impoJangchJangso" 			: $("#masterGrid").getRowData(ids[i]).impoJangchJangso,
						"impoBanipDate" 			: $("#masterGrid").getRowData(ids[i]).impoBanipDate,
						"deliveryStatus" 			: "20",
						"banipPlace" 				: $("#masterGrid").getRowData(ids[i]).banipPlace,
						"cargoSize" 				: $("#masterGrid").getRowData(ids[i]).cargoSize,
						"deliveryPojangSu" 			: $("#masterGrid").getRowData(ids[i]).deliveryPojangSu,
						"deliveryPojangDanwi"		: $("#masterGrid").getRowData(ids[i]).deliveryPojangDanwi,
						"deliveryJung" 				: $("#masterGrid").getRowData(ids[i]).deliveryJung,
						"deliveryJungDanwi" 		: $("#masterGrid").getRowData(ids[i]).deliveryJungDanwi,
						"requestCoName" 			: $("#masterGrid").getRowData(ids[i]).requestCoName,
						"requestMan" 				: $("#masterGrid").getRowData(ids[i]).requestMan,
						"requestPhone" 				: $("#masterGrid").getRowData(ids[i]).requestPhone,
						"requestDate" 				: $("#masterGrid").getRowData(ids[i]).requestDate,
						"requestNote" 				: $("#masterGrid").getRowData(ids[i]).requestNote,
						"requestInvisibleNote" 		: $("#masterGrid").getRowData(ids[i]).requestInvisibleNote,
						"deliveryDate" 				: "",
						"assignId" 					: "",
						"assignMan" 				: $("#masterGrid").getRowData(ids[i]).assignMan,
						"assignPhone" 				: $("#masterGrid").getRowData(ids[i]).assignPhone,
						"allocateRequestDate" 		: "",
						"deliveryCoKey" 			: "",
						"deliveryCoName" 			: "",
						"deliveryCoPhone" 			: "",
						"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
						"deliveryCarryingInName" 	: $("#insertForm #deliveryCarryingInName").val(),
						"deliveryCarryingInPhone" 	: $("#insertForm #deliveryCarryingInPhone").val(),
						"deliveryCarryingInTaxNum" 	: "",
						"deliveryCarryingInFax" 	: "",
						"deliveryCarryingInEmail" 	: $("#insertForm #deliveryCarryingInEmail").val(),
						"deliveryCarryingInMan" 	: $("#insertForm #deliveryCarryingInMan").val(),
						"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
						"deliveryCarryingInAddr" 	: $("#insertForm #deliveryCarryingInAddr").val(),
						"allocateDate" 				: "",
						"deliveryCarKey" 			: null,
						"deliveryCarName" 			: "",
						"deliveryCarPhone" 			: "",
						"deliveryCarNum" 			: "",
						"deliveryStartDate" 		: "",
						"deliveryEndDate" 			: "",
						"damage" 					: "",
						"damageDetail" 				: "",
						"useYn" 					: "Y"
                    });
                } else {
                    alert("운송의뢰 상태만 착지수정 가능합니다.");
                    return;
                }
            }
        }

        var params = {"importDeliveryRequestList": dd};

        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/edms/saveImportDeliveryModifyList",
            processData: false,
            data: JSON.stringify(params),
            success: function (returnValue, textStatus, jqXHR) {
                _isSuccessArr.push(true);
            },
            error: function (e) {
                console.log(e);
                _isSuccessArr.push(false);
                alert(e.responseText);
                return -1;
            }
        });

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
                alert("착지 수정되었습니다.");
                fn_searchAction();
            }, 500);
        }

    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
}

function checkCarryingInAdd(){
	var $grid = $('#masterGrid'),
    rowid = $grid.getGridParam("selrow"),
    rowData = $grid.jqGrid('getRowData', rowid);

	var _isSuccessArr = [];
	var dd = [];

    dd.push({
		"customerKey" 				: rowData.customerKey,
		"customerDb" 				: rowData.customerDb,
		"customerCode" 				: rowData.customerCode,
		"customerName" 				: rowData.customerName,
		"customerTaxNum" 			: rowData.customerTaxNum,
		"mblNo" 					: rowData.mblNo,
		"hblNo" 					: rowData.hblNo.substring(39).replace("</a></u></b>", ""),
		"cargoNo" 					: rowData.cargoNo,
		"singoNo" 					: rowData.singoNo.replace(/-/gi,""),
		"singoDate" 				: rowData.singoDate,
		"suirDate" 					: rowData.suirDate.replace(/-/gi,"")+"235959",
		"cargoStatus" 				: rowData.cargoStatus,
		"pojangSu" 					: rowData.pojangSu,
		"pojangDanwi" 				: rowData.pojangDanwi,
		"totalJung" 				: rowData.totalJung,
		"jungDanwi" 				: rowData.jungDanwi,
		"impoSegwan" 				: rowData.impoSegwan,
		"impoJangchBuho" 			: rowData.impoJangchBuho,
		"impoJangchName" 			: rowData.impoJangchName,
		"impoJangchJangso" 			: rowData.impoJangchJangso,
		"impoBanipDate" 			: rowData.impoBanipDate,
		"deliveryStatus" 			: "20",
		"banipPlace" 				: rowData.banipPlace,
		"cargoSize" 				: rowData.cargoSize,
		"deliveryPojangSu" 			: rowData.deliveryPojangSu,
		"deliveryPojangDanwi"		: rowData.deliveryPojangDanwi,
		"deliveryJung" 				: rowData.deliveryJung,
		"deliveryJungDanwi" 		: rowData.deliveryJungDanwi,
		"requestCoName" 			: rowData.requestCoName,
		"requestMan" 				: rowData.requestMan,
		"requestPhone" 				: rowData.requestPhone,
		"requestDate" 				: rowData.requestDate,
		"requestNote" 				: rowData.requestNote,
		"requestInvisibleNote" 		: rowData.requestInvisibleNote,
		"deliveryDate" 				: rowData.deliveryDate,
		"assignId" 					: rowData.assignId,
		"assignMan" 				: rowData.assignMan,
		"assignPhone" 				: rowData.assignPhone,
		"allocateRequestDate" 		: rowData.allocateRequestDate,
		"deliveryCoKey" 			: rowData.deliveryCoKey,
		"deliveryCoName" 			: rowData.deliveryCoName,
		"deliveryCoPhone" 			: rowData.deliveryCoPhone,
		"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
		"deliveryCarryingInName" 	: $("#insertForm #deliveryCarryingInName").val(),
		"deliveryCarryingInPhone" 	: $("#insertForm #deliveryCarryingInPhone").val(),
		"deliveryCarryingInTaxNum" 	: "",
		"deliveryCarryingInFax" 	: "",
		"deliveryCarryingInEmail" 	: $("#insertForm #deliveryCarryingInEmail").val(),
		"deliveryCarryingInMan" 	: $("#insertForm #deliveryCarryingInMan").val(),
		"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
		"deliveryCarryingInAddr" 	: $("#insertForm #deliveryCarryingInAddr").val(),
		"allocateDate" 				: rowData.allocateDate,
		"deliveryCarKey" 			: rowData.deliveryCarKey,
		"deliveryCarName" 			: rowData.deliveryCarName,
		"deliveryCarPhone" 			: rowData.deliveryCarPhone,
		"deliveryCarNum" 			: rowData.deliveryCarNum,
		"deliveryStartDate" 		: rowData.deliveryStartDate,
		"deliveryEndDate" 			: rowData.deliveryEndDate,
		"damage" 					: rowData.damage,
		"damageDetail" 				: rowData.damageDetail,
		"useYn" 					: "Y"
    });

    var params = {
		"importDeliveryRequestList"	: dd,
    	"_defaultDB"				: rowData.customerDb,
    	"code"						: rowData.customerCode,
    	"blNo"						: rowData.hblNo.substring(39).replace("</a></u></b>", ""),
    	"singoNo"					: rowData.singoNo.replace(/-/gi,"")
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        async : false,
        url: "../apis/edms/saveImportDeliveryAddList",
        processData: false,
        data: JSON.stringify(params),
        success: function (returnValue, textStatus, jqXHR) {
            _isSuccessArr.push(true);
        },
        error: function (e) {
            console.log(e);
            _isSuccessArr.push(false);
            alert(e.responseText);
            return -1;
        }
    });

    if (_isSuccessArr.indexOf(false) == -1) {
        setTimeout(function () {
            alert("착지 추가되었습니다.");
            fn_searchAction();
        }, 500);
    }
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

	var _isSuccessArr = [];
	var dd = [];

    dd.push({
    	"deliveryRequestKey" 		: rowData.deliveryRequestKey,
		"customerKey" 				: rowData.customerKey,
		"customerDb" 				: rowData.customerDb,
		"customerCode" 				: rowData.customerCode,
		"customerName" 				: rowData.customerName,
		"customerTaxNum" 			: rowData.customerTaxNum,
		"mblNo" 					: rowData.mblNo,
		"hblNo" 					: $("#insertForm #hblNo").val(),
		"cargoNo" 					: rowData.cargoNo,
		"singoNo" 					: $("#insertForm #singoNo").val(),
		"singoDate" 				: rowData.singoDate,
		"suirDate" 					: rowData.suirDate.replace(/-/gi,"")+"235959",
		"cargoStatus" 				: rowData.cargoStatus,
		"pojangSu" 					: $("#insertForm #pojangSu").val(),
		"pojangDanwi" 				: $("#insertForm #pojangDanwi").val(),
		"totalJung" 				: $("#insertForm #totalJung").val(),
		"jungDanwi" 				: $("#insertForm #jungDanwi").val(),
		"impoSegwan" 				: $("#insertForm #impoSegwan").val(),
		"impoJangchBuho" 			: $("#insertForm #impoJangchBuho").val(),
		"impoJangchName" 			: $("#insertForm #impoJangchName").val(),
		"impoJangchJangso" 			: $("#insertForm #impoJangchJangso").val(),
		"impoBanipDate" 			: $("#insertForm #impoBanipDate").val(),
		"deliveryStatus" 			: "20",
		"banipPlace" 				: $("#insertForm #banipPlace").val(),
		"cargoSize" 				: $("#insertForm #cargoSize").val(),
		"deliveryPojangSu" 			: $("#insertForm #deliveryPojangSu").val(),
		"deliveryPojangDanwi"		: $("#insertForm #deliveryPojangDanwi").val(),
		"deliveryJung" 				: $("#insertForm #deliveryJung").val(),
		"deliveryJungDanwi" 		: $("#insertForm #deliveryJungDanwi").val(),
		"requestCoName" 			: $("#insertForm #requestCoName").val(),
		"requestMan" 				: $("#insertForm #requestMan").val(),
		"requestPhone" 				: $("#insertForm #requestPhone").val(),
		"requestDate" 				: rowData.requestDate,
		"requestNote" 				: $("#insertForm #requestNote").val(),
		"requestInvisibleNote" 		: $("#insertForm #requestInvisibleNote").val(),
		"deliveryDate" 				: rowData.deliveryDate,
		"assignId" 					: rowData.assignId,
		"assignMan" 				: $("#insertForm #assignMan").val(),
		"assignPhone" 				: $("#insertForm #assignPhone").val(),
		"allocateRequestDate" 		: rowData.allocateRequestDate,
		"deliveryCoKey" 			: rowData.deliveryCoKey,
		"deliveryCoName" 			: rowData.deliveryCoName,
		"deliveryCoPhone" 			: rowData.deliveryCoPhone,
		"deliveryCarryingInKey" 	: $("#insertForm #deliveryCarryingInKey").val(),
		"deliveryCarryingInName" 	: $("#insertForm #deliveryCarryingInName").val(),
		"deliveryCarryingInPhone" 	: $("#insertForm #deliveryCarryingInPhone").val(),
		"deliveryCarryingInTaxNum" 	: "",
		"deliveryCarryingInFax" 	: "",
		"deliveryCarryingInEmail" 	: $("#insertForm #deliveryCarryingInEmail").val(),
		"deliveryCarryingInMan" 	: $("#insertForm #deliveryCarryingInMan").val(),
		"deliveryCarryingInMobile"	: $("#insertForm #deliveryCarryingInMobile").val(),
		"deliveryCarryingInAddr" 	: $("#insertForm #deliveryCarryingInAddr").val(),
		"allocateDate" 				: rowData.allocateDate,
		"deliveryCarKey" 			: rowData.deliveryCarKey,
		"deliveryCarName" 			: rowData.deliveryCarName,
		"deliveryCarPhone" 			: rowData.deliveryCarPhone,
		"deliveryCarNum" 			: rowData.deliveryCarNum,
		"deliveryStartDate" 		: rowData.deliveryStartDate,
		"deliveryEndDate" 			: rowData.deliveryEndDate,
		"damage" 					: rowData.damage,
		"damageDetail" 				: rowData.damageDetail,
		"useYn" 					: "Y"
    });

    var params = {"importDeliveryRequestList": dd};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        async : false,
        url: "../apis/edms/saveImportDeliveryModifyList",
        processData: false,
        data: JSON.stringify(params),
        success: function (returnValue, textStatus, jqXHR) {
            _isSuccessArr.push(true);
        },
        error: function (e) {
            console.log(e);
            _isSuccessArr.push(false);
            alert(e.responseText);
            return -1;
        }
    });

    if (_isSuccessArr.indexOf(false) == -1) {
        setTimeout(function () {
            alert("의뢰 내용 수정되었습니다.");
            refreshGridPage(selrow,pageNum);
        }, 500);
    }
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
                if ($("#masterGrid").getRowData(ids[i]).deliveryStatus == '20') {
                    dd.push({
                    	"deliveryRequestKey" 		: $("#masterGrid").getRowData(ids[i]).deliveryRequestKey,
						"customerKey" 				: $("#masterGrid").getRowData(ids[i]).customerKey,
						"customerDb" 				: $("#masterGrid").getRowData(ids[i]).customerDb,
						"customerCode" 				: $("#masterGrid").getRowData(ids[i]).customerCode,
						"customerName" 				: $("#masterGrid").getRowData(ids[i]).customerName,
						"customerTaxNum" 			: $("#masterGrid").getRowData(ids[i]).customerTaxNum,
						"mblNo" 					: $("#masterGrid").getRowData(ids[i]).mblNo,
						"hblNo" 					: $("#masterGrid").getRowData(ids[i]).hblNo.substring(39).replace("</a></u></b>", ""),
						"cargoNo" 					: $("#masterGrid").getRowData(ids[i]).cargoNo,
						"singoNo" 					: $("#masterGrid").getRowData(ids[i]).singoNo.replace(/-/gi,""),
						"singoDate" 				: $("#masterGrid").getRowData(ids[i]).singoDate,
						"suirDate" 					: $("#masterGrid").getRowData(ids[i]).suirDate.replace(/-/gi,"")+"235959",
						"cargoStatus" 				: "D",
						"pojangSu" 					: $("#masterGrid").getRowData(ids[i]).pojangSu,
						"pojangDanwi" 				: $("#masterGrid").getRowData(ids[i]).pojangDanwi,
						"totalJung" 				: $("#masterGrid").getRowData(ids[i]).totalJung,
						"jungDanwi" 				: $("#masterGrid").getRowData(ids[i]).jungDanwi,
						"impoSegwan" 				: $("#masterGrid").getRowData(ids[i]).impoSegwan,
						"impoJangchBuho" 			: $("#masterGrid").getRowData(ids[i]).impoJangchBuho,
						"impoJangchName" 			: $("#masterGrid").getRowData(ids[i]).impoJangchName,
						"impoJangchJangso" 			: $("#masterGrid").getRowData(ids[i]).impoJangchJangso,
						"impoBanipDate" 			: $("#masterGrid").getRowData(ids[i]).impoBanipDate,
						"deliveryStatus" 			: "20",
						"banipPlace" 				: $("#masterGrid").getRowData(ids[i]).banipPlace,
						"cargoSize" 				: $("#masterGrid").getRowData(ids[i]).cargoSize,
						"deliveryPojangSu" 			: $("#masterGrid").getRowData(ids[i]).deliveryPojangSu,
						"deliveryPojangDanwi"		: $("#masterGrid").getRowData(ids[i]).deliveryPojangDanwi,
						"deliveryJung" 				: $("#masterGrid").getRowData(ids[i]).deliveryJung,
						"deliveryJungDanwi" 		: $("#masterGrid").getRowData(ids[i]).deliveryJungDanwi,
						"requestCoName" 			: $("#masterGrid").getRowData(ids[i]).requestCoName,
						"requestMan" 				: $("#masterGrid").getRowData(ids[i]).requestMan,
						"requestPhone" 				: $("#masterGrid").getRowData(ids[i]).requestPhone,
						"requestDate" 				: $("#masterGrid").getRowData(ids[i]).requestDate,
						"requestNote" 				: $("#masterGrid").getRowData(ids[i]).requestNote,
						"requestInvisibleNote" 		: $("#masterGrid").getRowData(ids[i]).requestInvisibleNote,
						"deliveryDate" 				: "",
						"assignId" 					: "",
						"assignMan" 				: $("#masterGrid").getRowData(ids[i]).assignMan,
						"assignPhone" 				: $("#masterGrid").getRowData(ids[i]).assignPhone,
						"allocateRequestDate" 		: "",
						"deliveryCoKey" 			: "",
						"deliveryCoName" 			: "",
						"deliveryCoPhone" 			: "",
						"deliveryCarryingInKey" 	: null,
						"deliveryCarryingInName" 	: "",
						"deliveryCarryingInPhone" 	: "",
						"deliveryCarryingInTaxNum" 	: "",
						"deliveryCarryingInFax" 	: "",
						"deliveryCarryingInEmail" 	: "",
						"deliveryCarryingInMan" 	: "",
						"deliveryCarryingInMobile"	: "",
						"deliveryCarryingInAddr" 	: "",
						"allocateDate" 				: "",
						"deliveryCarKey" 			: null,
						"deliveryCarName" 			: "",
						"deliveryCarPhone" 			: "",
						"deliveryCarNum" 			: "",
						"deliveryStartDate" 		: "",
						"deliveryEndDate" 			: "",
						"damage" 					: "",
						"damageDetail" 				: "",
						"useYn" 					: "N"
                    });

                    var params = {
                    	"importDeliveryRequestList"	: dd,
                    	"_defaultDB"				: $("#masterGrid").getRowData(ids[i]).customerDb,
                    	"code"						: $("#masterGrid").getRowData(ids[i]).customerCode,
                    	"blNo"						: $("#masterGrid").getRowData(ids[i]).hblNo.substring(39).replace("</a></u></b>", ""),
                    	"singoNo"					: $("#masterGrid").getRowData(ids[i]).singoNo.replace(/-/gi,"")
                    };

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: 'json',
                        async : false,
                        url: "../apis/edms/deleteImportDeliveryRequestList",
                        processData: false,
                        data: JSON.stringify(params),
                        success: function (returnValue, textStatus, jqXHR) {
                            _isSuccessArr.push(true);
                        },
                        error: function (e) {
                            console.log(e);
                            _isSuccessArr.push(false);
                            alert(e.responseText);
                            return -1;
                        }
                    });
                }else{
                	alert('운송의뢰 상태에서만 삭제 가능합니다.');
                	_isSuccessArr.push(false);
                }
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
                alert("삭제되었습니다.");
                fn_searchAction();
            }, 500);
        }

    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
}

//********** 메인 분류 선택시 수입액션 (파일 리스트 조회)**********//
var fn_fileListImportAction = function(ddd){
	var url1 	= "../apis/edms/getEdmsMasterWithFileList",
		params1 = {
			"edmsNum"		: ddd.hblNo.substring(39).replace("</a></u></b>", ""),
			"edmsSingoNum"	: ddd.singoNo.replace(/-/gi, ""),
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

var keyDown = function() {
    if (event.keyCode == 13) fn_searchAction();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var mblno 	= row.mblNo;
	var singo 	= row.singoDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

var fn_carryingIn = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(row.deliveryStatus != '20'){
	        alert("운송의뢰시에만 착지 변경이 가능합니다.");
	        return;
	    }

		openWindowWithPost("./deliveryCarryingInList.sein", "width=800, height=450, scrollbars=no, location=no, menubar=no", "CarryingInList", {
			"Ctype" : "B"
	    });
	}else{
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
	}
};

function fn_carryingAdd(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(row.deliveryStatus != "20"){
			alert("운송의뢰건만 선택해 주세요.");
			return;
		}

	    if (!confirm("추가 도착지등록하시겠습니까?")) return;

	    openWindowWithPost("./deliveryCarryingInList.sein", "width=800, height=450, scrollbars=no, location=no, menubar=no", "CarryingInList", {
            "Ctype" : "C"
        });

	}else{
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
	}
};

var fn_changeMan = function(obj){
	if(obj.value=="김현정"){
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1764");
	}else{
		$("#insertForm #assignCom").val("세인TNL");
		$("#insertForm #assignPhone").val("070-4353-1506");
	}
};

function fn_homeView(){
	parent.document.all('sframe').cols="*,0,0,0";
}