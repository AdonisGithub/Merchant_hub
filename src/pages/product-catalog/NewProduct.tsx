import React, {FormEvent, useState} from "react";
import "./NewProduct.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
    postProduct
} from "../../service/productcatalog";
import {useHistory} from "react-router-dom";
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

export default function NewProduct() {
    const classes = useStyles();
    let history = useHistory();

    const [title, setTitle] = useState<string>("");
    const [metaTitle, setMetaTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState("");

    // This won't be run unless all the input validations are met.
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This console.log won't give errors
        // console.log(data);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        const body = {
            title,
            metaTitle,
            price,
            description,
        }
        postProduct(body)
            .then(({ data }) => {
                console.log(data.title);
                history.replace("/product-catalog");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
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
                        {/*-- 1 row --------------------- label New Product --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">New Product</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row ------------------- Product Title ----------------------------------*/}

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
                                                label="Product Title *"
                                                style={{ margin: 8 }}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Product Title"
                                                helperText="Enter Product title"
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

                        {/*-- 2 row ------------------- Product Meta Title ----------------------------------*/}

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
                                                id="meta-title"
                                                label="Product Meta Title *"
                                                style={{ margin: 8 }}
                                                value={metaTitle}
                                                onChange={(e) => setMetaTitle(e.target.value)}
                                                placeholder="Product Meta Title"
                                                helperText="Enter Product meta title"
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
                                                label="Price"
                                                id="price"
                                                className={classes.textField}
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                helperText="Enter Product Price"
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
                                                Create Product
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
