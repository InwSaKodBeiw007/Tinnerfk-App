import { HttpClient } from '@angular/common/http'
import { AccountService } from './account.service'
import { computed, inject, Injectable, signal, Signal } from '@angular/core'
import { User } from '../_models/user'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'
import { cacheManager } from '../_helper/cache'
import { parseQuery } from '../_helper/helper'

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  user: Signal<User | undefined>
  http: HttpClient = inject(HttpClient)
  accountService: AccountService = inject(AccountService)
  private baseApiUrl = environment.baseUrl + 'api/like/'

  following = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  followers = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }

  toggleLike(target_id: string) {
    const user = this.user()
    if (!user) return false
    const url = this.baseApiUrl
    this.http.put(url, { target_id }).subscribe()

    const following = (user.following as string[])
    const isFollowingTarget = following.includes(target_id)
    if (isFollowingTarget) {
      console.log(`remove ${target_id} from following`)
      user.following = following.filter(id => id !== target_id)
    } else {
      console.log(`add ${target_id} from following`)
      following.push(target_id)
      user.following = following
    }
    this.accountService.SetUser(user)
    return user.following.includes(target_id)
  }

  isFollowingMember(target_id: string): boolean {
    const user = this.user()
    if (!user) return false
    return (user.following as string[]).includes(target_id)
  }

  getDataFromApi(type: 'following' | 'followers') {
    const setSignal = (cacheData: Paginator<UserQueryPagination, User>) => {
      if (type === 'following') {
        //ก่อนหน้านี้เป็น follower
        this.following.set(cacheData)
        console.log(` --> load ${type} data from Your father`)
      } else {
        this.followers.set(cacheData)
      }
    }
    const pagination = type === 'following' ? this.following().pagination : this.followers().pagination
    const key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, type)
    if (cacheData) {
      console.log(` --> load ${type} data from cache`)
      setSignal(cacheData)
      return
    }
    console.log(`--> load ${type} data from api`)

    const url = this.baseApiUrl + type + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        const key = cacheManager.createKey(response.pagination)
        cacheManager.save(key, type, response)
        setSignal(response)
      }
    })
  }

  getFollower() {
    this.getDataFromApi('followers')
  }

  getFollowing() {
    this.getDataFromApi('following')
  }
}

