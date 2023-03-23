import { Link } from "react-router-dom"

function Avatar({imgUrl, username, id}) {

  return (
    <button className="relative avatar">
      {
        imgUrl ?
        <img className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] object-cover rounded-full" src={`http://localhost:5000/${imgUrl}`} /> :
        <span className="bg-blue-400 px-2 py-2  rounded-[50%]">{username?.slice(0, 1)}</span>
      }

      <div className="bg-white profile-details absolute right-[40px] p-3 w-[300px] top-[20px]">
      
        <button className="hover:bg-textHover p-3 hover:underline hover:text-white w-full flex flex-col items-start rounded-lg py-2">
          <span>akasaul</span>
          <span className="text-sm">@akasaul</span>
        </button>

        <button>
          Create Post
        </button>
      
      </div>
    </button>
  )
}

export default Avatar;