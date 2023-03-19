import { Link } from "react-router-dom"

function avatar({imgUrl, username, id}) {
  console.log(imgUrl);
  return (
    <Link to={`/profile/${id}`}>
      {
        imgUrl ?
        <img className="max-h-[30px] sm:max-h-[40px] rounded-full" src={`http://localhost:5000/${imgUrl}`} /> :
        <span className="bg-blue-400 px-2 py-2  rounded-[50%]">{username?.slice(0, 1)}</span>
      }
    </Link>
  )
}

export default avatar