package com.edms.domains;

import com.edms.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_User_MenuAuth", schema = "dbo", catalog = "GEOWS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class UserMenuAuthVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "\"userMenuAuthKey\"")
  private BigDecimal userMenuAuthKey;

//  @Column(name = "\"userKey\"")
//  @NotNull
//  private BigDecimal userKey;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"userKey\"")
  @JsonBackReference
  private UserUserInfoVO userKey;

  @Column(name = "\"menuKey\"")
  @NotNull
  private BigDecimal menuKey;

  @Column(name = "\"menuCode\"")
  @NotEmpty
  @Size(max = 10)
  private String menuCode;

  @Column(name = "\"menuKorName\"")
  @NotEmpty
  @Size(max = 100)
  private String menuKorName;

  @Column(name = "\"menuEngName\"")
  @Size(max = 500)
  private String menuEngName;

  @Column(name = "\"eventCode\"")
  @NotEmpty
  @Size(max = 10)
  private String eventCode;

  @Column(name = "\"note\"")
  @Size(max = 500)
  private String note;

  @Column(name = "\"useYn\"")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "\"addUserId\"", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "\"addUserNm\"", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "\"addDtm\"", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "\"editUserId\"")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "\"editUserNm\"")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "\"editDtm\"")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }

}
