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
@Table(name = "TBR_User_UserSavedCustomer", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class UserSavedCustomerVO {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "usc_seq")
  private BigDecimal uscSeq;

  @Column(name = "usc_group")
  @NotEmpty
  @Size(max = 10)
  private String uscGroup;

  @Column(name = "usc_tradeKey")
  private BigDecimal uscTradeKey;

  @Column(name = "usc_tradeDB")
  @Size(max = 50)
  private String uscTradeDb;

  @Column(name = "usc_userSeq")
  @NotNull
  private BigDecimal uscUserSeq;

  @Column(name = "usc_EntrepreneurNo")
  @NotEmpty
  @Size(max = 10)
  private String uscEntrepreneurNo;

  @Column(name = "usc_userId")
  @NotEmpty
  @Size(max = 10)
  private String uscUserId;

  @Column(name = "usc_tradeCode")
  @NotEmpty
  @Size(max = 10)
  private String uscTradeCode;

  @Column(name = "use_tradeName")
  @NotEmpty
  @Size(max = 100)
  private String useTradeName;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;
}