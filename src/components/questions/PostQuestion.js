import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postQuestion, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  }
});

class PostQuestion extends Component {
  state = {
    open: false,
    optionOne: "",
    optionTwo: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    // fetch errors
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    // clear errors
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ optionOne: "", optionTwo: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.optionOne.trim() === "" ||
      this.state.optionTwo.trim() === ""
    )
      return this.setState({
        errors: {
          body: "😊 Can't submit empty field!"
        }
      });
    this.props.postQuestion({
      optionOne: this.state.optionOne,
      optionTwo: this.state.optionTwo
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Question!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle
            style={{
              textAlign: "center"
            }}
          >
            <Typography
              style={{
                fontWeight: 900,
                color: "darkgrey"
              }}
            >
              Post A New Question
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography
              style={{
                fontWeight: 900,
                fontSize: ".8em",
                color: "grey"
              }}
            >
              Complete the question:
            </Typography>
            <Typography
              //   color="primary"
              style={{
                marginTop: ".5em",
                fontWeight: 900,
                fontSize: "1em",
                color: "purple"
              }}
            >
              Would you rather ...
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                variant="outlined"
                name="optionOne"
                type="text"
                // label="Option One"
                multiline // textarea
                // rows="2"
                placeholder="Enter Option One Text Here"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1.5em",
                  fontWeight: 900,
                  fontSize: "1em",
                  color: "purple"
                }}
              >
                <span> OR </span>
              </Typography>
              <TextField
                margin="normal"
                variant="outlined"
                name="optionTwo"
                type="text"
                // label="Option Two"
                multiline // textarea
                // rows="2"
                placeholder="Enter Option Two Text Here"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
                fullWidth
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostQuestion.propTypes = {
  postQuestion: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postQuestion, clearErrors }
)(withStyles(styles)(PostQuestion));
