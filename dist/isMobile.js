(function(b,c){if('object'==typeof exports&&'object'==typeof module)module.exports=c();else if('function'==typeof define&&define.amd)define([],c);else{var d=c();for(var a in d)('object'==typeof exports?exports:b)[a]=d[a]}})(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=3)}({3:function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.isMobile=function(){var a=navigator.userAgent;return 0<a.indexOf('iPhone')||0<a.indexOf('iPod')||0<a.indexOf('Android')&&0<a.indexOf('Mobile')||0<a.indexOf('Windows Phone')}}})});