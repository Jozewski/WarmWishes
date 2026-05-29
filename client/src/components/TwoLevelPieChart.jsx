import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

// Color palette for different projects
const PROJECT_COLORS = {
  "Hydration Stations": "#FFD700",      // Yellow/Gold
  "Warm Up for Winter": "#82ca9d",      // Green
  "Spring Fling": "#87CEEB",            // Sky Blue
  "All in For Fall": "#8884d8"          // Purple/Blue
};

const TwoLevelPieChart = () => {
  const { datasets } = useSelector((state) => state.datasets);

  // Transform datasets for outer ring (project totals)
  const projectTotals = datasets.map(dataset => {
    const total = dataset.items.reduce((sum, item) => sum + (item.current || 0), 0);
    return {
      name: dataset.projectName,
      value: total,
      fill: PROJECT_COLORS[dataset.projectName] || "#999999"
    };
  });

  // Transform datasets for inner ring (individual items by project)
  const itemDetails = [];
  datasets.forEach(dataset => {
    const projectColor = PROJECT_COLORS[dataset.projectName] || "#999999";
    dataset.items.forEach(item => {
      itemDetails.push({
        name: `${dataset.projectName}: ${item.description}`,
        value: item.current || 0,
        fill: projectColor
      });
    });
  });

  // Filter out zero values for cleaner visualization
  const filteredProjectTotals = projectTotals.filter(p => p.value > 0);
  const filteredItemDetails = itemDetails.filter(i => i.value > 0);

  // Custom label renderer for project names with bright, visible colors and background
  const renderProjectLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value, fill }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 150;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const textAnchor = x > cx ? 'start' : 'end';
    const text = `${name}: ${value}`;

    // Estimate text width for background rectangle
    const textWidth = text.length * 9;
    const textHeight = 24;
    const padding = 6;

    const rectX = textAnchor === 'start' ? x - padding : x - textWidth - padding;
    const rectY = y - textHeight / 2;

    return (
      <g style={{ pointerEvents: 'none' }}>
        {/* Background rectangle */}
        <rect
          x={rectX}
          y={rectY}
          width={textWidth + padding * 2}
          height={textHeight}
          fill="rgba(0, 0, 0, 0.85)"
          stroke={fill}
          strokeWidth="3"
          rx="4"
        />
        {/* Text on top */}
        <text
          x={x}
          y={y}
          fill="#FFFFFF"
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{ fontSize: '16px', fontWeight: 'bold', zIndex: 1000 }}
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={800}>
      <PieChart>
        {/* Inner pie - Project totals */}
        <Pie
          data={filteredProjectTotals}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label={renderProjectLabel}
          labelLine={{ stroke: '#FFFFFF', strokeWidth: 2 }}
        >
          {filteredProjectTotals.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>

        {/* Outer pie - Item details */}
        <Pie
          data={filteredItemDetails}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={170}
          outerRadius={220}
          label={({ value }) => value > 0 ? value : ""}
        >
          {filteredItemDetails.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TwoLevelPieChart;
