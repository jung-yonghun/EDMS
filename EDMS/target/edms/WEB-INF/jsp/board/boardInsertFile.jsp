<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_title.jsp"></jsp:include>
	<title>게시물 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/board/boardInsertFile.js'/>"></script>
	<style>
	.custom-statusbar {
		padding:5px 0px 5px 10px;
		width:480px;
	}
	.odd {
		background-color:#f9f9f9;
	}
	.even {
		background-color:#f3f3f3;
	}
	.custom-filename {
		display:inline-block;
		width:400px;
		margin:0 5px 0px 0px;
		color:#333333
		vertical-align:middle;
	}
	.custom-progress {
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
	.custom-bar {
		background-color:#337AB7;
		width:0;
		height:20px;
		border-radius:3px
		color:#FFFFFF;
		display:inline-block;
		vertical-align:middle;
		margin:0px;
	}
	.custom-red {
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
	.custom-green {
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
	.ajax-file-upload {
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
	.ajax-upload-dragdrop {
		border:2px dotted #A5A5C7;
		width:750px;
		height:530px;
		color:#DADCE3;
		text-align:left;
		vertical-align:middle;
		padding:10px 10px 0px 10px;
	}
	</style>
  </head>
  <body>
    <div id="page-wrapper" style="margin-top:5px;">
	  <div class="row">
        <div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
                           첨부등록
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" onclick="winClose()">닫기</button>
              </div>
            </div>
            <div class="panel-body well-sm">
              <form id="frm1" name="frm1">
			  	<input type="hidden" id="${_csrf.parameterName}" name="${_csrf.parameterName}"	value="${_csrf.token}"/>
			  	<input type="hidden" id="noticeKey" 		name="noticeKey" 		value="${param.noticesKey}"/>
			  	<input type="hidden" id="noticesKey" 		name="noticesKey" 		value="${param.noticesKey}"/>
			  	<input type="hidden" id="GRADE" 	  		name="GRADE" 			value="${sessionScope.USERGRADE}"/>
			  	<input type="hidden" id="fileAttachedYn" 	name="fileAttachedYn"	value="Y"/>
			  	<input type="hidden" id="useYn" 			name="useYn" 			value="Y" />
			    <input type="hidden" id="addUserId" 		name="addUserId"/>
			    <input type="hidden" id="noticesYn" 		name="noticesYn"/>
			    <input type="hidden" id="category" 			name="category"/>
			    <input type="hidden" id="subject" 			name="subject"/>
			    <input type="hidden" id="keyword" 			name="keyword"/>
			    <input type="hidden" id="contents" 			name="contents"/>
			    <input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
			  	<div id="fileuploader" style="width:200px">파일찾기</div>
			  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>