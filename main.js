var mode_photo = true ;
var mode_flash = 'none' ;
var timer = 0 ;

var chunks = [];
var onrec = false ;
var constraints = {audio:true,video: true};

screen.orientation.lock("portait");


btn_flash.onclick = switch_flash_mode ;
btn_param.onclick = show_menu ;
btn_menu_close.onclick = close_menu ;

live.onclick = function(){
    if(document.body.requestFullscreen)
        document.body.requestFullscreen();
    else
        document.body.mozRequestFullScreen();
};

btn_gallery.onclick = show_gallery ;

menu_timer.addEventListener('change',function(){
    timer = menu_timer.value ;
},true);


    function relog(msg){
        var div = document.createElement('div');
        div.textContent = msg ;
        relogd.appendChild(div);
    }
    function dump(arr,level) {
        var dumped_text = "";
        if(!level) level = 0;
        
        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";
        if(typeof(arr) == 'object') { //Array/Hashes/Objects 
                for(var item in arr) {
                        var value = arr[item];
                        
                        if(typeof(value) == 'object') { //If it is an array,
                                dumped_text += level_padding + "'" + item + "' ...\n";
                                dumped_text += dump(value,level+1);
                        } else {
                                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                        }
                }
        } else { //Stings/Chars/Numbers etc.
                dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
        }
        return dumped_text;
    }


try {
    navigator.mozGetUserMedia(constraints, access_stream_ok, fail_access_stream);
}catch(e){
    console.log(e);
}
