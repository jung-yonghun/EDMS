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
@Table(name = "CPS_EDMS_Master", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsEdmsMasterVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "edmsKey")
	private BigDecimal edmsKey;

	@Column(name = "edmsGubun")
	@NotEmpty
	@Size(max = 10)
	private String edmsGubun;

	@Column(name = "edmsUploadType", updatable = false)
	@NotEmpty
	@Size(max = 50)
	private String edmsUploadType = "EDMS";

	@Column(name = "edmsComName")
	@NotEmpty
	@Size(max = 100)
	private String edmsComName;

	@Column(name = "edmsComCode")
	@NotEmpty
	@Size(max = 10)
	private String edmsComCode;

	@Column(name = "edmsComNum")
	@NotEmpty
	@Size(max = 20)
	private String edmsComNum;

	@Column(name = "edmsJisaCode")
	@Size(max = 20)
	private String edmsJisaCode;

	@Column(name = "edmsMkey")
	@Size(max = 30)
	private String edmsMkey;

	@Column(name = "edmsNum")
	@Size(max = 100)
	private String edmsNum;

	@Column(name = "edmsSingoNum")
	@Size(max = 20)
	private String edmsSingoNum;

	@Column(name = "checkYn")
	@NotEmpty
	@Size(min = 1, max = 1)
	private String checkYn;

	@Column(name = "useYn")
	@NotEmpty
	@Size(min = 1, max = 1)
	private String useYn;

	@Column(name = "addUserId", updatable = false)
	@NotEmpty
	@Size(max = 100)
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
	@Size(max = 100)
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
		this.editUserId 	= null;
		this.editUserName 	= null;
		this.editDtm 		= null;
	}
}