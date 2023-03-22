import { Link } from "react-router-dom"

function Avatar({imgUrl, username, id}) {

  return (
    <Link to={`/profile/${id}`}>
      {
        imgUrl ?
        <img className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] object-cover rounded-full" src={`http://localhost:5000/${imgUrl}`} /> :
        <span className="bg-blue-400 px-2 py-2  rounded-[50%]">{username?.slice(0, 1)}</span>
      }
    </Link>
  )
}

export default Avatar;