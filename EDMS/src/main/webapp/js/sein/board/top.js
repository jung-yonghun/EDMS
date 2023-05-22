$(document).ready(function() {
	var id = $("#id").val();

	model.selectLogoInfo(id, function(d) {
		console.log(d.userLogo);
		var img = "<img src=\"../images/logo/" + d.userLogo + "\">";
		$("#images").html(img);
	});

	if($("#USERID").val()=="geodis"){
		$("#menu55").html();
		$("#menu22").html("");
	}else{
		$("#menu55").html("");
		$("#menu22").html();
	}
});

var model = model || (function(){
	var postAjax = function(url, params, callback) {
			$.ajax({
				type : "POST",
				contentType : "application/json",
				dataType : 'json',
				url : url,
				processData : false,
				data : JSON.stringify(params),
				beforeSend: function(xhr){
					xhr.setRequestHeader(csrfHeader, csrfToken);
				},
				success : function(returnValue, textStatus, jqXHR) {
					callback(returnValue);
				},
				error : function(e) {
					if(e==null) {
						alert("에러가 발생했습니다.");
					} else {
						alert(e.responseText);
					}
					progress.hide();
					return -1;
				}
			});

			return 0;
		};

	return {
		"selectLogoInfo": function(id, callback) {
			var url 	= "../apis/userInfo/getUserInfo",
				params 	= {
					"id":id
				};
			postAjax(url, params, function(d) {
				callback(d);
			});
		},
	};
})();