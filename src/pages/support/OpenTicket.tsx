import React, {FormEvent, useEffect, useState} from "react";
import "./OpenTicket.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
    TicketCategoryTypesDTO,
    TicketSeverityLevelsDTO,
    TicketStatusTypesDTO
} from "../../service/support/types";
import {getTicketCategories, getTicketSeverityTypes, getTicketStatusTypes, postTicket} from "../../service/support";
import {useHistory} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {FormControl} from "@mui/material";
import {Moment} from "moment";
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

export default function OpenTicket() {
    const classes = useStyles();
    let history = useHistory();

    const [title, setTitle] = useState("");
    const [submittedBy, setSubmittedBy] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string>("");
    const [severity, setSeverity] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [environment, setEnvironment] = useState<string>("");
    const [submitDate, setSubmitDate] = useState<Moment | null>(null);
    const [notifyEmails, setNotifyEmails] = useState<string>("");

    // This won't be run unless all the input validations are met.
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This console.log won't give errors
        // console.log(data);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        const body = {
            title,
            submittedBy,
            description,
            status,
            category,
            severity,
            submitDate,
            environment,
            notifyEmails,
        }
        postTicket(body)
            .then(({ data }) => {
                console.log(data.title);
                history.replace("/support");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [ticketCategoriesList, setTicketCategoriesList] = useState<TicketCategoryTypesDTO[]>([]);

    useEffect(() => {
        ticketCategoriesData();
    }, []);

    const ticketCategoriesData = async () => {
        getTicketCategories()
            .then((resp) => {
                setTicketCategoriesList(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [ticketSeverityList, setTicketSeverityList] = useState<TicketSeverityLevelsDTO[]>([]);

    useEffect(() => {
        ticketSeverityData();
    }, []);

    const ticketSeverityData = async () => {
        getTicketSeverityTypes()
            .then((resp) => {
                setTicketSeverityList(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [ticketStatusList, setTicketStatusList] = useState<TicketStatusTypesDTO[]>([]);

    useEffect(() => {
        ticketStatusData();
    }, []);

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
                    <form onSubmit={onSubmit} className={classes.form}>
                        {/*-- 1 row --------------------- label Open Support Ticket --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">Open Support Ticket</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row -------------------  Issue Name ----------------------------------*/}

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
                                                id="title"
                                                label="Issue Name *"
                                                style={{ margin: 8 }}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Issue Name"
                                                helperText="Enter Issue name"
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
                                                label="Submitted by"
                                                id="submitted-by"
                                                className={classes.textField}
                                                value={submittedBy}
                                                onChange={(e) => setSubmittedBy(e.target.value)}
                                                helperText="Enter Ticket Author"
                                                variant="outlined"
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
                                                    helperText="Select Submit Date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={submitDate}
                                                    variant="outlined"
                                                    //@ts-ignore
                                                    onInput={(e) => setSubmitDate(new Date(e.target.value))}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="status-label">Ticket Status</InputLabel>
                                                <Select
                                                    labelId="status-label"
                                                    id="status-helper"
                                                    value={status}
                                                    label="Select Status"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                >
                                                    {ticketStatusList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
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
                                                <InputLabel id="severity-label">Severity Level</InputLabel>
                                                <Select
                                                    labelId="severity-label"
                                                    id="severity-helper"
                                                    value={severity}
                                                    label="Select Severity"
                                                    onChange={(e) => setSeverity(e.target.value)}
                                                    required
                                                >
                                                    {ticketSeverityList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Severity</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="category-label">Ticket Category</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    id="category-helper"
                                                    value={category}
                                                    label="Select Category"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    required
                                                >
                                                    {ticketCategoriesList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Category</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="Environment"
                                                id="environment"
                                                value={environment}
                                                onChange={(e) => setEnvironment(e.target.value)}
                                                className={classes.textField}
                                                helperText="Environment description"
                                                variant="outlined"
                                            />
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
                                                label="Issue *"
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
                                            {/*<TextField*/}
                                            {/*    label="Attached Files"*/}
                                            {/*    id="outlined-margin-none"*/}
                                            {/*    className={classes.textField}*/}
                                            {/*    helperText="Some important text"*/}
                                            {/*    variant="outlined"*/}
                                            {/*/>*/}

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
                                                label="E-mail List for notifications"
                                                id="email-list-notifications"
                                                className={classes.textField}
                                                value={notifyEmails}
                                                onChange={(e) => setNotifyEmails(e.target.value)}
                                                helperText="E-mail List for notifications"
                                                variant="outlined"
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
                                                Submit Ticket
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
