import React from "react";
import { PieChart, Pie, Tooltip, Cell, Sector } from "recharts";

const COLORS = [
  "#624E88",
  "#8967B3",
  "#CB80AB",
  "#E6D9A2",
  "#A1D6B2",
  "#CEDF9F",
  "#F1F3C2",
  "#C96868",
];

export interface PieChartDataItem {
  name: string;
  value: number;
}
interface PieChartComponentProps {
  data: PieChartDataItem[];
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({ data = [] }) => {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart width={390} height={390}>
      <Pie
        data={data}
        cx={195}
        cy={195}
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        innerRadius={50}
        outerRadius={100}
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
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

// Custom active shape
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, fill, value } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12}>
        {value}€
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
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <p>{`${payload[0].name} : ${payload[0].value}€`}</p>
      </div>
    );
  }
  return null;
};

export default PieChartComponent;
