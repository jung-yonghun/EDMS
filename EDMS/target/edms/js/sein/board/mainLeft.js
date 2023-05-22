var LeftPosition = (screen.width)
console.log(LeftPosition);

function getMenuList(callback){
	var url 	= "../apis/system/getUserXAuthXMenuList",
	    params 	= {"userKey":$("#id").val()},
	    type 	= "POST";
	sendAjax(url, params, type, function(d){
		if(!d) return;
		callback(d);
	});
}

//function selectLogoInfo(id, callback){
//	var url 	= "../apis/userInfo/getUserInfoList",
//	    params 	= {"id":id},
//	    type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		callback(d);
//	});
//}

$(document).ready(function(){
	//parent.main.document.location.href = "../admin/userList.geows";
	getMenuData();

//	var id = $("#id").val();
//
//	selectLogoInfo(id, function(d){
	if(LeftPosition < 1300){
		var img = "<img src=\"../images/logo/gelogo.png\" style='width:80px;cursor:pointer;'>";
	}else if(LeftPosition > 1300 && LeftPosition < 1700){
		var img = "<img src=\"../images/logo/gelogo.png\" style='width:120px;cursor:pointer;'>";
	}else{
		var img = "<img src=\"../images/logo/gelogo.png\" style='width:150px;cursor:pointer;'>";
	}
		$("#images").html(img);
//	});
});

var getMenuData = function(){
	getMenuList(function(d){
		if(!d){
			alert("관리자에게 문의하세요!!!\n데이터를 찾을 수 없습니다");
			return;
		}
		menuListInfo(d);
	});
};

var menuListInfo = function(d){
	var tr = "";
	for(var i = 0; i < d.length; i++){
		if(i < d.length - 1){
			if(d[i].lvl == 0){
				tr = tr + "<div class='panel panel-default'><div class='panel-heading' data-toggle='collapse' data-parent='#accordion' href='#"+ d[i].menuKey +"' style='font-size:12px;font-weight:bold;cursor:pointer;'>"+ d[i].menuKorName;
				tr = tr + "<div class='pull-right'><i class='fa fa-chevron-down'></i></div></div>";
				tr = tr + "<div id='" + d[i].menuKey + "' class='panel-collapse collapse'><div class='panel-body well-sm'>";
			}else if (d[i].lvl == 1){
				tr = tr + "<li style='padding-left:15px;padding-top:3px;height:25px;cursor:pointer;background:#d5d5d5;font-size:12px;'  onclick='changePage(this); parent.main.addTab(\""+ d[i].menuKorName +"\",\""+ d[i].menuPath +"\")'>"+ d[i].menuKorName +"</li>";
			}else if (d[i].lvl == 2){
				tr = tr + "<li style='padding-left:30px;padding-top:3px;height:25px;cursor:pointer;background:#d5d5d5;font-size:12px;'  onclick='changePage(this); parent.main.addTab(\""+ d[i].menuKorName +"\",\""+ d[i].menuPath +"\")'>"+ d[i].menuKorName +"</li>";
			}

			if(d[i].lvl == 1){
				if(d[i+1].lvl == 0){
					tr = tr + "</div></div></div>";
				}
				if(d[i+1].lvl == 1){
					tr = tr;
				}
				if(d[i+1].lvl == 2){
					tr = tr;
				}
			}

			if(d[i].lvl == 2){
				if(d[i+1].lvl == 0){
					tr = tr + "</div></div></div>";
				}
				if(d[i+1].lvl == 1){
					tr = tr;
				}
				if(d[i+1].lvl == 2){
					tr = tr;
				}
			}
		}

		if(i == d.length - 1){
			tr = tr + "<li style='padding-left:15px;padding-top:3px;height:25px;cursor:pointer;background:#d5d5d5;font-size:12px;' onclick='changePage(this); parent.main.addTab(\""+ d[i].menuKorName +"\",\""+ d[i].menuPath +"\")'>"+ d[i].menuKorName +"</li>";
		}
	};

	tr = tr + "</div></div></div>";
	$(".panel-group").append(tr);
};

var changePage = function(b){
	//parent.main.document.location.href = a;
	//$('#page-wrapper').load(a);
	$("li").not($(this)).css("background",'#d5d5d5');
	b.style.background="#46c9ff";
};

function mainView(){
	parent.main.document.location.href = "./blankFrame.geows";
	parent.menu.document.location.href = "mainLeft.geows";

}

function Logout(){
	parent.document.location.href="../logoutAction";
}