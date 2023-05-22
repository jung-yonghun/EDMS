function fn_insertAction(){
	if($("#fieldNote1").val()==""){
		alert("구분을 선택하세요.");
		return;
	}else{
		var jisa = "";
		var ieGubun = "";
		var price = "";
		if($("#singoNo").val().substr(0,5)=="41489" || $("#singoNo").val().substr(0,5)=="42970"){
			jisa = "본사";
		}else if($("#singoNo").val().substr(0,5)=="42119" || $("#singoNo").val().substr(0,5)=="42423"){
			jisa = "인천";
		}else if($("#singoNo").val().substr(0,5)=="42773"){
			jisa = "경기";
		}else if($("#singoNo").val().substr(0,5)=="42530"){
			jisa = "파주";
		}else if($("#singoNo").val().substr(0,5)=="43618"){
			jisa = "중부";
		}else if($("#singoNo").val().substr(0,5)=="44274"){
			jisa = "중부";
		}else if($("#singoNo").val().substr(0,5)=="40629"){
			jisa = "중부";
		}else if($("#singoNo").val().substr(0,5)=="43862"){
			jisa = "중부";
		}else if($("#singoNo").val().substr(0,5)=="41888"){
			jisa = "남부";
		}else if($("#singoNo").val().substr(0,5)=="44121"){
			jisa = "남부";
		}else if($("#singoNo").val().substr(0,5)=="43993"){
			jisa = "남부";
		}else if($("#singoNo").val().substr(0,5)=="42526"){
			jisa = "남부";
		}else if($("#singoNo").val().substr(0,5)=="44924"){
			jisa = "남부";
		}

		if($("#fieldNote1").val()=="서류" && $("#gubun").val()=="IMPORT"){
			ieGubun = "수입(서류)";
			price = "20000";
		}else if($("#fieldNote1").val()=="검사" && $("#gubun").val()=="IMPORT"){
			ieGubun = "수입(검사)";
			price = "25000";
		}else if($("#fieldNote1").val()=="정정" && $("#gubun").val()=="IMJUNG"){
			ieGubun = "수입(정정)";
			price = "20000";
		}else if($("#fieldNote1").val()=="서류" && $("#gubun").val()=="EXPORT"){
			ieGubun = "수출(서류)";
			price = "10000";
		}else if($("#fieldNote1").val()=="검사" && $("#gubun").val()=="EXPORT"){
			ieGubun = "수출(검사)";
			price = "20000";
		}else if($("#fieldNote1").val()=="정정" && $("#gubun").val()=="EXJUNG"){
			ieGubun = "수출(정정)";
			price = "10000";
		}

		var params1 = {"SingoNo" : $("#singoNo").val()};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/edms/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	if(returnValue.length == 0){
	            	var url 	= "../apis/edms/saveFieldManage",
		    			params 	= {
	            			"SDABMngNo"	: "0",
		    				"RegDt"		: $("#regDate").val(),
		    				"Segwan"	: $("#segwan").val(),
		    				"Jisa"		: jisa,
		    				"Team"		: $('#_userDepart').val(),
		    				"UserNm"	: $('#_userNm').val(),
		    				"Gbn"		: ieGubun,
		    				"SingoCode"	: $("#singoNo").val().substr(0,5),
		    				"SingoNo"	: $("#singoNo").val(),
		    				"ComNm"		: $("#company").val(),
		    				"GumGbn"	: $("#gumYn").val(),
		    				"JangchiNm"	: $("#jangchi").val(),
		    				"GwanNm"	: $("#gwanUser").val(),
		    				"Jubsu"		: "",
		    				"Approve"	: "",
		    				"Issue"		: "",
		    				"Remark"	: "",
		    				"Price"		: price,
		    				"UseYn"		: "Y",
		    				"ComCd"		: $("#Impo_napse_code").val(),
		    				"ComNo"		: $("#Impo_napse_saup").val(),
		    				"AddUserId"	: $('#_id').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });

		var url 	 = "../apis/edms/saveFieldMaster",
			params3  = {
				"SDACMngNo"		: "0",
				"SingoCode"		: $("#defaultDB").val(),
				"Gbn"			: $("#gubun").val(),
				"ImexKey"		: $("#key").val(),
				"SingoNo"		: $("#singoNo").val(),
				"FieldRequest"	: $("#sMsgContent").val(),
				"FieldGbn"		: $("#fieldNote1").val(),
				"ComCd"			: $("#Impo_napse_code").val(),
				"ComNm"			: $("#company").val(),
				"ComNo"			: $("#Impo_napse_saup").val(),
				"AddUserId"		: $('#_id').val(),
				"UseYn"			: "Y"
			},
			type 	= "POST";

		sendAjax(url, params3, type, function(d){
			var params 	= $("#insertForm").serializeObject();

			if($("#sRecvLogon").val()=="공항현장"){
				if($("#jangchibuho").val()=="04077073"){
					params["sRecvLogonCDs"] = "shpark1,kclee,hglee,djkim,dgkim,yscho";
					$("#sRecvLogonCDs").val("shpark1,kclee,hglee,djkim,dgkim,yscho");
				}else{
					params["sRecvLogonCDs"] = "shpark1,kclee";
					$("#sRecvLogonCDs").val("shpark1,kclee");
				}
			}else if($("#sRecvLogon").val()=="인천항"){
				var url 	= "../apis/edms/getJisaUser",
					params1  = {
						"defaultDB"	: "ncustoms_ic"
					},
					type 	= "POST";

				$.ajax({
					type 		: type,
					contentType : "application/json",
					dataType 	: 'json',
					url 		: url,
					processData : true,
					cache 		: false,
					async		: false,
					data 		: type.toLowerCase() == "get" ? params1 : JSON.stringify(params1),
					success 	: function(returnValue){
						var userId="";
						for(var i=0;i<returnValue.length;i++){
							userId += returnValue[i].userId+",";
						}
						params["sRecvLogonCDs"] = userId;
						$("#sRecvLogonCDs").val(userId);
					},
					error 		: function(e){
					}
				});
			}else if($("#sRecvLogon").val()=="부산항"){
				var url 	= "../apis/edms/getJisaUser",
					params2  = {
						"defaultDB"	: "ncustoms_bs"
					},
					type 	= "POST";

				$.ajax({
					type 		: type,
					contentType : "application/json",
					dataType 	: 'json',
					url 		: url,
					processData : true,
					cache 		: false,
					async		: false,
					data 		: type.toLowerCase() == "get" ? params2 : JSON.stringify(params2),
					success 	: function(returnValue){
						var userId1="";
						for(var i=0;i<returnValue.length;i++){
							userId1 += returnValue[i].userId+",";
						}
						params["sRecvLogonCDs"] = userId1;
						$("#sRecvLogonCDs").val(userId1);
					},
					error 		: function(e){
					}
				});
			}else if($("#sRecvLogon").val()=="경기지사"){
				var url 	= "../apis/edms/getJisaUser",
					params2  = {
						"defaultDB"	: "ncustoms_sn"
					},
					type 	= "POST";

				$.ajax({
					type 		: type,
					contentType : "application/json",
					dataType 	: 'json',
					url 		: url,
					processData : true,
					cache 		: false,
					async		: false,
					data 		: type.toLowerCase() == "get" ? params2 : JSON.stringify(params2),
					success 	: function(returnValue){
						var userId2="";
						for(var i=0;i<returnValue.length;i++){
							userId2 += returnValue[i].userId+",";
						}
						params["sRecvLogonCDs"] = userId2;
						$("#sRecvLogonCDs").val(userId2);
					},
					error 		: function(e){
					}
				});
			}
			$.ajax({
				type 		: "POST",
				contentType : "application/json",
				dataType 	: 'json',
				url 		: "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
				processData : true,
				cache 		: false,
				async		: false,
				data 		: JSON.stringify(params),
				success 	: function(returnValue){
					alert("의뢰 되었습니다.");
					setTimeout(function(){
						window.close();
					},1000);
				},
				error 		: function(e){
					alert("의뢰 되었습니다.");
					setTimeout(function(){
						window.close();
					},1000);
				}
			});
		});
	}
}

