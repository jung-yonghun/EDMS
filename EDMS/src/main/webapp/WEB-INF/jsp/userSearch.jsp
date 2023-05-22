<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<title>사용자검색</title>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/sein/userSearch.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container" style="padding:10px">
		      <input type="hidden" id="setUser" name="setUser" value="${param.setUser}"/>
			  <div class="easyui-layout" style="width:600px;height:400px;">
		      	<div data-options="region:'center'" style="width:440px;box-sizing:border-box;border:0px">
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
			  	</div>
		        <div data-options="region:'east',split:true" style="width:160px;box-sizing:border-box;border:0px">
		          <div class="easyui-layout" style="width:150px;height:380px;overflow:hidden;">
			        <div data-options="region:'west',split:true" style="width:40px;box-sizing:border-box;border:0px;">
			          <div id="arrowRight" style="margin-top:140px"><img src="./images/common/next_arrow.png" onclick="javascript:fn_insertAction();"></div>
			          <div id="arrowLeft" style="margin-top:10px"><img src="./images/common/prev_arrow.png" onclick="javascript:fn_deleteAction();"></div>
			        </div>
			        <div data-options="region:'center',split:true" style="width:90px;box-sizing:border-box;border:0px;overflow:hidden;">
			          <div class="normal_con01">
					  	<table id="manGrid"></table>
					  </div>
					  <div class="shipment_center_btn02">
					    <a href="javascript:fn_addAction();" class="Btn01">반영</a>
					  </div>
			        </div>
			      </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>