import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'
import { parseUserPhoto } from '../_helper/helper'
import { Photo } from '../_models/photo'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _key = 'account'
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }

  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  // #region setUserforUniversalCity

  public SetUser(user: User) {
    this.setUser(user)
  }

  private setUser(user: User) {
    const copyData = this.data()
    if (copyData)
      copyData.user = user
    this.data.set(copyData)
    this.saveDataToLocalStorage()
  }

  // #endregion

  // #region login_and_register

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      console.error('Login error:', error)
      return error.error?.message || 'An error occurred during login'
    }
  }

  async register(registerData: User): Promise<string> {
    try {
      const url = this._baseApiUrl + 'register'
      const response = this._http.post<{ user: User, token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      console.error('Registration error:', error)
      return error.error?.message || 'An error occurred during registration'
    }
  }

  // #endregion

  //#region saveDataToLocalStorage_loadDataFromLocalStorage
  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data())
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }
  //#endregion

  //#region UpdateProfileFn
  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user/'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      const currentData = this.data()
      if (currentData) {
        currentData.user = user
        this.data.set(currentData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {
      console.error('Update profile error:', error) // Add this line for debugging
      return false
    }
    return true
  }

  //#endregion
  //#region Upload photo

  async setAvatar(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.map(p => {
          p.is_avatar = p.id === photo_id
          return p
        })

        user.photos = photos

        this.setUser(user)
      }
    } catch (error) {
      console.error('Set avatar error:', error) // Add this line for debugging
      throw new Error("NONOAvatarNOOOOO")
    }
  }

  async deletePhoto(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.delete(url)
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.filter(p => p.id !== photo_id)
        user.photos = photos
        const copyData = this.data()
        if (copyData) {
          copyData.user = user
        }
        this.data.set(copyData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {
      console.error('Delete photo error:', error) // Add this line for debugging
      // throw new Error("NO u shoun't Delete this my brother!")
    }
  }

  async uploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo/'
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = this._http.post<Photo>(url, formData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        if (!user.photos)
          user.photos = []
        user.photos?.push(photo)
        this.setUser(user)
        return true
      }
    } catch (error) {
      console.error('Upload photo error:', error) // Add this line for debugging
    }
    return false
  }
  //#endregion
}
