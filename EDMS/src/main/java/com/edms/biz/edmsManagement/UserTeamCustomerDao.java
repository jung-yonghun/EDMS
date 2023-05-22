package com.edms.biz.edmsManagement;

import com.edms.domains.UserTeamXCustomerVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * The interface User team customer dao.
 */
@Repository
public interface UserTeamCustomerDao extends JpaRepository<UserTeamXCustomerVO, BigDecimal> {
  List<UserTeamXCustomerVO> findAll(Specification<UserTeamXCustomerVO> specs);
}