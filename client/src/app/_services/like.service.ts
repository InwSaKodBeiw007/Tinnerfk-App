import { Injectable, Signal, signal, computed, inject } from "@angular/core" // เพิ่ม computed และ inject
import { User } from "../_models/user"
import { default_paginator, Paginator, UserQueryPagination } from "../_helper/Pagination"
import { HttpClient } from "@angular/common/http" // 🦇 เพิ่ม HttpClient
import { environment } from "../../environments/environment" // 🌙 เพิ่ม environment
import { AccountService } from "./account.service" // 💀 เพิ่ม AccountService
import { cacheManager } from "../_helper/cache" // 🕸️ เพิ่ม cacheManager
import { parseQuery } from "../_helper/helper" // ✨ เพิ่ม parseQuery

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  user: Signal<User | undefined>
  following = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  followers = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  http: HttpClient = inject(HttpClient)
  accountService: AccountService = inject(AccountService)
  private baseApiUrl = environment.baseUrl + 'api/like/'

  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }
  public IsFollowing(id: string): boolean {
    const user = this.user()
    if (!user) return false
    const following = (user.following as string[])
    return following.includes(id)
  }

  toggleLike(target_id: string): boolean {
    const user = this.user()
    if (!user) return false
    const url = this.baseApiUrl
    this.http.put(url, { target_id }).subscribe()

    const following = (user.following as string[])
    const isFollowingTarget = following.includes(target_id)
    if (isFollowingTarget) {
      console.log(`remove ${target_id} from following list`)
      user.following = following.filter(id => id !== target_id)
    } else {
      console.log(`add ${target_id} from following list`)
      following.push(target_id)
      user.following = following
    }
    this.accountService.SetUser(user)
    return user.following.includes(target_id)
  }
  getDataFromApi(type: 'following' | 'follower') {
    const setSignal = (cacheData: Paginator<UserQueryPagination, User>) => {
      if (type === 'following')
        this.following.set(cacheData)
      else
        this.followers.set(cacheData)
    }
    const pagination = type === 'following' ? this.following().pagination : this.followers().pagination
    const key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, type)

    if (cacheData) {
      console.log(`⟶ Load ${type} data from cache`)
      setSignal(cacheData as Paginator<UserQueryPagination, User>)
      return
    }

    console.log(`⟶ Load ${type} data from api`)
    const url = this.baseApiUrl + type + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        const key = cacheManager.createKey(response.pagination)
        cacheManager.save(key, type, response)
        setSignal(response)
      }
    })
  }

  getFollowers() {
    this.getDataFromApi('follower')
  }
  getFollowing() {
    this.getDataFromApi('following')
  }
}


//#region firsttry delicios
// import { computed, inject, Injectable, Signal } from "@angular/core";
// import { User } from "../_models/user";
// import { AccountService } from "./account.service";
// import { HttpClient } from "@angular/common/http";
// import { environment } from "../../environments/environment";

// @Injectable({
//   providedIn: 'root'
// })
// export class LikeService {




//   isFollowingMember(id: string | undefined): boolean {
//     throw new Error('Method not implemented.');
//   }




//   user: Signal<User | undefined>
//   http: HttpClient = inject(HttpClient)
//   private _baseApiUrl = environment.baseUrl + 'api/like/'
//   // private accountService: AccountService

//   constructor(accountService: AccountService) {
//     this.user = computed(() => accountService.data()?.user)
//   }

//   toggleLike(target_id: string) {
//     const user = this.user()
//     if (!user) return;
//     const url = this._baseApiUrl
//     this.http.put(url, { target_id }).subscribe()


//     const following = (user.following as string[])
//     // const following = user.following
//     const isFollowingTarget = following.includes(target_id)
//     if (isFollowingTarget) {
//       console.log(`remove ${target_id} to following list`)
//       user.following = following.filter(id => id !== target_id)
//     } else {
//       console.log(`add ${target_id} to following list`)
//       following.push(target_id)
//       user.following = following
//     }


