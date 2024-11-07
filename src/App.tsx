import { Header } from './components/Header.tsx'
import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import { useSettings } from './hooks/useSettings.ts'
import Loading from './components/Loading.tsx'
import { paths } from './valopack.config.ts'

const LazyHome = React.lazy(() => import('./pages/Home/components/Home.tsx'))
const LazyShop = React.lazy(() => import('./pages/Shop/components/Shop.tsx'))
const LazyTeam = React.lazy(() => import('./pages/Team/components/Team.tsx'))
const LazyPlay = React.lazy(() => import('./pages/Play/components/Play.tsx'))

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
