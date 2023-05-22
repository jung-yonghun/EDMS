package com.edms.commons;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;

import java.io.*;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Stack;

public class CmmnFileCompressUtils {
  private static boolean debug = false;

  /**
   * 압축파일이 존재하는 디렉토리에 압축 해제
   *
   * @param zippedFile the zipped file
   * @throws IOException the io exception
   */
  public void unzip(File zippedFile) throws IOException {
	unzip(zippedFile, Charset.defaultCharset().name());
  }

  /**
   * Unzip.
   *
   * @param zippedFile the zipped file
   * @param encoding   the encoding
   * @throws IOException the io exception
   */
  public void unzip(File zippedFile, String encoding) throws IOException {
	unzip(zippedFile, zippedFile.getParentFile(), encoding);
  }

  /**
   * Unzip.
   *
   * @param zippedFile the zipped file
   * @param destDir    the dest dir
   * @throws IOException the io exception
   */
  public void unzip(File zippedFile, File destDir) throws IOException {
	unzip(new FileInputStream(zippedFile), destDir, Charset.defaultCharset().name());
  }

  /**
   * Unzip.
   *
   * @param zippedFile the zipped file
   * @param destDir    the dest dir
   * @param encoding   the encoding
   * @throws IOException the io exception
   */
  public void unzip(File zippedFile, File destDir, String encoding) throws IOException {
	unzip(new FileInputStream(zippedFile), destDir, encoding);
  }

  /**
   * Unzip.
   *
   * @param is      the is
   * @param destDir the dest dir
   * @throws IOException the io exception
   */
  public void unzip(InputStream is, File destDir) throws IOException {
	unzip(is, destDir, Charset.defaultCharset().name());
  }

  /**
   * Unzip.
   *
   * @param is       the is
   * @param destDir  the dest dir
   * @param encoding the encoding
   * @throws IOException the io exception
   */
  public void unzip(InputStream is, File destDir, String encoding) throws IOException {
	ZipArchiveInputStream zis;
	ZipArchiveEntry entry;
	String name;
	File target;
	int nWritten = 0;
	BufferedOutputStream bos;
	byte[] buf = new byte[1024 * 8];

	ensureDestDir(destDir);

	zis = new ZipArchiveInputStream(is, encoding, false);
	while ((entry = zis.getNextZipEntry()) != null) {
	  name = entry.getName();
	  target = new File(destDir, name);
	  if (entry.isDirectory()) {
		ensureDestDir(target);
	  } else {
		target.createNewFile();
		bos = new BufferedOutputStream(new FileOutputStream(target));
		while ((nWritten = zis.read(buf)) >= 0) {
		  bos.write(buf, 0, nWritten);
		}
		bos.close();
//		debug("file : " + name);
	  }
	}
	zis.close();
  }

  private void ensureDestDir(File dir) throws IOException {
	if (!dir.exists()) {
	  dir.mkdirs(); /*  does it always work? */
//	  debug("dir  : " + dir);
	}
  }

  /**
   * compresses the given file(or dir) and creates new file under the same directory.
   *
   * @param src file or directory
   * @throws IOException the io exception
   */
  public void zip(File src) throws IOException {
	zip(src, Charset.defaultCharset().name(), true);
  }

  /**
   * zips the given file(or dir) and create
   *
   * @param src        file or directory to compress
   * @param includeSrc if true and src is directory, then src is not included in the compression. if false, src is included.
   * @throws IOException the io exception
   */
  public void zip(File src, boolean includeSrc) throws IOException {
	zip(src, Charset.defaultCharset().name(), includeSrc);
  }

  /**
   * compresses the given src file (or directory) with the given encoding
   *
   * @param src         the src
   * @param charSetName the char set name
   * @param includeSrc  the include src
   * @throws IOException the io exception
   */
  public void zip(File src, String charSetName, boolean includeSrc) throws IOException {
	zip(src, src.getParentFile(), charSetName, includeSrc);
  }

