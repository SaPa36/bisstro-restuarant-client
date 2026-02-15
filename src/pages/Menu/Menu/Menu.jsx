import { Helmet } from "react-helmet";
import Cover from "../../../Shared/Cover";
import menu from '../../../assets/menu/banner3.jpg';
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {
    return (


        <div className="space-y-20">
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menu} title="Our Menu"></Cover>
            <MenuCategory></MenuCategory>
            
        </div>
    );
};

export default Menu;