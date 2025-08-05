"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination"
import { Search, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export default function ProductsTable() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    axios
      .get("http://localhost:5001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err))
  }, [])

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortOrder(order)
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = filteredProducts.sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    if (sortField === "price") {
      aVal = parseFloat(aVal.replace("$", ""))
      bVal = parseFloat(bVal.replace("$", ""))
    } else if (sortField === "views") {
      aVal = parseFloat(aVal.replace("k", ""))
      bVal = parseFloat(bVal.replace("k", ""))
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const renderSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />
    return sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  return (
    <div className="w-full p-0 bg-zinc-800">
      <div className="w-full overflow-x-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-zinc-800">
          <h1 className="text-lg font-semibold text-gray-300">Products Table</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-White">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Table className="w-full text-sm text-gray-400 ">
          <TableHeader className="bg-zinc-800 ">
            <TableRow>
              <TableHead className="w-12 px-4 py-2"><Checkbox /></TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1 px-0">
                  NAME {renderSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("category")} className="flex items-center gap-1 px-0">
                  CATEGORY {renderSortIcon("category")}
                </Button>
              </TableHead>
              <TableHead>BRAND</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("price")} className="flex items-center gap-1 px-0">
                  PRICE {renderSortIcon("price")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("stockQuantity")} className="flex items-center gap-1 px-0">
                  STOCK {renderSortIcon("stockQuantity")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("views")} className="flex items-center gap-1 px-0">
                  VIEWS {renderSortIcon("views")}
                </Button>
              </TableHead>
              <TableHead className="w-12 px-4 text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-100 transition">
                <TableCell className="px-4"><Checkbox /></TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-gray-300 flex items-center justify-center text-black font-semibold uppercase">
                      {product.name.slice(0, 2)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.productCode}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: product.brandColor || "#6B7280", color: "white" }}
                  >
                    {product.brandName}
                  </div>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div
                    className={`font-medium ${
                      product.stockStatus === "Available"
                        ? "text-green-600"
                        : product.stockStatus === "Limited Supply"
                        ? "text-orange-500"
                        : "text-red-600"
                    }`}
                  >
                    {product.stockStatus}
                  </div>
                  <div className="text-xs text-gray-500">{product.stockQuantity}</div>
                </TableCell>
                <TableCell>
                  <div>{product.views}</div>
                  <div
                    className={`flex items-center text-xs ${
                      product.viewsChangeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.viewsChangeType === "increase" ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {product.viewsChange}
                  </div>
                </TableCell>
                <TableCell className="text-right px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-gray-200 text-gray-700">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t border-gray-300 bg-gray-100">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-gray-600">1 - 10 of {products.length} entries</div>
        </div>
      </div>
    </div>
  )
}
