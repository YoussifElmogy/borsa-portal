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
import { useTranslation } from "react-i18next";
import axios from "axios";
import nextFaceLogo from "../assets/egx-logo.svg";
import cairoImage from "../assets/cairo.png";
import rightLogo from "../assets/right-logo.svg";
import LanguageSwitcher from "./LanguageSwitcher";


const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();

  // Dynamic validation schema with translations
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t("validation.firstNameRequired"))
      .min(2, t("validation.firstNameMin"))
      .max(50, t("validation.firstNameMax")),
    middleName: yup
      .string()
      .required(t("validation.middleNameRequired"))
      .min(2, t("validation.middleNameMin"))
      .max(50, t("validation.middleNameMax")),
    lastName: yup
      .string()
      .required(t("validation.lastNameRequired"))
      .min(2, t("validation.lastNameMin"))
      .max(50, t("validation.lastNameMax")),
    age: yup
      .string()
      .required(t("validation.ageRequired")),
    profession: yup
      .string()
      .required(t("validation.professionRequired")),
    professionOther: yup
      .string()
      .when("profession", {
        is: t("options.profession.other"),
        then: (schema) => schema.required(t("validation.professionOtherRequired")),
        otherwise: (schema) => schema,
      }),
    currentInvestments: yup
      .array()
      .min(1, t("validation.currentInvestmentsMin"))
      .required(t("validation.currentInvestmentsRequired")),
    currentInvestmentsOther: yup
      .string()
      .when("currentInvestments", {
        is: (investments) => investments && investments.includes(t("options.investments.other")),
        then: (schema) => schema.required(t("validation.currentInvestmentsOtherRequired")),
        otherwise: (schema) => schema,
      }),
    interest: yup
      .string()
      .required(t("validation.interestRequired")),
    mobileNumber: yup
      .string()
      .required(t("validation.mobileNumberRequired"))
      .matches(/^[0-9]{11}$/, t("validation.mobileNumberInvalid")),
    email: yup
      .string()
      .required(t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
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

  // Options arrays with translations
  const ageOptions = [
    t("options.age.under25"),
    t("options.age.25-34"),
    t("options.age.35-44"),
    t("options.age.45-54"),
    t("options.age.55plus"),
  ];

  const professionOptions = [
    t("options.profession.employee"),
    t("options.profession.businessOwner"),
    t("options.profession.manager"),
    t("options.profession.independent"),
    t("options.profession.student"),
    t("options.profession.other"),
  ];

  const currentInvestmentsOptions = [
    t("options.investments.savingsCertificates"),
    t("options.investments.stockMarket"),
    t("options.investments.gold"),
    t("options.investments.realEstate"),
    t("options.investments.notInvesting"),
    t("options.investments.other"),
  ];

  const interestOptions = [
    t("options.interest.buySell"),
    t("options.interest.professionalsInvest"),
    t("options.interest.lowRisk"),
    t("options.interest.professionalManage"),
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(""); // Clear any previous errors
    try {
      const apiUrl = `https://investments-api.onrender.com/api/investments`;

      const otherProfession = t("options.profession.other");
      const otherInvestment = t("options.investments.other");

      // Process currentInvestments: remove "Other" from array if selected
      const processedInvestments = data.currentInvestments?.filter((investment) => investment !== otherInvestment) || [];
      
      // Check if "Other" was selected in currentInvestments
      const hasOtherInvestment = data.currentInvestments?.includes(otherInvestment);
      
      // professionOther only when profession is "Other"
      const professionOtherValue = data.profession === otherProfession ? data.professionOther : "";
      
      // currentInvestmentsOther only when "Other" is selected in investments
      const currentInvestmentsOtherValue = hasOtherInvestment ? data.currentInvestmentsOther : "";

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
        currentInvestmentsOther: currentInvestmentsOtherValue,
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

  const isRTL = i18n.language === 'ar';
  return (
    <Box
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{
        minHeight: "100vh",
        width: "100%", // ✅ full width
        backgroundImage: `url(${registerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: {xs: submitSuccess ? "200%" : "cover", md: submitSuccess ? "100%" : "cover"},// Zoom in when registration is successful
        backgroundPosition: "center", // ✅ keeps it centered
        transition: "background-size 0.5s ease-in-out", // Smooth zoom transition
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        pb: 12, // Extra bottom padding to prevent overlap with logo
        pt:{xs:10,sm:4},
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
      <LanguageSwitcher />
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, top: submitSuccess && "85px"  }}>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.2)",
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
            '& .MuiOutlinedInput-notchedOutline legend': {
              display: 'none',
            },
   
          }}
        >
          {submitSuccess ? (
            /* Thank You Message */
            <Box
              sx={{
                textAlign: "center",
                py: 3,
               
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                  fontWeight: 600,
                  color: "#f3e6e6",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                {t("form.thankYou")} <br /> {t("form.thankYouMessage")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.firstName")}
                </Typography>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("placeholders.enterFirstName")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.middleName")}
                </Typography>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("placeholders.enterMiddleName")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.lastName")}
                </Typography>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("placeholders.enterLastName")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.age")}
                </Typography>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder={t("placeholders.enterAge")}
                      error={!!errors.age}
                      helperText={errors.age?.message}
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
                                {t("placeholders.enterAge")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.profession")}
                </Typography>
                <Controller
                  name="profession"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder={t("placeholders.enterProfession")}
                      error={!!errors.profession}
                      helperText={errors.profession?.message}
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
                                {t("placeholders.enterProfession")}
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
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                lineHeight: 1.5,
                                padding: { xs: '12px 16px', sm: '6px 16px' },
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
              {profession === t("options.profession.other") && (
                <Grid item size={{ xs: 12 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontSize: "0.9rem",
                      fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    {t("form.professionOther")}
                  </Typography>
                  <Controller
                    name="professionOther"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder={t("placeholders.enterProfession")}
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
                    {t("form.currentInvestments")}
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
              {currentInvestments?.includes(t("options.investments.other")) && (
                <Grid item size={{ xs: 12 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontSize: "0.9rem",
                      fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    {t("form.currentInvestmentsOther")}
                  </Typography>
                  <Controller
                    name="currentInvestmentsOther"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder={t("placeholders.enterOtherInvestment")}
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.interest")}
                </Typography>
                <Controller
                  name="interest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      placeholder={t("placeholders.enterInterest")}
                      error={!!errors.interest}
                      helperText={errors.interest?.message}
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
                                {t("placeholders.enterInterest")}
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
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                lineHeight: 1.5,
                                padding: { xs: '12px 16px', sm: '6px 16px' },
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
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.mobileNumber")}
                </Typography>
                <Controller
                  name="mobileNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      dir={isRTL ? 'rtl' : 'ltr'}
                      textAlign={isRTL ? 'right' : 'left'}
                      placeholder={t("placeholders.enterMobileNumber")}
                      type="tel"
                      onChange={(e) => {
                        // Only allow numbers and limit to 11 digits
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                        field.onChange(value);
                      }}
                      inputProps={{
                        pattern: "[0-9]*",
                        inputMode: "numeric",
                        maxLength: 11,
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
                          textAlign: isRTL ? 'right' : 'left',
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item size={{ xs: 12 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "0.9rem",
                    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {t("form.email")}
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder={t("placeholders.enterEmail")}
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
                      {t("form.registering")}
                    </Box>
                  ) : (
                    t("form.register")
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
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("form.registrationSuccessful")}
          
        </ToastAlert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
