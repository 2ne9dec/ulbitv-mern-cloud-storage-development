import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploaderFile } from '../../../reducers/uploadReducer';
import './uploader.scss';

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();

  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='upload-file__name'>{file.name}</div>
        <button
          className='upload-file__remove'
          onClick={() => dispatch(removeUploaderFile(file.id))}
        >
          X
        </button>
      </div>
      <div className='upload-file__progress-bar'>
        <div
          className='upload-file__upload-bar'
          style={{ width: file.progress + '%' }}
        />
        <div className='upload-file__persent'>{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
