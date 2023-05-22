//********** 초기 시작설정 **********//
$(document).ready(function () {
//    $("#sendBtn").click(function(){
//    	frm = document.frm2;
//    	if(frm.sender.value == ""){
//    		alert("보내는 사람 이메일을 입력하세요");
//    		return;
//    	}else if(!isEmail(frm.sender.value)){
//    		frm.sender.value = "";
//    		frm.sender.focus();
//    		return;
//    	}else if(frm.receiver.value == ""){
//    		alert("받는 사람 이메일을 입력하세요");
//    		frm.receiver.focus();
//    		return;
//    	}else if(!isEmail(frm.receiver.value)){
//    		frm.receiver.value = "";
//    		frm.receiver.focus();
//    		return;
//    	}else if(frm.mailTitle.value == ""){
//    		alert("제목을 입력하세요");
//    		frm.mailTitle.focus();
//    		return;
//    	}else if(frm.mailContent.value == ""){
//    		alert("내용을 입력하세요");
//    		frm.mailContent.focus();
//    		return;
//    	}else{
//    		if(confirm("메일 전송 하시겠습니까?")) {
//    			frm.submit();
//    			alert("전송 되었습니다.");
//    			setTimeout(function(){
//    				self.close();
//    			}, 1000);
//    		}else{
//    			return;
//    		}
//    	}
//	});
});

function fnCheckInput(){
	Editor.save();
}

function validForm(editor){
	frm = document.tx_editor_form;
	if(frm.sender.value == ""){
		alert("보내는 사람 이메일을 입력하세요");
		frm.sender.focus();
		return false;
	}

	if(!isEmail(frm.sender.value)){
		frm.sender.value = "";
		frm.sender.focus();
		return false;
	}

	if(frm.receiver.value == ""){
		alert("받는 사람 이메일을 입력하세요");
		frm.receiver.focus();
		return false;
	}

	if(!isEmail(frm.receiver.value)){
		frm.receiver.value = "";
		frm.receiver.focus();
		return false;
	}

	if(frm.mailTitle.value == ""){
		alert("제목을 입력하세요");
		frm.mailTitle.focus();
		return false;
	}

    var validator = new Trex.Validator();
    var content = editor.getContent();
    if (!validator.exists(content)){
        alert('내용을 입력하세요');
        return false;
    }
    return true;
}

var setForm = function(editor){
	var content = editor.getContent();
	$("#mailContent").val(content);

	document.tx_editor_form.submit();
	alert("전송 되었습니다.");
	setTimeout(function(){
		self.close();
	}, 1000);
};