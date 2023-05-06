
const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        // 判空操作
        if (!username || !password) {
            ctx.body = {
                code: 500,
                msg: '账号密码不能为空',
                data: null
            }
            return
        }

        // 验证数据库内是否已经有该账户名
        const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息

        // 判断是否已经存在
        if (userInfo && userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '账户名已被注册，请重新输入',
                data: null
            }
            return
        }

        // 默认头像，放在 user.js 的最外，部避免重复声明。
        const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
        // 调用 service 方法，将数据存入数据库。
        const result = await ctx.service.user.register({
            username,
            password,
            signature: '世界和平。',
            avatar: defaultAvatar,
            ctime: new Date().getTime()
        });

        if (result) {
            ctx.body = {
                code: 200,
                msg: '注册成功',
                data: null
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败',
                data: null
            }
        }
    }

    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;

        // 根据用户名，在数据库中查找相对应的 id 操作
        const userInfo = await ctx.service.user.getUserByName(username);

        // 没有找到当前用户
        if(!userInfo || !userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '账号不存在',
                data: null
            }
            return
        }

        if(userInfo && password !== userInfo.password) {
            ctx.body = {
                code: 500,
                msg: '账号密码错误',
                data: null
            }
            return
        }

        // 生成 token
        // app.jwt.sign 方法
        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        }, app.config.jwt.secret);

        ctx.body = {
            code: 200,
            message: '登录成功',
            data: {
                token
            }
        }
    }

    async test() {
        const { ctx, app } = this;

        const token = ctx.request.header.authorization; // 请求头获取 authorization 属性值为 token

        const decode = await app.jwt.verify(token, app.config.jwt.secret);

        ctx.body = {
            code: 200,
            message: '获取成功',
            data: {
                ...decode
            }
        }

    }

    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;

        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        const userInfo = await ctx.service.user.getUserByName(decode.username)

        ctx.body = {
            code: 200,
            msg: '请求成功',
            data: {
                id: userInfo.id,
                username: userInfo.username,
                signature: userInfo.signature || '',
                avatar: userInfo.avatar || '',
            }
        }
    }

    async editUserInfo() {
        const { ctx, app } = this;

        const { signature = '' } = ctx.request.body;

        try {
            let user_id
            const token = ctx.request.header.authorization;

            const decode = await app.jwt.verify(token, app.config.jwt.secret);

            if (!decode) return;

            user_id = decode.id;

            // 通过 username 查找 userInfo 信息
            const userInfo = await ctx.service.user.getUserByName(decode.username);

            const result = await ctx.service.user.editUserInfo({
                ...userInfo,
                signature
            })

            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: {
                    id: user_id,
                    signature,
                    username: userInfo.username
                }
            }

        } catch (error) {

        }
    }
}

module.exports = UserController;
