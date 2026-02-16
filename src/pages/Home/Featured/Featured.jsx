import React from 'react';
// Import your background and content images
import featuredImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Featured = () => {
    return (
        <section 
            style={{
                backgroundImage: `url(${featuredImg})`,
                backgroundAttachment: 'fixed' // Parallax effect
            }}
            className="relative bg-fixed bg-cover bg-center text-white pt-8 my-20"
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 bg-opacity-60"></div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 pb-10">
                {/* Section Title Component Logic */}
                <SectionTitle heading="Featured Item" subHeading="Our Speciality"></SectionTitle>

                <div className="md:flex justify-center items-center gap-10 md:px-30 ">
                    <div className="md:w-1/2">
                        <img src={featuredImg} alt="Featured item" className="rounded-lg" />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                        <p className="text-lg">March 20, 2023</p>
                        <p className="uppercase text-xl">Where can I get some?</p>
                        <p className="leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, 
                            deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad 
                            laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                        </p>
                        <button className="btn btn-outline border-0 border-b-4 border-white text-white uppercase hover:bg-white hover:text-black">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;