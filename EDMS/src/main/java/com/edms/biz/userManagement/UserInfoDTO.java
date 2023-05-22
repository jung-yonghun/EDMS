package com.edms.biz.userManagement;

import com.edms.commons.CmmnUtils;
import com.edms.domains.UserMenuAuthVO;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import java.math.BigDecimal;
import java.util.List;

public class UserInfoDTO {
  @Getter
  @Setter
  public static class getSecurityUserInfo {
	private BigDecimal userKey;
	private String userId;

	private String userNm;

	public String getUserNm() {
	  return CmmnUtils.encryptBase64("DEC", this.userNm, "UTF-8"); // 복호화
	}

	private String userPw;

	public String getUserPw() {
	  return CmmnUtils.encryptBase64("DEC", this.userPw, "UTF-8"); // 복호화
	}

	private String email;

	private String phoneNum;

	public String getPhoneNum() {
	  return CmmnUtils.encryptBase64("DEC", this.phoneNum, "UTF-8"); // 복호화
	}

	private String telNum;

	public String getTelNum() {
	  return CmmnUtils.encryptBase64("DEC", this.telNum, "UTF-8"); // 복호화
	}

	private String faxNum;
	private String userGrade;
	private String userType;
	private String userDepartment;
	private String userResponsibility;
	private String userLogo;
	private String note;
	private long envRowNum;
	private String pwChangedDate;
	private String useYn;
	private String addUserId;
	private String addUserNm;
	private String addDtm;
	private String editUserId;
	private String editUserNm;
	private String editDtm;

	@OneToMany(mappedBy = "userKey", fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<UserMenuAuthVO> userMenuAuthVOList;
  }

  @Getter
  @Setter
  public static class saveSecurityUserInfo {
	private BigDecimal userKey;
	private String userId;

	private String userNm;

	public void setUserNm(String userNm) {
	  this.userNm = CmmnUtils.encryptBase64("ENC", userNm, "UTF-8"); // 암호화
	}

	private String userPw;

	public void setUserPw(String userPw) {
	  this.userPw = CmmnUtils.encryptBase64("ENC", userPw, "UTF-8"); // 암호화
	}

	private String email;

	private String phoneNum;

	public void setPhoneNum(String phoneNum) {
	  this.userPw = CmmnUtils.encryptBase64("ENC", phoneNum, "UTF-8"); // 암호화
	}

	private String telNum;

	public void setTelNum(String telNum) {
	  this.userPw = CmmnUtils.encryptBase64("ENC", telNum, "UTF-8"); // 암호화
	}

	private String faxNum;
	private String userGrade;
	private String userType;
	private String userDepartment;
	private String userResponsibility;
	private String userLogo;
	private String note;
	private long envRowNum;
	private String pwChangedDate;
	private String useYn;
	private String addUserId;
	private String addUserNm;
	private String addDtm;
	private String editUserId;
	private String editUserNm;
	private String editDtm;

	@OneToMany(mappedBy = "userKey", fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<UserMenuAuthVO> userMenuAuthVOList;
  }
}