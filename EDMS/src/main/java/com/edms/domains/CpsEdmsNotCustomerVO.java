package com.edms.domains;

import java.math.BigDecimal;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "CPS_EDMS_NotCustomer", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsEdmsNotCustomerVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "notKey")
	private BigDecimal notKey;

	@Column(name = "sangho")
	@Size(max = 30)
	private String sangho;

	@Column(name = "saup")
	@Size(max = 10)
	private String saup;

	@Column(name = "useYn")
	@NotEmpty
	@Size(min = 1, max = 1)
	private String useYn;

	@Column(name = "addUserId", updatable = false)
	@NotEmpty
	@Size(max = 10)
	private String addUserId;

	@Column(name = "addUserName", updatable = false)
	@NotEmpty
	@Size(max = 50)
	private String addUserName;

	@Column(name = "addDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "editUserId")
	@Size(max = 10)
	private String editUserId;

	@Column(name = "editUserName")
	@Size(max = 50)
	private String editUserName;

	@Column(name = "editDtm")
	@Size(min = 14, max = 14)
	private String editDtm;

	@PreUpdate
	public void preUpdate(){
		this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	}

	@PrePersist
	public void prePersist(){
		this.editUserId = null;
		this.editUserName = null;
		this.editDtm 	= null;
	}
}