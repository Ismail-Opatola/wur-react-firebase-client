import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LeaderCard from "../components/leaderboard/LeaderCard";
import { getLeaderBoard } from "../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  ...theme
});

export class leaderboard extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { leaderboardData } = this.props;
    const members = leaderboardData.length ? (
      leaderboardData.map(member => (
        <LeaderCard key={member.userId} member={member} />
      ))
    ) : (
      <p>"Not Enough Data Yet"</p>
    );
    return (
      <Grid container justify="center" >
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
  leaderboardData: state.data.leaderboard
});

const mapDispatchToProps = {
  loadData: getLeaderBoard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(leaderboard));
