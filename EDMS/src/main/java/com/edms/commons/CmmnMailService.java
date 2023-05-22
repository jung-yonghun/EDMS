package com.edms.commons;

import org.apache.commons.validator.routines.EmailValidator;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

import com.edms.biz.edmsManagement.EdmsManagementService;


@Service
public class CmmnMailService {
  @Autowired
  private JavaMailSender javaMailSender;
  @Autowired
  private EdmsManagementService edmsManagementService;

  @Value("${email.adminUserMail}")
  public String adminUserMail;
  @Value("${email.adminUserName}")
  public String adminUserName;

  public Boolean sendMail(Map args) {
	try {
	  MimeMessage message = javaMailSender.createMimeMessage();
	  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

	  String[] toAddrs = String.valueOf(args.get("toAddr")).replace("[", "").replace("]", "").split(",");
	  List<String> receiveEmailiList = new ArrayList<>();
	  for (int i = 0, n = toAddrs.length; i < n; i++) {
		if (EmailValidator.getInstance().isValid(toAddrs[i])) {
		  receiveEmailiList.add(toAddrs[i]);
		}
	  }
	  messageHelper.setTo(receiveEmailiList.toArray(new String[receiveEmailiList.size()]));

	  messageHelper.setText(String.valueOf(args.get("contents")), Boolean.parseBoolean(String.valueOf(args.get("contentType"))));
	  String senderEmail = args.containsKey("senderEmail") ? String.valueOf(args.get("senderEmail")) : "";
	  String senderName = args.containsKey("senderName") ? String.valueOf(args.get("senderName")) : "";
	  if (senderEmail != "" && senderName != "") {
		messageHelper.setFrom(senderEmail, senderName);
	  } else {
		messageHelper.setFrom(adminUserMail, adminUserName);
	  }
	  messageHelper.setSubject(String.valueOf(args.get("subject")));
	  // 다수의 수신자가 존재할 경우 10건씩 끊어서 보냅(메일서버 부하/reject)
	  for (int i = 0, n = (toAddrs.length / 10); i <= n; i += 10) {
		javaMailSender.send(message);
		Thread.sleep(1000);
	  }
	} catch (Exception e) {
	  System.out.println(e);
	  return false;
	}
	return true;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public Boolean sendMail(HttpServletRequest request, Map args) {
	try {
	  MimeMessage message = javaMailSender.createMimeMessage();
	  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

	  String toAddrString = String.valueOf(args.get("toAddr"));
	  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
	  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
	  List<String> receiveEmailiList = new ArrayList<>();
	  for (int i = 0, n = toAddrArray.length; i < n; i++) {
		String convertEmail = toAddrArray[i].replaceAll("\\[|\\]|,|\\s", "");
		if (EmailValidator.getInstance().isValid(convertEmail)) {
		  receiveEmailiList.add(convertEmail);
		}
	  }
	  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
	  messageHelper.setTo(confirmReceiveEmailis);

	  String senderEmail = args.containsKey("senderEmail") ? String.valueOf(args.get("senderEmail")) : "";
	  String senderName = args.containsKey("senderName") ? String.valueOf(args.get("senderName")) : "";
	  if (senderEmail.length() > 0 && senderName.length() > 0) {
		messageHelper.setFrom(senderEmail, senderName);
	  } else {
		messageHelper.setFrom(adminUserMail, adminUserName);
	  }
//	  String toCcString = args.containsKey("toCc") ? String.valueOf(args.get("toCc")) : "";
//	  String[] toCcAddrArray = new String[0];
//	  if (toCcString.length() > 0) {
//		List<String> toCcAddr = Arrays.asList(toCcString.split("\\s*,\\s*"));
//		toCcAddrArray = toCcAddr.toArray(new String[toCcAddr.size()]);
//		if (toCcAddrArray.length > 0) {
//		  messageHelper.setCc(toCcAddrArray);
//		}
//	  }
	  messageHelper.setSubject(String.valueOf(args.get("subject")));
	  messageHelper.setText(String.valueOf(args.get("contents")), Boolean.parseBoolean(String.valueOf(args.get("contentType"))));

	  // 다수의 수신자가 존재할 경우 10건씩 끊어서 보냅(메일서버 부하/reject)
//	  for (int i = 0, n = (confirmReceiveEmailis.length / 10); i <= n; i++) {
		  javaMailSender.send(message);
//		Thread.sleep(1000);
//	  }
	} catch (Exception e) {
	  e.printStackTrace();
	  return false;
	}
	return true;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public Boolean sendMailWithFiles(MultipartHttpServletRequest mRequest, Map args) {
	try {
	  MimeMessage message = javaMailSender.createMimeMessage();
	  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
	  boolean fileAttachYn = false;

	  String toAddrString = String.valueOf(args.get("toAddr"));
	  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
	  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
	  // email validation
	  List<String> receiveEmailiList = new ArrayList<>();
	  for (int i = 0, n = toAddrArray.length; i < n; i++) {
		if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
		  receiveEmailiList.add(toAddrArray[i]);
		}
	  }
	  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
	  messageHelper.setTo(confirmReceiveEmailis);

	  String senderEmail = args.containsKey("senderEmail") ? String.valueOf(args.get("senderEmail")) : adminUserMail;
	  String senderName = args.containsKey("senderName") ? String.valueOf(args.get("senderName")) : adminUserName;
	  if (senderEmail.length() > 0 && senderName.length() > 0) {
		messageHelper.setFrom(senderEmail, senderName);
	  } else {
		messageHelper.setFrom(adminUserMail, adminUserName);
	  }

	  String toCcString = args.containsKey("toCc") ? String.valueOf(args.get("toCc")) : "";
	  String[] toCcAddrArray = new String[0];
	  if (toCcString.length() > 0) {
		List<String> toCcAddr = Arrays.asList(toCcString.split("\\s*,\\s*"));
		toCcAddrArray = toCcAddr.toArray(new String[toCcAddr.size()]);
		if (toCcAddrArray.length > 0) {
		  messageHelper.setCc(toCcAddrArray);
		}
	  }

	  messageHelper.setSubject(String.valueOf(args.get("subject")));
	  messageHelper.setText(String.valueOf(args.get("contents")), Boolean.parseBoolean(String.valueOf(args.get("contentType"))));

	  MultiValueMap<String, MultipartFile> fileMap = mRequest.getMultiFileMap();
	  Iterator<String> iterator = fileMap.keySet().iterator();
	  while (iterator.hasNext()) {
		String str = iterator.next();
		List<MultipartFile> fileList = fileMap.get(str);
		for (MultipartFile mpf : fileList) {
		  messageHelper.addAttachment(CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()), new FileSystemResource(CmmnFileUtils.convertMpfToFile(mpf)));
		}
		fileAttachYn = true;
	  }

	  // 다수의 수신자가 존재할 경우 10건씩 끊어서 보냅(메일서버 부하/reject)
	  for (int i = 0, n = (toAddrArray.length / 10); i <= n; i += 10) {
		javaMailSender.send(message);
		Thread.sleep(1000);
	  }
	} catch (Exception e) {
	  System.out.println(e);
	  return false;
	}
	return true;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendMailWithFiles() throws Exception{
	  Workbook workbook = null;
	  FileOutputStream fos = null;
	  Calendar c1 = new GregorianCalendar();
	  Calendar c2 = new GregorianCalendar();
	  c1.add(Calendar.DATE, -7);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");

	  String yesterday = sdf.format(c1.getTime());
	  String today = sdf.format(c2.getTime());
	  String today1 = today.substring(0,4)+"-"+today.substring(4,6)+"-"+today.substring(6,8);
	  System.out.println(today1);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms");
		  map.put("_DateType", "add_Day");
		  map.put("strFromDate", yesterday);
		  map.put("strToDate", today);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  File file = new File("C:\\zeiss\\ZEISS_PO_NO_LIST.xlsx");
		  if(file.exists()){
			  file.delete();
		  }

		  workbook = new SXSSFWorkbook(100);
		  Sheet sheet = workbook.createSheet("수입미결관리");
		  sheet.setColumnWidth(0, 2000);
		  sheet.setColumnWidth(1, 3000);
		  sheet.setColumnWidth(2, 3000);
		  sheet.setColumnWidth(3, 3000);
		  sheet.setColumnWidth(4, 2000);
		  sheet.setColumnWidth(5, 5000);
		  sheet.setColumnWidth(6, 3000);
		  sheet.setColumnWidth(7, 3000);
		  sheet.setColumnWidth(8, 3000);
		  sheet.setColumnWidth(9, 3000);
		  sheet.setColumnWidth(10, 3000);
		  sheet.setColumnWidth(11, 5000);
		  sheet.setColumnWidth(12, 7000);
		  sheet.setColumnWidth(13, 5000);
		  sheet.setColumnWidth(14, 5000);
		  sheet.setColumnWidth(15, 7000);
		  sheet.setColumnWidth(16, 7000);

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
		  cell.setCellValue("Status");
		  cell.setCellStyle(style);
		  cell = row.createCell(1);
		  cell.setCellValue("검사여부");
		  cell.setCellStyle(style);
		  cell = row.createCell(2);
		  cell.setCellValue("미접수경과일");
		  cell.setCellStyle(style);
		  cell = row.createCell(3);
		  cell.setCellValue("접수소요일");
		  cell.setCellStyle(style);
		  cell = row.createCell(4);
		  cell.setCellValue("사업부");
		  cell.setCellStyle(style);
		  cell = row.createCell(5);
		  cell.setCellValue("B/L No");
		  cell.setCellStyle(style);
		  cell = row.createCell(6);
		  cell.setCellValue("서류접수일");
		  cell.setCellStyle(style);
		  cell = row.createCell(7);
		  cell.setCellValue("입항일");
		  cell.setCellStyle(style);
		  cell = row.createCell(8);
		  cell.setCellValue("반입일");
		  cell.setCellStyle(style);
		  cell = row.createCell(9);
		  cell.setCellValue("신고일");
		  cell.setCellStyle(style);
		  cell = row.createCell(10);
		  cell.setCellValue("수리일");
		  cell.setCellStyle(style);
		  cell = row.createCell(11);
		  cell.setCellValue("신고번호");
		  cell.setCellStyle(style);
		  cell = row.createCell(12);
		  cell.setCellValue("해외거래처");
		  cell.setCellStyle(style);
		  cell = row.createCell(13);
		  cell.setCellValue("Inv No");
		  cell.setCellStyle(style);
		  cell = row.createCell(14);
		  cell.setCellValue("PO No");
		  cell.setCellStyle(style);
		  cell = row.createCell(15);
		  cell.setCellValue("미결사유(세인)");
		  cell.setCellStyle(style);
		  cell = row.createCell(16);
		  cell.setCellValue("이슈사항(칼자이스)");
		  cell.setCellStyle(style);

		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  row = sheet.createRow(rownum+1);
			  cell = row.createCell(0);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_receive_result"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_receive_result")));
			  cell.setCellStyle(style);
			  cell = row.createCell(1);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_cs"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_cs")));
			  cell.setCellStyle(style);
			  cell = row.createCell(2);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("aa"))=="null" ? "" : String.valueOf(list.get(rownum).get("aa")));
			  cell.setCellStyle(style);
			  cell = row.createCell(3);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("bb"))=="null" ? "" : String.valueOf(list.get(rownum).get("bb")));
			  cell.setCellStyle(style);
			  cell = row.createCell(4);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startLocation"))=="null" ? "" : String.valueOf(list.get(rownum).get("startLocation")));
			  cell.setCellStyle(style);
			  cell = row.createCell(5);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startNum"))=="null" ? "" : String.valueOf(list.get(rownum).get("startNum")));
			  cell.setCellStyle(style1);
			  cell = row.createCell(6);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startReferenceNo1"))=="null" ? "" : String.valueOf(list.get(rownum).get("startReferenceNo1")));
			  cell.setCellStyle(style);
			  cell = row.createCell(7);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_iphang_date"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_iphang_date")));
			  cell.setCellStyle(style);
			  cell = row.createCell(8);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_banip_date"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_banip_date")));
			  cell.setCellStyle(style);
			  cell = row.createCell(9);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_singo_date"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_singo_date")));
			  cell.setCellStyle(style);
			  cell = row.createCell(10);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_ok_date"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_ok_date")));
			  cell.setCellStyle(style);
			  cell = row.createCell(11);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_singo_no"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_singo_no")));
			  cell.setCellStyle(style);
			  cell = row.createCell(12);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("Impo_gonggub_sangho"))=="null" ? "" : String.valueOf(list.get(rownum).get("Impo_gonggub_sangho")));
			  cell.setCellStyle(style1);
			  cell = row.createCell(13);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startReferenceNo2"))=="null" ? "" : String.valueOf(list.get(rownum).get("startReferenceNo2")));
			  cell.setCellStyle(style);
			  cell = row.createCell(14);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startPoNo1"))=="null" ? "" : String.valueOf(list.get(rownum).get("startPoNo1")));
			  cell.setCellStyle(style);
			  cell = row.createCell(15);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startIssueContent"))=="null" ? "" : String.valueOf(list.get(rownum).get("startIssueContent")));
			  cell.setCellStyle(style1);
			  cell = row.createCell(16);
			  cell.setCellValue(String.valueOf(list.get(rownum).get("startNote"))=="null" ? "" : String.valueOf(list.get(rownum).get("startNote")));
			  cell.setCellStyle(style1);
		  }
		  fos = new FileOutputStream("C:\\zeiss\\ZEISS_PO_NO_LIST.xlsx");
		  workbook.write(fos);



		  MimeMessage message = javaMailSender.createMimeMessage();
		  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		  boolean fileAttachYn = false;

		  String toAddrString = String.valueOf("yaeseul.kim@zeiss.com,soomin.woo@zeiss.com,youjung.han@zeiss.com,heewoo.shin@zeiss.com,yoonah.kim@zeiss.com,youngseok.seo@zeiss.com,sunhee.han@zeiss.com,seunghyeon.baik@zeiss.com,jungwook.ha@zeiss.com,goeun.lee@zeiss.com,inseong.kim@zeiss.com,import@zeiss.com,dl.scz-wh1.kr@zeiss.com,wonkyung.jeong@zeiss.com");
		  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
		  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
		  // email validation
		  List<String> receiveEmailiList = new ArrayList<>();
		  for (int i = 0, n = toAddrArray.length; i < n; i++) {
			if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
			  receiveEmailiList.add(toAddrArray[i]);
			}
		  }
		  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
		  messageHelper.setTo(confirmReceiveEmailis);

		  String senderEmail = String.valueOf("zeiss@esein.co.kr");
		  String senderName = String.valueOf("칼자이스 공용메일");
		  messageHelper.setFrom(senderEmail, senderName);

		  String toAddrStringCc = String.valueOf("yhjung@esein.co.kr");
		  List<String> toAddrCc = Arrays.asList(toAddrStringCc.split("\\s*,\\s*"));
		  String[] toAddrArrayCc = toAddrCc.toArray(new String[toAddr.size()]);
		  // email validation
		  List<String> receiveEmailiListCc = new ArrayList<>();
		  for (int i = 0, n = toAddrArrayCc.length; i < n; i++) {
			if (EmailValidator.getInstance().isValid(toAddrArrayCc[i])) {
			  receiveEmailiListCc.add(toAddrArrayCc[i]);
			}
		  }
		  String[] confirmReceiveEmailisCc = receiveEmailiListCc.toArray(new String[receiveEmailiListCc.size()]);
		  messageHelper.setCc(confirmReceiveEmailisCc);

		  messageHelper.setSubject(String.valueOf("[SEIN] ("+today1+") 칼자이스(주) PO NO. 리스트"));
		  messageHelper.setText(String.valueOf("안녕하세요.<br>세인관세법인 입니다.<br><br>금일 자 기준 PO NO. 리스트 전달 드립니다.<br><br>감사합니다. "), Boolean.parseBoolean(String.valueOf(true)));

		  DataSource dataSource = new FileDataSource("C:\\zeiss\\ZEISS_PO_NO_LIST.xlsx");
	      messageHelper.addAttachment(MimeUtility.encodeText("ZEISS_PO_NO_LIST.xlsx", "UTF-8", "B"), dataSource);
		  fileAttachYn = true;

		  javaMailSender.send(message);
	  }finally{
		  if(fos != null){
			  fos.close();
		  }
		  if(workbook != null){
			  workbook.close();
		  }
	  }
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendOkMail() throws Exception{
	  Calendar c1 = new GregorianCalendar();
	  c1.add(Calendar.HOUR, -1);
	  Calendar c2 = new GregorianCalendar();
	  c2.add(Calendar.HOUR, -2);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	  String hour = sdf.format(c1.getTime());
	  String hour1 = sdf.format(c2.getTime());
	  System.out.println(hour);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms");
		  map.put("location", "RMS");
		  map.put("hour", hour);
		  map.put("hour1", hour1);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  if(list.size() > 0){
		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  MimeMessage message = javaMailSender.createMimeMessage();
			  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			  boolean fileAttachYn = false;

			  String toAddrString = String.valueOf("sunhee.han@zeiss.com,seunghyeon.baik@zeiss.com,jiyoung.park@zeiss.com");
			  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
			  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
			  // email validation
			  List<String> receiveEmailiList = new ArrayList<>();
			  for (int i = 0, n = toAddrArray.length; i < n; i++) {
				if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
				  receiveEmailiList.add(toAddrArray[i]);
				}
			  }
			  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
			  messageHelper.setTo(confirmReceiveEmailis);

			  String senderEmail = String.valueOf("zeiss@esein.co.kr");
			  String senderName = String.valueOf("칼자이스 공용메일");
			  messageHelper.setFrom(senderEmail, senderName);

			  messageHelper.setSubject(String.valueOf("[SEIN] BL. "+list.get(rownum).get("startNum")+", PO. "+list.get(rownum).get("startPoNo1")+" 서류접수 안내"));
			  messageHelper.setText(String.valueOf("[서류접수 안내]<br><br>1. BL 번호 : "+list.get(rownum).get("startNum")+"<br>2. PO 번호 : "+list.get(rownum).get("startPoNo1")+"<br>3. 서류접수일 : "+list.get(rownum).get("startReferenceNo3")+"<br>4. 입항일 : "+list.get(rownum).get("Impo_iphang")+"<br><br>※ https://www.customspass.com 에서 통관진행현황 및 선적서류를 확인할 수 있습니다."), Boolean.parseBoolean(String.valueOf(true)));

			  javaMailSender.send(message);
		  }
		  }
	  }finally{
	  }
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendOkMail1() throws Exception{
	  Calendar c1 = new GregorianCalendar();
	  c1.add(Calendar.HOUR, -1);
	  Calendar c2 = new GregorianCalendar();
	  c2.add(Calendar.HOUR, -2);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	  String hour = sdf.format(c1.getTime());
	  String hour1 = sdf.format(c2.getTime());
	  System.out.println(hour);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms");
		  map.put("location", "SMT");
		  map.put("hour", hour);
		  map.put("hour1", hour1);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  if(list.size() > 0){
		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  MimeMessage message = javaMailSender.createMimeMessage();
			  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			  boolean fileAttachYn = false;

			  String toAddrString = String.valueOf("heainn.ko@zeiss.com,soojeong.im@zeiss.com,younghwan.ahn.ext@zeiss.com");
			  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
			  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
			  // email validation
			  List<String> receiveEmailiList = new ArrayList<>();
			  for (int i = 0, n = toAddrArray.length; i < n; i++) {
				if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
				  receiveEmailiList.add(toAddrArray[i]);
				}
			  }
			  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
			  messageHelper.setTo(confirmReceiveEmailis);

			  String senderEmail = String.valueOf("zeiss@esein.co.kr");
			  String senderName = String.valueOf("칼자이스 공용메일");
			  messageHelper.setFrom(senderEmail, senderName);

			  messageHelper.setSubject(String.valueOf("[SEIN] BL. "+list.get(rownum).get("startNum")+", PO. "+list.get(rownum).get("startPoNo1")+" 서류접수 안내"));
			  messageHelper.setText(String.valueOf("[서류접수 안내]<br><br>1. BL 번호 : "+list.get(rownum).get("startNum")+"<br>2. PO 번호 : "+list.get(rownum).get("startPoNo1")+"<br>3. 서류접수일 : "+list.get(rownum).get("startReferenceNo3")+"<br>4. 입항일 : "+list.get(rownum).get("Impo_iphang")+"<br><br>※ https://www.customspass.com 에서 통관진행현황 및 선적서류를 확인할 수 있습니다."), Boolean.parseBoolean(String.valueOf(true)));

			  javaMailSender.send(message);
		  }
		  }
	  }finally{
	  }
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendOkMail2() throws Exception{
	  Calendar c1 = new GregorianCalendar();
	  c1.add(Calendar.HOUR, -1);
	  Calendar c2 = new GregorianCalendar();
	  c2.add(Calendar.HOUR, -2);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	  String hour = sdf.format(c1.getTime());
	  String hour1 = sdf.format(c2.getTime());
	  System.out.println(hour);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms");
		  map.put("location", "MED");
		  map.put("hour", hour);
		  map.put("hour1", hour1);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  if(list.size() > 0){
		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  MimeMessage message = javaMailSender.createMimeMessage();
			  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			  boolean fileAttachYn = false;

			  String toAddrString = String.valueOf("jungwook.ha@zeiss.com,goeun.lee@zeiss.com,inseong.kim@zeiss.com");
			  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
			  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
			  // email validation
			  List<String> receiveEmailiList = new ArrayList<>();
			  for (int i = 0, n = toAddrArray.length; i < n; i++) {
				if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
				  receiveEmailiList.add(toAddrArray[i]);
				}
			  }
			  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
			  messageHelper.setTo(confirmReceiveEmailis);

			  String senderEmail = String.valueOf("zeiss@esein.co.kr");
			  String senderName = String.valueOf("칼자이스 공용메일");
			  messageHelper.setFrom(senderEmail, senderName);

			  messageHelper.setSubject(String.valueOf("[SEIN] BL. "+list.get(rownum).get("startNum")+", PO. "+list.get(rownum).get("startPoNo1")+" 서류접수 안내"));
			  messageHelper.setText(String.valueOf("[서류접수 안내]<br><br>1. BL 번호 : "+list.get(rownum).get("startNum")+"<br>2. PO 번호 : "+list.get(rownum).get("startPoNo1")+"<br>3. 서류접수일 : "+list.get(rownum).get("startReferenceNo3")+"<br>4. 입항일 : "+list.get(rownum).get("Impo_iphang")+"<br><br>※ https://www.customspass.com 에서 통관진행현황 및 선적서류를 확인할 수 있습니다."), Boolean.parseBoolean(String.valueOf(true)));

			  javaMailSender.send(message);
		  }
		  }
	  }finally{
	  }
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendOkMail3() throws Exception{
	  Calendar c1 = new GregorianCalendar();
	  c1.add(Calendar.HOUR, -1);
	  Calendar c2 = new GregorianCalendar();
	  c2.add(Calendar.HOUR, -2);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	  String hour = sdf.format(c1.getTime());
	  String hour1 = sdf.format(c2.getTime());
	  System.out.println(hour);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms");
		  map.put("location", "IQS");
		  map.put("hour", hour);
		  map.put("hour1", hour1);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  if(list.size() > 0){
		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  MimeMessage message = javaMailSender.createMimeMessage();
			  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			  boolean fileAttachYn = false;

			  String toAddrString = String.valueOf("heewoo.shin@zeiss.com,yoonah.kim@zeiss.com,soomin.woo@zeiss.com,youjung.han@zeiss.com,hanullim.koh@zeiss.com");
			  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
			  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
			  // email validation
			  List<String> receiveEmailiList = new ArrayList<>();
			  for (int i = 0, n = toAddrArray.length; i < n; i++) {
				if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
				  receiveEmailiList.add(toAddrArray[i]);
				}
			  }
			  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
			  messageHelper.setTo(confirmReceiveEmailis);

			  String senderEmail = String.valueOf("zeiss@esein.co.kr");
			  String senderName = String.valueOf("칼자이스 공용메일");
			  messageHelper.setFrom(senderEmail, senderName);

			  messageHelper.setSubject(String.valueOf("[SEIN] BL. "+list.get(rownum).get("startNum")+", PO. "+list.get(rownum).get("startPoNo1")+" 서류접수 안내"));
			  messageHelper.setText(String.valueOf("[서류접수 안내]<br><br>1. BL 번호 : "+list.get(rownum).get("startNum")+"<br>2. PO 번호 : "+list.get(rownum).get("startPoNo1")+"<br>3. 서류접수일 : "+list.get(rownum).get("startReferenceNo3")+"<br>4. 입항일 : "+list.get(rownum).get("Impo_iphang")+"<br><br>※ https://www.customspass.com 에서 통관진행현황 및 선적서류를 확인할 수 있습니다."), Boolean.parseBoolean(String.valueOf(true)));

			  javaMailSender.send(message);
		  }
		  }
	  }finally{
	  }
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void zeissSendOkMail4() throws Exception{
	  Calendar c1 = new GregorianCalendar();
	  c1.add(Calendar.HOUR, -1);
	  Calendar c2 = new GregorianCalendar();
	  c2.add(Calendar.HOUR, -2);
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	  String hour = sdf.format(c1.getTime());
	  String hour1 = sdf.format(c2.getTime());
	  System.out.println(hour);
	  try{
		  List<Map> list = new ArrayList<>();
		  Map map = new HashMap();
		  map.put("_defaultDB", "ncustoms_yj");
		  map.put("location", "VIS");
		  map.put("hour", hour);
		  map.put("hour1", hour1);
		  list.addAll(edmsManagementService.selectImportZeissDecide(map));

		  if(list.size() > 0){
		  for (int rownum = 0; rownum < list.size(); rownum++) {
			  MimeMessage message = javaMailSender.createMimeMessage();
			  MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			  boolean fileAttachYn = false;

			  String toAddrString = String.valueOf("seunghwan.yoon@zeiss.com,dl.vis-warehouse.kr@zeiss.com,czvk_cs@zeiss.com");
			  List<String> toAddr = Arrays.asList(toAddrString.split("\\s*,\\s*"));
			  String[] toAddrArray = toAddr.toArray(new String[toAddr.size()]);
			  // email validation
			  List<String> receiveEmailiList = new ArrayList<>();
			  for (int i = 0, n = toAddrArray.length; i < n; i++) {
				if (EmailValidator.getInstance().isValid(toAddrArray[i])) {
				  receiveEmailiList.add(toAddrArray[i]);
				}
			  }
			  String[] confirmReceiveEmailis = receiveEmailiList.toArray(new String[receiveEmailiList.size()]);
			  messageHelper.setTo(confirmReceiveEmailis);

			  String senderEmail = String.valueOf("zeiss@esein.co.kr");
			  String senderName = String.valueOf("칼자이스 공용메일");
			  messageHelper.setFrom(senderEmail, senderName);

			  messageHelper.setSubject(String.valueOf("[SEIN] BL. "+list.get(rownum).get("startNum")+", PO. "+list.get(rownum).get("startPoNo1")+" 서류접수 안내"));
			  messageHelper.setText(String.valueOf("[서류접수 안내]<br><br>1. BL 번호 : "+list.get(rownum).get("startNum")+"<br>2. PO 번호 : "+list.get(rownum).get("startPoNo1")+"<br>3. 서류접수일 : "+list.get(rownum).get("startReferenceNo3")+"<br>4. 입항일 : "+list.get(rownum).get("Impo_iphang")+"<br><br>※ https://www.customspass.com 에서 통관진행현황 및 선적서류를 확인할 수 있습니다."), Boolean.parseBoolean(String.valueOf(true)));

			  javaMailSender.send(message);
		  }
		  }
	  }finally{
	  }
  }
}