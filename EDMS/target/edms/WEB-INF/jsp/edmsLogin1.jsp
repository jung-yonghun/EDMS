<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf-8" />
	<meta name="description" content="">
	<meta name="keyword" content="">
	<script type="text/javascript">
		function getContextPath(){
			var offset	= location.href.indexOf(location.host)+location.host.length;
			var ctxPath	= location.href.substring(offset,location.href.indexOf('/',offset+1));

			return ctxPath;
		}

		function actionLogin() {
			document.loginForm1.action = getContextPath()+"/loginAction";
			document.loginForm1.submit();
		}
	</script>
  </head>
  <body onload="javascript:actionLogin();">
    <div>
		<form id="loginForm1" name="loginForm1" method="post">
		<input id="userId" type="hidden"  name="userId"  value="yhjung">
		<input id="userPw" type="hidden"  name="userPw"  value="22">
		<input id="check"  type="hidden"  name="check"   value="1">
		</form>
	</div>
  </body>
</html>