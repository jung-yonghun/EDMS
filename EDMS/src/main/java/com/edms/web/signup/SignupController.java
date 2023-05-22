package com.edms.web.signup;

import com.edms.biz.logManagement.CpsLogAccessDao;
import com.edms.biz.systemManagement.UserMenuAuthMapper;
import com.edms.biz.userManagement.UserInfoDao;
import com.edms.biz.userManagement.UserManagementService;
import com.edms.biz.edmsManagement.EdmsManagementService;
import com.edms.commons.CmmnConstants;
import com.edms.commons.CmmnUtils;
import com.edms.domains.CpsLogAccessVO;
import com.edms.domains.CpsUserInfoVO;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.net.InetAddress;

@RestController
@RequestMapping(value = "/", method = {RequestMethod.POST})
public class SignupController{
	@Autowired
	private UserManagementService userManagementService;
	@Autowired
	private EdmsManagementService edmsManagementService;
	@Autowired
	private CpsLogAccessDao cpsLogAccessDao;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private ConfigurableWebApplicationContext subContext;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;

	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;

	@Value("${mainPage.path}")
	public String mainPagePath;
	@Value("${login.page}")
	public String loginPagePath;
	@Value("${relogin.page}")
	public String loginRePagePath;
	@Value("${system.admin.access.permission.ipAddr}")
	public String systemAdminAccessPermissionIpAddr;

