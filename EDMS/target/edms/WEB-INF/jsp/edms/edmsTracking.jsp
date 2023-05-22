<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String cargMtNo = request.getParameter("cargMtNo");
	String mblNo 	= request.getParameter("mblNo");
	String hblNo 	= request.getParameter("hblNo");
	String blYy 	= request.getParameter("blYy");
	//XML 데이터를 호출할 URL
	String url = "https://unipass.customs.go.kr:38010/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=e290r186y052l083o010d080l1&cargMtNo="+cargMtNo+"&mblNo="+mblNo+"&hblNo="+hblNo+"&blYy="+blYy+"";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldNames ={"cargMtNo", "prgsStts", "shipNatNm", "mblNo", "hblNo", "agnc", "shcoFlco", "cargTp", "ldprNm", "lodCntyCd", "shipNm", "pckGcnt", "pckUt", "blPt", "dsprNm", "etprCstm", "etprDt", "msrm", "ttwg", "wghtUt", "prnm", "cntrGcnt", "cntrNo", "csclPrgsStts", "prcsDttm", "mtTrgtCargYnNm", "vydf", "spcnCargCd"};
	String[] fieldList ={"cargTrcnRelaBsopTpcd", "shedSgn", "pckGcnt", "pckUt", "rlbrDttm", "dclrNo", "prcsDttm", "shedNm", "wght", "wghtUt", "rlbrCn", "rlbrBssNo", "bfhnGdncCn"};
	String[] List ={"cargMtNo", "hblNo", "mblNo", "etprDt", "dsprNm", "shcoFlco"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubDoc = new ArrayList<Map>();
	ArrayList<Map> pubList = new ArrayList<Map>();
	ArrayList<Map> pList = new ArrayList<Map>();

	String aa = "";

	try {
		//XML파싱 준비
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		DocumentBuilder b = f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();

		Element ntceInfo = (Element) doc.getElementsByTagName("ntceInfo").item(0);
		Node ntc = ntceInfo.getChildNodes().item(0);

		if(ntc == null){
			aa = "";
		} else {
			aa = ntc.getNodeValue();
		}

		if(aa != ""){
			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList itemsList = doc.getElementsByTagName("cargCsclPrgsInfoQryVo");

			String aaa = "";
			//for 루프시작
			for (int i = 0; i < itemsList.getLength(); i++) {
				//i번째 publication 태그를 가져와서
				Node n = itemsList.item(i);
				//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
				if (n.getNodeType() != Node.ELEMENT_NODE)
					continue;

				Element e = (Element) n;
				HashMap pub1 = new HashMap();
				//for 루프 시작
				for(String name : List){
					//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
					NodeList titleList = e.getElementsByTagName(name);
					Element titleElem = (Element) titleList.item(0);

					Node titleNode = titleElem.getChildNodes().item(0);

					if(titleNode == null){
						aaa = "";
					} else {
						aaa = titleNode.getNodeValue();
					}
					// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
					pub1.put(name, aaa);
				}
				//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
				pList.add(pub1);
			}
		}else{

			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList items = doc.getElementsByTagName("cargCsclPrgsInfoQryVo");

			String aaa = "";

			//for 루프시작
			for (int i = 0; i < items.getLength(); i++) {
				//i번째 publication 태그를 가져와서
				Node n = items.item(i);
				//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
				if (n.getNodeType() != Node.ELEMENT_NODE)
					continue;

				Element e = (Element) n;
				HashMap pub = new HashMap();
				//for 루프 시작
				for(String name : fieldNames){
					//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
					NodeList titleList = e.getElementsByTagName(name);
					Element titleElem = (Element) titleList.item(0);

					Node titleNode = titleElem.getChildNodes().item(0);

					// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
					if(titleNode == null){
						aaa = "";
					} else {
						aaa = titleNode.getNodeValue();
					}
					pub.put(name, aaa);
				}
				//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
				pubDoc.add(pub);
			}

			//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
			NodeList itemsList = doc.getElementsByTagName("cargCsclPrgsInfoDtlQryVo");

			//for 루프시작
			for (int i = 0; i < itemsList.getLength(); i++) {
				//i번째 publication 태그를 가져와서
				Node n = itemsList.item(i);
				//노드타입을 체크함, 노드 타입이 엘리먼트가 아닐경우에만 수행
				if (n.getNodeType() != Node.ELEMENT_NODE)
					continue;

				Element e = (Element) n;
				HashMap pub1 = new HashMap();
				//for 루프 시작
				for(String name : fieldList){
					//"id", "title", "userName", "recommendId", "recommendName", "recommendDate", "url"에 해당하는 값을 XML 노드에서 가져옴
					NodeList titleList = e.getElementsByTagName(name);
					Element titleElem = (Element) titleList.item(0);

					Node titleNode = titleElem.getChildNodes().item(0);

					if(titleNode == null){
						aaa = "";
					} else {
						aaa = titleNode.getNodeValue();
					}
					// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
					pub1.put(name, aaa);
				}
				//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
				pubList.add(pub1);
			}
		}
	} catch (Exception e) {
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
	<title>수입화물진행정보</title>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/edms/edmsTracking.js'/>"></script>
  </head>
  <body>
	<div id="wrapper">
	  <div id="page-wrapper">
		<div class="search mt4">
		<input type="hidden" id="check" name="check" value="${param.check}"/>
	<%
	if(aa == ""){
	%>
		<table id="searchArea">
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		for(Map pub : pubDoc){
	%>
		  <tr height="25">
		    <td width="98" class="dl">통관진행상태</td>
		    <td class="dy">
		      <input type="text" id="status" name="status" value="<%=pub.get("prgsStts") %>" />
		    </td>
		  </tr>
		  <tr height="25">
		    <td width="98" class="dl">입항일</td>
		    <td class="dy">
		      <input type="text" id="iphangDay" name="iphangDay" value="<%=pub.get("etprDt").toString().substring(0,8) %>" />
		    </td>
		  </tr>
	<%
		}
	%>
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		int bb = 0;
		String rlbrCn 				= "";
		String cargTrcnRelaBsopTpcd = "";
		String dclrNo 				= "";
		String rlbrBssNo 			= "";

		for(Map pub1 : pubList){
			rlbrCn 					= (String)pub1.get("rlbrCn");
			cargTrcnRelaBsopTpcd 	= (String)pub1.get("cargTrcnRelaBsopTpcd");
			dclrNo 					= (String)pub1.get("dclrNo");
			rlbrBssNo 				= (String)pub1.get("rlbrBssNo");

			if(rlbrCn.contentEquals("입항 반입")){
	%>
		  <tr height="25">
		    <td width="98" class="dl">반입일</td>
		    <td class="dy">
		      <input type="text" id="banipDay" name="banipDay" value="<%=pub1.get("rlbrDttm").toString().substring(0,10).replaceAll("-","") %>" />
		    </td>
		  </tr>
	<%
			}
			if(cargTrcnRelaBsopTpcd.contentEquals("수입신고")){
	%>
		  <tr height="25">
		    <td width="98" class="dl">신고일</td>
		    <td class="dy">
		      <input type="text" id="singoDay" name="singoDay" value="<%=pub1.get("prcsDttm").toString().substring(0,8) %>" />
		      <input type="text" id="singoNum1" name="singoNum1" value="<%=dclrNo%>" />
		    </td>
		  </tr>
	<%
			}
			if(cargTrcnRelaBsopTpcd.contentEquals("수입신고수리")){
	%>
		  <tr height="25">
		    <td width="98" class="dl">수리일</td>
		    <td class="dy">
		      <input type="text" id="suriDay" name="suriDay" value="<%=pub1.get("prcsDttm").toString().substring(0,8) %>" />
		      <input type="text" id="singoNum2" name="singoNum2" value="<%=dclrNo%>" />
		    </td>
		  </tr>
	<%
			}
			if(rlbrCn.contentEquals("수입신고 수리후 반출")){
	%>
		  <tr height="25">
		    <td width="98" class="dl">반출일</td>
		    <td class="dy">
		      <input type="text" id="banchulDay" name="banchulDay" value="<%=pub1.get("rlbrDttm").toString().substring(0,10).replaceAll("-","") %>" />
		      <input type="text" id="singoNum3" name="singoNum3" value="<%=rlbrBssNo%>" />
		    </td>
		  </tr>
	<%
			}
			bb++;
		}
	%>
		</table>
	<%
	}else{
	%>
		<table id="searchArea">
		  <tr height="25">
		    <td width="98" class="dl">통관진행상태</td>
		    <td class="dy">
		      <input type="text" id="status" name="status" 	value="0" />
		    </td>
		  </tr>
		  <tr height="25">
		    <td width="98" class="dl">입항일</td>
		    <td class="dy">
		      <input type="text" id="iphangDay" name="iphangDay" value="" />
		    </td>
		  </tr>
		</table>
	<%
	}
	%>
		</div>
	  </div>
	</div>
  </body>
</html>