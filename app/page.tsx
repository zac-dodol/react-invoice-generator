'use client'

import { useState } from 'react'
import Header from './components/Header'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import { InvoiceData } from './types/invoice'

export default function InvoiceApp() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)

  const handleInvoiceGeneration = (data: InvoiceData) => {
    setInvoiceData(data)
  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-md-6">
          <InvoiceForm onGenerate={handleInvoiceGeneration} />
        </div>
        <div className="col-md-6">
          <InvoicePreview data={invoiceData} />
        </div>
      </div>
    </div>
  )
}

