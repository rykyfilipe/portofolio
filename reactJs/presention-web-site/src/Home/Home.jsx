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
                    <div className='wraper'>
                        <a href=''>
                            <img src={insta} alt="" />
                        </a>
                        <a href=''>
                            <img src={twitter} alt="" />
                        </a>
                    </div>
                </div>
                <div className="main-content">
                    <p class="small-text">JOIN US ON THE BIG CANADA ROAD TRIP</p>
                    <h1>It's Great Time</h1>
                    <h1> to Start <span class="highlight">Living Now</span></h1>
                    <a href="#" class="button">Know More</a>
                </div>

                <Scrollbar />
            </main>
        </section>
    );
}

export default Home