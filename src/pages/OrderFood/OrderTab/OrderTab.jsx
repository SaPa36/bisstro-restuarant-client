import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const OrderTab = ({ items }) => {
  // 1. Logic to chunk the items into groups of 6
  const itemsPerPage = 6;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      className="mySwiper"
    >
      {/* 2. Map through the 'pages' array to create a slide for every 6 items */}
      {pages.map((group, index) => (
        <SwiperSlide key={index}>
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {group.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OrderTab;