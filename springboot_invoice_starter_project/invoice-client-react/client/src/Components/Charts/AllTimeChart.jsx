import * as React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { apiGet } from '../../Utils/apiGet';

//chart for displaying all time data from the api response

const colors = ['#EC407A','#006BD6',  '#CF4564'];

export default function AllTimeChart() {
    const [statistics, setStatistics] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [labels, setLabels] = React.useState(["Current Year Revenue", "All Time Revenue", "All Time Invoices"]);
    const [allTimeData, setAllTimeData] = React.useState([]);

    React.useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                const data = await apiGet("http://localhost:8080/api/invoices/statistics");
                console.log("Fetched statistics:", data);

                // Extract values dynamically for chart
                const currentYearData = [data.currentYearSum];
                const allTimeRevenueData = [data.allTimeSum];
                const allTimeInvoiceData = [data.invoiceCount];

                setAllTimeData([currentYearData, allTimeRevenueData, allTimeInvoiceData]);
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics(); // Run on mount
    }, []); // Runs only once when the component mounts


    return (
        <BarChart
            sx={(theme) => ({
                [`.${barElementClasses.root}`]: {
                    fill: (theme.vars || theme).palette.background.paper,
                    strokeWidth: 2,
                },
                [`.MuiBarElement-series-r_id`]: {
                    stroke: colors[0],
                    fill: colors[2]
                },
                [`.${axisClasses.root}`]: {
                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                        stroke: '#006BD6',
                        strokeWidth: 3,
                        fill: '#006BD6',
                    },
                    [`.${axisClasses.tickLabel}`]: {
                        fill: colors[1],
                    },
                },
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundImage:
                    'linear-gradient(rgba(215, 17, 17, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(179, 18, 18, 0.1) 1px, transparent 1px)',
                backgroundSize: '35px 35px',
                backgroundPosition: '20px 20px, 20px 20px',
                ...theme.applyStyles('dark', {
                    borderColor: 'rgba(255,255,255, 0.1)',
                    backgroundImage:
                        'linear-gradient(rgba(8, 8, 8, 0) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                }),
            })}
            xAxis={[{ data: labels }]}
            series={[
                { data: allTimeData, id: 'r_id' },
            ]}
            colors={colors}
            height={300}
        />
    );
}