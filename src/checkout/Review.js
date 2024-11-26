import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import StudentsForm from './StudentsForm';
import ParentsForm from './ParentsForm';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

export default function ReviewForm({ handleChange, values }) {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} mb={1}>
        <FormControlLabel
          label={<Typography fontWeight="600">Registration No.</Typography>}
          labelPlacement="start"
          color="primary"
          control={
            <Input dir="rtl" size="small" sx={{ fontSize: "18px", fontWeight: "600", maxWidth: "7rem" }}
              value={values.regNo} />
          }
        />
      </Grid>
      <StudentsForm
        handleChange={handleChange}
        values={values}
      />
      &nbsp;
      <Divider color="grey" sx={{mb: 2}}/>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={3} alignSelf="center">
          <Typography variant="h6" textAlign="end">Father's Signature</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="fathersign"
            name="fathersign"
            value=""
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3} alignSelf="center">
        <Typography variant="h6"  textAlign="end">Mother's Signature</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
         <TextField
            id="mothersign"
            name="mothersign"
            value=""
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Divider variant="fullWidth" color="grey" sx={{ my: 1 }} />
      <ParentsForm
        handleChange={handleChange}
        values={values}
      />
      {/* &nbsp;
      <Divider />
      <Grid container sx={{ fontWeight: "300", fontSize: "small" }}>
        <ul type="disk">
          <li>
          Submission of documents and payment of total fees can be completed from 1st of December 2024, Monday to Saturday, between 9:00 a.m. and 11:00 a.m.
          </li>
          <li>TDocuments to be Submitted :-
          </li>
          <li>This school is recognized unaided english medium school. There are no fee concessions.
            Fees are subject to rise.
          </li>
          <li>No Refund of the fees, once paid.
          </li>
          <li>The school has not given permission to any person to collect donations in the name of
            the school for admission.
          </li>
        </ul>
      </Grid> */}

    </React.Fragment>
  );
}