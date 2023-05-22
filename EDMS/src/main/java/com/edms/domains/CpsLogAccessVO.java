package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_LogAccess", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsLogAccessVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "logKey")
	private BigDecimal logKey;

	@Column(name = "userEmail")
	@NotEmpty
	private String userEmail;

	@Column(name = "serverIp")
	private String serverIp;

	@Column(name = "clientIp")
	private String clientIp;

	@Column(name = "action")
	private String action;

	@Column(name = "addUserEmail", updatable = false)
	@NotEmpty
	@Size(max = 100)
	private String addUserEmail = this.userEmail;

	@Column(name = "addUserName", updatable = false)
	@Size(max = 50)
	private String addUserName;

	@Column(name = "addDtm", updatable = false)
	@NotEmpty
	@Size(min = 14, max = 14)
	private String addDtm;
}