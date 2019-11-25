import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  List,
  Colors,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  HelperText,
  Button,
  Checkbox,
} from 'react-native-paper';
import TodoModel from '../models/TodoModel';
import {store} from '../../redux/Store';

export const TodoView = props => {
  const {
    title: passedPropsTitle,
    description: passedPropsDesc,
    finished: passedPropsFinished,
    id,
  } = props.item;

  const [passedTitle, setPassedTitle] = React.useState(passedPropsTitle);
  const [passedDesc, setPassedDesc] = React.useState(passedPropsDesc);
  const [passedFinished, setPassedFinished] = React.useState(
    passedPropsFinished,
  );
  const [error, setError] = React.useState('');
  const [title, setTitle] = React.useState(passedTitle);
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = React.useState(passedDesc);
  const [finished, setFinished] = React.useState(passedFinished);

  const editTodoFromDialog = async () => {
    if (title.length === 0 || description.length === 0) {
      setError('Title and description are required.');
      return;
    }

    const user = store.getState().user;
    const todo = new TodoModel(user, title, description, finished, id);

    try {
      await todo.edit();
    } catch (err) {
      setError(err.message);
      return;
    }

    setPassedTitle(title);
    setPassedDesc(description);
    setPassedFinished(finished);
    setVisible(false);
  };

  const deleteTodoFromDialog = () => {
    const user = store.getState().user;
    const todo = new TodoModel(user, title, description, finished, id);

    try {
      todo.dismiss();
    } catch (err) {
      setError(err.message);
      return;
    }

    setVisible(false);
    props.removeTodo(id);
  };

  return (
    <>
      <List.Item
        onPress={() => {
          setVisible(true);
        }}
        title={passedTitle}
        description={passedDesc}
        right={pprops => {
          if (passedFinished) {
            return (
              <List.Icon
                {...pprops}
                color={Colors.green300}
                icon="check-circle"
              />
            );
          }

          return null;
        }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Edit your todo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Editing your todo will also change it in strapi.
            </Paragraph>

            <View style={styles.divider} />

            <TextInput
              label="title"
              placeholder="title"
              onChangeText={text => {
                setTitle(text);
                setError(false);
              }}>
              {title}
            </TextInput>

            <View style={styles.divider} />

            <TextInput
              label="description"
              placeholder="description"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => {
                setDescription(text);
                setError(false);
              }}>
              {description}
            </TextInput>

            <HelperText type="error">{error}</HelperText>
            {error.length > 0 ? <View style={styles.divider} /> : null}

            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Checkbox
                status={finished ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFinished(!finished);
                }}
              />
              <Paragraph style={{paddingLeft: 16, alignSelf: 'center'}}>
                Finished
              </Paragraph>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => deleteTodoFromDialog()}>delete</Button>
            <View style={{flex: 1}} />
            <Button
              onPress={() => {
                setVisible(false);
                setError('');
              }}>
              Cancel
            </Button>
            <Button onPress={() => editTodoFromDialog()}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 16,
  },
});

export default TodoView;
