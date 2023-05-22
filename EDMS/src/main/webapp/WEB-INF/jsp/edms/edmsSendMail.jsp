<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_css.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_js.jsp" %>
    <script type="text/javascript" src="<c:url value='/js/sein/edms/edmsSendMail.js'/>"></script>
    <link rel="stylesheet" href="<c:url value='/css/editor/editor.css'/>" type="text/css" charset="utf-8"/>
    <script src="<c:url value='/js/sein/editor/editor_loader.js'/>" type="text/javascript" charset="utf-8"></script>
  </head>
  <body oncontextmenu="return false">
    <table width="700px" style="margin-top:5px; margin-left:5px; margin-right:5px;">
      <tr>
      	<td width="700px" valign="top">
		<form id="tx_editor_form" name="tx_editor_form" accept-charset="utf-8" enctype="multipart/form-data" method="POST" action="../apis/edms/upMailer">
		<input type="hidden" id="USERNAME" 	name="USERNAME" value="${sessionScope.USERNAME}">
		<div style="margin-top:5px;margin-bottom:5px;">
	  		<button id="sendBtn" type="button" class="btn btn-warning btn-xs" onclick="fnCheckInput()"><font color="black">전송</font></button>
	    </div>
		<table id="searchArea" class="table table-striped table-bordered">
		  <col width="20%" />
		  <col width="80%" />
		  <tr>
	      	<td class="warning text-center">보내는 사람</td>
	      	<td>
	      	  <input type="text" id="sender" name="sender" class="input-sm" style="width:100%;" value="${sessionScope.USERMAIL}"/>
	      	</td>
	      </tr>
	      <tr>
	      	<td class="warning text-center">받는 사람</td>
	      	<td>
	      	  <input type="text" id="receiver" name="receiver" class="input-sm" style="width:100%;"/>
	      	</td>
	      </tr>
	      <tr>
	      	<td class="warning text-center">제목</td>
	      	<td>
	      	  <input type="text" id="mailTitle" name="mailTitle" class="input-sm" style="width:100%;ime-mode:active;"/>
	      	  <textarea type="text" id="mailContent" name="mailContent" rows="10" cols="100" style="width:766px; height:412px;display: none;"></textarea>
	      	</td>
	      </tr>
		  <tr>
			<td colspan="2">
			<div id="tx_trex_container" class="tx-editor-container">
				  <div id="tx_sidebar" class="tx-sidebar">
					<div class="tx-sidebar-boundary">
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
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg	tx-specialchar" id="tx_specialchar">
						  <a href="javascript:;" class="tx-icon" title="특수문자">특수문자</a>
						</div>
						<div id="tx_specialchar_menu" class="tx-specialchar-menu tx-menu"></div>
					  </li>
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
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-background" id="tx_background">
						  <a href="javascript:;" class="tx-icon" title="배경색">배경색</a>
						</div>
						<div id="tx_background_menu" class="tx-menu tx-background-menu tx-colorpallete" unselectable="on"></div>
					  </li>
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
				  </div>
				</div>
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
			  <div id='parentDiv1'>
				<table id="fileGrid"></table>
		    	<div id="filePager"></div>
			  </div>
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
			</td>
		  </tr>
		  <tr>
			<td class="warning text-center">파일</td>
			<td>
			  <input type="file" id="mailFile" name="mailFile" class="input-sm" style="width:100%;" onchange="document.tx_editor_form.inFile.value=this.value"/>
			  <input type="hidden" id="inFile" name="inFile" class="input-sm" style="width:100%;"/>
			</td>
		  </tr>
		</table>
      	</td>
      	</form>
      </tr>
  	</table>
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
			}
		};

		EditorJSLoader.ready(function(Editor) {
			var editor = new Editor(config);
		});
	</script>
  </body>
</html>