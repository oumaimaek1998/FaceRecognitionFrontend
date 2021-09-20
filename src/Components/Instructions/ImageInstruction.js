import "./ImageInstruction.css";
import AssignmentIcon from "@material-ui/icons/Assignment";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import Grid from "@material-ui/core/Grid";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { InstructionItems } from "../Instructions/InstructionItems";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  MultiText: {
    wordWrap: "break-word",
  },
}));

const ImageInstruction = () => {
  const classes = useStyles();
  return (
    <div className="instruction1">
      {" "}
      <div className="align-title">
        <AssignmentIcon />
        <h4 className="title"> Instructions </h4>
      </div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid className={classes.MultiText} item xs={12} md={12}>
            <List className={classes.MultiText}>
              {InstructionItems.map((item, index) => {
                return (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        {" "}
                        <CheckBoxIcon />{" "}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ImageInstruction;
