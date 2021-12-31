import React, {useEffect, useState} from "react";
import "../App.css";
import Grid from "@material-ui/core/Grid";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, Brush,
} from "recharts";
import {Box} from "@material-ui/core";
import {getBillingSummary} from "../service/billing";
import {BillingSummaryDTO} from "../service/billing/types";

export default function Billing() {

  const [chartData, setChartData] = useState(new Array<BillingSummaryDTO>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBillingSummary().then(response => {
      setChartData(
          response.data
      );
      setIsLoading(false); })
    ;}, []);

  return (
    <>
      <Grid
          container
          justifyContent="center"
          alignItems="center"
      >
        <Grid item>
          <Box pt={8}>
            <h4 className="billing-chart-label">Invoices Summary</h4>
            <BarChart
              width={1000}
              height={400}
              data={chartData}
              margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
              }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="paid" name="Paid" stackId="a" fill="#8884d8" />
              <Bar dataKey="outstanding" name="Outstanding" stackId="a" fill="#82ca9d" />
              <Bar dataKey="pastDue" name="Past Due" stackId="a" fill="#E791CB" />
              <Bar dataKey="cancelled" name="Cancelled" stackId="a" fill="#71D3F8" />

              <Brush dataKey="createdAt" height={30} stroke="#919191" />
            </BarChart>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
