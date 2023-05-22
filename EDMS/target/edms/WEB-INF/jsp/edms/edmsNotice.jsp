<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/edmsNotice.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container" style="padding:10px">
			  <div class="easyui-layout" style="width:100%;height:775px;">
		      	<div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
			  	</div>
		        <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
				  <div class="seach_review_in" style="margin-top:0px">
				  	<div class="seach_review_tbl">
					<table>
					  <colgroup>
						<col width="15%" />
						<col width="35%" />
						<col width="15%" />
						<col width="35%" />
					  </colgroup>
				      <tbody id="bbs_title">
				        <tr>
				          <td class='left'>작성자</td><td class='taL'></td>
						  <td class='left'>작성일자</td><td></td>
						</tr>
						<tr>
						  <td class='left'>제목</td><td colspan='3' class='taL'></td>
						</tr>
					  </tbody>
					  <tbody id="bbs_title1">
						<tr>
						  <td class="left">첨부파일</td>
						  <td colspan="3" class="taL" id="bbs_file"></td>
						</tr>
					  </tbody>
					</table>
				  	</div>
				  	<div class="seach_review_txt1"></div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	<form id="frmCommon" name="frmCommon">
      <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
      <input type="hidden" id="category" 	name="category" value="NOTICE"/>
      <input type="hidden" id="size" 		name="size" 	value="100000"/>
      <input type="hidden" id="page" 		name="page" 	value="0"/>
    </form>
  </body>
</html>