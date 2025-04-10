const http = require('http');
const {WebSocketServer} = require('ws');
const {parse} = require("node:url");
const uuidv4 = require('uuid').v4;

const server = http.createServer();
const wsServer = new WebSocketServer({server});

const port = 8000;

const connections = {};  // Change from array to object
const users = {};

const broadcastUsers = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
    });
};

const handleMessage = (bytes, uuid) => {
    try {
        const message = JSON.parse(bytes.toString());
        const user = users[uuid];
        if (user) {
            user.state = message;
            broadcastUsers();
            console.log(user.state.x + '-' + user.state.y);
        }
    } catch (err) {
        console.error("Failed to parse message", err);
    }

};

const handleClose = (uuid) => {
    delete connections[uuid];
    delete users[uuid];

    console.log(`Connection closed: ${uuid} `);
    broadcastUsers();
};

wsServer.on('connection', (connection, request) => {
    const {username} = parse(request.url, true).query;
    const uuid = uuidv4();

    connections[uuid] = connection;
    users[uuid] = {
        username: username,
        state: {
            x: 0,
            y: 0
        }
    };

    connection.on('message', (message) => handleMessage(message, uuid));
    connection.on('close', () => handleClose(uuid));

    console.log(`New connection: ${username} with UUID ${uuid}`);
});

server.listen(port, () => console.log(`Server is running at port: ${port}`));
