import { Component, Input, OnInit, inject } from '@angular/core'
import { User } from '../../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { LikeService } from '../../_services/like.service'
import { cacheManager } from '../../_helper/cache'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  likeService = inject(LikeService)
  @Input() member!: User
  isFollowing = false

  constructor() {}

  ngOnInit(): void {
    if (!this.member || !this.member.id) return

    this.isFollowing = this.likeService.isFollowingMember(this.member.id)
  }

  toggleLike() {
    if (!this.member || !this.member.id) return

    this.isFollowing = this.likeService.toggleLike(this.member.id)
    cacheManager.clear('all')
  }
}
