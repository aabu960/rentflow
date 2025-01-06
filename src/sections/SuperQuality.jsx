import { Button } from "../components";
import cashewnut from "../assets/images/cashewnut.png"
import arrow from "../assets/icons/arrow-right.svg"
const SuperQuality = () => {
  return (
    <section
      id="/About"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
          Delivering Excellence in
          <span className="text-coral-red"> Ghanaian Commodities </span> and 
          <span className="text-coral-red"> Agricultural Machinery </span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          At AACO Nassara, we are committed to providing top-quality Ghanaian 
          local commodities and modern agricultural machinery to empower farmers 
          and enhance productivity in agriculture.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          From premium shea butter and groundnuts to cutting-edge farming 
          equipment, we bring you reliable products tailored to meet your 
          agricultural and commodity needs.
        </p>
        <div className="mt-11">
          <Button iconURL={arrow} label="Learn More About Us" />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src={cashewnut}
          alt="Local Commodities and Agric Machinery"
          width={570}
          height={522}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default SuperQuality;
