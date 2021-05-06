import img1 from '../img/001.jpg'
import img2 from '../img/002.jpg'
import img3 from '../img/003.jpg'

const Header = ({name}) => {
    return(
        <div>
            <h1>Hi {name}!</h1>
            <img className="header-img" src= {img3} alt=""/>
        </div>
    )
}

export default Header