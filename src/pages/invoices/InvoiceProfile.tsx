import React, {useEffect, useState} from "react";
import "./InvoiceProfile.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  InvoiceFullDTO,
  InvoicesCurrenciesListDTO, InvoicesLanguagesListDTO,
  InvoiceStatusTypesDTO
} from "../../service/invoices/types";
import {
  getInvoice,
  getInvoiceCurrenciesList,
  getInvoiceLanguagesList,
  getInvoiceStatusTypes,
  updateInvoice
} from "../../service/invoices";
import {useHistory, useParams} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {Alert, FormControl, Snackbar} from "@mui/material";
import {Moment} from "moment";
import {RouteParams} from "../../service/utils";
import useForm from "../../hooks/useForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
     },
    form: {
      width: "100%",
    },
  })
);

// fields validation rules. can be moved to a seperate file.
const formValidation = (fields: any) => {
  let errs: any = {}

  if (fields.invoiceNumber === "" || fields.invoiceNumber.length > 40)
    errs.invoiceNumber = "Invalid Invoice number"

  if (fields.companyName === "" || fields.companyName.length > 40)
    errs.companyName = "Invalid company name"

  if (fields.phone === "" || fields.phone.length > 40)
    errs.phone = "Invalid phone"

  if (fields.postCode === "" || fields.postCode.length > 40)
    errs.postCode = "Invalid post code"

  if (fields.address === "" || fields.address.length > 40)
    errs.address = "Invalid address"

  if (fields.companyNumber === "" || fields.companyNumber.length > 40)
    errs.companyNumber = "Invalid company number"

  if (fields.bankAccount === "" || fields.bankAccount.length > 40)
    errs.bankAccount = "Invalid bank account"

  if (fields.bankName === "" || fields.bankName.length > 40)
    errs.bankName = "Invalid bank name"

  if (fields.bankAddress === "" || fields.bankAddress.length > 40)
    errs.bankAddress = "Invalid bank address"

  if (fields.alternativeBankAccount === "" || fields.alternativeBankAccount.length > 40)
    errs.alternativeBankAccount = "Invalid alternative bank account"

  if (fields.alternativeBankName === "" || fields.alternativeBankName.length > 40)
    errs.alternativeBankName = "Invalid alternative bank name"

  if (fields.alternativeBankAddress === "" || fields.alternativeBankAddress.length > 40)
    errs.alternativeBankAddress = "Invalid alternative bank address"

  if (fields.vatNumber === "" || fields.vatNumber.length > 40)
    errs.vatNumber = "Invalid vat number"

  if (fields.swiftBic === "" || fields.swiftBic.length > 40)
    errs.swiftBic = "Invalid swift/bic"

  if (fields.iban === "" || fields.iban.length > 40)
    errs.iban = "Invalid iban"

  if (fields.vatTax === "" || fields.vatTax.length > 40)
    errs.vatTax = "Invalid vat tax"

  if (fields.currency === "" || fields.currency.length > 40)
    errs.currency = "Invalid currency"

  if (fields.signature === "" || fields.signature.length > 40)
    errs.signature = "Invalid signature"

  if (fields.invoiceDate === "" || fields.invoiceDate.length > 40)
    errs.invoiceDate = "Invalid invoice date"

  if (fields.delayTax === "" || fields.delayTax.length > 40)
    errs.delayTax = "Invalid delay tax"

  if (fields.referenceNumber === "" || fields.referenceNumber.length > 40)
    errs.referenceNumber = "Invalid reference number"

  if (fields.notes === "" || fields.notes.length > 40)
    errs.notes = "Invalid notes"

  if (fields.sendAt === "" || fields.sendAt.length > 40)
    errs.sendAt = "Invalid send at date"

  if (fields.clientEmail === "" || fields.clientEmail.length > 40)
    errs.clientEmail = "Invalid client email"

  if (fields.clientCompany === "" || fields.clientCompany.length > 40)
    errs.clientCompany = "Invalid client company"

  if (fields.clientCompanyNumber === "" || fields.clientCompanyNumber.length > 40)
    errs.clientCompanyNumber = "Invalid client company number"

  if (fields.clientCompanyVatNumber === "" || fields.clientCompanyVatNumber.length > 40)
    errs.clientCompanyVatNumber = "Invalid client company vat number"

  if (fields.clientCompanyAddress === "" || fields.clientCompanyAddress.length > 40)
    errs.clientCompanyAddress = "Invalid client company address"

  if (fields.clientCompanyPostCode === "" || fields.clientCompanyPostCode.length > 40)
    errs.clientCompanyPostCode = "Invalid client company post code"

  if (fields.language === "" || fields.language.length > 40)
    errs.language = "Invalid language"

  if (fields.recipient === "" || fields.recipient.length > 40)
    errs.recipient = "Invalid recipient"

  if (fields.address === "" || fields.address.length > 40)
    errs.address = "Invalid address"

  if (fields.address === "" || fields.address.length > 40)
    errs.address = "Invalid address"

  if (!fields.status)
    errs.status = "Invalid status"

  if (fields.submitDate === "" || fields.submitDate.length > 40)
    errs.submitDate = "Invalid submit date"

  return errs
}

