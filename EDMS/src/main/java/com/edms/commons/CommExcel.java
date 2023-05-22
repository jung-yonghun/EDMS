package com.edms.commons;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class CommExcel extends AbstractExcelView {
  private Logger log = Logger.getLogger(this.getClass());

  @Override
  protected void buildExcelDocument(Map<String, Object> ModelMap, XSSFWorkbook Workbook, HttpServletRequest Req, HttpServletResponse Res) throws Exception {

    String ExcelName = (String) ModelMap.get("ExcelName");

    List<String> MasterColName = (List<String>) ModelMap.get("ColName");
    List<String[]> MasterColValue = (List<String[]>) ModelMap.get("ColValue");
    List<String> DetailColName = (List<String>) ModelMap.get("DetailColName");
    List<String[]> DetailColValue = (List<String[]>) ModelMap.get("DetailColValue");
    List<String> SubDetailColName = (List<String>) ModelMap.get("SubDetailColName");
    List<String[]> SubDetailColValue = (List<String[]>) ModelMap.get("SubDetailColValue");
    List<String> SubDetailColName2 = (List<String>) ModelMap.get("SubDetailColName2");
    List<String[]> SubDetailColValue2 = (List<String[]>) ModelMap.get("SubDetailColValue2");
    List<String> SubDetailColName3 = (List<String>) ModelMap.get("SubDetailColName3");
    List<String[]> SubDetailColValue3 = (List<String[]>) ModelMap.get("SubDetailColValue3");

    Res.setContentType("Application/Msexcel");
    Res.setHeader("Content-Disposition", "Attachment; Filename=" + ExcelName + ".xlsx");

    XSSFSheet MasterSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8"));
    createExcelData(Workbook, MasterColName, MasterColValue, MasterSheet);

    if (DetailColName != null) {
      XSSFSheet DetailSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_detail");
      createExcelData(Workbook, DetailColName, DetailColValue, DetailSheet);
    }
    if (SubDetailColName != null) {
      XSSFSheet SubDetailSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail");
      createExcelData(Workbook, SubDetailColName, SubDetailColValue, SubDetailSheet);
    }
    if (SubDetailColName2 != null) {
      XSSFSheet SubDetailSheet2 = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail2");
      createExcelData(Workbook, SubDetailColName2, SubDetailColValue2, SubDetailSheet2);
    }
    if (SubDetailColName3 != null) {
      XSSFSheet SubDetailSheet3 = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail3");
      createExcelData(Workbook, SubDetailColName3, SubDetailColValue3, SubDetailSheet3);
    }
  }
  
  private void createExcelData(XSSFWorkbook Workbook, List<String> ColName, List<String[]> ColValue, XSSFSheet Sheet) {
    // 상단 메뉴명 생성
    XSSFRow MenuRow = Sheet.createRow(0);
    for (int i = 0; i < ColName.size(); i++) {
      XSSFCell Cell = MenuRow.createCell(i);

      Cell.setCellStyle(getTitleStyle(Workbook));
      // Cell.setCellValue(new HSSFRichTextString(ColName.get(i)));
      Cell.setCellValue(ColName.get(i));
    }

    // 내용 생성
    for (int i = 0; i < ColValue.size(); i++) {
      // 메뉴 ROW가 있기때문에 +1을 해준다.
      XSSFRow Row = Sheet.createRow(i + 1);
      for (int j = 0; j < ColValue.get(i).length; j++) {
        XSSFCell Cell = Row.createCell(j);

        if (ColValue.get(i)[j] != null && isStringDouble(ColValue.get(i)[j])) {
          Cell.setCellValue(Double.valueOf(ColValue.get(i)[j]));
        } else {
          // Cell.setCellValue(new HSSFRichTextString(ColValue.get(i)[j]));
          Cell.setCellValue(ColValue.get(i)[j]);
        }
      }
    }
  }

  private CellStyle getTitleStyle(XSSFWorkbook wb) {
    // 제목 폰트
    Font hf = wb.createFont();
    hf.setFontHeightInPoints((short) 8);
    hf.setColor((short) HSSFColor.BLACK.index);
    hf.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

    // Header style setting
    CellStyle hcs = wb.createCellStyle();
    hcs.setFont(hf);
    hcs.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    // set border style
    hcs.setBorderBottom(HSSFCellStyle.BORDER_THICK);
    hcs.setBorderRight(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderLeft(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderTop(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderBottom(HSSFCellStyle.BORDER_THIN);

    // set color
    hcs.setFillBackgroundColor((short) HSSFColor.WHITE.index);
    hcs.setFillForegroundColor((short) HSSFColor.GREY_25_PERCENT.index);
    hcs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
    hcs.setLocked(true);
    hcs.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

    return hcs;
  }

  public static boolean isStringDouble(String s) {
    try {
      Double.parseDouble(s);
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }
}