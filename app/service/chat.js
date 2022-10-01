'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async selectUserListByChatId(id) {
    if (!id) {
      return { msg: 'params error' };
    }
    // get/select的区别，前者查一个，后者查全部（需条件，否则查得全部列表）
    const groupList = await this.app.mysql.select('group', { where: { chat_id: id } });
    // 数组查询
    const userIdList = groupList.map(i => i.user_id);
    const userList = await this.app.mysql.select('user', { where: { id: userIdList } });
    return userList;
  }

  // 查询groupList
  async selectChatListByUserId(id) {
    if (!id) {
      return { msg: 'params error' };
    }
    // get/select的区别，前者查一个，后者查全部（需条件，否则查得全部列表）
    const groupList = await this.app.mysql.select('group', { where: { user_id: id } });// 数组查询
    const chatIdList = groupList.map(i => i.chat_id);
    const chatList = await this.app.mysql.select('chat', { where: { id: chatIdList } });
    return chatList;
  }
}

module.exports = UserService;
