'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {

  async getUserListByChatId() {
    const { ctx } = this;
    const { query } = ctx;
    console.log('--------------------getUserListByChatId', query);

    const res = await ctx.service.chat.selectUserListByChatId(query.id);
    console.log('--------------------getUserListByChatId res', res);
    ctx.body = {
      code: '0',
      data: res,
    };
  }

  async getChatListByUserId() {
    const { ctx } = this;
    const { query } = ctx;
    console.log('--------------------getChatListByUserId', query);

    const res = await ctx.service.chat.selectChatListByUserId(query.id);
    console.log('--------------------getChatListByUserId res', res);
    ctx.body = {
      code: '0',
      data: res,
    };
  }
}

module.exports = ChatController;
