package com.private_lbs.taskmaster.favorite.service;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.bat.domain.repository.BatRepository;
import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.FavoriteProcessedVideo;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteRepository;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final MemberService memberService;
    private final FavoriteRepository favoriteRepository;
    private final BatRepository batRepository;


    @Transactional
    public void updateFavoriteStatus(FavoriteRequest favoriteRequest) {

        Member member = memberService.getCurrentMember();

        Bat bat = batRepository.findById(favoriteRequest.getBatId())
                .orElseThrow();

        favoriteRepository
                .findLikeByMemberAndBat(member, bat)
                .ifPresentOrElse(Favorite::changeFavoriteStatus,
                        () -> {
                            Favorite favorite = new Favorite(member, bat);
                            favorite.changeFavoriteStatus();
                            favoriteRepository.save(favorite);
                        });
    }

    public List<FavoriteProcessedVideo> getLikeList() {
        Member member = memberService.getCurrentMember();
        return favoriteRepository.getFavoriteProcessedVideo(member.getId()).stream()
                .map(FavoriteProcessedVideo::new)
                .toList();
    }
}
