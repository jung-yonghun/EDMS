function getUserList(){
	var url 	= "./apis/edms/getUserList",
	    params 	= {},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#masterGrid').datagrid('loadData', d);
	});

	setTimeout(function(){
	if($('#setUser').val() != ""){
		var arrUser = $('#setUser').val().split(',');
		var k = [];

		for (var y=0; y < arrUser.length-1; y++){
			var url 	= "./apis/edms/getUserList",
			    params 	= {"userId" : arrUser[y]},
			    type 	= "POST";

			$.ajax({
				type 		: type,
				contentType : "application/json",
				dataType 	: 'json',
				url 		: url,
				processData : true,
				cache 		: false,
				async		: false,
				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
				success 	: function(returnValue){
					k.push({
			            "userId1"   : returnValue[0].userId,
			            "userName1" : returnValue[0].userName
			        });
				},
				error 		: function(e){
				}
			});
		}
		$('#manGrid').datagrid('loadData', k);
	}
	},1000);
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '세인',
			width			: '440px',
			height			: '370px',
			fitColumns		: true,
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			remoteSort		: false,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'userName',title:'이름',width:100,align:'center',sortable:true},
                {field:'userDepart',title:'부서',width:100,sortable:true},
                {field:'userJikchk',title:'직책',width:50,align:'center',sortable:true},
                {field:'userId',title:'ID',width:80,align:'center',sortable:true}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#manGrid').datagrid({
			title			: '수신자',
			width			: '80px',
			height			: '340px',
			fitColumns		: true,
			singleSelect	: true,
			columns			: [[
                {field:'userName1',title:'이름',width:100,align:'center'},
                {field:'userId1',hidden:true}
	        ]]
		});
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
	getUserList();
};

var fn_insertAction = function(){
	var d = [];
	var rows = $('#masterGrid').datagrid('getSelections');
	var rows1 = $('#manGrid').datagrid('getRows');
	for(var i = 0; i < rows1.length; i++){
		d.push({
            "userId1"   : rows1[i].userId1,
            "userName1" : rows1[i].userName1
        });
    }

    if(rows.length < 1){
		alert("왼쪽 인원을 선택해 주세요.");
		return;
	}

    for(var i = 0; i <rows.length; i ++){
    	var jj = 0;
    	for(var j = 0; j < rows1.length; j++){
    		if(rows1[j].userId1 == rows[i].userId){
    			jj += 1;
    		}
    	}
    	if(jj < 1){
	    	d.push({
	            "userId1"   : rows[i].userId,
	            "userName1" : rows[i].userName
	        });
    	}
	}

    try{
    	$('#manGrid').datagrid('loadData', d);
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

var fn_deleteAction = function(){
	var row = $('#manGrid').datagrid('getSelected');
	if(row){
		var index = $('#manGrid').datagrid('getRowIndex', row);
		$('#manGrid').datagrid('deleteRow', index);
	}else{
		alert("오른쪽 수신자를 선택해주세요.");
	}
};

var fn_addAction = function(){
	var rows = $('#manGrid').datagrid('getRows');
	if(rows.length < 1){
		alert("반영할 수신자가 없습니다.");
		return;
	}
	var receiver = "";
	for(var i = 0; i < rows.length; i++){
		receiver += rows[i].userId1+",";
    }

	opener.document.insertForm.sRecvLogonCDs.value=receiver;
	window.close();
};