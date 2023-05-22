<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<title>도착지 List</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryCarryingInList.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
      <div class="row" style="margin-top:5px">
        <div class="col-md-12">
		  <input type="hidden" id="size" 	name="size" 	value="10000" />
		  <input type="hidden" id="page" 	name="page" 	value="0" />
		  <input type="hidden" id="useYn" 	name="useYn"	value="Y" />
		  <input type="hidden" id="Ctype" 	name="Ctype" 	value="${param.Ctype}"/>
		  <table class="table table-striped table-bordered">
		  	<col width="10%" />
		  	<col width="40%" />
		  	<col width="10%" />
		  	<col width="40%" />
			<tr>
			  <td class="info text-center">착지명</td>
			  <td><input type="text" id="deliveryCarryingInNm" name="deliveryCarryingInNm" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
			  <td class="info text-center">담당자</td>
			  <td><input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
			</tr>
		  </table>
		  <div class="pull-right" style="margin-top:5px;">
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">조회</button>
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_addAction()">추가</button>
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_ModifyAction()">수정</button>
            <button type="button" class="btn btn-primary btn-xs" onclick="window.close()">닫기</button>
          </div>
	  	</div>
	  </div>
	  <div class="row" style="margin-top:5px">
		<div class="col-md-12">
	      <div class="panel panel-primary">
            <div class="panel-heading">
              <i class="fa fa-list-alt"></i> 도착지 List
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