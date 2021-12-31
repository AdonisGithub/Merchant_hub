import React, {useEffect, useState} from "react";
import "./BusinessCustomerProfile.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  BusinessCustomerFullDTO, BusinessCustomersStatusDTO, BusinessCustomersTypesDTO
} from "../../service/businesscustomers/types";
import {
  getBusinessCustomer, getBusinessCustomerStatusList, getBusinessCustomerTypesList,
  updateBusinessCustomer,
} from "../../service/businesscustomers";
import { useHistory, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, Snackbar, Alert } from "@mui/material";
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

  if (fields.name === "" || fields.name.length > 40)
    errs.name = "Invalid name"

  if (!fields.businessType)
    errs.businessType = "Invalid Business Type"

  if (!fields.type)
    errs.type = "Invalid type"

  if (!fields.status)
    errs.status = "Invalid status"

  if (fields.description.length < 5 || fields.description.length > 4000)
    errs.description = "Invalid description"

  return errs
}

export default function BusinessCustomerProfile(props: any) {
  const classes = useStyles();
  let history = useHistory();

  let requestParams = useParams<RouteParams>();
  const [businessCustomer, setBusinessCustomer] = useState<BusinessCustomerFullDTO>();

  const [snackBar, setSnackBar] = useState<boolean>(false)

  // This won't be run unless all the input validations are met.
  const formSubmit = async () => {
    setSnackBar(true)

    setBusinessCustomer(fields);
    updateBusinessCustomer(requestParams.id, fields)
      .then(({ data }) => {
        console.log(data.name);
        history.replace("/business-customers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // form attributes
  const { fields, setFields, errors, handleChange, handleSubmit } = useForm(
    {
      name: '', businessType: '', type: '', status: '', description: ''
    },
    formValidation,
    formSubmit
  )

  const [businessCustomersTypeList, setBusinessCustomersTypeList] = useState<
      BusinessCustomersTypesDTO[]
      >([]);

  useEffect(() => {
    businessCustomerTypesData();
    businessCustomerStatusData();
    getSingleBusinessCustomer();
  }, []);

  const getSingleBusinessCustomer = async () => {
    getBusinessCustomer(requestParams.id)
      .then(({ data }) => {
        setBusinessCustomer(data);
        console.log(data)

        // set default values
        setFields({ ...data })

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const businessCustomerTypesData = async () => {
    getBusinessCustomerTypesList()
        .then((resp) => {
          setBusinessCustomersTypeList(resp.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const [businessCustomerStatusList, setBusinessCustomerStatusList] = useState<BusinessCustomersStatusDTO[]>([]);

  const businessCustomerStatusData = async () => {
    getBusinessCustomerStatusList()
        .then((resp) => {
          setBusinessCustomerStatusList(resp.data);
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
            {/*-- 1 row --------------------- label Business Customer --------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Box m={2} pb={3}>
                  <Typography variant="h4">Business Customer Profile</Typography>
                </Box>
              </Grid>
            </Grid>

            {/*-- 2 row ------------------- Business Customer Name ----------------------------------*/}

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
                        name="name"
                        value={fields.name}
                        id="name"
                        label="Name *"
                        style={{ margin: 8 }}
                        placeholder="Name"
                        helperText="Enter Business Customer name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.name || false}
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
                          name="business-type"
                          value={fields.businessType}
                          id="name"
                          label="Business Type *"
                          style={{ margin: 8 }}
                          placeholder="Business Type"
                          helperText="Enter Business Type"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.businessType || false}
                      />
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
                        <InputLabel id="type-label" shrink>
                          Type
                        </InputLabel>
                        <Select
                          labelId="type-label"
                          id="type-helper"
                          name="type"
                          value={fields.type || ""}
                          label="Select Type"
                          onChange={handleChange}
                          error={errors.type || false}
                        >
                          {businessCustomersTypeList.map((element) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Type</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="status-label" shrink>
                          Status
                        </InputLabel>
                        <Select
                          labelId="status-label"
                          id="status-helper"
                          name="status"
                          value={fields.status || ""}
                          label="Select Status"
                          onChange={handleChange}
                          error={errors.status || false}
                        >
                          {businessCustomerStatusList.map((element) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Status</FormHelperText>
                      </FormControl>
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
                        label="Description *"
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
                        Update Customer
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
