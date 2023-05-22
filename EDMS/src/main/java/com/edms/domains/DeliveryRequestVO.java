package com.edms.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.edms.commons.CmmnUtils;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "SDAB100", schema = "dbo", catalog = "CPS_WEB")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class DeliveryRequestVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SDAB100Key")
	private BigDecimal sDAB100Key;

	@Column(name = "CustomerDB")
	@Size(max = 50)
	private String customerDB;

	@Column(name = "CustomerCode")
	@Size(max = 10)
	private String customerCode;

	@Column(name = "CustomerNm")
	@Size(max = 100)
	private String customerNm;

	@Column(name = "CustomerTaxNo")
	@Size(max = 15)
	private String customerTaxNo;

	@Column(name = "MblNo")
	@Size(max = 20)
	private String mblNo;

	@Column(name = "HblNo")
	@Size(max = 20)
	private String hblNo;

	@Column(name = "CargoNo")
	@Size(max = 50)
	private String cargoNo;

	@Column(name = "SingoNo")
	@Size(max = 50)
	private String singoNo;

	@Column(name = "SingoDtm")
	@Size(max = 14)
	private String singoDtm;

	@Column(name = "SuriDtm")
	@Size(max = 14)
	private String suriDtm;

	@Column(name = "CargoStatus")
	@Size(max = 10)
	private String cargoStatus;

	@Column(name = "PojangSu")
	private BigDecimal pojangSu;

	@Column(name = "PojangDanwi")
	@Size(max = 2)
	private String pojangDanwi;

	@Column(name = "TotalJung")
	private BigDecimal totalJung;

	@Column(name = "JungDanwi")
	@Size(max = 10)
	private String jungDanwi;

	@Column(name = "ImpoSegwan")
	@Size(max = 3)
	private String impoSegwan;

	@Column(name = "ImpoJangchBuho")
	@Size(max = 8)
	private String impoJangchBuho;

	@Column(name = "ImpoJangchNm")
	@Size(max = 30)
	private String impoJangchNm;

	@Column(name = "ImpoJangchJangso")
	@Size(max = 20)
	private String impoJangchJangso;

	@Column(name = "DeliveryStatus")
	@Size(max = 10)
	private String deliveryStatus;

	@Column(name = "ImpoBanipDtm")
	@Size(max = 14)
	private String impoBanipDtm;

	@Column(name = "BanipPlace")
	@Size(max = 20)
	private String banipPlace;

	@Column(name = "CargoSize")
	@Size(max = 20)
	private String cargoSize;

	@Column(name = "DeliveryPojangSu")
	private BigDecimal deliveryPojangSu;

	@Column(name = "DeliveryPojangDanwi")
	@Size(max = 10)
	private String deliveryPojangDanwi;

	@Column(name = "DeliveryJung")
	private BigDecimal deliveryJung;

	@Column(name = "DeliveryJungDanwi")
	@Size(max = 10)
	private String deliveryJungDanwi;

	@Column(name = "RequestCoNm")
	@Size(max = 100)
	private String requestCoNm;

	@Column(name = "RequestMan")
	@Size(max = 50)
	private String requestMan;

	@Column(name = "RequestPhone")
	@Size(max = 50)
	private String requestPhone;

	@Column(name = "RequestDtm")
	@Size(max = 14)
	private String requestDtm;

	@Column(name = "RequestNote")
	@Size(max = 4000)
	private String requestNote;

	@Column(name = "RequestInvisibleNote")
	@Size(max = 4000)
	private String requestInvisibleNote;

	@Column(name = "DeliveryDtm")
	@Size(max = 14)
	private String deliveryDtm;

	@Column(name = "AssignId")
	@Size(max = 20)
	private String assignId;

	@Column(name = "AssignMan")
	@Size(max = 20)
	private String assignMan;

	@Column(name = "AssignPhone")
	@Size(max = 50)
	private String assignPhone;

	@Column(name = "AllocateRequestDtm")
	@Size(max = 14)
	private String allocateRequestDtm;

	@Column(name = "DeliveryCoMngNo")
	@Size(max = 30)
	private String deliveryCoMngNo;

	@Column(name = "DeliveryCoNm")
	@Size(max = 200)
	private String deliveryCoNm;

	@Column(name = "DeliveryCoPhone")
	@Size(max = 50)
	private String deliveryCoPhone;

	@Column(name = "DeliveryCoEmail")
	@Size(max = 200)
	private String DeliveryCoEmail;

	@Column(name = "DeliveryCarryingInKeyOld")
	private BigDecimal deliveryCarryingInKeyOld;

	@Column(name = "DeliveryCarryingInKey")
	private BigDecimal deliveryCarryingInKey;

	@Column(name = "DeliveryCarryingInNm")
	@Size(max = 200)
	private String deliveryCarryingInNm;

	@Column(name = "DeliveryCarryingInTaxNo")
	@Size(max = 50)
	private String deliveryCarryingInTaxNo;

	@Column(name = "DeliveryCarryingInPhone")
	@Size(max = 50)
	private String deliveryCarryingInPhone;

	@Column(name = "DeliveryCarryingInEmail")
	@Size(max = 200)
	private String deliveryCarryingInEmail;

	@Column(name = "DeliveryCarryingInEmailTax")
	@Size(max = 100)
	private String deliveryCarryingInEmailTax;

	@Column(name = "DeliveryCarryingInFax")
	@Size(max = 50)
	private String deliveryCarryingInFax;

	@Column(name = "DeliveryCarryingInMan")
	@Size(max = 50)
	private String deliveryCarryingInMan;

	@Column(name = "DeliveryCarryingInMobile")
	@Size(max = 50)
	private String deliveryCarryingInMobile;

	@Column(name = "DeliveryCarryingInAddr")
	@Size(max = 400)
	private String deliveryCarryingInAddr;

	@Column(name = "AllocateDtm")
	@Size(max = 14)
	private String allocateDtm;

	@Column(name = "DeliveryCarKey")
	private BigDecimal deliveryCarKey;

	@Column(name = "DeliveryCarNm")
	@Size(max = 50)
	private String deliveryCarNm;

	@Column(name = "DeliveryCarPhone")
	@Size(max = 50)
	private String deliveryCarPhone;

	@Column(name = "DeliveryCarNo")
	@Size(max = 50)
	private String deliveryCarNo;

	@Column(name = "DeliveryStDtm")
	@Size(max = 14)
	private String deliveryStDtm;

	@Column(name = "DeliveryEdDtm")
	@Size(max = 14)
	private String deliveryEdDtm;

	@Column(name = "Damage")
	@Size(max = 50)
	private String damage;

	@Column(name = "DamageDetail")
	@Size(max = 255)
	private String damageDetail;

	@Column(name = "LandingArea")
	@Size(max = 20)
	private String landingArea;

	@Column(name = "ArrivalTime")
	@Size(max = 50)
	private String arrivalTime;

	@Column(name = "TeamKey")
	@Size(max = 20)
	private String teamKey;

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