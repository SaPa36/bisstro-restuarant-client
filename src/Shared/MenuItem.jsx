import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div>
            <div className="flex space-x-4">
                <img style={{ borderRadius: '0 200px 200px 200px' }} className="w-25 h-20" src={image} alt="" />
                <div>
                    <h3 className="text-xl">{name}------------------</h3>
                    <p>{recipe}</p>
                </div>
                <p className="text-yellow-600 mt-2">${price}</p>
            </div>
            
        </div>
    );
};

export default MenuItem;