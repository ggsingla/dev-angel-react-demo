import { useState } from "react"
import Dropdown, { IItem } from "./components/Dropdown"
import { photos } from "./constants/data"

function App() {

  const [selectedPhoto, setSelectedPhoto] = useState<IItem>({
    value: photos[0].url,
    title: photos[0].title
  })

  return (
    <>
      <div className="grid grid-cols-2 w-full h-full min-h-dvh max-w-7xl mx-auto py-10">
        <Dropdown
          onSelect={(item) => {
            setSelectedPhoto(item)
          }}
          items={
            photos.map((photo) => {
              return {
                value: photo.url,
                title: photo.title
              }
            })
          }
        />
        <img src={selectedPhoto?.value} alt={selectedPhoto?.title} />
      </div>
    </>
  )
}

export default App
