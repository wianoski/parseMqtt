var grafikTemp, grafikGas, grafikHdrop;
var params = {
	temp = 0,
	gas = 0,
	hdrop = 0,
	graph = {
		temp = [],
		gas = [],
		hdrop = []
	},
	setTemp : function(data){
		this.temp = parseFloat(data);
	},
	setGas : function(data){
		this.gas = parseFloat(data);
	},
	setHdrop : function(data){
		this.hdrop = parseFloat(data);
	},
	getTemp : function(){
		return this.temp;
	},
	getGas : function(){
		return this.gas;
	},
	getHdrop : function(){
		return this.hdrop;
	}

};

var temp, gas, drop;



function updateChart(){
	const socket = io.connect();

	socket.on('socketData', function(data)=>{
		param.setTemp(data.dataMuncul[]);

	});
}

$(function() {
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

 
	Highcharts.chart('grafikTemp', {
		chart: {
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = temp;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },

	    title: {
	    	text: 'Grafik temperatur'
	    },
	    xAxis: {
	    	type: 'datetime',
	    	crosshair: true,
	    	labels: {
                overflow: 'justify'
            },
	    	tickPixelInterval: 150
	    },
	    yAxis: {
	    	title: {
	    		text: 'Value'
	    	},

	    	crosshair: true,
	    	plotLines: [{
	    		value: 0,
	    		width: 1,
	    		color: '#808080'
	    	}]
	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    series: [{
	    	name: 'Random data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: temp
	            	});
	            }
	            return data;
	        }())
	    }]
	});
	Highcharts.chart('grafikGas', {
		chart: {
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = gas;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },
	    title: {
	    	text: 'Gas'
	    },
	    xAxis: {
	    	type: 'datetime',
	    	crosshair: true,
	    	tickPixelInterval: 150
	    },
	    yAxis: {
	    	crosshair:true,
	    	title: {
	    		text: 'Value'
	    	}
	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    series: [{
	    	name: 'Gas data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: gas
	            	});
	            }
	            return data;
	        }())
	    }]
	});
	Highcharts.chart('grafikHdrop', {
		chart: { 
			type: 'arearange',
			zoomType: 'x',
			type: 'spline',
	        // animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = hdrop;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },

	    title: {
	    	text: 'Grafik ketinggian'
	    },
	    xAxis: {
	    	crosshair : true,
	    	type: 'datetime',
	    	tickPixelInterval: 150,
	    	labels: {
                overflow: 'justify'
            }
	    },
	    yAxis: {
	    	title: {
	    		text: 'Ketinggian dalam ft'
	    	},
	    	crosshair : true,
	    	minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
	    	plotLines: [{
	    		value: 0,
	    		width: 1,
	    		color: '#808080'
	    	}]

	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    tooltip: {
            valueSuffix: ' feat'
        },
	   plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }

            }
        },
	    series: [{
	    	name: 'Data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: hdrop
	            	});
	            }
	            return data;
	        }())
	    }]
	});



	



	//buat peta untuk redraw
	map = new google.maps.Map(document.getElementById('coordinate'), {
		zoom: 17,
		center: {lat: param.getLintang(), lng : param.getBujur(), alt: 0}
	});

	//buat marker untuk redraw
    map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map});
    map_marker.setMap(map);
});
    