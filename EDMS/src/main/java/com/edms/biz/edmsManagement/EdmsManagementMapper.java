package com.edms.biz.edmsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface EdmsManagementMapper {
	Map findExpoInvoiceStatus(Map args);

	Map findImpoBlStatus(Map args);

	List<Map> findImpoPaperList(Map args);

	List<Map> findImpoPaper1List(Map args);

	List<Map> findExpoPaperList(Map args);

	List<Map> findExpoPaper1List(Map args);

	List<Map> findEdmsTeamWithNotClassificationFileList(Map args);

	List<Map> findEdmsWithNotClassificationFileList(Map args);

	List<Map> findEdmsExportWithNotClassificationFileList(Map args);

	List<Map> findEdmsExWithNotClassificationFileList(Map args);

	List<Map> findEdmsExBanipWithNotClassificationFileList(Map args);

	List<Map> findEdmsPreFileList(Map args);

	long saveImportTeam();

	long saveImportEtcTeam();

	long saveExportInsertList();

	long saveExportInsertAddList();

	List<Map> findExportUpdateList();

	List<Map> findCheckEdmsMasterImportList();

	List<Map> findCheckEdmsMasterExportList();

	List<Map> findCheckList();

	List<Map> findChangeBlList();

	List<Map> findChangeBlFileList();

	List<Map> findChangeInvList();

	List<Map> findChangeInvFileList();

	List<Map> findChangeInvSingoList();

	List<Map> findRequestFileList();

	List<Map> findCheckImpo1(Map args);

	List<Map> findImportRequestCheck(Map args);

	List<Map> findExportRequestCheck(Map args);

	List<Map> findCheckExpo1(Map args);

	List<Map> findItemFileDownList(Map args);

	List<Map> findFileDownList(Map args);

	List<Map> findFileDownExList(Map args);

	List<Map> selectCustomer(Map args);

	List<Map> selectCustomer1(Map args);

	List<Map> getJisaUser(Map args);

	List<Map> getUserList(Map args);

	List<Map> selectImportFieldStatusList(Map args);

	List<Map> selectImportJungFieldStatusList(Map args);

	List<Map> selectExportFieldStatusList(Map args);

	List<Map> selectExportJungFieldStatusList(Map args);

	List<Map> findCheckBanip1(Map args);

	long insertRpa(Map args);

	long updateKKOSend(Map args);

	long updateKKOSend1(Map args);

	long updateEndRpa(Map args);

	long delEndRpa(Map args);

	List<Map> getRpaInfoList(Map args);

	List<Map> getImportSingoNoExcel(Map args);

	List<Map> getImportSingoNoExcel1(Map args);

	List<Map> getExportSingoNoExcel(Map args);

	List<Map> getExportSingoNoExcel1(Map args);

	List<Map> selectFieldManage(Map args);

	long saveFieldManage(Map args);

	List<Map> findAutoLoginList(Map args);

	List<Map> findLoginList(Map args);

	List<Map> findEdmsTeamNoFileList(Map args);

	List<Map> findEdmsNoFileList(Map args);

	List<Map> findEdmsExportNoFileList(Map args);

	List<Map> findEdmsExNoFileList(Map args);

	List<Map> findInvoiceCheck(Map args);

	long updateExport(Map args);

	long updateAttachFile(Map args);

	List<Map> selectImportZeissDecide(Map args);







	List<Map> findEdmsMasterWithFileList(Map args);








  List<Map> findEdmsMasterList(Map args);

  /**
   * Find edms master status group count list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findEdmsMasterStatusGroupCountList(Map args);

  /**
   * Find customs clearance by unregistered edms master list list.(통관미등록)
   *
   * @param args the args
   * @return the list
   */
  List<Map> findCustomsClearanceByUnregisteredEdmsMasterList(Map args);

  /**
   * Find edms division copy target list list.(분할건Copy 대상)
   *
   * @param args the args
   * @return the list
   */
  List<Map> findEdmsDivisionCopyTargetList(Map args);

  // TODO: 2017-06-13

  /**
   * Find expo invoice list list.(수출 EDMS용 INV 리스트)
   *
   * @param args the args
   * @return the list
   */
  List<Map> findExpoInvoiceList(Map args);

  /**
   * Find expo invoice status map.(수출 EDMS INV 상태)
   *
   * @param args the args
   * @return the map
   */


  /**
   * 사용자 지정 즐겨찾기 팀 조회(B)
   *
   * @param args the args
   * @return the list
   */
  List<Map> findTeamXUserListWithAuth(Map args);


  List<Map> findCustomerList(Map args);

  List<Map> callSyncCustomerIndividualInfo(Map args);

  List<Map> findCmmnCodeList(Map args);

  List<Map> findImpoMasterList(Map args);


  void syncCheckDeliveryCount(Map args);

  void syncDelCheckDeliveryCount(Map args);

  void syncCheckDeliveryAddCount(Map args);

  long saveNcomCustomer(Map args);
}