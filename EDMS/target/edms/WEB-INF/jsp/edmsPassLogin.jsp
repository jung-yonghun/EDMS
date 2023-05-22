<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>EDMS</title>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edmsPassLogin.js'/>"></script>
  	<style>
		body {padding:0px; margin:0px; font-style:normal; font-family:"Nanum Gothic",nanumgothic,AppleGothic,sans-serif;}
		html, body {height:100%;}
  	</style>
  </head>
  <body onload="<c:if test='${!empty param.resultMsg}'>alert('${param.resultMsg}')</c:if>" bgcolor="#2763ba" oncontextmenu="return false">
	<form id="loginForm" name="loginForm" method="post">
	<input id="check"  type="hidden"  name="check"   value="0">
	<input type="hidden" name="userPage" value="edms/edmsMain.sein"/>
	<input type="hidden" id="userEmail"  name="userEmail"  value="${param.userEmail}"/>
	</form>
  </body>
</html>