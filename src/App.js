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
          <p>I am a <b>Machine Learning Engineer</b> & <b>MLOps Engineer</b> working at <a href="https://nibble.ai" target="_blank" rel="noopener noreferrer">nibble</a>. My main interests lie in the practical application of <b>algorithms</b> in the field of <b>social psychology</b>.</p>
          <p className="Quote">“<i>Problems are inevitable. Problems are solvable.</i>”<span className="Author"> - D. Deutsch</span></p>
        </div>
          <div className="Links">
            <a href="mailto:lucas.a.leray@gmail.com" rel="noopener noreferrer">email</a>
            <a href="https://twitter.com/Lucas_Le_Ray" target="_blank" rel="noopener noreferrer">twitter</a>
            <a href="https://github.com/LucasLeRay" target="_blank" rel="noopener noreferrer">github</a>
          </div>
      </div>
      <img src={profile_src} alt="Lucas Le Ray"/>
    </div>
  );
}

export default App;
