"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * jQuery SmartTab v3.0.0
 * The flexible jQuery tab control plugin
 * http://www.techlaboratory.net/jquery-smarttab
 *
 * Created by Dipu Raj
 * http://dipu.me
 *
 * @license Licensed under the terms of the MIT License
 * https://github.com/techlab/jquery-smarttab/blob/master/LICENSE
 */
;

(function ($, window, document, undefined) {
  "use strict"; // Default options

  var defaults = {
    selected: 0,
    // Initial selected tab, 0 = first tab
    theme: 'default',
    // theme for the tab, related css need to include for other than default theme
    orientation: 'horizontal',
    // Nav menu orientation. horizontal/vertical
    justified: true,
    // Nav menu justification. true/false
    autoAdjustHeight: true,
    // Automatically adjust content height
    backButtonSupport: true,
    // Enable the back button support
    enableURLhash: true,
    // Enable selection of the tab based on url hash
    transition: {
      animation: 'none',
      // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
      speed: '400',
      // Transion animation speed
      easing: '' // Transition animation easing. Not supported without a jQuery easing plugin

    },
    autoProgress: {
      // Auto navigate tabs on interval
      enabled: false,
      // Enable/Disable Auto navigation
      interval: 3500,
      // Auto navigate Interval (used only if "autoProgress" is set to true)
      stopOnFocus: true // Stop auto navigation on focus and resume on outfocus

    },
    keyboardSettings: {
      keyNavigation: true,
      // Enable/Disable keyboard navigation(left and right keys are used if enabled)
      keyLeft: [37],
      // Left key code
      keyRight: [39] // Right key code

    }
  };

  var SmartTab = /*#__PURE__*/function () {
    function SmartTab(element, options) {
      _classCallCheck(this, SmartTab);

      // Merge user settings with default
      this.options = $.extend(true, {}, defaults, options); // Main container element

      this.main = $(element); // Navigation bar element

      this.nav = this._getFirstDescendant('.nav'); // Tab anchor elements

      this.tabs = this.nav.find('.nav-link'); // Content container

      this.container = this._getFirstDescendant('.tab-content'); // Content pages

      this.pages = this.container.children('.tab-pane'); // Active Tab index

      this.current_index = null; // Autoprogress timer id

      this.autoProgressId = null; // Clean the elements

      this.pages.hide();
      this.tabs.removeClass('active'); // Call initial method

      this.init();
    } // Initial Method


    _createClass(SmartTab, [{
      key: "init",
      value: function init() {
        // Set the elements
        this._setElements(); // Assign plugin events


        this._setEvents(); // Get the initial tab index


        var idx = this._getTabIndex(); // Show the initial tab


        this._showTab(idx);
      } // PRIVATE FUNCTIONS

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
        // Set the main element
        this.main.addClass('st');

        if (this.options.justified === true) {
          this.main.addClass('st-justified');
        } else {
          this.main.removeClass('st-justified');
        }

        this._setTheme(this.options.theme);

        this._setOrientation(this.options.orientation);
      }
    }, {
      key: "_setEvents",
      value: function _setEvents() {
        var _this = this;

        // Check if event handler already exists
        if (this.main.data('click-init')) {
          return true;
        } // Flag item to prevent attaching handler again


        this.main.data('click-init', true); // Anchor click event

        $(this.tabs).on("click", function (e) {
          e.preventDefault();

          _this._showTab(_this.tabs.index(e.currentTarget));
        }); // Keyboard navigation event

        if (this.options.keyboardSettings.keyNavigation) {
          $(document).keyup(function (e) {
            _this._keyNav(e);
          });
        } // Back/forward browser button event


        if (this.options.backButtonSupport) {
          $(window).on('hashchange', function (e) {
            var idx = _this._getURLHashIndex();

            if (idx !== false) {
              e.preventDefault();

              _this._showTab(idx);
            }
          });
        }

        if (this.options.autoProgress.enabled && this.options.autoProgress.stopOnFocus) {
          $(this.main).on("mouseover", function (e) {
            e.preventDefault();

            _this._stopAutoProgress();
          });
          $(this.main).on("mouseleave", function (e) {
            e.preventDefault();

            _this._startAutoProgress();
          });
        }
      }
    }, {
      key: "_showNext",
      value: function _showNext() {
        var si = 0; // Find the next showable step

        for (var i = this.current_index + 1; i < this.tabs.length; i++) {
          if (this._isShowable(i)) {
            si = i;
            break;
          }
        }

        this._showTab(si);
      }
    }, {
      key: "_showPrevious",
      value: function _showPrevious() {
        var si = this.tabs.length - 1; // Find the previous showable step

        for (var i = this.current_index - 1; i >= 0; i--) {
          if (this._isShowable(i)) {
            si = i;
            break;
          }
        }

        this._showTab(si);
      }
    }, {
      key: "_isShowable",
      value: function _isShowable(idx) {
        if (this.tabs.eq(idx).hasClass('disabled') || this.tabs.eq(idx).hasClass('hidden')) {
          return false;
        }

        return true;
      }
    }, {
      key: "_showTab",
      value: function _showTab(idx) {
        // If current tab is requested again, skip
        if (idx == this.current_index) {
          return false;
        } // If tab not found, skip


        if (!this.tabs.eq(idx)) {
          return false;
        } // If it is a disabled tab, skip


        if (!this._isShowable(idx)) {
          return false;
        } // Load tab content


        this._loadTab(idx);
      }
    }, {
      key: "_loadTab",
      value: function _loadTab(idx) {
        var _this2 = this;

        // Get current tab element
        var curTab = this._getAnchor(this.current_index);

        if (this.current_index !== null) {
          // Trigger "leaveTab" event
          if (this._triggerEvent("leaveTab", [curTab, this.current_index]) === false) {
            return false;
          }
        } // Get next tab element


        var selTab = this._getAnchor(idx); // Get the content if used


        var getTabContent = this._triggerEvent("tabContent", [selTab, idx]);

        if (getTabContent) {
          if (_typeof(getTabContent) == "object") {
            getTabContent.then(function (res) {
              _this2._setTabContent(idx, res);

              _this2._transitTab(idx);
            })["catch"](function (err) {
              console.error(err);

              _this2._setTabContent(idx, err);

              _this2._transitTab(idx);
            });
          } else if (typeof getTabContent == "string") {
            this._setTabContent(idx, getTabContent);

            this._transitTab(idx);
          } else {
            this._transitTab(idx);
          }
        } else {
          this._transitTab(idx);
        }
      }
    }, {
      key: "_getAnchor",
      value: function _getAnchor(idx) {
        if (idx == null) {
          return null;
        }

        return this.tabs.eq(idx);
      }
    }, {
      key: "_getPage",
      value: function _getPage(idx) {
        if (idx == null) {
          return null;
        }

        var anchor = this._getAnchor(idx);

        return anchor.length > 0 ? this.main.find(anchor.attr("href")) : null;
      }
    }, {
      key: "_setTabContent",
      value: function _setTabContent(idx, html) {
        var page = this._getPage(idx);

        if (page) {
          page.html(html);
        }
      }
    }, {
      key: "_transitTab",
      value: function _transitTab(idx) {
        var _this3 = this;

        // Get tab to show element
        var selTab = this._getAnchor(idx); // Change the url hash to new tab


        this._setURLHash(selTab.attr("href")); // Update controls


        this._setAnchor(idx); // Animate the tab


        this._doTabAnimation(idx, function () {
          // Fix height with content
          _this3._fixHeight(idx); // Trigger "showTab" event


          _this3._triggerEvent("showTab", [selTab, _this3.current_index]); // Restart auto progress if enabled


          _this3._restartAutoProgress();
        }); // Update the current index


        this.current_index = idx;
      }
    }, {
      key: "_doTabAnimation",
      value: function _doTabAnimation(idx, callback) {
        var _this4 = this;

        // Get current tab element
        var curPage = this._getPage(this.current_index); // Get next tab element


        var selPage = this._getPage(idx); // Get the transition effect


        var transitionEffect = this.options.transition.animation.toLowerCase(); // Complete any ongoing animations

        this._stopAnimations();

        switch (transitionEffect) {
          case 'slide-horizontal':
          case 'slide-h':
            // horizontal slide
            var containerWidth = this.container.width();
            var curLastLeft = containerWidth;
            var nextFirstLeft = containerWidth * -2; // Forward direction

            if (idx > this.current_index) {
              curLastLeft = containerWidth * -1;
              nextFirstLeft = containerWidth;
            } // First load set the container width


            if (this.current_index == null) {
              this.container.height(selPage.outerHeight());
            }

            var css_pos, css_left;

            if (curPage) {
              css_pos = curPage.css("position");
              css_left = curPage.css("left");
              curPage.css("position", 'absolute').css("left", 0).animate({
                left: curLastLeft
              }, this.options.transition.speed, this.options.transition.easing, function () {
                $(this).hide();
                curPage.css("position", css_pos).css("left", css_left);
              });
            }

            css_pos = selPage.css("position");
            css_left = selPage.css("left");
            selPage.css("position", 'absolute').css("left", nextFirstLeft).outerWidth(containerWidth).show().animate({
              left: 0
            }, this.options.transition.speed, this.options.transition.easing, function () {
              selPage.css("position", css_pos).css("left", css_left);
              callback();
            });
            break;

          case 'slide-vertical':
          case 'slide-v':
            // vertical slide
            var containerHeight = this.container.height();
            var curLastTop = containerHeight;
            var nextFirstTop = containerHeight * -2; // Forward direction

            if (idx > this.current_index) {
              curLastTop = containerHeight * -1;
              nextFirstTop = containerHeight;
            }

            var css_vpos, css_vtop;

            if (curPage) {
              css_vpos = curPage.css("position");
              css_vtop = curPage.css("top");
              curPage.css("position", 'absolute').css("top", 0).animate({
                top: curLastTop
              }, this.options.transition.speed, this.options.transition.easing, function () {
                $(this).hide();
                curPage.css("position", css_vpos).css("top", css_vtop);
              });
            }

            css_vpos = selPage.css("position");
            css_vtop = selPage.css("top");
            selPage.css("position", 'absolute').css("top", nextFirstTop).show().animate({
              top: 0
            }, this.options.transition.speed, this.options.transition.easing, function () {
              selPage.css("position", css_vpos).css("top", css_vtop);
              callback();
            });
            break;

          case 'slide-swing':
          case 'slide-s':
            // normal slide
            if (curPage) {
              curPage.slideUp('fast', this.options.transition.easing, function () {
                selPage.slideDown(_this4.options.transition.speed, _this4.options.transition.easing, function () {
                  callback();
                });
              });
            } else {
              selPage.slideDown(this.options.transition.speed, this.options.transition.easing, function () {
                callback();
              });
            }

            break;

          case 'fade':
            // normal fade
            if (curPage) {
              curPage.fadeOut('fast', this.options.transition.easing, function () {
                selPage.fadeIn('fast', _this4.options.transition.easing, function () {
                  callback();
                });
              });
            } else {
              selPage.fadeIn(this.options.transition.speed, this.options.transition.easing, function () {
                callback();
              });
            }

            break;

          default:
            if (curPage) {
              curPage.hide();
            }

            selPage.show();
            callback();
            break;
        }
      }
    }, {
      key: "_stopAnimations",
      value: function _stopAnimations() {
        this.pages.finish();
        this.container.finish();
      }
    }, {
      key: "_setAnchor",
      value: function _setAnchor(idx) {
        this.tabs.eq(this.current_index).removeClass("active");
        this.tabs.eq(idx).addClass("active");
      }
    }, {
      key: "_getTabIndex",
      value: function _getTabIndex() {
        // Get selected tab from the url
        var idx = this._getURLHashIndex();

        return idx === false ? this.options.selected : idx;
      }
    }, {
      key: "_fixHeight",
      value: function _fixHeight(idx) {
        // Auto adjust height of the container
        if (this.options.autoAdjustHeight) {
          var selPage = this._getPage(idx);

          this.container.finish().animate({
            height: selPage.outerHeight()
          }, this.options.transition.speed);
        }
      }
    }, {
      key: "_setTheme",
      value: function _setTheme(theme) {
        this.main.removeClass(function (index, className) {
          return (className.match(/(^|\s)st-theme-\S+/g) || []).join(' ');
        }).addClass('st-theme-' + theme);
      }
    }, {
      key: "_setOrientation",
      value: function _setOrientation(orientation) {
        this.main.removeClass('st-vertical st-horizontal').addClass('st-' + orientation);
      } // HELPER FUNCTIONS

    }, {
      key: "_keyNav",
      value: function _keyNav(e) {
        // Keyboard navigation
        if ($.inArray(e.which, this.options.keyboardSettings.keyLeft) > -1) {
          // left
          this._showPrevious();

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboardSettings.keyRight) > -1) {
          // right
          this._showNext();

          e.preventDefault();
        } else {
          return; // exit this handler for other keys
        }
      } // Auto progress

    }, {
      key: "_startAutoProgress",
      value: function _startAutoProgress() {
        var _this5 = this;

        if (this.options.autoProgress.enabled && !this.autoProgressId) {
          this.autoProgressId = setInterval(function () {
            return _this5._showNext();
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
        if (this.options.enableURLhash && window.location.hash !== hash) {
          history.pushState(null, null, hash);
        }
      }
    }, {
      key: "_getURLHashIndex",
      value: function _getURLHashIndex() {
        if (this.options.enableURLhash) {
          // Get tab number from url hash if available
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
      key: "_loader",
      value: function _loader(action) {
        switch (action) {
          case 'show':
            this.main.addClass('st-loading');
            break;

          case 'hide':
            this.main.removeClass('st-loading');
            break;

          default:
            this.main.toggleClass('st-loading');
        }
      }
    }, {
      key: "_showError",
      value: function _showError(msg) {
        console.error(msg);
      } // PUBLIC FUNCTIONS

    }, {
      key: "goToTab",
      value: function goToTab(tabIndex) {
        this._showTab(tabIndex);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.options = $.extend(true, {}, this.options, options);
        this.init();
      }
    }, {
      key: "loader",
      value: function loader(state) {
        if (state === "show") {
          this.main.addClass('st-loading');
        } else {
          this.main.removeClass('st-loading');
        }
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
  };
})(jQuery, window, document);