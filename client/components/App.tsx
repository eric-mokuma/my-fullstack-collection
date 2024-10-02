import PostCard from './PostCard'

function App() {
  return (
    <>
      <header className="header">
        <h1 className="postcard">MY POSTCARD COLLETION</h1>
      </header>

      <section className="main">
        <PostCard />
      </section>
      <footer className="footer">
        <p>@eric_mokuma 2024</p>
      </footer>
    </>
  )
}

export default App
