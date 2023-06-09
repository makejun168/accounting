'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
    async add() {
        const { ctx, app } = this;
        const { name, type } = ctx.request.body;

        if (!name || !type) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
            return
        }

        try {
            let user_id
            const token = ctx.request.header.authorization;
            // 拿到 token 获取用户信息
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
            // user_id 默认添加到每个账单项，作为后续获取指定用户账单的标示。
            // 可以理解为，我登录 A 账户，那么所做的操作都得加上 A 账户的 id，后续获取的时候，就过滤出 A 账户 id 的账单信息。
            const result = await ctx.service.type.add({
                name,
                type,
                user_id: 0,
            });
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async list() {
        const { ctx, app } = this;

        try {
            let user_id
            const token = ctx.request.header.authorization;
            // 拿到 token 获取用户信息
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id;

            const result = await ctx.service.type.list();
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: result
            }
        } catch (error) {
            console.log('error', error)
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
}

module.exports = TypeController;
