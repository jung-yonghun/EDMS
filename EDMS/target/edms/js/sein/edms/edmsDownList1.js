//********** 메인 나의 리스트**********//
function selectEdmsMasterMyList(callback){
    progress.show();
    var url 	= "../apis/edms/getItemFileDownList",
        params 	= {
            "edmsComSaup" : $('#frm2 #edmsComSaup').val()
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
    	console.log(d);
        callback(d);
    });
}

//********** 일괄다운로드 ZIP **********//
function saveZipAction(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingItemFiles",
        params = {
    		"edmsComSaup"      : $('#frm2 #edmsComSaup').val(),
            "downloadFileName" : "allDownload.zip"
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
            location.href = "../apis/edms/batchDownloadItemFiles?fileName=" + response + "";
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

//********** 초기 시작설정 **********//
$(document).ready(function () {
    $('#fileGrid').jqGrid({
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        loadtext: 'Loading...',
        emptyrecords: "조회내역 없음",
        pager: '#filePager',
        recordtext: "전체: {2} 건",
        colModel: [
            {name: 'ENACKey', index: 'ENACKey', hidden: true, key: true},
            {label: '파일명', name: 'OriginFileNm', index: 'OriginFileNm', width: 280},
            {name: 'Mmodel_code', index: 'Mmodel_code', hidden: true},
            {name: 'SaveFileNm', index: 'SaveFileNm', hidden: true},
            {name: 'FileSize', index: 'FileSize', hidden: true},
            {name: 'FilePath', index: 'FilePath', hidden: true},
            {name: 'FileExt', index: 'FileExt', hidden: true}
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

    fn_searchAction();
};

//********** 메인 리스트 나의 조회액션**********//
var fn_searchAction = function(){
	if($('#frm2 #edmsComSaup').val()==""){
		alert("사업자번호는 필수 입력항목입니다.");
		return;
	}

    selectEdmsMasterMyList(function(d){
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
                "ENACKey": $("#fileGrid").getRowData(ids[i]).ENACKey,
                "Mmodel_code": $("#fileGrid").getRowData(ids[i]).Mmodel_code,
                "OriginFileNm": $("#fileGrid").getRowData(ids[i]).OriginFileNm,
                "SaveFileNm": $("#fileGrid").getRowData(ids[i]).SaveFileNm,
                "FileSize": $("#fileGrid").getRowData(ids[i]).FileSize,
                "FilePath": $("#fileGrid").getRowData(ids[i]).FilePath,
                "FileExt": $("#fileGrid").getRowData(ids[i]).FileExt
            });
        }
    }
    saveZipAction(d, function (r) {
    });
};