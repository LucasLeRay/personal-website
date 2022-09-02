import './App.css';
import profile_src from './img/me.jpeg';

function App() {
  return (
    <div className="App">
      <div className="Left">
          <h1>Lucas Le Ray</h1>
          <p>I'm a <b>Machine Learning Engineer</b> based in <b>London</b> and working at <a href="https://nibble.ai" target="_blank" rel="noopener noreferrer">nibble</a>. I'm passionate about <b>computational psychology</b> and <b>social sciences</b>.</p>
          <div className="Links">
            <a href="https://twitter.com/Lucas_Le_Ray" target="_blank" rel="noopener noreferrer">twitter</a>
            <a href="https://github.com/LucasLeRay" target="_blank" rel="noopener noreferrer">github</a>
            <a href="mailto:lucas.a.leray@gmail.com" rel="noopener noreferrer">email</a>
          </div>
      </div>
      <img src={profile_src} alt="Lucas Le Ray"/>
    </div>
  );
}

export default App;