  /**
   * compresses the given src file(or directory) and writes to the given output stream.
   *
   * @param src the src
   * @param os  the os
   * @throws IOException the io exception
   */
  public void zip(File src, OutputStream os) throws IOException {
	zip(src, os, Charset.defaultCharset().name(), true);
  }

  /**
   * compresses the given src file(or directory) and create the compressed file under the given destDir.
   *
   * @param src         the src
   * @param destDir     the dest dir
   * @param charSetName the char set name
   * @param includeSrc  the include src
   * @throws IOException the io exception
   */
  public void zip(File src, File destDir, String charSetName, boolean includeSrc) throws IOException {
	String fileName = src.getName();
	if (!src.isDirectory()) {
	  int pos = fileName.lastIndexOf(".");
	  if (pos > 0) {
		fileName = fileName.substring(0, pos);
	  }
	}
	fileName += ".zip";
	ensureDestDir(destDir);

	File zippedFile = new File(destDir, fileName);
	if (!zippedFile.exists()) zippedFile.createNewFile();
	zip(src, new FileOutputStream(zippedFile), charSetName, includeSrc);
  }

  /**
   * Zip.
   *
   * @param filesToZip the files to zip
   * @param os         the os
   * @param encoding   the encoding
   */
  public void zip(File[] filesToZip, OutputStream os, String encoding) {

  }

  /**
   * Zip.
   *
   * @param src         the src
   * @param os          the os
   * @param charsetName the charset name
   * @param includeSrc  the include src
   * @throws IOException the io exception
   */
  public void zip(File src, OutputStream os, String charsetName, boolean includeSrc) throws IOException {
	ZipArchiveOutputStream zos = new ZipArchiveOutputStream(os);
	zos.setEncoding(charsetName);
	FileInputStream fis;

	int length;
	ZipArchiveEntry ze;
	byte[] buf = new byte[8 * 1024];
	String name;

	Stack<File> stack = new Stack<File>();
	File root;
	if (src.isDirectory()) {
	  if (includeSrc) {
		stack.push(src);
		root = src.getParentFile();
	  } else {
		File[] fs = src.listFiles();
		for (int i = 0; i < fs.length; i++) {
		  stack.push(fs[i]);
		}
		root = src;
	  }
	} else {
	  stack.push(src);
	  root = src.getParentFile();
	}

	while (!stack.isEmpty()) {
	  File f = stack.pop();
	  name = toPath(root, f);
	  if (f.isDirectory()) {
//		debug("dir  : " + name);
		File[] fs = f.listFiles();
		for (int i = 0; i < fs.length; i++) {
		  if (fs[i].isDirectory()) stack.push(fs[i]);
		  else stack.add(0, fs[i]);
		}
	  } else {
//		debug("file : " + name);
		ze = new ZipArchiveEntry(name);
		zos.putArchiveEntry(ze);
		fis = new FileInputStream(f);
		while ((length = fis.read(buf, 0, buf.length)) >= 0) {
		  zos.write(buf, 0, length);
		}
		fis.close();
		zos.closeArchiveEntry();
	  }
	}
	zos.close();
  }

  /**
   * Zip.(리스트로 파일을 받아 zip로 압축)
   *
   * @param src the src
   * @param os  the os
   * @throws IOException the io exception
   */
  public void zip(List<File> src, OutputStream os) throws IOException {
	ZipArchiveOutputStream zos = new ZipArchiveOutputStream(os);
	zos.setEncoding(Charset.defaultCharset().name());
	FileInputStream fis = null;

	int length;
	ZipArchiveEntry ze;
	byte[] buf = new byte[8 * 1024];

	if (src.size() > 0) {
	  for (int i = 0; i < src.size(); i++) {
		ze = new ZipArchiveEntry(src.get(i).getName());
		zos.putArchiveEntry(ze);
		fis = new FileInputStream(src.get(i));
		while ((length = fis.read(buf, 0, buf.length)) >= 0) {
		  zos.write(buf, 0, length);
		}
	  }

	  fis.close();
	  zos.closeArchiveEntry();
	}

	zos.close();
  }

