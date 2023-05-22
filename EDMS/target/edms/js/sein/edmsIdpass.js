function fn_idcheck(){
	frm = document.idForm;
	if(frm.userNm.value == ""){
		$('#dlg').empty();
		$('#dlg').append("이름을 입력하세요");
		$('#dlg').window('open');
		frm.userNm.focus();
		return;
	}else if(frm.email.value == ""){
		$('#dlg').empty();
		$('#dlg').append("이메일을 입력하세요");
		$('#dlg').window('open');
		frm.email.focus();
		return;
	}else if(!isEmail(frm.email.value)){
		frm.email.value = "";
		frm.email.focus();
		return;
	}else{
		idsearch();
	}
}

function fn_passCheck(){
	frm = document.passForm;
	if(frm.userId.value == ""){
		$('#dlg').empty();
		$('#dlg').append("ID를 입력하세요");
		$('#dlg').window('open');
		return;
	}else if(frm.userNm.value == ""){
		$('#dlg').empty();
		$('#dlg').append("이름을 입력하세요");
		$('#dlg').window('open');
		frm.userNm.focus();
		return;
	}else if(frm.email.value == ""){
		$('#dlg').empty();
		$('#dlg').append("이메일을 입력하세요");
		$('#dlg').window('open');
		frm.email.focus();
		return;
	}else if(!isEmail(frm.email.value)){
		frm.email.value = "";
		frm.email.focus();
		return;
	}else{
		passsearch();
	}
}

function idsearch(){
	var params = $("#idForm").serializeObject();
	$.ajax({
		type 			: "POST",
		contentType 	: "application/json",
		dataType 		: 'json',
		url 			: "./getUserIdOrPassword",
		processData 	: false,
		data 			: JSON.stringify(params),
		success : function(returnValue, textStatus, jqXHR){
			if(returnValue.userId == ""){
				$('#dlg').empty();
				$('#dlg').append("사용자 정보가 틀립니다");
				$('#dlg').window('open');
			}else{
				$('#dlg').empty();
				$('#dlg').append("ID는 "+returnValue.userId+" 입니다.");
				$('#dlg').window('open');
			}
		},
		error : function(e){
			console.log(e);
			$('#dlg').empty();
			$('#dlg').append("정보가 틀립니다");
			$('#dlg').window('open');
			return -1;
		}
	});
}

function passsearch(){
	var params = $("#passForm").serializeObject();
	$.ajax({
		type 			: "POST",
		contentType 	: "application/json",
		dataType 		: 'json',
		url 			: "./getUserIdOrPassword",
		processData 	: false,
		data 			: JSON.stringify(params),
		success : function(returnValue, textStatus, jqXHR){
			if(returnValue.userId == ""){
				$('#dlg').empty();
				$('#dlg').append("사용자 정보가 틀립니다");
				$('#dlg').window('open');
			}else{
				$('#dlg').empty();
				$('#dlg').append("새 PW는 1111입니다.");
				$('#dlg').window('open');
				setTimeout(function(){document.location.href="./edmsLogin.sein";},2000);
			}
		},
		error : function(e){
			$('#dlg').empty();
			$('#dlg').append("정보가 틀립니다");
			$('#dlg').window('open');
			return -1;
		}
	});
}

function cancelAction(){
	document.passForm.action = "./edmsLogin.sein";
	document.passForm.submit();
};