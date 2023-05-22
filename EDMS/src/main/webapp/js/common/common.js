// for console debugging
if (window['console'] === undefined || console.log === undefined ) {
  console = {log: function() {}, info: function() {}, warn: function () {}, error: function() {}};
} else if (!location.href.match( 'localhost' )) {
  console.log = console.info = console.warn = console.error = function () {};
}

//MBL정보 링크
function linkMBlNo(mBlNo,year){
	var url = './viewTracking.sein?'
		+ 'cargMtNo='
		+ '&mblNo=' + mBlNo
		+ '&hblNo='
		+ '&blYy=' + year.substring(0,4);

	window.open(url, mBlNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

//BL정보 링크
function linkHBlNo(blNo,year){
	var url = './viewTracking.sein?'
		+ 'cargMtNo='
		+ '&mblNo='
		+ '&hblNo=' + blNo
		+ '&blYy=' + year.substring(0,4);

	window.open(url, blNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

/* Email 유효성 체크 */
function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		$('#dlg').empty();
		$('#dlg').append("올바른 Email형식이 아닙니다.");
		$('#dlg').window('open');
		return false;
	}else{
		return true;
	}
}

function JSONtoString(object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		//        if (value)
		results.push(property.toString() + ': ' + value);
	}

	return '{' + results.join(', ') + '}';
}


/* String Util */
var nullFormatter = function(cellvalue, options, rowObject) {
    if(cellvalue === undefined || isNull(cellvalue) || cellvalue === 'NULL') {
        cellvalue = '데이터 없음';
    }

    return cellvalue;
};

function isNull(str) {
    if (str == null || str == "") return true;
    else return false;
}

String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a){
        return args[+(a.substr(1,a.length-2))||0];
    });
};

String.prototype.toNumber = function() {
	if(isNaN(parseInt(this))) {
		return 0;
	}
	else if(isNaN(parseFloat(this))) {
		return 0;
	}

	if(this.indexOf(".")) {
		return parseFloat(this);
	}
	else {
		return parseInt(this);
	}
};

Number.prototype.format = function(){
    if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};


String.prototype.toInt = function () {
	return isNaN(parseInt(this)) ? 0 : parseInt(this);
};

/* Grid Resize */
/*
 * @param string grid_id 사이즈를 변경할 그리드의 아이디
 * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
 * @param string width 그리드의 초기화 width 사이즈
 * @param string autoColWidth 컬럼 사이즈 조정(true:auto, false:사용자지정)
 */
function resizeJqGridWidth(grid_id, div_id, width, autoColWidth){
    // window에 resize 이벤트를 바인딩 한다.
    $(window).bind('resize', function() {
        // 그리드의 width 초기화
        $('#' + grid_id).setGridWidth(width, autoColWidth);
        // 그리드의 width를 div 에 맞춰서 적용
        $('#' + grid_id).setGridWidth($('#' + div_id).width(), autoColWidth ); //Resized to new width as per window
     }).trigger('resize');
}

$(document).on("click", "input[type=text]", function() {
	$(this).select();
});

var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

/*$(function(){

	$(window).bind('resize', function() {
		//clearTimeout(resizeTimer);
		//resizeTimer = setTimeout(resizeGrid, 10);
		if ($g = $('.ui-jqgrid:visible')) {
			$g.each(function(index) {
				gridId = $(this).attr('id').replace(/gbox_/g, "");
				gridParentWidth = $('#gbox_' + gridId).parent().width();

				$('#' + gridId).setGridWidth(0, true);
				$('#' + gridId).setGridWidth(gridParentWidth, true);
			});
		}
	}).trigger('resize');
});*/

$(function(){
	/*
	var resizeTimer;

	var resizeGrid = function() {
		if (grid = $('.ui-jqgrid')) {
			grid.each(function(index) {
				console.log(gridId);
				gridId = $(this).attr('id');
				gridParentWidth = $('#gbox_' + gridId).parent().width();
				$('#' + gridId).setGridWidth(gridParentWidth, true);
			});
		}
	};
	*/
});

