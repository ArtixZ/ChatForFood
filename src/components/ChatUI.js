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
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { connect } from 'react-redux';
import { send, subscribe } from 'react-native-training-chat-server';
import { Icon, Header } from 'react-native-elements';
import { ImagePicker } from 'expo';


// import Header from './Header';
import { MessageBubble, ReversedList } from './common';
import { messageSent, getResponse } from '../actions';
// import PreloadHOC from './PreloadHOC';

const TITLE = 'ChatForFood';

class ChatUI extends React.Component {
  static navigationOptions = {
    title: 'Olive',
    header: ( {navigate} ) => {
      return (
        <Header
          outerContainerStyles={{ backgroundColor: '#fff' }}
          leftComponent={{ icon: 'menu', type: 'entypo', color: '#43496A' }}
          centerComponent={{ text: 'Olive', style: { fontFamily: 'System', color: '#43496A', fontSize: 20 } }} 
          rightComponent={{ icon: 'heart', type: 'entypo', color: '#43496A' }}
        />)
    }
  }

  constructor(props){
    super(props);
    this.state = {
      typing: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillUpdate (nextProps, nextState) {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  

  sendMessage() {
    if (this.state.typing) {
        this.props.messageSent(this.state.typing);        
        this.setState({ typing: null });
        this.props.getResponse(this.state.typing);
    }
  }
  onCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  renderRow(rowData) {
        const { msg_id, timestamp, direction, body } = rowData.item;
        const { navigation } = this.props;
        return (
            <MessageBubble
                key={rowData.index}
                outOrIn={direction}
                timestamp={timestamp}
                body={body}
                navigation={navigation}
            />
             
        ); 
    }

  render() {
    const { messages } = this.props;
    return (
      <View style={styles.container}>
        <ReversedList
          data={messages}
          renderItem={this.renderRow}
          keyboardShouldPersistTaps={'never'}
          keyboardDismissMode={'on-drag'}
          />
        <View style={{height: 10}} />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <Icon
              type="entypo"
              onPress={this.onCamera}
              color='#F98324'
              iconStyle={styles.camera}
              name='camera' />
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="What to have..."
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
  camera: {
    paddingHorizontal: 10
  },
  input: {
    paddingRight: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: '#F98324',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});

const mapStateToProps = ({ messages }) => {
    return { messages };
};

// export default connect(mapStateToProps, {messageSent, getResponse})(PreloadHOC(ChatUI));
export default connect(mapStateToProps, {messageSent, getResponse})((ChatUI));

