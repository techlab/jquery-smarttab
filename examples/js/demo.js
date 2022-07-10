// External Animations
const cssAnimationList = {
    cssSlideH: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__slideInLeft',
      fwdHideCss: 'animate__slideOutRight',
      bckShowCss: 'animate__slideInRight',
      bckHideCss: 'animate__slideOutLeft',
    },
    cssSlideV: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__slideInDown',
      fwdHideCss: 'animate__slideOutDown',
      bckShowCss: 'animate__slideInUp',
      bckHideCss: 'animate__slideOutUp',
    },
    cssFade: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__fadeIn',
      fwdHideCss: 'animate__fadeOut',
      bckShowCss: 'animate__fadeIn',
      bckHideCss: 'animate__fadeOut',
    },
    cssFadeSlideH: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__fadeInLeft',
      fwdHideCss: 'animate__fadeOutRight',
      bckShowCss: 'animate__fadeInRight',
      bckHideCss: 'animate__fadeOutLeft',
    },
    cssFadeSlideV: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__fadeInDown',
      fwdHideCss: 'animate__fadeOutDown',
      bckShowCss: 'animate__fadeInUp',
      bckHideCss: 'animate__fadeOutUp',
    },
    cssFadeSlideCorner1: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__fadeInTopLeft',
      fwdHideCss: 'animate__fadeOutBottomRight',
      bckShowCss: 'animate__fadeInBottomRight',
      bckHideCss: 'animate__fadeOutTopLeft',
    },
    cssFadeSlideCorner2: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__fadeInBottomLeft',
      fwdHideCss: 'animate__fadeOutTopRight',
      bckShowCss: 'animate__fadeInTopRight',
      bckHideCss: 'animate__fadeOutBottomLeft',
    },
    cssBounce: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__bounceIn',
      fwdHideCss: 'animate__bounceOut',
      bckShowCss: 'animate__bounceIn',
      bckHideCss: 'animate__bounceOut',
    },
    cssBounceSlideH: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__bounceInLeft',
      fwdHideCss: 'animate__bounceOutRight',
      bckShowCss: 'animate__bounceInRight',
      bckHideCss: 'animate__bounceOutLeft',
    },
    cssBounceSlideV: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__bounceInDown',
      fwdHideCss: 'animate__bounceOutDown',
      bckShowCss: 'animate__bounceInUp',
      bckHideCss: 'animate__bounceOutUp',
    },
    cssBackSlideH: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__backInLeft',
      fwdHideCss: 'animate__backOutRight',
      bckShowCss: 'animate__backInRight',
      bckHideCss: 'animate__backOutLeft',
    },
    cssBackSlideV: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__backInDown',
      fwdHideCss: 'animate__backOutDown',
      bckShowCss: 'animate__backInUp',
      bckHideCss: 'animate__backOutUp',
    },
    cssFlipH: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__flipInY',
      fwdHideCss: 'animate__flipOutY',
      bckShowCss: 'animate__flipInY',
      bckHideCss: 'animate__flipOutY',
    },
    cssFlipV: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__flipInX',
      fwdHideCss: 'animate__flipOutX',
      bckShowCss: 'animate__flipInX',
      bckHideCss: 'animate__flipOutX',
    },
    cssLightspeed: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__lightSpeedInLeft',
      fwdHideCss: 'animate__lightSpeedOutRight',
      bckShowCss: 'animate__lightSpeedInRight',
      bckHideCss: 'animate__lightSpeedOutLeft',
    },
    cssRotate: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__rotateIn',
      fwdHideCss: 'animate__rotateOut',
      bckShowCss: 'animate__rotateIn',
      bckHideCss: 'animate__rotateOut',
    },
    cssRotateClock: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__rotateInDownLeft',
      fwdHideCss: 'animate__rotateOutDownLeft',
      bckShowCss: 'animate__rotateInUpLeft',
      bckHideCss: 'animate__rotateOutUpLeft',
    },
    cssRotateAntiClock: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__rotateInDownRight',
      fwdHideCss: 'animate__rotateOutDownRight',
      bckShowCss: 'animate__rotateInUpRight',
      bckHideCss: 'animate__rotateOutUpRight',
    },
    cssZoom: {
      prefixCss: 'animate__animated animate__faster',
      fwdShowCss: 'animate__zoomIn',
      fwdHideCss: 'animate__zoomOut',
      bckShowCss: 'animate__zoomIn',
      bckHideCss: 'animate__zoomOut',
    }
}

const cssColors = [ 
  "--st-background",
  "--st-border",
  "--st-anchor-default-primary-color",
  "--st-anchor-default-secondary-color",
  "--st-anchor-active-primary-color",
  "--st-anchor-active-secondary-color",
  "--st-anchor-disabled-primary-color",
  "--st-anchor-disabled-secondary-color",
  "--st-loader-color",
  "--st-loader-background-color",
  "--st-loader-background-wrapper-color"
];

