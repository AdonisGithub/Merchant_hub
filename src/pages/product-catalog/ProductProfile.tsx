import React, {useEffect, useState} from "react";
import "./ProductProfile.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  ProductCatalogDTO
} from "../../service/productcatalog/types";
import {
  getProduct,
  updateProduct,
} from "../../service/productcatalog";
import { useHistory, useParams } from "react-router-dom";
import {Snackbar, Alert } from "@mui/material";
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

// fields validation rules. can be moved to a seperate file.
const formValidation = (fields: any) => {
  let errs: any = {}

  if (fields.title === "" || fields.title.length > 40)
    errs.title = "Invalid title"

  if (!fields.metaTitle)
    errs.metaTitle = "Invalid meta title"

  if (!fields.price)
    errs.price = "Invalid price value"

  if (fields.description.length < 5 || fields.description.length > 4000)
    errs.description = "Invalid description"

  return errs
}

export default function ProductProfile(props: any) {
  const classes = useStyles();
  let history = useHistory();

  let requestParams = useParams<RouteParams>();
  const [product, setProduct] = useState<ProductCatalogDTO>();

  const [snackBar, setSnackBar] = useState<boolean>(false)

  // This won't be run unless all the input validations are met.
  const formSubmit = async () => {
    setSnackBar(true)

    setProduct(fields);
    updateProduct(requestParams.id, fields)
      .then(({ data }) => {
        console.log(data.title);
        history.replace("/product-catalog");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // form attributes
  const { fields, setFields, errors, handleChange, handleSubmit } = useForm(
    {
      title: '', metaTitle: '', price: '', description: ''
    },
    formValidation,
    formSubmit
  )

  useEffect(() => {
    getProductCatalog();
  }, []);

  const getProductCatalog = async () => {
    getProduct(requestParams.id)
      .then(({ data }) => {
        setProduct(data);
        console.log(data)

        // set default values
        setFields({ ...data })

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
            {/*-- 1 row --------------------- label Product Profile --------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Box m={2} pb={3}>
                  <Typography variant="h4">Product Profile</Typography>
                </Box>
              </Grid>
            </Grid>

            {/*-- 2 row ------------------- Product Name ----------------------------------*/}

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
                        label="Product Title *"
                        style={{ margin: 8 }}
                        placeholder="Product Title"
                        helperText="Enter Product Title"
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

            {/*-- 2 row ------------------- Product MetaTitle ----------------------------------*/}

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
                          name="meta-title"
                          value={fields.metaTitle}
                          id="meta-title"
                          label="Product Meta Title *"
                          style={{ margin: 8 }}
                          placeholder="Product Meta Title"
                          helperText="Enter Product Meta Title"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.metaTitle || false}
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
                          value={fields.price}
                          onChange={handleChange}
                          helperText="Enter Product Price"
                          variant="outlined"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 2 row --------------------- Product Description -------------------------------------------------------------- */}

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
                          label="Description"
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
                        Update Product
                      </Button>
                    </Box>
                    <Box marginLeft={1} display="inline-block">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon/>}
                        onClick={() => history.replace("/product-catalog")}
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
