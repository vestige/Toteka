Titanium.UI.setBackgroundColor('#000');

WebFontConfig = {
    google: { families: [ 'Expletus+Sans::latin'] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
 })();

var ground = Ti.UI.createWindow({
    layout: 'vertical'
});

var top = Ti.UI.createView({
    backgroundColor: '#333',
    height: '20%'
});

var caption = Ti.UI.createLabel({
    text: 'toteka timer',
    textAlign: 'center',
    color: '#ddd',
    width: '100%',
    font:{fontSize: '100%', fontFamily: 'Expletus Sans'},
})

var contents = Ti.UI.createView({
    backgroundColor: '#000',
    height: '70%',
    layout: 'vertical',
});

var count = Ti.UI.createLabel({
    text: '00:00',
    color: '#99ff99',
    top: 80,
    font:{fontSize: '250%'},
});

var qa = Ti.UI.createLabel({
    text: '　',
    color: 'white',
    top: 5,
    font:{fontSize: '70%', fontFamily:'Expletus Sans'},		
});

var footer = Ti.UI.createView({
    backgroundColor: '#333',
    height: '10%'
});

var toolview = Ti.UI.createView({
    backgroundColor: '#333',
    layout: 'horizontal',
    left: 20,
    top: 10
});

var start = Ti.UI.createButton({
    title: 'start',
    height: 42,
});

var stop = Ti.UI.createButton({
    title: 'stop',
    left: 10,
    height: 42,
});

var clear = Ti.UI.createButton({
    title: 'clear',
    left: 10,
    height: 42,
});

var spanSwitch = Ti.UI.createSwitch({
    left: 10,
    value: true 
});

function date_format(seconds) {
    var min = parseInt(seconds / 60);
    var sec = seconds % 60;
    var disp_time = '';
	
    if (min < 10) {
        disp_time += '0';
    }
    disp_time += min;
    disp_time += ':';
    if (sec < 10) {
        disp_time += '0';
    }
    disp_time += sec;
    return disp_time;
};

function update () {
    var tmp_time = new Date();
	
    if (tmp_time.getSeconds() != past_time.getSeconds()) {
        counting -= 1;
        if (counting < 0) {
            qa.color = '#FFFF00';
            qa.font = {fontSize: '120%', fontFamily: 'Expletus Sans'};
            qa.text = 'Finish!';
            count.text = "88888888";
            stop.fireEvent('click');
        } else {
            if (counting == remain) {
                contents.backgroundColor = '#777';
                qa.text = 'Question?';
            }
            count.text = date_format(counting);
            past_time = tmp_time;
            timer_id = setTimeout("update()", 300);
        }
    } else {
        timer_id = setTimeout("update()", 300);
    }
};

var past_time;
var counting;
var timer_id;
var pause = 0;

function timerClear(){
    var start_time = new Date();
    past_time = start_time;
    if (spanSwitch.value) {
        counting = 25 * 60;
    } else {
        counting = 15 * 60;
    }
    remain = 5 * 60;
    
    count.text = date_format(counting);
    qa.text = '　';
    qa.font = {fontSize: '70%', fontFamily: 'Expletus Sans'};
    contents.backgroundColor = '#000';
    pause = 0;
};

clear.addEventListener('click', function (){
    timerClear();
});

start.addEventListener('click', function () {
    if (pause === 0) {
        timerClear();
    } else {
        var tmp_time = new Date();
        past_time = tmp_time;
    }
    pause = 0;
    timer_id = setTimeout("update()", 300);
});

stop.addEventListener('click', function () {
    clearTimeout(timer_id);
    pause = 1;
});

top.add(caption);
contents.add(count);
contents.add(qa);

toolview.add(start);
toolview.add(stop);
toolview.add(clear);
toolview.add(spanSwitch);
footer.add(toolview);

ground.add(top);
ground.add(contents);
ground.add(footer);
ground.open();


