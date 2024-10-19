import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import { paths } from './constants/general'
import useSettings from './hooks/useSettings'
import Loading from './components/Loading/Loading'

const LazyHome = React.lazy(() => import('./components/Home/Home'))
const LazyShop = React.lazy(() => import('./components/Shop/Shop'))
const LazyTeam = React.lazy(() => import('./components/Team/Team'))
const LazyPlay = React.lazy(() => import('./components/Play/Play'))

export default function App () {
  const { headerVisible } = useSettings()

  // 3 Las habilidades tienen que poder ser usadas por la IA también [PERSONALIZAR TEAM EN FUNCIONES USANDO TURN]

  return (
    <Suspense fallback={<Loading />}>
      {headerVisible && <Header />}
      <Routes>
        <Route path={paths.home} element={<LazyHome />} />
        <Route path={paths.shop} element={<LazyShop />} />
        <Route path={paths.team} element={<LazyTeam />} />
        <Route path={paths.play} element={<LazyPlay />} />
      </Routes>
    </Suspense>
  )
}
