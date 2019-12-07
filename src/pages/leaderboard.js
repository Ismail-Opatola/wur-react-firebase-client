import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LeaderCard from "../components/leaderboard/LeaderCard";
import { getLeaderBoard } from "../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import QuestionCardSkeleton from "../util/questionCardSkeleton";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.spreadThis
});

export class leaderboard extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { leaderboardData, loading } = this.props;
    const members = !loading ? (
      leaderboardData.length ? (
        leaderboardData.map(member => (
          <LeaderCard key={member.userId} member={member} />
        ))
      ) : (
        <Typography align="center" color="textPrimary">
          ::::...<em>Not enough data yet!...Try a refresh::::</em>
        </Typography>
      )
    ) : (
      <QuestionCardSkeleton />
    );
    return (
      <Grid container justify="center">
        <Grid item sm={8} xs={12}>
          {members}
        </Grid>
      </Grid>
    );
  }
}
leaderboard.propTypes = {
  leaderboardData: PropTypes.array.isRequired,
  //   classes: PropTypes.object.isRequired,
  getLeaderBoard: PropTypes.func,
  loadData: PropTypes.func
};

const mapStateToProps = state => ({
  leaderboardData: state.data.leaderboard,
  loading: state.data.loading
});

const mapDispatchToProps = {
  loadData: getLeaderBoard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(leaderboard));
