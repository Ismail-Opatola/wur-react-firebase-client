import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { connect } from "react-redux";
import { postVote } from "../../redux/actions/dataActions";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
// import question from "./question";
// import FormLabel from '@material-ui/core/FormLabel';

// import Emoji from "../../util/emoji";

const styles = theme => ({
  ...theme
});

class voteForm extends Component {
  state = {
    option: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ optionOne: false, optionTwo: false });
    }
  }

  handleChange = event => {
    this.setState({ option: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // let option;
    // if (this.state.optionOne) option = "optionOne";
    // if (this.state.optionTwo) option = "optionTwo";
    console.log("hey I'm gonna ran your code");

    if (!this.state.option) return null;
    this.props.postVote(this.props.question.questionId, {
      vote: this.state.option
    });
    console.log("hey I ran your code");
  };

  render() {
    const { classes, authenticated, question } = this.props;
    const errors = this.state.errors;

    const voteFormMarkup = (
      // authenticated ?
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <FormControl
          component="fieldset"
          error={errors.error || errors.message ? true : false}
          value={this.state.option}
        >
          <RadioGroup
            aria-label="position"
            name="position"
            value={this.state.option}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel
              value={"optionOne"}
              control={<Radio color="primary" />}
              label={question.optionOne.text}
              labelPlacement="end"
            />
            <FormControlLabel
              value={"optionTwo"}
              control={<Radio color="primary" />}
              label={question.optionTwo.text}
              labelPlacement="end"
            />
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
        <div>
          <small style={{ color: "green" }}>
            {errors
              ? errors.error
                ? `😊 ${errors.error}, signin fam!`
                : errors.message
                ? `😊 ${errors.message}`
                : null
              : null}
          </small>
        </div>
      </Grid>
    );
    // : null;
    return voteFormMarkup;
  }
}

voteForm.propTypes = {
  postVote: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
  // questionId: PropTypes.string.isRequired,
  // authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { postVote }
)(withStyles(styles)(voteForm));
