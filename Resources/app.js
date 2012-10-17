Titanium.UI.setBackgroundColor('#000');

var ground = Ti.UI.createWindow({
    layout: 'vertical'
});

var top = Ti.UI.createView({
    backgroundColor: '#333',
    height: '20%'
});

var caption = Ti.UI.createLabel({
    text: 'とてか 02',
    textAlign: 'center',
    color: '#ddd',
    width: '100%',
    font:{fontSize: '100%'},
})

var contents = Ti.UI.createView({
    backgroundColor: '#000',
    height: '70%',
    layout: 'vertical',
});

var count = Ti.UI.createLabel({
    text: '00:00',
    color: '#99ff99',
    top: 50,
    witdh: '100%',
    font:{fontSize: '200%'},
});

var qa = Ti.UI.createLabel({
    text: '　',
    color: 'white',
    top: 5,
    font:{fontSize: '70%'},		
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
    width: 80,
});

var clear = Ti.UI.createButton({
    title: 'clear',
    left: 10,
    height: 42,
    width: 80,
});

var mode = Ti.UI.createButton({
    title: 'mode',
    left: 30,
    height: 42,
});

var timer_option = Titanium.UI.createOptionDialog({
    title: 'timer option',
    options: ['keynote', 'recipe', 'world cafe', 'demo', 'cansel'],
    cancel: 4
});

var optionLable = Ti.UI.createLabel({
    text: 'none',
    color: '#99ff99',
    left: 10,
})
//
var past_time;
var total = 0;
var timer_id;
var pause = 0;
var remain = 0;
var timer_mode = -1;
var init = 1;

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
        total -= 1;
        if (total <= 0) {
            qa.color = '#FFFF00';
            qa.font = {fontSize: '100%'};
            qa.text = 'はくしゅ!';
            count.text = "888888";
        } else {
            if (total == remain) {
                contents.backgroundColor = '#777';
                qa.text = 'Question?';
            }
            count.text = date_format(total);
            past_time = tmp_time;
            timer_id = setTimeout("update()", 300);
        }
    } else {
        timer_id = setTimeout("update()", 300);
    }
};

function initTotalandRemain() {
    switch (timer_mode) {
    case 0: //keynote
        total = 25 * 60;
        remain = 5 * 60;
        break;
    case 1: //recipe   
        total = 15 * 60;
        remain = 5 * 60;
        break;
    case 2: //workd cafe    
        total = 15 * 60;
        remain = -1;
        break;
    case 3: //demo   
        total = 10;
        remain = 5;
        break;
    default:
        total = 0;
        remain = -1;
    }
};

function initLabel() {
    count.text = date_format(total);
    qa.text = '　';
    qa.font = {fontSize: '70%'};
    contents.backgroundColor = '#000';
    start.title = 'start';
};

function timerClear(){
    var start_time = new Date();
    past_time = start_time;
    pause = 0;
    init = 1;
};

clear.addEventListener('click', function (){
    clearTimeout(timer_id);
    timerClear();
    initTotalandRemain();
    initLabel();
});

function timeForward(){
    pause = 0;
    start.title = 'pause';
    var tmp_time = new Date();
    past_time = tmp_time;
    timer_id = setTimeout("update()", 300);
};

start.addEventListener('click', function () {
    if (total <= 0) return;
    if (init === 1) {
        init = 0;
        timeForward();
    } else if (pause === 1) {
        timeForward();
    } else {
        pause = 1;
        start.title = 'restart';
        clearTimeout(timer_id);
    }
});

timer_option.addEventListener('click', function(e){
    switch (e.index) {
    case 0:
        optionLable.text = 'keynote';    
        timer_mode = 0;            
        break;
    case 1:
        optionLable.text = 'recipe';                
        timer_mode = 1;            
        break;
    case 2:
        optionLable.text = 'world cafe';                
        timer_mode = 2;            
        break;
    case 3:
        optionLable.text = 'demo';                
        timer_mode = 3;            
        break;
    case 4:
        return;
    default:
        optionLable.text = 'none';                
    };
    clear.fireEvent('click')
});

mode.addEventListener('click', function(){
    timer_option.show();
});

top.add(caption);
contents.add(count);
contents.add(qa);

toolview.add(start);
toolview.add(clear);
toolview.add(mode);
toolview.add(optionLable);
footer.add(toolview);

ground.add(top);
ground.add(contents);
ground.add(footer);
ground.open();
