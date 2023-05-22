package com.edms.biz.userManagement;

import com.edms.domains.CpsUserInfoVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface UserInfoDao extends JpaRepository<CpsUserInfoVO, BigDecimal> {
  Page<CpsUserInfoVO> findAll(Specification<CpsUserInfoVO> specification, Pageable pageable);

  CpsUserInfoVO findByUserIdAndUserPwAndUseYn(String userId, String userPw, String useYn);

  CpsUserInfoVO findByUserIdAndUserNameAndUserEmail(String userId, String userName, String userEmail);

  CpsUserInfoVO findByUserNameAndUserEmail(String userName, String userEmail);

  CpsUserInfoVO findByUserEmailAndUseYn(String userEmail, String useYn);
}