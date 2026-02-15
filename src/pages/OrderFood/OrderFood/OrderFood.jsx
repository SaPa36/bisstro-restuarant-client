import React, { useState } from "react";
import Cover from "../../../Shared/Cover";
import orderImg from "../../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FoodCard from "../../../components/FoodCard/FoodCard";
import useMenu from "../../../hooks/useMenu";

const OrderFood = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();

    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
  return (
    <div>
      <Cover img={orderImg} title="Order Food"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salads</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
            <div className="grid md:grid-cols-3 gap-10">
                {
                    salad.map(item => <FoodCard
                        key={item._id}
                        item={item}
                    >

                    </FoodCard>)
                }
            </div>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderFood;
