<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.URLDecoder, java.net.URLEncoder" %>
<%
      try {

          String docName  = "";
          String data = request.getParameter("csvBuffer");
          String fileName1 = request.getParameter("fileName");
          System.out.println("############fileName1 :"+fileName1);

          //헤더 선택
          String header = request.getHeader("User-Agent");
          if (header.contains("MSIE"))       { header = "MSIE";   }
          else if(header.contains("Chrome")) { header = "Chrome"; }
          else if(header.contains("Opera"))  { header  = "Opera"; }

          if (data != null && fileName1 != null ) {
               data = URLDecoder.decode(data, "UTF-8");
               fileName1 = URLDecoder.decode(fileName1, "UTF-8");
               response.setContentType("application/vnd.ms-excel:UTF-8");

               if (header.contains("MSIE")|| header.contains("Trident")) {
                    docName = URLEncoder.encode(fileName1,"UTF-8").replaceAll("\\+", "%20");
                    response.setHeader("Content-Disposition", "attachment;filename=" + docName + "");
               } else if (header.contains("Firefox")) {
                    docName = new String(fileName1.getBytes("UTF-8"), "ISO-8859-1");
                    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "");
               } else if (header.contains("Opera")) {
                    docName = new String(fileName1.getBytes("UTF-8"), "ISO-8859-1");
                    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "");
               } else if (header.contains("Chrome")) {
                    docName = new String(fileName1.getBytes("UTF-8"), "ISO-8859-1");
                    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "");
               }
               //response.setHeader("Content-Type", "text/csv; charset=utf-8,%EF%BB%BF");
               response.setHeader("Pragma", "no-cache;");
               response.setHeader("Expires", "-1;");
               out.clearBuffer();
               out.print("\ufeff");
               out.println(data);

          }//end of if
      } catch ( Exception e ) {
           e.printStackTrace();
           out.println(e.toString());
      }
%>