(function(w,$){
	var defaults = {

		dialog:{
			title:'Message',
			type:'info'
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

	var template = {
		dialog: function(content){
			var t = '<div id="bsboxDialog" class="modal fade">'+
				   	'<div class="modal-dialog">'+
				        '<div class="modal-content">'+
				            '<div class="modal-header box-'+content.type+'">'+
				                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
				                '<h4 class="modal-title">'+content.title+'</h4>'+
				            '</div>'+
				            '<div class="modal-body">'+
				                content.message +
				            '</div>'+
				             
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
		if( !$('.bsbox-notif-container').length ){
			var $container = $('<div class="bsbox-notif-container"></div>').addClass(options.location);
			$('body').append($container);
		}
		var $t = template.notication[options.template](options);

		if(!options.sticky)
			setTimeout(Notification.close, options.timeout, $t, options);
		if(options.closeOnClick)
			$t.click(function(){Notification.close($(this),options)});

		$('.bsbox-notif-container').append($t);
		return $t.data('bsboxNotif.options',options)[options.transitionIn](); //returns the template $element
	};

	Notification.close = function($el,options){
		$el[options.transitionOut]({complete:function(){this.remove()}})
	}
	$.bsboxDialog = function(options){
		var options = $.extend({},defaults.dialog,options);
		var $dialog = template.dialog(options).on('hidden.bs.modal',function(){this.remove()});

		$('body').append($dialog);
		return $dialog.modal('show');		
	}
	$.bsboxNotif = function(options){
		options = $.extend({},defaults.notification,options);

		return Notification(options);
	}

	$.bsboxNotif.close = function($el){
		Notification.close($el,$el.data('bsboxNotif.options'));
	}
})(window,jQuery);
