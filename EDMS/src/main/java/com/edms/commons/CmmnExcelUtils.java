package com.edms.commons;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CmmnExcelUtils {
  /**
   * 엑셀 확장자 검사
   *
   * @param extension the extension
   * @return 엑셀 true, 엑셀이 아니면 false
   */
  public static boolean excelExtensionCheck(String extension) {
	boolean rtn = false;
	// 엑셀 확장자
	List<String> excelExtensionList = new ArrayList();
	excelExtensionList.add("xlsx");
	excelExtensionList.add("xlsm");
	excelExtensionList.add("xlsb");
	excelExtensionList.add("xltx");
	excelExtensionList.add("xltm");
	excelExtensionList.add("xls");
	excelExtensionList.add("xlt");
	excelExtensionList.add("xlm");
	excelExtensionList.add("xlw");

	for (int i = 0, n = excelExtensionList.size(); i < n; i++) {
	  if (extension.equalsIgnoreCase(excelExtensionList.get(i))) {
		rtn = true;
		break;
	  }
	}

	return rtn;
  }

  /**
   * 엑셀 파일 임시 저장
   *
   * @param multipartFile  the multipart file
   * @param fileUploadPath the file upload path
   * @return success : fileName, fail : zeroLength
   * @throws IOException the io exception
   */
  public static String excelFileUpload(MultipartFile multipartFile, String fileUploadPath) throws IOException {
	File dir = new File(fileUploadPath);
	if (!dir.isDirectory()) {
	  dir.mkdirs();
	}
	String fileName = multipartFile.getOriginalFilename();
	String nowTime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	String fileExt = multipartFile.getOriginalFilename().substring(fileName.lastIndexOf(".") + 1, fileName.length());
	fileName = fileName + nowTime + "." + fileExt;

	byte[] bytes = multipartFile.getBytes();
	try {
	  File file = new File(fileName);
	  FileOutputStream fileOutputStream = new FileOutputStream(file);
	  fileOutputStream.write(bytes);
	  fileOutputStream.close();
	} catch (IOException ie) {
	  // Exception 처리
	  System.err.println("File writing error");
	  return "";
	}

	return fileName;
  }

  /**
   * 엑셀 파일 읽기(단일 시트용)
   *
   * @param fileName the file name
   * @return excelList list
   * @throws Exception the exception
   */
  public static List<List<String>> excelReader(String fileName) throws Exception {
	List<List<String>> excelList = new ArrayList<>();
	OPCPackage opcPackage = OPCPackage.open(new File(fileName));
	XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
	FileOutputStream fileOut = new FileOutputStream(fileName);
	workbook.write(fileOut);
	opcPackage.close();
	fileOut.close();

	XSSFRow row;
	XSSFCell cell;
	XSSFSheet sheet = workbook.getSheetAt(0);
	// 로우수
	int rowCnt = sheet.getPhysicalNumberOfRows();
	// 셀 수 (첫번째 로우 기준)
	int cellCnt = sheet.getRow(0).getPhysicalNumberOfCells();
//  int cellCnt = 1; // 1로 고정 첫 셀만 가져온다.

	for (int r = 0; r < rowCnt; r++) {
	  List<String> excel = new ArrayList();
	  row = sheet.getRow(r); // row 가져오기
	  // 중복제거 플래그
	  boolean excelOverlapFlag = true;

	  for (int c = 0; c < cellCnt; c++) {
//	  cell = row.getCell(StaticFinalCDUtil.EXCEL_GET_CELL);
		cell = row.getCell(c);
		String cellValue = "";

		// 엑셀 타입별로 분리
		// 숫자, 문자 이외의 수식, 데이터, null이 아닌 공백, 에러 등 많은 종류가 있다
		int cellType = cell.getCellType();
		switch (cellType) {
		  case XSSFCell.CELL_TYPE_NUMERIC: // type 숫자
			cellValue = String.valueOf(cell.getNumericCellValue());
			break;
		  case XSSFCell.CELL_TYPE_STRING: // type 문자
			cellValue = cell.getStringCellValue();
			break;
		}

		// 중복제거
		if (excelList.size() > 0) {
		  for (int i = 0, n = excelList.size(); i < n; i++) {
			List<String> list = excelList.get(i);
			if (list.get(0).equals(cellValue)) {
			  excelOverlapFlag = false;
			  break;
			}
		  }
		  if (excelOverlapFlag) {
			excel.add(cellValue);
		  }
		} else {
		  excel.add(cellValue);
		}
	  }
	  if (excelOverlapFlag) {
		excelList.add(excel);
	  }
	}

	return excelList;
  }

  /**
   * Excel reader for multi sheet list.(엑셀 파일 다중 시트 읽기)
   *
   * @param filePath          the file path
   * @param fileName          the file name
   * @param limitRow          the limit row(샘플뷰를 위한 limit, 0일 경우 전체)
   * @param optionalHeaderRow the optional header row
   * @return the list
   */
  public static List<List<String>> excelReaderForMultiSheet(String filePath, String fileName, int limitRow, Object... optionalHeaderRow) {
	List<List<String>> lists = new ArrayList<>(); //리턴용
	ObjectMapper objectMapper = new ObjectMapper();
	Map returnMap = new HashMap();
	List<String> stringList = new ArrayList<>();

	try {
	  FileInputStream inputStream = new FileInputStream(filePath + fileName);
	  XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
	  inputStream.close();

	  XSSFRow row;
	  XSSFCell cell;
	  //sheet수 취득
	  int sheetCnt = workbook.getNumberOfSheets();

	  for (int cn = 0; cn < sheetCnt; cn++) {
		String sheetName = workbook.getSheetName(cn);
		//0번째 sheet 정보 취득
		XSSFSheet sheet = workbook.getSheetAt(cn);
		//취득된 sheet에서 rows수 취득
		int rows = limitRow > 0 ? limitRow + 1 : sheet.getPhysicalNumberOfRows();
		//취득된 row에서 취득대상 cell수 취득
		int cells = sheet.getRow(cn).getPhysicalNumberOfCells();
		// 리스트to맵
//		List<Integer> isHeaderRow = Arrays.asList(Arrays.stream(optionalHeaderRow).toArray(Integer[]::new));
//		Map map = isHeaderRow.stream().collect(Collectors.toMap(String::toString, value -> value));

		//헤더 시작(첫번째 로우)
		List headerList = new ArrayList();
//		row = sheet.getRow(isHeaderRow.isEmpty() ? 0 : Integer.valueOf(isHeaderRow.get(0)));
		row = sheet.getRow(optionalHeaderRow.length > 0 ? Integer.valueOf(String.valueOf(optionalHeaderRow[0])) : 0);
		if (row != null) {
		  for (int c = 0; c < cells; c++) {
			cell = row.getCell(c);
			if (cell != null) {
			  switch (cell.getCellType()) {
				case XSSFCell.CELL_TYPE_FORMULA:
				  headerList.add(cell.getCellFormula());
				  break;
				case XSSFCell.CELL_TYPE_NUMERIC:
				  headerList.add("" + cell.getNumericCellValue());
				  break;
				case XSSFCell.CELL_TYPE_STRING:
				  headerList.add("" + cell.getStringCellValue());
				  break;
				case XSSFCell.CELL_TYPE_BLANK:
				  headerList.add("[공백]");
				  break;
				case XSSFCell.CELL_TYPE_ERROR:
				  headerList.add("" + cell.getErrorCellValue());
				  break;
				default:
			  }
			}
		  }
		} else {
		  throw new RuntimeException("headerRow check(파일:" + fileName + ", 시트명:" + sheetName + ")");
		}

		//body시작(두번쨰로우~end)
		List bodyList = new ArrayList();
		Map jsonMap = new HashMap();
		for (int r = 1; r < rows; r++) {
		  row = sheet.getRow(r);
		  if (row != null && headerList != null) {
			for (int k = 0, n = headerList.size(); k < n; k++) {
			  cell = row.getCell(k);
			  if (cell != null) {
				String rowValue = "";
				switch (cell.getCellType()) {
				  case XSSFCell.CELL_TYPE_FORMULA:
					rowValue = cell.getCellFormula();
					break;
				  case XSSFCell.CELL_TYPE_NUMERIC:
					rowValue = "" + cell.getNumericCellValue();
					break;
				  case XSSFCell.CELL_TYPE_STRING:
					rowValue = "" + cell.getStringCellValue();
					break;
				  case XSSFCell.CELL_TYPE_BLANK:
					rowValue = "[공백]";
					break;
				  case XSSFCell.CELL_TYPE_ERROR:
					rowValue = "" + cell.getErrorCellValue();
					break;
				  default:
				}
				jsonMap.put(String.valueOf(headerList.get(k)), rowValue);
			  }
			}
			bodyList.add(objectMapper.writeValueAsString(jsonMap));
		  }
		  returnMap.put(sheetName, bodyList);
		}
	  }
	  stringList.add(objectMapper.writeValueAsString(returnMap));
	} catch (Exception e) {
	  e.printStackTrace();
	}
	if (stringList != null) lists.add(stringList);

	return lists;
  }

  /**
   * Excel validation map.
   *
   * @param excelList 엑셀 리스트
   * @param checkByte 체크할 바이트 수
   * @return Map key = "zeroLengthList"
   * 공백 셀이 있는 셀의 로우값을 가지고 있는 리스트 key = "checkByteList".
   * 체크할 바이트 수를 넘어간 셀의 로우값을 가지고 있는 리스트 key = "checkFlag".
   * checkFlag 값이 true 이면 zeroLengthList, checkByteList는 null
   * key = "zeroLengthListSize" key = "checkByteListSize".
   */
  public static Map excelValidation(List<List<String>> excelList, int checkByte) {
	Map map = new HashMap();
	List<String> zeroLengthList = new ArrayList();
	List<String> checkByteList = new ArrayList();

	for (int i = 0, n = excelList.size(); i < n; i++) {
	  List<String> excelCell = excelList.get(i);
	  for (int c = 0, m = excelCell.size(); c < m; c++) {
		String cell = excelCell.get(c);
		// 공백체크
		if (StringUtils.isEmpty(cell)) {
		  zeroLengthList.add(String.valueOf(i));
		}
		// 바이트 체크 (영문 1, 한글 2, 특문 1)
		int en = 0, ko = 0, etc = 0;
		char[] cellChar = cell.toCharArray();
		for (int j = 0; j < cellChar.length; j++) {
		  if (cellChar[j] >= 'A' && cellChar[j] <= 'z') {
			en++;
		  } else if (cellChar[j] >= '\uAC00' && cellChar[j] <= '\uD7A3') {
			ko++;
			ko++;
		  } else {
			etc++;
		  }
		}
		int cellByte = en + ko + etc;
		if (cellByte > checkByte) {
		  checkByteList.add(String.valueOf(i));
		}
	  }
	}

	if (zeroLengthList.size() > 0) {
	  map.put("zeroLengthList", zeroLengthList);
	  map.put("zeroLengthListSize", zeroLengthList.size());
	} else {
	  map.put("zeroLengthList", null);
	  map.put("zeroLengthListSize", 0);
	}
	if (checkByteList.size() > 0) {
	  map.put("checkByteList", checkByteList);
	  map.put("checkByteListSize", checkByteList.size());
	} else {
	  map.put("checkByteList", null);
	  map.put("checkByteListSize", 0);
	}

	if (zeroLengthList.size() == 0 && checkByteList.size() == 0) {
	  map.put("checkFlag", true);
	} else {
	  map.put("checkFlag", false);
	}

	return map;
  }
}