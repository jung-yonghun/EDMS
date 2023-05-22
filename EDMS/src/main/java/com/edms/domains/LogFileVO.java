package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * The persistent class for the TBR_Log_File database table.
 */
@Entity
@Table(name = "TBR_Log_File", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class LogFileVO implements Serializable {
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
  @Size(max = 8)
  @NotEmpty
  private String addDay;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "file_action")
  private String fileAction;

  @Column(name = "file_Client_Ip")
  private String fileClientIp;

  @Column(name = "file_doc_group")
  private String fileDocGroup;

  @Column(name = "file_IP_Addr")
  private String fileIpAddr;

  @Column(name = "file_key")
  private BigDecimal fileKey;

  @Column(name = "file_name")
  @Length(max = 4000)
  private String fileName;

  @Column(name = "file_parent_id")
  @Length(max = 4000)
  private String fileParentId;

  @Column(name = "file_parent_type")
  private String fileParentType;

  @Column(name = "file_path", columnDefinition = "TEXT")
  @Length(max = 4000)
  private String filePath;

  @Column(name = "file_Server_Ip")
  private String fileServerIp;

  @Column(name = "file_Server_Gubun")
  private String fileServerGubun;

  @PrePersist
  public void prePersist() {
	this.addDay = new SimpleDateFormat("yyyyMMdd").format(new Date());
  }
}