import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async function ( ctx, next ) {
  const XToken = ctx.get('X-Token');
  // console.log('我看看能出来不');
  
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
    // console.log('我是正确的');
    
    tokenContent = await jwt.verify(XToken, secret)//如果token过期或验证失败，将抛出错误
    await next()
    // console.log('我是正确的2');
  }catch(err){
    /*ctx.throw(401, 'invalid token');*/
    // console.log('我被报错了');
    if(err.message == 'jwt expired'){
      ctx.body = {
        code:4001,
        message:'token已过期,请重新登录'
      }
    }else{
      ctx.throw(500) //直接抛出500的错误，在所有加入checktoken的代码里面
    }
}
  
}
