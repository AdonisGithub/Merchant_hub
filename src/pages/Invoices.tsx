import React, {ChangeEvent, lazy, ReactNode, Suspense, useState} from 'react';
import '../App.css';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Grid, Tab, Tabs, Typography} from "@material-ui/core";

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
          style={{width: '100%'}}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 624,
  },
    tabs: {
        "& .MuiTab-wrapper": {
            flexDirection: "row",
            justifyContent: "flex-start",
            textTransform: 'capitalize',
            fontSize: 17
        },
        textALign: "left",
        overflow: 'visible',
        borderLeft: `1px solid ${theme.palette.divider}`
    },
    indicator: {
        left: 0,
        // you can add other styles here like changing the background Color
    },
}));

export default function Invoices() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const AllInvoicesComponent = lazy(() => import('./invoices/AllInvoices'));
  const OutstandingInvoicesComponent = lazy(() => import('./invoices/Outstanding'));
  const PaidInvoicesComponent = lazy(() => import('./invoices/Paid'));
  const PastDueInvoicesComponent = lazy(() => import('./invoices/PastDue'));
  const CancelledInvoicesComponent = lazy(() => import('./invoices/Cancelled'));

  return (
      <>
          <Box m={5} pl={14}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    TabIndicatorProps={{ className: classes.indicator }}
                >
                  <Tab label="All Invoices" {...a11yProps(0)} />
                  <Tab label="Outstanding" {...a11yProps(1)} />
                  <Tab label="Paid" {...a11yProps(2)} />
                  <Tab label="Past Due" {...a11yProps(3)} />
                  <Tab label="Cancelled" {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <section>
                      <AllInvoicesComponent />
                    </section>
                  </Suspense>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <OutstandingInvoicesComponent />
                        </section>
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <PaidInvoicesComponent />
                        </section>
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <PastDueInvoicesComponent />
                        </section>
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <section>
                            <CancelledInvoicesComponent />
                        </section>
                    </Suspense>
                </TabPanel>
            </div>
          </Box>

          <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
          >
              <Grid item>
                  <Box pt={15} pb={3}>
                      <h5>Merchant Hub 2021</h5>
                  </Box>
              </Grid>
          </Grid>
      </>
  );
}
