import { Product } from "./../../models/product";
import { ProductService } from "./../../product.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResouce: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]) {
    this.tableResouce = new DataTableResource(products);
    this.tableResouce
      .query({ offset: 0 })
      .then((items) => (this.items = items));
    this.tableResouce.count().then((count) => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResouce) return;
    this.tableResouce.query(params).then((items) => (this.items = items));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnInit() {}
}
