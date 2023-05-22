package com.edms.biz.edmsManagement;

import com.edms.domains.EdmsAttachFileVO;
import com.edms.domains.EdmsMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * The interface Edms file dao.
 */
@Repository
public interface EdmsFileDao extends JpaRepository<EdmsAttachFileVO, BigDecimal> {
  Page<EdmsAttachFileVO> findAll(Pageable pageable);

  /**
   * Find all list.
   *
   * @param specification the specification
   * @param sort          the sort
   * @return the list
   */
  List<EdmsAttachFileVO> findAll(Specification<EdmsAttachFileVO> specification, Sort sort);

  /**
   * Count by edms parent key and edms parent gubun and edms file category and use yn integer.
   *
   * @param edmsParentKey    the edms parent key
   * @param edmsParentGubun  the edms parent gubun
   * @param edmsFileCategory the edms file category
   * @param useYn            the use yn
   * @return the integer
   */
  Integer countByEdmsParentKeyAndEdmsParentGubunAndEdmsFileCategoryAndUseYn(BigDecimal edmsParentKey, String edmsParentGubun, String edmsFileCategory, String useYn);

  @Transactional(readOnly = true)
  EdmsAttachFileVO findTop1ByEdmsFileKey(BigDecimal edmsFileKey);
}