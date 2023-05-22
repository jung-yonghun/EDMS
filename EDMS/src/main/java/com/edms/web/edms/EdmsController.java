package com.edms.web.edms;

import com.edms.biz.edmsManagement.CpsEdmsFileDTO;
import com.edms.biz.edmsManagement.CpsEdmsMasterDao;
import com.edms.biz.edmsManagement.CpsEdmsFileDao;
import com.edms.biz.edmsManagement.CpsEdmsExportDao;
import com.edms.biz.edmsManagement.CpsEdmsTeamDao;
import com.edms.biz.edmsManagement.CpsEdmsNotCustomerDao;
import com.edms.biz.edmsManagement.CpsFieldMasterDao;
import com.edms.biz.edmsManagement.EdmsSendMailLogDao;
import com.edms.biz.edmsManagement.EdmsManagementService;
import com.edms.biz.edmsManagement.LogFileDao;
import com.edms.biz.edmsManagement.SysAttachFileDao;
import com.edms.biz.edmsManagement.ENAC100Dao;
import com.edms.commons.*;
import com.edms.domains.CpsEdmsAttachFileVO;
import com.edms.domains.CpsEdmsMasterVO;
import com.edms.domains.CpsEdmsExportVO;
import com.edms.domains.CpsEdmsTeamVO;
import com.edms.domains.CpsEdmsNotCustomerVO;
import com.edms.domains.CpsFieldMasterVO;
import com.edms.domains.EdmsSendMailLogVO;
import com.edms.domains.LogFileVO;
import com.edms.domains.UserTeamXCustomerVO;
import com.edms.domains.DeliveryCarryingInVO;
import com.edms.domains.DeliveryRequestVO;
import com.edms.domains.SysNoticeVO;
import com.edms.domains.SysAttachFileVO;
import com.edms.domains.ENAC100VO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;

import java.io.*;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.nio.channels.FileChannel;

import static com.edms.commons.CmmnUtils.getUserInfo;
import static com.edms.commons.CmmnUtils.isCommonValid;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

@RestController
@RequestMapping(value = {"/apis/edms"}, method = {RequestMethod.POST})
public class EdmsController extends CmmnController {
	@Autowired
	private EdmsManagementService edmsManagementService;
	@Autowired
	private LogFileDao logFileDao;
	@Autowired
	private CpsEdmsMasterDao cpsEdmsMasterDao;
	@Autowired
	private CpsEdmsFileDao cpsEdmsFileDao;
	@Autowired
	private CpsEdmsExportDao cpsEdmsExportDao;
	@Autowired
	private CpsEdmsTeamDao cpsEdmsTeamDao;
	@Autowired
	private CpsEdmsNotCustomerDao cpsEdmsNotCustomerDao;
	@Autowired
	private EdmsSendMailLogDao edmsSendMailLogDao;
	@Autowired
	private SysAttachFileDao sysAttachFileDao;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private CpsFieldMasterDao cpsFieldMasterDao;
	@Autowired
	private ENAC100Dao eNAC100Dao;

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;

	@Value("${upload.path.edms}")
	public String edmsFileUploadPath;

	@Value("${upload.path.item}")
	public String itemFileUploadPath;

	@Value("${paper.path.edms}")
	public String paperFileUploadPath;

	@Value("${deleted.path.edms}")
	public String edmsFileDeletedPath;

	@Value("${com.sein.taxnum}")
	public String seinCompanyTaxNum;

	private String stringValueOf(Object object) {
		 return object == null ? "" : String.valueOf(object);
	}

	@RequestMapping(value = "/uploadEdmsFile")
	public ResponseEntity<?> uploadEdmsFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO 			= new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();
		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;

		CpsEdmsAttachFileVO.setEdmsParentGbn(mRequest.getParameter("edmsParentGbn"));
		CpsEdmsAttachFileVO.setEdmsJisaCode(mRequest.getParameter("edmsJisaCode"));
		CpsEdmsAttachFileVO.setEdmsMasterKey("");
		CpsEdmsAttachFileVO.setEdmsMkey(mRequest.getParameter("edmsMKey"));
		CpsEdmsAttachFileVO.setEdmsNo(mRequest.getParameter("edmsNo"));
		CpsEdmsAttachFileVO.setEdmsSingoNo(mRequest.getParameter("edmsSingoNo"));
		CpsEdmsAttachFileVO.setCommonYn(mRequest.getParameter("commonYn"));
		CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
		CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
		CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
		CpsEdmsAttachFileVO.setUseYn("Y");
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setAddUserNm(userName);
		CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVO.setEditUserNm(userName);
		CpsEdmsAttachFileVO.setEditDtm(currentDatetime);

		String uploadPath = uploadPathType + yyyymmdd + File.separator;
		File dir = new File(uploadPath);
		if (!dir.isDirectory()) {
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for (MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize 		= mpf.getSize();
//				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String saveFileName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length())+"_"+currentDatetime+"_"+CmmnUtils.randString(8);
				String body, ext;
				long sysTime = System.currentTimeMillis();

				if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body 	= saveFileName.substring(0, dot);
							ext 	= saveFileName.substring(dot);
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + sysTime;
						}
					}

					try{
						mpf.transferTo(new File(uploadPath + saveFileName));
						CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
						CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
						CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
						CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
						CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
						returnVO = saveAttachFile(saveVO, request);
					}catch(IllegalStateException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IllegalStateException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}catch (IOException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IOException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/getSysNoticeList")
	public ResponseEntity<?> getSysNoticeList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<SysNoticeVO> list = edmsManagementService.getSysNoticeList(args, pageRequest);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getSysFileList")
	public ResponseEntity<?> getSysFileList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<SysAttachFileVO> list = edmsManagementService.getSysFileList(args, pageRequest);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downloadFile", method = {RequestMethod.GET})
	public void downloadFile(HttpServletRequest request, @RequestParam(value = "fileKey") BigDecimal fileKey,HttpServletResponse response) throws UnsupportedEncodingException{
		String downloadFileName, reqFilePath = null, reqFileName = null;

		try{
			SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);
			reqFilePath = isSysAttachFileVO.getFilePath();
			reqFileName = isSysAttachFileVO.getSaveFileName();

			downloadFileName = isSysAttachFileVO.getOriginalFileName();
			downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);

			File fileToDownload = new File(reqFilePath + reqFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}













	@RequestMapping(value = "/getEdmsFileInfoList")
	public ResponseEntity<?> getEdmsFileInfoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<CpsEdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveEdmsFile")
	public ResponseEntity<?> saveEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

//		List<CpsEdmsAttachFileVO> newEdmsAttachFileVO = new ArrayList<>();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO		= new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO newCpsEdmsAttachFileVO 	= new CpsEdmsAttachFileVO();
		Map returnResponseEntity = new HashMap();

//		String uploadPathType 	= edmsFileUploadPath;
//		String newEdmsGubun 	= null;
//		String newEdmsNum		= "";
		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String fixEdmsGubun 	= String.valueOf(args.get("edmsParentGbn"));
		String fixEdmsJisaCode 	= String.valueOf(args.get("edmsJisaCode"));
		String fixEdmsNum 		= String.valueOf(args.get("edmsNo"));
		String fixEdmsCategory	= String.valueOf(args.get("edmsFileCategory"));
		String fixCommonYn 		= String.valueOf(args.get("commonYn"));
		String fixEdmsSaup 		= String.valueOf(args.get("edmsSaup"));
		String fixEdmsMkey 		= "";
		String fixEdmsSingoNum 	= "";

		try{
//			Map edmsMasterMap = (Map) args.get("edmsMaster");
//			CpsEdmsMasterVO notClassificationMasterVO = modelMapper.map(edmsMasterMap, CpsEdmsMasterVO.class);
//			notClassificationMasterVO.setAddUserId(userId);
//			notClassificationMasterVO.setEditUserId(userId);
//			notClassificationMasterVO.setAddUserName(userName);
//			notClassificationMasterVO.setEditUserName(userName);
//			notClassificationMasterVO.setAddDtm(currentDatetime);
//			notClassificationMasterVO.setEditDtm(currentDatetime);
			List<CpsEdmsAttachFileVO> notClassificationFileVOList = new ArrayList<>();
			List<Map> list = new ArrayList<>();

			if(!CmmnUtils.isNull(fixEdmsNum)){
				Map map1 = new HashMap();
				map1.put("edmsNo", fixEdmsNum);
				map1.put("edmsJisaCode", fixEdmsJisaCode);

//				if(fixEdmsGubun.equals("IMPORT")){
//					list = edmsManagementService.getCheckImpo1(map1);
//					if(String.valueOf(list.get(0).get("count")).equals("0")){
//						return new ResponseEntity<>("엔컴통관부터 진행하세요.", HttpStatus.BAD_REQUEST);
//					}else{
//						fixEdmsMkey 	= String.valueOf(list.get(0).get("edmsMkey"));
//						fixEdmsSingoNum = String.valueOf(list.get(0).get("edmsSingoNum"));
//					}
//				}else if(fixEdmsGubun.equals("EXPORT")){
//					list = edmsManagementService.getCheckExpo1(map1);
//					if(String.valueOf(list.get(0).get("count")).equals("0")){
//						return new ResponseEntity<>("엔컴통관부터 진행하세요.", HttpStatus.BAD_REQUEST);
//					}else{
//						fixEdmsMkey 	= String.valueOf(list.get(0).get("edmsMkey"));
//						fixEdmsSingoNum = String.valueOf(list.get(0).get("edmsSingoNum"));
//					}
//				}else{
//					list = edmsManagementService.getCheckBanip1(map1);
//					if(String.valueOf(list.get(0).get("count")).equals("0")){
//						return new ResponseEntity<>("엔컴통관부터 진행하세요.", HttpStatus.BAD_REQUEST);
//					}else{
//						fixEdmsMkey 	= String.valueOf(list.get(0).get("edmsMkey"));
//						fixEdmsSingoNum = String.valueOf(list.get(0).get("edmsSingoNum"));
//					}
//				}

				//List<Map<String, Object>> jsonList1 = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
				List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
				List<CpsEdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsAttachFileVO.class);
				for (int i = 0, n = voList.size(); i < n; i++) {
					newCpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(voList.get(i).getSDAAKey());
					newCpsEdmsAttachFileVO.setEdmsParentGbn(fixEdmsGubun);
					newCpsEdmsAttachFileVO.setEdmsJisaCode(fixEdmsJisaCode);
					newCpsEdmsAttachFileVO.setEdmsMkey("");
					newCpsEdmsAttachFileVO.setEdmsNo(fixEdmsNum);
					newCpsEdmsAttachFileVO.setEdmsSingoNo("");
					newCpsEdmsAttachFileVO.setCommonYn(fixCommonYn);
					newCpsEdmsAttachFileVO.setEdmsFileCategory(fixEdmsCategory);
					newCpsEdmsAttachFileVO.setEditUserId(userId);
					newCpsEdmsAttachFileVO.setEditUserNm(userName);
					newCpsEdmsAttachFileVO.setEditDtm(currentDatetime);
					newCpsEdmsAttachFileVO.setEdmsSaup(fixEdmsSaup);
					CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(newCpsEdmsAttachFileVO, request);
				}



//				System.out.println("44444444444");
//				System.out.println(jsonList1.size());
//				for (int i = 0, n = jsonList1.size(); i < n; i++) {
//					CpsEdmsAttachFileVO = modelMapper.map(jsonList1.get(i), CpsEdmsAttachFileVO.class);
//					System.out.println("AAAAAAAAAAAA"+CpsEdmsAttachFileVO.getSDAAKey());
//					newCpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1ByEdmsFileKey(CpsEdmsAttachFileVO.getSDAAKey());
//					newCpsEdmsAttachFileVO.setEdmsParentGbn(fixEdmsGubun);
//					newCpsEdmsAttachFileVO.setEdmsJisaCode(fixEdmsJisaCode);
//					newCpsEdmsAttachFileVO.setEdmsMkey(fixEdmsMkey);
//					newCpsEdmsAttachFileVO.setEdmsNo(fixEdmsNum);
//					newCpsEdmsAttachFileVO.setEdmsSingoNo(fixEdmsSingoNum);
//					newCpsEdmsAttachFileVO.setCommonYn(fixCommonYn);
//					newCpsEdmsAttachFileVO.setEdmsFileCategory(fixEdmsCategory);
//					newCpsEdmsAttachFileVO.setEditUserId(userId);
//					newCpsEdmsAttachFileVO.setEditUserNm(userName);
//					newCpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//					CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(newCpsEdmsAttachFileVO, request);
//					notClassificationFileVOList.add(attachFileVO);
//				}
			}else{
				List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
				List<CpsEdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsAttachFileVO.class);
				for (int i = 0, n = voList.size(); i < n; i++) {
					newCpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(voList.get(i).getSDAAKey());
					newCpsEdmsAttachFileVO.setEdmsParentGbn(fixEdmsGubun);
					newCpsEdmsAttachFileVO.setEdmsJisaCode(fixEdmsJisaCode);
					newCpsEdmsAttachFileVO.setEdmsMkey("");
					newCpsEdmsAttachFileVO.setEdmsNo(fixEdmsNum);
					newCpsEdmsAttachFileVO.setEdmsSingoNo("");
					newCpsEdmsAttachFileVO.setCommonYn("N");
					newCpsEdmsAttachFileVO.setEdmsFileCategory(fixEdmsCategory);
					newCpsEdmsAttachFileVO.setEditUserId(userId);
					newCpsEdmsAttachFileVO.setEditUserNm(userName);
					newCpsEdmsAttachFileVO.setEditDtm(currentDatetime);
					newCpsEdmsAttachFileVO.setEdmsSaup(fixEdmsSaup);
					CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(newCpsEdmsAttachFileVO, request);
				}
//
//				List<Map<String, Object>> jsonList1 = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
//				for (int i = 0, n = jsonList1.size(); i < n; i++) {
//					CpsEdmsAttachFileVO = modelMapper.map(jsonList1.get(i), CpsEdmsAttachFileVO.class);
//					newCpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1ByEdmsFileKey(CpsEdmsAttachFileVO.getSDAAKey());
//					newCpsEdmsAttachFileVO.setEdmsParentGbn(fixEdmsGubun);
//					newCpsEdmsAttachFileVO.setEdmsJisaCode("ncustoms");
//					newCpsEdmsAttachFileVO.setEdmsMkey("");
//					newCpsEdmsAttachFileVO.setEdmsNo(fixEdmsNum);
//					newCpsEdmsAttachFileVO.setEdmsSingoNo("");
//					newCpsEdmsAttachFileVO.setCommonYn("N");
//					newCpsEdmsAttachFileVO.setEdmsFileCategory(fixEdmsCategory);
//					newCpsEdmsAttachFileVO.setEditUserId(userId);
//					newCpsEdmsAttachFileVO.setEditUserNm(userName);
//					newCpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//					CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(newCpsEdmsAttachFileVO, request);
//					notClassificationFileVOList.add(attachFileVO);
//				}
			}

//			switch(fixEdmsGubun){
//				case "IMPORT":
//				case "EXPORT":
//				case "SEINETC":
//				case "HWANGUP":
//					if(!CmmnUtils.isNull(notClassificationMasterVO.getEdmsNo())){
//						returnMap = edmsManagementService.fixEdmsNotClassification(notClassificationMasterVO, fixEdmsGubun, request);
//
//						if(!CmmnUtils.isNull(returnMap)){
//							CpsEdmsMasterVO masterVO = modelMapper.map(returnMap.get("CpsEdmsMasterVO"), CpsEdmsMasterVO.class);
//							newEdmsNum 		= masterVO.getEdmsNo();
//							newEdmsGubun 	= masterVO.getEdmsGubun();
//						}else{
//							return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//						}
//					}else{
//						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//					}
//					break;
//				default:
//					break;
//			}

//			List<CpsEdmsAttachFileVO> fileVOs = notClassificationFileVOList;
//			for(CpsEdmsAttachFileVO fileVO : fileVOs){
//
//				newEdmsAttachFileVO.add(attachFileVO);
//				saveFileLogInfo(attachFileVO, request, "edms미분류수정");
//			}

//			returnResponseEntity.put("oldCpsEdmsMasterVO", args.get("edmsMaster"));
//			returnResponseEntity.put("newCpsEdmsMasterVO", returnMap.get("CpsEdmsMasterVO"));
//			returnResponseEntity.put("oldCpsEdmsAttachFileVOList", args.get("edmsAttachFileVOList"));
//			returnResponseEntity.put("newCpsEdmsAttachFileVOList", notClassificationFileVOList);
			return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveRpaFile")
	public ResponseEntity<?> saveRpaFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		CpsEdmsAttachFileVO CpsEdmsAttachFileVO		= new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO newCpsEdmsAttachFileVO 	= new CpsEdmsAttachFileVO();
		Map returnResponseEntity = new HashMap();

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String fixEdmsGubun 	= String.valueOf(args.get("edmsParentGbn"));
		String fixEdmsJisaCode 	= String.valueOf(args.get("edmsJisaCode"));
		String fixComName 		= String.valueOf(args.get("comName"));
		String fixComCode 		= String.valueOf(args.get("comCode"));
		String fixComNum 		= String.valueOf(args.get("comNum"));
		String fixEdmsNum 		= String.valueOf(args.get("edmsNo"));
		String fixCommonYn 		= String.valueOf(args.get("commonYn"));

