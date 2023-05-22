<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/edmsSetting.js'/>"></script>
  </head>
  <body onload="<c:if test='${!empty resultMsg}'>alert('${resultMsg}');</c:if>" oncontextmenu="return false">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <div class="easyui-layout" style="width:100%;height:780px;">
		        <div data-options="region:'center'" style="width:100%;padding:10px;box-sizing:border-box;border:0px;">
		          <div id="p" class="easyui-panel" title="사용자정보 수정" style="width:100%;height:100%;padding:10px;">
		            <form id="updateForm" name="updateForm" method="post">
					<input type="hidden" id="userGradeA" 	name="userGradeA" 	value="${sessionScope.USERGRADE}"/>
					<input type="hidden" id="userGradeB" 	name="userGradeB" 	value="${sessionScope.USERGRADEB}"/>
					<input type="hidden" id="userSangho"	name="userSangho"/>
					<input type="hidden" id="userSaup"		name="userSaup"/>
					<input type="hidden" id="userPhone"		name="userPhone"/>
					<input type="hidden" id="userMobile"	name="userMobile"/>
					<input type="hidden" id="userFax"		name="userFax"/>
					<input type="hidden" id="userDepart"	name="userDepart"/>
					<input type="hidden" id="userJikchk"	name="userJikchk"/>
					<input type="hidden" id="userAppYN" 	name="userAppYN" 	value="Y"/>
					<input type="hidden" id="userAppDtm" 	name="userAppDtm"/>
					<input type="hidden" id="userAppUser" 	name="userAppUser"/>
					<input type="hidden" id="userLogo"		name="userLogo"/>
					<input type="hidden" id="defaultDB"		name="defaultDB"/>
					<input type="hidden" id="userNote"		name="userNote"/>
					<input type="hidden" id="setSangho"		name="setSangho"/>
					<input type="hidden" id="setSaup"		name="setSaup"/>
					<input type="hidden" id="setMenu"		name="setMenu"/>
					<input type="hidden" id="apiKey"		name="apiKey"/>
					<input type="hidden" id="useYn" 		name="useYn"		value="Y"/>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">ID <font color="red">*</font> :</span>
            		  <input id="userId" name="userId" style="width:200px;height:23px" value="${sessionScope.USERID}" readonly>
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">PW <font color="red">*</font> :</span>
            		  <input type="password" id="userPw" name="userPw" style="width:200px;height:23px">
        			  <font style="font-size:8pt; color:red;">4자리 이상</font>
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">PW 확인 <font color="red">*</font> :</span>
            		  <input type="password" id="userPw1" name="userPw1" style="width:200px;height:23px">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">이름 <font color="red">*</font> :</span>
            		  <input id="userName" name="userName" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">이메일 <font color="red">*</font> :</span>
            		  <input id="userEmail" name="userEmail" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div>
            		  <a href="javascript:fn_updateAction();" class="easyui-linkbutton" style="width:290px;height:32px">수정</a>
        			</div>
					</form>
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