import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User;

  constructor(private http : HttpClient) {
    this.user = {idEquipe:0,nom :'',prenom : ''}
  }
  connexion (login:string, password:string){
    let HttpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
    //let connexionURL : string = 'https://dillxpbackend.herokuapp.com/utilisateurs/connexion'
    let connexionURL: string = 'http://localhost:8080/utilisateurs/connexion'
    var logs= {
      login: login,
      password: password
    }
    return this.http.post<any>(connexionURL, logs, HttpOptions);
  }
  disconnect(): void {
    localStorage.removeItem('token');
    this.user = {idEquipe:0,nom :'',prenom : ''}
  }
  getUser(): User {
    return this.user;
  }
  setUser(user : User, token : string) : void {
    localStorage.setItem('token',token);
    this.user=user
  }
  isConnected() : boolean {
    const token = localStorage.getItem('token'); 
    return !! token;
  }
}


