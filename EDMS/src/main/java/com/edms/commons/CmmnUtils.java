package com.edms.commons;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.lang3.math.NumberUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.codec.Base64;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * The type Cmmn utils.
 */
public class CmmnUtils {

  /**
   * Snvl string.
   *
   * @param obj         the obj
   * @param ifNullValue the if null value
   * @return the string
   */
  public static final String snvl(Object obj, String ifNullValue) {
	String s = null;
	if (isNull(obj))
	  return ifNullValue;
	s = !isNull(obj) ? String.valueOf(obj) : ifNullValue;

	return s;
  }

  /**
   * Is null boolean.
   *
   * @param obj the obj
   * @return the boolean
   */
  public static boolean isNull(Object obj) {
	boolean isTF = false;
	if (obj == null || (String.valueOf(obj).trim().length()) == 0) {
	  isTF = true;
	}
	return isTF;
  }

  /**
   * Invl int.
   *
   * @param obj         the obj
   * @param ifNullValue the if null value
   * @return the int
   */
  public static final int invl(Object obj, int ifNullValue) {
	int i = 0;
	if (isNull(obj))
	  return ifNullValue;
	i = !isNull(obj) ? Integer.valueOf(String.valueOf(obj)) : ifNullValue;

	return i;
  }

  /**
   * Is common valid set.
   *
   * @param <T>     the type parameter
   * @param toCheck the to check
   * @return the set
   */
  public static <T> Set<ConstraintViolation<T>> isCommonValid(T toCheck) {
	//JSR 303 model validation
	ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
	Validator validator = validatorFactory.getValidator();

	Set<ConstraintViolation<T>> violations = validator.validate(toCheck);
	return violations;
  }

  /**
   * Gets formated date.
   *
   * @param format the format
   * @return the formated date
   */
  public static String getFormatedDate(String format) {
	Date date = new Date();
	SimpleDateFormat dateFormat = new SimpleDateFormat(format); //yyyyMMdd, yyyyMMddHHmmss 등등
	return dateFormat.format(date);
  }

  /**
   * Convert parameter map map.
   *
   * @param request the request
   * @return the map
   */
  public static Map convertParameterMap(HttpServletRequest request) {
	Map parameterMap = new HashMap();
	Enumeration enums = request.getParameterNames();
	while (enums.hasMoreElements()) {
	  String paramName = (String) enums.nextElement();
	  String[] parameters = request.getParameterValues(paramName);
	  if (parameters.length > 1) {
		parameterMap.put(paramName, parameters);
	  } else {
		parameterMap.put(paramName, parameters[0]);
	  }
	}

	return parameterMap;
  }

  /**
   * Convert json to list list.
   *
   * @param jsonStr the json str
   * @return the list
   */
  public static List convertJsonToList(String jsonStr) {
	ObjectMapper objectMapper = new ObjectMapper();
	try {
	  return objectMapper.readValue(jsonStr, new TypeReference<List>() {
	  });
	} catch (IOException e) {
	  e.printStackTrace();
	}
	return null;
  }

  /**
   * Convert map list to bean list.
   *
   * @param <T>   the type parameter
   * @param <C>   the type parameter
   * @param list  the list
   * @param clazz the clazz
   * @return the list
   */
  public static <T extends Map<String, Object>, C> List<C> convertMapListToBean(List<T> list, Class<C> clazz) {
	List<C> beanList = new ArrayList<C>();
	for (Map<String, Object> source : list) {
	  C bean = convertMapToBean(source, clazz);
	  beanList.add(bean);
	}
	return beanList;
  }

