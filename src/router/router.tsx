import { Route, Routes } from "react-router";
import ROUTES from "@/data/routes";

import Home from "@/pages/Home";

export const Router = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
);