<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String qryYymmDd = request.getParameter("qryYymmDd");
	//XML 데이터를 호출할 URL
	String url  = "https://unipass.customs.go.kr:38010/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo?crkyCn=o290i146b092i023v030r020r0&qryYymmDd="+qryYymmDd+"&imexTp=1";
	String url1 = "https://unipass.customs.go.kr:38010/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo?crkyCn=o290i146b092i023v030r020r0&qryYymmDd="+qryYymmDd+"&imexTp=2";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldList  = {"cntySgn", "fxrt", "currSgn", "mtryUtNm"};
	String[] fieldList1 = {"cntySgn", "fxrt", "currSgn", "mtryUtNm"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubList  = new ArrayList<Map>();
	ArrayList<Map> pubList1 = new ArrayList<Map>();

	try{
		//XML파싱 준비
		DocumentBuilderFactory f 	= DocumentBuilderFactory.newInstance();
		DocumentBuilder b 			= f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();
		Document doc1 = b.parse(url1);
		doc1.getDocumentElement().normalize();

		String aaa = "";
		String bbb = "";

		//##### 수출 데이터 #####//
		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList itemsList = doc.getElementsByTagName("trifFxrtInfoQryRsltVo");

		//for 루프시작
		for(int i = 0; i < itemsList.getLength(); i++){
			//i번째 publication 태그를 가져와서
			Node n = itemsList.item(i);
			//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
			if (n.getNodeType() != Node.ELEMENT_NODE)
				continue;

			Element e = (Element) n;
			HashMap pub = new HashMap();
			//for 루프 시작
			for(String name : fieldList){
				//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
				NodeList titleList = e.getElementsByTagName(name);
				Element titleElem = (Element) titleList.item(0);

				Node titleNode = titleElem.getChildNodes().item(0);

				if(titleNode == null){
					aaa = "";
				}else{
					aaa = titleNode.getNodeValue();
				}
				// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
				pub.put(name, aaa);
			}
			//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
			pubList.add(pub);
		}

		//##### 수입 데이터 #####//
		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList itemsList1 = doc1.getElementsByTagName("trifFxrtInfoQryRsltVo");

		//for 루프시작
		for(int i = 0; i < itemsList1.getLength(); i++){
			//i번째 publication 태그를 가져와서
			Node n = itemsList1.item(i);
			//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
			if (n.getNodeType() != Node.ELEMENT_NODE)
				continue;

			Element e = (Element) n;
			HashMap pub1 = new HashMap();
			//for 루프 시작
			for(String name : fieldList1){
				//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
				NodeList titleList = e.getElementsByTagName(name);
				Element titleElem = (Element) titleList.item(0);

				Node titleNode = titleElem.getChildNodes().item(0);

				if(titleNode == null){
					bbb = "";
				}else{
					bbb = titleNode.getNodeValue();
				}
				// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
				pub1.put(name, bbb);
			}
			//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
			pubList1.add(pub1);
		}
	}catch(Exception e){
		e.printStackTrace();
	}
%>
<!DOCTYPE HTML>
<html>
  <head>
  	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="shortcut icon" href="/images/common/cpsicon.ico"/>
	<title>Taxation exchange rate</title>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script>
	function fn_change(){
		document.location.href = "./viewExchange.sein?qryYymmDd="+$("#today").val();
	}

	function fn_week(){
		var secDate			= $('#today').val();
		var year 			= secDate.substr(0,4);
		var month 			= secDate.substr(4,2);
		var day 			= secDate.substr(6,2);
		var now 			= new Date(new Date(Date.parse(new Date(year,month-1,day))));
		var nowDayOfWeek 	= now.getDay();
		var weekStartDate 	= new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
		var weekEndDate 	= new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

		$("#date_from").html($.datepicker.formatDate('yymmdd', weekStartDate).substr(0,4)+"-"+$.datepicker.formatDate('yymmdd', weekStartDate).substr(4,2)+"-"+$.datepicker.formatDate('yymmdd', weekStartDate).substr(6,2));
		$("#date_to").html($.datepicker.formatDate('yymmdd', weekEndDate).substr(0,4)+"-"+$.datepicker.formatDate('yymmdd', weekEndDate).substr(4,2)+"-"+$.datepicker.formatDate('yymmdd', weekEndDate).substr(6,2));
	}

	//********** 초기 시작설정 **********//
	$(document).ready(function(){
		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#today").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "오늘",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "today" ? "minDate" : "maxDate",
								 instance = $(this).data("datepicker"),
								 date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		fn_week();
	});
	</script>
  </head>
  <body>
	<div id="page-wrapper" style="margin-top:5px;">
	  <div class="row">
        <div class="col-sm-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
              Taxation exchange rate
            </div>
            <div class="panel-body well-sm">
              <div class="well well-sm text-center">
                <strong>기준일</strong>
                <input type="text" id="today" name="today" class="input-sm" style="width:70px;text-align:center;" maxlength="8" value="${param.qryYymmDd}"/>
                <button type="button" class="btn btn-default btn-xs" onclick="fn_change()">조회</button>
        	  </div>
              <div class="well well-sm text-center">
                <input type="hidden" id="nowdate" name="nowdate" maxlength="8"/>
		  		<strong>적용기간  [<b id="date_from" name="dateFrom"></b> ~ <b id="date_to" name="dateTo"></b>]</strong>
        	  </div>
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr class="info">
                      <th class="text-center" width="35%">국가(통화)</th>
                      <th class="text-center" width="15%">수출</th>
                      <th class="text-center" width="15%">수입</th>
                      <th class="text-center" width="35%">화폐단위명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <table class="table table-striped">

<%
	//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
	int aa = 0;
	String country = "";
	for(Map pub : pubList){
		if(pub.get("cntySgn").toString().contentEquals("AE")){
			country = "아랍에미리트 연합";
		}else if(pub.get("cntySgn").toString().contentEquals("AT")){
			country = "오스트리아";
		}else if(pub.get("cntySgn").toString().contentEquals("AU")){
			country = "호주";
		}else if(pub.get("cntySgn").toString().contentEquals("BD")){
			country = "방글라데시";
		}else if(pub.get("cntySgn").toString().contentEquals("BE")){
			country = "벨기에";
		}else if(pub.get("cntySgn").toString().contentEquals("BH")){
			country = "바레인";
		}else if(pub.get("cntySgn").toString().contentEquals("BN")){
			country = "브루나이";
		}else if(pub.get("cntySgn").toString().contentEquals("BR")){
			country = "브라질";
		}else if(pub.get("cntySgn").toString().contentEquals("CA")){
			country = "캐나다";
		}else if(pub.get("cntySgn").toString().contentEquals("CH")){
			country = "스위스";
		}else if(pub.get("cntySgn").toString().contentEquals("CL")){
			country = "칠레";
		}else if(pub.get("cntySgn").toString().contentEquals("CN")){
			country = "중국";
		}else if(pub.get("cntySgn").toString().contentEquals("CZ")){
			country = "체코공화국";
		}else if(pub.get("cntySgn").toString().contentEquals("DE")){
			country = "독일";
		}else if(pub.get("cntySgn").toString().contentEquals("DK")){
			country = "덴마크";
		}else if(pub.get("cntySgn").toString().contentEquals("EG")){
			country = "이집트";
		}else if(pub.get("cntySgn").toString().contentEquals("ES")){
			country = "스페인";
		}else if(pub.get("cntySgn").toString().contentEquals("EU")){
			country = "유럽연합";
		}else if(pub.get("cntySgn").toString().contentEquals("FI")){
			country = "핀란드";
		}else if(pub.get("cntySgn").toString().contentEquals("FJ")){
			country = "피지";
		}else if(pub.get("cntySgn").toString().contentEquals("FR")){
			country = "프랑스";
		}else if(pub.get("cntySgn").toString().contentEquals("GB")){
			country = "영국";
		}else if(pub.get("cntySgn").toString().contentEquals("HK")){
			country = "홍콩";
		}else if(pub.get("cntySgn").toString().contentEquals("HU")){
			country = "헝가리";
		}else if(pub.get("cntySgn").toString().contentEquals("ID")){
			country = "인도네시아";
		}else if(pub.get("cntySgn").toString().contentEquals("IL")){
			country = "이스라엘";
		}else if(pub.get("cntySgn").toString().contentEquals("IN")){
			country = "인도";
		}else if(pub.get("cntySgn").toString().contentEquals("IT")){
			country = "이탈리아";
		}else if(pub.get("cntySgn").toString().contentEquals("JO")){
			country = "요르단";
		}else if(pub.get("cntySgn").toString().contentEquals("JP")){
			country = "일본";
		}else if(pub.get("cntySgn").toString().contentEquals("KE")){
			country = "케냐";
		}else if(pub.get("cntySgn").toString().contentEquals("KH")){
			country = "캄보디아";
		}else if(pub.get("cntySgn").toString().contentEquals("KR")){
			country = "한국";
		}else if(pub.get("cntySgn").toString().contentEquals("KW")){
			country = "쿠웨이트";
		}else if(pub.get("cntySgn").toString().contentEquals("KZ")){
			country = "카자흐";
		}else if(pub.get("cntySgn").toString().contentEquals("MN")){
			country = "몽골";
		}else if(pub.get("cntySgn").toString().contentEquals("MO")){
			country = "마카오";
		}else if(pub.get("cntySgn").toString().contentEquals("MX")){
			country = "멕시코";
		}else if(pub.get("cntySgn").toString().contentEquals("MY")){
			country = "말레이지아";
		}else if(pub.get("cntySgn").toString().contentEquals("NL")){
			country = "네덜란드";
		}else if(pub.get("cntySgn").toString().contentEquals("NO")){
			country = "노르웨이";
		}else if(pub.get("cntySgn").toString().contentEquals("NP")){
			country = "네팔";
		}else if(pub.get("cntySgn").toString().contentEquals("NZ")){
			country = "뉴질랜드";
		}else if(pub.get("cntySgn").toString().contentEquals("OM")){
			country = "오만";
		}else if(pub.get("cntySgn").toString().contentEquals("PH")){
			country = "필리핀";
		}else if(pub.get("cntySgn").toString().contentEquals("PK")){
			country = "파키스탄";
		}else if(pub.get("cntySgn").toString().contentEquals("PL")){
			country = "폴란드";
		}else if(pub.get("cntySgn").toString().contentEquals("QA")){
			country = "카타르";
		}else if(pub.get("cntySgn").toString().contentEquals("RU")){
			country = "러시아 연방";
		}else if(pub.get("cntySgn").toString().contentEquals("SA")){
			country = "사우디아라비아";
		}else if(pub.get("cntySgn").toString().contentEquals("SE")){
			country = "스웨덴";
		}else if(pub.get("cntySgn").toString().contentEquals("SG")){
			country = "싱가포르";
		}else if(pub.get("cntySgn").toString().contentEquals("SK")){
			country = "슬로바키아";
		}else if(pub.get("cntySgn").toString().contentEquals("TH")){
			country = "태국";
		}else if(pub.get("cntySgn").toString().contentEquals("TR")){
			country = "터키";
		}else if(pub.get("cntySgn").toString().contentEquals("TW")){
			country = "대만";
		}else if(pub.get("cntySgn").toString().contentEquals("US")){
			country = "미국";
		}else if(pub.get("cntySgn").toString().contentEquals("VN")){
			country = "베트남";
		}else if(pub.get("cntySgn").toString().contentEquals("ZA")){
			country = "남아프리카공화국";
		}
%>
					      <tr height="25">
			          	  	<td width="100%"><%=country %> (<%=pub.get("currSgn") %>)</td>
					  	  </tr>
<%
		aa++;
	}
%>
	          			</table>
                      </td>
				      <td class="text-right">
				      	<table width="100%" class="table table-striped">

<%
	//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
	int bb = 0;
	for(Map pub : pubList){
%>
					      <tr height="25">
			          	  	<td width="100%" class="text-right"><%=pub.get("fxrt") %></td>
					  	  </tr>
<%
		bb++;
	}
%>
	          			</table>
				      </td>
				      <td class="text-right">
				        <table width="100%" class="table table-striped">

<%
	//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
	int cc = 0;
	for(Map pub1 : pubList1){
%>
					      <tr height="25">
			          	  	<td width="100%" class="text-right"><%=pub1.get("fxrt") %></td>
					  	  </tr>
<%
		cc++;
	}
%>
	          			</table>
				      </td>
				      <td>
				        <table class="table table-striped">

<%
	//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
	int dd = 0;
	for(Map pub1 : pubList1){
%>
					      <tr height="25">
			          	  	<td width="100%"><%=pub1.get("mtryUtNm") %></td>
					  	  </tr>
<%
		dd++;
	}
%>
	          			</table>
				      </td>
	                </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
	  </div>
	</div>
  </body>
</html>