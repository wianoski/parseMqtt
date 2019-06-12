var temp = 0,
gas = 0,
winDir = 0,
hdrop = 0,
test = 0;

var param = {
        lintang 	: -6.9739024 , //Bandung
        bujur 		: 107.62990522121004, //Bandung
        setLintang : function(data){
        	this.lintang = parseFloat(data);
        },
        setBujur : function(data){
        	this.bujur = parseFloat(data);
        },
        getLintang : function(){
        	return this.lintang;
        },
        getBujur : function(){
        	return this.bujur  ;
        }
    };
    
    var lineCoordinatesArray = [];

	var gaugeGas = new LinearGauge({
    	renderTo: 'gaugeGas',
    	// chartType : 'gauge',
    	width: 500,
    	height: 150,
   	 	minValue: 0,
    	maxValue: 300,
    	majorTicks: ['0', '100', '200', '300'],

    	minorTicks: 10,
    	ticksAngle: 180,
    	startAngle: 90,
    	highlights: [
        {
            "from": 200,
            "to": 300,
            "color": "rgba(200, 50, 50, .75)"
        	}
    	],	
    		animationRule: 'elastic',
    	// highlights: false,
    		minorTicks: 10,
    		strokeTicks: true,
    		colorPlate: "#fff",
    		borderShadowWidth: 0,
    		borders: false,
    		barBeginCircle: false,
    		tickSide: "left",
    		numberSide: "left",
    		needleSide: "left",
    		needleType: "line",
    		needleWidth: 3,
    		colorNeedle: "#222",
    		colorNeedleEnd: "#222",
    		animationDuration: 150,
    		animationRule: "linear",
    		animationTarget: "plate",
    		barWidth: 5,
    		ticksWidth: 50,
    		ticksWidthMinor: 15
    	}).draw();
	gaugeGas.draw();

function update(){
	const socket = io.connect();

	socket.on('socketData', (data)=>{
		console.log(data);

		document.getElementById("lmao").innerHTML  = data.dataMuncul;

		$( "#head" ).html(data.dataMuncul[0]) ;
		$( "#humi" ).html(data.dataMuncul[1]) ;
		$( "#temp" ).html(data.dataMuncul[2]) ;
		$( "#gas" ).html(data.dataMuncul[3]) ;
		$( "#roll" ).html(data.dataMuncul[4]) ;
		$( "#yaw" ).html(data.dataMuncul[6]) ;
		$( "#pitch" ).html(data.dataMuncul[5]) ;
		$( "#hdrop" ).html(data.dataMuncul[7]) ;
		$( "#lat" ).html(data.dataMuncul[8]) ;
		$( "#long" ).html(data.dataMuncul[9]) ;
		// $( "#z" ).html(data.dataMuncul[10]) ;
		// $( "#IMG" ).html(data.dataMuncul[11]) ;

		temp = parseInt(data.dataMuncul[2]);
		gas = parseInt(data.dataMuncul[3]);
		hdrop = parseInt(data.dataMuncul[7]);
		yaw = parseInt(data.dataMuncul[6]);

		param.setLintang(data.dataMuncul[8]);
		param.setBujur(data.dataMuncul[9]);
		gaugeGas.value = gas;

		//manggil maps
		 // redraw(param.getLintang(), param.getBujur());

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
	                    y = yaw;
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
	            		y: yaw
	            	});
	            }
	            return data;
	        }())
	    }]
	});
	// // Highcharts.chart('grafikGas', {
	// 	chart: {
	// 		type: 'spline',
	//         animation: Highcharts.svg, // don't animate in old IE
	//         marginRight: 10,
	//         events: {
	//         	load: function () {

	//                 // set up the updating of the chart each second
	//                 var series = this.series[0];
	//                 setInterval(function () {
	//                     var x = (new Date()).getTime(), // current time
	//                     y = gas;
	//                     series.addPoint([x, y], true, true);
	//                 }, 1000);
	//             }
	//         }
	//     },
	//     title: {
	//     	text: 'Gas'
	//     },
	//     xAxis: {
	//     	type: 'datetime',
	//     	crosshair: true,
	//     	tickPixelInterval: 150
	//     },
	//     yAxis: {
	//     	crosshair:true,
	//     	title: {
	//     		text: 'Value'
	//     	}
	//     },
	//     tooltip: {
	//     	formatter: function () {
	//     		return '<b>' + this.series.name + '</b><br/>' +
	//     		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	//     		Highcharts.numberFormat(this.y, 2);
	//     	}
	//     },
	//     legend: {
	//     	enabled: true
	//     },
	//     exporting: {
	//     	enabled: false
	//     },
	//     series: [{
	//     	name: 'Gas data',
	//     	data: (function () {
	//             // generate an array of random data
	//             var data = [],
	//             time = (new Date()).getTime(),
	//             i;

	//             for (i = -19; i <= 0; i += 1) {
	//             	data.push({
	//             		x: time + i * 1000,
	//             		y: gas
	//             	});
	//             }
	//             return data;
	//         }())
	//     }]
	// });

	


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

    

});//---------------batas highchart
function redraw(Lintang, Bujur) {
    map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
    map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

    pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

    var lineCoordinatesPath = new google.maps.Polyline({
       	path: lineCoordinatesArray,
       	geodesic: true,
       	strokeColor: '#ffeb3b',
       	strokeOpacity: 1.0,
       	strokeWeight: 2
        });

        lineCoordinatesPath.setMap(map); 
    }

function pushCoordToArray(latIn, lngIn) {
      	lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
}