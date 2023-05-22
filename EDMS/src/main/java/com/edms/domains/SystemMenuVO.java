package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the TBR_SYS_MENU database table.
 */
@Entity
@Table(name = "TBR_SYS_MENU", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SystemMenuVO implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "ID")
  private BigDecimal id;

  @Basic(optional = false)
  @Column(name = "addDate", insertable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date addDate;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "editDate")
  @Temporal(TemporalType.TIMESTAMP)
  private Date editDate;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "menuImageClass")
  @Size(max = 100)
  private String menuImageClass;

  @Column(name = "menuEngName")
  @Size(max = 500)
  private String menuEngName;

  @Column(name = "menuName")
  @NotEmpty
  @Size(max = 100)
  private String menuName;

  @Column(name = "menuPath")
  @Size(max = 500)
  private String menuPath;

  @Column(name = "parentID")
  @NotNull
  private BigDecimal parentId;

  @Column(name = "sortOrder", columnDefinition = "int default 0")
  @NotEmpty
  private int sortOrder;

  @Column(name = "subSortOrder", columnDefinition = "int default 0")
  private int subSortOrder;

  @Column(name = "useYN")
  @NotEmpty
  @Size(max = 1)
  private String useYn = "Y";

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