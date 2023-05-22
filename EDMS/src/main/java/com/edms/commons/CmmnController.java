package com.edms.commons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import java.util.Locale;
import java.util.Map;

public class CmmnController {
  @Autowired
  private MessageSource messageSource;

  public void checkPagingParamsForMapper(Map map) throws Exception {
	String _pageNumber = CmmnUtils.isContainsMapValue(map, "_pageNumber") ? String.valueOf(map.get("_pageNumber")) : null;
	String _pageRow = CmmnUtils.isContainsMapValue(map, "_pageRow") ? String.valueOf(map.get("_pageRow")) : null;
	String page = CmmnUtils.isContainsMapValue(map, "page") ? String.valueOf(map.get("page")) : null;
	String size = CmmnUtils.isContainsMapValue(map, "size") ? String.valueOf(map.get("size")) : null;
	if (CmmnUtils.isNull(_pageNumber) || CmmnUtils.isNull(_pageRow) || CmmnUtils.isNull(page) || CmmnUtils.isNull(size)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "필수검색조건 오류(mapper)", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}
  }
}
