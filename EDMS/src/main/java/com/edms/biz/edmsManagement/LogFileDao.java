package com.edms.biz.edmsManagement;

import com.edms.domains.LogFileVO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

/**
 * The interface Log file dao.
 */
@Repository
public interface LogFileDao extends JpaRepository<LogFileVO, BigDecimal> {
}