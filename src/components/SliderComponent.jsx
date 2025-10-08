// src/components/SliderComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const SliderComponent = () => {
    const [slides, setSlides] = useState([]);
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // ✅ API call using fetch
    useEffect(() => {
        const fetchSlides = async () => {
            // try {
                const res = await fetch("http://localhost:5000/api/slider");
                const data = await res.json();
                setSlides(data);
                console.log("Fetched slides:", data);
            // } catch (err) {
            //     console.error("Error fetching slides:", err);
            // }
        };
        fetchSlides();
    }, []);

    // ✅ Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") {
                sliderRef.current?.slickNext();
            } else if (e.key === "ArrowLeft") {
                sliderRef.current?.slickPrev();
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
                    margin-bottom: 2rem;
                }

                .slide-item {
                    position: relative;
                    width: 100%;
                    height: 520px;
                    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
                }

                .slide-image {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                }

                .slick-dots {
                    bottom: 20px;
                    padding: 10px;
                }

                .slick-dots li button:before {
                    font-size: 18px;
                    color: #d1c6c6ff;
                    opacity: 1;
                }

                .slick-dots li.slick-active button:before {
                    color: #0850afff;
                }

              /* Tablet screens (up to 1024px) */
@media (max-width: 1024px) {
  .slide-item {
    height: 600px;
  }
}

/* Mobile screens (up to 768px) */
@media (max-width: 768px) {
  .slide-item {
    height: 190px;
  }
  .slick-dots {
    display: none !important;
  }
}

/* Small mobile screens (up to 480px) */
@media (max-width: 480px) {
  .slide-item {
    height: 160px;
  }
}

                }
            `}</style>

<Slider ref={sliderRef} {...settings}>
  {(slides.length > 0 ? slides : [
    {
      imageUrl: "/newBanner.png",
      title: "Default Banner",
      link: "#"
    }
  ]).map((slide, index) => (
    <div key={index}>
      <div className="slide-item">
        <a href={slide.link} target="_blank" rel="noopener noreferrer">
          <img
            src={slide.imageUrl}
            alt={slide.title || `Slide ${index}`}
            className="slide-image"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  ))}
</Slider>


        </div>
    );
};

export default SliderComponent;