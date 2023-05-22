<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
  <head>
	<title>선적서류 관리시스템</title>
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

		 	var win = window.open('./edmsLogin.sein', 'edmsPop', 'width=310, height=320, scrollbars=no, location=no, menubar=no, toolbar=no, resizable=no, directories=no, status=no, top='+top+', left='+left);
		 	win.focus();

		 	window.opener = 'self';
		 	window.open('','_parent','');
		 	window.close();
	 	}
	</script>
  </head>
  <body></body>
</html>