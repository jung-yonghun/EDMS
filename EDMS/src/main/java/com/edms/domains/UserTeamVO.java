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
@Table(name = "TBR_User_Team", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class UserTeamVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "team_seq")
  private BigDecimal teamSeq;

  @Column(name = "team_code")
  @NotEmpty
  @Size(max = 10)
  private String teamCode;

  @Column(name = "team_name")
  @NotEmpty
  @Size(max = 100)
  private String teamName;

  @Column(name = "team_parentId")
  @NotNull
  private BigDecimal teamParentId;

  @Column(name = "team_order")
  @NotNull
  private Integer teamOrder;

  @Column(name = "team_useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String teamUseYn;

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
