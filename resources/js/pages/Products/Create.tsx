import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert, ArrowLeft, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
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
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Create New Product</h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Add a new product to your inventory. Fill in the details below.
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    Product Name
                                </Label>
                                <Input 
                                    id="name"
                                    placeholder="Enter product name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Price Field */}
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-medium text-neutral-900 dark:text-white">
                                    Price
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
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
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
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Create Product
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Need help? Check out our{' '}
                        <Link href="/help/products" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                            product creation guide
                        </Link>
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}