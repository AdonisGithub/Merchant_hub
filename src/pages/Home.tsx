import React, {useEffect, useState} from "react";
import "../App.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
import {ClientsSummaryDTO, TicketsSummaryDTO} from "../service/home/types";
import {getClientsSummary, getTicketsSummary} from "../service/home";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const usePaperStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  })
);

const useTimelineStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Home() {
  const [chartClientsData, setChartClientsData] = useState(new Array<ClientsSummaryDTO>());
  const [chartTicketsData, setChartTicketsData] = useState(new Array<TicketsSummaryDTO>());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClientsSummary().then(response => {
      setChartClientsData(
          response.data
      );
      // setIsLoading(false);
      })
    ;}, []);

    useEffect(() => {
      getTicketsSummary().then(response => {
        setChartTicketsData(
            response.data
        );
        // setIsLoading(false);
        })
      ;}, []);

  return (
    <>
      {/* Business details */}

      {/* Settings chart */}

      <Grid container justifyContent="center" alignItems="center">
        {/*<Grid item xs={11}>*/}
        {/*  <Box m={5}>*/}
        {/*    <Box m={2}>*/}
        {/*      <h2>Next, add your business details</h2>*/}
        {/*    </Box>*/}
        {/*    <Box m={2}>*/}
        {/*      <h3>*/}
        {/*        Tell us a little more about your business to activate your*/}
        {/*        account.*/}
        {/*      </h3>*/}
        {/*    </Box>*/}
        {/*    <Box m={2}>*/}
        {/*      <Link to="activate-account">*/}
        {/*        <button className="activate">Continue</button>*/}
        {/*      </Link>*/}
        {/*    </Box>*/}
        {/*  </Box>*/}

        {/*  <Box m="5rem" />*/}
        {/*</Grid>*/}

        <Grid item xs={11}>
          {/*Padding on the top*/}
          <Box m="5rem" />
        </Grid>

        <Grid item>
          <h4 className="chart-label">Onboarding Process Summary</h4>
          <BarChart
            width={1200}
            height={300}
            data={chartClientsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis
              dataKey="createdAt"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            {/*<Bar*/}
            {/*  dataKey="invoices"*/}
            {/*  fill="#8884d8"*/}
            {/*  background={{ fill: "#eee" }}*/}
            {/*/>*/}

            <Bar dataKey="active" name="Paid" stackId="a" fill="#8884d8" />
            <Bar dataKey="onBoarding" name="OnBoarding" stackId="a" fill="#82ca9d" />
            <Bar dataKey="notVerified" name="Not Verified" stackId="a" fill="#E791CB" />
            <Bar dataKey="verified" name="Verified" stackId="a" fill="#71D3F8" />
            <Bar dataKey="suspended" name="Suspended" stackId="a" fill="#ffc658" />
            <Bar dataKey="inactive" name="Inactive" stackId="a" fill="#71D3F8" />

            <Brush dataKey="createdAt" height={30} stroke="#919191" />
          </BarChart>
        </Grid>

        <Grid item xs={11}>
          {/*Padding on the top*/}
          <Box m="5rem" />
        </Grid>

        <Grid item>
          <h4 className="chart-label">Tickets Summary</h4>
          <BarChart
              width={1200}
              height={300}
              data={chartTicketsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={30}
          >
            <XAxis
                dataKey="createdAt"
                scale="point"
                padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            {/*<Bar*/}
            {/*  dataKey="invoices"*/}
            {/*  fill="#8884d8"*/}
            {/*  background={{ fill: "#eee" }}*/}
            {/*/>*/}

            <Bar dataKey="newValue" name="New" stackId="a" fill="#8884d8" />
            <Bar dataKey="assigned" name="Assigned" stackId="a" fill="#82ca9d" />
            <Bar dataKey="inProgress" name="In-Progress" stackId="a" fill="#E791CB" />
            <Bar dataKey="closed" name="Closed" stackId="a" fill="#ffc658" />

            <Brush dataKey="createdAt" height={30} stroke="#919191" />
          </BarChart>
        </Grid>

        {/*<Grid item xs={4}>*/}
        {/*  <h4 className="chart-label">Payments</h4>*/}
        {/*  <BarChart*/}
        {/*    width={500}*/}
        {/*    height={300}*/}
        {/*    data={data}*/}
        {/*    margin={{*/}
        {/*      top: 5,*/}
        {/*      right: 30,*/}
        {/*      left: 20,*/}
        {/*      bottom: 5,*/}
        {/*    }}*/}
        {/*    barSize={20}*/}
        {/*  >*/}
        {/*    <XAxis*/}
        {/*      dataKey="name"*/}
        {/*      scale="point"*/}
        {/*      padding={{ left: 10, right: 10 }}*/}
        {/*    />*/}
        {/*    <YAxis />*/}
        {/*    <Tooltip />*/}
        {/*    <Legend />*/}
        {/*    <CartesianGrid strokeDasharray="3 3" />*/}
        {/*    <Bar*/}
        {/*      dataKey="invoices"*/}
        {/*      fill="#8884d8"*/}
        {/*      background={{ fill: "#eee" }}*/}
        {/*    />*/}
        {/*  </BarChart>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={4}>*/}
        {/*  <h4 className="chart-label">Chargebacks</h4>*/}
        {/*  <BarChart*/}
        {/*    width={500}*/}
        {/*    height={300}*/}
        {/*    data={data}*/}
        {/*    margin={{*/}
        {/*      top: 5,*/}
        {/*      right: 30,*/}
        {/*      left: 20,*/}
        {/*      bottom: 5,*/}
        {/*    }}*/}
        {/*    barSize={20}*/}
        {/*  >*/}
        {/*    <XAxis*/}
        {/*      dataKey="name"*/}
        {/*      scale="point"*/}
        {/*      padding={{ left: 10, right: 10 }}*/}
        {/*    />*/}
        {/*    <YAxis />*/}
        {/*    <Tooltip />*/}
        {/*    <Legend />*/}
        {/*    <CartesianGrid strokeDasharray="3 3" />*/}
        {/*    <Bar*/}
        {/*      dataKey="Chargebacks"*/}
        {/*      fill="#8884d8"*/}
        {/*      background={{ fill: "#eee" }}*/}
        {/*    />*/}
        {/*  </BarChart>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={4}>*/}
        {/*  <h4 className="chart-label">Net volume from sales</h4>*/}
        {/*  <BarChart*/}
        {/*    width={500}*/}
        {/*    height={300}*/}
        {/*    data={data}*/}
        {/*    margin={{*/}
        {/*      top: 5,*/}
        {/*      right: 30,*/}
        {/*      left: 20,*/}
        {/*      bottom: 5,*/}
        {/*    }}*/}
        {/*    barSize={20}*/}
        {/*  >*/}
        {/*    <XAxis*/}
        {/*      dataKey="name"*/}
        {/*      scale="point"*/}
        {/*      padding={{ left: 10, right: 10 }}*/}
        {/*    />*/}
        {/*    <YAxis />*/}
        {/*    <Tooltip />*/}
        {/*    <Legend />*/}
        {/*    <CartesianGrid strokeDasharray="3 3" />*/}
        {/*    <Bar dataKey="USD" fill="#8884d8" background={{ fill: "#eee" }} />*/}
        {/*  </BarChart>*/}
        {/*</Grid>*/}
      </Grid>
    </>
  );
}
