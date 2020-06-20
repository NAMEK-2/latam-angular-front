import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpUtil} from '../utils/http.util';
import {Observable} from 'rxjs';
import {StandardResponseDto} from '../dto/standar-response.dto';
import {map} from 'rxjs/operators';
import {SendDataDto} from '../dto/send-data.dto';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:8089/';

  constructor(
    private httpService: HttpUtil,
    private router: Router
  ) {
  }


  /**
   *  Trae data del cumpleaños del usuario
   * @param data: SendDataDto
   */
  public seeBirthDayUser(data: SendDataDto): Observable<StandardResponseDto> {
    return this.httpService.postJson<StandardResponseDto>(`${this.baseUrl}/user/birthdate/congrats`, data)
      .pipe(map(response => {
        return response;
      }));
  }

}
