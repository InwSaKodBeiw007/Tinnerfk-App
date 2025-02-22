import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { LikeService } from '../_services/like.service';
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination';
import { User } from '../_models/user';
import { MemberCardComponent } from '../member/member-card/member-card.component';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-following',
  imports: [MemberCardComponent, MatIcon, MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit {
  private likeService = inject(LikeService)
  following: WritableSignal<Paginator<UserQueryPagination, User>>
  // paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption



  constructor() {
    this.following = this.likeService.getFollowingSignal()
    // this.paginator = this.likeService.pagaintor

  }

  onSearch() {
    this.likeService.getFollowing()
  }

  ngOnInit(): void {
    this.likeService.getFollowing()
  }


  onPageChange(event: PageEvent) {
    const copypaginator = this.following()
    copypaginator.pagination.currentPage = event.pageIndex + 1
    copypaginator.pagination.pageSize = event.pageSize
    this.following.set(copypaginator)
    this.onSearch()
  }
  onReset() {
    const resetPagination: UserQueryPagination = {
      username: '',
      looking_for: '',
      gender: '',
      min_age: undefined,
      max_age: undefined,
      currentPage: 1,
      pageSize: this.following().pagination.pageSize ?? 10,
      length: 0
    }
    this.following.set({ ...this.following(), pagination: resetPagination })
    setTimeout(() => this.onSearch(), 0)
  }


}

// export class MemberComponent implements OnInit {
//   private memberservice = inject(MemberService)
//   paginator: WritableSignal<Paginator<UserQueryPagination, User>>
//   pageSize = default_pageSizeOption
//   constructor() {
//     this.paginator = this.memberservice.pagaintor
//   }
//   ngOnInit(): void {
// this.memberservice.getMembers()
//   }
//   onPageChange(event: PageEvent) {
//     const copypaginator = this.paginator()
//     copypaginator.pagination.currentPage = event.pageIndex + 1
//     copypaginator.pagination.pageSize = event.pageSize
//     this.paginator.set(copypaginator)
//     this.onsearch()

//   }

//   onsearch() {
//     this.memberservice.getMembers()
//   }
//   // @ViewChil 'form') form?: NgForm
//   onReset() {
//     this.paginator.set(default_paginator)
//     this.onsearch()


//   }
// }
