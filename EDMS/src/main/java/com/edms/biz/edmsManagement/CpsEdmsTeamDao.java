package com.edms.biz.edmsManagement;

import com.edms.domains.CpsEdmsTeamVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsEdmsTeamDao extends JpaRepository<CpsEdmsTeamVO, BigDecimal>{
	Page<CpsEdmsTeamVO> findAll(Pageable pageable);

	List<CpsEdmsTeamVO> findAll(Specification<CpsEdmsTeamVO> specification, Sort sort);
}