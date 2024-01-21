import React,{useEffect} from 'react'
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition' 
const SpeechToText = () => {
    const {transcript,resetTranscript}=useSpeechRecognition()

    useEffect(()=>{
        SpeechRecognition.startListening({continuous:true})
        console.log('listening Start')
    },[])
  return (
    <form ><textarea value={transcript}></textarea>
    <button onClick={resetTranscript}>clear text</button>
    <button onClick={(e)=>{
        e.preventDefault();
        SpeechRecognition.stopListening({continuous:true});
        console.log("listening  stop")

    }}>Stop listening</button>
    </form>
  )
}

export default SpeechToText;