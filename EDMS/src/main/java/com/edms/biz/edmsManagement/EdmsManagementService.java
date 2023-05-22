package com.edms.biz.edmsManagement;

import com.edms.commons.CmmnConstants;
import com.edms.commons.CmmnSpecs;
import com.edms.commons.CmmnUtils;
import com.edms.commons.CmmnMailService;
import com.edms.domains.CpsEdmsAttachFileVO;
import com.edms.domains.CpsEdmsMasterVO;
import com.edms.domains.CpsEdmsExportVO;
import com.edms.domains.CpsEdmsTeamVO;
import com.edms.domains.CpsEdmsNotCustomerVO;
import com.edms.domains.CpsFieldMasterVO;
import com.edms.domains.UserTeamXCustomerVO;
import com.edms.domains.DeliveryCarryingInVO;
import com.edms.domains.DeliveryRequestVO;
import com.edms.domains.SysNoticeVO;
import com.edms.domains.SysAttachFileVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.validator.routines.EmailValidator;
import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;

import java.math.BigDecimal;
import java.util.*;

@Service
public class EdmsManagementService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private CpsEdmsMasterDao cpsEdmsMasterDao;
	@Autowired
	private CpsEdmsFileDao cpsEdmsFileDao;
	@Autowired
	private CpsEdmsExportDao cpsEdmsExportDao;
	@Autowired
	private CpsEdmsTeamDao cpsEdmsTeamDao;
	@Autowired
	private CpsEdmsNotCustomerDao cpsEdmsNotCustomerDao;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private EdmsManagementMapper edmsManagementMapper;
	@Qualifier("userTeamCustomerDao")
	@Autowired
	private UserTeamCustomerDao userTeamCustomerDao;
	@Autowired
	private ImportDeliveryCarryingInDao importDeliveryCarryingInDao;
	@Autowired
	private ImportDeliveryRequestDao importDeliveryRequestDao;
	@Autowired
	private SysNoticeDao sysNoticeDao;
	@Autowired
	private SysAttachFileDao sysAttachFileDao;
	@Autowired
	private CpsFieldMasterDao cpsFieldMasterDao;


	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;


	@Value("${geows.main.taxNum}")
	public String geowsTaxNum;

	public List<SysNoticeVO> getSysNoticeList(Map args, Pageable pageable) throws Exception{
//		if(args.containsKey("noticesKey")){
//			SysNoticeVO sysNoticeVO = sysNoticeDao.getOne(NumberUtils.createBigDecimal(String.valueOf(args.get("noticesKey"))));
//			sysNoticeVO.setInquiryCount(sysNoticeVO.getInquiryCount() + 1);
//			sysNoticeDao.save(sysNoticeVO);
//	    }
		Specifications spec = getSysNoticeSpecs(args);
		return sysNoticeDao.findAll(spec, pageable);
	}

	private Specifications getSysNoticeSpecs(Map args){
		BigDecimal noticesKey 	= CmmnUtils.isContainsMapValue(args, "noticesKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("noticesKey"))) : null;
		String category 		= args.containsKey("category") ? String.valueOf(args.get("category")) : null;
		String subject 			= args.containsKey("subject") ? String.valueOf(args.get("subject")) : null;
		String _dateType 		= args.containsKey("_dateType") ? String.valueOf(args.get("_dateType")) : null;
		String startDay 		= args.containsKey("startDay") ? String.valueOf(args.get("startDay")) : "11111111";
		String endDay 			= args.containsKey("endDay") ? String.valueOf(args.get("endDay")) : "99991231";
		String keyword 			= args.containsKey("keyword") ? String.valueOf(args.get("keyword")) : "";
		String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if(!CmmnUtils.isNull(noticesKey)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(noticesKey, "noticesKey"));
		if(!CmmnUtils.isNull(category)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(category, "category"));
		if(!CmmnUtils.isNull(subject)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(subject, "subject"));
		if(!CmmnUtils.isNull(_dateType) && !CmmnUtils.isNull(startDay) && !CmmnUtils.isNull(endDay)){
			spec = spec.and(CmmnSpecs.betweenObjectSpec(startDay, endDay, _dateType));
		}
		if(!CmmnUtils.isNull(keyword)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(keyword, "keyword"));

		return spec;
	}

	public List<SysAttachFileVO> getSysFileList(Map args, Pageable pageable) throws Exception{
		BigDecimal noticeKey = CmmnUtils.isContainsMapValue(args, "noticeKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("noticeKey"))) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(noticeKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(noticeKey, "noticeKey"));
		return sysAttachFileDao.findAll(spec, pageable);
	}











	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsMasterVO saveEdmsMasterForFileUpload(CpsEdmsMasterVO CpsEdmsMasterVO, HttpServletRequest request) throws Exception {
		CpsEdmsMasterVO saveVO 	= modelMapper.map(CpsEdmsMasterVO, CpsEdmsMasterVO.class);
		String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String edmsGubun 		= CpsEdmsMasterVO.getEdmsGubun();
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		CpsEdmsMasterVO isCpsEdmsMasterVO = null;

		switch (edmsGubun) {
			case "IMPORT":
			case "EXPORT":
			case "HWANGUP":
			case "SEINETC":
				isCpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsKey(CpsEdmsMasterVO.getEdmsKey());
				break;
			default:
				isCpsEdmsMasterVO = cpsEdmsMasterDao.findByEdmsGubunAndEdmsComCodeAndUseYn(CpsEdmsMasterVO.getEdmsGubun(), CpsEdmsMasterVO.getEdmsComCode(), "Y");
				break;
		}

		if(!CmmnUtils.isNull(isCpsEdmsMasterVO)){
			saveVO = modelMapper.map(isCpsEdmsMasterVO, CpsEdmsMasterVO.class);
			if(CmmnUtils.isNull(CpsEdmsMasterVO.getEdmsNum()) || CpsEdmsMasterVO.getEdmsNum().equals("")){
				saveVO.setEdmsNum("");
			}
			saveVO.setEditUserId(userId);
			saveVO.setEditUserName(userName);
			saveVO.setEditDtm(currentDatetime);
			if(edmsGubun.equals("IMPORT")){
				saveVO = getEdmsMasterByImport(saveVO);
			}else if(edmsGubun.equals("EXPORT")){
				saveVO = getEdmsMasterByExport(saveVO);
			}
		}
		CpsEdmsMasterVO returnVO = cpsEdmsMasterDao.save(saveVO);

		return returnVO;
	}

	public CpsEdmsMasterVO getEdmsMasterByImport(CpsEdmsMasterVO CpsEdmsMasterVO){
		String edmsComCode 	= CpsEdmsMasterVO.getEdmsComCode();
		String edmsComNum 	= CpsEdmsMasterVO.getEdmsComNum();
		String edmsNum 		= CpsEdmsMasterVO.getEdmsNum();
//		if(!Arrays.asList("수리", "취소", "취하").contains(edmsStatus)) {
//			Map args = new HashMap();
//			args.put("_defaultDB", jisaCode);
//			args.put("impoBlNo", edmsNum);
//			args.put("impoNapseCode", edmsComCode);
//			args.put("impoNapseSaup", edmsComNum);
//			if(!CmmnUtils.isNull(singoNum)){
//				args.put("impoSingoNo", singoNum);
//			}
//			Map returnBlStatus = edmsManagementMapper.findImpoBlStatus(CmmnUtils.replaceMapSc(args));
//			if(!CmmnUtils.isNull(returnBlStatus)){
//				CpsEdmsMasterVO.setEdmsStatus(String.valueOf(returnBlStatus.get("impoResResult")));
//				CpsEdmsMasterVO.setSingoDay(String.valueOf(returnBlStatus.get("impoSingoDate")));
//				CpsEdmsMasterVO.setSuriDay(String.valueOf(returnBlStatus.get("impoOkDate")));
//				CpsEdmsMasterVO.setIphangDay(String.valueOf(returnBlStatus.get("impoIphangDate")));
//				CpsEdmsMasterVO.setBanipDay(String.valueOf(returnBlStatus.get("impoBanipDate")));
//				CpsEdmsMasterVO.setEdmsMrn(String.valueOf(returnBlStatus.get("impoMrnNo")));
//				CpsEdmsMasterVO.setEdmsMsn(String.valueOf(returnBlStatus.get("impoMblNo")));
//			}
//		}
		return CpsEdmsMasterVO;
	}


	public CpsEdmsMasterVO getEdmsMasterByExport(CpsEdmsMasterVO CpsEdmsMasterVO){
		String edmsComCode 	= CpsEdmsMasterVO.getEdmsComCode();
		String edmsComNum 	= CpsEdmsMasterVO.getEdmsComNum();
		String edmsNum 		= CpsEdmsMasterVO.getEdmsNum();
//		if(!Arrays.asList("수리", "취소", "취하").contains(edmsStatus)){
//			Map args = new HashMap();
//			args.put("_defaultDB", jisaCode);
//			args.put("expoIvNo", edmsNum);
//			args.put("expoSuchuljaCode", edmsComCode);
//			args.put("expoSuchulSaupNo", edmsComNum);
//			if(!CmmnUtils.isNull(singoNum)){
//				args.put("expoSingoNo", singoNum);
//			}
//			Map returnInvoiceStatus = edmsManagementMapper.findExpoInvoiceStatus(CmmnUtils.replaceMapSc(args));
//			if(!CmmnUtils.isNull(returnInvoiceStatus)){
//				CpsEdmsMasterVO.setEdmsStatus(String.valueOf(returnInvoiceStatus.get("expoResResult")));
//				CpsEdmsMasterVO.setSingoDay(String.valueOf(returnInvoiceStatus.get("expoSingoDate")));
//				CpsEdmsMasterVO.setSuriDay(String.valueOf(returnInvoiceStatus.get("expoOkDate")));
//			}
//		}
		return CpsEdmsMasterVO;
	}

	public List<CpsEdmsAttachFileVO> getEdmsFileList(Map args) throws Exception {
		BigDecimal SDAAKey 			= CmmnUtils.isContainsMapValue(args, "SDAAKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("SDAAKey"))) : null;
		String edmsParentGbn 		= args.containsKey("edmsParentGbn") ? String.valueOf(args.get("edmsParentGbn")) : null;
		String edmsJisaCode 		= args.containsKey("edmsJisaCode") ? String.valueOf(args.get("edmsJisaCode")) : null;
		String edmsMasterKey 		= args.containsKey("edmsMasterKey") ? String.valueOf(args.get("edmsMasterKey")) : null;
		String edmsMkey 			= args.containsKey("edmsMkey") ? String.valueOf(args.get("edmsMkey")) : null;
		String edmsNo 				= args.containsKey("edmsNo") ? String.valueOf(args.get("edmsNo")) : null;
		String edmsSingoNo 			= args.containsKey("edmsSingoNo") ? String.valueOf(args.get("edmsSingoNo")) : null;
		String commonYn 			= args.containsKey("commonYn") ? String.valueOf(args.get("commonYn")) : null;
		String edmsFileCategory 	= args.containsKey("edmsFileCategory") ? String.valueOf(args.get("edmsFileCategory")) : null;
		String edmsFileUploadType 	= args.containsKey("edmsFileUploadType") ? String.valueOf(args.get("edmsFileUploadType")) : null;
		String edmsSaveFileNm 		= args.containsKey("edmsSaveFileNm") ? String.valueOf(args.get("edmsSaveFileNm")) : null;
		String edmsOrgFileNm 		= args.containsKey("edmsOrgFileNm") ? String.valueOf(args.get("edmsOrgFileNm")) : null;
		String edmsFileStatus 		= args.containsKey("edmsFileStatus") ? String.valueOf(args.get("edmsFileStatus")) : null;
		String fromAddDay 			= args.containsKey("fromAddDay") ? String.valueOf(args.get("fromAddDay")) : null;
		String toAddDay 			= args.containsKey("toAddDay") ? String.valueOf(args.get("toAddDay")) : null;
		String edmsFileUserId 		= args.containsKey("edmsFileUserId") ? String.valueOf(args.get("edmsFileUserId")) : null;
		String useYn 				= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";
		ArrayList commonSearchList 	= new ArrayList();

		Specifications spec = Specifications.where(CmmnSpecs.eqStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(SDAAKey)) 			spec = spec.and(CmmnSpecs.eqNumberSpec(SDAAKey, "sDAAKey"));
		if (!CmmnUtils.isNull(edmsParentGbn)) 	    spec = spec.and(CmmnSpecs.eqStringSpec(edmsParentGbn, "edmsParentGbn"));
		if (!CmmnUtils.isNull(edmsJisaCode)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsJisaCode, "edmsJisaCode"));
		if (!CmmnUtils.isNull(edmsMasterKey)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsMasterKey, "edmsMasterKey"));
		if (!CmmnUtils.isNull(edmsMkey)) 			spec = spec.and(CmmnSpecs.eqStringSpec(edmsMkey, "edmsMkey"));
		if (!CmmnUtils.isNull(edmsNo)) 				spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsNo, "edmsNo"));
		if (!CmmnUtils.isNull(edmsSingoNo)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSingoNo, "edmsSingoNo"));
		if (!CmmnUtils.isNull(commonYn)) 			spec = spec.and(CmmnSpecs.eqStringSpec(commonYn, "commonYn"));
		if (!CmmnUtils.isNull(edmsFileCategory)) 	spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileCategory, "edmsFileCategory"));
		if (!CmmnUtils.isNull(edmsFileUploadType)) 	spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileUploadType, "edmsFileUploadType"));
		if (!CmmnUtils.isNull(edmsSaveFileNm)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSaveFileNm, "edmsSaveFileNm"));
		if (!CmmnUtils.isNull(edmsOrgFileNm)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsOrgFileNm, "edmsOrgFileNm"));
		if (!CmmnUtils.isNull(edmsFileStatus)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileStatus, "edmsFileStatus"));
		if (!CmmnUtils.isNull(edmsFileUserId)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileUserId, "addUserId"));

