/* const login = async ctx=>{

}
export default {
    login
} */

// 这是我们以前的写法，通常我们都会把处理过程写成函数，直接暴露函数即可
// 以后我们写这谢方法的时候，直接使用Es6 class类
import User from '../model/UserModel'
import md5 from 'md5'
import creatToken from '../utils/createToken'
let regUser = /^[\w]{4,16}$/;
let regPassword = /^[\w]{6,16}$/;
class UserController {
    // 注册逻辑
    async regist(ctx) {
        // 检查用户名和密码格式是否正确
        let user = ctx.request.body.user;
        let password = ctx.request.body.password;
        if(regUser.test(user)&&regPassword.test(password)){
            console.log('格式正确');
            // 格式正确的话，则查询数据库里面是否存在改用户
            const res = await User.getUserByName(user);
            console.log(res); 
            if(res){
                ctx.body = {
                    success: false,
                    msg: '账户已存在'
                }
            }else{
                
            }
        }else{
            console.log('格式不正确');
        }
        console.log(ctx.request.body)
    }
    // 登录的处理逻辑在这里
    async login(ctx) {
        // 验证用户名密码是否合法

        // 验证省略
        // console.log(ctx.request.body.user);
        
        
        // 检查用户名是否存在
        let user = ctx.request.body.user;
        let password = ctx.request.body.password;
        // 所有的数据库操作，我们不在控制器里面完成，我们直接在数据库里进封装一个方法
        // 检查用户名密码是否正确
        const res = (await User.getUserByName(user))[0];
        // console.log(res);
        // console.log(md5(password));
        
        if(res){
            // 如果存在，检查密码是否正确
            if(res.password === md5(password)) {
                // 生成token
                let token = creatToken(res.user);
                ctx.body = {
                    success:true,
                    message:'登陆成功...',
                    token:token
                }
                // 最后返回token
            }else{
                ctx.body = {
                    success: false,
                    message:'密码错误请从新填写'
                }
            }
        }else{
            ctx.body = {
                success: false,
                message: '用户名不存在，请从新填写....',
            }
        }
    }
    async logout (ctx) {
        // console.log(ctx.request.body);
        ctx.body = {
            success:true,
            message:'退出成功'
        }
    }
}
export default new UserController()