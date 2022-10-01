'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.home.index);
  router.get('/user/list', controller.home.list);
  router.get('/user/findById/:id', controller.home.list);
  router.post('/user/create', controller.home.create);
  router.get('/user/findById2', controller.home.findById);

  // user
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.post('/user/loginOrRegister', controller.user.loginOrRegister);

  // message
  router.get('/message/getMessageListByChatId', controller.message.getMessageListByChatId);

  // chat + group
  router.get('/chat/getUserListByChatId', controller.chat.getUserListByChatId);
  router.get('/chat/getChatListByUserId', controller.chat.getChatListByUserId);


  io.of('/').route('message', io.controller.chat.message);
  io.of('/').route('join', io.controller.chat.join);
  // app.io.of('/')
  io.route('chat', app.io.controller.chat.index);
  // app.io.of('/chat')
  io.of('/chat').route('chat', app.io.controller.chat.index);

};
