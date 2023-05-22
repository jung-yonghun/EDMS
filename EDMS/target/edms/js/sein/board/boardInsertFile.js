var console = window.console || {log:function(){}};
var sIds;

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	var params 	= {"noticesKey":$('#noticeKey').val()};
	var url 	= "../apis/system/getNoticeList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		$("#addUserId").val(d.content[0]['addUserId']);
		$("#subject").val(d.content[0]['subject']);
		$("#keyword").val(d.content[0]['keyword']);
		$("#contents").val(d.content[0]['contents']);
		$("#noticesYn").val(d.content[0]['noticesYn']);
		$("#category").val(d.content[0]['category']);
	});

//	$("#fileInsert").click(function(){
//		if(confirm("파일을 첨부 하시겠습니까?")){
//			extraObj.startUpload();
//			params 		= $("#frm1").serializeObject();
//			var url 	= "../apis/system/saveNoticeInfo",
//				type 	= "POST";
//
//			sendAjax(url, params, type, function(d) {
//				if(!d.content) return;
//			});
//		}else{
//			return;
//		}
//	});

	var count=0;
	var extraObj = $("#fileuploader").uploadFile({
		url						: "../apis/system/uploadNoticeFile",
		fileName				: "myfile",
		autoSubmit 				: true,
		multiple				: true,
		dragDrop				: true,
		dragdropWidth			: 750,
		statusBarWidth			: 530,
		maxFileSize				: 10000*1024,
		showAbort 				: false,
		showDone 				: false,
		showDelete 				: false,
		showError 				: false,
		showStatusAfterSuccess 	: false,
		showStatusAfterError	: false,
		allowedTypes			: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip",
		returnType				: "json",
		customProgressBar		: function(obj,s){
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
		dynamicFormData : function(){
			var data = $("#frm1").serializeObject()
			return data;
		},
		afterUploadAll : function(obj){
			params 		= $("#frm1").serializeObject();
			var url 	= "../apis/system/saveNoticeInfo",
				type 	= "POST";

			sendAjax(url, params, type, function(d) {
				if(!d.content) return;
			});
			alert("첨부되었습니다");
			setInterval(function(){
				opener.document.location.href = "./mainContents.sein";
				window.close();
			}, 1000);
		}
	});
});

var winClose = function(){
	opener.document.location.href = "./mainContents.sein";
	window.close();
};