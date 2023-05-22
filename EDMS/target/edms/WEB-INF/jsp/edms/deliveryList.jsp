<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryList.js?20221206'/>"></script>
  </head>
  <body oncontextmenu="return false">
    <div id="page-wrapper">
      <div class="row">
        <div class="col-md-12" style="margin-top:10px">
		  <form id="frm1" name="frm1">
		  <input type="hidden" id="size" 			name="size" 			value="100000" />
		  <input type="hidden" id="page" 			name="page" 			value="0" />
		  <input type="hidden" id="_pageRow" 		name="_pageRow" 		value="100000" />
		  <input type="hidden" id="_pageNumber" 	name="_pageNumber" 		value="0" />
		  <input type="hidden" id="workNm" 			name="workNm" 			value="수입" />
		  <input type="hidden" id="mappGubun" 		name="mappGubun" 		value="B" />
		  <input type="hidden" id="useYn" 			name="useYn" 			value="Y" />
		  <input type="hidden" id="yymmddhhmmss" 	name="yymmddhhmmss"/>
		  <input type="hidden" id="USERID" 			name="USERID" 			value="${sessionScope.USERID}">
		  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
		  <input type="hidden" id="customerDb" 		name="customerDb" 		value="${sessionScope.DEFAULTDB}">
		  <input type="hidden" id="customerTaxNo" 	name="customerTaxNo" 	value="${sessionScope.TAXNO}">
		  <input type="hidden" id="customerCode" 	name="customerCode">
		  <input type="hidden" id="_userGrade" 		name="_userGrade" 		value="A">
		  <table class="table table-striped table-bordered">
		  	<col width="07%" />
		  	<col width="33%" />
		  	<col width="07%" />
		  	<col width="23%" />
		  	<col width="07%" />
		  	<col width="23%" />
			<tr>
			  <td class="info text-center">
			    <select id="_dateType" name="_dateType" class="input-sm" style="width:90px" onChange="fn_searchAction()">
				  <option value="singoDtm">신고일</option>
				  <option value="requestDtm"  selected="selected">운송의뢰일</option>
				  <option value="allocateRequestDtm">배차요청일</option>
				  <option value="allocateDtm">배차일</option>
				  <option value="deliveryStDtm">배송시작일</option>
				  <option value="deliveryEdDtm">인수일</option>
				</select>
			  </td>
			  <td>
			    <input type="text" id="strFromDate" name="strFromDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8" /> ~
			    <input type="text" id="strToDate" 	name="strToDate" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8" />
			    <img src="../images/common/ico_left.gif" onclick="fn_prevday()"><img src="../images/common/today.gif" onclick="fn_today()"><img src="../images/common/ico_right.gif" onclick="fn_nextday()">
			    <img src="../images/common/ico_left.gif" onclick="fn_prevweek()"><img src="../images/common/week.gif" onclick="fn_week()"><img src="../images/common/ico_right.gif" onclick="fn_nextweek()">
			    <img src="../images/common/ico_left.gif" onclick="fn_prevmonth()"><img src="../images/common/month.gif" onclick="fn_month()"><img src="../images/common/ico_right.gif" onclick="fn_nextmonth()">
			  </td>
			  <td class="info text-center">납세자상호</td>
			  <td><input type="text" id="customerNm" name="customerNm" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/></td>
			  <td class="info text-center">B/L No.</td>
			  <td><input type="text" id="hblNo" name="hblNo" class="input-sm" style="width:100%;"  onkeypress="keyDown()"/></td>
			</tr>
			<tr>
			  <td class="info text-center">운송업체</td>
			  <td><input type="text" id="deliveryCoNm" name="deliveryCoNm" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/></td>
			  <td class="info text-center">착지명</td>
			  <td><input type="text" id="deliveryCarryingInNm" name="deliveryCarryingInNm" class="input-sm" style="width:100%;ime-mode:active;"  onkeypress="keyDown()"/></td>
			  <td class="info text-center">배송정보</td>
			  <td>
			    <select id="deliveryStatus" name="deliveryStatus" class="input-sm" style="width:80px" onChange="fn_searchAction()">
			      <option value="">전체</option>
			      <option value="20">운송의뢰</option>
				  <option value="30">배차요청</option>
				  <option value="40">배차완료</option>
				  <option value="50">배송중</option>
				  <option value="60">배송완료</option>
				</select>
			  </td>
			</tr>
		  </table>
		  </form>
	  	</div>
	  </div>
	  <div style="margin-top:5px;margin-bottom:5px;">
	  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction();">조회</button>
	  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_carryInModifyAction();">착지수정</button>
	  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_delStatusAction();">운송의뢰 삭제</button>
	  	<button type="button" class="btn btn-default btn-xs" onclick="fn_homeView();">Home</button>
	  </div>
	  <div class="row">
		<div class="col-md-8">
	      <div class="panel panel-primary">
            <div class="panel-heading">
              Delivery Status
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <table id="masterGrid"></table>
			  <div id="masterPager"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
	      <div id="tabs">
			<ul>
			  <li><a href="#tabs-1">첨부문서</a></li>
			  <li><a href="#tabs-2">운송의뢰 상세</a></li>
			  <li><a href="#tabs-3">운송이력</a></li>
			</ul>
			<div id="tabs-1">
		   	  <div class="panel panel-primary"  style="margin-top:5px">
	            <div class="panel-heading">
	              	파일 리스트
	            </div>
	            <div class="panel-body well-sm" id='parentDiv2'>
	           	  <table id="fileGrid"></table>
	  			  <div id="filePager"></div>
	            </div>
	          </div>
			</div>
		    <div id="tabs-2">
		      <div style="margin-top:5px;margin-bottom:5px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_carryingSave()">운송의뢰 수정</button>
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_carryingAdd()">추가 도착지 등록</button>
			  </div>
			  <form id="insertForm" name="insertForm">
			  <table class="table table-striped table-bordered">
		   	    <col width="15%" />
			  	<col width="30%" />
			  	<col width="20%" />
			  	<col width="35%" />
		      	<tr>
		      	  <td class="info text-center">B/L No</td>
		      	  <td>
		      	  	<input type="text" id="hblNo" name="hblNo" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	  <td class="info text-center">신고번호</td>
		     	  <td>
		     	  	<input type="text" id="singoNo" name="singoNo" class="input-sm" style="width:100%;" readOnly/>
		     	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info text-center">수량</td>
		      	  <td>
		      	  	<input type="text" id="pojangSu" name="pojangSu" class="input-sm" style="width:50px;text-align:right" readOnly/>
		      	  	<input type="text" id="pojangDanwi" name="pojangDanwi" class="input-sm" style="width:30px;" readOnly/>
		      	  </td>
		      	  <td class="info text-center">중량</td>
		     	  <td>
		     	  	<input type="text" id="totalJung" name="totalJung" class="input-sm" style="width:50px;text-align:right" readOnly/>
		     	  	<input type="text" id="jungDanwi" name="jungDanwi" class="input-sm" style="width:30px;" readOnly/>
		     	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info text-center">상호</td>
		      	  <td>
		      	  	<input type="text" id="requestCoNm" name="requestCoNm" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	  <td class="info text-center">의뢰일시</td>
		      	  <td>
		      	  	<input type="text" id="requestDtm" name="requestDtm" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info text-center">의뢰자</td>
		      	  <td>
		      	  	<input type="text" id="requestMan" name="requestMan" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	  <td class="info text-center">연락처</td>
		      	  <td>
		      	  	<input type="text" id="requestPhone" name="requestPhone" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="info text-center">반입일자</td>
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
		      	  <td>
		      	    <input type="text" id="impoJangchNm" name="impoJangchNm" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	  <td class="info text-center">양륙지</td>
		      	  <td>
		      	    <input type="text" id="landingArea" name="landingArea" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="success text-center">요청업체</td>
		      	  <td colspan="3">
		      	  	<input type="text" id="assignCom" name="assignCom" class="input-sm" style="width:100%;" readOnly/>
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
		      	  	<input type="text" id="assignPhone" name="assignPhone" class="input-sm" style="width:100%;" readOnly/>
		      	  </td>
		      	</tr>
		      	<tr>
		      	  <td class="warning text-center">착지 상호</td>
		      	  <td colspan="3">
		      	    <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" class="input-sm"/>
		      	    <input type="text" id="deliveryCarryingInNm" name="deliveryCarryingInNm" class="input-sm" style="width:90%;" readOnly/>
		      	  	<a onclick="javascript:fn_carryingIn()" style="cursor:pointer"><img src="../images/common/btn_search.gif" style="margin-bottom:8px"></a>
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
		      	  	<input type="text" id="deliveryPojangSu" name="deliveryPojangSu" class="input-sm" style="width:50px;text-align:right"/>
		      	  	<input type="text" id="deliveryPojangDanwi" name="deliveryPojangDanwi" class="input-sm" style="width:30px;"/>
		      	  </td>
		      	  <td class="info text-center">의뢰중량</td>
		     	  <td>
		     	  	<input type="text" id="deliveryJung" name="deliveryJung" class="input-sm" style="width:50px;text-align:right"/>
		     	  	<input type="text" id="deliveryJungDanwi" name="deliveryJungDanwi" class="input-sm" style="width:30px;"/>
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
		      	  <td class="info text-center">요청사항</td>
		      	  <td colspan="3">
		      	  	<textarea type="text" id="requestNote" name="requestNote" class="input-sm" style="width:100%;height:20px;"></textarea>
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
		    <div id="tabs-3">
		      <form id="viewForm" name="viewForm">
			  <table class="table table-striped table-bordered">
		   	    <col width="33%" />
			  	<col width="33%" />
			  	<col width="34%" />
		      	<tr>
		      	  <td class="info text-center">상태</td>
		      	  <td class="info text-center">처리자</td>
		      	  <td class="info text-center">처리일시</td>
		      	</tr>
		      	<tr>
		      	  <td class="text-center">운송의뢰</td>
		      	  <td class="text-center"><div id="requestMan"></div></td>
		      	  <td class="text-center"><div id="requestDtm"></div></td>
		      	</tr>
		      	<tr>
		      	  <td class="text-center">배차요청</td>
		      	  <td class="text-center"><div id="assignMan"></div></td>
		      	  <td class="text-center"><div id="allocateRequestDtm"></div></td>
		      	</tr>
		      	<tr>
		      	  <td class="text-center">배차완료</td>
		      	  <td class="text-center"><div id="deliveryCoNm"></div></td>
		      	  <td class="text-center"><div id="allocateDtm"></div></td>
		      	</tr>
		      	<tr>
		      	  <td class="text-center">배송중</td>
		      	  <td class="text-center"><div id="deliveryCarNm"></div></td>
		      	  <td class="text-center"><div id="deliveryStDtm"></div></td>
		      	</tr>
		      	<tr>
		      	  <td class="text-center">배송완료</td>
		      	  <td class="text-center"><div id="deliveryCarEndNm"></div></td>
		      	  <td class="text-center"><div id="deliveryEdDtm"></div></td>
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