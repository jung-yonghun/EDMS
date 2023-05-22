package com.edms.biz.edmsManagement;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class CpsEdmsFileDTO{
	@Data
	public static class additionalInfo {
		@NotNull
		private BigDecimal SDAAKey;
		@Size(max = 20)
		private String edmsFileCategory;
		@Size(max = 20)
		private String edmsSingoNo;
		@Size(max = 1)
		private String commonYn;
		@Size(max = 10)
		private String editUserId;
	}
}