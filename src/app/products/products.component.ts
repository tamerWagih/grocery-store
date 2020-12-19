import { Product } from "./../models/product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component } from "@angular/core";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
    productService
      .getAll()
      .switchMap((products: Product[]) => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe((params) => {
        this.category = params.get("category");

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }
}
