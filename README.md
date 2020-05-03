# jQuery Smart Tab 3
#### The flexible jQuery tab control plugin.

[![Build Status](https://travis-ci.org/techlab/jquery-smarttab.svg?branch=master)](https://travis-ci.org/techlab/jquery-smarttab)
[![npm version](https://badge.fury.io/js/smarttab.svg)](https://badge.fury.io/js/smarttab)
[![Bower version](https://badge.fury.io/bo/smarttab.svg)](https://badge.fury.io/bo/smarttab)
[![Latest Stable Version](https://poser.pugx.org/techlab/jquery-smarttab/v/stable)](https://packagist.org/packages/techlab/jquery-smarttab)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/techlab/jquery-smarttab/master/LICENSE)
[![Donate on Paypal](https://img.shields.io/badge/PayPal-dipuraj-blue.svg)](https://www.paypal.me/dipuraj)

Smart Tab is a flexible and heavily customizable **jQuery Tab control plugin**.

+ [Homepage](http://techlaboratory.net/jquery-smarttab)
+ [Documentation](http://techlaboratory.net/jquery-smarttab#documentation)
+ [Demos](http://techlaboratory.net/jquery-smarttab#demo)
+ [StackOverflow Q&A](http://stackoverflow.com/questions/tagged/smart-tab)
+ [GitHub Issues](https://github.com/techlab/jquery-smarttab/issues)

Screenshots
-----
![Smart Tab Screenshot1](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-default.png)   

![Smart Tab Screenshot2](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-dark.png)   

![Smart Tab Screenshot3](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-tabs.png)   

![Smart Tab Screenshot3](http://techlaboratory.net/assets/media/jquery-smart-tab/smarttab-v3-brick.png)

Demos
-----
  + [Basic Example](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3)
  + [Ajax Contents](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3/ajax)
  + [Input Validation](http://techlaboratory.net/projects/demo/jquery-smart-tab/v3/multiple)

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

### Download
#### [Download from GitHub](https://github.com/techlab/jquery-smarttab/archive/master.zip)    

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

Features
-----

+ Responsive design
+ Standalone CSS
+ Various themes included
+ Customizable CSS
+ URL navigation and tab selection
+ Event support
+ Ajax content loading support
+ Keyboard navigation
+ Auto content height adjustment
+ Compatible with all jQuery versions (jQuery 1.11.1+, jQuery 2+, jQuery 3.5+)
+ Easy to implement and minimal HTML required
+ Supports all modern browsers
+ Auto Progress (automatic navigation of tabs)
+ Cool transition animations (fade/slide-horizontal/slide-vertical/slide-swing)
+ External anchor support

License
----
[MIT License](https://github.com/techlab/jquery-smarttab/blob/master/LICENSE)

Contribute
----
If you like the project please support with your contribution.

[Donate on Paypal](https://www.paypal.me/dipuraj)

Thank you :)
