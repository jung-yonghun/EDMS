<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>사업자 검색</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/teamCustomSet.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row">
       	<div class="col-lg-12">
          <div class="well well-sm text-center">
           	 <strong>신규업체코드</strong>&nbsp;&nbsp;&nbsp;
           	 <input type="text" id="code" name="code" class="input-sm" style="width:60px;"/>
           	 <button type="button" class="btn btn-primary btn-xs" onclick="getNcomList()">엔컴동기화</button>
          </div>
        </div>
      </div>
      <input type="hidden" id="utcName" 	name="utcName"/>
	  <input type="hidden" id="utTeamSeq" 	name="utTeamSeq" 	value="${param.utTeamSeq}"/>
	  <input type="hidden" id="utTeamCode" 	name="utTeamCode" 	value="${param.utTeamCode}"/>
	  <input type="hidden" id="utTeamName"	name="utTeamName"	value="${param.utTeamName}"/>
	  <input type="hidden" id="utcTradeDb"	name="utcTradeDb"	value="${param.utcTradeDb}"/>
	  <input type="hidden" id="utcUseYn" 	name="utcUseYn" 	value="Y"/>
	  <input type="hidden" id="userId" 		name="userId" 		value="${sessionScope.USERID}"/>
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                           사업자 검색
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" onclick="fn_searchAction('')">조회</button>
                <button type="button" class="btn btn-default btn-xs" onclick="fn_insertAction()">등록</button>
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