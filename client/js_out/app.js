/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var a = __webpack_require__(1);

	a();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	let HomeIntroView = React.createClass({displayName: "HomeIntroView",
	    render: function () {
	        return (
	            React.createElement("div", {className: "home-page-intro"}, 
	                React.createElement("div", {className: "cell"}, 
	                    React.createElement("div", {className: "cook-hat"}, 
	                        React.createElement("img", {src: "img/cook-hat.png", alt: "cook-hat"})
	                    ), 

	                    React.createElement("h1", null, "Hell yeah dish! ", React.createElement("small", null, "You smell what he is cooking?"))
	                ), 

	                React.createElement("ul", {className: "home-menu"}, 
	                    React.createElement("li", {className: "active"}, React.createElement("a", {href: "javascript:void(0)"}, "Home")), 
	                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)"}, "Second Place")), 
	                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)"}, "Contacts")), 
	                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)"}, "Popular")), 
	                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)"}, "About")), 
	                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)"}, "Some words"))
	                )
	            )
	        )
	    }
	});

	let HomeView = React.createClass({displayName: "HomeView",
	    render: function () {
	        return (
	            React.createElement("div", {className: "home-page"}, 
	                React.createElement(HomeIntroView, null)
	            )
	        );
	    }
	});

	module.exports = function () {
	    React.render(React.createElement(HomeView, null), document.querySelector('.application-root'));
	};

/***/ }
/******/ ]);