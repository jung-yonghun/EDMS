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
import java.util.Date;

@Entity
@Table(name = "TBR_EDMS_AttachFile", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class EdmsAttachFileVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "edmsFileKey")
  private BigDecimal edmsFileKey;

  @Column(name = "edmsParentGubun")
  @NotEmpty
  @Size(max = 10)
  private String edmsParentGubun;

  @Column(name = "edmsParentKey")
  @NotNull
  private BigDecimal edmsParentKey;

  @Column(name = "edmsFileCategory")
  @NotEmpty
  @Size(max = 500)
  private String edmsFileCategory;

  @Column(name = "edmsFileUploadType", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String edmsFileUploadType;

  @Column(name = "edmsServerGubun", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String edmsServerGubun;

  @Column(name = "edmsServerIp", updatable = false)
  @NotEmpty
  @Size(max = 100)
  private String edmsServerIp;

  @Column(name = "edmsFilePath", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String edmsFilePath;

  @Column(name = "edmsSaveFileName", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String edmsSaveFileName;

  @Column(name = "edmsOrgFileName", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String edmsOrgFileName;

  @Column(name = "edmsFileSize", updatable = false)
  @NotNull
  private BigDecimal edmsFileSize;

  @Column(name = "edmsFileExt", updatable = false)
  @Size(max = 100)
  private String edmsFileExt;

  @Column(name = "edmsFileStatus")
  @NotEmpty
  @Size(max = 10)
  private String edmsFileStatus;

  @Column(name = "edmsSearchKeyword")
  @Size(max = 250)
  private String edmsSearchKeyword;

  @Column(name = "edmsFileNote")
  @Size(max = 500)
  private String edmsFileNote;

  @Column(name = "addDay", updatable = false)
  @NotEmpty
  @Size(min = 8, max = 8)
  private String addDay;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "addUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDate = new Date();
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
