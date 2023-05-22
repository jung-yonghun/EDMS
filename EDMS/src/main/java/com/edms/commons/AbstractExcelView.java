package com.edms.commons;

import java.io.ByteArrayOutputStream;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.LocalizedResourceHelper;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.view.AbstractView;

public abstract class AbstractExcelView extends AbstractView {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  /**
   * The content type for an Excel response
   */
  private static final String CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  /**
   * The extension to look for existing templates
   */
  private static final String EXTENSION = ".xlsx";
  private String url;

  /**
   * * Default Constructor. * Sets the content type of the view to
   * "application/vnd.ms-excel".
   */
  public AbstractExcelView() {
    setContentType(CONTENT_TYPE);
  }

  public void setUrl(String url) {
    this.url = url;
  }

  @Override
  protected boolean generatesDownloadContent() {
    return true;
  }

  /**
   * Renders the Excel view, given the specified model.
   */
  @Override
  protected final void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

    XSSFWorkbook xssfWorkbook = new XSSFWorkbook();
    ByteArrayOutputStream baos = createTemporaryOutputStream();

    logger.debug("-----------Start Excel Export---------");

    buildExcelDocument(model, xssfWorkbook, request, response);

    xssfWorkbook.write(baos);
    writeToResponse(response, baos);
  }

  protected Workbook getTemplateSource(String url, HttpServletRequest request) throws Exception {
    LocalizedResourceHelper helper = new LocalizedResourceHelper(getApplicationContext());
    Locale userLocale = RequestContextUtils.getLocale(request);
    Resource inputFile = helper.findLocalizedResource(url, EXTENSION, userLocale);

    // Create the Excel document from the source.
    if (logger.isDebugEnabled()) {
      logger.debug("Loading Excel workbook from " + inputFile);
    }

    return new XSSFWorkbook(inputFile.getInputStream());
  }

  protected abstract void buildExcelDocument(Map<String, Object> model, XSSFWorkbook xssfWorkbook, HttpServletRequest request, HttpServletResponse response)
      throws Exception;

  protected Cell getCell(Sheet sheet, int row, int col) {
    Row sheetRow = sheet.getRow(row);
    if (sheetRow == null) {
      sheetRow = sheet.createRow(row);
    }
    Cell cell = sheetRow.getCell(col);
    if (cell == null) {
      cell = sheetRow.createCell(col);
    }
    return cell;
  }

  protected void setText(Cell cell, String text) {
    cell.setCellType(Cell.CELL_TYPE_STRING);
    cell.setCellValue(text);
  }
}
