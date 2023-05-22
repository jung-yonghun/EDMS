package com.edms.biz.edmsManagement;

import com.edms.domains.EdmsAttachFileVO;
import com.edms.domains.EdmsMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * The interface Edms master dao.
 */
@Repository
public interface EdmsMasterDao extends JpaRepository<EdmsMasterVO, BigDecimal> {
  Page<EdmsMasterVO> findAll(Pageable pageable);

  /**
   * Find all list.
   *
   * @param specification the specification
   * @param sort          the sort
   * @return the list
   */
  List<EdmsMasterVO> findAll(Specification<EdmsMasterVO> specification, Sort sort);

  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsKey(BigDecimal edmsKey);

  /**
   * Find by edms gubun and jisa code and edms com key and use yn edms master vo.(미분류,세인ETC,기타)
   *
   * @param edmsGubun  the edms gubun
   * @param jisaCode   the jisa code
   * @param edmsComKey the edms com key
   * @param useYn      the use yn
   * @return the edms master vo
   */
  @Transactional(readOnly = true)
  EdmsMasterVO findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(String edmsGubun, String jisaCode, BigDecimal edmsComKey, String useYn);

  /**
   * Find top 1 by edms gubun and edms com key and edms num and use yn order by edms key edms master vo.(IMPORT,EXPORT)
   *
   * @param edmsGubun  the edms gubun
   * @param edmsComKey the edms com key
   * @param singoNum   the singonum
   * @param useYn      the use yn
   * @return the edms master vo
   */
  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYnOrderByEdmsKeyDesc(String edmsGubun, BigDecimal edmsComKey, String edmsNum, String useYn);

  /**
   * Find top 1 by edms gubun and edms com key and edms num and use yn order by edms key edms master vo.(IMPORT,EXPORT)
   *
   * @param edmsGubun  the edms gubun
   * @param edmsComKey the edms com key
   * @param singoNum   the singonum
   * @param useYn      the use yn
   * @return the edms master vo
   */
  @Transactional(readOnly = true)
  EdmsMasterVO findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(String edmsGubun, BigDecimal edmsComKey, String singoNum, String useYn);

  /**
   * Find by edms gubun and edms com key and edms num and use yn list.
   *
   * @param edmsGubun  the edms gubun
   * @param edmsComKey the edms com key
   * @param edmsNum    the edms num
   * @param useYn      the use yn
   * @return the list
   */
  List<EdmsMasterVO> findByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYn(String edmsGubun, BigDecimal edmsComKey, String edmsNum, String useYn);

  /**
   * Count by add day int.(관리번호 채번용)
   *
   * @param addDay the add day
   * @return the int
   */
  int countByAddDay(String addDay);

  /**
   * Gets max edms management num.(관리번호 채번용3)
   *
   * @param yymmdd the yymmdd
   * @return the max edms management num
   */
  @Query(value = "SELECT RIGHT(ISNULL(MAX(edmsManagementNum), 'ED' + RIGHT(CONVERT(VARCHAR(8), getdate(), 112), 6) + '000000'), 12) " +
		  "FROM [soo].[dbo].[TBR_EDMS_Master] WHERE edmsManagementNum LIKE 'ED' + :yymmdd + '%' ", nativeQuery = true)
  String getMaxEdmsManagementNum(@Param("yymmdd") String yymmdd);

  /**
   * Find top 1 by add day order by add day desc edms master vo.(관리번호 채번용2)
   *
   * @param addDay the add day
   * @return the edms master vo
   */
  EdmsMasterVO findTop1ByAddDayOrderByAddDayDesc(String addDay);
}