		try{
			List<CpsEdmsAttachFileVO> notClassificationFileVOList = new ArrayList<>();

			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");

			args.put("_userId", userId);
	  		args.put("_userNm", userName);
	  		args.put("rpaGubun", "1");
	  		args.put("edmsSingoNo", "");
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");

	  		long result = edmsManagementService.insertRpa(args);


			List<CpsEdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsAttachFileVO.class);
			for (int i = 0, n = voList.size(); i < n; i++) {
				newCpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(voList.get(i).getSDAAKey());
				newCpsEdmsAttachFileVO.setEdmsParentGbn(fixEdmsGubun);
				newCpsEdmsAttachFileVO.setEdmsJisaCode(fixEdmsJisaCode);
				newCpsEdmsAttachFileVO.setEdmsNo(fixEdmsNum);
				newCpsEdmsAttachFileVO.setCommonYn(fixCommonYn);
				newCpsEdmsAttachFileVO.setEdmsFileStatus("R");
				newCpsEdmsAttachFileVO.setEditUserId(userId);
				newCpsEdmsAttachFileVO.setEditUserNm(userName);
				newCpsEdmsAttachFileVO.setEditDtm(currentDatetime);
				CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(newCpsEdmsAttachFileVO, request);
				notClassificationFileVOList.add(attachFileVO);
			}
			returnResponseEntity.put("oldCpsEdmsAttachFileVOList", args.get("edmsAttachFileVOList"));
			returnResponseEntity.put("newCpsEdmsAttachFileVOList", notClassificationFileVOList);
			return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveRpaDocFile")
	public ResponseEntity<?> saveRpaDocFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		try{
			args.put("_userId", userId);
	  		args.put("_userNm", userName);
	  		args.put("rpaGubun", "2");
	  		args.put("addDtm", currentDatetime);
	  		args.put("useYn", "Y");

	  		long result1 = edmsManagementService.updateKKOSend(args);
	  		long result2 = edmsManagementService.updateKKOSend1(args);

	  		long result = edmsManagementService.insertRpa(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public void saveFileLogInfo(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request, String actionStr){
		LogFileVO logFileVO = new LogFileVO();
		logFileVO.setFileKey(NumberUtils.createBigDecimal(String.valueOf(CpsEdmsAttachFileVO.getSDAAKey())));
		logFileVO.setFileParentId(String.valueOf(CpsEdmsAttachFileVO.getEdmsNo()));
		logFileVO.setFileParentType(CpsEdmsAttachFileVO.getEdmsParentGbn());
		logFileVO.setFileDocGroup(CpsEdmsAttachFileVO.getEdmsFileCategory());
		logFileVO.setFilePath(CpsEdmsAttachFileVO.getEdmsFilePath());
		logFileVO.setFileName(CpsEdmsAttachFileVO.getEdmsOrgFileNm());
		logFileVO.setFileAction(actionStr);
		logFileVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		logFileVO.setFileServerGubun(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
		logFileVO.setFileServerIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
		logFileVO.setFileClientIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_CLIENT_IP)));
		try{
			logFileDao.save(logFileVO);
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping("/saveEdmsMasterInfo")
	public ResponseEntity<?> saveEdmsMasterInfo(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map targetMap 			= map;
			String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
			String userNm 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			CpsEdmsMasterVO CpsEdmsMasterVO = CmmnUtils.convertMapToBean(targetMap, CpsEdmsMasterVO.class);
			CpsEdmsMasterVO newCpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsKey(CpsEdmsMasterVO.getEdmsKey());

			if(!CmmnUtils.isNull(CpsEdmsMasterVO.getUseYn())){
				newCpsEdmsMasterVO.setUseYn(CpsEdmsMasterVO.getUseYn());
			}

			if(!CmmnUtils.isNull(CpsEdmsMasterVO.getEditUserId())){
				newCpsEdmsMasterVO.setEditUserId(newCpsEdmsMasterVO.getAddUserId());
			}else{
				newCpsEdmsMasterVO.setEditUserId(userId);
			}

			if(!CmmnUtils.isNull(CpsEdmsMasterVO.getEditUserName())){
				newCpsEdmsMasterVO.setEditUserName(newCpsEdmsMasterVO.getAddUserName());
			}else{
				newCpsEdmsMasterVO.setEditUserName(userNm);
			}

			newCpsEdmsMasterVO.setEditUserId(userId);
			newCpsEdmsMasterVO.setEditUserName(userNm);
			newCpsEdmsMasterVO.setEditDtm(currentDatetime);

			CpsEdmsMasterVO returnVO = edmsManagementService.saveEdmsMaster(newCpsEdmsMasterVO, request);
			return new ResponseEntity<>(returnVO, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getfindEdmsMasterList")
	public ResponseEntity<?> getfindEdmsMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<Map> list = edmsManagementService.getfindEdmsMasterList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/uploadEdmsPaperFile")
	public ResponseEntity<?> uploadEdmsPaperFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO = new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;
		String jisa 		= "";
		String singo 		= "";
		String code 		= "";
		String defaultDB 	= "";

		String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if(CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize = mpf.getSize();
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body, ext;
				long sysTime = System.currentTimeMillis();
				if(!originalFileName.substring(0,4).equals("IMP_") && !originalFileName.substring(0,4).equals("EXP_")){
					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
						if(new File(uploadPath + saveFileName).exists()){
							int dot = saveFileName.lastIndexOf(".");
							if(dot != -1){
								body 	= saveFileName.substring(0, dot);
								ext 	= saveFileName.substring(dot);
								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
								}
								saveFileName = body + "_" + sysTime + ext;
							}else{
								saveFileName = saveFileName + "_" + sysTime;
							}
						}
						try{
							mpf.transferTo(new File(uploadPath + saveFileName));
							// 파일정보
							CpsEdmsAttachFileVO.setEdmsParentGbn("PAPER");
							CpsEdmsAttachFileVO.setEdmsJisaCode("ncustoms");
							CpsEdmsAttachFileVO.setEdmsMasterKey("");
							CpsEdmsAttachFileVO.setEdmsMkey("");
							CpsEdmsAttachFileVO.setEdmsNo("");
							CpsEdmsAttachFileVO.setEdmsSingoNo("");
							CpsEdmsAttachFileVO.setCommonYn("N");
							CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
							CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
							CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
							CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
							CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
							CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
							CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
							CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
							CpsEdmsAttachFileVO.setUseYn("Y");
							CpsEdmsAttachFileVO.setAddUserKey("0");
							CpsEdmsAttachFileVO.setAddUserId(userId);
							CpsEdmsAttachFileVO.setAddUserNm(userName);
							CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
							CpsEdmsAttachFileVO.setEditUserId(userId);
							CpsEdmsAttachFileVO.setEditUserNm(userName);
							CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
							CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
							returnVO = saveAttachFile(saveVO, request);
						}catch (IllegalStateException e){
							e.printStackTrace();
							errMap.put("EDMS_NUM", returnVO.getEdmsNo());
							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
							errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
							errMap.put("_errorCause", "IllegalStateException");
							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
						}catch (IOException e){
							e.printStackTrace();
							errMap.put("EDMS_NUM", returnVO.getEdmsNo());
							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
							errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
							errMap.put("_errorCause", "IOException");
							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
						}
					}
				}else{
					jisa  	= originalFileName.substring(4,9);
					singo 	= originalFileName.substring(4,18);
					if(originalFileName.substring(0,4).equals("EXP_")){
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms_sel_040";
		    			}

	    				String edmsParentGbn 	= "EXPORT";
	    				String edmsSingoNo 	= singo;

//	    				List<CpsEdmsAttachFileVO> delFileList;
//	    				Map delmap = new HashMap();
//	    				delmap.put("edmsSingoNo", edmsSingoNo);
//	    				delmap.put("edmsFileCategory", "B0001");
//	    				delmap.put("useYn", "Y");
//	    				delFileList = edmsManagementService.getEdmsFileList(delmap);
	    				//같은 필증이 있는지 확인하여 있으면 넘어가고 없으면 저장
//	    				if(delFileList.size() > 0){
//	    				}else{
	    					Map map1 = new HashMap();
	    					map1.put("singoNo", edmsSingoNo);
	    					map1.put("_defaultDB", defaultDB);

	    					List<Map> list1 = edmsManagementService.getExportPaperList(map1);
	  	    			  	if(list1.size() > 0){
		    					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
		    						if(new File(uploadPath + saveFileName).exists()){
		    							int dot = saveFileName.lastIndexOf(".");
		    							if(dot != -1){
		    								body 	= saveFileName.substring(0, dot);
		    								ext 	= saveFileName.substring(dot);
		    								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
		    									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		    								}
		    								saveFileName = body + "_" + sysTime + ext;
		    							}else{
		    								saveFileName = saveFileName + "_" + sysTime;
		    							}
		    						}

		    						try{
										mpf.transferTo(new File(uploadPath + saveFileName));
										CpsEdmsAttachFileVO.setEdmsParentGbn("EXPORT");
										CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
										CpsEdmsAttachFileVO.setEdmsMasterKey("");
										CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list1.get(0).get("expo_key").toString()));
										CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list1.get(0).get("Expo_iv_no").toString()));
										CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
										CpsEdmsAttachFileVO.setCommonYn("N");
										CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
										CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
										CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
										CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
										CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
										CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
										CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
										CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
										CpsEdmsAttachFileVO.setUseYn("Y");
										CpsEdmsAttachFileVO.setAddUserKey("0");
										CpsEdmsAttachFileVO.setAddUserId(userId);
										CpsEdmsAttachFileVO.setAddUserNm(userName);
										CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
										CpsEdmsAttachFileVO.setEditUserId(userId);
										CpsEdmsAttachFileVO.setEditUserNm(userName);
										CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
										CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
										returnVO = saveAttachFile(saveVO, request);
		    						}catch (IllegalStateException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IllegalStateException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
		    						}catch (IOException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IOException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
		    						}
								}
	  	    			  	}
//	    				}
					}else{
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms";
		    			}

	    				String edmsParentGbn 	= "IMPORT";
	    				String edmsSingoNo 		= singo;

//	    				List<CpsEdmsAttachFileVO> delFileList;
//	    				Map delmap = new HashMap();
//	    				delmap.put("edmsSingoNo", edmsSingoNo);
//	    				delmap.put("edmsFileCategory", "B0001");
//	    				delmap.put("useYn", "Y");
//	    				delFileList = edmsManagementService.getEdmsFileList(delmap);
//
//	    				if(delFileList.size() > 0){
//	    				}else{
	    					Map map1 = new HashMap();
	    					map1.put("singoNo", edmsSingoNo);
	    					map1.put("_defaultDB", defaultDB);

	    					List<Map> list2 = edmsManagementService.getImportPaperList(map1);
	  	        		  	if(list2.size() > 0){
	  	        		  		if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	  	        		  			if(new File(uploadPath + saveFileName).exists()){
	  	        		  				int dot = saveFileName.lastIndexOf(".");
	  	        		  				if(dot != -1){
	  	        		  					body = saveFileName.substring(0, dot);
	  	        		  					ext = saveFileName.substring(dot); // includes "."
	  	        		  					if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	  	        		  						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	        		  					}
	  	        		  					saveFileName = body + "_" + sysTime + ext;
	  	        		  				}else{
	  	        		  					saveFileName = saveFileName + "_" + sysTime;
	  	        		  				}
	  	        		  			}

	  	        		  			try{
										mpf.transferTo(new File(uploadPath + saveFileName));
										// 파일정보
										CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
										CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
										CpsEdmsAttachFileVO.setEdmsMasterKey("");
										CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list2.get(0).get("impo_key").toString()));
										CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list2.get(0).get("Impo_bl_no").toString()));
										CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
										CpsEdmsAttachFileVO.setCommonYn("N");
										CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
										CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
										CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
										CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
										CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
										CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
										CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
										CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
										CpsEdmsAttachFileVO.setUseYn("Y");
										CpsEdmsAttachFileVO.setAddUserKey("0");
										CpsEdmsAttachFileVO.setAddUserId(userId);
										CpsEdmsAttachFileVO.setAddUserNm(userName);
										CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
										CpsEdmsAttachFileVO.setEditUserId(userId);
										CpsEdmsAttachFileVO.setEditUserNm(userName);
										CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
										CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
										returnVO = saveAttachFile(saveVO, request);
	  	        		  			}catch(IllegalStateException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IllegalStateException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  	        		  			}catch(IOException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IOException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  	        		  			}
	  	        		  		}
	  	        		  	}
