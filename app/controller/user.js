'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { request } = ctx;
    const { email, name, password } = request.body;
    console.log('--------------------login', request, request.body);

    const res = await ctx.service.user.addUser({ email, name, password });
    // egg-mysql返回值对象是RowDataPacket
    console.log('--------------------res', res, res?.id);
    if (res?.id) {
      ctx.body = {
        code: '0',
        data: res,
      };
    } else {
      ctx.body = {
        code: '1',
        data: res,
      };
    }
  }

  async login() {
    const { ctx } = this;
    const { request } = ctx;
    // post 请求通过 request.body获取参数，get请求通过query获取参数，params获取路径中的参数
    const { email, name, password } = request.body;
    console.log('--------------------login', request, request.body);
    const res = await ctx.service.user.findByPassword({
      email,
      name,
      password,
    });
    console.log('--------------------res', res, res?.id);
    ctx.body = {
      code: res?.id ? '0' : '1',
      data: res,
    };
  }

  async loginOrRegister() {
    const { ctx } = this;
    const { request } = ctx;
    const { email, password } = request.body;
    const name = email && email.split('@')[0];
    console.log('--------------------loginOrRegister', request, request.body);
    // 登录
    const res = await ctx.service.user.findByPassword({
      email,
      name,
      password,
    });
    console.log('--------------------login res', res, res?.id);
    if (res?.id) {
      console.log('--------------------login res', res, res?.id);
      ctx.body = {
        code: res?.id ? '0' : '1',
        data: res,
      };
    } else {
      // 注册
      const res = await ctx.service.user.addUser({ email, name, password });
      console.log('--------------------register res', res, res?.id);
      if (res?.id) {
        ctx.body = {
          code: '0',
          data: res,
        };
      } else {
        ctx.body = {
          code: '1',
          data: res,
        };
      }
    }
  }
}

module.exports = UserController;
