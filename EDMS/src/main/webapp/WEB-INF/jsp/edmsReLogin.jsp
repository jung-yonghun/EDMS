<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>EDMS</title>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edmsReLogin.js'/>"></script>
  	<style>
		body {padding:0px; margin:0px; font-style:normal; font-family:"Nanum Gothic",nanumgothic,AppleGothic,sans-serif;}
		html, body {height:100%;}
  	</style>
  </head>
  <body onload="<c:if test='${!empty param.resultMsg}'>alert('${param.resultMsg}')</c:if>" bgcolor="#2763ba" oncontextmenu="return false">
    <table style="width:100%; height:100%; border:0px">
	  <tr>
		<td align="center" valign="middle">
		  <table style="width:300px; border-padding:0px; border-spacing:0px; border:0px;">
			<tr>
			  <td style="width:300px; height:300px;" align="center" valign="middle">
				<form id="loginForm" name="loginForm" method="post">
				<input id="check"  type="hidden"  name="check"   value="0">
				<input type="hidden" name="userPage" value="edms/edmsMain.sein"/>
				<input type="hidden" id="userIp" name="userIp"/>
				<table style="width:160px; border-padding:1px; border-spacing:10px; border:1px;">
				  <tr>
					<td style="height:50px;">
					  <img src="<c:url value='/images/common/edmsTitle.gif'/>" style="width:160px;">
					</td>
				  </tr>
				  <tr>
					<td style="height:50px;">
					  <input type="text" id="userId" name="userId" class="form-control" placeholder="ID" onKeyDown="javascript:if (event.keyCode == 13) {document.loginForm.userPw.focus();}" style="width:160px; height:25px; margin-bottom:10px; font-size:13px">
					  <input type="password" id="userPw" name="userPw" class="form-control" placeholder="PASSWORD" onKeyDown="javascript:if (event.keyCode == 13) {actionLogin();}" style="width:160px; height:25px; font-size:13px">
					</td>
				  </tr>
				  <tr>
					<td align="center" style="height:50px;">
					  <a href="javascript:actionLogin();" class="easyui-linkbutton" style="width:49%;background:#cae0ff;color:#0000ff;">Login</a>
					  <a href="javascript:idpassCheck();" class="easyui-linkbutton" style="width:49%;background:#cae0ff;color:#ff0000;">ID/PW 찾기</a>
					</td>
				  </tr>
				  <tr>
					<td align="center" style="height:30px;">
					  <input type="checkbox" id="idSaveCheck" style="margin-bottom:-2px"> <font color="white">아이디 저장</font>
					</td>
				  </tr>
				  <tr>
					<td align="center" style="height:20px;">
					  <font size="2" color="#bbbbbb" onclick="javascript:chromeInstall();" style="cursor:pointer">크롬 브라우저 설치</font>
					</td>
				  </tr>
				  <tr>
					<td align="center" style="height:20px;">
					  <font size="2" color="#bbbbbb" onclick="javascript:memberJoin();" style="cursor:pointer">회원가입</font>
					</td>
				  </tr>
				</table>
				</form>
			  </td>
			</tr>
		  </table>
		</td>
	  </tr>
	</table>
	<div id="dlg" class="easyui-window" title="알림" data-options="modal:true,closed:true" style="width:170px;height:70px;padding:10px;text-align:center"></div>
  </body>
</html>