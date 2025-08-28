import Card from './Card'

function App() {

  return (
    <>
      <h1 className='bg-amber-300 text-red-600 text-2xl flex justify-center'>Fact-Lizz</h1>
      <div className='flex justify-center'>
          <Card 
          title="Grand Canyon" 
          src="https://images.pexels.com/photos/598961/pexels-photo-598961.jpeg" 
          description="It’s so huge that it creates its own weather, stretches 446 km, and has rocks over 2 billion years old."
          arr={[1,2,3,4]}
          />

          <Card 
          title="Giant Squid" 
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8_rZM_j3xyKaHn12vyPnPA@2x.jpeg" 
          description="A deep-sea creature as long as a bus, with the biggest eyes in the animal kingdom."
          myObj={{key: "value"}}
          />

          <Card 
          title="Baobab Tree"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Adansonia_grandidieri04.jpg/330px-Adansonia_grandidieri04.jpg" 
          description="Called the “Tree of Life,” it can live 2,000+ years and store thousands of liters of water in its trunk."
          />

      </div>
    </>
  )
}

export default App
