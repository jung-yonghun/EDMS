package com.edms.biz1.readyManagement;

import com.edms.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class ReadyManagementService{
	@Autowired
	@Qualifier("SqlSessionTemplate1")
	private SqlSession sqlSession;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectImportList(Map args) throws Exception{
		return sqlSession.getMapper(ReadyMapper.class).selectImportList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ReadyMapper.class).selectImportFieldStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportJungFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ReadyMapper.class).selectImportJungFieldStatusList(CmmnUtils.replaceMapSc(args));
	}
}