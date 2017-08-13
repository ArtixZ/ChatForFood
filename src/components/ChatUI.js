import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import ReversedFlatList from 'react-native-reversed-flat-list';
import { send, subscribe } from 'react-native-training-chat-server';

import Header from './Header';
import { MessageBubble } from './common';
import { messageSent, getResponse } from '../actions';
import PreloadHOC from '../reducers/PreloadHOC';

const TITLE = 'ChatForFood';

class ChatUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      typing: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    if (this.state.typing) {
        this.props.messageSent(this.state.typing);        
        this.setState({ typing: null });
        this.props.getResponse(this.state.typing);
    }
  }
  renderRow(rowData) {
        const { msg_id, timestamp, direction, body } = rowData.item;
        return (
            <MessageBubble
                key={rowData.index}
                outOrIn={direction}
                timestamp={timestamp}
                body={body}
            />
             
        ); 
    }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <Header title={TITLE} />
        <ReversedFlatList
          data={messages}
          renderItem={this.renderRow}
          keyboardShouldPersistTaps={'never'}
          keyboardDismissMode={'on-drag'}
          />
        <View style={{height: 10}} />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="What to have"
              onChangeText={text => this.setState({ typing: text })}
              />
            <TouchableOpacity onPress={this.sendMessage}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});

const mapStateToProps = ({ messages }) => {
    return { messages };
};

export default connect(mapStateToProps, {messageSent, getResponse})(PreloadHOC(ChatUI));
