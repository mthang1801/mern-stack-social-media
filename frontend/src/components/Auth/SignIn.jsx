import React from 'react';
import {
  CustomFormContainer,
  FormHeader,
  Title,
  SubTitle,
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  FlashForm,
  ErrorMessage,
  TextForm,
} from './AuthForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import GoogleRecaptcha from './GoogleRecapcha';
import FacebookAuth from './GoogleAuth';
import GoogleAuth from './FacebookAuth';
import { LOGIN } from '../../apollo/user/user.types';
import { useLazyQuery } from '@apollo/client';
import { login } from './Auth.utility';
import TextField from '@material-ui/core/TextField';
function withLoginQuery(WrappedComponent) {
  return function QueryWrapper(props) {
    const [loginUser, { loading, data, error }] = useLazyQuery(LOGIN, {
      fetchPolicy: 'cache-and-network',
    });
    return (
      <WrappedComponent
        data={data}
        loading={loading}
        error={error}
        loginUser={loginUser}
        {...props}
      />
    );
  };
}

const SignIn = withLoginQuery(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.signInRef = React.createRef();
      this._isMounted = true;
    }
    state = {
      email: '',
      password: '',
      disabled: true,
      captcha_value: null,
      loading: false,
      captcha_loaded: false,
    };

    timer = null;
    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ captcha_loaded: true });
      }, 50);
      if (this.signInRef.current) {
        window.scrollTo({
          top: this.signInRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
    unsubscribeLogin;
    async componentDidUpdate(prevProps) {
      if (prevProps.error !== this.props.error) {
        this.clearForm();
      }
      if (prevProps.data !== this.props.data && this.props.data) {
        const { user, token, tokenExpire } = this.props.data.loginUser;
        if (this._isMounted) {
          this.unsubscribeLogin = await login(user, token, tokenExpire);
          this.clearForm();
        }
      }
    }
    componentWillUnmount() {
      clearTimeout(this.timer);
      this._isMounted = false;
      if (this.unsubscribeLogin) {
        this.unsubscribeLogin();
      }
    }
    clearForm = () => {
      this.setState({
        email: '',
        password: '',
        disabled: true,
        captcha_loaded: false,
      });
      setTimeout(() => {
        this.setState({ captcha_loaded: true });
      }, 10);
    };

    onSubmitSigninForm = async (e) => {
      e.preventDefault();
      this.setState({ loading: true });
      const { email, password } = this.state;
      if (!email || !password) {
        this.setState({
          error: 'Email và mật khẩu không được để trống',
          loading: false,
        });
        return;
      }
      this.props.loginUser({ variables: { email, password } });
      this.setState({ loading: false });
    };
    handleChangeGoogleRecaptcha = (value) => {
      this.setState({ captcha_value: value, disabled: false });
      if (value === null) this.setState({ disabled: true });
    };

    render() {
      const { email, password, disabled, loading, captcha_loaded } = this.state;
      const { authPath, error } = this.props;
      return (
        <CustomFormContainer
          onSubmit={this.onSubmitSigninForm}
          ref={this.signInRef}
        >
          <FormHeader>
            <Title>Đăng nhập</Title>
            <SubTitle>Đăng nhập tài khoản bằng email và mật khẩu</SubTitle>
          </FormHeader>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <FlashForm>
            <FacebookAuth />
            <GoogleAuth />
          </FlashForm>
          <FormGroups>
            <TextForm>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                name="email"
                value={email}
                label="Email"
                onChange={this.handleChange}
                required
              />
            </TextForm>
            <TextForm>
              <TextField
                variant="outlined"
                size="small"
                type="password"
                name="password"
                value={password}
                label="Password"
                onChange={this.handleChange}
                required
                autocomplete="on"
              />
            </TextForm>

            {captcha_loaded && (
              <GoogleRecaptcha onChange={this.handleChangeGoogleRecaptcha} />
            )}

            <Button
              variant="outlined"
              size="medium"
              disabled={disabled || loading}
              color="primary"
              style={{ marginTop: '1rem' }}
              type="submit"
            >
              <span>Sign In</span>
              {loading && (
                <CircularProgress size={14} style={{ marginLeft: '1rem' }} />
              )}
            </Button>
          </FormGroups>
          <FormActions>
            <Option>
              Don't have account ?{' '}
              <StyledLink to={`${authPath}/signup`}>Signup account</StyledLink>
            </Option>
            <Option>
              Forgot password ?{' '}
              <StyledLink to={`${authPath}/restore-account`}>
                Get Password Again.
              </StyledLink>
            </Option>
          </FormActions>
        </CustomFormContainer>
      );
    }
  }
);

export default withRouter(SignIn);
