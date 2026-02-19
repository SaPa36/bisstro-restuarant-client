import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'



// import required modules
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://bisstro-restuarant-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);
    return (
        <section>
            <SectionTitle heading="What Our Clients Say" subHeading="Testimonials"></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper  ">

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="testimonial-card px-24 p-6 flex flex-col items-center gap-y-5 bg-gray-100 rounded-lg shadow-md">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="testimonial-text">{review.details}</p>
                            <h3 className="testimonial-name text-2xl text-center text-yellow-600">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;