$(document).ready(function(){
	var url 	= "../apis/userInfo/getUserInfoList",
		params 	= {
			"userId" : $("#sSndrLogonCD").val(),
			"useYn"	 : "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function (d){
		$("#_id").val(d[0].userKey);
		$("#_apiKey").val(d[0].apiKey);
		$("#_userNm").val(d[0].userName);
		$("#_userDepart").val(d[0].userDepart);
	});

	if($("#gubun").val()=="IMPORT" && $("#ready").val()=="N"){
		var url 	= "../apis/edms/selectImportFieldStatusList",
			params 	= {
				"_defaultDB" : $("#defaultDB").val(),
				"singoNo" 	 : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Impo_napse_sangho);
			$("#gumYn").val(d[0].Impo_cs);
			$("#jangchi").val(d[0].Impo_jangch_name);
			$("#jangchibuho").val(d[0].Impo_jangch_buho);
			$("#gwanUser").val(d[0].impo_damdang_name);
			$("#regDate").val(d[0].Impo_singo_date);
			$("#segwan").val(d[0].impo_segwan);
			$("#Impo_napse_code").val(d[0].Impo_napse_code);
			$("#Impo_napse_saup").val(d[0].Impo_napse_saup);
			$("#sMsgContent").html("제출/검사입니다.\n요청자 : "+d[0].UserNm+"\n업체명 : "+d[0].Impo_napse_sangho+"\nB/L No : "+$("#blInvNo").val()+"\n수입신고번호 : "+$("#singoNo").val()+"\n검사란 : "+d[0].imlan_jechl_lan+"\n장치장 : "+d[0].Impo_jangch_buho+" ("+d[0].Impo_jangch_name+")\n세관담당자 : "+d[0].impo_damdang_name+"\n요청내용 : ");
		});

	}else if($("#gubun").val()=="IMJUNG" && $("#ready").val()=="N"){
		$("#fieldNote1").val("정정");
		var url 	= "../apis/edms/selectImportJungFieldStatusList",
			params 	= {
				"_defaultDB" : $("#defaultDB").val(),
				"singoNo" 	 : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Imjung_napse_sangho);
			$("#gumYn").val("");
			$("#jangchi").val("");
			$("#jangchibuho").val("");
			$("#gwanUser").val(d[0].Imjung_damdang_name);
			$("#regDate").val(d[0].Imjung_sinchung_date);
			$("#segwan").val(d[0].Imjung_segwan);
			$("#Impo_napse_code").val("");
			$("#Impo_napse_saup").val("");
			$("#sMsgContent").html("수입정정입니다.\n업체명 : "+d[0].Imjung_napse_sangho+"\nB/L No : "+$("#blInvNo").val()+"\n수입신고번호 : "+$("#singoNo").val()+"\n세관담당자 : "+d[0].Imjung_damdang_name+"");
		});

	}else if($("#gubun").val()=="EXPORT"){
		var url 	= "../apis/edms/selectExportFieldStatusList",
			params 	= {
				"_defaultDB" : $("#defaultDB").val(),
				"singoNo" 	 : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Expo_suchulja_sangho);
			$("#gumYn").val("");
			$("#jangchi").val("");
			$("#jangchibuho").val("");
			$("#gwanUser").val(isNull(d[0].expo_SeDmdngNm) ? "" : d[0].expo_SeDmdngNm);
			$("#regDate").val(d[0].Expo_singo_date);
			$("#segwan").val(d[0].Expo_segwan);
			$("#Impo_napse_code").val(d[0].Expo_suchulja_code);
			$("#Impo_napse_saup").val(d[0].Expo_SuchulSaupNo);
			$("#sMsgContent").html("제출/검사입니다.\n업체명 : "+d[0].Expo_suchulja_sangho+"\nInvoice No : "+$("#blInvNo").val()+"\n수출신고번호 : "+$("#singoNo").val()+"\n세관담당자 : "+d[0].expo_SeDmdngNm+"");
		});
	}else if($("#gubun").val()=="EXJUNG"){
		$("#fieldNote1").val("정정");
		var url 	= "../apis/edms/selectExportJungFieldStatusList",
			params 	= {
				"_defaultDB" : $("#defaultDB").val(),
				"singoNo" 	 : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Ejj1_suchul_sangho);
			$("#gumYn").val("");
			$("#jangchi").val("");
			$("#jangchibuho").val("");
			$("#gwanUser").val(isNull(d[0].Ejj_SeDmdngNm) ? "" : d[0].Ejj_SeDmdngNm);
			$("#regDate").val(d[0].Ejj1_sinchung_date);
			$("#segwan").val(d[0].Ejj1_segwan);
			$("#Impo_napse_code").val("");
			$("#Impo_napse_saup").val("");
			$("#sMsgContent").html("수출정정입니다.\n업체명 : "+d[0].Ejj1_suchul_sangho+"\nInvoice No : "+$("#blInvNo").val()+"\n수출신고번호 : "+$("#singoNo").val()+"\n세관담당자 : "+d[0].Ejj_SeDmdngNm+"");
		});
	}else if($("#gubun").val()=="IMPORT" && $("#ready").val()=="Y"){
		var url 	= "../apis/ready/selectImportFieldStatusList",
			params 	= {
				"singoNo" : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Nab_Firm);
			$("#gumYn").val("");
			$("#jangchi").val(d[0].Chk_Pa_Name);
			$("#jangchibuho").val(d[0].Chk_Pa_Mark);
			$("#gwanUser").val(d[0].Ju_Name);
			$("#regDate").val(d[0].Rpt_Day);
			$("#segwan").val(d[0].Cus);
			$("#Impo_napse_code").val(d[0].Nab_Code);
			$("#Impo_napse_saup").val(d[0].Nab_SdNo);
			$("#sMsgContent").html("제출/검사입니다.\n요청자 : "+d[0].REG_ID+"\n업체명 : "+d[0].Nab_Firm+"\nB/L No : "+$("#blInvNo").val()+"\n수입신고번호 : "+$("#singoNo").val()+"\n검사란 : "+d[0].Ran_No+"\n장치장 : "+d[0].Chk_Pa_Mark+" ("+d[0].Chk_Pa_Name+")\n세관담당자 : "+d[0].Ju_Name+"\n요청내용 : ");
		});

	}else if($("#gubun").val()=="IMJUNG" && $("#ready").val()=="Y"){
		$("#fieldNote1").val("정정");
		var url 	= "../apis/ready/selectImportJungFieldStatusList",
			params 	= {
				"singoNo" : $("#singoNo").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#company").val(d[0].Nab_Firm);
			$("#gumYn").val("");
			$("#jangchi").val("");
			$("#jangchibuho").val("");
			$("#gwanUser").val(d[0].Pson_Name);
			$("#regDate").val(d[0].Rpt_Day);
			$("#segwan").val(d[0].Imp_Cus);
			$("#Impo_napse_code").val("");
			$("#Impo_napse_saup").val("");
			$("#sMsgContent").html("수입정정입니다.\n업체명 : "+d[0].Pson_Name+"\nB/L No : "+$("#blInvNo").val()+"\n수입신고번호 : "+$("#singoNo").val()+"\n세관담당자 : "+d[0].Pson_Name+"");
		});

	}
});

var ChangeGubun = function(){
    if($("#sRecvLogon option:selected").val() == "공항현장"){
        $("#person").val('이경철,박상혁');
    }else if($("#sRecvLogon option:selected").val() == "인천항"){
    	$("#person").val('인천4팀');
    }else if($("#sRecvLogon option:selected").val() == "부산항"){
    	$("#person").val('부산지사');
    }else if($("#sRecvLogon option:selected").val() == "경기지사"){
    	$("#person").val('경기지사');
    }
};