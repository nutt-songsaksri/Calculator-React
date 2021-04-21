import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "250px",
  },
  textField: {
    "& input": {
      textAlign: "right",
    },
  },
}));

const Calculator = () => {
  const [result, setResult] = useState("0");
  const [memory, setMemory] = useState("0");
  const [operator, setOperator] = useState("");

  const classes = useStyles();
  const buttonName = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "X",
    ".",
    "0",
    "C",
    "/",
  ];

  const handleClick = (value) => {
    switch (value) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        return pushResult(value);
      case "+":
      case "-":
      case "X":
      case "/":
        return pushOperator(value);
      case ".":
        return pushDot();
      case "C":
        return clearAll();
    }
  };

  const pushResult = (value) => {
    if (result !== "0") {
      setResult(result + value);
    } else {
      setResult(value);
    }
  };

  const pushOperator = (value) => {
    setMemory(result);
    setResult("0");
    setOperator(value);
  };

  const calculateResult = () => {
    setResult(operation(result, memory, operator));
    setOperator("");
    setMemory("0");
  };

  const operation = (valA, valB, operator) => {
    var valAFloat = parseFloat(valA);
    var valBFloat = parseFloat(valB);
    switch (operator) {
      case "+":
        return valAFloat + valBFloat;
      case "-":
        return valBFloat - valAFloat;
      case "X":
        return valAFloat * valBFloat;
      case "/":
        return valBFloat / valAFloat;
    }
  };

  const pushDot = () => {
    if (result.includes(".")) {
    } else {
      setResult(result + ".");
    }
  };

  const clearAll = () => {
    setResult("0");
    setMemory("0");
    setOperator("");
  };

  console.log(result);
  console.log(memory);
  console.log(operator);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            value={result}
          />
        </Grid>
        {buttonName.map((name, key) => (
          <Grid item key={key} xs={3}>
            <Button onClick={() => handleClick(name)}>{name}</Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button fullWidth onClick={() => calculateResult()}>
            =
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Calculator;
