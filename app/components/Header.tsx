import Image from 'next/image'

export default function Header() {
  return (
    <header className="text-center my-4">
      <Image
        src="/placeholder.svg?height=100&width=100"
        alt="Company Logo"
        width={100}
        height={100}
        className="mb-2"
      />
      <h1 className="h3">Khalifah Hazim Services</h1>
    </header>
  )
}

