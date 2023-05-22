package com.edms.biz.userManagement;

import com.edms.domains.UserTeamXUserVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * The interface System notice dao.
 */
@Repository
public interface TeamXUserDao extends JpaRepository<UserTeamXUserVO, BigDecimal> {
  Page<UserTeamXUserVO> findAll(Pageable pageable);

  /**
   * Find by ut use yn list.
   *
   * @param utUseYn the ut use yn
   * @return the list
   */
  List<UserTeamXUserVO> findByUtUseYn(String utUseYn);

  /**
   * Find all list.
   *
   * @param specs the specs
   * @return the list
   */
  List<UserTeamXUserVO> findAll(Specification<UserTeamXUserVO> specs);
}