/*
(function() {
	var orgAddRowData = $.fn.jqGrid.addRowData;

	$.jgrid.extend({
		addRowData: function(rowid, data) {
			var $t = $(this),
			res;

			if($t.getInd(rowid)) {
				throw new Error("Encountered duplicate row ID ...");
			}
			res = orgAddRowData.call (this, rowid, data);

			return res;
		},
			getDelRowData: function() {
				var $t = this[0],
				deletedRowData = $t.p.deletedRowData;

				if(deletedRowData === undefined) {deletedRowData = [];}

				return deletedRowData;
			},
			deleteRow: function(rowid) {
				var $t = this[0],
					deletedRowData = $t.p.deletedRowData;
				if(deletedRowData === undefined) {deletedRowData = [];}
				deletedRowData.push($($t).jqGrid('getRowData',rowid));
				$($t).jqGrid('delRowData',rowid );
			}
	});

})();

기존
*/

//(function() {
//	var orgAddRowData = $.fn.jqGrid.addRowData;
//
//	$.jgrid.extend({
//		addRowDataCustom: function(rowid, data) {
//			var $t = $(this),
//			res;
//
//			if($t.getInd(rowid)) {
//				throw new Error("Encountered duplicate row ID ...");
//			}
//			res = orgAddRowData.call (this, rowid, data);
//
//			return res;
//		},
//		getDelRowData: function() {
//			var $t = this[0],
//			deletedRowData = $t.p.deletedRowData;
//
//			if(deletedRowData === undefined) {deletedRowData = [];}
//
//			return deletedRowData;
//		},
//		deleteRow: function(rowid) {
//			var $t = this[0],
//				deletedRowData = $t.p.deletedRowData;
//			if(deletedRowData === undefined) {deletedRowData = [];}
//			deletedRowData.push($($t).jqGrid('getRowData',rowid));
//
//			$t.p.deletedRowData = deletedRowData;
//
//			$($t).jqGrid('delRowData',rowid );
//		}
//	});
//})();

var arrayWindow = Array();
/* popup_post */
var openWindowWithPost = function(url, windowoption, name, params) {
    var popClose = window.open("", name, windowoption);

    arrayWindow.push(popClose);

    //Hidden Form
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

	for(var key in params) {
    	//console.log(key + ' : ' + params[key]);
    	var hiddenField = document.createElement("input");
    	hiddenField.setAttribute("type", "hidden");
    	hiddenField.setAttribute("id", key);
    	hiddenField.setAttribute("name", key);
    	hiddenField.setAttribute("value", params[key]);

    	form.appendChild(hiddenField);
    }
	var csrfToken = $("meta[name='_csrf']").attr("content");
	var csrfHeader = $("meta[name='_csrf_header']").attr("content");

	$(form).append('<input type="hidden" name="_csrf" value="'+csrfToken+'">');
	$(form).append('<input type="hidden" name="_csrf_header" value="'+csrfHeader+'">');
    document.body.appendChild(form);
    form.submit();
};


var openWindowWithGet = function(url, windowoption, name, params) {
    window.open("", name, windowoption);

    //Hidden Form
    var form = document.createElement("form");
    form.setAttribute("method", "get");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

    for(var key in params) {
    	var hiddenField = document.createElement("input");
    	hiddenField.setAttribute("type", "hidden");
    	hiddenField.setAttribute("id", key);
    	hiddenField.setAttribute("name", key);
    	hiddenField.setAttribute("value", params[key]);

    	form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
};


$.datepicker.regional['ko'] = { // Default regional settings
	closeText : '닫기',
	prevText : '이전달',
	nextText : '다음달',
	currentText : '오늘',
	monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
	monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
	dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
	dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
	weekHeader : 'Wk',
	dateFormat : 'yy-mm-dd', // [mm/dd/yy], [yy-mm-dd], [d M, y], [DD, d MM]
	firstDay : 0,
	isRTL : false,
	showMonthAfterYear : true,
	yearSuffix : ''
};


var progress = progress || (function() {
	var init = function() {
		$(".progress").remove();
		$("body").append('<div class="progress"/>');

		$(".progress").css("position", "fixed");
		$(".progress").css("top", "0");
		$(".progress").css("left", "0");
		$(".progress").css("width", "100%");
		$(".progress").css("height", "100%");
		$(".progress").css("z-index", "100");
		$(".progress").css("opacity", "0.3");

		$(".progress").append((new Spinner({lines: 14, // The number of lines to draw
			length: 11, // The length of each line
			width: 6, // The line thickness
			radius: 19, // The radius of the inner circle
			color: '#000', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 0, // Afterglow percentage
			shadow: false // Whether to render a shadow
			}).spin()).el);
	};

	return {
		"show": function(){
			init();
			$(".progress").show();
		},
		"hide": function(){
			$(".progress").hide();
		}
	};
})();

function getDate() {
	var now = new Date();

	var yyyy = now.getFullYear().toString();
    var mm = (now.getMonth() + 1).toString();
    var dd = now.getDate().toString();
    var yyyymmdd = yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
	//var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " ";
    var nowAll = yyyymmdd + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();

	return nowAll;
}

/**
 * <pre>
 * 1.개요 : unixdate to 'yyyy-mm-dd hh:mm:ss'
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2015. 12. 16.       mjlee             최초 작성
 *	-----------------------------------------------------------------------
 *
 */
var convertUnixDate = function(args) {
	if (args=="") return;
	try {
		if(isNaN(parseInt(args))) throw new Error("Not a number");
		var date = new Date(args.toString().substr(0, 10)*1000),
			year = date.getFullYear(),
			month = "0" + parseInt(date.getMonth()+1),
			day = "0" + date.getDate(),
			hours = "0" + date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds();
		return year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	} catch (e) {
		return "convert error: " + e.message;
	};
};

/**
 * <pre>
 * 1.개요 : contextPath구하기
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 01. 12.       mjlee             최초 작성
 *	-----------------------------------------------------------------------
 *
 */
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
};

