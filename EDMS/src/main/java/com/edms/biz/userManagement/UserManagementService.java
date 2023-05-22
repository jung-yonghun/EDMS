package com.edms.biz.userManagement;

import com.edms.commons.CmmnMailService;
import com.edms.commons.CmmnSpecs;
import com.edms.commons.CmmnUtils;
import com.edms.domains.CpsUserInfoVO;
import com.edms.domains.UserTeamXUserVO;

import org.apache.ibatis.session.SqlSession;
import org.apache.commons.lang3.math.NumberUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.util.*;

@Service
public class UserManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;
	@Qualifier("teamXUserDao")
	@Autowired
	private TeamXUserDao teamXUserDao;

	public Page<CpsUserInfoVO> getUserInfoList(Map args, Pageable pageable) throws Exception{
		Specifications spec = getUserInfoSpecs(args);
		return userInfoDao.findAll(spec, pageable);
	}

	private Specifications getUserInfoSpecs(Map args){
		BigDecimal userKey = CmmnUtils.isContainsMapValue(args, "userKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))) : null;
		String userId 	= args.containsKey("userId") ? String.valueOf(args.get("userId")) : null;
		String useYn 	= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if(!CmmnUtils.isNull(userKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(userKey, "userKey"));
		if(!CmmnUtils.isNull(userId)) spec = spec.and(CmmnSpecs.eqStringSpec(userId, "userId"));

		return spec;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsUserInfoVO saveUserInfo(CpsUserInfoVO vo, HttpServletRequest request) throws Exception{
		CpsUserInfoVO userUserInfoVO = userInfoDao.findByUserIdAndUserNameAndUserEmail(vo.getUserId(), vo.getUserName(), vo.getUserEmail());
		userUserInfoVO.setUserPw(vo.getUserPw());
		CpsUserInfoVO returnVO = userInfoDao.save(userUserInfoVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsUserInfoVO getByUserIdAndUserNameAndUserEmail(String userId, String userNm, String email) throws Exception{
		CpsUserInfoVO userUserInfoVO = userInfoDao.findByUserIdAndUserNameAndUserEmail(userId, userNm, email);
		if(!CmmnUtils.isNull(userUserInfoVO)){
			StringBuffer newPasswd = new StringBuffer("1111");
			userUserInfoVO.setUserPw(new String(newPasswd));
			if(!CmmnUtils.isNull(userInfoDao.save(userUserInfoVO))){
			}
		}

		return userUserInfoVO;
	}

	public List<UserTeamXUserVO> getUserTeamInfoList(Map args) throws Exception{
		BigDecimal utSeq 	= CmmnUtils.isContainsMapValue(args, "utSeq") ? NumberUtils.createBigDecimal(String.valueOf(args.get("utSeq"))) : null;
		String utName 		= args.containsKey("utName") ? String.valueOf(args.get("utName")) : null;
		BigDecimal teamSeq 	= CmmnUtils.isContainsMapValue(args, "teamSeq") ? NumberUtils.createBigDecimal(String.valueOf(args.get("teamSeq"))) : null;
		String teamCode 	= args.containsKey("teamCode") ? String.valueOf(args.get("teamCode")) : null;
		String teamName 	= args.containsKey("teamName") ? String.valueOf(args.get("teamName")) : null;
		BigDecimal urSeq 	= CmmnUtils.isContainsMapValue(args, "urSeq") ? NumberUtils.createBigDecimal(String.valueOf(args.get("urSeq"))) : null;
		String urUserId 	= args.containsKey("urUserId") ? String.valueOf(args.get("urUserId")) : null;
		String utUseYn 		= args.containsKey("utUseYn") ? String.valueOf(args.get("utUseYn")) : "";
		List<String> teamCodeList = new ArrayList<>();
		if(!CmmnUtils.isNull(teamCode)){
			List<String> stringList = new ArrayList<>(Arrays.asList(teamCode.split(",")));
			for(String str : stringList){
				teamCodeList.add(str);
			}
		}

		//검색조건(필수:utUseYn)
		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(utUseYn, "utUseYn"));

		if(!CmmnUtils.isNull(utSeq)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(utSeq, "utSeq"));
		if(!CmmnUtils.isNull(utName)) 	spec = spec.and(CmmnSpecs.eqStringSpec(utName, "utName"));
		if(!CmmnUtils.isNull(teamSeq)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(teamSeq, "teamSeq"));
		if(!CmmnUtils.isNull(teamCode)) spec = spec.and(CmmnSpecs.inStringListSpec(teamCodeList, "teamCode"));
		if(!CmmnUtils.isNull(teamName)) spec = spec.and(CmmnSpecs.eqStringSpec(teamName, "teamName"));
		if(!CmmnUtils.isNull(urSeq)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(urSeq, "urSeq"));
		if(!CmmnUtils.isNull(urUserId)) spec = spec.and(CmmnSpecs.eqStringSpec(urUserId, "urUserId"));

		return teamXUserDao.findAll(spec);
	}
}