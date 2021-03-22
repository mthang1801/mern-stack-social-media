import React, { Fragment } from "react";
import { CustomButtonContainer, IconButton } from "./CustomButton.styles";
const CustomButton = ({ children, icon, positionIcon, ...props }) => {
  return (
    <CustomButtonContainer {...props}>
      {positionIcon === "before" ? (
        <Fragment>
          <IconButton>{icon}</IconButton>
          {children}
        </Fragment>
      ) : positionIcon === "after" ? (
        <Fragment>
          {children}
          <IconButton>{icon}</IconButton>
        </Fragment>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </CustomButtonContainer>
  );
};

export default CustomButton;
