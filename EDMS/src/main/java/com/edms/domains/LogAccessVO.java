package com.edms.domains;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "TBR_Log_UserAccess", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class LogAccessVO {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "Log_Key")
  private BigDecimal logKey;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "addDay", updatable = false)
  @NotEmpty
  @Size(min = 8, max = 8)
  private String addDay;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "Log_Action")
  private String logAction;

  @Column(name = "Log_Args")
  @Length(max = 4000)
  private String logArgs;

  @Column(name = "Log_Client_Ip")
  private String logClientIp;

  @Column(name = "Log_Page")
  private String logPage;

  @Column(name = "Log_Server_Ip")
  private String logServerIp;

  @Column(name = "Log_UserId")
  private String logUserId;

  @Column(name = "Log_UserSeq")
  private BigDecimal logUserSeq;

  @PrePersist
  public void prePersist() {
	this.addDay = new SimpleDateFormat("yyyyMMdd").format(new Date());
  }
}