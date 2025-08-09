"use client";

import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Search, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import AddProductForm from "./addProduct/page";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const itemsPerPage = 10;

  const fetchProducts = () => {
    // Fetch products from localStorage
    const productsData = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(productsData);  // Set products state
  };

  useEffect(() => {
    fetchProducts();
  }, []);  // Make sure this runs once when the component mounts

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleDelete = async (id) => {
    try {
      // Remove product from the list
      const updatedProducts = products.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage
      setProducts(updatedProducts); // Update state to trigger re-render
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "price" || sortField === "views") {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />;
    return sortOrder === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="w-full p-0 bg-zinc-800 text-gray-100 px-8 pt-1">
      <div className="w-full overflow-x-auto">
        <div className="flex items-center justify-between p-4 border border-zinc-700 bg-zinc-900 rounded-xl mb-4">
          <h1 className="text-lg font-semibold">Products Table</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 text-sm border border-zinc-700 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  {productToEdit ? "Edit Product" : "Add Product"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-xl">
                <AddProductForm
                  productToEdit={productToEdit}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setProductToEdit(null);
                    fetchProducts();  // Re-fetch products to update the list
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table className="w-full text-sm text-gray-300 border border-zinc-700 rounded-xl">
          <TableHeader className="bg-zinc-800">
            <TableRow>
              <TableHead className="w-12 px-4 py-2 rounded-tl-xl"><Checkbox /></TableHead>
              <TableHead><Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1 px-0">NAME {renderSortIcon("name")}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => handleSort("category")} className="flex items-center gap-1 px-0">CATEGORY {renderSortIcon("category")}</Button></TableHead>
              <TableHead>BRAND</TableHead>
              <TableHead><Button variant="ghost" onClick={() => handleSort("price")} className="flex items-center gap-1 px-0">PRICE {renderSortIcon("price")}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => handleSort("stockQuantity")} className="flex items-center gap-1 px-0">STOCK {renderSortIcon("stockQuantity")}</Button></TableHead>
              <TableHead><Button variant="ghost" onClick={() => handleSort("views")} className="flex items-center gap-1 px-0">VIEWS {renderSortIcon("views")}</Button></TableHead>
              <TableHead className="w-12 px-4 text-right rounded-tr-xl"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-zinc-700 transition">
                <TableCell className="px-4"><Checkbox /></TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-gray-300 flex items-center justify-center text-black font-semibold uppercase">
                      {product.name?.slice(0, 2)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.productCode || "—"}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: product.brandColor || "#6B7280", color: "white" }}>
                    {product.brandName}
                  </div>
                </TableCell>
                <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                <TableCell>
                  <div className={`font-medium ${
                    product.stockStatus === "Available"
                      ? "text-green-500"
                      : product.stockStatus === "Limited Supply"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}>
                    {product.stockStatus}
                  </div>
                  <div className="text-xs text-gray-400">{product.stockQuantity}</div>
                </TableCell>
                <TableCell>
                  <div>{product.views}</div>
                  <div className={`flex items-center text-xs ${
                    product.viewsChangeType === "increase"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
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
                      <Button variant="ghost" size="icon" className="text-gray-300 hover:text-gray-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 text-gray-100">
                      <DropdownMenuItem onClick={() => {
                        setProductToEdit(product);
                        setIsDialogOpen(true);
                      }}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border border-zinc-700 bg-zinc-900 rounded-xl mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="text-gray-700"
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-gray-400">
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}
