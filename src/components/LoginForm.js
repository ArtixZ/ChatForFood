import React, { Component } from 'react';
import { 
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Button, Spinner, Input } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange(text) {
    this.setState({email: text});
  }

  onPasswordChange(text) {
    this.setState({password: text});
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.containerSty}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
          <View flex={1} />
        </TouchableWithoutFeedback>

        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              keyboardType="email-address"
              enablesReturnKeyAutomatically
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.state.email}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInputArea.focus()}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              enablesReturnKeyAutomatically
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.state.password}
              returnKeyType="done"
              onSubmitEditing={() => this.onButtonPress()}
              REF={ ref => this.passwordInputArea = ref}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
          <View flex={1} />
        </TouchableWithoutFeedback>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerSty: {
    flex: 1,
    justifyContent: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;

  return { error, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
