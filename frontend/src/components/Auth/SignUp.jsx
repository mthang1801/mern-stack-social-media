import React from "react";
import {
  CustomFormContainer,
  FormHeader,
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  FlashForm,
  Title,
  SubTitle,
  ErrorMessage,
} from "./AuthForm";
import CustomInput from "../Custom/CustomInput";
import CustomButton from "../Custom/CustomButton";
import { withRouter } from "react-router-dom";
import GoogleRecaptcha from "./GoogleRecapcha";
import FacebookLogin from "./GoogleAuth";
import GoogleLogin from "./FacebookAuth";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../apollo/operations/mutations";
import mutations from "../../apollo/operations/mutations";
import {login} from "../../utils/auth"
const INITIAL_STATE = {
  controls: {
    name: {
      type: "text",
      name: "name",
      valid: false,
      label: "Name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    email: {
      type: "email",
      name: "email",
      label: "Email",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    password: {
      type: "password",
      name: "password",
      valid: false,
      label: "Password",
      validation: {
        required: true,
        minLength: 6,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        match: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
  },
  formIsValid: false,
  loaded: false,
  disabled: true,
  title: "",
};

function withSignUpMutation(WrappedComponent) {
  return function MutationWrapper(props) {
    const [createUser, { data, loading, error }] = useMutation(SIGNUP, {errorPolicy : "all"});
    const {setCurrentUser} = mutations    
    return (
      <WrappedComponent
        createUser={createUser}        
        data={data}
        setCurrentUser={setCurrentUser}
        loading={loading}        
        error={error}        
        {...props}
      />
    );
  };
}

const SignUp = withSignUpMutation(
  class extends React.Component {
    state = { ...INITIAL_STATE };
    timer = null ;
    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ loaded: true });
      }, 0);
    }
    componentWillUnmount(){
      clearTimeout(this.timer)
    }
    componentDidUpdate(prevProps){
      if(prevProps.error !== this.props.error){
        this.clearForm();        
      }
      if(prevProps.data !== this.props.data && this.props.data )  {
        const { user, token, tokenExpire} = this.props.data.createUser;             
        this.props.setCurrentUser({...user})
        login(token, tokenExpire)
        this.clearForm() ;
      }
    }

    clearForm = () => {
      this.setState({...INITIAL_STATE});      
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 0);
    }
    
    checkValidity = (value, rules) => {
      let isValid = true;
      let errorsMessage = [];
      if (rules.required) {
        isValid = value.trim().length && isValid;
        if (!isValid) {
          errorsMessage.push("This field is required");
        }
      }
      if (rules.isEmail) {
        const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
        if (!isValid) {
          errorsMessage.push("Email is invalid");
        }
      }
      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
        if (!isValid) {
          errorsMessage.push(`Invalid, at least ${rules.minLength} characters`);
        }
      }
      if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
        if (!isValid) {
          errorsMessage.push(`Invalid, at most ${rules.maxLength} characters`);
        }
      }
      if (rules.match) {
        isValid =
          value.trim() === this.state.controls.password.value && isValid;
        if (!isValid) {
          errorsMessage.push("Password and confirm Password do not match");
        }
      }
      return errorsMessage;
    };

    handleChange = (e, name) => {
      let updatedControls = { ...this.state.controls };
      let updatedControlElement = { ...updatedControls[name] };
      updatedControlElement.value = e.target.value;
      const checkValid = this.checkValidity(
        e.target.value,
        updatedControlElement.validation
      );
      updatedControlElement.valid = checkValid.length === 0;
      updatedControlElement.touched = true;
      updatedControlElement.validationErrors = checkValid;
      updatedControls[name] = updatedControlElement;
      let { email, password, confirmPassword } = updatedControls;
      const formIsValid =
        email.valid &&
        updatedControlElement.valid &&
        password.valid &&
        confirmPassword.valid;
      this.setState({ controls: updatedControls, formIsValid });
    };

    handleSubmitSignUpForm = (e) => {
      e.preventDefault();
      if (!this.state.formIsValid) {
        this.setState({ ...INITIAL_STATE });
        return;
      }
      const { name, email, password } = this.state.controls;

      this.props.createUser({
        variables: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });
    };

    handleChangeGoogleRecaptcha = (value) => {
      this.setState({ captcha_value: value, disabled: false });
      if (value === null) this.setState({ disabled: true });
    };

    render() {      
      const { formIsValid, loaded, disabled } = this.state;
      let formInputArray = [];
      Object.keys(this.state.controls).forEach((controlItem) => {
        formInputArray.push(this.state.controls[controlItem]);
      });
      const { error, loading } = this.props;   
         
      if(!loaded) return <div>Loading...</div>
      return (
        <CustomFormContainer onSubmit={this.handleSubmitSignUpForm}>
          <FormHeader>
            <Title>Sign Up</Title>
            <SubTitle>Sign up your account via email and password.</SubTitle>
          </FormHeader>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {loading && <h2>Loading...</h2>}
          <FlashForm>
            <FacebookLogin />
            <GoogleLogin />
          </FlashForm>
          <FormGroups>
            {formInputArray.map(
              ({
                label,
                name,
                touched,
                type,
                valid,
                validation,
                validationErrors,
                value,
              }) => (
                <CustomInput
                  key={name}
                  type={type}
                  name={name}
                  value={value}
                  label={label}
                  onChange={(e) => this.handleChange(e, name)}
                  require={validation.required}
                  touched={touched}
                  valid={valid}
                  validationErrors={validationErrors}
                />
              )
            )}
            {loaded && (
              <GoogleRecaptcha onChange={this.handleChangeGoogleRecaptcha} />
            )}
            <CustomButton
              variant="outlined"
              size="small"
              color="#0d47a1"
              bgColor="blue"
              disabled={!formIsValid || disabled}
            >
              Submit
            </CustomButton>
          </FormGroups>
          <FormActions>
            <Option>
              <StyledLink to="/auth">Signin account</StyledLink>
            </Option>
            <Option>
              Forgot password ?{" "}
              <StyledLink to="/auth/restore-account">
                Get Password Again.
              </StyledLink>
            </Option>
          </FormActions>
        </CustomFormContainer>
      );
    }
  }
);

export default withRouter(SignUp);
