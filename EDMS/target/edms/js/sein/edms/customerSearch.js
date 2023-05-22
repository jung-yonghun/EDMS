function selectCustomerList(jisa){
    progress.show();
    var url 	= "../apis/edms/selectCustomer",
    	params 	= {
    		"sangho" : $('#dealSangho').val(),
    		"jisa" 	 : jisa
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
                {field:'sangho',title:'업체명',width:150,align:'center'},
                {field:'saup',title:'사업자번호',width:100,align:'center'}
	        ]]
		});
    });
});

var fn_searchAction = function(){
    if ($("#dealSangho").val()==""){
        alert("상단 업체명을 입력하세요.");
        return;
    }

    selectCustomerList("ncustoms_all");
};

function onDblClickRow(index, row){
    opener.setSangho1.value= row.sangho;
    opener.setSaup1.value= row.saup;
    window.close();
}