	@RequestMapping(value = "/getUserIdOrPassword")
	public ResponseEntity<?> getUserIdOrPassword(HttpServletRequest request, @RequestBody Map args){
		String email 	= String.valueOf(args.get("email"));
		String userId 	= args.containsKey("userId") ? String.valueOf(args.get("userId")) : "";
		String userNm 	= String.valueOf(args.get("userNm"));
		try{
			CpsUserInfoVO userUserInfoVO;
			if(userId.equals("")){
				userUserInfoVO = userInfoDao.findByUserNameAndUserEmail(userNm, email);
			}else{
				System.out.println(userId);
				System.out.println(userNm);
				System.out.println(email);
				userUserInfoVO = userInfoDao.findByUserIdAndUserNameAndUserEmail(userId, userNm, email);
				userUserInfoVO.setUserPw(CmmnUtils.encryptCustomBASE64("1111"));
				//userInfoDao.save(userUserInfoVO);
				sqlSession.getMapper(UserMenuAuthMapper.class).syncPassword(CmmnUtils.convertObjectToMap(userUserInfoVO));
			}
			if (CmmnUtils.isNull(userUserInfoVO)) return new ResponseEntity<>(messageSource.getMessage("info.nodata.msg", new Object[]{}, Locale.KOREA), HttpStatus.UNAUTHORIZED);
			return new ResponseEntity<>(userUserInfoVO, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/autoLogin")
	public ModelAndView autoLogin(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 			= new ModelAndView();
		InetAddress local 			= InetAddress.getLocalHost();
		HttpSession session 		= request.getSession(true);
		String serverGubun 			= this.currentProfile();
		String serverIpAddr 		= CmmnUtils.getServerIpAddr();
		String clientIpAddr 		= String.valueOf(args.get("userIp"));
		String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String currentDate 			= CmmnUtils.getFormatedDate("yyyyMMdd");
		System.out.println("#########"+clientIpAddr);
		args.put("clientIp", clientIpAddr);
  		args.put("currentDate", currentDate);
  		List<Map> list = edmsManagementService.getAutoLoginList(args);
		if(list.size() == 0){
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(!CmmnUtils.isNull(auth)){
				new SecurityContextLogoutHandler().logout(request, response, auth);
			}

			mv.setViewName("redirect:." + loginRePagePath);
			return mv;
		}else{
			session.setAttribute(CmmnConstants.SESSION_ID, String.valueOf(list.get(0).get("userKey").toString()));
			session.setAttribute(CmmnConstants.SESSION_USERID, String.valueOf(list.get(0).get("logon_cd").toString()));
			session.setAttribute(CmmnConstants.SESSION_USERNAME, String.valueOf(list.get(0).get("userName").toString()));
			session.setAttribute(CmmnConstants.SESSION_GRADE, String.valueOf(list.get(0).get("userGradeA").toString()));
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, String.valueOf(list.get(0).get("defaultDB").toString()));
			session.setAttribute(CmmnConstants.SESSION_MAIL, String.valueOf(list.get(0).get("userEmail").toString()));
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_CLIENT_IP, clientIpAddr);
			session.setAttribute(CmmnConstants.SESSION_DEPART, String.valueOf(list.get(0).get("userDepart").toString()));

			// 접속성공로그
			CpsLogAccessVO cpsLogAccessVO = new CpsLogAccessVO();
			cpsLogAccessVO.setUserEmail(String.valueOf(list.get(0).get("userEmail").toString()));
			cpsLogAccessVO.setServerIp(serverIpAddr);
			cpsLogAccessVO.setClientIp(clientIpAddr);
			cpsLogAccessVO.setAction("로그인성공");
			cpsLogAccessVO.setAddUserEmail(String.valueOf(list.get(0).get("userEmail").toString()));
			cpsLogAccessVO.setAddUserName(String.valueOf(list.get(0).get("userName").toString()));
			cpsLogAccessVO.setAddDtm(currentDatetime);
			cpsLogAccessDao.save(cpsLogAccessVO);

			mv.setViewName("redirect:./" + mainPagePath);
			return mv;
		}
	}

	@RequestMapping(value = "/loginAction")
	public ModelAndView loginAction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 			= new ModelAndView();
		HttpSession session 		= request.getSession(true);
		String loginUserId 			= String.valueOf(args.get("userId"));
		String loginUserPw 			= String.valueOf(args.get("userPw"));
		String serverGubun 			= this.currentProfile();
		String serverIpAddr 		= CmmnUtils.getServerIpAddr();
		String clientIpAddr 		= CmmnUtils.getClientIpAddr(request);
		String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//		CpsUserInfoVO resultUser 	= userInfoDao.findByUserIdAndUserPwAndUseYn(loginUserId, CmmnUtils.encryptBase64("ENC", loginUserPw, "UTF-8"), "Y");

		Map map = new HashMap();
		map.put("userId",loginUserId);
		map.put("userPw",CmmnUtils.encryptBase64("ENC", loginUserPw, "UTF-8"));
		List<Map> resultUser = edmsManagementService.getLoginList(map);

		if(resultUser.size() < 1){
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(!CmmnUtils.isNull(auth)){
				new SecurityContextLogoutHandler().logout(request, response, auth);
			}

			mv.setViewName("redirect:." + loginPagePath);
			mv.addObject("resultMsg", messageSource.getMessage("fail.login.msg", null, null, Locale.KOREA));
			return mv;
		}else{
			String id 				= String.valueOf(resultUser.get(0).get("BSAAUKey"));
			String mngno 			= String.valueOf(resultUser.get(0).get("BSAAUMngNo"));
			String successUserId 	= String.valueOf(resultUser.get(0).get("ComUserId"));
			String userNm 			= String.valueOf(resultUser.get(0).get("ComUserHnm"));

			if(successUserId.equals("rpa2")){
				int interval = 21600;
				session.setMaxInactiveInterval(interval);
			}

			session.setAttribute(CmmnConstants.SESSION_ID, id);
			session.setAttribute(CmmnConstants.SESSION_MNGNO, mngno);
			session.setAttribute(CmmnConstants.SESSION_USERID, successUserId);
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userNm);
			session.setAttribute(CmmnConstants.SESSION_GRADE, String.valueOf(resultUser.get(0).get("ComUserGrade")));
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, String.valueOf(resultUser.get(0).get("defaultDB")));
			session.setAttribute(CmmnConstants.SESSION_MAIL, String.valueOf(resultUser.get(0).get("ComUserCmail")));
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_CLIENT_IP, clientIpAddr);
			session.setAttribute(CmmnConstants.SESSION_DEPART, String.valueOf(resultUser.get(0).get("userParts")));

			// 접속성공로그
			CpsLogAccessVO cpsLogAccessVO = new CpsLogAccessVO();
			cpsLogAccessVO.setUserEmail(String.valueOf(resultUser.get(0).get("ComUserCmail")));
			cpsLogAccessVO.setServerIp(serverIpAddr);
			cpsLogAccessVO.setClientIp(clientIpAddr);
			cpsLogAccessVO.setAction("로그인성공");
			cpsLogAccessVO.setAddUserEmail(String.valueOf(resultUser.get(0).get("ComUserCmail")));
			cpsLogAccessVO.setAddUserName(userNm);
			cpsLogAccessVO.setAddDtm(currentDatetime);
			cpsLogAccessDao.save(cpsLogAccessVO);

			if(args.get("check").equals("1")){
				mv.setViewName("redirect:./edms/edmsMasterList1.sein");
				return mv;
			}else{
				mv.setViewName("redirect:./" + mainPagePath);
				return mv;
			}
		}
	}

	@RequestMapping(value = "/logoutAction", method = {RequestMethod.GET})
	public ModelAndView logoutAction(HttpServletRequest request, HttpServletResponse response, ModelAndView model) throws Exception{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(!CmmnUtils.isNull(auth)){
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		model.setViewName("redirect:." + loginPagePath);
		model.addObject("resultMsg", messageSource.getMessage("success.logout.msg", null, null, Locale.KOREA));
		return model;
	}

	private String currentProfile(){
		String[] profiles = subContext.getEnvironment().getActiveProfiles();
		if (profiles.length == 0) {
			profiles = subContext.getEnvironment().getDefaultProfiles();
		}
		return profiles[0].toUpperCase();
	}

	@RequestMapping(value = "/loginPassAction")
	public ModelAndView loginPassAction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 			= new ModelAndView();
		HttpSession session 		= request.getSession(true);
		String loginUserMail		= String.valueOf(args.get("userEmail"));
		String serverGubun 			= this.currentProfile();
		String serverIpAddr 		= CmmnUtils.getServerIpAddr();
		String clientIpAddr 		= CmmnUtils.getClientIpAddr(request);
		String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		Map map = new HashMap();
		map.put("userEmail",loginUserMail);
		List<Map> resultUser = edmsManagementService.getLoginList(map);

		if(resultUser.size() < 1){
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if(!CmmnUtils.isNull(auth)){
				new SecurityContextLogoutHandler().logout(request, response, auth);
			}

			mv.setViewName("redirect:." + loginPagePath);
			mv.addObject("resultMsg", messageSource.getMessage("fail.login.msg", null, null, Locale.KOREA));
			return mv;
		}else{
			String id 				= String.valueOf(resultUser.get(0).get("BSAAUKey"));
			String mngno 			= String.valueOf(resultUser.get(0).get("BSAAUMngNo"));
			String successUserId 	= String.valueOf(resultUser.get(0).get("ComUserId"));
			String userNm 			= String.valueOf(resultUser.get(0).get("ComUserHnm"));

			if(successUserId.equals("rpa2")){
				int interval = 21600;
				session.setMaxInactiveInterval(interval);
			}

			session.setAttribute(CmmnConstants.SESSION_ID, id);
			session.setAttribute(CmmnConstants.SESSION_MNGNO, mngno);
			session.setAttribute(CmmnConstants.SESSION_USERID, successUserId);
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userNm);
			session.setAttribute(CmmnConstants.SESSION_GRADE, String.valueOf(resultUser.get(0).get("ComUserGrade")));
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, String.valueOf(resultUser.get(0).get("defaultDB")));
			session.setAttribute(CmmnConstants.SESSION_MAIL, String.valueOf(resultUser.get(0).get("ComUserCmail")));
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_CLIENT_IP, clientIpAddr);
			session.setAttribute(CmmnConstants.SESSION_DEPART, String.valueOf(resultUser.get(0).get("userParts")));

			// 접속성공로그
			CpsLogAccessVO cpsLogAccessVO = new CpsLogAccessVO();
			cpsLogAccessVO.setUserEmail(String.valueOf(resultUser.get(0).get("ComUserCmail")));
			cpsLogAccessVO.setServerIp(serverIpAddr);
			cpsLogAccessVO.setClientIp(clientIpAddr);
			cpsLogAccessVO.setAction("로그인성공");
			cpsLogAccessVO.setAddUserEmail(String.valueOf(resultUser.get(0).get("ComUserCmail")));
			cpsLogAccessVO.setAddUserName(userNm);
			cpsLogAccessVO.setAddDtm(currentDatetime);
			cpsLogAccessDao.save(cpsLogAccessVO);

			if(args.get("check").equals("1")){
				mv.setViewName("redirect:./edms/edmsMasterList1.sein");
				return mv;
			}else{
				mv.setViewName("redirect:./" + mainPagePath);
				return mv;
			}
		}
	}
}