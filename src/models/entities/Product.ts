import { AbstractEntity } from './AbstractEntity';

export class Product extends AbstractEntity {

    /**
     * Attributes
     */
    name?: string;
    type?: string;
    price?: number;
    rating?: number;
    warranty_years?: number;
    available?: boolean;

    constructor(product?: Partial<Product>) {
        super(product?._id);
        Object.assign(this, product);
    };
}
