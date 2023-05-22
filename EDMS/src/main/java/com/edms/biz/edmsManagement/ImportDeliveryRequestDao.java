/*
 * Copyright (c) SEIN
 * All rights reserved.
 * This software is the confidential and proprietary information of SEIN. ("Confidential Information").
 */

package com.edms.biz.edmsManagement;

import com.edms.domains.DeliveryRequestVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * The interface Import delivery request dao.
 */
@Repository
public interface ImportDeliveryRequestDao extends JpaRepository<DeliveryRequestVO, BigDecimal> {
  /**
   * Find all page.
   *
   * @param specification the specification
   * @param pageable      the pageable
   * @return the page
   */
  Page<DeliveryRequestVO> findAll(Specification<DeliveryRequestVO> specification, Pageable pageable);

  List<DeliveryRequestVO> findAll(Specification<DeliveryRequestVO> specs, Sort sort);

  List<DeliveryRequestVO> findByAssignManStartingWithAndUseYn(String assignMan, String useYn);
}