import React, {useState} from 'react';
import xmlf from 'xml-formatter';
import './App.css';
import CSVtoJSON from './CSVtoJSON';
import JSONtoXML from './JSONtoXML';
import example from './example';
import Preview from './ReviewPreview';
import Upload from './FileUpload';
import Download from './FileDownload';


function App() {
  
  const [currentFile, setFile] = useState<string | null>(null);
  return (
    <div className="wrap">
      <section className='ui'>
        {!currentFile && <Upload currentFile={currentFile} setFile={setFile}/> }
        {currentFile && <Download currentFile={currentFile}/>}
      </section>
      <section className='previews'>
        {currentFile && ( CSVtoJSON(currentFile).map(Preview) )}
      </section>
    </div>
  );
}

export default App;
