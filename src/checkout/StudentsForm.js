import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function StudentsForm({ handleChange, values, setValidateForm }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Student's Name is required!")
                            .max(20, "Student's Name must have 20 chars only!"),
    middleName: Yup.string().required("Father's Name is required!")
                            .max(20, "Father's Name must have 20 chars only!"),
    lastName: Yup.string()
                          // .required('Last Name is required!')
                          .max(20, 'Last Name must have 20 chars only!'),
    placeOfBirth: Yup.string().required("Place of Birth is required!").max(30, 'Place must have 30 chars only!'),
    whatsapp: Yup.string().required("WhatsApp Number is required!")
                          .matches("^([0-9]{10})$", 'WhatsApp No. must contain 10 digits!'),
    dob: Yup.string()
    .typeError('Date of Birth is required!')
    .required('Date of Birth is required!'),

    gender: Yup.string().required('Gender is required!'),
    address: Yup.string().required('Address is required!').max(150, 'Address Name must have 150 chars only!'),
    city: Yup.string().required('City is required!').max(30, 'City must have 30 chars only!'),
    state: Yup.string().required('State is required!').max(30, 'State must have 30 chars only!'),
    zip: Yup.string().required('Zip is required!')
                      .matches("^(\\d{6,6})$",'Zip must contain 6 digits!'),
    country: Yup.string().required('Country is required!').max(30, 'City must have 30 chars only!'),
    caste: Yup.string().required('Caste is required!').max(30, 'Caste must have 30 chars only!'),
    subcaste: Yup.string().max(30, 'Sub-caste must have 30 chars only!'),
    // standard: Yup.string().required('This field is required'),
    // consent: Yup.bool().oneOf([true], 'Please check the consent')
    sibling1name: Yup.string().max(100, 'Sibling Name must be 100 chars long only!'),
    sibling1std: Yup.string().max(20, 'Standard must be 20 chars long!'),
    sibling2name: Yup.string().max(100, 'Sibling Name must be 100 chars long only!'),
    sibling2std: Yup.string().max(20, 'Standard must be 20 chars long!'),

  })
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    // isFormValid = true;
    // handleChange('siblings')
    setValidateForm(true);
    Object.assign(values, data);
    // console.log(values);
    // console.log(JSON.stringify(data, null, 2));
  };

  return (
    <React.Fragment>
      <form id="student-form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" color="primary" gutterBottom>
          Student Details
        </Typography>
        <Grid container spacing={1} columnSpacing={4}>
        <Grid item xs={12} sm={4}>
            <TextField
              // required
              id="lastName"
              name="lastName"
              label="Surname"
              fullWidth
              variant="standard"
              autoFocus
              onChange={handleChange('lastName')}
              defaultValue={values.lastName}
              {...register('lastName')}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Student's Name"
              fullWidth
              variant="standard"
              onChange={handleChange('firstName')}
              defaultValue={values.firstName}
              {...register('firstName')}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="middleName"
              name="middleName"
              label="Father's name"
              fullWidth
              variant="standard"
              onChange={handleChange('middleName')}
              defaultValue={values.middleName}
              {...register('middleName')}
              error={Boolean(errors.middleName)}
              helperText={errors.middleName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="placeOfBirth"
              name="placeOfBirth"
              label="Place of Birth"
              fullWidth
              variant="standard"
              onChange={handleChange('placeOfBirth')}
              defaultValue={values.placeOfBirth}
              {...register('placeOfBirth')}
              error={Boolean(errors.placeOfBirth)}
              helperText={errors.placeOfBirth?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="whatsapp"
              type="number"
              name="whatsapp"
              label="Parent's WhatsApp No."
              fullWidth
              variant="standard"
              inputMode="numeric"
              onChange={handleChange('whatsapp')}
              defaultValue={values.whatsapp}
              {...register('whatsapp')}
              error={Boolean(errors.whatsapp)}
              helperText={errors.whatsapp?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              id="dob"
              name="dob"
              label="Date of Birth"
              fullWidth
              variant="standard"
              onChange={handleChange('dob')}
              defaultValue={values.dob}
              {...register('dob')}
              error={Boolean(errors.dob)}
              helperText={errors.dob?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel error={Boolean(errors.gender)} component="legend">Gender *</FormLabel>
            <Controller
              control={control}
              name="gender"
              defaultValue={values.gender}
              render={({ field }) => (
                <RadioGroup
                  row
                  name="gender"
                  size="small"
                  onChange={handleChange('gender')}
                  value={values.gender}
                  {...field}
                >
                  <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                </RadioGroup>
              )} />
            <FormHelperText error>{errors.gender?.message}</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} style={{paddingTop: 0}}>
            <TextField
              required
              id="caste"
              name="caste"
              label="Caste"
              fullWidth
              variant="standard"
              onChange={handleChange('caste')}
              defaultValue={values.caste}
              {...register('caste')}
              error={Boolean(errors.caste)}
              helperText={errors.caste?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{paddingTop: 0}}>
            <TextField
              required
              id="Admission Looking for Class"
              name="Admission Looking for Class"
              label="Admission Looking for Class"
              fullWidth
              variant="standard"
              onChange={handleChange('Admission Looking for Classsubcaste')}
              defaultValue={values.subcaste}
              {...register('suAdmission Looking for Classbcaste')}
              error={Boolean(errors.subcaste)}
              helperText={errors.subcaste?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} >
            <TextField
              id="address"
              name="address"
              label="Address"
              multiline
              rows={2}
              fullWidth
              // style={{minHeight: "2.875em", display: 'block !important'}}
              variant="standard"
              onChange={handleChange('address')}
              defaultValue={values.address}
              {...register('address')}
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="standard"
              onChange={handleChange('city')}
              defaultValue={values.city}
              {...register('city')}
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State"
              fullWidth
              variant="standard"
              onChange={handleChange('state')}
              defaultValue={values.state}
              {...register('state')}
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              type="number"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              inputMode="numeric"
              onChange={handleChange('zip')}
              defaultValue={values.zip}
              {...register('zip')}
              error={Boolean(errors.zip)}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleChange('country')}
              defaultValue={values.country}
              {...register('country')}
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Other Siblings in this School
            </Typography>
          </Grid>
          <Grid item xs={12} style={{paddingTop: 0}}>
            {/* <List disablePadding > */}
              <ListItem style={{paddingTop: 0}}>
                <ListItemAvatar sx={{ textAlign: "center" }}>
                  {"1."}
                </ListItemAvatar>
                <Grid container item xs={12} columnSpacing={4}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      name="sibling1name"
                      label="Name"
                      fullWidth
                      size="small"
                      variant="standard"
                      // onChange={handleChange('sibling1name')}
                      // defaultValue={values.sibling1name}
                      onChange={handleChange('sibling1name')}
                      defaultValue={values.sibling1name}
                      {...register('sibling1name')}
                      error={Boolean(errors.sibling1name)}
                      helperText={errors.sibling1name?.message}
                    />
                  </Grid>
                  <Grid item xs={10} sm={4}>
                    <TextField
                      id="std"
                      name="sibling1std"
                      label="Standard"
                      fullWidth
                      size="small"
                      variant="standard"
                      // onChange={handleChange('sibling1std')}
                      // defaultValue={values.sibling1std}
                      onChange={handleChange('sibling1std')}
                      defaultValue={values.sibling1std}
                      {...register('sibling1std')}
                      error={Boolean(errors.sibling1std)}
                      helperText={errors.sibling1std?.message}
                    />
                  </Grid>

                </Grid>
              </ListItem>
              <ListItem style={{paddingTop: 0}}>
                <ListItemAvatar sx={{ textAlign: "center" }}>
                  {"2."}
                </ListItemAvatar>
                <Grid container item xs={12} rowSpacing={1} columnSpacing={4}>
                  <Grid item xs={10} sm={6}>
                    <TextField
                      name="sibling2name"
                      label="Name"
                      fullWidth
                      size="small"
                      variant="standard"
                      onChange={handleChange('sibling2name')}
                      defaultValue={values.sibling2name}
                      {...register('sibling2name')}
                      error={Boolean(errors.sibling2name)}
                      helperText={errors.sibling2name?.message}
                    />
                  </Grid>
                  <Grid item xs={10} sm={4}>
                    <TextField
                      id="sibling2std"
                      name="sibling2std"
                      label="Standard"
                      fullWidth
                      size="small"
                      variant="standard"
                      onChange={handleChange('sibling2std')}
                      defaultValue={values.sibling2std}
                      {...register('sibling2std')}
                      error={Boolean(errors.sibling2std)}
                      helperText={errors.sibling2std?.message}
                    />
                  </Grid>
                </Grid>
              </ListItem>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="standard"
              name="standard"
              label="Admission Required for Standard"
              fullWidth
              variant="standard"
              onChange={handleChange('standard')}
              defaultValue={values.standard}
              {...register('standard')}
              error={Boolean(errors.standard)}
              helperText={errors.caste?.standard}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastSchool"
              name="lastSchool"
              label="Last School Attended"
              fullWidth
              variant="standard"
              onChange={handleChange('lastSchool')}
              defaultValue={values.lastSchool}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Divider variant="middle" color="grey" sx={{my: 1}}><Chip label="UNDERTAKING" />
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked
                  inputProps={{ readOnly: true }}
                />
              }
              label={<Typography variant="subtitle1" align="center"> I have understood the admission procedure of Santhom School, Dombivli and agree to follow it.
                I undertake to respect the School's philosophy and abide by the rules of the School, If admission is granted to my child/ward.</Typography>}
            />
            <FormHelperText error={Boolean(errors.consent)}>{errors.consent?.message}</FormHelperText>
          </Grid>
        </Grid>
        <Button id="sform1" type="submit" sx={{ display: 'none' }} onClick={handleSubmit(onSubmit)} />
      </form>
    </React.Fragment>
  );
}