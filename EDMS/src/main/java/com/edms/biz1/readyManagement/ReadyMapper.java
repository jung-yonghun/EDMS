package com.edms.biz1.readyManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReadyMapper{
	List<Map> selectImportList(Map args);

	List<Map> selectImportFieldStatusList(Map args);

	List<Map> selectImportJungFieldStatusList(Map args);
}