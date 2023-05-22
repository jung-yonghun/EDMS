<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/edmsMasterList.js'/>"></script>
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
		width:100%;
		height:100px;
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
	</style>
  </head>
  <body oncontextmenu="return false">
    <table width="1350px" style="margin-top:5px">
      <tr>
        <td width="350px" valign="top">
          <div id="tabs" style="position:relative;width:350px">
			<ul>
			  <li><a href="#tabs-1">임시등록</a></li>
			  <li><a href="#tabs-2">화주등록</a></li>
			  <li><a href="#tabs-3">필증등록</a></li>
			</ul>
			<div id="tabs-1">
	          <form id="insertForm" name="insertForm">
				<input type="hidden" id="edmsGubun" 		name="edmsGubun" 			value="NOTCLASS"/>
				<input type="hidden" id="edmsKey" 			name="edmsKey" 				value="1"/>
				<input type="hidden" id="edmsManagementNum" name="edmsManagementNum" 	value="ED161010000001"/>
				<input type="hidden" id="edmsStatus" 		name="edmsStatus" 			value="0"/>
				<input type="hidden" id="edmsNum" 			name="edmsNum" 				value=""/>
				<input type="hidden" id="addDay" 			name="addDay"/>
				<input type="hidden" id="editDay" 			name="editDay"/>
				<input type="hidden" id="useYn" 			name="useYn" 				value="Y"/>
				<input type="hidden" id="addUserName" 		name="addUserName"			value="${sessionScope.USERNAME}"/>
				<input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
				<input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"		value="Z0001"/>
				<input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"		value="A"/>
				<input type="hidden" id="edmsSearchKeyword" name="edmsSearchKeyword"/>
				<input type="hidden" id="edmsComKey" 		name="edmsComKey"			value="0"/>
				<input type="hidden" id="jisaCode" 			name="jisaCode"				value="ncustoms"/>
				<input type="hidden" id="edmsComCode" 		name="edmsComCode"			value="ZZZZ"/>
				<input type="hidden" id="edmsComName" 		name="edmsComName"			value="미분류업체"/>
				<input type="hidden" id="edmsComNum" 		name="edmsComNum"			value="0000000000"/>
				<input type="hidden" id="teamCode" 			name="teamCode"				value="040"/>
				<input type="hidden" id="divisionSingoYn"	name="divisionSingoYn"		value="N"/>
				<input type="hidden" id="iphangDay" 		name="iphangDay"			value="10000101"/>
				<input type="hidden" id="banipDay" 			name="banipDay"				value="10000101"/>
				<input type="hidden" id="singoDay" 			name="singoDay"				value="10000101"/>
				<input type="hidden" id="suriDay" 			name="suriDay"				value="10000101"/>
				<input type="hidden" id="banchulDay" 		name="banchulDay"			value="10000101"/>
				<div id="fileuploader">파일찾기</div>
			  </form>
			  <form id="notForm" name="notForm">
			   	<input type="hidden" id="edmsKey" 				name="edmsKey"			value="1"/>
			   	<input type="hidden" id="edmsEtcKey" 			name="edmsEtcKey"		value="2"/>
			   	<input type="hidden" id="addDay" 				name="addDay"/>
			   	<input type="hidden" id="edmsUploadType" 		name="edmsUploadType"	value="EDMS"/>
			   	<input type="hidden" id="editDay" 				name="editDay"/>
			   	<input type="hidden" id="iphangDay" 			name="iphangDay"		value="10000101"/>
			   	<input type="hidden" id="banipDay" 				name="banipDay"			value="10000101"/>
			   	<input type="hidden" id="singoDay" 				name="singoDay"			value="10000101"/>
			   	<input type="hidden" id="suriDay" 				name="suriDay"			value="10000101"/>
			   	<input type="hidden" id="banchulDay" 			name="banchulDay"		value="10000101"/>
			   	<input type="hidden" id="yyyymmdd" 				name="yyyymmdd"/>
			   	<input type="hidden" id="yymmddhhmmss" 			name="yymmddhhmmss"/>
			   	<input type="hidden" id="singoNum" 				name="singoNum"/>
			   	<input type="hidden" id="edmsMrn" 				name="edmsMrn"/>
			   	<input type="hidden" id="edmsMsn" 				name="edmsMsn"/>
			   	<input type="hidden" id="edmsStatus" 			name="edmsStatus"		value="0"/>
			   	<input type="hidden" id="useYn" 				name="useYn" 			value="Y"/>
			   	<input type="hidden" id="addUserName" 			name="addUserName"		value="${sessionScope.USERNAME}"/>
			   	<input type="hidden" id="_defaultDB" 			name="_defaultDB"		value="${sessionScope.DEFAULTDB}">
			   	<input type="hidden" id="_allFileTransfer" 		name="_allFileTransfer"	value="N"/>
			   	<input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
			   	<input type="hidden" id="edmsSearchKeyword" 	name="edmsSearchKeyword"/>
			   	<input type="hidden" id="edmsFileCategory" 		name="edmsFileCategory"/>
			   	<input type="hidden" id="edmsFileNote" 			name="edmsFileNote"/>
			   	<input type="hidden" id="edmsManagementNum" 	name="edmsManagementNum"/>
			   	<input type="hidden" id="divisionSingoYn" 		name="divisionSingoYn"	value="N"/>
			   	<table class="table table-striped table-bordered">
			   	  <col width="20%" />
			  	  <col width="80%" />
			   	  <tr>
			     	<td class="info text-center">업체선택</td>
			     	<td>
			     	  <select id="teamCode" name="teamCode" class="input-sm" style="width:70px" onchange="ChangeTeam(this)"></select>
			     	  <input type="hidden" 	id="utTeamCode" 	name="utTeamCode"/>
			     	  <input type="hidden" 	id="utTeamSeq" 		name="utTeamSeq"/>
			     	  <input type="hidden" 	id="utTeamName" 	name="utTeamName"/>
			     	  <input type="hidden" 	id="utcUseYn" 		name="utcUseYn"		value="Y"/>
			     	  <input type="hidden" 	id="edmsComNum" 	name="edmsComNum"/>
			     	  <input type="hidden" 	id="edmsComKey" 	name="edmsComKey"/>
			     	  <input type="hidden" 	id="jisaCode" 		name="jisaCode"/>
			     	  <input type="text" 	id="edmsComCode" 	name="edmsComCode" class="input-sm" style="width:40px;" readOnly/>
			  	  	  <input type="text" 	id="edmsComName" 	name="edmsComName" class="input-sm" style="width:120px;" readOnly/>
			  	  	  <a onclick="javascript:fn_searchTaxpayer()" style="cursor:pointer;"><img src="../images/common/btn_search.gif" style="margin-bottom:4px"></a>
			     	</td>
			      </tr>
			      <tr>
			     	<td class="info text-center">업무선택</td>
			     	<td>
			  	  	  <select id="edmsGubun" name="edmsGubun" class="input-sm" style="width:60px" onchange="ChangeGubun()">
			  	  	  	<option value="IMPORT">수입</option>
			  	  	  	<option value="EXPORT">수출</option>
			  	  	  	<option value="HWANGUP">환급</option>
			  	  	  	<option value="SEINETC">기타</option>
			  	  	  </select>
			     	</td>
			      </tr>
			      <tr>
			      	<td class="info text-center"><div id="gubunName">H B/L</div></td>
			      	<td>
			      	  <input type="text" id="edmsNum" name="edmsNum" class="input-sm" style="width:100%"/>
			      	</td>
			      </tr>
			 	</table>
			  </form>
			  <div style="margin-top:5px;margin-bottom:5px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_NotFileAction();">조회</button>
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_NotFileDelAction();">삭제</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">
	              	미분류 파일 리스트
	            </div>
	            <div class="panel-body well-sm" id='parentDiv0'>
	              <table id="notfileGrid"></table>
				  <div id="notfilePager"></div>
	            </div>
	          </div>
			  <form id="returnForm" name="returnForm">
			   	<input type="hidden" id="${_csrf.parameterName}" name="${_csrf.parameterName}"	value="${_csrf.token}"/>
			   	<input type="hidden" id="edmsKey" 				name="edmsKey"/>
			   	<input type="hidden" id="addDay" 				name="addDay"/>
			   	<input type="hidden" id="editDay" 				name="editDay"/>
			   	<input type="hidden" id="yyyymmdd" 				name="yyyymmdd"/>
			   	<input type="hidden" id="edmsStatus" 			name="edmsStatus" 		value="0"/>
			   	<input type="hidden" id="useYn" 				name="useYn" 			value="Y"/>
			   	<input type="hidden" id="addUserName" 			name="addUserName"		value="${sessionScope.USERNAME}"/>
			   	<input type="hidden" id="_allFileTransfer" 		name="_allFileTransfer"	value="Y"/>
			   	<input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
			   	<input type="hidden" id="edmsSearchKeyword" 	name="edmsSearchKeyword"/>
			   	<input type="hidden" id="edmsFileCategory" 		name="edmsFileCategory"	value="Z0001"/>
			   	<input type="hidden" id="edmsFileNote" 			name="edmsFileNote"/>
			   	<input type="hidden" id="teamCode" 				name="teamCode" 		value="040"/>
			   	<input type="hidden" id="edmsComNum" 			name="edmsComNum" 		value="0000000000"/>
			   	<input type="hidden" id="edmsComKey" 			name="edmsComKey" 		value="0"/>
			   	<input type="hidden" id="jisaCode" 				name="jisaCode" 		value="ncustoms"/>
			   	<input type="hidden" id="edmsComCode" 			name="edmsComCode" 		value="ZZZZ"/>
			   	<input type="hidden" id="edmsComName" 			name="edmsComName" 		value="미분류업체"/>
			   	<input type="hidden" id="edmsGubun" 			name="edmsGubun" 		value="NOTCLASS"/>
			   	<input type="hidden" id="edmsNum" 				name="edmsNum" 			value=""/>
			   	<input type="hidden" id="edmsManagementNum" 	name="edmsManagementNum" value="ED160927000001"/>
			  </form>
		    </div>
		    <div id="tabs-2" width="350px">
		      <form id="frmTab3" name="frmTab3">
		      <table class="table table-striped table-bordered">
			   	  <col width="20%" />
			  	  <col width="80%" />
			  	  <tr>
			     	<td class="info text-center">업무선택</td>
			     	<td>
			  	  	  <select id="edmsGubun" name="edmsGubun" class="input-sm" style="width:60px" onchange="ChangeGubunTab3()">
			  	  	  	<option value="IMPORT">수입</option>
			  	  	  	<option value="EXPORT">수출</option>
			  	  	  </select>
			     	</td>
			      </tr>
			   	  <tr>
			     	<td class="info text-center">업체명</td>
			     	<td>
			  	  	  <input type="text" id="imsTaxpayerTradeName" name="imsTaxpayerTradeName" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown1()"/>
			     	</td>
			      </tr>
			      <tr>
			      	<td class="info text-center"><div id="gubunName">H B/L</div></td>
			      	<td>
			      	  <input type="text" id="imsHouseBl" name="imsHouseBl" class="input-sm" style="width:100%" onkeypress="keyDown1()"/>
			      	</td>
			      </tr>
			 	</table>
			 	<div style="margin-top:5px;margin-bottom:5px;">
				  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_tab3Action();">조회</button>
				  	<select id="teamCode" name="teamCode" class="input-sm" style="width:100px;"></select>(으)로 할당
				</div>
				</form>
				  <div class="panel panel-primary">
		            <div class="panel-heading">
		              	미분류 화주등록 리스트
		            </div>
		            <div class="panel-body well-sm" id='parentDiv33'>
		              <table id="tab3Grid"></table>
					  <div id="tab3Pager"></div>
		            </div>
		          </div>
		          <div class="panel panel-primary">
		            <div class="panel-heading">
		              	파일 리스트
		            </div>
		            <div class="panel-body well-sm" id='parentDiv34'>
		              <table id="tab3FileGrid"></table>
					  <div id="tab3FilePager"></div>
		            </div>
		          </div>
		    </div>
		    <div id="tabs-3" width="350px">
		      <form id="insertPaperForm" name="insertPaperForm">
				<input type="hidden" id="edmsGubun" 		name="edmsGubun" 		value="PAPER"/>
				<input type="hidden" id="edmsStatus" 		name="edmsStatus" 		value="0"/>
				<input type="hidden" id="edmsNum" 			name="edmsNum" 			value=""/>
				<input type="hidden" id="addDay" 			name="addDay"/>
				<input type="hidden" id="editDay" 			name="editDay"/>
				<input type="hidden" id="useYn" 			name="useYn" 			value="Y"/>
				<input type="hidden" id="addUserName" 		name="addUserName"		value="${sessionScope.USERNAME}"/>
				<input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
				<input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"	value="B0001"/>
				<input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"	value="A"/>
				<input type="hidden" id="edmsSearchKeyword" name="edmsSearchKeyword"/>
				<input type="hidden" id="edmsComKey" 		name="edmsComKey"		value="0"/>
				<input type="hidden" id="jisaCode" 			name="jisaCode"			value="ncustoms"/>
				<input type="hidden" id="edmsComCode" 		name="edmsComCode"		value="ZZZZ"/>
				<input type="hidden" id="edmsComName" 		name="edmsComName"		value="미분류업체"/>
				<input type="hidden" id="edmsComNum" 		name="edmsComNum"		value="0000000000"/>
				<input type="hidden" id="teamCode" 			name="teamCode"			value="011"/>
				<input type="hidden" id="divisionSingoYn"	name="divisionSingoYn"	value="N"/>
				<input type="hidden" id="iphangDay" 		name="iphangDay"		value="10000101"/>
				<input type="hidden" id="banipDay" 			name="banipDay"			value="10000101"/>
				<input type="hidden" id="singoDay" 			name="singoDay"			value="10000101"/>
				<input type="hidden" id="suriDay" 			name="suriDay"			value="10000101"/>
				<input type="hidden" id="banchulDay" 		name="banchulDay"		value="10000101"/>
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
			  <div style="margin-bottom:5px;">
			    <button type="button" class="btn btn-primary btn-xs" onclick="fn_tab1Action();">조회</button>
			    <button type="button" class="btn btn-primary btn-xs" onclick="fn_tab1DelAction();">삭제</button>
			    <!-- button type="button" class="btn btn-primary btn-xs" onclick="fn_autoAction();">자동</button-->
			  </div>
		      <div class="panel panel-primary">
		        <div class="panel-heading">
		          	필증 미등록 리스트
		        </div>
		        <div class="panel-body well-sm" id='parentDiv14'>
		          <table id="tab1FileGrid"></table>
				  <div id="tab1FilePager"></div>
		        </div>
		      </div>
		    </div>
		  </div>
        </div>
      </td>
      <td width="30px" valign="top">
        <table style="width:100%">
	  	  <tr style="height:340px;">
		  	<td valign="middle"><div id="arrowRight"></div></td>
	  	  </tr>
	  	  <tr style="height:280px;">
		  	<td valign="middle"><div id="arrowLeft"></div></td>
	  	  </tr>
	    </table>
	    <iframe id="unipass" name="unipass" width="0" height="0" frameborder="0"></iframe>
      </td>
      <td width="570px" valign="top">
        <div width="600px">
		<form id="frm2" name="frm2">
		<input type="hidden" id="size" 				name="size" 			value="10000" />
		<input type="hidden" id="page" 				name="page" 			value="0" />
		<input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
		<input type="hidden" id="sessionId" 		name="sessionId" 		value="${sessionScope.USERID}">
		<input type="hidden" id="edmsMasterUserId" 	name="edmsMasterUserId" value="${sessionScope.USERID}">
		<input type="hidden" id="useYn" 			name="useYn" 			value="Y">
		<input type="hidden" id="divisionSingoYn" 	name="divisionSingoYn" 	value="N">
		<input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
		<table id="searchArea" class="table table-striped table-bordered">
		  <col width="15%" />
		  <col width="35%" />
		  <col width="15%" />
		  <col width="35%" />
		  <tr>
			<td class="warning text-center">
			  <select id="_DateType" name="_DateType" class="input-sm" style="width:60px;">
			    <option value="editDay">등록일</option>
			    <option value="iphangDay">입항일</option>
			    <option value="banipDay">반입일</option>
			    <option value="singoDay">신고일</option>
			    <option value="suriDay" selected>수리일</option>
			  </select>
			</td>
			<td colspan="3">
			  <input type="text" id="strFromDate" 	name="strFromDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8"/> ~
			  <input type="text" id="strToDate" 	name="strToDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8"/>
			  <img src="../images/common/ico_left.gif" onclick="fn_prevdayEdms()"><img src="../images/common/today.gif" onclick="fn_todayEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextdayEdms()">
			  <img src="../images/common/ico_left.gif" onclick="fn_prevweekEdms()"><img src="../images/common/week.gif" onclick="fn_weekEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextweekEdms()">
			  <img src="../images/common/ico_left.gif" onclick="fn_prevmonthEdms()"><img src="../images/common/month.gif" onclick="fn_monthEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextmonthEdms()">
			</td>
		  </tr>
		  <tr>
		  	<td class="warning text-center">범위</td>
			<td colspan="3">
			  <select id="gubunType" name="gubunType" class="input-sm" style="width:60px;" onchange="ChangeTypefrm2(this)">
			    <option value="my">MY</option>
			 	<option value="team">팀</option>
				<option value="jisa">지사</option>
				<!-- option value="all">전체</option-->
			  </select>
			  <select id="teamCode" name="teamCode" class="input-sm" style="width:80px;" onchange="ChangeType2frm2(this)"></select>
			  <select id="jisaCode" name="jisaCode" class="input-sm" style="width:80px;"></select>
			</td>
		  </tr>
		  <tr>
		    <td class="warning text-center">처리현황</td>
	     	<td colspan="3">
	  	  	  <select id="edmsStatus" name="edmsStatus" class="input-sm" style="width:60px;" onchange="ChangeStatusfrm2()"></select>
	     	</td>
	     	<!-- td class="info text-center">파일유무</td>
	     	<td>
	  	  	  <select id="filegubunType" name="filegubunType" class="input-sm" style="width:60px;">
	  	  	    <option value="N">N</option>
			    <option value="Y">Y</option>
			  </select>
	     	</td-->
		  </tr>
		  <tr>
	     	<td class="warning text-center">업무선택</td>
	     	<td colspan="3">
	  	  	  <select id="edmsGubun" name="edmsGubun" class="input-sm" style="width:60px;" onchange="ChangeGubunfrm2()">
	  	  	  	<option value="IMPORT">수입</option>
	  	  	  	<option value="EXPORT">수출</option>
	  	  	  	<option value="HWANGUP">환급</option>
	  	  	  	<option value="SEINETC">기타</option>
	  	  	  </select>
	     	</td>
	      </tr>
	      <tr>
	      	<td class="warning text-center">담당자</td>
	      	<td>
	      	  <input type="text" id="edmsMasterUserName" name="edmsMasterUserName" class="input-sm" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
	      	</td>
	      	<td class="warning text-center">File No</td>
	      	<td>
	      	  <input type="text" id="edmsFileNo" name="edmsFileNo" class="input-sm" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
	      	</td>
	      </tr>
	      <tr>
	      	<td class="warning text-center"><div id="gubunName">H B/L</div></td>
	      	<td colspan="3">
	      	  <input type="text" id="edmsNum" name="edmsNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/>
	      	</td>
	      </tr>
		  <tr>
			<td class="warning text-center"><div id="gubunSingoName">신고번호</div></td>
			<td colspan="3">
			  <input type="text" id="singoNum" name="singoNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/>
			</td>
		  </tr>
		  <tr>
			<td class="warning text-center">업체명</td>
			<td colspan="3">
			  <input type="text" id="edmsComName" name="edmsComName" class="input-sm" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
			</td>
		  </tr>
		</table>
		</form>
		<div style="margin-top:5px;margin-bottom:5px;">
	  		<button type="button" class="btn btn-warning btn-xs" onclick="fn_searchActionTotal();"><font color="black">조회</font></button>
	  		<button type="button" class="btn btn-success btn-xs" onclick="fn_searchNcomList();"><font color="black">통관미등록 동기화</font></button>
	  		<button id="deliveryBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_deliveryInsert();">운송의뢰</button>
	  		<button id="deliveryBtn2" type="button" class="btn btn-primary btn-xs" onclick="fn_deliveryModify();">운송수정</button>
	  		<button id="deliveryBtn1" type="button" class="btn btn-primary btn-xs" onclick="fn_deliveryView();">운송현황</button>
	  		<!-- button id="changeAllBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_allStatusSave();">만능 동기화</button>
	  		<button id="changeBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_statusSave();">수동 동기화</button>
	  		<button id="saveImpoBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_changeNum();">수동 저장</button>
	  		<button id="saveExpoBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_changeNum1();">수동 저장</button>
	  		<button id="saveImpoCopyBtn" type="button" class="btn btn-primary btn-xs" onclick="fn_copy();">분할건 Copy</button-->
	    </div>
	    <div class="panel panel-yellow">
            <div class="panel-heading">
              <font color="black">분류 리스트</font>
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <table id="masterGrid"></table>
			  <div id="masterPager"></div>
            </div>
        </div>
        </div>
      </td>
      <td width="20px" valign="top">
        <form id="deliveryForm" name="deliveryForm">
	    <input type="hidden" id="deliveryPojangDanwi" 		name="deliveryPojangDanwi"/>
	    <input type="hidden" id="deliveryJungDanwi" 		name="deliveryJungDanwi"/>
	    <input type="hidden" id="assignCom" 				name="assignCom"/>
	    <input type="hidden" id="assignMan" 				name="assignMan"/>
	    <input type="hidden" id="assignPhone" 				name="assignPhone"/>
	    <input type="hidden" id="deliveryCarryingInKey" 	name="deliveryCarryingInKey"/>
	    <input type="hidden" id="deliveryCarryingInName" 	name="deliveryCarryingInName"/>
	   	<input type="hidden" id="deliveryCarryingInMan" 	name="deliveryCarryingInMan"/>
	   	<input type="hidden" id="deliveryCarryingInMobile" 	name="deliveryCarryingInMobile"/>
	   	<input type="hidden" id="deliveryCarryingInPhone" 	name="deliveryCarryingInPhone"/>
	   	<input type="hidden" id="deliveryCarryingInEmail" 	name="deliveryCarryingInEmail"/>
	    <input type="hidden" id="deliveryCarryingInAddr" 	name="deliveryCarryingInAddr"/>
	    <input type="hidden" id="deliveryPojangSu" 			name="deliveryPojangSu"/>
	    <input type="hidden" id="deliveryJung" 				name="deliveryJung"/>
	    <input type="hidden" id="cargoSize" 				name="cargoSize"/>
	    <input type="hidden" id="banipPlace" 				name="banipPlace"/>
	    <input type="hidden" id="requestNote" 				name="requestNote"/>
	    <input type="hidden" id="requestInvisibleNote" 		name="requestInvisibleNote"/>
	   	</form>
      </td>
      <td width="380px" valign="top">
        <div width="400px">
		  	<form id="addForm" name="addForm">
		    <input type="hidden" id="edmsKey" 			name="edmsKey"/>
		    <input type="hidden" id="edmsGubun" 		name="edmsGubun"/>
		    <input type="hidden" id="edmsNum" 			name="edmsNum"/>
		    <input type="hidden" id="edmsStatus" 		name="edmsStatus" 		value="0"/>
		    <input type="hidden" id="addDay" 			name="addDay"/>
		    <input type="hidden" id="editDay" 			name="editDay"/>
		    <input type="hidden" id="iphangDay" 		name="iphangDay"/>
		   	<input type="hidden" id="banipDay" 			name="banipDay"/>
		   	<input type="hidden" id="singoDay" 			name="singoDay"/>
		   	<input type="hidden" id="suriDay" 			name="suriDay"/>
		   	<input type="hidden" id="banchulDay" 		name="banchulDay"/>
		    <input type="hidden" id="useYn" 			name="useYn" 			value="Y"/>
		    <input type="hidden" id="addUserName" 		name="addUserName"		value="${sessionScope.USERNAME}"/>
		    <input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
		    <input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"	value="A"/>
		    <input type="hidden" id="teamCode" 			name="teamCode"/>
		    <input type="hidden" id="edmsComNum" 		name="edmsComNum"/>
		    <input type="hidden" id="edmsComKey" 		name="edmsComKey"/>
		    <input type="hidden" id="jisaCode" 			name="jisaCode"/>
		    <input type="hidden" id="edmsComCode" 		name="edmsComCode"/>
		    <input type="hidden" id="edmsComName" 		name="edmsComName"/>
		    <input type="hidden" id="edmsManagementNum" name="edmsManagementNum"/>
		    <input type="hidden" id="singoNum" 			name="singoNum"/>
		    <input type="hidden" id="divisionSingoYn" 	name="divisionSingoYn"/>
		    <input type="hidden" id="edmsSearchKeyword" name="edmsSearchKeyword"/>
		    <input type="hidden" id="edmsUploadType" 	name="edmsUploadType"/>
		    <input type="hidden" id="selrow" 			name="selrow"/>
	        <input type="hidden" id="pageNum" 			name="pageNum"/>
		   	<div id="fileuploader1">파일찾기</div>
		   	<div>
		   	<table class="table table-striped table-bordered">
		   	  <col width="20%" />
			  <col width="80%" />
			  <tr>
		      	<td class="info text-center">문서형태</td>
		      	<td>
		      	  <select id="commonGubun" name="commonGubun" class="input-sm" style="width:150px;">
			  	  	<option value="A">B/L(Inv) 기준 공통문서</option>
			  	  	<option value="B">신고번호별 개별문서</option>
			  	  </select>
		      	</td>
		      </tr>
		      <tr>
		      	<td class="info text-center">문서구분</td>
		      	<td>
		      	  <select id="edmsFileCategory" name="edmsFileCategory" class="input-sm" style="width:80px;"></select>
		      	</td>
		      </tr>
		      <!-- tr>
		     	<td class="info text-center">파일설명</td>
		     	<td>
		     	  <input type="text" id="edmsFileNote" name="edmsFileNote" class="input-sm" style="width:100%;"/>
		     	</td>
		      </tr-->
		 	</table>
		   	</div>
		   	</form>
		   	<form id="changeForm" name="changeForm">
		    <input type="hidden" id="edmsKey" 			name="edmsKey"/>
		    <input type="hidden" id="edmsGubun" 		name="edmsGubun"/>
		    <input type="hidden" id="edmsNum" 			name="edmsNum"/>
		    <input type="hidden" id="edmsStatus" 		name="edmsStatus"/>
		    <input type="hidden" id="addDay" 			name="addDay"/>
		    <input type="hidden" id="editDay" 			name="editDay"/>
		    <input type="hidden" id="iphangDay" 		name="iphangDay"/>
		   	<input type="hidden" id="banipDay" 			name="banipDay"/>
		   	<input type="hidden" id="singoDay" 			name="singoDay"/>
		   	<input type="hidden" id="suriDay" 			name="suriDay"/>
		   	<input type="hidden" id="banchulDay" 		name="banchulDay"/>
		    <input type="hidden" id="teamCode" 			name="teamCode"/>
		    <input type="hidden" id="edmsComNum" 		name="edmsComNum"/>
		    <input type="hidden" id="edmsComKey" 		name="edmsComKey"/>
		    <input type="hidden" id="jisaCode" 			name="jisaCode"/>
		    <input type="hidden" id="edmsComCode" 		name="edmsComCode"/>
		    <input type="hidden" id="edmsComName" 		name="edmsComName"/>
		    <input type="hidden" id="edmsManagementNum" name="edmsManagementNum"/>
		    <input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
		    <input type="hidden" id="singoNum" 			name="singoNum"/>
		    <input type="hidden" id="divisionSingoYn" 	name="divisionSingoYn"/>
		    <input type="hidden" id="useYn" 			name="useYn" 			value="Y"/>
		    <input type="hidden" id="addUserName" 		name="addUserName"		value="${sessionScope.USERNAME}"/>
		    <input type="hidden" id="editUserName" 		name="editUserName"		value="${sessionScope.USERNAME}"/>
		   	</form>
		    <form id="frm3" name="frm3">
		  	<input type="hidden" id="sessionId" 			name="sessionId" 		value="${sessionScope.USERID}"/>
		  	<input type="hidden" id="USERGRADE" 			name="USERGRADE"		value="${sessionScope.USERGRADE}">
		   	<input type="hidden" id="addDay" 				name="addDay"/>
		   	<input type="hidden" id="editDay" 				name="editDay"/>
		   	<input type="hidden" id="yyyymmdd" 				name="yyyymmdd"/>
		   	<input type="hidden" id="edmsStatus" 			name="edmsStatus" 		value="0"/>
		   	<input type="hidden" id="useYn" 				name="useYn" 			value="Y"/>
		   	<input type="hidden" id="addUserName" 			name="addUserName"		value="${sessionScope.USERNAME}"/>
		   	<input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
		   	<input type="hidden" id="edmsSearchKeyword" 	name="edmsSearchKeyword"/>
		   	<div style="margin-top:5px;margin-bottom:5px;">
		  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_detailSave();">구분 저장</button>
		  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_detailSingoSave();">신고번호별 개별 저장</button>
		  		<button id="downBtn" type="button" class="btn btn-warning btn-xs" onclick="fn_allDown();"><font color="black">일괄다운</font></button>
		  		<button id="downBtn1" type="button" class="btn btn-warning btn-xs" onclick="fn_mailAction();"><font color="black">메일전송</font></button>
		  		<!-- button type="button" class="btn btn-primary btn-xs" onclick="fn_allView();">일괄열기</button>
		  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_allDown();">일괄다운</button-->
		    </div>
		    <div class="panel panel-primary">
	            <div class="panel-heading">
	              	파일 리스트
	            </div>
	            <div class="panel-body well-sm" id='parentDiv1'>
	              <table id="fileGrid"></table>
				  <div id="filePager"></div>
	            </div>
	        </div>
		   	</form>
        </div>
      </td>
    </tr>
  </table>
  </body>
</html>