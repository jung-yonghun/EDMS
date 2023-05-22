<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
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
	<script src="<c:url value='/js/sein/board/mainContents.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
      <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}" />
      <input type="hidden" id="startDay" 	name="startDay" 	class="input-sm" style="width:70px;text-align:center;" maxlength="8" />
	  <input type="hidden" id="endDay" 		name="endDay" 		class="input-sm" style="width:70px;text-align:center;" maxlength="8" />
      <div class="row" style="margin-top:10px">
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-green">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-tasks fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="inventory" class="huge"></div>
	                            <div>금주 입고완료 수량</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#"  onclick='parent.addTab("입고관리","../order/warehouseList.geows")'>
	                    <div class="panel-footer">
	                        <span class="pull-left">View Details</span>
	                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                        <div class="clearfix"></div>
	                    </div>
	                </a>
	            </div>
	        </div>
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-primary">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-comments fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="order" class="huge"></div>
	                            <div>전체 발주주문요청 수량</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#" id="mView1">
                      <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                      </div>
                    </a>
	            </div>
	        </div>
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-red">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-shopping-cart fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="output" class="huge"></div>
	                            <div>전체 불출요청 수량</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#" onclick='parent.addTab("불출관리","../inventory/confiningList.geows")'>
	                    <div class="panel-footer">
	                        <span class="pull-left">View Details</span>
	                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                        <div class="clearfix"></div>
	                    </div>
	                </a>
	            </div>
	        </div>
	    </div>
	    <div class="row" style="margin-top:10px">
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-info">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-list-alt fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="import" class="huge"></div>
	                            <div>금일 수입신고현황</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#" onclick='parent.addTab("수입신고현황","../customs/importList.geows")'>
	                    <div class="panel-footer">
	                        <span class="pull-left">View Details</span>
	                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                        <div class="clearfix"></div>
	                    </div>
	                </a>
	            </div>
	        </div>
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-warning">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-list-alt fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="export" class="huge"></div>
	                            <div>금일 수출신고현황</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#"  onclick='parent.addTab("수출신고현황","../customs/exportList.geows")'>
	                    <div class="panel-footer">
	                        <span class="pull-left">View Details</span>
	                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                        <div class="clearfix"></div>
	                    </div>
	                </a>
	            </div>
	        </div>
	        <div class="col-lg-4 col-md-6">
	            <div class="panel panel-yellow">
	                <div class="panel-heading">
	                    <div class="row">
	                        <div class="col-xs-3">
	                            <i class="fa fa-rotate-left fa-5x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <div id="reTool" class="huge"></div>
	                            <div>재반출조건 TOOL 현황</div>
	                        </div>
	                    </div>
	                </div>
	                <a href="#" onclick='parent.addTab("재반출조건 TOOL 현황","../inventory/reToolList.geows")'>
                      <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                      </div>
                    </a>
	            </div>
	        </div>
	    </div>
      <!-- div class="row">
        <div class="col-sm-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
              To Do List
              <div class="pull-right">
                <div class="btn-group">
                  <button type="button" class="btn btn-default btn-xs">더보기</button>
                </div>
              </div>
            </div>
            <div class="panel-body well-sm">
            </div>
          </div>
        </div>
      </div-->
      <div class="row">
        <form id="frm4" name="frm4">
 	  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
 	  	<input type="hidden" id="category" 	name="category" value="NEWS" />
 	  	<input type="hidden" id="size" 		name="size" 	value="500" />
		<input type="hidden" id="page" 		name="page" 	value="0" />
 	  	</form>
        <div class="col-sm-6">
          <div class="panel panel-success">
            <div class="panel-heading">
                            공지
              <div class="pull-right">
                <div class="btn-group">
                  <button type="button" class="btn btn-success btn-xs" onclick="fn_popAction('','Notice')">+More</button>
                </div>
              </div>
            </div>
            <div class="panel-body well-sm">
              <div class="table-responsive">
                <table id="NNotice" class="table table-striped table-hover">
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <form id="frm2" name="frm2">
  	  	<input type="hidden" id="useYn" 	name="useYn" 	value="Y" />
  	  	<input type="hidden" id="category" 	name="category" value="SYS" />
  	  	<input type="hidden" id="size" 		name="size" 	value="500" />
 		<input type="hidden" id="page" 		name="page" 	value="0" />
  	  	<input type="hidden" id="GRADE" 	name="GRADE" 	value="${sessionScope.USERGRADE}"/>
  	  	</form>
        <div class="col-sm-6">
          <div class="panel panel-success">
            <div class="panel-heading">
                            직원교육
              <div class="pull-right">
                <div class="btn-group">
                  <button type="button" class="btn btn-success btn-xs" onclick="fn_popAction('','Edu')">+More</button>
                </div>
              </div>
            </div>
            <div class="panel-body well-sm">
              <div class="table-responsive">
                <table id="SNotice" class="table table-striped table-hover">
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>