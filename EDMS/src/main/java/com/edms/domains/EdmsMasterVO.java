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
@Table(name = "TBR_EDMS_Master", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class EdmsMasterVO {
 @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "edmsKey")
  private BigDecimal edmsKey;

  @Column(name = "edmsManagementNum", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 20)
  private String edmsManagementNum;

  @Column(name = "edmsGubun")
  @NotEmpty
  @Size(max = 10)
  private String edmsGubun;

  @Column(name = "edmsUploadType", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String edmsUploadType = "EDMS";

  @Column(name = "edmsComKey")
  @NotNull
  private BigDecimal edmsComKey;

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

  @Column(name = "edmsNum")
  @Size(max = 100)
  private String edmsNum; // 수입(HBL), 수출(INV)

  @Column(name = "edmsStatus")
  @Size(max = 10)
  private String edmsStatus;

  @Column(name = "addDay", updatable = false)
  @NotEmpty
  @Size(min = 8, max = 8)
  private String addDay;

  @Column(name = "editDay")
  @NotEmpty
  @Size(min = 8, max = 8)
  private String editDay;

  @Column(name = "iphangDay")
  @Size(max = 8)
  private String iphangDay;

  @Column(name = "banipDay")
  @Size(max = 8)
  private String banipDay;

  @Column(name = "singoDay")
  @Size(max = 8)
  private String singoDay;

  @Column(name = "suriDay")
  @Size(max = 8)
  private String suriDay;

  @Column(name = "banchulDay")
  @Size(max = 8)
  private String banchulDay;

  @Column(name = "jisaCode")
  @NotEmpty
  @Size(max = 20)
  private String jisaCode;

  @Column(name = "teamCode")
  @NotEmpty
  @Size(max = 8)
  private String teamCode;

  @Column(name = "singoNum")
  @Size(max = 50)
  private String singoNum;

  @Column(name = "divisionSingoYn")
  @NotEmpty
  @Size(max = 1)
  private String divisionSingoYn;

  @Column(name = "edmsMrn")
  @Size(max = 50)
  private String edmsMrn; // 수입(화물관리번호)

  @Column(name = "edmsMsn")
  @Size(max = 50)
  private String edmsMsn; // 수입(MBL)

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

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

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

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	this.editDate = new Date();
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserId = null;
	this.editUserName = null;
	this.editDate = null;
	this.editDtm = null;
  }
}