//     return user.following.includes(target_id)



//   }
// }

//#endregion
//#region OpenNewME

// isLikeMember(member_id: string): boolean {
//   const ListOfLikeMembers = this.user()?.following as string[] || []
//   // const isLike = ListOfLikeMembers.includes(member_id)
//   // return !!isLike
//   return ListOfLikeMembers.includes(member_id)
// }
// mytoggleLike(target_id: string) {
//   const ListOfLikeMembers = this.user()!.following as string[] || []

//   const user = this.user()
//   if (!user) return
//   this.http.put(this.baseApiUrl, { member_id: target_id }).subscribe()

//   if (this.isLikeMember(target_id)) {
//     console.log("is like member thn remove ? what Why")
//     const updateList = ListOfLikeMembers.filter(id => id !== target_id)
//     user.following = updateList
//   } else {
//     console.log("is not like yet,add toooo list")
//     ListOfLikeMembers.push(target_id)
//     user.following = ListOfLikeMembers
//   }

// }


//#endregion

//#region SoNothing
// import { HttpClient } from '@angular/common/http'
// import { AccountService } from './account.service'
// import { computed, inject, Injectable, signal, Signal } from '@angular/core'
// import { User } from '../_models/user'
// import { environment } from '../../environments/environment'
// import { default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'
// import { cacheManager } from '../_helper/cache'
// import { parseQuery } from '../_helper/helper'

// @Injectable({
//   providedIn: 'root'
// })
// export class LikeService {

//   user: Signal<User | undefined>
//   http: HttpClient = inject(HttpClient)
//   accountService: AccountService = inject(AccountService)
//   private baseApiUrl = environment.baseUrl + 'api/like/'

//   following = signal<Paginator<UserQueryPagination, User>>(default_paginator)
//   followers = signal<Paginator<UserQueryPagination, User>>(default_paginator)

//   constructor() {
//     this.user = computed(() => this.accountService.data()?.user)
//   }

//   public IsFollowingMember(id: string): boolean { //อันก่อนยิงเข้าอันนี้
//     const user = this.user()
//     if (!user) return false
//     const following = (user.following as string[])
//     return following.includes(id)
//   }

//   toggleLike(target_id: string) {
//     const user = this.user()
//     if (!user) return false
//     const url = this.baseApiUrl
//     this.http.put(url, { target_id }).subscribe()

//     const following = (user.following as string[])
//     const isFollowingTarget = following.includes(target_id)
//     if (isFollowingTarget) {
//       console.log(`remove ${target_id} from following`)
//       user.following = following.filter(id => id !== target_id)
//     } else {
//       console.log(`add ${target_id} from following`)
//       following.push(target_id)
//       user.following = following
//     }
//     this.accountService.setUser(user)
//     return user.following.includes(target_id)
//   }
//   getDataFromApi(type: 'following' | 'followers') {

//     const setSignal = (cacheData: Paginator<UserQueryPagination, User>) => {
//       if (type === 'following') {
//         this.following.set(cacheData)//ก่อนหน้านี้เป็น follower
//         console.log(` --> load ${type} data from Your father`)
//       } else
//         this.followers.set(cacheData)
//     }
//     const pagination = type === 'following' ? this.following().pagination : this.followers().pagination
//     const key = cacheManager.createKey(pagination)
//     const cacheData = cacheManager.load(key, type)
//     if (cacheData) {
//       console.log(` --> load ${type} data from cache`)
//       setSignal(cacheData)
//       return
//     }
//     console.log(`--> load ${type} data from api`)


//     const url = this.baseApiUrl + type + parseQuery(pagination)
//     this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
//       next: response => {
//         const key = cacheManager.createKey(response.pagination)
//         cacheManager.save(key, type, response)
//         setSignal(response)
//       }
//     })
//   }
//   getFollower() {
//     this.getDataFromApi('followers')
//   }
//   getFollowing() {
//     this.getDataFromApi('following')

//   }
// }
//#endregion

