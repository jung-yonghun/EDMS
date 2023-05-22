package com.edms.config.dataSource;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan(value="com.edms.biz1", sqlSessionFactoryRef="sqlSessionFactory1")
public class BdataSourceConfig {
	@Bean(name = "readyDataSource")
	@ConfigurationProperties(prefix = "ready.datasource")
	public DataSource readyDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean(name = "sqlSessionFactory1")
	public SqlSessionFactory sqlSessionFactory1(@Autowired @Qualifier("readyDataSource") DataSource dataSource, ApplicationContext applicationContext)  throws Exception {
		SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
		factoryBean.setDataSource(dataSource);
		factoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/mapper/ready/*.xml"));

		return factoryBean.getObject();
	}

	@Bean
	public SqlSessionTemplate SqlSessionTemplate1(@Autowired @Qualifier("sqlSessionFactory1") SqlSessionFactory factory) {
		return new SqlSessionTemplate(factory);
	}
}