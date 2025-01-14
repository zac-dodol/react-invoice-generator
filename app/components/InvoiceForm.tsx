import { useState } from 'react'
import { InvoiceData, InvoiceItem } from '../types/invoice'

interface InvoiceFormProps {
  onGenerate: (data: InvoiceData) => void
}

export default function InvoiceForm({ onGenerate }: InvoiceFormProps) {
  const [clientName, setClientName] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 0, price: 0 }])

  const addItem = () => {
    setItems([...items, { description: '', quantity: 0, price: 0 }])
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotal()
    const sst = total * 0.1
    onGenerate({
      clientName,
      clientContact,
      items,
      total,
      sst,
      grandTotal: total + sst,
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="clientName" className="form-label">Client Name</label>
        <input
          type="text"
          className="form-control"
          id="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="clientContact" className="form-label">Client Contact</label>
        <input
          type="text"
          className="form-control"
          id="clientContact"
          value={clientContact}
          onChange={(e) => setClientContact(e.target.value)}
          required
        />
      </div>
      {items.map((item, index) => (
        <div key={index} className="mb-3">
          <h5>Item {index + 1}</h5>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              required
            />
          </div>
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary mb-3" onClick={addItem}>Add Item</button>
      <button type="submit" className="btn btn-primary d-block w-100">Generate Invoice</button>
    </form>
  )
}

