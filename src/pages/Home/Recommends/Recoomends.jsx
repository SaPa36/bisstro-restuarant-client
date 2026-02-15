import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Recoomends = () => {
    return (
        <section className="mb-12">
            <SectionTitle heading="Chef Recommends" subHeading="Should Try"></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="card bg-[#F3F3F3] shadow-xl rounded-none">
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                            alt="Caeser Salad"
                            className="w-full h-[280px] object-cover" // Shorter image height
                        />
                    </figure>
                    <div className="card-body items-center text-center p-6"> {/* Reduced padding */}
                        <h2 className="card-title text-xl font-bold">Caeser Salad</h2>
                        <p className="text-sm text-[#151515]">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions mt-4">
                            <button className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#E8E8E8] text-[#BB8506] uppercase hover:bg-[#111827] hover:border-[#BB8506]">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Active State */}
                <div className="card bg-[#F3F3F3] shadow-xl rounded-none border border-orange-400">
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                            alt="Caeser Salad"
                            className="w-full h-[280px] object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Caeser Salad</h2>
                        <p className="text-sm text-[#151515]">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions mt-4">
                            <button className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#111827] text-[#BB8506] uppercase">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card bg-[#F3F3F3] shadow-xl rounded-none">
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                            alt="Caeser Salad"
                            className="w-full h-[280px] object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Caeser Salad</h2>
                        <p className="text-sm text-[#151515]">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions mt-4">
                            <button className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#E8E8E8] text-[#BB8506] uppercase hover:bg-[#111827] hover:border-[#BB8506]">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Recoomends;