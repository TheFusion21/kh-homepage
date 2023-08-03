import React, { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import('@components/home/Home'));
const NotFound = lazy(() => import('@components/NotFound'));
const Imprint = lazy(() => import('@components/Imprint'));
const Calculator = lazy(() => import('@components/calculator/App'));
const Weather = lazy(() => import('@components/weather/App'));

const BrowserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Suspense><Home /></Suspense>} index />
            <Route path="/*" element={<Suspense><NotFound /></Suspense>} />
            <Route path="/imprint" element={<Suspense><Imprint /></Suspense>} />
            <Route path="/weather" element={<Suspense><Weather /></Suspense>} />
            <Route path="/calculator" element={<Suspense><Calculator /></Suspense>} />
        </>
    ),
    { basename: '/' },
)

const App: React.FC = () => (
    <RouterProvider router={BrowserRouter} />
)

export default App;