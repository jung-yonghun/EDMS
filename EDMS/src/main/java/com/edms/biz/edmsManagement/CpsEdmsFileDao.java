package com.edms.biz.edmsManagement;

import com.edms.domains.CpsEdmsAttachFileVO;

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
public interface CpsEdmsFileDao extends JpaRepository<CpsEdmsAttachFileVO, BigDecimal> {
	Page<CpsEdmsAttachFileVO> findAll(Pageable pageable);

	List<CpsEdmsAttachFileVO> findAll(Specification<CpsEdmsAttachFileVO> specification, Sort sort);

	Integer countByEdmsNoAndEdmsParentGbnAndEdmsFileCategoryAndUseYn(String edmsNo, String edmsParentGbn, String edmsFileCategory, String useYn);

	@Transactional(readOnly = true)
	CpsEdmsAttachFileVO findTop1BySDAAKey(BigDecimal sDAAKey);

	@Transactional(readOnly = true)
	CpsEdmsAttachFileVO findTop1ByEdmsMasterKey(String edmsMasterKey);

	@Transactional(readOnly = true)
	CpsEdmsAttachFileVO findTop1ByEdmsSingoNo(String edmsSingoNo);

	@Transactional(readOnly = true)
	CpsEdmsAttachFileVO findTop1ByEdmsNo(String edmsNo);

	@Transactional(readOnly = true)
	CpsEdmsAttachFileVO findByEdmsNoAndEdmsJisaCode(String edmsNo, String edmsJisaCode);
}