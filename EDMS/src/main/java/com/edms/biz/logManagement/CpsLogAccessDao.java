package com.edms.biz.logManagement;

import com.edms.domains.CpsLogAccessVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface CpsLogAccessDao extends JpaRepository<CpsLogAccessVO, BigDecimal> {
  Page<CpsLogAccessVO> findAll(Specification<CpsLogAccessVO> specification, Pageable pageable);
}