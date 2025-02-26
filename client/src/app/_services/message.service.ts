import { Injectable, inject, signal } from '@angular/core'               // 🦇 Core Angular
import { HttpClient } from '@angular/common/http'                        // 🌙 HTTP stuff
import { environment } from '../../environments/environment'             // 💀 Config
import { Subject, timer, retry } from 'rxjs'                            // 🕸️ RxJS magic
import { WebSocketSubject } from 'rxjs/webSocket'                       // 🦇 WebSocket
import { webSocket } from 'rxjs/webSocket'                              // 🦇 WebSocket
import { Message } from '../_models/message'                            // 🎀 Message model
import {
  default_paginator, Paginator,
  QueryPagination
} from '../_helper/Pagination'                 // ⚰️ Pagination
import { parseQuery } from '../_helper/helper'                          // 🖤 Helper
import { cacheManager } from '../_helper/cache'                         // ✨ Cache
import { firstValueFrom } from 'rxjs'                                  // 🌹 Promise conversion


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient)
  private baseUrl = environment.baseUrl + 'api/message'
  private wsUrl = environment.wsUrl
  paginator = signal<Paginator<QueryPagination, Message>>(default_paginator)
  isWSConnected = signal<boolean>(false)
  private socket$!: WebSocketSubject<any>
  private messageSubject = new Subject<Message>()
  message$ = this.messageSubject.asObservable()

  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    this.wsUrl = environment.production
      ? `${protocol}//${window.location.host}${environment.wsUrl}`
      : environment.wsUrl
  }
  connect(recipient_id: string, token: string, user_id: string): void {
    const RECONNECT_INTERVAL = 5000
    this.socket$ = webSocket(`${this.wsUrl}?token=${token}&recipient_id=${recipient_id}`)
    this.socket$.pipe(
      retry({
        delay: err => {
          console.error(`connection lose`)
          this.isWSConnected.set(false)
          console.log(`ws connection down ,will attemp reconnection in ${RECONNECT_INTERVAL}ms`)
          return timer(RECONNECT_INTERVAL)
        }
      })
    ).subscribe({
      next: msg => {
        this.isWSConnected.set(true)
        const message = msg as Message
        if (message.sender && message.recipient) {
          this.messageSubject.next(message)
        }
      },
      error: err => {
        this.isWSConnected.set(false)
        console.log('ws :error,somthing went wrong!!')
        console.error(err)
      },
      complete: () => {
        this.isWSConnected.set(false)
        console.log('ws disconnected')
      }
    })

  }

  sendMessage(message: Message): void {
    this.socket$.next(message)
  }

  close() {
    this.socket$.complete()
  }

  async getMessageHistory(recipient_id: string) {
    const pagination = this.paginator().pagination
    const key = cacheManager.createKey(pagination)

    const paginationCache = cacheManager.load(key, 'chat')
    if (paginationCache) {
      this.paginator.set(paginationCache)
      console.log('load chat history from cache')
      return
    }
    console.log('get chat history from server')
    const url = this.baseUrl + `/${recipient_id}` + parseQuery(pagination)
    try {
      const paginator = await firstValueFrom(this.http.get<Paginator<QueryPagination, Message>>(url))
      cacheManager.save(key, 'chat', paginator)
      this.paginator.set(paginator)
    } catch (error) {
      console.error(`Error: load chat history from server fail `)
      console.error(error)
    }
  }
}