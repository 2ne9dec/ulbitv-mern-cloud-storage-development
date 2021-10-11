import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../input/Input';
import './popup.scss';

const Popup = () => {
  const [dirName, setDirName] = useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  function createHandler() {
    dispatch(createDir(currentDir, dirName));
  }

  function createAndClosePopup() {
    createHandler();
    setDirName('');
    dispatch(setPopupDisplay('none'));
  }

  return (
    <div
      className='popup'
      onClick={() => dispatch(setPopupDisplay('none'))}
      style={{ display: popupDisplay }}
    >
      <div className='popup__content' onClick={(e) => e.stopPropagation()}>
        <div className='popup__header'>
          <div className='popup__title'>Создать новую папку</div>
          <button
            className='popup__close'
            onClick={() => dispatch(setPopupDisplay('none'))}
          >
            X
          </button>
        </div>
        <Input
          value={dirName}
          setValue={setDirName}
          type='text'
          placeholder='Введите название папки...'
        />
        <button className='popup__create' onClick={createAndClosePopup}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
