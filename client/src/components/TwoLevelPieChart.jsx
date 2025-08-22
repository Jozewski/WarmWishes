import { PureComponent } from "react";
// eslint-disable-next-line no-unused-vars
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Group A", value: 7070, fill: "yellow" },
  { name: "Group B", value: 18740, fill: "#82ca9d" },
  { name: "Group C", value: 14655, fill: "skyblue" },
  { name: "Group D", value: 28675, fill: "#8884d8" },
];

const data02 = [
  { name: "A1", value: 200, fill: "yellow" },
  { name: "A2", value: 1200, fill: "yellow" },
  { name: "A3", value: 210, fill: "yellow" },
  { name: "A4", value: 210, fill: "yellow" },
  { name: "B1", value: 210, fill: "#82ca9d" },
  { name: "B2", value: 220, fill: "#82ca9d" },
  { name: "B3", value: 200, fill: "#82ca9d" },
  { name: "B4", value: 220, fill: "#82ca9d" },
  { name: "B5", value: 220, fill: "#82ca9d" },
  { name: "B6", value: 200, fill: "#82ca9d" },
  { name: "B7", value: 220, fill: "#82ca9d" },
  { name: "B8", value: 210, fill: "#82ca9d" },
  { name: "B9", value: 220, fill: "#82ca9d" },
  { name: "C2", value: 210, fill: "skyblue" },
  { name: "C3", value: 210, fill: "skyblue" },
  { name: "C4", value: 210, fill: "skyblue" },
  { name: "C5", value: 255, fill: "skyblue" },
  { name: "C6", value: 255, fill: "skyblue" },
  { name: "C7", value: 215, fill: "skyblue" },
  { name: "C8", value: 200, fill: "skyblue" },
  { name: "C9", value: 210, fill: "skyblue" },
  { name: "C10", value: 200, fill: "skyblue" },
  { name: "C11", value: 200, fill: "skyblue" },
  { name: "D1", value: 210, fill: "#8884d8" },
  { name: "D2", value: 210, fill: "#8884d8" },
  { name: "D3", value: 210, fill: "#8884d8" },
  { name: "D4", value: 210, fill: "#8884d8" },
  { name: "D5", value: 255, fill: "#8884d8" },
  { name: "D6", value: 255, fill: "#8884d8" },
  { name: "D7", value: 215, fill: "#8884d8" },
  { name: "D8", value: 200, fill: "#8884d8" },
  { name: "D9", value: 210, fill: "#8884d8" },
  { name: "D10", value: 200, fill: "#8884d8" },
  { name: "D11", value: 200, fill: "#8884d8" },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-two-levels-gor24";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="fill"
          />
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={140}
            outerRadius={170}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
