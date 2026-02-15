import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import BistroBoss from '../BistroBoss/BistroBoss';
import PopularItems from '../PopularItems/PopularItems';
import Recoomends from '../Recommends/Recoomends';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div className='space-y-20'>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <BistroBoss></BistroBoss>
            <PopularItems></PopularItems>
            <Recoomends></Recoomends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;