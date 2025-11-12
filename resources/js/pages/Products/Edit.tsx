import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert, ArrowLeft, Save, Undo2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price.toString(),
        description: product.description
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }

    const handleReset = () => {
        setData({
            name: product.name,
            price: product.price.toString(),
            description: product.description
        });
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: product.name,
            href: `/products/${product.id}`,
        },
        {
            title: 'Edit',
            href: `/products/${product.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className="container max-w-2xl px-6 py-8 mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <Link 
                        href="/products" 
                        className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Edit Product</h1>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                Update the product information below.
                            </p>
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            ID: #{product.id}
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="p-6">
                        <form onSubmit={handleUpdate} className="space-y-6">
                            {/* Error Alert */}
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive" className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                    <CircleAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    <AlertTitle className="text-red-800 dark:text-red-400">Validation Errors</AlertTitle>
                                    <AlertDescription className="text-red-700 dark:text-red-300">
                                        <ul className="list-disc list-inside space-y-1">
                                            {Object.entries(errors).map(([key, message]) => (
                                                <li key={key}>{message as string}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-neutral-900 dark:text-white">
                                    Product Name *
                                </Label>
                                <Input 
                                    id="name"
                                    placeholder="Enter product name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Price Field */}
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-medium text-neutral-900 dark:text-white">
                                    Price *
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-neutral-500 dark:text-neutral-400">$</span>
                                    </div>
                                    <Input 
                                        id="price"
                                        type="number"
                                        placeholder="0.00" 
                                        value={data.price} 
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="pl-8 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-neutral-900 dark:text-white">
                                    Description
                                </Label>
                                <Textarea 
                                    id="description"
                                    placeholder="Enter product description" 
                                    value={data.description}  
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="resize-none transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                    <span>Brief description of your product</span>
                                    <span>{data.description.length}/500</span>
                                </div>
                                {errors.description && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    disabled={processing}
                                    className="inline-flex items-center gap-2"
                                >
                                    <Undo2 className="w-4 h-4" />
                                    Reset Changes
                                </Button>
                                <div className="flex items-center gap-3">
                                    <Link 
                                        href="/products"
                                        className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 transition-all duration-200"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Update Product
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Last Updated Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Product Information
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Make sure all information is accurate before saving changes.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <Link 
                                href='#'
                                className="block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View product page
                            </Link>
                            <Link 
                                href="/products"
                                className="block text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                            >
                                Back to all products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}