//package com.edms.web.edms;
//
//import com.edms.biz.edmsManagement.EdmsFileDTO;
//import com.edms.biz.edmsManagement.EdmsMasterDao;
//import com.edms.biz.edmsManagement.EdmsFileDao;
//import com.edms.biz.edmsManagement.EdmsSendMailLogDao;
//import com.edms.biz.edmsManagement.EdmsManagementService;
//import com.edms.biz.edmsManagement.LogFileDao;
//import com.edms.biz.edmsManagement.SysAttachFileDao;
//import com.edms.commons.*;
//import com.edms.domains.EdmsAttachFileVO;
//import com.edms.domains.EdmsMasterVO;
//import com.edms.domains.EdmsSendMailLogVO;
//import com.edms.domains.LogFileVO;
//import com.edms.domains.UserTeamXCustomerVO;
//import com.edms.domains.DeliveryCarryingInVO;
//import com.edms.domains.DeliveryRequestVO;
//import com.edms.domains.SysNoticeVO;
//import com.edms.domains.SysAttachFileVO;
//
//import org.apache.commons.lang3.math.NumberUtils;
//import org.apache.commons.validator.routines.EmailValidator;
//import org.apache.tomcat.util.http.fileupload.IOUtils;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.MessageSource;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.transaction.annotation.Propagation;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.validation.ConstraintViolation;
//
//import java.io.*;
//import java.math.BigDecimal;
//import java.util.*;
//import java.util.stream.Collectors;
//import java.nio.channels.FileChannel;
//
//import static com.edms.commons.CmmnUtils.getUserInfo;
//import static com.edms.commons.CmmnUtils.isCommonValid;
//
//import java.net.HttpURLConnection;
//import java.net.URL;
//
//
///**
// * The type Edms file controller.
// */
//@RestController
//@RequestMapping(value = {"/apis/edms"}, method = {RequestMethod.POST})
//public class EdmsControllerBack extends CmmnController {
//  @Autowired
//  private EdmsManagementService edmsManagementService;
//  @Autowired
//  private LogFileDao logFileDao;
//  @Autowired
//  private EdmsMasterDao edmsMasterDao;
//  @Autowired
//  private EdmsFileDao edmsFileDao;
//  @Autowired
//  private EdmsSendMailLogDao edmsSendMailLogDao;
//  @Autowired
//  private SysAttachFileDao sysAttachFileDao;
//  @Autowired
//  private CmmnMailService cmmnMailService;
//
//  @Autowired
//  private ModelMapper modelMapper;
//  @Autowired
//  private MessageSource messageSource;
//  /**
//   * The Edms file upload path.
//   */
//  @Value("${upload.path.edms}")
//  public String edmsFileUploadPath;
//
//  @Value("${paper.path.edms}")
//  public String paperFileUploadPath;
//  /**
//   * The Edms file deleted path.
//   */
//  @Value("${deleted.path.edms}")
//  public String edmsFileDeletedPath;
//  /**
//   * The Sein company tax num.
//   */
//  @Value("${com.sein.taxnum}")
//  public String seinCompanyTaxNum;
//
//  /**
//   * Gets edms master list.(edms 마스터 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms master list
//   */
//  @RequestMapping(value = "/getEdmsMasterList")
//  public ResponseEntity<?> getEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<EdmsMasterVO> list = edmsManagementService.getEdmsMasterList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms master info response entity.(edms 마스터 저장)
//   *
//   * @param request the request
//   * @param map     the map
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping("/saveEdmsMasterInfo")
//  public ResponseEntity<?> saveEdmsMasterInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  Map targetMap = map;
//	  String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	  EdmsMasterVO edmsMasterVO = CmmnUtils.convertMapToBean(targetMap, EdmsMasterVO.class);
//
//	  EdmsMasterVO newedmsMasterVO = edmsMasterDao.findTop1ByEdmsKey(edmsMasterVO.getEdmsKey());
//
//	  if(!CmmnUtils.isNull(edmsMasterVO.getUseYn())){
//		  newedmsMasterVO.setUseYn(edmsMasterVO.getUseYn());
//	  }
//	  if(!CmmnUtils.isNull(edmsMasterVO.getEditDay())){
//		  newedmsMasterVO.setEditDay(edmsMasterVO.getEditDay());
//	  }
//	  if(!CmmnUtils.isNull(edmsMasterVO.getTeamCode())){
//		  newedmsMasterVO.setTeamCode(edmsMasterVO.getTeamCode());
//	  }
//	  if(!CmmnUtils.isNull(edmsMasterVO.getEditUserId())){
//		  newedmsMasterVO.setEditUserId(newedmsMasterVO.getAddUserId());
//	  }else{
//		  newedmsMasterVO.setEditUserId(userId);
//	  }
//	  if(!CmmnUtils.isNull(edmsMasterVO.getEditUserName())){
//		  newedmsMasterVO.setEditUserName(newedmsMasterVO.getAddUserName());
//	  }else{
//		  newedmsMasterVO.setEditUserName(userNm);
//	  }
//	  // 관리번호(임시)
//	  if(CmmnUtils.isNull(newedmsMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(newedmsMasterVO.getAddDay())){
//		  newedmsMasterVO.setEdmsManagementNum("00000000000000");
//	  }
//	  EdmsMasterVO returnVO = edmsManagementService.saveEdmsMaster(newedmsMasterVO, request);
//	  return new ResponseEntity<>(returnVO, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms master list response entity.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   */
//  @RequestMapping(value = "/saveEdmsMasterList")
//  public ResponseEntity<?> saveEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
//	  List<EdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsMasterVO.class);
//	  List<EdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms is master.(edmsGubun별 마스터 존재여부 체크)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms is master
//   */
//  @RequestMapping(value = "/getEdmsIsMaster")
//  public ResponseEntity<?> getEdmsIsMaster(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  EdmsMasterVO isMasterList = edmsManagementService.getEdmsIsMaster(args);
//	  return new ResponseEntity<>(isMasterList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms master with file list.(edms 마스터X파일 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms master with file list
//   */
//  @RequestMapping(value = "/getEdmsMasterWithFileList")
//  public ResponseEntity<?> getEdmsMasterWithFileList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getEdmsMasterWithFileList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms master with not classification file list.(edms 마스터X미구분파일 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms master with not classification file list
//   */
//  @RequestMapping(value = "/getEdmsMasterWithNotClassificationFileList")
//  public ResponseEntity<?> getEdmsMasterWithNotClassificationFileList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  String edmsGubun = String.valueOf(args.get("edmsGubun"));
//
//	  if(edmsGubun.equals("IMPORT")){
//		  List<Map> list = edmsManagementService.getEdmsMasterWithNotClassificationFileList(args);
//		  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//		  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	  }else{
//		  List<Map> list = edmsManagementService.getEdmsMasterExWithNotClassificationFileList(args);
//		  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//		  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	  }
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/getfindEdmsMasterList")
//  public ResponseEntity<?> getfindEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getfindEdmsMasterList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms master status group count list.(edms 마스터 상태 그룹별 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms master status group count list
//   */
//  @RequestMapping(value = "/getEdmsMasterStatusGroupCountList")
//  public ResponseEntity<?> getEdmsMasterStatusGroupCountList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getEdmsMasterStatusGroupCountList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms file info list.(edms 파일 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms file info list
//   */
//  @RequestMapping(value = "/getEdmsFileInfoList")
//  public ResponseEntity<?> getEdmsFileInfoList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<EdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/getEdmsFileDownList")
//  public ResponseEntity<?> getEdmsFileDownList(HttpServletRequest request, @RequestBody Map args) {
//    if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  String edmsGubun = String.valueOf(args.get("edmsGubun"));
//
//	  List<Map> list = edmsManagementService.getEdmsFileDownFileList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms file group count list.(edms 파일 groupByName별 카운트 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms file group count list
//   */
//  @RequestMapping(value = "/getEdmsFileGroupCountList")
//  public ResponseEntity<?> getEdmsFileGroupCountList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  Map result = null;
//	  List<EdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
//	  String groupByName = String.valueOf(args.get("groupByName"));
//
//	  if (groupByName.equals("edmsFileCategory")) {
//		result = list.stream()
//				.collect(Collectors.groupingBy(EdmsAttachFileVO::getEdmsFileCategory, Collectors.counting()));
//	  } else if (groupByName.equals("edmsFileStatus")) {
//		result = list.stream()
//				.collect(Collectors.groupingBy(EdmsAttachFileVO::getEdmsFileStatus, Collectors.counting()));
//	  }
//
//	  return new ResponseEntity(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms file info response entity.(edms 파일 저장)
//   */
//  @RequestMapping("/saveEdmsFileInfo")
//  public ResponseEntity<?> saveEdmsFileInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  String userId 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  String userName 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//
//	  // validation
//	  Map targetMap = map;
//	  EdmsAttachFileVO edmsAttachFileVO = CmmnUtils.convertMapToBean(targetMap, EdmsAttachFileVO.class);
//	  EdmsAttachFileVO newedmsAttachFileVO = edmsFileDao.findTop1ByEdmsFileKey(edmsAttachFileVO.getEdmsFileKey());
//
//	  newedmsAttachFileVO.setEdmsParentGubun(edmsAttachFileVO.getEdmsParentGubun());
//	  newedmsAttachFileVO.setEdmsParentKey(edmsAttachFileVO.getEdmsParentKey());
//	  newedmsAttachFileVO.setEdmsFileCategory(edmsAttachFileVO.getEdmsFileCategory());
//	  newedmsAttachFileVO.setEdmsSearchKeyword(edmsAttachFileVO.getEdmsSearchKeyword());
//	  newedmsAttachFileVO.setEdmsFileNote(edmsAttachFileVO.getEdmsFileNote());
//	  newedmsAttachFileVO.setAddUserId(userId);
//	  newedmsAttachFileVO.setEditUserId(userId);
//	  newedmsAttachFileVO.setEditUserNm(userName);
//	  EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(newedmsAttachFileVO, request);
//	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms file list response entity.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   */
//  @RequestMapping(value = "/saveEdmsFileList")
//  public ResponseEntity<?> saveEdmsFileList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
//	  List<EdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsAttachFileVO.class);
//	  List<EdmsAttachFileVO> returnVoList = edmsManagementService.saveEdmsFileList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets expo invoice list.(edms 수출 INV 조회. ncustoms.Expo1 기준)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the expo invoice list
//   */
//  @RequestMapping(value = "/getExpoInvoiceList")
//  public ResponseEntity<?> getExpoInvoiceList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getExpoInvoiceList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Fix edms not classification response entity.(edms 미분류 내역 수정)
//   * 미분류 수정시 _allFileTransfer가 "Y"면 1.기존 마스터 삭제(useYn:N) → 신규 마스터 저장(fixEdmsGubun)
//   * 미분류 수정시 _allFileTransfer가 "N"면 유지 → 신규 마스터 저장(fixEdmsGubun)
//   * 리턴값은 기존마스터,신규마스터,기존미분류파일리스트,분류된파일리스트
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/fixEdmsNotClassification")
//  public ResponseEntity<?> fixEdmsNotClassification(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	List<EdmsAttachFileVO> newEdmsAttachFileVO = new ArrayList<>();
//	EdmsAttachFileVO edmsAttachFileVO		= new EdmsAttachFileVO();
//	EdmsAttachFileVO newedmsAttachFileVO 	= new EdmsAttachFileVO();
//	Map returnMap = new HashMap(), returnResponseEntity = new HashMap();
//	String uploadPathType = edmsFileUploadPath, newEdmsGubun = null;
//	BigDecimal newEdmsKey = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//	String fixEdmsGubun = String.valueOf(args.get("newEdmsGubun"));
//	String allFileTransfer = String.valueOf(args.get("_allFileTransfer"));
//
//	try {
//	  // 1. 입력 체크(master, fileList)
//	  // 미분류masterVO
//	  Map edmsMasterMap = (Map) args.get("edmsMaster");
//	  EdmsMasterVO notClassificationMasterVO = modelMapper.map(edmsMasterMap, EdmsMasterVO.class);
//	  notClassificationMasterVO.setAddUserId(userId);
//	  notClassificationMasterVO.setEditUserId(userId);
//	  notClassificationMasterVO.setAddUserName(userName);
//	  notClassificationMasterVO.setEditUserName(userName);
//	  notClassificationMasterVO.setAddDtm(currentDatetime);
//	  // 관리번호(임시)
//	  if (CmmnUtils.isNull(notClassificationMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(notClassificationMasterVO.getAddDay())) {
//		notClassificationMasterVO.setEdmsManagementNum("00000000000000");
//	  }
//
//	  // 미분류 파일리스트
//	  List<EdmsAttachFileVO> notClassificationFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList1 = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
//	  for (int i = 0, n = jsonList1.size(); i < n; i++) {
//		edmsAttachFileVO = modelMapper.map(jsonList1.get(i), EdmsAttachFileVO.class);
//		newedmsAttachFileVO = edmsFileDao.findTop1ByEdmsFileKey(edmsAttachFileVO.getEdmsFileKey());
//		newedmsAttachFileVO.setEditUserId(userId);
//		notClassificationFileVOList.add(newedmsAttachFileVO);
//	  }
//	  // 2. master 저장/신규 master 리턴
//	  // 미분류master validation
//	  if (CmmnUtils.isNull(String.valueOf(args.get("yyyymmdd"))) || CmmnUtils.isNull(fixEdmsGubun)) {
//		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  }
//
//	  switch (fixEdmsGubun) {
//		case "IMPORT":
//		case "EXPORT":
//		case "SEINETC":
//		case "HWANGUP":
//		  if (!CmmnUtils.isNull(notClassificationMasterVO.getEdmsNum())) {
//			//  _allFileTransfer가 "Y"면 기존 미분류내역을 삭제(useYn:N)하고, 신규 edmsMaster 입력(구분은 fixEdmsGubun)
//			//  _allFileTransfer가 "N"면 기존 미분류내역을 유지하고, 신규 edmsMaster 입력(구분은 fixEdmsGubun)
//			// TODO: 2016-09-23 신규로 입력 안하고 수정할꺼면 안해도 됨
//			returnMap = edmsManagementService.fixEdmsNotClassification(notClassificationMasterVO, fixEdmsGubun, allFileTransfer, request);
//			// 신규로 입력된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		default:
//		  break;
//	  }
//	  if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  // 3. fileList 수정/수정된 결과 리턴
//	  // 변경할 기존 매핑 파일리스트
//	  List<EdmsAttachFileVO> fileVOs = notClassificationFileVOList;
//	  for (EdmsAttachFileVO fileVO : fileVOs) {
//		// 파일 수정(부모키, 부모구분)
//		fileVO.setEdmsParentKey(newEdmsKey);
//		fileVO.setEdmsParentGubun(newEdmsGubun);
//		fileVO.setEditUserId(userId);
//		EdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(fileVO, request);
//		newEdmsAttachFileVO.add(attachFileVO);
//		// 로그 저장
//		saveFileLogInfo(attachFileVO, request, "edms미분류수정");
//	  }
//	  // 4. 결과값 리턴
//	  returnResponseEntity.put("oldEdmsMasterVO", args.get("edmsMaster"));
//	  returnResponseEntity.put("newEdmsMasterVO", returnMap.get("edmsMasterVO"));
//	  //returnResponseEntity.put("oldEdmsAttachFileVOList", returnMap.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("oldEdmsAttachFileVOList", args.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("newEdmsAttachFileVOList", newEdmsAttachFileVO);
//	  return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Modify edms all info response entity.(edms Master & fileList 수정)
//   * <p>
//   * EDMS구분(IMPORT/EXPORT), EDMS미구분(NOTCLASS/SEINETC/HWANGUP)
//   * <p>
//   * 1. 신규 분류가 구분일 경우..
//   * 1-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
//   * 1-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
//   * <p>
//   * 2. 신규 분류가 미구분일 경우..
//   * 2-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
//   * 2-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
//   * <p>
//   * 리턴값은 기존마스터,신규마스터,기존파일리스트,분류된파일리스트
//   *
//   * @param request the request
//   * @param map     the map
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/modifyEdmsAllInfo")
//  public ResponseEntity<?> modifyEdmsAllInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	List<EdmsAttachFileVO> newEdmsAttachFileVO = new ArrayList<>();
//	Map returnMap = new HashMap(), returnResponseEntity = new HashMap();
//	String uploadPathType = edmsFileUploadPath, newEdmsGubun = null;
//	BigDecimal newEdmsKey = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String fixEdmsGubun = String.valueOf(map.get("newEdmsGubun"));
//	String allFileTransferYn = String.valueOf(map.get("_allFileTransferYn"));
//	String yyyymmdd = String.valueOf(map.get("yyyymmdd"));
//	BigDecimal oldSavedEdmsMasterKey = NumberUtils.createBigDecimal(String.valueOf(map.get("oldSavedEdmsMasterKey")));
//
//	try {
//	  // 1. 입력 체크(master, fileList)
//	  // 신규 masterVO
//	  EdmsMasterVO newMasterVO = modelMapper.map(map.get("edmsMaster"), EdmsMasterVO.class);
//	  newMasterVO.setAddUserId(userId);
//	  newMasterVO.setEditUserId(userId);
//	  newMasterVO.setAddUserName(userName);
//	  newMasterVO.setEditUserName(userName);
//	  // 관리번호(임시)
//	  if (CmmnUtils.isNull(newMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(newMasterVO.getAddDay())) {
//		newMasterVO.setEdmsManagementNum("00000000000000");
//	  }
//	  Set<ConstraintViolation<EdmsMasterVO>> validator = isCommonValid(newMasterVO);
//	  if (validator.size() > 0) {
//		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
//	  }
//
//	  // 수정할 파일리스트
//	  List<EdmsAttachFileVO> modifyFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList2 = CmmnUtils.convertMapSourceToList(map, "edmsAttachFileVOList");
//	  for (int i = 0, n = jsonList2.size(); i < n; i++) {
//		EdmsAttachFileVO edmsAttachFileVO = modelMapper.map(jsonList2.get(i), EdmsAttachFileVO.class);
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setEditUserId(userId);
//		Set<ConstraintViolation<EdmsAttachFileVO>> validatorFile = isCommonValid(edmsAttachFileVO);
//		if (validatorFile.size() > 0) {
//		  return new ResponseEntity<>(validatorFile, HttpStatus.BAD_REQUEST);
//		}
//		modifyFileVOList.add(edmsAttachFileVO);
//	  }
//
//	  // 2. master 저장/신규 master 리턴
//	  // master validation
//	  if (CmmnUtils.isNull(yyyymmdd) || CmmnUtils.isNull(fixEdmsGubun) || CmmnUtils.isNull(newMasterVO.getEdmsComKey()) || CmmnUtils.isNull(oldSavedEdmsMasterKey)) {
//		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  }
//
//	  switch (fixEdmsGubun) {
//		case "IMPORT":
//		case "EXPORT":
//		  if (!CmmnUtils.isNull(newMasterVO.getEdmsNum())) {
//			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
//			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		case "NOTCLASS":
//		case "SEINETC":
//		case "HWANGUP":
//		  if (!CmmnUtils.isNull(newMasterVO.getJisaCode())) {
//			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
//			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		default:
//		  break;
//	  }
//
//	  // 3. fileList 수정/수정된 결과 리턴
//	  if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  // 변경할 기존 매핑 파일리스트
//	  List<EdmsAttachFileVO> fileVOs = modifyFileVOList;
//	  for (EdmsAttachFileVO fileVO : fileVOs) {
//		// 파일 수정(부모키, 부모구분)
//		fileVO.setEdmsParentKey(newEdmsKey);
//		fileVO.setEdmsParentGubun(newEdmsGubun);
//		fileVO.setEditUserId(userId);
//		EdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(fileVO, request);
//		newEdmsAttachFileVO.add(attachFileVO);
//		// 로그 저장
//		saveFileLogInfo(attachFileVO, request, "edms미분류수정");
//	  }
//
//	  // 4. 결과값 리턴
//	  returnResponseEntity.put("oldEdmsMasterVO", map.get("edmsMaster"));
//	  returnResponseEntity.put("newEdmsMasterVO", returnMap.get("edmsMasterVO"));
//	  returnResponseEntity.put("oldEdmsAttachFileVOList", map.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("newEdmsAttachFileVOList", newEdmsAttachFileVO);
//	  return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Upload edms file response entity.(edms 파일 업로드)
//   * 모든 문서는 edms폴더에 저장
//   *
//   * @param mRequest the m request
//   * @param request  the request
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/uploadEdmsFile")
//  public ResponseEntity<?> uploadEdmsFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//	}
//	Map errMap = new HashMap<>();
//	EdmsAttachFileVO returnVO = new EdmsAttachFileVO();
//	EdmsAttachFileVO edmsAttachFileVO = new EdmsAttachFileVO();
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String serverGubun = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
//	String serverIpAddr = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
//	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//
//	Map convertMap = CmmnUtils.convertParameterMap(request);
//	EdmsMasterVO mappingMasterVO = CmmnUtils.convertMapToBean(convertMap, EdmsMasterVO.class);
//	mappingMasterVO.setAddUserId(userId);
//	mappingMasterVO.setAddUserName(userName);
//	mappingMasterVO.setAddDtm(currentDatetime);
//	mappingMasterVO.setEditUserId(userId);
//	mappingMasterVO.setEditUserName(userName);
//	// 2016-10-07 modelmapper 오류(예약어('Day'))를 인지하지 못해 해당 방법으로 처리(추후 개선예정)
//	if (!CmmnUtils.isNull(convertMap.get("iphangDay"))) mappingMasterVO.setIphangDay(String.valueOf(convertMap.get("iphangDay")));
//	if (!CmmnUtils.isNull(convertMap.get("banipDay"))) mappingMasterVO.setBanipDay(String.valueOf(convertMap.get("banipDay")));
//	if (!CmmnUtils.isNull(convertMap.get("singoDay"))) mappingMasterVO.setSingoDay(String.valueOf(convertMap.get("singoDay")));
//	if (!CmmnUtils.isNull(convertMap.get("suriDay"))) mappingMasterVO.setSuriDay(String.valueOf(convertMap.get("suriDay")));
//	if (!CmmnUtils.isNull(convertMap.get("banchulDay"))) mappingMasterVO.setBanchulDay(String.valueOf(convertMap.get("banchulDay")));
//	BigDecimal externalKey = !CmmnUtils.isNull(mRequest.getParameter("externalKey")) ? NumberUtils.createBigDecimal(mRequest.getParameter("externalKey")) : null;
//
//	// 파일정보 validation
//	if (CmmnUtils.isNull(mRequest.getParameter("yyyymmdd")) || CmmnUtils.isNull(mappingMasterVO.getEdmsGubun())) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//
//	String yyyymmdd = mRequest.getParameter("yyyymmdd");
//	String edmsGubun = mappingMasterVO.getEdmsGubun();
//	EdmsMasterVO edmsMasterVO;
//	String uploadPathType = edmsFileUploadPath; //모든 문서는 edms폴더에 저장
//	switch (edmsGubun) {
//	  case "IMPORT":
//	  case "EXPORT":
//	  case "SEINETC":
//	  case "HWANGUP":
//		//if (!CmmnUtils.isNull(mappingMasterVO.getEdmsNum())) {
//		//	System.out.println("aaaaaaaaaaa");
//		  edmsMasterVO = edmsManagementService.saveEdmsMasterForFileUpload(mappingMasterVO, externalKey, request);
//		//} else {
//		//	System.out.println("bbbbbbbbbbb");
//		//  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		//}
//		break;
//	  default:
////		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		if (!CmmnUtils.isNull(mappingMasterVO.getEdmsComName()) && !CmmnUtils.isNull(mappingMasterVO.getEdmsComKey())
//				&& !CmmnUtils.isNull(mappingMasterVO.getEdmsComCode()) && !CmmnUtils.isNull(mappingMasterVO.getEdmsComNum())
//				&& !CmmnUtils.isNull(mappingMasterVO.getJisaCode())) {
//		  edmsMasterVO = edmsManagementService.saveEdmsMasterForFileUpload(mappingMasterVO, externalKey, request);
//		} else {
//		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//		break;
//	}
//	if (CmmnUtils.isNull(edmsMasterVO)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//
//	edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//	edmsAttachFileVO.setEdmsParentGubun(edmsMasterVO.getEdmsGubun());
//	edmsAttachFileVO.setEdmsParentKey(edmsMasterVO.getEdmsKey());
//	edmsAttachFileVO.setAddDay(yyyymmdd);
//	edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//	edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//	edmsAttachFileVO.setEdmsSearchKeyword(mRequest.getParameter("edmsSearchKeyword"));
//	edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//	edmsAttachFileVO.setAddUserId(userId);
//	edmsAttachFileVO.setAddUserNm(userName);
//	edmsAttachFileVO.setAddDtm(currentDatetime);
//	edmsAttachFileVO.setEditUserId(userId);
//	edmsAttachFileVO.setEditUserNm(userName);
//
//	String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
//	File dir = new File(uploadPath);
//	if (!dir.isDirectory()) {
//	  dir.mkdirs();
//	}
//
//	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
//	Iterator<String> iter = map.keySet().iterator();
//	while (iter.hasNext()) {
//	  String str = iter.next();
//	  List<MultipartFile> fileList = map.get(str);
//	  for (MultipartFile mpf : fileList) {
//		String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
//		if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)) {
//		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//		long fileSize = mpf.getSize();
//		//String saveFileName = originalFileName;
//		String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
//		String body, ext;
//		long sysTime = System.currentTimeMillis();
//
//		if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//		  if (new File(uploadPath + saveFileName).exists()) {
//			int dot = saveFileName.lastIndexOf(".");
//			if (dot != -1) {
//			  body = saveFileName.substring(0, dot);
//			  ext = saveFileName.substring(dot); // includes "."
//			  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			  }
//			  saveFileName = body + "_" + sysTime + ext;
//			} else {
//			  saveFileName = saveFileName + "_" + sysTime;
//			}
//		  }
//
//		  try {
//			mpf.transferTo(new File(uploadPath + saveFileName));
//			// 파일정보
//			edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//			edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//			edmsAttachFileVO.setEdmsFilePath(uploadPath);
//			edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//			edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//			edmsAttachFileVO.setUseYn("Y");
//			edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//			edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//			EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//			returnVO = saveAttachFile(saveVO, request);
//		  } catch (IllegalStateException e) {
//			e.printStackTrace();
//			errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//			errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//			errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//			errMap.put("_errorCause", "IllegalStateException");
//			return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//		  } catch (IOException e) {
//			e.printStackTrace();
//			errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//			errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//			errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//			errMap.put("_errorCause", "IOException");
//			return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//		  }
//		}
//	  }
//	}
//
//	return new ResponseEntity<>(returnVO, HttpStatus.OK);
//  }
//
//  /**
//   * Upload edms file response entity.(edms 파일 업로드)
//   * 모든 문서는 edms폴더에 저장
//   *
//   * @param mRequest the m request
//   * @param request  the request
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/uploadEdmsPaperFile")
//  public ResponseEntity<?> uploadEdmsPaperFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//	}
//	Map errMap = new HashMap<>();
//	EdmsAttachFileVO returnVO = new EdmsAttachFileVO();
//	EdmsAttachFileVO edmsAttachFileVO = new EdmsAttachFileVO();
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String serverGubun = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
//	String serverIpAddr = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
//	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//	String yyyymmdd = mRequest.getParameter("yyyymmdd");
//	String uploadPathType = edmsFileUploadPath;
//	String jisa = "";
//	String singo = "";
//	String code = "";
//	String defaultDB = "";
//
//	String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
//	File dir = new File(uploadPath);
//	if (!dir.isDirectory()) {
//	  dir.mkdirs();
//	}
//
//	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
//	Iterator<String> iter = map.keySet().iterator();
//	while (iter.hasNext()) {
//	  String str = iter.next();
//	  List<MultipartFile> fileList = map.get(str);
//	  for (MultipartFile mpf : fileList) {
//		String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
//		if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)) {
//		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//		long fileSize = mpf.getSize();
//		//String saveFileName = originalFileName;
//		String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
//		String body, ext;
//		long sysTime = System.currentTimeMillis();
//		if(!originalFileName.substring(0,4).equals("IMP_") && !originalFileName.substring(0,4).equals("EXP_")){
//			if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//			  if (new File(uploadPath + saveFileName).exists()) {
//				int dot = saveFileName.lastIndexOf(".");
//				if (dot != -1) {
//				  body = saveFileName.substring(0, dot);
//				  ext = saveFileName.substring(dot); // includes "."
//				  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//				  }
//				  saveFileName = body + "_" + sysTime + ext;
//				} else {
//				  saveFileName = saveFileName + "_" + sysTime;
//				}
//			  }
//			  try {
//				mpf.transferTo(new File(uploadPath + saveFileName));
//				// 파일정보
//				edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//				edmsAttachFileVO.setEdmsParentGubun("PAPER");
//				edmsAttachFileVO.setEdmsParentKey(NumberUtils.createBigDecimal(String.valueOf(434)));
//				edmsAttachFileVO.setAddDay(yyyymmdd);
//				edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//				edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//				edmsAttachFileVO.setEdmsSearchKeyword(mRequest.getParameter("edmsSearchKeyword"));
//				edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//				edmsAttachFileVO.setAddUserId(userId);
//				edmsAttachFileVO.setAddUserNm(userName);
//				edmsAttachFileVO.setAddDtm(currentDatetime);
//				edmsAttachFileVO.setEditUserId(userId);
//				edmsAttachFileVO.setEditUserNm(userName);
//				edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//				edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//				edmsAttachFileVO.setEdmsFilePath(uploadPath);
//				edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//				edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//				edmsAttachFileVO.setUseYn("Y");
//				edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//				edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//				EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//				returnVO = saveAttachFile(saveVO, request);
//			  } catch (IllegalStateException e) {
//				e.printStackTrace();
//				errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//				errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//				errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//				errMap.put("_errorCause", "IllegalStateException");
//				return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//			  } catch (IOException e) {
//				e.printStackTrace();
//				errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//				errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//				errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//				errMap.put("_errorCause", "IOException");
//				return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//			  }
//			}
//		}else{
//			jisa  	= originalFileName.substring(4,9);
//			singo 	= originalFileName.substring(4,18);
//			System.out.println("#############"+jisa);
//    		if(originalFileName.substring(0,4).equals("EXP_")){
//    			if(jisa.equals("43518")){
//    				defaultDB = "ncustoms_ic";
//    			}else if(jisa.equals("42530")){
//    				defaultDB = "ncustoms_pj";
//    			}else if(jisa.equals("43494")){
//    				defaultDB = "ncustoms_sel4";
//    			}else if(jisa.equals("40629")){
//    				defaultDB = "ncustoms_pt";
//    			}else if(jisa.equals("42773")){
//    				defaultDB = "ncustoms_sn";
//    			}else if(jisa.equals("42119")){
//    				defaultDB = "ncustoms_yj";
//    			}else if(jisa.equals("43862")){
//    				defaultDB = "ncustoms_ca";
//    			}else if(jisa.equals("43618")){
//    				defaultDB = "ncustoms_cj";
//    			}else if(jisa.equals("42064")){
//    				defaultDB = "ncustoms_bs";
//    			}else if(jisa.equals("43466")){
//    				defaultDB = "ncustoms_us";
//    			}else if(jisa.equals("42095")){
//    				defaultDB = "ncustoms_gm";
//    			}else if(jisa.equals("43522")){
//    				defaultDB = "ncustoms_cw";
//    			}else if(jisa.equals("42526")){
//    				defaultDB = "ncustoms_jj";
//    			}else if(jisa.equals("43617")){
//    				defaultDB = "ncustoms_ys";
//    			}else if(jisa.equals("43518")){
//    				defaultDB = "ncustoms_ic";
//    			}else{
//    				defaultDB = "ncustoms_sel_040";
//    			}
//    			Map map1 = new HashMap();
//    			map1.put("_defaultDB", defaultDB);
//    			map1.put("singoNo", singo);
//
//    			List<Map> list = edmsManagementService.getExportPaperList(map1);
//    			if(list.size() > 0){
//    				String result = "";
//    				String edmsParentGubun = "EXPORT";
//    				BigDecimal edmsParentKey = NumberUtils.createBigDecimal(String.valueOf(list.get(0).get("edmsKey").toString()));
//    				String edmsSearchKeyword = singo;
//
//    				List<EdmsAttachFileVO> delFileList;
//    				Map delmap = new HashMap();
//    				delmap.put("edmsParentKey", edmsParentKey);
//    				delmap.put("edmsSearchKeyword", edmsSearchKeyword);
//    				delmap.put("edmsFileCategory", "B0001");
//    				delmap.put("useYn", "Y");
//    				delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//    				if (delFileList.size() > 0){
//    				}else{
//    					if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//						  if (new File(uploadPath + saveFileName).exists()) {
//							int dot = saveFileName.lastIndexOf(".");
//							if (dot != -1) {
//							  body = saveFileName.substring(0, dot);
//							  ext = saveFileName.substring(dot); // includes "."
//							  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//							  }
//							  saveFileName = body + "_" + sysTime + ext;
//							} else {
//							  saveFileName = saveFileName + "_" + sysTime;
//							}
//						  }
//
//						  try {
//							mpf.transferTo(new File(uploadPath + saveFileName));
//							// 파일정보
//							edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//							edmsAttachFileVO.setEdmsParentGubun("EXPORT");
//							edmsAttachFileVO.setEdmsParentKey(edmsParentKey);
//							edmsAttachFileVO.setAddDay(yyyymmdd);
//							edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//							edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//							edmsAttachFileVO.setEdmsSearchKeyword(edmsSearchKeyword);
//							edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//							edmsAttachFileVO.setAddUserId(userId);
//							edmsAttachFileVO.setAddUserNm(userName);
//							edmsAttachFileVO.setAddDtm(currentDatetime);
//							edmsAttachFileVO.setEditUserId(userId);
//							edmsAttachFileVO.setEditUserNm(userName);
//							edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//							edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//							edmsAttachFileVO.setEdmsFilePath(uploadPath);
//							edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//							edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//							edmsAttachFileVO.setUseYn("Y");
//							edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//							edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//							EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//							returnVO = saveAttachFile(saveVO, request);
//						  } catch (IllegalStateException e) {
//							e.printStackTrace();
//							errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//							errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//							errMap.put("_errorCause", "IllegalStateException");
//							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//						  } catch (IOException e) {
//							e.printStackTrace();
//							errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//							errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//							errMap.put("_errorCause", "IOException");
//							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//						  }
//						}
//    				}
//    			}else{
//    			  List<Map> list2 = edmsManagementService.getExportPaperList1(map1);
//    			  if(list2.size() > 0){
//    				if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//					  if (new File(uploadPath + saveFileName).exists()) {
//						int dot = saveFileName.lastIndexOf(".");
//						if (dot != -1) {
//						  body = saveFileName.substring(0, dot);
//						  ext = saveFileName.substring(dot); // includes "."
//						  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//							return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//						  }
//						  saveFileName = body + "_" + sysTime + ext;
//						} else {
//						  saveFileName = saveFileName + "_" + sysTime;
//						}
//					  }
//
//					  try {
//						mpf.transferTo(new File(uploadPath + saveFileName));
//						// 파일정보
//						edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//						edmsAttachFileVO.setEdmsParentGubun("PAPER");
//						edmsAttachFileVO.setEdmsParentKey(NumberUtils.createBigDecimal(String.valueOf(434)));
//						edmsAttachFileVO.setAddDay(yyyymmdd);
//						edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//						edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//						edmsAttachFileVO.setEdmsSearchKeyword(singo);
//						edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//						edmsAttachFileVO.setAddUserId(userId);
//						edmsAttachFileVO.setAddUserNm(userName);
//						edmsAttachFileVO.setAddDtm(currentDatetime);
//						edmsAttachFileVO.setEditUserId(userId);
//						edmsAttachFileVO.setEditUserNm(userName);
//						edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//						edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//						edmsAttachFileVO.setEdmsFilePath(uploadPath);
//						edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//						edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//						edmsAttachFileVO.setUseYn("Y");
//						edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//						edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//						EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//						returnVO = saveAttachFile(saveVO, request);
//					  } catch (IllegalStateException e) {
//						e.printStackTrace();
//						errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//						errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//						errMap.put("_errorCause", "IllegalStateException");
//						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//					  } catch (IOException e) {
//						e.printStackTrace();
//						errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//						errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//						errMap.put("_errorCause", "IOException");
//						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//					  }
//					}
//    			  }
//    			}
//    		}else{
//    			if(jisa.equals("43518")){
//    				defaultDB = "ncustoms_ic";
//    			}else if(jisa.equals("42530")){
//    				defaultDB = "ncustoms_pj";
//    			}else if(jisa.equals("43494")){
//    				defaultDB = "ncustoms_sel4";
//    			}else if(jisa.equals("40629")){
//    				defaultDB = "ncustoms_pt";
//    			}else if(jisa.equals("42773")){
//    				defaultDB = "ncustoms_sn";
//    			}else if(jisa.equals("42119")){
//    				defaultDB = "ncustoms_yj";
//    			}else if(jisa.equals("43862")){
//    				defaultDB = "ncustoms_ca";
//    			}else if(jisa.equals("43618")){
//    				defaultDB = "ncustoms_cj";
//    			}else if(jisa.equals("42064")){
//    				defaultDB = "ncustoms_bs";
//    			}else if(jisa.equals("43466")){
//    				defaultDB = "ncustoms_us";
//    			}else if(jisa.equals("42095")){
//    				defaultDB = "ncustoms_gm";
//    			}else if(jisa.equals("43522")){
//    				defaultDB = "ncustoms_cw";
//    			}else if(jisa.equals("42526")){
//    				defaultDB = "ncustoms_jj";
//    			}else if(jisa.equals("43617")){
//    				defaultDB = "ncustoms_ys";
//    			}else if(jisa.equals("43518")){
//    				defaultDB = "ncustoms_ic";
//    			}else{
//    				defaultDB = "ncustoms";
//    			}
//    			System.out.println("#############"+defaultDB);
//    			Map map1 = new HashMap();
//    			map1.put("_defaultDB", defaultDB);
//    			map1.put("singoNo", singo);
//
//    			List<Map> list = edmsManagementService.getImportPaperList(map1);
//    			if(list.size() > 0){
//    				String result = "";
//    				String edmsParentGubun = "IMPORT";
//    				BigDecimal edmsParentKey = NumberUtils.createBigDecimal(String.valueOf(list.get(0).get("edmsKey").toString()));
//    				String edmsSearchKeyword = singo;
//
//    				List<EdmsAttachFileVO> delFileList;
//    				Map delmap = new HashMap();
//    				delmap.put("edmsParentKey", edmsParentKey);
//    				delmap.put("edmsSearchKeyword", edmsSearchKeyword);
//    				delmap.put("edmsFileCategory", "B0001");
//    				delmap.put("useYn", "Y");
//    				delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//    				if (delFileList.size() > 0){
//    				}else{
//    					if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//						  if (new File(uploadPath + saveFileName).exists()) {
//							int dot = saveFileName.lastIndexOf(".");
//							if (dot != -1) {
//							  body = saveFileName.substring(0, dot);
//							  ext = saveFileName.substring(dot); // includes "."
//							  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//							  }
//							  saveFileName = body + "_" + sysTime + ext;
//							} else {
//							  saveFileName = saveFileName + "_" + sysTime;
//							}
//						  }
//
//						  try {
//							mpf.transferTo(new File(uploadPath + saveFileName));
//							// 파일정보
//							edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//							edmsAttachFileVO.setEdmsParentGubun("IMPORT");
//							edmsAttachFileVO.setEdmsParentKey(edmsParentKey);
//							edmsAttachFileVO.setAddDay(yyyymmdd);
//							edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//							edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//							edmsAttachFileVO.setEdmsSearchKeyword(singo);
//							edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//							edmsAttachFileVO.setAddUserId(userId);
//							edmsAttachFileVO.setAddUserNm(userName);
//							edmsAttachFileVO.setAddDtm(currentDatetime);
//							edmsAttachFileVO.setEditUserId(userId);
//							edmsAttachFileVO.setEditUserNm(userName);
//							edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//							edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//							edmsAttachFileVO.setEdmsFilePath(uploadPath);
//							edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//							edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//							edmsAttachFileVO.setUseYn("Y");
//							edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//							edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//							EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//							returnVO = saveAttachFile(saveVO, request);
//						  } catch (IllegalStateException e) {
//							e.printStackTrace();
//							errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//							errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//							errMap.put("_errorCause", "IllegalStateException");
//							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//						  } catch (IOException e) {
//							e.printStackTrace();
//							errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//							errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//							errMap.put("_errorCause", "IOException");
//							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//						  }
//						}
//    				}
//    			}else{
//    			  List<Map> list2 = edmsManagementService.getImportPaperList1(map1);
//        		  if(list2.size() > 0){
//    				if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//					  if (new File(uploadPath + saveFileName).exists()) {
//						int dot = saveFileName.lastIndexOf(".");
//						if (dot != -1) {
//						  body = saveFileName.substring(0, dot);
//						  ext = saveFileName.substring(dot); // includes "."
//						  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//							return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//						  }
//						  saveFileName = body + "_" + sysTime + ext;
//						} else {
//						  saveFileName = saveFileName + "_" + sysTime;
//						}
//					  }
//
//					  try {
//						mpf.transferTo(new File(uploadPath + saveFileName));
//						// 파일정보
//						edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//						edmsAttachFileVO.setEdmsParentGubun("PAPER");
//						edmsAttachFileVO.setEdmsParentKey(NumberUtils.createBigDecimal(String.valueOf(434)));
//						edmsAttachFileVO.setAddDay(yyyymmdd);
//						edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//						edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//						edmsAttachFileVO.setEdmsSearchKeyword(singo);
//						edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//						edmsAttachFileVO.setAddUserId(userId);
//						edmsAttachFileVO.setAddUserNm(userName);
//						edmsAttachFileVO.setAddDtm(currentDatetime);
//						edmsAttachFileVO.setEditUserId(userId);
//						edmsAttachFileVO.setEditUserNm(userName);
//						edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//						edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//						edmsAttachFileVO.setEdmsFilePath(uploadPath);
//						edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//						edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//						edmsAttachFileVO.setUseYn("Y");
//						edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//						edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//						EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//						returnVO = saveAttachFile(saveVO, request);
//					  } catch (IllegalStateException e) {
//						e.printStackTrace();
//						errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//						errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//						errMap.put("_errorCause", "IllegalStateException");
//						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//					  } catch (IOException e) {
//						e.printStackTrace();
//						errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//						errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//						errMap.put("_errorCause", "IOException");
//						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//					  }
//					}
//        		  }
//    			}
//    		}
//		}
//	  }
//	}
//
//	return new ResponseEntity<>(returnVO, HttpStatus.OK);
//  }
//
//  /**
//   * Download edms file.(edms 파일 다운로드)
//   *
//   * @param request         the request
//   * @param edmsFileKey     the edms file key
//   * @param edmsParentGubun the edms parent gubun
//   * @param edmsParentKey   the edms parent key
//   * @param edmsOrgFileName the edms org file name
//   * @param edmsNewFileName the edms new file name
//   * @param response        the response
//   * @throws UnsupportedEncodingException the unsupported encoding exception
//   */
//  @RequestMapping(value = "/downloadEdmsFile", method = {RequestMethod.GET})
//  public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "edmsFileKey") BigDecimal edmsFileKey,
//							   @RequestParam(value = "edmsParentGubun") String edmsParentGubun, @RequestParam(value = "edmsParentKey") BigDecimal edmsParentKey,
//							   @RequestParam(value = "edmsOrgFileName") String edmsOrgFileName, @RequestParam(value = "edmsNewFileName", required = false) String edmsNewFileName,
//							   HttpServletResponse response) throws UnsupportedEncodingException {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return;
//
//	if (CmmnUtils.isNull(edmsFileKey) || CmmnUtils.isNull(edmsParentGubun) || CmmnUtils.isNull(edmsParentKey) || CmmnUtils.isNull(edmsOrgFileName)) {
//	  return;
//	}
//
//	String downloadFileName, reqFilePath = null, reqFileName = null;
//
//	try {
//	  List<EdmsAttachFileVO> voList;
//	  Map args = new HashMap();
//	  args.put("edmsFileKey", edmsFileKey);
//	  args.put("edmsParentGubun", edmsParentGubun);
//	  args.put("edmsParentKey", edmsParentKey);
//	  args.put("edmsOrgFileName", edmsOrgFileName);
//	  voList = edmsManagementService.getEdmsFileList(args);
//	  if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");
//
//	  EdmsAttachFileVO returnVO = voList.get(0);
//	  // 로그 저장
//	  saveFileLogInfo(returnVO, request, "edms파일다운로드");
//
//	  // 다운로드 파일명 존재시 해당 파일명으로 다운로드
//	  downloadFileName = CmmnUtils.isNull(edmsNewFileName) ? returnVO.getEdmsOrgFileName() : edmsNewFileName;
//	  downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);
//
//	  reqFilePath = returnVO.getEdmsFilePath();
//	  reqFileName = returnVO.getEdmsSaveFileName();
//
//	  File fileToDownload = new File(reqFilePath + reqFileName);
//	  InputStream inputStream = new FileInputStream(fileToDownload);
//	  response.setContentType("application/force-download");
//	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//	  IOUtils.copy(inputStream, response.getOutputStream());
//	  response.flushBuffer();
//	  inputStream.close();
//	} catch (Exception e) {
//	  e.printStackTrace();
//	}
//  }
//
//  /**
//   * Archiving edms files response entity.(배치 압축 작업)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/archivingEdmsFiles")
//  public ResponseEntity<?> archivingEdmsFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//	String downloadFileName = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//
//	try {
////	  if (1 == 1) {
////		throw new Exception("edms배치압축작업권한없음");
////	  }
////	  // 배치다운로드 권한 확인
////	  UserEnvironmentSettingVO userEnvironmentSettingVO = userEnvironmentSettingService.getUserEnvironmentSettingByUserId(userId);
////	  if (CmmnUtils.isNull(userEnvironmentSettingVO) || !"Y".equals(userEnvironmentSettingVO.getBatchDownloadYn())) throw new Exception("edms배치압축작업권한없음");
//	  downloadFileName = String.valueOf(args.get("downloadFileName"));
//
//	  // validation
//	  List<EdmsAttachFileVO> edmsAttachFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
//	  for (int i = 0, n = jsonList.size(); i < n; i++) {
//		EdmsAttachFileVO edmsAttachFileVO = modelMapper.map(jsonList.get(i), EdmsAttachFileVO.class);
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setEditUserId(userId);
////		Set<ConstraintViolation<EdmsAttachFileVO>> validator = isCommonValid(edmsAttachFileVO);
////		if (validator.size() > 0) {
////		  throw new Exception("edms파일정보확인");
////		}
//		edmsAttachFileVOList.add(edmsAttachFileVO);
//	  }
//	  if (CmmnUtils.isNull(downloadFileName) || CmmnUtils.isNull(edmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//
//	  List<EdmsAttachFileVO> voList = new ArrayList<>();
//	  for (EdmsAttachFileVO vo : edmsAttachFileVOList) {
//		Map searchMap = new HashMap();
//		searchMap.put("edmsFileKey", vo.getEdmsFileKey());
//		searchMap.put("edmsParentGubun", vo.getEdmsParentGubun());
//		searchMap.put("edmsParentKey", vo.getEdmsParentKey());
//		searchMap.put("edmsOrgFileName", vo.getEdmsOrgFileName());
//		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
//	  }
//	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");
//
//	  List<File> filelist = new ArrayList();
//	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
//	  String tempKey = "";
//System.out.println("###########"+voList.size());
//	  for (int i=0;i<voList.size();i++) {
//		if(tempKey.equals("")){
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}else if(tempKey.equals(voList.get(i).getEdmsParentKey().toString())){
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}else{
//			EdmsMasterVO newedmsMasterVO = edmsMasterDao.findTop1ByEdmsKey(BigDecimal.valueOf(Long.parseLong(tempKey)));
//			String fileName = newedmsMasterVO.getEdmsNum() +".zip";
//
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));
//			filelist = new ArrayList();
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}
//
//		tempKey = voList.get(i).getEdmsParentKey().toString();
//
//		if(i == voList.size()-1){
//			EdmsMasterVO newedmsMasterVO = edmsMasterDao.findTop1ByEdmsKey(BigDecimal.valueOf(Long.parseLong(tempKey)));
//			String fileName = newedmsMasterVO.getEdmsNum() +".zip";
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));
//		}
//	  }
//
//	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\allDownload\\"));
//	  // 동일 압축 파일명 존재시
////	  String body, ext;
////	  long sysTime = System.currentTimeMillis();
////	  if (new File(edmsFileUploadPath + downloadFileName).exists()) {
////		int dot = downloadFileName.lastIndexOf(".");
////		if (dot != -1) {
////		  body = downloadFileName.substring(0, dot);
////		  ext = downloadFileName.substring(dot); // includes "."
////		  downloadFileName = body + "_" + sysTime + ext;
////		} else {
////		  downloadFileName = downloadFileName + "_" + sysTime;
////		}
////	  }
//
////	  File zippedFile = new File(edmsFileUploadPath, downloadFileName);
////	  Boolean isZip = cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));
//
////	  if (isZip) {
////		// 로그 저장(파일키:0, 부모키:0, 카테고리: 압축파일수)
////		EdmsAttachFileVO allFileVO = new EdmsAttachFileVO();
////		allFileVO.setEdmsFileKey(BigDecimal.ZERO);
////		allFileVO.setEdmsParentKey(BigDecimal.ZERO);
////		allFileVO.setEdmsParentGubun("배치압축작업");
////		allFileVO.setEdmsFileCategory("ZIP");
////		allFileVO.setEdmsFilePath(edmsFileUploadPath);
////		allFileVO.setEdmsOrgFileName("allDownload.zip");
////		saveFileLogInfo(allFileVO, request, "edms파일배치압축작업");
////	  }
//	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
//	} catch (Exception e) {
//	  e.printStackTrace();
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//	//return new ResponseEntity<>(HttpStatus.OK);
//  }
//
//  /**
//   * Batch download edms files.(배치 다운로드(GET))
//   *
//   * @param request          the request
//   * @param compressFileName the compress file name
//   * @param response         the response
//   */
//  @RequestMapping(value = "/batchDownloadEdmsFiles", method = RequestMethod.GET)
//  public void batchDownloadEdmsFiles(HttpServletRequest request, @RequestParam(value = "fileName") String compressFileName, HttpServletResponse response) {
////	if (1 == 1) {
////	  try {
////		throw new Exception("edms배치압축작업권한없음");
////	  } catch (Exception e) {
////		e.printStackTrace();
////	  }
////	}
//
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
//	if (CmmnUtils.isNull(userId) || CmmnUtils.isNull(compressFileName))
//	  return;
//	if (!new File(edmsFileUploadPath + compressFileName).exists()) {
//	  return;
//	}
//
//	// 파일명 encoding
//	String downloadFileName = CmmnFileUtils.convertEncodeFileName(compressFileName);
//
//	try {
//	  File fileToDownload = new File(edmsFileUploadPath + downloadFileName);
//	  InputStream inputStream = new FileInputStream(fileToDownload);
//	  response.setContentType("application/force-download");
//	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//	  IOUtils.copy(inputStream, response.getOutputStream());
//	  response.flushBuffer();
//	  inputStream.close();
//
//	  // 로그 저장(파일키:0, 부모키:0)
//	  EdmsAttachFileVO allFileVO = new EdmsAttachFileVO();
//	  allFileVO.setEdmsFileKey(BigDecimal.ZERO);
//	  allFileVO.setEdmsParentKey(BigDecimal.ZERO);
//	  allFileVO.setEdmsParentGubun("배치다운");
//	  allFileVO.setEdmsFileCategory(userId);
//	  allFileVO.setEdmsFilePath(edmsFileUploadPath);
//	  allFileVO.setEdmsOrgFileName(downloadFileName);
//	  saveFileLogInfo(allFileVO, request, "edms파일배치다운로드");
//	} catch (Exception e) {
//	  e.printStackTrace();
//	} finally {
//		File selectedDir= new File(edmsFileUploadPath + "\\allDownload\\");
//        File[] innerFiles= selectedDir.listFiles();
//        for(int i=0; i<innerFiles.length; i++){
//            innerFiles[i].delete();
//        }
//        if (new File(edmsFileUploadPath + compressFileName).exists()) CmmnFileUtils.deletePath(edmsFileUploadPath, downloadFileName);
//	}
//  }
//
//  /**
//   * Delete edms file response entity.(edms 파일 삭제)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/deleteEdmsFile")
//  public ResponseEntity<?> deleteEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	String result = "";
//	BigDecimal edmsFileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsFileKey")));
//	String edmsParentGubun = String.valueOf(args.get("edmsParentGubun"));
//	BigDecimal edmsParentKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsParentKey")));
//	String edmsOrgFileName = String.valueOf(args.get("edmsOrgFileName"));
//
//	if (CmmnUtils.isNull(edmsFileKey) || CmmnUtils.isNull(edmsParentGubun) || CmmnUtils.isNull(edmsParentKey) || CmmnUtils.isNull(edmsOrgFileName)) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//
//	List<EdmsAttachFileVO> voList;
//	Map map = new HashMap();
//	map.put("edmsFileKey", edmsFileKey);
//	map.put("edmsParentGubun", edmsParentGubun);
//	map.put("edmsParentKey", edmsParentKey);
//	map.put("edmsOrgFileName", edmsOrgFileName);
//	voList = edmsManagementService.getEdmsFileList(map);
//	if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");
//
//	EdmsAttachFileVO returnVO = voList.get(0);
//
//	File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileName());
//	if (file.isFile()) {
//	  returnVO.setUseYn("N");
//	  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
//	  edmsManagementService.saveEdmsFileInfo(returnVO, request);
//
//	  // 로그 저장
//	  saveFileLogInfo(returnVO, request, "edms파일삭제");
//
//	  // 파일 삭제
//	  String uploadPath = returnVO.getEdmsFilePath();
//	  result = CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileName());
//	  if (!"".equals(result)) {
//		return new ResponseEntity<>(returnVO, HttpStatus.OK);
//	  } else {
//		result = "fail";
//		return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	  }
//	} else {
//	  result = "fail";
//	  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public EdmsAttachFileVO saveAttachFile(EdmsAttachFileVO edmsAttachFileVO, HttpServletRequest request) throws Exception {
//	EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(edmsAttachFileVO, request);
//	saveFileLogInfo(returnVO, request, "edms파일업로드");
//	return returnVO;
//  }
//
//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public void saveFileLogInfo(EdmsAttachFileVO edmsAttachFileVO, HttpServletRequest request, String actionStr) {
//	LogFileVO logFileVO = new LogFileVO();
//	logFileVO.setFileKey(NumberUtils.createBigDecimal(String.valueOf(edmsAttachFileVO.getEdmsFileKey())));
//	logFileVO.setFileParentId(String.valueOf(edmsAttachFileVO.getEdmsParentKey()));
//	logFileVO.setFileParentType(edmsAttachFileVO.getEdmsParentGubun());
//	logFileVO.setFileDocGroup(edmsAttachFileVO.getEdmsFileCategory());
//	logFileVO.setFilePath(edmsAttachFileVO.getEdmsFilePath());
//	logFileVO.setFileName(edmsAttachFileVO.getEdmsOrgFileName());
//	logFileVO.setFileAction(actionStr);
//	logFileVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	logFileVO.setFileServerGubun(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
//	logFileVO.setFileServerIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
//	logFileVO.setFileClientIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_CLIENT_IP)));
//	try {
//	  logFileDao.save(logFileVO);
//	} catch (Exception e) {
//	  e.printStackTrace();
//	}
//  }
//
//  /**
//   * Gets customs clearance by unregistered edms master list.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the customs clearance by unregistered edms master list
//   */
//  @RequestMapping(value = "/getCustomsClearanceByUnregisteredEdmsMasterList")
//  public ResponseEntity<?> getCustomsClearanceByUnregisteredEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getCustomsClearanceByUnregisteredEdmsMasterList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets edms division copy target list.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the edms division copy target list
//   */
//  @RequestMapping(value = "/getEdmsDivisionCopyTargetList")
//  public ResponseEntity<?> getEdmsDivisionCopyTargetList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getEdmsDivisionCopyTargetList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms division copy list response entity.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   */
//  @RequestMapping(value = "/saveEdmsDivisionCopyList")
//  public ResponseEntity<?> saveEdmsDivisionCopyList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> masterList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
//	  List<EdmsMasterVO> edmsMasterVOList = CmmnUtils.convertMapListToBean(masterList, EdmsMasterVO.class);
//	  List<Map<String, Object>> fileList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
//	  List<EdmsAttachFileVO> edmsAttachFileVOList = CmmnUtils.convertMapListToBean(fileList, EdmsAttachFileVO.class);
//	  List<Map> returnVoList = edmsManagementService.saveEdmsDivisionCopyList(edmsMasterVOList, edmsAttachFileVOList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Is edms master same edms gubun and edms company and edms num list response entity.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   */
//  @RequestMapping(value = "/isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList")
//  public ResponseEntity<?> isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<EdmsMasterVO> list = edmsManagementService.isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms master by customs synchronize list response entity.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   */
//  @RequestMapping(value = "/saveEdmsMasterByCustomsSynchronizeList")
//  public ResponseEntity<?> saveEdmsMasterByCustomsSynchronizeList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterByCustomsSynchronizeList");
//	  List<EdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsMasterVO.class);
//	  List<EdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterByCustomsSynchronizeList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets team x user list with auth.(즐겨찾기 권한별 팀리스트 조회(B))
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the team x user list with auth
//   */
//  @RequestMapping(value = "/getTeamXUserListWithAuth")
//  public ResponseEntity<?> getTeamXUserListWithAuth(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//	try {
//	  args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String .valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String .valueOf(args.getOrDefault("size", 20))));
//
//	  List<Map> list = edmsManagementService.getTeamXUserListWithAuth(args);
//	  List<?> result = list.stream()
//			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
//			  .limit(pageRequest.getPageSize())
//			  .collect(Collectors.toList());
//
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets user team customer info list.(팀별 매핑 사업자 조회)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the user team customer info list
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/getUserTeamCustomerInfoList")
//  public ResponseEntity<?> getUserTeamCustomerInfoList(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String .valueOf(args.getOrDefault("page", 0))),
//			  Integer.parseInt(String .valueOf(args.getOrDefault("size", 20))));
//	  List<UserTeamXCustomerVO> list = edmsManagementService.getUserTeamCustomerInfoList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
//			  .limit(pageRequest.getPageSize())
//			  .collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save user team customer info response entity.(팀별 매핑 사업자 저장)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/saveUserTeamCustomerInfo")
//  public ResponseEntity<?> saveUserTeamCustomerInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  // validation
//	  Map targetMap = args;
//	  UserTeamXCustomerVO userTeamXCustomerVO = modelMapper.map(targetMap, UserTeamXCustomerVO.class);
//	  userTeamXCustomerVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  userTeamXCustomerVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  Set<ConstraintViolation<UserTeamXCustomerVO>> validator = isCommonValid(userTeamXCustomerVO);
//	  if (validator.size() > 0) {
//		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
//	  }
//
//	  UserTeamXCustomerVO returnVO = edmsManagementService.saveUserTeamCustomerInfo(userTeamXCustomerVO);
//	  return new ResponseEntity<>(returnVO, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets customer list.(거래처코드 [soo_MST].[dbo].[TBR_MST_Customer])
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the customer list
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/getCustomerList")
//  public ResponseEntity<?> getCustomerList(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  args.put("_defaultDB", args.get("defaultDB"));
//	  if (CmmnUtils.isNull(args.get("_defaultDB"))) {
//		throw new Exception("_defaultDB 오류");
//	  }
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getCustomerList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Call sync customer individual info by procedure response entity.(SOO_MST의 거래처정보 단건 동기화)
//   * DB, 자재코드 넘겨줘야 함(아이디: 세션정보)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/callSyncCustomerIndividualInfoByProcedure")
//  public ResponseEntity<?> callSyncCustomerIndividualInfoByProcedure(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  args.put("db", args.containsKey("db") ? String.valueOf(args.get("db")) : "");
//	  args.put("code", args.containsKey("code") ? String.valueOf(args.get("code")) : "");
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  edmsManagementService.callSyncCustomerIndividualInfoByProcedure(args);
//
//	  return new ResponseEntity<>(HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets cmmn code list.(공통코드)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the cmmn code list
//   */
//  @RequestMapping(value = "/getCmmnCodeList")
//  public ResponseEntity<?> getCmmnCodeList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  checkPagingParamsForMapper(args);
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<Map> list = edmsManagementService.getCmmnCodeList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save edms file additional info response entity.(edms 파일 추가정보 저장)
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/saveEdmsFileAdditionalInfo")
//  public ResponseEntity<?> saveEdmsFileAdditionalInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  // validation
//	  Map targetMap = args;
//	  EdmsFileDTO.additionalInfo additionalInfo = CmmnUtils.convertMapToBean(targetMap, EdmsFileDTO.additionalInfo.class);
//	  additionalInfo.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  additionalInfo.setEditDate(new Date());
//
//	  EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileAdditionalInfo(additionalInfo, request);
//	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  Map errMap = new HashMap();
//	  errMap.put("args", args);
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets import delivery carrying in list.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the import delivery carrying in list
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/getImportDeliveryCarryingInList")
//  public ResponseEntity<?> getImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
//	  Page<DeliveryCarryingInVO> result = edmsManagementService.getImportDeliveryCarryingInList(args, pageRequest);
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save import delivery carrying in list response entity.
//   *
//   * @param request the request
//   * @param map     the map
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping("/saveImportDeliveryCarryingInList")
//  public ResponseEntity<?> saveImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryCarryingInList");
//	  List<DeliveryCarryingInVO> voList = new ArrayList<>();
//	  for (Map m : mapList) {
//		DeliveryCarryingInVO vo = modelMapper.map(m, DeliveryCarryingInVO.class);
//		voList.add(vo);
//	  }
//	  List<DeliveryCarryingInVO> returnVoList = edmsManagementService.saveImportDeliveryCarryingInList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets import master info by kcba.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the import master info by kcba
//   */
//  @RequestMapping(value = "/getImportMasterInfoByKcba")
//  public ResponseEntity<?> getImportMasterInfoByKcba(HttpServletRequest request, @RequestBody Map args) {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
//	  List<Map> list = edmsManagementService.getImportMasterInfoList(args);
//	  List<?> result = list.stream()
//			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
//			  .limit(pageRequest.getPageSize())
//			  .collect(Collectors.toList());
//
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets import delivery request list.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the import delivery request list
//   * @throws Exception the exception
//   */
//  @RequestMapping(value = "/getImportDeliveryRequestList")
//  public ResponseEntity<?> getImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  Page<DeliveryRequestVO> result = edmsManagementService.getImportDeliveryRequestList(args, pageRequest);
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Save import delivery request list response entity.
//   *
//   * @param request the request
//   * @param map     the map
//   * @return the response entity
//   * @throws Exception the exception
//   */
//  @RequestMapping("/saveImportDeliveryRequestList")
//  public ResponseEntity<?> saveImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
//	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
//	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryRequestList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping("/deleteImportDeliveryRequestList")
//  public ResponseEntity<?> deleteImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
//	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
//	  List<DeliveryRequestVO> returnVoList = edmsManagementService.deleteImportDeliveryRequestList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping("/saveImportDeliveryModifyList")
//  public ResponseEntity<?> saveImportDeliveryModifyList(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
//	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
//	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryModifyList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping("/saveImportDeliveryAddList")
//  public ResponseEntity<?> saveImportDeliveryAddList(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
//	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
//	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryAddList(voList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets import master info by kcba.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the import master info by kcba
//   */
//  @RequestMapping(value = "/getImportPaperList")
//  public ResponseEntity<?> getImportPaperList(HttpServletRequest request, @RequestBody Map args) {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
//	  List<Map> list = edmsManagementService.getImportPaperList(args);
//	  List<?> result = list.stream()
//			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
//			  .limit(pageRequest.getPageSize())
//			  .collect(Collectors.toList());
//
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  /**
//   * Gets import master info by kcba.
//   *
//   * @param request the request
//   * @param args    the args
//   * @return the import master info by kcba
//   */
//  @RequestMapping(value = "/getExportPaperList")
//  public ResponseEntity<?> getExportPaperList(HttpServletRequest request, @RequestBody Map args) {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
//	  List<Map> list = edmsManagementService.getExportPaperList(args);
//	  List<?> result = list.stream()
//			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
//			  .limit(pageRequest.getPageSize())
//			  .collect(Collectors.toList());
//
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/paperEdmsFile")
//  public ResponseEntity<?> paperEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	String result = "";
//	BigDecimal edmsFileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsFileKey")));
//	String edmsParentGubun = String.valueOf(args.get("edmsParentGubun"));
//	BigDecimal edmsParentKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsParentKey")));
//	String edmsSearchKeyword = String.valueOf(args.get("edmsSearchKeyword"));
//
//	List<EdmsAttachFileVO> delFileList;
//	Map delmap = new HashMap();
//	delmap.put("edmsParentKey", edmsParentKey);
//	delmap.put("edmsSearchKeyword", edmsSearchKeyword);
//	delmap.put("edmsFileCategory", "B0001");
//	delmap.put("useYn", "Y");
//	delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//	if (delFileList.size() > 0){
//		List<EdmsAttachFileVO> voList;
//		Map map = new HashMap();
//		map.put("edmsFileKey", edmsFileKey);
//		voList = edmsManagementService.getEdmsFileList(map);
//		if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");
//
//		EdmsAttachFileVO returnVO = voList.get(0);
//
//		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileName());
//		if (file.isFile()) {
//		  returnVO.setUseYn("N");
//		  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//		  returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
//		  edmsManagementService.saveEdmsFileInfo(returnVO, request);
//
//		  String uploadPath = returnVO.getEdmsFilePath();
//		  CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileName());
//
//		  return new ResponseEntity<>(returnVO, HttpStatus.OK);
//		} else {
//		  result = "fail";
//		  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//		}
////2017-10-20일 김상열부장요청으로 파일이 있으면 스킵으로 변경
////		File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileName());
////		if (file1.isFile()) {
////		  returnVO1.setUseYn("N");
////		  returnVO1.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
////		  returnVO1.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
////		  edmsManagementService.saveEdmsFileInfo(returnVO1, request);
////
////		  // 로그 저장
////		  saveFileLogInfo(returnVO1, request, "edms파일삭제");
////
////		  // 파일 삭제
////		  String uploadPath = returnVO1.getEdmsFilePath();
////		  result = CmmnFileUtils.deletePath(uploadPath, returnVO1.getEdmsSaveFileName());
////		}
//	}else{
//		List<EdmsAttachFileVO> voList;
//		Map map = new HashMap();
//		map.put("edmsFileKey", edmsFileKey);
//		voList = edmsManagementService.getEdmsFileList(map);
//		if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");
//
//		EdmsAttachFileVO returnVO = voList.get(0);
//
//		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileName());
//		if (file.isFile()) {
//		  returnVO.setEdmsParentGubun(edmsParentGubun);
//		  returnVO.setEdmsParentKey(edmsParentKey);
//		  returnVO.setEdmsSearchKeyword(edmsSearchKeyword);
//		  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//		  returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
//		  edmsManagementService.saveEdmsFileInfo(returnVO, request);
//
//		  return new ResponseEntity<>(returnVO, HttpStatus.OK);
//		} else {
//		  result = "fail";
//		  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//		}
//	}
//  }
//
//  @RequestMapping(value = "/getSysNoticeList")
//  public ResponseEntity<?> getSysNoticeList(HttpServletRequest request, @RequestBody Map args){
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
//	  List<SysNoticeVO> list = edmsManagementService.getSysNoticeList(args, pageRequest);
//	  List<?> result = list.stream().collect(Collectors.toList());
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/getSysFileList")
//  public ResponseEntity<?> getSysFileList(HttpServletRequest request, @RequestBody Map args) {
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
//	  List<SysAttachFileVO> list = edmsManagementService.getSysFileList(args, pageRequest);
//	  List<?> result = list.stream().collect(Collectors.toList());
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/downloadFile", method = {RequestMethod.GET})
//  public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "fileKey") BigDecimal fileKey,
//							   HttpServletResponse response) throws UnsupportedEncodingException {
//	String downloadFileName, reqFilePath = null, reqFileName = null;
//
//	try {
//	  SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);
//	  reqFilePath = isSysAttachFileVO.getFilePath();
//	  reqFileName = isSysAttachFileVO.getSaveFileName();
//
//	  downloadFileName = isSysAttachFileVO.getOriginalFileName();
//	  downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);
//
//	  File fileToDownload = new File(reqFilePath + reqFileName);
//	  InputStream inputStream = new FileInputStream(fileToDownload);
//	  response.setContentType("application/force-download");
//	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//	  IOUtils.copy(inputStream, response.getOutputStream());
//	  response.flushBuffer();
//	  inputStream.close();
//	} catch (Exception e) {
//	  e.printStackTrace();
//	}
//  }
//
//  @RequestMapping(value = "/deleteFile")
//  public ResponseEntity<?> deleteFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	String result = "";
//	BigDecimal fileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("fileKey")));
//
//	SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);
//
//	File file = new File(isSysAttachFileVO.getFilePath() + isSysAttachFileVO.getSaveFileName());
//	if (file.isFile()) {
//		isSysAttachFileVO.setUseYn("N");
//		isSysAttachFileVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//		sysAttachFileDao.save(isSysAttachFileVO);
//
//	  // 파일 삭제
//	  String uploadPath = isSysAttachFileVO.getFilePath();
//	  result = CmmnFileUtils.deletePath(uploadPath, isSysAttachFileVO.getSaveFileName());
//	  if (!"".equals(result)) {
//		return new ResponseEntity<>(isSysAttachFileVO, HttpStatus.OK);
//	  } else {
//		result = "fail";
//		return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	  }
//	} else {
//	  result = "fail";
//	  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping("/saveNcomCustomer")
//  public ResponseEntity<?> saveNcomCustomer(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//		Map result = edmsManagementService.saveNcomCustomer(args);
//	  return new ResponseEntity<>(result, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }
//
//  @RequestMapping(value = "/autoFileSave")
//  public void autoFileSave() throws Exception {
//	EdmsAttachFileVO edmsAttachFileVO = new EdmsAttachFileVO();
//	String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//	String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
//	String uploadPathType 	= edmsFileUploadPath;
//	String path 			= paperFileUploadPath;
//System.out.println(path);
//	File dirFile	= new File(path);
//	File[] fileList	= dirFile.listFiles();
//	for(File tempFile : fileList) {
//	  if(tempFile.isFile()) {
//	    String tempPath		= tempFile.getParent();
//	    String tempFileName	= tempFile.getName();
//	    System.out.println(tempPath);
//	    System.out.println(tempFileName);
//	    String uploadPath = uploadPathType + yyyymmdd + "\\";
//		File dir = new File(uploadPath);
//		if (!dir.isDirectory()) {
//		  dir.mkdirs();
//		}
//
//		String originalFileName = CmmnFileUtils.convertOriginalFileName(tempFileName);
//
//		if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)) {
//		}
//
//		String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
//
//		String body, ext;
//		long sysTime = System.currentTimeMillis();
//
//		if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//		  if (new File(uploadPath + saveFileName).exists()) {
//			int dot = saveFileName.lastIndexOf(".");
//			if (dot != -1) {
//			  body = saveFileName.substring(0, dot);
//			  ext = saveFileName.substring(dot); // includes "."
//			  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//			  }
//			  saveFileName = body + "_" + sysTime + ext;
//			} else {
//			  saveFileName = saveFileName + "_" + sysTime;
//			}
//		  }
//
//		  try {
//			  if(!originalFileName.substring(0,4).equals("IMP_") && !originalFileName.substring(0,4).equals("EXP_")){
//      		  }else{
//				  String tempLocalFile=tempPath+"\\"+tempFileName;
//			      FileInputStream inputStream 	= new FileInputStream(tempLocalFile);
//				  FileOutputStream outputStream = new FileOutputStream(uploadPath + saveFileName,true);
//
//				  FileChannel fcin =  inputStream.getChannel();
//				  FileChannel fcout = outputStream.getChannel();
//
//				  long size = fcin.size();
//
//				  fcin.transferTo(0, size, fcout);
//
//				  fcout.close();
//				  fcin.close();
//
//				  outputStream.close();
//				  inputStream.close();
//
//				  String jisa  		= originalFileName.substring(4,9);
//				  String singo 		= originalFileName.substring(4,18);
//				  String defaultDB	= "";
//				  if(originalFileName.substring(0,4).equals("EXP_")){
//        			if(jisa.equals("43518")){
//        				defaultDB = "ncustoms_ic";
//        			}else if(jisa.equals("42530")){
//        				defaultDB = "ncustoms_pj";
//        			}else if(jisa.equals("43494")){
//        				defaultDB = "ncustoms_sel4";
//        			}else if(jisa.equals("40629")){
//        				defaultDB = "ncustoms_pt";
//        			}else if(jisa.equals("42773")){
//        				defaultDB = "ncustoms_sn";
//        			}else if(jisa.equals("42119")){
//        				defaultDB = "ncustoms_yj";
//        			}else if(jisa.equals("43862")){
//        				defaultDB = "ncustoms_ca";
//        			}else if(jisa.equals("43618")){
//        				defaultDB = "ncustoms_cj";
//        			}else if(jisa.equals("42064")){
//        				defaultDB = "ncustoms_bs";
//        			}else if(jisa.equals("43466")){
//        				defaultDB = "ncustoms_us";
//        			}else if(jisa.equals("42095")){
//        				defaultDB = "ncustoms_gm";
//        			}else if(jisa.equals("43522")){
//        				defaultDB = "ncustoms_cw";
//        			}else if(jisa.equals("42526")){
//        				defaultDB = "ncustoms_jj";
//        			}else if(jisa.equals("43617")){
//        				defaultDB = "ncustoms_ys";
//        			}else if(jisa.equals("43518")){
//        				defaultDB = "ncustoms_ic";
//        			}else{
//        				defaultDB = "ncustoms_sel_040";
//        			}
//
//					Map args = new HashMap();
//					args.put("_defaultDB", defaultDB);
//					args.put("singoNo", singo);
//					List<Map> list = edmsManagementService.getExportPaperList(args);
//					if(list.size() > 0) {
//						List<EdmsAttachFileVO> delFileList;
//						Map delmap = new HashMap();
//						delmap.put("edmsParentKey", list.get(0).get("edmsKey").toString());
//						delmap.put("edmsFileCategory", "B0001");
//						delmap.put("useYn", "Y");
//						delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//						if (delFileList.size() > 0){
//							EdmsAttachFileVO returnVO1 = delFileList.get(0);
//
//							File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileName());
//							if (file1.isFile()) {
//							  returnVO1.setUseYn("N");
//							  returnVO1.setEditUserId("admin2");
//							  returnVO1.setEditUserNm("시스템관리자2");
//							  EdmsAttachFileVO returnVO = edmsFileDao.save(returnVO1);
//
//							  String deletePath = returnVO1.getEdmsFilePath();
//							  CmmnFileUtils.deletePath(deletePath, returnVO1.getEdmsSaveFileName());
//							}
//						}
//
//						edmsAttachFileVO.setEdmsParentGubun("EXPORT");
//						edmsAttachFileVO.setEdmsParentKey(BigDecimal.valueOf(Long.parseLong(list.get(0).get("edmsKey").toString())));
//						edmsAttachFileVO.setEdmsFileCategory("B0001");
//						edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//						edmsAttachFileVO.setEdmsServerGubun("STAGE");
//						edmsAttachFileVO.setEdmsServerIp("172.31.2.25");
//						edmsAttachFileVO.setEdmsFilePath(uploadPath);
//						edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//						edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//						edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
//						edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//						edmsAttachFileVO.setEdmsFileStatus("A");
//						edmsAttachFileVO.setEdmsSearchKeyword(singo);
//						edmsAttachFileVO.setAddDay(yyyymmdd);
//						edmsAttachFileVO.setUseYn("Y");
//						edmsAttachFileVO.setAddUserId("admin2");
//						edmsAttachFileVO.setAddUserNm("시스템관리자2");
//						edmsAttachFileVO.setAddDtm(currentDatetime);
//						edmsAttachFileVO.setEditUserId("admin2");
//						edmsAttachFileVO.setEditUserNm("시스템관리자2");
//						edmsFileDao.save(edmsAttachFileVO);
//					}else{
//					    edmsAttachFileVO.setEdmsParentGubun("PAPER");
//					    edmsAttachFileVO.setEdmsParentKey(BigDecimal.valueOf(434));
//					    edmsAttachFileVO.setEdmsFileCategory("B0001");
//					    edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//					    edmsAttachFileVO.setEdmsServerGubun("STAGE");
//					    edmsAttachFileVO.setEdmsServerIp("172.31.2.25");
//					    edmsAttachFileVO.setEdmsFilePath(uploadPath);
//					    edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//					    edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//					    edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
//					    edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//					    edmsAttachFileVO.setEdmsFileStatus("A");
//					    edmsAttachFileVO.setAddDay(yyyymmdd);
//					    edmsAttachFileVO.setUseYn("Y");
//					    edmsAttachFileVO.setAddUserId("admin2");
//					    edmsAttachFileVO.setAddUserNm("시스템관리자2");
//					    edmsAttachFileVO.setAddDtm(currentDatetime);
//					    edmsAttachFileVO.setEditUserId("admin2");
//					    edmsAttachFileVO.setEditUserNm("시스템관리자2");
//					    edmsFileDao.save(edmsAttachFileVO);
//					}
//				  }else{
//					if(jisa.equals("43518")){
//        				defaultDB = "ncustoms_ic";
//        			}else if(jisa.equals("42530")){
//        				defaultDB = "ncustoms_pj";
//        			}else if(jisa.equals("43494")){
//        				defaultDB = "ncustoms_sel4";
//        			}else if(jisa.equals("40629")){
//        				defaultDB = "ncustoms_pt";
//        			}else if(jisa.equals("42773")){
//        				defaultDB = "ncustoms_sn";
//        			}else if(jisa.equals("42119")){
//        				defaultDB = "ncustoms_yj";
//        			}else if(jisa.equals("43862")){
//        				defaultDB = "ncustoms_ca";
//        			}else if(jisa.equals("43618")){
//        				defaultDB = "ncustoms_cj";
//        			}else if(jisa.equals("42064")){
//        				defaultDB = "ncustoms_bs";
//        			}else if(jisa.equals("43466")){
//        				defaultDB = "ncustoms_us";
//        			}else if(jisa.equals("42095")){
//        				defaultDB = "ncustoms_gm";
//        			}else if(jisa.equals("43522")){
//        				defaultDB = "ncustoms_cw";
//        			}else if(jisa.equals("42526")){
//        				defaultDB = "ncustoms_jj";
//        			}else if(jisa.equals("43617")){
//        				defaultDB = "ncustoms_ys";
//        			}else if(jisa.equals("43518")){
//        				defaultDB = "ncustoms_ic";
//        			}else{
//        				defaultDB = "ncustoms";
//        			}
//
//					Map args = new HashMap();
//					args.put("_defaultDB", defaultDB);
//					args.put("singoNo", singo);
//					List<Map> list = edmsManagementService.getImportPaperList(args);
//					System.out.println(list.get(0).get("edmsKey").toString());
//					if(list.size() > 0) {
//						List<EdmsAttachFileVO> delFileList;
//						Map delmap = new HashMap();
//						delmap.put("edmsParentKey", list.get(0).get("edmsKey").toString());
//						delmap.put("edmsFileCategory", "B0001");
//						delmap.put("useYn", "Y");
//						delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//						if (delFileList.size() > 0){
//							EdmsAttachFileVO returnVO1 = delFileList.get(0);
//
//							File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileName());
//							if (file1.isFile()) {
//							  returnVO1.setUseYn("N");
//							  returnVO1.setEditUserId("admin2");
//							  returnVO1.setEditUserNm("시스템관리자2");
//							  EdmsAttachFileVO returnVO = edmsFileDao.save(returnVO1);
//
//							  String deletePath = returnVO1.getEdmsFilePath();
//							  CmmnFileUtils.deletePath(deletePath, returnVO1.getEdmsSaveFileName());
//							}
//						}
//
//						edmsAttachFileVO.setEdmsParentGubun("IMPORT");
//						edmsAttachFileVO.setEdmsParentKey(BigDecimal.valueOf(Long.parseLong(list.get(0).get("edmsKey").toString())));
//						edmsAttachFileVO.setEdmsFileCategory("B0001");
//						edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//						edmsAttachFileVO.setEdmsServerGubun("STAGE");
//						edmsAttachFileVO.setEdmsServerIp("172.31.2.25");
//						edmsAttachFileVO.setEdmsFilePath(uploadPath);
//						edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//						edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//						edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
//						edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//						edmsAttachFileVO.setEdmsFileStatus("A");
//						edmsAttachFileVO.setEdmsSearchKeyword(singo);
//						edmsAttachFileVO.setAddDay(yyyymmdd);
//						edmsAttachFileVO.setUseYn("Y");
//						edmsAttachFileVO.setAddUserId("admin2");
//						edmsAttachFileVO.setAddUserNm("시스템관리자2");
//						edmsAttachFileVO.setAddDtm(currentDatetime);
//						edmsAttachFileVO.setEditUserId("admin2");
//						edmsAttachFileVO.setEditUserNm("시스템관리자2");
//						edmsFileDao.save(edmsAttachFileVO);
//					}else{
//					    edmsAttachFileVO.setEdmsParentGubun("PAPER");
//					    edmsAttachFileVO.setEdmsParentKey(BigDecimal.valueOf(434));
//					    edmsAttachFileVO.setEdmsFileCategory("B0001");
//					    edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//					    edmsAttachFileVO.setEdmsServerGubun("STAGE");
//					    edmsAttachFileVO.setEdmsServerIp("172.31.2.25");
//					    edmsAttachFileVO.setEdmsFilePath(uploadPath);
//					    edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//					    edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//					    edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
//					    edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//					    edmsAttachFileVO.setEdmsFileStatus("A");
//					    edmsAttachFileVO.setAddDay(yyyymmdd);
//					    edmsAttachFileVO.setUseYn("Y");
//					    edmsAttachFileVO.setAddUserId("admin2");
//					    edmsAttachFileVO.setAddUserNm("시스템관리자2");
//					    edmsAttachFileVO.setAddDtm(currentDatetime);
//					    edmsAttachFileVO.setEditUserId("admin2");
//					    edmsAttachFileVO.setEditUserNm("시스템관리자2");
//					    edmsFileDao.save(edmsAttachFileVO);
//					}
//				  }
//      		  }
//		  } catch (IllegalStateException e) {
//			  e.printStackTrace();
//		  }
//		}
//	  }
//	}
//	for(int i=0;i<fileList.length;i++){
//		fileList[i].delete();
//	}
//  }
//
//  @RequestMapping(value = "/getSnsTest")
//  public void getSnsTest() throws Exception {
//	 	StringBuffer fileData = new StringBuffer(1000);
//	    BufferedReader reader = new BufferedReader( new InputStreamReader(new FileInputStream("C:/EDMS/Test.xml"),"utf-8"));
//	    char[] buf = new char[1024];
//	    int numRead=0;
//	    while((numRead=reader.read(buf)) != -1){
//	        fileData.append(buf, 0, numRead);
//	    }
//	    reader.close();
//
//	    String xml_string_to_send = fileData.toString();
//	    System.out.println(xml_string_to_send);
//	    String returnString = "";
//	    HttpURLConnection connection = null;
//	    OutputStream os =null;
//	    try{
//	        URL searchUrl = new URL("http://groupware.seincustoms.com/");
//	        connection = (HttpURLConnection)searchUrl.openConnection();
//	        connection.setDoOutput(true);
//	        connection.setRequestMethod("POST");
//	        connection.setRequestProperty( "Content-Type", "text/xml; charset=utf-8" );
//	        connection.setRequestProperty( "Content-Length", Integer.toString(xml_string_to_send.length()) );
//	        connection.setRequestProperty( "SOAPAction", "http://groupware.seincustoms.com/IFSendMsg" );
//	        os = connection.getOutputStream();
//	        os.write( xml_string_to_send.getBytes("utf-8") );
//	        os.flush();
//	        os.close();
//
//	        int rc = connection.getResponseCode();
//	        if(rc==200){
//	            InputStreamReader in = new InputStreamReader(connection.getInputStream(),"utf-8");
//	            BufferedReader br = new BufferedReader(in);
//	            String strLine;
//	            while ((strLine = br.readLine()) != null){
//	                returnString = returnString.concat(strLine);
//	            }
//
//	            System.out.println(returnString);
//	            return;
//	        }else{
//	            System.out.println("http response code error: "+rc+"\n");
//	            return;
//	        }
//	    } catch( IOException e ){
//	        System.out.println("search URL connect failed: " + e.getMessage());
//	        e.printStackTrace();
//	    }finally{
//	    	if(os!=null) os.close();
//	    	connection.disconnect();
//	    }
//  }
//
//  @RequestMapping(value = "/upMailer")
//  public void upMailer(MultipartHttpServletRequest mRequest) throws Exception {
//	  	EdmsSendMailLogVO edmsSendMailLogVO = new EdmsSendMailLogVO();
//	  	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//		Map map = new HashMap();
//		boolean mailSendCheck = false;
//
//		edmsSendMailLogVO.setSender(mRequest.getParameter("sender"));
//		edmsSendMailLogVO.setUserName(mRequest.getParameter("USERNAME"));
//		edmsSendMailLogVO.setReceiver(mRequest.getParameter("receiver"));
//		edmsSendMailLogVO.setMailTitle(mRequest.getParameter("mailTitle"));
//		edmsSendMailLogVO.setMailContent(mRequest.getParameter("mailContent"));
//		edmsSendMailLogVO.setFileName(mRequest.getParameter("inFile"));
//		edmsSendMailLogVO.setAddDtm(currentDatetime);
//	    edmsSendMailLogDao.save(edmsSendMailLogVO);
//
//		map.put("toAddr", mRequest.getParameter("receiver"));
//		map.put("subject", mRequest.getParameter("mailTitle"));
//		map.put("contents", mRequest.getParameter("mailContent"));
//		map.put("contentType", true);
//		map.put("senderEmail", mRequest.getParameter("sender"));
//		map.put("senderName", mRequest.getParameter("USERNAME"));
//		System.out.println(map);
//
//		mailSendCheck = cmmnMailService.sendMailWithFiles(mRequest, map);
//		System.out.println(mailSendCheck);
//  }
//}