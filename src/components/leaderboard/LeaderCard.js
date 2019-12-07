import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

// Animation
import { Spring } from "react-spring/renderprops";

const styles = theme => ({
  ...theme.spreadThis,
  prim: {
    color: "#00bcd4"
  },
  card: {
    marginBottom: 20,
    display: "grid",
    gridTemplateColumns: "20% 3fr 1fr",
    gridColumnGap: 2
  },
  avi: {
    width: "100%",
    maxHeight: 200
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.primary.main
  },
  scoreTable: {
    // display: "block",
    width: "100%",
    height: "100%",
    margin: "auto",
    padding: "auto",
    boxSizing: "border-box"
  }
});

class LeaderCard extends Component {
  render() {
    const {
      classes,
      member: {
        userId,
        username,
        imageUrl,
        created,
        answered,
        score
        // position
      }
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          alt={`${username}`}
          className={classes.avi}
        />

        <CardContent>
          <Spring
            from={{ num1: 0, num2: 0 }}
            to={{ num1: answered, num2: created }}
            config={{ delay: 500 }}
          >
            {innerSpringProps => (
              <Box>
                <Table
                  style={{
                    boxSizing: "border-box",
                    fontWeight: 900,
                    fontSize: "1.5em",
                    borderColor: "grey"
                  }}
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          component={Link}
                          className={classes.prim}
                          to={`/users/${userId}`}
                          color="primary"
                        >{`@${username}`}</Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={1}>
                      <TableCell>
                        <Typography color="secondary">
                          Answered questions{" "}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: 900,
                          fontSize: ".5em",
                          color: "grey"
                        }}
                      >
                        {innerSpringProps.num1.toFixed()}
                      </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell>
                        <Typography color="secondary">
                          Created questions{" "}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: 900,
                          fontSize: ".5em",
                          color: "grey"
                        }}
                      >
                        {innerSpringProps.num2.toFixed()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Spring>
        </CardContent>

        <Spring
          from={{ number: 0 }}
          to={{ number: score }}
          config={{ delay: 500 }}
        >
          {innerSpringProps => (
            <Box style={{ height: "100%", width: "100%" }}>
              <Table size="small" className={classes.scoreTable}>
                <TableHead
                  style={{ border: "0.3px solid darkGrey", borderTop: "none" }}
                >
                  <TableCell align="center">
                    <Typography
                      style={{
                        fontWeight: 900,
                        fontSize: "1.5em"
                      }}
                      color="textSecondary"
                      light
                    >
                      Score
                    </Typography>
                  </TableCell>
                </TableHead>
                <TableBody style={{ border: "0.3px solid darkGrey" }}>
                  <TableCell
                    align="center"
                    style={{
                      border: "none",
                      marginBottom: 0,
                      fontWeight: 600
                    }}
                  >
                    <Avatar align="center" className={classes.avatar}>
                      <Typography color="textPrimary">
                        {innerSpringProps.number.toFixed()}
                      </Typography>
                    </Avatar>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          )}
        </Spring>
      </Card>
    );
  }
}

LeaderCard.propTypes = {
  member: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeaderCard);
