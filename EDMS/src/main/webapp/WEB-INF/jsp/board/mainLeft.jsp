<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>GEOWS</title>
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
	<script src="<c:url value='/js/sein/board/mainLeft.js'/>"></script>
  </head>
  <body>
    <input type="hidden" id="USERID" 	name="USERID" 	value="${sessionScope.USERID}"/>
	<input type="hidden" id="id" 		name="id" 		value="${sessionScope.ID}"/>
    <div id="wrapper">
      <nav id="sidebar-wrapper" class="navbar navbar-default" role="navigation">
		<div class="navbar-default sidebar" role="navigation">
		  <div class="sidebar-nav">
		   	<p class="text-center"><a id="images" onclick="mainView()"></a></p>
		    <ul class="nav" id="side-menu">
		      <p class="text-center" style="color:#fff;font-size:12px;line-height:2;"><strong>${sessionScope.USERNAME} 님</strong><br/>
		      <button type="button" class="btn btn-outline btn-primary btn-xs" onclick="Logout()">logout</button></p>
			  <div class="panel-group" id="accordion"></div>
			</ul>
		  </div>
		</div>
	  </nav>
    </div>
  </body>
</html>