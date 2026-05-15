var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },
};
app.initialize();

function cb(response){
	
    $('#response').text(JSON.stringify(response));
    if(response.responseCode==200){
        $('#status').text(response.transactionType+ ' Successfull');
    }else if(response.responseCode==400){
        $('#status').text(response.transactionType+ ' Failure');
    }else if(response.responseCode==499){
        $('#status').text(response.userAction+' Cancelled');
    }else if(response.responseCode==500){
        $('#status').text('Server Error');
    }else if(response.responseCode==409){
        $('#status').text('User already exists');
    }else if(response.responseCode==399){
        $('#status').text(response.userAction+' Max Retry Attempt Reached');
    }else if(response.responseCode==299){
        $('#status').text('Face Verification Failed');
    }else if(response.responseCode==309){
        $('#status').text('The length must be a minimum of 1 character');
    }else if(response.responseCode==199){
        $('#status').text(response.userAction);
    }else if(response.responseCode==503){
        $('#status').text('Service unavailable, please try after some time');
    }else if(response.responseCode==0){
        $('#status').text('No Internet connection');
    }else if(response.responseCode==404){
        $('#status').text('User Not Enrolled');
    }
    else if(response.responseCode==504){
        statusResponse = 'Gateway Time Out';
    }else if(response.responseCode==401){
        statusResponse = 'Not able to establish connection with server';
    }


}




