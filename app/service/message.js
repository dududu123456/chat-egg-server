'use strict';

const Service = require('egg').Service;

class MessageService extends Service {
  async getMessageListByChatId(id) {
    const groupList = await this.app.mysql.select('message', { where: { chat_id: id } });
    return groupList;
  }
}

module.exports = MessageService;
