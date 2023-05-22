package com.edms.biz.systemManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMenuAuthMapper {
  List<Map> findUserXAuthXMenuList(Map args);

  void syncUserXAuthXMenuList(Map args);

  void syncPassword(Map args);

  void callProcDeleteUser(Map args);
}