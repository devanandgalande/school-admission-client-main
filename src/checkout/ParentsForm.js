import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';

import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ParentsForm({ handleChange, values, setParentFormValid }) {

  const validSchema = Yup.object().shape({
    fatherName: Yup.string().required('Father name is required!').max(50, 'Name must have 50 chars only!'),
    fatherAge: Yup.number().typeError('Age is required!')
                          .required('Age is required!')
                          .min(10, 'Age must be greater than or equal to 10!')
                          .max(150, 'Age must be less than or equal to 150!')
                          .integer('Age is not valid!'),
    fatherProfession: Yup.string().required('Profession is required!').max(20, 'Profession must have 20 chars only!'),
    fatherLang: Yup.string().required('Mother Tongue is required!').max(20, 'Field must have 20 chars only!'),
    fatherEducation: Yup.string().required('Education is required!').max(20, 'Field must have 20 chars only!'),
    fatherContact: Yup.string().required('Contact is required!')
                               .matches("^([0-9]{10})$", 'Contact no. must contain 10 digits!'),
    fatherIncome: Yup.number().typeError('Income details is required!')
                              .required('Income details is required!')
                              .min(0, 'Income must be positive!'),
    fatherLangKnown: Yup.string().required('Languages known is required!').max(50, 'Field must have 50 chars only!'),
    motherName: Yup.string().required('Mother name is required!').max(50, 'Name must have 50 chars only!'),
    motherAge: Yup.number().typeError('Age is required!')
                          .required('Age is required!')
                          .min(10, 'Age must be greater than or equal to 10!')
                          .max(150, 'Age must be less than or equal to 150!')
                          .integer('Age must be an Integer!'),
    motherProfession: Yup.string().notRequired().max(20, 'Field must have 20 chars only!'),
    motherLang: Yup.string().required('Mother Tongue is required!').max(20, 'Field must have 20 chars only!'),
    motherEducation: Yup.string().required('Education is required!').max(20, 'Field must have 20 chars only!'),
    motherContact: Yup.string().required('Contact is required!')
                              .matches("^([0-9]{10})$", 'Contact no. must contain 10 digits!'),
    motherIncome: Yup.number().notRequired()
                              .min(0, 'Income must be positive!')
                              .nullable(true)
                              .transform((_, val) => val ? Number(val) : null),
    motherLangKnown: Yup.string().required('Languages known is required!'),
    mentorName: Yup.string().max(50, 'Name must have 50 chars only!').nullable(true),
    mentorAge: Yup.number().notRequired().nullable(true)
                          .transform((_, val) => val ? Number(val) : null)
                          .max(150, 'Age must be less than or equal to 150!')
                          .integer('Age must be a valid number!'),
    mentorProfession: Yup.string().notRequired().max(20, 'Max 20 chars allowed!').nullable(true),
    mentorLang: Yup.string().notRequired().max(20, 'Max 20 chars allowed!').nullable(true),
    mentorEducation: Yup.string().notRequired().max(20, 'Max 20 chars allowed!').nullable(true),
    mentorContact: Yup.string().notRequired().nullable(true)
                      .transform((_, val) => val ? String(val) : null)
                      .matches("^([0-9]{10}|null)$", 'Contact no. must contain 10 digits!')
                      .max(10, 'Max 10 chars allowed!'),
    mentorIncome: Yup.number().min(0,'Income must be positive')
                      .nullable(true)
                      .transform((_, val) => val ? Number(val) : null)
                      ,

    
  });

  const { register, control, handleSubmit, formState: { errors }, setFocus } = useForm({
    resolver: yupResolver(validSchema),
  });

  React.useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null);
  
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const onSubmit = data => {
    setParentFormValid(true);
    Object.assign(values, data);
    // console.log(data, values);
  }

  return (
    <React.Fragment>
        <form id="parent-form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" color="primary" gutterBottom>
            Child's Father's Details
          </Typography>
          <Grid container spacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fatherName"
                name="fatherName"
                label="Name"
                fullWidth
                variant="standard"
                onChange={handleChange('fatherName')}
                defaultValue={values.fatherName}
                autoFocus
                {...register('fatherName')}
                error={Boolean(errors.fatherName)}
                helperText={errors.fatherName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="fatherAge"
                control={control}
                defaultValue={values.fatherAge}
                render={({ field }) => (
                  <TextField
                    required
                    type="number"
                    id="fatherAge"
                    name="fatherAge"
                    label="Age"
                    fullWidth
                    variant="standard"
                    onChange={handleChange('fatherAge')}
                    inputMode="numeric"
                    value={values.fatherAge}
                    // {...register('fatherAge')}
                    {...field}
                    error={Boolean(errors.fatherAge)}
                    helperText={errors.fatherAge?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="fatherProfession"
                control={control}
                defaultValue={values.fatherProfession}
                render={({ field }) => (
                  <TextField
                    required
                    id="fatherProfession"
                    name="fatherProfession"
                    label="Profession"
                    fullWidth
                    variant="standard"
                    onChange={handleChange('fatherProfession')}
                    value={values.fatherProfession}
                    // refs={register()}
                    {...field}
                    error={Boolean(errors.fatherProfession)}
                    helperText={errors.fatherProfession?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fatherLang"
                name="fatherLang"
                label="Mother Tongue"
                fullWidth
                variant="standard"
                onChange={handleChange('fatherLang')}
                defaultValue={values.fatherLang}
                {...register('fatherLang')}
                error={Boolean(errors.fatherLang)}
                helperText={errors.fatherLang?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fatherEducation"
                name="fatherEducation"
                label="Educational Qualification"
                fullWidth
                variant="standard"
                onChange={handleChange('fatherEducation')}
                defaultValue={values.fatherEducation}
                {...register('fatherEducation')}
                error={Boolean(errors.fatherEducation)}
                helperText={errors.fatherEducation?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fatherContact"
                type="number"
                name="fatherContact"
                label="Contact No."
                fullWidth
                variant="standard"
                onChange={handleChange('fatherContact')}
                defaultValue={values.fatherContact}
                {...register('fatherContact')}
                error={Boolean(errors.fatherContact)}
                helperText={errors.fatherContact?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="fatherIncome"
                control={control}
                defaultValue={values.fatherIncome}
                render={({ field }) => (
                  <TextField
                    required
                    type="number"
                    name="fatherIncome"
                    label="Monthly Income"
                    fullWidth
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    variant="standard"
                    onChange={handleChange('fatherIncome')}
                    inputMode="numeric"
                    value={values.fatherIncome}
                    {...field}
                    error={Boolean(errors.fatherIncome)}
                    helperText={errors.fatherIncome?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="fatherLangKnown"
                label="Languages Known"
                fullWidth
                variant="standard"
                onChange={handleChange('fatherLangKnown')}
                defaultValue={values.fatherLangKnown}
                {...register('fatherLangKnown')}
                error={Boolean(errors.fatherLangKnown)}
                helperText={errors.fatherLangKnown?.message}
              />
            </Grid>

          </Grid>

          <Typography variant="h6" mt={2} color="primary" gutterBottom>
            Child's Mother's Details
          </Typography>
          <Grid container spacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="motherName"
                name="motherName"
                label="Name"
                fullWidth
                variant="standard"
                onChange={handleChange('motherName')}
                defaultValue={values.motherName}
                {...register('motherName')}
                error={Boolean(errors.motherName)}
                helperText={errors.motherName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="motherAge"
                control={control}
                defaultValue={values.motherAge}
                render={({ field }) => (
                  <TextField
                    required
                    type="number"
                    id="motherAge"
                    name="motherAge"
                    label="Age"
                    fullWidth
                    variant="standard"
                    onChange={handleChange('motherAge')}
                    inputMode="numeric"
                    value={values.motherAge === 0 ? '' : values.motherAge}
                    // {...register('motherAge')}
                    {...field}
                    error={Boolean(errors.motherAge)}
                    helperText={errors.motherAge?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="motherProfession"
                name="motherProfession"
                label="Profession"
                fullWidth
                variant="standard"
                onChange={handleChange('motherProfession')}
                defaultValue={values.motherProfession?values.motherProfession:''}
                {...register('motherProfession')}
                error={Boolean(errors.motherProfession)}
                helperText={errors.motherProfession?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="motherLang"
                name="motherLang"
                label="Mother Tongue"
                fullWidth
                variant="standard"
                onChange={handleChange('motherLang')}
                defaultValue={values.motherLang}
                {...register('motherLang')}
                error={Boolean(errors.motherLang)}
                helperText={errors.motherLang?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="motherEducation"
                name="motherEducation"
                label="Educational Qualification"
                fullWidth
                variant="standard"
                onChange={handleChange('motherEducation')}
                defaultValue={values.motherEducation}
                {...register('motherEducation')}
                error={Boolean(errors.motherEducation)}
                helperText={errors.motherEducation?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="motherContact"
                type="number"
                name="motherContact"
                label="Contact No."
                fullWidth
                variant="standard"
                onChange={handleChange('motherContact')}
                defaultValue={values.motherContact}
                {...register('motherContact')}
                error={Boolean(errors.motherContact)}
                helperText={errors.motherContact?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="motherIncome"
                control={control}
                defaultValue={values.motherIncome}
                render={({ field }) => (
                  <TextField
                    type="number"
                    name="motherIncome"
                    label="Monthly Income"
                    fullWidth
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    variant="standard"
                    onChange={handleChange('motherIncome')}
                    inputMode="numeric"
                    value={values.motherIncome ? values.motherIncome : ''}
                    {...field}
                    error={Boolean(errors.motherIncome)}
                    helperText={errors.motherIncome?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="motherLangKnown"
                label="Languages Known"
                fullWidth
                variant="standard"
                onChange={handleChange('motherLangKnown')}
                defaultValue={values.motherLangKnown}
                {...register('motherLangKnown')}
                error={Boolean(errors.motherLangKnown)}
                helperText={errors.motherLangKnown?.message}
              />
            </Grid>

          </Grid>

          <Typography variant="h6" mt={2} color="primary" gutterBottom>
            Family Mentor Details (who can attend to child's studies)
          </Typography>
          <Grid container spacing={1} columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorName"
                name="mentorName"
                label="Name"
                fullWidth
                variant="standard"
                onChange={handleChange('mentorName')}
                defaultValue={values.mentorName}
                {...register('mentorName')}
                error={Boolean(errors.mentorName)}
                helperText={errors.mentorName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Controller
                name="mentorAge"
                control={control}
                defaultValue={values.mentorAge}
                render={({ field }) => (
              <TextField
                type="number"
                id="mentorAge"
                name="mentorAge"
                label="Age"
                fullWidth
                variant="standard"
                inputMode="numeric"
                onChange={handleChange('mentorAge')}
                value={values.mentorAge ? values.mentorAge : ''}
                {...field}
                error={Boolean(errors.mentorAge)}
                helperText={errors.mentorAge?.message}
              />
              )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorProfession"
                name="mentorProfession"
                label="Profession"
                fullWidth
                variant="standard"
                onChange={handleChange('mentorProfession')}
                defaultValue={values.mentorProfession}
                {...register('mentorProfession')}
                error={Boolean(errors.mentorProfession)}
                helperText={errors.mentorProfession?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorLang"
                name="mentorLang"
                label="Mother Tongue"
                fullWidth
                variant="standard"
                onChange={handleChange('mentorLang')}
                defaultValue={values.mentorLang}
                {...register('mentorLang')}
                error={Boolean(errors.mentorLang)}
                helperText={errors.mentorLang?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorEducation"
                name="mentorEducation"
                label="Educational Qualification"
                fullWidth
                variant="standard"
                onChange={handleChange('mentorEducation')}
                defaultValue={values.mentorEducation}
                {...register('mentorEducation')}
                error={Boolean(errors.mentorEducation)}
                helperText={errors.mentorEducation?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorContact"
                type="number"
                name="mentorContact"
                label="Contact No."
                fullWidth
                variant="standard"
                onChange={handleChange('mentorContact')}
                // defaultValue={values.mentorContact}
                {...register('mentorContact')}
                error={Boolean(errors.mentorContact)}
                helperText={errors.mentorContact?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="mentorIncome"
                control={control}
                defaultValue={values.mentorIncome}
                render={({ field }) => (
                  <TextField
                    type="number"
                    name="mentorIncome"
                    label="Monthly Income"
                    fullWidth
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    variant="standard"
                    onChange={handleChange('mentorIncome')}
                    inputMode="numeric"
                    value={values.mentorIncome ? values.mentorIncome : ''}
                    {...field}
                    error={Boolean(errors.mentorIncome)}
                    helperText={errors.mentorIncome?.message}
                  />
                )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mentorRelation"
                name="mentorRelation"
                label="Relation"
                fullWidth
                variant="standard"
                onChange={handleChange('mentorRelation')}
                defaultValue={values.mentorRelation}
                {...register('mentorRelation')}
                error={Boolean(errors.mentorRelation)}
                helperText={errors.mentorRelation?.message}
              />
            </Grid>
          </Grid>
          &nbsp;
      <Divider variant="middle"><Chip label="Notice" /> </Divider>
      <Grid container item sx={{ fontWeight: "600",color:"rgba(0,0,0,1)", fontSize: "small" }}>
        <ul type="disk">
          
          <li>
            This school is recognized Unaided English Medium School. There are no fee concessions.
            Fees are subject to rise.
          </li>
          <li>No Refund of the fees, once paid.
          </li>
          <li>The school accepts no donations. (The school has not given permission to any person to collect donations in the name of
            the school for admission.)
          </li>
        </ul>
      </Grid>
          <Button type="submit" id="parentformbtn" sx={{ display: 'none' }} onClick={handleSubmit(onSubmit)}>cLik</Button>
        </form>
    </React.Fragment>
  );
}