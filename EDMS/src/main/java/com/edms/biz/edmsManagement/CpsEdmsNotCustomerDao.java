package com.edms.biz.edmsManagement;

import com.edms.domains.CpsEdmsNotCustomerVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsEdmsNotCustomerDao extends JpaRepository<CpsEdmsNotCustomerVO, BigDecimal>{
	Page<CpsEdmsNotCustomerVO> findAll(Pageable pageable);

	List<CpsEdmsNotCustomerVO> findAll(Specification<CpsEdmsNotCustomerVO> specification, Pageable pageable);

	List<CpsEdmsNotCustomerVO> findAll(Specification<CpsEdmsNotCustomerVO> specification, Sort sort);
}