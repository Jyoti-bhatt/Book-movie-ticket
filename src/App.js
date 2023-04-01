import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Movie from './screens/movieDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element = {<Home/>}></Route>
          <Route exact path = "/" element = {<App/>}/>
         <Route path = "movie/:id" element = {<Movie/>}/>
          <Route path = "/*"  element = {"Error Page"}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
