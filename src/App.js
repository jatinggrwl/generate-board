import ReactDOM from "react-dom";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import words from "./word";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  textCenter: {
    textAlign: "center"
  },
  paper: {
    padding: "10px!important",
    textAlign: "center",
    background: "green",
    color: "white"
  }
}));
let colorss = [
  { color: "blue", freq: 5 },
  { color: "green", freq: 5 },
  { color: "grey", freq: 5 },
  { color: "black", freq: 1 }
];
export default function GridGenerate() {
  const classes = styles();
  const wordList = words;
  const [newBoardList, setNewBoardList] = React.useState([]);
  const gernerateBoard = () => {
    let idx = Math.floor(Math.random() * 345) + 1;
    let boardArr = [];
    const colors = colorss.map((a) => Object.assign({}, a));
    for (let i = 0; i < 4; i++) {
      let inrArr = [];
      for (let j = 0; j < 4; j++) {
        let clrIdx = Math.floor(Math.random() * colors.length - 0) + 0;
        inrArr.push({ word: wordList[j + idx], color: colors[clrIdx].color });
        colors[clrIdx].freq = colors[clrIdx].freq - 1;
        if (colors[clrIdx].freq === 0) {
          colors.splice(clrIdx, 1);
        }
      }
      idx = idx + 4;
      boardArr.push(inrArr);
    }
    setNewBoardList(boardArr);
  };

  return (
    <div className={classes.root}>
      <div className={classes.textCenter}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            gernerateBoard();
          }}
        >
          Generate Board
        </Button>
      </div>

      <div className={classes.root}>
        <Grid container spacing={1}>
          {newBoardList.map((horizontalList) => {
            return horizontalList.map((item) => {
              return (
                <Grid item xs={3}>
                  <Button
                    color="primary"
                    style={{ backgroundColor: item.color }}
                    variant="contained"
                  >
                    {item.word}
                  </Button>
                </Grid>
              );
            });
          })}
        </Grid>
      </div>
    </div>
  );
}
