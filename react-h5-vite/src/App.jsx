// App.jsx
import React, { useState, useEffect } from 'react'
import { ConfigProvider } from 'zarm'
import data from '@/router'
import NavBar from '@/components/NavBar';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
// import 'zarm/dist/zarm.css'

import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom"


function App() {
    // const location = useLocation() // 拿到 location 实例
    const { pathname } = window.location // 获取当前路径
    const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
    const [showNav, setShowNav] = useState(false) // 是否展示 Nav

    useEffect(() => {
        setShowNav(needNav.includes(pathname));
    }, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=

    return (
        <BrowserRouter>
            <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
                <Routes>
                    {data.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
                </Routes>
            </ConfigProvider>
            <NavBar showNav={showNav} />
        </BrowserRouter>
    )
}

export default App
