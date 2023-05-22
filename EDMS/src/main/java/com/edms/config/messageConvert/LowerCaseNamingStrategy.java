package com.edms.config.messageConvert;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;

public class LowerCaseNamingStrategy extends PropertyNamingStrategy.LowerCaseStrategy {

  private static final long serialVersionUID = 1L;

  @Override
  public String translate(String arg0) {
	return arg0.toUpperCase();
  }
}
