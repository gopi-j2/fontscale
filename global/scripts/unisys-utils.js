var uUtils = {};

uUtils['settings'] = {
  toastTimeout: 8000
}

uUtils['togglePassword'] = function(scope){
  var $scope = $(scope);
  $scope.on('click', '.toggle ~ .controler', function(){
    var $this       = $(this),
        $elPassword = $this.siblings('.toggle'),
        inputType   = ($this.siblings('.toggle:password').length > 0) ? 'text' : 'password';
        $elPassword.attr('type', inputType);
  });
};

uUtils['toaster'] = function(msg, type){
  var tsType  = (type) || 'success',
      tsDelay = (uUtils.settings.toastTimeout) || 5000,
      tsId    = 'ts'+Date.now(),
      toaster = $('.toaster').length,
      tshtml  = '<div class="toast '+tsType+'" role="alert" id="'+tsId+'" data-animation="true"><div class="toast-body"><i class="icon"></i>'+msg+'</div></div>';

  if(toaster === 0){
    $('<div class="toaster"></div>').appendTo('body');
  }
  $(tshtml).appendTo('.toaster');
  $('#'+tsId).toast({delay: tsDelay}).toast('show');
};

uUtils['searchInput'] = function(scope){
  var $scope    = $(scope),
      closeIcon = '<a href="javascript:;" class="icon serach-close"></a>';

  $scope.find('.search-input').each(function(){
    var hasCloseIcon = $(this).siblings('.icon.serach-close').length > 0;

    if(!hasCloseIcon){
      $(closeIcon).insertAfter(this);
    }
  });

  $scope.on('input', '.search-input', function(){
    var $this        = $(this),
        thisLen      = $this.val().length,
        isEmpty      = thisLen == 0,
        hasValClass  = (isEmpty) ? 'removeClass' : 'addClass',
        hasMinLen    = $this.is('[data-min-length]'),
        btnState     = (hasMinLen) ? $this.data('minLength') > thisLen : isEmpty;

    $this[hasValClass]('has-val');
    $this.nextAll('.btn').prop('disabled', btnState);

    $scope.on('click', '.icon.serach-close', function(){
      $(this).siblings('.search-input').val('').trigger('input').focus();
    });
  });
};

$(document).on('input', '.custom-file-input', function(event){
  var $label = $(this).closest('.custom-file').find('.custom-file-label');

  if(event.target.files.length){
    $label.html(event.target.files[0].name);
  }
  $label.addClass('file-input-selected');
});

uUtils['spinner'] = function(el){
  var $body = $('body');
  $body.addClass('loading');
  setTimeout(function() {
    $body.removeClass('loading')
  }, 5000);
};

$['snackbar'] = function (params) {
  'use strict';
  $('.snackbar').remove();
  var snackbarType = (params['type'] || 'inline').toLowerCase(),
      snackbarId   = 'ts'+Date.now(),
      snackbarMsg  = params['message'] || params['msg'],
      transition   = params['transition'] || 'fade',
      buttonHTML   = '',
      snackbarWrap = $('.snackbar-wrap').length,
      btnActions   = params.buttons || {},
      btnClass,
      btnLabel;

  $.each(params.buttons, function (key, btnOptions) {
    btnClass = btnOptions['buttonClass'] || 'btn-default';
    btnLabel = btnOptions['label'] || '';
    buttonHTML += '<button type="button" class="snackbar-btn '+btnClass+'" data-button-action="'+key+'" tabindex="-1">'+btnLabel+'</button>';
  });

  var markup = ['<div class="snackbar ',snackbarType,' ',transition,'" id="',snackbarId,'"><div class="snackbar-body" tabindex="0">',snackbarMsg,'</div><div class="snackbar-buttons">',buttonHTML,'</div></div>'].join('');
  if(snackbarWrap === 0){
    $('<div class="snackbar-wrap"></div>').appendTo('body');
  }
  $(markup).appendTo('.snackbar-wrap');
  setTimeout(function(){ $('#'+snackbarId).addClass('open'); }, 10);

  $('.snackbar-btn').off('click').on('click', function(){
    var $this       = $(this),
        btnAction   = $this.data('buttonAction'),
        $snackbar   = $this.closest('.snackbar');

    btnActions[btnAction].action();
    $snackbar.removeClass('open');
    setTimeout(function(){ $snackbar.remove(); }, 600);
  });
};

uUtils['menuToggle'] = function(scope){
  var $scope = $(scope),
      menuPinned  = sessionStorage.getItem('pinned');
  if(menuPinned){
    $scope.addClass('min');
  }

  $(document).click(function() {
    $('.sidemenu').removeClass('open');
  });

  $scope.on('click', '.menu-pin', function(){
    $(this).closest('.sidemenu').toggleClass('min');
  });

  $scope.on('click', '.menu:not(.min)', function(event){
    event.stopPropagation();
    $(this).closest('.sidemenu').toggleClass('open');
  });
};

