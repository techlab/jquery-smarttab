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
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
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
}(function ($) {
    "use strict";

    // Default options
    const defaults = {
        selected: 0, // Initial selected tab, 0 = first tab
        theme: 'basic', // Theme, related css need to include for other than default theme
        justified: true, // Nav menu justification. true/false
        autoAdjustHeight: true, // Automatically adjust content height
        backButtonSupport: true, // Enable the back button support
        enableUrlHash: true, // Enable selection of the step based on url hash
        transition: {
            animation: 'none', // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
            speed: '400', // Animation speed. Not used if animation is 'css'
            easing: '', // Animation easing. Not supported without a jQuery easing plugin. Not used if animation is 'css'
            prefixCss: '', // Only used if animation is 'css'. Animation CSS prefix
            fwdShowCss: '', // Only used if animation is 'css'. Step show Animation CSS on forward direction
            fwdHideCss: '', // Only used if animation is 'css'. Step hide Animation CSS on forward direction
            bckShowCss: '', // Only used if animation is 'css'. Step show Animation CSS on backward direction
            bckHideCss: '', // Only used if animation is 'css'. Step hide Animation CSS on backward direction
        },
        autoProgress: { // Auto navigate tabs on interval
            enabled: false, // Enable/Disable Auto navigation
            interval: 3500, // Auto navigate Interval (used only if "autoProgress" is enabled)
            stopOnFocus: true, // Stop auto navigation on focus and resume on outfocus
        },
        keyboard: {
            keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
            keyLeft: [37, 38], // Left key code
            keyRight: [39, 40], // Right key code
            keyHome: [36], // Home key code
            keyEnd: [35] // End key code
        },
        style: { // CSS Class settings
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
        getContent: null, // Callback function for content loading
    };

    class SmartTab {

        constructor(element, options) {
            // Merge user settings with default
            this.options        = $.extend(true, {}, defaults, options);
            // Main container element
            this.main           = $(element);
            // Navigation bar element
            this.nav            = this._getFirstDescendant('.' + this.options.style.navCss);
            // Content container
            this.container      = this._getFirstDescendant('.' + this.options.style.contentCss);
            // Tab anchor elements
            this.tabs           = this.nav.find('.' + this.options.style.navLinkCss);
            // Content pages
            this.pages          = this.container.children('.' + this.options.style.contentPanelCss);
            // Initial index
            this.current_index  = -1;
            // Autoprogress timer id
            this.autoProgressId = null;
            // Is initialiazed
            this.is_init        = false;    

            // Initialize options
            this._init();

            // Load asynchronously
            setTimeout(() => {
                this._load();
            }, 0);
        }

        // Initialize options
        _init() {
            // Set the elements
            this._setElements();

            // Skip if already init
            if (this.is_init === true) return true;

            // Assign plugin events
            this._setEvents();

            this.is_init = true;
            // Trigger the initialized event
            this._triggerEvent("initialized");
        }

        // Initial Load Method
        _load() {
            // Clean the elements
            this.pages.hide();
            // Clear other states from the steps
            this.tabs.removeClass(this.options.style.anchorActiveCss);

            // Initial step index
            this.current_index  = -1;

            // Get the initial step index
            let idx = this._getURLHashIndex();
            idx = idx ? idx : this.options.selected;

            // Show the initial step
            this._showTab(idx);
            // Trigger the loaded event
            this._triggerEvent("loaded");
        }

        _getFirstDescendant(selector) {
            // Check for first level element
            let elm = this.main.children(selector);
            if (elm.length > 0) {
                return elm;
            }

            // Check for second level element
            this.main.children().each((i, n) => {
                let tmp = $(n).children(selector);
                if (tmp.length > 0) {
                    elm = tmp;
                    return false;
                }
            });
            if (elm.length > 0) {
                return elm;
            }

            // Element not found
            this._showError("Element not found " + selector);
            return false;
        }

        _setElements() {
            // Set the main element classes including theme css
            this.main.removeClass((i, className) => {
                return (className.match(new RegExp('(^|\\s)' + this.options.style.themePrefixCss + '\\S+','g')) || []).join(' ');
            }).addClass(this.options.style.mainCss + ' ' + this.options.style.themePrefixCss + this.options.theme);
            
            // Set justify option
            this.main.toggleClass(this.options.style.justifiedCss, this.options.justified);
        }

        _setEvents() {
            // Anchor click event
            this.tabs.on("click", (e) => {
                e.preventDefault();
                const elm = $(e.currentTarget);
                if (this._isShowable(elm)) {
                    // Get the step index
                    this._showTab(this.tabs.index(elm));
                }
            });

            if (this.options.autoProgress.enabled && this.options.autoProgress.stopOnFocus) {
                $(this.main).on("mouseover", (e) => {
                    e.preventDefault();
                    this._stopAutoProgress();
                });
  
                $(this.main).on("mouseleave", (e) => {
                    e.preventDefault();
                    this._startAutoProgress();
                });
            }
            
            // Keyboard navigation event            
            $(document).keyup((e) => {
                this._keyNav(e);
            });        

            // Back/forward browser button event
            $(window).on('hashchange', (e) => {
                if (this.options.backButtonSupport !== true) {
                    return;
                }
                const idx = this._getURLHashIndex();
                if (idx && this._isShowable(this.tabs.eq(idx))) {
                    e.preventDefault();
                    this._showTab(idx);
                }
            });

            // Fix content height on window resize
            $(window).on('resize', (e) => {
               this._fixHeight(this.current_index);
            });
        }

        _navigate(dir) {
            if (dir == 'first') {
                this._showTab(this._getShowable(-1, 'next'));
            } else if (dir == 'last') {
                this._showTab(this._getShowable(this.tabs.length, 'prev'));
            } else {
                this._showTab(this._getShowable(this.current_index, dir));
            }
        }

        _showTab(idx) {
            if (idx === -1 || idx === null) return false;

            // If current step is requested again, skip
            if (idx == this.current_index) return false;

            // If step not found, skip
            if (!this.tabs.eq(idx)) return false;

            // If it is a disabled step, skip
            if (!this._isEnabled(this.tabs.eq(idx))) return false;

            // Get the direction of navigation
            const stepDirection = this._getStepDirection(idx);

            if (this.current_index !== -1) {
                // Trigger "leaveStep" event
                if (this._triggerEvent("leaveTab", [this._getAnchor(this.current_index), this.current_index, idx, stepDirection]) === false) {
                    return false;
                }
            }

            this._loadContent(idx, () => { 
                // Get step to show element
                const selTab = this._getAnchor(idx);
                // Change the url hash to new step
                this._setURLHash(selTab.attr("href"));
                // Update controls
                this._setAnchor(idx);

                // Get current step element
                const curPage   = this._getPage(this.current_index);
                // Get next step element
                const selPage   = this._getPage(idx);
                // transit the step
                this._transit(selPage, curPage, stepDirection, () => {
                    // Fix height with content
                    this._fixHeight(idx);
                    // Trigger "showStep" event
                    this._triggerEvent("showTab", [selTab, idx, this._getStepPosition(idx)]);
                });

                // Update the current index
                this.current_index  = idx;
            });
        }

        _getShowable(idx, dir) {
            let si = null;
            const elmList = (dir == 'prev') ? $(this.tabs.slice(0, idx).get().reverse()) : this.tabs.slice(idx + 1);
            // Find the next showable step in the direction
            elmList.each((i, elm) => {
                if (this._isEnabled($(elm))) {
                    si = (dir == 'prev') ? idx - (i + 1) : i + idx + 1;
                    return false;
                }
            });
            return si;
        }

        _isShowable(elm) {
            if (!this._isEnabled(elm)) {
                return false;
            }
            return true;
        }

        _isEnabled(elm) {
            return (elm.hasClass(this.options.style.anchorDisabledCss) || elm.hasClass(this.options.style.anchorHiddenCss)) ? false : true;
        }

        _getStepDirection(idx) {
            return this.current_index < idx ? "forward" : "backward";
        }

        _getStepPosition(idx) {
            if (idx === 0) {
                return 'first';
            } else if (idx === this.tabs.length - 1) {
                return 'last';
            }
            return 'middle';
        }

        _getAnchor(idx) {
            if (idx == null || idx == -1) return null;
            return this.tabs.eq(idx);
        }

        _getPage(idx) {
            if (idx == null || idx == -1) return null;
            return this.pages.eq(idx);
        }

        _loadContent(idx, callback) {
            if (!$.isFunction(this.options.getContent)) { callback(); return; }

            const selPage       = this._getPage(idx);
            if (!selPage) { callback(); return; }
            // Get step direction
            const stepDirection = this._getStepDirection(idx);
            // Get step position
            const stepPosition  = this._getStepPosition(idx);
            // Get next step element
            const selTab       = this._getAnchor(idx);

            this.options.getContent(idx, stepDirection, stepPosition, selTab, (content) => {
                if (content) selPage.html(content);
                callback();
            });
        }

        _transit(elmToShow, elmToHide, stepDirection, callback) {
            const transitFn = $.fn.smartTab.transitions[this.options.transition.animation];
            this._stopAnimations();
            if ($.isFunction(transitFn)) {
                transitFn(elmToShow, elmToHide, stepDirection, this, (res) => {
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

        _stopAnimations() {
            if ($.isFunction(this.container.finish)) {
                this.pages.finish();
                this.container.finish();
            }
        }

        _fixHeight(idx) {
            if (this.options.autoAdjustHeight === false) {
                this.container.css('height', 'auto');
                return;
            } 
                
            // Auto adjust height of the container
            const contentHeight = this._getPage(idx).outerHeight();
            if ($.isFunction(this.container.finish) && $.isFunction(this.container.animate) && contentHeight > 0) {
                this.container.finish().animate({ height: contentHeight }, this.options.transition.speed);
            } else {
                this.container.css({ height: contentHeight > 0 ? contentHeight : 'auto' });
            }
        }

        _setAnchor(idx) {
            // Current step anchor > Remove other classes
            if (this.current_index !== null && this.current_index >= 0) {
                this.tabs.eq(this.current_index).removeClass(this.options.style.anchorActiveCss);
            }

            // Next step anchor > Remove other classes and add active class
            this.tabs.eq(idx).addClass(this.options.style.anchorActiveCss);
        }

        // HELPER FUNCTIONS

        _keyNav(e) {
            if (!this.options.keyboard.keyNavigation) {
                return;
            }

            // Keyboard navigation
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

        _triggerEvent(name, params) {
            // Trigger an event
            var e = $.Event(name);
            this.main.trigger(e, params);
            if (e.isDefaultPrevented()) {
                return false;
            }
            return e.result;
        }

        _setURLHash(hash) {
            if (this.options.enableUrlHash && window.location.hash !== hash) {
                history.pushState(null,null,hash);
            }
        }

        _getURLHashIndex() {
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

        _showError(msg) {
            console.error(msg);
        }

        // Auto progress
        _startAutoProgress() {
            if (this.options.autoProgress.enabled && !this.autoProgressId) {
                this.autoProgressId = setInterval(() => this._navigate('next'), this.options.autoProgress.interval);
            }
        }

        _stopAutoProgress() {
            if (this.autoProgressId) {
                clearInterval(this.autoProgressId);
                this.autoProgressId = null;
            }
        }

        _restartAutoProgress() {
            this._stopAutoProgress();
            this._startAutoProgress();
        }

        // PUBLIC FUNCTIONS

        goToTab(index) {
            if (!this._isShowable(this.tabs.eq(index))) {
                return;
            }
            this._showTab(index);
        }

        next() {
            this._navigate('next');
        }

        prev() {
            this._navigate('prev');
        }

        first() {
            this._navigate('first');
        }

        last() {
            this._navigate('last');
        }

        reset() {
            // Clear css from steps except default, hidden and disabled
            this.tabs.removeClass(this.options.style.anchorActiveCss);

            // Reset all
            this._setURLHash('#');
            this._init();
            this._load();
        }

        setOptions(options) {
            this.options  = $.extend(true, {}, this.options, options);
            this._init();
        }

        getOptions() {
            return this.options;
        }

        getInfo() {
            return {
                currentPage: this.current_index ? this.current_index : 0,
                totalPages: this.tabs ? this.tabs.length : 0
            };
        }

        loader(state) {
            this.main.toggleClass(this.options.style.loaderCss, (state === "show"));
        }

        fixHeight() {
            this._fixHeight(this.current_index);
        }
    }

    // Wrapper for the plugin
    $.fn.smartTab = function (options) {
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, "smartTab")) {
                    $.data(this, "smartTab", new SmartTab(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            let instance = $.data(this[0], 'smartTab');

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


    // Transition effects
    $.fn.smartTab.transitions = {
        fade: (elmToShow, elmToHide, stepDirection, mainObj, callback) => {
            if (!$.isFunction(elmToShow.fadeOut)) { callback(false); return; }

            if (elmToHide) {
                elmToHide.fadeOut(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                    elmToShow.fadeIn(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                        callback();
                    });
                });
            } else {
                elmToShow.fadeIn(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                    callback();
                });
            }
        },
        slideSwing: (elmToShow, elmToHide, stepDirection, mainObj, callback) => {
            if (!$.isFunction(elmToShow.slideDown)) { callback(false); return; }

            if (elmToHide) {
                elmToHide.slideUp(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                    elmToShow.slideDown(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                        callback();
                    });
                });
            } else {
                elmToShow.slideDown(mainObj.options.transition.speed, mainObj.options.transition.easing, () => {
                    callback();
                });
            }
        },
        slideHorizontal: (elmToShow, elmToHide, stepDirection, mainObj, callback) => {
            if (!$.isFunction(elmToShow.animate)) { callback(false); return; }

            // Horizontal slide
            const animFn = (elm, iniLeft, finLeft, cb) => {
                elm.css({position:'absolute', left: iniLeft })
                    .show()
                    .animate({ left: finLeft }, 
                        mainObj.options.transition.speed, 
                        mainObj.options.transition.easing,
                        cb);
            };

            if (mainObj.current_index == -1) {
                // Set container height at page load 
                mainObj.container.height(elmToShow.outerHeight());
            }
            const containerWidth  = mainObj.container.width();
            if (elmToHide) {
                const initCss1  = elmToHide.css(["position", "left"]);
                const finLeft   = containerWidth * (stepDirection == 'backward' ? 1 : -1);
                animFn(elmToHide, 0, finLeft, () => {
                    elmToHide.hide().css(initCss1);
                });
            }

            const initCss2  = elmToShow.css(["position"]);
            const iniLeft   = containerWidth * (stepDirection == 'backward' ? -2 : 1);
            animFn(elmToShow, iniLeft, 0, () => {
                elmToShow.css(initCss2);
                callback();
            });
        },
        slideVertical: (elmToShow, elmToHide, stepDirection, mainObj, callback) => {
            if (!$.isFunction(elmToShow.animate)) { callback(false); return; }

            // Vertical slide
            const animFn = (elm, iniTop, finTop, cb) => {
                elm.css({ position:'absolute', top: iniTop })
                    .show()
                    .animate({ top: finTop }, 
                        mainObj.options.transition.speed, 
                        mainObj.options.transition.easing,
                        cb);
            };

            if (mainObj.current_index == -1) {
                // Set container height at page load 
                mainObj.container.height(elmToShow.outerHeight());
            }
            const containerHeight = mainObj.container.height();
            if (elmToHide) {
                const initCss1  = elmToHide.css(["position", "top"]);
                const finTop    = containerHeight * (stepDirection == 'backward' ? -1 : 1);
                animFn(elmToHide, 0, finTop, () => {
                    elmToHide.hide().css(initCss1);
                });
            }

            const initCss2  = elmToShow.css(["position"]);
            const iniTop    = containerHeight * (stepDirection == 'backward' ? 1 : -2);
            animFn(elmToShow, iniTop, 0, () => {
                elmToShow.css(initCss2);
                callback();
            });            
        }, 
        css: (elmToShow, elmToHide, stepDirection, mainObj, callback) => {
            if (mainObj.options.transition.fwdHideCss.length == 0 || mainObj.options.transition.bckHideCss.length == 0 ) { callback(false); return; }
            
            // CSS Animation
            const animFn = (elm, animation, cb) => {
                if (!animation || animation.length == 0) cb();

                elm.addClass(animation).one("animationend", (e) => {
                    $(e.currentTarget).removeClass(animation);
                    cb();
                });
                elm.addClass(animation).one("animationcancel", (e) => {
                    $(e.currentTarget).removeClass(animation);
                    cb('cancel');
                });
            };

            const showCss = mainObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? mainObj.options.transition.bckShowCss : mainObj.options.transition.fwdShowCss);
            if (elmToHide) {
                const hideCss = mainObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? mainObj.options.transition.bckHideCss : mainObj.options.transition.fwdHideCss);
                animFn(elmToHide, hideCss, () => {
                    elmToHide.hide();

                    animFn(elmToShow, showCss, () => {
                        callback();
                    });
                    elmToShow.show();
                });
            } else {
                animFn(elmToShow, showCss, () => {
                    callback();
                });
                elmToShow.show();
            }
        }
    };
}));