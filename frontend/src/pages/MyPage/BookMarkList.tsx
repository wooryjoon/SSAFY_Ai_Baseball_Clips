import { requestFavoriteVideoList } from '@/api/requestMyPage';
import MyContent from './MyContent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import baseballImg from '@/assets/ball.png';
import { FavoriteVideo } from '@/api/type';
import { requestFavorite } from '@/api/requestFavorite';
import { memo } from 'react';

type Props = {};

function BookMarkList({}: Props) {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryFn: requestFavoriteVideoList,
        queryKey: ['FavoriteVideoList'],
    });
    const { mutate: deleteFavoriteVideo } = useMutation({
        mutationFn: (batId: number) => requestFavorite({ batId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['FavoriteVideoList'] });
        },
    });
    const onClickMyContentHandler = (batId: number) => {
        deleteFavoriteVideo(batId);
    };
    if (isLoading) return <Loading />;
    if (data?.data) {
        return (
            <div className="bookmarkList">
                <div className="bookmark-title">
                    내가 찜한 영상
                    <img className="baseball" src={baseballImg} alt="" />
                </div>
                <ul>
                    {data.data.map((favoriteVideo: FavoriteVideo, i) => {
                        if (favoriteVideo.favorite)
                            return (
                                <MyContent
                                    key={i}
                                    favoriteVideo={favoriteVideo}
                                    onClick={onClickMyContentHandler}
                                />
                            );
                    })}
                </ul>
            </div>
        );
    }
}
export default memo(BookMarkList);
