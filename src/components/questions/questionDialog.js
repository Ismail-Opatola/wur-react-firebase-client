import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import VoteForm from "./voteForm";
import ResultPoll from "./resultPoll";
import MyButton from "../../util/MyButton";
import Emoji from "../../util/emoji";

import dayjs from "dayjs";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";
import { getQuestion, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  bloc: {
    // display: "block",
    // width: "100%",
    // maxWidth: "100%",
    padding: "1.5em"
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: ".5em"
  }
});

class QuestionDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    // #34--1 access a particular user scream through route
    /* for <Route path="/users/:handle/scream/:screamId" />*/
    if (this.props.openDialog) {
      // #34 open dialog on user page >> scream route
      this.handleOpen();
    }
  }

  handleOpen = () => {
    // #34--2 twitter dialog and route behavoir ... when user>>screamId is accessed from <url> directly, load screamDialog, save the previuos path, create a newPath for the opened scream and set url history to newPath, on handleClose reset url history to oldPath.
    //  Note: Edge case: if the oldPath is same as the newPath, set oldPath to the accessed user page
    let oldPath = window.location.pathname;

    const { authorId, questionId } = this.props; // #34--2
    // form the path for the scream
    const newPath = `/users/${authorId}/question/${questionId}`; // #34--2

    // Edge Case
    if (oldPath === newPath) oldPath = `/users/${authorId}`;

    // push newPath
    window.history.pushState(null, null, newPath); // (null, null, <url>)

    this.setState({ open: true, oldPath, newPath });
    this.props.getQuestion(this.props.questionId);
  };
  handleClose = () => {
    // go back to the user's page ie push oldPath
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false, votersAvi: [] });
    this.props.clearErrors();
  };

  mapPhotoListToState = (votersPhotoList, classes) => {
    // const {
    //   questioN: { votersPhotoList },
    //   classes
    // } = this.props;
    let photoChips =
      votersPhotoList.length &&
      votersPhotoList.map(data => {
        return (
          <Chip
            key={data.voterId}
            component={Link}
            avatar={<Avatar alt={data.voterName} src={data.voterImageUrl} />}
            label={data.voterName}
            to={`/users/${data.voterId}`}
            clickable
            className={classes.chip}
            variant="outlined"
          />
        );
      });
    return photoChips;
  };

  render() {
    const {
      classes,
      questioN: {
        question,
        votersPercentage,
        votersPhotoList,
        votersRatio,
        yourVote
      },
      UI: { loading }
    } = this.props;

    const votersAvi =
      !loading && this.mapPhotoListToState(votersPhotoList, classes);

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : Object.keys(question).length &&
      !Object.values(yourVote).includes(true) ? (
      <>
        <Grid>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${question.authorId}`}
          >
            {" "}
            @{question.author} asks:
          </Typography>
          <hr className={classes.visibleSeparator} />
        </Grid>
        <Grid container spacing={16}>
          <Grid item sm={5}>
            <img
              src={question.authorImg}
              alt="Profile"
              className={classes.profileImage}
            />
          </Grid>
          <Grid item sm={7}>
            <Typography variant="h6">Would You Rather...</Typography>
            <hr className={classes.invisibleSeparator} />
            <div>
              <VoteForm question={question} />
            </div>
          </Grid>
        </Grid>
      </>
    ) : (
      Object.keys(question).length &&
      Object.values(yourVote).includes(true) && (
        <>
          <Grid>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${question.authorId}`}
            >
              {" "}
              Asked by @{question.author}
            </Typography>
            <hr className={classes.visibleSeparator} />
          </Grid>
          <Grid container spacing={16}>
            <Grid item sm={5}>
              <img
                src={question.authorImg}
                alt="Profile"
                className={classes.profileImage}
              />
            </Grid>
            <Grid item sm={7}>
              <Typography variant="h6">Results:</Typography>
              <hr className={classes.invisibleSeparator} />
              <div>
                <ResultPoll question={question} />
              </div>
            </Grid>
          </Grid>
        </>
      )
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
            <Grid>
              <hr className={classes.visibleSeparator} />
              {!votersAvi.length ? (
                <p className={classes.root}>
                  <small><Emoji symbol="🤔" label='pondering'/> Not Votes Yet</small>
                </p>
              ) : (
                <div className={classes.root}>{votersAvi}</div>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

QuestionDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  // questionId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  // question: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  questioN: state.data.question.question ? state.data.question : null,
  UI: state.UI
});

const mapActionsToProps = {
  getQuestion,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(QuestionDialog));