import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
// import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Question from "../components/questions/question";
import Profile from "../components/profile/Profile";
// import ScreamSkeleton from '../util/ScreamSkeleton';

// import MyButton from "../util/MyButton";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { getQuestions } from "../redux/actions/dataActions";

// const styles = theme => ({

//   buttonRoot: {
//     "&":{ fontWeight: 900 , color: "grey"},
//     "&:hover": {
//       color: "darkGrey",
//       opacity: 1
//     },
//     "&:focus": {
//       color: "darkGrey",
//       opacity: 0.8

//     },
//     "&:active": {
//       color: "darkGrey",
//       opacity: 0.8

//     }
//   },
// });

class home extends Component {
  state = {
    showAnswered: false,
    showUnanswered: true
  };

  componentDidMount() {
    this.props.getQuestions();
  }

  handleView = view => {
    if (view === "answered") {
      this.setState({
        showAnswered: true,
        showUnanswered: false
      });
    }
    if (view === "unanswered") {
      this.setState({
        showAnswered: false,
        showUnanswered: true
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { questions, loading } = this.props.data;
    const { showAnswered, showUnanswered } = this.state;

    let recentQuestionsMarkup = !loading
      ? showUnanswered
        ? !questions && !questions.unanswered
          ? "no questions yet"
          : questions.unanswered.map(question => (
              <Question key={question.questionId} question={question} />
            ))
        : showAnswered
        ? !questions && !questions.answered
          ? "not votes yet"
          : questions.answered.map(question => (
              <Question key={question.questionId} question={question} />
            ))
        : null
      : "Loading...";

    /*
        let recentQuestionsMarkup = !loading
        ? questions.map(question => (
            <Question key={question.questionId} question={question} />
            ))
        : //   <ScreamSkeleton />
            "Loading...";
    */
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <div>
            <div className="inlineB">
              <Button
                tip="Questions you've not voted in"
                onClick={() => this.handleView("unanswered")}
                fullWidth
                style={{
                  fontWeight: 900,
                  color: `${showUnanswered ? "darkGrey" : "grey"}`
                }}
                // className={classes.buttonRoot}
              >
                Unanswered Questions
              </Button>
              <Button
                tip="Questions you've voted in"
                onClick={() => this.handleView("answered")}
                fullWidth
                style={{
                  fontWeight: 900,
                  color: `${showAnswered ? "darkGrey" : "grey"}`
                }}
                // className={classes.buttonRoot}
              >
                Answered Questions
              </Button>
            </div>
            <>{recentQuestionsMarkup}</>
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div className="inlineB">
            <span>" "</span>
          </div>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(home);
// export default connect(
//   mapStateToProps,
//   { getQuestions }
// )(withStyles(styles)(home));
