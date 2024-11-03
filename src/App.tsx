import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import { useSettings } from './hooks/useSettings'
import Loading from './components/Loading'
import { paths } from './valopack.config'

const LazyHome = React.lazy(() => import('./pages/Home/components/Home'))
const LazyShop = React.lazy(() => import('./pages/Shop/components/Shop'))
const LazyTeam = React.lazy(() => import('./pages/Team/components/Team'))
const LazyPlay = React.lazy(() => import('./pages/Play/components/Play'))

export default function App () {
  const { headerVisible } = useSettings()

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
