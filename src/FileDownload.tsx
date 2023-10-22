import React from 'react';
import CSVtoJSON from './CSVtoJSON';
import JSONtoXML from './JSONtoXML';
import {XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser';

const Download: 
  React.FC<{currentFile: string|null}> = ({currentFile}) => {
  if(!currentFile){
    return (<h4>No file found. that's weird.</h4>)
  }
  const json = CSVtoJSON(currentFile);
  const xml = JSONtoXML(json);
  
  const parser = new XMLParser({ trimValues: true });
  let validated = false;

  try{
    let result = parser.parse(xml, true);
    // If we make it this far, we've got valid XML
    const builder = new XMLBuilder({format:true});
    const builtData = builder.build(result);

    const handleDownload = () => {
      const blob = new Blob([builtData], { type: 'text/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `formatted-reviews-${new Date().toLocaleString()}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    return <a className='btn btn--download' onClick={handleDownload}>Download XML</a>
  }catch(err){
    return <h4>Error: {String(err)}</h4>;
  }
}

export default Download;