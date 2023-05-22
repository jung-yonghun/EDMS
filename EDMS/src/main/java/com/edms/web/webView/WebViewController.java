package com.edms.web.webView;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

@Controller
@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
public class WebViewController{
	@RequestMapping(value = "/", method = {RequestMethod.GET})
	public String index() {
		return "login";
	}

	@RequestMapping(value = {"/{viewName}.sein"})
	public ModelAndView getCommHandler(@PathVariable("viewName") String viewName) throws Exception{
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/" + viewName);
		return mav;
	}

	@RequestMapping(value = {"/{parentFolder}/{viewName}.sein"})
	public ModelAndView getCommHandler(@PathVariable("parentFolder") String parentFolder, @PathVariable("viewName") String viewName) throws Exception{
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/" + parentFolder + "/" + viewName);
		return mav;
	}

	@RequestMapping(value = {"/{grand}/{parent}/{viewName}.sein"})
	public ModelAndView getCommHandler(@PathVariable("grand") String grand, @PathVariable("parent") String parent, @PathVariable("viewName") String viewName) throws Exception{
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/" + grand + "/" + parent + "/" + viewName);
		return mav;
	}

	@RequestMapping(value = {"/robots", "/robot", "/robot.txt", "/src/robots.txt", "/null"})
	public void denyRobots(HttpServletResponse response) throws IOException{
		InputStream inputStream = null;
		try{
			ClassLoader classLoader = getClass().getClassLoader();
			inputStream = classLoader.getResourceAsStream("robots.txt");
			response.addHeader("Content-disposition", "filename=robots.txt");
			response.setContentType("text/plain");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
		}catch(Exception e){
			System.err.printf("Problem with displaying robots.txt", e);
		}finally{
			inputStream.close();
		}
	}
}