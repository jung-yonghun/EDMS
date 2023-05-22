<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="java.util.*"%>
<%
	String expDclrNo = request.getParameter("expDclrNo");

	//XML 데이터를 호출할 URL
	String url = "https://unipass.customs.go.kr:38010/ext/rest/expDclrNoPrExpFfmnBrkdQry/retrieveExpDclrNoPrExpFfmnBrkd?crkyCn=m250e106p072g093e050m090e0&expDclrNo="+expDclrNo+"";

	//서버에서리턴될 XML데이터의 엘리먼트 이름 배열
	String[] fieldNames ={"shpmPckUt", "mnurConm", "shpmCmplYn", "acptDt", "shpmWght", "exppnConm", "loadDtyTmlm", "expDclrNo", "csclWght", "shpmPckGcnt", "csclPckUt", "csclPckGcnt"};
	String[] fieldList ={"shpmPckUt", "tkofDt", "shpmPckGcnt", "blNo"};

	//각 게시물하나에 해당하는 XML 노드를 담을 리스트
	ArrayList<Map> pubDoc = new ArrayList<Map>();
	ArrayList<Map> pubList = new ArrayList<Map>();

	try {
		//XML파싱 준비
		DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
		DocumentBuilder b = f.newDocumentBuilder();
		//위에서 구성한 URL을 통해 XMl 파싱 시작
		Document doc = b.parse(url);
		doc.getDocumentElement().normalize();

		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList items = doc.getElementsByTagName("expDclrNoPrExpFfmnBrkdQryRsltVo");

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
				System.out.println(name);
				// 가져온 XML 값을 맵에 엘리먼트 이름 - 값 쌍으로 넣음
				if(titleNode == null){
					aaa = "";
				} else {
					aaa = titleNode.getNodeValue();
				}
				System.out.println(aaa);
				pub.put(name, aaa);
			}
			//데이터가 전부 들어간 맵을 리스트에 넣고 화면에 뿌릴 준비.
			pubDoc.add(pub);
		}

		//서버에서 응답한 XML데이터를 publication(발행문서 1개 해당)태그로 각각 나눔(파라미터로 요청한 size항목의 수만큼)
		NodeList itemsList = doc.getElementsByTagName("expDclrNoPrExpFfmnBrkdDtlQryRsltVo");

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
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>수출이행내역(건별)</title>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.jqgrid/ui.jqgrid.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.ui.new/jquery-ui.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/bootstrap/bootstrap.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/metisMenu/metisMenu.min.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/datatables/jquery.dataTables.min.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/font-awesome/css/font-awesome.min.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/sein/sb-admin-2.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/morris/morris.css'/>"/>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery-1.11.2.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.ui/jquery-ui.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.ui.swanky/jquery-ui.src.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.jqgrid/i18n/grid.locale-kr.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.jqgrid/jquery.jqGrid.src.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/spin/spin.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.number/jquery.number.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.deserialize/jquery.deserialize.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.validate/jquery.validate.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.formatter/jquery.formatter.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/bootstrap/bootstrap.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/metisMenu/metisMenu.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/datatables/jquery.dataTables.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/legend.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/raphael/raphael.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/morris/morris.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/sb-admin-2.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/app.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/json2.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/serviceIF.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/serialize.js'/>"></script>
	<script type="text/javascript">
		var csrfToken = $("meta[name='_csrf']").attr("content");
		var csrfHeader = $("meta[name='_csrf_header']").attr("content");

		window.alert = function(message){
		    $(document.createElement('div'))
		        .attr({title: 'alert', 'class': 'alert'})
		        .html(message)
		        .dialog({
		            buttons: {OK: function(){$(this).dialog('close');}},
		            close: function(){$(this).remove();},
		            draggable: true,
		            modal: true,
		            resizable: false,
		            width: 'auto'
		        });
		};
	</script>
  </head>
  <body>
	<div id="page-wrapper" style="margin-top:5px;">
	  <div class="row">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                           수출이행내역(건별)
            </div>
            <div class="panel-body well-sm">
              <table class="table table-striped table-bordered">
	<%
		//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
		for(Map pub : pubDoc){
	%>
		      <tr height="25">
			    <td width="110" class="info">수출신고번호</td>
			    <td width="160"><%=pub.get("expDclrNo").toString().substring(0,5) %>-<%=pub.get("expDclrNo").toString().substring(5,7) %>-<%=pub.get("expDclrNo").toString().substring(7,14) %></td>
			    <td width="110" class="info">선기적완료여부</td>
			    <td width="160"><%=pub.get("shpmCmplYn") %></td>
			  </tr>
			  <tr height="25">
			    <td width="110" class="info">수출화주/대행자</td>
			    <td width="160"><%=pub.get("exppnConm") %></td>
			    <td width="110" class="info">제조자</td>
			    <td width="160"><%=pub.get("mnurConm") %></td>
			  </tr>
			  <tr height="25">
			    <td width="110" class="info">적재의무기한</td>
	    <%
			if(pub.get("loadDtyTmlm")==null||pub.get("loadDtyTmlm")==""){
		%>
			    <td width="160"></td>
		<%
			}else{
		%>
				<td width="160"><%=pub.get("loadDtyTmlm").toString().substring(0,4) %>-<%=pub.get("loadDtyTmlm").toString().substring(4,6) %>-<%=pub.get("loadDtyTmlm").toString().substring(6,8) %></td>
		<%
			}
		%>
			    <td width="110" class="info">수리일자</td>
		<%
			if(pub.get("acptDt")==null||pub.get("acptDt")==""){
		%>
			    <td width="160"></td>
		<%
			}else{
		%>
				<td width="160"><%=pub.get("acptDt").toString().substring(0,4) %>-<%=pub.get("acptDt").toString().substring(4,6) %>-<%=pub.get("acptDt").toString().substring(6,8) %></td>
		<%
			}
		%>
			  </tr>
			  <tr height="25">
			    <td width="110" class="info">통관포장개수</td>
			    <td width="160"><%=pub.get("csclPckGcnt") %> <%=pub.get("csclPckUt") %></td>
			    <td width="110" class="info">통관중량(KG)</td>
			    <td width="160"><%=pub.get("csclWght") %></td>
			  </tr>
			  <tr height="25">
			    <td width="110" class="info">선기적포장개수</td>
			    <td width="160"><%=pub.get("shpmPckGcnt") %>
		<%
			if(pub.get("shpmPckUt")==null||pub.get("shpmPckUt")==""){
			}else{
		%>
				<%=pub.get("shpmPckUt") %>
		<%
			}
		%>

			    </td>
			    <td width="110" class="info">선기적중량(KG)</td>
			    <td width="160"><%=pub.get("shpmWght") %></td>
			  </tr>
		<%
			}
		%>
			</table>
			<br>
			<table class="table table-striped table-bordered">
			  <TR height="25">
	          	<TD class="info text-center" width=180>B/L 번호</TD>
	          	<TD class="info text-center" width=180>출항일자</TD>
	          	<TD class="info text-center" width=180>선기적포장개수</TD>
	          </TR>
		<%
			//XML의 모든 노드가 맵으로 변환되어 pubList에 들어가고,for 루프를 돌면서 pubList의 값을 뿌려줌.
			int bb = 0;
			for(Map pub1 : pubList){
		%>
			  <TR height="25">
	          	<TD align="center"><%=pub1.get("blNo") %></TD>
	    <%
			if(pub1.get("tkofDt")==null||pub1.get("tkofDt")==""){
		%>
			    <td></td>
		<%
			}else{
		%>
				<td align="center"><%=pub1.get("tkofDt").toString().substring(0,4) %>-<%=pub1.get("tkofDt").toString().substring(4,6) %>-<%=pub1.get("tkofDt").toString().substring(6,8) %></td>
		<%
			}
		%>
	          	<TD align="center"><%=pub1.get("shpmPckGcnt") %>
	    <%
			if(pub1.get("shpmPckUt")==null||pub1.get("shpmPckUt")==""){
			}else{
		%>
				<%=pub1.get("shpmPckUt") %>
		<%
			}
		%>
		        </TD>
			  </TR>
		<%
				bb++;
			}
		%>
			</table>
            </div>
          </div>
        </div>
	  </div>
	</div>
  </body>
</html>