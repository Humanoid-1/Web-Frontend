// src/components/SliderComponent.jsx
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";

const SliderComponent = () => {
      const sliderRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slides = [
        { id: 1, image: "/asus slider.jpg" },
        { id: 2, image: "/hp-banner.jpg" },
        { id: 3, image: "/dell-banner.jpg" },
        { id: 4, image: "/acer slider.jpg" },
        { id: 5, image: "/lenovo-banner.jpg" },
        { id: 6, image: "/apple-banner.jpg" }
    ];
    // Add keyboard action
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!sliderRef.current) return;
            if (e.key === "ArrowRight") {
                sliderRef.current.slickNext();
            }
            if (e.key === "ArrowLeft") {
                sliderRef.current.slickPrev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    
    return (
        <div className="slider-container">
            <style>{`
                .slider-container {
                    width: 100%;
                    max-width: 100%;
                    overflow: hidden;
                    margin-bottom: 2rem; /* Space between slider and content */
                }

                .slide-item {
                    position: relative;
                    width: 100%;
                    height: 500px;
                    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
                }

                .slick-active .slide-item {
                    opacity: 1;
                    transform: scale(1);
                }

                .slide-image {
                    width: 100%;
                    height: 100%;
                    display: block;
                      
                }

                .slide-overlay {
                    position: absolute;
                }

                .slick-dots {
                    bottom: 20px;
                    padding: 10px;
                }

                .slick-dots li button:before {
                    font-size: 18px;
                    color: gray;
                    opacity: 1;
                }

                .slick-dots li.slick-active button:before {
                    color: #0850afff; /* Active dot color */
                }

                @media (max-width: 768px) {
                    .slide-item {
                        height: 190px; /* Adjust height for smaller screens */
                    }
                    .slick-dots {
                        display: none !important; /* Hide dots on smaller screens */
                    }
                }
            `}</style>

             <Slider ref={sliderRef} {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div className="slide-item">
                            <img
                                src={slide.image}
                                alt={`Slide ${slide.id}`}
                                className="slide-image"
                            />
                            <div className="slide-overlay"></div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
