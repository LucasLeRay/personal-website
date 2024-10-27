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
          <p>I am an <b>A.I. engineer</b>, using artificial intelligence for opinion modeling and behavioral prediction, turning complex human patterns into actionable insights.</p>
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
