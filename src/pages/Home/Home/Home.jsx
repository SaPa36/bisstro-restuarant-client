import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import BistroBoss from '../BistroBoss/BistroBoss';
import PopularItems from '../PopularItems/PopularItems';

const Home = () => {
    return (
        <div className='space-y-20'>
            <Banner></Banner>
            <Category></Category>
            <BistroBoss></BistroBoss>
            <PopularItems></PopularItems>
        </div>
    );
};

export default Home;