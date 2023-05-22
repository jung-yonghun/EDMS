<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_titleIndex.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/sein/edms/rpaList.js'/>"></script>
	<style>
	.custom-statusbar{
		padding:2px 0px 2px 0px;
		width:250px;
	}
	.odd{
		background-color:#f9f9f9;
	}
	.even{
		background-color:#f3f3f3;
	}
	.custom-filename{
		display:inline-block;
		width:250px;
		margin:0 5px 0px 0px;
		color:#333333
		vertical-align:middle;
	}
	.custom-progress{
		margin:0 10px 0px 10px;
		position:absolute;
		width:250px;
		border:0px solid #ddd;
		padding:1px;
		border-radius:3px;
		display:none;
		vertical-align:middle;
		color:#FFFFFF;
	}
	.custom-bar{
		background-color:#337AB7;
		width:0;
		height:0px;
		border-radius:3px
		color:#FFFFFF;
		display:inline-block;
		vertical-align:middle;
		margin:0px;
	}
	.custom-red{
		-moz-box-shadow:inset 0 39px 0 -24px #e67a73;
		-webkit-box-shadow:inset 0 39px 0 -24px #e67a73;
		box-shadow:inset 0 39px 0 -24px #e67a73;
		background-color:#e4685d;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		text-shadow:0 1px 0 #b23e35;
		cursor:pointer;
		vertical-align:middle;
		margin-right:5px;
	}
	.custom-green{
		background-color:#77b55a;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		margin:0;
		padding:0;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		cursor:pointer;
		text-shadow:0 1px 0 #5b8a3c;
		vertical-align:middle;
		margin-right:5px;
	}
	.ajax-file-upload{
		font-family:Arial, Helvetica, sans-serif;
		font-size:12px;
		font-weight:bold;
		padding:10px 10px 10px 10px;
		cursor:pointer;
		line-height:10px;
		height:20px;
		margin:0 10px 10px 0;
		display:inline-block;
		background:#fff;
		border:1px solid #e8e8e8;
		color:#888;
		text-decoration:none;
		border-radius:3px;
		-webkit-border-radius:3px;
		-moz-border-radius:3px;
		-moz-box-shadow:0 2px 0 0 #e8e8e8;
		-webkit-box-shadow:0 2px 0 0 #e8e8e8;
		box-shadow:0 2px 0 0 #e8e8e8;
		padding:6px 10px 4px 10px;
		color:#fff;
		background:#3458ac;
		border:none;
		-moz-box-shadow:0 2px 0 0 #13648d;
		-webkit-box-shadow:0 2px 0 0 #13648d;
		box-shadow:0 2px 0 0 #13648d;
		vertical-align:middle;
	}
	.ajax-upload-dragdrop{
		border:4px dotted #A5A5C7;
		width:300px;
		height:70px;
		color:#DADCE3;
		text-align:left;
		vertical-align:middle;
		padding:10px 10px 0px 10px;
	}

	#myProgress {
	    position: relative;
	    width: 330px;
	    height: 30px;
	    background-color: #eeeeee;
	}
	#myBar {
	    position: absolute;
	    width: 1%;
	    height: 100%;
	    background-color: blue;
	    display:none;
	}
	#label {
	    text-align: center;
	    line-height: 30px;
	    color: white;
	}
	</style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container" style="padding:10px">
			  <div class="easyui-layout" style="width:99%;height:650px;">
			    <div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="easyui-tabs" id="tabs" data-options="plain:true,narrow:true">
			  	    <div title="Inv의뢰" style="padding:10px;">
					  <div class="normal_Top">
					  <form id="frm1" name="frm1">
					   	<table width="100%">
					   	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="23%"/>
					  	  <col width="01%"/>
					  	  <col width="06%"/>
					  	  <col width="22%"/>
					   	  <tr height="23px">
					     	<td class="left">지사선택</td>
					     	<td>
					     	  <select id="teamCode" name="teamCode" style="width:60px;height:20px">
					     	    <option value="">전체</option>
					     	    <option value="ncustoms">본사</option>
					     	    <option value="ncustoms_sel4">본사1</option>
					     	    <option value="ncustoms_sn">경기</option>
					     	    <option value="ncustoms_yj">공항</option>
					     	    <option value="ncustoms_gm">구미</option>
					     	    <option value="ncustoms_dj">대전</option>
					     	    <option value="ncustoms_bs">부산</option>
					     	    <option value="ncustoms_ys">여수</option>
					     	    <option value="ncustoms_us">울산</option>
					     	    <option value="ncustoms_ic">인천</option>
					     	    <option value="ncustoms_jj">진주</option>
					     	    <option value="ncustoms_cw">창원</option>
					     	    <option value="ncustoms_ca">천안</option>
					     	    <option value="ncustoms_cj">청주</option>
					     	    <option value="ncustoms_pj">파주</option>
					     	    <option value="ncustoms_pt">평택</option>
					     	  </select>
					     	</td>
					     	<td class="left">업무구분</td>
					     	<td>
					     	  <select id="gubun" name="gubun" style="width:60px;height:20px">
					     	    <option value="import">수입</option>
					     	    <option value="export">수출</option>
					     	  </select>
					     	</td>
					     	<td class="left">처리상태</td>
					     	<td>
					     	  <select id="endYn" name="endYn" style="width:60px;height:20px">
					     	    <option value="">전체</option>
					     	    <option value="N" selected>대기</option>
					     	    <option value="Y">완료</option>
					     	    <option value="X">오류</option>
					     	  </select>
					     	</td>
					     	<td class="left">상호</td>
					     	<td>
					     	  <input type="text" id="sangho" name="sangho" style="width:100%;ime-mode:active;"/>
					     	</td>
					     	<td></td>
					     	<td class="left">B/L No</td>
					     	<td>
					     	  <input type="text" id="blNo" name="blNo" style="width:100%;ime-mode:active;"/>
					     	</td>
					      </tr>
					 	</table>
					  </form>
					  </div>
					  <div class="shipment_center_btn02">
					    <a href="javascript:fn_searchAction();" class="Btn01">조회</a>
					    <a href="javascript:fn_allDown();" class="Btn01">일괄다운</a>
					    <a href="javascript:fn_endAction();" class="Btn04">처리완료</a>
					    <a href="javascript:fn_errorAction();" class="Btn01">오류</a>
					    <a href="javascript:fn_delAction();" class="Btn01">의뢰취소</a>
					  </div>
					  <div class="easyui-layout" style="width:100%;height:500px;">
			    		<div data-options="region:'center',split:true" style="width:70%;box-sizing:border-box;border:0px">
			    		  <div class="normal_con01">
					  		<table id="masterGrid"></table>
					  	  </div>
					  	  <div class="normal_Top">
					  	  <form id="frmbind" name="frmbind">
					  	  <table>
					   	    <col width="04%" />
						  	<col width="15%" />
						  	<col width="01%" />
						  	<col width="04%" />
						  	<col width="09%" />
						  	<col width="01%" />
						  	<col width="06%" />
						  	<col width="13%" />
						  	<col width="01%" />
						  	<col width="04%" />
						  	<col width="21%" />
						  	<col width="01%" />
						  	<col width="06%" />
						  	<col width="14%" />
					      	<tr>
					      	  <td class="left">지사</td>
					     	  <td>
					     	  	<input type="text" id="jisa" name="jisa" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					      	  <td class="left">코드</td>
					      	  <td>
					      	  	<input type="text" id="code1" name="code1" style="width:100%;ime-mode:active;" readOnly/>
					      	  </td>
					      	  <td></td>
					      	  <td class="left">사업자</td>
					     	  <td>
					     	  	<input type="text" id="saup" name="saup" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					     	  <td class="left">상호</td>
					     	  <td>
					     	  	<input type="text" id="sangho1" name="sangho1" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					     	  <td class="left">B/L No</td>
					     	  <td>
					     	  	<input type="text" id="bl" name="bl" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					      	</tr>
	                      </table>
	                      </form>
	                      </div>
					  	</div>
					  	<div data-options="region:'east',split:true" style="width:30%;box-sizing:border-box;border:0px">
			    		  <div class="normal_con01">
					  		<table id="fileGrid"></table>
					  	  </div>
					  	</div>
					  </div>
			  	    </div>
			  	    <div title="필증업로드" style="padding:10px;">
			  	      <form id="insertPaperForm" name="insertPaperForm">
			      	  <input type="hidden" id="edmsFileCategory" 	name="edmsFileCategory"	value="B0001"/>
					  <input type="hidden" id="edmsFileStatus" 		name="edmsFileStatus"	value="A"/>
					  <div id="fileuploader2">파일찾기</div>
					  <div id="myProgress">
					    <div id="myBar">
				  	  	  <div id="label">0%</div>
					  	</div>
					  </div>
				  	  </form>
				  	  <div class="normal_Top" style="width:330px">
					  <form id="frm3" name="frm3">
					   	<table width="330px">
					   	  <col width="25%"/>
					  	  <col width="75%"/>
					  	  <tr height="23px;">
					     	<td class="left">지사선택</td>
					     	<td>
					     	  <select id="_defaultDB" name="_defaultDB" style="width:60px;height:20px" onchange="fn_code()">
					     	    <option value="ncustoms">본사</option>
					     	    <option value="ncustoms_sel4">본사1</option>
					     	    <option value="ncustoms_sn">경기</option>
					     	    <option value="ncustoms_yj">공항</option>
					     	    <option value="ncustoms_gm">구미</option>
					     	    <option value="ncustoms_dj">대전</option>
					     	    <option value="ncustoms_bs">부산</option>
					     	    <option value="ncustoms_ys">여수</option>
					     	    <option value="ncustoms_us">울산</option>
					     	    <option value="ncustoms_ic">인천</option>
					     	    <option value="ncustoms_jj">진주</option>
					     	    <option value="ncustoms_cw">창원</option>
					     	    <option value="ncustoms_ca">천안</option>
					     	    <option value="ncustoms_cj">청주</option>
					     	    <option value="ncustoms_pj">파주</option>
					     	    <option value="ncustoms_pt">평택</option>
					     	  </select>
					     	</td>
					      </tr>
					      <tr height="23px;">
				     	  	<td class="left">업무선택</td>
				     	  	<td>
				  	  	  	  <select id="edmsGubun" name="edmsGubun" style="width:60px;height:20px" onchange="fn_code()">
				  	  	  	  	<option value="IMPORT">수입</option>
				  	  	  	  	<option value="EXPORT">수출</option>
				  	  	  	  </select>
				     	  	</td>
				          </tr>
				          <tr height="23px;">
				     	  	<td class="left">다운카운트</td>
				     	  	<td>
				  	  	  	  <input type="text" id="code01" name="code01" style="width:50px;ime-mode:active;" readOnly/>
				     	  	</td>
				          </tr>
				          <!-- tr height="23px;">
				     	  	<td class="left">유효기간</td>
				     	  	<td>
				  	  	  	  <input type="text" id="code02" name="code02" style="width:200px;ime-mode:active;" readOnly/>
				     	  	</td>
				          </tr>
				          <tr height="23px;">
				     	  	<td class="left">유니패스ID</td>
				     	  	<td>
				  	  	  	  <input type="text" id="code03" name="code03" style="width:200px;ime-mode:active;" readOnly/>
				     	  	</td>
				          </tr>
				          <tr height="23px;">
				     	  	<td class="left">유니패스PW</td>
				     	  	<td>
				  	  	  	  <input type="text" id="code04" name="code04" style="width:200px;ime-mode:active;" readOnly/>
				     	  	</td>
				          </tr-->
					 	</table>
					  </form>
					  </div>
				  	  <input type="hidden" id="ccc" name="ccc">
				  	  <input type="hidden" id="ddd" name="ddd">
				  	  <div class="shipment_center_btn02">
					    <a href="javascript:fn_searchExcel();" class="Btn01">엑셀다운</a>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid"></table>
					  </div>
					  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			  	    </div>
			  	    <div title="서류제출의뢰" style="padding:10px;">
					  <div class="normal_Top">
					  <form id="frm2" name="frm2">
					    <table width="100%">
					   	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="08%"/>
					  	  <col width="06%"/>
					  	  <col width="23%"/>
					  	  <col width="01%"/>
					  	  <col width="06%"/>
					  	  <col width="22%"/>
					   	  <tr height="23px">
					     	<td class="left">지사선택</td>
					     	<td>
					     	  <select id="teamCode" name="teamCode" style="width:80px;height:20px" onchange="fn_code1()">
					     	    <option value="">전체</option>
					     	    <option value="ncustoms">본사</option>
					     	    <option value="ncustoms_sel4">본사1</option>
					     	    <option value="ncustoms_sn">경기</option>
					     	    <option value="ncustoms_yj">공항</option>
					     	    <option value="ncustoms_gm">구미</option>
					     	    <option value="ncustoms_dj">대전</option>
					     	    <option value="ncustoms_bs">부산</option>
					     	    <option value="ncustoms_ys">여수</option>
					     	    <option value="ncustoms_us">울산</option>
					     	    <option value="ncustoms_ic">인천</option>
					     	    <option value="ncustoms_jj">진주</option>
					     	    <option value="ncustoms_cw">창원</option>
					     	    <option value="ncustoms_ca">천안</option>
					     	    <option value="ncustoms_cj">청주</option>
					     	    <option value="ncustoms_pj">파주</option>
					     	    <option value="ncustoms_pt">평택</option>
					     	  </select>
					     	</td>
					     	<td class="left">업무구분</td>
					     	<td>
					     	  <select id="edmsGubun" name="edmsGubun" style="width:80px;height:20px">
					     	    <option value="">전체</option>
					     	    <option value="수입사전">수입사전</option>
					     	    <option value="수입사후">수입사후</option>
					     	    <option value="수입정정">수입정정</option>
					     	  </select>
					     	</td>
					     	<td class="left">처리상태</td>
					     	<td>
					     	  <select id="endYn" name="endYn" style="width:60px;height:20px">
					     	    <option value="">전체</option>
					     	    <option value="N" selected>대기</option>
					     	    <option value="Y">완료</option>
					     	  </select>
					     	</td>
					     	<td class="left">상호</td>
					     	<td>
					     	  <input type="text" id="sangho" name="sangho" style="width:100%;ime-mode:active;"/>
					     	</td>
					     	<td></td>
					     	<td class="left">신고번호</td>
					     	<td>
					     	  <input type="text" id="edmsSingoNum" name="edmsSingoNum" style="width:100%;ime-mode:active;"/>
					     	</td>
					      </tr>
					 	</table>
					  </form>
					  </div>
					  <div class="shipment_center_btn02">
					    <a href="javascript:fn_searchAction1();" class="Btn01">조회</a>
					    <a href="javascript:fn_allDown1();" class="Btn01">일괄다운</a>
					    <a href="javascript:fn_endAction1();" class="Btn04">처리완료</a>
					    <a href="javascript:fn_delAction1();" class="Btn01">의뢰취소</a>
					  </div>
					  <div class="easyui-layout" style="width:100%;height:500px;">
			    		<div data-options="region:'center',split:true" style="width:70%;box-sizing:border-box;border:0px">
			    		  <div class="normal_con01">
					  		<table id="masterGrid1"></table>
					  	  </div>
					  	  <div class="normal_Top">
					  	  <form id="frmbind1" name="frmbind1">
					  	  <table>
					   	    <col width="04%" />
						  	<col width="12%" />
						  	<col width="01%" />
						  	<col width="04%" />
						  	<col width="12%" />
						  	<col width="01%" />
						  	<col width="06%" />
						  	<col width="13%" />
						  	<col width="01%" />
						  	<col width="04%" />
						  	<col width="21%" />
						  	<col width="01%" />
						  	<col width="06%" />
						  	<col width="14%" />
						  	<tr height="23px;">
				     	  	  <td class="left">암호</td>
				     	  	  <td>
				  	  	  	    <input type="text" id="code01" name="code01" style="width:100%;ime-mode:active;" readOnly/>
				     	  	  </td>
				     	  	  <td></td>
				     	  	  <td class="left">유효기간</td>
				     	  	  <td>
				  	  	  	    <input type="text" id="code02" name="code02" style="width:100%;ime-mode:active;" readOnly/>
				     	  	  </td>
				     	  	  <td></td>
				     	  	  <td class="left">유패ID</td>
				     	  	  <td>
				  	  	  	    <input type="text" id="code03" name="code03" style="width:100%;ime-mode:active;" readOnly/>
				     	  	  </td>
				     	  	  <td></td>
				     	  	  <td class="left">유패PW</td>
				     	  	  <td>
				  	  	  	    <input type="text" id="code04" name="code04" style="width:100%;ime-mode:active;" readOnly/>
				     	  	  </td>
				     	  	  <td></td>
				     	  	  <td>B/L No.</td>
				     	  	  <td>
				     	  	    <input type="text" id="blNo" name="blNo" style="width:100%;ime-mode:active;" readOnly/>
				     	  	  </td>
				          	</tr>
					      	<tr>
					      	  <td class="left">지사</td>
					     	  <td>
					     	  	<input type="text" id="jisa" name="jisa" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					      	  <td class="left">구분</td>
					      	  <td>
					      	  	<input type="text" id="edmsGubun1" name="edmsGubun1" style="width:100%;ime-mode:active;" readOnly/>
					      	  </td>
					      	  <td></td>
					      	  <td class="left">사업자</td>
					     	  <td>
					     	  	<input type="text" id="saup" name="saup" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					     	  <td class="left">상호</td>
					     	  <td>
					     	  	<input type="text" id="sangho1" name="sangho1" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					     	  <td></td>
					     	  <td class="left">신고번호</td>
					     	  <td>
					     	  	<input type="text" id="singoNo" name="singoNo" style="width:100%;ime-mode:active;" readOnly/>
					     	  </td>
					      	</tr>
	                      </table>
	                      </form>
	                      </div>
					  	</div>
					  	<div data-options="region:'east',split:true" style="width:30%;box-sizing:border-box;border:0px">
			    		  <div class="normal_con01">
					  		<table id="fileGrid1"></table>
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
	  </div>
	</div>
  </body>
</html>