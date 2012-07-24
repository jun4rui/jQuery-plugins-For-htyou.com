$.fn.cjTip= function(options){
	this.each(function(){
		var cjTipPanelStr	= "<div id='cjTipPanel' style='position:absolute; background-color:#FCFCFC; border:1px solid #BCDFFF; z-index:999;'></div>";

		// 设定参数
		var inputArg		= "";
		if (typeof(options.inputArg)!="undefined")
			inputArg	= options.inputArg;

		// 点击事件则弹出内容
		$(this).bind("click",function(){
			// 点击后，先清除掉页面上已经存在的cjTipPanel
			$("#cjTipPanel").hide();
			$("#cjTipPanel").remove();

			$("#cjAutoComplete").hide();
			$("#cjAutoComplete").remove();

			// 在该对象后面增加cjTipPanel层
			//$(this).after(cjTipPanelStr);
			$("body").append(cjTipPanelStr);
			// 设置cjTipPanel层的位置
			$("#cjTipPanel").css("left",$(this).offset().left);				// 设定提示层和This对象的left值一致
			$("#cjTipPanel").css("top",$(this).offset().top+$(this).height()+5);	// 设定提示层在This对象下方

			// 然后显示
			$("#cjTipPanel").show();
			// 然后填充内容
			//alert(options.ajaxUrl);
			
			// 获得本对象ID
			thisObj= "#"+$(this).attr("id");
			//alert("["+thisObj+"]");

			// ajax进来数据的链接，如果inputArg不为空（指定了参数inputArg）则拼凑出带参数的url
			var ajaxLink	= options.ajaxUrl;
			if (inputArg!="")
				ajaxLink	= ajaxLink+"?"+$(inputArg).attr("id")+"="+$(inputArg).val();

			alert(ajaxLink);
			$.get(ajaxLink,function(getData){
				getData	=	getData.replace(/{thisobj}/g,thisObj);
				//alert(getData);
				$("#cjTipPanel").html(getData);
			});
			// 然后给弹出层绑定鼠标离开的行为
			$("#cjTipPanel").mouseleave(function(){
				$("#cjTipPanel").hide();
				$("#cjTipPanel").remove();
			});
		});
	});
};