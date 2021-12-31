import React, {FormEvent, useEffect, useState} from "react";
import "./NewJourney.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
    postJourney
} from "../../service/journeys";
import {useHistory} from "react-router-dom";

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

export default function NewJourney() {
    const classes = useStyles();
    let history = useHistory();

    const [title, setTitle] = useState<string>("");

    // This won't be run unless all the input validations are met.
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This console.log won't give errors
        // console.log(data);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        const body = {
            title,
        }
        postJourney(body)
            .then(({ data }) => {
                console.log(data.title);
                history.replace("/journey-designer");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <Container>
            <Box m={5}>
                <div className={classes.root}>
                    <form onSubmit={onSubmit} className={classes.form}>
                        {/*-- 1 row --------------------- label New Journey --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">New Journey</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row -------------------  Journey title ----------------------------------*/}

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
                                                label="Journey title *"
                                                style={{ margin: 8 }}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Journey title"
                                                helperText="Enter Journey title"
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
                                                Create Journey
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
