import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { GrPrevious, GrNext } from "react-icons/gr";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
function Home() {
  let [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  let ayurvedicMedicines = [
    {
      id: 1,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs ${199}.00`,
    },
    {
      id: 2,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs ${199}.00`,
    },
    {
      id: 3,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `R ${199}.00`,
    },
    {
      id: 4,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs ${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
    },
    {
      id: 5,
      img: "https://www.ayurkart.com/cdn/shop/products/radhey-ghee_600x.jpg?v=1715887222",
      productName: "Radhey Ghee",
      productDescription:
        "Shree Radhey Ghee is 100% pure & natural ghee made from Indian Native Gir cow’s milk. The product is free from artificial colours, preservatives, flavours, sweeteners and chemicals.",
      price: `Rs${199}.00`,
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
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug">
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
      {/* Product Section */}
      <div>
        <div className="flex justify-center items-center mt-4 gap-4">
          <hr className="inline-block w-32 h-0.5 bg-black ml-2 mt-5" />
          <h3 className="text-sm md:text-2xl font-semibold leading-loose text-center mt-4">
            Top Selling Ayurvedic Medicines
          </h3>
          <hr className="inline-block w-32 h-0.5 bg-black mr-2 mt-5" />
        </div>
        <div className="text-center font-semibold">
          <p>Explore our best rated Online Ayurvedic Medicines Ayurvedic</p>
        </div>
        <div>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={isMobile ? 100 : 25}
            className="mt-12"
          >
            {ayurvedicMedicines.map((product) => (
              <Card sx={{ maxWidth: 280, margin: "0 10px" }} key={product.id}>
                <CardMedia
                  sx={{ height: 240 }}
                  image={product.img}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.productDescription}
                  </Typography>
                  <Typography variant="body1">{product.price}</Typography>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>
      {/* COntent Section */}
      <div className="mt-12">
        <div className="flex justify-center items-center mt-4 gap-4">
          <hr className="inline-block w-32 h-0.5 bg-black ml-2 mt-5" />
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-snug">
            {" "}
            Ayurvedic Products & Medicines to General Ailments
          </h2>
          <hr className="inline-block w-32 h-0.5 bg-black ml-2 mt-5" />
        </div>
        <div>
          <h4 className="text-center text-xl font-semibold leading-snug mt-2">
            Natural healthcare with Ayurveda
          </h4>
          <p className="text-center leading-loose">
            Ayurveda, an ancient tradition of medicines in India, is focused on
            the idea that 'Prevention is better than cure.' Ayurveda suggests
            alterations in the diet and lifestyle to achieve a healthy balance.
            Ayurveda medicines not only concentrates on healing but also
            emphasizes general wellness. The traditional system of ayurvedic
            medicine introduced several potent herbal combinations that aid in
            maintaining health. Check out these Ayurvedic medicines online for
            general ailments.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
