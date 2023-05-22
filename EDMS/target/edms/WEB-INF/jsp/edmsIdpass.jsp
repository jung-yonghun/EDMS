<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/include/head_title.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleCss.jsp" %>
<%@ include file="/WEB-INF/jsp/include/head_titleJs.jsp" %>
	<script type="text/javascript" src="<c:url value='/js/sein/edmsIdpass.js'/>"></script>
  </head>
  <body oncontextmenu="return false">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
			    <div class="easyui-layout" style="width:313px;height:315px">
			      <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
			        <div class="easyui-tabs" data-options="fit:true,plain:true">
			  	      <div title="ID 찾기" >
					  	<div class="hsnew_C02_table" style="margin-left:10px">
			  	        <form id="idForm" name="idForm">
						  <table>
					   	    <col width="25%"/>
                            <col width="75%"/>
                            <tr  height="23px">
                              <td class="left">이름 <i></i></td>
                              <td>
                                <input type="text" id="userNm" name="userNm" style="width:100%; ime-mode:active;">
                              </td>
                            </tr>
                            <tr  height="23px">
                              <td class="left">이메일 <i></i></td>
                              <td>
                                <input type="text" id="email" name="email" style="width:100%; ime-mode:inactive;">
                              </td>
                            </tr>
                          </table>
                        </form>
                        <a href="javascript:fn_idcheck();" class="easyui-linkbutton" style="width:49%;background:#ffffff;color:#0000ff;">찾기</a>
					    <a href="javascript:cancelAction();" class="easyui-linkbutton" style="width:49%;background:#ffffff;color:#ff0000;">취소</a>
                        </div>
                      </div>
                      <div title="PW 찾기">
					  	<div class="hsnew_C02_table" style="margin-left:10px">
			  	        <form id="passForm" name="passForm">
						  <table>
					   	    <col width="25%"/>
                            <col width="75%"/>
                            <tr height="23px">
                              <td class="left">ID <i></i></td>
                              <td>
                                <input type="text" id="userId" name="userId" style="width:100%; ime-mode:inactive;">
                              </td>
                            </tr>
                            <tr height="23px">
                              <td class="left">이름 <i></i></td>
                              <td>
                                <input type="text" id="userNm" name="userNm" style="width:100%; ime-mode:active;">
                              </td>
                            </tr>
                            <tr height="23px">
                              <td class="left">이메일 <i></i></td>
                              <td>
                                <input type="text" id="email" name="email" style="width:100%; ime-mode:inactive;">
                              </td>
                            </tr>
                          </table>
                        </form>
                        <a href="javascript:fn_passCheck();" class="easyui-linkbutton" style="width:49%;background:#ffffff;color:#0000ff;">찾기</a>
					    <a href="javascript:cancelAction();" class="easyui-linkbutton" style="width:49%;background:#ffffff;color:#ff0000;">취소</a>
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
    <div id="dlg" class="easyui-window" title="알림" data-options="modal:true,closed:true" style="width:200px;height:70px;padding:10px;text-align:center"></div>
  </body>
</html>