function bluring(event){
	if( navigator.userAgent.indexOf('Firefox') >= 0 || navigator.userAgent.indexOf('Chrome') >= 0 || navigator.userAgent.indexOf('Safari') >= 0 ) {
		if(event.target.tagName=="A" || event.target.tagName=="IMG")
			document.body.focus();
	} else {
		if(event.srcElement.tagName=="A" || event.srcElement.tagName=="IMG")
			document.body.focus();
	}
}
document.onfocusin=bluring;

/**
 * <pre>
 * 1.개요 : paging 처리
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 02.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_CountChk() {
	var totalcnt = parseInt($("#totalcnt").val());
	var pageRow = parseInt($("#size").val());
	var rows= parseInt(totalcnt/pageRow);
	$("#pagecnt").empty().data('options');
	for ( var i=0; i < rows ; i++ ) {
		$("#pagecnt").append('<option value="' + i + '">' + (pageRow*(i)+1) + ' - ' + pageRow*(i+1) + '</option>');
	}
	$("#pagecnt").append('<option value="' + (rows) + '">' + (pageRow*(rows)+1) + ' - ' + totalcnt + '</option>');
	$("#pagecnt option").each(function(){
	    var selVal = $(this).val();
	    if(selVal == $("#page").val()){
	    	$(this).attr("selected", "selected");
	    }
	});
};

function fn_select() {
	$("#page").val($("#pagecnt").val());
	fn_searchAction();
};

function fn_select1() {
	$("#page").val("1");
};

/**
 * <pre>
 * 1.개요 : Today, Week, Month
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 04.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_prevday(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today(){
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week(){
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_nextweek(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month(){
	var now = new Date();
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevyear(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year-1,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), 0, 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), 12, 0)));
	fn_searchAction();
}

function fn_year(){
	var currentTime = new Date();
	var startDateFrom = new Date(currentTime.getFullYear(),0, 1);
	var endDateFrom = new Date(currentTime.getFullYear(),12, 0);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', endDateFrom));
	fn_searchAction();
}

function fn_nextyear(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear()+1, 0, 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear()+1, 12, 0)));
	fn_searchAction();
}


/**
 * <pre>
 * 1.개요 : Today, Week, Month edms용
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2017. 01. 06.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_prevdayEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchActionTotal();
}

function fn_todayEdms(){
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchActionTotal();
}

function fn_nextdayEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchActionTotal();
}

function fn_prevweekEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_weekEdms(){
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_nextweekEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_prevmonthEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchActionTotal();
}

function fn_monthEdms(){
	var now = new Date();
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchActionTotal();
}

function fn_nextmonthEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchActionTotal();
}


/**
 * <pre>
 * 1.개요 : frame 늘리기
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 10.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

var flag= "close";
function aaa(){
	if(flag=="close"){
		parent.document.all('sframe').cols="0,*";
		flag="open";
	}else{
		parent.document.all('sframe').cols="218,*";
		flag="close";
	}
}



/**
 * 1.개요 : 엑셀 CSV 다운로드
 * 2.처리내용 :
 * @method : exportCsv
 * @date : 2016. 08. 11.
 * @author : yhjung
 */

