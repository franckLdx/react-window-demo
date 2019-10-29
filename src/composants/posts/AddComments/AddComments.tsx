import React, { useCallback, useContext } from 'react';
import { Modal, Button, Header, Form, InputOnChangeData, TextAreaProps, Message } from 'semantic-ui-react';
import { useLocalStore, useObserver, observer, useComputed } from 'mobx-react-lite';
import { ApiContext } from '../../../services/context';
import { createStore, StoreContext } from './store';

interface AddCommentButtonProps {
  postId: number
}

export const AddCommentButton: React.FC<AddCommentButtonProps> = ({ postId }) => {
  const api = useContext(ApiContext)!;
  const localStore = useLocalStore(createStore, { postId, api });

  return useObserver(() =>
    <StoreContext.Provider value={localStore}>
      <Modal
        closeIcon
        open={localStore.openStatus}
        onClose={localStore.toggleOpen}
        trigger={
          <Button
            primary
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            onClick={localStore.toggleOpen}
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
    </StoreContext.Provider >
  );
};

const TheForm: React.FC = observer(() => {
  const localStore = useContext(StoreContext)!;
  const onChange = useCallback((_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, data: InputOnChangeData | TextAreaProps) => {
    if (data.value !== undefined && typeof data.value !== "string") {
      throw new Error(`Unexpected field data type: ${data.type}`)
    }
    localStore.updateField(data.name, data.value);
  }, [localStore]);

  return (
    <Form loading={localStore.saveStatus === 'saving'} >
      <Form.Input
        name='title'
        label="Title"
        placeholder='Title'
        required
        disabled={!localStore.canEdit}
        onChange={onChange}
      />
      <Form.TextArea
        name='comment'
        label="Comment"
        placeholder='Tell us more'
        rows={5}
        onChange={onChange}
        required
        disabled={!localStore.canEdit}
      />
      <Form.Input
        name='email'
        label="Email"
        type='email'
        placeholder='Who are you ?'
        onChange={onChange}
        disabled={!localStore.canEdit}
      />
    </Form>
  );
});

const TheMessage: React.FC = observer(() => {
  const localStore = useContext(StoreContext)!;
  const message = useComputed(() => {
    switch (localStore.saveStatus) {
      case 'toSave':
        return 'Please fill the form and Press Save to add comment';
      case 'saving':
        return 'Saving...';
      case 'successfull':
        return 'Saved !';
      case 'failure':
        return 'Oups, your comment has not been saved';
    }
  });

  return (
    <Message
      warning={localStore.saveStatus === "toSave"}
      success={localStore.saveStatus === "successfull"}
      error={localStore.saveStatus === "failure"}
    >
      {message}
    </Message>
  );
});

const TheButtons: React.FC = observer(() => {
  const localStore = useContext(StoreContext)!;
  return (
    <>
      <Button
        content="Save"
        icon="checkmark"
        color='green'
        disabled={!localStore.canSave()}
        onClick={localStore.save}
      />
      <Button
        content={localStore.canEdit() ? 'Cancel' : 'Close'}
        icon="remove"
        color='red'
        disabled={localStore.saveStatus === 'saving'}
        onClick={localStore.toggleOpen}
      />
    </>
  );
});
