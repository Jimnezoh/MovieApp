import { useState } from 'react'
import Search from './components/search';



const App = () =>{
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <main>
      <div className="pattern"/>
    <div className="wrapper">
<header>
  <img src="public/hero.png" alt="hero picture" />
  <h1>Find <span className="text-gradient">Movies</span> you will enjoy without the Hassle</h1>
</header>

<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

    </div>
    </main>
  )
}

export default App
