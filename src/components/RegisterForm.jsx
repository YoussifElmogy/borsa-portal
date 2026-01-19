import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registerImg from "../assets/egx-bg.jpg";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const ToastAlert = forwardRef(function ToastAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nextFaceLogo from "../assets/egx-logo.svg";
import cairoImage from "../assets/cairo.png";
import rightLogo from "../assets/right-logo.svg";

// Validation schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  middleName: yup
    .string()
    .required("Middle name is required")
    .min(2, "Middle name must be at least 2 characters")
    .max(50, "Middle name must not exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  age: yup
    .string()
    .required("Age is required"),
  profession: yup
    .string()
    .required("Profession is required"),
  professionOther: yup
    .string()
    .when("profession", {
      is: "Other",
      then: (schema) => schema.required("Please specify your profession"),
      otherwise: (schema) => schema,
    }),
  currentInvestments: yup
    .array()
    .min(1, "Please select at least one investment option")
    .required("Current investments is required"),
  currentInvestmentsOther: yup
    .string()
    .when("currentInvestments", {
      is: (investments) => investments && investments.includes("Other"),
      then: (schema) => schema.required("Please specify your other investment"),
      otherwise: (schema) => schema,
    }),
  interest: yup
    .string()
    .required("Please select what you are most interested in"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only numbers"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

// Age options
const ageOptions = [
  "Under 25",
  "25 – 34",
  "35 – 44",
  "45 – 54",
  "55+",
];

// Profession options
const professionOptions = [
  "Employee",
  "Business Owner / Entrepreneur",
  "Manager / Senior Role",
  "Independent Professional (Doctor, Lawyer, Engineer, etc.)",
  "Student",
  "Other",
];

// Current Investments options
const currentInvestmentsOptions = [
  "Savings Certificates",
  "Stock Market",
  "Gold",
  "Real Estate",
  "I do not currently invest",
  "Other",
];

// Interest options
const interestOptions = [
  "Getting started in the stock market",
  "Growing my savings long-term",
  "Understanding risk and managing investments",
  "Following the market and making better decisions",
  "Diversifying income sources",
];

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      profession: "",
      professionOther: "",
      currentInvestments: [],
      currentInvestmentsOther: "",
      interest: "",
      mobileNumber: "",
      email: "",
    },
  });

  const profession = watch("profession");
  const currentInvestments = watch("currentInvestments");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(""); // Clear any previous errors
    try {
      const apiUrl = `https://investments-api.onrender.com/api/investments`;

      // Process currentInvestments: remove "Other" from array if selected
      const processedInvestments = data.currentInvestments?.filter((investment) => investment !== "Other") || [];
      
      // If "Other" was selected in currentInvestments, send currentInvestmentsOther to professionOther
      const hasOtherInvestment = data.currentInvestments?.includes("Other");
      const professionOtherValue = data.profession === "Other" 
        ? data.professionOther 
        : (hasOtherInvestment ? data.currentInvestmentsOther : "");

      const response = await axios.post(apiUrl, {
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        age: data.age,
        mobileNumber: data.mobileNumber,
        emailAddress: data.email,
        profession: data.profession,
        professionOther: professionOtherValue,
        currentInvestments: processedInvestments,
        mostInterestedIn: data.interest,
      });

      console.log("Registration successful:", response.data);
      setSubmitSuccess(true);
      setShowSuccessToast(true);
      reset();

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response?.data?.message) {
        setSubmitError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setSubmitError(error.response.data.error);
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%", // ✅ full width
        backgroundImage: `url(${registerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // ✅ makes it cover full width/height
        backgroundPosition: "center", // ✅ keeps it centered
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        pb: 12, // Extra bottom padding to prevent overlap with logo
        position: "relative",
        "&::before": {
          content: submitSuccess ? 'none' : '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top right, rgba(229, 174, 68, 0.9) 0%, rgba(229, 174, 68, 0.6) 40%, rgba(29, 120, 162, 0.9) 60%, rgba(29, 120, 162, 0.3) 100%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(26, 55, 65, 0.1)",
            '& .MuiInputBase-input': {
              fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            },
            '& input::placeholder': {
              fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            },
            '& .MuiSelect-select': {
              fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            },
            '& .MuiFormHelperText-root': {
              fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            },
   
          }}
        >
          {submitSuccess ? (
            /* Thank You Message */
            <Box
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                  fontWeight: 600,
                  color: "#1d78a2",
                }}
              >
                Thank you for registering!
              </Typography>
            </Box>
          ) : (
            <>
              {/* Logo and Header */}
              <Box sx={{ textAlign: "center", mb: 1 }}>
                <img
                  src={nextFaceLogo}
                  alt="Next Face Logo"
                  style={{ width: 300, marginBottom: 16 }}
                />
             
              </Box>

              {/* Error Message */}
              {submitError && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 2 }}
                  onClose={() => setSubmitError("")}
                >
                  {submitError}
                </Alert>
              )}

              {/* Registration Form */}
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* First Name */}
              <Grid item size={{ xs: 12, sm: 12 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      placeholder="Enter your first name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                          color: "#000",
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Middle Name */}
              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Middle Name"
                      placeholder="Enter your middle name"
                      error={!!errors.middleName}
                      helperText={errors.middleName?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                          color: "#000",
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Last Name */}
              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      placeholder="Enter your last name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                          color: "#000",
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Age */}
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder="Age"
                      label="Age"
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return (
                              <span style={{ 
                                color: "#000",
                                opacity: 1,
                                fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' 
                              }}>
                                Enter your age
                              </span>
                            );
                          }
                          return (
                            <span style={{ fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' }}>
                              {selected}
                            </span>
                          );
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              '& .MuiMenuItem-root': {
                                fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                              },
                            },
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        '& .MuiSelect-select': {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                        },
                      }}
                    >
                      {ageOptions.map((age) => (
                        <MenuItem key={age} value={age}>
                          {age}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Profession */}
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="profession"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder="Profession"
                      label="Profession"
                      error={!!errors.profession}
                      helperText={errors.profession?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return (
                              <span style={{ 
                                color: "#000",
                                opacity: 1,
                                fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' 
                              }}>
                                Enter your profession
                              </span>
                            );
                          }
                          return (
                            <span style={{ fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' }}>
                              {selected}
                            </span>
                          );
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              '& .MuiMenuItem-root': {
                                fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                              },
                            },
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        '& .MuiSelect-select': {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                        },
                      }}
                    >
                      {professionOptions.map((prof) => (
                        <MenuItem key={prof} value={prof}>
                          {prof}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Profession Other */}
              {profession === "Other" && (
                <Grid item size={{ xs: 12 }}>
                  <Controller
                    name="professionOther"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Please specify your profession"
                        placeholder="Enter your profession"
                        error={!!errors.professionOther}
                        helperText={errors.professionOther?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WorkIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            fontSize: "0.9rem",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "0.9rem",
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "0.75rem",
                          },
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                            color: "#000",
                            opacity: 1,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              )}

              {/* Current Investments */}
              <Grid item size={{ xs: 12 }}>
                <FormControl
                  component="fieldset"
                  error={!!errors.currentInvestments}
                  fullWidth
                  sx={{
                    "& .MuiFormLabel-root": {
                      fontSize: "0.9rem",
                      fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    },
                  }}
                >
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Your Current Investments (Multiple selections allowed)
                  </FormLabel>
                  <Controller
                    name="currentInvestments"
                    control={control}
                    render={({ field }) => (
                      <FormGroup>
                        {currentInvestmentsOptions.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={field.value?.includes(option) || false}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...currentValue, option]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter((val) => val !== option)
                                    );
                                  }
                                }}
                                sx={{
                                  '& .MuiSvgIcon-root': {
                                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                                  },
                                }}
                              />
                            }
                            label={
                              <span  style={{ fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif', fontSize: "0.9rem" }}>
                                {option}
                              </span>
                            }
                          />
                        ))}
                      </FormGroup>
                    )}
                  />
                  {errors.currentInvestments && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{
                        mt: 0.5,
                        fontSize: "0.75rem",
                        fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                      }}
                    >
                      {errors.currentInvestments.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Current Investments Other */}
              {currentInvestments?.includes("Other") && (
                <Grid item size={{ xs: 12 }}>
                  <Controller
                    name="currentInvestmentsOther"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Please specify your other investment"
                        placeholder="Enter your other investment"
                        error={!!errors.currentInvestmentsOther}
                        helperText={errors.currentInvestmentsOther?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            fontSize: "0.9rem",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "0.9rem",
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "0.75rem",
                          },
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                            color: "#000",
                            opacity: 1,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              )}

              {/* Interest */}
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="interest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder="What are you most interested in? (Select one)"
                      label="What are you most interested in? (Select one)"
                      error={!!errors.interest}
                      helperText={errors.interest?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return (
                              <span style={{ 
                                color: "#000",
                                opacity: 1,
                                fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' 
                              }}>
                                Enter your interest
                              </span>
                            );
                          }
                          return (
                            <span style={{ fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif' }}>
                              {selected}
                            </span>
                          );
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              '& .MuiMenuItem-root': {
                                fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                              },
                            },
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        '& .MuiSelect-select': {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                        },
                      }}
                    >
                      {interestOptions.map((interest) => (
                        <MenuItem key={interest} value={interest}>
                          {interest}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Mobile Number */}
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="mobileNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Mobile Number"
                      placeholder="Enter your mobile number"
                      type="tel"
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                      inputProps={{
                        pattern: "[0-9]*",
                        inputMode: "numeric",
                      }}
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                          color: "#000",
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: "0.9rem",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.9rem",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.75rem",
                        },
                        "& .MuiOutlinedInput-input::placeholder": {
                          fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                          color: "#000",
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item size={{ xs: 12 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 400,
                    bgcolor: "#e5ae44",
                   
                    "&:disabled": {
                      bgcolor: "grey.300",
                    },
                  }}
                >
                  {isSubmitting ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CircularProgress size={20} color="inherit" />
                      Registering...
                    </Box>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Grid>


            </Grid>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      {/* Cairo Image - Bottom Left */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 10, sm: 20 },
          left: { xs: 10, sm: 20 },
          zIndex: 1,
          "& img": {
            maxWidth: { xs: "170px", sm: "300px" },
            height: "auto",
            display: "block",
          },
        }}
      >
        <img
          src={cairoImage}
          alt="Cairo"
        />
      </Box>

      {/* Right Logo - Bottom Right */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 10, sm: 20 },
          right: { xs: 10, sm: 20 },
          zIndex: 1,
          "& img": {
              maxWidth: { xs: "170px", sm: "300px" },
            height: "auto",
            display: "block",
          },
        }}
      >
        <img
          src={rightLogo}
          alt="Right Logo"
        />
      </Box>

      {/* Success Toast */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={4000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <ToastAlert
          onClose={() => setShowSuccessToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration successful!
        </ToastAlert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
