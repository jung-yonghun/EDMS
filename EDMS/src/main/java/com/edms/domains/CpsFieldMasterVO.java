package com.edms.domains;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "SDAC100", schema = "dbo", catalog = "CPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsFieldMasterVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SDACKey")
	private BigDecimal SDACKey;

	@Column(name = "SDACMngNo")
	@NotEmpty
	@Size(max = 30)
	private String SDACMngNo;

	@Column(name = "SingoCode")
	@NotEmpty
	@Size(max = 20)
	private String SingoCode;

	@Column(name = "Gbn")
	@NotEmpty
	@Size(max = 10)
	private String Gbn;

	@Column(name = "ImexKey")
	@Size(max = 30)
	private String ImexKey;

	@Column(name = "SingoNo")
	@Size(max = 20)
	private String SingoNo;

	@Column(name = "FieldRequest")
	@Size(max = 1000)
	private String FieldRequest;

	@Column(name = "FieldGbn")
	@Size(max = 20)
	private String FieldGbn;

	@Column(name = "ComCd")
	@Size(max = 10)
	private String ComCd;

	@Column(name = "ComNm")
	@Size(max = 100)
	private String ComNm;

	@Column(name = "ComNo")
	@Size(max = 13)
	private String ComNo;

	@Column(name = "TeamKey")
	@Size(max = 20)
	private String TeamKey;

	@Column(name = "UseYn")
	@NotEmpty
	@Size(max = 1)
	private String UseYn;

	@Column(name = "AddUserId")
	@NotEmpty
	@Size(max = 50)
	private String AddUserId;

	@Column(name = "AddUserNm")
	@NotEmpty
	@Size(max = 30)
	private String AddUserNm;

	@Column(name = "AddDtm")
	@NotEmpty
	@Size(min = 14, max = 14)
	private String AddDtm;

	@Column(name = "EditUserId")
	@Size(max = 50)
	private String EditUserId;

	@Column(name = "EditUserNm")
	@Size(max = 30)
	private String EditUserNm;

	@Column(name = "EditDtm")
	@Size(min = 14, max = 14)
	private String EditDtm;

	@PreUpdate
	public void preUpdate() {
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		this.EditDtm = currentDatetime;
	}
}