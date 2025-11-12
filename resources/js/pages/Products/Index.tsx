import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone, Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
}

interface PageProps {
    flash: {
        message?: string
    },
    products: Product[]
}

export default function Index() {
    const { products, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            destroy(route("products.destroy", id));
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }

    const truncateDescription = (description: string, maxLength: number = 60) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            
            {/* Header Section */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                            <Package className="h-8 w-8 text-blue-600" />
                            Products
                        </h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Manage your product inventory and listings
                        </p>
                    </div>
                    <Link href={route('products.create')}>
                        <Button className="inline-flex items-center gap-2 px-4 py-2.5">
                            <Plus className="h-4 w-4" />
                            Create Product
                        </Button>
                    </Link>
                </div>

                {/* Flash Message */}
                {flash.message && (
                    <div className="mb-6">
                        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                            <Megaphone className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertTitle className="text-green-800 dark:text-green-400">Success!</AlertTitle>
                            <AlertDescription className="text-green-700 dark:text-green-300">
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {/* Products Table */}
                {products.length > 0 ? (
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                        Product List
                                    </h2>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Total {products.length} product{products.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="px-3 py-1">
                                    {products.length} items
                                </Badge>
                            </div>

                            <Table>
                                <TableCaption className="text-neutral-500 dark:text-neutral-400">
                                    A list of your recent products. Manage your inventory efficiently.
                                </TableCaption>
                                <TableHeader>
                                    <TableRow className="border-b border-neutral-200 dark:border-neutral-700">
                                        <TableHead className="w-[80px] text-neutral-600 dark:text-neutral-400">ID</TableHead>
                                        <TableHead className="text-neutral-600 dark:text-neutral-400">Product</TableHead>
                                        <TableHead className="text-neutral-600 dark:text-neutral-400">Price</TableHead>
                                        <TableHead className="text-neutral-600 dark:text-neutral-400">Description</TableHead>
                                        <TableHead className="text-right text-neutral-600 dark:text-neutral-400">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id} className="border-b border-neutral-100 dark:border-neutral-700/50 hover:bg-neutral-50 dark:hover:bg-neutral-700/20 transition-colors">
                                            <TableCell className="font-medium text-neutral-600 dark:text-neutral-300">
                                                #{product.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-neutral-900 dark:text-white">
                                                        {product.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-semibold text-green-600 dark:text-green-400">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {truncateDescription(product.description)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={route('products.edit', product.id)}>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="inline-flex items-center gap-1 h-8 px-3"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/products/${product.id}`}>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="inline-flex items-center gap-1 h-8 px-3"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="sm"
                                                        disabled={processing}
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        className="inline-flex items-center gap-1 h-8 px-3"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <div className="p-12 text-center">
                            <Package className="h-16 w-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                No products found
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                                Get started by creating your first product. Add products to manage your inventory and start selling.
                            </p>
                            <Link href={route('products.create')}>
                                <Button className="inline-flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create Your First Product
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Quick Stats */}
                {products.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {products.length}
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                Total Products
                            </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatPrice(products.reduce((sum, product) => sum + product.price, 0))}
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                                Total Inventory Value
                            </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {Math.max(...products.map(p => p.price)) === -Infinity ? 
                                    formatPrice(0) : 
                                    formatPrice(Math.max(...products.map(p => p.price)))
                                }
                            </div>
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                                Highest Priced Product
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}