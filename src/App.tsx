import { Route, Routes } from 'react-router-dom'
import React, { Suspense, useEffect } from 'react'
import Loading from './components/Loading.tsx'
import { paths } from './valopack.config.ts'
import { useAbility } from './pages/Play/hooks/useAbility.ts'

const LazyHome = React.lazy(() => import('./pages/Home/components/Home.tsx'))
const LazyShop = React.lazy(() => import('./pages/Shop/components/Shop.tsx'))
const LazyPlay = React.lazy(() => import('./pages/Play/components/Play.tsx'))
const LazyTeam = React.lazy(
  () => import('./pages/Team/components/TeamDisplay.tsx')
)

export default function App () {
  const { pendingActions } = useAbility()

  useEffect(() => {
    console.log('pendingActions ', pendingActions)
  }, [pendingActions])

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
