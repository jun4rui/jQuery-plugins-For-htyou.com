$.fn.extend({
		inputNotice:function(){
		this.each(function(){
			$(this).val($(this).attr("title"));
			

			// 绑定Click事件
			$(this).bind("click",function(){
				// 如果发生Click，并且内容为rel，则清空val
				if ($(this).val()==$(this).attr("title")){
					$(this).val("");
				}
			});

			// 绑定Blur事件
			$(this).bind("blur",function(){
				if ($(this).val()==""){
					$(this).val($(this).attr("title"));
				}
			});

		});
	}
});