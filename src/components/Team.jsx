import arrow from "../assets/icons/arrow-right.svg";
import { Button } from "../components";
// import teamImage from "../assets/images/CEO.jpg"; // Replace with actual team image

const Team = () => {
  return (
    <section
      id="team"
      className="flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container py-16 bg-light-gray"
    >
      {/* Team Image and CEO Info */}
      <div className="flex-1 text-center max-xl:text-left">
        <img
          src={arrow} // Ensure this is the correct image for your team
          alt="Our Team"
          width={773}
          height={687}
          className="object-contain w-full rounded-md shadow-md"
        />
        <div className="mt-6">
          <span className="text-2xl font-bold text-dark-teal">
            <strong>CEO</strong>
          </span>
          <br />
          <span className="text-xl font-medium text-slate-gray">
            Mr. Imoro Abdul-Hafiz
          </span>
        </div>
      </div>

      {/* Team Description */}
      <div className="flex flex-1 flex-col max-xl:text-center max-xl:items-center">
        <h2 className="text-5xl font-bold text-dark-teal">
          <span className="text-coral-red">Our </span>Team
        </h2>
        <p className="mt-4 text-lg text-slate-gray leading-relaxed">
          Meet the passionate and dedicated individuals behind our mission. Our
          team is committed to bringing the best services and products to
          farmers, ensuring sustainability and growth in the agricultural
          sector.
        </p>
        <p className="mt-6 text-lg text-slate-gray leading-relaxed">
          With diverse backgrounds and expertise in agriculture, finance,
          logistics, and technology, we work together to drive innovation and
          support our community.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Button label="Join Us" iconURL={arrow} />
          <Button
            label="Learn More"
            backgroundColor="bg-white"
            borderColor="border-slate-gray"
            textColor="text-dark-teal"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
