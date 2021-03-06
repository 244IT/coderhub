const errorType = require('../constants/error-types')

const errorHandle = (error, ctx) => {
  console.log('进入错误分类处理')
  let status, message
  switch(error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或者密码为空~';
      break;
    case errorType.USER_ALREADT_EXIST:
      status = 409;
      message = '用户已经存在~';
      break;
    case errorType.USER_DOSE_NOT_EXIST:
      status = 400;
      message = '用户名不存在~';
      break;
    case errorType.PASSWORD_ERROR:
      status = 400;
      message = '密码错误~';
      break;
    case errorType.PASSWORD_UNLIKE:
      status = 400;
      message = '原密码错误~';
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = '未授权token~';
      break;
    case errorType.UNPERMISSION:
      status = 401;
      message = '没有操作的权限~';
      break;
    case errorType.COLLECTIONEXIST:
      status = 409;
      message = '收藏夹已存在~';
      break;
    default: 
      status = 404;
      message = 'NOT FOUNT';
  }
  ctx.status = status
  ctx.body = {
    message,
    status
  }
}

module.exports = errorHandle

