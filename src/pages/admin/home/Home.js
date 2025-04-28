import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import styled from "@emotion/styled";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { FaHome, FaWrench } from "react-icons/fa";
import { GiBlackBook } from "react-icons/gi";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineSmile } from "react-icons/ai";
import { dashboardService } from "../../../services/apiServices/dashboard/dashboardService";
import randomColor from "randomcolor";
ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

export default function Home() {
  // //Fetch
  // const [apiData, setApiData] = useState([]);
  // useEffect(() => {
  //   let dashboardData = () => {
  //     dashboardService().then((response) => {
  //       if (response.data) {
  //         ;
  //         setApiData(response.data.data);
  //         setDonutData({
  //           ...donutData,
  //           labels: response.data.data.preferenceCountList.map(
  //             (item) => item?.name
  //           ),
  //           datasets: [
  //             {
  //               ...donutData.datasets[0],
  //               data: response.data.data.preferenceCountList.map(
  //                 (item) => item?.count
  //               ),

  //               backgroundColor: randomColor({
  //                 count: response.data.data.preferenceCountList.length,
  //               }),
  //             },
  //           ],
  //         });
  //         setBarData({
  //           ...barData,
  //           labels: response.data.data.userActivityCountList.map(
  //             (item) => item?.monthName
  //           ),

  //           datasets: [
  //             {
  //               ...barData.datasets[0],
  //               data: response.data.data.userActivityCountList.map(
  //                 (item) => item?.presentCount
  //               ),
  //             },
  //           ],
  //         });
  //       }
  //     });
  //   };
  //   dashboardData();
  // }, []);

  // //Bar Graph
  // const [barData, setBarData] = useState({
  //   labels: [],
  //   datasets: [
  //     // {
  //     //     label: 'Last Week',
  //     //     data: [0, 1, 2, 5, 4, 2],
  //     //     width: 1,
  //     //     backgroundColor: 'rgb(181, 219, 255)'
  //     // },
  //     {
  //       label: "Monthly",
  //       data: [],
  //       borderWidth: 1,
  //       backgroundColor: "rgb(7, 131, 247)",
  //     },
  //   ],
  // });
  // const options = {
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  //   animation: {
  //     duration: 2000,
  //   },
  // };

  // //Donut Graph
  // const [donutData, setDonutData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "User Count",
  //       data: [],
  //       backgroundColor: [
  //         "rgb(255, 99, 132)",
  //         "rgb(7, 131, 247)",
  //         "rgb(161, 94, 255)",
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // });

  // const donutOptions = {
  //   cutout: 100,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Donut Chart Title",
  //       fontSize: 16,
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //   },
  // };

  return (
    <>
     
    </>
  );
}
