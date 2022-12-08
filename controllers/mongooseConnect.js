//  @ts-check

const mongoose = require('mongoose');

const MDB_URI =
  'mongodb+srv://sohyun:1236@cluster0.k9iy3rj.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
  mongoose.connect(MDB_URI, { dbName: 'KDT4' }, (err) => {
    if (err) {
      console.log('몽고디비 연결 문제 발생', err);
    } else {
      console.log('몽고 디비 연결 성공!');
    }
  });
  // 몽고디비 운영되다가 갑자기 튀어나오는 에러에 대해
  mongoose.connection.on('error', (err) => {
    console.log('몽고디비 연결 문제 발생', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('몽고디비 연결이 끊어졌습니다 연결을 재시도 합니다.');
    connect();
  });
};

module.exports = connect;
