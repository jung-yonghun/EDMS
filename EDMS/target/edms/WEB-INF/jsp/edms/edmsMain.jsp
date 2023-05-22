<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/edmsMain.js'/>"></script>
	<style>
	.custom-statusbar{
		padding:2px 0px 2px 5px;
		width:300px;
	}
	.odd{
		background-color:#f9f9f9;
	}
	.even{
		background-color:#f3f3f3;
	}
	.custom-filename{
		display:inline-block;
		width:250px;
		margin:0 5px 0px 0px;
		color:#333333
		vertical-align:middle;
	}
	.ajax-file-upload{
		font-family:Arial, Helvetica, sans-serif;
		font-size:12px;
		font-weight:bold;
		padding:0px 0px 0px 0px;
		cursor:pointer;
		line-height:10px;
		height:13px;
		margin:0px 0px 0px 0px;
		display:inline-block;
		background:#fff;
		border:1px solid #e8e8e8;
		color:#888;
		text-decoration:none;
		border-radius:3px;
		-webkit-border-radius:3px;
		-moz-border-radius:3px;
		-moz-box-shadow:0 2px 0 0 #e8e8e8;
		-webkit-box-shadow:0 2px 0 0 #e8e8e8;
		box-shadow:0 2px 0 0 #e8e8e8;
		padding:6px 10px 4px 10px;
		color:#fff;
		background:#3458ac;
		border:none;
		-moz-box-shadow:0 2px 0 0 #13648d;
		-webkit-box-shadow:0 2px 0 0 #13648d;
		box-shadow:0 2px 0 0 #13648d;
		vertical-align:middle;
	}
	.ajax-upload-dragdrop{
		border:4px dotted #A5A5C7;
		width:285px;
		height:265px;
		color:#DADCE3;
		text-align:left;
		vertical-align:middle;
		padding:10px 10px 0px 10px;
	}
	</style>
  </head>
  <body oncontextmenu="return false">
  	<div style="height:29px; margin-bottom:10px; background-color:#2763ba;" align="right">
  	  <a href="javascript:fn_popupAction1();" class="easyui-linkbutton" style="margin-top:1px;margin-right:1px;margin-bottom:1px">SOP 입력</a>
  	  <a href="javascript:fn_popupAction2();" class="easyui-linkbutton" style="margin-top:1px;margin-right:1px;margin-bottom:1px">현장확인</a>
  	  <a href="javascript:fn_popupAction();" class="easyui-linkbutton" style="margin-top:1px;margin-right:1px;margin-bottom:1px">상세화면</a>
  	</div>
  	<form id="insertForm" name="insertForm">
  	<input type="hidden" id="userKey"  			name="userKey"  			value="${sessionScope.ID}">
  	<input type="hidden" id="edmsParentGubun" 	name="edmsParentGubun"		value="NOTCLASS"/>
  	<input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"		value="Z0001"/>
  	<input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"		value="A"/>
  	<input type="hidden" id="edmsJisaCode" 		name="edmsJisaCode"			value="ncustoms"/>
	<input type="hidden" id="edmsMKey" 			name="edmsMKey"				value=""/>
	<input type="hidden" id="commonYn" 			name="commonYn"				value="N"/>
  	<input type="hidden" id="edmsNum" 			name="edmsNum"				value=""/>
	<input type="hidden" id="edmsSingoNum" 		name="edmsSingoNum"			value=""/>
  	<div id="fileuploader">파일찾기</div>
  	</form>
  </body>
</html>