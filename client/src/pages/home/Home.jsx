import "../../styles/general.css";
import "./home.css";

const Home = () => {
  return (
    <>
      <header>
        <div className="menu">
          <button>Readlist</button>
          <button>Profile</button>
        </div>
      </header>
      <main>
        <div className="text-container">
          <h1 className="home-title">MANGABOOK</h1>
          <h2>Mangas & Books All in One Place!</h2>
          <h3>Search, rate, list and share your favorite mangas and books </h3>
        </div>
        <div className="searchbar-container">
          <input type="text" placeholder="Search" className="searchbar" />
        </div>
      </main>
    </>
  );
};

export default Home;
