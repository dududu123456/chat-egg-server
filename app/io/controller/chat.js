'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    const message = this.ctx.args[0];
    // console.log('chat :', message + ' : ' + process.pid);
    const say = await this.ctx.service.user.say();
    this.ctx.socket.emit('res', say);
  }

  async join() {
    const socket = this.ctx.socket;
    // console.log('---------join', socket);
    socket.join('all');
  }

  async message() {
    const message = this.ctx.args[0];
    console.log('---------message', message);
    const { userId, msg } = message;

    const user = this.ctx.session.user;

    console.log('----user', user);
    // if (userId === 'groupall') {
    this.ctx.socket.to('all').emit('msg', { ...user, msg, userId });

    this.ctx.socket.to(userId).emit('msg', { ...user, msg });
  }
}

module.exports = ChatController;
