var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,a){b!=Array.prototype&&b!=Object.prototype&&(b[d]=a.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(d){return $jscomp.SYMBOL_PREFIX+(d||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var d=0;return $jscomp.iteratorPrototype(function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.makeIterator=function(b){$jscomp.initSymbolIterator();var d=b[Symbol.iterator];return d?d.call(b):$jscomp.arrayIterator(b)};
$jscomp.polyfill=function(b,d,a,f){if(d){a=$jscomp.global;b=b.split(".");for(f=0;f<b.length-1;f++){var e=b[f];e in a||(a[e]={});a=a[e]}b=b[b.length-1];f=a[b];d=d(f);d!=f&&null!=d&&$jscomp.defineProperty(a,b,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function d(){this.batch_=null}function a(c){return c instanceof e?c:new e(function(g,a){g(c)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;d.prototype.asyncExecute=function(c){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(c);return this};d.prototype.asyncExecuteBatch_=function(){var c=this;this.asyncExecuteFunction(function(){c.executeBatch_()})};var f=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(c){f(c,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var c=this.batch_;this.batch_=[];for(var g=0;g<c.length;++g){var a=c[g];delete c[g];try{a()}catch(h){this.asyncThrow_(h)}}}this.batch_=null};d.prototype.asyncThrow_=function(c){this.asyncExecuteFunction(function(){throw c;})};var e=function(c){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var g=this.createResolveAndReject_();try{c(g.resolve,g.reject)}catch(l){g.reject(l)}};e.prototype.createResolveAndReject_=
function(){function c(c){return function(b){a||(a=!0,c.call(g,b))}}var g=this,a=!1;return{resolve:c(this.resolveTo_),reject:c(this.reject_)}};e.prototype.resolveTo_=function(c){if(c===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(c instanceof e)this.settleSameAsPromise_(c);else{a:switch(typeof c){case "object":var a=null!=c;break a;case "function":a=!0;break a;default:a=!1}a?this.resolveToNonPromiseObj_(c):this.fulfill_(c)}};e.prototype.resolveToNonPromiseObj_=function(c){var a=
void 0;try{a=c.then}catch(l){this.reject_(l);return}"function"==typeof a?this.settleSameAsThenable_(a,c):this.fulfill_(c)};e.prototype.reject_=function(c){this.settle_(2,c)};e.prototype.fulfill_=function(c){this.settle_(1,c)};e.prototype.settle_=function(c,a){if(0!=this.state_)throw Error("Cannot settle("+c+", "+a|"): Promise already settled in state"+this.state_);this.state_=c;this.result_=a;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var c=
this.onSettledCallbacks_,a=0;a<c.length;++a)c[a].call(),c[a]=null;this.onSettledCallbacks_=null}};var k=new d;e.prototype.settleSameAsPromise_=function(a){var c=this.createResolveAndReject_();a.callWhenSettled_(c.resolve,c.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(h){c.reject(h)}};e.prototype.then=function(a,b){function c(a,c){return"function"==typeof a?function(c){try{d(a(c))}catch(m){f(m)}}:c}var d,f,g=new e(function(a,
c){d=a;f=c});this.callWhenSettled_(c(a,d),c(b,f));return g};e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?k.asyncExecute(c):this.onSettledCallbacks_.push(function(){k.asyncExecute(c)})};e.resolve=a;e.reject=function(a){return new e(function(c,b){b(a)})};e.race=function(c){return new e(function(b,
e){for(var d=$jscomp.makeIterator(c),f=d.next();!f.done;f=d.next())a(f.value).callWhenSettled_(b,e)})};e.all=function(c){var b=$jscomp.makeIterator(c),d=b.next();return d.done?a([]):new e(function(c,e){function f(a){return function(b){g[a]=b;h--;0==h&&c(g)}}var g=[],h=0;do g.push(void 0),h++,a(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
(function(b){function d(f){if(a[f])return a[f].exports;var e=a[f]={i:f,l:!1,exports:{}};b[f].call(e.exports,e,e.exports,d);e.l=!0;return e.exports}var a={};d.m=b;d.c=a;d.d=function(a,b,k){d.o(a,b)||Object.defineProperty(a,b,{configurable:!1,enumerable:!0,get:k})};d.n=function(a){var b=a&&a.__esModule?function(){return a["default"]}:function(){return a};d.d(b,"a",b);return b};d.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};d.p="";return d(d.s=0)})([function(b,d,a){a(1);a(2);a(4);
a(5)},function(b,d,a){b.exports=a.p+"index.html"},function(b,d,a){var f=a(3);f.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");f.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}});window.offlineTrip=!1;window.radioString="http://192.30.164.78:8000/bahia";window.audioElement=document.getElementById("audioE");
window.button=document.getElementById("button1");window.audioElement.src=window.radioString;window.audioElement.crossOrigin="anonymous";window.buttonPlay=function(){window.button.className="playing";window.offlineTrip=!1};window.buttonPause=function(){window.button.className="paused";window.offlineTrip=!1};window.buttonError=function(){window.button.className="error";window.offlineTrip=!0};window.checkPlay=function(){window.navigator.vibrate&&window.navigator.vibrate(10);!window.offlineTrip&&window.audioElement.paused?
window.audioElement.play():window.offlineTrip||(window.audioElement.pause(),window.buttonPlay());!window.navigator.onLine&&window.audioElement.paused?window.buttonError():window.offlineTrip&&window.navigator.onLine&&window.audioElement.paused&&(window.audioElement.src=window.radioString,window.audioElement.play(),window.offlineTrip=!1)};window.scaleDown=function(){window.button.classList.add("scaleDown");window.navigator.vibrate&&window.navigator.vibrate(10)};window.scaleNormal=function(){window.button.classList.remove("scaleDown");
window.navigator.vibrate&&window.navigator.vibrate(10)};window.button.addEventListener("click",window.checkPlay,!1);window.button.addEventListener("mousedown",window.scaleDown,!1);window.button.addEventListener("touchstart",window.scaleDown,{passive:!0});window.button.addEventListener("mouseup",window.scaleNormal,!1);window.button.addEventListener("touchend",window.scaleNormal,!1);window.audioElement.addEventListener("stalled",window.buttonError,!1);window.audioElement.addEventListener("paused",window.buttonPlay,
!1);window.audioElement.addEventListener("error",window.buttonError,!1);window.audioElement.addEventListener("abort",window.buttonError,!1);window.audioElement.addEventListener("playing",window.buttonPause,!1);window.button.className="error";window.audioElement.play()},function(b,d){function a(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}
function f(){a()&&navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(e)try{e.contentWindow.applicationCache.update()}catch(k){}}var e;setInterval(f,72E5);d.install=function(b){b||(b={});if(a()){var c=function(a){function b(){switch(e.state){case "redundant":d("onUpdateFailed");e.onstatechange=null;break;case "installing":h||d("onUpdating");break;case "installed":f||d("onUpdateReady");break;case "activated":d("onUpdated"),e.onstatechange=null}}function c(){switch(e.state){case "redundant":e.onstatechange=
null;break;case "activated":d("onInstalled"),e.onstatechange=null}}var e=a.installing||a.waiting,f;if(e&&!e.onstatechange){if(a.active){b();var g=b}else c(),g=c;var h=!0;a.waiting&&(f=!0);e.onstatechange=g}},d=function(a){if("function"===typeof b[a])b[a]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(a){a&&(c(a),a.onupdatefound=function(){c(a)})}).catch(function(a){d("onError");return Promise.reject(a)})}else if(window.applicationCache){var f=function(){var a=document.createElement("iframe");
window.addEventListener("message",function(c){if(c.source===a.contentWindow&&(c=(c.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/))&&(c=c[1],"function"===typeof b[c]))b[c]({source:"AppCache"})});a.src="appcache/manifest.html";a.style.display="none";e=a;document.body.appendChild(a)};"complete"===document.readyState?setTimeout(f):window.addEventListener("load",f)}};d.applyUpdate=function(b,c){if(a())navigator.serviceWorker.getRegistration().then(function(a){a&&a.waiting?(a.waiting.postMessage({action:"skipWaiting"}),
b&&b()):c&&c()});else if(e)try{e.contentWindow.__applyUpdate(),b&&setTimeout(b)}catch(g){c&&setTimeout(c)}};d.update=f},function(b,d){"AudioContext"in window&&(window.supportsAudioContext=!0);window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;
window.canvasVis=document.getElementById("canvasVisualizer");window.canvasVisCtx=window.canvasVis.getContext("2d");window.context=new (window.AudioContext||window.webkitAudioContext);window.analyser=window.context.createAnalyser();window.analyser.fftSize=256;window.analyser.smoothingTimeConstant=.65;window.analyser.minDecibels=-96;window.analyser.maxDecibels=-10;window.number=45;window.agregate=.005;window.upDown=-window.agregate;window.downUp=window.agregate;window.freqanalyser=function(){window.numBars=
Math.floor(window.innerWidth/24);window.data=new Uint8Array(92);window.gradient=window.canvasVisCtx.createLinearGradient(0,window.canvasVis.height,0,0);window.binSize=Math.floor(window.data.length/window.numBars);window.requestAnimationFrame(window.freqanalyser);if(window.supportsAudioContext)window.analyser.getByteFrequencyData(window.data);else for(var a=window.data.length;-1<a;--a)70>window.number&&(window.agregate=window.downUp),220<window.number&&(window.agregate=window.upDown),!1===document.getElementById("audioE").paused&&
(window.number+=window.agregate),window.data[a]=window.number;window.canvasVisCtx.clearRect(0,0,window.canvasVis.width,window.canvasVis.height);window.gradient.addColorStop(.9999,"rgba(0, 0, 0, 0.54)");window.gradient.addColorStop(.2,"rgba(0, 0, 0, 0.65)");window.gradient.addColorStop(.06,"rgba(0, 0, 0, 0.82)");window.gradient.addColorStop(.059999,"rgba(0, 0, 0, 0.0)");window.gradient.addColorStop(.00001,"rgba(0, 0, 0, 0.6)");window.canvasVisCtx.fillStyle=window.gradient;for(a=0;a<window.numBars;a+=
1){for(var b=window.sum=0;b<window.binSize;b+=1)window.sum+=window.data[a*window.binSize+b];window.average=window.sum/window.binSize;window.barWidth=window.canvasVis.width/window.numBars;window.scaledAverage=window.average/256*window.canvasVis.height;window.canvasVisCtx.fillRect(a*window.barWidth,window.canvasVis.height,window.barWidth/1.6,-window.scaledAverage)}};window.source1=window.context.createMediaElementSource(window.audioE);window.source1.connect(window.analyser);window.analyser.connect(window.context.destination);
window.freqanalyser();window.resizeCanvas=function(){window.canvasVis.width=window.innerWidth;window.canvasVis.height=window.innerHeight/2};window.addEventListener("resize",window.resizeCanvas,!1);window.resizeCanvas()},function(b,d){window.stats={radioName:null,listeners:0,title:null};window.jsonUpdate=function(){return fetch("http://192.30.164.78:8000/status-json.xsl").then(function(a){return a.json()}).then(function(a){window.json0=a;if(window.json0.icestats.source.length)for(a=0;a<window.json0.icestats.source.length;a+=
1){if(window.source=window.json0.icestats.source[a],"http://192.30.164.78:8000/stream"!==window.source.listenurl)"http://192.30.164.78:8000/bahia"===window.source.listenurl&&window.json0.icestats.source[0].stream_start?(window.live=!0,window.json1=window.source):"http://192.30.164.78:8000/bahia"!==window.source.listenurl||window.json0.icestats.source[0].stream_start?"http://192.30.164.78:8000/bahiaCabina"!==window.source.listenurl||window.live||(window.live=!1,window.json1=window.source):window.live=
!1}else window.json1=window.json0.icestats.source;window.stats.radioName=window.json1.server_name;window.stats.listeners=window.json1.listeners;window.stats.title=window.json1.title;document.title=window.stats.title;document.getElementById("statsDiv").innerText=window.stats.title;document.getElementById("listenersDiv").innerText="Oyentes: ".concat(window.stats.listeners)}).catch(function(a){window.stats.title="Offline"})};window.setInterval(function(){return window.jsonUpdate()},8E3);window.onload=
function(){return window.jsonUpdate()}}]);