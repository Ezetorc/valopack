import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loading from './components/Loading.tsx'
import { paths } from './valopack.config.ts'

const LazyHome = lazy(() => import('./pages/Home/components/Home.tsx'))
const LazyShop = lazy(() => import('./pages/Shop/components/Shop.tsx'))
const LazyPlay = lazy(() => import('./pages/Play/components/Play.tsx'))
const LazyTeam = lazy(() => import('./pages/Team/components/TeamDisplay.tsx'))

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