export default function InvoiceProfile(props: any) {
  const classes = useStyles();
  let history = useHistory();

  let requestParams = useParams<RouteParams>();
  const [invoice, setInvoice] = useState<InvoiceFullDTO>();
  // const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  // const [companyName, setCompanyName] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [postCode, setPostCode] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  // const [companyNumber, setCompanyNumber] = useState<string>("");
  // const [bankAccount, setBankAccount] = useState<string>("");
  // const [bankName, setBankName] = useState<string>("");
  // const [bankAddress, setBankAddress] = useState<string>("");
  // const [alternativeBankAccount, setAlternativeBankAccount] = useState<string>("");
  // const [alternativeBankName, setAlternativeBankName] = useState<string>("");
  // const [alternativeBankAddress, setAlternativeBankAddress] = useState<string>("");
  // const [vatNumber, setVatNumber] = useState<string>("");
  // const [swiftBic, setSwiftBic] = useState<string>("");
  // const [iban, setIban] = useState<string>("");
  // const [vatTax, setVatTax] = useState<string>("");
  // const [currency, setCurrency] = useState<string>("");
  // const [signature, setSignature] = useState<string>("");
  // const [invoiceDate, setInvoiceDate] = useState<Moment | null>(null);
  // const [delayTax, setDelayTax] = useState<string>("");
  // const [referenceNumber, setReferenceNumber] = useState<string>("");
  // const [notes, setNotes] = useState<string>("");
  // const [sendAt, setSendAt] = useState<Moment | null>(null);
  // const [clientEmail, setClientEmail] = useState<string>("");
  // const [clientCompany, setClientCompany] = useState<string>("");
  // const [clientCompanyNumber, setClientCompanyNumber] = useState<string>("");
  // const [clientCompanyVatNumber, setClientCompanyVatNumber] = useState<string>("");
  // const [clientCompanyAddress, setClientCompanyAddress] = useState<string>("");
  // const [clientCompanyPostCode, setClientCompanyPostCode] = useState<string>("");
  // const [language, setLanguage] = useState<string>("");
  // const [recipient, setRecipient] = useState<string>("");
  // const [status, setStatus] = useState<string>("");
  // const [submitDate, setSubmitDate] = useState<Moment | null>(null);

  const [snackBar, setSnackBar] = useState<boolean>(false)

  // This won't be run unless all the input validations are met.
  const formSubmit = async () => {
    setSnackBar(true)

    setInvoice(fields);
    updateInvoice(requestParams.id, fields)
      .then(({ data }) => {
        console.log(data.invoiceNumber);
        history.replace("/invoices");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // form attributes
  const { fields, setFields, errors, handleChange, handleSubmit } = useForm(
    {
      invoiceNumber: '', companyName: '', phone: '', postCode: '', address: '',
      companyNumber: '', bankAccount: '', bankName: '', bankAddress: '', alternativeBankAccount: '',
      alternativeBankName: '', alternativeBankAddress: '', vatNumber: '', swiftBic: '',
      iban: '', vatTax: '', currency: '', signature: '',
      invoiceDate: '', delayTax: '', referenceNumber: '', notes: '',
      sendAt: '', clientEmail: '', clientCompany: '', clientCompanyNumber: '',
      clientCompanyVatNumber: '', clientCompanyAddress: '', clientCompanyPostCode: '', language: '',
      recipient: '', status: '', submitDate: ''
    },
    formValidation,
    formSubmit
  )

  useEffect(() => {
    getSingleInvoice();
  }, []);

  const getSingleInvoice = async () => {
    getInvoice(requestParams.id)
      .then(({ data }) => {
        setInvoice(data);
        console.log(data)

        // set default values
        setFields({ ...data })

      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [invoiceStatusList, setInvoiceStatusList] = useState<InvoiceStatusTypesDTO[]>([]);

  useEffect(() => {
    invoiceStatusData();
  }, []);

  const invoiceStatusData = async () => {
    getInvoiceStatusTypes()
        .then((resp) => {
          setInvoiceStatusList(resp.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const [invoiceCurrenciesList, setInvoiceCurrenciesList] = useState<InvoicesCurrenciesListDTO[]>([]);

  useEffect(() => {
    invoicesCurrenciesData();
  }, []);

  const invoicesCurrenciesData = async () => {
    getInvoiceCurrenciesList()
        .then((resp) => {
          setInvoiceCurrenciesList(resp.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const [invoiceLanguagesList, setInvoiceLanguagesList] = useState<InvoicesLanguagesListDTO[]>([]);

  useEffect(() => {
    invoicesLanguagesData();
  }, []);

  const invoicesLanguagesData = async () => {
    getInvoiceLanguagesList()
        .then((resp) => {
          setInvoiceLanguagesList(resp.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <Container>
      <Box m={5}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit} className={classes.form}>
            {/*-- 1 row --------------------- label Invoice Profile --------------------------------*/}

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Box m={2} pb={3}>
                  <Typography variant="h4">Invoice Profile</Typography>
                </Box>
              </Grid>
            </Grid>

            {/*-- 2 row -------------------  Invoice Number ----------------------------------*/}

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
                        name="invoice-number-name"
                        value={fields.invoiceNumber}
                        id="invoice-number"
                        label="Invoice Number *"
                        style={{ margin: 8 }}
                        placeholder="Invoice Number"
                        helperText="Enter Invoice Number"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.invoiceNumber || false}
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
                        name="company-name"
                        label="Company Name"
                        id="company"
                        value={fields.companyName || ""}
                        className={classes.textField}
                        helperText="Enter Company Name"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.companyName || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="phone-name"
                          label="Phone"
                          id="phone"
                          value={fields.phone || ""}
                          className={classes.textField}
                          helperText="Enter Company Phone number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.phone || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="status-label" shrink>Invoice Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status-helper"
                          name="status"
                          value={fields.status || ""}
                          onChange={handleChange}
                          label="Select Status"
                          error={errors.status || false}
                        >
                          {invoiceStatusList.map((element, i) => (
                            <MenuItem value={element.shortName}>
                              {element.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Invoice Status</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="post-code-name"
                          label="Post Code"
                          id="post-code"
                          value={fields.postCode || ""}
                          className={classes.textField}
                          helperText="Enter Post Code"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.postCode || false}
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
                            name="address-name"
                            label="Address"
                            id="address"
                            value={fields.address || ""}
                            style={{ margin: 8 }}
                            helperText="Enter Address"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.address || false}
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
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="company-number-name"
                            label="Company Number"
                            id="company-number"
                            value={fields.companyNumber || ""}
                            className={classes.textField}
                            helperText="Enter Company Number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.companyNumber || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="bank-account-name"
                            label="Bank Account"
                            id="bank-account"
                            value={fields.bankAccount || ""}
                            className={classes.textField}
                            helperText="Enter Bank Account number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.bankAccount || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="bank-name-name"
                            label="Bank Name"
                            id="bank-name"
                            value={fields.bankName || ""}
                            className={classes.textField}
                            helperText="Enter Bank Name"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.bankName || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="bank-address-name"
                            label="Bank Address"
                            id="bank-address"
                            value={fields.bankAddress || ""}
                            className={classes.textField}
                            helperText="Enter Bank Address"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.bankAddress || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 6 row --------------------------  ------------------------------------------------- */}

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
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="alternative-bank-account-name"
                            label="Alternative Bank Account"
                            id="alternative-bank-account"
                            value={fields.alternativeBankAccount || ""}
                            className={classes.textField}
                            helperText="Enter Alternative Bank Account"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.alternativeBankAccount || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="alternative-bank-name-name"
                            label="Alternative Bank Name"
                            id="alternative-bank-name"
                            value={fields.alternativeBankName || ""}
                            className={classes.textField}
                            helperText="Enter Alternative Bank Name"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.alternativeBankName || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <TextField
                            name="alternative-bank-address-name"
                            label="Alternative Bank Address"
                            id="alternative-bank-address"
                            value={fields.alternativeBankAddress || ""}
                            className={classes.textField}
                            helperText="Enter Alternative Bank Address"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.alternativeBankAddress || false}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                        name="vat-number-name"
                        label="Vat Number"
                        id="vat-number"
                        value={fields.vatNumber || ""}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText="Vat Number"
                        variant="outlined"
                        onChange={handleChange}
                        error={errors.vatNumber || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="swift-bic-name"
                          label="Swift/Bic"
                          id="swift-bic"
                          value={fields.swiftBic || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Swift/Bic number"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.swiftBic || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="iban-name"
                          label="iban"
                          id="iban"
                          value={fields.iban || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Iban"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.iban || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                          name="vat-tax-name"
                          label="Vat Tax"
                          id="vat-tax"
                          value={fields.vatTax || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Vat Tax"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.vatTax || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 320 }}>
                        <InputLabel id="currency-label" shrink>Invoice Currency</InputLabel>
                        <Select
                            labelId="currency-label"
                            id="currency-helper"
                            name="currency"
                            value={fields.currency || ""}
                            onChange={handleChange}
                            label="Select Status"
                            error={errors.currency || false}
                        >
                          {invoiceCurrenciesList.map((element, i) => (
                              <MenuItem value={element.shortName}>
                                {element.fullName}
                              </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Invoice currency</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="signature-name"
                          label="Signature"
                          id="signature"
                          value={fields.signature || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Signature"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.signature || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="invoice-date-name"
                          label="Invoice Date"
                          id="invoice-date"
                          value={fields.invoiceDate || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="date"
                          helperText="Enter Invoice Date"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.invoiceDate || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                          name="delay-tax-name"
                          label="Delay Tax"
                          id="delay-tax"
                          value={fields.vatTax || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Vat Tax"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.delayTax || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="reference-number-name"
                          label="Reference Number"
                          id="reference-number"
                          value={fields.referenceNumber || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Reference Number"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.referenceNumber || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 5 row ---------------------  -------------------------------------------------------------- */}

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
                          id="notes"
                          label="Notes"
                          name="notes"
                          value={fields.notes || ""}
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
                          error={errors.notes || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                          name="sent-at-name"
                          label="Sent At"
                          id="sent-at"
                          type="date"
                          value={fields.sendAt || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Sent At"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.sendAt || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="client-email-name"
                          label="Client Email"
                          id="client-email"
                          value={fields.clientEmail || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Email"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientEmail || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="client-company-name"
                          label="Client Company"
                          id="client-company"
                          value={fields.clientCompany || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Company"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientCompany || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="client-company-number-name"
                          label="Client Company Number"
                          id="client-company-number"
                          value={fields.clientCompanyNumber || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Company Number"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientCompanyNumber || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                          name="client-company-vat-number-name"
                          label="Client Company Vat Number"
                          id="client-company-vat-number"
                          value={fields.clientCompanyVatNumber || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Company Vat Number"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientCompanyVatNumber || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="client-company-address-name"
                          label="Client Company Address"
                          id="client-company-address"
                          value={fields.clientCompanyAddress || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Company Address"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientCompanyAddress || false}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="client-company-post-code-name"
                          label="Client Company Post Code"
                          id="client-company-post-code"
                          value={fields.clientCompanyPostCode || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Client Company Post Code"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.clientCompanyPostCode || false}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*-- 7 row ------------------------   ----------------------------------------------------*/}

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
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="language-label" shrink>Invoice Language</InputLabel>
                        <Select
                            labelId="language-label"
                            id="language-helper"
                            name="language"
                            value={fields.language || ""}
                            onChange={handleChange}
                            label="Select Language"
                            error={errors.language || false}
                        >
                          {invoiceLanguagesList.map((element, i) => (
                              <MenuItem value={element.shortName}>
                                {element.fullName}
                              </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Ticket Language</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <TextField
                          name="recipient-name"
                          label="recipient"
                          id="recipient-helper"
                          value={fields.recipient || ""}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText="Enter Recipient"
                          variant="outlined"
                          onChange={handleChange}
                          error={errors.recipient || false}
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
                        Update Invoice
                      </Button>
                    </Box>
                    <Box marginLeft={1} display="inline-block">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon/>}
                        onClick={() => history.replace("/invoices")}
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
