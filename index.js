
window.onload = function() {
    var container = document.querySelector('#container');
    var video = document.querySelector('video');
    var play = document.querySelector('.icon-icon-test');
    var current = document.querySelector('span.current');
    var total = document.querySelector('span.total');
    var screen = document.querySelector('.icon-quanping');
    var rate = document.querySelectorAll('.rate-list li');
    var progress = document.querySelector('.progress');
    var progressLine = document.querySelector('.progress-line');
    var progressBall = document.querySelector('.progress-ball');
    var BigVoice = document.querySelector('.voice')
    var voice = document.querySelector('.icon-yinliang');
    var voiceHen = document.querySelector('.voice-hen');
    var voiceLined = document.querySelector('.voice-line');
    var volumeBall = document.querySelector('.voice-ball');
    var container = document.querySelector('.container');
    var h3 = document.querySelector('h3');
    var bar=document.querySelector('.bar')
    var bool=true;
    play.onclick = function() {
        if (video.paused) {
            video.play();
            this.classList.add('icon-zanting');
            this.classList.remove('icon-icon-test');
        } else {
            video.pause();
            this.classList.remove('icon-zanting');
            this.classList.add('icon-icon-test');
        }
    }
    video.ontimeupdate = function() {
        current.innerHTML = formatTime(video.currentTime);
        var pencent = video.currentTime / video.duration;
        progressLine.style.width = progress.offsetWidth * pencent + 'px';
        progressBall.style.left = progress.offsetWidth * pencent - progressBall.offsetWidth / 2 + 'px';
    }
    total.innerHTML = formatTime(video.duration);
    video.ondurationchange=function(){       
          total.innerHTML = formatTime(video.duration);
    }

    function formatTime(total) {
        var time = Math.floor(total);
        var minute = Math.floor(time / 60);
        if (minute < 10) {
            minute = '0' + minute;
        }
        var second = Math.floor(time % 60);
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    progress.onclick = function(e) {
        var distance = e.pageX - progress.offsetLeft -(document.body.clientWidth-container.offsetWidth)/2;
        console.log(distance);
        var percent = distance / this.offsetWidth;
        video.currentTime = video.duration * percent;
        if(percent<1){
           video.play();
        }
    }
    progressBall.onmousedown = function(e) {
        var lineWidth = progressLine.offsetWidth;
        var startX = e.pageX;


        window.onmousemove = function(me) {
            var x = me.pageX - startX;
            var percent = (lineWidth + x) / progress.offsetWidth;
            video.currentTime = video.duration * percent;
        progressLine.style.width = progress.offsetWidth * pencent + 'px';
        progressBall.style.left = progress.offsetWidth * pencent - progressBall.offsetWidth / 2 + 'px';
            if(percent<1){
               video.play();
          }
        }
        window.onmouseup = function() {
            window.onmousemove = null;
            progressBall.onmousedown = null;
        }
    }
    for (var i = 0; i < rate.length; i++) {
        rate[i].onclick = function() {
            var value = this.innerHTML;
            video.playbackRate = parseFloat(value);
            h3.innerHTML = value;
        }
    }
    voice.onclick = function() {
        if (video.muted) {
            video.muted = false;
            volumeBall.style.left = voiceHen.offsetWidth - volumeBall.offsetWidth / 2 + 'px';
            voiceLined.style.width = voiceHen.offsetWidth + 'PX';
            this.classList.add('icon-yinliang');
            this.classList.remove('icon-jingyin');
        } else {
            video.muted = true;
            volumeBall.style.left = -6 + 'px';
            voiceLined.style.width = 0;
            this.classList.add('icon-jingyin');
            this.classList.remove('icon-yinliang');

        }
    }

    //音量调节!
    volumeBall.onmousedown = function(e) {
        var startLeft=this.offsetLeft;
        var startX=e.pageX
        window.onmousemove=function(me){
            var x=me.pageX-startX;
            var left=startLeft+x-volumeBall.offsetWidth/2;
            if(left<-6){
                left=0;
            }else if(left>voiceHen.offsetWidth-6){
                left=voiceHen.offsetWidth-6;
            }
           volumeBall.style.left=left+'px';
           voiceLined.style.width=left+volumeBall.offsetWidth/2+'px';
           video.volume = Math.abs(left/voiceHen.offsetWidth);
           if(video.paused==false){
               if(video.volume==0){
             voice.classList.add('icon-jingyin'); 
             voice.classList.remove('icon-yinliang'); 
           }else{
              voice.classList.add('icon-yinliang'); 
              voice.classList.remove('icon-jingyin'); 
           } 
         }           
      }
        window.onmouseup=function(){
            window.onmousemove=null; 
            volumeBall.onmousedown=null;
        } 
    }  
    voiceHen.onclick = function(e) {     
            var left = e.offsetX -volumeBall.offsetWidth / 2 ;
            console.log(left)
            if (left < 0) {
                left = 0;
            } else if (left > voiceHen.offsetWidth - volumeBall.offsetWidth / 2) {
                left = voiceHen.offsetWidth - volumeBall.offsetWidth / 2;
            }
            volumeBall.style.left = left + 'px';
            voiceLined.style.width = left + volumeBall.offsetWidth / 2 + 'px';
            var percent = (left + 6 / voiceHen.offsetWidth) / 100;
        // console.log(percent);
            video.volume = percent;              
    }
    screen.onclick = function() {
        if (!fullscreen()) {
            requestFullscreen(container);
            container.style.marginTop="0"; 
            // container.style.height="900px";    
            this.classList.remove('icon-quanping');
            this.classList.add('icon-quxiaoquanping');
        } else {
            exitFullscreen();
            container.style.marginTop="100px";
            this.classList.add('icon-quanping');
            this.classList.remove('icon-quxiaoquanping');
        }
    }
    //全屏之后要做什么什么什么事！
    document.onwebkitfullscreenchange = document.onmozfullscreenchange= document.onmsfullscreenchange=function() {
        if (fullscreen()) {
            container.classList.add('fullscren');    
        } else {
            container.classList.remove('fullscren');      
        }
    }
    function requestFullscreen(ele) {
        // 全屏兼容代码
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    function fullscreen() {
        return document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement ||
            false;
    }

}