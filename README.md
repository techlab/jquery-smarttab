# jQuery Smart Tab v4
#### The flexible jQuery tab control plugin

[![Build Status](https://travis-ci.org/techlab/jquery-smarttab.svg?branch=master)](https://travis-ci.org/techlab/jquery-smarttab)
[![npm version](https://badge.fury.io/js/jquery-smarttab.svg)](https://badge.fury.io/js/jquery-smarttab)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/jquery-smarttab/badge?style=rounded)](https://www.jsdelivr.com/package/npm/jquery-smarttab)
[![Npm Downloadsl](https://badgen.net/npm/dm/jquery-smarttab?icon=npm)](https://www.npmjs.com/package/jquery-smarttab)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/techlab/jquery-smarttab/master/LICENSE)
[![GitHub Sponsor](https://img.shields.io/badge/Sponsor-techlab-blue.svg?logo=github)](https://github.com/sponsors/techlab)
[![Donate on Paypal](https://img.shields.io/badge/PayPal-dipuraj-blue.svg)](https://www.paypal.me/dipuraj)

Smart Tab is a flexible and heavily customizable **tab control plugin for jQuery**.

> If you think it is cool, you should also check it's sibling [React Smart Tab](http://techlaboratory.net/react-smarttab)

+ [Homepage](http://techlaboratory.net/jquery-smarttab)
+ [Documentation](http://techlaboratory.net/jquery-smarttab#documentation)
+ [Demos](http://techlaboratory.net/jquery-smarttab#demo)
+ [StackOverflow Q&A](http://stackoverflow.com/questions/tagged/smart-tab)
+ [GitHub Issues](https://github.com/techlab/jquery-smarttab/issues)

Demos
-----
  + [Basic Example](http://techlaboratory.net/projects/demo/jquery-smart-tab/v4)
  + [Ajax Contents](http://techlaboratory.net/projects/demo/jquery-smart-tab/v4/ajax)
  + [Multiple Tabs](http://techlaboratory.net/projects/demo/jquery-smart-tab/v4/multiple)
  + [Vertical Tab Layout](http://techlaboratory.net/projects/demo/jquery-smart-tab/v4/vertical)
  + [Bootstrap Modal Example](http://techlaboratory.net/projects/demo/jquery-smart-tab/v4/bootstrap-modal)

Screenshots
-----
![jQuery Smart Tab](https://techlaboratory.net/assets/media/jquery-smart-tab/v4/st-v4-basic.gif)   

![jQuery Smart Tab](https://techlaboratory.net/assets/media/jquery-smart-tab/v4/st-v6-brick.png) 

![jQuery Smart Tab](https://techlaboratory.net/assets/media/jquery-smart-tab/v4/st-v6-basic.png)

![jQuery Smart Tab](https://techlaboratory.net/assets/media/jquery-smart-tab/v4/st-v6-pills.png)   

Requirements
-----
  + [jQuery](http://jquery.com/) (supports jQuery 1.11.1+ to jQuery 3.6+ and jQuery Slim versions)

Installation
-----

### [NPM](https://www.npmjs.com/package/jquery-smarttab)
    npm install jquery-smarttab

### [Yarn](https://yarn.pm/jquery-smarttab)
    yarn add jquery-smarttab

### [CDN - jsDelivr](https://www.jsdelivr.com/package/npm/jquery-smarttab)
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/jquery-smarttab@4/dist/css/smart_tab_all.min.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/jquery-smarttab@4/dist/js/jquery.smartTab.min.js" type="text/javascript"></script>
```

### [CDN - UNPKG](https://unpkg.com/browse/jquery-smarttab/)
```html
<!-- CSS -->
<link href="https://unpkg.com/jquery-smarttab@4/dist/css/smart_tab_all.min.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script src="https://unpkg.com/jquery-smarttab@4/dist/js/jquery.smartTab.min.js" type="text/javascript"></script>
```

### Common JS/Webpack
```js
var $ = require("jquery");
require( "jquery-smarttab/dist/css/smart_tab_all.css");
const smartTab = require("jquery-smarttab");

$(function() {
    $('#smarttab').smartTab();
});
```
### ES6/Babel
```js
import $ from "jquery";
import "jquery-smarttab/dist/css/smart_tab_all.css";
import smartTab from 'jquery-smarttab';

$(function() {
    $('#smarttab').smartTab();
});
```

#### Note: you may have to install the required dependencies 
```bash
npm i jquery
npm i jquery-smarttab

// If you are using Webpack, install
npm i webpack webpack-cli style-loader css-loader --save-dev
```

### Download
#### [Download from GitHub](https://github.com/techlab/jquery-smarttab/archive/master.zip)    

Features
-----
- Easy to implement and minimal HTML required
- Supports all modern browsers
- Responsive CSS design
- Bootstrap compatible
- Cool themes included and can be easly customize
- Easy color cusomization using CSS variables
- Built-in transition animations (none|fade|slideHorizontal|slideVertical|slideSwing|css)
- Transition animations can be added easly by extending
- CSS Animations support for transition animations (Supports [Animate.css](https://animate.style/))
- Accessible controls
- External controls support
- Easy ajax content integration
- Keyboard navigation
- Auto content height adjustment
- Buit-in loader
- Buit-in events
- UMD (Universal Module Definition) support
- Compatible with all jQuery versions (jQuery 1.11.1+, jQuery 3.6+, and jQuery Slim)
- URL navigation and tab selection
- Auto Progress (automatic navigation of tabs)

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
```js
$(function() {
    // SmartTab initialize
    $('#smarttab').smartTab();
});
```
That's it!   
 
Please see the [documentation](http://techlaboratory.net/jquery-smarttab#documentation) for more details on implementation and usage.  

##### All options
```JavaScript
// SmartTab initialize
$('#smarttab').smartTab({
    selected: 0, // Initial selected tab, 0 = first tab
    theme: 'basic', // theme, related css need to include for other than default theme
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
    getContent: null
});
```

License
----
[MIT License](https://github.com/techlab/jquery-smarttab/blob/master/LICENSE)

Contribute
----
If you like the project please support with your contribution.

[GitHub Sponsor](https://github.com/sponsors/techlab)  
[Donate on Paypal](https://www.paypal.me/dipuraj)

Happy Coding :heart:

