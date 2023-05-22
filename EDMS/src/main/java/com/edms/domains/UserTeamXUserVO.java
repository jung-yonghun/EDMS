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
@Table(name = "TBR_User_TeamXUser", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class UserTeamXUserVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ut_seq")
  private BigDecimal utSeq;

  @Column(name = "ut_name")
  @Size(max = 100)
  private String utName;

  @Column(name = "team_seq")
  @NotNull
  private BigDecimal teamSeq;

  @Column(name = "team_code")
  @NotEmpty
  @Size(max = 50)
  private String teamCode;

  @Column(name = "team_name")
  @NotEmpty
  @Size(max = 100)
  private String teamName;

  @Column(name = "ur_seq")
  @NotNull
  private BigDecimal urSeq;

  @Column(name = "ur_userId")
  @NotEmpty
  @Size(max = 10)
  private String urUserId;

  @Column(name = "ut_useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String utUseYn;

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
