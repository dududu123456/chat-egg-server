'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findByid(id) {
    const user = await this.app.mysql.get('user', { id });
    return { user };
  }

  async say() {
    return 'Hello Man!';
  }

  // 新增用户
  async addUser({ email, name, password }) {
    if (!email || !name || !password) {
      return { msg: 'params error' };
    }
    const nameUser = await this.app.mysql.get('user', { name });
    if (nameUser) {
      return {
        msg: 'name repeat',
      };
    }
    const emailUser = await this.app.mysql.get('user', { email });
    if (emailUser) {
      return {
        msg: 'email repeat',
      };
    }

    const date = new Date();
    await this.app.mysql.insert('user', {
      email,
      name,
      password,
      create_time: date,
      update_time: date,
    });

    const user = await this.app.mysql.get('user', { email, name, password });
    return user;
  }

  // 密码查找用户
  async findByPassword({ email, name, password }) {
    let params = {};
    if (!(email && name) || !password) {
      return { msg: 'params error' };
    }
    if (email) {
      params = { email, password };
    } else {
      params = { name, password };
    }
    const user = await this.app.mysql.get('user', params);
    return user;
  }
}

module.exports = UserService;
