import React, { useEffect, useState } from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import MicOffSharpIcon from '@mui/icons-material/MicOffSharp';
import KeyboardVoiceSharpIcon from '@mui/icons-material/KeyboardVoiceSharp';

const SearchInput = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      startListeningWithTimeout(5000); 
      console.log('Listening Start');
    } else {
      SpeechRecognition.stopListening();
      console.log('Listening Stopped manually');
    }
  }, [isListening]);

  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, keyword: e.target.value });
  };

  const startListeningWithTimeout = (timeout) => {
    SpeechRecognition.startListening({ continuous: true });
    setTimeout(() => {
      setIsListening(false); // Stop listening after the timeout
    }, timeout);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    resetTranscript(); // Optionally, reset transcript when toggling
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:8080/api/search/${values.keyword}`);
      setValues({ ...values, result: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className='d-flex' role='search' onSubmit={handelSubmit}>
        <input
          type='search'
          className='form-control ml-2'
          style={{paddingLeft:'8px',width: '300px',}}
          placeholder='Search'
          aria-label='Search'
          value={transcript || values.keyword}
          onChange={handleInputChange}
        />
          <button onClick={handleToggleListening} style={{marginLeft:'2rem'}}>
          {isListening ? <KeyboardVoiceSharpIcon /> : <MicOffSharpIcon />} 
        </button>
        <button className='btn btn-online-success' type='submit'>
          Search
        </button>
      
      </form>
    </div>
  );
};

export default SearchInput;
