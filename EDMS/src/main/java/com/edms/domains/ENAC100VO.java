package com.edms.domains;

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
@Table(name = "ENAC100", schema = "dbo", catalog = "CPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ENAC100VO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ENACKey")
  private BigDecimal ENACKey;

  @Column(name = "FKey")
  @NotNull
  private BigDecimal FKey;

  @Column(name = "FKeyMngNo")
  @Size(max = 30)
  private String FKeyMngNo;

  @Column(name = "FTableNm")
  @Size(max = 30)
  private String FTableNm;

  @Column(name = "Gbn")
  @Size(max = 3)
  private String Gbn;

  @Column(name = "FileTitle")
  @Size(max = 100)
  private String FileTitle;

  @Column(name = "FileNm")
  @Size(max = 600)
  private String FileNm;

  @Column(name = "FilePath")
  @Size(max = 900)
  private String FilePath;

  @Column(name = "OriginFileNm")
  @Size(max = 600)
  private String OriginFileNm;

  @Column(name = "SaveFileNm")
  @Size(max = 600)
  private String SaveFileNm;

  @Column(name = "FileExt")
  @Size(max = 10)
  private String FileExt;

  @Column(name = "FileSize")
  @Size(max = 15)
  private String FileSize;

  @Column(name = "FileKeyWord")
  @Size(max = 500)
  private String FileKeyWord;

  @Column(name = "FileCategory")
  @Size(max = 10)
  private String FileCategory;

  @Column(name = "AddIp")
  @Size(max = 30)
  private String AddIp;

  @Column(name = "UseYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String UseYn;

  @Column(name = "AddUserKey", updatable = false)
  @NotEmpty
  @Size(max = 18)
  private String AddUserKey;

  @Column(name = "addUserId", updatable = false)
  @Size(max = 100)
  private String addUserId;

  @Column(name = "AddUserNm", updatable = false)
  @NotEmpty
  @Size(max = 30)
  private String AddUserNm;

  @Column(name = "AddDtm")
  @NotEmpty
  @Size(max = 14)
  private String AddDtm;

  @Column(name = "EditUserKey")
  @Size(max = 18)
  private String EditUserKey;

  @Column(name = "editUserId")
  @Size(max = 100)
  private String editUserId;

  @Column(name = "EditUserNm")
  @Size(max = 30)
  private String EditUserNm;

  @Column(name = "EditDtm")
  @Size(max = 14)
  private String EditDtm;
}