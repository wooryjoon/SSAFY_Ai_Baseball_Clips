package com.private_lbs.taskmaster.hitter.data.dto;

import com.private_lbs.taskmaster.hitter.domain.Hitter;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class HitterInfoWithInningProcessedVideo {

    private String name;
    private String imageUrl;
    private String position;
    List<ProcessedVideoByInning> processedVideoByInnings;

    public HitterInfoWithInningProcessedVideo(Hitter hitter) {
        name = hitter.getName();
        imageUrl = hitter.getImageUrl();
        position = hitter.getPosition();
        processedVideoByInnings = hitter.getBat().stream()
                .map(ProcessedVideoByInning::new)
                .collect(Collectors.toList());
    }

    public HitterInfoWithInningProcessedVideo(Hitter hitter, int inning) {
        name = hitter.getName();
        imageUrl = hitter.getImageUrl();
        position = hitter.getPosition();
        processedVideoByInnings = hitter.getBat().stream()
                .filter(b -> compareRequestedInning(b.getInning(), inning))
                .map(ProcessedVideoByInning::new)
                .collect(Collectors.toList());
    }

    private boolean compareRequestedInning(int inning, int requestInning) {
        return inning == requestInning;
    }

}
