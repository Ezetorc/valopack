import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { paths } from "./constants/general";
import useSettings from "./hooks/useSettings";

const LazyHome = React.lazy(() => import("./components/Home/Home"));
const LazyShop = React.lazy(() => import("./components/Shop/Shop"));
const LazyTeam = React.lazy(() => import("./components/Team/Team"));
const LazyPlay = React.lazy(() => import("./components/Play/Play"));
const LazyGame = React.lazy(() => import("./components/Game/Game"));

export default function App() {
  const { headerVisible } = useSettings();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {headerVisible && <Header />}
      <Routes>
        <Route path={paths.home} element={<LazyHome />} />
        <Route path={paths.shop} element={<LazyShop />} />
        <Route path={paths.team} element={<LazyTeam />} />
        <Route path={paths.play} element={<LazyPlay />} />
        <Route path={paths.game} element={<LazyGame />} />
      </Routes>
    </Suspense>
  );
}