//		if (!CmmnUtils.isNull(edmsFileUserId)) {
//			commonSearchList.add("addUserId");
//			commonSearchList.add("editUserId");
//			spec = CmmnSpecs.inStringMapSpec(edmsFileUserId, commonSearchList, spec);
//		}
		if (!CmmnUtils.isNull(fromAddDay) && !CmmnUtils.isNull(toAddDay)) spec = spec.and(CmmnSpecs.betweenObjectSpec(fromAddDay, toAddDay, "addDay"));

		Sort orders = new Sort(Sort.Direction.DESC, "sDAAKey");

		return cpsEdmsFileDao.findAll(spec, orders);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public Map fixEdmsNotClassification(CpsEdmsMasterVO CpsEdmsMasterVO, String fixEdmsGubun, HttpServletRequest request) throws Exception{
		Map returnMap = new HashMap();
		CpsEdmsMasterVO returnVO = null;
		List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = null;
		CpsEdmsMasterVO saveVO = modelMapper.map(CpsEdmsMasterVO, CpsEdmsMasterVO.class);

		String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		if(fixEdmsGubun.equals("IMPORT") || fixEdmsGubun.equals("EXPORT") || fixEdmsGubun.equals("SEINETC") || fixEdmsGubun.equals("HWANGUP")){
			CpsEdmsMasterVO isSavedCpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsGubunAndEdmsComCodeAndEdmsNumAndUseYnOrderByEdmsKeyDesc(fixEdmsGubun, CpsEdmsMasterVO.getEdmsComCode(), CpsEdmsMasterVO.getEdmsNum(), "Y");
			boolean isNewMaster = CmmnUtils.isNull(isSavedCpsEdmsMasterVO) ? true : false;

			if(isNewMaster){
				saveVO.setEdmsKey(null);
				saveVO.setEdmsGubun(fixEdmsGubun);
				saveVO.setAddUserId(userId);
				saveVO.setAddUserName(userName);
				saveVO.setAddDtm(currentDatetime);
				returnVO = cpsEdmsMasterDao.save(saveVO);
			}else{
				if(CmmnUtils.isNull(saveVO.getEdmsNum()) || saveVO.getEdmsNum().equals("")){
					isSavedCpsEdmsMasterVO.setEdmsNum("");
				}
				isSavedCpsEdmsMasterVO.setEditUserId(userId);
				isSavedCpsEdmsMasterVO.setEditUserName(userName);
				isSavedCpsEdmsMasterVO.setEditDtm(currentDatetime);
				returnVO = cpsEdmsMasterDao.save(isSavedCpsEdmsMasterVO);
			}
		}
		returnMap.put("CpsEdmsMasterVO", returnVO);

		return returnMap;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsMasterVO saveEdmsMaster(CpsEdmsMasterVO CpsEdmsMasterVO, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(CpsEdmsMasterVO.getEdmsNum())){
			CpsEdmsMasterVO.setEdmsNum("");
		}
		CpsEdmsMasterVO returnVO = cpsEdmsMasterDao.save(CpsEdmsMasterVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveEdmsFileInfo(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request) throws Exception{
		CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(CpsEdmsAttachFileVO);

		return returnVO;
	}

	public List<Map> getfindEdmsMasterList(Map args){
		return edmsManagementMapper.findEdmsMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getImportPaperList(Map args){
		return edmsManagementMapper.findImpoPaperList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getImportPaper1List(Map args){
		return edmsManagementMapper.findImpoPaper1List(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getExportPaperList(Map args){
		return edmsManagementMapper.findExpoPaperList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getExportPaper1List(Map args){
		return edmsManagementMapper.findExpoPaper1List(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsTeamWithNotClassificationFileList(Map args){
		return edmsManagementMapper.findEdmsTeamWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsWithNotClassificationFileList(Map args){
		return edmsManagementMapper.findEdmsWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsExportWithNotClassificationFileList(Map args){
		return edmsManagementMapper.findEdmsExportWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsExWithNotClassificationFileList(Map args){
		return edmsManagementMapper.findEdmsExWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsExBanipWithNotClassificationFileList(Map args){
		return edmsManagementMapper.findEdmsExBanipWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsPreFileList(Map args){
		return edmsManagementMapper.findEdmsPreFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getExportUpdateList(){
		return edmsManagementMapper.findExportUpdateList();
	}

	public List<Map> getEdmsMasterWithFileList(Map args){
		return edmsManagementMapper.findEdmsMasterWithFileList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getImportMasterInfoList(Map args){
		return edmsManagementMapper.findImpoMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<DeliveryRequestVO> getImportDeliveryRequestList(Map args) throws Exception{
		Specifications spec = getImportDeliveryRequestSpecifications(args);
		Sort orders = new Sort(Sort.Direction.DESC, "UseYn").and(new Sort(Sort.Direction.DESC, "SDAB100Key"));
		return importDeliveryRequestDao.findAll(spec, orders);
	}

	private Specifications getImportDeliveryRequestSpecifications(Map args){
		BigDecimal SDAB100Key = CmmnUtils.isContainsMapValue(args, "sDAB100Key") ? NumberUtils.createBigDecimal(String.valueOf(args.get("sDAB100Key"))) : null;
		String SDABMngNo = args.containsKey("sDABMngNo") ? String.valueOf(args.get("sDABMngNo")) : null;
		String CustomerDB = args.containsKey("customerDB") ? String.valueOf(args.get("customerDB")) : null;
		String CustomerCode = args.containsKey("customerCode") ? String.valueOf(args.get("customerCode")) : null;
		String CustomerNm = args.containsKey("customerNm") ? String.valueOf(args.get("customerNm")) : null;
		String CustomerTaxNo = args.containsKey("customerTaxNo") ? String.valueOf(args.get("customerTaxNo")) : null;
		String MblNo = args.containsKey("mblNo") ? String.valueOf(args.get("mblNo")) : null;
		String HblNo = args.containsKey("hblNo") ? String.valueOf(args.get("hblNo")) : null;
		String CargoNo = args.containsKey("cargoNo") ? String.valueOf(args.get("cargoNo")) : null;
		String SingoNo = args.containsKey("singoNo") ? String.valueOf(args.get("singoNo")) : null;
		String ImpoSegwan = args.containsKey("impoSegwan") ? String.valueOf(args.get("impoSegwan")) : null;
		String ImpoJangchBuho = args.containsKey("impoJangchBuho") ? String.valueOf(args.get("impoJangchBuho")) : null;
		String ImpoJangchNm = args.containsKey("impoJangchNm") ? String.valueOf(args.get("impoJangchNm")) : null;
		String ImpoJangchJangso = args.containsKey("impoJangchJangso") ? String.valueOf(args.get("impoJangchJangso")) : null;
		String CargoStatus = args.containsKey("cargoStatus") ? String.valueOf(args.get("cargoStatus")) : null;
		String DeliveryStatus = args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : null;
		String LandingArea = args.containsKey("landingArea") ? String.valueOf(args.get("landingArea")) : null;
		String BanipPlace = args.containsKey("banipPlace") ? String.valueOf(args.get("banipPlace")) : null;
		String RequestCoNm = args.containsKey("requestCoNm") ? String.valueOf(args.get("requestCoNm")) : null;
		String RequestMan = args.containsKey("requestMan") ? String.valueOf(args.get("requestMan")) : null;
		String AssignId = args.containsKey("assignId") ? String.valueOf(args.get("assignId")) : null;
		String AssignMan = args.containsKey("assignMan") ? String.valueOf(args.get("assignMan")) : null;
		BigDecimal DeliveryCoKey = CmmnUtils.isContainsMapValue(args, "deliveryCoKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCoKey"))) : null;
		String DeliveryCoNm = args.containsKey("deliveryCoNm") ? String.valueOf(args.get("deliveryCoNm")) : null;
		BigDecimal DeliveryCarryingInKey = CmmnUtils.isContainsMapValue(args, "deliveryCarryingInKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
		String DeliveryCarryingInNm = args.containsKey("deliveryCarryingInNm") ? String.valueOf(args.get("deliveryCarryingInNm")) : null;
		String DeliveryCarryingInTaxNo = args.containsKey("deliveryCarryingInTaxNo") ? String.valueOf(args.get("deliveryCarryingInTaxNo")) : null;
		String DeliveryCarryingInMan = args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : null;
		String DeliveryCarMngNo = args.containsKey("deliveryCarMngNo") ? String.valueOf(args.get("deliveryCarMngNo")) : null;
		String DeliveryCarNm = args.containsKey("deliveryCarNm") ? String.valueOf(args.get("deliveryCarNm")) : null;
		String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null;
		String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
		String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
		String UseYn = "Y";
		String UserGrade = String.valueOf(args.get("_userGrade"));
		String UserId = String.valueOf(args.get("_userId"));
		String Auth = String.valueOf(args.get("_auth"));
		String ArgCl = "KEYS";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(UseYn, "useYn"));
		if (!CmmnUtils.isNull(SDAB100Key)) spec = spec.and(CmmnSpecs.eqNumberSpec(SDAB100Key, "sDAB100Key"));
		if (!CmmnUtils.isNull(SDABMngNo)) spec = spec.and(CmmnSpecs.eqStringSpec(SDABMngNo, "SDABMngNo"));
		if (!CmmnUtils.isNull(CustomerDB)) spec = spec.and(CmmnSpecs.eqStringSpec(CustomerDB, "customerDB"));
		if (!CmmnUtils.isNull(CustomerCode)) spec = spec.and(CmmnSpecs.eqStringSpec(CustomerCode, "customerCode"));
		if (!CmmnUtils.isNull(CustomerNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(CustomerNm, "customerNm"));
		if (!CmmnUtils.isNull(CustomerTaxNo)) spec = spec.and(CmmnSpecs.eqStringSpec(CustomerTaxNo, "customerTaxNo"));
		if (!CmmnUtils.isNull(MblNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(MblNo, "mblNo"));
		if (!CmmnUtils.isNull(HblNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(HblNo, "hblNo"));
		if (!CmmnUtils.isNull(CargoNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(CargoNo, "cargoNo"));
		if (!CmmnUtils.isNull(SingoNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(SingoNo, "singoNo"));
		if (!CmmnUtils.isNull(ImpoSegwan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ImpoSegwan, "impoSegwan"));
		if (!CmmnUtils.isNull(ImpoJangchBuho)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ImpoJangchBuho, "impoJangchBuho"));
		if (!CmmnUtils.isNull(ImpoJangchNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ImpoJangchNm, "IimpoJangchNm"));
		if (!CmmnUtils.isNull(ImpoJangchJangso)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ImpoJangchJangso, "impoJangchJangso"));
		if (!CmmnUtils.isNull(CargoStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(CargoStatus, "cargoStatus"));
		if (!CmmnUtils.isNull(DeliveryStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryStatus, "deliveryStatus"));
		if (!CmmnUtils.isNull(LandingArea)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(LandingArea, "landingArea"));
		if (!CmmnUtils.isNull(BanipPlace)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(BanipPlace, "banipPlace"));
		if (!CmmnUtils.isNull(RequestCoNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(RequestCoNm, "requestCoNm"));
		if (!CmmnUtils.isNull(RequestMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(RequestMan, "requestMan"));
		if (!CmmnUtils.isNull(AssignId)) spec = spec.and(CmmnSpecs.eqStringSpec(AssignId, "assignId"));
		if (!CmmnUtils.isNull(AssignMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(AssignMan, "assignMan"));
		if (!CmmnUtils.isNull(DeliveryCoKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(DeliveryCoKey, "deliveryCoKey"));
		if (!CmmnUtils.isNull(DeliveryCoNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCoNm, "deliveryCoNm"));
		if (!CmmnUtils.isNull(DeliveryCarryingInKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(DeliveryCarryingInKey, "deliveryCarryingInKey"));
		if (!CmmnUtils.isNull(DeliveryCarryingInNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInNm, "deliveryCarryingInNm"));
		if (!CmmnUtils.isNull(DeliveryCarryingInTaxNo)) spec = spec.and(CmmnSpecs.eqStringSpec(DeliveryCarryingInTaxNo, "deliveryCarryingInTaxNo"));
		if (!CmmnUtils.isNull(DeliveryCarryingInMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInMan, "deliveryCarryingInMan"));
		if (!CmmnUtils.isNull(DeliveryCarMngNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarMngNo, "deliveryCarMngNo"));
		if (!CmmnUtils.isNull(DeliveryCarNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarNm, "deliveryCarNm"));
		if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate)) {
			strFromDate = strFromDate.substring(0, 8) + "000000";
			strToDate = strToDate.substring(0, 8) + "999999";
			spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));
		}
		return spec;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveEdmsFileAdditionalInfo(CpsEdmsFileDTO.additionalInfo additionalInfo, HttpServletRequest request) throws Exception {
		CpsEdmsAttachFileVO fileVO = cpsEdmsFileDao.findOne(additionalInfo.getSDAAKey());
		String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName 		= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String commonYn 		= String.valueOf(additionalInfo.getCommonYn());
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		if(additionalInfo.getEdmsFileCategory().equals("B0001")){
			fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
			fileVO.setCommonYn("N");
		}else{
			fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
			fileVO.setCommonYn(commonYn);
		}
		fileVO.setEditUserId(userId);
		fileVO.setEditUserNm(userName);
		fileVO.setEditDtm(currentDatetime);

		CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(fileVO);

		return returnVO;
	}

	public List<Map> getCheckEdmsMasterImportList() {
		return edmsManagementMapper.findCheckEdmsMasterImportList();
	}

	public List<Map> getCheckEdmsMasterExportList() {
		return edmsManagementMapper.findCheckEdmsMasterExportList();
	}

	public List<Map> getCheckList() {
		return edmsManagementMapper.findCheckList();
	}

	public List<Map> getChangeBlList() {
		return edmsManagementMapper.findChangeBlList();
	}

	public List<Map> getChangeBlFileList() {
		return edmsManagementMapper.findChangeBlFileList();
	}

	public List<Map> getChangeInvList() {
		return edmsManagementMapper.findChangeInvList();
	}

	public List<Map> getChangeInvFileList() {
		return edmsManagementMapper.findChangeInvFileList();
	}

	public List<Map> getChangeInvSingoList() {
		return edmsManagementMapper.findChangeInvSingoList();
	}

	public List<Map> getRequestFileList() {
		return edmsManagementMapper.findRequestFileList();
	}

	public List<Map> getImportRequestCheckList(Map args){
		return edmsManagementMapper.findImportRequestCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getExportRequestCheckList(Map args){
		return edmsManagementMapper.findExportRequestCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getCheckImpo1(Map args){
		return edmsManagementMapper.findCheckImpo1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getCheckExpo1(Map args){
		return edmsManagementMapper.findCheckExpo1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getCheckBanip1(Map args){
		return edmsManagementMapper.findCheckBanip1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getItemFileDownList(Map args){
		return edmsManagementMapper.findItemFileDownList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsFileDownFileList(Map args){
		return edmsManagementMapper.findFileDownList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getEdmsFileDownExFileList(Map args){
		return edmsManagementMapper.findFileDownExList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getAutoLoginList(Map args){
		return edmsManagementMapper.findAutoLoginList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getLoginList(Map args){
		return edmsManagementMapper.findLoginList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> getInvoiceCheck(Map args){
		return edmsManagementMapper.findInvoiceCheck(CmmnUtils.replaceMapSc(args));
	}

	public long updateExport(Map args) throws Exception{
		  return edmsManagementMapper.updateExport(CmmnUtils.replaceMapSc(args));
	}

	public long updateAttachFile(Map args) throws Exception{
		  return edmsManagementMapper.updateAttachFile(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportZeissDecide(Map args){
		return edmsManagementMapper.selectImportZeissDecide(CmmnUtils.replaceMapSc(args));
	}








  public List<CpsEdmsMasterVO> getEdmsMasterList(Map args) throws Exception {
	BigDecimal edmsKey = CmmnUtils.isContainsMapValue(args, "edmsKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsKey"))) : null;
	String edmsGubun = args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : null;
	String edmsUploadType = args.containsKey("edmsUploadType") ? String.valueOf(args.get("edmsUploadType")) : null;
	String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
	String jisaCode = args.containsKey("jisaCode") ? String.valueOf(args.get("jisaCode")) : null;
	String teamCode = args.containsKey("teamCode") ? String.valueOf(args.get("teamCode")) : null;
	String edmsStatus = args.containsKey("edmsStatus") ? String.valueOf(args.get("edmsStatus")) : null;
	BigDecimal edmsComKey = CmmnUtils.isContainsMapValue(args, "edmsComKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsComKey"))) : null;
	String edmsComName = args.containsKey("edmsComName") ? String.valueOf(args.get("edmsComName")) : null;
	String edmsComCode = args.containsKey("edmsComCode") ? String.valueOf(args.get("edmsComCode")) : null;
	String edmsComNum = args.containsKey("edmsComNum") ? String.valueOf(args.get("edmsComNum")) : null;
	String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null; // addDay,editDay,iphangDay,banipDay,singoDay,suriDay,banchulDay
	String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
	String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
	String edmsMasterUserId = args.containsKey("edmsMasterUserId") ? String.valueOf(args.get("edmsMasterUserId")) : null;
	String edmsMasterUserName = args.containsKey("edmsMasterUserName") ? String.valueOf(args.get("edmsMasterUserName")) : null;
	String singoNum = args.containsKey("singoNum") ? String.valueOf(args.get("singoNum")) : null;
	String divisionSingoYn = args.containsKey("divisionSingoYn") ? String.valueOf(args.get("divisionSingoYn")) : null;
	String edmsMrn = args.containsKey("edmsMrn") ? String.valueOf(args.get("edmsMrn")) : null;
	String edmsMsn = args.containsKey("edmsMsn") ? String.valueOf(args.get("edmsMsn")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
	ArrayList commonSearchList = new ArrayList();

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn")).and(CmmnSpecs.eqStringSpec(edmsComNum, "edmsComNum"));
	//검색조건
	if (!CmmnUtils.isNull(edmsKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsKey, "edmsKey"));
	if (!CmmnUtils.isNull(edmsGubun)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsGubun, "edmsGubun"));
	if (!CmmnUtils.isNull(edmsUploadType)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsUploadType, "edmsUploadType"));
	if (!CmmnUtils.isNull(edmsNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsNum, "edmsNum"));
	if (!CmmnUtils.isNull(jisaCode)) spec = spec.and(CmmnSpecs.eqStringSpec(jisaCode, "jisaCode"));
	if (!CmmnUtils.isNull(teamCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(teamCode, "teamCode"));
	if (!CmmnUtils.isNull(edmsStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsStatus, "edmsStatus"));
	if (!CmmnUtils.isNull(edmsComKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsComKey, "edmsComKey"));
	if (!CmmnUtils.isNull(edmsComName)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(edmsComName, "edmsComName"));
	if (!CmmnUtils.isNull(edmsComCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsComCode, "edmsComCode"));
	if (!CmmnUtils.isNull(edmsComNum)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsComNum, "edmsComNum"));
	if (!CmmnUtils.isNull(singoNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(singoNum, "singoNum"));
	if (!CmmnUtils.isNull(divisionSingoYn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(divisionSingoYn, "divisionSingoYn"));
	if (!CmmnUtils.isNull(edmsMrn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsMrn, "edmsMrn"));
	if (!CmmnUtils.isNull(edmsMsn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsMsn, "edmsMsn"));
	if (!CmmnUtils.isNull(edmsMasterUserId)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserId");
	  commonSearchList.add("editUserId");
	  spec = CmmnSpecs.inStringMapSpec(edmsMasterUserId, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(edmsMasterUserName)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserName");
	  commonSearchList.add("editUserName");
	  spec = CmmnSpecs.inStringMapSpec(edmsMasterUserName, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate))
	  spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "edmsKey"));

	return cpsEdmsMasterDao.findAll(spec, orders);
  }

  /**
   * Gets edms is master.(edmsGubun별 마스터 존재여부)
   *
   * @param args the args
   * @return the edms is master
   * @throws Exception the exception
   */
  public CpsEdmsMasterVO getEdmsIsMaster(Map args) throws Exception {
	CpsEdmsMasterVO returnVO = null;
	String edmsGubun 	= args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : "";
	String edmsComCode 	= args.containsKey("edmsComCode") ? String.valueOf(args.get("edmsComCode")) : "";

	switch (edmsGubun) {
	  case "IMPORT":
	  case "EXPORT":
		String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
		String singoNum = args.containsKey("singoNum") ? String.valueOf(args.get("singoNum")) : null;
		if (!CmmnUtils.isNull(edmsComCode) && !CmmnUtils.isNull(edmsNum)) {
		  // 구분,거래처키,체크번호(IM:BL/EX:INV),사용여부
		  returnVO = cpsEdmsMasterDao.findTop1ByEdmsGubunAndEdmsComCodeAndUseYnOrderByEdmsKey(edmsGubun, edmsComCode, "Y");
		}
		break;
	  default: //NOTCLASS,SEINETC,HWANGUP,기타(요건) 등등
		String jisaCode = args.containsKey("jisaCode") ? String.valueOf(args.get("jisaCode")) : null;
		if (!CmmnUtils.isNull(edmsComCode) && !CmmnUtils.isNull(jisaCode)) {
		  // 구분,지사,거래처키,사용여부
		  returnVO = cpsEdmsMasterDao.findByEdmsGubunAndEdmsComCodeAndUseYn(edmsGubun, edmsComCode, "Y");
		}
		break;
	}
	return returnVO;
  }


  /**
   * Save edms master list list.
   *
   * @param CpsEdmsMasterVOList the edms master vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<CpsEdmsMasterVO> saveEdmsMasterList(List<CpsEdmsMasterVO> CpsEdmsMasterVOList, HttpServletRequest request) throws Exception {
	List<CpsEdmsMasterVO> returnVoList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	for (CpsEdmsMasterVO vo : CpsEdmsMasterVOList) {
	  // 관리번호
//	  if (vo.getEdmsManagementNum().equals("00000000000000")) {
//		vo.setEdmsManagementNum(null);
//	  }

	  if (CmmnUtils.isNull(vo.getEdmsNum())) {
		  vo.setEdmsNum("");
	  }
	  // validation
	  //CpsEdmsMasterVO validateVO = modelMapper.map(vo, CpsEdmsMasterVO.class);
	  vo.setAddUserId(vo.getAddUserId());
	  vo.setAddUserName(vo.getAddUserName());
	  vo.setAddDtm(currentDatetime);
	  vo.setEditUserId(userId);
	  vo.setEditUserName(userNm);
//	  Set<ConstraintViolation<CpsEdmsMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
//	  if (validator.size() > 0) {
//		Object[] parameter = validator.toArray();
//		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
//	  }
//	  // 수출입 통관정보
//	  String edmsGubun = vo.getEdmsGubun();
//	  if (edmsGubun.equals("EXPORT")) {
//		vo = getEdmsMasterByExport(vo);
//	  } else if (edmsGubun.equals("IMPORT")) {
//		vo = getEdmsMasterByImport(vo);
//	  }
	  returnVoList.add(cpsEdmsMasterDao.save(vo));
	}

	return returnVoList;
  }



  /**
   * Gets edms master status group count list.(edms 마스터 상태 그룹별 리스트)
   *
   * @param args the args
   * @return the edms master status group count list
   */
  public List<Map> getEdmsMasterStatusGroupCountList(Map args) {
	return edmsManagementMapper.findEdmsMasterStatusGroupCountList(CmmnUtils.replaceMapSc(args));
  }
  /* edmsMaster 끝 */





  /**
   * Gets edms file list.
   *
   * @param edmsParentKey    the edms parent key
   * @param edmsParentGubun  the edms parent gubun
   * @param edmsFileCategory the edms file category
   * @param useYn            the use yn
   * @return the edms file list
   * @throws Exception the exception
   */
//  public Integer getEdmsFileList(String edmsNum, String edmsParentGubun, String edmsFileCategory, String useYn) throws Exception {
//	return cpsEdmsFileDao.countByEdmsNumAndEdmsParentGubunAndEdmsFileCategoryAndUseYn(edmsNum, edmsParentGubun, edmsFileCategory, "Y");
//  }


  /**
   * Save edms file list list.
   *
   * @param CpsEdmsAttachFileVOList the edms attach file vo list
   * @param request              the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<CpsEdmsAttachFileVO> saveEdmsFileList(List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList, HttpServletRequest request) throws Exception {
	List<CpsEdmsAttachFileVO> returnVoList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	for (CpsEdmsAttachFileVO vo : CpsEdmsAttachFileVOList) {
	  // validation
	  CpsEdmsAttachFileVO validateVO = modelMapper.map(vo, CpsEdmsAttachFileVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setEditUserId(userId);
	  Set<ConstraintViolation<CpsEdmsAttachFileVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  returnVoList.add(cpsEdmsFileDao.save(vo));
	}
	return returnVoList;
  }

  /* edmsAttachFile 종료 */

  /**
   * Gets expo invoice list.(수출 INV 매핑을 하기 위한 ncustoms.Expo1 기준 INV 리스트)
   *
   * @param args the args
   * @return the expo invoice list
   */
  public List<Map> getExpoInvoiceList(Map args) {
	return edmsManagementMapper.findExpoInvoiceList(CmmnUtils.replaceMapSc(args));
  }




  /**
   * Modify edms master map.(구분자별 edmsMaster 수정)
   * <p>
   * EDMS구분(IMPORT/EXPORT), EDMS미구분(NOTCLASS/SEINETC/HWANGUP)
   * <p>
   * 1. 신규 분류가 구분일 경우..
   * 1-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 1-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 2. 신규 분류가 미구분일 경우..
   * 2-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 2-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 리턴값은 신규마스터,기존파일리스트
   *
   * @param CpsEdmsMasterVO          the edms master vo
   * @param oldSavedEdmsMasterKey the old saved edms master key
   * @param newEdmsGubun          the new edms gubun
   * @param allFileTransferYn     the all file transfer yn
   * @param request               the request
   * @return the map
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public Map modifyEdmsMaster(CpsEdmsMasterVO CpsEdmsMasterVO, BigDecimal oldSavedEdmsMasterKey, String newEdmsGubun, String allFileTransferYn, HttpServletRequest request) throws Exception {
	Map returnMap = new HashMap();
	CpsEdmsMasterVO returnVO = null;
	List<CpsEdmsAttachFileVO> CpsEdmsAttachFileVOList = null;
	boolean isNewMaster = false;
	CpsEdmsMasterVO saveVO = modelMapper.map(CpsEdmsMasterVO, CpsEdmsMasterVO.class);
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userName = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));

	// 기존 마스터
	CpsEdmsMasterVO oldSavedMasterVO = cpsEdmsMasterDao.getOne(oldSavedEdmsMasterKey);
	if (CmmnUtils.isNull(oldSavedMasterVO)) {
	  throw new Exception("수정할내역없음");
	}
	String oldEdmsGubun = oldSavedMasterVO.getEdmsGubun();

	/*
	미구분->구분 : edmsNum 제거
	구분->미구분
	미구분->미구분 : edmsNum 제거
	구분->구분
	*/
	if (checkEdmsGubun(newEdmsGubun).equalsIgnoreCase("EDMS구분")) {
	  saveOldEdmsMaster(allFileTransferYn, userId, userName, oldSavedMasterVO, oldEdmsGubun);

	  CpsEdmsMasterVO isSavedCpsEdmsMasterVO = null;
	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS구분")) {
		// 기존 저장여부 확인(수입,수출)
		isSavedCpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsGubunAndEdmsComCodeAndUseYnOrderByEdmsKey(newEdmsGubun, CpsEdmsMasterVO.getEdmsComCode(), "Y");
	  } else if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
		// 기존 저장여부 확인(NOTCLASS,SEINETC,HWANGUP,기타)
		isSavedCpsEdmsMasterVO = cpsEdmsMasterDao.findByEdmsGubunAndEdmsComCodeAndUseYn(newEdmsGubun, CpsEdmsMasterVO.getEdmsComCode(), "Y");
	  }
	  isNewMaster = CmmnUtils.isNull(isSavedCpsEdmsMasterVO) ? true : false;

	  returnVO = saveNewEdmsMaster(CpsEdmsMasterVO, newEdmsGubun, isNewMaster, saveVO, userId, userName, isSavedCpsEdmsMasterVO);
	} else if (checkEdmsGubun(newEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
	  // 기존 마스터 수정(allFileTransferYn 및 oldEdmsGubun에 따라)
	  saveOldEdmsMaster(allFileTransferYn, userId, userName, oldSavedMasterVO, oldEdmsGubun);

	  CpsEdmsMasterVO isSavedCpsEdmsMasterVO = null;
	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS구분")) {
		// 기존 저장여부 확인(수입,수출)
		isSavedCpsEdmsMasterVO = cpsEdmsMasterDao.findTop1ByEdmsGubunAndEdmsComCodeAndUseYnOrderByEdmsKey(newEdmsGubun, CpsEdmsMasterVO.getEdmsComCode(), "Y");
	  } else if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
		// 기존 저장여부 확인(NOTCLASS,SEINETC,기타)
		isSavedCpsEdmsMasterVO = cpsEdmsMasterDao.findByEdmsGubunAndEdmsComCodeAndUseYn(newEdmsGubun, CpsEdmsMasterVO.getEdmsComCode(), "Y");
	  }
	  isNewMaster = CmmnUtils.isNull(isSavedCpsEdmsMasterVO) ? true : false;

	  returnVO = saveNewEdmsMaster(CpsEdmsMasterVO, newEdmsGubun, isNewMaster, saveVO, userId, userName, isSavedCpsEdmsMasterVO);
	} else {
	  throw new Exception("fixEdmsGubun없음");
	}

	// 기존 fileList 조회
	if (!CmmnUtils.isNull(CpsEdmsMasterVO.getEdmsGubun()) && !CmmnUtils.isNull(CpsEdmsMasterVO.getEdmsKey())) {
	  Map edmsFileArgs = new HashMap();
	  edmsFileArgs.put("edmsParentGubun", CpsEdmsMasterVO.getEdmsGubun());
	  edmsFileArgs.put("edmsParentKey", CpsEdmsMasterVO.getEdmsKey());
	  edmsFileArgs.put("useYn", "Y");
	  CpsEdmsAttachFileVOList = this.getEdmsFileList(edmsFileArgs);
	}

	returnMap.put("CpsEdmsMasterVO", returnVO);
	returnMap.put("CpsEdmsAttachFileVOList", CpsEdmsAttachFileVOList);

	return returnMap;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  private CpsEdmsMasterVO saveNewEdmsMaster(CpsEdmsMasterVO CpsEdmsMasterVO, String newEdmsGubun, boolean isNewMaster, CpsEdmsMasterVO saveVO, String userId, String userName, CpsEdmsMasterVO isSavedCpsEdmsMasterVO) throws Exception {
	CpsEdmsMasterVO returnVO;
	if (isNewMaster) {
	  // 신규 master 저장
	  saveVO.setEdmsKey(null);
	  saveVO.setEdmsGubun(newEdmsGubun);
	  saveVO.setAddUserId(userId);
	  saveVO.setAddUserName(userName);

	  // 수출입 통관정보(신규일때도?)
	  if (newEdmsGubun.equals("EXPORT")) {
		saveVO = getEdmsMasterByExport(saveVO);
	  } else if (newEdmsGubun.equals("IMPORT")) {
		saveVO = getEdmsMasterByImport(saveVO);
	  }
	  returnVO = cpsEdmsMasterDao.save(saveVO);
	} else {
	  // 기존 master 수정
	  if (CmmnUtils.isNull(CpsEdmsMasterVO.getEdmsNum()) || CpsEdmsMasterVO.getEdmsNum().equals("")) {
		  isSavedCpsEdmsMasterVO.setEdmsNum("");
	  }
	  isSavedCpsEdmsMasterVO.setEditUserId(userId);
	  isSavedCpsEdmsMasterVO.setEditUserName(userName);
	  // 수출입 통관정보
	  if (newEdmsGubun.equals("EXPORT")) {
		isSavedCpsEdmsMasterVO = getEdmsMasterByExport(isSavedCpsEdmsMasterVO);
	  } else if (newEdmsGubun.equals("IMPORT")) {
		isSavedCpsEdmsMasterVO = getEdmsMasterByImport(isSavedCpsEdmsMasterVO);
	  }
	  returnVO = cpsEdmsMasterDao.save(isSavedCpsEdmsMasterVO);
	}
	return returnVO;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  private void saveOldEdmsMaster(String allFileTransferYn, String userId, String userName, CpsEdmsMasterVO oldSavedMasterVO, String oldEdmsGubun) throws Exception {
	if (!CmmnUtils.isNull(oldSavedMasterVO)) {
	  // allFileTransfer=="Y" 면 기존 master 삭제(useYn:N), "N"이면 유지
	  oldSavedMasterVO.setUseYn("Y".equalsIgnoreCase(allFileTransferYn) ? "N" : "Y");
	  oldSavedMasterVO.setEditUserId(userId);
	  oldSavedMasterVO.setEditUserName(userName);
	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
		oldSavedMasterVO.setEdmsNum(""); //edmsNum 제거
	  }
	  cpsEdmsMasterDao.save(oldSavedMasterVO);
	} else {
	  throw new Exception("수정할내역없음");
	}
  }

  private String checkEdmsGubun(String s) {
	String returnStr = null;
	if (s.equalsIgnoreCase("IMPORT") || s.equalsIgnoreCase("EXPORT")) {
	  returnStr = "EDMS구분";
	} else if (s.equalsIgnoreCase("NOTCLASS") || s.equalsIgnoreCase("SEINETC") || s.equalsIgnoreCase("HWANGUP")) {
	  returnStr = "EDMS미구분";
	}
	return returnStr;
  }

  /**
   * Gets customs clearance by unregistered edms master list.
   *
   * @param args the args
   * @return the customs clearance by unregistered edms master list
   */
  public List<Map> getCustomsClearanceByUnregisteredEdmsMasterList(Map args) {
	return edmsManagementMapper.findCustomsClearanceByUnregisteredEdmsMasterList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets edms division copy target list.
   *
   * @param args the args
   * @return the edms division copy target list
   */
  public List<Map> getEdmsDivisionCopyTargetList(Map args) {
	return edmsManagementMapper.findEdmsDivisionCopyTargetList(CmmnUtils.replaceMapSc(args));
  }


  /**
   * Is edms master same edms gubun and edms company and edms num list list.
   *
   * @param args the args
   * @return the list
   * @throws Exception the exception
   */
  public List<CpsEdmsMasterVO> isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(Map args) throws Exception {
	String edmsComCode = args.containsKey("edmsComCode") ? String.valueOf(args.get("edmsComCode")) : null;
	String edmsGubun = args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : null;
	String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
	if (CmmnUtils.isNull(edmsComCode) || CmmnUtils.isNull(edmsGubun) || CmmnUtils.isNull(edmsNum)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "동일 업무비교 체크 파라메터를 확인하세요", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}

	return cpsEdmsMasterDao.findByEdmsGubunAndEdmsComCodeAndEdmsNumAndUseYn(edmsGubun, edmsComCode, edmsNum, "Y");
  }

  /**
   * Save edms master by customs synchronize list list.
   *
   * @param CpsEdmsMasterVOList the edms master vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  public List<CpsEdmsMasterVO> saveEdmsMasterByCustomsSynchronizeList(List<CpsEdmsMasterVO> CpsEdmsMasterVOList, HttpServletRequest request) throws Exception {
	List<CpsEdmsMasterVO> returnVOList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
	Date currentDate = new Date();
	for (CpsEdmsMasterVO vo : CpsEdmsMasterVOList) {
	  String edmsGubun = vo.getEdmsGubun();
	  if (CmmnUtils.isNull(edmsGubun) || (!edmsGubun.equals("IMPORT") || !edmsGubun.equals("EXPORT"))) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "수입(출)만 수동동기화 할 수 있습니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  if (edmsGubun.equals("EXPORT")) {
		vo = getEdmsMasterByExport(vo);
	  } else if (edmsGubun.equals("IMPORT")) {
		vo = getEdmsMasterByImport(vo);
	  }

	  vo.setEditUserId(userId);
	  vo.setEditUserName(userNm);
	  // validation
	  Set<ConstraintViolation<CpsEdmsMasterVO>> validator = CmmnUtils.isCommonValid(vo);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }

	  returnVOList.add(cpsEdmsMasterDao.save(vo));
	}

	return returnVOList;
  }

  /**
   * Gets team x user list with auth.
   *
   * @param args the args
   * @return the team x user list with auth
   * @throws Exception the exception
   */
  public List<Map> getTeamXUserListWithAuth(Map args) {
	return edmsManagementMapper.findTeamXUserListWithAuth(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets user team customer info list.
   *
   * @param args the args
   * @return the user team customer info list
   * @throws Exception the exception
   */
  public List<UserTeamXCustomerVO> getUserTeamCustomerInfoList(Map args) throws Exception {
	BigDecimal utcSeq = CmmnUtils.isContainsMapValue(args, "utcSeq") ? NumberUtils.createBigDecimal(String.valueOf(args.get("utcSeq"))) : null;
	String utcName = args.containsKey("utcName") ? String.valueOf(args.get("utcName")) : null;
	BigDecimal utTeamSeq = CmmnUtils.isContainsMapValue(args, "utTeamSeq") ? NumberUtils.createBigDecimal(String.valueOf(args.get("utTeamSeq"))) : null;
	String utTeamCode = args.containsKey("utTeamCode") ? String.valueOf(args.get("utTeamCode")) : null;
	String utTeamName = args.containsKey("utTeamName") ? String.valueOf(args.get("utTeamName")) : null;
	String utcUseYn = args.containsKey("utcUseYn") ? String.valueOf(args.get("utcUseYn")) : "";
	BigDecimal utcTradeKey = CmmnUtils.isContainsMapValue(args, "utcTradeKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("utcTradeKey"))) : null;
	String utcTradeDb = args.containsKey("utcTradeDb") ? String.valueOf(args.get("utcTradeDb")) : null;
	String utcTradeCode = args.containsKey("utcTradeCode") ? String.valueOf(args.get("utcTradeCode")) : null;
	String utcTradeName = args.containsKey("utcTradeName") ? String.valueOf(args.get("utcTradeName")) : null;

	//검색조건(필수:utcUseYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(utcUseYn, "utcUseYn"));

	//검색조건(선택)
	if (!CmmnUtils.isNull(utcTradeKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(utcTradeKey, "utcTradeKey"));
	if (!CmmnUtils.isNull(utcTradeDb)) spec = spec.and(CmmnSpecs.eqStringSpec(utcTradeDb, "utcTradeDb"));
	if (!CmmnUtils.isNull(utcSeq)) spec = spec.and(CmmnSpecs.eqNumberSpec(utcSeq, "utcSeq"));
	if (!CmmnUtils.isNull(utcName)) spec = spec.and(CmmnSpecs.eqStringSpec(utcName, "utcName"));
	if (!CmmnUtils.isNull(utTeamSeq)) spec = spec.and(CmmnSpecs.eqNumberSpec(utTeamSeq, "utTeamSeq"));
	if (!CmmnUtils.isNull(utTeamCode)) spec = spec.and(CmmnSpecs.eqStringSpec(utTeamCode, "utTeamCode"));
	if (!CmmnUtils.isNull(utTeamName)) spec = spec.and(CmmnSpecs.eqStringSpec(utTeamName, "utTeamName"));
	if (!CmmnUtils.isNull(utcTradeCode)) spec = spec.and(CmmnSpecs.eqStringSpec(utcTradeCode, "utcTradeCode"));
	if (!CmmnUtils.isNull(utcTradeName)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(utcTradeName, "utcTradeName"));
	return userTeamCustomerDao.findAll(spec);
  }

  /**
   * Save user team customer info user team x customer vo.
   *
   * @param userTeamXCustomerVO the user team x customer vo
   * @return the user team x customer vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public UserTeamXCustomerVO saveUserTeamCustomerInfo(UserTeamXCustomerVO userTeamXCustomerVO) throws Exception {
	UserTeamXCustomerVO returnVO = userTeamCustomerDao.save(userTeamXCustomerVO);
	return returnVO;
  }

  /**
   * 거래처코드 리스트
   *
   * @param args the args
   * @return the customer list
   */
  public List<Map> getCustomerList(Map args) {
	return edmsManagementMapper.findCustomerList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Call sync customer individual info by procedure.
   *
   * @param args the args
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void callSyncCustomerIndividualInfoByProcedure(Map args) throws Exception {
	Map map = new HashMap();
	String db = String.valueOf(args.get("db"));
	String itemCode = String.valueOf(args.get("code"));
	String addUserId = String.valueOf(args.get("_userId"));
	if (CmmnUtils.isNull(db) || CmmnUtils.isNull(itemCode) || CmmnUtils.isNull(addUserId)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파라메터 확인", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}
	map.put("db", db);
	map.put("code", itemCode);
	map.put("addUserId", addUserId);

	edmsManagementMapper.callSyncCustomerIndividualInfo(map);
  }

  /**
   * 공통코드 리스트
   *
   * @param args the args
   * @return the customer list
   */
  public List<Map> getCmmnCodeList(Map args) {
	return edmsManagementMapper.findCmmnCodeList(CmmnUtils.replaceMapSc(args));
  }



  /**
   * Gets import delivery carrying in list.
   *
   * @param args     the args
   * @param pageable the pageable
   * @return the import delivery carrying in list
   * @throws Exception the exception
   */
  public List<DeliveryCarryingInVO> getImportDeliveryCarryingInList(Map args) throws Exception {
	  Specifications spec = getImportDeliveryCarryingInSpecifications(args);
	  Sort orders = new Sort(Sort.Direction.DESC, "UseYn").and(new Sort(Sort.Direction.DESC, "SDAB120Key"));
	  return importDeliveryCarryingInDao.findAll(spec, orders);
  }

  private Specifications getImportDeliveryCarryingInSpecifications(Map args) {
	  	BigDecimal SDAB120Key = CmmnUtils.isContainsMapValue(args, "sDAB120Key") ? NumberUtils.createBigDecimal(String.valueOf(args.get("sDAB120Key"))) : null;
		String DeliveryCarryingInNm = args.containsKey("deliveryCarryingInNm") ? String.valueOf(args.get("deliveryCarryingInNm")) : null;
		String DeliveryCarryingInTaxNum = args.containsKey("deliveryCarryingInTaxNum") ? String.valueOf(args.get("deliveryCarryingInTaxNum")) : null;
		String DeliveryCarryingInPhone = args.containsKey("deliveryCarryingInPhone") ? String.valueOf(args.get("deliveryCarryingInPhone")) : null;
		String DeliveryCarryingInFax = args.containsKey("deliveryCarryingInFax") ? String.valueOf(args.get("deliveryCarryingInFax")) : null;
		String DeliveryCarryingInMan = args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : null;
		String DeliveryCarryingInMobile = args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : null;
		String DeliveryCarryingInEmail = args.containsKey("deliveryCarryingInEmail") ? String.valueOf(args.get("deliveryCarryingInEmail")) : null;
		String DeliveryCarryingInAddr = args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : null;
		String UseYn = "Y";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(UseYn, "useYn"));
		if (!CmmnUtils.isNull(SDAB120Key)) spec = spec.and(CmmnSpecs.eqNumberSpec(SDAB120Key, "sDAB120Key"));
		if (!CmmnUtils.isNull(DeliveryCarryingInNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInNm, "deliveryCarryingInNm"));
		if (!CmmnUtils.isNull(DeliveryCarryingInTaxNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInTaxNum, "deliveryCarryingInTaxNum"));
		if (!CmmnUtils.isNull(DeliveryCarryingInPhone)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInPhone, "deliveryCarryingInPhone"));
		if (!CmmnUtils.isNull(DeliveryCarryingInFax)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInFax, "deliveryCarryingInFax"));
		if (!CmmnUtils.isNull(DeliveryCarryingInMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInMan, "deliveryCarryingInMan"));
		if (!CmmnUtils.isNull(DeliveryCarryingInMobile)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInMobile, "deliveryCarryingInMobile"));
		if (!CmmnUtils.isNull(DeliveryCarryingInEmail)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInEmail, "deliveryCarryingInEmail"));
		if (!CmmnUtils.isNull(DeliveryCarryingInAddr)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(DeliveryCarryingInAddr, "deliveryCarryingInAddr"));

		return spec;
  }

  /**
   * Save import delivery carrying in list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<DeliveryCarryingInVO> saveImportDeliveryCarryingInList(List<DeliveryCarryingInVO> voList, HttpServletRequest request) throws Exception {
	List<DeliveryCarryingInVO> deliveryCarryingInVOList = new ArrayList<>();
	String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userMng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (DeliveryCarryingInVO vo : voList) {
	  DeliveryCarryingInVO validateVO = modelMapper.map(vo, DeliveryCarryingInVO.class);
	  validateVO.setAddUserMng(userMng);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserMng(userMng);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  deliveryCarryingInVOList.add(validateVO);
	}
	List<DeliveryCarryingInVO> returnVO = importDeliveryCarryingInDao.save(deliveryCarryingInVOList);

	return returnVO;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryRequestVO saveImportDeliveryRequest(DeliveryRequestVO sDAB100VO, HttpServletRequest request) throws Exception{
	  DeliveryRequestVO returnVO = importDeliveryRequestDao.save(sDAB100VO);
		return returnVO;
	}


  /**
   * Save import delivery request list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<DeliveryRequestVO> saveImportDeliveryRequestList(List<DeliveryRequestVO> voList, HttpServletRequest request) throws Exception {
	List<DeliveryRequestVO> deliveryRequestVOList = new ArrayList<>();
	String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String usermng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (DeliveryRequestVO vo : voList) {
	  DeliveryRequestVO validateVO = modelMapper.map(vo, DeliveryRequestVO.class);
	  validateVO.setAddUserMng(usermng);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserMng(usermng);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  deliveryRequestVOList.add(validateVO);
	  sendMailApproval(validateVO);
	}
	List<DeliveryRequestVO> returnVO = importDeliveryRequestDao.save(deliveryRequestVOList);


	return returnVO;
  }

  private void sendMailApproval(DeliveryRequestVO deliveryRequestVO) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		Map map = new HashMap();
		boolean mailSendCheck = false;
		List<Object> mailAddr = new ArrayList<Object>(), mailList = new ArrayList<Object>();

		mailAddr.add("cps_seintnl@esein.co.kr");

		for (int i = 0; i < mailAddr.size(); i++) {
		  if (EmailValidator.getInstance().isValid(String.valueOf(mailAddr.get(i)))) {
			mailList.add(String.valueOf(mailAddr.get(i)));
		  }
		}

		if (mailList.size() > 0) {
		  map.put("toAddr", mailList);
		  map.put("subject", "[운송의뢰] 비엘번호 : "+CmmnUtils.snvl(deliveryRequestVO.getHblNo(), "")+" 수입신고번호 : "+CmmnUtils.snvl(deliveryRequestVO.getSingoNo(), "")+" 운송의뢰 요청합니다.");
		  map.put("contents", "<html>운송 요청합니다.<br>비엘번호 : " + CmmnUtils.snvl(deliveryRequestVO.getHblNo(), "") + "<br>수입신고번호 : " + CmmnUtils.snvl(deliveryRequestVO.getSingoNo(), "") + "<br>수입수리일자 : "+ CmmnUtils.snvl(deliveryRequestVO.getSuriDtm(), "").substring(0, 4) +"-"+ CmmnUtils.snvl(deliveryRequestVO.getSuriDtm(), "").substring(4, 6) +"-"+ CmmnUtils.snvl(deliveryRequestVO.getSuriDtm(), "").substring(6, 8) +"<br>업체명 : "+ CmmnUtils.snvl(deliveryRequestVO.getCustomerNm(), "") +"<br>도착지주소 : "+ CmmnUtils.snvl(deliveryRequestVO.getDeliveryCarryingInAddr(), "") +"<br>장치장 : "+ CmmnUtils.snvl(deliveryRequestVO.getDeliveryCarryingInNm(), "") +"<br>요청자 : "+ CmmnUtils.snvl(deliveryRequestVO.getRequestMan(), "") +" / "+ CmmnUtils.snvl(deliveryRequestVO.getRequestPhone(), "") +"<br>요청사항 : "+ CmmnUtils.snvl(deliveryRequestVO.getRequestInvisibleNote(), "") +"</html>");
		  map.put("contentType", true);
		  map.put("senderEmail", "webmaster@esein.co.kr");
		  map.put("senderName", "관리자");

		  mailSendCheck = cmmnMailService.sendMail(request, map);
		}
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<DeliveryRequestVO> deleteImportDeliveryRequestList(List<DeliveryRequestVO> voList, HttpServletRequest request) throws Exception {
	List<DeliveryRequestVO> deliveryRequestVOList = new ArrayList<>();
	String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String usermng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (DeliveryRequestVO vo : voList) {
	  DeliveryRequestVO validateVO = modelMapper.map(vo, DeliveryRequestVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserMng(usermng);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserMng(usermng);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  deliveryRequestVOList.add(validateVO);
	  delMailApproval(validateVO);
	}
	List<DeliveryRequestVO> returnVO = importDeliveryRequestDao.save(deliveryRequestVOList);


	return returnVO;
  }

  private void delMailApproval(DeliveryRequestVO deliveryRequestVO) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		Map map = new HashMap();
		boolean mailSendCheck = false;
		List<Object> mailAddr = new ArrayList<Object>(), mailList = new ArrayList<Object>();

		mailAddr.add("cpstnl@esein.co.kr");

		for (int i = 0; i < mailAddr.size(); i++) {
		  if (EmailValidator.getInstance().isValid(String.valueOf(mailAddr.get(i)))) {
			mailList.add(String.valueOf(mailAddr.get(i)));
		  }
		}

		if (mailList.size() > 0) {
		  map.put("toAddr", mailList);
		  map.put("subject", "[세인관세법인] 운송의뢰 삭제알림");
		  map.put("contents", "<html><b>수입자(사업자번호)</b> : " + CmmnUtils.snvl(deliveryRequestVO.getCustomerNm(), "") + "(" + CmmnUtils.snvl(deliveryRequestVO.getCustomerTaxNo(), "") + ")<br><br><b>BL(신고번호)</b> : " + CmmnUtils.snvl(deliveryRequestVO.getHblNo(), "") + "(" + CmmnUtils.snvl(deliveryRequestVO.getSingoNo(), "") + ")<br><br><b>의뢰자</b> : " + CmmnUtils.snvl(deliveryRequestVO.getRequestMan(), "") + "</html>");
		  map.put("contentType", true);
		  map.put("senderEmail", "webmaster@esein.co.kr");
		  map.put("senderName", "관리자");

		  mailSendCheck = cmmnMailService.sendMail(request, map);
		}
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<DeliveryRequestVO> saveImportDeliveryModifyList(List<DeliveryRequestVO> voList, HttpServletRequest request) throws Exception {
	List<DeliveryRequestVO> deliveryRequestVOList = new ArrayList<>();
	String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String usermng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (DeliveryRequestVO vo : voList) {
	  DeliveryRequestVO validateVO = modelMapper.map(vo, DeliveryRequestVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserMng(usermng);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserMng(usermng);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  deliveryRequestVOList.add(validateVO);
	}
	List<DeliveryRequestVO> returnVO = importDeliveryRequestDao.save(deliveryRequestVOList);


	return returnVO;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<DeliveryRequestVO> saveImportDeliveryAddList(List<DeliveryRequestVO> voList, HttpServletRequest request) throws Exception {
	List<DeliveryRequestVO> deliveryRequestVOList = new ArrayList<>();
	String userId  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String usermng = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MNGNO));
	String userNm  = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (DeliveryRequestVO vo : voList) {
	  DeliveryRequestVO validateVO = modelMapper.map(vo, DeliveryRequestVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserMng(usermng);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserMng(usermng);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  deliveryRequestVOList.add(validateVO);
	  sendAddMailApproval(validateVO);
	}
	List<DeliveryRequestVO> returnVO = importDeliveryRequestDao.save(deliveryRequestVOList);


	return returnVO;
  }

  private void sendAddMailApproval(DeliveryRequestVO deliveryRequestVO) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		Map map = new HashMap();
		boolean mailSendCheck = false;
		List<Object> mailAddr = new ArrayList<Object>(), mailList = new ArrayList<Object>();

		mailAddr.add("cpstnl@esein.co.kr");

		for (int i = 0; i < mailAddr.size(); i++) {
		  if (EmailValidator.getInstance().isValid(String.valueOf(mailAddr.get(i)))) {
			mailList.add(String.valueOf(mailAddr.get(i)));
		  }
		}

		if (mailList.size() > 0) {
		  map.put("toAddr", mailList);
		  map.put("subject", "[세인관세법인] 추가 운송의뢰 알림");
		  map.put("contents", "<html><b>수입자(사업자번호)</b> : " + CmmnUtils.snvl(deliveryRequestVO.getCustomerNm(), "") + "(" + CmmnUtils.snvl(deliveryRequestVO.getCustomerTaxNo(), "") + ")<br><br><b>BL(신고번호)</b> : " + CmmnUtils.snvl(deliveryRequestVO.getHblNo(), "") + "(" + CmmnUtils.snvl(deliveryRequestVO.getSingoNo(), "") + ")<br><br><b>의뢰자</b> : " + CmmnUtils.snvl(deliveryRequestVO.getRequestMan(), "") + "</html>");
		  map.put("contentType", true);
		  map.put("senderEmail", "webmaster@esein.co.kr");
		  map.put("senderName", "관리자");

		  mailSendCheck = cmmnMailService.sendMail(request, map);
		}
  }






  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
  public Map saveNcomCustomer(Map args) throws Exception {
	  edmsManagementMapper.saveNcomCustomer(args);
    return args;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsFieldMasterVO saveFieldMaster(CpsFieldMasterVO CpsFieldMasterVO, HttpServletRequest request) throws Exception{
	  CpsFieldMasterVO returnVO = cpsFieldMasterDao.save(CpsFieldMasterVO);

		return returnVO;
	}

  public List<CpsEdmsNotCustomerVO> getEdmsNotCustomerList(Map args, Pageable pageable) throws Exception{
	  String useYn 	= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
	  String saup 	= args.containsKey("saup") ? String.valueOf(args.get("saup")) : "";
	  Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	  if (!CmmnUtils.isNull(saup)) 	spec = spec.and(CmmnSpecs.eqStringSpec(saup, "saup"));
	  return cpsEdmsNotCustomerDao.findAll(spec, pageable);
  }

  public List<Map> selectCustomer(Map args) throws Exception{
	  return edmsManagementMapper.selectCustomer(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectCustomer1(Map args) throws Exception{
	  return edmsManagementMapper.selectCustomer1(CmmnUtils.replaceMapSc(args));
  }

  public CpsEdmsNotCustomerVO getUserOne(BigDecimal notKey) throws Exception{
		return cpsEdmsNotCustomerDao.getOne(notKey);
	}

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsEdmsNotCustomerVO> saveEdmsNotCustomerList(List<CpsEdmsNotCustomerVO> voList, HttpServletRequest request) throws Exception{
	    List<CpsEdmsNotCustomerVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		// validation
		for(CpsEdmsNotCustomerVO vo : voList){
			CpsEdmsNotCustomerVO validateVO = modelMapper.map(vo, CpsEdmsNotCustomerVO.class);
			validateVO.setAddUserId(userId);
			validateVO.setAddUserName(userNm);
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<CpsEdmsNotCustomerVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsEdmsNotCustomerVO> returnVO = cpsEdmsNotCustomerDao.save(voList);
		return returnVO;
	}

  public List<Map> getJisaUser(Map args) throws Exception{
	  return edmsManagementMapper.getJisaUser(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getUserList(Map args) throws Exception{
	  return edmsManagementMapper.getUserList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectImportFieldStatusList(Map args) throws Exception{
	  return edmsManagementMapper.selectImportFieldStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectImportJungFieldStatusList(Map args) throws Exception{
	  return edmsManagementMapper.selectImportJungFieldStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectExportFieldStatusList(Map args) throws Exception{
	  return edmsManagementMapper.selectExportFieldStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectExportJungFieldStatusList(Map args) throws Exception{
	  return edmsManagementMapper.selectExportJungFieldStatusList(CmmnUtils.replaceMapSc(args));
  }

  public long insertRpa(Map args) throws Exception{
	  return edmsManagementMapper.insertRpa(CmmnUtils.replaceMapSc(args));
  }

  public long updateKKOSend(Map args) throws Exception{
	  return edmsManagementMapper.updateKKOSend(CmmnUtils.replaceMapSc(args));
  }

  public long updateKKOSend1(Map args) throws Exception{
	  return edmsManagementMapper.updateKKOSend1(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getRpaInfoList(Map args){
	  return edmsManagementMapper.getRpaInfoList(CmmnUtils.replaceMapSc(args));
  }

  public long updateEndRpa(Map args) throws Exception{
	  return edmsManagementMapper.updateEndRpa(CmmnUtils.replaceMapSc(args));
  }

  public long delEndRpa(Map args) throws Exception{
	  return edmsManagementMapper.delEndRpa(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getImportSingoNoExcel(Map args){
	  return edmsManagementMapper.getImportSingoNoExcel(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getImportSingoNoExcel1(Map args){
	  return edmsManagementMapper.getImportSingoNoExcel1(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getExportSingoNoExcel(Map args){
	  return edmsManagementMapper.getExportSingoNoExcel(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getExportSingoNoExcel1(Map args){
	  return edmsManagementMapper.getExportSingoNoExcel1(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectFieldManage(Map args) throws Exception{
	  return edmsManagementMapper.selectFieldManage(CmmnUtils.replaceMapSc(args));
  }

  public long saveFieldManage(Map args) throws Exception{
	  return edmsManagementMapper.saveFieldManage(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getEdmsTeamNoFileList(Map args){
	  return edmsManagementMapper.findEdmsTeamNoFileList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getEdmsNoFileList(Map args){
	  return edmsManagementMapper.findEdmsNoFileList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getEdmsExportNoFileList(Map args){
	  return edmsManagementMapper.findEdmsExportNoFileList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getEdmsExNoFileList(Map args){
	  return edmsManagementMapper.findEdmsExNoFileList(CmmnUtils.replaceMapSc(args));
  }
}