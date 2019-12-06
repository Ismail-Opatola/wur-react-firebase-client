import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import ProgressBar from "../../util/progressBar";

const styles = theme => ({
  ...theme.spraedThis,
  badge: {
    top: "50%",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  spacePaper: {
    width: "100%",
    minHeight: "5em",
    padding: "1em",
    borderRadius: "3%"
  },
  grid: {
    marginBottom: "1.5em",
    fontWeight: "900"
  }
});

export class resultPoll extends Component {
  render() {
    const {
      classes,
      votersPercentage,
      votersRatio,
      yourVote,
      question
    } = this.props;
    return (
      <div>
        <div>
          <Grid className={classes.grid}>
            <Badge
              color="primary"
              badgeContent={"Your Vote"}
              className={classes.badge}
              invisible={!yourVote.optionOne}
            >
              <div
                className={classes.spacePaper}
                style={{
                  background: yourVote.optionOne
                    ? "rgba(66, 194, 211, 0.176)"
                    : null
                }}
              >
                <Typography color="primary" fontWeight="fontWeightBold">
                  Would you rather {question.optionOne.text}?
                </Typography>
                <ProgressBar percentage={votersPercentage.optionOne} />
                <Typography fontWeight="fontWeightBold">
                  {votersRatio.optionOne}
                </Typography>
              </div>
            </Badge>
          </Grid>
          <Grid>
            <Badge
              color="primary"
              badgeContent={`Your Vote`}
              className={classes.badge}
              invisible={!yourVote.optionTwo}
            >
              <div
                className={classes.spacePaper}
                style={{
                  background: yourVote.optionTwo
                    ? "rgba(66, 194, 211, 0.176)"
                    : null
                }}
              >
                <Typography color="primary" fontWeight="fontWeightBold">
                  Would you rather {question.optionTwo.text}?
                </Typography>
                <ProgressBar percentage={votersPercentage.optionTwo} />
                <Typography fontWeight="fontWeightBold" >
                  {votersRatio.optionTwo}
                </Typography>
              </div>
            </Badge>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(resultPoll);
