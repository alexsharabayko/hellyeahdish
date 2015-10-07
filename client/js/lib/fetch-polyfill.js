!function(){"use strict";function a(a){if("string"!=typeof a&&(a=a.toString()),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function b(a){return"string"!=typeof a&&(a=a.toString()),a}function c(a){this.map={},a instanceof c?a.forEach(function(a,b){this.append(b,a)},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function d(a){return a.bodyUsed?Promise.reject(new TypeError("Already read")):(a.bodyUsed=!0,void 0)}function e(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function f(a){var b=new FileReader;return b.readAsArrayBuffer(a),e(b)}function g(a){var b=new FileReader;return b.readAsText(a),e(b)}function i(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,"string"==typeof a)this._bodyText=a;else if(h.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(h.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else{if(a)throw new Error("unsupported BodyInit type");this._bodyText=""}},h.blob?(this.blob=function(){var a=d(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(f)},this.text=function(){var a=d(this);if(a)return a;if(this._bodyBlob)return g(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var a=d(this);return a?a:Promise.resolve(this._bodyText)},h.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function k(a){var b=a.toUpperCase();return j.indexOf(b)>-1?b:a}function l(a,b){if(b=b||{},this.url=a,this.credentials=b.credentials||"omit",this.headers=new c(b.headers),this.method=k(b.method||"GET"),this.mode=b.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&b.body)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(b.body)}function m(a){var b=new FormData;return a.trim().split("&").forEach(function(a){if(a){var c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function n(a){var b=new c,d=a.getAllResponseHeaders().trim().split("\n");return d.forEach(function(a){var c=a.trim().split(":"),d=c.shift().trim(),e=c.join(":").trim();b.append(d,e)}),b}function o(a,b){b||(b={}),this._initBody(a),this.type="default",this.url=null,this.status=b.status,this.ok=this.status>=200&&this.status<300,this.statusText=b.statusText,this.headers=b.headers instanceof c?b.headers:new c(b.headers),this.url=b.url||""}if(!self.fetch){c.prototype.append=function(c,d){c=a(c),d=b(d);var e=this.map[c];e||(e=[],this.map[c]=e),e.push(d)},c.prototype["delete"]=function(b){delete this.map[a(b)]},c.prototype.get=function(b){var c=this.map[a(b)];return c?c[0]:null},c.prototype.getAll=function(b){return this.map[a(b)]||[]},c.prototype.has=function(b){return this.map.hasOwnProperty(a(b))},c.prototype.set=function(c,d){this.map[a(c)]=[b(d)]},c.prototype.forEach=function(a,b){Object.getOwnPropertyNames(this.map).forEach(function(c){this.map[c].forEach(function(d){a.call(b,d,c,this)},this)},this)};var h={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:"FormData"in self},j=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];i.call(l.prototype),i.call(o.prototype),self.Headers=c,self.Request=l,self.Response=o,self.fetch=function(a,b){var c;return c=l.prototype.isPrototypeOf(a)&&!b?a:new l(a,b),new Promise(function(a,b){function e(){return"responseURL"in d?d.responseURL:/^X-Request-URL:/m.test(d.getAllResponseHeaders())?d.getResponseHeader("X-Request-URL"):void 0}var d=new XMLHttpRequest;d.onload=function(){var c=1223===d.status?204:d.status;if(100>c||c>599)return b(new TypeError("Network request failed")),void 0;var f={status:c,statusText:d.statusText,headers:n(d),url:e()},g="response"in d?d.response:d.responseText;a(new o(g,f))},d.onerror=function(){b(new TypeError("Network request failed"))},d.open(c.method,c.url,!0),"include"===c.credentials&&(d.withCredentials=!0),"responseType"in d&&h.blob&&(d.responseType="blob"),c.headers.forEach(function(a,b){d.setRequestHeader(b,a)}),d.send("undefined"==typeof c._bodyInit?null:c._bodyInit)})},self.fetch.polyfill=!0}}();