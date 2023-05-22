package com.edms.biz.edmsManagement;

import com.edms.domains.ENAC100VO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ENAC100Dao extends JpaRepository<ENAC100VO, BigDecimal> {
  List<ENAC100VO> findAll(Specification<ENAC100VO> specification);
}