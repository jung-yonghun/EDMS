<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<title>현장의뢰</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/fieldInsert.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row">
        <div class="col-md-12">
	      <div style="margin-top:10px;"></div>
		  <form id="insertForm" name="insertForm">
		  <input type="hidden" id="key" 			name="key"     		value="${param.key}"/>
		  <input type="hidden" id="defaultDB" 		name="defaultDB"   	value="${param._defaultDB}"/>
		  <input type="hidden" id="gubun" 			name="gubun"   		value="${param.gubun}"/>
		  <input type="hidden" id="singoNo" 		name="singoNo" 		value="${param.singoNo}"/>
		  <input type="hidden" id="blInvNo" 		name="blInvNo" 		value="${param.blInvNo}"/>
		  <input type="hidden" id="sSndrLogonCD" 	name="sSndrLogonCD" value="${param.USERID}"/>
		  <input type="hidden" id="ready" 			name="ready" 		value="${param.ready}"/>
		  <input type="hidden" id="_id" 			name="_id"/>
		  <input type="hidden" id="_userNm" 		name="_userNm"/>
		  <input type="hidden" id="_userDepart" 	name="_userDepart"/>
		  <input type="hidden" id="_apiKey" 		name="_apiKey"/>
		  <input type="hidden" id="company" 		name="company"/>
		  <input type="hidden" id="gumYn" 			name="gumYn"/>
		  <input type="hidden" id="jangchi" 		name="jangchi"/>
		  <input type="hidden" id="jangchibuho" 	name="jangchibuho"/>
		  <input type="hidden" id="gwanUser" 		name="gwanUser"/>
		  <input type="hidden" id="regDate" 		name="regDate"/>
		  <input type="hidden" id="segwan" 		    name="segwan"/>
		  <input type="hidden" id="Impo_napse_code" name="Impo_napse_code"/>
		  <input type="hidden" id="Impo_napse_saup" name="Impo_napse_saup"/>
		  <table class="table table-striped table-bordered">
	   	    <col width="20%" />
		  	<col width="80%" />
		  	<tr>
	      	  <td class="warning text-center">받는사람</td>
	      	  <td>
	      	  	<select id="sRecvLogon" name="sRecvLogon" style="width:80px;" onchange="ChangeGubun()">
	  	  	  	  <option value="공항현장">공항(현장)</option>
	  	  	  	  <option value="인천항">인천항</option>
	  	  	  	  <option value="부산항">부산항</option>
	  	  	  	  <option value="경기지사">경기지사</option>
	  	  	  	</select>
	  	  	  	<input id="sRecvLogonCDs" name="sRecvLogonCDs" type="hidden" class="input-sm" style="width:130px;">
	  	  	  	<input id="person" name="person" type="text" value="이경철,박상혁" class="input-sm" style="width:130px;" readOnly>
	  	  	  	<button type="button" class="btn btn-primary btn-xs" style="margin-top:-3px;" onclick="fn_insertAction()">보내기</button>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">구분</td>
	      	  <td>
	      	  	<select id="fieldNote1" name="fieldNote1" style="width:100px;">
	  	  	  	  <option value="">=선택=</option>
	  	  	  	  <option value="서류">서류제출</option>
	  	  	  	  <option value="검사">검사</option>
	  	  	  	  <option value="정정">정정</option>
	  	  	  	</select>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">내용</td>
	      	  <td>
	      	  	<textarea type="text" id="sMsgContent" name="sMsgContent" class="input-sm" style="width:100%;height:170px;ime-mode:active;"></textarea>
	      	  </td>
	      	</tr>
	 	  </table>
	 	  </form>
        </div>
      </div>
	</div>
  </body>
</html>