package com.edms.biz.systemManagement;

import com.edms.domains.UserMenuAuthVO;
import com.edms.domains.UserUserInfoVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Repository
public interface UserMenuAuthDao extends JpaRepository<UserMenuAuthVO, BigDecimal> {
  List<UserMenuAuthVO> findAll(Specification<UserMenuAuthVO> specification, Pageable pageable);

  List<UserMenuAuthVO> findByUserKeyAndUseYn(BigDecimal userKey, String useYn);

  List<UserMenuAuthVO> findByUserKey(UserUserInfoVO userKey);

  @Query(value = "WITH AUTH_MENUINFO(menuKey, parentKey, menuKorName, menuEngName, menuPath, menuImageClass, sortKey, sortKorMenu, sortEngMenu, sortPath, sortOrder, subSortOrder, useYn) AS (\n" +
          "\tSELECT\n" +
          "\t\tmenuKey\n" +
          "\t\t, parentKey\n" +
          "\t\t, menuKorName\n" +
          "\t\t, menuEngName\n" +
          "\t\t, menuPath\n" +
          "\t\t, menuImageClass\n" +
          "\t\t, CONVERT(VARCHAR(4000), menuKey) sortKey\n" +
          "\t\t, CONVERT(VARCHAR(4000), menuKorName) sortKorMenu\n" +
          "\t\t, CONVERT(VARCHAR(4000), menuEngName) sortEngMenu\n" +
          "\t\t, CONVERT(VARCHAR(4000), ISNULL(menuPath, '') ) sortPath\n" +
          "\t\t, sortOrder\n" +
          "\t\t, subSortOrder\n" +
          "\t\t, useYn\n" +
          "\tFROM [GEOWS].[dbo].[TBR_SYS_Menu] WITH (NOLOCK)\n" +
          "\tWHERE parentKey = 0\n" +
          "\tAND useYn = 'Y'\n" +
          "\n" +
          "\tUNION ALL\n" +
          "\n" +
          "\tSELECT\n" +
          "\t\t\tb.menuKey\n" +
          "\t\t\t, b.parentKey\n" +
          "\t\t\t, b.menuKorName\n" +
          "\t\t\t, b.menuEngName\n" +
          "\t\t\t, b.menuPath\n" +
          "\t\t\t, b.menuImageClass\n" +
          "\t\t\t, CONVERT(VARCHAR(4000), CONVERT(NVARCHAR,c.sortKey) + ' > ' + CONVERT(VARCHAR(4000), b.menuKey)) sortKey\n" +
          "\t\t\t, CONVERT(VARCHAR(4000), CONVERT(NVARCHAR,c.sortKorMenu) + ' > ' + CONVERT(VARCHAR(4000), b.menuKorName)) sortKorMenu\n" +
          "\t\t\t, CONVERT(VARCHAR(4000), CONVERT(NVARCHAR,c.sortEngMenu) + ' > ' + CONVERT(VARCHAR(4000), b.menuEngName)) sortEngMenu\n" +
          "\t\t\t, CONVERT(VARCHAR(4000), CONVERT(NVARCHAR,ISNULL(c.sortPath,'')) + ' > ' + CONVERT(VARCHAR(4000), ISNULL(b.menuPath, '') )) sortPath\n" +
          "\t\t\t, b.sortOrder\n" +
          "\t\t\t, b.subSortOrder\n" +
          "\t\t\t, b.useYn\n" +
          "\tFROM [GEOWS].[dbo].[TBR_SYS_Menu] b WITH (NOLOCK), AUTH_MENUINFO c\n" +
          "\tWHERE b.parentKey = c.menuKey\n" +
          "\tAND b.useYn = 'Y'\n" +
          ")\n" +
          "SELECT\ta.menuKey,\n" +
          "\t\ta.parentKey, a.menuKorName, a.menuEngName, a.menuPath, a.menuImageClass,\n" +
          "\t\ta.sortKey, a.sortKorMenu, a.sortEngMenu, a.sortPath, a.sortOrder, a.subSortOrder,\n" +
          "\t\tLEN(a.sortKey)-LEN(REPLACE(a.sortKey,'>','')) AS 'lvl',\n" +
          "\t\tSTUFF((SELECT ',' + eventCode FROM [GEOWS].[dbo].[TBR_User_MenuAuth] WITH (NOLOCK) WHERE useYn = 'Y' AND (menuKey=b.menuKey) FOR XML PATH ('')),1,1,'') AS 'menuAuth'\n" +
          "FROM\tAUTH_MENUINFO a WITH (NOLOCK)\n" +
          "\t\t\tINNER JOIN [GEOWS].[dbo].[TBR_User_MenuAuth] b WITH (NOLOCK)\n" +
          "\t\t\tON a.menuKey = b.menuKey\n" +
          "\t\t\tAND a.useYn = 'Y'\n" +
          "\t\t\tAND b.useYn = 'Y'\n" +
          "WHERE b.userKey = CAST( :userKey AS VARCHAR) \n" +
          "GROUP BY a.menuKey, a.parentKey, a.menuKorName, a.menuEngName, a.menuPath, a.menuImageClass,\n" +
          "\t\ta.sortKey, a.sortKorMenu, a.sortEngMenu, a.sortPath, a.sortOrder, a.subSortOrder,\n" +
          "\t\tLEN(a.sortKey)-LEN(REPLACE(a.sortKey,'>','')), b.menuKey\n" +
          "ORDER BY a.sortOrder, a.subSortOrder", nativeQuery = true)
  List<Map> findUserXAuthXMenuList(@Param("userKey") String userKey);
}