/*

BsBox dialog module v1.0.1.0

required: bsbox 2.0.0.0 and jQuery
Author: Cres Jie Labasano
Email: cresjie@gmail.com
*/
(function(window,$,bsbox){ 'use strict';
	
	if(typeof $ === 'undefined' && typeof bsbox === 'undefined'){
		console.error('jQuery and bsbox are required');
		return 0;
	}

	//extending bsbox library
	
	bsbox.alert = function(opt,callback){
		var options = {title:'',
			buttons:[
				{
					text:'OK',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-primary'
				}
			]
		} ;

		if(opt.constructor == String) options.message = opt;
		else options = $.extend(options, opt);

		console.log(options);


		var $dialog = bsbox.dialog(options);

		$dialog.on('hidden.bs.modal',callback);
		return $dialog;
	};

	bsbox.confirm = function(opt,callback){
		var options = {
			message:'',
			buttons:[
				{
					text:'OK',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-primary',
					on:{
						click:function(){result=true}
					}
				},
				{
					text:'Cancel',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-danger'

				}
			]
		};
		if( opt.constructor == String ) options.title = opt;
		else options = $.extend(options, opt);

		var result  = false;
		var $dialog = bsbox.dialog(options);
		if(callback)
			$dialog.on('hidden.bs.modal',function(e){callback.call(this,result)});
		return $dialog;
	}

	bsbox.prompt = function(opt,callback){
		var options = {
			message:'<input type="text" class="form-control" id="bsbox_prompt_input">',
			buttons:[
				{
					text:'OK',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-primary',
					on:{
						click:function(){result = $(this).parents('.modal').find('#bsbox_prompt_input').val();}
					}
					
				},
				{
					text:'Cancel',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-danger'

				}
			]
		};

		if( opt.constructor == String) options.title = opt;
		else options = $.extend(options, opt);

		var result;
		var $dialog = bsbox.dialog(options);
		if( callback )
			$dialog.on('hidden.bs.modal',function(e){callback.call(this,result)});
		return $dialog;
	}

})(window,jQuery,bsbox);
