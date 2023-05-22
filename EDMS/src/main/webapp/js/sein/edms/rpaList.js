//********** RPA의뢰 리스트 **********//
function selectRpaList(){
    var url = "../apis/edms/getRpaInfoList",
        params = $("#frm1").serializeObject(),
        type = "POST";

    params["rpaGubun"] = "1";

    sendAjax(url, params, type, function (d) {
        $('#masterGrid').datagrid('loadData', d);
        $('#fileGrid').datagrid('loadData', []);
    });
}

//********** 서류제출의뢰 리스트 **********//
function selectRpaList1(){
    var url = "../apis/edms/getRpaInfoList",
        params = $("#frm2").serializeObject(),
        type = "POST";

    params["rpaGubun"] = "2";

    sendAjax(url, params, type, function (d) {
        $('#masterGrid1').datagrid('loadData', d);
    });
}

//********** 초기 시작설정 **********//
$(document).ready(function () {
    var d 			= new Date();
	var curr_hour 	= d.getHours();
	var curr_min 	= d.getMinutes();
	var curr_sec 	= d.getSeconds();
	if(curr_hour < 10){
		curr_hour = "0"+curr_hour;
	}
	if(curr_min < 10){
		curr_min = "0"+curr_min;
	}
	if(curr_sec < 10){
		curr_sec = "0"+curr_sec;
	}
	var yymmddhhmmss = $('#frm3 #yyyymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#frm3 #yymmddhhmmss').val(yymmddhhmmss);

    setTimeout(function(){
	$('#masterGrid').datagrid({
		title			: '의뢰리스트',
		width			: '100%',
		height			: 450,
		rownumbers		: true,
		singleSelect	: true,
		columns			: [[
			{field:'SDADKey',title:'Key',hidden:true},
			{field:'EndYn',title:'처리', width:40, align:'center',formatter:linkEndFormatter},
			{field:'JisaCode',title:'지사', width:100, align:'center'},
			{field:'ComCode',title:'코드', width:40, align:'center'},
			{field:'ComSaup',title:'사업자번호', width:90, align:'center'},
			{field:'ComNm',title:'상호', width:200},
			{field:'EdmsNo',title:'B/L No.', width:150, align:'center'},
			{field:'AddUserNm',title:'등록자', width:50, align:'center'},
			{field:'AddDtm',title:'의뢰일시', width:130, align:'center',formatter:linkDateTimeFormatter},
			{field:'EditDtm',title:'처리일시', width:130, align:'center',formatter:linkDateTimeFormatter}
        ]],
		onSelect		: function(rowIndex, rowData){
			fn_fileListAction(rowData);
			fn_bindData(rowData);
        }
	});

	$('#fileGrid').datagrid({
		title			: '파일리스트',
		width			: '100%',
		height			: 500,
		fitColumns		: true,
		singleSelect	: true,
		remoteSort		: false,
		columns			: [[
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
            {field:'EdmsParentGbn',title:'EdmsParentGbn',hidden:true},
            {field:'EdmsNo',title:'EdmsNo',hidden:true},
            {field:'EdmsSingoNo',title:'EdmsSingoNo',hidden:true},
            {field:'EdmsFileStatus',title:'EdmsFileStatus',hidden:true},
            {field:'UseYn',title:'UseYn',hidden:true},
            {field:'EdmsSaveFileNm',title:'EdmsSaveFileNm',hidden:true},
            {field:'EdmsFileSize',title:'EdmsFileSize',hidden:true},
            {field:'EdmsFilePath',title:'EdmsFilePath',hidden:true},
            {field:'EdmsFileExt',title:'EdmsFileExt',hidden:true}
        ]]
	});

	$('#masterGrid1').datagrid({
		title			: '서류제출 의뢰리스트',
		width			: '100%',
		height			: 415,
		rownumbers		: true,
		singleSelect	: false,
		autoRowHeight	: false,
		remoteSort		: false,
		selectOnCheck 	: true,
		CheckOnSelect 	: true,
		pagination		: true,
		pageSize		: 50,
		view			: bufferview,
		columns			: [[
		    {field:'ck',title:'',checkbox:true},
			{field:'SDADKey',title:'Key',hidden:true},
			{field:'EndYn',title:'처리', width:40, align:'center',formatter:linkEndFormatter},
			{field:'JisaCode',title:'지사', width:100, align:'center'},
			{field:'Gbn',title:'업무구분', width:60, align:'center'},
			{field:'ComNm',title:'상호', width:190},
			{field:'EdmsNo',title:'B/L No.', width:150, align:'center'},
			{field:'SingoNo',title:'신고번호', width:120, align:'center', formatter:linkImportSingoFormatter},
			{field:'AddUserNm',title:'등록자', width:60, align:'center'},
			{field:'AddDtm',title:'의뢰일시', width:130, align:'center',formatter:linkDateTimeFormatter},
			{field:'EditDtm',title:'처리일시', width:130, align:'center',formatter:linkDateTimeFormatter},
			{field:'ComSaup',title:'사업자번호', hidden:true}
        ]],
		onSelect		: function(rowIndex, rowData){
			fn_fileListAction1(rowData);
			fn_bindData1(rowData);
        }
	});
	$('#masterGrid1').datagrid('enableFilter',[]);
	$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	$('#fileGrid1').datagrid({
		title			: '파일리스트',
		width			: '100%',
		height			: 500,
		fitColumns		: true,
		singleSelect	: true,
		remoteSort		: false,
		columns			: [[
            {field:'SDAAKey',title:'Key',hidden:true},
            {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
            {field:'EdmsOrgFileNm',title:'파일명',width:230,sortable:true},
            {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadNotFormatter},
            {field:'EdmsParentGbn',title:'EdmsParentGbn',hidden:true},
            {field:'EdmsNo',title:'EdmsNo',hidden:true},
            {field:'EdmsSingoNo',title:'EdmsSingoNo',hidden:true},
            {field:'EdmsFileStatus',title:'EdmsFileStatus',hidden:true},
            {field:'UseYn',title:'UseYn',hidden:true},
            {field:'EdmsSaveFileNm',title:'EdmsSaveFileNm',hidden:true},
            {field:'EdmsFileSize',title:'EdmsFileSize',hidden:true},
            {field:'EdmsFilePath',title:'EdmsFilePath',hidden:true},
            {field:'EdmsFileExt',title:'EdmsFileExt',hidden:true}
        ]]
	});

	$('#excelGrid').datagrid({
		width	: '100%',
		height	: 500,
		columns	: [[
            {field:'singo_no',title:'신고번호'}
        ]]
	});

	var fileCount 	= 0;
	var submitCount = 0;
	var extraObj = $("#fileuploader2").uploadFile({
	    url: "../apis/edms/uploadEdmsPilFile",
	    fileName: "myfile",
	    autoSubmit: true,
	    multiple: true,
	    dragDrop: true,
	    dragdropWidth: 300,
	    statusBarWidth: 250,
	    maxFileSize: 100000 * 1024,
	    showAbort: false,
	    showDone: false,
	    showDelete: false,
	    showError: false,
	    showStatusAfterSuccess: false,
	    showStatusAfterError: false,
	    allowedTypes: "pdf,zip",
	    returnType: "json",
	    customProgressBar: function (obj, s) {
	        this.statusbar = $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
	        this.filename = $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
	        this.progressDiv = $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
	        this.progressbar = $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
	        this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
	        this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
	        this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
	        this.download = $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
	        this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

	        this.abort.addClass("custom-red");
	        this.done.addClass("custom-green");
	        this.download.addClass("custom-green");
	        this.cancel.addClass("custom-red");
	        this.del.addClass("custom-red");
	        if (count++ % 2 == 0)
	            this.statusbar.addClass("even");
	        else
	            this.statusbar.addClass("odd");
	        return this;
	    },
	    dynamicFormData: function(){
	        var data = $("#insertPaperForm").serializeObject();
	        return data;
	    },
	    onSuccess:function(files,data,xhr,pd){
	    	move();
	    	submitCount += files.length;
	    	$("#ddd").val(submitCount);
	    },
	    onError: function(files, status, errMsg){
	        alert("업로드 중 오류가 발생하였습니다<br>파일명:" + files);
	    },
	    afterUploadAll: function(obj){
	    	document.getElementById("myBar").style.width = '100%';
	        document.getElementById("label").innerHTML = '100%';
	        alert("필증이 분류되었습니다.");
	    	setTimeout(function(){
	    		document.getElementById("myBar").style.width = '0%';
	            document.getElementById("label").innerHTML 	 = '';
	        }, 1000);
	    }
	});

	$('#tabs').tabs({
	    onSelect : function(title, index){
			var tab = $('#tabs').tabs('getSelected');
			var hest = $('#tabs').tabs('getTabIndex',tab);
			if(hest == 0){
				fn_searchAction();
			}else if(hest == 1){
				fn_code();
			}else if(hest == 2){
				fn_searchAction1();
			}
	    }
	});
	},10);

    $("#frm1 #blNo").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #blNo").val(($("#frm1 #blNo").val()).toUpperCase());
    });

    $("#frm2 #blNo").bind("keyup", function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm2 #blNo").val(($("#frm2 #blNo").val()).toUpperCase());
    });

    $("#frm2 #singoNo").bind("paste", function (e) {
        var el = $(this);
        setTimeout(function () {
            var text = $(el).val();
            $(el).val(text.replace(/-/gi, ''));
        }, 100);
    });

