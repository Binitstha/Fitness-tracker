import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root + " w-full"}>
      <CircularProgress color="secondary" className="p-2" />
    </div>
  );
};

export default Loader;
