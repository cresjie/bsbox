/*

BsBox dialog module

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
	
	bsbox.alert = function(message,callback){
		var $dialog = bsbox.dialog({message:message,title:'',
			buttons:[
				{
					text:'OK',
					attr:{
						'data-dismiss':"modal"
					},
					class: 'btn-primary'
				}
			]
		});

		$dialog.on('hidden.bs.modal',callback);
		return $dialog;
	};

	bsbox.confirm = function(message,callback){
		var result  = false;
		var $dialog = bsbox.dialog({title:message,message:'',
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
		});
		if(callback)
			$dialog.on('hidden.bs.modal',function(e){callback.call(this,result)});
		return $dialog;
	}

	bsbox.prompt = function(message,callback){
		var result;
		var $dialog = bsbox.dialog({title:message,message:'<input type="text" class="form-control" id="bsbox_prompt_input">',
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
		});
		if( callback )
			$dialog.on('hidden.bs.modal',function(e){callback.call(this,result)});
		return $dialog;
	}

})(window,jQuery,bsbox);