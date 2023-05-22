<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
	<title>운송이력</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/viewDeliveryStatus.js'/>"></script>
  </head>
  <body>
	  <div class="row">
	    <form id="viewForm" name="viewForm">
	      <input type="hidden" id="deliveryRequestKey" 	name="deliveryRequestKey"	value="${param.deliveryRequestKey}"/>
		  <table class="table table-striped table-bordered">
	   	    <col width="33%" />
		  	<col width="33%" />
		  	<col width="34%" />
	      	<tr>
	      	  <td class="success text-center">상태</td>
	      	  <td class="success text-center">처리자</td>
	      	  <td class="success text-center">처리일시</td>
	      	</tr>
	      	<tr>
	      	  <td class="text-center">운송의뢰</td>
	      	  <td class="text-center"><div id="requestMan"></div></td>
	      	  <td class="text-center"><div id="requestDate"></div></td>
	      	</tr>
	      	<tr>
	      	  <td class="text-center">배차요청</td>
	      	  <td class="text-center"><div id="assignMan"></div></td>
	      	  <td class="text-center"><div id="allocateRequestDate"></div></td>
	      	</tr>
	      	<tr>
	      	  <td class="text-center">배차완료</td>
	      	  <td class="text-center"><div id="deliveryCoName"></div></td>
	      	  <td class="text-center"><div id="allocateDate"></div></td>
	      	</tr>
	      	<tr>
	      	  <td class="text-center">배송중</td>
	      	  <td class="text-center"><div id="deliveryCarName"></div></td>
	      	  <td class="text-center"><div id="deliveryStartDate"></div></td>
	      	</tr>
	      	<tr>
	      	  <td class="text-center">배송완료</td>
	      	  <td class="text-center"><div id="deliveryCarEndName"></div></td>
	      	  <td class="text-center"><div id="deliveryEndDate"></div></td>
	      	</tr>
	      </table>
        </form>
	  </div>
  </body>
</html>