import { Injectable, signal, inject } from '@angular/core'  // 🦇 Angular core
import { HttpClient } from '@angular/common/http'          // 🌙 HTTP client
import { environment } from '../../environments/environment' // 💀 Environment config
import { User } from '../_models/user'                     // 🕸️ User model
import { firstValueFrom } from 'rxjs'                     // ⚰️ RxJS operators
import { parseUserPhoto } from '../_helper/helper'         // 🎀 Helper functions
import { Photo } from '../_models/photo'                   // 🖤 Photo model
import { cacheManager } from '../_helper/cache'            // ✨ Cache manager


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }

  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
    cacheManager.clear('all')
  }

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
      return error.error?.message
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
      return error.error?.message
    }
  }

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

  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user/'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      this.setUser(user)
    } catch (error) {
      false
    }
    return true
  }
  async setAvatar(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (this.data()!.user) {
        const photos = user.photos?.map(p => {
          p.is_avatar = p.id === photo_id
          return p
        })

        user.photos = photos
        this.setUser(user)
      }
    } catch (error) {

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
        this.setUser(user)
      }
    } catch (error) {

    }
  }

  async uploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo/'
    const fromData = new FormData()
    fromData.append('file', file)
    try {
      const response = this._http.post<Photo>(url, fromData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user
      if (this.data()!.user) {
        if (!user.photos)
          user.photos = []
        user.photos?.push(photo)
        this.setUser(user)
        return true
      }
    } catch (error) {

    }
    return false
  }
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
}




//#region newmE
// import { inject, Injectable, signal } from '@angular/core'
// import { environment } from '../../environments/environment'
// import { HttpClient } from '@angular/common/http'
// import { User } from '../_models/user'
// import { catchError, firstValueFrom, tap } from 'rxjs'
// import { parseUserPhoto } from '../_helper/helper'
// import { Photo } from '../_models/photo'

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {

//   private _key = 'account';
//   private _baseApiUrl = environment.baseUrl + 'api/account/'
//   private _http = inject(HttpClient)

//   data = signal<{ user: User, token: string } | null>(null)

//   constructor() {
//     this.loadDataFromLocalStorage()
//   }

//   logout() {
//     localStorage.removeItem(this._key)
//     this.data.set(null)
//   }

//   public setUser(user: User) {
//     const copyData = this.data()
//     if (copyData)
//       copyData.user = user
//     this.data.set(copyData)
//     this.saveDataToLocalStorage()
//   }

// #endregion
//#region login_and_register

// async login(loginData: { username: string, password: string }): Promise<string> {
//   try {
//     const url = this._baseApiUrl + 'login'
//     // const url = 'http://localhost:8000/api/account/login'
//     // const response = this._http.post<{ user: User, token: string }>(url, loginData)

//     console.log('Sending request to:', url);
//     console.log('Request payload:', loginData);


//     const response$ = this._http.post<{ user: User, token: string }>(url, loginData).pipe(
//       tap(response => console.log('Raw response:', response)),
//       catchError(error => {
//         console.error('HTTP Error:', error);
//         throw error;
//       })
//     );
//     // const response = this._http.post<{ user: User, token: string }>(url, loginData)
//     const _data = await firstValueFrom(response$)
//     _data.user = parseUserPhoto(_data.user)
//     this.data.set(_data)
//     this.saveDataToLocalStorage()
//     return ''
//   } catch (error: any) {
//     console.error('Login error details:', error);
//     if (error.status === 0) {
//       return 'Cannot connect to server. Please check if the server is running.';
//     }
//     return error.error?.message
//   }
// }

// async register(registerData: User): Promise<string> {
//   try {
//     const url = this._baseApiUrl + 'register'
//     const response = this._http.post<{ user: User, token: string }>(url, registerData)
//     const data = await firstValueFrom(response)
//     data.user = parseUserPhoto(data.user)
//     this.data.set(data)
//     this.saveDataToLocalStorage()
//     return ''
//   } catch (error: any) {
//     return error.error?.message
//   }
// }

// #endregion
//#region saveDataToLocalStorage_loadDataFromLocalStorage
// private saveDataToLocalStorage() {
//   const jsonString = JSON.stringify(this.data())
//   localStorage.setItem(this._key, jsonString)
// }

// private loadDataFromLocalStorage() {
//   const jsonString = localStorage.getItem(this._key)
//   if (jsonString) {
//     const data = JSON.parse(jsonString)
//     this.data.set(data)
//   }
// }
//#endregion
//#region UpdateProfileFn
//   async updateProfile(user: User): Promise < boolean > {
//   const url = environment.baseUrl + 'api/user/'
//     try {
//     const response = this._http.patch(url, user)
//       await firstValueFrom(response)
//       const currentData = this.data()
//       if(currentData) {
//       currentData.user = user
//       this.data.set(currentData)
//       this.saveDataToLocalStorage()
//     }
//   } catch(error) {
//     return false
//   }
//     return true
// }

//#endregion
//#region Upload photo


// async setAvatar(photo_id: string): Promise<void> {
//   const url = environment.baseUrl + 'api/photo/' + photo_id
//   try {
//     const response = this._http.patch(url, {})
//     await firstValueFrom(response)
//     const user = this.data()!.user
//     if (user) {
//       const photos = user.photos?.map(p => {
//         p.is_avatar = p.id === photo_id
//         return p;
//       })

//       user.photos = photos

//       this.setUser(user)
//     }


//   } catch (error) {
//     throw new Error("NONOAvatarNOOOOO");
//   }
// }

// async deletePhoto(photo_id: string): Promise<void> {
//   const url = environment.baseUrl + 'api/photo/' + photo_id
//   try {
//     const response = this._http.delete(url)
//     await firstValueFrom(response)
//     const user = this.data()!.user
//     if (user) {
//       const photos = user.photos?.filter(p => p.id !== photo_id)
//       user.photos = photos
//       this.setUser(user)
//     }
//   } catch (error) {
//     throw new Error("Error deleting photo");
//   }
// }

// async uploadPhoto(file: File): Promise<boolean> {
//   const url = environment.baseUrl + 'api/photo/'
//   const formData = new FormData()
//   formData.append('file', file)
//   try {
//     const response = this._http.post<Photo>(url, formData)
//     const photo = await firstValueFrom(response)
//     const user = this.data()!.user
//     // if (user) {
//     //   if (!user.photos)
//     //     user.photos = []
//     //   user.photos!.push(photo)
//     //   //update user data in local-storage

//     //   const copyData = this.data()
//     //   if (copyData)
//     //     copyData.user = user
//     //   this.data.set(copyData)
//     //   this.saveDataToLocalStorage()
//     //   return true
//     // }



//     //     if (user) {
//     //       if (!user.photos) {
//     //         user.photos = []
//     //       }
//     //       user.photos.push(photo)

//     //       const copyData = this.data()
//     //       if (copyData) {
//     //         copyData.user = user
//     //       }
//     //       this.data.set(copyData)
//     //       this.saveDataToLocalStorage()
//     //       return true
//     //     }
//     //   } catch (error) {

//     //   }
//     //   return false


//     if (user) {
//       if (!user.photos)
//         user.photos = []
//       user.photos.push(photo)
//       this.setUser(user)
//       return true
//     }
//   } catch (error) {
//     return false
//   }
//   return false
//#endregion
