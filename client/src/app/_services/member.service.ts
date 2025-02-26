import { Injectable, signal, inject } from '@angular/core'          // 🦇 Angular core stuff~
import { HttpClient } from '@angular/common/http'                   // 🌙 For API calls
import { environment } from '../../environments/environment'         // 💀 Config
import { User } from '../_models/user'                             // 🕸️ User model
import { default_paginator, Paginator, UserQueryPagination } from '../_helper/Pagination'// 🦇 Pagination helpers
import { parseQuery, parseUserPhoto } from '../_helper/helper'      // 🎀 Helper functions
import { firstValueFrom } from 'rxjs'                              // ⚰️ For Promise conversion
import { cacheManager } from '../_helper/cache'                     // ✨ Cache manager


type dataCategory = 'member' | 'follower' | 'following'
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient)
  private url = environment.baseUrl + 'api/' //user
  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination
    //cache
    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load ${category} from cache !!`)
      this.paginator.set(cacheData as Paginator<UserQueryPagination, User>)
      return
    }
    //get from server
    console.log(`load ${category} from server !!`)
    const url = this.url + 'user/' + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, response)
        this.paginator.set(response)
      }
    })
  }

  getMembers() {
    this.getData('member')
  }
  async getMemberByUsername(username: string): Promise<User | undefined> {
    const member = this.paginator().items.find(obj => obj.username === username)
    if (member) {
      console.log('get from cache')
      return member
    } else {
      console.log('get from api')
      try {
        const url = this.url + 'user/' + username
        const _member = await firstValueFrom(this.http.get<User>(url))
        return parseUserPhoto(_member)
      } catch (error) {
        console.error('Get member Error', error)
      }
    }
    return undefined
  }
}