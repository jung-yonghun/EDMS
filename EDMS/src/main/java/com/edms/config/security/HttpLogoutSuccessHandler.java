package com.edms.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

@Configuration
public class HttpLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {
  @Autowired
  private MessageSource messageSource;

  @Value("${login.page}")
  public String loginPagePath;

  @Override
  public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
							  Authentication authentication) throws IOException, ServletException {
	setDefaultTargetUrl(loginPagePath + "?resultMsg=" + messageSource.getMessage("success.logout.msg", null, null, Locale.KOREA));
	//below does the 'standard' spring logout handling
	super.onLogoutSuccess(request, response, authentication);
  }
}