uUtils['numberInput'] = function(scope) {
  var $scope = $(scope);
  $('[data-bs-toggle="tooltip"]').tooltip();

  $scope.off('keypress').on('keypress', '.number-input .form-control', function(event) {
    var regExNumeric = /[0-9]/;
    return regExNumeric.test(event.key);
  });

  $scope.off('input').on('input', '.number-input .form-control', function(event) {
    var $this           = $(this),
        $numberInput    = $this.closest('.number-input'),
        getInputValue   = +$this.val(),
        isDataRange     = $this.is('[data-number-range]'),
        isEmpty         = $this.val().length == 0;

      if(isDataRange){
        var dataRange     = $this.data('numberRange').split(':'),
            minValue      = +dataRange[0],
            maxValue      = +dataRange[1];

        if(getInputValue < minValue){
          getInputValue = minValue;
        }else if(getInputValue > maxValue){
          getInputValue = maxValue;
        }

        $numberInput.find('.btn.icon-minus').prop('disabled', (getInputValue <= minValue));
        $numberInput.find('.btn.icon-plus').prop('disabled', (getInputValue >= maxValue));
      }

      getInputValue = (isEmpty) ? '' : getInputValue;
      $this.val(getInputValue);
  });

  $scope.off('click').on('click', '.number-input .btn', function() {
    var $this           = $(this),
        $stepperInput   = $this.closest('.number-input').find('.form-control'),
        isDecrement     = $this.hasClass('icon-minus'),
        isStep          = $stepperInput.is('[data-number-step]'),
        stepValue       = (isStep) ? $stepperInput.data('numberStep') : 1,
        getInputValue   = +$stepperInput.val(),
        setInputValue   = (isDecrement) ? getInputValue - stepValue : getInputValue + stepValue,
        isDataRange     = $stepperInput.is('[data-number-range]'),
        isEmpty         = $stepperInput.val().length == 0;

    if(isDataRange){
      var dataRange     = $stepperInput.data('numberRange').split(':'),
          minValue      = +dataRange[0];

      setInputValue = (isEmpty) ? minValue : setInputValue;
    }

    $stepperInput.val(setInputValue).trigger('input');
  });
};

$['confirm'] = function (params) {
  'use strict';
  $.confirmClose(true);
  var confirmType = (params['type'] || params['confirmType']).toLowerCase(),
    confirmClass  = params['class'] || params['confirmClass'] || '',
    confirmID     = params.id || ('confirmDlg_' + Date.now()),
    dlgMsg        = params['message'] || params['msg'] || params['m'],
    dlgDesc       = params['description'] || params['desc'] || '',
    buttonStatus  = (params['buttonstatus'] || params['buttonStatus'] || 'show'),
    buttonHTML    = '',
    btnID, btnLbl, btnClass, btnAttr;
  $.each(params.buttons, function (key, btnOptions) {
    btnID     = btnOptions['id'] || 'DlgBtn_' + key.replace(/[^a-zA-Z0-9]/g, '');
    btnLbl    = btnOptions['label'] || key;
    btnClass  = btnOptions['buttonClass'] || '';
    btnAttr   = '';
    if(btnOptions['attr']) {
      _.each(btnOptions['attr'], function(attrValue, attr){
        btnAttr += ' '+attr+'="'+attrValue+'"';
      });
    }
    buttonHTML += '<button type="button" class="btn '+btnClass+'" id="'+ btnID +'" '+btnAttr+'>'+btnLbl+'</button>';
  });

  var markup = [
    '<div class="modal fade confirm ',confirmClass,'" id="',confirmID,'" tabindex="-1" role="dialog">',
    '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content">',
    '<div class="modal-body"><p class="modal-icon"><i class="icons ',confirmType,'"></i></p><p class="modal-message">',dlgMsg,'</p><p class="modal-description">',dlgDesc,'</p></div>',
    '<div class="modal-footer ',buttonStatus,'">',buttonHTML,'</div></div></div></div>'
  ].join('');

  setTimeout(function () {
    $(markup).appendTo('body');
    $('#' + confirmID).modal({ backdrop: false }).modal('show');
    var buttons = $('.confirm.modal .btn').filter(':visible'),
        i       = 0;
    $.each(params.buttons, function (key, btnOptions) {
      $(buttons.eq(i++)).off('click').on('click', function () {
        if (btnOptions.action) btnOptions.action(params['data']);
        $.confirmClose();
      });
    });
  }, 200);
};

$['confirmClose'] = function () {
  'use strict';
  var $modalConfirm = $('.modal.confirm');
  $modalConfirm.modal('hide');
  setTimeout(function () { $modalConfirm.remove(); }, 500);
};

$(document).ready(function(){
  uUtils.menuToggle('#sideMenu');
  uUtils.togglePassword('#loginForm');
});