  /**
   * Convert map to bean c.
   *
   * @param <C>         the type parameter
   * @param source      the source
   * @param targetClass the target class
   * @return the c
   */
  public static <C> C convertMapToBean(Map<String, Object> source, Class<C> targetClass) {
	C bean = null;
	try {
	  bean = targetClass.newInstance();
	  PropertyDescriptor[] targetPds = BeanUtils.getPropertyDescriptors(targetClass);
	  for (PropertyDescriptor desc : targetPds) {
		Object value = source.get(desc.getName());
		if (!CmmnUtils.isNull(value)) {
		  Method writeMethod = desc.getWriteMethod();
		  if (!CmmnUtils.isNull(writeMethod)) {
			if (String.valueOf(desc.getPropertyType()).equals("class java.math.BigInteger")) {
			  writeMethod.invoke(bean, NumberUtils.createBigInteger(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.math.BigDecimal")) {
			  writeMethod.invoke(bean, NumberUtils.createBigDecimal(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.lang.Number")) {
			  writeMethod.invoke(bean, NumberUtils.createNumber(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.lang.Integer")) {
			  writeMethod.invoke(bean, NumberUtils.createInteger(String.valueOf(value)));
			} else {
			  writeMethod.invoke(bean, new Object[]{value});
			}
		  }
		}
	  }
	} catch (InstantiationException e) {
	  new IllegalArgumentException("Cannot initiate class", e);
	} catch (IllegalAccessException e) {
	  new IllegalStateException("Cannot access the property", e);
	} catch (InvocationTargetException e) {
	  new IllegalArgumentException(e);
	}
	return bean;
  }

  /**
   * Convert map list to bean list.
   *
   * @param <T>         the type parameter
   * @param <C>         the type parameter
   * @param list        the list
   * @param clazz       the clazz
   * @param detailClass the detail class
   * @param subKey      the sub key
   * @return the list
   */
  public static <T extends Map<String, Object>, C> List<C> convertMapListToBean(List<T> list, Class<C> clazz, Class detailClass, String subKey) {
	List<C> beanList = new ArrayList<C>();
	for (Map<String, Object> source : list) {
	  C bean = convertMapToBean(source, clazz, detailClass, subKey);
	  beanList.add(bean);
	}
	return beanList;
  }

  /**
   * Convert map to bean c.
   *
   * @param <C>         the type parameter
   * @param source      the source
   * @param targetClass the target class
   * @param detailClass the detail class
   * @param subKey      the sub key
   * @return the c
   */
  public static <C> C convertMapToBean(Map<String, Object> source, Class<C> targetClass, Class detailClass, String subKey) {
	C bean = null;
	try {
	  bean = targetClass.newInstance();

	  PropertyDescriptor[] targetPds = BeanUtils.getPropertyDescriptors(targetClass);
	  for (PropertyDescriptor desc : targetPds) {
		Object value = source.get(desc.getName());
		if (!CmmnUtils.isNull(value)) {
		  Method writeMethod = desc.getWriteMethod();
		  if (!CmmnUtils.isNull(writeMethod)) {
			if (String.valueOf(desc.getPropertyType()).equals("class java.math.BigInteger")) {
			  writeMethod.invoke(bean, NumberUtils.createBigInteger(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.math.BigDecimal")) {
			  writeMethod.invoke(bean, NumberUtils.createBigDecimal(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.lang.Number")) {
			  writeMethod.invoke(bean, NumberUtils.createNumber(String.valueOf(value)));
			} else if (String.valueOf(desc.getPropertyType()).equals("class java.lang.Integer")) {
			  writeMethod.invoke(bean, NumberUtils.createInteger(String.valueOf(value)));
			} else if (desc.getName().equals(subKey)) {
			  ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
			  Map convertMap = new HashMap();
			  convertMap.put(subKey, value);
			  writeMethod.invoke(bean, mapper.convertValue(convertMap, detailClass));
			} else {
			  writeMethod.invoke(bean, new Object[]{value});
			}
		  }
		}
	  }
	} catch (InstantiationException e) {
	  new IllegalArgumentException("Cannot initiate class", e);
	} catch (IllegalAccessException e) {
	  new IllegalStateException("Cannot access the property", e);
	} catch (InvocationTargetException e) {
	  new IllegalArgumentException(e);
	}
	return bean;
  }

//  public static <C> C convertMapToBean(Map<String, Object> source, Class<C> targetClass) {
//	C bean = null;
//	try {
//	  bean = targetClass.newInstance();
//	  PropertyDescriptor[] targetPds = BeanUtils.getPropertyDescriptors(targetClass);
//	  for (PropertyDescriptor desc : targetPds) {
//		Object value = source.get(desc.getName());
//		if (!CmmnUtils.isNull(value)) {
//		  Method writeMethod = desc.getWriteMethod();
//		  if (!CmmnUtils.isNull(writeMethod)) {
//			//if (value instanceof Number) {
//			if (desc.getPropertyType().toString().equals("class java.math.BigInteger")) {
//			  writeMethod.invoke(bean, BigInteger.valueOf((NumberUtils.createNumber(String.valueOf(value))).longValue()));
//			} else {
//			  writeMethod.invoke(bean, new Object[]{value});
//			}
//		  }
//		}
//	  }
//	} catch (InstantiationException e) {
//	  new IllegalArgumentException("Cannot initiate class", e);
//	} catch (IllegalAccessException e) {
//	  new IllegalStateException("Cannot access the property", e);
//	} catch (InvocationTargetException e) {
//	  new IllegalArgumentException(e);
//	}
//	return bean;
//  }

  /**
   * Is contains map value boolean.
   *
   * @param args   the args
   * @param source the source
   * @return the boolean
   */
  public static boolean isContainsMapValue(Map args, String source) {
	return args.containsKey(source) && !CmmnUtils.isNull(args.get(source));
  }

  /**
   * Return body map.
   *
   * @param <T> the type parameter
   * @param vo  the vo
   * @return the map
   */
  public static <T> Map returnBody(T vo) {
	Map returnMap = new HashMap();
	returnMap.put("content", vo);
	return returnMap;
  }

  /**
   * Convert object to map map.
   *
   * @param obj the obj
   * @return the map
   */
  public static Map convertObjectToMap(Object obj) {
	try {
	  Field[] fields = obj.getClass().getDeclaredFields();
	  Map resultMap = new HashMap();
	  for (int i = 0, n = fields.length - 1; i <= n; i++) {
		fields[i].setAccessible(true);
		resultMap.put(fields[i].getName(), fields[i].get(obj));
	  }
	  return resultMap;
	} catch (IllegalArgumentException e) {
	  e.printStackTrace();
	} catch (IllegalAccessException e) {
	  e.printStackTrace();
	}
	return null;
  }

  /**
   * Convert chosung string.
   *
   * @param str the str
   * @return the string
   */
  public static String convertChosung(String str) {
	StringBuilder sb = new StringBuilder();

	char[] charArray = str.toCharArray();
	for (char c : charArray) {
	  if (KoreanChar.isSyllable(c)) {
		sb.append(getUnicodeKoreanChosung((int) KoreanChar.getChoseong(c)));
	  } else {
		sb.append(getUnicodeKoreanChosung((int) c));
	  }
	}
	return String.valueOf(sb);
  }

  private static String getUnicodeKoreanChosung(int c) {
	String rtn = "";
	switch (c) {
	  case 4352:
	  case 12593:  // ㄱ
		rtn = "[\\uAC00-\\uAE4B]";
		break;
	  case 4353:
	  case 12594: // ㄲ
		rtn = "[\\uAE4C-\\uB097]";
		break;
	  case 4354: // ㄴ
	  case 12596:
		rtn = "[\\uB098-\\uB2E3]";
		break;
	  case 4355: // ㄷ
	  case 12599:
		rtn = "[\\uB2E4-\\uB52F]";
		break;
	  case 4356: // ㄸ
	  case 12600:
		rtn = "[\\uB530-\\uB77B]";
		break;
	  case 4357: // ㄹ
	  case 12601:
		rtn = "[\\uB77C-\\uB9C7]";
		break;
	  case 4358: // ㅁ
	  case 12609:
		rtn = "[\\uB9C8-\\uBC13]";
		break;
	  case 4359: // ㅂ
	  case 12610:
		rtn = "[\\uBC14-\\uBE5F]";
		break;
	  case 4360: // ㅃ
	  case 12611:
		rtn = "[\\uBE60-\\uC0AB]";
		break;
	  case 4361: // ㅅ
	  case 12613:
		rtn = "[\\uC0AC-\\uC2F7]";
		break;
	  case 4362: // ㅆ
	  case 12614:
		rtn = "[\\uC2F8-\\uC543]";
		break;
	  case 4363: // ㅇ
	  case 12615:
		rtn = "[\\uC544-\\uC78F]";
		break;
	  case 4364: // ㅈ
	  case 12616:
		rtn = "[\\uC790-\\uC9DB]";
		break;
	  case 4365: // ㅉ
	  case 12617:
		rtn = "[\\uC9DC-\\uCC27]";
		break;
	  case 4366: // ㅊ
	  case 12618:
		rtn = "[\\uCC28-\\uCE73]";
		break;
	  case 4367: // ㅋ
	  case 12619:
		rtn = "[\\uCE74-\\uD0BF]";
		break;
	  case 4368: // ㅌ
	  case 12620:
		rtn = "[\\uD0C0-\\uD30B]";
		break;
	  case 4369: // ㅍ
	  case 12621:
		rtn = "[\\uD30C-\\uD557]";
		break;
	  case 4370: // ㅎ
	  case 12622:
		rtn = "[\\uD558-\\uD7A3]";
		break;
	  default:
		String str = String.format("\\u%04X", c);
		rtn = "[" + str + "-" + str + "]";
		break;
	}
	return rtn;
  }

  /**
   * Gets orders.
   *
   * @param args        the args
   * @param defaultSort the default sort
   * @return the orders
   * @throws JSONException the json exception
   */
  public static Sort getOrders(Map args, Sort defaultSort) throws JSONException {
	Sort sort = defaultSort;
	if (CmmnUtils.isNull(args.get("sort"))) {
	  sort = defaultSort;
	} else {
	  JSONArray jsonObj = new JSONArray(String.valueOf(args.get("sort")));
	  for (int i = 0, n = jsonObj.length(); i < n; i++) {
		Sort convertSort = new Sort(jsonObj.getJSONObject(i).get("direction").equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, String.valueOf(jsonObj.getJSONObject(i).get("property")));
		sort = sort.and(convertSort);
	  }
	}
	return sort;
  }

  /**
   * Gets user info.
   *
   * @param request the request
   * @param str     the str
   * @return the user info
   */
  public final static Object getUserInfo(HttpServletRequest request, String str) {
	HttpSession session = request.getSession();
	return session.getAttribute(str);
  }

  /**
   * Gets user auth.(권한값 리턴)
   *
   * @param obj the obj
   * @return the user auth
   */
  public static String getUserAuth(String obj) {
	String returnValue;
	if (obj.contains("A") || obj.contains("B")) {
	  returnValue = "admin";
	} else {
	  returnValue = "normal";
	}
	return returnValue;
  }

  /**
   * Convert map source to map map.
   *
   * @param map    the map
   * @param source the source
   * @return the map
   */
  public static Map<String, Object> convertMapSourceToMap(Map map, String source) {
	Gson gson = new Gson();
	Map<String, Object> jsonObject = gson.fromJson(CmmnUtils.convertMapToJsonString(map),
			new TypeToken<Map<String, Object>>() {
			}.getType());
	return (Map) jsonObject.get(source);
  }

  /**
   * Convert map to json string string.
   *
   * @param map the map
   * @return the string
   */
  public static String convertMapToJsonString(Map map) {
	ObjectMapper objectMapper = new ObjectMapper();
	try {
	  return objectMapper.writeValueAsString(map);
	} catch (JsonProcessingException e) {
	  e.printStackTrace();
	}
	return null;
  }

  /**
   * Convert map source to list list.
   *
   * @param map    the map
   * @param source the source
   * @return the list
   */
  public static List<Map<String, Object>> convertMapSourceToList(Map map, String source) {
	Gson gson = new Gson();
	Map<String, Object> jsonObject = gson.fromJson(CmmnUtils.convertMapToJsonString(map),
			new com.google.gson.reflect.TypeToken<Map<String, Object>>() {
			}.getType());
	return (List) jsonObject.get(source);
  }

  /**
   * Rand string string buffer.
   *
   * @param size the size
   * @return the string buffer
   */
  public static StringBuffer randString(int size) {
	Random rnd = new Random();
	StringBuffer buf = new StringBuffer();
	for (int i = 0; i < size; i++) {
	  if (rnd.nextBoolean()) {
		buf.append((char) ((int) (rnd.nextInt(26)) + 97));
	  } else {
		buf.append((rnd.nextInt(10)));
	  }
	}
	return buf;
  }

  /**
   * Replace map sc map.
   *
   * @param map the map
   * @return the map
   */
  public static Map replaceMapSc(Map map) {
//    return (Map) map.entrySet().stream()
//			.map(a->replaceSc(String.valueOf(a)))
//			.collect(Collectors.toMap(Function.identity(), Object::toString));
	for (Object key : map.keySet()) {
	  map.put(key, replaceSc(String.valueOf(map.get(key))));
	}
	return map;
  }

  /**
   * Replace sc string.
   *
   * @param str the str
   * @return the string
   */
  public static String replaceSc(String str) {
	// String match = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s]";
	String match = "%";
	str = str.replaceAll(match, "");
	return str;
  }

  /**
   * Encrypt md 5 string.
   *
   * @param s the s
   * @return the string
   */
  public static String encryptMD5(String s) {
	return DigestUtils.md5Hex(s);
  }

  /**
   * Encrypt url string.
   *
   * @param type    the type
   * @param str     the str
   * @param charset the charset
   * @return the string
   */
  public static String encryptUrl(String type, String str, String charset) {
	String result = null;
	URLCodec urlCodec = new URLCodec();
	try {
	  if (type.equals("ENC")) {
		result = urlCodec.encode(str, charset);
	  } else if (type.equals("DEC")) {
		result = urlCodec.decode(str, charset);
	  }
	} catch (DecoderException e) {
	  e.printStackTrace();
	} catch (UnsupportedEncodingException e) {
	  e.printStackTrace();
	}
	return result;
  }

  /**
   * Encrypt base 64 string.
   *
   * @param type    the type
   * @param str     the str
   * @param charset the charset
   * @return the string
   */
  public static String encryptBase64(String type, String str, String charset) {
	String result = null;
	if (CmmnUtils.isNull(str)) return result;
	if (type.equals("ENC")) {
	  result = "seinEncrypt" + new String(Base64.encode(str.getBytes(StandardCharsets.UTF_8)));
	} else if (type.equals("DEC")) {
	  String convStr = str.substring(7);
	  result = new String(Base64.decode(convStr.getBytes(StandardCharsets.UTF_8)), Charset.forName(charset));
	}
	return result;
  }

  /**
   * Encrypt base 64 old string.
   *
   * @param type    the type
   * @param str     the str
   * @param charset the charset
   * @return the string
   */
  public String encryptBase64Old(String type, String str, String charset) {
	String result = null;
	if (CmmnUtils.isNull(str)) return result;
	if (type.equals("ENC")) {
	  result = new String(org.apache.commons.codec.binary.Base64.encodeBase64(str.getBytes()));
	} else if (type.equals("DEC")) {
	  result = new String(org.apache.commons.codec.binary.Base64.decodeBase64(str.getBytes()));
	}
	return result;
  }

  /**
   * Encode url encode and base 64 string.
   *
   * @param str the str
   * @return the string
   */
  public static String encodeUrlEncodeAndBase64(String str) {
	if (CmmnUtils.isNull(str) || str.equals("")) {
	  return "";
	} else {
	  try {
		BASE64Encoder en = new BASE64Encoder();
		str = URLEncoder.encode(str, "UTF-8");
		str = en.encode(str.getBytes());
	  } catch (Exception e) {
		e.printStackTrace();
	  }
	}
	return str;
  }

  /**
   * Decode url decode and base 64 string.
   *
   * @param str the str
   * @return the string
   */
  public static String decodeUrlDecodeAndBase64(String str) {
	if (CmmnUtils.isNull(str) || str.equals("")) {
	  return "";
	} else {
	  try {
		BASE64Decoder de = new BASE64Decoder();
		byte[] deStr = de.decodeBuffer(str);
//                str = URLDecoder.decode(deStr.toString(), "UTF-8");
		str = URLDecoder.decode(new String(deStr), "UTF-8");
	  } catch (Exception e) {
		e.printStackTrace();
	  }
	}
	return str;
  }

  /**
   * Check charset.
   *
   * @param type the type
   * @param str  the str
   */
  public void checkCharset(String type, String str) {
	String text = str;
	String encode = "";
	String[] charsets = {"UTF-8", "EUC-KR", "ISO-8859-1", "CP1251", "KSC5601"};

	for (String charset : charsets) {
	  encode = new String(Base64.encode(text.getBytes(StandardCharsets.UTF_8)));
	  System.err.println("origin[" + text + "], " + "encoded[" + encode + "], charset[" + charset + "]");
	}
  }

  /**
   * String contains item from list boolean.
   *
   * @param inputStr the input str
   * @param items    the items
   * @return the boolean
   */
  public static boolean stringContainsItemFromList(String inputStr, String[] items) {
	return Arrays.stream(items).parallel().anyMatch(inputStr::contains);
  }

  /**
   * Gets server ip addr.(서버IP 리턴)
   *
   * @return the server ip addr
   */
  public static String getServerIpAddr() {
	InetAddress local = null;
	String returnIpAddr = null;
	try {
	  local = InetAddress.getLocalHost();
	  returnIpAddr = local.getHostAddress();
	} catch (UnknownHostException e) {
	  e.printStackTrace();
	}

	return returnIpAddr;
  }

  /**
   * Gets client ip addr.(클라이언트IP 리턴)
   * 속도 지연요소(개선필요)
   *
   * @param request the request
   * @return the client ip addr
   */
  public static String getClientIpAddr(HttpServletRequest request) {
		String clientIp = request.getHeader("X-Forwarded-For");
		if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
			clientIp = request.getHeader("Proxy-Client-IP");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("HTTP_CLIENT_IP");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("X-Real-IP");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("X-RealIP");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getHeader("REMOTE_ADDR");
	    }
	    if (CmmnUtils.isNull(clientIp) || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
	    	clientIp = request.getRemoteAddr();
	    }

	  return clientIp;
  }

  /**
   * Encrypt custom base 64 string.
   *
   * @param obj the obj
   * @return the string
   */
  public static String encryptCustomBASE64(Object obj) {
	String returnVal = "";
	if (obj instanceof String) {
	  String str;
	  str = (String) obj;
	  if (str.length() == 0) return "";
			/* base64 encoding */
	  byte[] encoded = Base64.encode(str.getBytes(StandardCharsets.UTF_8));

	  returnVal = "seinEncrypt" + new String(encoded);
	}
	return returnVal;
  }

  /**
   * Decrypt custom base 64 string.
   *
   * @param obj the obj
   * @return the string
   */
  public static String decryptCustomBASE64(Object obj) {
	String returnVal = "";
	if (obj instanceof String) {
	  String str;
	  str = (String) obj;
	  if (str.length() == 0) return "";
	  String originalStr = str.substring(11, str.length());
			/* base64 decoding */
	  byte[] decoded = Base64.decode(originalStr.getBytes(StandardCharsets.UTF_8));

	  returnVal = new String(decoded);
	}
	return returnVal;
  }
}