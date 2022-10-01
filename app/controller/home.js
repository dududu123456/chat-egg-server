'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const { ctx } = this;
    // id 是string
    // const { id } = ctx.params;
    const { id } = ctx.query;
    const data = [
      {
        id: '1',
        a: 'aaa',
      },
      {
        id: '2',
        a: 'bbb',
      },
      {
        id: '3',
        a: 'ccc',
      },
    ];
    let newData = data;
    console.log('----------------params', id, ctx, ctx.query);
    if (id) {
      newData = data.filter(i => i.id === id);
      console.log('----------------params', newData);
    }
    ctx.body = {
      code: '0',
      data: newData,
    };
    // 请求响应状态
    // ctx.status = 404;
  }

  async create() {
    const { ctx } = this;
    const { request } = ctx;
    console.log('--------------------ctx', request, request.body);
    ctx.body = {
      code: '0',
      data: request.body,
    };
  }

  async findById() {
    const { ctx } = this;
    const { query } = ctx;
    console.log('--------------------ctx', query);

    const user = await ctx.service.user.findByid(query.id);
    console.log('--------------------user', user);
    ctx.body = {
      code: '0',
      data: user,
    };
  }
}

module.exports = HomeController;
