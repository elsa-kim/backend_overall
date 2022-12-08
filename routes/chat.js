//  @ts-check

const express = require('express');
const WebSocketServer = require('ws').Server;

const router = express.Router();
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  //   ws.send('저는 서버입니다! 잘 들리십니까?');

  wss.clients.forEach((client) => {
    client.send(`새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size}명`);
  });

  //   메세지 받아주는 애
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(`${message}`);
    });
  });

  //   누군가 나가면
  ws.on('close', () => {
    wss.clients.forEach((client) => {
      client.send(`유저 한명이 떠났습니다. 현재 유저 ${wss.clients.size}명`);
    });
  });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
