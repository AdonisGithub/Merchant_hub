import React, {FormEvent, useEffect, useState} from "react";
import "./NewBusinessCustomer.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {useHistory} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {FormControl} from "@mui/material";
import {DropzoneAreaBase} from "material-ui-dropzone";
import {BusinessCustomersStatusDTO, BusinessCustomersTypesDTO} from "../../service/businesscustomers/types";
import {
    getBusinessCustomerStatusList,
    getBusinessCustomerTypesList,
    postBusinessCustomer
} from "../../service/businesscustomers";

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

export default function NewBusinessCustomer() {
    const classes = useStyles();
    let history = useHistory();

    const [name, setName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState<string>("");
    const [description, setDescription] = useState("");

    // This won't be run unless all the input validations are met.
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This console.log won't give errors
        // console.log(data);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        const body = {
            name,
            businessType,
            type,
            status,
            description,
        }
        postBusinessCustomer(body)
            .then(({ data }) => {
                console.log(data.name);
                history.replace("/business-customers");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [businessCustomersTypeList, setBusinessCustomersTypeList] = useState<BusinessCustomersTypesDTO[]>([]);

    useEffect(() => {
        businessCustomerTypesData();
    }, []);

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

    useEffect(() => {
        businessCustomerStatusData();
    }, []);

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
                    <form onSubmit={onSubmit} className={classes.form}>
                        {/*-- 1 row --------------------- label New Business Customer --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">New Business Customer</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row ------------------- New Business Customer Name ----------------------------------*/}

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
                                                id="name"
                                                label="Name *"
                                                style={{ margin: 8 }}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Name"
                                                helperText="Enter name"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    maxLength: 40
                                                }}
                                                variant="outlined"
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
                                                id="business-type"
                                                label="Business Type *"
                                                style={{ margin: 8 }}
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                                placeholder="Business Type"
                                                helperText="Enter Business Type"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    maxLength: 40
                                                }}
                                                variant="outlined"
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
                                                <InputLabel id="type-label">Type</InputLabel>
                                                <Select
                                                    labelId="type"
                                                    id="type-helper"
                                                    value={type}
                                                    label="Type"
                                                    onChange={(e) => setType(e.target.value)}
                                                    required
                                                >
                                                    {businessCustomersTypeList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Type</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="type-label">Status</InputLabel>
                                                <Select
                                                    labelId="status"
                                                    id="status-helper"
                                                    value={status}
                                                    label="Status"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                >
                                                    {businessCustomerStatusList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Status</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 5 row --------------------- Issue -------------------------------------------------------------- */}

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
                                                style={{ margin: 8 }}
                                                placeholder="4000 characters maximum"
                                                helperText="4000 characters maximum"
                                                inputProps={{
                                                    required: true,
                                                    maxLength: 4000
                                                }}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                fullWidth
                                                multiline
                                                rows={10}
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
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
                                            <DropzoneAreaBase
                                                fileObjects={files}
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
                                                Create Customer
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
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
