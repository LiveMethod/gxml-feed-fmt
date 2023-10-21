import React from 'react';
import './App.css';
import CSVtoKS from './ConvertReview';
import example from './example';
import Preview from './ReviewPreview';

function App() {
  const data = CSVtoKS(example)
  return (
    <div className="App">
      <section className='previews'>
        {data.map(Preview)}
      </section>
    </div>
  );
}

export default App;
