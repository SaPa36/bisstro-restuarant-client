import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center mb-16 md:w-4/12 mx-auto">
            <p className="text-lg text-yellow-600 mb-2">--- {subHeading} ---</p>
            <h2 className="text-4xl font-serif border-y-2 border-gray-300 py-2  mb-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;