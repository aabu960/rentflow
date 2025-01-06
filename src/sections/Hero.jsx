import { useState } from "react";

import { shoes, statistics } from "../constants";
import { Button, ShoeCard } from "../components";
import cashewnut from "../assets/images/cashewnut.png"
import { arrowRight } from "../assets/icons";

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(cashewnut);

  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-between items-center min-h-screen gap-10 max-container"
    >
      {/* Text Content Section */}
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-palanquin text-8xl text-coral-red">
          {/* Welcome to AACO Nasara */}
        </p>

        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
  <span className="xl:bg-white xl:whitespace-nowrap relative z-10 max-sm:z-0 pr-10">
    Trusted Agricultural
  </span>
  <br />
  <span className="text-coral-red inline-block mt-3">Commodities</span>
  &Machineries
</h1>

        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
        Delivering premium-quality Ghanaian maize, shea butter, cashew nuts, 
          and modern agricultural machinery. Empowering local farming and connecting 
          global markets with unmatched reliability and efficiency.      </p>

        <Button label="Buy Now" iconURL={arrowRight} />

        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Image and Thumbnail Section */}
      <div className="relative flex flex-col items-center xl:w-3/5 w-full">
        {/* Main Image */}
        <img
          src={bigShoeImg}
          alt="Shoe Collection"
          width={610}
          height={502}
          className="object-contain"
        />

        {/* Thumbnail Section */}
        <div className="flex gap-4 sm:gap-6 mt-6">
          {shoes.map((image, index) => (
            <ShoeCard
              key={index}
              index={index}
              imgURL={image}
              changeBigShoeImage={setBigShoeImg}
              bigShoeImg={bigShoeImg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
