import React from "react";
import { PieChart, Pie, Tooltip, Cell, Sector } from "recharts";

const COLORS = [
  "url(#gradientBlue)",
  "url(#gradientRed)",
  "url(#gradientGreen)",
  "url(#gradientPurple)",
  "url(#gradientYellow)",
  "url(#gradientPink)",
];

export interface PieChartDataItem {
  name: string;
  value: number;
}
interface PieChartComponentProps {
  data: PieChartDataItem[];
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({ data = [] }) => {
  return (
    <PieChart width={390} height={390}>
      <defs>
        <linearGradient id="gradientBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#357ABD" />
        </linearGradient>
        <linearGradient id="gradientRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F55A4E" />
          <stop offset="100%" stopColor="#D63D2E" />
        </linearGradient>
        <linearGradient id="gradientGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3BB273" />
          <stop offset="100%" stopColor="#2B8543" />
        </linearGradient>
        <linearGradient id="gradientPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BE79DF" />
          <stop offset="100%" stopColor="#A25DCD" />
        </linearGradient>
        <linearGradient id="gradientYellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5e231" />
          <stop offset="100%" stopColor="#e2ad26" />
        </linearGradient>
        <linearGradient id="gradientPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e226dc" />
          <stop offset="100%" stopColor="#e593e2" />
        </linearGradient>
      </defs>
      <Pie
        data={data}
        cx={195}
        cy={195}
        // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        innerRadius={50}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        stroke="#000"
        activeShape={renderActiveShape}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

// Custom active shape
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, fill, value } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={24}>
        {value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={props.startAngle}
        endAngle={props.endAngle}
        fill={fill}
      />
    </g>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#333", // Custom background color
          color: "#fff", // Custom text color
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default PieChartComponent;
