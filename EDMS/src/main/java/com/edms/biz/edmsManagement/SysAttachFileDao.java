package com.edms.biz.edmsManagement;

import com.edms.domains.SysAttachFileVO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SysAttachFileDao extends JpaRepository<SysAttachFileVO, BigDecimal> {
  List<SysAttachFileVO> findAll(Specification<SysAttachFileVO> specification, Pageable pageable);
}