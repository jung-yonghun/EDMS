$(document).ready(function(){
	var url 	= "../apis/edms/getImportDeliveryRequestList",
		params 	= {
			"size" 				: "10",
			"page" 				: "0",
			"_pageRow" 			: "10",
			"_pageNumber" 		: "0",
			"deliveryRequestKey": $('#deliveryRequestKey').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d.content[0]);
		if(!isEmpty(d.content[0].requestDate)){
			$("#viewForm #requestMan").html(d.content[0].requestMan);
			$("#viewForm #requestDate").html(d.content[0].requestDate.substr(0,4)+"-"+d.content[0].requestDate.substr(4,2)+"-"+d.content[0].requestDate.substr(6,2)+" "+d.content[0].requestDate.substr(8,2)+":"+d.content[0].requestDate.substr(10,2)+":"+d.content[0].requestDate.substr(12,2));
		}
		if(!isEmpty(d.content[0].allocateRequestDate)){
			$("#viewForm #assignMan").html(d.content[0].assignMan);
			$("#viewForm #allocateRequestDate").html(d.content[0].allocateRequestDate.substr(0,4)+"-"+d.content[0].allocateRequestDate.substr(4,2)+"-"+d.content[0].allocateRequestDate.substr(6,2)+" "+d.content[0].allocateRequestDate.substr(8,2)+":"+d.content[0].allocateRequestDate.substr(10,2)+":"+d.content[0].allocateRequestDate.substr(12,2));
		}
		if(!isEmpty(d.content[0].allocateDate)){
			$("#viewForm #deliveryCoName").html(d.content[0].deliveryCoName);
			$("#viewForm #allocateDate").html(d.content[0].allocateDate.substr(0,4)+"-"+d.content[0].allocateDate.substr(4,2)+"-"+d.content[0].allocateDate.substr(6,2)+" "+d.content[0].allocateDate.substr(8,2)+":"+d.content[0].allocateDate.substr(10,2)+":"+d.content[0].allocateDate.substr(12,2));
		}
		if(!isEmpty(d.content[0].deliveryStartDate)){
			$("#viewForm #deliveryCarName").html(d.content[0].deliveryCarName);
			$("#viewForm #deliveryStartDate").html(d.content[0].deliveryStartDate.substr(0,4)+"-"+d.content[0].deliveryStartDate.substr(4,2)+"-"+d.content[0].deliveryStartDate.substr(6,2)+" "+d.content[0].deliveryStartDate.substr(8,2)+":"+d.content[0].deliveryStartDate.substr(10,2)+":"+d.content[0].deliveryStartDate.substr(12,2));
		}
		if(!isEmpty(d.content[0].deliveryEndDate)){
			$("#viewForm #deliveryCarEndName").html(d.content[0].deliveryCarName);
			$("#viewForm #deliveryEndDate").html(d.content[0].deliveryEndDate.substr(0,4)+"-"+d.content[0].deliveryEndDate.substr(4,2)+"-"+d.content[0].deliveryEndDate.substr(6,2)+" "+d.content[0].deliveryEndDate.substr(8,2)+":"+d.content[0].deliveryEndDate.substr(10,2)+":"+d.content[0].deliveryEndDate.substr(12,2));
		}
	});
});