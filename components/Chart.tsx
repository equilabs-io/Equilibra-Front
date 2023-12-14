import { useState } from "react";

interface ChartProps {
  maxValue: number;
  currentValue: number;
}

export const Chart = ({ maxValue, currentValue }: ChartProps) => {
  const sideLength = 240; // Adjust as needed
  const strokeWidth = 10;
  const percentage = (currentValue / maxValue) * 100;
  const rectWidth = sideLength;
  const rectHeight = sideLength;
  const innerRectWidth = rectWidth - strokeWidth * 2;
  const innerRectHeight = rectHeight - strokeWidth * 2;

  const offset = innerRectWidth - (percentage / 100) * innerRectWidth;
  const strokeDasharray =
    percentage >= 100
      ? `${innerRectWidth} ${innerRectWidth}`
      : `${innerRectWidth} ${innerRectWidth}`;

  const [showPercentage, setShowPercentage] = useState(true);

  const handleMouseOver = () => {
    setShowPercentage(true);
  };

  const handleMouseOut = () => {
    setShowPercentage(false);
  };

  return (
    <>
      <div>
        <svg
          width={sideLength}
          height={sideLength}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          {/* Outer Rectangle */}
          <rect
            x={0}
            y={0}
            width={rectWidth}
            height={rectHeight}
            fill="var(--color-background)"
          />
          {/* Inner Rectangle */}
          <rect
            x={strokeWidth}
            y={strokeWidth}
            width={innerRectWidth}
            height={innerRectHeight}
            fill="transparent"
            stroke={
              percentage >= 50
                ? "var(--color-secondary-content)"
                : "var(--color-primary)"
            }
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={offset}
          />

          {showPercentage && (
            <text
              x={sideLength / 2}
              y={sideLength - 10}
              textAnchor="middle"
              fontSize="24px"
              fontWeight="bold"
              fill={
                percentage >= 50
                  ? "var(--color-secondary)"
                  : "var(--color-primary)"
              }
            >
              {percentage.toFixed(0)}%
            </text>
          )}
        </svg>
      </div>
    </>
  );
};
