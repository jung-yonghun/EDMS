function selectCustomerList(jisa){
    progress.show();
    var url 	= "../apis/edms/selectCustomer1",
    	params 	= {
    		"sangho" 		: $('#dealSangho').val(),
    		"_defaultDB" 	: $('#_defaultDB').val()
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$('#masterGrid').datagrid('loadData', d);
        progress.hide();
    });
};

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: '업체검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			columns			: [[
			    {field:'Deal_code',title:'업체코드',width:60,align:'center'},
                {field:'Deal_sangho',title:'업체명',width:150,align:'center'},
                {field:'Deal_saup',title:'사업자번호',width:100,align:'center'}
	        ]]
		});
    });
});

var fn_searchAction = function(){
    if ($("#dealSangho").val()==""){
        alert("상단 업체명을 입력하세요.");
        return;
    }

    selectCustomerList();
};

function onDblClickRow(index, row){
    opener.document.notForm.comName.value= row.Deal_sangho;
    opener.document.notForm.comCode.value= row.Deal_code;
    opener.document.notForm.comNum.value= row.Deal_saup;
    window.close();
}