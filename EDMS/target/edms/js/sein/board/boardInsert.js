var console = window.console || {log:function(){}};
var sIds;

function fnCheckInput(){
	Editor.save();
}

function validForm(editor){
	frm = document.tx_editor_form;
	if (frm.subject.value == ""){
		alert("제목을 입력하세요");
		frm.subject.focus();
		return false;
	}

	if (frm.keyword.value == ""){
		alert("키워드를 입력하세요");
		frm.keyword.focus();
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
	$("#contents").val(content);
    fn_saveAction();
};

var fn_saveAction = function(){
	try{
		params 		= $("#tx_editor_form").serializeObject();
		var url 	= "../apis/system/saveNoticeInfo",
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!confirm("파일을 첨부 하시겠습니까?")){
				opener.document.location.href="./mainContents.sein";
				window.close();
			}else{
				document.location.href="./boardInsertFile.sein?noticesKey="+d['noticesKey'];
			}
		});
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};