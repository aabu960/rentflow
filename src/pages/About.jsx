import { Button } from "../components";
import aboutImage from "../assets/images/CocoaPowder.webp";

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col gap-14 max-container py-16 bg-light-gray"
    >
      {/* About Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-coral-red">About Us</h1>
        <p className="mt-6 text-lg text-slate-gray leading-relaxed max-w-3xl mx-auto">
          AACO Nasara is committed to empowering Ghana's agricultural community
          by delivering top-quality commodities, innovative solutions, and
          comprehensive support that uplifts farmers and strengthens
          agricultural systems.
        </p>
      </div>

      {/* About Content */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* About Image */}
        <div className="flex-1">
          <img
            src={aboutImage}
            alt="About AACO Nasara"
            width={773}
            height={687}
            className="object-contain w-full rounded-md shadow-md"
          />
        </div>

        {/* About Details */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-dark-teal mb-6">Who We Are</h2>
          <p className="text-slate-gray leading-7 mb-6">
            AACO Nasara is a trusted name in the agricultural sector, known for
            providing exceptional products and services to farmers across
            Ghana. We specialize in offering premium agricultural commodities
            such as maize, shea butter, cashew nuts, and soybeans, as well as
            high-quality farming equipment and machinery for rentals.
          </p>
          <p className="text-slate-gray leading-7">
            We also go the extra mile by supporting farmers with financial
            solutions, ensuring they have the resources to grow their
            businesses and achieve success in a competitive global market.
          </p>
        </div>
      </div>

      {/* Mission, Vision, and Projects */}
      <div className="flex flex-col gap-12">
        {/* Mission Section */}
        <div>
          <h2 className="text-4xl font-bold text-coral-red mb-4">Our Mission</h2>
          <p className="text-slate-gray leading-7">
            To empower farmers and agricultural stakeholders with access to
            premium-quality products, innovative farming solutions, and
            financial support that drives sustainable growth and prosperity
            across Ghana's agricultural sector.
          </p>
        </div>

        {/* Vision Section */}
        <div>
          <h2 className="text-4xl font-bold text-coral-red mb-4">Our Vision</h2>
          <p className="text-slate-gray leading-7">
            To become the leading force in transforming Ghana's agriculture by
            fostering innovation, enabling financial independence for farmers,
            and connecting local agricultural products to global markets.
          </p>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-4xl font-bold text-coral-red mb-4">
            Our Projects
          </h2>
          <ul className="list-disc list-inside text-slate-gray leading-7 pl-5">
            <li>
              <strong>Financial Loan Program:</strong> Providing farmers with
              financial loans to support their operations, purchase equipment,
              and enhance productivity.
            </li>
            <li>
              <strong>Agricultural Commodities Hub:</strong> Offering
              high-quality maize, shea butter, soybeans, and cashew nuts to meet
              local and international demand.
            </li>
            <li>
              <strong>Machinery Rentals:</strong> Renting out modern farming
              machinery to small-scale and large-scale farmers to improve
              efficiency.
            </li>
            <li>
              <strong>Training & Education:</strong> Conducting workshops and
              training programs to educate farmers on modern farming techniques
              and best practices.
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-10">
        <a href="/about">
          <Button label="Learn More About Us" />
        </a>
      </div>
    </section>
  );
};

export default About;
