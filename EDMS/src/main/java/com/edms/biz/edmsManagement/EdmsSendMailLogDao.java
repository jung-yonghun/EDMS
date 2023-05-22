package com.edms.biz.edmsManagement;

import com.edms.domains.EdmsSendMailLogVO;

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
 * The interface Edms SendMail dao.
 */
@Repository
public interface EdmsSendMailLogDao extends JpaRepository<EdmsSendMailLogVO, BigDecimal> {
  Page<EdmsSendMailLogVO> findAll(Pageable pageable);

  /**
   * Find all list.
   *
   * @param specification the specification
   * @param sort          the sort
   * @return the list
   */
  List<EdmsSendMailLogVO> findAll(Specification<EdmsSendMailLogVO> specification, Sort sort);
}