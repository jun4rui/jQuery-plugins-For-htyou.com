

function cjCal(cjCalObjId,cjCal_input_year,cjCal_input_month,cjCal_input_tourArray){
	// 根据输入得到年月(这里可以输入例如：2012年13月这种数据，相当于2013年1月，方便翻看上月下月的函数做计算用)
	var cjCalDate	= new Date(cjCal_input_year,cjCal_input_month);

	// 设定星期字符常量
	var cjCalObjDayStr	= new Array('星期天','星期一','星期二','星期三','星期四','星期五','星期六');

	// 首先清空待绘制内容的区域
	//alert(document.getElementById(cjCalObjId).innerHTML);
	document.getElementById(cjCalObjId).innerHTML	= "";

	// 绘制翻动界面
	var cjCalHTMLStr	= "<!-- 日期控制部分 Begin -->\n<div id='control'>\n<table style='margin:0 auto;'>\n<tr>\n<td><button onClick='doCjCal(-1)'><</button></td><td>"+cjCalDate.getFullYear()+"年"+(cjCalDate.getMonth()+1)+"月</td><td><button onClick='doCjCal(+1)'>></button></td></tr>\n</table>\n</div>\n<!-- 日期控制部分 End -->\n";
	document.getElementById(cjCalObjId).innerHTML +=cjCalHTMLStr;

	// 绘制星期标识元素
	for (cjCalObjDayStr_i in cjCalObjDayStr){
		document.getElementById(cjCalObjId).innerHTML += "<div class=\"dateTitle\">"+cjCalObjDayStr[cjCalObjDayStr_i]+"</div>\n";
	}
	// 绘制日期元素
	var thisMonthMaxDate	= new Date(cjCalDate.getFullYear(),(cjCalDate.getMonth()+1),0).getDate();	// 本月最大日数
	var thisMonthStartDay	= new Date(cjCalDate.getFullYear()+"-"+(cjCalDate.getMonth()+1)).getDay();	// 本月开始第一天是星期几
	//alert(thisMonthMaxDate+":"+new Date(cjCal_input_year,cjCal_input_month,0));
	// 显示留空的部分
	for (var i=0; i<thisMonthStartDay; i++){
		document.getElementById(cjCalObjId).innerHTML += "<div><a href=\"\" class=\"dateUnit\"></a></div>";
	}

	// 显示具体日期
	for (var i=0; i<thisMonthMaxDate; i++){
		var tourListIndex	= cjCal_findInTourList(cjCal_input_year+"-"+cjCal_input_month+"-"+(i+1));
		if (tourListIndex!=-1){
			document.getElementById(cjCalObjId).innerHTML += "<div><a href=\"\" class=\"dateUnit\">"+(i+1)+"日<br/><span>"+tourList[tourListIndex][1]+"</span></a></div>";
		}else{
			document.getElementById(cjCalObjId).innerHTML += "<div><a href=\"\" class=\"dateUnit\">"+(i+1)+"日</a></div>";
		}
		
		
		
	}

	// 清除浮动层
	document.getElementById(cjCalObjId).innerHTML += "<div style=\"clear:both; height:1px;\"></div>"


}

// 判断输入日期在tourList中，没有则返回-1，有则返回对应tourList的索引编号，inVar为"YYYY-mm-dd"格式
function cjCal_findInTourList(inDate){
	for (tourList_i in tourList){
		// 如果日期匹配
		if (tourList[tourList_i][0].replace(/-0/g,'-')==inDate.replace(/-0/g,'-')){
			// 则返回对应tourList的index值
			return tourList_i;
		}
	}
	return -1;
}




/* 以下不放在js文件中 */
function doCjCal(inValue){
	inMonth 	+= inValue
	cjCal("cal",inYear,inMonth,tourList);
}