//	    				}
	    			}
	    		}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadEdmsPilFile")
	public ResponseEntity<?> uploadEdmsPilFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO = new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;
		String jisa 		= "";
		String singo 		= "";
		String code 		= "";
		String defaultDB 	= "";

		String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if(CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize = mpf.getSize();
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body, ext;
				long sysTime = System.currentTimeMillis();
				int pos = originalFileName.lastIndexOf( "." );
				String ext1 = originalFileName.substring( pos + 1 );
				if(ext1.equals("zip")){
					continue;
				}else{
					jisa  	= originalFileName.substring(4,9);
					singo 	= originalFileName.substring(4,18);
					if(originalFileName.substring(0,4).equals("EXP_")){
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms_sel_040";
		    			}

	    				String edmsParentGbn 	= "EXPORT";
	    				String edmsSingoNo 	= singo;

	    				List<CpsEdmsAttachFileVO> delFileList;
	    				Map delmap = new HashMap();
	    				delmap.put("edmsSingoNo", edmsSingoNo);
	    				delmap.put("edmsFileCategory", "B0001");
	    				delmap.put("useYn", "Y");
	    				delFileList = edmsManagementService.getEdmsFileList(delmap);
	    				//같은 필증이 있는지 확인하여 있으면 넘어가고 없으면 저장
	    				if(delFileList.size() > 0){
	    				}else{
	    					Map map1 = new HashMap();
	    					map1.put("singoNo", edmsSingoNo);
	    					map1.put("_defaultDB", defaultDB);

	    					List<Map> list1 = edmsManagementService.getExportPaperList(map1);
	  	    			  	if(list1.size() > 0){
		    					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
		    						if(new File(uploadPath + saveFileName).exists()){
		    							int dot = saveFileName.lastIndexOf(".");
		    							if(dot != -1){
		    								body 	= saveFileName.substring(0, dot);
		    								ext 	= saveFileName.substring(dot);
		    								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
		    									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		    								}
		    								saveFileName = body + "_" + sysTime + ext;
		    							}else{
		    								saveFileName = saveFileName + "_" + sysTime;
		    							}
		    						}

		    						try{
										mpf.transferTo(new File(uploadPath + saveFileName));
										CpsEdmsAttachFileVO.setEdmsParentGbn("EXPORT");
										CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
										CpsEdmsAttachFileVO.setEdmsMasterKey("");
										CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list1.get(0).get("expo_key").toString()));
										CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list1.get(0).get("Expo_iv_no").toString()));
										CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
										CpsEdmsAttachFileVO.setCommonYn("N");
										CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
										CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
										CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
										CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
										CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
										CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
										CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
										CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
										CpsEdmsAttachFileVO.setUseYn("Y");
										CpsEdmsAttachFileVO.setAddUserKey("0");
										CpsEdmsAttachFileVO.setAddUserId(userId);
										CpsEdmsAttachFileVO.setAddUserNm(userName);
										CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
										CpsEdmsAttachFileVO.setEditUserId(userId);
										CpsEdmsAttachFileVO.setEditUserNm(userName);
										CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
										CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
										returnVO = saveAttachFile(saveVO, request);
		    						}catch (IllegalStateException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IllegalStateException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
		    						}catch (IOException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IOException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
		    						}
								}
	  	    			  	}
	    				}
					}else{
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms";
		    			}

	    				String edmsParentGbn 	= "IMPORT";
	    				String edmsSingoNo 	= singo;

	    				List<CpsEdmsAttachFileVO> delFileList;
	    				Map delmap = new HashMap();
	    				delmap.put("edmsSingoNo", edmsSingoNo);
	    				delmap.put("edmsFileCategory", "B0001");
	    				delmap.put("useYn", "Y");
	    				delFileList = edmsManagementService.getEdmsFileList(delmap);

	    				if(delFileList.size() > 0){
	    				}else{
	    					Map map1 = new HashMap();
	    					map1.put("singoNo", edmsSingoNo);
	    					map1.put("_defaultDB", defaultDB);

	    					List<Map> list2 = edmsManagementService.getImportPaperList(map1);
	  	        		  	if(list2.size() > 0){
	  	        		  		if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	  	        		  			if(new File(uploadPath + saveFileName).exists()){
	  	        		  				int dot = saveFileName.lastIndexOf(".");
	  	        		  				if(dot != -1){
	  	        		  					body = saveFileName.substring(0, dot);
	  	        		  					ext = saveFileName.substring(dot); // includes "."
	  	        		  					if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	  	        		  						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	        		  					}
	  	        		  					saveFileName = body + "_" + sysTime + ext;
	  	        		  				}else{
	  	        		  					saveFileName = saveFileName + "_" + sysTime;
	  	        		  				}
	  	        		  			}

	  	        		  			try{
										mpf.transferTo(new File(uploadPath + saveFileName));
										// 파일정보
										CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
										CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
										CpsEdmsAttachFileVO.setEdmsMasterKey("");
										CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list2.get(0).get("impo_key").toString()));
										CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list2.get(0).get("Impo_bl_no").toString()));
										CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
										CpsEdmsAttachFileVO.setCommonYn("N");
										CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
										CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
										CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
										CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
										CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
										CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
										CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
										CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
										CpsEdmsAttachFileVO.setUseYn("Y");
										CpsEdmsAttachFileVO.setAddUserKey("0");
										CpsEdmsAttachFileVO.setAddUserId(userId);
										CpsEdmsAttachFileVO.setAddUserNm(userName);
										CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
										CpsEdmsAttachFileVO.setEditUserId(userId);
										CpsEdmsAttachFileVO.setEditUserNm(userName);
										CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
										CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
										returnVO = saveAttachFile(saveVO, request);
	  	        		  			}catch(IllegalStateException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IllegalStateException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  	        		  			}catch(IOException e){
										e.printStackTrace();
										errMap.put("EDMS_NUM", returnVO.getEdmsNo());
										errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
										errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
										errMap.put("_errorCause", "IOException");
										return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  	        		  			}
	  	        		  		}
	  	        		  	}
	    				}
	    			}
	    		}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadEdmsPaper2File")
	public ResponseEntity<?> uploadEdmsPaper2File(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO = new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;
		String jisa 		= "";
		String singo 		= "";
		String singoL 		= "";
		String code 		= "";
		String defaultDB 	= "";

		String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if(CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize = mpf.getSize();
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body, ext;
				long sysTime = System.currentTimeMillis();
				if(!originalFileName.substring(0,3).equals("IM_") && !originalFileName.substring(0,3).equals("EX_") && !originalFileName.substring(5,6).equals("-")){
					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
						if(new File(uploadPath + saveFileName).exists()){
							int dot = saveFileName.lastIndexOf(".");
							if(dot != -1){
								body 	= saveFileName.substring(0, dot);
								ext 	= saveFileName.substring(dot);
								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
								}
								saveFileName = body + "_" + sysTime + ext;
							}else{
								saveFileName = saveFileName + "_" + sysTime;
							}
						}
						try{
							mpf.transferTo(new File(uploadPath + saveFileName));
							// 파일정보
							CpsEdmsAttachFileVO.setEdmsParentGbn("TPAPER");
							CpsEdmsAttachFileVO.setEdmsJisaCode("ncustoms");
							CpsEdmsAttachFileVO.setEdmsMasterKey("");
							CpsEdmsAttachFileVO.setEdmsMkey("");
							CpsEdmsAttachFileVO.setEdmsNo("");
							CpsEdmsAttachFileVO.setEdmsSingoNo("");
							CpsEdmsAttachFileVO.setCommonYn("N");
							CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
							CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
							CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
							CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
							CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
							CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
							CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
							CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
							CpsEdmsAttachFileVO.setUseYn("Y");
							CpsEdmsAttachFileVO.setAddUserKey("0");
							CpsEdmsAttachFileVO.setAddUserId(userId);
							CpsEdmsAttachFileVO.setAddUserNm(userName);
							CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
							CpsEdmsAttachFileVO.setEditUserId(userId);
							CpsEdmsAttachFileVO.setEditUserNm(userName);
							CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
							CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
							returnVO = saveAttachFile(saveVO, request);
						}catch (IllegalStateException e){
							e.printStackTrace();
							errMap.put("EDMS_NUM", returnVO.getEdmsNo());
							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
							errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
							errMap.put("_errorCause", "IllegalStateException");
							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
						}catch (IOException e){
							e.printStackTrace();
							errMap.put("EDMS_NUM", returnVO.getEdmsNo());
							errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
							errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
							errMap.put("_errorCause", "IOException");
							return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
						}
					}
				}else{
					jisa  	= originalFileName.substring(3,8);
					singo 	= originalFileName.substring(3,17);
					singoL 	= originalFileName.substring(6,20);
					if(originalFileName.substring(0,3).equals("EX_")){
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms_sel_040";
		    			}

	    				String edmsParentGbn 	= "EXPORT";
	    				String edmsSingoNo 	= singo;

    					Map map1 = new HashMap();
    					map1.put("singoNo", edmsSingoNo);
    					map1.put("_defaultDB", defaultDB);

    					List<Map> list1 = edmsManagementService.getExportPaperList(map1);
  	    			  	if(list1.size() > 0){
	    					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	    						if(new File(uploadPath + saveFileName).exists()){
	    							int dot = saveFileName.lastIndexOf(".");
	    							if(dot != -1){
	    								body 	= saveFileName.substring(0, dot);
	    								ext 	= saveFileName.substring(dot);
	    								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	    									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    								}
	    								saveFileName = body + "_" + sysTime + ext;
	    							}else{
	    								saveFileName = saveFileName + "_" + sysTime;
	    							}
	    						}

	    						try{
									mpf.transferTo(new File(uploadPath + saveFileName));
									CpsEdmsAttachFileVO.setEdmsParentGbn("EXPORT");
									CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
									CpsEdmsAttachFileVO.setEdmsMasterKey("");
									CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list1.get(0).get("expo_key").toString()));
									CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list1.get(0).get("Expo_iv_no").toString()));
									CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
									CpsEdmsAttachFileVO.setCommonYn("N");
									CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
									CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
									CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
									CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
									CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
									CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
									CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
									CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
									CpsEdmsAttachFileVO.setUseYn("Y");
									CpsEdmsAttachFileVO.setAddUserKey("0");
									CpsEdmsAttachFileVO.setAddUserId(userId);
									CpsEdmsAttachFileVO.setAddUserNm(userName);
									CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
									CpsEdmsAttachFileVO.setEditUserId(userId);
									CpsEdmsAttachFileVO.setEditUserNm(userName);
									CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
									CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
									returnVO = saveAttachFile(saveVO, request);
	    						}catch (IllegalStateException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IllegalStateException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	    						}catch (IOException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IOException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	    						}
							}
  	    			  	}
					}else if(originalFileName.substring(0,3).equals("IM_")){
		    			if(jisa.equals("42119")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(jisa.equals("42530")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(jisa.equals("43494")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(jisa.equals("40629")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(jisa.equals("42773")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(jisa.equals("42423")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(jisa.equals("43862")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(jisa.equals("43618")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(jisa.equals("42064")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(jisa.equals("43466")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("44121")){
		    				defaultDB = "ncustoms_us";
		    			}else if(jisa.equals("42095")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(jisa.equals("43522")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(jisa.equals("42526")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(jisa.equals("43617")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(jisa.equals("44274")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms";
		    			}

	    				String edmsParentGbn 	= "IMPORT";
	    				String edmsSingoNo 	= singo;

    					Map map1 = new HashMap();
    					map1.put("singoNo", edmsSingoNo);
    					map1.put("_defaultDB", defaultDB);

    					List<Map> list2 = edmsManagementService.getImportPaperList(map1);
  	        		  	if(list2.size() > 0){
  	        		  		if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
  	        		  			if(new File(uploadPath + saveFileName).exists()){
  	        		  				int dot = saveFileName.lastIndexOf(".");
  	        		  				if(dot != -1){
  	        		  					body = saveFileName.substring(0, dot);
  	        		  					ext = saveFileName.substring(dot); // includes "."
  	        		  					if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
  	        		  						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  	        		  					}
  	        		  					saveFileName = body + "_" + sysTime + ext;
  	        		  				}else{
  	        		  					saveFileName = saveFileName + "_" + sysTime;
  	        		  				}
  	        		  			}

  	        		  			try{
									mpf.transferTo(new File(uploadPath + saveFileName));
									// 파일정보
									CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
									CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
									CpsEdmsAttachFileVO.setEdmsMasterKey("");
									CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list2.get(0).get("impo_key").toString()));
									CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list2.get(0).get("Impo_bl_no").toString()));
									CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
									CpsEdmsAttachFileVO.setCommonYn("N");
									CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
									CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
									CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
									CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
									CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
									CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
									CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
									CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
									CpsEdmsAttachFileVO.setUseYn("Y");
									CpsEdmsAttachFileVO.setAddUserKey("0");
									CpsEdmsAttachFileVO.setAddUserId(userId);
									CpsEdmsAttachFileVO.setAddUserNm(userName);
									CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
									CpsEdmsAttachFileVO.setEditUserId(userId);
									CpsEdmsAttachFileVO.setEditUserNm(userName);
									CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
									CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
									returnVO = saveAttachFile(saveVO, request);
  	        		  			}catch(IllegalStateException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IllegalStateException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}catch(IOException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IOException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}
  	        		  		}
  	        		  	}
	    			}else{
	    				//인천공항 롯데면세점 병합일괄등록 2019-06-14
		    			defaultDB = "ncustoms_yj";

	    				String edmsParentGbn 	= "IMPORT";
	    				String edmsSingoNo 	= singoL;

    					Map map1 = new HashMap();
    					map1.put("singoNo", edmsSingoNo);
    					map1.put("_defaultDB", defaultDB);

    					List<Map> list2 = edmsManagementService.getImportPaperList(map1);
  	        		  	if(list2.size() > 0){
  	        		  		if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
  	        		  			if(new File(uploadPath + saveFileName).exists()){
  	        		  				int dot = saveFileName.lastIndexOf(".");
  	        		  				if(dot != -1){
  	        		  					body = saveFileName.substring(0, dot);
  	        		  					ext = saveFileName.substring(dot); // includes "."
  	        		  					if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
  	        		  						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  	        		  					}
  	        		  					saveFileName = body + "_" + sysTime + ext;
  	        		  				}else{
  	        		  					saveFileName = saveFileName + "_" + sysTime;
  	        		  				}
  	        		  			}

  	        		  			try{
									mpf.transferTo(new File(uploadPath + saveFileName));
									// 파일정보
									CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
									CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
									CpsEdmsAttachFileVO.setEdmsMasterKey("");
									CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list2.get(0).get("impo_key").toString()));
									CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list2.get(0).get("Impo_bl_no").toString()));
									CpsEdmsAttachFileVO.setEdmsSingoNo(edmsSingoNo);
									CpsEdmsAttachFileVO.setCommonYn("N");
									CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
									CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
									CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
									CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
									CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
									CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
									CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
									CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
									CpsEdmsAttachFileVO.setUseYn("Y");
									CpsEdmsAttachFileVO.setAddUserKey("0");
									CpsEdmsAttachFileVO.setAddUserId(userId);
									CpsEdmsAttachFileVO.setAddUserNm(userName);
									CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
									CpsEdmsAttachFileVO.setEditUserId(userId);
									CpsEdmsAttachFileVO.setEditUserNm(userName);
									CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
									CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
									returnVO = saveAttachFile(saveVO, request);
  	        		  			}catch(IllegalStateException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IllegalStateException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}catch(IOException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IOException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}
  	        		  		}
  	        		  	}
	    			}
	    		}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadEdmsPaper3File")
	public ResponseEntity<?> uploadEdmsPaper3File(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO = new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String teamCode 		= String.valueOf(mRequest.getParameter("teamCode"));
		String edmsGubun 		= String.valueOf(mRequest.getParameter("edmsGubun"));
		String uploadPathType 	= edmsFileUploadPath;
		String jisa 		= "";
		String singo		= "";
		String code 		= "";
		String defaultDB 	= "";

		String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if(CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize = mpf.getSize();
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body, ext;
				long sysTime = System.currentTimeMillis();
				if(!edmsGubun.equals("IMPORT") && !edmsGubun.equals("EXPORT")){
				}else{
					singo 	= originalFileName.substring(0, originalFileName.lastIndexOf("."));
					if(edmsGubun.equals("EXPORT")){
		    			if(teamCode.equals("021")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(teamCode.equals("022")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(teamCode.equals("008")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(teamCode.equals("026")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(teamCode.equals("025")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(teamCode.equals("021")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(teamCode.equals("028")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(teamCode.equals("027")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(teamCode.equals("039")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(teamCode.equals("044")){
		    				defaultDB = "ncustoms_us";
		    			}else if(teamCode.equals("029")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(teamCode.equals("030")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(teamCode.equals("075")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(teamCode.equals("050")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(teamCode.equals("076")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms_sel_040";
		    			}

	    				String edmsParentGbn 	= "EXPORT";
	    				String edmsSingoNo 	= singo;

    					Map map1 = new HashMap();
    					map1.put("singoNo", edmsSingoNo);
    					map1.put("_defaultDB", defaultDB);

    					List<Map> list1 = edmsManagementService.getExportPaper1List(map1);
  	    			  	if(list1.size() > 0){
	    					if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	    						if(new File(uploadPath + saveFileName).exists()){
	    							int dot = saveFileName.lastIndexOf(".");
	    							if(dot != -1){
	    								body 	= saveFileName.substring(0, dot);
	    								ext 	= saveFileName.substring(dot);
	    								if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	    									return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    								}
	    								saveFileName = body + "_" + sysTime + ext;
	    							}else{
	    								saveFileName = saveFileName + "_" + sysTime;
	    							}
	    						}

	    						try{
									mpf.transferTo(new File(uploadPath + saveFileName));
									CpsEdmsAttachFileVO.setEdmsParentGbn("EXPORT");
									CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
									CpsEdmsAttachFileVO.setEdmsMasterKey("");
									CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list1.get(0).get("expo_key").toString()));
									CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list1.get(0).get("Expo_iv_no").toString()));
									CpsEdmsAttachFileVO.setEdmsSingoNo("");
									CpsEdmsAttachFileVO.setCommonYn("Y");
									CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
									CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
									CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
									CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
									CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
									CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
									CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
									CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
									CpsEdmsAttachFileVO.setUseYn("Y");
									CpsEdmsAttachFileVO.setAddUserKey("0");
									CpsEdmsAttachFileVO.setAddUserId(userId);
									CpsEdmsAttachFileVO.setAddUserNm(userName);
									CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
									CpsEdmsAttachFileVO.setEditUserId(userId);
									CpsEdmsAttachFileVO.setEditUserNm(userName);
									CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
									CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
									returnVO = saveAttachFile(saveVO, request);
	    						}catch (IllegalStateException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IllegalStateException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	    						}catch (IOException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IOException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	    						}
							}
  	    			  	}else{
	  	    			  	if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	  							if(new File(uploadPath + saveFileName).exists()){
	  								int dot = saveFileName.lastIndexOf(".");
	  								if(dot != -1){
	  									body 	= saveFileName.substring(0, dot);
	  									ext 	= saveFileName.substring(dot);
	  									if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	  										return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  									}
	  									saveFileName = body + "_" + sysTime + ext;
	  								}else{
	  									saveFileName = saveFileName + "_" + sysTime;
	  								}
	  							}
	  							try{
	  								mpf.transferTo(new File(uploadPath + saveFileName));
	  								// 파일정보
	  								CpsEdmsAttachFileVO.setEdmsParentGbn("BLINV");
	  								CpsEdmsAttachFileVO.setEdmsJisaCode("ncustoms");
	  								CpsEdmsAttachFileVO.setEdmsMasterKey("");
	  								CpsEdmsAttachFileVO.setEdmsMkey("");
	  								CpsEdmsAttachFileVO.setEdmsNo("");
	  								CpsEdmsAttachFileVO.setEdmsSingoNo("");
	  								CpsEdmsAttachFileVO.setCommonYn("Y");
	  								CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
	  								CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
	  								CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
	  								CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
	  								CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
	  								CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
	  								CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
	  								CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
	  								CpsEdmsAttachFileVO.setUseYn("Y");
	  								CpsEdmsAttachFileVO.setAddUserKey("0");
	  								CpsEdmsAttachFileVO.setAddUserId(userId);
	  								CpsEdmsAttachFileVO.setAddUserNm(userName);
	  								CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
	  								CpsEdmsAttachFileVO.setEditUserId(userId);
	  								CpsEdmsAttachFileVO.setEditUserNm(userName);
	  								CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
	  								CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
	  								returnVO = saveAttachFile(saveVO, request);
	  							}catch (IllegalStateException e){
	  								e.printStackTrace();
	  								errMap.put("EDMS_NUM", returnVO.getEdmsNo());
	  								errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
	  								errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
	  								errMap.put("_errorCause", "IllegalStateException");
	  								return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  							}catch (IOException e){
	  								e.printStackTrace();
	  								errMap.put("EDMS_NUM", returnVO.getEdmsNo());
	  								errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
	  								errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
	  								errMap.put("_errorCause", "IOException");
	  								return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  							}
	  						}
  	    			  	}
					}else{
						if(teamCode.equals("021")){
		    				defaultDB = "ncustoms_ic";
		    			}else if(teamCode.equals("022")){
		    				defaultDB = "ncustoms_pj";
		    			}else if(teamCode.equals("008")){
		    				defaultDB = "ncustoms_sel4";
		    			}else if(teamCode.equals("026")){
		    				defaultDB = "ncustoms_pt";
		    			}else if(teamCode.equals("025")){
		    				defaultDB = "ncustoms_sn";
		    			}else if(teamCode.equals("021")){
		    				defaultDB = "ncustoms_yj";
		    			}else if(teamCode.equals("028")){
		    				defaultDB = "ncustoms_ca";
		    			}else if(teamCode.equals("027")){
		    				defaultDB = "ncustoms_cj";
		    			}else if(teamCode.equals("039")){
		    				defaultDB = "ncustoms_bs";
		    			}else if(teamCode.equals("044")){
		    				defaultDB = "ncustoms_us";
		    			}else if(teamCode.equals("029")){
		    				defaultDB = "ncustoms_gm";
		    			}else if(teamCode.equals("030")){
		    				defaultDB = "ncustoms_cw";
		    			}else if(teamCode.equals("075")){
		    				defaultDB = "ncustoms_jj";
		    			}else if(teamCode.equals("050")){
		    				defaultDB = "ncustoms_ys";
		    			}else if(teamCode.equals("076")){
		    				defaultDB = "ncustoms_dj";
		    			}else{
		    				defaultDB = "ncustoms";
		    			}

	    				String edmsParentGbn 	= "IMPORT";
	    				String edmsSingoNo 	= singo;

    					Map map1 = new HashMap();
    					map1.put("singoNo", edmsSingoNo);
    					map1.put("_defaultDB", defaultDB);

    					List<Map> list2 = edmsManagementService.getImportPaper1List(map1);
  	        		  	if(list2.size() > 0){
  	        		  		if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
  	        		  			if(new File(uploadPath + saveFileName).exists()){
  	        		  				int dot = saveFileName.lastIndexOf(".");
  	        		  				if(dot != -1){
  	        		  					body = saveFileName.substring(0, dot);
  	        		  					ext = saveFileName.substring(dot); // includes "."
  	        		  					if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
  	        		  						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  	        		  					}
  	        		  					saveFileName = body + "_" + sysTime + ext;
  	        		  				}else{
  	        		  					saveFileName = saveFileName + "_" + sysTime;
  	        		  				}
  	        		  			}

  	        		  			try{
									mpf.transferTo(new File(uploadPath + saveFileName));
									// 파일정보
									CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
									CpsEdmsAttachFileVO.setEdmsJisaCode(defaultDB);
									CpsEdmsAttachFileVO.setEdmsMasterKey("");
									CpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list2.get(0).get("impo_key").toString()));
									CpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list2.get(0).get("Impo_bl_no").toString()));
									CpsEdmsAttachFileVO.setEdmsSingoNo("");
									CpsEdmsAttachFileVO.setCommonYn("Y");
									CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
									CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
									CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
									CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
									CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
									CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
									CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
									CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
									CpsEdmsAttachFileVO.setUseYn("Y");
									CpsEdmsAttachFileVO.setAddUserKey("0");
									CpsEdmsAttachFileVO.setAddUserId(userId);
									CpsEdmsAttachFileVO.setAddUserNm(userName);
									CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
									CpsEdmsAttachFileVO.setEditUserId(userId);
									CpsEdmsAttachFileVO.setEditUserNm(userName);
									CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
									CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
									returnVO = saveAttachFile(saveVO, request);
  	        		  			}catch(IllegalStateException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IllegalStateException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}catch(IOException e){
									e.printStackTrace();
									errMap.put("EDMS_NUM", returnVO.getEdmsNo());
									errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
									errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
									errMap.put("_errorCause", "IOException");
									return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
  	        		  			}
  	        		  		}
  	        		  	}else{
	  	    			  	if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
	  							if(new File(uploadPath + saveFileName).exists()){
	  								int dot = saveFileName.lastIndexOf(".");
	  								if(dot != -1){
	  									body 	= saveFileName.substring(0, dot);
	  									ext 	= saveFileName.substring(dot);
	  									if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
	  										return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  									}
	  									saveFileName = body + "_" + sysTime + ext;
	  								}else{
	  									saveFileName = saveFileName + "_" + sysTime;
	  								}
	  							}
	  							try{
	  								mpf.transferTo(new File(uploadPath + saveFileName));
	  								// 파일정보
	  								CpsEdmsAttachFileVO.setEdmsParentGbn("BLINV");
	  								CpsEdmsAttachFileVO.setEdmsJisaCode("ncustoms");
	  								CpsEdmsAttachFileVO.setEdmsMasterKey("");
	  								CpsEdmsAttachFileVO.setEdmsMkey("");
	  								CpsEdmsAttachFileVO.setEdmsNo("");
	  								CpsEdmsAttachFileVO.setEdmsSingoNo("");
	  								CpsEdmsAttachFileVO.setCommonYn("Y");
	  								CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
	  								CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
	  								CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
	  								CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
	  								CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
	  								CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
	  								CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
	  								CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
	  								CpsEdmsAttachFileVO.setUseYn("Y");
	  								CpsEdmsAttachFileVO.setAddUserKey("0");
	  								CpsEdmsAttachFileVO.setAddUserId(userId);
	  								CpsEdmsAttachFileVO.setAddUserNm(userName);
	  								CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
	  								CpsEdmsAttachFileVO.setEditUserId(userId);
	  								CpsEdmsAttachFileVO.setEditUserNm(userName);
	  								CpsEdmsAttachFileVO.setEditDtm(currentDatetime);
	  								CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
	  								returnVO = saveAttachFile(saveVO, request);
	  							}catch (IllegalStateException e){
	  								e.printStackTrace();
	  								errMap.put("EDMS_NUM", returnVO.getEdmsNo());
	  								errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
	  								errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
	  								errMap.put("_errorCause", "IllegalStateException");
	  								return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  							}catch (IOException e){
	  								e.printStackTrace();
	  								errMap.put("EDMS_NUM", returnVO.getEdmsNo());
	  								errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
	  								errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
	  								errMap.put("_errorCause", "IOException");
	  								return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
	  							}
	  						}
  	        		  	}
	    			}
	    		}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveAttachFile(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request) throws Exception{
		CpsEdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(CpsEdmsAttachFileVO, request);
		saveFileLogInfo(returnVO, request, "edms파일업로드");
		return returnVO;
	}

	@RequestMapping(value = "/getEdmsMasterWithNotClassificationFileList")
	public ResponseEntity<?> getEdmsMasterWithNotClassificationFileList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			String edmsGubun = String.valueOf(args.get("edmsGubun"));
			String defaultDB = String.valueOf(args.get("_defaultDB"));
			String edmsStatus = String.valueOf(args.get("edmsStatus"));
			if(edmsStatus.equals("전제")){
				args.put("edmsStatus", "");
				args.put("attchDocGbn", "전제(사후)");
			}
			CpsEdmsTeamVO CpsEdmsTeamVO 	= new CpsEdmsTeamVO();
			CpsEdmsExportVO CpsEdmsExportVO = new CpsEdmsExportVO();

			if(edmsGubun.equals("IMPORT")){
				if(defaultDB.equals("ncustoms")){
					List<Map> list = edmsManagementService.getEdmsTeamWithNotClassificationFileList(args);
					List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
					return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
				}else{
					List<Map> list = edmsManagementService.getEdmsWithNotClassificationFileList(args);
					List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
					return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
				}
			}else if(edmsGubun.equals("EXPORT")){
				if(defaultDB.equals("ncustoms_sel_040")){
					List<Map> list = edmsManagementService.getEdmsExportWithNotClassificationFileList(args);
					List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
					return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
				}else{
					List<Map> list = edmsManagementService.getEdmsExWithNotClassificationFileList(args);
					List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
					return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
				}
			}else{
				List<Map> list = edmsManagementService.getEdmsExBanipWithNotClassificationFileList(args);
				List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
				return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getEdmsPreFileList")
	public ResponseEntity<?> getEdmsPreFileList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			CpsEdmsTeamVO CpsEdmsTeamVO 	= new CpsEdmsTeamVO();
			CpsEdmsExportVO CpsEdmsExportVO = new CpsEdmsExportVO();

			List<Map> list = edmsManagementService.getEdmsPreFileList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getEdmsMasterWithFileList")
	public ResponseEntity<?> getEdmsMasterWithFileList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<Map> list = edmsManagementService.getEdmsMasterWithFileList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downloadEdmsFile", method = {RequestMethod.GET})
	public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "SDAAKey") BigDecimal SDAAKey, HttpServletResponse response) throws UnsupportedEncodingException {
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath = null, reqFileName = null;

		try{
			List<CpsEdmsAttachFileVO> voList;
			Map args = new HashMap();
			args.put("SDAAKey", SDAAKey);
			voList = edmsManagementService.getEdmsFileList(args);
			if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

			CpsEdmsAttachFileVO returnVO = voList.get(0);
			// 로그 저장
			saveFileLogInfo(returnVO, request, "edms파일다운로드");

			// 다운로드 파일명 존재시 해당 파일명으로 다운로드
			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getEdmsOrgFileNm());

			reqFilePath = returnVO.getEdmsFilePath();
			reqFileName = returnVO.getEdmsSaveFileNm();

			File fileToDownload = new File(reqFilePath + reqFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/deleteEdmsFile")
	public ResponseEntity<?> deleteEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result 			= "";
		BigDecimal SDAAKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("SDAAKey")));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		List<CpsEdmsAttachFileVO> voList;
		Map map = new HashMap();
		map.put("SDAAKey", SDAAKey);
		voList = edmsManagementService.getEdmsFileList(map);
		if(CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

		CpsEdmsAttachFileVO returnVO = voList.get(0);

		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileNm());
		if(file.isFile()){
			returnVO.setUseYn("N");
			returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
			returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			returnVO.setEditDtm(currentDatetime);
			edmsManagementService.saveEdmsFileInfo(returnVO, request);

			// 로그 저장
			saveFileLogInfo(returnVO, request, "edms파일삭제");

			// 파일 삭제
			String uploadPath = returnVO.getEdmsFilePath();
			result = CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileNm());
			if(!"".equals(result)){
				return new ResponseEntity<>(returnVO, HttpStatus.OK);
			}else{
				result = "fail";
				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
			}
		}else{
			result = "fail";
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downNoFile", method = {RequestMethod.GET})
	public void downNoFile(HttpServletRequest request, @RequestParam(value = "_defaultDB") String _defaultDB,
			@RequestParam(value = "edmsMasterUserId") String edmsMasterUserId, @RequestParam(value = "teamCode") String teamCode,
			@RequestParam(value = "edmsGubun") String edmsGubun, @RequestParam(value = "edmsStatus") String edmsStatus,
			@RequestParam(value = "useYn") String useYn, @RequestParam(value = "_DateType") String _DateType,
			@RequestParam(value = "strFromDate") String strFromDate, @RequestParam(value = "strToDate") String strToDate, HttpServletResponse response) throws UnsupportedEncodingException {

		Workbook workbook 		= null;
		FileOutputStream fos 	= null;
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		System.out.println("##########"+currentDatetime);

		Map map = new HashMap();
		map.put("_defaultDB", _defaultDB);
		map.put("edmsMasterUserId", edmsMasterUserId);
		map.put("teamCode", teamCode);
		map.put("edmsGubun", edmsGubun);
		map.put("edmsStatus", edmsStatus);
		map.put("useYn", useYn);
		map.put("_DateType", _DateType);
		map.put("strFromDate", strFromDate);
		map.put("strToDate", strToDate);

		try{
			String downloadFileName = currentDatetime+".xlsx";
			List<Map> list = new ArrayList<>();
			if(edmsGubun.equals("IMPORT")){
				if(_defaultDB.equals("ncustoms")){
					list.addAll(edmsManagementService.getEdmsTeamNoFileList(map));
				}else{
					list.addAll(edmsManagementService.getEdmsNoFileList(map));
				}
			}else if(edmsGubun.equals("EXPORT")){
				if(_defaultDB.equals("ncustoms_sel_040")){
					list.addAll(edmsManagementService.getEdmsExportNoFileList(map));
				}else{
					list.addAll(edmsManagementService.getEdmsExNoFileList(map));
				}
			}

			workbook = new SXSSFWorkbook(100);
		    Sheet sheet = workbook.createSheet("미등록");
		    sheet.setColumnWidth(0, 7000);
		    sheet.setColumnWidth(1, 3000);
		    sheet.setColumnWidth(2, 6000);

		    Row row = sheet.createRow(0);
		    CellStyle style = workbook.createCellStyle();
		    style.setBorderBottom(CellStyle.BORDER_THIN);
		    style.setBorderLeft(CellStyle.BORDER_THIN);
		    style.setBorderRight(CellStyle.BORDER_THIN);
		    style.setBorderTop(CellStyle.BORDER_THIN);
		    style.setAlignment(CellStyle.ALIGN_CENTER);

		    CellStyle style1 = workbook.createCellStyle();
		    style1.setBorderBottom(CellStyle.BORDER_THIN);
		    style1.setBorderLeft(CellStyle.BORDER_THIN);
		    style1.setBorderRight(CellStyle.BORDER_THIN);
		    style1.setBorderTop(CellStyle.BORDER_THIN);

		    Cell cell = row.createCell(0);
		    cell.setCellValue("상호");
		    cell.setCellStyle(style);
		    cell = row.createCell(1);
		    cell.setCellValue("등록자");
		    cell.setCellStyle(style);
		    cell = row.createCell(2);
		    cell.setCellValue("신고번호");
		    cell.setCellStyle(style);

		    for (int rownum = 0; rownum < list.size(); rownum++) {
			    row = sheet.createRow(rownum+1);
			    cell = row.createCell(0);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("SANGHO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SANGHO")));
			    cell.setCellStyle(style);
			    cell = row.createCell(1);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("UserNM"))=="null" ? "" : String.valueOf(list.get(rownum).get("UserNM")));
			    cell.setCellStyle(style);
			    cell = row.createCell(2);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("SINGO_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SINGO_NO")));
			    cell.setCellStyle(style);
		    }
		    fos = new FileOutputStream("C:\\EDMS\\"+downloadFileName);
		    workbook.write(fos);

			File fileToDownload = new File("C:\\EDMS\\"+downloadFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"noFile.xlsx\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();

			if(fos != null){
				fos.close();
			}
			if(workbook != null){
				workbook.close();
			}
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/downNoFile1", method = {RequestMethod.GET})
	public void downNoFile1(HttpServletRequest request, @RequestParam(value = "_defaultDB") String _defaultDB,
			@RequestParam(value = "teamCode") String teamCode,
			@RequestParam(value = "edmsGubun") String edmsGubun, @RequestParam(value = "edmsStatus") String edmsStatus,
			@RequestParam(value = "useYn") String useYn, @RequestParam(value = "_DateType") String _DateType,
			@RequestParam(value = "strFromDate") String strFromDate, @RequestParam(value = "strToDate") String strToDate, HttpServletResponse response) throws UnsupportedEncodingException {

		Workbook workbook 		= null;
		FileOutputStream fos 	= null;
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		System.out.println("##########"+currentDatetime);

		Map map = new HashMap();
		map.put("_defaultDB", _defaultDB);
		map.put("teamCode", teamCode);
		map.put("edmsGubun", edmsGubun);
		map.put("edmsStatus", edmsStatus);
		map.put("useYn", useYn);
		map.put("_DateType", _DateType);
		map.put("strFromDate", strFromDate);
		map.put("strToDate", strToDate);

		try{
			String downloadFileName = currentDatetime+".xlsx";
			List<Map> list = new ArrayList<>();
			if(edmsGubun.equals("IMPORT")){
				if(_defaultDB.equals("ncustoms")){
					list.addAll(edmsManagementService.getEdmsTeamNoFileList(map));
				}else{
					list.addAll(edmsManagementService.getEdmsNoFileList(map));
				}
			}else if(edmsGubun.equals("EXPORT")){
				if(_defaultDB.equals("ncustoms_sel_040")){
					list.addAll(edmsManagementService.getEdmsExportNoFileList(map));
				}else{
					list.addAll(edmsManagementService.getEdmsExNoFileList(map));
				}
			}

			workbook = new SXSSFWorkbook(100);
		    Sheet sheet = workbook.createSheet("미등록");
		    sheet.setColumnWidth(0, 7000);
		    sheet.setColumnWidth(1, 3000);
		    sheet.setColumnWidth(2, 6000);

		    Row row = sheet.createRow(0);
		    CellStyle style = workbook.createCellStyle();
		    style.setBorderBottom(CellStyle.BORDER_THIN);
		    style.setBorderLeft(CellStyle.BORDER_THIN);
		    style.setBorderRight(CellStyle.BORDER_THIN);
		    style.setBorderTop(CellStyle.BORDER_THIN);
		    style.setAlignment(CellStyle.ALIGN_CENTER);

		    CellStyle style1 = workbook.createCellStyle();
		    style1.setBorderBottom(CellStyle.BORDER_THIN);
		    style1.setBorderLeft(CellStyle.BORDER_THIN);
		    style1.setBorderRight(CellStyle.BORDER_THIN);
		    style1.setBorderTop(CellStyle.BORDER_THIN);

		    Cell cell = row.createCell(0);
		    cell.setCellValue("상호");
		    cell.setCellStyle(style);
		    cell = row.createCell(1);
		    cell.setCellValue("등록자");
		    cell.setCellStyle(style);
		    cell = row.createCell(2);
		    cell.setCellValue("신고번호");
		    cell.setCellStyle(style);

		    for (int rownum = 0; rownum < list.size(); rownum++) {
			    row = sheet.createRow(rownum+1);
			    cell = row.createCell(0);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("SANGHO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SANGHO")));
			    cell.setCellStyle(style);
			    cell = row.createCell(1);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("UserNM"))=="null" ? "" : String.valueOf(list.get(rownum).get("UserNM")));
			    cell.setCellStyle(style);
			    cell = row.createCell(2);
			    cell.setCellValue(String.valueOf(list.get(rownum).get("SINGO_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SINGO_NO")));
			    cell.setCellStyle(style);
		    }
		    fos = new FileOutputStream("C:\\EDMS\\"+downloadFileName);
		    workbook.write(fos);

			File fileToDownload = new File("C:\\EDMS\\"+downloadFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"noFile.xlsx\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();

			if(fos != null){
				fos.close();
			}
			if(workbook != null){
				workbook.close();
			}
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/getImportMasterInfoByKcba")
	public ResponseEntity<?> getImportMasterInfoByKcba(HttpServletRequest request, @RequestBody Map args){
		if(getUserInfo(request, CmmnConstants.SESSION_ID) == null)
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
			List<Map> list = edmsManagementService.getImportMasterInfoList(args);
			List<?> result = list.stream()
				  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
				  .limit(pageRequest.getPageSize())
				  .collect(Collectors.toList());

			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getImportDeliveryRequestList")
	public ResponseEntity<?> getImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(getUserInfo(request, CmmnConstants.SESSION_ID) == null)
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			List<DeliveryRequestVO> list = edmsManagementService.getImportDeliveryRequestList(args);
			System.out.println(list.get(0).getSDAB100Key());
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveEdmsFileAdditionalInfo")
	public ResponseEntity<?> saveEdmsFileAdditionalInfo(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map targetMap = args;
			CpsEdmsFileDTO.additionalInfo additionalInfo = CmmnUtils.convertMapToBean(targetMap, CpsEdmsFileDTO.additionalInfo.class);

			CpsEdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileAdditionalInfo(additionalInfo, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			Map errMap = new HashMap();
			errMap.put("args", args);
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getEdmsFileDownList")
	public ResponseEntity<?> getEdmsFileDownList(HttpServletRequest request, @RequestBody Map args){
	    if(getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	    String edmsGubun = String.valueOf(args.get("edmsParentGbn"));

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));

			if(edmsGubun.equals("IMPORT")){
				List<Map> list = edmsManagementService.getEdmsFileDownFileList(args);
				List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
				return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
			}else{
				List<Map> list = edmsManagementService.getEdmsFileDownExFileList(args);
				List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
				return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/getItemFileDownList")
	public ResponseEntity<?> getItemFileDownList(HttpServletRequest request, @RequestBody Map args){
	    if(getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.getItemFileDownList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/rpaMailer")
	public void rpaMailer(HttpServletRequest request, @RequestBody Map args) throws Exception {
		String userMail = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_MAIL));
		String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String edmsNo  = String.valueOf(args.get("edmsNo"));
		String comNum   = String.valueOf(args.get("comNum"));
		String title 	= "[OCR] BL["+edmsNo+"], ComNo["+comNum+"]";

	  	EdmsSendMailLogVO edmsSendMailLogVO = new EdmsSendMailLogVO();
	  	CpsEdmsAttachFileVO newCpsEdmsAttachFileVO 	= new CpsEdmsAttachFileVO();
	  	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
		System.out.println(mapList);
		String fileHtml = "Invoice 의뢰현황입니다.<br><br>첨부파일 :<br>";
		for (int i = 0, n = mapList.size(); i < n; i++) {
			fileHtml = fileHtml + "<a href='http://ims.customspass.com/EDMS/apis/edms/downloadEdmsFile1?SDAAKey=" + mapList.get(i).get("SDAAKey").toString().substring(0, mapList.get(i).get("SDAAKey").toString().length()-2) + "' style='cursor: pointer'>" + mapList.get(i).get("EdmsOrgFileNm").toString() + "</a><br>";
		}
		edmsSendMailLogVO.setSender(userMail);
		edmsSendMailLogVO.setUserName(userName);
		edmsSendMailLogVO.setReceiver("mailrecv@esein.co.kr");
		edmsSendMailLogVO.setMailTitle(title);
		edmsSendMailLogVO.setMailContent(fileHtml);
		edmsSendMailLogVO.setFileName("");
		edmsSendMailLogVO.setAddDtm(currentDatetime);
	    edmsSendMailLogDao.save(edmsSendMailLogVO);
	}

	@RequestMapping(value = "/rpaMailer1")
	public void rpaMailer1(HttpServletRequest request, @RequestBody Map args) throws Exception {
		String userMail = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_MAIL));
		String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String edmsNo  = String.valueOf(args.get("edmsNo"));
		String comNum   = String.valueOf(args.get("comNum"));
		String title 	= "[OCR] BL["+edmsNo+"], ComNo["+comNum+"]";

	  	EdmsSendMailLogVO edmsSendMailLogVO = new EdmsSendMailLogVO();
	  	CpsEdmsAttachFileVO newCpsEdmsAttachFileVO 	= new CpsEdmsAttachFileVO();
		Map map = new HashMap();
		boolean mailSendCheck = false;

		List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
		System.out.println(mapList);
		String fileHtml = "Invoice 의뢰현황입니다.<br><br>첨부파일 :<br>";
		for (int i = 0, n = mapList.size(); i < n; i++) {
			fileHtml = fileHtml + "<a href='http://ims.customspass.com/EDMS/apis/edms/downloadEdmsFile1?SDAAKey=" + mapList.get(i).get("SDAAKey").toString().substring(0, mapList.get(i).get("SDAAKey").toString().length()-2) + "' style='cursor: pointer'>" + mapList.get(i).get("EdmsOrgFileNm").toString() + "</a><br>";
		}

		map.put("toAddr", "mailrecv@esein.co.kr");
		map.put("subject", title);
		map.put("contents", fileHtml);
		map.put("contentType", true);
		map.put("senderEmail", userMail);
		map.put("senderName", userName);
		System.out.println(map);

		mailSendCheck = cmmnMailService.sendMail(request, map);
	}

	@RequestMapping(value = "/getInvoiceCheck")
	public ResponseEntity<?> getInvoiceCheck(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.getInvoiceCheck(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("exportKey", stringValueOf(list.get(i).get("exportKey")));
				map.put("Expo_iv_no", stringValueOf(list.get(i).get("Expo_iv_no")));
				map.put("expoIvNo", stringValueOf(list.get(i).get("expoIvNo")));
				map.put("expoSingoNo", stringValueOf(list.get(i).get("expoSingoNo")));
		  		long result  = edmsManagementService.updateExport(map);
		  		long result1 = edmsManagementService.updateAttachFile(map);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}













  /**
   * Gets edms master list.(edms 마스터 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master list
   */
  @RequestMapping(value = "/getEdmsMasterList")
  public ResponseEntity<?> getEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<CpsEdmsMasterVO> list = edmsManagementService.getEdmsMasterList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }


  /**
   * Save edms master list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsMasterList")
  public ResponseEntity<?> saveEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
	  List<CpsEdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsMasterVO.class);
	  List<CpsEdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms is master.(edmsGubun별 마스터 존재여부 체크)
   *
   * @param request the request
   * @param args    the args
   * @return the edms is master
   */
  @RequestMapping(value = "/getEdmsIsMaster")
  public ResponseEntity<?> getEdmsIsMaster(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  CpsEdmsMasterVO isMasterList = edmsManagementService.getEdmsIsMaster(args);
	  return new ResponseEntity<>(isMasterList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }




  /**
   * Gets edms master status group count list.(edms 마스터 상태 그룹별 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master status group count list
   */
  @RequestMapping(value = "/getEdmsMasterStatusGroupCountList")
  public ResponseEntity<?> getEdmsMasterStatusGroupCountList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsMasterStatusGroupCountList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }






  /**
   * Gets edms file group count list.(edms 파일 groupByName별 카운트 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms file group count list
   */
  @RequestMapping(value = "/getEdmsFileGroupCountList")
  public ResponseEntity<?> getEdmsFileGroupCountList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  Map result = null;
	  List<CpsEdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
	  String groupByName = String.valueOf(args.get("groupByName"));

	  if (groupByName.equals("edmsFileCategory")) {
		result = list.stream()
				.collect(Collectors.groupingBy(CpsEdmsAttachFileVO::getEdmsFileCategory, Collectors.counting()));
	  } else if (groupByName.equals("edmsFileStatus")) {
		result = list.stream()
				.collect(Collectors.groupingBy(CpsEdmsAttachFileVO::getEdmsFileStatus, Collectors.counting()));
	  }

	  return new ResponseEntity(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms file list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsFileList")
  public ResponseEntity<?> saveEdmsFileList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
	  List<CpsEdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsAttachFileVO.class);
	  List<CpsEdmsAttachFileVO> returnVoList = edmsManagementService.saveEdmsFileList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets expo invoice list.(edms 수출 INV 조회. ncustoms.Expo1 기준)
   *
   * @param request the request
   * @param args    the args
   * @return the expo invoice list
   */
  @RequestMapping(value = "/getExpoInvoiceList")
  public ResponseEntity<?> getExpoInvoiceList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getExpoInvoiceList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Fix edms not classification response entity.(edms 미분류 내역 수정)
   * 미분류 수정시 _allFileTransfer가 "Y"면 1.기존 마스터 삭제(useYn:N) → 신규 마스터 저장(fixEdmsGubun)
   * 미분류 수정시 _allFileTransfer가 "N"면 유지 → 신규 마스터 저장(fixEdmsGubun)
   * 리턴값은 기존마스터,신규마스터,기존미분류파일리스트,분류된파일리스트
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */


  /**
   * Modify edms all info response entity.(edms Master & fileList 수정)
   * <p>
   * EDMS구분(IMPORT/EXPORT), EDMS미구분(NOTCLASS/SEINETC/HWANGUP)
   * <p>
   * 1. 신규 분류가 구분일 경우..
   * 1-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 1-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 2. 신규 분류가 미구분일 경우..
   * 2-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 2-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 리턴값은 기존마스터,신규마스터,기존파일리스트,분류된파일리스트
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/modifyEdmsAllInfo")
  public ResponseEntity<?> modifyEdmsAllInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	List<CpsEdmsAttachFileVO> newCpsEdmsAttachFileVO = new ArrayList<>();
	Map returnMap = new HashMap(), returnResponseEntity = new HashMap();
	String uploadPathType = edmsFileUploadPath, newEdmsGubun = null;
	String newEdmsNum = "";
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String fixEdmsGubun = String.valueOf(map.get("newEdmsGubun"));
	String allFileTransferYn = String.valueOf(map.get("_allFileTransferYn"));
	String yyyymmdd = String.valueOf(map.get("yyyymmdd"));
	BigDecimal oldSavedEdmsMasterKey = NumberUtils.createBigDecimal(String.valueOf(map.get("oldSavedEdmsMasterKey")));

	try {
	  // 1. 입력 체크(master, fileList)
	  // 신규 masterVO
	  CpsEdmsMasterVO newMasterVO = modelMapper.map(map.get("edmsMaster"), CpsEdmsMasterVO.class);
	  newMasterVO.setAddUserId(userId);
	  newMasterVO.setEditUserId(userId);
	  newMasterVO.setAddUserName(userName);
	  newMasterVO.setEditUserName(userName);

	  Set<ConstraintViolation<CpsEdmsMasterVO>> validator = isCommonValid(newMasterVO);
	  if (validator.size() > 0) {
		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
	  }


	  List<CpsEdmsAttachFileVO> modifyFileVOList = new ArrayList<>();
	  List<Map<String, Object>> jsonList2 = CmmnUtils.convertMapSourceToList(map, "CpsEdmsAttachFileVOList");
	  for (int i = 0, n = jsonList2.size(); i < n; i++) {
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = modelMapper.map(jsonList2.get(i), CpsEdmsAttachFileVO.class);
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		Set<ConstraintViolation<CpsEdmsAttachFileVO>> validatorFile = isCommonValid(CpsEdmsAttachFileVO);
		if (validatorFile.size() > 0) {
		  return new ResponseEntity<>(validatorFile, HttpStatus.BAD_REQUEST);
		}
		modifyFileVOList.add(CpsEdmsAttachFileVO);
	  }

	  // 2. master 저장/신규 master 리턴
	  // master validation
	  if (CmmnUtils.isNull(yyyymmdd) || CmmnUtils.isNull(fixEdmsGubun) || CmmnUtils.isNull(newMasterVO.getEdmsComCode()) || CmmnUtils.isNull(oldSavedEdmsMasterKey)) {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  }

	  switch (fixEdmsGubun) {
		case "IMPORT":
		case "EXPORT":
		  if (!CmmnUtils.isNull(newMasterVO.getEdmsNum())) {
			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
			if (!CmmnUtils.isNull(returnMap)) {
			  CpsEdmsMasterVO masterVO = modelMapper.map(returnMap.get("CpsEdmsMasterVO"), CpsEdmsMasterVO.class);
			  newEdmsNum = masterVO.getEdmsNum();
			  newEdmsGubun = masterVO.getEdmsGubun();
			} else {
			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		  } else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		  }
		  break;
		case "NOTCLASS":
		case "SEINETC":
		case "HWANGUP":
		  if (!CmmnUtils.isNull(newMasterVO.getEdmsComCode())) {
			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
			if (!CmmnUtils.isNull(returnMap)) {
			  CpsEdmsMasterVO masterVO = modelMapper.map(returnMap.get("CpsEdmsMasterVO"), CpsEdmsMasterVO.class);
			  newEdmsNum = masterVO.getEdmsNum();
			  newEdmsGubun = masterVO.getEdmsGubun();
			} else {
			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		  } else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		  }
		  break;
		default:
		  break;
	  }

	  // 3. fileList 수정/수정된 결과 리턴
	  if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  // 변경할 기존 매핑 파일리스트
	  List<CpsEdmsAttachFileVO> fileVOs = modifyFileVOList;
	  for (CpsEdmsAttachFileVO fileVO : fileVOs) {
		// 파일 수정(부모키, 부모구분)
		fileVO.setEdmsNo(newEdmsNum);
		fileVO.setEdmsParentGbn(newEdmsGubun);
		fileVO.setEditUserId(userId);
		CpsEdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(fileVO, request);
		newCpsEdmsAttachFileVO.add(attachFileVO);
		// 로그 저장
		saveFileLogInfo(attachFileVO, request, "edms미분류수정");
	  }

	  // 4. 결과값 리턴
	  returnResponseEntity.put("oldCpsEdmsMasterVO", map.get("edmsMaster"));
	  returnResponseEntity.put("newCpsEdmsMasterVO", returnMap.get("CpsEdmsMasterVO"));
	  returnResponseEntity.put("oldCpsEdmsAttachFileVOList", map.get("CpsEdmsAttachFileVOList"));
	  returnResponseEntity.put("newCpsEdmsAttachFileVOList", newCpsEdmsAttachFileVO);
	  return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }








  /**
   * Archiving edms files response entity.(배치 압축 작업)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/archivingEdmsFiles")
  public ResponseEntity<?> archivingEdmsFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	String downloadFileName = null;
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

	try {
//	  if (1 == 1) {
//		throw new Exception("edms배치압축작업권한없음");
//	  }
//	  // 배치다운로드 권한 확인
//	  UserEnvironmentSettingVO userEnvironmentSettingVO = userEnvironmentSettingService.getUserEnvironmentSettingByUserId(userId);
//	  if (CmmnUtils.isNull(userEnvironmentSettingVO) || !"Y".equals(userEnvironmentSettingVO.getBatchDownloadYn())) throw new Exception("edms배치압축작업권한없음");
	  downloadFileName = String.valueOf(args.get("downloadFileName"));

	  // validation
	  List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = new ArrayList<>();
	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
	  for (int i = 0, n = jsonList.size(); i < n; i++) {
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = modelMapper.map(jsonList.get(i), CpsEdmsAttachFileVO.class);
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setEditUserId(userId);
//		Set<ConstraintViolation<CpsEdmsAttachFileVO>> validator = isCommonValid(CpsEdmsAttachFileVO);
//		if (validator.size() > 0) {
//		  throw new Exception("edms파일정보확인");
//		}
		CpsEdmsAttachFileVOList.add(CpsEdmsAttachFileVO);
	  }
	  if (CmmnUtils.isNull(downloadFileName) || CmmnUtils.isNull(CpsEdmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	  List<CpsEdmsAttachFileVO> voList = new ArrayList<>();
	  for (CpsEdmsAttachFileVO vo : CpsEdmsAttachFileVOList) {
		Map searchMap = new HashMap();
		searchMap.put("sDAAKey", vo.getSDAAKey());
		searchMap.put("edmsParentGbn", vo.getEdmsParentGbn());
		searchMap.put("edmsNo", vo.getEdmsNo());
		searchMap.put("edmsOrgFileNm", vo.getEdmsOrgFileNm());
		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
	  }
	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");

	  List<File> filelist = new ArrayList();
	  List<String> fileExtList = new ArrayList<>();
	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
	  String tempKey = "";

	  for (int i=0;i<voList.size();i++) {
		System.out.println("$$$$$$$$$$"+tempKey);
		System.out.println("##########"+voList.get(i).getEdmsSaveFileNm());
		if(tempKey.equals("")){
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsFileExt());
		}else if(tempKey.equals(voList.get(i).getEdmsSingoNo().toString())){
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsFileExt());
		}else{
			CpsEdmsAttachFileVO newcpsedmsfileVO = cpsEdmsFileDao.findTop1ByEdmsSingoNo(tempKey);
			String fileName = newcpsedmsfileVO.getEdmsSingoNo() +".zip";

			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
			filelist = new ArrayList();
			fileExtList = new ArrayList<>();
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsFileExt());
		}

		tempKey = voList.get(i).getEdmsSingoNo().toString();

		if(i == voList.size()-1){
			String fileName = voList.get(i).getEdmsSingoNo().toString() +".zip";
			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
		}
	  }

	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\allDownload\\"));
	  // 동일 압축 파일명 존재시
//	  String body, ext;
//	  long sysTime = System.currentTimeMillis();
//	  if (new File(edmsFileUploadPath + downloadFileName).exists()) {
//		int dot = downloadFileName.lastIndexOf(".");
//		if (dot != -1) {
//		  body = downloadFileName.substring(0, dot);
//		  ext = downloadFileName.substring(dot); // includes "."
//		  downloadFileName = body + "_" + sysTime + ext;
//		} else {
//		  downloadFileName = downloadFileName + "_" + sysTime;
//		}
//	  }

//	  File zippedFile = new File(edmsFileUploadPath, downloadFileName);
//	  Boolean isZip = cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));

//	  if (isZip) {
//		// 로그 저장(파일키:0, 부모키:0, 카테고리: 압축파일수)
//		CpsEdmsAttachFileVO allFileVO = new CpsEdmsAttachFileVO();
//		allFileVO.setEdmsFileKey(BigDecimal.ZERO);
//		allFileVO.setEdmsParentKey(BigDecimal.ZERO);
//		allFileVO.setEdmsParentGbn("배치압축작업");
//		allFileVO.setEdmsFileCategory("ZIP");
//		allFileVO.setEdmsFilePath(edmsFileUploadPath);
//		allFileVO.setEdmsOrgFileNm("allDownload.zip");
//		saveFileLogInfo(allFileVO, request, "edms파일배치압축작업");
//	  }
	  System.out.println("@@@@@@@@@@"+downloadFileName);
	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
	} catch (Exception e) {
	  e.printStackTrace();
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
	//return new ResponseEntity<>(HttpStatus.OK);
  }

  /**
   * Archiving edms files response entity.(배치 압축 작업)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/archivingEdmsBlFiles1")
  public ResponseEntity<?> archivingEdmsBlFiles1(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	String downloadFileName = null;
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

	try {
	  downloadFileName = String.valueOf(args.get("downloadFileName"));

	  // validation
	  List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = new ArrayList<>();
	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
	  for (int i = 0, n = jsonList.size(); i < n; i++) {
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = modelMapper.map(jsonList.get(i), CpsEdmsAttachFileVO.class);
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVOList.add(CpsEdmsAttachFileVO);
	  }
	  if (CmmnUtils.isNull(CpsEdmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	  List<CpsEdmsAttachFileVO> voList = new ArrayList<>();
	  for (CpsEdmsAttachFileVO vo : CpsEdmsAttachFileVOList) {
		Map searchMap = new HashMap();
		searchMap.put("SDAAKey", vo.getSDAAKey());
		searchMap.put("edmsParentGbn", vo.getEdmsParentGbn());
		searchMap.put("edmsNo", vo.getEdmsNo());
		searchMap.put("edmsOrgFileNm", vo.getEdmsOrgFileNm());
		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
	  }
	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");

	  List<File> filelist = new ArrayList();
	  List<String> fileExtList = new ArrayList<>();
	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
	  String tempKey = "";

	  for (int i=0;i<voList.size();i++) {
		System.out.println("$$$$$$$$$$"+tempKey);
		System.out.println("##########"+voList.get(i).getEdmsSaveFileNm());
		if(tempKey.equals("")){
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsOrgFileNm());
		}else if(tempKey.equals(voList.get(i).getEdmsNo().toString())){
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsOrgFileNm());
		}else{
			CpsEdmsAttachFileVO newcpsedmsfileVO = cpsEdmsFileDao.findTop1ByEdmsNo(tempKey);
			String fileName = newcpsedmsfileVO.getEdmsNo() +".zip";

			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
			filelist = new ArrayList();
			fileExtList = new ArrayList<>();
			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
			fileExtList.add(voList.get(i).getEdmsOrgFileNm());
		}

		tempKey = voList.get(i).getEdmsNo().toString();

		if(i == voList.size()-1){
			String fileName = voList.get(i).getEdmsNo().toString() +".zip";
			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
		}
	  }

	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\allDownload\\"));
	  System.out.println("@@@@@@@@@@"+downloadFileName);
	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
	} catch (Exception e) {
	  e.printStackTrace();
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Archiving edms files response entity.(RPA 인보이스의뢰)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/archivingEdmsBlFiles")
  public ResponseEntity<?> archivingEdmsBlFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	String downloadFileName = null;
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

	try {
	  downloadFileName = String.valueOf(args.get("downloadFileName"));

	  // validation
	  List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = new ArrayList<>();
	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
	  for (int i = 0, n = jsonList.size(); i < n; i++) {
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = modelMapper.map(jsonList.get(i), CpsEdmsAttachFileVO.class);
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVOList.add(CpsEdmsAttachFileVO);
	  }
	  if (CmmnUtils.isNull(CpsEdmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	  List<CpsEdmsAttachFileVO> voList = new ArrayList<>();
	  for (CpsEdmsAttachFileVO vo : CpsEdmsAttachFileVOList) {
		Map searchMap = new HashMap();
		searchMap.put("sDAAKey", vo.getSDAAKey());
		searchMap.put("edmsParentGbn", vo.getEdmsParentGbn());
		searchMap.put("edmsNo", vo.getEdmsNo());
		searchMap.put("edmsOrgFileNm", vo.getEdmsOrgFileNm());
		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
	  }
	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");

	  List<File> filelist = new ArrayList();
	  List<String> fileExtList = new ArrayList<>();
	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
	  String tempKey = "";
	  String Category = "";

	  for (int i=0;i<voList.size();i++) {
		System.out.println("$$$$$$$$$$"+tempKey);
		System.out.println("##########"+voList.get(i).getEdmsSaveFileNm());
		if(voList.get(i).getEdmsFileCategory().equals("A0002")){
			Category = "A0000";
		}else if(voList.get(i).getEdmsFileCategory().equals("A0005")){
			Category = "A0000";
		}else{
			Category = voList.get(i).getEdmsFileCategory();
		}
		if(tempKey.equals("")){
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\allDownload\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
//			filelist.add(new File(edmsFileUploadPath + "\\allDownload\\", Category +'_'+voList.get(i).getEdmsSaveFileNm()));
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
//			fileExtList.add(voList.get(i).getEdmsFileExt());
		}else if(tempKey.equals(voList.get(i).getEdmsNo().toString())){
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\allDownload\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
//			filelist.add(new File(edmsFileUploadPath + "\\allDownload\\", Category+'_'+voList.get(i).getEdmsSaveFileNm()));
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
//			fileExtList.add(voList.get(i).getEdmsFileExt());
		}else{
			CpsEdmsAttachFileVO newcpsedmsfileVO = cpsEdmsFileDao.findTop1ByEdmsNo(tempKey);
//			String fileName = newcpsedmsfileVO.getEdmsNo() +".zip";
//
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
//			filelist = new ArrayList();
//			fileExtList = new ArrayList<>();
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\allDownload\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
//			filelist.add(new File(edmsFileUploadPath + "\\allDownload\\", Category +'_'+voList.get(i).getEdmsSaveFileNm()));
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm()));
//			fileExtList.add(voList.get(i).getEdmsFileExt());
		}

		tempKey = voList.get(i).getEdmsNo().toString();

//		if(i == voList.size()-1){
//			String fileName = voList.get(i).getEdmsNo().toString() +".zip";
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
//		}
	  }
	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\allDownload\\"));
	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
	} catch (Exception e) {
	  e.printStackTrace();
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/archivingEdmsBl3Files")
  public ResponseEntity<?> archivingEdmsBl3Files(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	String downloadFileName = null;
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

	try {
	  downloadFileName = String.valueOf(args.get("downloadFileName"));

	  // validation
	  List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = new ArrayList<>();
	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
	  for (int i = 0, n = jsonList.size(); i < n; i++) {
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = modelMapper.map(jsonList.get(i), CpsEdmsAttachFileVO.class);
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVOList.add(CpsEdmsAttachFileVO);
	  }
	  if (CmmnUtils.isNull(CpsEdmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	  List<CpsEdmsAttachFileVO> voList = new ArrayList<>();
	  for (CpsEdmsAttachFileVO vo : CpsEdmsAttachFileVOList) {
		Map searchMap = new HashMap();
		searchMap.put("sDAAKey", vo.getSDAAKey());
		searchMap.put("edmsParentGbn", vo.getEdmsParentGbn());
		searchMap.put("edmsNo", vo.getEdmsNo());
		searchMap.put("edmsOrgFileNm", vo.getEdmsOrgFileNm());
		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
	  }
	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");

	  List<File> filelist = new ArrayList();
	  List<String> fileExtList = new ArrayList<>();
	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
	  String tempKey = "";
	  String Category = "";

	  for (int i=0;i<voList.size();i++) {
		System.out.println("$$$$$$$$$$"+tempKey);
		System.out.println("##########"+voList.get(i).getEdmsSaveFileNm());
		if(voList.get(i).getEdmsFileCategory().equals("A0002")){
			Category = "A0000";
		}else if(voList.get(i).getEdmsFileCategory().equals("A0005")){
			Category = "A0000";
		}else{
			Category = voList.get(i).getEdmsFileCategory();
		}
		if(tempKey.equals("")){
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\batch\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
		}else if(tempKey.equals(voList.get(i).getEdmsNo().toString())){
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\batch\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
		}else{
			CpsEdmsAttachFileVO newcpsedmsfileVO = cpsEdmsFileDao.findTop1ByEdmsNo(tempKey);
			File file = new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileNm());
			FileInputStream inputStream = new FileInputStream(file);
	        FileOutputStream outputStream = new FileOutputStream(edmsFileUploadPath + "\\batch\\" + Category +'_'+voList.get(i).getEdmsSaveFileNm()+'.'+voList.get(i).getEdmsFileExt());
	        FileChannel fcin =  inputStream.getChannel();
	        FileChannel fcout = outputStream.getChannel();

	        long size = fcin.size();
	        fcin.transferTo(0, size, fcout);

	        fcout.close();
	        fcin.close();
	        outputStream.close();
	        inputStream.close();
		}

		tempKey = voList.get(i).getEdmsNo().toString();
	  }
	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\batch\\"));
	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
	} catch (Exception e) {
	  e.printStackTrace();
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/archivingItemFiles")
  public ResponseEntity<?> archivingItemFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	String downloadFileName = null;
	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

	try {
	  downloadFileName = String.valueOf(args.get("downloadFileName"));

	  List<Map> voList = edmsManagementService.getItemFileDownList(args);

	  List<File> filelist = new ArrayList();
	  List<String> fileExtList = new ArrayList<>();
	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
	  String tempKey = "";

	  for (int i=0;i<voList.size();i++) {
		System.out.println("$$$$$$$$$$"+tempKey);
		System.out.println("##########"+voList.get(i).get("SaveFileNm"));
		if(tempKey.equals("")){
			System.out.println("@@@@@@@@1"+String.valueOf(voList.get(i).get("FilePath")) + String.valueOf(voList.get(i).get("SaveFileNm")));

			filelist.add(new File(String.valueOf(voList.get(i).get("FilePath")) + String.valueOf(voList.get(i).get("SaveFileNm"))));
			fileExtList.add(String.valueOf(voList.get(i).get("OriginFileNm")));
		}else if(tempKey.equals(voList.get(i).get("Mdivision_code").toString()+"_"+voList.get(i).get("Mmodel_code").toString().replace("/", "").replace(".", ""))){
			System.out.println("@@@@@@@@2"+String.valueOf(voList.get(i).get("FilePath")) + String.valueOf(voList.get(i).get("SaveFileNm")));
			filelist.add(new File(String.valueOf(voList.get(i).get("FilePath")) + String.valueOf(voList.get(i).get("SaveFileNm"))));
			fileExtList.add(String.valueOf(voList.get(i).get("OriginFileNm")));
		}else{
			System.out.println("^^^^^^"+tempKey);
			String fileName = tempKey +".zip";

			File zippedFile = new File(itemFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
			filelist = new ArrayList();
			fileExtList = new ArrayList<>();
			filelist.add(new File(String.valueOf(voList.get(i).get("FilePath")) + String.valueOf(voList.get(i).get("SaveFileNm"))));
			fileExtList.add(String.valueOf(voList.get(i).get("OriginFileNm")));
		}

		tempKey = voList.get(i).get("Mdivision_code").toString()+"_"+voList.get(i).get("Mmodel_code").toString().replace("/", "").replace(".", "");

		if(i == voList.size()-1){
			String fileName = voList.get(i).get("Mdivision_code").toString()+"_"+voList.get(i).get("Mmodel_code").toString().replace("/", "").replace(".", "") +".zip";
			File zippedFile = new File(itemFileUploadPath + "\\allDownload\\", fileName);
			cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
		}
	  }

	  cmmnFileCompressUtil.zip(new File(itemFileUploadPath + "\\allDownload\\"));
	  System.out.println("@@@@@@@@@@"+downloadFileName);
	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
	} catch (Exception e) {
	  e.printStackTrace();
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Batch download edms files.(배치 다운로드(GET))
   *
   * @param request          the request
   * @param compressFileName the compress file name
   * @param response         the response
   */
  @RequestMapping(value = "/batchDownloadEdmsFiles", method = RequestMethod.GET)
  public void batchDownloadEdmsFiles(HttpServletRequest request, @RequestParam(value = "fileName") String compressFileName, HttpServletResponse response) {
//	if (1 == 1) {
//	  try {
//		throw new Exception("edms배치압축작업권한없음");
//	  } catch (Exception e) {
//		e.printStackTrace();
//	  }
//	}

	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
	if (CmmnUtils.isNull(userId) || CmmnUtils.isNull(compressFileName))
	  return;
	if (!new File(edmsFileUploadPath + compressFileName).exists()) {
	  return;
	}

	// 파일명 encoding
	String downloadFileName = CmmnFileUtils.convertEncodeFileName(compressFileName);

	try {
	  File fileToDownload = new File(edmsFileUploadPath + downloadFileName);
	  InputStream inputStream = new FileInputStream(fileToDownload);
	  response.setContentType("application/force-download");
	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
	  IOUtils.copy(inputStream, response.getOutputStream());
	  response.flushBuffer();
	  inputStream.close();

	  // 로그 저장(파일키:0, 부모키:0)
	  CpsEdmsAttachFileVO allFileVO = new CpsEdmsAttachFileVO();
	  allFileVO.setSDAAKey(BigDecimal.ZERO);
	  allFileVO.setEdmsNo("0");
	  allFileVO.setEdmsParentGbn("배치다운");
	  allFileVO.setEdmsFileCategory(userId);
	  allFileVO.setEdmsFilePath(edmsFileUploadPath);
	  allFileVO.setEdmsOrgFileNm(downloadFileName);
	  saveFileLogInfo(allFileVO, request, "edms파일배치다운로드");
	} catch (Exception e) {
	  e.printStackTrace();
	} finally {
		File selectedDir= new File(edmsFileUploadPath + "\\allDownload\\");
        File[] innerFiles= selectedDir.listFiles();
        for(int i=0; i<innerFiles.length; i++){
            innerFiles[i].delete();
        }
        File selectedDir1= new File(edmsFileUploadPath + "\\batch\\");
        File[] innerFiles1= selectedDir1.listFiles();
        for(int i=0; i<innerFiles1.length; i++){
            innerFiles1[i].delete();
        }
        if (new File(edmsFileUploadPath + compressFileName).exists()) CmmnFileUtils.deletePath(edmsFileUploadPath, downloadFileName);
	}
  }

  @RequestMapping(value = "/batchDownloadItemFiles", method = RequestMethod.GET)
  public void batchDownloadItemFiles(HttpServletRequest request, @RequestParam(value = "fileName") String compressFileName, HttpServletResponse response) {
//	if (1 == 1) {
//	  try {
//		throw new Exception("edms배치압축작업권한없음");
//	  } catch (Exception e) {
//		e.printStackTrace();
//	  }
//	}

	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
	if (CmmnUtils.isNull(userId) || CmmnUtils.isNull(compressFileName))
	  return;
	if (!new File(itemFileUploadPath + compressFileName).exists()) {
	  return;
	}

	// 파일명 encoding
	String downloadFileName = CmmnFileUtils.convertEncodeFileName(compressFileName);

	try {
	  File fileToDownload = new File(itemFileUploadPath + downloadFileName);
	  InputStream inputStream = new FileInputStream(fileToDownload);
	  response.setContentType("application/force-download");
	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
	  IOUtils.copy(inputStream, response.getOutputStream());
	  response.flushBuffer();
	  inputStream.close();
	} catch (Exception e) {
	  e.printStackTrace();
	} finally {
		File selectedDir= new File(itemFileUploadPath + "\\allDownload\\");
        File[] innerFiles= selectedDir.listFiles();
        for(int i=0; i<innerFiles.length; i++){
            innerFiles[i].delete();
        }
        if (new File(itemFileUploadPath + compressFileName).exists()) CmmnFileUtils.deletePath(itemFileUploadPath, downloadFileName);
	}
  }




  /**
   * Gets customs clearance by unregistered edms master list.
   *
   * @param request the request
   * @param args    the args
   * @return the customs clearance by unregistered edms master list
   */
  @RequestMapping(value = "/getCustomsClearanceByUnregisteredEdmsMasterList")
  public ResponseEntity<?> getCustomsClearanceByUnregisteredEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getCustomsClearanceByUnregisteredEdmsMasterList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms division copy target list.
   *
   * @param request the request
   * @param args    the args
   * @return the edms division copy target list
   */
  @RequestMapping(value = "/getEdmsDivisionCopyTargetList")
  public ResponseEntity<?> getEdmsDivisionCopyTargetList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsDivisionCopyTargetList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms division copy list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
//  @RequestMapping(value = "/saveEdmsDivisionCopyList")
//  public ResponseEntity<?> saveEdmsDivisionCopyList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  List<Map<String, Object>> masterList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
//	  List<CpsEdmsMasterVO> CpsEdmsMasterVOList = CmmnUtils.convertMapListToBean(masterList, CpsEdmsMasterVO.class);
//	  List<Map<String, Object>> fileList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
//	  List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = CmmnUtils.convertMapListToBean(fileList, CpsEdmsAttachFileVO.class);
//	  List<Map> returnVoList = edmsManagementService.saveEdmsDivisionCopyList(CpsEdmsMasterVOList, CpsEdmsAttachFileVOList, request);
//	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  /**
   * Is edms master same edms gubun and edms company and edms num list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList")
  public ResponseEntity<?> isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<CpsEdmsMasterVO> list = edmsManagementService.isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms master by customs synchronize list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsMasterByCustomsSynchronizeList")
  public ResponseEntity<?> saveEdmsMasterByCustomsSynchronizeList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterByCustomsSynchronizeList");
	  List<CpsEdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsMasterVO.class);
	  List<CpsEdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterByCustomsSynchronizeList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets team x user list with auth.(즐겨찾기 권한별 팀리스트 조회(B))
   *
   * @param request the request
   * @param args    the args
   * @return the team x user list with auth
   */
  @RequestMapping(value = "/getTeamXUserListWithAuth")
  public ResponseEntity<?> getTeamXUserListWithAuth(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String .valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String .valueOf(args.getOrDefault("size", 20))));

	  List<Map> list = edmsManagementService.getTeamXUserListWithAuth(args);
	  List<?> result = list.stream()
			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
			  .limit(pageRequest.getPageSize())
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets user team customer info list.(팀별 매핑 사업자 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the user team customer info list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getUserTeamCustomerInfoList")
  public ResponseEntity<?> getUserTeamCustomerInfoList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String .valueOf(args.getOrDefault("page", 0))),
			  Integer.parseInt(String .valueOf(args.getOrDefault("size", 20))));
	  List<UserTeamXCustomerVO> list = edmsManagementService.getUserTeamCustomerInfoList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
			  .limit(pageRequest.getPageSize())
			  .collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save user team customer info response entity.(팀별 매핑 사업자 저장)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/saveUserTeamCustomerInfo")
  public ResponseEntity<?> saveUserTeamCustomerInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  // validation
	  Map targetMap = args;
	  UserTeamXCustomerVO userTeamXCustomerVO = modelMapper.map(targetMap, UserTeamXCustomerVO.class);
	  userTeamXCustomerVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  userTeamXCustomerVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  Set<ConstraintViolation<UserTeamXCustomerVO>> validator = isCommonValid(userTeamXCustomerVO);
	  if (validator.size() > 0) {
		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
	  }

	  UserTeamXCustomerVO returnVO = edmsManagementService.saveUserTeamCustomerInfo(userTeamXCustomerVO);
	  return new ResponseEntity<>(returnVO, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets customer list.(거래처코드 [soo_MST].[dbo].[TBR_MST_Customer])
   *
   * @param request the request
   * @param args    the args
   * @return the customer list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getCustomerList")
  public ResponseEntity<?> getCustomerList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_defaultDB", args.get("defaultDB"));
	  if (CmmnUtils.isNull(args.get("_defaultDB"))) {
		throw new Exception("_defaultDB 오류");
	  }
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getCustomerList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Call sync customer individual info by procedure response entity.(SOO_MST의 거래처정보 단건 동기화)
   * DB, 자재코드 넘겨줘야 함(아이디: 세션정보)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/callSyncCustomerIndividualInfoByProcedure")
  public ResponseEntity<?> callSyncCustomerIndividualInfoByProcedure(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("db", args.containsKey("db") ? String.valueOf(args.get("db")) : "");
	  args.put("code", args.containsKey("code") ? String.valueOf(args.get("code")) : "");
	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
	  edmsManagementService.callSyncCustomerIndividualInfoByProcedure(args);

	  return new ResponseEntity<>(HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets cmmn code list.(공통코드)
   *
   * @param request the request
   * @param args    the args
   * @return the cmmn code list
   */
  @RequestMapping(value = "/getCmmnCodeList")
  public ResponseEntity<?> getCmmnCodeList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getCmmnCodeList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }



  /**
   * Gets import delivery carrying in list.
   *
   * @param request the request
   * @param args    the args
   * @return the import delivery carrying in list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getImportDeliveryCarryingInList")
  public ResponseEntity<?> getImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<DeliveryCarryingInVO> list = edmsManagementService.getImportDeliveryCarryingInList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save import delivery carrying in list response entity.
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping("/saveImportDeliveryCarryingInList")
  public ResponseEntity<?> saveImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryCarryingInList");
	  List<DeliveryCarryingInVO> voList = new ArrayList<>();
	  for (Map m : mapList) {
		DeliveryCarryingInVO vo = modelMapper.map(m, DeliveryCarryingInVO.class);
		voList.add(vo);
	  }
	  List<DeliveryCarryingInVO> returnVoList = edmsManagementService.saveImportDeliveryCarryingInList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/updateImportDeliveryRequestList")
	public ResponseEntity<?> updateImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userMng 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	  		String userId  			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
			String userNm  			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userMail			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			BigDecimal sDAB100Key 				= NumberUtils.createBigDecimal(String.valueOf(args.get("sDAB100Key")));
			String useYn 						= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";
			String deliveryStatus 				= args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : "0";
			BigDecimal deliveryCarryingInKey 	= args.containsKey("deliveryCarryingInKey") ?  NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
			String deliveryCarryingInNm 		= args.containsKey("deliveryCarryingInNm") ? String.valueOf(args.get("deliveryCarryingInNm")) : "";
			String deliveryCarryingInTaxNo 	 	= args.containsKey("deliveryCarryingInTaxNo") ? String.valueOf(args.get("deliveryCarryingInTaxNo")) : "";
			String deliveryCarryingInPhone 		= args.containsKey("deliveryCarryingInPhone") ? String.valueOf(args.get("deliveryCarryingInPhone")) : "";
			String deliveryCarryingInFax 		= args.containsKey("deliveryCarryingInFax") ? String.valueOf(args.get("deliveryCarryingInFax")) : "";
			String deliveryCarryingInMan 		= args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : "";
			String deliveryCarryingInMobile 	= args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : "";
			String deliveryCarryingInEmail 		= args.containsKey("deliveryCarryingInEmail") ? String.valueOf(args.get("deliveryCarryingInEmail")) : "";
			String deliveryCarryingInAddr 		= args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : "";
			String deliveryCarryingChange 		= args.containsKey("deliveryCarryingChange") ? String.valueOf(args.get("deliveryCarryingChange")) : "";
			String deliveryCoMngNo 				= args.containsKey("deliveryCoMngNo") ?  String.valueOf(args.get("deliveryCoMngNo")) : "";
			String deliveryCoNm 				= args.containsKey("deliveryCoNm") ? String.valueOf(args.get("deliveryCoNm")) : "";
			String deliveryCoPhone 				= args.containsKey("deliveryCoPhone") ? String.valueOf(args.get("deliveryCoPhone")) : "";
			String deliveryCoEmail 				= args.containsKey("deliveryCoEmail") ? String.valueOf(args.get("deliveryCoEmail")) : "";
			String cargoSize 					= args.containsKey("cargoSize") ? String.valueOf(args.get("cargoSize")) : "";
			BigDecimal deliveryPojangSu 		= args.containsKey("deliveryPojangSu") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryPojangSu"))) : null;
			String deliveryPojangDanwi 			= args.containsKey("deliveryPojangDanwi") ? String.valueOf(args.get("deliveryPojangDanwi")) : "";
			BigDecimal deliveryJung 			= args.containsKey("deliveryJung") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryJung"))) : null;
			String deliveryJungDanwi 			= args.containsKey("deliveryJungDanwi") ? String.valueOf(args.get("deliveryJungDanwi")) : "";
			String banipPlace 					= args.containsKey("banipPlace") ? String.valueOf(args.get("banipPlace")) : "";
			String requestCoNm 					= args.containsKey("requestCoNm") ? String.valueOf(args.get("requestCoNm")) : "";
			String requestMan 					= args.containsKey("requestMan") ? String.valueOf(args.get("requestMan")) : "";
			String requestPhone 				= args.containsKey("requestPhone") ? String.valueOf(args.get("requestPhone")) : "";
			String requestNote 					= args.containsKey("requestNote") ? String.valueOf(args.get("requestNote")) : "";
			String requestInvisibleNote 		= args.containsKey("requestInvisibleNote") ? String.valueOf(args.get("requestInvisibleNote")) : "";
			String assignMan 					= args.containsKey("assignMan") ? String.valueOf(args.get("assignMan")) : "";
			String assignPhone 					= args.containsKey("assignPhone") ? String.valueOf(args.get("assignPhone")) : "";
			String requestChange 				= args.containsKey("requestChange") ? String.valueOf(args.get("requestChange")) : "";
			String deliveryCarMngNo				= args.containsKey("deliveryCarMngNo") ? String.valueOf(args.get("deliveryCarMngNo")) : "";
			String deliveryCarNm 				= args.containsKey("deliveryCarNm") ? String.valueOf(args.get("deliveryCarNm")) : "";
			String deliveryCarPhone 			= args.containsKey("deliveryCarPhone") ? String.valueOf(args.get("deliveryCarPhone")) : "";
			String deliveryCarNo 				= args.containsKey("deliveryCarNo") ? String.valueOf(args.get("deliveryCarNo")) : "";
			String arrivalTime 					= args.containsKey("arrivalTime") ? String.valueOf(args.get("arrivalTime")) : "";
			String landingArea 					= args.containsKey("landingArea") ? String.valueOf(args.get("landingArea")) : "";
			String isMailYn 					= args.containsKey("_isMailYn") ? String.valueOf(args.get("_isMailYn")) : "N";
			String singoNo 						= args.containsKey("singoNo") ? String.valueOf(args.get("singoNo")) : "";
			String hblNo 						= args.containsKey("hblNo") ? String.valueOf(args.get("hblNo")) : "";
			String toAddr 						= args.containsKey("toAddr") ? String.valueOf(args.get("toAddr")) : "";
			String deliveryStDtm 				= args.containsKey("deliveryStDtm") ? String.valueOf(args.get("deliveryStDtm")) : "";
			String damage 						= args.containsKey("damage") ? String.valueOf(args.get("damage")) : "";
			String damageDetail 				= args.containsKey("damageDetail") ? String.valueOf(args.get("damageDetail")) : "";
			String suriDtm 						= args.containsKey("suriDtm") ? String.valueOf(args.get("suriDtm")) : "";



			List<DeliveryRequestVO> voList;
			Map map = new HashMap();
			map.put("sDAB100Key", sDAB100Key);
			voList = edmsManagementService.getImportDeliveryRequestList(map);
			DeliveryRequestVO SDAB100VO = voList.get(0);

			if(useYn.equals("N")){
				SDAB100VO.setUseYn("N");
			}

			if(deliveryStatus.equals("20")){
				SDAB100VO.setDeliveryStatus("20");
				SDAB100VO.setDeliveryCoMngNo("");
				SDAB100VO.setDeliveryCoNm("");
				SDAB100VO.setDeliveryCoPhone("");
				SDAB100VO.setDeliveryCoEmail("");
			}

			if(deliveryCarryingChange.equals("Change")){
				SDAB100VO.setDeliveryCarryingInKey(deliveryCarryingInKey);
				SDAB100VO.setDeliveryCarryingInNm(deliveryCarryingInNm);
				SDAB100VO.setDeliveryCarryingInTaxNo(deliveryCarryingInTaxNo);
				SDAB100VO.setDeliveryCarryingInPhone(deliveryCarryingInPhone);
				SDAB100VO.setDeliveryCarryingInFax(deliveryCarryingInFax);
				SDAB100VO.setDeliveryCarryingInMan(deliveryCarryingInMan);
				SDAB100VO.setDeliveryCarryingInMobile(deliveryCarryingInMobile);
				SDAB100VO.setDeliveryCarryingInEmail(deliveryCarryingInEmail);
				SDAB100VO.setDeliveryCarryingInAddr(deliveryCarryingInAddr);
				SDAB100VO.setLandingArea(landingArea);
			}

			if(requestChange.equals("Change")){
				SDAB100VO.setDeliveryCarryingInKey(deliveryCarryingInKey);
				SDAB100VO.setDeliveryCarryingInNm(deliveryCarryingInNm);
				SDAB100VO.setDeliveryCarryingInTaxNo(deliveryCarryingInTaxNo);
				SDAB100VO.setDeliveryCarryingInPhone(deliveryCarryingInPhone);
				SDAB100VO.setDeliveryCarryingInFax(deliveryCarryingInFax);
				SDAB100VO.setDeliveryCarryingInMan(deliveryCarryingInMan);
				SDAB100VO.setDeliveryCarryingInMobile(deliveryCarryingInMobile);
				SDAB100VO.setDeliveryCarryingInEmail(deliveryCarryingInEmail);
				SDAB100VO.setDeliveryCarryingInAddr(deliveryCarryingInAddr);
				SDAB100VO.setCargoSize(cargoSize);
				SDAB100VO.setDeliveryPojangSu(deliveryPojangSu);
				SDAB100VO.setDeliveryPojangDanwi(deliveryPojangDanwi);
				SDAB100VO.setDeliveryJung(deliveryJung);
				SDAB100VO.setDeliveryJungDanwi(deliveryJungDanwi);
				SDAB100VO.setBanipPlace(banipPlace);
				SDAB100VO.setRequestCoNm(requestCoNm);
				SDAB100VO.setRequestMan(requestMan);
				SDAB100VO.setRequestPhone(requestPhone);
				SDAB100VO.setRequestNote(requestNote);
				SDAB100VO.setRequestInvisibleNote(requestInvisibleNote);
				SDAB100VO.setAssignMan(assignMan);
				SDAB100VO.setAssignPhone(assignPhone);
				SDAB100VO.setLandingArea(landingArea);
			}

			SDAB100VO.setEditUserMng(userMng);
			SDAB100VO.setEditUserId(userId);
			SDAB100VO.setEditUserNm(userNm);
			SDAB100VO.setEditDtm(currentDatetime);

//			if(isMailYn.equals("D")){
//				Map mailMap = new HashMap();
//				mailMap.put("senderEmail", "webmaster@esein.co.kr"); // 발신자이메일
//				mailMap.put("senderName", "관리자"); // 발신자명
//				mailMap.put("toAddr", "cpstnl@esein.co.kr");
//				mailMap.put("subject", "[세인관세법인] 운송의뢰 삭제알림");
//				mailMap.put("contents", "<html><b>수입자(사업자번호)</b> : " + CmmnUtils.snvl(SDAB100VO.getCustomerNm(), "") + "(" + CmmnUtils.snvl(SDAB100VO.getCustomerTaxNo(), "") + ")<br><br><b>BL(신고번호)</b> : " + CmmnUtils.snvl(SDAB100VO.getHblNo(), "") + "(" + CmmnUtils.snvl(SDAB100VO.getSingoNo(), "") + ")<br><br><b>의뢰자</b> : " + CmmnUtils.snvl(SDAB100VO.getRequestMan(), "") + "</html>");
//				mailMap.put("contentType", true);
//				cmmnMailService.sendMail(request, mailMap);
//			}
			DeliveryRequestVO returnVO = edmsManagementService.saveImportDeliveryRequest(SDAB100VO, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

  	@RequestMapping("/insertImportDeliveryAddList")
	public ResponseEntity<?> insertImportDeliveryAddList(HttpServletRequest request, @RequestBody Map map) throws Exception {
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try {
			String userMng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	  		String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
			String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			DeliveryRequestVO sDAB100VO = modelMapper.map(targetMap, DeliveryRequestVO.class);
			sDAB100VO.setAddUserMng(userMng);
			sDAB100VO.setAddUserId(userId);
			sDAB100VO.setAddUserNm(userNm);
			sDAB100VO.setAddDtm(currentDatetime);

			DeliveryRequestVO returnVO = edmsManagementService.saveImportDeliveryRequest(sDAB100VO, request);

			if(sDAB100VO.getDeliveryStatus().equals("20")){
				Map map1 = new HashMap();
				map1.put("toAddr", "cpstnl@esein.co.kr");
				map1.put("subject", "[세인관세법인] 추가 운송의뢰 알림 (B/L: " + sDAB100VO.getHblNo() + ")");
				map1.put("contents", "<html>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>수입자(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + sDAB100VO.getCustomerNm() + " (" + sDAB100VO.getCustomerTaxNo() + ")" + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>BL/신고번호</b></td><td width='70%' style='border:1px black solid;'>" + sDAB100VO.getHblNo() + " / " + sDAB100VO.getSingoNo() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + sDAB100VO.getRequestMan() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + CmmnUtils.snvl(sDAB100VO.getRequestNote(), "") + "</td></tr></table>" +
				  "</html>"
				);
				map1.put("contentType", true);
				map1.put("senderEmail", "webmaster@esein.co.kr");
				map1.put("senderName", "관리자");

				cmmnMailService.sendMail(request, map1);
			}
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}



  /**
   * Save import delivery request list response entity.
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping("/saveImportDeliveryRequestList")
  public ResponseEntity<?> saveImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryRequestList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping("/deleteImportDeliveryRequestList")
  public ResponseEntity<?> deleteImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
	  List<DeliveryRequestVO> returnVoList = edmsManagementService.deleteImportDeliveryRequestList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping("/saveImportDeliveryModifyList")
  public ResponseEntity<?> saveImportDeliveryModifyList(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryModifyList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping("/saveImportDeliveryAddList")
  public ResponseEntity<?> saveImportDeliveryAddList(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(map, "importDeliveryRequestList");
	  List<DeliveryRequestVO> voList = CmmnUtils.convertMapListToBean(mapList, DeliveryRequestVO.class);
	  List<DeliveryRequestVO> returnVoList = edmsManagementService.saveImportDeliveryAddList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets import master info by kcba.
   *
   * @param request the request
   * @param args    the args
   * @return the import master info by kcba
   */
  @RequestMapping(value = "/getImportPaperList")
  public ResponseEntity<?> getImportPaperList(HttpServletRequest request, @RequestBody Map args) {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
	  List<Map> list = edmsManagementService.getImportPaperList(args);
	  List<?> result = list.stream()
			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
			  .limit(pageRequest.getPageSize())
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets import master info by kcba.
   *
   * @param request the request
   * @param args    the args
   * @return the import master info by kcba
   */
  @RequestMapping(value = "/getExportPaperList")
  public ResponseEntity<?> getExportPaperList(HttpServletRequest request, @RequestBody Map args) {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
	  List<Map> list = edmsManagementService.getExportPaperList(args);
	  List<?> result = list.stream()
			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
			  .limit(pageRequest.getPageSize())
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/paperEdmsFile")
  public ResponseEntity<?> paperEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	String result = "";
	BigDecimal SDAAKey = NumberUtils.createBigDecimal(String.valueOf(args.get("SDAAKey")));
	String edmsParentGbn = String.valueOf(args.get("edmsParentGbn"));
	String edmsNo = String.valueOf(args.get("edmsNo"));
	String edmsSingoNo = String.valueOf(args.get("edmsSingoNo"));

	List<CpsEdmsAttachFileVO> delFileList;
	Map delmap = new HashMap();
	delmap.put("edmsNo", edmsNo);
	delmap.put("edmsSingoNo", edmsSingoNo);
	delmap.put("edmsFileCategory", "B0001");
	delmap.put("useYn", "Y");
	delFileList = edmsManagementService.getEdmsFileList(delmap);

	if (delFileList.size() > 0){
		List<CpsEdmsAttachFileVO> voList;
		Map map = new HashMap();
		map.put("sDAAKey", SDAAKey);
		voList = edmsManagementService.getEdmsFileList(map);
		if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

		CpsEdmsAttachFileVO returnVO = voList.get(0);

		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileNm());
		if (file.isFile()) {
		  returnVO.setUseYn("N");
		  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
		  edmsManagementService.saveEdmsFileInfo(returnVO, request);

		  String uploadPath = returnVO.getEdmsFilePath();
		  CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileNm());

		  return new ResponseEntity<>(returnVO, HttpStatus.OK);
		} else {
		  result = "fail";
		  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
//2017-10-20일 김상열부장요청으로 파일이 있으면 스킵으로 변경
//		File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileNm());
//		if (file1.isFile()) {
//		  returnVO1.setUseYn("N");
//		  returnVO1.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//		  returnVO1.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
//		  edmsManagementService.saveEdmsFileInfo(returnVO1, request);
//
//		  // 로그 저장
//		  saveFileLogInfo(returnVO1, request, "edms파일삭제");
//
//		  // 파일 삭제
//		  String uploadPath = returnVO1.getEdmsFilePath();
//		  result = CmmnFileUtils.deletePath(uploadPath, returnVO1.getEdmsSaveFileNm());
//		}
	}else{
		List<CpsEdmsAttachFileVO> voList;
		Map map = new HashMap();
		map.put("sDAAKey", SDAAKey);
		voList = edmsManagementService.getEdmsFileList(map);
		if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

		CpsEdmsAttachFileVO returnVO = voList.get(0);

		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileNm());
		if (file.isFile()) {
		  returnVO.setEdmsParentGbn(edmsParentGbn);
		  returnVO.setEdmsNo(edmsNo);
		  returnVO.setEdmsSingoNo(edmsSingoNo);
		  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
		  edmsManagementService.saveEdmsFileInfo(returnVO, request);

		  return new ResponseEntity<>(returnVO, HttpStatus.OK);
		} else {
		  result = "fail";
		  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}
  }



  @RequestMapping(value = "/deleteFile")
  public ResponseEntity<?> deleteFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	String result = "";
	BigDecimal fileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("fileKey")));

	SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);

	File file = new File(isSysAttachFileVO.getFilePath() + isSysAttachFileVO.getSaveFileName());
	if (file.isFile()) {
		isSysAttachFileVO.setUseYn("N");
		isSysAttachFileVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		sysAttachFileDao.save(isSysAttachFileVO);

	  // 파일 삭제
	  String uploadPath = isSysAttachFileVO.getFilePath();
	  result = CmmnFileUtils.deletePath(uploadPath, isSysAttachFileVO.getSaveFileName());
	  if (!"".equals(result)) {
		return new ResponseEntity<>(isSysAttachFileVO, HttpStatus.OK);
	  } else {
		result = "fail";
		return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
	  }
	} else {
	  result = "fail";
	  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping("/saveNcomCustomer")
  public ResponseEntity<?> saveNcomCustomer(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
		Map result = edmsManagementService.saveNcomCustomer(args);
	  return new ResponseEntity<>(result, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/autoFileSave")
  public void autoFileSave() throws Exception {
	CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();
	String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
	String uploadPathType 	= edmsFileUploadPath;
	String path 			= paperFileUploadPath;
System.out.println(path);
	File dirFile	= new File(path);
	File[] fileList	= dirFile.listFiles();
	for(File tempFile : fileList) {
	  if(tempFile.isFile()) {
	    String tempPath		= tempFile.getParent();
	    String tempFileName	= tempFile.getName();
	    System.out.println(tempPath);
	    System.out.println(tempFileName);
	    String uploadPath = uploadPathType + yyyymmdd + "\\";
		File dir = new File(uploadPath);
		if (!dir.isDirectory()) {
		  dir.mkdirs();
		}

		String originalFileName = CmmnFileUtils.convertOriginalFileName(tempFileName);

		if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)) {
		}

		String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));

		String body, ext;
		long sysTime = System.currentTimeMillis();

		if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
		  if (new File(uploadPath + saveFileName).exists()) {
			int dot = saveFileName.lastIndexOf(".");
			if (dot != -1) {
			  body = saveFileName.substring(0, dot);
			  ext = saveFileName.substring(dot); // includes "."
			  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
			  }
			  saveFileName = body + "_" + sysTime + ext;
			} else {
			  saveFileName = saveFileName + "_" + sysTime;
			}
		  }

		  try {
			  if(!originalFileName.substring(0,4).equals("IMP_") && !originalFileName.substring(0,4).equals("EXP_")){
      		  }else{
				  String tempLocalFile=tempPath+"\\"+tempFileName;
			      FileInputStream inputStream 	= new FileInputStream(tempLocalFile);
				  FileOutputStream outputStream = new FileOutputStream(uploadPath + saveFileName,true);

				  FileChannel fcin =  inputStream.getChannel();
				  FileChannel fcout = outputStream.getChannel();

				  long size = fcin.size();

				  fcin.transferTo(0, size, fcout);

				  fcout.close();
				  fcin.close();

				  outputStream.close();
				  inputStream.close();

				  String jisa  		= originalFileName.substring(4,9);
				  String singo 		= originalFileName.substring(4,18);
				  String defaultDB	= "";
				  if(originalFileName.substring(0,4).equals("EXP_")){
        			if(jisa.equals("42119")){
        				defaultDB = "ncustoms_ic";
        			}else if(jisa.equals("42530")){
        				defaultDB = "ncustoms_pj";
        			}else if(jisa.equals("43494")){
        				defaultDB = "ncustoms_sel4";
        			}else if(jisa.equals("40629")){
        				defaultDB = "ncustoms_pt";
        			}else if(jisa.equals("42773")){
        				defaultDB = "ncustoms_sn";
        			}else if(jisa.equals("42423")){
	    				defaultDB = "ncustoms_yj";
        			}else if(jisa.equals("43862")){
        				defaultDB = "ncustoms_ca";
        			}else if(jisa.equals("43618")){
        				defaultDB = "ncustoms_cj";
        			}else if(jisa.equals("42064")){
        				defaultDB = "ncustoms_bs";
        			}else if(jisa.equals("43466")){
        				defaultDB = "ncustoms_us";
        			}else if(jisa.equals("44121")){
        				defaultDB = "ncustoms_us";
        			}else if(jisa.equals("42095")){
        				defaultDB = "ncustoms_gm";
        			}else if(jisa.equals("43522")){
        				defaultDB = "ncustoms_cw";
        			}else if(jisa.equals("42526")){
        				defaultDB = "ncustoms_jj";
        			}else if(jisa.equals("43617")){
        				defaultDB = "ncustoms_ys";
        			}else{
        				defaultDB = "ncustoms_sel_040";
        			}

					Map args = new HashMap();
					args.put("_defaultDB", defaultDB);
					args.put("singoNo", singo);
					List<Map> list = edmsManagementService.getExportPaperList(args);
					if(list.size() > 0) {
						List<CpsEdmsAttachFileVO> delFileList;
						Map delmap = new HashMap();
						delmap.put("edmsParentKey", list.get(0).get("edmsKey").toString());
						delmap.put("edmsFileCategory", "B0001");
						delmap.put("useYn", "Y");
						delFileList = edmsManagementService.getEdmsFileList(delmap);

						if (delFileList.size() > 0){
							CpsEdmsAttachFileVO returnVO1 = delFileList.get(0);

							File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileNm());
							if (file1.isFile()) {
							  returnVO1.setUseYn("N");
							  returnVO1.setEditUserId("admin2");
							  returnVO1.setEditUserNm("시스템관리자2");
							  CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(returnVO1);

							  String deletePath = returnVO1.getEdmsFilePath();
							  CmmnFileUtils.deletePath(deletePath, returnVO1.getEdmsSaveFileNm());
							}
						}

						CpsEdmsAttachFileVO.setEdmsParentGbn("EXPORT");
						CpsEdmsAttachFileVO.setEdmsNo(list.get(0).get("edmsNo").toString());
						CpsEdmsAttachFileVO.setEdmsFileCategory("B0001");
						CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
						CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
						CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
						CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
						CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
						CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						CpsEdmsAttachFileVO.setEdmsFileStatus("A");
						CpsEdmsAttachFileVO.setEdmsSingoNo(singo);
						CpsEdmsAttachFileVO.setUseYn("Y");
						CpsEdmsAttachFileVO.setAddUserKey("0");
						CpsEdmsAttachFileVO.setAddUserId("admin2");
						CpsEdmsAttachFileVO.setAddUserNm("시스템관리자2");
						CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
						CpsEdmsAttachFileVO.setEditUserId("admin2");
						CpsEdmsAttachFileVO.setEditUserNm("시스템관리자2");
						cpsEdmsFileDao.save(CpsEdmsAttachFileVO);
					}else{
					    CpsEdmsAttachFileVO.setEdmsParentGbn("PAPER");
					    CpsEdmsAttachFileVO.setEdmsNo("");
					    CpsEdmsAttachFileVO.setEdmsFileCategory("B0001");
					    CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
					    CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
					    CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
					    CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
					    CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
					    CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					    CpsEdmsAttachFileVO.setEdmsFileStatus("A");
					    CpsEdmsAttachFileVO.setUseYn("Y");
					    CpsEdmsAttachFileVO.setAddUserKey("0");
					    CpsEdmsAttachFileVO.setAddUserId("admin2");
					    CpsEdmsAttachFileVO.setAddUserNm("시스템관리자2");
					    CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
					    CpsEdmsAttachFileVO.setEditUserId("admin2");
					    CpsEdmsAttachFileVO.setEditUserNm("시스템관리자2");
					    cpsEdmsFileDao.save(CpsEdmsAttachFileVO);
					}
				  }else{
					if(jisa.equals("42119")){
        				defaultDB = "ncustoms_ic";
        			}else if(jisa.equals("42530")){
        				defaultDB = "ncustoms_pj";
        			}else if(jisa.equals("43494")){
        				defaultDB = "ncustoms_sel4";
        			}else if(jisa.equals("40629")){
        				defaultDB = "ncustoms_pt";
        			}else if(jisa.equals("42773")){
        				defaultDB = "ncustoms_sn";
        			}else if(jisa.equals("42423")){
	    				defaultDB = "ncustoms_yj";
        			}else if(jisa.equals("43862")){
        				defaultDB = "ncustoms_ca";
        			}else if(jisa.equals("43618")){
        				defaultDB = "ncustoms_cj";
        			}else if(jisa.equals("42064")){
        				defaultDB = "ncustoms_bs";
        			}else if(jisa.equals("43466")){
        				defaultDB = "ncustoms_us";
        			}else if(jisa.equals("44121")){
        				defaultDB = "ncustoms_us";
        			}else if(jisa.equals("42095")){
        				defaultDB = "ncustoms_gm";
        			}else if(jisa.equals("43522")){
        				defaultDB = "ncustoms_cw";
        			}else if(jisa.equals("42526")){
        				defaultDB = "ncustoms_jj";
        			}else if(jisa.equals("43617")){
        				defaultDB = "ncustoms_ys";
        			}else{
        				defaultDB = "ncustoms";
        			}

					Map args = new HashMap();
					args.put("_defaultDB", defaultDB);
					args.put("singoNo", singo);
					List<Map> list = edmsManagementService.getImportPaperList(args);
					System.out.println(list.get(0).get("edmsKey").toString());
					if(list.size() > 0) {
						List<CpsEdmsAttachFileVO> delFileList;
						Map delmap = new HashMap();
						delmap.put("edmsParentKey", list.get(0).get("edmsKey").toString());
						delmap.put("edmsFileCategory", "B0001");
						delmap.put("useYn", "Y");
						delFileList = edmsManagementService.getEdmsFileList(delmap);

						if (delFileList.size() > 0){
							CpsEdmsAttachFileVO returnVO1 = delFileList.get(0);

							File file1 = new File(returnVO1.getEdmsFilePath() + returnVO1.getEdmsSaveFileNm());
							if (file1.isFile()) {
							  returnVO1.setUseYn("N");
							  returnVO1.setEditUserId("admin2");
							  returnVO1.setEditUserNm("시스템관리자2");
							  CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(returnVO1);

							  String deletePath = returnVO1.getEdmsFilePath();
							  CmmnFileUtils.deletePath(deletePath, returnVO1.getEdmsSaveFileNm());
							}
						}

						CpsEdmsAttachFileVO.setEdmsParentGbn("IMPORT");
						CpsEdmsAttachFileVO.setEdmsNo(list.get(0).get("edmsNo").toString());
						CpsEdmsAttachFileVO.setEdmsFileCategory("B0001");
						CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
						CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
						CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
						CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
						CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
						CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						CpsEdmsAttachFileVO.setEdmsFileStatus("A");
						CpsEdmsAttachFileVO.setEdmsSingoNo(singo);
						CpsEdmsAttachFileVO.setUseYn("Y");
						CpsEdmsAttachFileVO.setAddUserKey("0");
						CpsEdmsAttachFileVO.setAddUserId("admin2");
						CpsEdmsAttachFileVO.setAddUserNm("시스템관리자2");
						CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
						CpsEdmsAttachFileVO.setEditUserId("admin2");
						CpsEdmsAttachFileVO.setEditUserNm("시스템관리자2");
						cpsEdmsFileDao.save(CpsEdmsAttachFileVO);
					}else{
					    CpsEdmsAttachFileVO.setEdmsParentGbn("PAPER");
					    CpsEdmsAttachFileVO.setEdmsNo("");
					    CpsEdmsAttachFileVO.setEdmsFileCategory("B0001");
					    CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
					    CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
					    CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
					    CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
					    CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(size));
					    CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					    CpsEdmsAttachFileVO.setEdmsFileStatus("A");
					    CpsEdmsAttachFileVO.setUseYn("Y");
					    CpsEdmsAttachFileVO.setAddUserKey("0");
					    CpsEdmsAttachFileVO.setAddUserId("admin2");
					    CpsEdmsAttachFileVO.setAddUserNm("시스템관리자2");
					    CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
					    CpsEdmsAttachFileVO.setEditUserId("admin2");
					    CpsEdmsAttachFileVO.setEditUserNm("시스템관리자2");
					    cpsEdmsFileDao.save(CpsEdmsAttachFileVO);
					}
				  }
      		  }
		  } catch (IllegalStateException e) {
			  e.printStackTrace();
		  }
		}
	  }
	}
	for(int i=0;i<fileList.length;i++){
		fileList[i].delete();
	}
  }

  @RequestMapping(value = "/getSnsTest")
  public void getSnsTest() throws Exception {
	 	StringBuffer fileData = new StringBuffer(1000);
	    BufferedReader reader = new BufferedReader( new InputStreamReader(new FileInputStream("C:/EDMS/Test.xml"),"utf-8"));
	    char[] buf = new char[1024];
	    int numRead=0;
	    while((numRead=reader.read(buf)) != -1){
	        fileData.append(buf, 0, numRead);
	    }
	    reader.close();

	    String xml_string_to_send = fileData.toString();
	    System.out.println(xml_string_to_send);
	    String returnString = "";
	    HttpURLConnection connection = null;
	    OutputStream os =null;
	    try{
	        URL searchUrl = new URL("http://groupware.seincustoms.com/");
	        connection = (HttpURLConnection)searchUrl.openConnection();
	        connection.setDoOutput(true);
	        connection.setRequestMethod("POST");
	        connection.setRequestProperty( "Content-Type", "text/xml; charset=utf-8" );
	        connection.setRequestProperty( "Content-Length", Integer.toString(xml_string_to_send.length()) );
	        connection.setRequestProperty( "SOAPAction", "http://groupware.seincustoms.com/IFSendMsg" );
	        os = connection.getOutputStream();
	        os.write( xml_string_to_send.getBytes("utf-8") );
	        os.flush();
	        os.close();

	        int rc = connection.getResponseCode();
	        if(rc==200){
	            InputStreamReader in = new InputStreamReader(connection.getInputStream(),"utf-8");
	            BufferedReader br = new BufferedReader(in);
	            String strLine;
	            while ((strLine = br.readLine()) != null){
	                returnString = returnString.concat(strLine);
	            }

	            System.out.println(returnString);
	            return;
	        }else{
	            System.out.println("http response code error: "+rc+"\n");
	            return;
	        }
	    } catch( IOException e ){
	        System.out.println("search URL connect failed: " + e.getMessage());
	        e.printStackTrace();
	    }finally{
	    	if(os!=null) os.close();
	    	connection.disconnect();
	    }
  }

  @RequestMapping(value = "/upMailer")
  public void upMailer(MultipartHttpServletRequest mRequest) throws Exception {
	  	EdmsSendMailLogVO edmsSendMailLogVO = new EdmsSendMailLogVO();
	  	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		Map map = new HashMap();
		boolean mailSendCheck = false;

		edmsSendMailLogVO.setSender(mRequest.getParameter("sender"));
		edmsSendMailLogVO.setUserName(mRequest.getParameter("USERNAME"));
		edmsSendMailLogVO.setReceiver(mRequest.getParameter("receiver"));
		edmsSendMailLogVO.setMailTitle(mRequest.getParameter("mailTitle"));
		edmsSendMailLogVO.setMailContent(mRequest.getParameter("mailContent"));
		edmsSendMailLogVO.setFileName(mRequest.getParameter("inFile"));
		edmsSendMailLogVO.setAddDtm(currentDatetime);
	    edmsSendMailLogDao.save(edmsSendMailLogVO);

		map.put("toAddr", mRequest.getParameter("receiver"));
		map.put("subject", mRequest.getParameter("mailTitle"));
		map.put("contents", mRequest.getParameter("mailContent"));
		map.put("contentType", true);
		map.put("senderEmail", mRequest.getParameter("sender"));
		map.put("senderName", mRequest.getParameter("USERNAME"));
		System.out.println(map);

		mailSendCheck = cmmnMailService.sendMailWithFiles(mRequest, map);
		System.out.println(mailSendCheck);
  }

  @RequestMapping("/saveFieldMaster")
  public ResponseEntity<?> saveFieldMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
  	try{
  		String userId1 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
  		String userNm 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
  		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  		String userId 			= String.valueOf(args.get("AddUserId"));
  		String SingoCode 		= String.valueOf(args.get("SingoCode"));
  		String Gbn 				= String.valueOf(args.get("Gbn"));
  		String ImexKey 			= String.valueOf(args.get("ImexKey"));
  		String SingoNo 			= String.valueOf(args.get("SingoNo"));
  		String FieldRequest 	= String.valueOf(args.get("FieldRequest"));
  		String FieldGbn 		= String.valueOf(args.get("FieldGbn"));
  		String UseYn 			= String.valueOf(args.get("UseYn"));
  		String SDACMngNo 		= String.valueOf(args.get("SDACMngNo"));
  		String ComCd 			= String.valueOf(args.get("ComCd"));
  		String ComNm 			= String.valueOf(args.get("ComNm"));
  		String ComNo 			= String.valueOf(args.get("ComNo"));

  		CpsFieldMasterVO CpsFieldMasterVO	= new CpsFieldMasterVO();

  		CpsFieldMasterVO.setSDACMngNo(SDACMngNo);
  		CpsFieldMasterVO.setSingoCode(SingoCode);
  		CpsFieldMasterVO.setGbn(Gbn);
  		if(!ImexKey.equals("")){
  			CpsFieldMasterVO.setImexKey(ImexKey);
  		}
  		CpsFieldMasterVO.setSingoNo(SingoNo);
  		CpsFieldMasterVO.setFieldRequest(FieldRequest);
  		CpsFieldMasterVO.setFieldGbn(FieldGbn);
  		CpsFieldMasterVO.setComCd(ComCd);
  		CpsFieldMasterVO.setComNm(ComNm);
  		CpsFieldMasterVO.setComNo(ComNo);
  		CpsFieldMasterVO.setUseYn(UseYn);
  		if(!userId.equals("")){
  			CpsFieldMasterVO.setAddUserId(userId);
  		}else{
  			CpsFieldMasterVO.setAddUserId(userId1);
  		}
  		CpsFieldMasterVO.setAddUserNm(userNm);
  		CpsFieldMasterVO.setAddDtm(currentDatetime);

  		CpsFieldMasterVO returnVO = edmsManagementService.saveFieldMaster(CpsFieldMasterVO, request);
  		return new ResponseEntity<>(returnVO, HttpStatus.OK);
  	}catch(Exception e){
  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  	}
  }

  @RequestMapping(value = "/getEdmsNotCustomerList")
	public ResponseEntity<?> getEdmsNotCustomerList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<CpsEdmsNotCustomerVO> list = edmsManagementService.getEdmsNotCustomerList(args, pageRequest);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectCustomer")
	public ResponseEntity<?> selectCustomer(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.selectCustomer(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectCustomer1")
	public ResponseEntity<?> selectCustomer1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.selectCustomer1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/deleteEdmsNotCustomerList")
	public ResponseEntity<?> deleteEdmsNotCustomerList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			CpsEdmsNotCustomerVO cpsEdmsNotCustomerVO;
			CpsEdmsNotCustomerVO CpsEdmsNotCustomerVOResult;
			cpsEdmsNotCustomerVO = edmsManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("notKey"))));
			cpsEdmsNotCustomerVO.setEditUserId(userId);
			cpsEdmsNotCustomerVO.setEditUserName(userNm);
			cpsEdmsNotCustomerVO.setUseYn("N");
			CpsEdmsNotCustomerVOResult = cpsEdmsNotCustomerDao.save(cpsEdmsNotCustomerVO);

			return new ResponseEntity<>(CpsEdmsNotCustomerVOResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/saveEdmsNotCustomerList")
	public ResponseEntity<?> saveEdmsNotCustomerList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsNotCustomerList");
			List<CpsEdmsNotCustomerVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsEdmsNotCustomerVO.class);

			List<CpsEdmsNotCustomerVO> returnVoList = edmsManagementService.saveEdmsNotCustomerList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/getJisaUser")
	public ResponseEntity<?> getJisaUser(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.getJisaUser(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/getUserList")
	public ResponseEntity<?> getUserList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = edmsManagementService.getUserList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectImportFieldStatusList")
	public ResponseEntity<?> selectImportFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = edmsManagementService.selectImportFieldStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectImportJungFieldStatusList")
	public ResponseEntity<?> selectImportJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = edmsManagementService.selectImportJungFieldStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectExportFieldStatusList")
	public ResponseEntity<?> selectExportFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = edmsManagementService.selectExportFieldStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/selectExportJungFieldStatusList")
	public ResponseEntity<?> selectExportJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = edmsManagementService.selectExportJungFieldStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/getRpaInfoList")
	public ResponseEntity<?> getRpaInfoList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	    String gubun 	= String.valueOf(args.get("gubun"));
	    String teamCode = String.valueOf(args.get("teamCode"));

		try{
			if(gubun.equals("export")){
				if(teamCode.equals("ncustoms")){
					args.put("teamCode", "ncustoms_sel_040");
				}
			}
			List<Map> returnVoList = edmsManagementService.getRpaInfoList(args);

			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

  @RequestMapping(value = "/updateEndRpa")
	public ResponseEntity<?> updateEndRpa(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		try{
			args.put("_userId", userId);
	  		args.put("_userNm", userName);
	  		args.put("editDtm", currentDatetime);

	  		long result = edmsManagementService.updateEndRpa(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/delEndRpa")
	public ResponseEntity<?> delEndRpa(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		try{
			args.put("_userId", userId);
	  		args.put("_userNm", userName);
	  		args.put("editDtm", currentDatetime);

	  		long result = edmsManagementService.delEndRpa(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  	@RequestMapping(value = "/singoNoExcel")
	public View singoNoExcel(HttpServletRequest request, @RequestParam String _defaultDB, @RequestParam String edmsGubun, Map<String, Object> ModelMap) throws Exception{
	    List<String> ColName = new ArrayList<String>();
	    ColName.add("신고번호");

	    List<String[]> ColValue = new ArrayList<String[]>();

	    Map searchMap = new HashMap();
	    searchMap.put("_defaultDB", _defaultDB);
	    searchMap.put("edmsGubun", edmsGubun);

	    if(edmsGubun.equals("IMPORT")){
			List<Map> returnVoList = edmsManagementService.getImportSingoNoExcel(searchMap);
			String size = String.valueOf(returnVoList.size());
			String singo = "(";
			if(size.equals("0")){
				searchMap.put("singo", "('')");
			}else{
				for (int i = 0, n = returnVoList.size(); i < n; i++) {
					singo = singo + "'" + returnVoList.get(i).get("edmsSingoNo") + "',";
					if(i == returnVoList.size()-1){
						singo = singo.substring(0, singo.length()-1) + ")";
					}
				}
				searchMap.put("singo", singo);
			}
			List<Map> returnList = edmsManagementService.getImportSingoNoExcel1(searchMap);

			for (int i = 0, n = returnList.size(); i < n; i++) {
		      List<String> Col = new ArrayList<String>();
		      Col.add(0, (String) returnList.get(i).get("singo_no"));
		      String[] sArrays = (String[]) Col.toArray(new String[1]);
		      ColValue.add(sArrays);
		    }

		    ModelMap.put("ExcelName", URLEncoder.encode("singoNo", "UTF-8")); // 파일명
		    ModelMap.put("ColName", ColName);
		    ModelMap.put("ColValue", ColValue);

		    return new CommExcel();
		}else{
			if(_defaultDB.equals("ncustoms")){
				searchMap.put("_defaultDB", "ncustoms_sel_040");
			}

			List<Map> returnVoList = edmsManagementService.getExportSingoNoExcel(searchMap);
			String size = String.valueOf(returnVoList.size());
			String singo = "(";
			if(size.equals("0")){
				searchMap.put("singo", "('')");
			}else{
				for (int i = 0, n = returnVoList.size(); i < n; i++) {
					singo = singo + "'" + returnVoList.get(i).get("edmsSingoNo") + "',";
					if(i == returnVoList.size()-1){
						singo = singo.substring(0, singo.length()-1) + ")";
					}
				}
				searchMap.put("singo", singo);
			}
			List<Map> returnList = edmsManagementService.getExportSingoNoExcel1(searchMap);

			for (int i = 0, n = returnList.size(); i < n; i++) {
		      List<String> Col = new ArrayList<String>();
		      Col.add(0, (String) returnList.get(i).get("singo_no"));
		      String[] sArrays = (String[]) Col.toArray(new String[1]);
		      ColValue.add(sArrays);
		    }

		    ModelMap.put("ExcelName", URLEncoder.encode("singoNo", "UTF-8")); // 파일명
		    ModelMap.put("ColName", ColName);
		    ModelMap.put("ColValue", ColValue);

		    return new CommExcel();
		}
  	}

  	@RequestMapping(value = "/singoNoExcelCount")
	public int singoNoExcelCount(HttpServletRequest request, @RequestBody Map args) throws Exception{
	    List<String> ColName = new ArrayList<String>();
	    ColName.add("신고번호");

	    List<String[]> ColValue = new ArrayList<String[]>();

	    String _defaultDB 	= String.valueOf(args.get("_defaultDB"));
	    String edmsGubun 	= String.valueOf(args.get("edmsGubun"));

	    Map searchMap = new HashMap();
	    searchMap.put("_defaultDB", _defaultDB);
	    searchMap.put("edmsGubun", edmsGubun);

	    if(edmsGubun.equals("IMPORT")){
			List<Map> returnVoList = edmsManagementService.getImportSingoNoExcel(searchMap);
			String size = String.valueOf(returnVoList.size());
			String singo = "(";
			if(size.equals("0")){
				searchMap.put("singo", "('')");
			}else{
				for (int i = 0, n = returnVoList.size(); i < n; i++) {
					singo = singo + "'" + returnVoList.get(i).get("edmsSingoNo") + "',";
					if(i == returnVoList.size()-1){
						singo = singo.substring(0, singo.length()-1) + ")";
					}
				}
				searchMap.put("singo", singo);
			}
			List<Map> returnList = edmsManagementService.getImportSingoNoExcel1(searchMap);

		    return returnList.size();
		}else{
			if(_defaultDB.equals("ncustoms")){
				searchMap.put("_defaultDB", "ncustoms_sel_040");
			}

			List<Map> returnVoList = edmsManagementService.getExportSingoNoExcel(searchMap);
			String size = String.valueOf(returnVoList.size());
			String singo = "(";
			if(size.equals("0")){
				searchMap.put("singo", "('')");
			}else{
				for (int i = 0, n = returnVoList.size(); i < n; i++) {
					singo = singo + "'" + returnVoList.get(i).get("EdmsSingoNo") + "',";
					if(i == returnVoList.size()-1){
						singo = singo.substring(0, singo.length()-1) + ")";
					}
				}
				searchMap.put("singo", singo);
			}
			List<Map> returnList = edmsManagementService.getExportSingoNoExcel1(searchMap);

		    return returnList.size();
		}
  	}

  	@RequestMapping(value = "/selectFieldManage")
	public ResponseEntity<?> selectFieldManage(HttpServletRequest request, @RequestBody Map args){
  		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.selectFieldManage(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

  	@RequestMapping(value = "/saveFieldManage")
    public ResponseEntity<?> saveFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("addDtm",currentDatetime);
	  		long result = edmsManagementService.saveFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

  	@RequestMapping(value = "/downloadEdmsFile1", method = {RequestMethod.GET})
	public void downloadEdmsFile1(HttpServletRequest request, @RequestParam(value = "SDAAKey") BigDecimal SDAAKey, HttpServletResponse response) throws UnsupportedEncodingException {
		String downloadFileName, reqFilePath = null, reqFileName = null;

		try{
			List<CpsEdmsAttachFileVO> voList;
			Map args = new HashMap();
			args.put("sDAAKey", SDAAKey);
			voList = edmsManagementService.getEdmsFileList(args);
			if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

			CpsEdmsAttachFileVO returnVO = voList.get(0);
			// 로그 저장
			saveFileLogInfo(returnVO, request, "edms파일다운로드");

			// 다운로드 파일명 존재시 해당 파일명으로 다운로드
			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getEdmsOrgFileNm());

			reqFilePath = returnVO.getEdmsFilePath();
			reqFileName = returnVO.getEdmsSaveFileNm();

			File fileToDownload = new File(reqFilePath + reqFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch (Exception e){
			e.printStackTrace();
		}
	}

  	@RequestMapping(value = "/getEdmsNoFileList")
	public ResponseEntity<?> getEdmsNoFileList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
//			checkPagingParamsForMapper(args);
			args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
			args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			String edmsGubun = String.valueOf(args.get("edmsGubun"));
			String defaultDB = String.valueOf(args.get("_defaultDB"));
			String edmsStatus = String.valueOf(args.get("edmsStatus"));
			CpsEdmsTeamVO CpsEdmsTeamVO 	= new CpsEdmsTeamVO();
			CpsEdmsExportVO CpsEdmsExportVO = new CpsEdmsExportVO();

			if(edmsGubun.equals("IMPORT")){
				if(defaultDB.equals("ncustoms")){
					List<Map> list = edmsManagementService.getEdmsTeamNoFileList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					List<Map> list = edmsManagementService.getEdmsNoFileList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if(edmsGubun.equals("EXPORT")){
				if(defaultDB.equals("ncustoms_sel_040")){
					List<Map> list = edmsManagementService.getEdmsExportNoFileList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					List<Map> list = edmsManagementService.getEdmsExNoFileList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return null;
	}
}