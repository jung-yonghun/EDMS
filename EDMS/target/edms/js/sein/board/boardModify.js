var console = window.console || {log:function(){}};
var sIds;

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	var params 	= {"noticesKey":$('#noticesKey').val()},
		url 	= "../apis/system/getNoticeList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		d.content[0]['noticesYn'] == "" ? $("#noticesYn option:eq(0)").attr("selected", "selected") : $("#noticesYn").val(d.content[0]['noticesYn']);
		$("#keyword").val(d.content[0]['keyword']);
		$("#subject").val(d.content[0]['subject']);
		$("#contents").val(d.content[0]['contents']);
		$("#category").val(d.content[0]['category']);
		$("#useYn").val(d.content[0]['useYn']);
		$("#fileAttachedYn").val(d.content[0]['fileAttachedYn']);
		Editor.modify({
			"content": $("#contents").val()
		});
	});

	var params 	= {"noticeKey":$('#noticesKey').val(),"useYn":"Y"},
		url 	= "../apis/system/getNoticeFileList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		drawfileList(d.content);
		$("#filelist").show();
	});

	$("#fileInsert").click(function(){
		if(confirm("첨부 하시겠습니까?")){
			extraObj.startUpload();
			$("#fileAttachedYn").val("Y");
			params 		= $("#tx_editor_form").serializeObject();
			var url 	= "../apis/system/saveNoticeInfo",
				type 	= "POST";

			sendAjax(url, params, type, function(d) {
				console.log(d);
				if(!d.content) return;
			});
		}else{
			return;
		}
	});

	var count=0;
	var extraObj = $("#fileuploader").uploadFile({
		url						: "../apis/system/uploadNoticeFile",
		fileName				: "myfile",
		autoSubmit 				: true,
		multiple				: true,
		dragDrop				: true,
		dragdropWidth			: 750,
		statusBarWidth			: 590,
		maxFileSize				: 10000*1024,
		showAbort 				: false,
		showDone 				: false,
		showDelete 				: false,
		showError 				: false,
		showStatusAfterSuccess 	: false,
		showStatusAfterError	: false,
		allowedTypes			: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip",
		returnType				: "json",
		customProgressBar		: function(obj,s) {
			this.statusbar 		= $("<div class='custom-statusbar'></div>");
            this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar);
            this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
			this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if(count++ %2 ==0)
	            this.statusbar.addClass("even");
            else
    			this.statusbar.addClass("odd");
			return this;

		},
		dynamicFormData	: function(){
			var data ={"noticeKey":$('#noticesKey').val(),"_csrf":$('#_csrf').val(),"yyyymmdd":$('#yyyymmdd').val()}
			return data;
		},
		afterUploadAll	: function(obj){
			$("#fileAttachedYn").val("Y");
			params 		= $("#tx_editor_form").serializeObject();
			var url 	= "../apis/system/saveNoticeInfo",
				type 	= "POST";

			sendAjax(url, params, type, function(d) {
				console.log(d);
				if(!d.content) return;
			});
			alert("첨부되었습니다");
			setInterval(function(){
				document.location.reload();
			}, 1000);
		}
	});
});

var drawfileList = function(data){
	var optList = new Array();
	for(var i = 0 ; i < data.length ; i++){
		optList[optList.length] = "<tr height='30'><td width='100%'><a onclick='javascript:fn_downAction(" + data[i].fileKey + ",\"" + data[i].originalFileName + "\")'>" + data[i].originalFileName + "</a>  <a onclick='javascript:fn_delAction(" + data[i].fileKey + "," + data[i].noticeKey + ",\"" + data[i].originalFileName + "\")'><font color='red'><b>삭제</b></font></a></td></tr>";
	}
	$("#filelist").html(optList.join("\n"));
};

function fnCheckInput(){
	if(confirm("[수정] 하시겠습니까?")){
		Editor.save();
	}
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
		var params 	= {"noticesKey":$('#noticesKey').val(), "useYn":"Y"},
			url 	= "../apis/system/getNoticeFileList",
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!d.content) return;
			if(d.content.length==0){
				$("#fileAttachedYn").val("N");
			}
		});

		params = $("#tx_editor_form").serializeObject();
		var url 	= "../apis/system/saveNoticeInfo",
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			opener.document.location.href = "./mainContents.sein";
			window.close();
		});
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};

var fn_delAction = function(fileKey, noticeKey, originalFileName){
	params = {"fileKey":fileKey, "noticeKey":noticeKey, "originalFileName":originalFileName};
	var url 	= "../apis/system/deleteNoticeFile",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
	});

	var params 	= {"noticeKey":$('#noticeKey').val(), "useYn":"Y"},
		url 	= "../apis/system/getNoticeFileList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		if(d.content.length==1){
			fn_fileAction();
		}else{
			document.location.reload();
		}
	});
};

var fn_fileAction = function(){
	$("#fileAttachedYn").val("N");
	params = $("#tx_editor_form").serializeObject();
	var url 	= "../apis/system/saveNoticeInfo",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		document.location.reload();
	});
};

var closeAction = function(){
	opener.document.location.href = "./mainContents.sein";
	window.close();
};

var fn_downAction = function(File_Key, FileName){
	location.href = "../apis/system/downloadNoticeFile?fileKey=" + File_Key + "&noticeKey=" + $('#noticeKey').val() + "&originalFileName=" + FileName;
};