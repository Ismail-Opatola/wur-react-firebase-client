import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteQuestion from './deleteQuestion';
import QuestionDialog from "./questionDialog";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";

const styles = {
  prim: {
    color: "#00bcd4"
  },
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover" 
  },
  ellipsis: {
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 350
  }
};

class question extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      question: {
        author,
        authorId,
        authorImg,
        createdAt,
        optionOne,
        optionTwo,
        questionId
      },
      user: {
        authenticated,
        credentials: { userId }
      }
    } = this.props;

    const deleteButton =
      authenticated && authorId === userId ? (
        <DeleteQuestion questionId={questionId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={authorImg}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            component={Link}
            to={`/users/${authorId}`}
            color="primary"
            style={{ fontWeight: 900, fontSize: "1em" }}
          >
            {author}
          </Typography>

          {deleteButton}

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1" className={classes.ellipsis}>
            Would you rather {optionOne.text} or {optionTwo.text}
          </Typography>

          <MyButton tip="votes">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{optionOne.votes.length + optionTwo.votes.length} votes</span>

          <QuestionDialog
            questionId={questionId}
            authorId={authorId}
            openDialog={this.props.openDialog} // <Route path="/users/:handle/question/:questionId" /> 
          />
        </CardContent>
      </Card>
    );
  }
}

question.propTypes = {
  user: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(question));
