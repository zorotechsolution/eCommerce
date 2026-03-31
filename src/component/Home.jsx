import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { GrPrevious, GrNext } from "react-icons/gr";

function Home() {
  const homeCarouselImages = [
    {
      id: 1,
      imgLink:
        "https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg",
      alt: "home Image1",
    },
    {
      id: 2,
      imgLink:
        "https://images.pexels.com/photos/4174743/pexels-photo-4174743.jpeg",
      alt: "home Image2",
    },
    {
      id: 3,
      imgLink:
        "https://images.pexels.com/photos/6978215/pexels-photo-6978215.jpeg",
      alt: "home Image3",
    },
  ];

  return (
    <>
      {/* Hero Section*/}
      <div className="w-full h-[70vh]">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full"
              >
                <GrPrevious />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full"
              >
                <GrNext />
              </button>
            )
          }
        >
          {homeCarouselImages.map((item) => (
            <div key={item.id} className="h-[70vh]">
              <img
                src={item.imgLink}
                alt={item.alt}
                className="w-full h-full object-cover block"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Content Section */}
      <div className="w-full min-h-[300px] md:min-h-[200px] bg-[#0c6768] px-6 flex flex-col items-center justify-center gap-4 md:gap-3">
        <h3 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center leading-snug">
          Buy Ayurvedic Medicine Online from India's Largest Ayurvedic Shopping
          Store
        </h3>
        <p className="text-white text-center leading-snug">
          Ayurkart, the online ayurvedic store sells all kinds of ayurvedic
          medicine and ayurvedic products online from India's top most ayurvedic
          brands like Kottakkal Arya Vaidya Sala, Vaidyaratnam, AVP, Kerala
          Ayurveda, Himalaya, Dabur, Zandu Ayurveda & Alarsin etc.,
        </p>
        <p className="text-white text-center leading-snug">
          Our aims to bring the world of authentic ayurvedic herbs and ayurvedic
          medicines to your doorstep within the shortest delivery time possible.
        </p>
      </div>
    </>
  );
}

export default Home;
