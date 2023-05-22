<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<title>도착지 저장</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryCarryingInInsert.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
      <div class="row" style="margin-top:5px">
        <div class="col-md-12">
		  <div class="pull-right" style="margin-top:5px">
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_saveAction('insert')">저장</button>
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_saveAction('delete')">삭제</button>
            <button type="button" class="btn btn-primary btn-xs" onclick="fn_backAction();">뒤로</button>
          </div>
	  	</div>
	  </div>
	  <div class="row" style="margin-top:5px">
		<div class="col-md-12">
	      <div class="panel panel-primary">
            <div class="panel-heading">
              <i class="fa fa-list-alt"></i> 도착지 저장
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <form id="frm1" name="frm1">
              <input type="hidden" id="Ctype" 					name="Ctype" 					value="${param.Ctype}"/>
              <input type="hidden" id="SDAB120Key" 				name="SDAB120Key" 				value="${param.SDAB120Key}"/>
              <input type="hidden" id="useYn" 					name="useYn" 					value="Y"/>
              <input type="hidden" id="size" 					name="size" 					value="100000" />
		  	  <input type="hidden" id="page" 					name="page" 					value="0" />
		  	  <input type="hidden" id="_pageRow" 				name="_pageRow" 				value="100000" />
		  	  <input type="hidden" id="_pageNumber" 			name="_pageNumber" 				value="0" />
		  	  <input type="hidden" id="deliveryCarryingInFax" 	name="deliveryCarryingInFax" 	value="0" />
              <table class="table table-striped table-bordered">
			  	<col width="20%" />
			  	<col width="80%" />
				<tr>
				  <td class="info text-center"><font color="red">*</font> 착지명</td>
				  <td><input type="text" id="deliveryCarryingInNm" name="deliveryCarryingInNm" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center"><font color="red">*</font> 사업자번호</td>
				  <td><input type="text" id="deliveryCarryingInTaxNum" name="deliveryCarryingInTaxNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center"><font color="red">*</font> 담당자</td>
				  <td><input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center">담당자 연락처</td>
				  <td><input type="text" id="deliveryCarryingInPhone" name="deliveryCarryingInPhone" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center">담당자 휴대폰</td>
				  <td><input type="text" id="deliveryCarryingInMobile" name="deliveryCarryingInMobile" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center">담당자 이메일</td>
				  <td><input type="text" id="deliveryCarryingInEmail" name="deliveryCarryingInEmail" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
				<tr>
				  <td class="info text-center"><font color="red">*</font> 착지 주소</td>
				  <td><input type="text" id="deliveryCarryingInAddr" name="deliveryCarryingInAddr" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
				</tr>
			  </table>
			  </form>
            </div>
          </div>
        </div>
      </div>
	</div>
  </body>
</html>