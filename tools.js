
		var inherit = (function () {
			var F = function() {};
			return function (Origin, Target) {
				F.prototype = Origin.prototype;
				Target.prototype = new F();
				Target.prototype.constructor = Target;
				Target.prototype.uber = Origin.prototypr
			}
		}())


		function inherit(Origin, Target) {
			var F = function () {};
			F.prototype = Origin.prototype;
			Target.prototype = new F();
			Target.prototype.uber = Origin.prototype;
			Target.prototype.constructor = Target;
		}



		// 能把所有类型的数据都判断出来
		function type(target) {
			var typeStr = typeof(target),
				toStr = Object.prototype.toString,
				objStr = {
					"[object Object]":"object - Object",
					"[object Array]":"array - Object",
					"[object Number]":"number - Object",
					"[object Boolean]":"boolean - Object",
					"[object String]":"string - Object",
				}
			if(target === null) {
				return null;
			}else if(typeStr === "function") {
				return "function";
			}
			if(typeStr !== "object") {
				return typeStr;
			}
			else{
				return objStr[toStr.call(target)];
			}
		}


		function getScrollOffset() {
			if(window.pageXOffset) {
				return{
					x : window.pageXOffset,
					y : window.pageYOffset
				}
			}else{
				return {
					x : document.body.scrollLeft + document.documentElement.scrollLeft,
					y : document.body.scrollTop + document.documentElement.scrollTop
 				}


			}
		}

		function removeEvent(elem, type, handle) {
	        if(elem.removeEventListener) {
	            elem.removeEventListener(type, handle, false)
	        }else if(elem.detachEvent) {
	            elem.detachEvent('on' + type, handle)
	        }else{

	            elem['on' + type] = null;
	        }
    	}



  		function stopBubble(event) {
  			if(event.stopPropagation) {
  				event.stopPropagation
  			}else {
  				event.cancelBubble = true;
  			}
  		}

		function cancelHandle(event) {
			if(event.preventDefault) {
				event.preventDefault();
			}else {
				event.returnValue = false;
			}
		}


		function addEvent(elem, type, handler) {
			if(elem.addEventListener) {
				elem.addEventListener(type, handler, false)
			}else if(elem.attachEvent) {
				elem['temp' + type + handle] = handler;
				elem[type + handler] = function () {
					elem['temp' + type + handle].call(elem);
				}
				elem.attachEvent('on' + type, elem[type + handler])
			}else{
				elem['on' + type] = handler;
			}
		}


		function getStyle(obj, styleProp) {
			if(obj.currentStyle) {
				return obj.currentStyle[styleProp]
			}else {
				return window.getComputedStyle(obj, null)[styleProp]
			}
		}


		function getByClassName(target) {
            var allDom = document.getElementsByTagName('div');
            var allSelectDom = [];
            for(var i = 0; i < allDom.length; i++) {
                var allClassName = getDomAllClass(allDom[i]);
                allClassName.forEach(function (elem) {
                    if(elem === target) {
                        allSelectDom.push(allDom[i])
                    }
                });
            }
            return allSelectDom;
        }


        function getDomAllClass(dom) {
            if(dom.className) {
                var str = dom.className.trim();
                var reg = /\s+/g;
                str = str.replace(reg, ' ');
                return str.split(' ');
            }else {
                return [];
            }
        }

    function Ajax(method, url, flag, data, callback) {
        var xhr = null;
        if(window.XMLHttpRequest) {
            //chrome firefox
            var xhr = new window.XMLHttpRequest()
        }else {
            //IE
            var xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
        }
        method = method.toUpperCase()
        if(method === 'GET') {
            xhr.open("GET", url + "?" + data, flag);
            xhr.send(data)
        }else if(method === 'POST') {
            xhr.open("POST", url, flag);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data)
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    callback(xhr.responseText)
                }else {
                    alert("error")
                }
            }
        }
    }
