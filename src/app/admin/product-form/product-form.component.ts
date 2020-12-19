import { Product } from "./../../models/product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/take";

// interface Product {
//   title: string;
//   price: number;
//   category: string[];
//   imageUrl: string;
// }

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product: Product = {
    title: "",
    price: 0,
    category: "",
    imageUrl: "",
  };
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .take(1)
        .subscribe((p: Product) => (this.product = p));
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  ngOnInit() {}
}
