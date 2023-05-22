package com.edms.biz.edmsManagement;

import com.edms.domains.CpsFieldMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsFieldMasterDao extends JpaRepository<CpsFieldMasterVO, BigDecimal>{
	Page<CpsFieldMasterVO> findAll(Pageable pageable);

	List<CpsFieldMasterVO> findAll(Specification<CpsFieldMasterVO> specification, Sort sort);
}