function exportCsv(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');

	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			for(var j=0; j<fields.length; j++){
				var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
				var kkk = col1.field;
				var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
				row += arrValue + ',';
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		setTimeout(function(){
			console.log(pFileName);
			document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
			document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
			document.EXCEL_.target 			= 'excelList';
			document.EXCEL_.submit();
		}, 500);
	});
};

function exportContentCsv(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');

	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';
	console.log(CSV);
	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.content.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			for(var j=0; j<fields.length; j++){
				var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
				var kkk = col1.field;
				var arrValue = d.content[i][kkk] == null ? "" : String(d.content[i][kkk]).replace(/,/g,'');
				row += arrValue + ',';
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		console.log(CSV);
		document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
		document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
		document.EXCEL_.target 			= 'excelList';
		document.EXCEL_.submit();
	});
};

var winClose = function(){
	window.close();
};

var isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length )) {
        return true
    } else {
        return false
    }
};

//########## 신고번호 Formatter ##########//
function linkSingoFormatter(cellValue, options, rowObject) {
	if (isEmpty(cellValue)){
		return "";
	}else{
		var Singo = cellValue.substr(0,5)+"-"+cellValue.substr(5,2)+"-"+cellValue.substr(7,7);
		return Singo;
	}
}

//########## 수출신고번호 Formatter ##########//
function linkExSingoFormatter(cellValue, options, rowObject) {
	if (isEmpty(cellValue)){
		return "";
	}else{
		var Singo = cellValue.substr(0,5)+"-"+cellValue.substr(5,2)+"-"+cellValue.substr(7,7);
		return "<b><u><a href='javascript:linkSingoNo(\""+ cellValue +"\")'>" + Singo + "</a></u></b>";
	}
}

//########## 수출신고번호 링크 ##########//
var linkSingoNo = function(singoNo) {
    var url = '../export/viewExportTracking.sein?expDclrNo=' + singoNo;

    window.open(url, "ExportSingo", 'width=600,height=300,resizable=1,scrollbars=yes');
}

//########## HS링크 Formatter ##########//
function linkHs(Hs){
//  var url = './viewHScode.sein?'
//      	+ '&hsSgn=' + Hs;

  var url = '../other/viewHsRate.sein?'
  	+ 'hscode=' + Hs;

  window.open(url, Hs, 'width=800,height=700,resizable=1,scrollbars=yes');
}

//########## HS링크 Formatter ##########//
function linkHsFormatter(cellValue, options, rowdata, action){
	if (isEmpty(cellValue)){
		return "";
	}else{
		var HS = cellValue.substr(0,4)+"."+cellValue.substr(4,2)+"-"+cellValue.substr(6,4);
		return "<b><u><a href='javascript:linkHs(" + cellValue + ")'>" + HS + "</a></u></b>";
	}
}

//########## 날짜 Formatter ##########//
function linkDateFormatter(cellValue, options, rowdata, action){
	if (isEmpty(cellValue)){
		return "";
	}else{
		var Date = cellValue.substr(0,4)+"-"+cellValue.substr(4,2)+"-"+cellValue.substr(6,2);
		return Date;
	}
}

//########## 유닉스시간 변경 Formatter ##########//
function linkUnixDateFormatter(cellValue, options, rowObject){
	if (isEmpty(cellValue)) return "";
	return convertUnixDate(cellValue);
}

//########## 임의회사명 Formatter ##########//
function comFormatter(cellValue, options, rowObject){
	if (isEmpty(cellValue)) return "";
	return "ASML";
}

function fn_checkMinLen(d, len){
	var chk=true;
	$(d).each(function(index){
		if(d[index].length < len){
			chk = false;
			return chk;
		}
		return chk;
	});
	return chk;
}

//########## 엔터 자동검색 ##########//
var keyDown = function(){
    if(event.keyCode == 13) fn_searchAction();
};

//########## 수입 검사여부 ##########//
function customTestFormatter(cellValue, options, rowObject) {
	if (cellValue=='O' || cellValue=='R' || cellValue=='T' || cellValue=='W' || cellValue=='Y'){
		return "검사";
	}else{
		return "";
	}
}