$(document).ready(function () {

    console.log("Hello! :-)")

    /******************************************
    >>>>>>>>>> GET URL PARAMETER VALUE FUNCTION
    ******************************************/        
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };


    /******************************************
    >>>>>>>>>> GET TRANSACTION DATA
    ******************************************/
    var txid = getUrlParameter('txid');
            
    /******************************************
    >>>>>>>>>> GET SHARD DATA 
    ******************************************/
    var theShard = getUrlParameter('shard');

    $.ajaxSetup({
        async: false
    });

    $.getJSON('https://test.devv.io/shard-info?shard-id=1&shard-name=' + theShard, function(data) {            

        var loading = $('.loading');   
        var shardData = $('#shardResults'); 
        var avgBlockTime = (data['avg-block-time']/1000)

        // populate shard data
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='0' data-aos-once='true'><div class='dataLabel'>Shard name</div><div class='dataVal'><strong>" + theShard + "</strong></div></div>");
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='50' data-aos-once='true'><div class='dataLabel'>Avg. block time</div><div class='dataVal' id='avg-block-time'>" + avgBlockTime + " sec</div></div>");
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='150' data-aos-once='true'><div class='dataLabel'>Current block</div><div class='dataVal' id='current-block'>" + data['current-block'] + "</div></div>");
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='200' data-aos-once='true'><div class='dataLabel'>Avg. tx. per block</div><div class='dataVal'>" + data['avg-tx-per-block'] + "</div></div>");
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='250' data-aos-once='true'><div class='dataLabel'>Last block time</div><div class='dataVal'>" + timeAgo(data['last-block-time']) + "</div></div>");
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='300' data-aos-once='true'><div class='dataLabel'>Last tx. count</div><div class='dataVal'>" + data['last-tx-count'] + "</div></div>");            
        shardData.append("<div class='shardData' data-aos='fade-down' data-aos-delay='350' data-aos-once='true'><div class='dataLabel'>Total tx. count</div><div class='dataVal'>" + data['total-tx-count'] + "</div></div>");

        loading.hide();
    
    });    

    $.ajaxSetup({
        async: true
    });

    $.ajaxSetup({
        async: false
    });


    /******************************************
    >>>>>>>>>> GET LAST 20 BLOCKS
    ******************************************/
    var lastblock = ($('#current-block').text()) - 1;
    var last20 = lastblock - 20;
    var blockVals = $('#theBlockVals');   

    while(lastblock >= last20){            
        $.getJSON('https://test.devv.io/block-info?shard-id=1&shard-name=' + theShard + '&block-height=' + lastblock, function(data) {
            var html = '';

            if ($(window).width() > 480){
                var max = 15;
            } else {
                var max = 10;
            }

            if ($(window).width() > 720){
                var ttip = 'tip-top-left'
            } else {
                var ttip = 'tip-top'
            }

            now = Date.now();
            then = data['block-time'];
            milliPassed = now-then;
            var blockTime = convertMS(milliPassed);
            var timePassed = ""
            var days = blockTime['day'];
            var hours = blockTime['hour']; 
            var seconds = blockTime['seconds']; 

            if(days>0){
                if(days == 1){
                    timePassed += (days + " day")
                } else {
                    timePassed += (days + " days")
                }
                if(hours || seconds) {
                    timePassed += ", ";
                }
            }
            if(hours>0){
                if(hours == 1){
                    timePassed += (hours + "hr")
                } else {
                    timePassed += (hours + "hrs")
                }
                if(seconds) {
                    timePassed += ", ";
                }
            }
            if(seconds>0){
                if(seconds == 1){
                    timePassed += (seconds + "s")
                } else {
                    timePassed += (seconds + "s")
                }
            }                

            html += '<div class="shardInfoVal">';            
            html += '<div class="col"><div class="mobLabel">Block height:</div>' + data['block-height'] + '</div>';
            html += '<div class="col"><div class="mobLabel">Block size:</div>' + data['block-size'] + 'B</div>';
            html += '<div class="col"><div class="mobLabel">Block time:</div>' + timePassed + '</div>';
            html += '<div class="col phash" data-id="' + data['previous-hash'] + '"><div class="mobLabel">Prev. hash:</div>' + jQuery.trim(data['previous-hash']).substring(0, max) +'<span class="tooltip ' + ttip + '" role="tooltip">' + data['previous-hash'] + '</span>...</div>';
            html += '<div class="col"><div class="mobLabel">Transactions:</div>' + data['transactions'] + '</div>';
            html += '</div>';
            blockVals.append(html);
           
        });
        lastblock --;
    }

    $.ajaxSetup({
        async: true
    });

    /******************************************
    >>>>>>>>>> GET TIME AGO
    ******************************************/        
    function timeAgo(stamp) {
        const now = (Date.now()/1000);       
        const then = stamp/1000;        
        const secondsAgo = Math.floor((now-then));

        if(secondsAgo == 1) {
            var val = secondsAgo + " second ago";

        } else if (secondsAgo < 60) {
            const val = secondsAgo + " seconds ago";

        } else if (secondsAgo < 3600) {
            minutesAgo = Math.floor(secondsAgo/60);            
            if (minutesAgo == 1){
                var val = minutesAgo + " minute ago";
            } else {
                var val = minutesAgo + " minutes ago";
            }

        } else if (secondsAgo < 86400) {
            hoursAgo = Math.floor(secondsAgo/3600);            
            if (hoursAgo == 1){
                var val = hoursAgo + " hour ago";
            } else {
                var val = hoursAgo + " hours ago";
            }

        } else {
            daysAgo = Math.floor(secondsAgo/86400);            
            if (daysAgo == 1){
                var val = daysAgo + " day ago";
            } else {
                var val = daysAgo + " days ago";
            }                
        }

        return val;
    };

    function convertMS( milliseconds ) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }

});