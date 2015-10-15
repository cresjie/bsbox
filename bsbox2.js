/*
bsbox 2.0.1.0

required: jQuery
Author: Cres Jie Labasano
Email: cresjie@gmail.com
*/
(function(window,$){'use strict';

	if(!$){
		console.error('jQuery is required');
		return 0;
	}

	var defaults = {

		dialog:{
			title:'Message',
			type:''
		},
		notification:{
			sticky:false,
			timeout:5000,
			type:'success',
			closeBtn:true,
			template:'alert',
			message:'Bsbox Notification',
			closeOnClick:true,
			transitionIn:'slideDown',
			transitionOut:'slideUp',
			location:'bottom left'
		}
	}

	var globals = {
		NotifContainerClass: '.bsbox-notif-container'
	};

	var template = {
		dialog: function(content){
			var head ='',message='';
			if(content.title){
				head = '<div class="modal-header box-header box-'+content.type+'" >'+
				                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
				               '<h4 class="modal-title">'+content.title+'</h4>' +
				            '</div>';
				
			}

			if( content.message ){
				message = '<div class="modal-body box-'+( content.type && !content.title ? content.type : '' )+'">'+
				                content.message +
				            '</div>';
			}
			var t = '<div id="bsboxDialog" class="modal fade">'+
				   	'<div class="modal-dialog">'+
				        '<div class="modal-content">'+head+
				           message +
				             
				        '</div>'+
				     '</div>'+
				     '</div>';
			var $t = $(t);
			if(content.buttons){
				$t.find('.modal-content').append('<div class="modal-footer"></div>');
				for(var i in content.buttons){
					var button = content.buttons[i],
						$button = $('<button class="btn"></button>')
									.html(button.text)
									.on(button.on);
									
						if(button.class){
							$button.addClass(button.class);
						}
						if(button.attr)
							$button.attr(button.attr);
					
					$t.find('.modal-footer').append($button);
				}
			}

			return $t;
		},
		notication:{
			alert:function(options){
				var $t = $('<div class="alert alert-'+options.type+'" style="display:none"></div>')
						.html(options.message);
					if(options.closeBtn){
						var $button = $('<button class="close">&times;</button>');
						$t.prepend($button);
					}
						
				return $t;
			}
		}

	}
	var Notification = function(options){

		var _getContainer = function(location){
			if(location){
				location = '.'+ location.replace(/ /gi,'.');
			}

			var className = globals.NotifContainerClass+location;

			if( $(className).length ){
				return $(className);
			}else{
				var $container  = $('<div class="'+ className.replace(/\./gi,' ') + '"></div>');
				$('body').append($container);
				return $container;
			}

			
		}
		

		var $container = _getContainer(options.location);

		var $t = template.notication[options.template](options);

		if(!options.sticky)
			setTimeout(Notification.close, options.timeout, $t, options);
		if(options.closeOnClick)
			$t.click(function(){Notification.close($(this),options)});

		$container.append($t);
		return $t.data('bsboxNotif.options',options)[options.transitionIn](); //returns the template $element
	};

	Notification.close = function($el,options){
		$el[options.transitionOut]({complete:function(){this.remove()}})
	}

	
	window.bsbox = {
		dialog:function(options){
			var options = options.constructor == Object ? $.extend({},defaults.dialog,options) : $.extend({},defaults.dialog,{message:options}) ;
			var $dialog = template.dialog(options).on('hidden.bs.modal',function(){this.remove()});

			$('body').append($dialog);
			return $dialog.modal('show');		
		},
		notif:function(options){
			options = options.constructor == Object ? $.extend({},defaults.notification,options) : $.extend({},defaults.notification,{message:options});

			return Notification(options);
		},
		version: '2.0.1.0'
	};

	/**
	* Global method for bsbox.notif
	*/
	$.extend(bsbox.notif,{
		close: function($el){
			Notification.close($el,$el.data('bsboxNotif.options'));
		},
		addTemplate: function(name,callback){
			template.notification[name] = callback;
			return this;
		}
	})

})(window,jQuery);
