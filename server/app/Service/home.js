const Service = require('egg').Service;

class HomeService extends Service {
    // async user() {
    //     return {
    //         name: '马可骏',
    //         slogen: '鸡你太美'
    //     }
    // }

    async user() {
        const { ctx, app } = this;
        const QUERY_STR = 'id, name';
        let sql = `select ${QUERY_STR} from list`; // 获取 id 的 sql 语句
        try {
            const result = await app.mysql.query(sql); // mysql 实例已经挂载到 app 对象底下
            return result;
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async addUser(name) {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.insert('list', {name}); // 给 list 表 新增一条数据
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async editUser({id, name}) {
        const { ctx, app } = this;
        try {
            let result = await app.mysql.update('list', { name }, {
                where: { id }
            });
            return result
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async deleteUser(id) {
        const { ctx, app } = this;
        try {
            let result = await app.mysql.delete('list', { id });
            return result;
        } catch (err) {
            console.log('err', err);
            return null;
        }
    }
}

module.exports = HomeService;