const presetColors = {  
  "Blue (Default)": {
    "--st-background": "unset",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#60bef5",
    "--st-anchor-default-secondary-color": "#b0b0b1",
    "--st-anchor-active-primary-color": "#009EF7",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-loader-color": "#009EF7",
  },
  "Green": {
    "--st-background": "unset",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#588835",
    "--st-anchor-default-secondary-color": "#c2c2c2",
    "--st-anchor-active-primary-color": "#78c043",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-loader-color": "#78c043",
  },
  "Yellow": {
    "--st-background": "unset",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#e4a707",
    "--st-anchor-default-secondary-color": "#dbe0e5",
    "--st-anchor-active-primary-color": "#e4a707",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-loader-color": "#e4a707",
  },  
  "Red": {
    "--st-background": "unset",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#f8877f",
    "--st-anchor-default-secondary-color": "#fefefe",
    "--st-anchor-active-primary-color": "#f44336",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-loader-color": "#f44336",
  },
  "Lite Blue": {
    "--st-background": "unset",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#0cb6d8",
    "--st-anchor-default-secondary-color": "#dbe0e5",
    "--st-anchor-active-primary-color": "#00d5ff",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-loader-color": "#00d5ff",
  },
  "Dark": {
    "--st-background": "#000000",
    "--st-border": "1px solid #eeeeee",
    "--st-anchor-default-primary-color": "#333333",
    "--st-anchor-default-secondary-color": "#aaaaaa",
    "--st-anchor-active-primary-color": "#ffffff",
    "--st-anchor-active-secondary-color": "#ffffff",
    "--st-anchor-disabled-primary-color": "#222222",
    "--st-anchor-disabled-secondary-color": "#ffffff",
    "--st-loader-color": "#000000",
  }
}

function displayColors() {
  let html = '';
  const cmpStyle = window.getComputedStyle(document.documentElement);
  cssColors.forEach(col => {
      let color = cmpStyle.getPropertyValue(col).trim();
      html += `<div class="col-sm-2 mt-2">
                <input type="color" class="form-control form-control-color color-picker" id="${col}" value="${color}" title="${col}">
              </div>`;

  })

  $('#color-list').html(html);
}

function loadColorList() {
  $.each(presetColors, function(key, objColors) {
      $('#theme_colors').append($('<option/>', {
          value: key,
          text : key,
          'data-colors': window.btoa(JSON.stringify(objColors))
      }));
  });
}

function applyColors(colorObj) {
  colorObj = JSON.parse(window.atob(colorObj));
  $.each(colorObj, function(key, val) {
      document.documentElement.style.setProperty(key, val);
  });

  displayColors();
}

$(function() {

    loadColorList();

    displayColors();

    // External Button Events
    $("#reset-btn").on("click", function() {
        // Reset
        $('#smarttab').smartTab("reset");
        return true;
    });

    $("#prev-btn").on("click", function() {
        // Navigate previous
        $('#smarttab').smartTab("prev");
        return true;
    });

    $("#next-btn").on("click", function() {
        // Navigate next
        $('#smarttab').smartTab("next");
        return true;
    });

    // Demo Button Events
    $("#btn-go-to").on("click", function() {
        // Go to step
        var index = $("#got_to_step").val() - 1;
        $('#smarttab').smartTab("goToTab", index);
        return true;
    });

    $(".option-setting-checkbox").on("click", function() {
        // Change options
        let val = $(this).prop("checked");
        let options = {};
        switch($(this).prop("id")) {
          case 'key_navigation':
            options = {
              keyboard: {
                keyNavigation: val
              }
            }
            break;
          case 'is_justified':
            options = {
              justified: val
            }
            break;
          case 'autoAdjustHeight':
            options = {
              autoAdjustHeight: val
            }
            break;
        }        

        $('#smarttab').smartTab("setOptions", options);
        return true;
    });

    $("#animation").on("change", function() {
        const anim = $(this).val();
        const cssAnim = cssAnimationList[anim];
        var options = {};

        if (cssAnim != undefined) {
          options = {
            transition: {
                animation: 'css',
                ...cssAnim
            },
          };
        } else {
          options = {
            transition: {
                animation: anim
            },
          };
        }

        $('#smarttab').smartTab("setOptions", options);
        return true;
    });

    $("#theme_selector").on("change", function() {
        // Change theme
        var options = {
          theme: $(this).val()
        };
        $('#smarttab').smartTab("setOptions", options);
        $('#smarttab2').smartTab("setOptions", options);
        return true;
    });

    $(".color-picker").on("change", function() {
        // Set color
        document.documentElement.style.setProperty($(this).prop('id'), $(this).val());
        return true;
    });

    $("#theme_colors").on("change", function() {
        applyColors($('#theme_colors option:selected').data('colors'));
        return true;
    });
});