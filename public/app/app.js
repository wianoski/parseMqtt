var h1data1 = 0,
    h1data2 = 0,
    h2data2 = 0,
    h2data1 = 0;

function getDatas() {
    const socket = io.connect();
    socket.on('dataGetOne', (data) => {
        console.log(data)
        // document.getElementById("demo").innerHTML = data.obj;		// custom get data
        dataOne1 = data.h1data1;
        $('#dataOne1').text(dataOne1);
    })
    socket.on('dataGetTwo', (data) => {
        console.log(data)
        // document.getElementById("demo").innerHTML = data.obj;
        dataTwo1 = data.h2data1;
        $('#dataTwo1').text(dataTwo1);
    })
};

function ctrlSubOne() {
    const socket = io.connect();
    socket.emit('ctrl-one', {
        data: true
    });
    $('#ctrlSubOne').text("Sending Sub");
    console.log("Data sended");
};

function ctrlSubTwo() {
    const socket = io.connect();
    socket.emit('ctrl-two', {
        data: {
            "car": "Audi"
          }
    });
    $('#ctrlSubTwo').text("Sending Sub");
    console.log("Data sended");
};

function saveData() {
    var firebaseConfig = {
        apiKey: "AIzaSyAj92llUHIY0gdYYhdq4HkYEwPCAkPtpwc",
        authDomain: "mqttdb-35f08.firebaseapp.com",
        databaseURL: "https://mqttdb-35f08.firebaseio.com",
        projectId: "mqttdb-35f08",
        storageBucket: "",
        messagingSenderId: "511837829097",
        appId: "1:511837829097:web:3a911297b91d991b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    /*=========================================================*/
    const socket = io.connect();
    socket.on('dataGetOne', (data) => {
        dataOne1 = data.h1data1;
    })
    socket.on('dataGetTwo', (data) => {
        dataTwo1 = data.h2data1;
    })


}