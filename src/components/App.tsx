import React, { lazy, Suspense } from "react";
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import('@components/home/Home'));
const NotFound = lazy(() => import('@components/NotFound'));
const Imprint = lazy(() => import('@components/Imprint'));
const CookiePolicy = lazy(() => import('@components/CookiePolicy'));

const BrowserRouter = createHashRouter(
    createRoutesFromElements(
        <>
            <Route element={<Suspense fallback={<div />}><Home /></Suspense>} index />
            <Route path="*" element={<Suspense fallback={<div />}><NotFound /></Suspense>} />
            <Route path="/Imprint" element={<Suspense fallback={<div />}><Imprint /></Suspense>} />
            <Route path="/CookiePolicy" element={<Suspense fallback={<div />}><CookiePolicy /></Suspense>} />
        </>
    ),
    { basename: '/' },
)

const App: React.FC = () => (
    <RouterProvider router={BrowserRouter} />
)

export default App;