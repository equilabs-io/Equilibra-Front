"use client";
import EChartsReact from "echarts-for-react";
import React, { useState } from "react";

export default function Charts({}) {
  const [value, setValue] = useState(50);
  const dataMock = [{ value: 11 }, { value: 20 }, { value: 50 }, { value: 28 }];

  //TODO: delete this, just for testing purposes
  const options = {
    series: [
      {
        type: "gauge",
        progress: {
          show: true,
          width: 10,
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
        axisTick: {
          show: false,
        },
        // splitLine: {
        //   length: 15,
        //   lineStyle: {
        //     width: 2,
        //     color: "#999",
        //   },
        // },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 10,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 60,
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: value,
          },
        ],
      },
    ],
  };

  const option2 = {
    // add extra features to the chart, like magicType, dataView, saveAsImage, (three button to the left of the chart)
    grid: { top: 57, right: 10, bottom: 22, left: 45 },
    toolbox: {
      show: true,
      feature: {
        magicType: { type: ["bar", "line"] },
        dataView: { readOnly: false },
        // saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      // We can pass function to the data
      data: dataMock.map((item) => Object.keys(item)[0]),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        // We can pass function to the data
        data: dataMock.map((item) => Object.values(item)[0]),
        type: "bar",
      },
    ],
  };

  const option3 = {
    title: [
      {
        text: "Tangential Polar Bar Label Position (middle)",
        //title position
        left: "center",
      },
    ],
    polar: {
      radius: [10, "80%"],
    },
    angleAxis: {
      max: 100,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["id: 1", "id: 2", "id: 3", "id: 4"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [10, 20, 20, 50],
      coordinateSystem: "polar",
      label: {
        show: false,
        position: "",
      },
    },
  };
  return (
    <>
      <EChartsReact
        // handles everything for the chart
        option={options}
        // add className to chart container, is it neccesary ??
        className=""
        // controls width and height of chart
        style={{ height: "400px", width: "100%" }}
        // echarts renderer, default is canvas ??
        opts={{ renderer: "svg" }}
        // callback
        onChartReady={() => console.log("Chart is ready")}
      />
      <button className="border" onClick={() => setValue(value + 1)}>
        change
      </button>
      <div className="flex">
        <EChartsReact
          option={option2}
          style={{ height: "400px", width: "50%" }}
        />
        <EChartsReact
          option={option3}
          style={{ height: "400px", width: "50%" }}
        />
      </div>
    </>
  );
}
