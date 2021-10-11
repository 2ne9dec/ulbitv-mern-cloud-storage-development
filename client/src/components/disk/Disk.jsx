import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import FileList from './fileList/FileList';
import Popup from '../popup/Popup';
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';
import './disk.scss';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  function backHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(e) {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  }

  function dropHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  function setSortHandler(e) {
    setSort(e.target.value);
  }

  if (loader) {
    return (
      <div className='loader'>
        <div className='lds-dual-ring'></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      <div className='disk__btns'>
        <button className='disk__back' onClick={backHandler}>
          Назад
        </button>
        <button className='disk__create' onClick={showPopupHandler}>
          Создать папку
        </button>
        <div className='disk__upload'>
          <label className='disk__upload-label' htmlFor='disk__upload-input'>
            Загрузить файл
          </label>
          <input
            className='disk__upload-input'
            id='disk__upload-input'
            type='file'
            onChange={(e) => fileUploadHandler(e)}
            multiple={true}
          />
        </div>
        <select className='disk__select' value={sort} onChange={setSortHandler}>
          <option value='name'>По имени</option>
          <option value='type'>По типу</option>
          <option value='date'>По дате</option>
        </select>
        <button className='disk__plate' onClick={() => dispatch(setFileView('plate'))} />
        <button className='disk__list' onClick={() => dispatch(setFileView('list'))} />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className='drop-area'
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
