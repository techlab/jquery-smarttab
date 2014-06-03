/* SmartTab plugin v2.0
 * jQuery Tab Control Plugin
 * http://techlaboratory.net/smarttab
 * 
 * by Dipu Raj  
 * http://dipuraj.me
 * 
 * License 
 * https://github.com/techlab/SmartTab/blob/master/MIT-LICENSE.txt 
 */
 
(function($){
  $.fn.smartTab = function(action) {
    var options = $.extend({}, $.fn.smartTab.defaults, action);
    var args = arguments;    
    
    return this.each(function() {
      var obj = $(this);
      var tabAnchor = $("ul:first", obj),tabs = $("li > a", tabAnchor),tabContainer = $('.stContainer',obj);
      
      if(!obj.data('options')){
        obj.data('options',options);
      }else{
        options = obj.data('options');
      }
      
      // Method calling logic
      if (!action || action === 'init' || typeof action === 'object') {
        init();
      }else if (action === 'showTab') {
        var ar = Array.prototype.slice.call(args,1);
        if(ar[0]==obj.data('curTabIdx')) return false;
        showTab(ar[0]);        
        return true;
      }else {
        $.error( 'Method ' +  action + ' does not exist' );
      }      

      function init(){
        $(obj).addClass('stMain');
        $(tabAnchor).addClass('tabAnchor'); 
        setTabs();
        setEvents();            

        var st = options.selected;
        if(options.saveState){
          var stt = getTabState();
          if(stt) st = stt;
        }
        st = (st) ? st : 0;
        showTab(st);                                    
      }
                
      function setTabs(){
        if(tabContainer.length == 0){
          tabContainer = $('<div></div>').addClass('stContainer');
          $(obj).append(tabContainer);
        }
        $(tabs).each(function(){
          var elm = $($(this).attr("href"), obj);
          elm.addClass('tabContent').hide();
          tabContainer.append(elm);
        });
      }
                
      function setEvents(){
        $(tabs).bind("click", function(e){
          if(tabs.index(this)==obj.data('curTabIdx')) return false;
          showTab(tabs.index(this));
          if(options.autoProgress) restartAutoProgress();
          return false;
        });

        if(options.keyNavigation){
          $(document).keyup(function(e){
            if(e.which==39){ // Right Arrow
              doForwardProgress();
              if(options.autoProgress) restartAutoProgress();
            }else if(e.which==37){ // Left Arrow
              doBackwardProgress();
              if(options.autoProgress) restartAutoProgress();
            }
          });
        }

        if(options.autoProgress){                  
          if(options.stopOnFocus){
            $(obj).bind("mouseover", function(e){stopAutoProgress();return true;});
            $(obj).bind("mouseleave", function(e){startAutoProgress();return true;});
          }                
          startAutoProgress();
        }
      }
      
      function showTab(idx){
        if(obj.data('isAnimating')) return false;  
        if(options.contentURL && options.contentURL.length>0){
          loadTabContent(idx);
        }else{
          animateTab(idx);
        }
      }
      
      function loadTabContent(idx){
        var selTab = tabs.eq(idx);         
        if(options.contentCache && selTab.data('hasContent')){
          animateTab(idx);
        }else{
          var loader = $('<div>Loading</div>').addClass("loader");         
          if(options.autoProgress) stopAutoProgress();
          $(obj).append(loader);
          $.ajax({
              url: options.contentURL,
              type: "POST",
              data: ({tab_index : idx}),
              dataType: "text",
              beforeSend: function(){loader.show();},
              error: function(){loader.hide().remove();},
              success: function(res){
                if(res && res.length>0){ 
                  $(selTab.attr("href"), obj).html(res);
                  selTab.data('hasContent',true);  
                  animateTab(idx);  
                  if(options.autoProgress) restartAutoProgress();
                }
                loader.hide().remove();                
              }
          }); 
        }
      }  
      
      function animateTab(idx){
        if(obj.data('isAnimating')) return false;
        var curTab = tabs.eq(obj.data('curTabIdx'));
        var selTab = tabs.eq(idx);
        obj.data('isAnimating',true);
        options.transitionEffect = options.transitionEffect.toLowerCase();
        if($.isFunction(options.onLeaveTab)) {
          if(!options.onLeaveTab.call(this,$(curTab))) return false;
        }

        if(options.transitionEffect == 'hslide'){ // horizontal slide
            var cFLeft,cLLeft,sFLeft,sLLeft,cWidth = tabContainer.width();                    
            if(idx>obj.data('curTabIdx')){ // forward
              cFLeft = 0;
              cLLeft = (cWidth+10) * -1;
              sFLeft = (cWidth+10);
              sLLeft = 0;
            }else{ //backward
              cFLeft = 0;
              cLLeft = (cWidth+10);
              sFLeft = (cWidth * -2) + 10;
              sLLeft = 0;
            }                  
            if(curTab.length>0){
              $(curTab.attr("href"), obj).css("left",cFLeft).animate({left:cLLeft},options.transitionSpeed,options.transitionEasing,function(e){
                  $(this).hide();
              });                     
            }                     
            $(selTab.attr("href"),obj).css("left",sFLeft).width(cWidth).show().animate({left:sLLeft},options.transitionSpeed,options.transitionEasing,function(e){
              $(this).show();
              setTabAnchor(idx,curTab,selTab);
            });
        }else if(options.transitionEffect == 'vslide'){ // vertical slide
            var cFTop,cLTop,sFTop,sLTop,cHeight = tabContainer.height();
            var curElm = $(curTab.attr("href"), obj);
            var selElm = $(selTab.attr("href"), obj);
            if(idx>obj.data('curTabIdx')){ // forward
              cFTop = 0;
              cLTop = (curElm.height()+10) * -1;
              sFTop = (selElm.height()+10);
              sLTop = 0;
            }else{ //backward
              cFTop = 0;
              cLTop = (curElm.height()+10);
              sFTop = (selElm.height() * -2) + 10;
              sLTop = 0;
            }
            if(curTab.length>0){
              curElm.css("top",cFTop).animate({top:cLTop},options.transitionSpeed,options.transitionEasing,function(e){
                curElm.hide();
              });
            }
            selElm.css("top",sFTop).show().animate({top:sLTop},options.transitionSpeed,options.transitionEasing,function(e){
              $(this).show();
              setTabAnchor(idx,curTab,selTab);
            });
        }else if(options.transitionEffect == 'slide'){ // normal slide
            if(curTab.length>0){
              $(curTab.attr("href"), obj).slideUp(options.transitionSpeed,options.transitionEasing,function(){
                  $(selTab.attr("href"), obj).slideDown(options.transitionSpeed,options.transitionEasing,function(){
                    setTabAnchor(idx,curTab,selTab);
                  });
              });
            }else{
                $(selTab.attr("href"), obj).slideDown(options.transitionSpeed,options.transitionEasing,function(){
                  $(this).show();
                  setTabAnchor(idx,curTab,selTab);
                });
            }
        }else if(options.transitionEffect == 'fade'){ // normal fade
            $($(curTab).attr("href"), obj).fadeOut(options.transitionSpeed,options.transitionEasing,function(){
              $($(selTab).attr("href"), obj).fadeIn(options.transitionSpeed,options.transitionEasing);
                $(this).show();
                setTabAnchor(idx,curTab,selTab);
            });
        }else{ // none
            if(curTab.length>0) $(curTab.attr("href"),obj).hide();
            $(selTab.attr("href"),obj).show();
            setTabAnchor(idx,curTab,selTab);
        }
               
        return true;
      }
      
      function adjustHeight(selTab){
        // Adjust Height of the container
        if(options.autoHeight){
          tabContainer.animate({height: $(selTab.attr("href")).height()}, options.transitionSpeed);
        } 
      }
                
      function setTabAnchor(idx,curTab,selTab){
        curTab.removeClass("sel");
        selTab.addClass("sel");
        obj.data('curTabIdx',idx);
        obj.data('isAnimating',false);
        if(options.saveState) saveTabState(idx);
        adjustHeight(selTab);
        if($.isFunction(options.onShowTab)) {
          if(!options.onShowTab.call(this,$(selTab)))return false;
        }
        return true;
      }
                
      // Auto progress
      function startAutoProgress(){
        if(!obj.data('autoProgressId')) obj.data('autoProgressId',setInterval(doForwardProgress, options.progressInterval)) ;
      }
      function restartAutoProgress(){
        stopAutoProgress();
        startAutoProgress();
      }
      function stopAutoProgress(){
        if(obj.data('autoProgressId')){
          clearInterval(obj.data('autoProgressId'));
          obj.data('autoProgressId',null);
        }
      }
      function doForwardProgress(){
        var nextTabIdx = (obj.data('curTabIdx')-0)+1;
        if(tabs.length <= nextTabIdx) nextTabIdx = 0;
        showTab(nextTabIdx);
      }
      function doBackwardProgress(){
        var nextTabIdx = (obj.data('curTabIdx')-0)-1;
        if(0 > nextTabIdx) nextTabIdx = tabs.length-1;
        showTab(nextTabIdx);
      }

      function saveTabState(idx){
        var saveName = 'stCurrentTab'+obj.attr('id');
        if(isLS()){
          return saveLS(saveName,idx);
        }else{
          return createCookie(saveName,idx);
        }
      }
      function getTabState(){
        var saveName = 'stCurrentTab'+obj.attr('id');
        if(isLS()){
          return getLS(saveName);
        }else{
          return readCookie(saveName);
        }
      }
      // Local Storage 
      function isLS(){
        if(localStorage && typeof(localStorage) != 'undefined' ) return true;
        return false;
      }
      function saveLS(name,value){
        try {
          localStorage.setItem(name, value);
          return true;
        }catch(e){return false;}
      }
      function getLS(name){
        try {
          if(localStorage && localStorage.getItem(name)) return localStorage.getItem(name);
          return false;
        }catch(e){return false;}
      }
                
      // Cookies
      function createCookie(name,value) {
        var date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name+"=" + value + expires + "; path=/";
      }
      function readCookie(name) {
        name += "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return null;
      }
      function eraseCookie(name) {
        createCookie(name, "", -1);
      }
    });
  };  

  // Easing Plugin
  $.extend($.easing,
  {
      def: 'easeOutQuad',
      swing: function (x, t, b, c, d) {
          return $.easing[$.easing.def](x, t, b, c, d);
      },
      easeOutQuad: function (x, t, b, c, d) {
          return -c *(t/=d)*(t-2) + b;
      },
      easeOutQuart: function (x, t, b, c, d) {
          return -c * ((t=t/d-1)*t*t*t - 1) + b;
      },
      easeOutQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
      },
      easeInOutExpo: function (x, t, b, c, d) {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
          return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInOutElastic: function (x, t, b, c, d) {
          var s=1.70158;var p=0;var a=c;
          if (t==0) return b;if ((t/=d/2)==2) return b+c;if (!p) p=d*(.3*1.5);
          if (a < Math.abs(c)) {a=c;var s=p/4;}
          else var s = p/(2*Math.PI) * Math.asin (c/a);
          if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
          return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
      },
      easeInOutBack: function (x, t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
          return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
      }
  }); 
 
  // Default Properies
  $.fn.smartTab.defaults = {
      selected: 0,  // Selected Tab, 0 = first tab
      saveState:true, // Remembers tab selection 
      contentURL:null, // content url, Enables Ajax content loading. ex: 'service.php'   
      contentCache:true, // Cache Ajax content
      keyNavigation:true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
      autoProgress:false, // Auto navigate tabs on interval
      progressInterval: 3500, // Auto navigate Interval (used only if "autoProgress" is set to true)
      stopOnFocus:false, // Stop auto navigation on focus and resume on outfocus
      transitionEffect:'none', // Effect on navigation, none/hslide/vslide/slide/fade
      transitionSpeed:'400', // Transion animation speed
      transitionEasing:'easeInOutExpo', // Transition animation easing
      autoHeight:true, // Automatically adjust content height
      onLeaveTab: null, // triggers when leaving a tab
      onShowTab: null  // triggers when showing a tab
  };
})(jQuery);
