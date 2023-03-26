import Menu from '../components/Menu'
import Listing from '../components/Listings';
import Main from '../components/Main';


function Home() {
  return (
    <div className='max-w-[1200px] gap-5 min-h-screen flex items-start justify-between mt-5 mx-auto'>
      <Menu />
      <Main />
      <Listing />
    </div>
  )
}

export default Home