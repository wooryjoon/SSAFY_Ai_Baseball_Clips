import Header from '@/components/Header';
import './MyPage.scss';
import ProfileMyPage from './ProfileMyPage';
import BookMarkList from './BookMarkList';
import { memo } from 'react';
function MyPage() {
    // 회원 정보 호출
    //
    return (
        <>
            <Header />
            {/* Profile Container */}
            <ProfileMyPage />
            {/* BookmarkList */}
            <BookMarkList />
        </>
    );
}
export default memo(MyPage);
