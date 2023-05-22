<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/edmsMasterList1.js'/>"></script>
	<style>
	.custom-statusbar{
		padding:2px 0px 2px 0px;
		width:250px;
	}
	.odd{
		background-color:#f9f9f9;
	}
	.even{
		background-color:#f3f3f3;
	}
	.custom-filename{
		display:inline-block;
		width:250px;
		margin:0 5px 0px 0px;
		color:#333333
		vertical-align:middle;
	}
	.custom-progress{
		margin:0 10px 0px 10px;
		position:absolute;
		width:250px;
		border:0px solid #ddd;
		padding:1px;
		border-radius:3px;
		display:none;
		vertical-align:middle;
		color:#FFFFFF;
	}
	.custom-bar{
		background-color:#337AB7;
		width:0;
		height:0px;
		border-radius:3px
		color:#FFFFFF;
		display:inline-block;
		vertical-align:middle;
		margin:0px;
	}
	.custom-red{
		-moz-box-shadow:inset 0 39px 0 -24px #e67a73;
		-webkit-box-shadow:inset 0 39px 0 -24px #e67a73;
		box-shadow:inset 0 39px 0 -24px #e67a73;
		background-color:#e4685d;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		text-shadow:0 1px 0 #b23e35;
		cursor:pointer;
		vertical-align:middle;
		margin-right:5px;
	}
	.custom-green{
		background-color:#77b55a;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		margin:0;
		padding:0;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		cursor:pointer;
		text-shadow:0 1px 0 #5b8a3c;
		vertical-align:middle;
		margin-right:5px;
	}
	.ajax-file-upload{
		font-family:Arial, Helvetica, sans-serif;
		font-size:12px;
		font-weight:bold;
		padding:10px 10px 10px 10px;
		cursor:pointer;
		line-height:10px;
		height:20px;
		margin:0 10px 10px 0;
		display:inline-block;
		background:#fff;
		border:1px solid #e8e8e8;
		color:#888;
		text-decoration:none;
		border-radius:3px;
		-webkit-border-radius:3px;
		-moz-border-radius:3px;
		-moz-box-shadow:0 2px 0 0 #e8e8e8;
		-webkit-box-shadow:0 2px 0 0 #e8e8e8;
		box-shadow:0 2px 0 0 #e8e8e8;
		padding:6px 10px 4px 10px;
		color:#fff;
		background:#3458ac;
		border:none;
		-moz-box-shadow:0 2px 0 0 #13648d;
		-webkit-box-shadow:0 2px 0 0 #13648d;
		box-shadow:0 2px 0 0 #13648d;
		vertical-align:middle;
	}
	.ajax-upload-dragdrop{
		border:4px dotted #A5A5C7;
		width:300px;
		height:70px;
		color:#DADCE3;
		text-align:left;
		vertical-align:middle;
		padding:10px 10px 0px 10px;
	}

	#myProgress {
	    position: relative;
	    width: 100%;
	    height: 30px;
	    background-color: #eeeeee;
	}
	#myBar {
	    position: absolute;
	    width: 1%;
	    height: 100%;
	    background-color: blue;
	    display:none;
	}
	#label {
	    text-align: center;
	    line-height: 30px;
	    color: white;
	}
	#myBar1 {
	    position: absolute;
	    width: 1%;
	    height: 100%;
	    background-color: blue;
	    display:none;
	}
	#label1 {
	    text-align: center;
	    line-height: 30px;
	    color: white;
	}
	#myBar2 {
	    position: absolute;
	    width: 1%;
	    height: 100%;
	    background-color: blue;
	    display:none;
	}
	#label2 {
	    text-align: center;
	    line-height: 30px;
	    color: white;
	}
	</style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container" style="padding:10px">
			  <div class="easyui-layout" style="width:100%;height:650px;">
			    <div data-options="region:'west',split:true" style="width:350px;box-sizing:border-box;border:0px">
				  <div class="easyui-tabs" id="tabs" data-options="plain:true,narrow:true">
			  	    <div title="임시등록" style="padding:10px;">
			  	      <form id="insertForm" name="insertForm">
			          <input type="hidden" id="edmsParentGubun" 	name="edmsParentGubun"		value="NOTCLASS"/>
					  <input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"		value="Z0001"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"		value="A"/>
					  <input type="hidden" id="edmsJisaCode" 		name="edmsJisaCode"			value="ncustoms"/>
					  <input type="hidden" id="edmsMKey" 			name="edmsMKey"				value=""/>
					  <input type="hidden" id="commonYn" 			name="commonYn"				value="N"/>
					  <input type="hidden" id="edmsNum" 			name="edmsNum"				value=""/>
					  <input type="hidden" id="edmsSingoNum" 		name="edmsSingoNum"			value=""/>
					  <div id="fileuploader">파일찾기</div>
					  </form>
					  <div class="normal_Top">
					  <form id="notForm" name="notForm">
					   	<table>
					   	  <col width="20%" />
					  	  <col width="80%" />
					   	  <tr height="23px">
					     	<td class="left">팀선택</td>
					     	<td>
					     	  <select id="teamCode" name="teamCode" style="width:100px;height:20px"></select>
					     	</td>
					      </tr>
					      <tr height="23px">
					     	<td class="left">업무선택</td>
					     	<td>
					  	  	  <select id="edmsGubun" name="edmsGubun" style="width:60px;height:20px" onchange="ChangeGubun()">
					  	  	  	<option value="IMPORT">수입</option>
					  	  	  	<option value="EXPORT">수출</option>
					  	  	  	<option value="BANIP">갈음</option>
					  	  	  </select>
					     	</td>
					      </tr>
					      <tr height="23px;">
					      	<td class="left"><div id="gubunName">H B/L</div></td>
					      	<td>
					      	  <input type="text" id="edmsNum" name="edmsNum" style="width:100%"/>
					      	</td>
					      </tr>
					 	</table>
					  </form>
					  </div>
					  <div class="shipment_center_btn02">
					    <a href="javascript:fn_NotFileAction();" class="Btn01">조회</a>
					    <a href="javascript:fn_NotFileDelAction();" class="Btn04">삭제</a>
					  </div>
					  <div class="normal_con01">
				  		<table id="notfileGrid"></table>
				  	  </div>
			  	    </div>
			  	    <div title="화주등록" style="padding:10px;">
			  	      <div class="normal_Top">
			  	      <form id="frmTab3" name="frmTab3">
				      <table>
				   	  	<col width="20%" />
				  	  	<col width="80%" />
				  	 	<tr height="23px;">
				     	  <td class="left">업무선택</td>
				     	  <td>
				  	  	  	<select id="edmsGubun" name="edmsGubun" style="width:60px;height:20px" onchange="ChangeGubunTab3()">
				  	  	  	  <option value="IMPORT">수입</option>
				  	  	  	  <option value="EXPORT">수출</option>
				  	  	  	  <option value="BANIP">갈음</option>
				  	  	  	</select>
				     	  </td>
				        </tr>
				        <tr height="23px;">
				     	  <td class="left">팀선택</td>
				     	  <td>
				  	  	  	<select id="teamCode" name="teamCode" style="width:100px;height:20px"></select>
				     	  </td>
				      	</tr>
				   	  	<tr height="23px;">
				     	  <td class="left">업체명</td>
				     	  <td>
				  	  	  	<input type="text" id="imsTaxpayerTradeName" name="imsTaxpayerTradeName" style="width:100%;ime-mode:active;"  onkeypress="keyDown1()"/>
				     	  </td>
				      	</tr>
				        <tr height="23px;">
				      	  <td class="left"><div id="gubunName">H B/L</div></td>
				      	  <td>
				      	  	<input type="text" id="imsHouseBl" name="imsHouseBl" style="width:100%" onkeypress="keyDown1()"/>
				      	  </td>
				      	</tr>
				 	  </table>
				 	  </form>
				 	  </div>
				 	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_tab3Action();" class="Btn01">조회</a>
					  </div>
					  <div class="normal_con01">
				  		<table id="tab3Grid"></table>
				  	  </div><br>
				  	  <div class="normal_con01">
				  		<table id="tab3FileGrid"></table>
				  	  </div>
			  	    </div>
			  	    <div title="필증등록" style="padding:10px;">
			  	      <form id="insertPaperForm" name="insertPaperForm">
			      	  <input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"	value="B0001"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
					  <div id="fileuploader2">파일찾기</div>
					  <div id="myProgress">
					    <div id="myBar">
				  	  	  <div id="label">0%</div>
					  	</div>
					  </div>
					  <div style="margin-bottom:5px;color:#666666;font-size:9pt">
				      	필증 파일규칙 :<br>수입 : IMP_신고번호(14자리)_차수.pdf<br>수출 : EXP_신고번호(14자리)_차수.pdf<br>
				      </div>
				  	  </form>
				  	  <input type="hidden" id="ccc" name="ccc">
				  	  <input type="hidden" id="ddd" name="ddd">
				  	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_tab1Action();" class="Btn01">조회</a>
					    <a href="javascript:fn_tab1DelAction();" class="Btn04">삭제</a>
					  </div>
					  <div class="normal_con01">
				  		<table id="tab1FileGrid"></table>
				  	  </div>
			  	    </div>
			  	    <div title="병합등록" style="padding:10px;">
			  	      <form id="insertPaper2Form" name="insertPaper2Form">
			      	  <input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"	value="A0005"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
					  <div id="fileuploader3">파일찾기</div>
					  <div id="myProgress">
					  	<div id="myBar1">
				  	  	  <div id="label1">0%</div>
					  	</div>
					  </div>
					  <div style="margin-bottom:5px;color:#666666;font-size:9pt">
				      	병합 파일규칙 :<br>수입 : IM_신고번호(14자리)_병합.pdf<br>수출 : EX_신고번호(14자리)_병합.pdf<br>
				      </div>
				  	  </form>
				  	  <input type="hidden" id="eee" name="eee">
				  	  <input type="hidden" id="fff" name="fff">
				  	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_tab4Action();" class="Btn01">조회</a>
					    <a href="javascript:fn_tab4DelAction();" class="Btn04">삭제</a>
					  </div>
					  <div class="normal_con01">
				  		<table id="tab4FileGrid"></table>
				  	  </div>
			  	    </div>
			  	    <div title="BL등록" style="padding:10px;">
			  	      <form id="insertPaper3Form" name="insertPaper3Form">
			      	  <input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"	value="A0005"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
					  <div class="normal_Top">
					  <table>
				   	  	<col width="35%" />
				  	  	<col width="65%" />
				        <tr height="23px;">
				     	  <td class="left">팀선택</td>
				     	  <td>
				  	  	  	<select id="teamCode" name="teamCode" style="width:100px;height:20px"></select>
				     	  </td>
				      	</tr>
				      	<tr height="23px;">
				     	  <td class="left">업무선택</td>
				     	  <td>
				  	  	  	<select id="edmsGubun" name="edmsGubun" style="width:60px;">
				  	  	  	  <option value="IMPORT">수입</option>
				  	  	  	  <option value="EXPORT">수출</option>
				  	  	  	</select>
				     	  </td>
				      	</tr>
				 	  </table>
				 	  </div>
					  <div id="fileuploader4">파일찾기</div>
					  <div id="myProgress">
					  	<div id="myBar2">
				  	  	  <div id="label2">0%</div>
					  	</div>
					  </div>
					  <div style="margin-bottom:5px;color:#666666;font-size:9pt">
				      	파일규칙 :<br>수입 : BL번호.pdf<br>수출 : Invoice번호.pdf<br>
				      </div>
				  	  </form>
				  	  <input type="hidden" id="ggg" name="ggg">
				  	  <input type="hidden" id="hhh" name="hhh">
				  	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_tab5Action();" class="Btn01">조회</a>
					    <a href="javascript:fn_tab5DelAction();" class="Btn04">삭제</a>
					  </div>
					  <div class="normal_con01">
				  		<table id="tab5FileGrid"></table>
				  	  </div>
			  	    </div>
			  	  </div>
			  	</div>
			    <div data-options="region:'center'" style="width:1000px;box-sizing:border-box;border:0px">
			      <div class="easyui-layout" style="width:980px;height:650px;">
			        <div data-options="region:'west',split:true" style="width:40px;box-sizing:border-box;border:0px;">
			          <div id="arrowRight" style="margin-top:270px"></div>
			          <div id="arrowLeft" style="margin-top:10px"></div>
			        </div>
			        <div data-options="region:'center',split:true" style="width:600px;box-sizing:border-box;border:0px;overflow:hidden;">
			          <div class="normal_Top" style="background-color:#fff3dd">
			          <form id="frm2" name="frm2">
					  <input type="hidden" id="size" 				name="size" 			value="10000" />
					  <input type="hidden" id="page" 				name="page" 			value="0" />
					  <input type="hidden" id="USERGRADE" 			name="USERGRADE" 		value="${sessionScope.USERGRADE}">
					  <input type="hidden" id="sessionId" 			name="sessionId" 		value="${sessionScope.USERID}">
					  <input type="hidden" id="edmsMasterUserId" 	name="edmsMasterUserId" value="${sessionScope.USERID}">
					  <input type="hidden" id="useYn" 				name="useYn" 			value="Y">
					  <input type="hidden" id="_defaultDB" 			name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
					  <table id="searchArea">
					  	<col width="15%" />
					  	<col width="35%" />
					  	<col width="1%" />
					  	<col width="14%" />
					  	<col width="35%" />
					  	<tr height="27px;">
						  <td class="left">
						  	<select id="_DateType" name="_DateType" style="width:60px;"></select>
						  </td>
						  <td colspan="4">
						  	<input type="text" id="strFromDate" name="strFromDate" 	style="width:70px;text-align:center;" maxlength="8"/> ~
						  	<input type="text" id="strToDate" 	name="strToDate" 	style="width:70px;text-align:center;" maxlength="8"/>
						  	<div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevdayEdms()"><img src="<c:url value='/images/common/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_todayEdms()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextdayEdms()"><img src="<c:url value='/images/common/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweekEdms()"><img src="<c:url value='/images/common/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_weekEdms()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweekEdms()"><img src="<c:url value='/images/common/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonthEdms()"><img src="<c:url value='/images/common/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_monthEdms()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonthEdms()"><img src="<c:url value='/images/common/arrow_next.jpg'/>"></a>
						    </div>
						  </td>
					  	</tr>
					  	<tr height="27px;">
					  	  <td class="left">범위</td>
						  <td colspan="4">
						  	<select id="gubunType" name="gubunType" style="width:60px;" onchange="ChangeTypefrm2(this)">
						      <option value="my">MY</option>
						 	  <option value="team">팀</option>
							  <option value="jisa">지사</option>
							  <!-- option value="all">전체</option-->
						  	</select>
						  	<select id="teamCode" name="teamCode" style="width:80px;" onchange="ChangeType2frm2(this)"></select>
						  	<select id="jisaCode" name="jisaCode" style="width:80px;" onchange="ChangeType3frm2(this)"></select>
						  </td>
					  	</tr>
					  	<tr height="27px;">
					      <td class="left">처리현황</td>
				     	  <td colspan="4">
				  	  	  	<select id="edmsStatus" name="edmsStatus" style="width:60px;" onchange="ChangeStatusfrm2()"></select>
				     	  </td>
					  	</tr>
					  	<tr height="23px;">
				     	  <td class="left">업무선택</td>
				     	  <td colspan="4">
				  	  	  	<select id="edmsGubun" name="edmsGubun" style="width:60px;" onchange="ChangeGubunfrm2()">
				  	  	  	  <option value="IMPORT">수입</option>
				  	  	  	  <option value="EXPORT">수출</option>
				  	  	  	  <option value="BANIP">갈음</option>
				  	  	  	</select>
				     	  </td>
				      	</tr>
				        <tr>
				      	  <td class="left">담당자</td>
				      	  <td>
				      	  	<input type="text" id="edmsMasterUserName" name="edmsMasterUserName" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
				      	  </td>
				      	  <td></td>
				      	  <td class="left">File No</td>
				      	  <td>
				      	  	<input type="text" id="edmsFileNo" name="edmsFileNo" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
				      	  </td>
				      	</tr>
				      	<tr>
				      	  <td class="left"><div id="gubunName">H B/L</div></td>
				      	  <td colspan="4">
				      	  	<input type="text" id="edmsNum" name="edmsNum" style="width:100%;" onkeypress="keyDown()"/>
				      	  </td>
				      	</tr>
					  	<tr>
						  <td class="left"><div id="gubunSingoName">신고번호</div></td>
						  <td colspan="4">
						  	<input type="text" id="singoNum" name="singoNum" style="width:100%;" onkeypress="keyDown()"/>
						  </td>
					  	</tr>
					  	<tr>
						  <td class="left">업체명</td>
						  <td colspan="4">
						  	<input type="text" id="edmsComName" name="edmsComName" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
						  </td>
					  	</tr>
					  </table>
					  </form>
					  </div>
					  <div class="shipment_center_btn02">
					    <a href="javascript:fn_searchActionTotal();" class="Btn01">조회</a>
					    <!-- a href="javascript:fn_deliveryInsert();" class="Btn02">운송의뢰</a>
					    <a href="javascript:fn_deliveryView();" class="Btn02">운송현황</a>
					    <a href="javascript:fn_FieldInsert();" class="Btn02">현장의뢰</a>
					    <a href="javascript:fn_FieldInsert1();" class="Btn02">현장정정의뢰</a-->
					  </div>
					  <div class="normal_con01">
				  		<table id="masterGrid"></table>
				  	  </div>
			        </div>
			        <div data-options="region:'east',split:true" style="width:340px;box-sizing:border-box;border:0px">
			          <form id="deliveryForm" name="deliveryForm">
				      <input type="hidden" id="deliveryPojangDanwi" 		name="deliveryPojangDanwi"/>
				      <input type="hidden" id="deliveryJungDanwi" 			name="deliveryJungDanwi"/>
				      <input type="hidden" id="assignCom" 					name="assignCom"/>
				      <input type="hidden" id="assignMan" 					name="assignMan"/>
				      <input type="hidden" id="assignPhone" 				name="assignPhone"/>
				      <input type="hidden" id="deliveryCarryingInKey" 		name="deliveryCarryingInKey"/>
				      <input type="hidden" id="deliveryCarryingInName" 		name="deliveryCarryingInName"/>
				   	  <input type="hidden" id="deliveryCarryingInMan" 		name="deliveryCarryingInMan"/>
				   	  <input type="hidden" id="deliveryCarryingInMobile" 	name="deliveryCarryingInMobile"/>
				   	  <input type="hidden" id="deliveryCarryingInPhone" 	name="deliveryCarryingInPhone"/>
				   	  <input type="hidden" id="deliveryCarryingInEmail" 	name="deliveryCarryingInEmail"/>
				      <input type="hidden" id="deliveryCarryingInAddr" 		name="deliveryCarryingInAddr"/>
				      <input type="hidden" id="deliveryPojangSu" 			name="deliveryPojangSu"/>
				      <input type="hidden" id="deliveryJung" 				name="deliveryJung"/>
				      <input type="hidden" id="cargoSize" 					name="cargoSize"/>
				      <input type="hidden" id="banipPlace" 					name="banipPlace"/>
				      <input type="hidden" id="requestNote" 				name="requestNote"/>
				      <input type="hidden" id="requestInvisibleNote" 		name="requestInvisibleNote"/>
				   	  </form>
				   	  <form id="addForm" name="addForm">
				      <input type="hidden" id="edmsParentGubun" 	name="edmsParentGubun"/>
				      <input type="hidden" id="edmsJisaCode" 		name="edmsJisaCode"/>
				      <input type="hidden" id="edmsMKey" 			name="edmsMKey"/>
					  <input type="hidden" id="edmsNum" 			name="edmsNum"/>
					  <input type="hidden" id="edmsSingoNum" 		name="edmsSingoNum"/>
					  <input type="hidden" id="commonYn" 			name="commonYn"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"  value="A"/>
				      <input type="hidden" id="selrow" 				name="selrow"/>
			          <input type="hidden" id="pageNum" 			name="pageNum"/>
				   	  <div id="fileuploader1">파일찾기</div>
				   	  <div class="normal_Top">
				   		<table>
				   	  	  <col width="25%"/>
					  	  <col width="75%"/>
						  <tr height="23px">
					      	<td class="left">문서형태</td>
					      	<td>
					      	  <select id="commonGubun" name="commonGubun" style="width:150px;">
						  	  	<option value="A">B/L(Inv) 기준 공통문서</option>
						  	  	<option value="B">신고번호별 개별문서</option>
						  	  </select>
					      	</td>
					      </tr>
					      <tr height="23px">
					      	<td class="left">문서구분</td>
					      	<td>
					      	  <select id="edmsFileCategory" name="edmsFileCategory" style="width:80px;"></select>
					      	</td>
					      </tr>
				 		</table>
				   	  </div>
				   	  </form>
				   	  <div style="height:64px"></div>
				   	  <form id="frm3" name="frm3">
				  	  <input type="hidden" id="sessionId" 			name="sessionId" 		value="${sessionScope.USERID}"/>
				  	  <input type="hidden" id="USERGRADE" 			name="USERGRADE"		value="${sessionScope.USERGRADE}">
				   	  <input type="hidden" id="addDay" 				name="addDay"/>
				   	  <input type="hidden" id="editDay" 			name="editDay"/>
				   	  <input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
				   	  <input type="hidden" id="yymmddhhmmss" 		name="yymmddhhmmss"/>
				   	  <input type="hidden" id="useYn" 				name="useYn" 			value="Y"/>
				   	  <input type="hidden" id="addUserName" 		name="addUserName"		value="${sessionScope.USERNAME}"/>
				   	  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
				   	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_detailSave();" class="Btn01">구분 저장</a>
					    <a href="javascript:fn_detailSingoSave();" class="Btn02">신고번호별 개별 저장</a>
					    <!-- a href="javascript:fn_allDown();" class="Btn02">일괄다운</a-->
					  </div>
					  <div class="normal_con01">
				  		<table id="fileGrid"></table>
				  	  </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>