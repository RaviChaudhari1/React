import React from 'react'

const Card = (props) => {

  {console.log(props)}
  
  return (
      <div className="max-w-xs p-6 rounded-md shadow-md bg-black m-2">
        <img
          src={props.src}
          alt=""
          className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block text-sm font-medium font-mono tracking-widest uppercase text-indigo-400">
            {props.title}
          </span>
          <h2 className="text-xl font-semibold tracking-wide">Lorem ipsum dolor</h2>
        </div>
        <p className="text-gray-300">
          {props.description}
        </p>
      </div>
  )
}

export default Card
