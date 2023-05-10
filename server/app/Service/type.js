'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
    async add(params) {
        const { ctx, app } = this;
        try {
            // 往 bill 表中，插入一条账单数据
            const result = await app.mysql.insert('type', params);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async list() {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.select('type');
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = TypeService;
