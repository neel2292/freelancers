import { Component, OnInit } from '@angular/core';
import {Apollo, QueryRef} from "apollo-angular";
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  FREELANCERS_QUERY = gql`
    query AllFreelancers{
      freelancers {
        id
        username
        email
        mobile
        skillsets
        hobbies
      }
    }
  `;
  page = 1;
  freelancers: any[] = [];
  displayedColumns: string[] = ['username', 'email', 'mobile', 'skillsets', 'hobbies'];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: this.FREELANCERS_QUERY,
      variables: { offset: 10 * this.page }
    });

    this.query.valueChanges.subscribe(res => {
      this.freelancers = res.data && res.data.freelancers;
    });
  }

  update() {
    this.query.refetch({ offset: 10 * this.page });
  }

  nextPage() {
    this.page++;
    this.update();
  }

  prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }
}
