var h1data1 = 0, h1data2 = 0, h2data2 = 0,h2data1 = 0;

function getDatas(){
    const socket = io.connect();
    socket.on('dataGetOne', (data)=>{
        console.log(data)
        dataOne1 = data.h1data1;
        $('#dataOne1').text(dataOne1);
    })
    socket.on('dataGetTwo', (data)=>{
        console.log(data)
        dataTwo1 = data.h2data1;
        $('#dataTwo1').text(dataTwo1);
    })
};