import axios from "axios";

function App() {

  const product = {
    title: "Teclado" ,
    price: 30000 ,
    quantity: 1  
  }

  const createPreference = async() => {

    try {
      const response = await axios.post(
        'http://localhost:3000/preference' , 
        product
      )
      const { redirectUrl } = response.data
      return redirectUrl
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuy = async() => {
    const url = await createPreference()
    if (url) window.location.href = url;
  }

  return (
    <div className="flex h-screen bg-zinc-800 flex-col justify-center items-center">  
      <button onClick={  handleBuy } className="bg-blue-300 px-20 py-3 rounded-xl text-xl font-semibold hover:scale-105 transition">
        Pay
      </button>
    </div>
  )
}

export default App
