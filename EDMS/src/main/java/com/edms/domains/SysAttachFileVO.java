package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "TBR_SYS_AttachFile", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class SysAttachFileVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "File_Key")
  private BigDecimal fileKey;

  @Column(name = "Notice_Key")
  @NotNull
  private BigDecimal noticeKey;

  @Column(name = "Server_Gubun", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String serverGubun;

  @Column(name = "Server_Ip", updatable = false)
  @NotEmpty
  @Size(max = 100)
  private String serverIp;

  @Column(name = "File_Path", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String filePath;

  @Column(name = "Save_File_Name", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String saveFileName;

  @Column(name = "Original_File_Name", updatable = false)
  @NotEmpty
  @Size(max = 1000)
  private String originalFileName;

  @Column(name = "File_Size", updatable = false)
  @NotNull
  private BigDecimal fileSize;

  @Column(name = "File_Ext", updatable = false)
  @Size(max = 100)
  private String fileExt;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDate = new Date();
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
  }
}
