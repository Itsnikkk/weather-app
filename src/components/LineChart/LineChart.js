import React from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip,} from 'recharts';
import './LineChart.css';

 

export default function LineChartView (props){
  
    return (
      <AreaChart width={730} height={250} data={props.data}
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#86d4fc" stopOpacity={0.8}/>
            <stop offset="45%" stopColor="#86d4fc" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Temp" dot={{r: 6, stroke: '#00a6fa', fill: '#fff'}} activeDot={{r: 5}} stroke="#00a6fa" strokeWidth="2" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    );
  }

