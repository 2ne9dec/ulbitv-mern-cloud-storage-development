import React from 'react';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg';
import './file.scss';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);

  function openDirHandler() {
    if (!file.type === 'dir') return '';
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  }

  function downloadClickHandler(e) {
    e.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === 'list') {
    return (
      <div className='file' onClick={openDirHandler}>
        <img
          className='file__img'
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt='file__img'
        />
        <div className='file__name'>{file.name}</div>
        <div className='file__date'>{file.date.slice(0, 10)}</div>
        <div className='file__size'>{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && (
          <button
            onClick={downloadClickHandler}
            className='file__btn file__download'
          >
            download
          </button>
        )}
        <button className='file__btn file__delete' onClick={deleteClickHandler}>
          Delete
        </button>
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div className='file-plate' onClick={() => openDirHandler(file)}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=''
          className='file-plate__img'
        />
        <div className='file-plate__name'>{file.name}</div>
        <div className='file-plate__btns'>
          {file.type !== 'dir' && (
            <button
              onClick={(e) => downloadClickHandler(e)}
              className='file-plate__btn file-plate__download'
            >
              download
            </button>
          )}
          <button
            onClick={(e) => deleteClickHandler(e)}
            className='file-plate__btn file-plate__delete'
          >
            delete
          </button>
        </div>
      </div>
    );
  }
};

export default File;
