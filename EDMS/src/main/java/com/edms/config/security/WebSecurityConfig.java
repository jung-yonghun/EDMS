package com.edms.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  Environment environment;
//  @Autowired
//  PasswordEncoder passwordEncoder;
  @Autowired
  private HttpLogoutSuccessHandler httpLogoutSuccessHandler;

//    @Autowired
//    UserDetailsService userDetailsService;
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
//    }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
	CharacterEncodingFilter filter = new CharacterEncodingFilter();
	filter.setEncoding("UTF-8");
	filter.setForceEncoding(true);
	httpSecurity.addFilterBefore(filter, CsrfFilter.class);

	httpSecurity.httpBasic()
			.and()
			.csrf().disable()
//			.csrf().csrfTokenRepository(csrfTokenRepository())
//			.and()
			.headers().frameOptions().disable()
			.and()
			.authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**", "/resources/**", "/webjars/**").permitAll()
			.and()
			.authorizeRequests().antMatchers("/**").permitAll()
			.and()
			.logout().logoutUrl("/logoutAction").invalidateHttpSession(true).logoutSuccessHandler(httpLogoutSuccessHandler).permitAll()
			.and()
			.sessionManagement().maximumSessions(1).maxSessionsPreventsLogin(true).expiredUrl(environment.getProperty("login.page"));
  }

  // ROLE Hieracry
//    @Autowired
//	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
//	}


  private CsrfTokenRepository csrfTokenRepository() {
	HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
	repository.setSessionAttributeName("_csrf");
	return repository;
  }
}