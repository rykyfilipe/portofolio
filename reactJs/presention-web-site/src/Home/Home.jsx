import './Home.css'
import Navbar from '../Navbar/Navbar';
import Scrollbar from '../Scrolbar/Scrollbar';
import insta from '../assets/instagram.svg'
import twitter from '../assets/twitter-x.svg'

function Home(){

    return(
        <section className="home-container">
            <Navbar />
            <main>
                <div className="contact">
                    <p>Follow us</p>
                    <a href=''>
                        <img src={insta} alt="" />
                    </a>
                    <a href=''>
                        <img src={twitter} alt="" />
                    </a>
                </div>
                <div className="main-content">
                    <h2>JOIN US ON THE BIG CANADA ROAD TRIP</h2>
                    <h1>It`s Great Time to Start <span>Living</span> Now</h1>
                    <button>Know More</button>
                </div>

                <Scrollbar />
            </main>
        </section>
    );
}

export default Home