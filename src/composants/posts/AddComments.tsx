import React, { useCallback, useReducer, useMemo, useContext } from 'react';
import { Modal, Button, Header, Form, InputOnChangeData, TextAreaProps, Message } from 'semantic-ui-react';
import { apiContext } from '../../services/context';
import { useDispatch } from 'react-redux';
import { loadCommentsOfPost } from '../../state';

interface AddCommentButtonProps {
  postId: number
}

export const AddCommentButton: React.FC<AddCommentButtonProps> = ({ postId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canEdit = useMemo(
    () => state.savedStatus !== 'saving' && state.savedStatus !== 'successfull',
    [state]
  );
  const togleOpen = useCallback(
    () => { dispatch({ type: 'TOGLE_OPEN_STATUS' }) },
    [dispatch]
  );

  return (
    <context.Provider value={{ postId, state, dispatch, canEdit, onClose: togleOpen }} >
      <Modal
        closeIcon
        open={state.openStatus}
        onClose={togleOpen}
        trigger={
          < Button
            primary
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            onClick={togleOpen}
          />
        }>

        <Header icon='archive' content='Add a comment for this post' />

        <Modal.Content>
          <TheForm />
          <TheMessage />
        </Modal.Content>

        <Modal.Actions>
          <TheButtons />
        </Modal.Actions>

      </Modal >
    </context.Provider>
  );
};

const TheForm: React.FC = () => {
  const { state, dispatch, canEdit } = useContext(context);
  const onChange = useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, data: InputOnChangeData | TextAreaProps) => {
    if (data.value !== undefined && typeof data.value !== "string") {
      throw new Error(`Unexpected field data type: ${data.type}`)
    }
    dispatch({ type: 'UPDATE_FIELD', name: data.name, value: data.value });
  }, [dispatch]);

  return (
    <Form loading={state.savedStatus === 'saving'} >
      <Form.Input
        name={title}
        label="Title"
        placeholder='Title'
        required
        disabled={!canEdit}
        onChange={onChange}
      />
      <Form.TextArea
        name={comment}
        label="Comment"
        placeholder='Tell us more'
        rows={5}
        onChange={onChange}
        required
        disabled={!canEdit}
      />
      <Form.Input
        name='email'
        label="Email"
        type={email}
        placeholder='Who are you ?'
        onChange={onChange}
        disabled={!canEdit}
      />
    </Form>
  );
};

const TheMessage: React.FC = () => {
  const { state } = useContext(context);
  const message = useMemo(() => {
    switch (state.savedStatus) {
      case 'toSave':
        return 'Please fill the form and Press Save to add comment';
      case 'saving':
        return 'Saving...';
      case 'successfull':
        return 'Saved !';
      case 'failure':
        return 'Oups, your comment has not been saved';
    }
  }, [state]);

  return (
    <Message
      warning={state.savedStatus === "toSave"}
      success={state.savedStatus === "successfull"}
      error={state.savedStatus === "failure"}
    >
      {message}
    </Message>
  );
};

const TheButtons: React.FC = () => {
  const { postId, state, dispatch, canEdit, onClose } = useContext(context);
  const api = useContext(apiContext);
  const reduxDispatch = useDispatch();
  const canSave = useMemo(
    () => {
      return Object.values(state.fields).reduce(
        (acc, value) => value === undefined || value === '' ? false : acc,
        true);
    },
    [state.fields]
  );
  const onSave = useCallback(async () => {
    dispatch({ type: 'SAVE' });
    api!.addComments(postId, state.fields.title, state.fields.comment, state.fields.email)
      .then(() => {
        dispatch({ type: 'SAVE_RESULT', success: true });
        reduxDispatch(loadCommentsOfPost(postId, true));
      })
      .catch(() => dispatch({ type: 'SAVE_RESULT', success: false }))
  }, [dispatch, api, postId, state.fields]);

  return (
    <>
      <Button
        content="Save"
        icon="checkmark"
        color='green'
        disabled={!canSave || !canEdit}
        onClick={onSave}
      />
      <Button
        content={canEdit ? 'Cancel' : 'Close'}
        icon="remove"
        color='red'
        disabled={state.savedStatus === 'saving'}
        onClick={onClose}
      />
    </>
  );
}

const title = "title";
const comment = "comment";
const email = "email";

interface State {
  fields:
  {
    [title]: string;
    [comment]: string;
    [email]: string;
  },
  savedStatus: 'toSave' | 'saving' | 'successfull' | 'failure';
  openStatus: boolean;
}

type Fields = keyof State['fields'];

const initialState: State = {
  fields: {
    title: '',
    comment: '',
    email: '',
  },
  savedStatus: 'toSave',
  openStatus: false,
}

type Action = {
  type: 'UPDATE_FIELD',
  name: Fields,
  value: string | undefined,
}
  | { type: 'SAVE' }
  | { type: 'SAVE_RESULT', success: boolean }
  | { type: 'TOGLE_OPEN_STATUS' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      return {
        ...state,
        savedStatus: 'toSave',
        fields: { ...state.fields, [action.name]: action.value }
      }
    }
    case 'SAVE':
      return { ...state, savedStatus: 'saving' };
    case 'SAVE_RESULT':
      return { ...state, savedStatus: action.success ? 'successfull' : 'failure' };
    case 'TOGLE_OPEN_STATUS':
      const openStatus = !state.openStatus;
      return openStatus ? {
        ...state, openStatus
      } : initialState;
    default:
      throw Error(`Unexpected action:${action}`);
  }
}

interface ModalContext {
  state: State;
  dispatch: React.Dispatch<Action>;
  canEdit: boolean;
  postId: number;
  onClose: () => void;
}

const context = React.createContext<ModalContext>({} as ModalContext);
