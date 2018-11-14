import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async function ( ctx, next ) {
  const XToken = ctx.get('X-Token');
  if (XToken === '') {
    console.log('我是空的token，被报错了');    
    // ctx.throw(401, "no token detected in http header 'X-Token'");
    ctx.body = {
      code: 4001,
      message:"请求头里面没有对应的token信息"
    }
  }
  let tokenContent;
  try {
    tokenContent = await jwt.verify(XToken, secret)//如果token过期或验证失败，将抛出错误
    await next()
  }catch(err){
    /*ctx.throw(401, 'invalid token');*/
    console.log('我被报错了');
    if(err){
        ctx.body = {
            code:4001,
            message:'token已过期,请重新登录'
        }
    }
}
  
}
