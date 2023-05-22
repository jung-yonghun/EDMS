<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="shortcut icon" href="<c:url value='/images/common/cpsicon.ico'/>"/>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/bizbox.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row">
        <div class="col-md-12" id="msgView" style="display:none">
	      <div style="margin-top:5px;margin-bottom:5px;text-align:right;width:500px">
		  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_insertAction()">보내기</button>
		  </div>
		  <form id="insertForm" name="insertForm">
		  <input type="hidden" id="_id" 		name="_id"/>
		  <input type="hidden" id="_apiKey" 	name="_apiKey"/>
		  <input type="hidden" id="key" 		name="key"     		value="${param.key}"/>
		  <input type="hidden" id="defaultDB" 	name="defaultDB"   	value="${param.jisa}"/>
		  <input type="hidden" id="gubun" 		name="gubun"   		value="${param.gubun}"/>
		  <input type="hidden" id="singoNo" 	name="singoNo" 		value="${param.singoNo}"/>
		  <input type="hidden" id="option" 		name="option" 		value="${param.option}"/>
		  <table class="table table-striped table-bordered" style="width:500px">
	   	    <col width="20%" />
		  	<col width="80%" />
		  	<tr>
	      	  <td class="warning text-center">보낸사람</td>
	      	  <td>
	  	  	  	<input id="sSndrLogonCD" name="sSndrLogonCD" type="text" value="${param.sender}" class="input-sm" style="width:300px;" readOnly>
	      	  </td>
	      	</tr>
		  	<tr>
	      	  <td class="warning text-center">받는사람</td>
	      	  <td>
	  	  	  	<input id="sRecvLogonCDs" name="sRecvLogonCDs" type="text" value="${param.receiver}" class="input-sm" style="width:300px;">
	  	  	  	<button type="button" class="btn btn-primary btn-xs" style="margin-top:-3px;" onclick="fn_searchAction()">찾기</button>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">내용</td>
	      	  <td>
	      	  	<textarea type="text" id="sMsgContent" name="sMsgContent" class="input-sm" style="width:100%;height:200px;ime-mode:active;">${param.content}</textarea>
	      	  </td>
	      	</tr>
	 	  </table>
	 	  </form>
        </div>
      </div>
	</div>
  </body>
</html>