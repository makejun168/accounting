import React, { useState } from 'react'
import { Cell, Input, Button, Checkbox, Toast  } from 'zarm'
import cx from 'classnames'
import CustomIcon from '@/components/CustomIcon'
import { post } from '@/utils'

import s from '../../style/style.module.less'

const Login = () => {
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [type, setType] = useState('login'); // 登录注册类型


    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号')
            return
        }
        if (!password) {
            Toast.show('请输入密码')
            return
        }
        try {
            // 判断是否是登录状态
            if (type === 'login') {
                // 执行登录接口，获取 token
                const { data } = await post('/api/user/login', {
                    username,
                    password
                });
                // 将 token 写入 localStorage
                localStorage.setItem('token', data.token);
                Toast.show("登录成功");
                location.href = '/'
            } else {
                const { data } = await post('/api/user/register', {
                    username,
                    password
                });
                Toast.show("注册成功");
                // 注册成功，自动将 tab 切换到 login 状态
                setType('login');
            }
        } catch (error) {
            Toast.show(error.msg);
        }
    };

    return <div className={s.auth}>
        <div className={s.head} />
        <div className={s.tab}>
            <span className={cx({ [s.active]: type == 'login' })} onClick={() => setType('login')}>登录</span>
            <span className={cx({ [s.active]: type == 'register' })} onClick={() => setType('register')}>注册</span>
        </div>
        <div className={s.form}>
            <Cell icon={<CustomIcon type="zhanghao" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={(value) => setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type="mima" />}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
        </div>
        <div className={s.operation}>
            {
                type === 'register' ? <div className={s.agree}>
                    <Checkbox />
                    <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
                </div> : null
            }
            <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
        </div>
    </div>
}

export default Login
