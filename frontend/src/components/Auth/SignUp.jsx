import React from 'react';
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
  TextForm,
  ValidTextField,
  FormBackground,
} from './AuthForm';
import { AiFillCheckCircle } from 'react-icons/ai';
import CustomButton from '../Custom/CustomButton';
import { withRouter } from 'react-router-dom';
import GoogleRecaptcha from './GoogleRecapcha';
import FacebookLogin from './FacebookAuth';
import GoogleLogin from './GoogleAuth';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../apollo/user/user.types';
import { login } from './Auth.utility';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ThemeAuth from '../../assets/images/theme-auth.jpg';
const INITIAL_STATE = {
  controls: {
    name: {
      type: 'text',
      name: 'name',
      valid: false,
      label: 'Name',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      value: '',
      touched: false,
      validationErrors: '',
    },
    email: {
      type: 'email',
      name: 'email',
      label: 'Email',
      valid: false,
      validation: {
        required: true,
        isEmail: true,
        regex:
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      },
      value: '',
      touched: false,
      validationErrors: '',
    },
    password: {
      type: 'password',
      name: 'password',
      valid: false,
      label: 'Password',
      validation: {
        required: true,
        isPassword: true,
        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      },
      value: '',
      touched: false,
      validationErrors: '',
    },
    confirmPassword: {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      valid: false,
      validation: {
        required: true,
        match: true,
      },
      value: '',
      touched: false,
      validationErrors: '',
    },
  },
  formIsValid: false,
  captcha_loaded: false,
  disabled: true,
  title: '',
};

function withSignUpMutation(WrappedComponent) {
  return function MutationWrapper(props) {
    const [createUser, { data, loading, error }] = useMutation(SIGNUP, {
      errorPolicy: 'all',
    });
    return (
      <WrappedComponent
        createUser={createUser}
        data={data}
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
    timer = null;
    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ captcha_loaded: true });
      }, 0);
    }
    componentWillUnmount() {
      clearTimeout(this.timer);
      if (this.unsubcribeLogin) {
        this.unsubcribeLogin();
      }
    }
    unsubcribeLogin;
    async componentDidUpdate(prevProps) {
      if (prevProps.error !== this.props.error) {
        this.clearForm();
      }
      if (prevProps.data !== this.props.data && this.props.data) {
        const { user, token, tokenExpire } = this.props.data.createUser;
        console.log(user);
        this.unsubcribeLogin = await login(user, token, tokenExpire);
        this.clearForm();
      }
    }

    clearForm = () => {
      this.setState({ ...INITIAL_STATE });
      setTimeout(() => {
        this.setState({ captcha_loaded: true });
      }, 0);
    };

    checkValidity = (value, rules) => {
      let isValid = true;
      let errorsMessage = [];
      if (rules.required) {
        isValid = value.trim().length && isValid;
        if (!isValid) {
          errorsMessage.push('This field is required');
        }
      }
      if (rules.regex) {
        isValid = rules.regex.test(value) && isValid;
        if (!isValid) {
          if (rules.isEmail) {
            errorsMessage.push('Email is invalid');
          }
          if (rules.isPassword) {
            errorsMessage.push('Password is invalid');
          }
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
        isValid = value === this.state.controls.password.value && isValid;
        if (!isValid) {
          errorsMessage.push('Password and confirm Password do not match');
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
      const { formIsValid, captcha_loaded, disabled } = this.state;
      let formInputArray = [];
      Object.keys(this.state.controls).forEach((controlItem) => {
        formInputArray.push(this.state.controls[controlItem]);
      });
      const { error, loading } = this.props;
      return (
        <FormBackground background={ThemeAuth}>
          <CustomFormContainer onSubmit={this.handleSubmitSignUpForm}>
            <FormHeader>
              <Title>Sign Up</Title>
              <SubTitle>Sign up your account via email and password.</SubTitle>
            </FormHeader>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <FlashForm>
              {/* <FacebookLogin /> */}
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
                  <TextForm valid={valid && touched}>
                    <TextField
                      size="small"
                      key={name}
                      type={type}
                      variant="outlined"
                      name={name}
                      value={value}
                      error={!valid && touched}
                      label={label}
                      onChange={(e) => this.handleChange(e, name)}
                      required={validation.required}
                      helperText={validationErrors}
                    />
                    {valid && touched ? (
                      <ValidTextField>
                        <AiFillCheckCircle />
                      </ValidTextField>
                    ) : null}
                  </TextForm>
                )
              )}

              {captcha_loaded && (
                <GoogleRecaptcha onChange={this.handleChangeGoogleRecaptcha} />
              )}
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                disabled={!formIsValid || disabled}
                type="submit"
              >
                <span>Submit</span>
                {loading && (
                  <CircularProgress
                    size={12}
                    style={{ marginLeft: '0.5rem' }}
                  />
                )}
              </Button>
            </FormGroups>
            <FormActions>
              <Option>
                <StyledLink to="/auth">Signin account</StyledLink>
              </Option>
              <Option>
                Forgot password ?{' '}
                <StyledLink to="/auth/restore-account">
                  Get Password Again.
                </StyledLink>
              </Option>
            </FormActions>
          </CustomFormContainer>
        </FormBackground>
      );
    }
  }
);

export default withRouter(SignUp);
