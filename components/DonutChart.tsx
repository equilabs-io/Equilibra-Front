import { useState } from "react";

interface DonutChartProps {
  maxValue: number;
  currentValue: number;
}

export const DonutChart = ({ maxValue, currentValue }: DonutChartProps) => {
  const radius = 80;
  const strokeWidth = 40;
  const circumference = 1.5 * Math.PI * radius;
  const percentage = (currentValue / maxValue) * 100;
  const offset = circumference - (percentage / 100) * circumference;
  const strokeDasharray =
    percentage >= 100
      ? `${circumference} ${circumference}`
      : `${circumference} ${circumference}`;

  const [showPercentage, setShowPercentage] = useState(false);

  const handleMouseOver = () => {
    setShowPercentage(true);
  };

  const handleMouseOut = () => {
    setShowPercentage(false);
  };

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="var(--color-background)"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={
          percentage >= 50 ? "var(--color-secondary)" : "var(--color-primary)"
        }
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      {showPercentage && (
        <text
          x={radius}
          y={radius + 10}
          textAnchor="middle"
          fontSize="24px"
          fontWeight="bold"
          fill={
            percentage >= 50 ? "var(--color-secondary)" : "var(--color-primary)"
          }
        >
          {percentage.toFixed(0)}%
        </text>
      )}
    </svg>
  );
};
