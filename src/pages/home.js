import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Question from "../components/questions/question";
import Profile from "../components/profile/Profile";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";

// import ScreamSkeleton from '../util/ScreamSkeleton';

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { getQuestions } from "../redux/actions/dataActions";
import QuestionCardSkeleton from "../util/questionCardSkeleton";

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
    const { questions, loading } = this.props.data;
    const { showAnswered, showUnanswered } = this.state;

    let recentQuestionsMarkup = !loading ? (
      showUnanswered ? (
        !questions && !questions.unanswered ? (
          "no questions yet"
        ) : (
          questions.unanswered.map(question => (
            <Question key={question.questionId} question={question} />
          ))
        )
      ) : showAnswered ? (
        !questions && !questions.answered ? (
          "not votes yet"
        ) : (
          questions.answered.map(question => (
            <Question key={question.questionId} question={question} />
          ))
        )
      ) : null
    ) : (
      <QuestionCardSkeleton />
    );

    return (
      <Box>
        <Toolbar style={{ maxWidth: 500, margin: "auto", marginBottom: 10 }}>
          <Box style={{ width: "100%" }}>
            <ButtonGroup size={"large"} fullWidth>
              <Button
                tip="Questions you've not voted in"
                onClick={() => this.handleView("unanswered")}
                fullWidth
                style={{
                  fontWeight: 900,
                  color: `${showUnanswered ? "darkGrey" : "grey"}`
                }}
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
              >
                Answered Questions
              </Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
        <Grid container spacing={4}>
          <Grid item sm={8} xs={12} direction="column">
            <Box>{recentQuestionsMarkup}</Box>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Box>
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

export default connect(mapStateToProps, { getQuestions })(home);
