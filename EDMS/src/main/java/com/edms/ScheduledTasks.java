package com.edms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.tools.ant.taskdefs.condition.Http;

import com.edms.biz.edmsManagement.EdmsManagementMapper;
import com.edms.biz.edmsManagement.EdmsManagementService;
import com.edms.biz.edmsManagement.CpsEdmsMasterDao;
import com.edms.biz.edmsManagement.CpsEdmsFileDao;
import com.edms.biz.edmsManagement.CpsEdmsExportDao;
import com.edms.commons.*;
import com.edms.domains.CpsEdmsAttachFileVO;
import com.edms.domains.CpsEdmsMasterVO;
import com.edms.domains.CpsEdmsExportVO;
import com.google.gson.JsonParser;

import org.json.HTTP;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.modelmapper.ModelMapper;

import java.io.IOException;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

@Component("myBean")
public class ScheduledTasks{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private EdmsManagementService edmsManagementService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CpsEdmsMasterDao cpsEdmsMasterDao;
	@Autowired
	private CpsEdmsFileDao cpsEdmsFileDao;
	@Autowired
	private CpsEdmsExportDao cpsEdmsExportDao;
	@Autowired
	private CmmnMailService cmmnMailService;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    public void fixedDelay() {
//        /// 5분 단위로 실행됨.
//    	sqlSession.getMapper(EdmsManagementMapper.class).saveImportTeam();
//    	sqlSession.getMapper(EdmsManagementMapper.class).saveImportEtcTeam();
//    	sqlSession.getMapper(EdmsManagementMapper.class).saveExportInsertList();
//    	sqlSession.getMapper(EdmsManagementMapper.class).saveExportInsertAddList();
    }
//
//    @Scheduled(cron="0 0 11 * * *")
//    public void scheduledAnnotationCron100() {
//        /// 매일 11시마다 칼자이스 메일발송
//    	try {
//			cmmnMailService.zeissSendMailWithFiles();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//    }
//
//    @Scheduled(cron="0 0 * * * *")
//	public void scheduledAnnotationCron() {
//	      /// 매시간 정각 마다 RMS 칼자이스 메일발송
//	  	try {
//			cmmnMailService.zeissSendOkMail();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
//  @Scheduled(cron="10 0 * * * *")
//	public void scheduledAnnotationCron1() {
//	      /// 매시간 정각 마다 SMT  칼자이스 메일발송
//	  	try {
//			cmmnMailService.zeissSendOkMail1();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
////  @Scheduled(cron="20 0 * * * *")
////	public void scheduledAnnotationCron2() {
////	      /// 매시간 정각마다 MED  칼자이스 메일발송
////	  	try {
////			cmmnMailService.zeissSendOkMail2();
////		} catch (Exception e) {
////			// TODO Auto-generated catch block
////			e.printStackTrace();
////		}
////	}
//
//  @Scheduled(cron="20 0 * * * *")
//	public void scheduledAnnotationCron3() {
//	      /// 매시간정각 마다 IQS 칼자이스 메일발송
//	  	try {
//			cmmnMailService.zeissSendOkMail3();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
//  @Scheduled(cron="30 0 * * * *")
//	public void scheduledAnnotationCron4() {
//	      /// 매시간정각 마다 VIS 칼자이스비전 메일발송
//	  	try {
//			cmmnMailService.zeissSendOkMail4();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
//
////    @Scheduled(cron="* */1 * * * *")
////    public void scheduledAnnotationCron() {
////        /// 30분 단위로 수행됨. 각지사별 EDMS MASTER에 수입 Key와 신고번호 넣어주기
////    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
////    	List<Map> list = edmsManagementService.getCheckEdmsMasterImportList();
////  	    for (int i = 0, n = list.size(); i < n; i++) {
////  	    	CpsEdmsMasterVO cpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("edmsKey"))));
////  	    	cpsEdmsMasterVO.setEdmsMkey(String.valueOf(list.get(i).get("edmsMkey")));
////  	    	cpsEdmsMasterVO.setEdmsSingoNum(String.valueOf(list.get(i).get("edmsSingoNum")));
////  	    	cpsEdmsMasterVO.setCheckYn("Y");
////  	    	cpsEdmsMasterVO.setEditUserId("admin");
////  	    	cpsEdmsMasterVO.setEditUserName("관리자");
////  	    	cpsEdmsMasterVO.setEditDtm(currentDatetime);
////  	    	cpsEdmsMasterDao.save(cpsEdmsMasterVO);
////  	    }
////    }
//
////    @Scheduled(cron="0 7,37 * * * *")
////    public void scheduledAnnotationCron1() {
////        /// 30분 단위로 수행됨. 각지사별 EDMS MASTER에 수출 Key와 신고번호 넣어주기
////    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
////    	List<Map> list = edmsManagementService.getCheckEdmsMasterExportList();
////  	    for (int i = 0, n = list.size(); i < n; i++) {
////  	    	CpsEdmsMasterVO cpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("edmsKey"))));
////  	    	cpsEdmsMasterVO.setEdmsMkey(String.valueOf(list.get(i).get("edmsMkey")));
////  	    	cpsEdmsMasterVO.setEdmsSingoNum(String.valueOf(list.get(i).get("edmsSingoNum")));
////  	    	cpsEdmsMasterVO.setCheckYn("Y");
////  	    	cpsEdmsMasterVO.setEditUserId("admin");
////  	    	cpsEdmsMasterVO.setEditUserName("관리자");
////  	    	cpsEdmsMasterVO.setEditDtm(currentDatetime);
////  	    	cpsEdmsMasterDao.save(cpsEdmsMasterVO);
////  	    }
////    }
//
////    @Scheduled(cron="0 32 * * * *")
////    public void scheduledAnnotationCron2() {
////        /// 30분 단위로 수행됨. EDMS Master 값을 Attach에도 넣어주기
////    	List<Map> list = edmsManagementService.getCheckList();
////  	    for (int i = 0, n = list.size(); i < n; i++) {
////  	    	CpsEdmsAttachFileVO cpsEdmsAttachFileVO = cpsEdmsFileDao.findByEdmsNumAndEdmsJisaCode(String.valueOf(list.get(i).get("edmsNum")),"ncustoms_sel_040");
//////  	    	cpsEdmsAttachFileVO.setEdmsMasterKey(String.valueOf(list.get(i).get("edmsKey")));
////  	    	cpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list.get(i).get("edmsMkey")));
////  	    	cpsEdmsAttachFileVO.setEdmsSingoNum(String.valueOf(list.get(i).get("edmsSingoNum")));
//////  	    	cpsEdmsAttachFileVO.setCommonYn("Y");
////  	    	cpsEdmsFileDao.save(cpsEdmsAttachFileVO);
////  	    }
////    }
//
////    @Scheduled(cron="0 10 */3 * * *")
////    public void scheduledAnnotationCron3() {
////        /// 매 3시간 10분 단위로 수행됨. 수리 이전 수입 BL 바뀐것 Master 변경
////    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
////    	List<Map> list = edmsManagementService.getChangeBlList();
////  	    for (int i = 0, n = list.size(); i < n; i++) {
////  	    	CpsEdmsMasterVO cpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsSingoNum(String.valueOf(list.get(i).get("edmsSingoNum")));
////  	    	cpsEdmsMasterVO.setEdmsNum(String.valueOf(list.get(i).get("Impo_bl_no")));
////  	    	cpsEdmsMasterVO.setEditUserId("admin");
////  	    	cpsEdmsMasterVO.setEditUserName("관리자");
////  	    	cpsEdmsMasterVO.setEditDtm(currentDatetime);
////  	    	cpsEdmsMasterDao.save(cpsEdmsMasterVO);
////  	    }
////    }
//
////    @Scheduled(cron="0 17 */3 * * *")
////    public void scheduledAnnotationCron4() {
////        /// 매 3시간 15분 단위로 수행됨. 수리 이전 수출 Inv 바뀐것 Master 변경
////    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
////    	List<Map> list = edmsManagementService.getChangeInvList();
////  	    for (int i = 0, n = list.size(); i < n; i++) {
////  	    	CpsEdmsMasterVO cpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsSingoNum(String.valueOf(list.get(i).get("edmsSingoNum")));
////  	    	cpsEdmsMasterVO.setEdmsNum(String.valueOf(list.get(i).get("Expo_iv_no")));
////  	    	cpsEdmsMasterVO.setEditUserId("admin");
////  	    	cpsEdmsMasterVO.setEditUserName("관리자");
////  	    	cpsEdmsMasterVO.setEditDtm(currentDatetime);
////  	    	cpsEdmsMasterDao.save(cpsEdmsMasterVO);
////  	    }
////    }
//
//    @Scheduled(cron="0 */5 * * * *")
//    public void scheduledAnnotationCron5() {
//        /// 매 5분단위. 본사 수출 상태 업데이트
//    	List<Map> list = edmsManagementService.getExportUpdateList();
//    	CpsEdmsExportVO CpsEdmsExportVO = new CpsEdmsExportVO();
//  	    for (int i = 0, n = list.size(); i < n; i++) {
//  	    	CpsEdmsExportVO.setExportKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("exportKey").toString())));
//			CpsEdmsExportVO.setExpoKey(String.valueOf(list.get(i).get("Expo_key").toString()));
//			CpsEdmsExportVO.setExpoIvNo(String.valueOf(list.get(i).get("Expo_iv_no").toString()));
//			CpsEdmsExportVO.setExpoSingoNo(String.valueOf(list.get(i).get("Expo_singo_no").toString()));
//			CpsEdmsExportVO.setExpoSangho(String.valueOf(list.get(i).get("Expo_suchulja_sangho").toString()));
//			CpsEdmsExportVO.setExpoResResult(String.valueOf(list.get(i).get("Expo_res_result").toString()));
//			CpsEdmsExportVO.setExpoOkDate(String.valueOf(list.get(i).get("Expo_ok_date").toString()));
//			CpsEdmsExportVO.setUserId(String.valueOf(list.get(i).get("UserID").toString()));
//			CpsEdmsExportVO.setUserNM(String.valueOf(list.get(i).get("UserNM").toString()));
//			CpsEdmsExportVO.setAddDtTime(String.valueOf(list.get(i).get("AddDtTime").toString()));
//			cpsEdmsExportDao.save(CpsEdmsExportVO);
//  	    }
//    }
//
//    @Scheduled(cron="0 22 */3 * * *")
//    public void scheduledAnnotationCron6() {
//        /// 매 3시간 20분 단위로 수행됨. 수리 이전 수입 BL 바뀐것  Attache 변경
//    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//    	List<Map> list = edmsManagementService.getChangeBlFileList();
//  	    for (int i = 0, n = list.size(); i < n; i++) {
//  	    	CpsEdmsAttachFileVO cpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("SDAAKey"))));
//  	    	cpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list.get(i).get("Impo_bl_no")));
//  	    	cpsEdmsAttachFileVO.setEditUserId("admin");
//  	    	cpsEdmsAttachFileVO.setEditUserNm("관리자");
//  	    	cpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//  	    	cpsEdmsFileDao.save(cpsEdmsAttachFileVO);
//  	    }
//    }
//
//    @Scheduled(cron="0 27 */3 * * *")
//    public void scheduledAnnotationCron7() {
//        /// 매 3시간 27분 단위로 수행됨. 수리 이전 수출 INV 바뀐것 Attache 변경
//    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//    	List<Map> list = edmsManagementService.getChangeInvFileList();
//  	    for (int i = 0, n = list.size(); i < n; i++) {
//  	    	CpsEdmsAttachFileVO cpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("SDAAKey"))));
//  	    	cpsEdmsAttachFileVO.setEdmsNo(String.valueOf(list.get(i).get("Expo_iv_no")));
//  	    	cpsEdmsAttachFileVO.setEditUserId("admin");
//  	    	cpsEdmsAttachFileVO.setEditUserNm("관리자");
//  	    	cpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//  	    	cpsEdmsFileDao.save(cpsEdmsAttachFileVO);
//  	    }
//    }
//
//    @Scheduled(cron="0 5,35 * * * *")
//    public void scheduledAnnotationCron8() {
//        /// 매 3시간 30분 단위로 수행됨. request에서 등록한 것 신고번호 Impo/expo key 등록 Attache 변경
//    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//    	List<Map> list = edmsManagementService.getRequestFileList();
//  	    for (int i = 0, n = list.size(); i < n; i++) {
//  	    	Map checkmap = new HashMap();
//  	    	checkmap.put("defaultDB", list.get(i).get("edmsJisaCode"));
//  	    	checkmap.put("edmsNum", list.get(i).get("edmsNum"));
//  	    	List<Map> checkList;
//  	    	if(list.get(i).get("edmsParentGubun").equals("IMPORT")){
//  	    		checkList = edmsManagementService.getImportRequestCheckList(checkmap);
//  	    	}else{
//  	    		checkList = edmsManagementService.getExportRequestCheckList(checkmap);
//  	    	}
//
//  	    	if(checkList.size()== 0){
//  	    		continue;
//  	    	}else{
//	  	    	CpsEdmsAttachFileVO cpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("SDAAKey"))));
//	  	    	cpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(checkList.get(0).get("key")));
//	  	    	cpsEdmsAttachFileVO.setEdmsSingoNo(String.valueOf(checkList.get(0).get("singono")));
//	  	    	cpsEdmsAttachFileVO.setEditUserId("admin");
//	  	    	cpsEdmsAttachFileVO.setEditUserNm("관리자");
//	  	    	cpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//	  	    	cpsEdmsFileDao.save(cpsEdmsAttachFileVO);
//  	    	}
//  	    }
//    }
//
//    @Scheduled(cron="0 47 */3 * * *")
//    public void scheduledAnnotationCron9() {
//        /// 매 3시간 27분 단위로 수행됨. 수리 이전 수출 INV 바뀐것 Attache 변경
//    	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//    	List<Map> list = edmsManagementService.getChangeInvSingoList();
//  	    for (int i = 0, n = list.size(); i < n; i++) {
//  	    	CpsEdmsAttachFileVO cpsEdmsAttachFileVO = cpsEdmsFileDao.findTop1BySDAAKey(NumberUtils.createBigDecimal(String.valueOf(list.get(i).get("SDAAKey"))));
//  	    	cpsEdmsAttachFileVO.setEdmsMkey(String.valueOf(list.get(i).get("Expo_key")));
//  	    	cpsEdmsAttachFileVO.setEdmsSingoNo(String.valueOf(list.get(i).get("Expo_singo_no")));
//  	    	cpsEdmsAttachFileVO.setEditUserId("admin");
//  	    	cpsEdmsAttachFileVO.setEditUserNm("관리자");
//  	    	cpsEdmsAttachFileVO.setEditDtm(currentDatetime);
//  	    	cpsEdmsFileDao.save(cpsEdmsAttachFileVO);
//  	    }
//    }
//
////    public void xmlConfigCron() {
////        /// 1분 단위로 실행됨.
////        System.out.println("[xmlConfigCron] The time is now " + dateFormat.format(new Date()));
////    }
//
////    @Scheduled(cron="*/3 * * * * *")
////    public void scheduledAnnotationCron() {
////        /// 3초 단위로 수행됨.
////        System.out.println("[scheduledAnnotationCron] The time is now " + dateFormat.format(new Date()));
////    }
}