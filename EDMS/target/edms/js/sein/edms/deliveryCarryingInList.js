function getCarryInList(callback) {
    progress.show();
    var url 	= "../apis/edms/getImportDeliveryCarryingInList",
        params 	= {
    		"deliveryCarryingInNm"	: $("#deliveryCarryingInNm").val(),
    		"deliveryCarryingInMan"	: $("#deliveryCarryingInMan").val()
    	},
        type 	= "POST";

    sendAjax(url, params, type, function (d){
        console.log(d);
        progress.hide();
        callback(d);
    });
}

$(document).ready(function () {
    $(function setDataGrid() {
        $('#masterGrid').jqGrid({
            datatype: "local",
            cellsubmit: "clientArray",
            editurl: "clientArray",
            cellEdit: true,
            colModel: [
				{name: 'sdab120Key', index: 'sdab120Key', hidden: true},
				{label: '도착지 상호', name: 'deliveryCarryingInNm', index: 'deliveryCarryingInNm', width: 120},
				{label: '담당자', name: 'deliveryCarryingInMan', index: 'deliveryCarryingInMan', width: 80, align: 'center'},
				{label: '전화번호', name: 'deliveryCarryingInPhone', index: 'deliveryCarryingInPhone', width: 80, align: 'center'},
				{label: '이메일', name: 'deliveryCarryingInEmail', index: 'deliveryCarryingInEmail', width: 100},
				{label: '휴대전화', name: 'deliveryCarryingInMobile', index: 'deliveryCarryingInMobile', width: 80, align: 'center'},
				{label: '주소', name: 'deliveryCarryingInAddr', index: 'deliveryCarryingInAddr', width: 280},
				{name: 'deliveryCarryingInTaxNum', index: 'deliveryCarryingInTaxNum', hidden: true},
				{name: 'deliveryCarryingInFax', index: 'deliveryCarryingInFax', hidden: true},
				{name: 'useYn', index: 'useYn', hidden: true},
            ],
            height: 221,
            rowNum: 10,
            rowList: [10, 20, 30, 40, 50, 100],
            autowidth: true,
            shrinkToFit: false,
            loadtext: "Loading...",
            emptyrecords: "조회내역 없음",
            rownumbers: true,
            viewrecords: true,
            loadonce: true,
            sortable: true,
            multiSort: true,
            gridview: true,
            pager: "#masterPager",
            recordtext: "전체: {2} 건",
            ondblClickRow: function (rowid, e) {
                rowData = jQuery("#masterGrid").getRowData(rowid);
                fn_insertAction(rowData);
            },
            beforeSelectRow: function (rowid, e) {
                rowData = jQuery("#masterGrid").getRowData(rowid);
                sIds = rowid;
            }
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv', 0, true); // 그리드 리사이즈
    });

    fn_searchAction();
});

var fn_searchAction = function(){
    getCarryInList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

var fn_ModifyAction = function () {
    var $grid = $('#masterGrid'),
        rowid = $grid.getGridParam("selrow"),
        rowData = $grid.jqGrid('getRowData', rowid);

    if (rowid == null) {
        alert("아래 라인을 선택한 후 클릭하세요");
        return;
    }
    try {
    	document.location.href = "./deliveryCarryingInInsert.sein?SDAB120Key="+ rowData.sdab120Key +"&Ctype="+ $('#Ctype').val();
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    };
}

var keyDown = function () {
    if (event.keyCode == 13) fn_searchAction();
};

var fn_addAction = function () {
    document.location.href = "./deliveryCarryingInInsert.sein?Ctype="+ $('#Ctype').val();
}

var fn_insertAction = function (p) {
	if($('#Ctype').val()=="A"){
		opener.insertForm.deliveryCarryingInKey.value 		= p.sdab120Key;
		opener.insertForm.deliveryCarryingInNm.value 		= p.deliveryCarryingInNm;
		opener.insertForm.deliveryCarryingInMan.value 		= p.deliveryCarryingInMan;
		opener.insertForm.deliveryCarryingInMobile.value 	= p.deliveryCarryingInMobile;
		opener.insertForm.deliveryCarryingInPhone.value 	= p.deliveryCarryingInPhone;
		opener.insertForm.deliveryCarryingInEmail.value 	= p.deliveryCarryingInEmail;
		opener.insertForm.deliveryCarryingInAddr.value 		= p.deliveryCarryingInAddr;
		opener.checkCarryingInModify();
	    window.close();
	}else if($('#Ctype').val()=="B"){
		opener.insertForm.deliveryCarryingInKey.value 		= p.sdab120Key;
		opener.insertForm.deliveryCarryingInNm.value 		= p.deliveryCarryingInNm;
		opener.insertForm.deliveryCarryingInMan.value 		= p.deliveryCarryingInMan;
		opener.insertForm.deliveryCarryingInMobile.value 	= p.deliveryCarryingInMobile;
		opener.insertForm.deliveryCarryingInPhone.value 	= p.deliveryCarryingInPhone;
		opener.insertForm.deliveryCarryingInEmail.value 	= p.deliveryCarryingInEmail;
		opener.insertForm.deliveryCarryingInAddr.value 		= p.deliveryCarryingInAddr;
	    window.close();
	}else{
		opener.insertForm.deliveryCarryingInKey.value 		= p.sdab120Key;
		opener.insertForm.deliveryCarryingInNm.value 		= p.deliveryCarryingInNm;
		opener.insertForm.deliveryCarryingInMan.value 		= p.deliveryCarryingInMan;
		opener.insertForm.deliveryCarryingInMobile.value 	= p.deliveryCarryingInMobile;
		opener.insertForm.deliveryCarryingInPhone.value 	= p.deliveryCarryingInPhone;
		opener.insertForm.deliveryCarryingInEmail.value 	= p.deliveryCarryingInEmail;
		opener.insertForm.deliveryCarryingInAddr.value 		= p.deliveryCarryingInAddr;
		opener.checkCarryingInAdd();
	    window.close();
	}
}