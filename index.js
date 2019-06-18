// EXPREES DAN SOCKET IO
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server); // import package socket.io
const path = require('path');
const json2csv = require("json2csv").parse;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname,'webs'))); // untuk nempation file web kita di folder www
const portListen = 8090;
server.listen(portListen);
console.log("Server starting...:" + portListen)

// /*============================
// =            MQTT            =
// ============================*/
const mqtt = require('mqtt');
const topic1 = 'latihanTopic1';
const topic2 = 'latihanTopic2';

const broker_server = 'mqtt://platform.antares.id'; //broker darisananya

const options = {
	clientId: 'esp_device' + Math.random().toString(16).substr(2, 8),
	port: 1883,
	keepalive: 60
}
const clientMqtt = mqtt.connect(broker_server, options);
clientMqtt.on('connect', mqtt_connect);
clientMqtt.on('reconnect', mqtt_reconnect);
clientMqtt.on('error', mqtt_error);
clientMqtt.on('message', mqtt_messageReceived);

function mqtt_connect() {
	console.log('MQTT Connected');
	clientMqtt.subscribe(topic1);
	clientMqtt.subscribe(topic2);
}

function mqtt_reconnect(err) {
	console.log(err);
	console.log('MQTT reconnect');
	//clientMqtt = mqtt.connect(broker_server, options); // reconnect
}

function mqtt_error(err) {
	console.log(err);
}

var listMessage1 = [];
var listMessage2 = [];

function mqtt_messageReceived(topic, message) {
	//console.log('Message received : ' + message);
	//console.log('Topic :' + topic);
	//var stringBuf = packet.payload.toString('utf-8');
	// var obj = JSON.parse(message.toString());
	console.log('====================================');
	console.log('Topic : ' + topic);
	console.log('Payload : ' + message);


	//will use later
	if (topic == topic1) {
		// initiate variable fot msg
		var h1data1 = 0;
		listMessage1 = parsingRAWData(message, ","); //parse the message by comma
		// console.log("Pesan : " +listMessage1);
		var objs0 = JSON.stringify(listMessage1[0]);
		var objs1 = JSON.stringify(listMessage1[1]);
		var objs2 = JSON.stringify(listMessage1[2]);
		var objs3 = JSON.stringify(listMessage1[3]);
		var objs4 = JSON.stringify(listMessage1[4]);
		var objs5 = JSON.stringify(listMessage1[5]);
		var objs6 = JSON.stringify(listMessage1[6]);

		var jsonData1 = [
			{
				"data0": objs0
			},{
				"data1": objs1
			},{
				"data2": objs2
			},{
				"data3": objs3
			},{
				"data4": objs4
			},{
				"data5": objs5
			},{
				"data6": objs6
			},
		]
		
		console.log("Printed")
		var csv = json2csv({msg: jsonData1, header:['data0', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6']});
		fs.writeFileSync("./data1.csv", csv);

		// fs.writeFile("data1.json", objs, function (err, result) {
		// 	if (err) console.log('error', err);
		// });
		
		
		// h1data1 = listMessage1[3];
		// console.log("pesan : " + h1data1);
		console.log('====================================');

		io.sockets.emit('dataGetOne', {
			//json
			// call in client h1data.topic , h1data.windSpeeds....
			topic: topic1,
			h1data1: listMessage1[7],
			obj: objs
		});
	}
	if (topic == topic2) {
		// message 
		var h2data1 = 0;
		listMessage2 = parsingRAWData(message, ","); //parse the message by comma
		// console.log("Pesan : " +listMessage2);
		// set message to var
		// h2data1 = listMessage2[4];
		// console.log("pesan : " + h2data1);
		var objs = JSON.stringify(listMessage2);
		console.log("Printed")
		fs.writeFile("data2.json", objs, function (err, result) {
			if (err) console.log('error', err);
		});
		console.log('====================================');

		io.sockets.emit('dataGetTwo', {
			//json
			// call in client h1data.topic , h1data.windSpeeds....
			topic: topic2,
			h2data1: listMessage2[2],
			obj: objs
		});
	}
}
// /*=====  End of MQTT  ======*/

/*=================================
=            Socket IO            =
=================================*/
let jumlahClient = 0;
io.on('connection', (socket) => {
	jumlahClient++;
	console.log('New Client Connected');

	// socket.on('ctrl-led1', (data) => {
	// 	// receive from web and publish mqtt to turn LED1
	// 	clientMqtt.publish(topic2, data.data.toString());
	// 	console.log('publish message to ' + topic1 + ' - message ' + data.data);
	// });


	socket.on('disconnect', () => {
		jumlahClient--;
		console.log('Client disconnected \n' + 'Total :' + jumlahClient);
	});

});


/*=====  End of Socket IO  ======*/



// FUNCTION UNTUK PARSING
// argument 1 : data yang diparsing ex: 123 434 5334
// argument 2 : pemisah
// return array data [0] =123 [1] =434 [2] =5334
function parsingRAWData(data, delimiter) {
	let result;
	result = data.toString().replace(/(\r\n|\n|\r)/gm, "").split(delimiter);

	return result;
}