//  $("#frm3 #code01").val("kcba123456!");
//	$("#frm3 #code02").val("2018-11-20");
//	$("#frm3 #code03").val("sein41464");
//	$("#frm3 #code04").val("sein8264!");

    fn_searchAction();
});

var fn_searchAction = function(){
	selectRpaList();
	$("#frmbind").each(function(){
        this.reset();
    });
};

var fn_searchAction1 = function(){
	selectRpaList1();
	$('#fileGrid1').datagrid('loadData', []);
	$("#frmbind1 #jisa").val("");
	$("#frmbind1 #edmsGubun1").val("");
	$("#frmbind1 #saup").val("");
	$("#frmbind1 #sangho1").val("");
	$("#frmbind1 #singoNo").val("");
};

function fn_bindData(d){
	$("#frmbind #jisa").val(d.JisaCode);
	$("#frmbind #code1").val(d.ComCode);
	$("#frmbind #saup").val(d.ComSaup);
	$("#frmbind #sangho1").val(d.ComNm);
	$("#frmbind #bl").val(d.EdmsNo);
}

function fn_bindData1(d){
	$("#frmbind1 #jisa").val(d.JisaCode);
	$("#frmbind1 #edmsGubun1").val(d.Gbn);
	$("#frmbind1 #saup").val(d.ComSaup);
	$("#frmbind1 #sangho1").val(d.ComNm);
	$("#frmbind1 #singoNo").val(d.SingoNo);
	$("#frmbind1 #blNo").val(d.EdmsNo);
}

