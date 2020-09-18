const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'app')));

const PORT = process.env.PORT || 5000;
server.listen(PORT, null, function() {
	console.log('Listening on port ' + PORT);
});

app.get(['/', '/:room'], (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));

const channels = {};
const sockets = {};

io.sockets.on('connection', socket => {
	const socketHostName = socket.handshake.headers.host.split(':')[0];

	socket.channels = {};
	sockets[socket.id] = socket;

	console.log('[' + socket.id + '] ket noi thanh cong!');
	socket.on('disconnect', () => {
		for (const channel in socket.channels) {
			part(channel);
		}
		console.log('[' + socket.id + '] da thoat!');
		delete sockets[socket.id];
	});

	socket.on('join', config => {
		console.log('[' + socket.id + '] co dia chi tren url la: ', config);
		const channel = socketHostName + config.channel;

		// Already Joined
		if (channel in socket.channels) return;

		if (!(channel in channels)) {
			channels[channel] = {};
		}

		for (id in channels[channel]) {
			channels[channel][id].emit('addPeer', { peer_id: socket.id, should_create_offer: false });
			socket.emit('addPeer', { peer_id: id, should_create_offer: true });
		}

		channels[channel][socket.id] = socket;
		socket.channels[channel] = channel;
	});

	const part = channel => {
		// Socket not in channel
		if (!(channel in socket.channels)) return;

		delete socket.channels[channel];
		delete channels[channel][socket.id];

		for (id in channels[channel]) {
			channels[channel][id].emit('removePeer', { peer_id: socket.id });
			socket.emit('removePeer', { peer_id: id });
		}
	};

	socket.on('relayICECandidate', config => {
		let peer_id = config.peer_id;
		let ice_candidate = config.ice_candidate;
		console.log('dia chi [' + socket.id + '] da ket noi den dai chi [' + peer_id + '] ', ice_candidate);

		if (peer_id in sockets) {
			sockets[peer_id].emit('iceCandidate', { peer_id: socket.id, ice_candidate: ice_candidate });
		}
	});

	socket.on('relaySessionDescription', config => {
		let peer_id = config.peer_id;
		let session_description = config.session_description;
		console.log(
			'dia chi [' + socket.id + '] da ket noi den dia chi [' + peer_id + '] ',
			session_description
		);

		if (peer_id in sockets) {
			sockets[peer_id].emit('sessionDescription', {
				peer_id: socket.id,
				session_description: session_description
			});
		}
	});
});
