package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.edms.commons.CmmnUtils;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "SDAB120", schema = "dbo", catalog = "CPS_WEB")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DeliveryCarryingInVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SDAB120Key")
	private BigDecimal sDAB120Key;

	@Column(name = "DeliveryCarryingInNm")
	@Size(max = 200)
	private String deliveryCarryingInNm;

	@Column(name = "DeliveryCarryingInTaxNum")
	@Size(max = 50)
	private String deliveryCarryingInTaxNum;

	@Column(name = "DeliveryCarryingInPhone")
	@Size(max = 50)
	private String deliveryCarryingInPhone;

	@Column(name = "DeliveryCarryingInFax")
	@Size(max = 50)
	private String deliveryCarryingInFax;

	@Column(name = "DeliveryCarryingInMan")
	@Size(max = 50)
	private String deliveryCarryingInMan;

	@Column(name = "DeliveryCarryingInMobile")
	@Size(max = 50)
	private String deliveryCarryingInMobile;

	@Column(name = "DeliveryCarryingInEmail")
	@Size(max = 400)
	private String deliveryCarryingInEmail;

	@Column(name = "DeliveryCarryingInAddr")
	@Size(max = 400)
	private String deliveryCarryingInAddr;

	@Column(name = "UseYn")
	@Size(max = 1)
	private String useYn;

	@Column(name = "AddUserMng")
	@Size(max = 30)
	private String addUserMng;

	@Column(name = "AddUserId")
	@Size(max = 100)
	private String addUserId;

	@Column(name = "AddUserNm")
	@Size(max = 30)
	private String addUserNm;

	@Column(name = "AddDtm")
	@Size(max = 14)
	private String addDtm;

	@Column(name = "EditUserMng")
	@Size(max = 30)
	private String editUserMng;

	@Column(name = "EditUserId")
	@Size(max = 100)
	private String editUserId;

	@Column(name = "EditUserNm")
	@Size(max = 30)
	private String editUserNm;

	@Column(name = "EditDtm")
	@Size(max = 14)
	private String editDtm;
}
