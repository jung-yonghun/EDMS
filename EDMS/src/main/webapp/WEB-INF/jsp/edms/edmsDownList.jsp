<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/edmsDownList.js'/>"></script>
  </head>
  <body oncontextmenu="return false">
    <table width="395px" style="margin-top:5px; margin-left:5px; margin-right:5px;">
      <tr>
      	<td width="395px" valign="top">
		<form id="frm2" name="frm2">
		<input type="hidden" id="size" 				name="size" 			value="10000" />
		<input type="hidden" id="page" 				name="page" 			value="0" />
		<input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
		<input type="hidden" id="sessionId" 		name="sessionId" 		value="${sessionScope.USERID}">
		<input type="hidden" id="edmsMasterUserId" 	name="edmsMasterUserId" value="${sessionScope.USERID}">
		<input type="hidden" id="useYn" 			name="useYn" 			value="Y">
		<input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
		<table id="searchArea" class="table table-striped table-bordered">
		  <col width="20%" />
		  <col width="80%" />
		  <tr>
			<td class="warning text-center">
			  <select id="_DateType" name="_DateType" class="input-sm" style="width:60px;">
			    <option value="addDay">등록일</option>
			  </select>
			</td>
			<td>
			  <input type="text" id="strFromDate" 	name="strFromDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8"/> ~
			  <input type="text" id="strToDate" 	name="strToDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8"/>
			  <img src="../images/common/ico_left.gif" onclick="fn_prevdayEdms()"><img src="../images/common/today.gif" onclick="fn_todayEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextdayEdms()">
			  <img src="../images/common/ico_left.gif" onclick="fn_prevweekEdms()"><img src="../images/common/week.gif" onclick="fn_weekEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextweekEdms()">
			  <img src="../images/common/ico_left.gif" onclick="fn_prevmonthEdms()"><img src="../images/common/month.gif" onclick="fn_monthEdms()"><img src="../images/common/ico_right.gif" onclick="fn_nextmonthEdms()">
			</td>
		  </tr>
		  <tr>
		  	<td class="warning text-center">범위</td>
			<td>
			  <select id="gubunType" name="gubunType" class="input-sm" style="width:60px;" onchange="ChangeTypefrm2(this)">
			    <option value="my">MY</option>
			 	<option value="team">팀</option>
				<option value="jisa">지사</option>
			  </select>
			  <select id="teamCode" name="teamCode" class="input-sm" style="width:80px;" onchange="ChangeType2frm2(this)"></select>
			  <select id="jisaCode" name="jisaCode" class="input-sm" style="width:80px;"></select>
			</td>
		  </tr>
		  <tr>
	     	<td class="warning text-center">업무선택</td>
	     	<td>
	  	  	  <select id="edmsGubun" name="edmsGubun" class="input-sm" style="width:60px;" onchange="ChangeGubunfrm2()">
	  	  	  	<option value="IMPORT">수입</option>
	  	  	  	<option value="EXPORT">수출</option>
	  	  	  </select>
	     	</td>
	      </tr>
	      <tr>
	      	<td class="warning text-center">H B/L (Inv)</td>
	      	<td>
	      	  <input type="text" id="edmsNum" name="edmsNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/>
	      	</td>
	      </tr>
	      <tr>
			<td class="warning text-center">신고번호</td>
			<td>
			  <input type="text" id="singoNum" name="singoNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/>
			</td>
		  </tr>
	      <tr>
	      	<td class="warning text-center">업체코드</td>
	      	<td>
	      	  <input type="text" id="edmsComCode" name="edmsComCode" class="input-sm" style="width:100%;" onkeypress="keyDown()"/>
	      	</td>
	      </tr>
		  <tr>
			<td class="warning text-center">업체명</td>
			<td>
			  <input type="text" id="edmsComName" name="edmsComName" class="input-sm" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
			</td>
		  </tr>
		  <tr>
			<td class="warning text-center">문서구분</td>
			<td>
			  <select id="edmsFileCategory" name="edmsFileCategory" class="input-sm" style="width:80px;"></select>
			</td>
		  </tr>
		</table>
		</form>
		<div style="margin-top:5px;margin-bottom:5px;">
	  		<button type="button" class="btn btn-warning btn-xs" onclick="fn_searchActionTotal();"><font color="black">조회</font></button>
	  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_allDown();">일괄다운(singo)</button>
	  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_allDown1();">일괄다운(bl)</button>
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
      	</td>
      </tr>
  	</table>
  </body>
</html>