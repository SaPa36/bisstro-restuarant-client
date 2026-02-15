
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../../Shared/MenuItem';
import Cover from '../../../Shared/Cover';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const MenuCategory = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div className='space-y-20 mb-12'>
            <SectionTitle heading="Today's Offer" subHeading="Don't Miss"></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {offered.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)}
            </div>
            
            <Cover img={dessertImg} title="Dessert"></Cover>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {desserts.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>    
                    </MenuItem>)}
            </div>

            <Cover img={pizzaImg} title="Pizza"></Cover>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {pizza.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)}
            </div>

            <Cover img={saladImg} title="Salad"></Cover>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {salad.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)}
            </div>

            <Cover img={soupImg} title="Soup"></Cover>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {soup.map(item =>
                    <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)}
            </div>

        </div>
    );
};

export default MenuCategory;