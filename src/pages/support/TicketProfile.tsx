import React, {useEffect, useState} from "react";
import "./TicketProfile.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  TicketCategoryTypesDTO,
  TicketFullDTO,
  TicketSeverityLevelsDTO,
  TicketStatusTypesDTO,
} from "../../service/support/types";
import {
  getTicket,
  getTicketCategories,
  getTicketSeverityTypes,
  getTicketStatusTypes,
  updateTicket,
} from "../../service/support";
import { useHistory, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, Snackbar, Alert } from "@mui/material";
import moment from "moment";
import { RouteParams } from "../../service/utils";
import useForm from "../../hooks/useForm";
import {DropzoneAreaBase} from "material-ui-dropzone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
    form: {
      width: "100%",
    },
  })
);

// fields validation rules. can be moved to a separate file.
const formValidation = (fields: any) => {
  let errs: any = {}

  if (fields.title === "" || fields.title.length > 40)
    errs.title = "Invalid name"

  if (!fields.status)
    errs.status = "Invalid status"

  if (!fields.category)
    errs.category = "Invalid category"

  if (!fields.severity)
    errs.severity = "Invalid severity"

  if (fields.environment.length > 80)
    errs.environment = "Invalid Environment size"

  if (fields.submittedBy.length > 80)
    errs.submittedBy = "Invalid Submitted by size"

  if (fields.description.length < 5 || fields.description.length > 4000)
    errs.description = "Invalid description"

  if (fields.notifyEmails.length > 120)
    errs.notifyEmails = "Invalid Emails size"

  return errs
}

export default function TicketProfile(props: any) {
  const classes = useStyles();
  let history = useHistory();

  let requestParams = useParams<RouteParams>();
  const [ticket, setTicket] = useState<TicketFullDTO>();

  const [snackBar, setSnackBar] = useState<boolean>(false)

  // This won't be run unless all the input validations are met.
  const formSubmit = async () => {
    setSnackBar(true)

    setTicket(fields);
    updateTicket(requestParams.id, fields)
      .then(({ data }) => {
        console.log(data.title);
        history.replace("/support");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // form attributes
  const { fields, setFields, errors, handleChange, handleSubmit } = useForm(
    {
      title: '', submittedBy: '', submitDate: '', status: '', severity: '',
      category: '', environment: '', description: '', email: '', notifyEmails: ''
    },
    formValidation,
    formSubmit
  )

  const [ticketCategoriesList, setTicketCategoriesList] = useState<
    TicketCategoryTypesDTO[]
  >([]);

  useEffect(() => {
    ticketCategoriesData();
    ticketStatusData();
    ticketSeverityData();
    getSingleTicket();
  }, []);

  const getSingleTicket = async () => {
    getTicket(requestParams.id)
      .then(({ data }) => {
        setTicket(data);
        console.log(data)

        // set default values
        setFields({ ...data })

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ticketCategoriesData = async () => {
    getTicketCategories()
        .then(({ data }) => {
          setTicketCategoriesList(data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const [ticketSeverityList, setTicketSeverityList] = useState<
    TicketSeverityLevelsDTO[]
  >([]);

  const ticketSeverityData = async () => {
    getTicketSeverityTypes()
      .then((resp) => {
        setTicketSeverityList(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [ticketStatusList, setTicketStatusList] = useState<
    TicketStatusTypesDTO[]
  >([]);

  const ticketStatusData = async () => {
    getTicketStatusTypes()
      .then((resp) => {
        setTicketStatusList(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles: any) => {
    setFiles([...files]);
  };
  const handleDelete = (deleted: any) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  return (
    <Container>
      <Box m={5}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit} className={classes.form}>
            {/*-- 1 row --------------------- label Open Support Ticket --------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Box m={2} pb={3}>
                  <Typography variant="h4">Support Ticket</Typography>
                </Box>
              </Grid>
            </Grid>

            {/*-- 2 row ------------------- Issue Name ----------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                        name="title"
                        value={fields.title}
                        id="title"
                        label="Issue Name *"
                        style={{ margin: 8 }}
                        placeholder="Issue Name"
                        helperText="Enter Issue name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.title || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 3 row ------------------------------------------------------------------------- */}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                        name="submitted-by"
                        label="Submitted by"
                        id="submitted-by"
                        value={fields.submittedBy || ""}
                        className={classes.textField}
                        helperText="Enter Ticket Author"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.submittedBy || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                          label="Submit Date"
                          id="submit-date"
                          type="date"
                          name="submit-date"
                          value={moment(fields.submitDate).format('yyyy-MM-DD') || null}
                          helperText="Select Submit Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onInput={handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="status-label" shrink>Ticket Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status-helper"
                          name="status"
                          value={fields.status || ""}
                          onChange={handleChange}
                          label="Select Status"
                          error={errors.status || false}
                        >
                          {ticketStatusList.map((element, i) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Ticket Status</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 4 row --------------------------------------------------------------------------------------- */}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              {/*3 row*/}
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="severity-label" shrink>
                          Severity Level
                        </InputLabel>
                        <Select
                          labelId="severity-label"
                          id="severity-helper"
                          name="severity"
                          value={fields.severity || ""}
                          label="Select Severity"
                          onChange={handleChange}
                          error={errors.severity || false}
                        >
                          {ticketSeverityList.map((element) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Ticket Severity</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="category-label" shrink>
                          Ticket Category
                        </InputLabel>
                        <Select
                          labelId="category-label"
                          id="category-helper"
                          name="category"
                          value={fields.category || ""}
                          label="Select Category"
                          onChange={handleChange}
                          error={errors.category || false}
                        >
                          {ticketCategoriesList.map((element) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Ticket Category</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                        name="environment"
                        label="Environment"
                        id="environment"
                        value={fields.environment || ""}
                        className={classes.textField}
                        helperText="Environment description"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.environment || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 5 row --------------------- Description -------------------------------------------------------------- */}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                        id="description"
                        label="Issue *"
                        name="description"
                        value={fields.description || ""}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="4000 characters maximum"
                        helperText="4000 characters maximum"
                        fullWidth
                        multiline
                        rows={10}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        error={errors.description || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 6 row -------------------------- Attached Files ------------------------------------------------- */}

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
              <Grid item>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      {/*<TextField*/}
                      {/*  label="Attached Files"*/}
                      {/*  id="outlined-margin-none"*/}
                      {/*  className={classes.textField}*/}
                      {/*  helperText="Some important text"*/}
                      {/*  variant="outlined"*/}
                      {/*/>*/}

                      <DropzoneAreaBase
                          fileObjects={files}
                          showFileNames
                          onAdd={handleAdd}
                          onDelete={handleDelete}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------  E-mail List for notifications  ----------------------------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                        name="notifyEmails"
                        label="E-mail List for notifications"
                        id="email-list-notifications"
                        value={fields.notifyEmails || ""}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="E-mail List for notifications"
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.notifyEmails || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 8 row ----- submit button ---------------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <Box marginLeft={0.5} display="inline-block">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        startIcon={<SaveIcon/>}
                      >
                        Update Ticket
                      </Button>
                    </Box>
                    <Box marginLeft={1} display="inline-block">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon/>}
                        onClick={() => history.replace("/support")}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackBar(false)}>
              <Alert onClose={() => setSnackBar(false)} severity="success" >
                Submitting Form!
              </Alert>
            </Snackbar>
          </form>
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
    </Container>
  );
}
