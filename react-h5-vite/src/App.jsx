// App.jsx
import React, { useState } from 'react'
import { ConfigProvider } from 'zarm'
import routers from '@/router'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
// import 'zarm/dist/zarm.css'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"



function App() {
    return (
            <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
                <Router>
                    <Routes>
                        {routers.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
                    </Routes>
                </Router>
            </ConfigProvider>
        )
}

export default App
