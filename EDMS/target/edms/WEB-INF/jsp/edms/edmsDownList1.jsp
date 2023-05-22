<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/edmsDownList1.js'/>"></script>
  </head>
  <body oncontextmenu="return false">
    <table width="395px" style="margin-top:5px; margin-left:5px; margin-right:5px;">
      <tr>
      	<td width="395px" valign="top">
		<form id="frm2" name="frm2">
		<table id="searchArea" class="table table-striped table-bordered">
		  <col width="20%" />
		  <col width="80%" />
		  <tr>
			<td class="warning text-center">사업자번호</td>
			<td>
			  <input type="text" id="edmsComSaup" name="edmsComSaup" class="input-sm" style="width:100%;ime-mode:active;" onkeypress="keyDown()"/>
			</td>
		  </tr>
		</table>
		</form>
		<div style="margin-top:5px;margin-bottom:5px;">
	  		<button type="button" class="btn btn-warning btn-xs" onclick="fn_searchActionTotal();"><font color="black">조회</font></button>
	  		<button type="button" class="btn btn-primary btn-xs" onclick="fn_allDown();">일괄다운(자재코드)</button>
	    </div>
	    <div class="panel panel-primary">
            <div class="panel-heading">
              	파일 리스트
            </div>
            <div class="panel-body well-sm" id='parentDiv1'>
              <table id="fileGrid"></table>
			  <div id="filePager"></div>
            </div>
        </div>
      	</td>
      </tr>
  	</table>
  </body>
</html>