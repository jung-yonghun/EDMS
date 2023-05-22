package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_User_TeamXCustomer", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class UserTeamXCustomerVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "utc_seq")
  private BigDecimal utcSeq;

  @Column(name = "utc_name")
  @Size(max = 100)
  private String utcName;

  @Column(name = "ut_team_seq")
  @NotNull
  private BigDecimal utTeamSeq;

  @Column(name = "ut_team_code")
  @NotEmpty
  @Size(max = 50)
  private String utTeamCode;

  @Column(name = "ut_team_name")
  @NotEmpty
  @Size(max = 100)
  private String utTeamName;

  @Column(name = "utc_tradeKey")
  @NotNull
  private BigDecimal utcTradeKey;

  @Column(name = "utc_tradeCode")
  @NotEmpty
  @Size(max = 10)
  private String utcTradeCode;

  @Column(name = "utc_tradeDB")
  @NotEmpty
  @Size(max = 50)
  private String utcTradeDb;

  @Column(name = "utc_tradeName")
  @Size(max = 100)
  private String utcTradeName;

  @Column(name = "utc_EntrepreneurNo")
  @NotEmpty
  @Size(max = 10)
  private String utcEntrepreneurNo;

  @Column(name = "utc_useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String utcUseYn;

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
