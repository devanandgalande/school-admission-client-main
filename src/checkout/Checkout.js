import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

import ParentsForm from './ParentsForm';
import StudentsForm from './StudentsForm';
import Review from './Review';
import studentdataService from '../services/studentdata.service';
import logo from '../logo_only.svg';
import heading from '../heading.svg';

function Copyright() {
  return (
    <Typography className="no-print" variant="body2" color="whitesmoke" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Santhom School, Dombivli Powered By Pixebee
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Student Details', 'Parents Details', 'Print'];

const data = {
  regNo: '',
  firstName: '',
  middleName: '',
  lastName: '',
  placeOfBirth: '',
  whatsapp: '',
  dob: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  caste: '',
  subcaste: '',
  // siblings: [{name: '', std: ''}, {name: '', std: ''}],
  sibling1name: '',
  sibling1std: '',
  sibling2name: '',
  sibling2std: '',
  // standard: '',
  // lastSchool: '',
  // page 2
  fatherName: '',
  fatherAge: 0,
  fatherProfession: '',
  fatherLang: '',
  fatherEducation: '',
  fatherContact: '',
  fatherIncome: 0,
  fatherLangKnown: '',

  motherName: '',
  motherAge: 0,
  motherProfession: '',
  motherLang: '',
  motherEducation: '',
  motherContact: '',
  motherIncome: 0,
  motherLangKnown: '',

  mentorName: '',
  mentorRelation: '',
  mentorAge: 0,
  mentorProfession: '',
  mentorLang: '',
  mentorEducation: '',
  mentorContact: '',
  mentorIncome: 0

}

const theme = createTheme({
  palette: {
    text: {
      secondary: "rgb(0 0 0 / 80%);",
    },
  },


});

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [inputs, setInputs] = React.useState(data);
  const [errmsg, seterrmsg] = React.useState('');
  const [validateForm, setValidateForm] = React.useState(false);
  const [parentFormValid, setParentFormValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const values = inputs

  React.useEffect(() => {
    if (validateForm) {
      setActiveStep(activeStep + 1);
      // setValidateForm(false);
    }
    if (parentFormValid) {
      handleFormSubmit();
      setParentFormValid(false);
    }
    return () => setValidateForm(false);
    // eslint-disable-next-line
  }, [validateForm, parentFormValid]);

  const handleChange = input => e => {
    setInputs({
      ...inputs,
      [input]: e.target.value.toUpperCase()
    })
  }

  const handleNext = () => {
    document.getElementById("sform1").click();
  };

  const handleBack = () => {
    seterrmsg('');
    setActiveStep(activeStep - 1);
  };


  const handleFormSubmit = () => {
    seterrmsg('');
    setLoading(true);
    studentdataService.create(inputs)
      .then((response) => {
        // console.log(response);
        setInputs(response.data);
        // handleNext()
        setLoading(false);
        setActiveStep(activeStep + 1)
      })
      .catch(err => {
        // console.log(err);
        seterrmsg(err.message)
        setLoading(false);
      })
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <StudentsForm
          handleChange={handleChange}
          values={values}
          // setInputs={setInputs}
          setValidateForm={setValidateForm}
        />;
      case 1:
        return <ParentsForm
          handleChange={handleChange}
          values={values}
          setParentFormValid={setParentFormValid}
        />;
      case 2:
        return (<div className="printable">
          <Review
            handleChange={handleChange}
            values={values}
          />
        </div>);
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}

      >
        <Box textAlign="center" className="no-print"><img src={logo} alt="logo" className="svg" /></Box>
        <Box textAlign="center" className="printable"><img src={heading} alt="logo" className="svg-heading" /></Box>

      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 3 }} >
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 1.5 }, p: { xs: 2, md: 2 } }} >
          <div className="no-print">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <React.Fragment>
            {activeStep === steps.length - 1 ? (
              <React.Fragment>
                <div className="no-print">
                  <Grid container item sx={{ fontWeight: "300", fontSize: "normal" }}>
                    <Typography variant="h6" color="primary">
                      Notice
                    </Typography>
                    <ul type="disk">
                      <li>
                        Acquiring online registration form does not guarantee admission in the school,
                        the seats available are limited.
                      </li>
                      <li>Forms should be submitted on <strong>9th &amp; 10th Jan 2024 </strong> between 
                      <strong> 8:30 AM to 12:30 PM</strong> at the school office.
                      <ul id="cust_list_item1" className="cust_list_type">
                        <li>Form No. N0001 to N0200 on Tuesday, 9th January, 2024</li>
                        <li>Form No. N0201 and above on Wednesday, 10th January, 2024</li>
                      </ul>
                      </li>
                    </ul>
                    </Grid>
                    <Grid>
                    <Typography variant="h6" color="primary" >
                      Submission
                    </Typography>
                    <ul type="disk">
                      <li>Do pay Rs.500/- in cash at the school office.</li>
                      <li>Print out of online registration form with parent's sign is mandatory.</li>
                      <li>Original and Xerox copy of Birth Certificate (Original Birth Certificate will be given back).
                      </li>
                      <li>Christians should attach Baptism Certificate.</li>
                    </ul>
                  </Grid>
                  <Typography variant="h5" gutterBottom>
                    Thank you for registration.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your Registration number is <strong><u>{inputs.regNo}</u></strong>. Please take printout of your
                    application from below.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {<Button
                      variant="contained"
                      onClick={() => window.print()}
                      sx={{ mt: 3, ml: 1 }}
                    > Download Application Form</Button>
                    }
                  </Box>
                </div>
                {getStepContent(2)}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button disabled={loading} onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 2 ?
                    <Button
                      variant="contained"
                      onClick={() => { document.getElementById("parentformbtn").click(); }}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={loading}
                    >{loading && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                      Submit</Button>
                    :
                    <Button
                      inputMode=""
                      variant="contained"
                      type="submit"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    > Next </Button>
                  }

                </Box>
                {errmsg ? <FormHelperText error>{'Server error! Plese try again later.'}</FormHelperText> : ''}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}