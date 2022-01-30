import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const isEmpty = (value) => value.trim() === "";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
    author: true,
    text: true,
  });

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    const enteredAuthorIsValid = !isEmpty(enteredAuthor);
    const enteredTextIsValid = !isEmpty(enteredText);

    setFormInputsValidity({
      author: enteredAuthorIsValid,
      text: enteredTextIsValid,
    });

    const formisValid = enteredTextIsValid && enteredTextIsValid;

    if (formisValid)
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const formFocusHandler = () => {
    setIsEntering(true);
  };
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };
  const authorControlClasses = `${classes.control}${
    formInputsValidity.author ? "" : classes.invalid
  }`;
  const textControlClasses = `${classes.control}${
    formInputsValidity.text ? "" : classes.invalid
  }`;

  return (
    <>
      <Prompt
        when={isEntering}
        message="Are you sure, you want to exit. Your data will be lost!!!"
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={authorControlClasses}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={textControlClasses}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
