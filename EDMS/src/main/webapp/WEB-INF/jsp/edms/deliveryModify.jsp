<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<title>운송의뢰</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryModify.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row">
        <div class="col-md-12">
	      <div style="margin-top:5px;margin-bottom:5px;">
		  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_insertAction()">운송의뢰 수정</button>
		  </div>
		  <form id="insertForm" name="insertForm">
		    <input type="hidden" id="singoNo" 			name="singoNo"				value="${param.singoNo}"/>
		    <input type="hidden" id="deliveryRequestKey" name="deliveryRequestKey"/>
			<input type="hidden" id="customerKey" name="customerKey"/>
			<input type="hidden" id="customerDb" name="customerDb"/>
			<input type="hidden" id="customerCode" name="customerCode"/>
			<input type="hidden" id="customerName" name="customerName"/>
			<input type="hidden" id="customerTaxNum" name="customerTaxNum"/>
			<input type="hidden" id="mblNo" name="mblNo"/>
			<input type="hidden" id="hblNo" name="hblNo"/>
			<input type="hidden" id="cargoNo" name="cargoNo"/>
			<input type="hidden" id="singoDate" name="singoDate"/>
			<input type="hidden" id="suirDate" name="suirDate"/>
			<input type="hidden" id="cargoStatus" name="cargoStatus"/>
			<input type="hidden" id="pojangSu" name="pojangSu"/>
			<input type="hidden" id="pojangDanwi" name="pojangDanwi"/>
			<input type="hidden" id="totalJung" name="totalJung"/>
			<input type="hidden" id="jungDanwi" name="jungDanwi"/>
			<input type="hidden" id="deliveryStatus" name="deliveryStatus"/>
			<input type="hidden" id="requestCoName" name="requestCoName"/>
			<input type="hidden" id="requestMan" name="requestMan"/>
			<input type="hidden" id="requestPhone" name="requestPhone"/>
			<input type="hidden" id="requestDate" name="requestDate"/>
			<input type="hidden" id="requestNote" name="requestNote"/>
			<input type="hidden" id="deliveryDate" name="deliveryDate"/>
			<input type="hidden" id="assignId" name="assignId"/>
			<input type="hidden" id="allocateRequestDate" name="allocateRequestDate"/>
			<input type="hidden" id="deliveryCoKey" name="deliveryCoKey"/>
			<input type="hidden" id="deliveryCoName" name="deliveryCoName"/>
			<input type="hidden" id="deliveryCoPhone" name="deliveryCoPhone"/>
			<input type="hidden" id="deliveryCarryingInTaxNum" name="deliveryCarryingInTaxNum"/>
			<input type="hidden" id="deliveryCarryingInFax" name="deliveryCarryingInFax"/>
			<input type="hidden" id="allocateDate" name="allocateDate"/>
			<input type="hidden" id="deliveryCarKey" name="deliveryCarKey"/>
			<input type="hidden" id="deliveryCarName" name="deliveryCarName"/>
			<input type="hidden" id="deliveryCarPhone" name="deliveryCarPhone"/>
			<input type="hidden" id="deliveryCarNum" name="deliveryCarNum"/>
			<input type="hidden" id="deliveryStartDate" name="deliveryStartDate"/>
			<input type="hidden" id="deliveryEndDate" name="deliveryEndDate"/>
			<input type="hidden" id="damage" name="damage"/>
			<input type="hidden" id="damageDetail" name="damageDetail"/>
			<input type="hidden" id="useYn" name="useYn"/>
		  <table class="table table-striped table-bordered">
	   	    <col width="20%" />
		  	<col width="25%" />
		  	<col width="20%" />
		  	<col width="35%" />
	      	<tr>
	      	  <td class="success text-center">요청업체</td>
	      	  <td colspan="3">
	      	  	<input type="text" id="assignCom" name="assignCom" class="input-sm" style="width:100%;" value="세인TNL" readOnly/>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="success text-center">접수자</td>
	      	  <td>
	      	    <select id="assignMan" name="assignMan" class="input-sm" style="width:100px" onchange="fn_changeMan(this)">
			      <option value="김현정">김현정</option>
			      <option value="안근용">안근용</option>
				</select>
	      	  </td>
	      	  <td class="success text-center">연락처</td>
	      	  <td>
	      	  	<input type="text" id="assignPhone" name="assignPhone" class="input-sm" style="width:100%;" value="070-4353-1764" readOnly/>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">반입일</td>
	      	  <td>
	      	  	<input type="text" id="impoBanipDate" name="impoBanipDate" class="input-sm" style="width:100%;" readOnly/>
	      	  </td>
	      	  <td class="info text-center">세관</td>
	     	  <td>
	     	  	<input type="text" id="impoSegwan" name="impoSegwan" class="input-sm" style="width:50px;" readOnly/>
	     	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">장치부호</td>
	      	  <td>
	      	  	<input type="text" id="impoJangchBuho" name="impoJangchBuho" class="input-sm" style="width:80px;" readOnly/>
	      	  </td>
	      	  <td class="info text-center">장치장소</td>
	     	  <td>
	     	  	<input type="text" id="impoJangchJangso" name="impoJangchJangso" class="input-sm" style="width:100%;" readOnly/>
	     	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">장치장명</td>
	      	  <td colspan="3">
	      	    <input type="text" id="impoJangchName" name="impoJangchName" class="input-sm" style="width:90%;" readOnly/>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">착지상호</td>
	      	  <td colspan="3">
	      	    <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" class="input-sm"/>
	      	    <input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" class="input-sm" style="width:90%;" readOnly/>
	      	  	<a onclick="javascript:fn_carryingIn()" style="cursor:pointer"><img src="../images/common/btn_search.gif" style="margin-bottom:2px"></a>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">담당자</td>
	      	  <td>
	      	  	<input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" class="input-sm" style="width:100%;" readOnly/>
	      	  </td>
	      	  <td class="warning text-center">휴대번호</td>
	     	  <td>
	     	  	<input type="text" id="deliveryCarryingInMobile" name="deliveryCarryingInMobile" class="input-sm" style="width:100%;" readOnly/>
	     	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">전화번호</td>
	      	  <td>
	      	  	<input type="text" id="deliveryCarryingInPhone" name="deliveryCarryingInPhone" class="input-sm" style="width:100%;" readOnly/>
	      	  </td>
	      	  <td class="warning text-center">이메일</td>
	      	  <td>
	      	  	<input type="text" id="deliveryCarryingInEmail" name="deliveryCarryingInEmail" class="input-sm" style="width:100%;" readOnly/>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">주소</td>
	      	  <td colspan="3">
	      	  	<textarea type="text" id="deliveryCarryingInAddr" name="deliveryCarryingInAddr" class="input-sm" style="width:100%;" readOnly></textarea>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">의뢰수량</td>
	      	  <td>
	      	  	<input type="text" id="deliveryPojangSu" name="deliveryPojangSu" class="input-sm" style="width:50px;text-align:right"  onkeydown="return fn_onlyNumber(event)"/>
	      	  </td>
	      	  <td class="info text-center">의뢰중량</td>
	     	  <td>
	     	  	<input type="text" id="deliveryJung" name="deliveryJung" class="input-sm" style="width:50px;text-align:right"  onkeydown="return fn_onlyNumber(event)"/>
	     	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">사이즈</td>
	      	  <td>
	      	  	<select id="cargoSize" name="cargoSize" class="input-sm" style="width:60px"></select>
	      	  </td>
	      	  <td class="info text-center">온도조건</td>
	      	  <td>
	      	  	<select id="banipPlace" name="banipPlace" class="input-sm" style="width:100px"></select>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="info text-center">요청사항<br>(세인용)</td>
	      	  <td colspan="3">
	      	  	<textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" class="input-sm" style="width:100%;"></textarea>
	      	  </td>
	      	</tr>
	 	  </table>
	 	  </form>
        </div>
      </div>
	</div>
  </body>
</html>