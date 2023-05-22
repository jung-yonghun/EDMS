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
	<title>게시물 보기</title>
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
	<script src="<c:url value='/js/sein/board/boardView.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper" style="margin-top:5px;">
 	  <input type="hidden" id="noticeCategory" 	name="noticeCategory" 	value="${param.noticeCategory}" />
 	  <input type="hidden" id="noticeKey" 		name="noticeKey" 		value="${param.noticeKey}" />
	  <div class="row">
	    <div class="col-sm-12" id='parentDiv'>
          <table id="masterGrid"></table>
		  <div id="masterPager"></div>
        </div>
      </div>
	  <div class="row" style="margin-top:10px;">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                           게시물 보기
            </div>
            <div class="panel-body well-sm">
				<table class="table table-bordered">
				  <col width="15%"></col>
				  <col width="30%"></col>
				  <col width="15%"></col>
				  <col width="20%"></col>
				  <col width="10%"></col>
				  <col width="10%"></col>
				  <tr height="30">
					<td class="info text-center">작성자</td>
					<td><div id="addUserNm" name="addUserNm"></div></td>
					<td class="info text-center">작성일시</td>
					<td align="center"><div id="addDtm" name="addDtm"></div></td>
					<td class="info text-center">조회수</td>
					<td align="center"><div id="hitCount" name="hitCount"></div></td>
				  </tr>
				  <tr height="30">
					<td class="info text-center">제목</td>
					<td colspan="5"><div id="subject" name="subject"></div></td>
				  </tr>
				  <tr>
					<td colspan="6">
					  <textarea type="text" id="contents" name="contents" class="input-sm" style="width:100%;height:130px" readOnly></textarea>
					</td>
				  </tr>
				</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>