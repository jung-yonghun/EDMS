<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<title>운송의뢰</title>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryInsert.js?20221206'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
	  <div class="row">
        <div class="col-md-12">
	      <div style="margin-top:5px;margin-bottom:5px;">
		  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_insertAction()">운송의뢰</button>
		  </div>
		  <form id="insertForm" name="insertForm">
		  <input type="hidden" id="impoSingoNo" 		name="impoSingoNo"			value="${param.impoSingoNo}"/>
		  <input type="hidden" id="_defaultDB" 			name="_defaultDB"			value="${param._defaultDB}"/>
		  <input type="hidden" id="deliveryPojangDanwi" name="deliveryPojangDanwi"/>
		  <input type="hidden" id="deliveryJungDanwi" 	name="deliveryJungDanwi" 	value="KG"/>
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
			      <option value="박지현">박지현</option>
				  <option value="윤정언">윤정언</option>
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
	      	  	<input type="text" id="impoBanipDtm" name="impoBanipDtm" class="input-sm" style="width:100%;" readOnly/>
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
	      	    <input type="text" id="impoJangchNm" name="impoJangchNm" class="input-sm" style="width:90%;" readOnly/>
	      	  </td>
	      	</tr>
	      	<tr>
	      	  <td class="warning text-center">착지상호</td>
	      	  <td colspan="3">
	      	    <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" class="input-sm"/>
	      	    <input type="text" id="deliveryCarryingInNm" name="deliveryCarryingInNm" class="input-sm" style="width:90%;" readOnly/>
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
	      	  <td class="warning text-center">배차정보메일</td>
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