var fn_code = function(){
	var url 	= "../apis/edms/singoNoExcelCount",
		params 	= {
			"_defaultDB" : $('#_defaultDB').val(),
			"edmsGubun"	 : $('#edmsGubun').val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#frm3 #code01").val(d);
	});
//	if($("#frm3 #_defaultDB option:selected").val() == "ncustoms" || $("#frm3 #_defaultDB option:selected").val() == "ncustoms_sel4"){
//		$("#frm3 #code01").val("kcba123456!");
//		$("#frm3 #code02").val("2018-11-20");
//		$("#frm3 #code03").val("sein41464");
//		$("#frm3 #code04").val("sein8264!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_sn"){
//		$("#frm3 #code01").val("SEIN6093!!");
//		$("#frm3 #code02").val("2019-10-04");
//		$("#frm3 #code03").val("SEIN1426");
//		$("#frm3 #code04").val("SEIN1427*");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_yj"){
//		$("#frm3 #code01").val("SEIN42119!");
//		$("#frm3 #code02").val("2019-03-17");
//		$("#frm3 #code03").val("SEIN8380");
//		$("#frm3 #code04").val("SEIN42119!!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_gm"){
//		$("#frm3 #code01").val("sein43552*");
//		$("#frm3 #code02").val("2019-10-20");
//		$("#frm3 #code03").val("sein43552");
//		$("#frm3 #code04").val("sein2083**");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_dj"){
//		$("#frm3 #code01").val("seindj1234*");
//		$("#frm3 #code02").val("2019-03-16");
//		$("#frm3 #code03").val("seindj1234");
//		$("#frm3 #code04").val("seindj1234*");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_bs"){
//		$("#frm3 #code01").val("SEIN12139");
//		$("#frm3 #code02").val("2018-11-01");
//		$("#frm3 #code03").val("SEIN41489");
//		$("#frm3 #code04").val("SEIN12139*");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_ys"){
//		$("#frm3 #code01").val("kcba123456!");
//		$("#frm3 #code02").val("2019-01-21");
//		$("#frm3 #code03").val("seinys");
//		$("#frm3 #code04").val("sein9335!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_us"){
//		$("#frm3 #code01").val("sein54885*");
//		$("#frm3 #code02").val("2019-04-30");
//		$("#frm3 #code03").val("SEIN44121");
//		$("#frm3 #code04").val("SEIN54885*");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_ic"){
//		$("#frm3 #code01").val("seoul12345!");
//		$("#frm3 #code02").val("2019-10-16");
//		$("#frm3 #code03").val("sein42703");
//		$("#frm3 #code04").val("sein8264!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_jj"){
//		$("#frm3 #code01").val("cust@42526");
//		$("#frm3 #code02").val("2019-05-29");
//		$("#frm3 #code03").val("sein42526");
//		$("#frm3 #code04").val("cust@42526");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_cw"){
//		$("#frm3 #code01").val("sein43522!");
//		$("#frm3 #code02").val("2019-01-23");
//		$("#frm3 #code03").val("sein43522");
//		$("#frm3 #code04").val("cust@3522@@");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_ca"){
//		$("#frm3 #code01").val("sein65878*");
//		$("#frm3 #code02").val("2018-12-31");
//		$("#frm3 #code03").val("sein43862");
//		$("#frm3 #code04").val("sein65878!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_cj"){
//		$("#frm3 #code01").val("sein3192");
//		$("#frm3 #code02").val("2019-06-05");
//		$("#frm3 #code03").val("sein3192");
//		$("#frm3 #code04").val("sein3191**");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_pj"){
//		$("#frm3 #code01").val("kcba123456");
//		$("#frm3 #code02").val("2018-11-30");
//		$("#frm3 #code03").val("sein42272");
//		$("#frm3 #code04").val("sein42530!");
//	}else if($("#frm3 #_defaultDB option:selected").val() == "ncustoms_pt"){
//		$("#frm3 #code01").val("sein32939");
//		$("#frm3 #code02").val("2019-04-30");
//		$("#frm3 #code03").val("sein0501");
//		$("#frm3 #code04").val("sein5671*");
//	}
};

