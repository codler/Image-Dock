/**
 * Image dock
 * 
 * Takes all images on your site and creates a navigation, Mac alike meny.
 * 
 * Only image-tags are accepted
 *
 * Example usage
 * window.onload = function() {
 * 		imageDock(document.getElementsByTagName('img'));
 * }
 *
 * @author Han Lin Yap < http://zencodez.net/ >
 * @copyright 2010 zencodez.net
 * @license http://creativecommons.org/licenses/by-sa/3.0/
 * @package imagedock
 * @version 1.0 - 2010-09-03
 */

function imageDock(images, speed) {
	// 500 miliseconds
	speed = speed || 500;
	
		// refresh rate
	var frequency = 25,
		incrementPixel = 50 / (speed / frequency);
	
	// Hover Zoom animation
	function hoverZoom(elem) {
		var over = false;

		function ZoomIn() {
			elem.height += incrementPixel;
			if (elem.height < 100 && over)
				setTimeout(ZoomIn,frequency);
		}

		function ZoomOut() {
			elem.height -= incrementPixel;
			if (elem.height > 50 && !over)
				setTimeout(ZoomOut,frequency);
		}

		elem.onmouseover = function () {
			over = true;
			ZoomIn();
		};

		elem.onmouseout = function () {
			over = false;
			ZoomOut();
		};
	}
	
	var ddiv = document.createElement('div'),
		da, dimg, id;
		
	// Style dock
	ddiv.style.margin = '0 auto';
	ddiv.style.width = '100%';
	ddiv.style.position = 'absolute';
	ddiv.style.zIndex = 1000;
	ddiv.style.textAlign = 'center';

	for(var i = 0; i < images.length; i++) {
		if (images[i].tagName != 'IMG' || images[i].height < 50)
			continue;
		
		if (images[i].id == '')
			id = images[i].id = 'a' + i;	
		else
			id = images[i].id;
			
		da = document.createElement('a');
		da.href = '#' + id;
		
		dimg = document.createElement('img');
		dimg.src = images[i].src;
		dimg.height = 50;
		dimg.style.width = 'auto';
		dimg.style.verticalAlign = 'top';
		hoverZoom(dimg);
		
		da.appendChild(dimg);
		ddiv.appendChild(da);
	}
	
	// Prepend to body
	var body = document.getElementsByTagName('body')[0];
	body.insertBefore(ddiv, body.firstChild);
}