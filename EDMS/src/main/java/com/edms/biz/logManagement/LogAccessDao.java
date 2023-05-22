package com.edms.biz.logManagement;

import com.edms.domains.LogAccessVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface LogAccessDao extends JpaRepository<LogAccessVO, BigDecimal> {
  Page<LogAccessVO> findAll(Specification<LogAccessVO> specification, Pageable pageable);
}