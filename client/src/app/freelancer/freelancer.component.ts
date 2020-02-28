import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Apollo, QueryRef} from "apollo-angular";
import gql from 'graphql-tag';
import {Freelancer} from "../interface/freelancer";

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent implements OnInit {
  FREELANCER_QUERY = gql`
    query GetFreelancer($id: ID){
      freelancer(id: $id) {
        id
        username
        email
        mobile
        skillsets
        hobbies
      }
    }
  `;
  is_new = false;
  private query: QueryRef<any>;
  private freelancer: Freelancer = new class implements Freelancer {
    email: string;
    hobbies: string[];
    mobile: string;
    skillsets: string[];
    username: string;
  };
  private badges = {
    skillsets: '',
    hobbies: ''
  };

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      this.is_new = id === 'new';

      if (!this.is_new) {
        this.query = this.apollo.watchQuery({
          query: this.FREELANCER_QUERY,
          variables: { id: id }
        });

        this.query.valueChanges.subscribe(res => {
          this.freelancer = res.data && res.data.freelancer;
        });
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.badges.skillsets) {
        this.freelancer.skillsets = this.freelancer.skillsets || [];
        this.freelancer.skillsets.push(this.badges.skillsets);
        this.badges.skillsets = '';
      }

      if (this.badges.hobbies) {
        this.freelancer.hobbies = this.freelancer.hobbies || [];
        this.freelancer.hobbies.push(this.badges.hobbies);
        this.badges.hobbies = '';
      }
    }
  }

  removeList(index, list) {
    list.splice(index, 1);
  }
}
