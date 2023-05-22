package com.edms.commons;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Cmmn specs.
 */
public class CmmnSpecs {

  /**
   * Eq string spec specification.
   *
   * @param str         the str
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> eqStringSpec(String str, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.equal(root.get(destination), str);
	  }
	};
  }

  /**
   * Before like string spec specification.
   *
   * @param str         the str
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> beforeLikeStringSpec(String str, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.like(root.get(destination), "%" + str);
	  }
	};
  }

  /**
   * After like string spec specification.
   *
   * @param str         the str
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> afterLikeStringSpec(String str, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.like(root.get(destination), str + "%");
	  }
	};
  }

  /**
   * Both like string spec specification.
   *
   * @param str         the str
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> bothLikeStringSpec(String str, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.like(root.get(destination), "%" + str + "%");
	  }
	};
  }

  /**
   * Eq number spec specification.
   *
   * @param number      the number
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> eqNumberSpec(Number number, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.equal(root.get(destination), number);
	  }
	};
  }

  /**
   * After like number spec specification.
   *
   * @param number      the number
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> afterLikeNumberSpec(Number number, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.like(root.get(destination), number + "%");
	  }
	};
  }

  /**
   * Both like number spec specification.
   *
   * @param number      the number
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> bothLikeNumberSpec(Number number, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.like(root.get(destination), "%" + number + "%");
	  }
	};
  }

  /**
   * In string list spec specification.
   *
   * @param listMap     the list map
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> inStringListSpec(List<String> listMap, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		List<Predicate> predicates = new ArrayList<>();

		for (String s : listMap) {
		  predicates.add(criteriaBuilder.like(root.get(destination), '%' + s + '%'));
		}

		return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
	  }
	};
  }

  /**
   * Ge string spec specification.
   *
   * @param str         the str
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> geStringSpec(String str, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		return criteriaBuilder.greaterThanOrEqualTo(root.get(destination), str);
	  }
	};
  }

  /**
   * Between object spec specification.
   *
   * @param fromObj     the from obj
   * @param toObj       the to obj
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> betweenObjectSpec(Object fromObj, Object toObj, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		String convertFromObj = CmmnUtils.snvl(fromObj, "").equals("") ? String.valueOf(Integer.MIN_VALUE) : String.valueOf(fromObj);
		String convertToObj = CmmnUtils.snvl(toObj, "").equals("") ? String.valueOf(Integer.MAX_VALUE) : String.valueOf(toObj);
		return criteriaBuilder.between(root.get(destination), convertFromObj, convertToObj);
	  }
	};
  }

  /**
   * In key list spec specification.
   *
   * @param list        the list
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> inKeyListSpec(List<BigDecimal> list, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		Expression<Object> expression = root.get(destination);
		Predicate predicate = expression.in(list);

		return criteriaBuilder.and(predicate);
	  }
	};
  }

  /**
   * Not in key list spec specification.
   *
   * @param list        the list
   * @param destination the destination
   * @return the specification
   */
  public static Specification<Class> notInKeyListSpec(List<BigInteger> list, String destination) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
		Expression<Object> expression = root.get(destination);
		Predicate predicate = expression.in(list);

		return criteriaBuilder.not(predicate);
	  }
	};
  }

  /**
   * In string map spec specifications.
   *
   * @param str            the str
   * @param list           the list
   * @param specifications the specifications
   * @return the specifications
   */
  public static Specifications inStringMapSpec(String str, ArrayList<String> list, Specifications specifications) {
	Map destinationMap = new HashMap();
	for (String key : list) {
	  destinationMap.put(key, key);
	}
	specifications = specifications.and(CmmnSpecs.eqMapSpec(CmmnUtils.replaceSc(str), destinationMap));

	return specifications;
  }

  /**
   * Eq map spec specification.
   *
   * @param str            the str
   * @param destinationMap the destination map
   * @return the specification
   */
  public static Specification<Class> eqMapSpec(String str, Map destinationMap) {
	return new Specification<Class>() {
	  @Override
	  public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		List<Predicate> predicates = new ArrayList<>();
		List<String> keys = new ArrayList(destinationMap.keySet());

		for (String key : keys) {
		  predicates.add(criteriaBuilder.equal(root.get(String.valueOf(destinationMap.get(key))), CmmnUtils.replaceSc(str)));
		}

		return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
	  }
	};
  }
}