import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItemsByListId(lijstenId: number): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?_expand=list&_sort=volgorde&_order=asc&listId="+lijstenId)
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/"+id)
  }

  postItem(item: Item): Observable<Item> {
    let headers= new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Item>("http://localhost:3000/items",item, {headers: headers});
  }

  putItem(id: number, item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Item>("http://localhost:3000/items/"+id, item, {headers: headers});
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/items/"+id);
  }

  GetItemByVolgorde(volgorde: number,listId:number): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?volgorde="+volgorde+"&listId="+listId)
  }
}
