// This is the common file across stealthFormat brand which will have utility methods & will have app related data
var app = {}, appData = {}, appUtils = {}, SiHelpWindow;

appData.settings = {
  brand                    : 'stealthFormat',
  flyerDelayTime           : '4000',
  roleNameMaxLength        : 50,
  roleDescMaxLength        : 250,
  descLengthToShowReadMore : 70,
  compToRender             : 'logout',
  portraitScan             : {
    IsBackgroundUniformBestPractice  : 'Is Background Uniform BestPractice',
    FaceIsFrontal                    : 'Is Face Frontal',
    GoodExposure                     : 'Good Exposure',
    GoodGrayScaleProfile             : 'Good GrayScale Profile',
    GoodResolution                   : 'Good Resolution',
    HasNaturalSkinColour             : 'Has Natural Skin Colour',
    ImageWidthToHeightBestPractice   : 'Image Width To Height BestPractice',
    IsLightingUniform                : 'Is Lighting Uniform',
    EyesGazeFrontalBestPractice      : 'Eyes GazeFrontal BestPractice',
    MouthClosedBestPractice          : 'Mouth Closed BestPractice',
    NoHotSpots                       : 'No HotSpots',
    NoRedEyes                        : 'No Red Eyes',
    NoTintedGlasses                  : 'No Tinted Glasses',
    Sharp                            : 'Sharp',
    OnlyOneFaceVisible               : 'Only One Face Visible',
    FrontalBestPracticeCompliance    : 'Frontal Best Practice Compliance',
    EyesOpenBestPractice             : 'Eyes Open Best Practice',
    GoodVerticalFacePosition         : 'Good Vertical Face Position',
    HorizontallyCenteredFace         : 'Horizontally Centered Face',
    LengthOfHeadBestPractice         : 'Length Of Head BestPractice',
    ResolutionBestPractice           : 'Resolution BestPractice',
    WidthOfHeadBestPractice          : 'Width Of Head BestPractice',
    BestPracticeCompliance           : 'Best Practice Compliance',
    Compliant                        : 'Compliant',
    LengthOfHeadOK                   : 'Length Of HeadOK',
    WidthOfHeadOK                    : 'Width Of Head OK'
  }
};


appUtils['showFlyer'] = function (type, msg) {
  if(!msg) return;
  $.notify(
    {
      icon: 'notification-icon-'+type,
      message: msg
    },
    {
      type: type,
      delay: appData.settings['flyerDelayTime'],
      icon_type: 'class',
      template:
        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<i data-notify="icon" class="icon img-circle pull-left"></i>' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message" class="word-break">{2}</span>' +
        "</div>"
    })
};

appUtils['navigateToModuleTemplate'] = function (moduleName, template) {
  var path = location.origin +'/'+ appData.settings['brand'] + '/' + moduleName + '/' + template + '/';
  window.location.href = path;
}

appUtils['copyToClipboard'] = function (data) {
  var el = document.createElement('textarea');
  el.value = data;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

appUtils['onDocReady'] = function (ready) {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    ready();
  } else {
    document.addEventListener('DOMContentLoaded', ready);
  }
}


appUtils['enableDisableBtn'] = function(target, isValid) {
  if (isValid) {
    target.prop('disabled', false).removeClass('disabled');
  } else {
    target.prop('disabled', true).addClass('disabled');
  }
}

appUtils['loadSSRComponent'] =  function(targetSelector, targetUrl, urlParams) {
  util.loadSSRComponent(targetSelector, targetUrl, urlParams);
}

appUtils['inlcudeServerSideComponent'] =  function() {
  util.inlcudeServerSideComponent();
}

appUtils['loadModal'] =  function(modalId) {
  (modalId) ? $(modalId).modal('show') : $('.modal').modal('show');
}

appUtils['loadTooltip'] = function(parentContainer) {
  $('[data-bs-toggle="tooltip"]').tooltip({
    container: parentContainer,
    placement: 'bottom',
    html: true
  });
}

