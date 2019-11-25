import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  IconButton,
  ActivityIndicator,
  Button,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  HelperText,
  Divider,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {store} from '../../redux/Store';
import TodoView from '../../app/views/TodoView';
import TodoModel from '../../app/models/TodoModel';

/**
 * the footer also acts as the load more
 * indicator.
 */
export const TodoFooter = props => {
  return (
    <>
      {props.shouldLoadMore ? (
        <View style={styles.loaderView}>
          <ActivityIndicator animating />
        </View>
      ) : null}
    </>
  );
};

/**
 * This is our header for the list that also
 * includes the todo.add action.
 */
export const TodoHeader = props => {
  const [error, setError] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const createTodoFromDialog = async () => {
    if (title.length === 0 || description.length === 0) {
      setError('Title and description are required.');
      return;
    }

    const user = store.getState().user;
    const todo = new TodoModel(user, title, description);

    try {
      await todo.save();
    } catch (err) {
      setError(err.message);
    }

    props.addTodo(todo);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.text || "Your to do's"}</Text>
      <View style={styles.buttonFrame}>
        {!props.text ? (
          <Button
            onPress={() => setVisible(true)}
            style={{marginLeft: 16}}
            mode="outlined">
            Add a todo
          </Button>
        ) : null}
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Create a new todo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Adding a new todo will save to in strapi so you can use it later.
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
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                setTitle('');
                setDescription('');
                setError('');
              }}>
              Cancel
            </Button>
            <Button onPress={() => createTodoFromDialog()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

/**
 * in case no todos were fetched on initial fetch
 * we can assume that there are none for this specific
 * user.
 */
export const EmptyTodo = props => {
  const [error, setError] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const createTodoFromDialog = async () => {
    if (title.length === 0 || description.length === 0) {
      setError('Title and description are required.');
      return;
    }

    const user = store.getState().user;
    const todo = new TodoModel(user, title, description);

    try {
      await todo.save();
    } catch (err) {
      setError(err.message);
    }

    props.addTodo(todo);
  };

  return (
    <View style={styles.emptyBase}>
      <TodoHeader text={'Pretty empty here ..'} />
      <Button
        onPress={() => setVisible(true)}
        style={styles.btn}
        mode="contained">
        Create a new todo
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Create a new todo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Adding a new todo will save to in strapi so you can use it later.
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
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                setTitle('');
                setDescription('');
                setError('');
              }}>
              Cancel
            </Button>
            <Button onPress={() => createTodoFromDialog()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

/**
 * the main list component holding all of the loading
 * and pagination logic.
 */
export const TodoList = props => {
  const [data, setData] = React.useState([]);
  const [limit] = React.useState(10);
  const [start, setStart] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [shouldLoadMore, setShouldLoadMore] = React.useState(true);

  /**
   * get the data from the server in a paginated manner
   *
   * 1. should no data be present start the normal loading
   * animation.
   *
   * 2. should data be present start the loading more
   * animation.
   */
  const getTodosForUser = React.useCallback(async () => {
    if (!shouldLoadMore) {
      return;
    }

    if (!loading && data.length === 0) {
      setLoading(true);
    }

    if (!loadingMore && data.length > 0) {
      setLoadingMore(true);
    }

    const url = `http://192.168.0.57:1337/todos?_start=${start}&_limit=${limit}`;
    const jwt = store.getState().jwt;
    const response = await fetch(url, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
    const json = await response.json();

    if (json.length < 10) {
      setShouldLoadMore(false);
    } else {
      setStart(start + limit);
    }

    setData([...data, ...json]);
    setLoading(false);
    setLoadingMore(false);
  }, [data, limit, loading, loadingMore, shouldLoadMore, start]);

  /**
   * saves a new todo to the server by creating a new TodoModel
   * from the dialog data and calling Todo.save()
   */
  const addTodo = todo => {
    const {title, description, finished, user, id} = todo;
    setData([...data, ...[{title, description, finished, user, id}]]);
  };

  /**
   * callback method for the todo view. Deletes a todo from the list
   * after it has been deleted from the server.
   */
  const removeTodo = id => {
    setData(data.filter(item => item.id !== id));
  };

  React.useEffect(() => {
    getTodosForUser();
  }, [getTodosForUser]);

  if (loading) {
    return (
      <View style={styles.loaderBase}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (!shouldLoadMore && !loading && !loadingMore && data.length === 0) {
    return <EmptyTodo addTodo={addTodo} />;
  }

  return (
    <>
      <FlatList
        style={styles.base}
        data={data}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => <TodoHeader addTodo={addTodo} />}
        ListFooterComponent={() => (
          <TodoFooter shouldLoadMore={shouldLoadMore} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => getTodosForUser()}
        renderItem={({item, index}) => (
          <TodoView removeTodo={removeTodo} item={item} index={index} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyBase: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
    padding: 32,
    paddingLeft: 16,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  btn: {
    height: 50,
    paddingTop: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  loaderBase: {
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  divider: {
    height: 16,
  },
  buttonFrame: {
    justifyContent: 'center',
  },
});
