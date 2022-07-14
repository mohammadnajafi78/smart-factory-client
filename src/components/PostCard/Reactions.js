import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, IconButton, Tooltip, Typography, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  likedButton: {
    color: colors.red[600]
  }
}));

const Reactions = ({ className, post, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {isLiked ? (
        <Tooltip title="Unlike">
          <IconButton className={classes.likedButton} onClick={handleUnlike} size="large">
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like">
          <IconButton onClick={handleLike} size="large">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      <Typography
        color="textSecondary"
        variant="h6"
      >
        {likes}
      </Typography>
      <Box flexGrow={1} />
      <IconButton size="large">
        <ShareIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

Reactions.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default Reactions;
