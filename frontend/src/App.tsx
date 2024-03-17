import '@/styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import MakingVideo from './pages/VideoMakingPage';
import Login from './pages/Login';
import VideoResultPage from './pages/VideoResultPage';
import PlayerHighLights from './pages/VideoResultPage/PlayerHighlights/PlayerHighLights';
import initMockAPI from './mock';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import PrivateRoute from './route/PrivateRoute';
import VideoResultOverview from './pages/VideoResultPage/VideoResultOverview';
import VideoReport from './pages/VideoResultPage/VideoReport';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingAI from './pages/VideoMakingPage/LoadingAI';

// initMockAPI();

function App() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        {/* <Route path="/" element={<LandingPage />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        {/* 로그인 상태에서만 진입 가능한 페이지는 따로 라우팅 */}
                        <Route element={<PrivateRoute />}>
                            {/* <Route path="/main" element={<Welcome />} /> */}
                            <Route path="/makingvideo" element={<MakingVideo />}></Route>
                            <Route path="/loadingAI" element={<LoadingAI />} />
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/result" element={<VideoResultPage />}>
                                <Route index element={<VideoReport />} />
                                <Route path="players" element={<PlayerHighLights />} />
                                <Route path="innings" element={<VideoResultOverview />} />
                                <Route path="teams" element={null} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </section>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
}

export default App;
