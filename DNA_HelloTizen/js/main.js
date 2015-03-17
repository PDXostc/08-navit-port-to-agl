/* Copyright (C) Jaguar Land Rover - All Rights Reserved
*
* Proprietary and confidential
* Unauthorized copying of this file, via any medium, is strictly prohibited
*
* THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
* KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
* PARTICULAR PURPOSE.
*
* Filename:	 header.txt
* Version:              1.0
* Date:                 January 2013
* Project:              Widget incorporation
* Contributors:         XXXXXXX
*                       xxxxxxx
*
* Incoming Code:        GStreamer 0.93, <link>
*
*/

/*global Bootstrap */

/**
  * Boilerplate application provides starting point for new applications and provides basic layout and infrastructure:
  *
  * * {{#crossLink "Bootstrap"}}{{/crossLink}} component
  * * {{#crossLink "BottomPanel"}}{{/crossLink}} component
  * * {{#crossLink "TopBarIcons"}}{{/crossLink}} component
  *
  * Update following code for new applications built from this code:
  *
  * * `config.xml` - update `/widget/@id`, `/widget/tizen:application/@id`, `/widget/tizen:application/@name`, `/widget/name`
  * * `icon.png` - application icon
  *
  * @module BoilerplateApplication
  * @main BoilerplateApplication
 **/

/**
 * Reference to instance of  class object this class is inherited from dataModel {@link CarIndicator}
@property carInd {Object}
 */
var carInd;
/**
 * Reference to instance of ThemeEngine class object
 * @property te {Object}
 */
var te;

/**
 * Array of signals who want subscribe in carInd 
 * @property carIndicatorSignals {string[]}
 */
var carIndicatorSignals =  [
                            "IviPoC_NightMode"
                            ];

function deleteItemClick(item) {
	console.log(item.target);
	console.log(item.data.html());
	item.data.remove();
	displayItemList();
}
// Handler function invoked from the Crosswalk extension
// when  bp.bpAsync is called.
var callback = function(response) {
	console.log("bp callback js: Async>>> " + response);
};

function displayItemList() {
	var items = $("#item-list").children();
	var table = $("#item-table");
	if (items) table.removeClass("hidden");
	if (items.length == 0) table.addClass("hidden");
}

function addItemClick(item) {
	console.log('addItemClick()');
	console.log(item);
	console.log($("#item-title").val());
	console.log($("#item_description").val());
	console.log($("#item-template").contents());
	
	// Capture the title and description data to be sent to the extension later.
	var ti=$("#item-title").val();
	var descr=$("#item-description").val();
	
	var newItemTemplate = $($("#item-template").html());
	console.log(newItemTemplate);
	newItemTemplate.find("#item-title-field").text($("#item-title").val());
	newItemTemplate.find("#item-description-field").text($("#item-description").val());
	console.log(newItemTemplate);
	var newItem = newItemTemplate.clone();
	newItem.find(".item-delete-button").click(newItem,deleteItemClick);
	$("#item-list").append(newItem);
	displayItemList();
	$("#add-item-form")[0].reset();
	
	// Send the title and description to the extension:
	var jsonenc = {api:"handleItem", dest:"Item Consumer", title:ti, desc:descr};
	console.log("stringify before bp.bpAsynch is "+JSON.stringify(jsonenc));
	bp.bpAsync(JSON.stringify(jsonenc), callback);
}

function themeErrorCB (msg) {
    console.log("Theme Error Callback: " + msg);
}

function smallClick(item) {
    console.log('smallClick()');

    var jsonenc = {api:"setTheme", theme:"/usr/share/weekeyboard/blue_600.edj"};
    console.log("RE: setTheme stringify: "+JSON.stringify(jsonenc));
    wkb_client.clientSync(JSON.stringify(jsonenc), themeErrorCB);
}

function bigClick(item) {
    console.log('bigClick()');

    var jsonenc = {api:"setTheme", theme:"/usr/share/weekeyboard/blue_1080.edj"};
    console.log("RE: setTheme stringify: "+JSON.stringify(jsonenc));
    wkb_client.clientSync(JSON.stringify(jsonenc), themeErrorCB);
}

function toggleModal() {
	console.log("Toggling modal...");
	$("#modal").toggleClass("hidden");
}

function flexForKeyboard() {
	$("#keyboard-spacer").removeClass("hidden");
}

function unflexForKeyboard() {
	$("#keyboard-spacer").addClass("hidden");
}

function clearInput() {
	console.log("clearInput()");
	$(this).siblings(".text-input").val("");
}

/**
 * Initialize application components and register button events.
 * 
 * @method init
 * @static
 */


var init = function () {
	console.log("init()");
  $("#add-item-button").click(addItemClick);
  $("#bluetoothRefreshButton, #modal .close-button, #exit-modal").click(toggleModal);
  $("input[type='text'], input[type='password'], textarea").focus(flexForKeyboard);
  $("input[type='text'], textarea").blur(unflexForKeyboard);
  $(".clear-button").click(clearInput);
};


/**
 * Calls initialization fuction after document is loaded.
 * @method $(document).ready
 * @param init {function} Callback function for initialize Store.
 * @static
 **/
$(document).ready(init);

/**
 * Applies selected theme to application icons 
 * @method setThemeImageColor
 * @static
 **/
function setThemeImageColor() {
	var imageSource;
	$('body').find('img').each(function() {
		var self = this;
		imageSource = $(this).attr('src');

	    if (typeof(imageSource) !== 'undefined' && $(this.parentElement).hasClass('themeImage') == false) {
	        console.log(imageSource);

	        var img = new Image();
	        var ctx = document.createElement('canvas').getContext('2d');

	        img.onload = function () {
	            var w = ctx.canvas.width = img.width;
	            var h = ctx.canvas.height = img.height;
	            ctx.fillStyle = ThemeKeyColor;
	            ctx.fillRect(0, 0, w, h);
	            ctx.globalCompositeOperation = 'destination-in';
	            ctx.drawImage(img, 0, 0);

	            $(self).attr('src', ctx.canvas.toDataURL());
	            $(self).hide(0, function() { $(self).show();});
	        };

	        img.src = imageSource;
	    }
	});
}

function setupSpeechRecognition() {
	console.log("Store setupSpeechRecognition");
	Speech.addVoiceRecognitionListener({
		onapplicationinstall : function() {
			console.log("Speech application install invoked");
			if (_applicationDetail.id !== undefined) {
				StoreLibrary.installApp(_applicationDetail.id);
			}
		},
		onapplicationuninstall : function() {
			console.log("Speech application uninstall invoked");
			if (_applicationDetail.id !== undefined) {
				StoreLibrary.uninstallApp(_applicationDetail.id);
			}
		}

	});
}