appUtils['ajax'] = function (method, url, data, dataType) {
  return $.ajax({
    type: method,
    url: url,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    },
    data: data ? JSON.stringify(data) : undefined,
    dataType: dataType,
    timeout : 300000
  });
}
appUtils['openHelpContent'] = function (isModal) {

  var $activeComponent = isModal ? $(".modal > .help-content-class[data-help-content]") : $('.help-content-class[data-help-content]'),
    contentFileName = $($activeComponent[0]).attr('data-help-content'),
    url = 'help/index.htm';

  if (contentFileName) {
    url = "/wroot/" + contentFileName + ".htm";
  }

  if (SiHelpWindow && !SiHelpWindow.closed) {
    SiHelpWindow.close();
  }
  SiHelpWindow = window.open(url, 'SiHelpWindow', "scrollbars=yes,resizable=yes,top=150,left=400,width=1000,height=700");

  if (SiHelpWindow) {
    $(window).on("unload", function () {
      SiHelpWindow.close();
    })
  }
  else {
    appUtils.showFlyer('error', 'pop up blocked');
  }
}
appUtils['toCamelCase'] = function (str) {
  str = str.trim();
  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
}

appUtils['splitOnCapitalLetter'] = function (str) {
  return String(str).trim().split(/(?=[A-Z])/).join(' ');
}

appUtils['asc_sort'] =  function (a, b) {
  return ($(b).text()) < ($(a).text()) ? 1 : -1;
}

appUtils['dec_sort'] = function (a, b) {
  return ($(b).text()) > ($(a).text()) ? 1 : -1;
}

//Compare two objects - return true if objects are equal, else return false
appUtils['compareObjects'] = function (a, b) {
  var aProps = Object.getOwnPropertyNames(a),
      bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) return false;

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if(typeof a[propName] === 'object') {
      if(!appUtils.compareObjects(a[propName], b[propName]))  return false;
    } else if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
};

appUtils['_StoreMgmt'] =  function (xStorage) {

  function _set(k, v) {
    function _store(keyName, valueStr) {
      xStorage.setItem(('' + keyName), JSON.stringify(valueStr));
    }

    if (arguments.length === 1) {
      if (_type(k, 'object')) {
        Object.keys(k).forEach(function (kX) {
          _store(kX, k[kX]);
        });
      } else if (_type(k, 'array')) {
        k.forEach(function (vX, kX) {
          _store(kX, vX);
        });
      }
    } else if (arguments.length === 2) {
      _store(k, v);
    }
  }

  function _get(k) {
    if (arguments.length === 0) {
      return _all();
    } else if (arguments.length === 1) {
      if (_type(k, 'string')) {
        return (k.indexOf(',') > 0) ? _all.apply(null, k.split(',')) : JSON.parse(xStorage.getItem(k));
      } else if (_type(k, 'array')) {
        return _all.apply(null, k);
      }
    } else {
      return _all.apply(null, arguments);
    }
  }

  function _all() {
    var filter = arguments.length;
    var filterKeys = Array.prototype.slice.call(arguments).map(function (x) {
      return ('' + x).trim();
    });
    var retObj = {};
    Object.keys(xStorage).forEach(function (key) {
      if (!filter || (filterKeys.indexOf(key) > -1)) {
        retObj[key] = _get(key);
      }
    });
    return retObj;
  }

  function _remove(k){
    function _removeItem( rKey ){
      xStorage.removeItem( rKey );
    }
    function _removeItems(){
      if (arguments.length) {
        Array.prototype.slice.call(arguments).forEach(function( rKey ){
          xStorage.removeItem( rKey );
        });
      }
    }

    if (arguments.length === 0) {
      _clear();
    } else if (arguments.length === 1) {
      if (_type(k, 'string')) {
        if (k.indexOf(',') > 0) {
          _removeItems.apply(null, k.split(','));
        } else {
          _removeItem( k );
        }
      } else if (_type(k, 'array')) {
        _removeItems.apply(null, k);
      }
    } else {
      _removeItems.apply(null, arguments);
    }
  }

  function _clear() {
    var filter = arguments.length;
    if (filter) {
      var filterKeys = Array.prototype.slice.call(arguments).map(function (x) {
        return ('' + x).trim();
      });
      Object.keys(xStorage).forEach(function (key) {
        if (filterKeys.indexOf(key) < 0) {
          xStorage.removeItem( key );
        }
      });
    } else {
      xStorage.clear();
    }
  }

  function _type(tOf) {
    var _typeOf = Object.prototype.toString.call(tOf).split(' ')[1].toLowerCase().replace(/\]$/gi, '');
    return (arguments.length === 2) ? (('' + arguments[1]).toLowerCase().indexOf(_typeOf) > -1) : _typeOf;
  }

  //Constructor
  var sStoreUtil = function (key, value) {
    if (arguments.length === 0) {
      return _all();
    } else if (arguments.length === 1) {
      if (_type(key, 'object|array')) {
        _set(key);
        return key;
      } else {
        return _get(key);
      }
    } else if (arguments.length === 2) {
      _set(key, value);
      return _get(key);
    }
  };

  //Methods
  sStoreUtil.set           = _set;
  sStoreUtil.get           = _get;
  sStoreUtil.getAll        = _all;
  sStoreUtil.remove        = _remove;
  sStoreUtil.removeAll     = _clear;
  sStoreUtil.removeExcept  = _clear;
  sStoreUtil.clear         = _clear;
  sStoreUtil.clearExcept   = _clear;

  return sStoreUtil;
}

