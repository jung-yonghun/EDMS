package com.edms.biz.edmsManagement;

import com.edms.domains.CpsEdmsMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsEdmsMasterDao extends JpaRepository<CpsEdmsMasterVO, BigDecimal>{
	Page<CpsEdmsMasterVO> findAll(Pageable pageable);

	List<CpsEdmsMasterVO> findAll(Specification<CpsEdmsMasterVO> specification, Sort sort);

	@Transactional(readOnly = true)
	CpsEdmsMasterVO findTop1ByEdmsKey(BigDecimal edmsKey);

	@Transactional(readOnly = true)
	CpsEdmsMasterVO findTop1ByEdmsSingoNum(String edmsSingoNum);

	@Transactional(readOnly = true)
	CpsEdmsMasterVO findByEdmsGubunAndEdmsComCodeAndUseYn(String edmsGubun, String edmsComCode, String useYn);

	@Transactional(readOnly = true)
	CpsEdmsMasterVO findTop1ByEdmsGubunAndEdmsComCodeAndEdmsNumAndUseYnOrderByEdmsKeyDesc(String edmsGubun, String edmsComCode, String edmsNum, String useYn);

	@Transactional(readOnly = true)
	CpsEdmsMasterVO findTop1ByEdmsGubunAndEdmsComCodeAndUseYnOrderByEdmsKey(String edmsGubun, String edmsComCode, String useYn);

	List<CpsEdmsMasterVO> findByEdmsGubunAndEdmsComCodeAndEdmsNumAndUseYn(String edmsGubun, String edmsComCode, String edmsNum, String useYn);
}