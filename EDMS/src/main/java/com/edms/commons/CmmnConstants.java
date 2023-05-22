package com.edms.commons;

public class CmmnConstants {
  public final static String SESSION_ID 			= "ID"; 				// UserID Key
  public final static String SESSION_MNGNO 			= "MNGNO"; 				// MNGNO
  public final static String SESSION_USERID 		= "USERID"; 			// UserID
  public final static String SESSION_USERNAME 		= "USERNAME"; 			// User Name
  public final static String SESSION_GRADE 			= "USERGRADE"; 			// UserGradeA
  public final static String SESSION_DEFAULTDB 		= "DEFAULTDB"; 			// DEFAULTDB
  public final static String SESSION_MAIL 			= "USERMAIL"; 			// User e-Mail
  public final static String SESSION_MENU_AUTH 		= "SESSION_MENU_AUTH"; 	// SESSION_MENU_AUTH
  public final static String SESSION_SERVER_GUBUN 	= "SERVER_GUBUN"; 		// 서버구분(STAGE/DEV/LOCAL)
  public final static String SESSION_ENV_ROWNUM 	= "30"; 				// row number 환경설정
  public final static String SESSION_SERVER_IP 		= "SERVERIP"; 			// 서버IP
  public final static String SESSION_CLIENT_IP 		= "CLIENTIP"; 			// 클라이언트IP
  public final static String SESSION_DEPART 		= "USERDEPART"; 		// 사용자부서

  // Error Return Code
  public final static String ECODE_SUCCESS 		= "0"; 		// Success
  public final static String ECODE_FAILURE 		= "-1"; 	// Fail
  public final static String ECODE_TIMEOUT 		= "-2"; 	// Session Timeout
  public final static String ECODE_ACCESS_DENY 	= "-3"; 	// Access Denied
  public final static String ECODE_ERROR_STATUS = "-99"; 	// error status

  // return code
  public final static int ERROR_STATE_SUCCESS = 0; 	// Success
  public final static int ERROR_STATE_FAILURE = -1; // Fail

  // paging
  public final static long PAGE_NUMBER_INIT = 0; 	// page number
  public final static long PAGE_SIZE 		= 20; 	// page size
}