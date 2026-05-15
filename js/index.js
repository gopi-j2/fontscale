
  let canVibrate = false;
  if ('vibrate' in navigator)
    canVibrate = true;

function cb(response){
    $('#response').text(JSON.stringify(response));
    let statusResponse ='';
    if(response.responseCode==200){
        statusResponse = response.transactionType+ ' Successful';
    }else if(response.responseCode==400){
        statusResponse = response.transactionType+ ' Failure';
    }else if(response.responseCode == 499){
        statusResponse = response.userAction +' Cancelled';
    }else if(response.responseCode==500 || response.statusCode == 500){
        statusResponse = 'Internal Server Error';
    }else if(response.responseCode==409){
        statusResponse = 'User already exists';
    }else if(response.responseCode==399){
        statusResponse = response.userAction+' Max Retry Attempt Reached';
    }else if(response.responseCode == 299){
        statusResponse = response.message;
    }else if(response.responseCode==309){
        statusResponse = 'The length must be a minimum of 1 character';
    }else if(response.responseCode==199 || response.responseCode == 303){
        statusResponse = response.userAction;
    }else if(response.responseCode==503 || response.statusCode == 503 || response.status == 503){
        statusResponse = 'Service unavailable, please try after some time';
    }else if(response.responseCode==0 || response.status == 0) {
        statusResponse = 'No Internet connection';
    }else if(response.responseCode==404 || response.statusCode == 404){
        statusResponse = 'User Not Enrolled';
    }else if(response.responseCode==504 || response.status == 504){
        statusResponse = 'Gateway Time Out';
    }else if(response.responseCode==401){
        statusResponse = 'Not able to establish connection with server';
    }
    else if (response.responseCode == 408) {
        statusResponse = "Transaction timed out";
      }
    else if(response.responseCode=='LIVENESSFAILED'){
        statusResponse = 'Liveness check failed';
    }
    $('#response').text(JSON.stringify(response));
    snackbar(statusResponse);

}



function getParameterValues(param, querystring) {
    var url = querystring.split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
  }

  function detectMobile() {
      if( screen.width < 768) {
        $('#responseSwitch').attr('aria-label', '');
        $('#startAuthenticationUser').text('Tap to start authentication for user')
        $('#startEnrollUser').text('Tap to start enrolment for a new user')
        $('#startVerification').text('Tap to start verification for user')
        $('#responseSwitch').attr('aria-label', 'Toggle button. Show option selected. To switch to Hide, double tap');

      }
      else{
        $('#responseSwitch').attr('aria-label', '');
        $('#startAuthenticationUser').text('Click to start authentication for user')
        $('#startEnrollUser').text('Click to start enrolment for a new user')
        $('#startVerification').text('Click to start verification for user')
        $('#responseSwitch').attr('aria-label', 'Toggle button. Show option selected. To switch to Hide, press spacebar');

      }
  }

  function snackbar(msg){
    if (canVibrate)
     navigator.vibrate(800);
    $('#responseMsg').text(msg);
    $('#responseMsg').addClass('show');
       const afterLastSlash = msg.slice(msg.lastIndexOf(' ') + 1);
       if(afterLastSlash == "Successful"){
         $('.response-msg').css('color', '#3DB75E').css('border-color', '#3DB75E')
      }
      else{
        $('.response-msg').css('color', '#CD1543').css('border-color', '#CD1543')
      }
 }

document.addEventListener('DOMContentLoaded', function () {
  const aboutModalEl = document.getElementById('aboutUS');
  const eulaModalEl = document.getElementById('eula');
  const openEulaBtn = document.getElementById('openEula');
  const openAboutBtn = document.getElementById('openAbout');

  // Always create new modal instances when needed
  function showAbout() {
    cleanupBackdrops();
    const aboutModal = new bootstrap.Modal(aboutModalEl);
    aboutModal.show();
  }

  function showEula() {
    cleanupBackdrops();
    const eulaModal = new bootstrap.Modal(eulaModalEl);
    eulaModal.show();
  }

  // ?? Open “About” modal from dropdown
  openAboutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showAbout();
  });

  // ?? Open “EULA” modal from within About
  openEulaBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const aboutInstance = bootstrap.Modal.getInstance(aboutModalEl);
    if (aboutInstance) aboutInstance.hide();

    aboutModalEl.addEventListener('hidden.bs.modal', function handler() {
      showEula();
      aboutModalEl.removeEventListener('hidden.bs.modal', handler);
    });
  });

  // ?? Clean up any extra backdrops
  function cleanupBackdrops() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    if (backdrops.length > 1) {
      backdrops.forEach((bd, idx) => {
        if (idx < backdrops.length - 1) bd.remove();
      });
    }
  }

  document.addEventListener('hidden.bs.modal', cleanupBackdrops);
  document.addEventListener('show.bs.modal', cleanupBackdrops);


   const checkbox = document.getElementById('jsonCheck');
    const jsonWrap = document.getElementById('jsonInputWrap');
    const textarea = document.getElementById('jsonTextarea');
    const errorMsg = document.getElementById('jsonError');

    // Show/Hide textarea when checkbox toggled
    checkbox.addEventListener('change', function() {
      jsonWrap.classList.toggle('hide', !this.checked);
      textarea.value = '';
      // errorMsg.textContent = '';
      errorMsg.classList.remove('show', 'valid');
    });

    textarea.addEventListener('input', function() {
      const value = textarea.value.trim();
      if (value === '') {
        // errorMsg.textContent = '';
        errorMsg.classList.remove('show', 'valid');
        return;
      }

      try {
        JSON.parse(value);
        // errorMsg.textContent = 'Valid JSON';
        errorMsg.classList.add('valid');
        errorMsg.classList.remove('show');
      } catch (e) {
        // errorMsg.textContent = 'Invalid JSON';
        errorMsg.classList.add('show');
        errorMsg.classList.remove('valid');
      }
    });
});

$('#responseToggle').on('change', function() {
  const rightLabel = $('[data-bs-toggle-off]');
  const text = $(this).is(':checked') ? 'Show' : 'Show';
  $(this).closest('.toggle').find('[data-bs-toggle-on]').text(text);
  if(!$(this).is(':checked')) {
    rightLabel.addClass('active-text');
  }
  else{
    rightLabel.removeClass('active-text');
  }
  $('.json-message').toggle($(this).is(':checked'));
});

$('#landingPageContent').find('.card').on('click', function(e){ 
    $('#responseMsg').removeClass('show');
});
