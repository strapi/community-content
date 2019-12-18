import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  private queryCategories: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryCategories = this.apollo
      .watchQuery({
        query: CATEGORIES_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }
  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  }
}
