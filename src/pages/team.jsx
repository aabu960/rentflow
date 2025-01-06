import { arrowRight } from "../assets/icons";
import { Button } from "../components";
import { customer1 } from "../assets/images";

const Team = () => {
  return (
    <section className='flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='flex-1'>
        <img
          src="" // Ensure this is the correct image for your team
          alt={customer1}
          width={773}
          height={687}
          className='object-contain w-full'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-coral-red'>Our </span>
          Team
        </h2>
        <p className='mt-4 info-text'>
          Meet the passionate and dedicated individuals behind our mission. Our team is committed to bringing the best services and products to farmers, ensuring sustainability and growth in the agricultural sector.
        </p>
        <p className='mt-6 info-text'>
          With diverse backgrounds and expertise in agriculture, finance, logistics, and technology, we work together to drive innovation and support our community.
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label='Join Us' iconURL={arrowRight} />
          <Button
            label='Learn More'
            backgroundColor='bg-white'
            borderColor='border-slate-gray'
            textColor='text-slate-gray'
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
