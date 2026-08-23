package com.absfitness.service;

import com.absfitness.dto.GoogleReviewDto;
import com.absfitness.model.Review;
import com.absfitness.repository.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GoogleReviewService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleReviewService.class);

    @Value("${google.places.api.key}")
    private String googlePlacesApiKey;

    @Value("${google.place.id}")
    private String googlePlaceId;

    private final ReviewRepository reviewRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GoogleReviewService(ReviewRepository reviewRepository, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.reviewRepository = reviewRepository;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<GoogleReviewDto> getAllGoogleReviews() {
        return reviewRepository.findAllByOrderByTimeDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void fetchAndCacheGoogleReviews() {
        String url = String.format("https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&fields=reviews&key=%s",
                googlePlaceId, googlePlacesApiKey);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode reviewsNode = root.path("result").path("reviews");

            if (reviewsNode.isArray()) {
                List<Review> newReviews = new ArrayList<>();
                for (JsonNode reviewNode : reviewsNode) {
                    String authorName = reviewNode.path("author_name").asText();
                    String text = reviewNode.path("text").asText();

                    Optional<Review> existingReview = reviewRepository.findByAuthorNameAndText(authorName, text);

                    if (existingReview.isEmpty()) {
                        Review review = new Review();
                        review.setAuthorName(authorName);
                        review.setRating(reviewNode.path("rating").asInt());
                        review.setText(text);
                        review.setTime(reviewNode.path("time").asLong());
                        review.setProfilePhotoUrl(reviewNode.path("profile_photo_url").asText());
                        review.setRelativeTimeDescription(reviewNode.path("relative_time_description").asText());
                        newReviews.add(review);
                    }
                }
                if (!newReviews.isEmpty()) {
                    reviewRepository.saveAll(newReviews);
                    logger.info("Fetched and cached {} new Google reviews.", newReviews.size());
                } else {
                    logger.info("No new Google reviews to cache.");
                }
            }
        } catch (Exception e) {
            logger.error("Error fetching or caching Google reviews: {}", e.getMessage(), e);
        }
    }

    private GoogleReviewDto convertToDto(Review review) {
        return GoogleReviewDto.builder()
                .authorName(review.getAuthorName())
                .rating(review.getRating())
                .text(review.getText())
                .relativeTimeDescription(review.getRelativeTimeDescription())
                .profilePhotoUrl(review.getProfilePhotoUrl())
                .build();
    }
}