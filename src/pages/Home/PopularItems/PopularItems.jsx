import React, { useEffect, useState } from 'react';

import MenuItem from '../../../Shared/MenuItem';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const PopularItems = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const PopularItems = data.filter(item => item.category === 'popular');
                setMenu(PopularItems);
            })
    }, []);

    return (
        <section className='mb-12'>
            <SectionTitle heading="From Our Menu" subHeading="Popular Items"></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {menu.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>

                    </MenuItem>)}
            </div>


        </section>
    );
};

export default PopularItems;