import React, { useCallback, useReducer, useMemo } from 'react';
import { Modal, Button, Header, Icon, Form, InputOnChangeData, TextAreaProps, Message } from 'semantic-ui-react';

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
}

type Fields = keyof State['fields'];

const initialState: State = {
  fields: {
    title: '',
    comment: '',
    email: '',
  },
  savedStatus: 'toSave',
}

type Action = {
  type: 'UPDATE_FIELD',
  name: Fields,
  value: string | undefined,
}
  | { type: 'SAVE' }
  | { type: 'SAVE_RESULT', success: boolean }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const fields = { ...state.fields, [action.name]: action.value };
      const canSave = Object.values(fields).reduce(
        (acc, value) => value === undefined || value === '' ? false : acc,
        true
      );
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
    default:
    // throw Error(`Unexpected action:${action.type}`);
  }
  return state;
}

export const AddCommentButton: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canSave = useMemo(
    () => {
      return Object.values(state.fields).reduce(
        (acc, value) => value === undefined || value === '' ? false : acc,
        true);
    },
    [state.fields]
  );
  const onChange = useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, data: InputOnChangeData | TextAreaProps) => {
    if (data.value !== undefined && typeof data.value !== "string") {
      throw new Error(`Unexpected field data type: ${data.type}`)
    }
    dispatch({ type: 'UPDATE_FIELD', name: data.name, value: data.value });
  }, []);
  const onSave = useCallback(() => {
    dispatch({ type: 'SAVE' });
    setTimeout(
      () => dispatch({ type: 'SAVE_RESULT', success: false }),
      500
    )
  }, [dispatch]);
  const canEdit = useMemo(
    () => state.savedStatus !== 'saving' && state.savedStatus !== 'successfull',
    [state]
  );
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
    <Modal closeIcon trigger={< Button content='Add Comment' labelPosition='left' icon='edit' primary />}>
      < Header icon='archive' content='Add a comment for this post' />
      <Modal.Content>
        <Form loading={state.savedStatus === 'saving'}>
          <Form.Field required disabled={!canEdit}>
            <label>Title</label>
            <Form.Input placeholder='Title' name={title} onChange={onChange} />
          </Form.Field>
          <Form.Field required disabled={!canEdit}>
            <label>Comment</label>
            <Form.TextArea rows={5} placeholder='Tell us more' name={comment} onChange={onChange} />
          </Form.Field>
          <Form.Field required disabled={!canEdit}>
            <label>Email</label>
            <Form.Input placeholder='Who are you ?' name='email' type={email} onChange={onChange} />
          </Form.Field>
        </Form>
        <Message
          warning={state.savedStatus === "toSave"}
          success={state.savedStatus === "successfull"}
          error={state.savedStatus === "failure"}
        >
          {message}
        </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' disabled={!canSave || !canEdit} onClick={onSave}>
          <Icon name='checkmark' /> Save
        </Button>
        <Button color='red' disabled={state.savedStatus === 'saving'}>
          <Icon name='remove' /> {canEdit ? 'Cancel' : 'Close'}
        </Button>
      </Modal.Actions>
    </Modal >
  );
};
