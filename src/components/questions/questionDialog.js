import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import VoteForm from "./voteForm";
import ResultPoll from "./resultPoll";
import MyButton from "../../util/MyButton";
import Emoji from "../../util/emoji";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// Redux stuff
import { connect } from "react-redux";
import { getQuestion, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  profileImage: {
    width: "100%",
    height: "100%",
    textAlign: "center",
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
    newPath: "",
  };
  componentDidMount() {
    // access a particular user question through route
    // for <Route path="/users/:handle/question/:questionId" />
    if (this.props.openDialog) {
      // open dialog on user page >> question route
      this.handleOpen();
    }
  }
  

  handleOpen = () => {
    // twitter dialog and route behavoir ... when user>>questionId is accessed from <url> directly, load questionDialog, save the previuos path, create a newPath for the opened question and set url history to newPath, on handleClose reset url history to oldPath.
    let oldPath = window.location.pathname;

    const { 
      authorId, 
      questionId, 
    } = this.props; 
    // form the path for the question in view
    const newPath = `/users/${authorId}/question/${questionId}`; 

    // Edge Case: if the oldPath is same as the newPath, set oldPath to the accessed user page
    if (oldPath === newPath) oldPath = `/users/${authorId}`;

    // push newPath
    window.history.replaceState({key: questionId, state: ""}, null, newPath); // (null, null, <url>)

    this.setState({ 
      open: true, 
      oldPath, 
      newPath, 
    });
    this.props.getQuestion(this.props.questionId);
  };
  handleClose = () => {
    // go back to the user's page ie push oldPath
    window.history.replaceState(null, null, this.state.oldPath);
    this.setState({ 
      open: false, 
    });
    this.props.clearErrors();
  };

  switchUrl = (voterId) => {
    this.props.history.push(`/users/${voterId}`);
    window.location.reload(true);
  }

  mapPhotoListToState = (votersPhotoList, classes) => {
    let photoChips =
      votersPhotoList.length &&
      votersPhotoList.map(data => {
        return (
          <Chip
            key={data.voterId}
            avatar={<Avatar alt={data.voterName} src={data.voterImageUrl} />}
            label={data.voterName}
            onClick={() => this.switchUrl(data.voterId)}
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
            style={{ fontWeight: 900, fontSize: "1em" }}
          >
            {" "}
            @{question.author} asks:
          </Typography>
          <hr className={classes.visibleSeparator} />
        </Grid>
        <Grid
          container
          spacing={16}
          style={{
            alignItems: "center",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            boxSizing: "border-box"
          }}
        >
          <Grid item sm={5}>
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                overflow: "hidden"
              }}
            >
              <Avatar
                src={question.authorImg}
                alt="Profile"
                className={classes.profileImage}
              />
            </div>
          </Grid>
          <Grid
            item
            sm={7}
            style={{
              display: "inline-block",
              boxSizing: "border-box"
            }}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: 900, fontSize: "1em" }}
            >
              Would You Rather ...
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <div>
              <VoteForm question={question} oldPath={this.state.oldPath}/>
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
              style={{ fontWeight: 900, fontSize: "1em" }}
            >
              {" "}
              Asked by @{question.author}
            </Typography>
            <hr className={classes.visibleSeparator} />
          </Grid>
          <Grid
            container
            spacing={16}
            style={{
              alignItems: "center",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              boxSizing: "border-box"
            }}
          >
            <Grid item sm={5}>
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  overflow: "hidden"
                }}
              >
                <Avatar
                  src={question.authorImg}
                  alt="Profile"
                  className={classes.profileImage}
                />
              </div>
            </Grid>
            <Grid item sm={7}>
              <Typography
                variant="h6"
                style={{ fontWeight: 900, fontSize: "1em" }}
              >
                Results:
              </Typography>
              <hr className={classes.invisibleSeparator} />
              <div>
                <ResultPoll
                  question={question}
                  votersPercentage={votersPercentage}
                  votersRatio={votersRatio}
                  yourVote={yourVote}
                />
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
          tip="Expand question"
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
                  <small>
                    <Emoji symbol="🤔" label="pondering" /> No Votes Yet
                  </small>
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
  questionId: PropTypes.string,
  authorId: PropTypes.string.isRequired,
  question: PropTypes.object,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  questioN: state.data.question,
  UI: state.UI
});

const mapActionsToProps = {
  getQuestion,
  clearErrors
};

export default compose(
  withStyles(styles, { name: "QuestionDialog" }),
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(withRouter(QuestionDialog));
