<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/deliveryList.js'/>"></script>
  </head>
  <body oncontextmenu="return false">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Top">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="size" 			name="size" 			value="100000" />
				  <input type="hidden" id="page" 			name="page" 			value="0" />
				  <input type="hidden" id="_pageRow" 		name="_pageRow" 		value="100000" />
				  <input type="hidden" id="_pageNumber" 	name="_pageNumber"  	value="0" />
				  <input type="hidden" id="USERID" 			name="USERID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="customerDb" 		name="customerDb" 		value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="customerTaxNum" 	name="customerTaxNum" 	value="${sessionScope.TAXNO}">
				  <input type="hidden" id="customerCode" 	name="customerCode">
		  		  <input type="hidden" id="_userGrade" 		name="_userGrade" 		value="A">
		  		  <input type="hidden" id="workNm" 			name="workNm" 			value="수입" />
				  <input type="hidden" id="mappGubun" 		name="mappGubun" 		value="B" />
				  <input type="hidden" id="useYn" 			name="useYn" 			value="Y" />
				  <input type="hidden" id="yymmddhhmmss" 	name="yymmddhhmmss"/>
		  		  <table width="100%">
				  	<col width="08%" />
				  	<col width="25%" />
				  	<col width="01%" />
				  	<col width="08%" />
				  	<col width="24%" />
				  	<col width="01%" />
				  	<col width="08%" />
				  	<col width="25%" />
				  	<tr height="23px">
					  <td>
					    <select id="_dateType" name="_dateType" style="width:70px">
					      <option value="singoDate">신고일</option>
						  <option value="requestDate"  selected="selected">운송의뢰일</option>
						  <option value="allocateRequestDate">배차요청일</option>
						  <option value="allocateDate">배차일</option>
						  <option value="deliveryStartDate">배송시작일</option>
						  <option value="deliveryEndDate">인수일</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					    <div class="normal_btn">
						  <a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_today()">일</a>
						  <a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_week()">주</a>
						  <a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_month()">월</a>
						  <a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						</div>
					  </td>
					  <td></td>
					  <td>납세자상호</td>
					  <td><input type="text" id="customerName" name="customerName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="hblNo" name="hblNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>운송업체</td>
					  <td><input type="text" id="deliveryCoName" name="deliveryCoName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>착지명</td>
					  <td><input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>배송정보</td>
					  <td>
					    <select id="deliveryStatus" name="deliveryStatus" style="width:80px" onChange="fn_searchAction()">
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
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_carryInModifyAction();">착지수정</a>
				  <a href="javascript:fn_delStatusAction();">운송의뢰 삭제</a>
				  <a href="javascript:fn_homeView();">Home</a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
				  <div data-options="region:'east',split:true" title="Detail Area" style="width:400px;box-sizing:border-box;border:0px">
			  	 	<div class="easyui-tabs" data-options="fit:true,plain:true">
			  	      <div title="첨부문서" style="padding:10px;">
	                  	<div class="normal_con01">
					      <table id="fileGrid" class="easyui-datagrid"></table>
					  	</div>
					  </div>
					  <div title="운송의뢰 상세" style="padding:2px;">
					    <div class="normal_Button">
					   	  <a href="javascript:fn_carryingSave();">운송의뢰 수정</a>
					   	  <a href="javascript:fn_carryingAdd();">추가 도착지 등록</a>
					  	</div>
					  	<div class="hsnew_C02_table">
			  	          <form id="insertForm" name="insertForm">
						  <table>
					   	    <col width="25%"/>
                            <col width="75%"/>
                            <tr>
                              <td class="left">요청사항</td>
                              <td>
                                <textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" style="width:100%;"></textarea>
                              </td>
                            </tr>
					      	<tr>
                              <td class="left">B/L No</td>
                              <td>
                                <input type="text" id="hblNo" name="hblNo" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">신고번호</td>
                              <td>
                                <input type="text" id="singoNo" name="singoNo" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">수량</td>
                              <td>
                                <input type="text" id="pojangSu" name="pojangSu" style="width:50px;text-align:right" readOnly/>
                                <input type="text" id="pojangDanwi" name="pojangDanwi" style="width:30px;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">중량</td>
                              <td>
                                <input type="text" id="totalJung" name="totalJung" style="width:50px;text-align:right" readOnly/>
                                <input type="text" id="jungDanwi" name="jungDanwi" style="width:30px;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">의뢰자 상호</td>
                              <td>
                                <input type="text" id="requestCoName" name="requestCoName" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">의뢰일시</td>
                              <td>
                                <input type="text" id="requestDate" name="requestDate" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">의뢰자</td>
                              <td>
                                <input type="text" id="requestMan" name="requestMan" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">연락처</td>
                              <td>
                                <input type="text" id="requestPhone" name="requestPhone" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">세관</td>
                              <td>
                                <input type="text" id="impoSegwan" name="impoSegwan" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">반입일</td>
                              <td>
                                <input type="text" id="impoBanipDate" name="impoBanipDate" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">장치장</td>
                              <td>
                                <input type="text" id="impoJangchBuho" name="impoJangchBuho" style="width:25%" readOnly/>
                                <input type="text" id="impoJangchJangso" name="impoJangchJangso" style="width:67%" readOnly/>
                                <input type="text" id="impoJangchName" name="impoJangchName" style="width:100%" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">요청업체</td>
                              <td>
                                <input type="text" id="assignCom" name="assignCom" style="width:100%;" maxlength="20"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">접수자</td>
                              <td>
                                <%--<input type="text" id="assignMan" name="assignMan" style="width:100%;" maxlength="20"/>--%>
                                <select id="assignMan" name="assignMan" style="width:40%" onchange="fn_changeMan(this)">
                                  <option value="김현정">김현정</option>
				      			  <option value="안근용">안근용</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">연락처</td>
                              <td>
                                <input type="text" id="assignPhone" name="assignPhone" style="width:100%;" maxlength="15"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">착지 상호</td>
                              <td>
                                <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" class="input-sm"/>
                                <input type="hidden" id="deliveryCarryingInTaxNum" name="deliveryCarryingInTaxNum"/>
                                <input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" style="width:80%;" readOnly/>
                                <a href="javascript:fn_carryingIn()"><img src="../images/cps/hs_seach.png"></a>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">담당자</td>
                              <td>
                                <input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">휴대번호</td>
                              <td>
                                <input type="text" id="deliveryCarryingInMobile" name="deliveryCarryingInMobile" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">전화번호</td>
                              <td>
                                <input type="text" id="deliveryCarryingInPhone" name="deliveryCarryingInPhone" style="width:100%;" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">이메일</td>
                              <td>
                                <input type="text" id="deliveryCarryingInEmail" name="deliveryCarryingInEmail" style="width:100%;" readOnly/>
                                <input type="text" id="deliveryCarryingInFax" name="deliveryCarryingInFax" style="display: none" readOnly/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">주소</td>
                              <td>
                                <textarea type="text" id="deliveryCarryingInAddr" name="deliveryCarryingInAddr" style="width:100%;" readOnly></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">의뢰수량</td>
                              <td>
                                <input type="text" id="deliveryPojangSu" name="deliveryPojangSu" style="width:50px;text-align:right"/>
                                <input type="text" id="deliveryPojangDanwi" name="deliveryPojangDanwi" style="width:30px;"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">의뢰중량</td>
                              <td>
                                <input type="text" id="deliveryJung" name="deliveryJung" style="width:50px;text-align:right"/>
                                <input type="text" id="deliveryJungDanwi" name="deliveryJungDanwi" style="width:30px;"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">사이즈</td>
                              <td>
                                <select id="cargoSize" name="cargoSize" style="width:30%"></select>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">온도조건</td>
                              <td>
                                <select id="banipPlace" name="banipPlace" style="width:30%"></select>
                              </td>
                            </tr>
					      </table>
					      </form>
					    </div>
			  	      </div>
			  	      <div title="운송이력" style="padding:2px;">
			  	        <div class="hsnew_C02_table">
			  	          <form id="viewForm" name="viewForm">
						  <table>
					   	    <col width="20%" />
						  	<col width="40%" />
						  	<col width="40%" />
					      	<tr>
					      	  <td class="left">상태</td>
					      	  <td class="left">처리자</td>
					      	  <td class="left">처리일시</td>
					      	</tr>
					      	<tr>
					      	  <td class="left">운송의뢰</td>
					      	  <td class="taC"><div id="requestMan"></div></td>
					      	  <td class="taC"><div id="requestDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">배차요청</td>
					      	  <td class="taC"><div id="assignMan"></div></td>
					      	  <td class="taC"><div id="allocateRequestDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">배차완료</td>
					      	  <td class="taC"><div id="deliveryCoName"></div></td>
					      	  <td class="taC"><div id="allocateDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">배송중</td>
					      	  <td class="taC"><div id="deliveryCarName"></div></td>
					      	  <td class="taC"><div id="deliveryStartDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">배송완료</td>
					      	  <td class="taC"><div id="deliveryCarEndName"></div></td>
					      	  <td class="taC"><div id="deliveryEndDate"></div></td>
					      	</tr>
					      </table>
					      </form>
					    </div>
			  	      </div>
				  	</div>
			  	  </div>
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
					  <table id="masterGrid">
					    <thead>
				          <tr>
				          	<th data-options="field:'deliveryRequestKey',hidden:true" rowspan="2">Key</th>
				          	<th data-options="field:'ck',checkbox:true" rowspan="2"></th>
				            <th data-options="field:'deliveryStatus',width:60,align:'center',formatter:linkDeliveryStatusFormatter" rowspan="2">배송정보</th>
				            <th data-options="field:'customerName',width:200" rowspan="2">수입자</th>
				            <th data-options="field:'hblNo',width:120,formatter:linkBlNoFormatter" rowspan="2">B/L No.</th>
				            <th data-options="field:'singoNo',width:120,align:'center',formatter:linkSingoFormatter" rowspan="2">신고번호</th>
				            <th data-options="field:'suirDate',width:60,align:'center'" rowspan="2">수리일</th>
				            <th data-options="field:'banipPlace',width:60,align:'center'" rowspan="2">온도조건</th>
				            <th data-options="field:'cargoSize',width:50,align:'center'" rowspan="2">사이즈</th>
				            <th data-options="field:'deliveryPojangSu',width:70,align:'right',formatter:linkNumberFormatter0" rowspan="2">의뢰포장수량</th>
				            <th data-options="field:'deliveryJung',width:60,align:'right',formatter:linkNumberFormatter3" rowspan="2">의뢰중량</th>
				            <th colspan="3">접수정보</th>
				            <th colspan="5">운송사정보</th>
				            <th colspan="3">착지정보</th>
				          </tr>
				          <tr>
				            <th data-options="field:'assignCom',width:150,align:'center'">운송요청업체</th>
				            <th data-options="field:'assignMan',width:60,align:'center'">접수자</th>
				            <th data-options="field:'assignPhone',width:100,align:'center'">연락처</th>
				            <th data-options="field:'deliveryCoName',width:150,align:'center'">운송업체</th>
				            <th data-options="field:'deliveryCoPhone',width:100,align:'center'">연락처</th>
				            <th data-options="field:'deliveryCarName',width:80,align:'center'">기사명</th>
				            <th data-options="field:'deliveryCarPhone',width:100,align:'center'">기사연락처</th>
				            <th data-options="field:'deliveryCarNum',width:100,align:'center'">차량번호</th>
				            <th data-options="field:'deliveryCarryingInName',width:150,align:'center'">착지명</th>
				            <th data-options="field:'deliveryCarryingInMan',width:60,align:'center'">담당자</th>
				            <th data-options="field:'deliveryCarryingInPhone',width:100,align:'center'">연락처</th>
				          </tr>
				        </thead>
					  </table>
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