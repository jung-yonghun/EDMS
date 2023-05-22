<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_title.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/board/board_new.js'/>"></script>
  </head>
  <body>
	<div id="wrapper">
	  <input type="hidden" id="USERID" 	name="USERID" 	value="${sessionScope.USERID}">
	  <table style="width: 100%;">
	  	<col width="100%"/>
  	  	<tr>
	  	  <td align="center" height="250" background="<c:url value='/images/common/cpsmain.png'/>" style="background-repeat:no-repeat;background-size:2101px 250px;"></td>
  	  	</tr>
  	  	<tr>
	  	  <td align="center" height="10"></td>
  	  	</tr>
  	  	<tr>
	  	  <td valign="top" align="center">
	  	  	<div id="wrapper">
		  	  <div style="padding: 0 10px;">
		    	<table style="width:100%;">
			  	  <tr>
			  		<td style="width:20%" valign="top">
			  	      <div class='search'>
			  	  		<table style="width:100%;">
					  	  <col width="34%" />
					  	  <col width="33%" />
					  	  <col width="33%" />
				  	  	  <tr>
					  		<td colspan="3" align="center" height="40" style="background:#666666;color:#ffffff;"><b>Taxation exchange rate</b></td>
				  	  	  </tr>
				  	  	  <tr>
					  		<td colspan="3" align="right" style="background:#666666;color:#ffffff;">
					  	  	  <a onclick="fn_exchangeAction();"><font color="white">+ 더보기</font></a>
					  		</td>
				  	  	  </tr>
				  	  	  <tr>
					  		<td colspan="3" align="center" height="40">
					  	  	  <input type="hidden" id="nowdate" name="nowdate" maxlength="8"/>
					  	  	  <b>적용기간  [<b id="date_from" name="dateFrom"></b> ~ <b id="date_to" name="dateTo"></b>]</b>
					  		</td>
				  	  	  </tr>
				  	  	  <tr align="center" height="33" style="background:#3458AC;color:#ffffff;">
					  		<td><b>국가 (통화)</b></td>
					  		<td><b>수출</b></td>
					  		<td><b>수입</b></td>
				  	  	  </tr>
				  	  	  <tr height="33">
					  		<td align="center">미국 (USD)</td>
					  		<td align="right"><div id="usd_e" name="usdE"></div></td>
					  		<td align="right"><div id="usd_i" name="usdI"></div></td>
				  	  	  </tr>
				  	  	  <tr height="33" style="background:#eeeeee;">
					  		<td align="center">일본 (JPY)</td>
					  		<td align="right"><div id="jpy_e" name="jpyE"></div></td>
					  		<td align="right"><div id="jpy_i" name="jpyI"></div></td>
				  	  	  </tr>
				  	  	  <tr height="33">
					  		<td align="center">유럽연합 (EUR)</td>
					  		<td align="right"><div id="eur_e" name="eurE"></div></td>
					  		<td align="right"><div id="eur_i" name="eurI"></div></td>
				  	  	  </tr>
				  	  	  <tr height="33" style="background:#eeeeee;">
					  		<td align="center">중국 (CNY)</td>
					  		<td align="right"><div id="cny_e" name="cnyE"></div></td>
					  		<td align="right"><div id="cny_i" name="cnyI"></div></td>
				  	  	  </tr>
				  		</table>
				      </div>
				    </td>
				    <td style="width:2%"></td>
				    <td style="width:78%" valign="top">
				      <table style="width:100%;">
				        <tr>
						  <td style="width:100%" valign="top" colspan="3">
						  	<div class='search'>
				  	  		  <table style="width:100%;">
					  	  	  	<tr>
						  		  <td height="40" style="background:#e5edff;">
						  		    <b>화물진행정보 조회</b>&nbsp;&nbsp;&nbsp;M B/L - H B/L&nbsp;&nbsp;&nbsp;
						  		    <input type="text" id="mbl" name="mbl" class="wp15"/>
						  		    <input type="text" id="hbl" name="hbl" class="wp15"/>
						  		    <select id="year" name="year" style="width:60px;">
						  		      <option value="2017">2017</option>
			  	  	  				  <option value="2016">2016</option>
			  	  	  				  <option value="2015">2015</option>
			  	  	  				  <option value="2014">2014</option>
			  	  	  				  <option value="2013">2013</option>
			  	  	  				  <option value="2012">2012</option>
			  	  	  				</select>
			  	  	  				<input type="button" id="submit" name="submit" value="조회" onclick="linkBlNo()"/>
						  		  </td>
					  	  	  	</tr>
					  		  </table>
					      	</div>
					      </td>
		  	  			</tr>
		  	  			<tr>
						  <td height="25" colspan="3"></td>
		  	  			</tr>
				    	<tr>
					      <td style="width:49%" valign="top">
					  	  	<form id="frm2" name="frm2">
					  	  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
					  	  	<input type="hidden" id="category" 	name="category" value="SYS" />
					  	  	<input type="hidden" id="size" 		name="size" 	value="500" />
				  		  	<input type="hidden" id="page" 		name="page" 	value="0" />
					  	  	<input type="hidden" id="GRADE" 	name="GRADE" 	value="${sessionScope.USERGRADE}"/>
					  	  	</form>
					  	  	<table style="width: 100%;">
					  	  	  <tr>
				  	  	  	    <td>
				  	  	  	  	  <font style="font-size:14px; font-family:verdana, '맑은 고딕', 맑은 고딕; font-weight:bold; color:#282828;">■ System Notices</font>
					  	  		  <div class="trbtn" id="SYSType" name="SYSType" style="height:24px"></div>
				  	  	  	   	</td>
				  	  	  	  </tr>
				  	  	      <tr><td height="10"></td></tr>
					  	  	  <tr><td height="2" style="background:#777777;"></td></tr>
					  	  	  <tr><td height="5"></td></tr>
				  	  	  	</table>
				  	  	  	<table id="SNotice" style="width: 100%;">
				  	  	      <col width="80%"/>
						  	  <col width="20%"/>
				  	  	  	</table>
				  	  	  </td>
				  	  	  <td style="width:2%"></td>
				  	  	  <td style="width:49%" valign="top">
					  	  	<form id="frm4" name="frm4">
					  	  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
					  	  	<input type="hidden" id="category" 	name="category" value="NEWS" />
					  	  	<input type="hidden" id="size" 		name="size" 	value="500" />
				  		  	<input type="hidden" id="page" 		name="page" 	value="0" />
					  	  	</form>
				  	  	  	<table style="width: 100%;">
				  	  	  	  <tr>
				  	  	  	    <td>
				  	  	  	  	  <font style="font-size:14px; font-family:verdana, '맑은 고딕', 맑은 고딕; font-weight:bold; color:#282828;">■ News</font>
				  	  	  		  <div class="trbtn" id="NEWSType" name="NEWSType"  style="height:24px"></div>
				  	  	  	   	</td>
				  	  	  	  </tr>
				  	  	      <tr><td height="10"></td></tr>
					  	  	  <tr><td height="2" style="background:#777777;"></td></tr>
					  	  	  <tr><td height="5"></td></tr>
				  	  	  	</table>
				  	  	  	<table id="NNotice" style="width: 100%;">
				  	  	      <col width="80%"/>
						  	  <col width="20%"/>
				  	  	  	</table>
				  	  	  </td>
			  	  		</tr>
			  	  	  </table>
			  	  	</td>
				  <tr>
  	  			</table>
  			  </div>
  			</div>
  		  </td>
  		</tr>
  		<tr>
	  	  <td align="center" height="10"></td>
  	  	</tr>
  		<tr>
	  	  <td>
	  	    <div id="wrapper">
		  	  <div style="padding: 0 10px;">
		  	      <table style="width:100%;border-collapse:collapse; border-spacing:0; border:1px solid #dddddd">
		  	        <tr height="30" style="border:1px solid #dddddd;background:#eeeeee;">
	  	  	          <td align="center" style="border:1px solid #dddddd"><b>Item Master</b></td>
	  	  	          <td align="center" style="border:1px solid #dddddd"><b>Import</b></td>
	  	  	          <td align="center" style="border:1px solid #dddddd"><b>Export</b></td>
	  	  	          <td align="center" style="border:1px solid #dddddd"><b>Statistics Management</b></td>
	  	  	      	</tr>
	  	  	     	<tr height="200" style="border:1px solid #dddddd">
	  	  	          <td align="center" valign="middle" style="border:1px solid #dddddd;cursor:pointer;" onclick="window.parent.topmenu.leftView('c')"><img src="../images/common/mainimg01.gif"></td>
	  	  	          <td align="center" valign="middle" style="border:1px solid #dddddd;cursor:pointer;" onclick="window.parent.topmenu.leftView('d')"><img src="../images/common/mainimg03.gif"></td>
	  	  	          <td align="center" valign="middle" style="border:1px solid #dddddd;cursor:pointer;" onclick="window.parent.topmenu.leftView('e')"><img src="../images/common/mainimg04.gif"></td>
	  	  	          <td align="center" valign="middle" style="border:1px solid #dddddd;cursor:pointer;" onclick="window.parent.topmenu.leftView('k')"><img src="../images/common/mainimg02.gif"></td>
	  	  	      	</tr>
	  	  	  	  </table>
	  	  	  </div>
	  	  	</div>
	  	  </td>
  	  	</tr>
  	  	<tr>
	  	  <td align="center" height="10"></td>
  	  	</tr>
  	  	<tr>
		  <td align="center">
		    <font size="1" color="#777777">COPYRIGHT(c) 2016 CUSTOMSPASS.COM. ALL RIGHTS RESERVED</font>&nbsp;&nbsp;&nbsp;&nbsp;
		    <select id="site" name="site" style="width:150px;" onchange="viewSite()"></select>
		  </td>
		</tr>
  	  </table>
  	</div>
  </body>
</html>