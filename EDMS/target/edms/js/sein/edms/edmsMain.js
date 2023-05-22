$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#insertForm #yyyymmdd').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#insertForm #addDay').val($.datepicker.formatDate('yymmdd', new Date()));

	var count = 0;
	var extraObj = $("#fileuploader").uploadFile({
		url 					: "../apis/edms/uploadEdmsFile",
		fileName 				: "myfile",
		autoSubmit 				: true,
		multiple 				: true,
		dragDrop 				: true,
		dragdropWidth 			: 285,
		statusBarWidth 			: 250,
		maxFileSize 			: 100000*1024,
		showAbort 				: false,
		showDone 				: false,
		showDelete 				: false,
		showError 				: false,
		showStatusAfterSuccess 	: false,
		showStatusAfterError	: false,
		extErrorStr				: "저장 오류",
		sizeErrorStr			: "사이즈 100M 초과오류",
		allowedTypes 			: "xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps,oft,msg",
		returnType 				: "json",
		customProgressBar : function(obj,s){
			this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
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
			var data = $("#insertForm").serializeObject();
			return data;
		}
	});
});

var fn_popupAction = function(){
	try{
		openWindowWithPost("./edmsListFrame.sein","width=1350, height=690, scrollbars=no, location=no, menubar=no, toolbar=no, resizable=no, directories=no, status=no, left=100, top=100", "list" ,{
		});
		parent.window.close();
	}catch(e){
	};
};

var fn_popupAction1 = function(){
	try{
		var url 	= "../apis/userInfo/getUserInfoList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			parent.window.open("http://sas.customspass.com/sop/sopMainList.sas?userKey="+d[0].userKey+"&authKey="+d[0].apiKey+"");
			parent.window.close();
		});
	}catch(e){
	};
};

var fn_popupAction2 = function(){
	try{
//		var url 	= "../apis/userInfo/getUserInfoList",
//			params 	= {"userKey" : $("#userKey").val()},
//			type 	= "POST";
//
//		sendAjax(url, params, type, function(d){
//			parent.window.open("http://www.customspass.com/fieldJoin.cps?userKey="+d[0].userKey+"");
			parent.window.open("http://field.customspass.com/direct.cps?code=fieldCheck");
			parent.window.close();
//		});
	}catch(e){
	};
};