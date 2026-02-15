import { Helmet } from "react-helmet";
import Cover from "../../../Shared/Cover";
import menu from '../../../assets/menu/banner3.jpg';


const Menu = () => {
    return (


        <div className="">
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menu} title="Our Menu"></Cover>
            
        </div>
    );
};

export default Menu;