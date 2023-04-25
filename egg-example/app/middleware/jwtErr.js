'use strict';

module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const token = ctx.request.header.authorization; // 如果没有 token，返回是 null 字符串
        let decode

        if (token != 'null' && token) {
            try {
                decode = ctx.app.jwt.verify(token, secret); // 验证 Token
                await next();
            } catch (error) {
                console.log(error)
                ctx.status = 200;
                ct.body = {
                    msg: 'token已经过期,请重新登录',
                    code: 401,
                }
                return;
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 401,
                msg: 'token不存在'
            };
            return;
        }
    }
}
