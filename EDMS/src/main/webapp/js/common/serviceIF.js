function sendAjax(url, params, type, callback){
	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url			: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			if(returnValue.success==false){
				console.log(returnValue);
				progress.hide();
				return -1;
			}
			callback(returnValue);
		},
		error : function(e){
			console.error("에러내용", e);
			alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
			progress.hide();
			return -1;
		}
	});

	return 0;
};