import './App.css';
import me from './img/me.jpeg';

function App() {
  return (
    <div className="App">
      <div className="Left">
          <h1>I am<br /><b>Lucas Le Ray</b></h1>
          <p>I'm a <b>Machine Learning Engineer</b> based in <b>London</b> and working at <a href="https://nibble.ai" target="_blank" rel="noopener noreferrer">nibble</a>. I'm passionate about <b>computational psychology</b> and <b>social sciences</b>.</p>
          <div className="Links">
            <div>
              <a href="https://lucas-le-ray.medium.com" target="_blank" rel="noopener noreferrer">articles</a>
              <a href="https://twitter.com/Lucas_Le_Ray" target="_blank" rel="noopener noreferrer">twitter</a>
            </div>
            <div>
              <a href="https://github.com/LucasLeRay" target="_blank" rel="noopener noreferrer">github</a>
              <a href="mailto:lucas.a.leray@gmail.com" rel="noopener noreferrer">email</a>
            </div>
          </div>
      </div>
      <img src={me} alt="Lucas Le Ray"/>
    </div>
  );
}

export default App;
