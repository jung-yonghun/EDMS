package com.edms.commons;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * The type Cmmn error response.
 */
@Data
public class CmmnErrorResponse {
  private String message;
  private String code;
  private List<FieldError> errors;

  /**
   * The type Field error.
   */
  public static class FieldError {
	private String field;
	private String value;
	private String reason;
  }

  /**
   * Handle exception cmmn error response.
   *
   * @param e the e
   * @return the cmmn error response
   */
  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public CmmnErrorResponse handleException(Exception e) {
	CmmnErrorResponse errorResponse = new CmmnErrorResponse();
	errorResponse.setMessage(e.getMessage());
	errorResponse.setCode(e.getCause().toString());
	return errorResponse;
  }
}