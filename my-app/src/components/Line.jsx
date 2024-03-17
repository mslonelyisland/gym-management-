import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { DatePicker } from "@mui/lab";

const Line = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, ] = useState(new Date());
  const [walkinData, setWalkinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceResponse = await axios.get(`http://localhost:3001/attendance?month=${selectedMonth.getMonth() + 1}&year=${selectedMonth.getFullYear()}`);
        setAttendanceData(attendanceResponse.data);

        const walkinResponse = await axios.get(`http://localhost:3001/attendancewalkin?month=${selectedMonth.getMonth() + 1}&year=${selectedMonth.getFullYear()}`);
        setWalkinData(walkinResponse.data);
        console.log("Walk-in data:", walkinResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const formattedData = useMemo(() => {
    if (!attendanceData || !walkinData) return [];
  
    // Process attendance data
    const groupedAttendanceData = attendanceData.reduce((acc, entry) => {
      const hour = new Date(entry.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
  
    const formattedAttendanceData = Object.entries(groupedAttendanceData).map(([hour, count]) => ({
      x: hour,
      y: count
    }));
  
    formattedAttendanceData.sort((a, b) => a.x - b.x);
  
    // Process walk-in data
    const groupedWalkinData = walkinData.reduce((acc, entry) => {
      const hour = new Date(entry.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
  
    const formattedWalkinData = Object.entries(groupedWalkinData).map(([hour, count]) => ({
      x: hour,
      y: count
    }));

    console.log("Grouped walk-in data:", groupedWalkinData);
    console.log("Formatted walk-in data:", formattedWalkinData);

  
    formattedWalkinData.sort((a, b) => a.x - b.x);    


    return [
      { id: "members", color: theme.palette.secondary.main, data: formattedAttendanceData },
      { id: "guests", color: theme.palette.primary.main, data: formattedWalkinData },
    ];
  }, [attendanceData, walkinData, theme.palette.secondary.main, theme.palette.primary.main]);
  
  return (
    <>
      <ResponsiveLine
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Hour (24 hour format)", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Number of Members who are checked in", // added
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default Line;
