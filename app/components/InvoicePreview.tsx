import Image from 'next/image'
import { InvoiceData } from '../types/invoice'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface InvoicePreviewProps {
  data: InvoiceData | null
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  if (!data) {
    return <div className="text-center">No invoice generated yet.</div>
  }

  const downloadPDF = async () => {
    const element = document.getElementById('invoice-preview');
    const buttonContainer = document.getElementById('download-button-container');
    if (element && buttonContainer) {
      buttonContainer.style.display = 'none';
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      buttonContainer.style.display = 'block';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${data.invoiceNumber}.pdf`);
    }
  };

  return (
    <div id="invoice-preview" className="border p-4">
      <div className="text-center mb-4">
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Company Logo"
          width={100}
          height={100}
          className="mb-2"
        />
        <h2 className="h4">Khalifah Hazim Services</h2>
        <p>123 Travel Street, Cityville, Country</p>
        <p>Phone: +1 234 567 8900 | Email: info@khalifahhazim.com</p>
      </div>
      <h2 className="h4 mb-4">Invoice</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Bill To:</h5>
          <p><strong>{data.clientName}</strong></p>
          <p>{data.clientContact}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <p><strong>Invoice Date:</strong> {data.date}</p>
          <p><strong>Invoice Number:</strong> INV-{data.invoiceNumber}</p>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <p><strong>Subtotal:</strong> ${data.total.toFixed(2)}</p>
        <p><strong>SST (10%):</strong> ${data.sst.toFixed(2)}</p>
        <p><strong>Grand Total:</strong> ${data.grandTotal.toFixed(2)}</p>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <p>Company Representative Signature</p>
          <div className="border-bottom border-dark" style={{ height: '40px' }}></div>
        </div>
        <div className="col-6">
          <p>Client Signature</p>
          <div className="border-bottom border-dark" style={{ height: '40px' }}></div>
        </div>
      </div>
      <div id="download-button-container">
        <button className="btn btn-success mt-3" onClick={(e) => { e.preventDefault(); downloadPDF(); }}>Download PDF</button>
      </div>
    </div>
  )
}

