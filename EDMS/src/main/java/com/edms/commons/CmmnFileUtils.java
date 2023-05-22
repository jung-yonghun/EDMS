package com.edms.commons;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * The type Cmmn file utils.
 */
public class CmmnFileUtils {
  /**
   * Delete path string.
   *
   * @param sourceFilePath the source file path
   * @param fileName       the file name
   * @return the string
   */
  public static final String deletePath(String sourceFilePath, String fileName) {
	File file = new File(sourceFilePath + fileName);
	String result = "";
	try {
	  if (file.exists()) {
		result = file.getAbsolutePath();
		if (!file.delete()) {
		  result = "";
		}
	  }
	} catch (Exception e) {
	  throw new RuntimeException(e);
	}
	return result;
  }

  /**
   * Remove path string.
   *
   * @param sourceFilePath      the source file path
   * @param destinationFilePath the destination file path
   * @param fileName            the file name
   * @return the string
   */
  public static final String removePath(String sourceFilePath, String destinationFilePath, String fileName) {
	File file = new File(sourceFilePath + fileName);
	File deletedDir = new File(destinationFilePath);
	if (!deletedDir.isDirectory()) {
	  deletedDir.mkdirs();
	}

	File fileToMove = new File(destinationFilePath + fileName);
	String result = "";
	try {
	  if (file.exists()) {
		result = file.getAbsolutePath();
		if (fileToMove.exists()) {
		  fileToMove.delete();
		}
		// 이동(삭제시 deleted폴더로 이동)
		if (!file.renameTo(fileToMove)) {
		  result = "";
		}
	  }
	} catch (Exception e) {
	  throw new RuntimeException(e);
	}
	return result;
  }

  /**
   * Remove path and return file name string.
   *
   * @param sourceFilePath      the source file path
   * @param destinationFilePath the destination file path
   * @param fileName            the file name
   * @return the string
   */
  public static final String removePathAndReturnFileName(String sourceFilePath, String destinationFilePath, String fileName) {
	File file = new File(sourceFilePath + fileName);
	File deletedDir = new File(destinationFilePath);
	if (!deletedDir.isDirectory()) {
	  deletedDir.mkdirs();
	}

	File fileToMove = new File(destinationFilePath + fileName);
	String result = fileName;
	try {
	  if (file.exists()) {
		file.getAbsolutePath();
		if (fileToMove.exists()) {
		  //존재하면 이름 변경
		  String body, ext;
		  long sysTime = System.currentTimeMillis();
		  int dot = fileName.lastIndexOf('.');
		  if (dot != -1) {
			body = fileName.substring(0, dot);
			ext = fileName.substring(dot); // includes "."
			fileName = body + '_' + sysTime + ext;
		  } else {
			fileName = fileName + "_" + sysTime;
		  }
		  fileToMove = new File(destinationFilePath + fileName);
		}
		// 이동(삭제시 deleted폴더로 이동)
		if (!file.renameTo(fileToMove)) {
		  result = "";
		} else {
		  result = fileName;
		}
	  }
	} catch (Exception e) {
	  throw new RuntimeException(e);
	}
	return result;
  }

  /**
   * Convert original file name string.
   *
   * @param fileName the file name
   * @return the string
   */
  public static final String convertOriginalFileName(String fileName) {
	String originalFileName;
	int ieCheck = fileName.lastIndexOf('\\');
	if (ieCheck > 0) {
	  originalFileName = fileName.substring(ieCheck + 1, fileName.length());
	} else {
	  originalFileName = fileName;
	}
	return originalFileName;
  }

  /**
   * Convert encode file name string.
   *
   * @param fileName the file name
   * @return the string
   */
  public static final String convertEncodeFileName(String fileName) {
	String convertFileName;
	try {
	  //convertFileName =  URLEncoder.encode(fileName, "UTF-8").replace("+", "%20").replace("*", "%2A").replace("%7E", "~");
	  convertFileName = URLEncoder.encode(fileName, "UTF-8")
			  .replaceAll("\\+", "%20").replaceAll("\\*", "%2A")
			  .replaceAll("%21", "!").replaceAll("%22", "\"").replaceAll("%23", "#").replaceAll("%24", "\\$").replaceAll("%25", "%")
			  .replaceAll("%26", "&").replaceAll("%27", "'").replaceAll("%28", "(").replaceAll("%29", ")")
			  .replaceAll("%2A", "*").replaceAll("%2B", "+").replaceAll("%2C", "\\,").replaceAll("%2D", "-").replaceAll("%2E", ".")
			  .replaceAll("%3A", ":").replaceAll("%3B", ";").replaceAll("%3C", "<").replaceAll("%3D", "=").replaceAll("%3E", ">").replaceAll("%3F", "?")
			  .replaceAll("%40", "@")
			  .replaceAll("%5B", "[").replaceAll("%5C", "\\").replaceAll("%5D", "]").replaceAll("%5E", "^").replaceAll("%5F", "_")
			  .replaceAll("%60", "`")
			  .replaceAll("%7B", "{").replaceAll("%7C", "|").replaceAll("%7D", "}").replaceAll("%7E", "~");

	} catch (UnsupportedEncodingException e) {
	  convertFileName = fileName;
	}
	return convertFileName;
  }

