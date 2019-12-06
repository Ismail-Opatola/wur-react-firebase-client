import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// Redux stuff
import { connect } from "react-redux";
import {
  postVote,
  postVoteFromUserPage
} from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
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
    console.log("hey I'm gonna ran your code");

    if (!this.state.option)
      return this.setState({ errors: { error: "Yet pick an option fam!" } });

    const {
      oldPath,
      question: { authorId, questionId }
    } = this.props;

    if (oldPath === `/users/${authorId}`) {
      this.props.postVoteFromUserPage(questionId, {
        vote: this.state.option
      });
    } else {
      this.props.postVote(questionId, {
        vote: this.state.option
      });
    }
    console.log("hey I ran your code");
  };

  render() {
    const { 
      classes, 
      // authenticated, 
      question 
    } = this.props;
    const errors = this.state.errors;

    const voteFormMarkup = (
      // authenticated ?
      <Grid item sm={12}>
        <FormControl
          component="fieldset"
          error={errors.error || errors.message ? true : false}
          value={this.state.option}
          fullWidth
        >
          <RadioGroup
            aria-label="position"
            name="position"
            value={this.state.option}
            onChange={this.handleChange}
            column="true"
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
            onClick={this.handleSubmit}
            fullWidth
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
    // : alert(" 😊 You need to signin fam!");
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
  UI: state.UI
  // authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { postVote, postVoteFromUserPage }
)(withStyles(styles)(voteForm));
