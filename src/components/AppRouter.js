import { observer } from "mobx-react-lite";
import React, { useContext} from "react";
import {Route, Routes } from "react-router-dom";
import { Context } from "../index";

import {authRoutes, publicRoutes} from "../router/routes";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
   
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
        </Routes>
    )
})

export default AppRouter;