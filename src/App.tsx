import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import Loading from './components/Loading.tsx'
import { paths } from './valopack.config.ts'

const LazyHome: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/Home/components/Home.tsx')
)
const LazyShop: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/Shop/components/Shop.tsx')
)
const LazyTeam: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/Team/components/TeamDisplay.tsx')
)
const LazyPlay: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/Play/components/Play.tsx')
)

export default function App () {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={paths.home} element={<LazyHome />} />
        <Route path={paths.shop} element={<LazyShop />} />
        <Route path={paths.team} element={<LazyTeam />} />
        <Route path={paths.play} element={<LazyPlay />} />
      </Routes>
    </Suspense>
  )
}
