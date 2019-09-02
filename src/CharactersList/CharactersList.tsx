import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppState, loadCharacters } from '../state';
import { DisplayCharacters } from './DisplayCharacters';


export const CharactersList: React.FC = () => {
  const dispatch = useDispatch();
  const loadStatus = useSelector((state: AppState) => state.characters.loadStatus)
  useEffect(() => { dispatch(loadCharacters()) }, [dispatch, loadStatus]);

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <>Please wait</>
    case 'error':
      return <>Oups, sorry something went wrong.<br />Better luck next time</>
    default:
      return <DisplayCharacters />
  }
}