  /**
   * Convert mpf to file file.
   *
   * @param file the file
   * @return the file
   * @throws IOException the io exception
   */
  public static File convertMpfToFile(MultipartFile file) throws IOException {
	File convFile = new File(file.getOriginalFilename());
	convFile.createNewFile();
	FileOutputStream fos = new FileOutputStream(convFile);
	fos.write(file.getBytes());
	fos.close();
	return convFile;
  }

  /**
   * Is extension check boolean.
   *
   * @param ext the ext
   * @return the boolean
   */
  public static boolean isExtensionCheck(String ext) {
	boolean rtn = false;
	// 확장자
	List<String> extensionList = new ArrayList<>();
	extensionList.add("xls");
	extensionList.add("xlsx");
	extensionList.add("doc");
	extensionList.add("docx");
	extensionList.add("ppt");
	extensionList.add("pptx");
	extensionList.add("hwp");
	extensionList.add("pdf");
	extensionList.add("txt");
	extensionList.add("bmp");
	extensionList.add("jpg");
	extensionList.add("jpeg");
	extensionList.add("gif");
	extensionList.add("png");
	extensionList.add("tif");
	extensionList.add("zip");
	// 2016-12-06 이후 추가
	extensionList.add("xps");
	extensionList.add("eml");
	extensionList.add("tiff");

	for (String extension : extensionList) {
	  if (ext.equalsIgnoreCase(extension)) {
		rtn = true;
		break;
	  }
	}

	return rtn;
  }

  /**
   * Gets file ext.
   *
   * @param fileName the file name
   * @return the file ext
   */
  public static String getFileExt(String fileName) {
	return fileName.lastIndexOf(".") == -1 ? "" : fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
  }

  /**
   * Is file name contain special character boolean.
   *
   * @param fileName the file name
   * @return the boolean
   */
  public static final boolean isFileNameContainSpecialCharacter(String fileName) {
	if (CmmnUtils.stringContainsItemFromList(fileName, new String[]{"?", "–"})) {
	  return true;
	}
	return false;
  }

  /**
   * Is contain chinese character boolean.
   *
   * @param fileName the file name
   * @return the boolean
   */
  public static final boolean isContainChineseCharacter(String fileName) {
	String regEx = ".*[\u2e80-\u2eff\u31c0-\u31ef\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fbf\uf900-\ufaff].*";
	if (fileName.matches(regEx)) {
	  return true;
	} else {
	  return false;
	}
  }

  /**
   * Is contains chinese and japanese character boolean.
   *
   * @param str the str
   * @return the boolean
   */
  public static boolean isContainsChineseAndJapaneseCharacter(String str) {
	for (int i = 0; i < str.length(); i++) {
	  char ch = str.charAt(i);
	  Character.UnicodeBlock unicodeBlock = Character.UnicodeBlock.of(ch);
	  if (/*Character.UnicodeBlock.HANGUL_SYLLABLES.equals(unicodeBlock) || Character.UnicodeBlock.HANGUL_COMPATIBILITY_JAMO.equals(unicodeBlock) || Character.UnicodeBlock.HANGUL_JAMO.equals(unicodeBlock) ||*/
			  Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS.equals(unicodeBlock) || Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A.equals(unicodeBlock) ||
					  Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B.equals(unicodeBlock) || Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS.equals(unicodeBlock) || Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT.equals(unicodeBlock) ||
					  Character.UnicodeBlock.HIRAGANA.equals(unicodeBlock) || Character.UnicodeBlock.KATAKANA.equals(unicodeBlock) || Character.UnicodeBlock.KATAKANA_PHONETIC_EXTENSIONS.equals(unicodeBlock))
		return true;
	}
	return false;
  }

  /**
   * Is contains japanese boolean.
   *
   * @param s the s
   * @return the boolean
   */
  public static boolean isContainsJapanese(String s) {
	return s.codePoints().anyMatch(codepoint -> Character.UnicodeScript.of(codepoint) == Character.UnicodeScript.HIRAGANA || Character.UnicodeScript.of(codepoint) == Character.UnicodeScript.KATAKANA);
  }

  /**
   * Is contains chinese boolean.
   *
   * @param s the s
   * @return the boolean
   */
  public static boolean isContainsChinese(String s) {
	return s.codePoints().anyMatch(codepoint -> Character.UnicodeScript.of(codepoint) == Character.UnicodeScript.HAN);
  }

  /**
   * Is contains korean boolean.
   *
   * @param s the s
   * @return the boolean
   */
  public static boolean isContainsKorean(String s) {
	return s.codePoints().anyMatch(codepoint -> Character.UnicodeScript.of(codepoint) == Character.UnicodeScript.HANGUL);
  }
}