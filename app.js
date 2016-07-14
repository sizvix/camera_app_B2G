function switch_flash_mode(){
    switch(mode_flash){
        case 'none' :
            break;
        case 'auto' :
            break;
        case 'activ' :
            break;
    }
}


function show_menu(){
    lay_menu.style.display = "" ;
}
function close_menu(){
    lay_menu.style.display = "none" ;
}


function show_gallery(){
    lay_gallery.style.display = "" ;
}
function close_gallery(){
    lay_gallery.style.display = "none" ;
}

    

function access_stream_ok(stream) { 
    live.srcObject = stream ;
    console.log("stream", stream);
    var mediaRecorder = new MediaRecorder(stream);
    live.addEventListener("playing", function() {                               // we need to wait video is playing to get height and width of the video 
        cv_photo.height = live.videoHeight ;
        cv_photo.width = live.videoWidth ;
    }, true);
    
    btn_record.onclick = function() {
        btn_stop.style.display = "" ;
        btn_record.style.display = "none" ;
        chunks = [];
        onrec = true ;
        mediaRecorder.start();
    }
    
    btn_stop.onclick = function() {
        btn_stop.style.display = "none" ;
        btn_record.style.display = "" ;
        onrec = false ;
        mediaRecorder.stop();
    }
    
    btn_mode.onclick = function(){                                              // to switch between photo and video mode
      if(mode_photo){
          btn_photo.style.display = "none";
          btn_record.style.display = "";
      }else{
          if(onrec) btn_stop.onclick();
          btn_photo.style.display = "";
          btn_record.style.display = "none";
          btn_stop.style.display = "none";
      }
      mode_photo = !mode_photo ;
    };
    
    function take_photo(){
        var context = cv_photo.getContext("2d");
        context.drawImage(live, 0,0 );                                          // fill canvas
        cv_photo.classList.add('cv_show');
        if( cv_photo.height/window.innerHeight < cv_photo.width/window.innerWidth ){        // to resize the canva with the photo to fullscreen
            cv_photo.style.width = '100%' ;
            var height = cv_photo.height * window.innerWidth/cv_photo.width ;
            cv_photo.style.height = height+'px' ;
            cv_photo.style.padding = (window.innerHeight-height)/2+'px 0';
        }else{
            cv_photo.style.height = '100%' ;
            var width = cv_photo.width * window.innerHeight/cv_photo.height ;
            cv_photo.style.width = width+'px' ;
            cv_photo.style.padding = '0 '+((window.innerWidth-width)/2+'px') ;
        }
        window.open(cv_photo.toDataURL("image/jpeg"),'_blank');
        setTimeout(function(){cv_photo.classList.remove('cv_show')},1000);      // to show the photo during 1 second
    }
    
    btn_photo.onclick = function(){   setTimeout(take_photo,timer*1000);  };    // timeout with the timer
    
    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
    }
    
    mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/ogv; codecs=opus' });
        window.open(window.URL.createObjectURL(blob),'_blank');
    };
    
    mediaRecorder.onwarning = function(e) {
        console.log('warning for mediaRecoder ',e);
    };
    
    mediaRecorder.onerror = function(e) {
        console.log('error for mediaRecoder ',e);
    };
};

function fail_access_stream(err) {
    alert(err);
    console.log('The following error occured: ' + err);
}
