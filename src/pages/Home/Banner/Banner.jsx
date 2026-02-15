import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'

const Banner = () => {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <Carousel 
                autoPlay={true} 
                infiniteLoop={true} 
                showThumbs={true} // Changed back to true to show thumbnails
                showStatus={false}
                interval={3000}
            >
                {/* We set the height on the div container.
                   We use 'object-cover' on the img so it fills the 600px 
                   without being squished.
                */}
                <div className="h-[400px] md:h-[500px]">
                    <img src={img1} className="h-full object-cover" />
                </div>
                <div className="h-[400px] md:h-[500px]">
                    <img src={img2} className="h-full object-cover" />
                </div>
                <div className="h-[400px] md:h-[500px]">
                    <img src={img3} className="h-full object-cover" />
                </div>
                <div className="h-[400px] md:h-[500px]">
                    <img src={img4} className="h-full object-cover" />
                </div>
                <div className="h-[400px] md:h-[500px]">
                    <img src={img5} className="h-full object-cover" />
                </div>
                <div className="h-[400px] md:h-[500px]">
                    <img src={img6} className="h-full object-cover" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;