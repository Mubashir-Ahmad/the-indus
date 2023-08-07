import React, { useState, useEffect, useRef } from 'react';
import './riderearn.css';
import Metatitle from '../title/title';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import Sidebar from '../Rider/Sidebar.js';
// import { useAlert } from 'react-alert';
import { riderearn } from '../../actions/OrderAction';
function Riderearn() {
  const navigate = useNavigate();
  const { message, orders, totalEarnings, totalOrders } = useSelector((state) => state.riderearn);
  const { user } = useSelector((state) => state.user);
  console.log(useSelector((state) => state.riderearn));
  // const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(riderearn());
  }, [dispatch]);

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalEarnings],
      },
    ],
  };

  

  const doughnutState = {
    labels: ['Total Order','Earning'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [totalOrders, totalOrders * 100 ],
      },
    ],
  };
  
  return (
    <>
      <Metatitle title="Confirm order" />
      <div className="dashboard">
        <Sidebar />
        <div className='earnn'>
          <h6>{user.user.name} Earning</h6>
          <div className="rider-earn">
            <div>
              <i class="fa-sharp fa-solid fa-dollar-sign"></i>
              <p>Total earning</p>
              <p>{totalOrders} * 100 = {totalEarnings}</p>
            </div>
            <div>
            <i class="fa-solid fa-city"></i>
              <p>Total order</p>
              <p>You take Total = {totalOrders}</p>
            </div>
          </div>
          <div className="graph">
          <div className="lineChart">
          <Line data={lineState}  className='graph-01'/>
          <div className='graph-1'>
            <p>You are growing by 14% in month</p>
        </div>
        </div>
       
</div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} className='graph-01'/>
        </div>
        </div>
      </div>
    </>
  );
}

export default Riderearn;
