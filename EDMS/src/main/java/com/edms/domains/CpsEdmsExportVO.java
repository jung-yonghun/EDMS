package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_EDMS_Export", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsEdmsExportVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "exportKey")
	private BigDecimal exportKey;

	@Column(name = "expoKey")
	@NotEmpty
	@Size(max = 11)
	private String expoKey;

	@Column(name = "expoIvNo")
	@Size(max = 35)
	private String expoIvNo;

	@Column(name = "expoSingoNo")
	@Size(max = 15)
	private String expoSingoNo;

	@Column(name = "expoSangho")
	@Size(max = 28)
	private String expoSangho;

	@Column(name = "expoResResult")
	@Size(max = 4)
	private String expoResResult;

	@Column(name = "expoOkDate")
	@Size(max = 8)
	private String expoOkDate;

	@Column(name = "userId")
	@Size(max = 20)
	private String userId;

	@Column(name = "userNM")
	@Size(max = 20)
	private String userNM;

	@Column(name = "addDtTime")
	@Size(min = 14, max = 14)
	private String addDtTime;
}