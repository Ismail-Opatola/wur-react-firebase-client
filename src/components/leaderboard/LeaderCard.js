import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import MyButton from "../../util/MyButton";
// MUI Stuff
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// Icons

// Animation
import { Spring } from "react-spring/renderprops";

const styles = theme => ({
  ...theme,
  // table: {
  //   width: "100%",
  // },
  prim: {
    color: "#00bcd4"
  },
  card: {
    position: "relative",
    marginBottom: 20
  },
  avi: {
    maxHeight: "180px",
    maxWidth: "180px",
    minWidth: "60px",
    width: "auto",
    height: "auto",
    borderRadius: "none",
    overflow: "hidden"
    // objectFit: "cover"
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#00bcd4",
    width: 60,
    height: 60,
  }
});

class LeaderCard extends Component {
  render() {
    const {
      classes,
      member: { userId, username, imageUrl, created, answered, score, position }
    } = this.props;
    let checked = true;

    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 1000 }}
      >
        {springProps => (
          <Paper
            className={classes.card}
            style={{
              position: "relative",
              padding: "1em",
              objectFit: "cover",
              boxSizing: "border-box"
            }}
          >
            <div
              style={{
                // border: "1px solid lightGrey",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "nowrap",
                flexGrow: 1,
                flexShrink: 1,
                objectFit: "cover",
                boxSizing: "border-box",
                padding: 0
              }}
            >
              <div>
                <div
                  style={{
                    maxHeight: "180px",
                    maxWidth: "180px",
                    minWidth: "60px",
                    width: "auto",
                    height: "auto",
                    "WebkitBoxShadow": "10px 0 5px -1px #888",
                    "BoxShadow": "10px 0 5px -1px #888",
                    overflow: "hidden",
                    boxSizing: "border-box"
                  }}
                >
                  <Avatar
                    src={imageUrl}
                    alt={`${username}`}
                    className={classes.avi}
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
              <div>
                <Spring
                  from={{ num1: 0, num2: 0 }}
                  to={{ num1: answered, num2: created }}
                  config={{ delay: 500 }}
                >
                  {innerSpringProps => (
                    <div
                      style={{
                        margin: "10px",
                        objectFit: "cover"
                      }}
                    >
                      <Table
                        // className={classes.table}
                        style={{
                          boxSizing: "border-box",
                          fontWeight: 900, fontSize: "1.5em" , color: "grey"
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                component={Link}
                                className={classes.prim}
                                to={`/users/${userId}`}
                                // variant="h6"
                                color="primary"
                                style={{ fontWeight: 900, fontSize: "1.5em" }}
                              >{`@${username}`}</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={1}>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 , color: "#666"}}>Answered questions </Typography>
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: 900, fontSize: ".5em" , color: "grey"}}>
                              {innerSpringProps.num1.toFixed()}
                            </TableCell>
                          </TableRow>
                          <TableRow key={2}>
                            <TableCell>
                              <Typography style={{ fontWeight: 600 , color: "#666"}}>Created questions </Typography>
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: 900, fontSize: ".5em" , color: "grey"}}>
                              {innerSpringProps.num2.toFixed()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Spring>
              </div>
              <div>
                <Spring
                  from={{ number: 0 }}
                  to={{ number: score }}
                  config={{ delay: 500 }}
                >
                  {innerSpringProps => (
                    <div>
                      <Table
                        style={{
                          width: "50%",
                          margin: "20px auto",
                          border: "1px solid lightGrey",
                          boxSizing: "border-box"
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              <Typography style={{ fontWeight: 900, fontSize: "1.5em" , color: "grey"}}>Score</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              style={{
                                border: "none",
                                marginBottom: 0,
                                 fontWeight: 600 
                              }}
                            >
                              <Avatar  className={classes.avatar}>
                                {innerSpringProps.number.toFixed()}
                              </Avatar>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Spring>
              </div>
            </div>
          </Paper>
        )}
      </Spring>
    );
  }
}

LeaderCard.propTypes = {
  member: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeaderCard);
