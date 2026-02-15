import React from 'react';
// Import your background image
import chefImg from '../../../assets/home/chef-service.jpg'; 

const BistroBoss = () => {
    return (
        <div 
            className="my-20 p-8 md:p-24 bg-fixed bg-cover bg-center" 
            style={{ backgroundImage: `url(${chefImg})` }}
        >
            <div className="bg-white text-black text-center p-10 md:p-20 bg-opacity-90">
                <h2 className="text-4xl uppercase mb-4 font-serif">Bistro Boss</h2>
                <p className="max-w-3xl mx-auto leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum 
                    deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil 
                    iusto ducimus incidunt quibusdam nemo.
                </p>
            </div>
        </div>
    );
};

export default BistroBoss;