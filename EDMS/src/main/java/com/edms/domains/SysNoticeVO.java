package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_SYS_Notices", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class SysNoticeVO implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "notices_key")
  private BigDecimal noticesKey;

  @Basic(optional = false)
  @Column(name = "addDate", updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "category")
  @NotEmpty
  @Size(max = 10)
  private String category;

  @Column(name = "contents", columnDefinition = "TEXT")
  @Lob
  private String contents;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "file_attached_Yn")
  @Size(max = 1)
  private String fileAttachedYn;

  @Column(name = "finished_day")
  @Size(max = 8)
  private String finishedDay;

  @Column(name = "inquiry_count")
  private int inquiryCount;

  @Column(name = "keyword")
  @Size(max = 120)
  private String keyword;

  @Column(name = "noticesYn")
  @Size(max = 1)
  private String noticesYn;

  @Column(name = "subject")
  @Size(max = 120)
  private String subject;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDate = new Date();
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.editUserNm = null;
	this.editDate = null;
  }
}