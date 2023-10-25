import React from 'react';

const Upload: React.FC<{currentFile: string|null
  setFile: React.Dispatch<any>}> = ({currentFile, setFile}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const content: string | ArrayBuffer = e.target.result;
          if (typeof content === 'string') {
            setFile(content);
          } else {
            // Handle the case when the content is not a string (shouldn't happen with CSV files)
            console.error('File content is not a string');
          }
        }
      };

      reader.readAsText(file);
    }
  };
  
  return (
    <div>
      <label htmlFor="upload" className="btn btn--upload">Upload CSV v2</label>
      <input
        id='upload'
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default Upload;