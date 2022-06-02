import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";
import useStyles from "../../styles";

import { useDispatch } from "react-redux";

const Home = ({ user }) => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} user={user} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              user={user}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
