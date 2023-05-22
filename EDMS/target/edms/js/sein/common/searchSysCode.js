var console = window.console || {log:function(){}};
var sIds;

function getSysCodeList(callback){
	var url 	= "../apis/common/getSysCodeList",
		params 	= {"mcd":$('#mcd').val(),"size":"5000"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d.content) return;
		callback(d.content);
	});
}

$(document).ready(function(){
	var pageWidth = parseInt($('#mcd').width());
	$(function setDataGrid(){
		var caption = "";
		if($('#mcd').val()=="BRND_CD"){
			caption = "상표코드조회(통관)";
		}else if($('#mcd').val()=="DLCN_CD"){
			caption = "인도조건  코드조회(통관)";
		}else if($('#mcd').val()=="CURR_CD"){
			caption = "통화  코드조회(통관)";
		}else if($('#mcd').val()=="MODEL_QTY_UT_CD"){
			caption = "규격 수량단위  코드조회(통관)";
		}else if($('#mcd').val()=="WGHT_QTY_UT_CD"){
			caption = "환급 물량단위  코드조회(통관)";
		}else if($('#mcd').val()=="LCA_DLNG_REL_STTM_TPCD"){
			caption = "관세사 거래관계 기재구분  코드조회(통관)";
		}else if($('#mcd').val()=="LCA_INSC_OPIN_STTM_TPCD"){
			caption = "관세사 검사의견 기재구분  코드조회(통관)";
		}else if($('#mcd').val()=="LCA_PRNM_STSZ_STTM_TPCD"){
			caption = "관세사 품명규격 기재구분  코드조회(통관)";
		}else if($('#mcd').val()=="ORCY_DTRM_BASE_CD"){
			caption = "원산지결정기준  코드조회(통관)";
		}else if($('#mcd').val()=="ORCY_INDC_EON_TPCD"){
			caption = "원산지표시유무  코드조회(통관)";
		}else if($('#mcd').val()=="ORCY_INDC_MCD"){
			caption = "원산지표시방법  코드조회(통관)";
		}else if($('#mcd').val()=="ORCY_INDC_EXMP_RCD"){
			caption = "원산지표시 면세사유  코드조회(통관)";
		}else if($('#mcd').val()=="TRIF_RDEX_INPY_TPCD"){
			caption = "과세감면 분납구분  코드조회(통관)";
		}else if($('#mcd').val()=="ITX_TPCD"){
			caption = "내국세구분  코드조회(통관)";
		}else if($('#mcd').val()=="EDTX_TX_TPCD"){
			caption = "교육세과세구분  코드조회(통관)";
		}else if($('#mcd').val()=="RDTX_TX_TPCD"){
			caption = "농특세과세구분  코드조회(통관)";
		}else if($('#mcd').val()=="VAT_TX_TPCD"){
			caption = "부가세과세구분  코드조회(통관)";
		}else if($('#mcd').val()=="VAT_RDEX_TPCD"){
			caption = "부가가치세 감면부호  코드조회(통관)";
		}else if($('#mcd').val()=="XTR_NXTR_DLNG_TPCD"){
			caption = "유환무환구분  코드조회(통관)";
		}else if($('#mcd').val()=="CSOR_CFRM_TRGT_LWOR_CD"){
			caption = "세관장 확인대상 법령 코드조회(통관)";
		}else if($('#mcd').val()=="REQ_NNOB_RCD"){
			caption = "요건 비대상사유 코드조회(통관)";
		}else if($('#mcd').val()=="INDV_SOBI_TXFR_TPCD"){
			caption = "개별소비세 면세부호 코드(통관)";
		}

		$('#masterGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl 		: 'clientArray',
			colModel 		: [
					            {label:'코드', name:'cd', index:'cd', width:(pageWidth*(25/100)), align:'center', key:true},
					            {label:'코드명', name:'cdDesc', index:'cdDesc', width:(pageWidth*(65/100))},
					            {name:'keySysCode', index:'keySysCode', hidden:true},
				              ],
			caption 		: caption,
			emptyrecords 	: "조회내역 없음",
			loadtext 		: 'Loading...',
			height 			: 225,
			rowNum 			: 10,
			shrinkToFit 	: false,
			scroll 			: false,
			autowidth 		: true,
			cellEdit 		: true,
			rownumbers 		: true,
			viewrecords 	: true,
			loadonce 		: true,
			sortable 		: true,
			multiSort 		: true,
			gridview 		: true,
			pager 			: '#masterPager',
			recordtext 		: "",
			ondblClickRow 	: function(rowid, e) {
		   		rowData = jQuery("#masterGrid").getRowData(rowid);
		   		fn_Action(rowData);
		   		sIds = rowid;
		   	},
		});
		jQuery("#masterGrid").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
	});

	fn_searchAction();
});

