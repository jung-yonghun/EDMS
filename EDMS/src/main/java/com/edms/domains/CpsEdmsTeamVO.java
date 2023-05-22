package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_EDMS_Team", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsEdmsTeamVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "teamKey")
	private BigDecimal teamKey;

	@Column(name = "defaultDB")
	@NotEmpty
	@Size(max = 20)
	private String defaultDB;

	@Column(name = "masterKey")
	@NotEmpty
	@Size(max = 20)
	private String masterKey;

	@Column(name = "userId")
	@Size(max = 20)
	private String userId;

	@Column(name = "teamCode")
	@Size(max = 10)
	private String teamCode;

	@Column(name = "addDtTime")
	@Size(min = 14, max = 14)
	private String addDtTime;
}