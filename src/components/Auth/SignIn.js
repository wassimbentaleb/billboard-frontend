import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as yup from "yup";
import { signinAPI } from "../../services/service";

const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by the "}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI
    </Link>
    {" team."}
  </Typography>
);

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const initialValues = {
  email: "",
  password: "",
}


const userSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const SignInSide = (props) => {
  const classes = useStyles();

  const handleFormSubmit = async(values) => {
    console.log(values);

    const {  email, password } = values;
    
    const payload = {
        email:email,
        password:password
    };

    const response = await signinAPI(payload);
    console.log(response, "from sign in");
    
    localStorage.setItem("token", response.token)
    localStorage.setItem('connected', "true")
    window.location.reload();

};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
           onSubmit={handleFormSubmit}
           initialValues={initialValues}
           validationSchema={userSchema}
          >
          {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>(
             <form className={classes.form} noValidate onSubmit={handleSubmit}>
             <TextField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               autoFocus
               error={!!touched.email && !!errors.email}
               helperText={touched.email && errors.email}
             />
             <TextField
               onBlur={handleBlur}
               onChange={handleChange}
               value={values.password}
               variant="outlined"
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               autoComplete="current-password"
               error={!!touched.password && !!errors.password}
               helperText={touched.password && errors.password}
             />
             <FormControlLabel
               control={<Checkbox value="remember" color="primary" />}
               label="Remember me"
             />
             <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
             >
               Sign In
             </Button>
             <Grid container>
               <Grid item xs>
                 <Link href="#" variant="body2">
                   Forgot password?
                 </Link>
               </Grid>
              <Grid item>
                 <Link onClick={props.handleLoginClick} variant="body2">
                   {"Don't have an account? Sign Up"}
                 </Link>
               </Grid>
             </Grid>
             <Box mt={5}>
               <MadeWithLove />
             </Box>
           </form>
          )}
         
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
