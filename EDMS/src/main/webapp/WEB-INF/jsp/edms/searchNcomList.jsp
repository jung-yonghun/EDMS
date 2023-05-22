<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>통관 미등록 리스트</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/searchNcomList.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row" style="margin-top:3px">
       	<div class="col-lg-12">
	      <form id="frmTab1" name="frmTab1">
		  <input type="hidden" id="_defaultDB" 		name="_defaultDB"		value="${sessionScope.DEFAULTDB}"/>
		  <input type="hidden" id="yyyymmdd" 		name="yyyymmdd"/>
	      <table class="table table-striped table-bordered">
		   	<col width="20%" />
		  	<col width="80%" />
		  	<tr>
			  <td class="info text-center">
				<select id="_dateType" name="_dateType" class="input-sm" style="width:70px;">
				  <option value="singoDay" selected>신고일</option>
				  <option value="okDay">수리일</option>
				</select>
			  </td>
			  <td>
				<input type="text" id="startDay" 	name="startDay" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8"/> ~
				<input type="text" id="endDay" 		name="endDay" 		class="input-sm" style="width:70px;text-align:center;" maxlength="8"/>
		 	  </td>
			</tr>
			<tr>
			  <td class="info text-center">
				팀선택
			  </td>
			  <td>
				<select id="teamCode" name="teamCode" class="input-sm" style="width:90px" onchange="ChangeTeam()"></select>
		 	  </td>
			</tr>
			<tr>
			  <td class="info text-center">
				사람선택
			  </td>
			  <td>
				<select id="_customsUserId" name="_customsUserId" class="input-sm" style="width:90px">
				  <option value="${sessionScope.USERID}">My</option>
				  <option value="">전체</option>
				</select>
		 	  </td>
			</tr>
			<tr>
			  <td class="info text-center">
				 H B/L No
			  </td>
			  <td>
				<input type="text" id="impoBlNo" name="impoBlNo" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/>
		 	  </td>
			</tr>
			<tr>
			  <td class="info text-center">
				신고번호
			  </td>
			  <td>
				<input type="text" id="impoSingoNo" name="impoSingoNo" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/>
		 	  </td>
			</tr>
			<tr>
			  <td class="info text-center">
				업체명
			  </td>
			  <td>
				<input type="text" id="impoNapseSangho" name="impoNapseSangho" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/>
		 	  </td>
			</tr>
		  </table>
		  </form>
		  <div style="margin-top:5px;margin-bottom:5px;">
		    <button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction();">조회</button>
		 	<button type="button" class="btn btn-success btn-xs" onclick="fn_masterAction();">동기화</button>
		  </div>
		  <div class="panel panel-primary">
            <div class="panel-heading">
              	통관 미등록 리스트
            </div>
            <div class="panel-body well-sm" id='parentDiv11'>
              <table id="tab1Grid"></table>
			  <div id="tab1Pager"></div>
            </div>
          </div>
		</div>
	  </div>
	</div>
  </body>
</html>