  /**
   * Is zip boolean.(리스트로 파일을 받아 zip로 압축, 성공여부 리턴)
   *
   * @param src the src
   * @param os  the os
   * @return the boolean
   * @throws IOException the io exception
   */
  public Boolean isZip(List<File> src, OutputStream os) throws IOException {
	ZipArchiveOutputStream zos = new ZipArchiveOutputStream(os);
	zos.setEncoding(Charset.defaultCharset().name());
	FileInputStream fis = null;

	int length;
	String body="";
	ZipArchiveEntry ze;
	byte[] buf = new byte[8 * 1024];

	try {
	  if (src.size() > 0) {
		for (int i = 0; i < src.size(); i++) {
		  int dot = String.valueOf(src.get(i)).lastIndexOf(".");
		  if (dot != -1) {
			  body = String.valueOf(src.get(i)).substring(0, dot);
		  }
		  ze = new ZipArchiveEntry(src.get(i).getName());
		  zos.putArchiveEntry(ze);
		  fis = new FileInputStream(body);
		  while ((length = fis.read(buf, 0, buf.length)) >= 0) {
			zos.write(buf, 0, length);
		  }
		}

		fis.close();
		zos.closeArchiveEntry();
	  }
	  zos.close();
	} catch (Exception e) {
	  return false;
	} finally {
	  if (fis != null) fis.close();
	  if (zos != null) zos.close();
	}

	return true;
  }

  public Boolean isZip(List<File> fileList, List<String> fileExt, OutputStream os) throws IOException {
		ZipArchiveOutputStream zos = new ZipArchiveOutputStream(os);
		zos.setEncoding(Charset.defaultCharset().name());
		FileInputStream fis = null;

		int length;
		ZipArchiveEntry ze;
		byte[] buf = new byte[8 * 1024];

		try {
		  if (fileList.size() > 0 && fileList.size() == fileExt.size()) {
			for (int i = 0; i < fileList.size(); i++) {
//			  ze = new ZipArchiveEntry(fileList.get(i).getName() + "." + fileExt.get(i));
			  ze = new ZipArchiveEntry(fileExt.get(i));
			  zos.putArchiveEntry(ze);
			  fis = new FileInputStream(fileList.get(i));
			  while ((length = fis.read(buf, 0, buf.length)) >= 0) {
				zos.write(buf, 0, length);
			  }
			}

			fis.close();
			zos.closeArchiveEntry();
		  }
		  zos.close();
		} catch (Exception ignore) {
//		  System.err.println(e);
//		  e.printStackTrace();
		  return false;
//		} finally {
//		  if (fis != null) fis.close();
//		  if (zos != null) zos.close();
		}

		return true;
  }

  private String toPath(File root, File dir) {
	String path = dir.getAbsolutePath();
	path = path.substring(root.getAbsolutePath().length()).replace(File.separatorChar, '/');
	if (path.startsWith("/")) path = path.substring(1);
	if (dir.isDirectory() && !path.endsWith("/")) path += "/";
	return path;
  }

//  public static void test(String[] args) {
//		/*//폴더 압축
//		CompressionUtil cu = new CompressionUtil();
//		try {
//			cu.zip( new File("d:\\DBscript") );
//		} catch (IOException e) {
//			e.printStackTrace();
//		}*/
//		/*//파일 삭제
//		File objFile = new File("c:/sharpplus/upload/20.zip");
//		objFile.delete();
//		*/
//	//파일리스트로 압축
//	CmmnFileCompressUtil cu = new CmmnFileCompressUtil();
//	try {
//	  List<File> filelist = new ArrayList();
//	  filelist.add(new File("d:\\aaa.xls"));
//	  filelist.add(new File("d:\\bbb.xls"));
//
//	  File zippedFile = new File("d:\\", "1234.zip");
//	  cu.zip(filelist, new FileOutputStream(zippedFile));
//	} catch (IOException e) {
//	  e.printStackTrace();
//	}
//  }
}
