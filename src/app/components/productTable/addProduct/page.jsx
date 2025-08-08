"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AddProductForm({ onClose, productToEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    category: "",
    price: "",
    stockQuantity: "",
    stockStatus: "Available",
    views: "0",
    viewsChange: "0%",
    viewsChangeType: "increase",
  })

  // Fill form if editing
  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit)
    }
  }, [productToEdit])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (productToEdit?.id) {
        // 🔄 Update product
        await fetch(`http://localhost:5001/products/${productToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        // ➕ Add new product
        await fetch("http://localhost:5001/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      onClose()
    } catch (err) {
      console.error("Error submitting form:", err)
    }
  }

  return (
    <div className="text-white">
      <h1 className="text-xl font-semibold mb-4">
        {productToEdit ? "Edit Product" : "Add New Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "brandName", "category", "price", "stockQuantity"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "price" || field === "stockQuantity" ? "number" : "text"}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        ))}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {productToEdit ? "Update Product" : "Submit Product"}
        </Button>
      </form>
    </div>
  )
}