try {
  appUtils.sesStore = appUtils._StoreMgmt(sessionStorage);
} catch (e) {
  console.warn('No Access to sessionStorage.', e);
}

try {
  appUtils.locStore = appUtils._StoreMgmt(localStorage);
} catch (e) {
  console.warn('No Access to localStorage.', e);
}

// HTTP error handler
appUtils.showApiError = function (errCode, errMsg, url, method) {
  util.showApiError(errCode, errMsg, url, method);
};

//Return Key for a particular value in object
appUtils.getKeyByValue = function(object, value) {
  return Object.keys(object).find(function(key) {
    return object[key] === value;
  });
};

//Returns keys if their values is not empty
appUtils.getValuedKeys = function (obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== '') {
      ret.push(key);
    }
  }
  return ret;
};

//Trims the given string 'tStr' from the source string 'sStr'
appUtils.strTrimLeft = function(sStr, tStr) {
  return (sStr.replace(new RegExp("^[" + (tStr || "\\s") +"]+", "g"), ""));
};

//Return the number with leading zero, if the value is less than 10.
appUtils.prependZero = function (number) {
  return (number < 10 ? '0' : '') + number;
};

// For Updating Offline Capture
setTimeout(function(){
  $('.edit-customer-id').click(function(){
    var $this           = $(this),
        $fsipInfoWidget = $(this).closest('.fsip-info-widget');
    $this.addClass('hide');
    $fsipInfoWidget.find('.fsip-customer-id-edit-widget').removeClass('hide');
    $fsipInfoWidget.find('.fsip-customer-label').addClass('hide');
    $fsipInfoWidget.find('.fsip-customer-id').focus();
  });

  $('.approve-edit-btn-group button').click(function(){
    var $this = $(this);
    $this.closest('.fsip-customer-id-edit-widget').addClass('hide');
    $this.closest('.fsip-customer-id-widget').find('.fsip-customer-label').removeClass('hide');
    $this.closest('.fsip-info-widget').find('.edit-customer-id').removeClass('hide');
  })
}, 500);

// Right side slideout Panel
$(".capture-client-form input[type=text], .capture-client-form textarea").keyup(function () {
  $("#btnSubmit").removeAttr('disabled');
});
$(".slide-out-btn").click(function () {
  var $this = $(this);
  $this.toggleClass("min");
  $('.right-panel').toggleClass('active');
});
$(".right-panel-slider").click(function () {
  var $this = $(this);
  $this.find(".global-layout .slide-out-btn").toggleClass("min");
  $this.find('.global-layout .right-panel').toggleClass('active');
});
$('#btnSubmit').on('click', function() {
  uUtils.toaster('<strong>FSIP-Package version 5</strong><br> Sucessfully Uploaded.','success');
});

// Hamburger menu
$('#sideMenu, .hamburger-menu').on('click', function(){
  $('#hamburgerMenu').toggleClass('min');
});
