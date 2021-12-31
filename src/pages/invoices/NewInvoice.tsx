import React, {FormEvent, useEffect, useState} from "react";
import "./NewInvoice.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
    InvoicesCurrenciesListDTO, InvoicesLanguagesListDTO,
    InvoiceStatusTypesDTO
} from "../../service/invoices/types";
import {
    getInvoiceCurrenciesList,
    getInvoiceLanguagesList,
    getInvoiceStatusTypes,
    postInvoice
} from "../../service/invoices";
import {useHistory} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {FormControl} from "@mui/material";
import {Moment} from "moment";

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

export default function NewInvoice() {
    const classes = useStyles();
    let history = useHistory();

    const [invoiceNumber, setInvoiceNumber] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [postCode, setPostCode] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [companyNumber, setCompanyNumber] = useState<string>("");
    const [bankAccount, setBankAccount] = useState<string>("");
    const [bankName, setBankName] = useState<string>("");
    const [bankAddress, setBankAddress] = useState<string>("");
    const [alternativeBankAccount, setAlternativeBankAccount] = useState<string>("");
    const [alternativeBankName, setAlternativeBankName] = useState<string>("");
    const [alternativeBankAddress, setAlternativeBankAddress] = useState<string>("");
    const [vatNumber, setVatNumber] = useState<string>("");
    const [swiftBic, setSwiftBic] = useState<string>("");
    const [iban, setIban] = useState<string>("");
    const [vatTax, setVatTax] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [signature, setSignature] = useState<string>("");
    const [invoiceDate, setInvoiceDate] = useState<Moment | null>(null);
    const [delayTax, setDelayTax] = useState<string>("");
    const [referenceNumber, setReferenceNumber] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [sendAt, setSendAt] = useState<Moment | null>(null);
    const [clientEmail, setClientEmail] = useState<string>("");
    const [clientCompany, setClientCompany] = useState<string>("");
    const [clientCompanyNumber, setClientCompanyNumber] = useState<string>("");
    const [clientCompanyVatNumber, setClientCompanyVatNumber] = useState<string>("");
    const [clientCompanyAddress, setClientCompanyAddress] = useState<string>("");
    const [clientCompanyPostCode, setClientCompanyPostCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [submitDate, setSubmitDate] = useState<Moment | null>(null);

    // This won't be run unless all the input validations are met.
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This console.log won't give errors
        // console.log(data);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        const body = {
            invoiceNumber,
            companyName,
            phone,
            postCode,
            address,
            companyNumber,
            bankAccount,
            bankName,
            bankAddress,
            alternativeBankAccount,
            alternativeBankName,
            alternativeBankAddress,
            vatNumber,
            swiftBic,
            iban,
            vatTax,
            currency,
            signature,
            invoiceDate,
            delayTax,
            referenceNumber,
            notes,
            sendAt,
            clientEmail,
            clientCompany,
            clientCompanyNumber,
            clientCompanyVatNumber,
            clientCompanyAddress,
            clientCompanyPostCode,
            language,
            recipient,
            status,
            submitDate
        }
        postInvoice(body)
            .then(({ data }) => {
                console.log(data.invoiceNumber);
                history.replace("/invoices");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
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
                    <form onSubmit={onSubmit} className={classes.form}>
                        {/*-- 1 row --------------------- label New Invoice --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">New Invoice</Typography>
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
                                                id="invoice-number"
                                                label="Invoice Number *"
                                                style={{ margin: 8 }}
                                                value={invoiceNumber}
                                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                                placeholder="Invoice Number"
                                                helperText="Enter Invoice Number"
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
                                                label="Company Name"
                                                id="company-name"
                                                className={classes.textField}
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                helperText="Enter Company Name"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Phone"
                                                    id="phone"
                                                    className={classes.textField}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    helperText="Enter Company Phone number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="status-label">Invoice Status</InputLabel>
                                                <Select
                                                    labelId="status-label"
                                                    id="status-helper"
                                                    value={status}
                                                    label="Select Status"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                >
                                                    {invoiceStatusList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Invoice Status</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Post Code"
                                                    id="post-code"
                                                    className={classes.textField}
                                                    value={postCode}
                                                    onChange={(e) => setPostCode(e.target.value)}
                                                    helperText="Enter Post Code"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 4 row ----------------------------- Address ---------------------------------------------------------- */}

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
                                                id="address"
                                                label="Address"
                                                style={{ margin: 8 }}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Company Address"
                                                helperText="Enter Company Address"
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
                                            <TextField
                                                label="Company Number"
                                                id="company-number"
                                                className={classes.textField}
                                                value={companyNumber}
                                                onChange={(e) => setCompanyNumber(e.target.value)}
                                                helperText="Enter Company Number"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Bank Account"
                                                    id="bank-account"
                                                    className={classes.textField}
                                                    value={bankAccount}
                                                    onChange={(e) => setBankAccount(e.target.value)}
                                                    helperText="Enter Bank Account number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Bank Name"
                                                    id="bank-name"
                                                    className={classes.textField}
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                    helperText="Enter Bank Name"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Bank Address"
                                                    id="bank-address"
                                                    className={classes.textField}
                                                    value={bankAddress}
                                                    onChange={(e) => setBankAddress(e.target.value)}
                                                    helperText="Enter Bank Address"
                                                    variant="outlined"
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
                                            <TextField
                                                label="Alternative Bank Account"
                                                id="alternative-bank-account"
                                                className={classes.textField}
                                                value={alternativeBankAccount}
                                                onChange={(e) => setAlternativeBankAccount(e.target.value)}
                                                helperText="Enter Alternative Bank Account"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Alternative Bank Name"
                                                    id="alternative-bank-name"
                                                    className={classes.textField}
                                                    value={alternativeBankName}
                                                    onChange={(e) => setAlternativeBankName(e.target.value)}
                                                    helperText="Enter Alternative Bank Name"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Alternative Bank Address"
                                                    id="alternative-bank-address"
                                                    className={classes.textField}
                                                    value={alternativeBankAddress}
                                                    onChange={(e) => setAlternativeBankAddress(e.target.value)}
                                                    helperText="Enter Alternative Bank Address"
                                                    variant="outlined"
                                                />
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
                                                    label="Vat Number"
                                                    id="vat-number"
                                                    className={classes.textField}
                                                    value={vatNumber}
                                                    onChange={(e) => setVatNumber(e.target.value)}
                                                    helperText="Enter Vat Number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Swift/Bic"
                                                    id="swift-bic"
                                                    className={classes.textField}
                                                    value={swiftBic}
                                                    onChange={(e) => setSwiftBic(e.target.value)}
                                                    helperText="Enter Swift/Bic number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="iban"
                                                    id="iban"
                                                    className={classes.textField}
                                                    value={iban}
                                                    onChange={(e) => setIban(e.target.value)}
                                                    helperText="Enter Iban"
                                                    variant="outlined"
                                                />
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
                                                label="Vat Tax"
                                                id="vat-tax"
                                                className={classes.textField}
                                                value={vatTax}
                                                onChange={(e) => setVatTax(e.target.value)}
                                                helperText="Enter Vat Tax"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="currency-label">Invoice Currency</InputLabel>
                                                <Select
                                                    labelId="invoice-currency-label"
                                                    id="invoice-currency-helper"
                                                    value={currency}
                                                    label="Select Currency"
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                    required
                                                >
                                                    {invoiceCurrenciesList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Currency</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Signature"
                                                    id="signature"
                                                    className={classes.textField}
                                                    value={signature}
                                                    onChange={(e) => setSignature(e.target.value)}
                                                    helperText="Enter Signature"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Invoice Date"
                                                    id="invoice-date"
                                                    type="date"
                                                    helperText="Select Invoice Date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={invoiceDate}
                                                    variant="outlined"
                                                    //@ts-ignore
                                                    onInput={(e) => setInvoiceDate(new Date(e.target.value))}
                                                />
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
                                                label="Delay Tax"
                                                id="delay-tax"
                                                className={classes.textField}
                                                value={delayTax}
                                                onChange={(e) => setDelayTax(e.target.value)}
                                                helperText="Enter Delay Tax"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Reference Number"
                                                    id="reference-number"
                                                    className={classes.textField}
                                                    value={referenceNumber}
                                                    onChange={(e) => setReferenceNumber(e.target.value)}
                                                    helperText="Enter Invoice Reference Number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 4 row -----------------------------    ---------------------------------------------------------- */}

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
                                                style={{ margin: 8 }}
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Notes"
                                                helperText="Enter Notes"
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

                        {/*-- 8 row -----  ---------------------------------------*/}


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
                                                    label="Sent At"
                                                    id="sent-at"
                                                    type="date"
                                                    helperText="Select Sent At"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={sendAt}
                                                    variant="outlined"
                                                    //@ts-ignore
                                                    onInput={(e) => setSendAt(new Date(e.target.value))}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="Client Email"
                                                id="client-email"
                                                className={classes.textField}
                                                value={clientEmail}
                                                onChange={(e) => setClientEmail(e.target.value)}
                                                helperText="Enter Client Email"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Client Company"
                                                    id="client-company"
                                                    className={classes.textField}
                                                    value={clientCompany}
                                                    onChange={(e) => setClientCompany(e.target.value)}
                                                    helperText="Enter Client Company"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Client Company Number"
                                                    id="client-company-number"
                                                    className={classes.textField}
                                                    value={clientCompanyNumber}
                                                    onChange={(e) => setClientCompanyNumber(e.target.value)}
                                                    helperText="Enter Client Company Number"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>



                        {/*-- 8 row -----  ---------------------------------------*/}

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
                                                label="Client Company Vat Number"
                                                id="client-company-vat-number"
                                                className={classes.textField}
                                                value={clientCompanyVatNumber}
                                                onChange={(e) => setClientCompanyVatNumber(e.target.value)}
                                                helperText="Enter Client Company Vat Number"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Client Company Address"
                                                    id="client-company-address"
                                                    className={classes.textField}
                                                    value={clientCompanyAddress}
                                                    onChange={(e) => setClientCompanyAddress(e.target.value)}
                                                    helperText="Enter Client Company Address"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Client Company Post Code"
                                                    id="client-company-post-code"
                                                    className={classes.textField}
                                                    value={clientCompanyPostCode}
                                                    onChange={(e) => setClientCompanyPostCode(e.target.value)}
                                                    helperText="Enter Client Company Post Code"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        {/*-- 8 row -----  ---------------------------------------*/}

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
                                                <InputLabel id="language-label">Invoice Language</InputLabel>
                                                <Select
                                                    labelId="invoice-language-label"
                                                    id="invoice-language-helper"
                                                    value={language}
                                                    label="Select Language"
                                                    onChange={(e) => setLanguage(e.target.value)}
                                                    required
                                                >
                                                    {invoiceLanguagesList.map((element) => (
                                                        <MenuItem value={element.shortName}>{element.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Language</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Recipient"
                                                    id="recipient"
                                                    className={classes.textField}
                                                    value={recipient}
                                                    onChange={(e) => setRecipient(e.target.value)}
                                                    helperText="Enter Recipient"
                                                    variant="outlined"
                                                />
                                            </FormControl>
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
                                                Create Invoice
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
