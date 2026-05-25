import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import Title from '../components/Title';
import axios from 'axios';
import { format } from 'date-fns';

const Orders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const token = localStorage.getItem('token');
  

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        `${backendUrl}api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className='p-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  alt=''
                  src={item.image?.[0] || '/default-image.png'}
                  className='w-16 sm:w-20'
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.name || 'Unnamed Product'}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>
                      {currency}
                      {item.price || '0.00'}
                    </p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size || 'N/A'}</p>
                  </div>
                  <p className='mt-1'>
                    Date: <span className='text-gray-400'>{item.date || "No records"}</span>
                  </p>
                  <p className='mt-1'>
                    Payment Method: <span className='text-gray-400'>{item.paymentMethod || "No records"}</span>
                  </p>
                </div>
              </div>
              <div className='mf:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${item.status === 'Ready to Ship' ? 'bg-green-500' : 'bg-red-500'}`}></p>
                  <p className='text-sm md:text-base'>{item.status || 'Pending'}</p>
                </div>
                <button className='border px-4 ml-10 py-2 text-sm font-medium rounded-sm'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center'>No orders found. Or Login Again </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
