<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<html>
  <head>
	<title>선적서류 관리시스템</title>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery-1.11.2.min.js'/>"></script>
	<script language="javascript">
		if(window.addEventListener){
			window.addEventListener("load", goPopup, false);
		}else if(window.attachEvent){
			window.attachEvent("onload", goPopup);
		}else{
			window.onload = goPopup;
		}

	  	function goPopup(){
		  	var scWidth 	= screen.availWidth;
		 	var scHeight 	= screen.availHeight;
		 	var top 		= parseInt(scHeight)-370;
			var left 		= parseInt(scWidth)-325;

		 	var win = window.open('./edmsPassLogin.sein?userEmail='+$('#userEmail').val(), 'edmsPop', 'width=310, height=320, scrollbars=no, location=no, menubar=no, toolbar=no, resizable=no, directories=no, status=no, top='+top+', left='+left);
		 	win.focus();

		 	window.opener = 'self';
		 	window.open('','_parent','');
		 	window.close();
	 	}
	</script>
  </head>
  <body><input type="hidden" id="userEmail"  name="userEmail"  value="${param.userEmail}"/></body>
</html>