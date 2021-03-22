import React, { useRef } from "react";
import {
  InputGroup,
  Input,
  Label,
  TextError,
  TextSuccess,
} from "./CustomInput.styles";
const CustomInput = ({
  onChange,
  label,
  value,
  touched,
  valid,
  validationErrors,
  ...otherProps
}) => {
  const transformedErrors =
    validationErrors && validationErrors.length
      ? validationErrors.map((error, idx) => {
          return idx === validationErrors.length - 1 ? error : error + ", ";
        })
      : "";
  const border = touched ? (transformedErrors ? "error" : "success") : null;
  const inputRef = useRef(null);
  const handleClick = (e) => {
    inputRef.current.focus();
  };
  return (
    <InputGroup>
      <Input
        onChange={onChange}
        value={value}
        {...otherProps}
        border={border}
        ref={inputRef}
      />
      <Label shrinkLabel={!!value} onClick={handleClick}>
        {label}
      </Label>
      {touched ? (
        transformedErrors ? (
          <TextError>{transformedErrors}</TextError>
        ) : (
          <TextSuccess>Valid Field</TextSuccess>
        )
      ) : null}
    </InputGroup>
  );
};

export default CustomInput;
