<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_title.jsp"></jsp:include>
	<title>수동 저장</title>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/edms/detailMasterEx.js'/>"></script>
  </head>
  <body>
	<div id="page-wrapper" style="margin-top:5px;">
	  <div class="row">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                           수동 저장
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" onclick="fn_insertAction()">저장</button>
                <button type="button" class="btn btn-default btn-xs" onclick="winClose()">닫기</button>
              </div>
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <div class="well well-sm text-center" id="saveTxt" style="display:none">
                <font color="red">수리된 건은 수정하실 수 없습니다.</font>
              </div>
              <form id="notForm" name="notForm">
			  <input type="hidden" id="edmsKey" 			name="edmsKey" value="${param.edmsKey}"/>
			  <input type="hidden" id="edmsGubun" 			name="edmsGubun"/>
			  <input type="hidden" id="edmsManagementNum" 	name="edmsManagementNum"/>
			  <input type="hidden" id="divisionSingoYn" 	name="divisionSingoYn"/>
			  <input type="hidden" id="iphangDay" 			name="iphangDay"/>
			  <input type="hidden" id="banipDay" 			name="banipDay"/>
			  <input type="hidden" id="banchulDay" 			name="banchulDay"/>
			  <input type="hidden" id="addDay" 				name="addDay"/>
			  <input type="hidden" id="editDay" 			name="editDay"/>
			  <input type="hidden" id="useYn" 				name="useYn" value="Y"/>
			  <input type="hidden" id="addUserName" 		name="addUserName"/>
			  <input type="hidden" id="editUserName" 		name="editUserName" value="${sessionScope.USERNAME}"/>
			  <input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
			  <table class="table table-striped table-bordered">
			    <tbody>
				<col width="20%" />
				<col width="80%" />
		      	<tr>
		     	  <td class="info">업체선택</td>
		     	  <td>
		     	  	<select id="teamCode" name="teamCode" class="input-sm" style="width:80px;" onchange="ChangeTeam(this)"></select>
		     	  	<input type="hidden" 	id="utTeamCode" 	name="utTeamCode"/>
		     	  	<input type="hidden" 	id="utTeamSeq" 		name="utTeamSeq"/>
		     	  	<input type="hidden" 	id="utTeamName" 	name="utTeamName"/>
		     	  	<input type="hidden" 	id="utcUseYn" 		name="utcUseYn" value="Y"/>
		     	  	<input type="hidden" 	id="edmsComNum" 	name="edmsComNum"/>
		     	  	<input type="hidden" 	id="edmsComKey" 	name="edmsComKey"/>
		     	  	<input type="hidden" 	id="jisaCode" 		name="jisaCode"/>
		     	  	<input type="text" 		id="edmsComCode" 	name="edmsComCode" class="input-sm" style="width:40px;" readOnly/>
		  	  	  	<input type="text" 		id="edmsComName" 	name="edmsComName" class="input-sm" style="width:100px;" readOnly/>
		  	  	  	<a onclick="javascript:fn_searchTaxpayer()" style="cursor:pointer"><img src="../images/common/btn_search.gif"></a>
		     	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info">Inv</td>
		      	  <td>
		      	  	<input type="text" id="edmsNum" name="edmsNum" class="input-sm" readOnly/>
		      	  </td>
		      	</tr>
		      	<tr>
		     	  <td class="info">처리현황</td>
		     	  <td>
		  	  	  	<select id="edmsStatus" name="edmsStatus" class="input-sm" style="width:60px;"></select>
		     	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info">신고번호</td>
		      	  <td>
		      	  	<input type="text" id="singoNum" name="singoNum" class="input-sm"/>
		      	  </td>
		      	</tr>
		      	<tr>
		     	  <td class="info">신고일</td>
		     	  <td>
		  	  	 	<input type="text" id="singoDay" name="singoDay" class="input-sm" maxlength="8" onkeydown="return showKeyCode(event)"/>
		     	  </td>
		      	</tr>
		      	<tr>
		     	  <td class="info">수리일</td>
		     	  <td>
		  	  	  	<input type="text" id="suriDay" name="suriDay" class="input-sm" maxlength="8" onkeydown="return showKeyCode(event)"/>
		     	  </td>
		      	</tr>
		      	</tbody>
		 	  </table>
			  </form>
            </div>
          </div>
        </div>
      </div>
	</div>
  </body>
</html>