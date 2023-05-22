<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_title.jsp"></jsp:include>
	<title>게시물 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_js.jsp"></jsp:include>
	<script src="<c:url value='/js/sein/board/boardModify.js'/>"></script>
    <link rel="stylesheet" href="/css/editor/editor.css" type="text/css" charset="utf-8"/>
    <script src="/js/sein/editor/editor_loader.js" type="text/javascript" charset="utf-8"></script>
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
		height:80px;
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
                           게시물 수정
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" onclick="fnCheckInput()">수정</button>
                <button type="button" class="btn btn-default btn-xs" onclick="winClose()">닫기</button>
              </div>
            </div>
            <div class="panel-body well-sm">
              <form name="tx_editor_form" id="tx_editor_form" accept-charset="utf-8">
				<input type="hidden" id="selrow" 			name="selrow"			value="${param.selrow}" />
				<input type="hidden" id="pageNum" 			name="pageNum"			value="${param.pageNum}" />
				<input type="hidden" id="noticesKey" 		name="noticesKey" 		value="${param.noticesKey}" />
				<input type="hidden" id="noticeKey" 		name="noticeKey" 		value="${param.noticesKey}"/>
				<input type="hidden" id="category" 			name="category"/>
				<input type="hidden" id="useYn" 			name="useYn"/>
				<input type="hidden" id="fileAttachedYn" 	name="fileAttachedYn"/>
				<input type="hidden" id="finishedDay" 		name="finishedDay"	value="99991231"/>
				<input type="hidden" id="yyyymmdd" 			name="yyyymmdd"/>
				<table class="table table-bordered">
				  <col width="20%"></col>
				  <col width="80%"></col>
				  <tr>
					<td class="info">공지여부</td>
					<td>
					  <select id="noticesYn" name="noticesYn" class="form-control" style="width:40px">
				      	<option value="N">N</option>
					  	<option value="Y">Y</option>
					  </select>
					</td>
				  </tr>
				  <tr>
					<td class="info">제목</td>
					<td><input type="text" id="subject" name="subject" class="form-control" style="ime-mode:active;"/></td>
				  </tr>
				  <tr>
					<td class="info">키워드</td>
					<td>
					  <input type="text" id="keyword" name="keyword" class="form-control" style="ime-mode:active;"/>
					  <textarea name="contents" id="contents" rows="10" cols="100" style="width:766px; height:412px;display: none;"></textarea>
					</td>
				  </tr>
				</table>
				<div id="tx_trex_container" class="tx-editor-container">
				  <div id="tx_sidebar" class="tx-sidebar">
					<div class="tx-sidebar-boundary">
					  <!-- ul class="tx-bar tx-bar-left tx-nav-attach">
						<li class="tx-list">
						  <div unselectable="on" id="tx_image" class="tx-image tx-btn-trans">
							<a href="javascript:;" title="사진" class="tx-text">사진</a>
						  </div>
						</li>
						<li class="tx-list">
						  <div unselectable="on" id="tx_file" class="tx-file tx-btn-trans">
							<a href="javascript:;" title="파일" class="tx-text">파일</a>
						  </div>
						</li>
						<li class="tx-list">
						  <div unselectable="on" id="tx_media" class="tx-media tx-btn-trans">
							<a href="javascript:;" title="외부컨텐츠" class="tx-text">외부컨텐츠</a>
						  </div>
						</li>
						<li class="tx-list tx-list-extra">
						  <div unselectable="on" class="tx-btn-nlrbg tx-extra">
							<a href="javascript:;" class="tx-icon" title="버튼 더보기">버튼 더보기</a>
						  </div>
						  <ul class="tx-extra-menu tx-menu" style="left:-48px;" unselectable="on"></ul>
						</li>
					  </ul>
					  <ul class="tx-bar tx-bar-right">
						<li class="tx-list">
						  <div unselectable="on" class="tx-btn-lrbg tx-fullscreen" id="tx_fullscreen">
							<a href="javascript:;" class="tx-icon" title="넓게쓰기 (Ctrl+M)">넓게쓰기</a>
						  </div>
						</li>
					  </ul-->
					  <ul class="tx-bar tx-bar-right tx-nav-opt">
						<li class="tx-list">
						  <div unselectable="on" class="tx-switchtoggle" id="tx_switchertoggle">
							<a href="javascript:;" title="에디터 타입">에디터</a>
						  </div>
						</li>
					  </ul>
					</div>
				  </div>
		  		  <div id="tx_toolbar_basic" class="tx-toolbar tx-toolbar-basic"><div class="tx-toolbar-boundary">
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div id="tx_fontfamily" unselectable="on" class="tx-slt-70bg tx-fontfamily">
						  <a href="javascript:;" title="글꼴">굴림</a>
						</div>
						<div id="tx_fontfamily_menu" class="tx-fontfamily-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div unselectable="on" class="tx-slt-42bg tx-fontsize" id="tx_fontsize">
						  <a href="javascript:;" title="글자크기">9pt</a>
						</div>
						<div id="tx_fontsize_menu" class="tx-fontsize-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-etc">
					  <!-- li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-emoticon" id="tx_emoticon">
						  <a href="javascript:;" class="tx-icon" title="이모티콘">이모티콘</a>
						</div>
						<div id="tx_emoticon_menu" class="tx-emoticon-menu tx-menu" unselectable="on"></div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-link" id="tx_link">
						  <a href="javascript:;" class="tx-icon" title="링크 (Ctrl+K)">링크</a>
						</div>
						<div id="tx_link_menu" class="tx-link-menu tx-menu"></div>
					  </li-->
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg	tx-specialchar" id="tx_specialchar">
						  <a href="javascript:;" class="tx-icon" title="특수문자">특수문자</a>
						</div>
						<div id="tx_specialchar_menu" class="tx-specialchar-menu tx-menu"></div>
					  </li>
					  <!-- li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-table" id="tx_table">
						  <a href="javascript:;" class="tx-icon" title="표만들기">표만들기</a>
						</div>
						<div id="tx_table_menu" class="tx-table-menu tx-menu" unselectable="on">
						  <div class="tx-menu-inner">
							<div class="tx-menu-preview"></div>
							<div class="tx-menu-rowcol"></div>
							<div class="tx-menu-deco"></div>
							<div class="tx-menu-enter"></div>
						  </div>
						</div>
					  </li-->
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-horizontalrule" id="tx_horizontalrule">
						  <a href="javascript:;" class="tx-icon" title="구분선">구분선</a>
						</div>
						<div id="tx_horizontalrule_menu" class="tx-horizontalrule-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-font">
					  <li class="tx-list">
					  	<div unselectable="on" class="		 tx-btn-lbg 	tx-bold" id="tx_bold">
						  <a href="javascript:;" class="tx-icon" title="굵게 (Ctrl+B)">굵게</a>
					  	</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-underline" id="tx_underline">
						  <a href="javascript:;" class="tx-icon" title="밑줄 (Ctrl+U)">밑줄</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-italic" id="tx_italic">
						  <a href="javascript:;" class="tx-icon" title="기울임 (Ctrl+I)">기울임</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-strike" id="tx_strike">
						  <a href="javascript:;" class="tx-icon" title="취소선 (Ctrl+D)">취소선</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-slt-tbg 	tx-forecolor" id="tx_forecolor">
						  <a href="javascript:;" class="tx-icon" title="글자색">글자색</a>
						  <a href="javascript:;" class="tx-arrow" title="글자색 선택">글자색 선택</a>
						</div>
						<div id="tx_forecolor_menu" class="tx-menu tx-forecolor-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-slt-brbg 	tx-backcolor" id="tx_backcolor">
						  <a href="javascript:;" class="tx-icon" title="글자 배경색">글자 배경색</a>
						  <a href="javascript:;" class="tx-arrow" title="글자 배경색 선택">글자 배경색 선택</a>
						</div>
						<div id="tx_backcolor_menu" class="tx-menu tx-backcolor-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-align">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-alignleft" id="tx_alignleft">
						  <a href="javascript:;" class="tx-icon" title="왼쪽정렬 (Ctrl+,)">왼쪽정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-aligncenter" id="tx_aligncenter">
						  <a href="javascript:;" class="tx-icon" title="가운데정렬 (Ctrl+.)">가운데정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-alignright" id="tx_alignright">
						  <a href="javascript:;" class="tx-icon" title="오른쪽정렬 (Ctrl+/)">오른쪽정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-alignfull" id="tx_alignfull">
						  <a href="javascript:;" class="tx-icon" title="양쪽정렬">양쪽정렬</a>
						</div>
					  </li>
					</ul>
					<!-- ul class="tx-bar tx-bar-left tx-group-tab">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-indent" id="tx_indent">
						  <a href="javascript:;" title="들여쓰기 (Tab)" class="tx-icon">들여쓰기</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-outdent" id="tx_outdent">
						  <a href="javascript:;" title="내어쓰기 (Shift+Tab)" class="tx-icon">내어쓰기</a>
						</div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-list">
					  <li class="tx-list">
						<div unselectable="on" class="tx-slt-31lbg tx-lineheight" id="tx_lineheight">
						  <a href="javascript:;" class="tx-icon" title="줄간격">줄간격</a>
						  <a href="javascript:;" class="tx-arrow" title="줄간격">줄간격 선택</a>
						</div>
						<div id="tx_lineheight_menu" class="tx-lineheight-menu tx-menu" unselectable="on"></div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="tx-slt-31rbg tx-styledlist" id="tx_styledlist">
						  <a href="javascript:;" class="tx-icon" title="리스트">리스트</a>
						  <a href="javascript:;" class="tx-arrow" title="리스트">리스트 선택</a>
						</div>
						<div id="tx_styledlist_menu" class="tx-styledlist-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul-->
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-richtextbox" id="tx_richtextbox">
						  <a href="javascript:;" class="tx-icon" title="글상자">글상자</a>
						</div>
						<div id="tx_richtextbox_menu" class="tx-richtextbox-menu tx-menu">
						  <div class="tx-menu-header">
							<div class="tx-menu-preview-area">
							  <div class="tx-menu-preview"></div>
							</div>
							<div class="tx-menu-switch">
							  <div class="tx-menu-simple tx-selected"><a><span>간단 선택</span></a></div>
							  <div class="tx-menu-advanced"><a><span>직접 선택</span></a></div>
							</div>
						  </div>
						  <div class="tx-menu-inner"></div>
						  <div class="tx-menu-footer">
							<img class="tx-menu-confirm" src="<c:url value='/images/editor/icon/editor/btn_confirm.gif?rv=1.0.1'/>" alt=""/>
							<img class="tx-menu-cancel" hspace="3" src="<c:url value='/images/editor/icon/editor/btn_cancel.gif?rv=1.0.1'/>" alt=""/>
						  </div>
						</div>
					  </li>
					  <!-- li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-quote" id="tx_quote">
						  <a href="javascript:;" class="tx-icon" title="인용구 (Ctrl+Q)">인용구</a>
						</div>
						<div id="tx_quote_menu" class="tx-quote-menu tx-menu" unselectable="on"></div>
					  </li-->
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-background" id="tx_background">
						  <a href="javascript:;" class="tx-icon" title="배경색">배경색</a>
						</div>
						<div id="tx_background_menu" class="tx-menu tx-background-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					  <!-- li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-dictionary" id="tx_dictionary">
						  <a href="javascript:;" class="tx-icon" title="사전">사전</a>
						</div>
					  </li-->
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-undo">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-undo" id="tx_undo">
						  <a href="javascript:;" class="tx-icon" title="실행취소 (Ctrl+Z)">실행취소</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-redo" id="tx_redo">
						  <a href="javascript:;" class="tx-icon" title="다시실행 (Ctrl+Y)">다시실행</a>
						</div>
					  </li>
					</ul>
					<!-- ul class="tx-bar tx-bar-right">
					  <li class="tx-list">
						<div unselectable="on" class="tx-btn-nlrbg tx-advanced" id="tx_advanced">
						  <a href="javascript:;" class="tx-icon" title="툴바 더보기">툴바 더보기</a>
						</div>
					  </li>
					</ul-->
				  </div>
				</div>
				<!-- div id="tx_toolbar_advanced" class="tx-toolbar tx-toolbar-advanced"><div class="tx-toolbar-boundary">
				  <ul class="tx-bar tx-bar-left">
					<li class="tx-list">
					  <div class="tx-tableedit-title"></div>
					</li>
				  </ul>
				  <ul class="tx-bar tx-bar-left tx-group-align">
					<li class="tx-list">
					  <div unselectable="on" class="tx-btn-lbg tx-mergecells" id="tx_mergecells">
						<a href="javascript:;" class="tx-icon2" title="병합">병합</a>
					  </div>
					  <div id="tx_mergecells_menu" class="tx-mergecells-menu tx-menu" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div unselectable="on" class="tx-btn-bg tx-insertcells" id="tx_insertcells">
						<a href="javascript:;" class="tx-icon2" title="삽입">삽입</a>
					  </div>
					  <div id="tx_insertcells_menu" class="tx-insertcells-menu tx-menu" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div unselectable="on" class="tx-btn-rbg tx-deletecells" id="tx_deletecells">
						<a href="javascript:;" class="tx-icon2" title="삭제">삭제</a>
					  </div>
					  <div id="tx_deletecells_menu" class="tx-deletecells-menu tx-menu" unselectable="on"></div>
					</li>
				  </ul>
				  <ul class="tx-bar tx-bar-left tx-group-align">
					<li class="tx-list">
					  <div id="tx_cellslinepreview" unselectable="on" class="tx-slt-70lbg tx-cellslinepreview">
						<a href="javascript:;" title="선 미리보기"></a>
					  </div>
					  <div id="tx_cellslinepreview_menu" class="tx-cellslinepreview-menu tx-menu" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div id="tx_cellslinecolor" unselectable="on" class="tx-slt-tbg tx-cellslinecolor">
						<a href="javascript:;" class="tx-icon2" title="선색">선색</a>
						<div class="tx-colorpallete" unselectable="on"></div>
					  </div>
					  <div id="tx_cellslinecolor_menu" class="tx-cellslinecolor-menu tx-menu tx-colorpallete" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div id="tx_cellslineheight" unselectable="on" class="tx-btn-bg tx-cellslineheight">
						<a href="javascript:;" class="tx-icon2" title="두께">두께</a>
					  </div>
					  <div id="tx_cellslineheight_menu" class="tx-cellslineheight-menu tx-menu" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div id="tx_cellslinestyle" unselectable="on" class="tx-btn-bg tx-cellslinestyle">
						<a href="javascript:;" class="tx-icon2" title="스타일">스타일</a>
					  </div>
					  <div id="tx_cellslinestyle_menu" class="tx-cellslinestyle-menu tx-menu" unselectable="on"></div>
					</li>
					<li class="tx-list">
					  <div id="tx_cellsoutline" unselectable="on" class="tx-btn-rbg tx-cellsoutline">
						<a href="javascript:;" class="tx-icon2" title="테두리">테두리</a>
					  </div>
					  <div id="tx_cellsoutline_menu" class="tx-cellsoutline-menu tx-menu" unselectable="on"></div>
					</li>
				  </ul>
				  <ul class="tx-bar tx-bar-left">
					<li class="tx-list">
					  <div id="tx_tablebackcolor" unselectable="on" class="tx-btn-lrbg tx-tablebackcolor" style="background-color:#9aa5ea;">
						<a href="javascript:;" class="tx-icon2" title="테이블 배경색">테이블 배경색</a>
					  </div>
					  <div id="tx_tablebackcolor_menu" class="tx-tablebackcolor-menu tx-menu tx-colorpallete" unselectable="on"></div>
					</li>
				  </ul>
				  <ul class="tx-bar tx-bar-left">
					<li class="tx-list">
					  <div id="tx_tabletemplate" unselectable="on" class="tx-btn-lrbg tx-tabletemplate">
						<a href="javascript:;" class="tx-icon2" title="테이블 서식">테이블 서식</a>
					  </div>
					  <div id="tx_tabletemplate_menu" class="tx-tabletemplate-menu tx-menu tx-colorpallete" unselectable="on"></div>
					</li>
				  </ul>
				</div-->
			  </div>
			  <div id="tx_canvas" class="tx-canvas">
				<div id="tx_loading" class="tx-loading"><div><img src="<c:url value='/images/editor/icon/editor/loading2.png'/>" width="113" height="21" align="absmiddle"/></div></div>
				<div id="tx_canvas_wysiwyg_holder" class="tx-holder" style="display:block;">
				  <iframe id="tx_canvas_wysiwyg" name="tx_canvas_wysiwyg" allowtransparency="true" frameborder="0"></iframe>
				</div>
				<div class="tx-source-deco">
				  <div id="tx_canvas_source_holder" class="tx-holder">
					<textarea id="tx_canvas_source" rows="30" cols="30"></textarea>
				  </div>
				</div>
				<div id="tx_canvas_text_holder" class="tx-holder">
				  <textarea id="tx_canvas_text" rows="30" cols="30"></textarea>
				</div>
			  </div>
			  <div id="tx_resizer" class="tx-resize-bar">
				<div class="tx-resize-bar-bg"></div>
				<img id="tx_resize_holder" src="<c:url value='/images/editor/icon/editor/skin/01/btn_drag01.gif'/>" width="58" height="12" unselectable="on" alt="" />
			  </div>
			  </form>
			  <form id="frm2" name="frm2">
			  <input type="hidden" id="noticeKey" name="noticeKey" value="${param.noticesKey}"/>
			  <input type='hidden' id='${_csrf.parameterName}' name='${_csrf.parameterName}'	value='${_csrf.token}'/>
			  <div id="fileuploader">파일찾기</div>
			  <div>
				<table class="table table-bordered">
				  <col width="20%"></col>
				  <col width="80%"></col>
				  <tr height="30">
					<td class="info">첨부파일</td>
					<td colspan="5">
					  <table id="filelist"></table>
					</td>
				  </tr>
				</table>
			  </div>
			  </form>
			  <div id="tx_attach_div" class="tx-attach-div">
				<div id="tx_attach_txt" class="tx-attach-txt">파일 첨부</div>
				<div id="tx_attach_box" class="tx-attach-box">
				  <div class="tx-attach-box-inner">
					<div id="tx_attach_preview" class="tx-attach-preview"><p></p><img src="<c:url value='/images/editor/icon/editor/pn_preview.gif'/>" width="147" height="108" unselectable="on"/></div>
					<div class="tx-attach-main">
					  <div id="tx_upload_progress" class="tx-upload-progress"><div>0%</div><p>파일을 업로드하는 중입니다.</p></div>
						<ul class="tx-attach-top">
						  <li id="tx_attach_delete" class="tx-attach-delete"><a>전체삭제</a></li>
						  <li id="tx_attach_size" class="tx-attach-size">파일: <span id="tx_attach_up_size" class="tx-attach-size-up"></span>/<span id="tx_attach_max_size"></span></li>
						  <li id="tx_attach_tools" class="tx-attach-tools"></li>
						</ul>
						<ul id="tx_attach_list" class="tx-attach-list"></ul>
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
	<script type="text/javascript">
		var config = {
			txHost: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
			txPath: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
			txService: 'sample', /* 수정필요없음. */
			txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
			initializedId: "", /* 대부분의 경우에 빈문자열 */
			wrapper: "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
			form: 'tx_editor_form'+"", /* 등록하기 위한 Form 이름 */
			txIconPath: "../images/editor/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
			txDecoPath: "../images/editor/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
			canvas: {
	            exitEditor:{
	                /*
	                desc:'빠져 나오시려면 shift+b를 누르세요.',
	                hotKey: {
	                    shiftKey:true,
	                    keyCode:66
	                },
	                nextElement: document.getElementsByTagName('button')[0]
	                */
	            },
				styles: {
					color: "#123456", /* 기본 글자색 */
					fontFamily: "굴림", /* 기본 글자체 */
					fontSize: "10pt", /* 기본 글자크기 */
					backgroundColor: "#fff", /*기본 배경색 */
					lineHeight: "1.5", /*기본 줄간격 */
					padding: "8px" /* 위지윅 영역의 여백 */
				},
				showGuideArea: false
			},
			events: {
				preventUnload: false
			},
			sidebar: {
				attachbox: {
					show: true,
					confirmForDeleteAll: true
				}
			},
			size: {
				contentWidth: 760 /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
			}
		};

		EditorJSLoader.ready(function(Editor) {
			var editor = new Editor(config);
		});
	</script>
  </body>
</html>