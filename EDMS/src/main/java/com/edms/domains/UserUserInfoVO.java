package com.edms.domains;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "TBR_User_UserInfo", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class UserUserInfoVO extends CmmnExternalClass {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private BigDecimal id;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "defaultDB")
  @Size(max = 500)
  private String defaultDB;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "email")
  @Email
  @Size(max = 100)
  private String email;

  @Column(name = "eMaillingYN")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String eMaillingYN = "Y";

  @Column(name = "phone")
  @Size(max = 30)
  private String phone;

  @Column(name = "TermOfValidityBegin")
  @Size(max = 8)
  private String termOfValidityBegin;

  @Column(name = "TermOfValidityEnd")
  @Size(max = 8)
  private String termOfValidityEnd;

  @Basic(optional = false)
  @Column(name = "userApprovalDateTime")
  @Temporal(TemporalType.TIMESTAMP)
  private Date userApprovalDateTime;

  @Column(name = "userApprovalUser")
  @Size(max = 10)
  private String userApprovalUser;

  @Column(name = "userApprovalYN")
  @Size(min = 1, max = 1)
  private String userApprovalYN = "N";

  @Column(name = "userDepartment1")
  @Size(max = 30)
  private String userDepartment1;

  @Column(name = "userDepartment2")
  @Size(max = 30)
  private String userDepartment2;

  @Column(name = "userEntrepreneurNo")
  @NotEmpty
  @Size(min = 10, max = 10)
  private String userEntrepreneurNo;

  @Column(name = "userFax")
  @Size(max = 30)
  private String userFax;

  @Column(name = "userForwarderCode")
  @Size(max = 4)
  private String userForwarderCode;

  @Column(name = "userGradeA")
  @NotEmpty
  @Size(max = 10)
  private String userGradeA;

  @Column(name = "userGradeB")
  @Size(max = 10)
  private String userGradeB;

  @Column(name = "userId", updatable = false, unique = true)
  @NotEmpty
  @Size(max = 10)
  private String userId;

  @Column(name = "userMessageYN")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String userMessageYN = "Y";

  @Column(name = "userMobilePhone")
  @Size(max = 30)
  private String userMobilePhone;

  @Column(name = "userNm")
  @NotEmpty
  @Size(max = 50)
  private String userNm;

  @Column(name = "userNote", columnDefinition = "TEXT")
  @Lob
  private String userNote;

  @Column(name = "userPw")
  @NotEmpty
  @Size(max = 1000)
  private String userPw;

  @Column(name = "userPwChangedDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date userPwChangedDate;

  @Column(name = "userResponsibility1")
  @Size(max = 30)
  private String userResponsibility1;

  @Column(name = "userResponsibility2")
  @Size(max = 30)
  private String userResponsibility2;

  @Column(name = "userSNSID")
  @Size(max = 30)
  private String userSNSID;

  @Column(name = "userSNSType")
  @Size(max = 30)
  private String userSNSType;

  @Column(name = "userTradeName")
  @NotEmpty
  @Size(max = 40)
  private String userTradeName;

  @Column(name = "userType")
  @Size(max = 10)
  private String userType;

  @Column(name = "userLogo")
  @Size(max = 500)
  private String userLogo;

  @Column(name = "apiKey")
  @Size(max = 500)
  private String apiKey;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  /**
   * Pre update.
   */
  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDate = new Date();
	this.apiKey = CmmnUtils.encryptCustomBASE64(this.apiKey);
	// 패스워드 관련 처리
	convertUserPassword();
	// 승인일시 관련 처리
	//convertUserApprovalDate();
  }

  /**
   * Pre persist.
   */
  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.apiKey = CmmnUtils.encryptCustomBASE64(this.apiKey);
	// 패스워드 관련 처리
	convertUserPassword();
	// 승인일시 관련 처리
	//convertUserApprovalDate();
  }

  private void convertUserPassword() {
	// 패스워드
	this.userPw = CmmnUtils.encryptCustomBASE64(this.userPw);
	// 패스워드수정일시
	this.userPwChangedDate = new Date();
  }

  private void convertUserApprovalDate() {
	// 승인(Y)시 승인일시 수정
	if ("Y".equals(this.userApprovalYN)) {
	  this.userApprovalDateTime = new Date();
	} else {
	  this.userApprovalDateTime = null;
	  this.userApprovalUser = null;
	}
  }
}
