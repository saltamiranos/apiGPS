const server = require('net').createServer();
const process = require('ruptela');
 
server.on('connection', (conn) => {
    const addr = conn.remoteAddress + ':' + conn.remotePort;
    console.log('New connection from %s', addr);
 
    conn.on('data', (data) => {
        console.log('New data from connection %s: %j', addr, data);
        const res = process(data);
        if (!res.error) {
            //do something with res.data
 
            //return acknowledgement
            conn.write(res.ack);
        } else {
            //do something with res.error
        }
    });
    conn.once('close', () => {
        console.log('Connection from %s closed', addr);
    });
    conn.on('error', (error) => {
        console.log('Error from connection %s: %s', addr, error.message);
    });
});
//configure server to listen on PORT
const ip = '172.26.4.16';
server.listen(8080, ip, () => {
    console.log('Server started on port %s at %s', server.address().port, ip);
});
