import React, { useMemo, useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { ResponsiveLine } from "@nivo/line";
import axios from 'axios';
// import { tokens } from "../../theme";
import { tokens } from "../theme";
const Monthly = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [monthlyData, setMonthlyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/monthlysales');
          setMonthlyData(response.data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };

    const formattedData = useMemo(() => {
        if (!monthlyData || monthlyData.length === 0) return [];
      
        // Sort monthlyData based on the month value
        const sortedData = monthlyData.sort((a, b) => a._id.month - b._id.month);
      
        const formattedData = sortedData.map(({ _id, totalSales }) => ({
          x: monthNames[_id.month],
          y: totalSales
        }));
      
        return [{ id: "totalSales", color: theme.palette.secondary.main, data: formattedData }];
      }, [monthlyData, theme.palette.secondary.main]);
      
  
    return (
      <Box>
        <Box height="75vh">
          {isLoading ? (
            <>Loading...</>
          ) : error ? (
            <>Error fetching data: {error.message}</>
          ) : (
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
                legend: isDashboard ? undefined : "Month", // added
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickValues: 5, // added
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Sales", // added
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
          )}
        </Box>
      </Box>
    );
  };
  
  export default Monthly;
