import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Question from '../components/questions/question';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

// import questionSkeleton from '../util/questionSkeleton';
// import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    questionIdParam: null
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    const questionId = this.props.match.params.questionId; // #34

    if (questionId) this.setState({ questionIdParam: questionId }); // #34

    this.props.getUserData(userId); // fetch user questions
    axios
      .get(`/user/${userId}`) // fetch user static profile
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { questions, loading } = this.props.data;
    const { questionIdParam } = this.state; // #34

    const questionsMarkup = loading ? (
    //   <QuestionSkeleton />
    <div>"HAHAHA! The Skeleton laughs heartily"</div>
    ) : questions === null ? (
      <p>No questions from this user</p>
    ) : !questionIdParam ? ( 
    // #34 if no <Route path="/users/:userId/question/:questionId" but only <Route path="/users/:userId />
      questions.unanswered.map((question) => <Question key={question.questionId} question={question} />)
    ) : ( 
    // #34 if <Route path="/users/:userId/question/:questionId"
      questions.unanswered.map((question) => { // find question by questionIdParam
        if (question.questionId !== questionIdParam)
          return <Question key={question.questionId} question={question} />;
        else return <Question key={question.questionId} question={question} openDialog />; 
        // #34 the one question that has the same questionId that we're trying to open, pass it a prop openDialog value of true, then in <question> we pass openDialog to <questionDialog> as props, then in <questionDialog> when ComponentDidMount check if this.props.openDialog ? open the dialog
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {questionsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (<div>
            {/* <ProfileSkeleton /> */} 
            "HAHAHA! The Skeleton laughs heartily"</div>
          ) : (
            <StaticProfile profile={this.state.profile} /> // user static profile
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data // contains all the questions of the user
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
