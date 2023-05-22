<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
    <style>
	body{
		margin-right:0px;
		margin-left:0px;
		margin-top:0px;
		height:30px;
		padding:0px;
	}
	</style>
	<style type="text/css">
	*{
		margin:0;
		padding:0;
		list-style-type:none;
	}
	#container{
		margin:0px auto;
	}
	ul.menu0 li{
		float:left;
		width:150px;
		height:30px;
		cursor:pointer;
		position:relative;
		margin-top:5px;
		margin-left:10px;
	}
	ul.menu3{
		float:right;
		width:140px;
		height:30px;
		position:relative;
		line-height:30px;
		text-align:center;
		font-weight:bold;
		font-size:12px;
		font-family:verdana, "Nanum Gothic", nanumgothic;
		color:#ffffff;
		text-decoration:none;
		margin-right:10px;
	}
	ul.menu4{
		float:right;
		width:500px;
		height:30px;
		position:relative;
		line-height:30px;
		text-align:center;
		font-weight:bold;
		font-size:10px;
		font-family:verdana, "Nanum Gothic", nanumgothic;
		color:#eeeeee;
		cursor:pointer;
		text-decoration:none;
		margin-right:10px;
	}
	</style>
	<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/edmsTop.js'/>"></script>
	<script>
	function View0(){
		parent.main.document.location.href="./edmsMasterList.sein";
	}

	function View1(){
		parent.main.document.location.href="./edmsSetting.sein";
	}

	function View2(){
		parent.main.document.location.href="./edmsNotice.sein";
	}

	function Logout(){
		parent.document.location.href="./edmsLogout.sein";
	}
	</script>
  </head>
  <body bgcolor="#2763ba">
    <div id="container">
      <input type="hidden" id="userKey"  name="userKey"  value="${sessionScope.ID}">
	  <ul class="menu0">
	    <li><a onclick="View0()"><img src="../images/common/edmsTitle.gif"></a></li>
	  </ul>
	  <ul class="menu4">|<font color="yellow"><span id="timer"></span></font><a onclick="refreshTimer();"><font color="yellow">[연장]</font></a> | <a onclick="View0()"><font color="white">Home</font></a> | <a onclick="View3()"><font color="white">SOP</font></a> | <a onclick="View4()"><font color="white">현장</font></a> | <a onclick="View5()"><font color="white">수입통계</font></a> | <a onclick="View6()"><font color="white">수출통계</font></a> | <a onclick="View2()"><font color="white">Notice</font></a> | <a onclick="View1()"><font color="white">Setting</font></a> | <a onclick="Logout()"><font color="white">Logout</font></a> |</ul>
	  <ul class="menu3"><font color="white">${sessionScope.USERNAME} 님 </font></ul>
	</div>
  </body>
</html>