# bsbox
bootstrap base modal/dialog and notification box

# Requirements
- jQuery 1.6+
- bootstrap 3.x

Basic Usage
============

# Notification
```javascript
//it also returns a jQuery element 
  bsbox.notif("Hello World");
```
```javascript
//it also returns a jQuery element 
  bsbox.notif({message:'Error Occured',type:'danger'});
```

**Options & Defaults**
```javascript

 sticky: false
 timeout: 5000,
 type: 'success', //danger,warning,info
 closeBtn: true, //displays "x" button in the notification
 template: 'alert', //the template being used
 closeOnClick: true, //close the notification if clicked
 transitionIn: 'slideDown',
 transitionOut: 'slideUp',
 location: 'bottom left'
 
```
**Adding Notification Template**
* addTemplate(name, function) - function should return jQuery element of the container
```javascript
	bsbox.notif.addTemplate('custom-template',function(options){
		var $template = $('<div class="custom-container">'+ options.message + '</div>');
		return $template;
	});
```

#Dialog
```javascript
//it also returns a jQuery element 
  bsbox.dialog("Hello world");
```

```javascript
//it also returns a jQuery element 
  bsbox.dialog({title:'Error',message: 'Unknown Error Occured',type:'danger'});
```

**Options & Default**
```javascript
  title: 'Message',
  message: null, //string
  type: null, //string
  buttons: null //array of objects
```
**Working with Dialog Buttons**
 **Options** 
* text - the text for the button
* class - class attribute for the button
* attr - (object) attributes for the button
* on- (object) on events for the button

**Sample**
```javascript
  bsbox.dialog({
    title:'Error',
    message: 'Unknow Error Occured',
    type: 'danger',
    buttons:[
      {
        text:'OK',
				attr:{
					'data-dismiss':"modal"
				},
				class: 'btn-primary'
      },
      {
        text: 'Cancel',
        attr:{
					'data-dismiss':"modal"
				},
				class: 'btn-danger',
				on: {
				  click: function(e){ alert("you press cancel") }
				}
      }
    ]
  });
```
