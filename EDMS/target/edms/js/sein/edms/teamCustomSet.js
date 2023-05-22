function getCustomerList(code, callback){
    var url = "../apis/edms/getCustomerList",
        params = {
    		"defaultDB"		: $("#utcTradeDb").val(),
    		"CODE"			: code,
    		"SEQ"			: $("#utTeamSeq").val(),
    		"page"			: "0",
    		"size"			: "100000",
    		"_pageNumber"	: "0",
    		"_pageRow"		: "100000"
    	},
        type = "POST";

    progress.show();
    sendAjax(url, params, type, function(d){
    	console.log(d);
        progress.hide();
        callback(d.content);
    });
}

function getNcomList(){
    if($("#code").val() == ""){
        alert("업체코드를 넣으세요.");
    }else{
    	var url = "../apis/edms/getCustomerList",
	        params = {
	    		"defaultDB"		: $("#utcTradeDb").val(),
	    		"CODE"			: $("#code").val(),
	    		"SEQ"			: "",
	    		"page"			: "0",
	    		"size"			: "100000",
	    		"_pageNumber"	: "0",
	    		"_pageRow"		: "100000"
	    	},
	        type = "POST";

    	progress.show();
	    sendAjax(url, params, type, function(d){
	    	if(d.content.length > 0){
	    		progress.hide();
	    		alert("이미 동기화 되었습니다.");
	    	}else{
	    		var url 	= "../apis/edms/callSyncCustomerIndividualInfoByProcedure",
		            params 	= {
		        		"db"	: $("#utcTradeDb").val(),
		        		"code"	: $("#code").val()
		        	};

		        $.ajax({
					type 		: "POST",
					contentType : "application/json",
					dataType 	: 'json',
					url 		: url,
					processData : false,
					data 		: JSON.stringify(params),
					success 	: function(returnValue, textStatus, jqXHR){
						progress.hide();
						alert("동기화 되었습니다.");
						fn_searchAction($("#code").val());
						setTimeout(function () {
							$("#code").val("");
					    }, 1000);
					},
					error 		: function(e){
						progress.hide();
						alert("동기화 되었습니다.");
						fn_searchAction($("#code").val());
						setTimeout(function () {
							$("#code").val("");
					    }, 1000);
					}
				});
	    	}
	    });
    }
}

$(document).ready(function(){
    $(function setDataGrid(){
        $('#masterGrid').jqGrid({
            datatype	: "local",
            cellsubmit	: 'clientArray',
            editurl		: 'clientArray',
            cellEdit	: true,
            colModel	: [
                {label:'업체코드', name:'CODE', index:'CODE', width:50, align:'center', key:true},
                {label:'회사명', name:'NAME', index:'NAME', width:140},
                {label:'사업자번호', name:'TAXNUM', index:'TAXNUM', width:70, align:'center'},
                {name:'KEYS', index:'KEYS', hidden:true},
                {name:'subTAXNUM', index:'subTAXNUM', hidden:true}
            ],
            height		: 221,
            shrinkToFit	: false,
            scroll		: false,
            rowNum		: 10,
            loadtext	: 'Loading...',
            emptyrecords: "조회내역 없음",
            rownumbers	: true,
            viewrecords	: true,
            loadonce	: true,
            sortable	: true,
            multiSort	: true,
            multiselect	: true,
            gridview	: true,
            recordtext	: "",
            pager		: '#masterPager',
            beforeSelectRow: function(rowid, e){
                var $self 	= $(this), iCol, cm,
                    $td 	= $(e.target).closest("tr.jqgrow>td"),
                    $tr 	= $td.closest("tr.jqgrow"),
                    p 		= $self.jqGrid("getGridParam");

                if($(e.target).is("input[type=checkbox]") && $td.length > 0){
                    iCol 	= $.jgrid.getCellIndex($td[0]);
                    cm 		= p.colModel[iCol];
                    if(cm != null && cm.name === "cb"){
                        $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                    }
                }
                return false;
            },
            afterEditCell: function(rowid, cellname, value, iRow, iCol){
                $("#" + iRow + "_" + cellname).bind('blur', function(){
                    $('#fileGrid').saveCell(iRow, iCol);
                });
            }
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch: 'cn'});
        resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);
    });

    $("#code").bind("keyup", function(e){
        if (e.which >= 97 && e.which <= 122){
            var newKey 	= e.which - 32;
            e.keyCode 	= newKey;
            e.charCode 	= newKey;
        }

        $("#code").val(($("#code").val()).toUpperCase());
    });

    fn_searchAction('');
});

var fn_searchAction = function(code){
	getCustomerList(code, function(d){
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

var fn_insertAction = function(){
    var $t 		= $("#masterGrid");
    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');

    if(rowId.length == 0){
        alert('사업자를 선택해 주세요.');
        return;
    }

    if(!confirm("등록 하시겠습니까?")) return;

    for(var i = 0; i < ids.length; i++){
        var check = false;
        $.each(rowId, function(index, value){
            if (value == ids[i])
                check = true;
        });
        if(check){
        	var Taxnum = "";
        	if($("#masterGrid").getRowData(ids[i]).TAXNUM=='' || $("#masterGrid").getRowData(ids[i]).TAXNUM==null){
        		Taxnum = $("#masterGrid").getRowData(ids[i]).subTAXNUM;
        	}else{
        		Taxnum = $("#masterGrid").getRowData(ids[i]).TAXNUM;
        	}
            var dd = {
                "utcSeq"			: "",
                "utcName"			: $("#utcName").val(),
                "utTeamSeq"			: $("#utTeamSeq").val(),
                "utTeamCode"		: $("#utTeamCode").val(),
                "utTeamName"		: $("#utTeamName").val(),
                "utcTradeKey"		: $("#masterGrid").getRowData(ids[i]).KEYS,
                "utcTradeDb"		: $("#utcTradeDb").val(),
                "utcTradeCode"		: $("#masterGrid").getRowData(ids[i]).CODE,
                "utcTradeName"		: $("#masterGrid").getRowData(ids[i]).NAME,
                "utcEntrepreneurNo"	: Taxnum,
                "utcUseYn"			: "Y"
            };
            var url 	= "../apis/edms/saveUserTeamCustomerInfo",
                params 	= dd,
                type 	= "POST";

            sendAjax(url, params, type, function(k){
            });
        }
    }

    setTimeout(function (){
        opener.reAction();
        window.close();
    }, 500);
};