var fn_searchAction = function(){
	getSysCodeList( function(d){
		$('#masterGrid').clearGridData().setGridParam({
			data: d
		}).trigger('reloadGrid');
	});
};

var fn_Action = function(d){
	if($('#mcd').val()=="BRND_CD"){
		opener.document.frm1.Msp_code.value	= d.cd;
		opener.document.frm1.Msangpyo.value	= d.cdDesc;
	}else if($('#mcd').val()=="DLCN_CD"){
		opener.document.frm1.Mindo_code.value = d.cd;
	}else if($('#mcd').val()=="CURR_CD"){
		opener.document.frm1.Munitprice_current.value = d.cd;
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD"){
		opener.document.frm1.Mqty_ut.value = d.cd;
	}else if($('#mcd').val()=="WGHT_QTY_UT_CD"){
		opener.document.frm1.Mdraw_unit.value = d.cd;
	}else if($('#mcd').val()=="LCA_DLNG_REL_STTM_TPCD"){
		opener.document.frm1.Mcus_entry1.value = d.cd;
	}else if($('#mcd').val()=="LCA_INSC_OPIN_STTM_TPCD"){
		opener.document.frm1.Mcus_entry2.value = d.cd;
	}else if($('#mcd').val()=="LCA_PRNM_STSZ_STTM_TPCD"){
		opener.document.frm1.Mcus_entry3.value = d.cd;
	}else if($('#mcd').val()=="ORCY_DTRM_BASE_CD"){
		opener.document.frm1.Morigin2.value = d.cd;
	}else if($('#mcd').val()=="ORCY_INDC_EON_TPCD"){
		opener.document.frm1.Morigin3.value = d.cd;
		opener.ChangeOrigin(d.cd);
	}else if($('#mcd').val()=="ORCY_INDC_MCD"){
		opener.document.frm1.Morigin4.value = d.cd;
	}else if($('#mcd').val()=="ORCY_INDC_EXMP_RCD"){
		opener.document.frm1.Morigin5.value = d.cd;
	}else if($('#mcd').val()=="TRIF_RDEX_INPY_TPCD"){
		opener.document.frm1.Mcus_flag.value = d.cd;
	}else if($('#mcd').val()=="ITX_TPCD"){
		opener.document.frm1.M_neguk_gubun.value = d.cd;
	}else if($('#mcd').val()=="EDTX_TX_TPCD"){
		opener.document.frm1.M_edu_yn.value = d.cd;
	}else if($('#mcd').val()=="RDTX_TX_TPCD"){
		opener.document.frm1.M_nong_yn.value = d.cd;
	}else if($('#mcd').val()=="VAT_TX_TPCD"){
		opener.document.frm1.mVatFlag.value = d.cd;
	}else if($('#mcd').val()=="VAT_RDEX_TPCD"){
		opener.document.frm1.mVatReductionCode.value = d.cd;
	}else if($('#mcd').val()=="XTR_NXTR_DLNG_TPCD"){
		opener.document.frm1.sample_yn.value = d.cd;
	}else if($('#mcd').val()=="CSOR_CFRM_TRGT_LWOR_CD"){
		opener.document.frm3.lawCd.value = d.cd;
	}else if($('#mcd').val()=="REQ_NNOB_RCD"){
		opener.document.frm3.notYogSayuCd.value = d.cd;
	}else if($('#mcd').val()=="INDV_SOBI_TXFR_TPCD"){
		opener.document.frm1.M_neguk_myun.value = d.cd;
	}

	window.close();
};