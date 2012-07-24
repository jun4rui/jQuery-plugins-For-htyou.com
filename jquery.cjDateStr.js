$.fn.cjDateStr= function(options){
	this.each(function(){
		// 显示DIV框架的HTML代码部分
		var cjDateStrPanelHTMLStr	= "<span id='cjDateStrPanel' style='position:absolute; border:0px solid #F00; margin-left:0px; margin-top:0px; width:45px; text-align:right;'>1</span>";

		// 可选参数：设定显示框的位置
		var cjDatePanelLeft	= 0;
		var cjDatePanelTop	= 0;

		//alert(options.displayStrOffset);
		
		//设定偏移量
		if (typeof(options)!='undefined'){
			cjDatePanelLeft	= parseInt(options.left);
			cjDatePanelTop	= parseInt(options.top);
			//alert(cjDatePanelLeft+":"+cjDatePanelTop);
		}

		// 在指定DOM对象后增加HTML用于显示
		$(this).after(cjDateStrPanelHTMLStr);
		// 将显示框架的ID加上输入对象自己
		var cjDateStrPanelID	= "cjDateStrPanel_"+$(this).attr("id");
		$("#cjDateStrPanel").attr("id",cjDateStrPanelID);

		// 设定浮动层的偏移量
		$(("#"+cjDateStrPanelID)).css("margin-left",cjDatePanelLeft);
		$(("#"+cjDateStrPanelID)).css("margin-top",cjDatePanelTop);

		
		// 对指定对象绑定onchange方法
		$(this).bind("change",function(){
			var chineseDayName	= new Array("周日","周一","周二","周三","周四","周五","周六");
			var cjDateStrDisplayValue	= "";
			/* 计算文本框中的日期，算出相对今天的时间。*/
			// 获得今天的时间
			var cjDateStr_today	= new Date();

			// 将今天的时分秒数据去除，只剩下年月日数据，方便和用户输入的数据进行比较
			cjDateStr_today	= new Date(cjDateStr_today.getFullYear(),cjDateStr_today.getMonth(),cjDateStr_today.getDate());

			// 计算用户输入的时间
			var cjDateStr_inputDate 	= new Date();
			var cjDateStr_userInputDateStr	= $(this).val();
			var cjDateStr_userInputDateStrSplitList	= cjDateStr_userInputDateStr.split("-");	// 存储通过-分割后的YYYY-MM-DD字符串
			cjDateStr_inputDate 	= new Date(parseInt(cjDateStr_userInputDateStrSplitList[0],10),parseInt(cjDateStr_userInputDateStrSplitList[1],10)-1,parseInt(cjDateStr_userInputDateStrSplitList[2],10));
			//DEBUG: alert(parseInt(cjDateStr_userInputDateStrSplitList[0])+":"+(parseInt(cjDateStr_userInputDateStrSplitList[1])-1)+":"+parseInt(cjDateStr_userInputDateStrSplitList[2]));

			// 计算用户时间和当天的差距
			var cjDateStr_dateDiffer	= (cjDateStr_inputDate.getTime()-cjDateStr_today.getTime())/(1000*60*60*24);

			/* 根据差距的结果，显示时间字符串 */
			// 默认时间字符串显示用户输入时间是星期几
			cjDateStrDisplayValue	= chineseDayName[cjDateStr_inputDate.getDay()];

			if (cjDateStr_dateDiffer==0)
				cjDateStrDisplayValue	=	"今天";
			if (cjDateStr_dateDiffer==1)
				cjDateStrDisplayValue	=	"明天";
			if (cjDateStr_dateDiffer==2)
				cjDateStrDisplayValue	=	"后天";
			if (cjDateStr_dateDiffer==-1)
				cjDateStrDisplayValue	=	"昨天";
			if (cjDateStr_dateDiffer==-2)
				cjDateStrDisplayValue	=	"前天";


			$(("#"+cjDateStrPanelID)).text(cjDateStrDisplayValue);
		});
		
	});
}
