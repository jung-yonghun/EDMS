<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>업체선택</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/searchTaxpayer.js'/>"></script>
  </head>
  <body onload="frm1.utcTradeName.focus()">
    <div id="page-wrapper">
	  <div class="row" style="margin-top:3px">
       	<div class="col-lg-12">
	      <input type="hidden" id="searchGubun" 	name="searchGubun"	value="${param.searchGubun}"/>
	      <input type="hidden" id="utTeamCode" 	name="utTeamCode"	value="${param.utTeamCode}"/>
		  <input type="hidden" id="utTeamSeq" 	name="utTeamSeq"	value="${param.utTeamSeq}"/>
		  <input type="hidden" id="utTeamName" 	name="utTeamName"	value="${param.utTeamName}"/>
		  <input type="hidden" id="utcUseYn" 		name="utcUseYn"		value="Y"/>
		  <form id="frm1" name="frm1">
		  <input type="hidden" id="size" 	name="size" 	value="10000" />
		  <input type="hidden" id="page" 	name="page" 	value="0" />
		  <input type="hidden" id="useYn" 	name="useYn"	value="Y" />
		  <table class="table table-striped table-bordered">
		  	<col width="15%" />
		  	<col width="15%" />
		  	<col width="20%" />
		  	<col width="50%" />
		  	<tr>
			  <td class="info text-center">코드</td>
			  <td>
			    <input type="text" id="utcTradeCode" name="utcTradeCode" class="input-sm" style="width:100%;" value="${param.utcTradeCode}" onkeypress="keyDown()"/>
			  </td>
			  <td class="info text-center">업체명</td>
			  <td><input type="text" id="utcTradeName" name="utcTradeName" class="input-sm" style="width:100%;ime-mode:active;" value="${param.utcTradeName}" onkeypress="keyDown()"/></td>
		  	</tr>
		  </table>
		  </form>
	  	</div>
	  </div>
	  <div class="row" style="margin-top:3px">
       	<div class="col-lg-4">
       	  <div class="panel panel-primary">
            <div class="panel-heading">
                           업체 선택
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" onclick="fn_searchAction1()">조회</button>
                <button type="button" class="btn btn-default btn-xs" onclick="winClose()">닫기</button>
              </div>
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <table id="masterGrid"></table>
			  <div id="masterPager"></div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>