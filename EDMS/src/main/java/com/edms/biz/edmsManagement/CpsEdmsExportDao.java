package com.edms.biz.edmsManagement;

import com.edms.domains.CpsEdmsExportVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsEdmsExportDao extends JpaRepository<CpsEdmsExportVO, BigDecimal>{
	Page<CpsEdmsExportVO> findAll(Pageable pageable);

	List<CpsEdmsExportVO> findAll(Specification<CpsEdmsExportVO> specification, Sort sort);
}