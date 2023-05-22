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
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/easyui/easyui.css'/>"/>
	<style>
		html,body {height:100%; margin:0; padding:0;}
		#contents {min-height:100%;}
	</style>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery-1.11.2.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/jquery.easyui.min.js'/>"></script>
	<script>
		function setTabs(){
			$('#tt').tabs({
		        plain: true,
		        narrow: true
		    });

		    var title = 'Main';
		    if($('#tt').tabs('exists', title)){
		    	$('#tt').tabs('select', title);
		   	}else{
		       	var content = '<iframe scrolling="auto" frameborder="0"  src="mainContents.geows" style="width:100%;height:99%;"></iframe>';
		       	$('#tt').tabs('add',{
		        	title:title,
		           	content:content
		       	});
		   	}
		}

		function addTab(title, url){
			if($('#tt').tabs('exists', title)){
		    	$('#tt').tabs('select', title);
		    }else{
		        var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:99%;"></iframe>';
		        $('#tt').tabs('add',{
		            title:title,
		            content:content,
		            closable:true
		        });
		    }
		}

		function close(title){
			$('#tt').tabs('close', title);
		}
	</script>
  </head>
  <body onload="setTabs()">
	<div id="tt" class="easyui-tabs" style="width:100%;height:100%;font-family:tahoma, '맑은 고딕', 맑은 고딕;"></div>
  </body>
</html>