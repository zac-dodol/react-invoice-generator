export interface InvoiceItem {
  description: string
  quantity: number
  price: number
}

export interface InvoiceData {
  clientName: string
  clientContact: string
  items: InvoiceItem[]
  total: number
  sst: number
  grandTotal: number
  date: string
  invoiceNumber: string;
}

