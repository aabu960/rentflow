import { arrowRight } from "../assets/icons";
import sheabutter from "../assets/images/shea-butter.webp";

const SpecialOffer = () => {
  return (
    <section className="flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container">
      {/* Image Section */}
      <div className="flex-1">
        <img
          src={sheabutter}
          alt="Shea Butter Offer"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>

      {/* Text Content Section */}
      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-palanquin font-bold">
          <span className="text-coral-red">Exclusive </span>
          Special Offer
        </h2>
        <p className="mt-4 info-text">
          Discover unbeatable deals on Ghanaian agricultural products like shea butter, maize, and cashew nuts, as well as affordable machinery rentals.
        </p>
        <p className="mt-6 info-text">
          Elevate your farming operations with our premium-quality commodities and top-notch agricultural machinery, all at exceptional prices tailored to your needs.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <button className="btn-primary flex items-center gap-2">
            Shop now
            <img src={arrowRight} alt="arrow icon" />
          </button>
          <button className="btn-secondary flex items-center gap-2">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
