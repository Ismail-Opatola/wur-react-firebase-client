import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadThis
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography
            variant="h4"
            className={classes.pageTitle}
            style={{ color: "grey" }}
          >
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className="inlineN">
              <TextField
                id="firstName"
                name="firstName"
                type="text"
                label="Firstname"
                className={classes.textField}
                helperText={errors.firstName}
                error={errors.firstName ? true : false}
                value={this.state.firstName}
                onChange={this.handleChange}
                inputProps={{ maxLength: 12 }}
                fullWidth
              />
              <TextField
                id="lastName"
                name="lastName"
                type="text"
                label="Lastname"
                className={classes.textField}
                helperText={errors.lastName}
                error={errors.lastName ? true : false}
                value={this.state.lastName}
                onChange={this.handleChange}
                inputProps={{ maxLength: 12 }}
                fullWidth
              />
            </div>

            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              inputProps={{ maxLength: 50 }}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              inputProps={{ maxLength: 50 }}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              inputProps={{ maxLength: 50 }}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              SignUp
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <Typography variant="caption" color="textPrimary">
              Already have an account ? Login{" "}
              <MuiLink to="/login" component={Link} color="primary">
                here
              </MuiLink>
            </Typography>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
