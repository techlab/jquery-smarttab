# jQuery Smart Tab v3
#### The flexible jQuery tab control plugin

[![Build Status](https://travis-ci.org/techlab/jquery-smarttab.svg?branch=master)](https://travis-ci.org/techlab/jquery-smarttab)
[![npm version](https://badge.fury.io/js/jquery-smarttab.svg)](https://badge.fury.io/js/jquery-smarttab)
[![Latest Stable Version](https://poser.pugx.org/techlab/jquery-smarttab/v/stable)](https://packagist.org/packages/techlab/jquery-smarttab)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/techlab/jquery-smarttab/master/LICENSE)
[![Donate on Paypal](https://img.shields.io/badge/PayPal-dipuraj-blue.svg)](https://www.paypal.me/dipuraj)

Smart Tab is a flexible and heavily customizable **jQuery Tab control plugin**.

> If you think it is cool, you should also check it's sibling [React Smart Tab](http://techlaboratory.net/react-smarttab)

+ [Homepage](http://techlaboratory.net/jquery-smarttab)
+ [Documentation](http://techlaboratory.net/jquery-smarttab#documentation)
+ [Demos](http://techlaboratory.net/jquery-smarttab#demo)
+ [StackOverflow Q&A](http://stackoverflow.com/questions/tagged/smart-tab)
+ [GitHub Issues](https://github.com/techlab/jquery-smarttab/issues)

Demos
-----
  + [Basic Example](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3)
  + [Ajax Contents](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3/ajax)
  + [Multiple Tabs](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3/multiple)

Screenshots
-----
![jQuery Smart Tab default](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-default.png)   

![jQuery Smart Tab dark](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-dark.png)   

![jQuery Smart Tab tabs](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-tabs.png)   

![jQuery Smart Tab brick](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-brick.png)

Requirements
-----
  + [jQuery](http://jquery.com/) (supports from jQuery-1.11.1+ to the latest jQuery-3.5.0)

Installation
-----

### [NPM](https://www.npmjs.com/package/jquery-smarttab)
    npm install jquery-smarttab

### [Yarn](https://yarn.pm/jquery-smarttab)
    yarn add jquery-smarttab

### [Composer](https://packagist.org/packages/techlab/jquery-smarttab)
    composer require techlab/jquery-smarttab

### [CDN - jsDelivr](https://www.jsdelivr.com/package/npm/jquery-smarttab)
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/jquery-smarttab@3.1.1/dist/css/smart_tab_all.min.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/jquery-smarttab@3.1.1/dist/js/jquery.smartTab.min.js" type="text/javascript"></script>
```

### [CDN - UNPKG](https://unpkg.com/browse/jquery-smarttab/)
```html
<!-- CSS -->
<link href="https://unpkg.com/jquery-smarttab@3.1.1/dist/css/smart_tab_all.min.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="https://unpkg.com/jquery-smarttab@3.1.1/dist/js/jquery.smartTab.min.js" type="text/javascript"></script>
```

### Download
#### [Download from GitHub](https://github.com/techlab/jquery-smarttab/archive/master.zip)    

Features
-----

+ Responsive design
+ Standalone CSS
+ Bootstrap compatible
+ Various themes included
+ Customizable CSS
+ Cool transition animations (fade/slide-horizontal/slide-vertical/slide-swing)
+ URL navigation and tab selection
+ Compatible with all jQuery versions (jQuery 1.11.1+, jQuery 2+, jQuery 3.5+)
+ Auto content height adjustment
+ Auto Progress (automatic navigation of tabs)
+ Ajax content loading support
+ Keyboard navigation
+ External anchor support
+ Custom events
+ Supports all modern browsers
+ Easy to implement and minimal HTML required

Usage
-----

Include jQuery SmartTab CSS
```html
<link href="../dist/css/smart_tab_all.min.css" rel="stylesheet" type="text/css" />
```

Include HTML
```html
<div id="smarttab">

    <ul class="nav">
        <li>
          <a class="nav-link" href="#tab-1">
            Tab 1
          </a>
        </li>
        <li>
          <a class="nav-link" href="#tab-2">
            Tab 2
          </a>
        </li>
        <li>
          <a class="nav-link" href="#tab-3">
            Tab 3
          </a>
        </li>
        <li>
          <a class="nav-link" href="#tab-4">
            Tab 4
          </a>
        </li>
    </ul>

    <div class="tab-content">
        <div id="tab-1" class="tab-pane" role="tabpanel">
            Tab content
        </div>
        <div id="tab-2" class="tab-pane" role="tabpanel">
            Tab content
        </div>
        <div id="tab-3" class="tab-pane" role="tabpanel">
            Tab content
        </div>
        <div id="tab-4" class="tab-pane" role="tabpanel">
            Tab content
        </div>
    </div>
</div>
```
Include jQuery (*ignore this if you have already included on the page*).
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
```
Include jQuery SmartTab JavaScript
```html
<script type="text/javascript" src="../dist/js/jquery.smartTab.min.js"></script>
```
Initialize the jQuery SmartTab
```html
<script type="text/javascript">
  $(document).ready(function(){

      // SmartTab initialize
      $('#smarttab').smartTab();

  });
</script>
```
That's it!   
 
Please see the [documentation](http://techlaboratory.net/jquery-smarttab#documentation) for more details on implementation and usage.  

##### All options
```JavaScript
// SmartTab initialize
$('#smarttab').smartTab({
    selected: 0, // Initial selected tab, 0 = first tab
    theme: 'default', // theme for the tab, related css need to include for other than default theme
    orientation: 'horizontal', // Nav menu orientation. horizontal/vertical
    justified: true, // Nav menu justification. true/false
    autoAdjustHeight: true, // Automatically adjust content height
    backButtonSupport: true, // Enable the back button support
    enableURLhash: true, // Enable selection of the tab based on url hash
    transition: {
        animation: 'none', // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
        speed: '400', // Transion animation speed
        easing:'' // Transition animation easing. Not supported without a jQuery easing plugin
    },
    autoProgress: { // Auto navigate tabs on interval
        enabled: false, // Enable/Disable Auto navigation
        interval: 3500, // Auto navigate Interval (used only if "autoProgress" is enabled)
        stopOnFocus: true, // Stop auto navigation on focus and resume on outfocus
    },
    keyboardSettings: {
        keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        keyLeft: [37], // Left key code
        keyRight: [39] // Right key code
    }
});
```

License
----
[MIT License](https://github.com/techlab/jquery-smarttab/blob/master/LICENSE)

Contribute
----
If you like the project please support with your contribution.

[Donate on Paypal](https://www.paypal.me/dipuraj)

Thank you and Happy Coding!
