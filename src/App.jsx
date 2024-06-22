import { useState } from 'react'
import { faker } from "@faker-js/faker"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [domain, setDomain] = useState('')
  const [numbers, setNumbers] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [time, setTime] = useState(0)

  const [subdomains, setSubdomains] = useState([])

  function generateNumbers(num) {
    return Array.from({ length: num }, () => Math.floor(Math.random() * 10))
      .map(Number)
      .join('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const generate = (numbers, domain) => {

    if (!domain) {
      return toast("❌ Please enter a domain!", {
        position: "top-right",
        theme: "dark"
      });
    }

    const startTime = Date.now();

    const subdomains = []

    if (domain.includes('@')) {
      for (let i = 0; i < quantity; i++) {
        subdomains.push(faker.person.firstName() + faker.person.middleName() + generateNumbers(numbers) + domain)
      }
    } else {
      for (let i = 0; i < quantity; i++) {
        subdomains.push(faker.person.firstName() + faker.person.middleName() + generateNumbers(numbers) + '@' + domain)
      }
    }

    const endTime = Date.now(); // End time tracking
    const timeSpent = endTime - startTime;

    setTime(timeSpent);
    toast("✅ Generated " + subdomains.length + " subdomains in " + timeSpent + " ms!", {
      position: "top-right",
      theme: "dark"
    });

    setSubdomains(subdomains)
  }

  const handleNumbersChange = (e) => {
    const value = Math.max(1, Math.min(50, Number(e.target.value)));
    setNumbers(value);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  return (
    <div className="container mx-auto my-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Catch All Domain Generator ✉</h1>
      <p>This is a simple generator for catch all domains.</p>

      <div className="flex flex-row gap-4 w-full my-6">
        <form className='flex flex-row gap-4 w-full' onSubmit={(e) => e.preventDefault()}>
          <div className="w-1/2">
            <label htmlFor="domain">Domain <span className='text-red-500'>With or without @</span></label>
            <input className="bg-neutral-900 w-full py-1 px-2 rounded-md" placeholder='@example.com' type="text" id="domain" name="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
          </div>
          <div className="w-1/2">
            <label htmlFor="subdomain">Numbers at the End <span className='text-red-500'>* Max 50</span></label>
            <input className="bg-neutral-900 w-full py-1 px-2 rounded-md" type="number" id="numbers" min={1} max={50} name="subdomain" value={numbers} onChange={handleNumbersChange} />
          </div>
          <div className="w-1/2">
            <label htmlFor="subdomain">Quantity</label>
            <input className="bg-neutral-900 w-full py-1 px-2 rounded-md" type="number" id="quantity" name="subdomain" value={quantity} onChange={handleQuantityChange} />
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="subdomain">Generate</label>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-md" onClick={() => generate(numbers, domain)}>Generate</button>
          </div>
        </form>
      </div>

      {subdomains.length > 0 ? (
        <div className="flex flex-col gap-4 my-6">
          <textarea className="bg-neutral-900 w-full h-32 py-1 px-2 rounded-md" value={subdomains.join('\n')} readOnly />
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-md" onClick={() => {
            copyToClipboard(subdomains.join('\n'))
            toast("✅ Copied to clipboard!", {
              position: "top-right",
              theme: "dark"
            });
          }}>Copy to Clipboard</button>
          <p className="text-center">Time spent: {time} ms</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 my-6">
          <p className="text-center">No subdomains generated yet.</p>
        </div>
      )}


    </div>
  )
}

export default App
