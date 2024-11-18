import './App.css';
import profile_src from './img/me.jpg';

function App() {
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', documentHeight)
  documentHeight()

  return (
    <div className="App">
      <div className="Left">
        <div className="Name">
          <h2>Lucas</h2>
          <h1>Le Ray</h1>
        </div>
        <div className="Description">
          <p><b>A.I. engineer</b> specializing in its application to psychology and sociology. I employ algorithmic processes to understand, measure, and analyze public opinion.</p>
          <p className="Quote">“<i>Problems are inevitable. Problems are solvable.</i>”<span className="Author"> - D. Deutsch</span></p>
        </div>
          <div className="Links">
            <a href="mailto:contact@lucas-le-ray.com" rel="noopener noreferrer">email</a>
            <a href="https://twitter.com/Lucas_Le_Ray" target="_blank" rel="noopener noreferrer">twitter</a>
            <a href="https://lucas-le-ray.notion.site/Lucas-Le-Ray-1313818a7a5d80468438e6b7c4382e13" target="_blank" rel="noopener noreferrer">articles</a>
          </div>
      </div>
      <img src={profile_src} alt="Lucas Le Ray"/>
    </div>
  );
}

export default App;
