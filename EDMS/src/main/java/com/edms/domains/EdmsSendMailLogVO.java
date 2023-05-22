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
@Table(name = "TBR_EDMS_SendMailLog", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class EdmsSendMailLogVO {
 @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "edmsSendMailKey")
  private BigDecimal edmsSendMailKey;

  @Column(name = "sender")
  @NotEmpty
  @Size(max = 100)
  private String sender;

  @Column(name = "userName")
  @NotEmpty
  @Size(max = 50)
  private String userName;

  @Column(name = "receiver")
  @NotEmpty
  @Size(max = 100)
  private String receiver;

  @Column(name = "mailTitle")
  @NotEmpty
  @Size(max = 255)
  private String mailTitle;

  @Column(name = "mailContent", columnDefinition = "TEXT")
  @NotEmpty
  @Lob
  private String mailContent;

  @Column(name = "fileName")
  @Size(max = 255)
  private String fileName;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @PreUpdate
  public void preUpdate() {
  }

  @PrePersist
  public void prePersist() {
  }
}