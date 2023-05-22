<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
  <head>
	<title>선적서류 관리시스템</title>
  </head>
  <frameset rows="30,*" frameborder="0" framespacing="0">
    <frame name="topframe" src="./edmsTop.sein" scrolling="no" border="0" noresize>
  	<frameset name="sframe" cols="0,0,0,*" frameborder="0" framespacing="0">
  	  <frame name="main" 	src="./edmsMasterList.sein" 	scrolling="no" border="0" noresize>
  	  <frame name="setting" src="./edmsSetting.sein" 	scrolling="no" border="0" noresize>
  	  <!-- frame name="delivery" src="./edmsDownList.sein" 	scrolling="no" border="0" noresize-->
  	  <frame name="delivery" src="./deliveryList.sein" 	scrolling="no" border="0" noresize>
  	  <frame name="notice" src="./edmsNotice.sein" 	scrolling="no" border="0" noresize>
  	</frameset>
  </frameset>
</html>