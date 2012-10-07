Titanium.UI.setBackgroundColor('#000');

var ground = Ti.UI.createWindow({
	layout: 'vertical'
});

var top = Ti.UI.createView({
	backgroundColor: '#333',
	height: '20%'
});

var title = Ti.UI.createLabel({
	text: 'toteka timer',
	textAlign: 'center',
	color: '#ddd',
	font:{fontSize: '100%'},
})

var contents = Ti.UI.createView({
	backgroundColor: '#000',
	height: '70%',
	layout: 'vertical',
});

var qa = Ti.UI.createLabel({
	text: '',
	color: 'white',
	font:{fontSize: '70%'},		
});

var count = Ti.UI.createLabel({
	text: '00:00',
	color: '#444',
	top: 20,
	font:{fontSize: '250%'},
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

function date_format(counting) {
	var min = parseInt(counting / 60);
	var sec = counting % 60;
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
			timer_id = setTimeout("update()", 100);
		}
	} else {
		timer_id = setTimeout("update()", 100);
	}
};

var start_time;
var past_time;
var counting;
var timer_id;
var pause = 0;

function timerClear(){
	start_time = new Date();
	past_time = start_time;
	if (spanSwitch.value) {
		counting = 25 * 60;
	} else {
		counting = 15 * 60;
	}
	remain = 5 * 60;	
	count.text = date_format(counting);
	qa.text = '';
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
	console.log("stop timer.");
	clearTimeout(timer_id);
	pause = 1;
});

top.add(title);
contents.add(qa);
contents.add(count);

toolview.add(start);
toolview.add(stop);
toolview.add(clear);
toolview.add(spanSwitch);
footer.add(toolview);

ground.add(top);
ground.add(contents);
ground.add(footer);
ground.open();


