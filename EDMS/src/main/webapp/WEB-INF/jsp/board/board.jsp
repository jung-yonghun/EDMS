<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_title.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/board/board.js'/>"></script>
  </head>
  <body>
	<div id="wrapper">
	  <div id="page-wrapper">
	    <table style="width: 100%">
		  <tr>
		  	<td style="width:40%" valign="top">
		  	  <div style="height:20px"></div>
		  	  <div class='search'>
		  	  	<table style="width: 100%;">
				  <col width="34%" />
				  <col width="33%" />
				  <col width="33%" />
			  	  <tr>
				  	<td class="dc" colspan="3" align="center" height="40"><b>Taxation exchange rate</b></td>
			  	  </tr>
			  	  <tr>
				  	<td colspan="3" align="center" height="40">
				  	  <input type="hidden" id="date" name="date" maxlength="8"/>
				  	  <b id="date_from" name="dateFrom"></b> ~ <b id="date_to" name="dateTo"></b>
				  	</td>
			  	  </tr>
			  	  <tr align="center" height="30">
				  	<td class="dc"><b>통화</b></td>
				  	<td class="dc"><b>수출</b></td>
				  	<td class="dc"><b>수입</b></td>
			  	  </tr>
			  	  <tr height="30">
				  	<td align="center">USD</td>
				  	<td align="right"><div id="usd_e" name="usdE"></div></td>
				  	<td align="right"><div id="usd_i" name="usdI"></div></td>
			  	  </tr>
			  	  <tr height="30">
				  	<td align="center">JPY</td>
				  	<td align="right"><div id="jpy_e" name="jpyE"></div></td>
				  	<td align="right"><div id="jpy_i" name="jpyI"></div></td>
			  	  </tr>
			  	  <tr height="30">
				  	<td align="center">EUR</td>
				  	<td align="right"><div id="eur_e" name="eurE"></div></td>
				  	<td align="right"><div id="eur_i" name="eurI"></div></td>
			  	  </tr>
			  	  <tr height="30">
				  	<td align="center">CNY</td>
				  	<td align="right"><div id="cny_e" name="cnyE"></div></td>
				  	<td align="right"><div id="cny_i" name="cnyI"></div></td>
			  	  </tr>
			  	</table>
			  </div>
	  		</td>
		  	<td style="width: 1%"></td>
		  	<td style="width: 59%" >
			  <div class="search mt4">
		  	  	<div class="titlearea">
				  <div class="contitle">
				  	<h2>Deadline for payment management</h2>
				  </div>
			  	</div>
			  	<div class="trbtn" id="DeadType" name="DeadType"></div>
			  	<form id="frm1" name="frm1">
			  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
			  	<input type="hidden" id="category" 	name="category" value="NEWS" />
			  	<input type="hidden" id="size" 		name="size" 	value="500" />
		  		<input type="hidden" id="page" 		name="page" 	value="0" />
			  	</form>
			  </div>
		  	  <div style="width: 100%; height: 100%; margin-top:2px;">
			  	<table style="width: 100%;">
			  	  <tr>
				  	<td>
				  	  <div id='parentDiv'>
					  	<table id="deadlineGrid"></table>
					  	<div id="deadlinePager"></div>
				  	  </div>
				  	</td>
			  	  </tr>
			  	</table>
		  	  </div>
	  		</td>
		  </tr>
	  	</table>
	  	<table style="width: 100%">
		  <tr>
		  	<td style="width:40%" valign="top">
	  		  <div class="search mt4">
			    <div class="titlearea">
				  <div class="contitle">
				  	<h2>System Notices</h2>
				  </div>
			  	</div>
			  	<div class="trbtn" id="SYSType" name="SYSType"></div>
			  	<form id="frm2" name="frm2">
			  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
			  	<input type="hidden" id="category" 	name="category" value="SYS" />
			  	<input type="hidden" id="size" 		name="size" 	value="500" />
		  		<input type="hidden" id="page" 		name="page" 	value="0" />
			  	<input type="hidden" id="GRADE" 	name="GRADE" 	value="${sessionScope.USERGRADE}"/>
			  	</form>
			  </div>
		  	  <div style="width: 100%; height: 100%; margin-top:2px;">
			  	<table style="width: 100%;">
			  	  <tr>
				  	<td>
				  	  <div id='parentDiv1'>
					  	<table id="masterGrid"></table>
					  	<div id="masterPager"></div>
				  	  </div>
				  	</td>
			  	  </tr>
			  	</table>
		  	  </div>
	  		</td>
		  	<td style="width: 1%"></td>
		  	<td style="width: 59%" >
			  <div class="search mt4">
		  	  	<div class="titlearea">
				  <div class="contitle">
				  	<h2>Pending List</h2>
				  </div>
			  	</div>
			  	<div class="trbtn" id="PendType" name="PendType"></div>
			  	<form id="frm3" name="frm3">
			  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
			  	<input type="hidden" id="category" 	name="category" value="NEWS" />
			  	<input type="hidden" id="size" 		name="size" 	value="500" />
		  		<input type="hidden" id="page" 		name="page" 	value="0" />
			  	</form>
			  </div>
		  	  <div style="width: 100%; height: 100%; margin-top:2px;">
			  	<table style="width: 100%;">
			  	  <tr>
				  	<td>
				  	  <div id='parentDiv2'>
					  	<table id="PendGrid"></table>
					  	<div id="PendPager"></div>
				  	  </div>
				  	</td>
			  	  </tr>
			  	</table>
		  	  </div>
	  		</td>
		  </tr>
	  	</table>
	  	<table style="width: 100%">
		  <tr>
		  	<td style="width:40%" valign="top">
	  		  <div class="search mt4">
		  	  	<div class="titlearea">
				  <div class="contitle">
				  	<h2>News</h2>
				  </div>
			  	</div>
			  	<div class="trbtn" id="NEWSType" name="NEWSType"></div>
			  	<form id="frm4" name="frm4">
			  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
			  	<input type="hidden" id="category" 	name="category" value="NEWS" />
			  	<input type="hidden" id="size" 		name="size" 	value="500" />
		  		<input type="hidden" id="page" 		name="page" 	value="0" />
			  	</form>
			  </div>
		  	  <div style="width: 100%; height: 100%; margin-top:2px;">
			  	<table style="width: 100%;">
			  	  <tr>
				  	<td>
				  	  <div id='parentDiv3'>
					  	<table id="newsGrid"></table>
					  	<div id="newsPager"></div>
				  	  </div>
				  	</td>
			  	  </tr>
			  	</table>
		  	  </div>
	  		</td>
		  	<td style="width: 1%"></td>
		  	<td style="width: 59%" >
			  <div class="search mt4">
		  	  	<div class="titlearea">
				  <div class="contitle">
				  	<h2>To do List</h2>
				  </div>
			  	</div>
			  	<div class="trbtn" id="DoType" name="DoType"></div>
			  	<form id="frm5" name="frm5">
			  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
			  	<input type="hidden" id="category" 	name="category" value="NEWS" />
			  	<input type="hidden" id="size" 		name="size" 	value="500" />
		  		<input type="hidden" id="page" 		name="page" 	value="0" />
			  	</form>
			  </div>
		  	  <div style="width: 100%; height: 100%; margin-top:2px;">
			  	<table style="width: 100%;">
			  	  <tr>
				  	<td>
				  	  <div id='parentDiv4'>
					  	<table id="DoGrid"></table>
					  	<div id="DoPager"></div>
				  	  </div>
				  	</td>
			  	  </tr>
			  	</table>
		  	  </div>
	  		</td>
		  </tr>
	  	</table>
	  </div>
  	</div>
  </body>
</html>