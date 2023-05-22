package com.edms.domains;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "SDAA100", schema = "dbo", catalog = "CPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsEdmsAttachFileVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SDAAKey")
	private BigDecimal sDAAKey;

	@Column(name = "EdmsParentGbn")
	@NotEmpty
	@Size(max = 10)
	private String edmsParentGbn;

	@Column(name = "EdmsJisaCode")
	@Size(max = 20)
	private String edmsJisaCode;

	@Column(name = "EdmsSaup")
	@Size(max = 15)
	private String edmsSaup;

	@Column(name = "EdmsMasterKey")
	@Size(max = 50)
	private String edmsMasterKey;

	@Column(name = "EdmsMkey")
	@Size(max = 50)
	private String edmsMkey;

	@Column(name = "EdmsNo")
	@Size(max = 100)
	private String edmsNo;

	@Column(name = "EdmsSingoNo")
	@Size(max = 20)
	private String edmsSingoNo;

	@Column(name = "CommonYn")
	@Size(min = 1, max = 1)
	private String commonYn;

	@Column(name = "EdmsFileCategory")
	@NotEmpty
	@Size(max = 20)
	private String edmsFileCategory;

	@Column(name = "EdmsFileUploadType", updatable = false)
	@Size(max = 50)
	private String edmsFileUploadType;

	@Column(name = "EdmsFilePath", updatable = false)
	@NotEmpty
	@Size(max = 1000)
	private String edmsFilePath;

	@Column(name = "EdmsSaveFileNm", updatable = false)
	@NotEmpty
	@Size(max = 200)
	private String edmsSaveFileNm;

	@Column(name = "EdmsOrgFileNm", updatable = false)
	@NotEmpty
	@Size(max = 300)
	private String edmsOrgFileNm;

	@Column(name = "EdmsFileSize", updatable = false)
	@NotNull
	private BigDecimal edmsFileSize;

	@Column(name = "EdmsFileExt", updatable = false)
	@Size(max = 10)
	private String edmsFileExt;

	@Column(name = "EdmsFileStatus")
	@NotEmpty
	@Size(max = 10)
	private String edmsFileStatus;

	@Column(name = "UseYn")
	@NotEmpty
	@Size(min = 1, max = 1)
	private String useYn;

	@Column(name = "AddUserKey", updatable = false)
	@NotEmpty
	@Size(max = 18)
	private String addUserKey;

	@Column(name = "AddUserId", updatable = false)
	@NotEmpty
	@Size(max = 30)
	private String addUserId;

	@Column(name = "AddUserNm", updatable = false)
	@NotEmpty
	@Size(max = 30)
	private String addUserNm;

	@Column(name = "AddDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;

	@Column(name = "EditUserKey")
	@Size(max = 18)
	private String editUserKey;

	@Column(name = "EditUserId")
	@Size(max = 30)
	private String editUserId;

	@Column(name = "EditUserNm")
	@Size(max = 30)
	private String editUserNm;

	@Column(name = "EditDtm")
	@Size(min = 14, max = 14)
	private String editDtm;

	@Column(name = "SendCount", updatable = false)
	private BigDecimal sendCount;


	@PreUpdate
	public void preUpdate(){
		this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	}

	@PrePersist
	public void prePersist(){
		this.editUserId = null;
		this.editUserNm = null;
		this.editDtm 	= null;
	}
}