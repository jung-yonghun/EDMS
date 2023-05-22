package com.edms.web.userInfo;

import com.edms.biz.systemManagement.UserMenuAuthMapper;
import com.edms.biz.userManagement.UserInfoDao;
import com.edms.biz.userManagement.UserManagementService;
import com.edms.commons.CmmnConstants;
import com.edms.commons.CmmnController;
import com.edms.commons.CmmnUtils;
import com.edms.domains.CpsUserInfoVO;
import com.edms.domains.UserTeamXUserVO;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = {"/apis/userInfo"}, method = {RequestMethod.POST})
public class UserInfoController extends CmmnController {
  @Autowired
  private UserInfoDao userInfoDao;
  @Autowired
  private UserManagementService userManagementService;
  @Autowired
  private ModelMapper modelMapper;
  @Autowired
  private MessageSource messageSource;

  @Qualifier("SqlSessionTemplate")
  @Autowired
  private SqlSession sqlSession;

  @RequestMapping(value = "/getUserInfoList")
  public ResponseEntity<?> getUserInfoList(HttpServletRequest request, @RequestBody Map args) {
	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));

	  Page<CpsUserInfoVO> list = userManagementService.getUserInfoList(args, pageRequest);
	  List<?> result = list.getContent().stream()
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/saveUserInfo")
  public ResponseEntity<?> saveUserInfo(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  Map<String, Object> convertMap = CmmnUtils.convertMapSourceToMap(args, "userInfo");
	  CpsUserInfoVO vo = CmmnUtils.convertMapToBean(convertMap, CpsUserInfoVO.class);

	  CpsUserInfoVO userUserInfoVO = userInfoDao.findByUserIdAndUserNameAndUserEmail(vo.getUserId(), vo.getUserName(), vo.getUserEmail());
	  userUserInfoVO.setUserPw(CmmnUtils.encryptCustomBASE64(vo.getUserPw()));
	  sqlSession.getMapper(UserMenuAuthMapper.class).syncPassword(CmmnUtils.convertObjectToMap(userUserInfoVO));
	  return new ResponseEntity<>(userUserInfoVO, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getUserTeamInfoList")
  public ResponseEntity<?> getUserTeamInfoList(HttpServletRequest request, @RequestBody Map args) {
	  if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<UserTeamXUserVO> userTeamList = userManagementService.getUserTeamInfoList(args);

	  int rev = -1;// ll
	  List<?> result = userTeamList.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, userTeamList.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }
}