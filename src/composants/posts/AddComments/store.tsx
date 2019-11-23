import { createContext } from "react";
import { runInAction, configure } from "mobx";
import { Services } from "../../../services/context";

configure({ enforceActions: "observed" })

type SaveStatus = 'toSave' | 'saving' | 'successfull' | 'failure';

interface InitialState {
  fields:
  {
    title: string | undefined;
    comment: string | undefined;
    email: string | undefined;
  },
  saveStatus: SaveStatus;
  openStatus: boolean;
}

type Fields = keyof InitialState['fields'];

const initialState: InitialState = {
  fields: {
    title: '',
    comment: '',
    email: '',
  },
  saveStatus: 'toSave',
  openStatus: false,
}

export const createStore = ({ postId, api }: { postId: number, api: Services }) => {
  return {
    ...initialState,
    canEdit() {
      return canEditStatus.includes(this.saveStatus)
    },
    canSave() {
      const fielded = Object.values(this.fields).reduce(
        (acc, value) => isEmpty(value) ? false : acc,
        true);
      return this.canEdit() && fielded;
    },
    updateField(name: Fields, value: string | undefined) {
      runInAction(() => {
        this.fields[name] = value;
        this.saveStatus = 'toSave';
      });
    },
    toggleOpen() {
      runInAction(() => {
        this.openStatus = !this.openStatus
        if (!this.openStatus) {
          this.fields = initialState.fields;
          this.saveStatus = initialState.saveStatus;
        }
      })
    },
    async save() {
      runInAction(() => this.saveStatus = 'saving');
      try {
        await api.addComments(postId, this.fields.title!, this.fields.comment!, this.fields.email!)
        runInAction(() => this.saveStatus = 'successfull');
      }
      catch (err) {
        runInAction(() => this.saveStatus = 'failure');
      }
    },
    getMessage() {
      switch (this.saveStatus) {
        case 'toSave':
          return 'Please fill the form and Press Save to add comment';
        case 'saving':
          return 'Saving...';
        case 'successfull':
          return 'Saved !';
        case 'failure':
          return 'Oups, your comment has not been saved';
      }
    },
  }
}

const isEmpty = (value: string | undefined) => value === undefined || value === '';
const canEditStatus = ['toSave', 'failure'];

type Store = ReturnType<typeof createStore>;
export const StoreContext = createContext<Store | undefined>(undefined);