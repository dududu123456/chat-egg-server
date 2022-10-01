'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async getMessageListByChatId() {
    const { ctx } = this;
    const { query } = ctx;
    console.log('-------------query', query, query.id);

    const res = await ctx.service.message.getMessageListByChatId(query.id);

    console.log('--------------------getMessageListByChatId res', res);
    ctx.body = {
      code: '0',
      data: res,
    };
  }
}

module.exports = MessageController;
