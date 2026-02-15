import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import BistroBoss from '../BistroBoss/BistroBoss';

const Home = () => {
    return (
        <div className='space-y-20'>
            <Banner></Banner>
            <Category></Category>
            <BistroBoss></BistroBoss>
        </div>
    );
};

export default Home;