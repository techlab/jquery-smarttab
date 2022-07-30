"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
* jQuery SmartTab v4.0.2
* The flexible tab control plugin for jQuery
* http://www.techlaboratory.net/jquery-smarttab
*
* Created by Dipu Raj (http://dipu.me)
*
* Licensed under the terms of the MIT License
* https://github.com/techlab/jquery-smarttab/blob/master/LICENSE
*/
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }

      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  "use strict"; // Default options

  var defaults = {
    selected: 0,
    // Initial selected tab, 0 = first tab
    theme: 'basic',
    // Theme, related css need to include for other than default theme
    justified: true,
    // Nav menu justification. true/false
    autoAdjustHeight: true,
    // Automatically adjust content height
    backButtonSupport: true,
    // Enable the back button support
    enableUrlHash: true,
    // Enable selection of the step based on url hash
    transition: {
      animation: 'none',
      // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
      speed: '400',
      // Animation speed. Not used if animation is 'css'
      easing: '',
      // Animation easing. Not supported without a jQuery easing plugin. Not used if animation is 'css'
      prefixCss: '',
      // Only used if animation is 'css'. Animation CSS prefix
      fwdShowCss: '',
      // Only used if animation is 'css'. Step show Animation CSS on forward direction
      fwdHideCss: '',
      // Only used if animation is 'css'. Step hide Animation CSS on forward direction
      bckShowCss: '',
      // Only used if animation is 'css'. Step show Animation CSS on backward direction
      bckHideCss: '' // Only used if animation is 'css'. Step hide Animation CSS on backward direction

    },
    autoProgress: {
      // Auto navigate tabs on interval
      enabled: false,
      // Enable/Disable Auto navigation
      interval: 3500,
      // Auto navigate Interval (used only if "autoProgress" is enabled)
      stopOnFocus: true // Stop auto navigation on focus and resume on outfocus

    },
    keyboard: {
      keyNavigation: true,
      // Enable/Disable keyboard navigation(left and right keys are used if enabled)
      keyLeft: [37, 38],
      // Left key code
      keyRight: [39, 40],
      // Right key code
      keyHome: [36],
      // Home key code
      keyEnd: [35] // End key code

    },
    style: {
      // CSS Class settings
      mainCss: 'st',
      navCss: 'nav',
      navLinkCss: 'nav-link',
      contentCss: 'tab-content',
      contentPanelCss: 'tab-pane',
      themePrefixCss: 'st-theme-',
      justifiedCss: 'st-justified',
      anchorDefaultCss: 'default',
      anchorActiveCss: 'active',
      loaderCss: 'st-loading'
    },
    getContent: null // Callback function for content loading

  };

  var SmartTab = /*#__PURE__*/function () {
    function SmartTab(element, options) {
      var _this = this;

      _classCallCheck(this, SmartTab);

      // Merge user settings with default
      this.options = $.extend(true, {}, defaults, options); // Main container element

      this.main = $(element); // Navigation bar element

      this.nav = this._getFirstDescendant('.' + this.options.style.navCss); // Content container

      this.container = this._getFirstDescendant('.' + this.options.style.contentCss); // Tab anchor elements

      this.tabs = this.nav.find('.' + this.options.style.navLinkCss); // Content pages

      this.pages = this.container.children('.' + this.options.style.contentPanelCss); // Initial index

      this.current_index = -1; // Autoprogress timer id

      this.autoProgressId = null; // Is initialiazed

      this.is_init = false; // Initialize options

      this._init(); // Load asynchronously


      setTimeout(function () {
        _this._load();
      }, 0);
    } // Initialize options


    _createClass(SmartTab, [{
      key: "_init",
      value: function _init() {
        // Set the elements
        this._setElements(); // Skip if already init


        if (this.is_init === true) return true; // Assign plugin events

        this._setEvents();

        this.is_init = true; // Trigger the initialized event

        this._triggerEvent("initialized");
      } // Initial Load Method

    }, {
      key: "_load",
      value: function _load() {
        // Clean the elements
        this.pages.hide(); // Clear other states from the steps

        this.tabs.removeClass(this.options.style.anchorActiveCss); // Initial step index

        this.current_index = -1; // Get the initial step index

        var idx = this._getURLHashIndex();

        idx = idx ? idx : this.options.selected; // Show the initial step

        this._showTab(idx); // Trigger the loaded event


        this._triggerEvent("loaded");
      }
    }, {
      key: "_getFirstDescendant",
      value: function _getFirstDescendant(selector) {
        // Check for first level element
        var elm = this.main.children(selector);

        if (elm.length > 0) {
          return elm;
        } // Check for second level element


        this.main.children().each(function (i, n) {
          var tmp = $(n).children(selector);

          if (tmp.length > 0) {
            elm = tmp;
            return false;
          }
        });

        if (elm.length > 0) {
          return elm;
        } // Element not found


        this._showError("Element not found " + selector);

        return false;
      }
    }, {
      key: "_setElements",
      value: function _setElements() {
        var _this2 = this;

        // Set the main element classes including theme css
        this.main.removeClass(function (i, className) {
          return (className.match(new RegExp('(^|\\s)' + _this2.options.style.themePrefixCss + '\\S+', 'g')) || []).join(' ');
        }).addClass(this.options.style.mainCss + ' ' + this.options.style.themePrefixCss + this.options.theme); // Set justify option

        this.main.toggleClass(this.options.style.justifiedCss, this.options.justified);
      }
    }, {
      key: "_setEvents",
      value: function _setEvents() {
        var _this3 = this;

        // Anchor click event
        this.tabs.on("click", function (e) {
          e.preventDefault();
          var elm = $(e.currentTarget);

          if (_this3._isShowable(elm)) {
            // Get the step index
            _this3._showTab(_this3.tabs.index(elm));
          }
        });

        if (this.options.autoProgress.enabled && this.options.autoProgress.stopOnFocus) {
          $(this.main).on("mouseover", function (e) {
            e.preventDefault();

            _this3._stopAutoProgress();
          });
          $(this.main).on("mouseleave", function (e) {
            e.preventDefault();

            _this3._startAutoProgress();
          });
        } // Keyboard navigation event            


        $(document).keyup(function (e) {
          _this3._keyNav(e);
        }); // Back/forward browser button event

        $(window).on('hashchange', function (e) {
          if (_this3.options.backButtonSupport !== true) {
            return;
          }

          var idx = _this3._getURLHashIndex();

          if (idx && _this3._isShowable(_this3.tabs.eq(idx))) {
            e.preventDefault();

            _this3._showTab(idx);
          }
        }); // Fix content height on window resize

        $(window).on('resize', function (e) {
          _this3._fixHeight(_this3.current_index);
        });
      }
    }, {
      key: "_navigate",
      value: function _navigate(dir) {
        if (dir == 'first') {
          this._showTab(this._getShowable(-1, 'next'));
        } else if (dir == 'last') {
          this._showTab(this._getShowable(this.tabs.length, 'prev'));
        } else {
          this._showTab(this._getShowable(this.current_index, dir));
        }
      }
    }, {
      key: "_showTab",
      value: function _showTab(idx) {
        var _this4 = this;

        if (idx === -1 || idx === null) return false; // If current step is requested again, skip

        if (idx == this.current_index) return false; // If step not found, skip

        if (!this.tabs.eq(idx)) return false; // If it is a disabled step, skip

        if (!this._isEnabled(this.tabs.eq(idx))) return false; // Get the direction of navigation

        var stepDirection = this._getStepDirection(idx);

        if (this.current_index !== -1) {
          // Trigger "leaveStep" event
          if (this._triggerEvent("leaveTab", [this._getAnchor(this.current_index), this.current_index, idx, stepDirection]) === false) {
            return false;
          }
        }

        this._loadContent(idx, function () {
          // Get step to show element
          var selTab = _this4._getAnchor(idx); // Change the url hash to new step


          _this4._setURLHash(selTab.attr("href")); // Update controls


          _this4._setAnchor(idx); // Get current step element


          var curPage = _this4._getPage(_this4.current_index); // Get next step element


          var selPage = _this4._getPage(idx); // transit the step


          _this4._transit(selPage, curPage, stepDirection, function () {
            // Fix height with content
            _this4._fixHeight(idx); // Trigger "showStep" event


            _this4._triggerEvent("showTab", [selTab, idx, _this4._getStepPosition(idx)]);
          }); // Update the current index


          _this4.current_index = idx;
        });
      }
    }, {
      key: "_getShowable",
      value: function _getShowable(idx, dir) {
        var _this5 = this;

        var si = null;
        var elmList = dir == 'prev' ? $(this.tabs.slice(0, idx).get().reverse()) : this.tabs.slice(idx + 1); // Find the next showable step in the direction

        elmList.each(function (i, elm) {
          if (_this5._isEnabled($(elm))) {
            si = dir == 'prev' ? idx - (i + 1) : i + idx + 1;
            return false;
          }
        });
        return si;
      }
    }, {
      key: "_isShowable",
      value: function _isShowable(elm) {
        if (!this._isEnabled(elm)) {
          return false;
        }

        return true;
      }
    }, {
      key: "_isEnabled",
      value: function _isEnabled(elm) {
        return elm.hasClass(this.options.style.anchorDisabledCss) || elm.hasClass(this.options.style.anchorHiddenCss) ? false : true;
      }
    }, {
      key: "_getStepDirection",
      value: function _getStepDirection(idx) {
        return this.current_index < idx ? "forward" : "backward";
      }
    }, {
      key: "_getStepPosition",
      value: function _getStepPosition(idx) {
        if (idx === 0) {
          return 'first';
        } else if (idx === this.tabs.length - 1) {
          return 'last';
        }

        return 'middle';
      }
    }, {
      key: "_getAnchor",
      value: function _getAnchor(idx) {
        if (idx == null || idx == -1) return null;
        return this.tabs.eq(idx);
      }
    }, {
      key: "_getPage",
      value: function _getPage(idx) {
        if (idx == null || idx == -1) return null;
        return this.pages.eq(idx);
      }
    }, {
      key: "_loadContent",
      value: function _loadContent(idx, callback) {
        if (!$.isFunction(this.options.getContent)) {
          callback();
          return;
        }

        var selPage = this._getPage(idx);

        if (!selPage) {
          callback();
          return;
        } // Get step direction


        var stepDirection = this._getStepDirection(idx); // Get step position


        var stepPosition = this._getStepPosition(idx); // Get next step element


        var selTab = this._getAnchor(idx);

        this.options.getContent(idx, stepDirection, stepPosition, selTab, function (content) {
          if (content) selPage.html(content);
          callback();
        });
      }
    }, {
      key: "_transit",
      value: function _transit(elmToShow, elmToHide, stepDirection, callback) {
        var transitFn = $.fn.smartTab.transitions[this.options.transition.animation];

        this._stopAnimations();

        if ($.isFunction(transitFn)) {
          transitFn(elmToShow, elmToHide, stepDirection, this, function (res) {
            if (res === false) {
              if (elmToHide !== null) elmToHide.hide();
              elmToShow.show();
            }

            callback();
          });
        } else {
          if (elmToHide !== null) elmToHide.hide();
          elmToShow.show();
          callback();
        }
      }
    }, {
      key: "_stopAnimations",
      value: function _stopAnimations() {
        if ($.isFunction(this.container.finish)) {
          this.pages.finish();
          this.container.finish();
        }
      }
    }, {
      key: "_fixHeight",
      value: function _fixHeight(idx) {
        if (this.options.autoAdjustHeight === false) {
          this.container.css('height', 'auto');
          return;
        } // Auto adjust height of the container


        var contentHeight = this._getPage(idx).outerHeight();

        if ($.isFunction(this.container.finish) && $.isFunction(this.container.animate) && contentHeight > 0) {
          this.container.finish().animate({
            height: contentHeight
          }, this.options.transition.speed);
        } else {
          this.container.css({
            height: contentHeight > 0 ? contentHeight : 'auto'
          });
        }
      }
    }, {
      key: "_setAnchor",
      value: function _setAnchor(idx) {
        // Current step anchor > Remove other classes
        if (this.current_index !== null && this.current_index >= 0) {
          this.tabs.eq(this.current_index).removeClass(this.options.style.anchorActiveCss);
        } // Next step anchor > Remove other classes and add active class


        this.tabs.eq(idx).addClass(this.options.style.anchorActiveCss);
      } // HELPER FUNCTIONS

    }, {
      key: "_keyNav",
      value: function _keyNav(e) {
        if (!this.options.keyboard.keyNavigation) {
          return;
        } // Keyboard navigation


        if ($.inArray(e.which, this.options.keyboard.keyLeft) > -1) {
          // left
          this._navigate('prev');

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboard.keyRight) > -1) {
          // right
          this._navigate('next');

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboard.keyHome) > -1) {
          // first
          this._navigate('first');

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboard.keyEnd) > -1) {
          // last
          this._navigate('last');

          e.preventDefault();
        } else {
          return; // exit this handler for other keys
        }
      }
    }, {
      key: "_triggerEvent",
      value: function _triggerEvent(name, params) {
        // Trigger an event
        var e = $.Event(name);
        this.main.trigger(e, params);

        if (e.isDefaultPrevented()) {
          return false;
        }

        return e.result;
      }
    }, {
      key: "_setURLHash",
      value: function _setURLHash(hash) {
        if (this.options.enableUrlHash && window.location.hash !== hash) {
          history.pushState(null, null, hash);
        }
      }
    }, {
      key: "_getURLHashIndex",
      value: function _getURLHashIndex() {
        if (this.options.enableUrlHash) {
          // Get step number from url hash if available
          var hash = window.location.hash;

          if (hash.length > 0) {
            var elm = this.nav.find("a[href*='" + hash + "']");

            if (elm.length > 0) {
              return this.tabs.index(elm);
            }
          }
        }

        return false;
      }
    }, {
      key: "_showError",
      value: function _showError(msg) {
        console.error(msg);
      } // Auto progress

    }, {
      key: "_startAutoProgress",
      value: function _startAutoProgress() {
        var _this6 = this;

        if (this.options.autoProgress.enabled && !this.autoProgressId) {
          this.autoProgressId = setInterval(function () {
            return _this6._navigate('next');
          }, this.options.autoProgress.interval);
        }
      }
    }, {
      key: "_stopAutoProgress",
      value: function _stopAutoProgress() {
        if (this.autoProgressId) {
          clearInterval(this.autoProgressId);
          this.autoProgressId = null;
        }
      }
    }, {
      key: "_restartAutoProgress",
      value: function _restartAutoProgress() {
        this._stopAutoProgress();

        this._startAutoProgress();
      } // PUBLIC FUNCTIONS

    }, {
      key: "goToTab",
      value: function goToTab(index) {
        if (!this._isShowable(this.tabs.eq(index))) {
          return;
        }

        this._showTab(index);
      }
    }, {
      key: "next",
      value: function next() {
        this._navigate('next');
      }
    }, {
      key: "prev",
      value: function prev() {
        this._navigate('prev');
      }
    }, {
      key: "first",
      value: function first() {
        this._navigate('first');
      }
    }, {
      key: "last",
      value: function last() {
        this._navigate('last');
      }
    }, {
      key: "reset",
      value: function reset() {
        // Clear css from steps except default, hidden and disabled
        this.tabs.removeClass(this.options.style.anchorActiveCss); // Reset all

        this._setURLHash('#');

        this._init();

        this._load();
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.options = $.extend(true, {}, this.options, options);

        this._init();
      }
    }, {
      key: "getOptions",
      value: function getOptions() {
        return this.options;
      }
    }, {
      key: "getInfo",
      value: function getInfo() {
        return {
          currentPage: this.current_index ? this.current_index : 0,
          totalPages: this.tabs ? this.tabs.length : 0
        };
      }
    }, {
      key: "loader",
      value: function loader(state) {
        this.main.toggleClass(this.options.style.loaderCss, state === "show");
      }
    }, {
      key: "fixHeight",
      value: function fixHeight() {
        this._fixHeight(this.current_index);
      }
    }]);

    return SmartTab;
  }(); // Wrapper for the plugin


  $.fn.smartTab = function (options) {
    if (options === undefined || _typeof(options) === 'object') {
      return this.each(function () {
        if (!$.data(this, "smartTab")) {
          $.data(this, "smartTab", new SmartTab(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var instance = $.data(this[0], 'smartTab');

      if (options === 'destroy') {
        $.data(this, 'smartTab', null);
      }

      if (instance instanceof SmartTab && typeof instance[options] === 'function') {
        return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
      } else {
        return this;
      }
    }
  }; // Transition effects


  $.fn.smartTab.transitions = {
    fade: function fade(elmToShow, elmToHide, stepDirection, mainObj, callback) {
      if (!$.isFunction(elmToShow.fadeOut)) {
        callback(false);
        return;
      }

      if (elmToHide) {
        elmToHide.fadeOut(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
          elmToShow.fadeIn(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
            callback();
          });
        });
      } else {
        elmToShow.fadeIn(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
          callback();
        });
      }
    },
    slideSwing: function slideSwing(elmToShow, elmToHide, stepDirection, mainObj, callback) {
      if (!$.isFunction(elmToShow.slideDown)) {
        callback(false);
        return;
      }

      if (elmToHide) {
        elmToHide.slideUp(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
          elmToShow.slideDown(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
            callback();
          });
        });
      } else {
        elmToShow.slideDown(mainObj.options.transition.speed, mainObj.options.transition.easing, function () {
          callback();
        });
      }
    },
    slideHorizontal: function slideHorizontal(elmToShow, elmToHide, stepDirection, mainObj, callback) {
      if (!$.isFunction(elmToShow.animate)) {
        callback(false);
        return;
      } // Horizontal slide


      var animFn = function animFn(elm, iniLeft, finLeft, cb) {
        elm.css({
          position: 'absolute',
          left: iniLeft
        }).show().animate({
          left: finLeft
        }, mainObj.options.transition.speed, mainObj.options.transition.easing, cb);
      };

      if (mainObj.current_index == -1) {
        // Set container height at page load 
        mainObj.container.height(elmToShow.outerHeight());
      }

      var containerWidth = mainObj.container.width();

      if (elmToHide) {
        var initCss1 = elmToHide.css(["position", "left"]);
        var finLeft = containerWidth * (stepDirection == 'backward' ? 1 : -1);
        animFn(elmToHide, 0, finLeft, function () {
          elmToHide.hide().css(initCss1);
        });
      }

      var initCss2 = elmToShow.css(["position"]);
      var iniLeft = containerWidth * (stepDirection == 'backward' ? -2 : 1);
      animFn(elmToShow, iniLeft, 0, function () {
        elmToShow.css(initCss2);
        callback();
      });
    },
    slideVertical: function slideVertical(elmToShow, elmToHide, stepDirection, mainObj, callback) {
      if (!$.isFunction(elmToShow.animate)) {
        callback(false);
        return;
      } // Vertical slide


      var animFn = function animFn(elm, iniTop, finTop, cb) {
        elm.css({
          position: 'absolute',
          top: iniTop
        }).show().animate({
          top: finTop
        }, mainObj.options.transition.speed, mainObj.options.transition.easing, cb);
      };

      if (mainObj.current_index == -1) {
        // Set container height at page load 
        mainObj.container.height(elmToShow.outerHeight());
      }

      var containerHeight = mainObj.container.height();

      if (elmToHide) {
        var initCss1 = elmToHide.css(["position", "top"]);
        var finTop = containerHeight * (stepDirection == 'backward' ? -1 : 1);
        animFn(elmToHide, 0, finTop, function () {
          elmToHide.hide().css(initCss1);
        });
      }

      var initCss2 = elmToShow.css(["position"]);
      var iniTop = containerHeight * (stepDirection == 'backward' ? 1 : -2);
      animFn(elmToShow, iniTop, 0, function () {
        elmToShow.css(initCss2);
        callback();
      });
    },
    css: function css(elmToShow, elmToHide, stepDirection, mainObj, callback) {
      if (mainObj.options.transition.fwdHideCss.length == 0 || mainObj.options.transition.bckHideCss.length == 0) {
        callback(false);
        return;
      } // CSS Animation


      var animFn = function animFn(elm, animation, cb) {
        if (!animation || animation.length == 0) cb();
        elm.addClass(animation).one("animationend", function (e) {
          $(e.currentTarget).removeClass(animation);
          cb();
        });
        elm.addClass(animation).one("animationcancel", function (e) {
          $(e.currentTarget).removeClass(animation);
          cb('cancel');
        });
      };

      var showCss = mainObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? mainObj.options.transition.bckShowCss : mainObj.options.transition.fwdShowCss);

      if (elmToHide) {
        var hideCss = mainObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? mainObj.options.transition.bckHideCss : mainObj.options.transition.fwdHideCss);
        animFn(elmToHide, hideCss, function () {
          elmToHide.hide();
          animFn(elmToShow, showCss, function () {
            callback();
          });
          elmToShow.show();
        });
      } else {
        animFn(elmToShow, showCss, function () {
          callback();
        });
        elmToShow.show();
      }
    }
  };
});