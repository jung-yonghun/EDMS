<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<title>업체선택</title>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/customerSearch1.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<div class="normal_Top">
			  <input type="hidden" id="_defaultDB" name="_defaultDB" value="${param._defaultDB}"/>
			  <table width="450px">
			  	<col width="100px">
                <col width="350px">
				<tr height="23px">
				  <td>업체명</td>
				  <td><input type="text" id="dealSangho" name="dealSangho" onkeypress="keyDown();" style="ime-mode:active;"/></td>
				</tr>
			  </table>
			</div>
		    <div class="easyui-layout" style="width:500px;height:320px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				</div>
				<div class="normal_con01">
				  <table id="masterGrid"></table>
				</div>
  	      	  </div>
  	      	</div>
  	      </div>
  	    </div>
	  </div>
	</div>
  </body>
</html>