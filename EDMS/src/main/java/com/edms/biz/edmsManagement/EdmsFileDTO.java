package com.edms.biz.edmsManagement;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

/**
 * The type Edms file dto.
 */
public class EdmsFileDTO {
  /**
   * The type Additional info.
   */
  @Data
  public static class additionalInfo {
	@NotNull
	private BigDecimal edmsFileKey;
	@Size(max = 500)
	private String edmsFileCategory;
	@Size(max = 250)
	private String edmsSearchKeyword;
	@Size(max = 500)
	private String edmsFileNote;
	@Size(max = 10)
	private String editUserId;
	@Temporal(TemporalType.TIMESTAMP)
	private Date editDate;
  }
}