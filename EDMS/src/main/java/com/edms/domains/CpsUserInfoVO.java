package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.edms.commons.CmmnUtils;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_UserInfo", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter

public class CpsUserInfoVO extends CmmnExternalClass {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userKey")
	private BigDecimal userKey;

	@Column(name = "userEmail")
	@NotEmpty
	@Email
	@Size(max = 100)
	private String userEmail;

	@Column(name = "userId")
	@Size(max = 100)
	private String userId;

	@Column(name = "userPw")
	@NotEmpty
	@Size(max = 1000)
	private String userPw;

	@Column(name = "userName")
	@NotEmpty
	@Size(max = 50)
	private String userName;

	@Column(name = "userGradeA")
	@NotEmpty
	@Size(max = 5)
	private String userGradeA;

	@Column(name = "userGradeB")
	@Size(max = 5)
	private String userGradeB;

	@Column(name = "userSangho")
	@NotEmpty
	@Size(max = 50)
	private String userSangho;

	@Column(name = "userSaup")
	@NotEmpty
	@Size(max = 10)
	private String userSaup;

	@Column(name = "userPhone")
	@Size(max = 30)
	private String userPhone;

	@Column(name = "userMobile")
	@Size(max = 30)
	private String userMobile;

	@Column(name = "userFax")
	@Size(max = 30)
	private String userFax;

	@Column(name = "userDepart")
	@Size(max = 30)
	private String userDepart;

	@Column(name = "userJikchk")
	@Size(max = 30)
	private String userJikchk;

	@Column(name = "userAppYN")
	@Size(min = 1, max = 1)
	private String userAppYN = "N";

	@Column(name = "userAppDtm")
	@Size(min = 14, max = 14)
	private String userAppDtm;

	@Column(name = "userAppUser")
	@Size(max = 10)
	private String userAppUser;

	@Column(name = "userLogo")
	@Size(max = 50)
	private String userLogo;

	@Column(name = "defaultDB")
	@Size(max = 30)
	private String defaultDB;

	@Column(name = "userNote")
	@Size(max = 50)
	private String userNote;

	@Column(name = "setSangho")
	@Size(max = 50)
	private String setSangho;

	@Column(name = "setSaup")
	@Size(max = 10)
	private String setSaup;

	@Column(name = "setMenu")
	@Size(max = 1)
	private String setMenu;

	@Column(name = "apiKey")
	@Size(max = 500)
	private String apiKey;

	@Column(name = "changePwYn")
	@Size(max = 1)
	private String changePwYn;

	@Column(name = "changePwDtm")
	@Size(max = 8)
	private String changePwDtm;

	@Column(name = "doubleChkYn")
	@Size(max = 1)
	private String doubleChkYn;

	@Column(name = "useYn")
	@NotEmpty
	@Size(max = 1)
	private String useYn;

	@Column(name = "editUserKey")
	@Size(max = 18)
	private String editUserKey;

	@Column(name = "editDtm")
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate() {
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		this.editDtm = currentDatetime;
	}
}