var fn_code1 = function(){
	if($("#frm2 #teamCode option:selected").val() == "ncustoms" || $("#frm2 #teamCode option:selected").val() == "ncustoms_sel4" || $("#frm2 #teamCode option:selected").val() == "ncustoms_sel_040"){
		$("#frmbind1 #code01").val("kcba123456!");
		$("#frmbind1 #code02").val("2018-11-20");
		$("#frmbind1 #code03").val("sein41464");
		$("#frmbind1 #code04").val("sein8264!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_sn"){
		$("#frmbind1 #code01").val("SEIN6093!!");
		$("#frmbind1 #code02").val("2019-10-04");
		$("#frmbind1 #code03").val("SEIN1426");
		$("#frmbind1 #code04").val("SEIN1427*");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_yj"){
		$("#frmbind1 #code01").val("SEIN42119!");
		$("#frmbind1 #code02").val("2019-03-17");
		$("#frmbind1 #code03").val("SEIN8380");
		$("#frmbind1 #code04").val("SEIN42119!!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_gm"){
		$("#frmbind1 #code01").val("sein43552*");
		$("#frmbind1 #code02").val("2019-10-20");
		$("#frmbind1 #code03").val("sein43552");
		$("#frmbind1 #code04").val("sein2083**");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_dj"){
		$("#frmbind1 #code01").val("seindj1234*");
		$("#frmbind1 #code02").val("2019-03-16");
		$("#frmbind1 #code03").val("seindj1234");
		$("#frmbind1 #code04").val("seindj1234*");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_bs"){
		$("#frmbind1 #code01").val("SEIN12139");
		$("#frmbind1 #code02").val("2018-11-01");
		$("#frmbind1 #code03").val("SEIN41489");
		$("#frmbind1 #code04").val("SEIN12139*");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_ys"){
		$("#frmbind1 #code01").val("kcba123456!");
		$("#frmbind1 #code02").val("2019-01-21");
		$("#frmbind1 #code03").val("seinys");
		$("#frmbind1 #code04").val("sein9335!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_us"){
		$("#frmbind1 #code01").val("sein54885*");
		$("#frmbind1 #code02").val("2019-04-30");
		$("#frmbind1 #code03").val("SEIN44121");
		$("#frmbind1 #code04").val("SEIN54885*");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_ic"){
		$("#frmbind1 #code01").val("seoul12345!");
		$("#frmbind1 #code02").val("2019-10-16");
		$("#frmbind1 #code03").val("sein42703");
		$("#frmbind1 #code04").val("sein8264!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_jj"){
		$("#frmbind1 #code01").val("cust@42526");
		$("#frmbind1 #code02").val("2019-05-29");
		$("#frmbind1 #code03").val("sein42526");
		$("#frmbind1 #code04").val("cust@42526");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_cw"){
		$("#frmbind1 #code01").val("sein43522!");
		$("#frmbind1 #code02").val("2019-01-23");
		$("#frmbind1 #code03").val("sein43522");
		$("#frmbind1 #code04").val("cust@3522@@");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_ca"){
		$("#frmbind1 #code01").val("sein65878*");
		$("#frmbind1 #code02").val("2018-12-31");
		$("#frmbind1 #code03").val("sein43862");
		$("#frmbind1 #code04").val("sein65878!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_cj"){
		$("#frmbind1 #code01").val("sein3192");
		$("#frmbind1 #code02").val("2019-06-05");
		$("#frmbind1 #code03").val("sein3192");
		$("#frmbind1 #code04").val("sein3191**");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_pj"){
		$("#frmbind1 #code01").val("kcba123456");
		$("#frmbind1 #code02").val("2018-11-30");
		$("#frmbind1 #code03").val("sein42272");
		$("#frmbind1 #code04").val("sein42530!");
	}else if($("#frm2 #teamCode option:selected").val() == "ncustoms_pt"){
		$("#frmbind1 #code01").val("sein32939");
		$("#frmbind1 #code02").val("2019-04-30");
		$("#frmbind1 #code03").val("sein0501");
		$("#frmbind1 #code04").val("sein5671*");
	}else{
		$("#frmbind1 #code01").val("");
		$("#frmbind1 #code02").val("");
		$("#frmbind1 #code03").val("");
		$("#frmbind1 #code04").val("");
	}
};

function linkDocuFormatter(value, row){
	if(row.EdmsFileCategory == "Z0001"){
		return  "미구분";
    }else if(row.EdmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.EdmsFileCategory == "A0002"){
    	return  "Invoice";
    }else if(row.EdmsFileCategory == "A0003"){
    	return  "Packing";
    }else if(row.EdmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.EdmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.EdmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.EdmsFileCategory == "C0001"){
    	return  "운임Inv";
    }else if(row.EdmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.EdmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.EdmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.EdmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.EdmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.EdmsFileCategory == "Z0003"){
    	return  "기타";
    }
}

var DocuType = [
	{id: 'Z0001', name: '미구분'},
	{id: 'A0001', name: 'B/L'},
	{id: 'A0002', name: 'Invoice'},
	{id: 'A0003', name: 'Packing'},
	{id: 'A0004', name: 'C/O'},
	{id: 'B0001', name: '신고필증'},
	{id: 'B0002', name: '요건서류'},
	{id: 'C0001', name: '운임Inv'},
	{id: 'Z0002', name: 'Email'},
	{id: 'A0005', name: '병합'},
	{id: 'D0001', name: '정산서'},
	{id: 'C0002', name: '인수증'},
	{id: 'C0003', name: '운송서류'},
	{id: 'Z0003', name: '기타'},
	{id: 'A1012', name: 'IV&PL'}
];

//********** 미분류 다운로드 formatter**********//
function linkDownloadNotFormatter(value, row){
    return "<a onclick='javascript:fn_downNotAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 미분류 다운로드 액션**********//
var fn_downNotAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

var fn_fileListAction = function(rowdata){
	progress.show();
	$('#fileGrid').datagrid('loadData', []);
    fn_fileAction(rowdata.EdmsNo, rowdata.JisaCode, 'IMPORT');
    progress.hide();
};

var fn_fileAction = function(edmsNum, jisaCode, edmsGubun){
    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsNo"		: edmsNum,
            "edmsSingoNo"	: '',
            "edmsGubun"		: edmsGubun,
            "edmsJisaCode"	: jisaCode,
            "_pageRow"		: 2000,
            "_pageNumber"	: 0,
            "size"			: 2000,
            "page"			: 0
        },
        type1 = "POST";

    progress.show();
    sendAjax(url1, params1, type1, function(d){
    	console.log(d.content);
    	progress.hide();
    	if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.content.length == 1){
				if(d.content[0].SDAAKey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', d.content);
				}
			}else{
				$('#fileGrid').datagrid('loadData', d.content);
			}
		}
    });
};

var fn_fileListAction1 = function(rowdata){
	progress.show();
	$('#fileGrid1').datagrid('loadData', []);
    fn_fileAction1(rowdata.EdmsNo, rowdata.SingoNo, 'IMPORT');
    progress.hide();
};

var fn_fileAction1 = function(edmsNum, edmsSingoNum, edmsGubun){
    var url1 	= "../apis/edms/getEdmsMasterWithFileList",
        params1 = {
            "edmsNo"			: edmsNum,
            "edmsSingoNo"		: edmsSingoNum,
            "edmsGubun"			: edmsGubun,
            "edmsFileCategory"	: "('A1012','A0002','A0005')",
            "edmsFileExt"		: "pdf",
            "_pageRow"			: 2000,
            "_pageNumber"		: 0,
            "size"				: 2000,
            "page"				: 0
        },
        type1 = "POST";

    progress.show();
    sendAjax(url1, params1, type1, function(d){
    	console.log(d.content);
    	progress.hide();
    	if(d.content.length == 0){
			$('#fileGrid1').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.content.length == 1){
				if(d.content[0].SDAAKey == undefined){
					$('#fileGrid1').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid1').datagrid('loadData', d.content);
				}
			}else{
				$('#fileGrid1').datagrid('loadData', d.content);
			}
		}
    });
};

var fn_allDown = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if (!confirm("일괄다운 하시겠습니까?")) return;
		var d = [];

		var rows = $('#fileGrid').datagrid('getRows');
		for(var i=0; i<rows.length; i++){
			d.push({
	            "sDAAKey"		    : rows[i]['SDAAKey'],
	            "edmsParentGbn"		: rows[i]['EdmsParentGbn'],
	            "edmsNo"			: rows[i]['EdmsNo'],
	            "edmsSingoNo"		: rows[i]['EdmsSingoNo'],
	            "edmsFileCategory"	: rows[i]['EdmsFileCategory'],
	            "edmsOrgFileNm"		: rows[i]['EdmsOrgFileNm'],
	            "edmsFileStatus"	: rows[i]['EdmsFileStatus'],
	            "useYn"				: rows[i]['UseYn'],
	            "edmsSaveFileNm"	: rows[i]['EdmsSaveFileNm'],
	            "edmsFileSize"		: rows[i]['EdmsFileSize'],
	            "edmsFilePath"		: rows[i]['EdmsFilePath'],
	            "edmsFileExt"		: rows[i]['EdmsFileExt']
	        });
		}
	    saveZipAction(d, function (r) {
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

var fn_allDown1 = function(){
	var row = $('#masterGrid1').datagrid('getSelected');
	if (row){
		if (!confirm("일괄다운 하시겠습니까?")) return;
		var d = [];

		var rows = $('#fileGrid1').datagrid('getRows');
		for(var i=0; i<rows.length; i++){
			d.push({
	            "sDAAKey"			: rows[i]['SDAAKey'],
	            "edmsParentGbn"		: rows[i]['EdmsParentGbn'],
	            "edmsNo"			: rows[i]['EdmsNo'],
	            "edmsSingoNo"		: rows[i]['EdmsSingoNo'],
	            "edmsFileCategory"	: rows[i]['EdmsFileCategory'],
	            "edmsOrgFileNm"		: rows[i]['EdmsOrgFileNm'],
	            "edmsFileStatus"	: rows[i]['EdmsFileStatus'],
	            "useYn"				: rows[i]['UseYn'],
	            "edmsSaveFileNm"	: rows[i]['EdmsSaveFileNm'],
	            "edmsFileSize"		: rows[i]['EdmsFileSize'],
	            "edmsFilePath"		: rows[i]['EdmsFilePath'],
	            "edmsFileExt"		: rows[i]['EdmsFileExt']
	        });
		}
	    saveZipAction3(d, function (r) {
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

function saveZipAction(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingEdmsBlFiles",
        params = {
            "batchDownloadEdmsFileList": code,
            "downloadFileName": "allDownload.zip"
        },
        type = "POST";
    console.log(params);
    $.ajax({
        type: type,
        url: url,
        data: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        },
        success: function (response, status, xhr) {
            progress.hide();
            location.href = "../apis/edms/batchDownloadEdmsFiles?fileName=" + response + "";
        },
        error: function (e) {
        	progress.hide();
            console.error("에러내용", e);
            alert("일괄다운 권한이 없습니다.\n관리자에게 문의하세요!!!");
            progress.hide();
            return -1;
        }
    });
}

function saveZipAction3(code, callback) {
    progress.show();
    var url = "../apis/edms/archivingEdmsBl3Files",
        params = {
            "batchDownloadEdmsFileList": code,
            "downloadFileName": "batch.zip"
        },
        type = "POST";
    console.log(params);
    $.ajax({
        type: type,
        url: url,
        data: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        },
        success: function (response, status, xhr) {
            progress.hide();
            location.href = "../apis/edms/batchDownloadEdmsFiles?fileName=" + response + "";
        },
        error: function (e) {
        	progress.hide();
            console.error("에러내용", e);
            alert("일괄다운 권한이 없습니다.\n관리자에게 문의하세요!!!");
            progress.hide();
            return -1;
        }
    });
}


var fn_endAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		var url 	= "../apis/edms/updateEndRpa",
			params 	= {
				"rpaKey" : row.SDADKey,
				"endYn"	 : "Y"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    	alert("처리완료 되었습니다.");
	    	fn_searchAction();
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

var fn_errorAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		var url 	= "../apis/edms/updateEndRpa",
			params 	= {
				"rpaKey" : row.SDADKey,
				"endYn"	 : "X"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    	alert("오류처리 되었습니다.");
	    	fn_searchAction();
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

var fn_delAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		var url 	= "../apis/edms/delEndRpa",
			params 	= {
				"rpaKey" : row.SDADKey,
				"useYn"	 : "N"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    	alert("의뢰취소 되었습니다.");
	    	fn_searchAction();
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

var fn_endAction1 = function(){
	var rows = $('#masterGrid1').datagrid('getSelections');

	if(rows.length < 1){
		alert("리스트를 선택해 주세요.");
		return;
	}

	progress.show();
	var i = 0;
	var timerId2 = setInterval(function(){
		var url 	= "../apis/edms/updateEndRpa",
			params 	= {
				"rpaKey" : rows[i].SDADKey,
				"endYn"	 : "Y"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });

		i++;
		if( i >= rows.length){
			clearInterval(timerId2);
			setTimeout(function(){
				progress.hide();
				alert("처리완료 되었습니다.");
				fn_searchAction1();
			},1000);
		}
	}, 500);
};

var fn_errorAction1 = function(){
	var row = $('#masterGrid1').datagrid('getSelected');
	if (row){
		var url 	= "../apis/edms/updateEndRpa",
			params 	= {
				"rpaKey" : row.SDADKey,
				"endYn"	 : "X"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    	alert("오류처리 되었습니다.");
	    	fn_searchAction1();
	    });
	}else{
		alert("의뢰리스트를 선택한 후 클릭하세요.");
	}
};

var fn_delAction1 = function(){
	var rows = $('#masterGrid1').datagrid('getSelections');

	if(rows.length < 1){
		alert("리스트를 선택해 주세요.");
		return;
	}

	progress.show();
	var i = 0;
	var timerId2 = setInterval(function(){
		var url 	= "../apis/edms/delEndRpa",
			params 	= {
				"rpaKey" : rows[i].SDADKey,
				"useYn"	 : "N"
			},
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });

		i++;
		if( i >= rows.length){
			clearInterval(timerId2);
			setTimeout(function(){
				progress.hide();
				alert("의뢰취소 되었습니다.");
				fn_searchAction1();
			},1000);
		}
	}, 500);
};

//********** 수입신고번호 formatter**********//
function linkImportSingoFormatter(cellValue, options, rowObject) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var Singo = cellValue.substr(0, 5) + "-" + cellValue.substr(5, 2) + "-" + cellValue.substr(7, 7);
        return Singo;
    }
}

function move(){
	setTimeout(function(){
		$("#myBar").css("display", 'inline');
	    var width = 0;
	    var id = setInterval(frame, 10);
	    function frame() {
	    	var down = parseInt($("#ccc").val());
	    	var up = parseInt($("#ddd").val());
	    	width = Math.round(up / down * 100);
	    	console.log(down);
	    	console.log(width);
	        if (width >= 100) {
	            clearInterval(id);
	        } else {
	        	document.getElementById("myBar").style.width = width + '%';
	            document.getElementById("label").innerHTML = width * 1 + '%';
	        }
	    }
	}, 100);
}

var fn_searchExcel = function(){
	var form = "", url = "";
	form += "<form action='../apis/edms/singoNoExcel' method='post'>";
	url = $(form).attr("action");
	if (url != undefined && url != "") {
		form += "<input type='hidden' name='_defaultDB' value='" + $('#_defaultDB').val() + "' />";
		form += "<input type='hidden' name='edmsGubun' value='" + $('#edmsGubun').val() + "' />";
		form += "</form>";
		$(form).appendTo("body").submit().remove();
	}
};

function linkDateTimeFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Date = value.substr(0,4)+"-"+value.substr(4,2)+"-"+value.substr(6,2)+" "+value.substr(8,2)+":"+value.substr(10,2)+":"+value.substr(12,2);
		return Date;
	}
}

function linkEndFormatter(value,row){
	if (value=="Y"){
		return "완료";
	}else if (value=="X"){
		return "오류";
	}else{
		return "대기";
	}
}